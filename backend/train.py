import os
import json
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'archive', 'skin-disease-datasaet')
TRAIN_DIR = os.path.join(DATA_DIR, 'train_set')
TEST_DIR = os.path.join(DATA_DIR, 'test_set')

BATCH_SIZE = 32
IMG_SIZE = (224, 224)

def build_model(num_classes):
    base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights='imagenet')
    base_model.trainable = False  # Freeze base model

    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    predictions = Dense(num_classes, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)
    # Using legacy adam because some pure m1/m2 macs or specific windows setups prefer it in TF2.11+
    # But tf.keras.optimizers.Adam works fine.
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def train():
    print("Loading datasets from:", TRAIN_DIR)
    
    # Data Augmentation
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )

    test_datagen = ImageDataGenerator(rescale=1./255)

    train_generator = train_datagen.flow_from_directory(
        TRAIN_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical'
    )

    validation_generator = test_datagen.flow_from_directory(
        TEST_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )

    num_classes = len(train_generator.class_indices)
    print(f"Detected {num_classes} classes: {train_generator.class_indices}")

    # Save class indices for inference
    class_indices_path = os.path.join(os.path.dirname(__file__), 'class_indices.json')
    with open(class_indices_path, 'w') as f:
        json.dump(train_generator.class_indices, f)

    model = build_model(num_classes)

    print("Starting training...")
    # Train only top layers for a few epochs for speed
    epochs = 5
    model.fit(
        train_generator,
        epochs=epochs,
        validation_data=validation_generator
    )

    # Save model
    model_path = os.path.join(os.path.dirname(__file__), 'model.h5')
    model.save(model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train()
