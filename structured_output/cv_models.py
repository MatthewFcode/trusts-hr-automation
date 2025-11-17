from typing import List, Optional
from pydantic import BaseModel, Field


class EducationEntry(BaseModel):
    institution: Optional[str] = Field(None, description="Name of university / school")
    degree: Optional[str] = Field(None, description="Degree or qualification")
    field_of_study: Optional[str] = Field(None, description="Major or specialization")
    start_date: Optional[str] = Field(None, description="Start year or date")
    end_date: Optional[str] = Field(None, description="End year or date (or 'Present')")
    achievements: Optional[List[str]] = Field(
        None, description="Honors, awards, or key academic achievements"
    )


class ExperienceEntry(BaseModel):
    company: Optional[str] = Field(None, description="Employer name")
    role: Optional[str] = Field(None, description="Job title or position")
    location: Optional[str] = Field(None, description="City/country if available")
    start_date: Optional[str] = Field(None, description="Start date")
    end_date: Optional[str] = Field(None, description="End date or 'Present'")
    responsibilities: Optional[List[str]] = Field(
        None, description="Key responsibilities or achievements"
    )
    technologies: Optional[List[str]] = Field(
        None, description="Tech stack used in the role (if applicable)"
    )


class ProjectEntry(BaseModel):
    name: Optional[str] = Field(None, description="Project name")
    description: Optional[str] = Field(None, description="Short summary of project")
    technologies: Optional[List[str]] = Field(None, description="Technologies used")
    link: Optional[str] = Field(None, description="GitHub or live demo link")


class CertificateEntry(BaseModel):
    name: Optional[str] = Field(None, description="Certificate or course name")
    issuer: Optional[str] = Field(None, description="Issuing organization")
    date: Optional[str] = Field(None, description="Date obtained")


class CVExtracted(BaseModel):
    full_name: Optional[str] = Field(None, description="Candidate's full name")
    email: Optional[str] = Field(None, description="Primary email address")
    phone: Optional[str] = Field(None, description="Phone number")
    location: Optional[str] = Field(None, description="City/country if listed")
    website: Optional[str] = Field(None, description="Portfolio or personal website")
    linkedin: Optional[str] = Field(None, description="LinkedIn profile URL")
    github: Optional[str] = Field(None, description="GitHub profile URL")

    summary: Optional[str] = Field(
        None, description="Professional profile or summary section"
    )

    skills: Optional[List[str]] = Field(
        None, description="List of skills extracted from the CV"
    )

    education: Optional[List[EducationEntry]] = Field(
        None, description="Education history"
    )

    experience: Optional[List[ExperienceEntry]] = Field(
        None, description="Work experience entries"
    )

    projects: Optional[List[ProjectEntry]] = Field(
        None, description="Projects included in the CV"
    )

    certificates: Optional[List[CertificateEntry]] = Field(
        None, description="Certifications or training"
    )
