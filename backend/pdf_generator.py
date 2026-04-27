from fpdf import FPDF
import datetime

def create_report_pdf(triage_data: dict, output_path: str):
    """
    Generate a simple PDF report using fpdf2.
    """
    pdf = FPDF()
    pdf.add_page()
    
    # Title
    pdf.set_font("helvetica", "B", 24)
    pdf.set_text_color(29, 78, 216) # blue-700
    pdf.cell(0, 20, "Derma Guide AI - Medical Report", new_x="LMARGIN", new_y="NEXT", align="C")
    
    # Date
    pdf.set_font("helvetica", "", 12)
    pdf.set_text_color(100, 116, 139) # slate-500
    date_str = triage_data.get("date", datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    pdf.cell(0, 10, f"Date: {date_str}", new_x="LMARGIN", new_y="NEXT", align="R")
    
    pdf.ln(10)
    
    # Results
    pdf.set_font("helvetica", "B", 16)
    pdf.set_text_color(15, 23, 42) # slate-900
    pdf.cell(0, 10, "Analysis Results", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 12)
    pdf.cell(0, 10, f"Condition: {triage_data.get('predicted_class', 'Unknown')}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 10, f"Urgency Level: {triage_data.get('danger_level', 'Unknown')}", new_x="LMARGIN", new_y="NEXT")
    
    pdf.ln(10)
    
    # Survey
    pdf.set_font("helvetica", "B", 16)
    pdf.cell(0, 10, "Reported Symptoms", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 12)
    survey = triage_data.get("survey", {})
    if survey:
        for k, v in survey.items():
            pdf.cell(0, 10, f"{str(k).capitalize()}: {str(v)}", new_x="LMARGIN", new_y="NEXT")
    else:
        pdf.cell(0, 10, "No survey data provided.", new_x="LMARGIN", new_y="NEXT")
        
    pdf.ln(20)
    pdf.set_font("helvetica", "I", 10)
    pdf.set_text_color(148, 163, 184) # slate-400
    pdf.multi_cell(0, 5, "Disclaimer: This report is generated automatically by an AI model and is intended for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.")
    
    pdf.output(output_path)
