import traceback
import sys
sys.path.append('./backend')
from pdf_generator import create_report_pdf
from email_service import send_pdf_email
import os

try:
    pdf_path = "test.pdf"
    create_report_pdf({'predicted_class': 'BA- cellulitis', 'danger_level': 'Seek Care Today', 'survey': {'q1': 'yes'}}, pdf_path)
    print("PDF created successfully")
    send_pdf_email('test@test.com', pdf_path)
    print("Email sent successfully")
    if os.path.exists(pdf_path):
        os.remove(pdf_path)
        print("PDF removed successfully")
except Exception as e:
    traceback.print_exc()
