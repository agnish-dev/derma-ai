def map_triage_level(predicted_class, survey_data):
    # Classes: 
    # 'BA- cellulitis', 'BA-impetigo', 'FU-athlete-foot', 'FU-nail-fungus', 
    # 'FU-ringworm', 'PA-cutaneous-larva-migrans', 'VI-chickenpox', 'VI-shingles'
    
    # Clinical heuristic rules based on condition + survey data
    fever = survey_data.get('fever', 'No') == 'Yes'
    spreading = survey_data.get('spreading', 'No') in ['Yes, slowly', 'Yes, rapidly']
    pain = survey_data.get('pain', 'None') in ['Moderate', 'Severe']
    
    # Defaults
    if predicted_class in ['BA- cellulitis', 'VI-shingles']:
        if fever or spreading:
            return "Seek Care Today"
        return "See Doctor"
        
    elif predicted_class in ['VI-chickenpox', 'BA-impetigo']:
        if fever and pain:
            return "Seek Care Today"
        return "See Doctor"
        
    elif predicted_class == 'PA-cutaneous-larva-migrans':
        return "See Doctor"
        
    else: # Fungal infections
        if spreading and pain:
            return "See Doctor"
        return "Routine"
