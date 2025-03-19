from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM

template = """Structured Project  Building Framework
Define Requirements:

Identify Goals: Clearly state what you want to achieve with your project.

Target Audience: Determine who will use or benefit from your project.

Functional Requirements: List what your project needs to do.

Non-Functional Requirements: Consider aspects like performance, security, and usability.

Plan the Project:

Scope: Define what is included and excluded from your project.

Timeline: Create a schedule with milestones.

Budget: Estimate costs and resources needed.

Team Roles: Assign responsibilities to team members.

Design the Project:

System Design: Outline how components will interact.

Architecture: Decide on the structure and technology stack.

User Experience (UX) and User Interface (UI): Plan how users will interact with your project.

Implement the Project:

Development: Start building your project based on the design.

Testing: Validate that each component works as expected.

Integration: Combine different parts of your project.

Deploy and Maintain:

Launch: Make your project available to users.

Monitoring: Track performance and user feedback.

Updates: Regularly update and improve your project based on feedback.

How to Use This Framework for Your Project
Enter Your Field: Specify the type of project you're working on (e.g., software, web app, marketing campaign).

Define Requirements: Based on your field, identify specific goals, target audience, and requirements.

Plan and Design: Use the framework to create a detailed plan and design for your project.

Implement and Deploy: Follow your plan to build and launch your project.

Maintain and Improve: Continuously monitor and update your project.

Example for a Software Project
Field: Software Development

Define Requirements: Identify the software's purpose, target users, and necessary features.

Plan the Project: Create a timeline, budget, and assign roles.

Design the Project: Decide on the architecture, UX/UI, and technology stack.

Implement the Project: Write code, test, and integrate components.

Deploy and Maintain: Launch the software, monitor feedback, and update regularly"""

prompt = ChatPromptTemplate.from_template(template)
model = OllamaLLM(model="llama3.2")

chain = prompt | model
response = chain.invoke({"question": "How to do development in AI?"})
print(response) 