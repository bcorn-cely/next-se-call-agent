# Automated Gong Call Summarization & Notion CRM Updates for Vercel SEs

Automate the capture, summarization, and organization of Gong sales call data for Vercel's Sales Engineers (SEs). This project ensures every customer interaction is documented in a consistent, actionable, and easily accessible format within Notion, and provides SEs with daily digests of critical updates.

---

## 🚀 Features

- **Automated Gong Call Ingestion:** Retrieve Gong call transcripts (mock data for now; future: real Gong or Snowflake integration).
- **Template-Driven Summarization:** Summarizes each call using the SE Notion templates, ensuring all required sections are filled and formatted.
- **Notion CRM Integration:** Creates or updates customer pages in the SE AMER OPPS Notion database, preserving historical data and maintaining logical separation between calls.
- **Daily Digest (Planned):** Will send daily digests to each SE, summarizing updated notes and highlighting critical items from recent calls.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript
- **APIs:** Notion API (via Smithery SDK, Model Context Protocol)
- **Mock Data:** Simulated Gong call transcripts
- **Planned:** Gong API integration, digest delivery (email, Slack, Notion, etc.)


## ⚙️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🧑‍💻 Developer Setup

To run or test this project, you will need to:

- **Obtain a SmitheryAI API Key:**
  - Sign up at [Smithery](https://smithery.ai/) and generate an API key.
  - Set this key in your environment (e.g., via `.env.local` as `SMITHERY_API_KEY=your-key`).

- **Update the Notion Database ID:**
  - In `lib/agent.ts`, update the prompt or configuration to use the Notion database ID you want to test against.
  - This ensures the agent writes to the correct Notion workspace/database.

- **Create a Notion Template:**
  - In your Notion database, create a template page formatted as `SE-[name]-Template` (e.g., `SE-Alice-Template`).
  - The agent uses this template to structure call summaries.

---

## 📅 Workflow Overview

1. **Ingest Call Data:** Receives Gong call data (mocked for now), extracts company and participants.
2. **Summarize:** Fills in the SE’s Notion template, using "N/A" for missing info.
3. **Update Notion:** Checks for an existing customer page, updates or creates as needed.
4. **(Planned) Daily Digest:** Will generate and deliver daily digests for SEs.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome! Please open an issue or pull request.

---

## 📄 License

[MIT](LICENSE) (or your preferred license)

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Smithery SDK](https://smithery.ai/)
