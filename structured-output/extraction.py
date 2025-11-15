from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from models.cv_models import CVExtracted

load_dotenv()

def extract_job_posting(text: str) -> CVExtracted:
    """Extract structured job posting info from raw text using Gemini."""

    llm = ChatGoogleGenerativeAI(
        model="gemini-flash-latest",
        temperature=0
    )

    structured_llm = llm.with_structured_output(CVExtracted)

    prompt = ChatPromptTemplate.from_template(
        """
        Extract detailed CV/resume information from the following text.

        Extract and structure the following fields:
        - Full name
        - Email
        - Phone
        - Location
        - Website / LinkedIn / GitHub
        - Summary
        - Skills list
        - Education entries (institution, degree, field, dates, achievements)
        - Work experience entries (company, role, dates, responsibilities, technologies)
        - Projects (name, description, tech stack, link)
        - Certificates
        
        Keep all fields concise and accurate

        Text to analyze:
        {text}
        """
    )

    chain = prompt | structured_llm
    result = chain.invoke({"text": text})
    return result