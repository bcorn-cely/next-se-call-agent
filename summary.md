# SE RFC: Automated Gong Call Summarization & Notion CRM Updates for Vercel SEs

![SE AMER OPPS Notion Example](images/se-amer-opps-notion.png)
*Example: Automated customer call summary in Notion (SE AMER OPPS)*

---

## 🚀 Purpose

Automate the capture, summarization, and organization of Gong sales call data for Vercel's Sales Engineers (SEs).  
**Goal:** Ensure every customer interaction is documented in a consistent, actionable, and easily accessible format within Notion, and provide SEs with daily digests of critical updates.

---

## 🧑‍💻 What the Agent Does

- **Retrieves Gong call transcripts** (currently using mock data; future: real Gong API integration)
- **Summarizes each call** using the SE's Notion template, ensuring all required sections are filled and formatted correctly.
- **Creates or updates customer pages** in the SE AMER OPPS Notion database, preserving all historical data and maintaining logical separation between calls.
- **(Planned) Sends daily digests** to each SE, summarizing updated notes and highlighting critical items from recent calls.

---

## 🛠️ Workflow Overview

1. **Ingest Call Data**
   - The agent receives Gong call data (mocked for now).
   - Extracts the customer company name and participants from the transcript.

2. **Template-Driven Summarization**
   - Searches Notion for the SE's template (e.g., "SE-[se's name]-Template") to determine the required summary format.
   - Fills in all template sections, using "N/A" where information is missing.

3. **Customer Page Management**
   - Checks if a Notion page for the customer exists in the SE AMER OPPS database.
     - If yes: updates the page, appending the new summary and preserving all previous notes.
     - If no: creates a new page, using a placeholder name if the company is unknown.

4. **Notion Integration**
   - All updates and creations use the correct parent database ID.

5. **(Planned) Daily Digest Generation**
   - After processing all calls, the agent will generate a daily digest for each SE, summarizing updated notes and highlighting critical items. (This feature is not yet implemented.)

---

## ❓ Open Questions & Suggestions

- **How should we retrieve Gong calls in production?** (Webhook, scheduled job, manual upload?)
- **Preferred delivery method for daily digests?** (Email, Notion notification, Slack, etc.)
- **Additional sections/data for summaries or digests?**
- **Handling edge cases:** (Missing company names, ambiguous participants)
- **Best way to handle errors or failed Notion updates?**

### Future Features & Vision: What Would You Like to See?

- **Automated Gong Integration:** Pull calls directly from Gong via API? How often?
- **Digest Customization:** Format, frequency, or recipient customization?
- **Critical Item Detection:** Auto-flag action items, risks, or follow-ups? How to surface?
- **Integration with Other Tools:** Salesforce, Slack, email, etc.?
- **Search & Retrieval:** Advanced search or Q&A over past call notes?
- **Multi-language Support:** Need to support non-English calls?
- **Feedback Loop:** Efficiently rate/correct summaries for agent improvement?
- **Security & Privacy:** Compliance or privacy requirements for call data?

*What else would make this tool indispensable for your workflow? Please share your ideas, pain points, or wish-list features!*

---

## 🏗️ Current Implementation

- **API Endpoint:** The main workflow is orchestrated in `app/api/gong-agent/route.ts`.
- **Agent Logic:** The agent's workflow and rules are defined in `lib/agent.ts`.
- **Mock Data:** Example Gong calls are provided in `lib/mock-calls.ts`.
- **Notion Integration:** Uses Model Context Protocol (MCP) and Smithery SDK for Notion API access.
- **No real Gong API or digest delivery yet:** These are logical next steps.

---