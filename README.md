<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1pdODDKtplX3B2-zUEwU20VWsyNeA_jSB

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build for Production

1. Build the app:
   `npm run build`
2. Preview the production build locally:
   `npm run preview`

## Deploy to a free external host

Two easy options: Vercel or Netlify. Both offer free static hosting and integrate with GitHub.

Vercel (recommended for Vite):

1. Push your repository to GitHub.
2. Create an account at https://vercel.com and import the repo.
3. Vercel will auto-detect the Vite app. Use the default settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add any environment variables (e.g. `GEMINI_API_KEY`) in the project settings on Vercel.

Netlify:

1. Push your repository to GitHub.
2. Create an account at https://app.netlify.com and click "New site from Git".
3. Connect your GitHub repo and set the build command to `npm run build` and publish directory `dist`.
4. Add any environment variables in Site settings > Build & deploy > Environment.

Notes:
- The production build was verified locally (`npm run build`) and succeeded. There is a chunk-size warning from Vite — consider lazy-loading large pages if needed.
- I updated `package.json` devDependencies to use `@types/react` and `@types/react-dom` compatible with React 19 and removed `@types/react-router-dom` because `react-router-dom` v7 bundles its own types.

---

## Automated GitHub Actions deploys (Vercel / Netlify)

You can enable automatic deployments from GitHub Actions after the CI build completes. The workflow will only run deploy jobs when the required repository secrets are present.

Required repository secrets (GitHub):

- Vercel (if you want automatic Vercel deploys):
  - `VERCEL_TOKEN` — A personal token you create at https://vercel.com/account/tokens
  - `VERCEL_PROJECT_ID` — The Vercel project ID (find under project Settings > General > Project ID)

- Netlify (if you want automatic Netlify deploys):
  - `NETLIFY_AUTH_TOKEN` — A personal access token from https://app.netlify.com/user/applications#personal-access-tokens
  - `NETLIFY_SITE_ID` — Your site ID (found on Site settings > Site information)

How to add these secrets to your GitHub repository:

1. Go to your repository on GitHub.
2. Click Settings -> Secrets -> Actions -> New repository secret.
3. Add each secret name and value shown above.

Notes:
- The CI workflow (`.github/workflows/ci.yml`) will only run the deploy job when both the relevant token and project/site id secrets are present.
- For Vercel, the workflow uses `npx vercel deploy` and requires the `VERCEL_TOKEN` and `VERCEL_PROJECT_ID` values to run non-interactively.
- For Netlify, the workflow uses the Netlify CLI to upload the local `dist` directory to the site specified by `NETLIFY_SITE_ID`.
- If you prefer, you can skip GitHub Action deploys and use each platform's GitHub/Git integration (Vercel or Netlify can auto-deploy on push without CI secrets).

