# DUIP

DUIP (`Discover User Internet Profile`) is a powerful and efficient tool designed to simplify the process of finding information about individuals across various platforms. Whether you're looking for colleagues, professionals, or friends, DUIP provides a seamless experience to discover and connect with people.

Everything runs locally: searches go through a headless browser on your own machine, and summaries are written by a local GGUF language model.

## Stack

- **Next.js 16** (App Router, Turbopack) with **React 19**
- **Tailwind CSS v4** with a CSS-first design token system in [`styles/globals.css`](styles/globals.css)
- **shadcn/ui** components in [`components/ui/`](components/ui/)
- **Puppeteer** (with the stealth plugin) for search and page crawling
- **node-llama-cpp** for on-device summarisation

Requires **Node.js 20.9 or newer**.

## Usage Guide

**1. Clone the Repository:**

```bash
git clone https://github.com/nirajgiriXD/duip.git
```

**2. Navigate to the Project Directory:**

```bash
cd duip
```

**3. Install Dependencies:**

```bash
npm install
```

**4. Configure the Environment:**

Copy `.env.sample` to `.env` and adjust it:

| Variable | Description |
| --- | --- |
| `LLAMA_MODEL_NAME` | File name of the GGUF model placed inside `models/`. |
| `PROXY_SERVER` | Optional proxy for the headless browser. |
| `HEADLESS` | `true` (default), `false` to watch the browser, or `shell`. |

**5. Run the Application:**

```bash
npm run dev
```

**6. Access the DUIP Interface:**

Open a web browser and navigate to http://localhost:3000 to access the DUIP interface.

## How it works

DUIP walks through four steps, shown as a progress stepper in the UI:

1. **Search** — enter whatever identity details you know and pick a run mode. *Automatic* runs the whole pipeline in one go; *Manual* lets you curate the results at each stage.
2. **Profiles** — review the public results, select the ones worth reading, keep useful ones across searches, or add a page the search missed.
3. **Content** — the readable text pulled from every selected profile. In manual mode this is editable, so the model sees exactly what you approve.
4. **Summary** — the analysis, written from the perspective of the chosen lens (Researcher, Investor, HR or Matchmaker).

Your session (search details, profiles, content and summary) is kept in the browser's local storage and can be cleared with the reset action in the header.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
