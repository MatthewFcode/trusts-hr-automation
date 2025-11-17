from fastapi import FastAPI
from structured_output.routers.jobs import router as job_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CV details extractor API") # creates the main application or "server"

app.add_middleware(
  CORSMiddleware,
  allow_origins=['http://localhost:5173'],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

app.include_router(job_router, prefix="/jobs", tags=["Job Extraction"]) # this attaches a router (or a group of routes onto the app)