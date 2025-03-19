from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM

template = """Question: How to make a delicious cake?

Answer: Let's break down the cake-making process step by step:

1. Ingredients needed:
   - List all required ingredients
   - Specify measurements
   - Note any alternatives

2. Preparation steps:
   - Preheating instructions
   - Mixing order
   - Baking time and temperature

3. Baking process:
   - Pan preparation
   - Oven placement
   - Testing for doneness

4. Finishing touches:
   - Cooling process
   - Frosting/decoration
   - Storage tips

Please provide detailed instructions for making a classic vanilla cake."""

prompt = ChatPromptTemplate.from_template(template)
model = OllamaLLM(model="llama3.2")

chain = prompt | model
response = chain.invoke({"question": "How to make a cake?"})
print(response) 