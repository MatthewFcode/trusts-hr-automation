from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from .cv_models import CVExtracted
#from mcp_use import MCPAgent, MCPClient, set_debug

load_dotenv()

def extract_cv_details(text: str) -> CVExtracted:
    """Extract structured job posting info from raw text using Gemini."""

    # set_debug(1)

    # config = {
    #     "mcpServers": {
    #         "playwright": {
    #             "command": "docker",
    #             "args": [
    #                 "run", "-i", "--rm", "--init", "--pull=always",
    #                 "mcr.microsoft.com/playwright/mcp"
    #             ]
    #         }
    #     }
    # }

   # client = MCPClient.from_dict(config)

    llm = ChatGoogleGenerativeAI(
        model="gemini-flash-latest",
        temperature=0,
       
    )
    
    #agent = MCPAgent(llm=llm, client=client)

    structured_llm = llm.with_structured_output(CVExtracted)

    prompt = ChatPromptTemplate.from_template(
        """
        You may use your tools (web browsing if needed)
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

        Additionally, provide:
        - **confidence_rating (0–10)**: your confidence in the accuracy and completeness of the extracted CV details.
        - **llm_overview**: a short written summary of your thoughts about the candidate based purely on the extracted information 
          (e.g., strengths, clarity of experience, seniority level).
        
        Keep all fields concise and accurate

        Text to analyze:
        {text}
        """
    )

    chain = prompt | structured_llm
    result = chain.invoke({"text": text})

    if result is None:
        # Option A: Return an empty object (prevents 500 error)
        return CVExtracted(
            summary="Error: AI could not extract data. Text might be too short or flagged.",
            confidence_rating=0
        )
    return result