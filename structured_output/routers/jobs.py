from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from structured_output.extraction import extract_cv_details
from structured_output.cv_models import CVExtracted
from typing import Optional
import PyPDF2
import docx
import io

router = APIRouter()

def extract_text_from_file(file_content: bytes, filename: str) -> str:
    """Extract text from different file types"""
    
    # PDF files
    if filename.lower().endswith('.pdf'):
        try:
            pdf_file = io.BytesIO(file_content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text.strip()
        except Exception as e:
            raise HTTPException(400, f"Failed to parse PDF: {str(e)}")
    
    # Word documents (.docx)
    elif filename.lower().endswith('.docx'):
        try:
            doc_file = io.BytesIO(file_content)
            doc = docx.Document(doc_file)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            return text.strip()
        except Exception as e:
            raise HTTPException(400, f"Failed to parse DOCX: {str(e)}")
    
    # Plain text files
    elif filename.lower().endswith('.txt'):
        try:
            return file_content.decode("utf-8")
        except UnicodeDecodeError:
            raise HTTPException(400, "Unsupported file encoding. Expect UTF-8")
    
    else:
        raise HTTPException(400, "Unsupported file type. Please upload PDF, DOCX, or TXT")



@router.post("/extract", response_model=CVExtracted)  # delaring a post endpoint ending in /extract validates the response using the pydantic model
async def extract_job_endpoint(
  text: Optional[str] = Form(None), # means that it accepts a form field named text
  file: Optional[UploadFile] = File(None) # means that it accepts and uploaded file called file
): 
  if not text and not file: # ensures at least on of the fields was sent and if not then it throws a FastAPI HTTP error as a bad request 
    raise HTTPException( #
      status_code=400,
      detail="Provide either text or file"
    )
  
  if file: # checks if the input was a file
    raw = await file.read() # reads the uplaoded files bytes
    try:
      text = extract_text_from_file(raw, file.filename)# converts the bytes to text
    except UnicodeDecodeError:
      raise HTTPException(400, "Unsuppoted file encoding. Expect UTF-8") # throws error if the decoding doesnt work
    
    structured_result = extract_cv_details(text) # calls the langchain function to send the text to the LLM

    return structured_result # returns a pydantic model which FastAPI automatically converts to JSON