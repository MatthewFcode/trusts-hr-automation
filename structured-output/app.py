from fastapi import FastAPI
from routers.jobs import router as job_router

app = FastAPI(title="CV details extractor API") # creates the main application or "server"

app.include_router(job_router, prefix="/jobs", tags=["Job Extraction"]) # this attaches a router (or a group of routes onto the app)