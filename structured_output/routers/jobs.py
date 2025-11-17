from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from structured_output.extraction import extract_cv_details
from structured_output.cv_models import CVExtracted
from typing import Optional

router = APIRouter()

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
      text = raw.decode("utf-8") # converts the bytes to text
    except UnicodeDecodeError:
      raise HTTPException(400, "Unsuppoted file encoding. Expect UTF-8") # throws error if the decoding doesnt work
    
    structured_result = extract_cv_details(text) # calls the langchain function to send the text to the LLM

    return structured_result # returns a pydantic model which FastAPI automatically converts to JSON