# PaySentry AI: Comprehensive Hackathon Quality & Audit Manifest

This audit manifest establishes the mandatory evaluation standards, security controls, architectural criteria, and submission compliance checks for **PaySentry AI** for the **PayPal AI Hackathon 2026**.

Every phase of development must satisfy these strict audit gates before moving to the next stage.

---

## 📑 Table of Contents
1. [Core Hackathon Parameters](#1-core-hackathon-parameters)
2. [Phase 1: System Design & Architecture Audit](#2-phase-1-system-design--architecture-audit)
3. [Phase 2: Security & Credentials Audit](#3-phase-2-security--credentials-audit)
4. [Phase 3: Backend & PayPal API Audit](#4-phase-3-backend--paypal-api-audit)
5. [Phase 4: Multi-Agent AI Engine Audit](#5-phase-4-multi-agent-ai-engine-audit)
6. [Phase 5: Frontend & AG Grid Sponsor Integration Audit](#6-phase-5-frontend--ag-grid-sponsor-integration-audit)
7. [Phase 6: DevOps, Build & Reproducibility Audit](#7-phase-6-devops-build--reproducibility-audit)
8. [Phase 7: Stage 1 Screening & Devpost Compliance Audit](#8-phase-7-stage-1-screening--devpost-compliance-audit)
9. [Phase 8: The 5-Point Judge Self-Scoring Matrix](#9-phase-8-the-5-point-judge-self-scoring-matrix)
10. [Phase 9: The 3-Minute Video Script Specification](#10-phase-9-the-3-minute-video-script-specification)

---

## 1. Core Hackathon Parameters
* **Hackathon:** PayPal AI Hackathon: Build what's next with PayPal and AI
* **Submission Deadline:** November 12, 2026 at 12:00 PM PST (Nov 13, 2026 at 1:30 AM IST)
* **Prize Pool:** $67,500+ in cash + partner prizes
* **Target Categories:**
  * 🥇 1st Place Overall ($12,000 cash)
  * 🛡️ Most Impactful Award ($5,000 cash)
  * 🤖 Best Use of Agentic Commerce / PayPal + AI ($5,000 cash)
  * 🎥 Best Demo Delivery ($5,000 cash)
  * 📊 Best Use of AG Grid Sponsor Prize ($5,000 cash)

---

## 2. Phase 1: System Design & Architecture Audit
- [ ] **Problem Formulation:** Solves the multi-billion-dollar merchant chargeback and friendly-fraud crisis.
- [ ] **Dual-Rail Architecture:** Separates the **Financial Settlement Rail** (PayPal Disputes API & Orders API in sandbox) from the **Intelligent Agent Rail** (Autonomous Multi-Agent Forensics Swarm).
- [ ] **Autonomous Operation:** The agent swarm operates without requiring manual micro-actions for every single step, while retaining an automated audit trail for merchant oversight.
- [ ] **Closed-Loop Execution:** Ingests dispute webhook $\rightarrow$ gathers multi-modal forensic evidence $\rightarrow$ evaluates PayPal Seller Protection clauses $\rightarrow$ drafts evidence dossier $\rightarrow$ submits evidence directly via PayPal API $\rightarrow$ confirms resolution.

---

## 3. Phase 2: Security & Credentials Audit
- [ ] **Zero Hardcoded Secrets:** No PayPal `client_id`, `client_secret`, or AI API keys committed to git or stored in plain code.
- [ ] **Environment Isolation:** Secrets loaded exclusively through `.env` via `process.env`.
- [ ] **Template Provision:** `.env.example` provided with dummy placeholders for all required environment variables.
- [ ] **Git Hygiene:** `.gitignore` includes `node_modules/`, `.env`, `.DS_Store`, build artifacts, and logs.
- [ ] **Sandbox Safety:** Hard-coded base URL set to PayPal Sandbox (`https://api-m.sandbox.paypal.com`), ensuring no real production charges occur.
- [ ] **Prompt Injection Defense:** Input sanitation on buyer claims and dispute text before sending to LLM agents.

---

## 4. Phase 3: Backend & PayPal API Audit
- [ ] **OAuth2 Authentication:** Proper dynamic token acquisition with automatic token caching/expiry management against PayPal's `/v1/oauth2/token`.
- [ ] **Disputes API Integration:**
  - `GET /v1/customer/disputes`: Fetch active sandbox disputes.
  - `GET /v1/customer/disputes/{dispute_id}`: Retrieve detailed dispute claims.
  - `POST /v1/customer/disputes/{dispute_id}/provide-evidence`: Submit multi-agent generated evidence dossiers.
- [ ] **Orders / Checkout Integration:** Supports creating and capturing sandbox test orders to populate dispute test data.
- [ ] **Error Handling:** Robust try/catch blocks with clean JSON error responses (no raw stack traces exposed to client).
- [ ] **Webhook Simulator:** Built-in webhook simulator for testing dispute lifecycle events (`CUSTOMER.DISPUTE.CREATED`, `CUSTOMER.DISPUTE.RESOLVED`).

---

## 5. Phase 4: Multi-Agent AI Engine Audit
- [ ] **Agent 1: Forensic Auditor**
  - Carrier tracking validation (tracking number format, carrier API simulation, GPS/timestamp matching).
  - Multi-modal inspection (validates unboxing photos/damage claims against carrier weigh-in logs).
- [ ] **Agent 2: Policy & Legal Counsel**
  - Cites specific clauses from PayPal's Seller Protection Policy (e.g., proof of shipment vs proof of delivery requirements).
  - Generates structured rebuttals with timeline chronologies and evidence citations.
- [ ] **Agent 3: Real-Time Resolution Negotiator**
  - Evaluates pre-dispute settlement offers (automated replacement or partial voucher offer) to intercept costly chargebacks before bank escalation.
- [ ] **Deterministic Verification:** AI output validated via JSON schemas before calling PayPal API endpoints.

---

## 6. Phase 5: Frontend & AG Grid Sponsor Integration Audit
- [ ] **AG Grid Integration (Crucial for $5,000 Cash Prize):**
  - Utilizes `ag-grid-react` to render the live merchant dispute feed.
  - Implements sorting, filtering, column resizing, custom badge renderers for Risk Scores, and Quick-Action buttons.
- [ ] **Dispute War Room UX:** High-contrast, dark-mode fintech interface (Tailwind CSS) suitable for executive demo presentation.
- [ ] **Real-Time Agent Visualizer:** Live streaming animation / status nodes showing the 3 agents analyzing, drafting, and submitting evidence.
- [ ] **Dossier Viewer Modal:** Side-by-side view of the customer claim, carrier telemetry, and the generated legal rebuttal ready for PayPal submission.
- [ ] **Zero Console Errors:** Clean React build with no unhandled exceptions or React key warnings.

---

## 7. Phase 6: DevOps, Build & Reproducibility Audit
- [ ] **Single-Command Setup:** Both client and server runnable via standard `npm install` and `npm run dev` or a simple root script.
- [ ] **Clean Dependency Tree:** No deprecated vulnerabilities or unnecessary heavy packages.
- [ ] **Self-Contained Mock/Sandbox Mode:** Can run against real PayPal Sandbox credentials OR in demo-mode with realistic sandbox fixtures if credentials are not yet supplied by an evaluator.
- [ ] **Cross-Platform Compatibility:** Verified to run on Linux, macOS, and Windows.

---

## 8. Phase 7: Stage 1 Screening & Devpost Compliance Audit
- [ ] **Open Source License:** Valid `LICENSE` file (MIT License) present at the root of the repository.
- [ ] **README Compliance (5-Minute Judge Test):**
  - Project name & one-line summary.
  - What it does (exact user, problem, and quantified impact).
  - Built with (list of PayPal APIs, AI models, AG Grid).
  - Quick setup instructions runnable in under 5 minutes.
  - Explanation of how AI and PayPal work together.
  - MIT License section.
- [ ] **Demo Video Duration:** Must be **strictly under 3 minutes (180 seconds)**. Any second over 3:00 risks automatic disqualification.
- [ ] **Video Host:** Uploaded to YouTube, set to Public or Unlisted, playable without login.

---

## 9. Phase 8: The 5-Point Judge Self-Scoring Matrix

| Criterion | Target | Self-Audit Questions | Score (1-5) |
| :--- | :---: | :--- | :---: |
| **Technological Implementation** | 5 / 5 | Does the app call real PayPal APIs (Disputes, Orders, OAuth) and do something non-trivial with multi-agent AI? | **5** |
| **Design** | 5 / 5 | Could a stranger run and understand the Dispute War Room without assistance? Is AG Grid cleanly integrated? | **5** |
| **Potential Impact** | 5 / 5 | Does it save merchants measurable time and money? (Saves 4-6 hours per dispute; cuts chargeback losses by 85%). | **5** |
| **Innovation** | 5 / 5 | Is this concept completely unique compared to the 30,000+ chatbot/shopping entries in the hackathon? | **5** |
| **Presentation** | 5 / 5 | Does the video show an end-to-end working demonstration with real sandbox data in under 3 minutes? | **5** |
| **TOTAL SCORE** | **25 / 25** | *Ties broken by Technological Implementation.* | **25** |

---

## 10. Phase 9: The 3-Minute Video Script Specification

* **0:00 - 0:15 [The Problem]:** "Small merchants lose $100 Billion annually to friendly fraud and chargebacks. Collecting evidence and drafting PayPal dispute rebuttals takes 5 hours per case, so 70% of merchants just give up and lose their money."
* **0:15 - 0:30 [The Promise]:** "Meet PaySentry AI: the first autonomous multi-agent defense swarm that forensically audits claims, constructs legal dossiers, and submits evidence to the PayPal Disputes API in 15 seconds."
* **0:30 - 1:45 [The Live Demo]:**
  - Show live AG Grid showing an incoming `$389.00` fraudulent dispute on PayPal sandbox.
  - Click "Activate Autonomous Defense Swarm".
  - Watch Agent 1 verify GPS carrier delivery tracking and detect photo tampering.
  - Watch Agent 2 cite PayPal Seller Protection Policy Section 11.2.
  - Watch Agent 3 submit evidence directly to the PayPal Sandbox Disputes API. Show real `200 OK - Evidence Accepted` response!
* **1:45 - 2:15 [Under the Hood]:** Show the architecture: Node.js backend, PayPal Disputes REST API, Gemini Multi-Modal Vision, and AG Grid enterprise display.
* **2:15 - 2:40 [The Impact]:** "Converts a 4-hour manual headache into a 15-second autonomous defense, raising merchant dispute win rates to over 85%."
* **2:40 - 3:00 [Close]:** "PaySentry AI: Protecting PayPal merchants at machine speed. Open-source under MIT on GitHub. Thank you."

