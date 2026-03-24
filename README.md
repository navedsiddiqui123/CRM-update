CRM Agent with Explainability & HITL Controls
A multi-step AI agent system simulating intelligent CRM workflows — built with Claude Code in terminal.
What it does:
Intent classification → case routing → context retrieval → LLM response generation, with a full explainability layer exposing confidence scores, signal attribution, and data sources per decision step. Human-in-the-loop override controls allow safe intervention before autonomous actions execute.
Stack: Python · Claude API · Node.js · [whatever else is in there]
Built with: Claude Code (terminal-native development)
How to run:
git clone ...
npm install / pip install -r requirements.txt
[API key setup]
npm start / python app.py
Key design decisions:

HITL triggers defined by confidence threshold, not just error state
Evaluation metrics (Trust Score, resolution accuracy) defined before build
Structured output validation to prevent hallucination propagation between steps
