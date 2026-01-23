# 🧠 QA Thinking Engine (AI-Powered Quality Intelligence)

![License](https://img.shields.io/…vg)
![Status](https://img.shields.io/…vg)
![Stack](https://img.shields.io/…et)

> **AI-assisted tool for QA test design, bridging the gap between vague intent and structured automation.**

The **QA Thinking Engine** acts as a senior QA architect. It interprets natural language intents and transforms them into structured test scenarios, comprehensive test cases, risk analysis, and executable Playwright code skeletons.

---

## 🏗️ High-Level Architecture

The application follows a clean separation of concerns, ensuring modularity between the UI, the logical engine, and the AI integration.

```mermaid
graph TD
    A["User Intent (Natural Language)"] -->|Input| B("React Frontend")
    B -->|API Request| C{"Node.js Backend"}
    C -->|Context & Prompt Engineering| D["OpenAI GPT-4"]
    D -->|Structured JSON| C
    C -->|Response| B
    B --> E["Test Scenarios & Insight"]
    B --> F["Playwright Code Skeleton"]
```

---

## 📸 Application Preview

### 1. 🎬 Workflow: Intent to Structure
*Live demonstration of entering a test intent. The engine interprets natural language (Czech) and immediately suggests a test structure.*
![Input Workflow](./docs/TC1.gif)

### 2. 🧠 AI Analysis & Processing
*Visual feedback while the specialized AI agent analyzes the intent, constructs logic, and identifies potential risks.*
![AI Processing](./docs/Loading1.gif)

### 3. 📋 Deep Dive: Test Case Detail
*The final output: A structured Acceptance test with distinct steps, preconditions, and a dedicated "Expert QA Insight" panel.*
![Detail View](./docs/TCDetail001.gif)

### 4. 🛠️ Automated Playwright Code
*One-click generation of production-ready Playwright (TypeScript) code skeletons, fully commented and typed.*
![Code Generation](./docs/Skeleton.png)

---

## 📦 Core Capabilities & Output Structure

Unlike generic chat bots, this engine enforces **strict structured outputs** suitable for professional QA workflows.

### 1️⃣ Test Scenarios (The "What" & "Why")
Defines the scope and business goal before jumping into steps.

```json
{
  "id": "SC-01",
  "title": "User Login Validation",
  "goal": "Verify that a registered user can access the account with valid credentials.",
  "risk": "Unauthorized access potential if validation fails."
}
```

### 2️⃣ Test Cases (The "How")
Generates actionable steps for manual or automated execution.

```json
{
  "id": "TC-01",
  "scenarioId": "SC-01",
  "steps": [
    "Navigate to /login page",
    "Enter valid email: user@test.com",
    "Enter valid password",
    "Click 'Login' button"
  ],
  "expectedResult": "User is redirected to Dashboard"
}
```

### 3️⃣ Expert QA Insight
The engine acts as a "second pair of eyes," analyzing coverage and risks.

* **🛡️ Risks:** Identifies edge cases (e.g., SQL Injection, Brute Force).
* **📊 Coverage:** Validates if the test covers the "Happy Path" or "Negative flows".
* **🤖 Automation Tips:** Suggests locators (e.g., `data-testid`) for stability.

---

## ✨ Key Features & Philosophy

* **🤖 AI Test Strategy Generator:** Instantly creates comprehensive test plans from a single sentence.
* **🇨🇿 Czech Localization Enforced:** The engine is configured to **strictly output all scenarios in Czech**, ensuring consistent documentation for local teams regardless of the input language.
* **🛡️ AI Guardrails:** Implements heuristic validators to minimize hallucinations and ensure the generated steps are logically sequential.
* **⚖️ Risk-Based Approach:** Every test case includes a risk assessment to prioritize critical flows.
* **🎭 Auto-Playwright:** Converts textual test steps into syntactically correct **Playwright (TypeScript)** code.
* **🎫 JIRA Integration:** One-click export of scenarios directly to JIRA as Epics/Tasks.

---

## 🛠️ Tech Stack

![React](https://img.shields.io/…FB)
![TypeScript](https://img.shields.io/…te)
![NodeJS](https://img.shields.io/…te)
![TailwindCSS](https://img.shields.io/…te)
![OpenAI](https://img.shields.io/…te)
![Playwright](https://img.shields.io/…te)

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* NPM or Yarn
* OpenAI API Key
* JIRA API Token (optional, for export features)

### 1. Installation

**Clone the repository and install dependencies:**

```bash
# 1. Clone repo
git clone [https://github.com/…it)
cd QA-Thinking-Engine

# 2. Install Backend dependencies
npm install

# 3. Install Frontend dependencies
cd ui
npm install
```

### 2. Configuration

Return to the root directory, create a `.env` file and update it with your credentials:

```env
# --- OpenAI ---
OPENAI_API_KEY=sk-proj-xxxxxxxx...

# --- JIRA Integration (Optional) ---
JIRA_BASE_URL=[https://your-domain.atlassian.net](https:/…et)
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=ATATT3xFfGF0...   # Generate at: [https://id.atlassian.com/…ns)
JIRA_PROJECT_KEY=KAN

# --- JIRA IDs (Default) ---
JIRA_TASK_ISSUE_TYPE_ID=10003
JIRA_EPIC_ISSUE_TYPE_ID=10001
```

### 3. Run the Application

You need to run Backend and Frontend in separate terminals.

**Terminal 1: Backend (API)**
```bash
# From root directory
npm run dev
# Server starts on http://localhost:3000
```

**Terminal 2: Frontend (UI)**
```bash
# From /ui directory
cd ui
npm run dev
# App starts on http://localhost:5173
```

---

## 🔮 Roadmap

* [x] **QA Design Engine** (Core Logic)
* [x] **Playwright Export** (Code Gen)
* [ ] **CI/CD Pipeline** (GitHub Actions integration)
* [ ] **JIRA Integration** (Direct export of issues)
* [ ] **Strategy Profiles** (Switch between "Aggressive" vs "Standard" testing depth)

---

## 👤 Author

**Martin B.**
* QA Tester | Test Design | API, SQL | AI-Assisted Development
* *This project demonstrates the intersection of QA methodology, AI Engineering, and Software Development.*
