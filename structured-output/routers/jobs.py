from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from ..extraction import extract_cv_details
from ..cv_models import JobPosting

router = APIRouter 

@router.post("/extract", response_model=JobPosting)
async def extract_job_endpoint(
  text: str | None = Form(None), 
  file: UploadFile | None = File(None)
): 
  if not text and not file:
    raise HTTPException(
      status_code=400,
      detail="Provide either text or file"
    )
  
  if file:
    raw = await file.read()
    try:
      text = raw.decode("utf-8")
    except UnicodeDecodeError:
      raise HTTPException(400, "Unsuppoted file encoding. Expect UTF-8")
    
    structured_result = extract_cv_details(text)

    return structured_result