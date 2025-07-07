# Project Summary: Automated Gong Call Summarization & Notion CRM Updates for Vercel SEs

## Purpose

This project aims to automate the process of capturing, summarizing, and organizing Gong sales call data for Vercel's Sales Engineers (SEs). The goal is to ensure that every customer interaction is documented in a consistent, actionable, and easily accessible format within Notion, while also providing SEs with daily digests of critical updates.

---

## What the Agent Does

- **Retrieves Gong call transcripts** (currently using mock data; future: real Gong API integration).
- **Summarizes each call** using the SE's specific Notion template, ensuring all required sections are filled and formatted correctly.
- **Creates or updates customer pages** in the SE AMER OPPS Notion database, preserving all historical data and maintaining logical separation between calls.
- **(Planned) Sends daily digests** to each SE, summarizing updated notes and highlighting critical items from recent calls.

---

## Workflow Overview

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
   - All updates and creations use the correct parent database ID and follow Notion's rich text schema.

5. **(Planned) Daily Digest Generation**
   - After processing all calls, the agent will generate a daily digest for each SE, summarizing updated notes and highlighting critical items. (This feature is not yet implemented.)

---

## Open Questions & Suggestions

- **How should we retrieve Gong calls in production?** (Webhook, scheduled job, manual upload?)
- **What's the preferred delivery method for daily digests?** (Email, Notion notification, Slack, etc.)
- **What additional sections or data would SEs like to see in the summaries or digests?**
- **How should we handle edge cases (e.g., missing company names, ambiguous participants)?**
- **What's the best way to handle errors or failed updates to Notion?**

### Future Features & Vision: What Would You Like to See?

- **Automated Gong Integration:** Should the agent pull calls directly from Gong via API, and if so, how often?
- **Digest Customization:** Would you like to customize the format, frequency, or recipients of daily/weekly digests?
- **Critical Item Detection:** Should the agent automatically flag action items, risks, or follow-ups from calls? How should these be surfaced?
- **Integration with Other Tools:** Are there other platforms (e.g., Salesforce, Slack, email) where you'd like to see summaries or notifications?
- **Search & Retrieval:** Should the agent support advanced search or Q&A over all past call notes?
- **Multi-language Support:** Is there a need to support calls in languages other than English?
- **Feedback Loop:**  How can we efficiently rate or correct summaries so the agent can improve over time?
- **Security & Privacy:** Are there specific compliance or privacy requirements for storing/transmitting call data?

*What else would make this tool indispensable for your workflow? Please share your ideas, pain points, or wish-list features!*

---

## Current Implementation

- **API Endpoint:** The main workflow is orchestrated in `app/api/gong-agent/route.ts`.
- **Agent Logic:** The agent's workflow and rules are defined in `lib/agent.ts`.
- **Mock Data:** Example Gong calls are provided in `lib/mock-calls.ts`.
- **Notion Integration:** Uses Model Context Protocol (MCP) and Smithery SDK for Notion API access.
- **No real Gong API or digest delivery yet:** These are logical next steps.

---