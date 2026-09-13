# Sabari Jaikrishnan Portfolio Website

A static professional portfolio for production AI and ML systems work, built for GitHub Pages.

## Local Setup

Create and activate the project virtual environment:

```bash
python3 -m venv venv-resume
source venv-resume/bin/activate
```

Run the local static server:

```bash
python scripts/serve.py
```

Open:

```text
http://127.0.0.1:8000
```

Run the lightweight static checks:

```bash
python scripts/check_site.py
```

## Updating the Resume

The "View Resume" button and link on the site point to a Google Drive file:

```text
https://drive.google.com/file/d/1X4w_jYQZneR_6IWnPjIOBt7MImOOOy7i/view?usp=sharing
```

To publish a newer resume, replace the file at that same Google Drive link
(keeping the same sharing link). Nothing in the repo needs to change.

Note: `scripts/update_resume.sh` still exists for copying a PDF into
`reference/`, but it no longer affects the live "View Resume" link since that
link now points to Google Drive instead of a local file.

## GitHub Pages Deployment

This site has no build step. Commit the repository contents and deploy from the repository root.

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Set **Source** to deploy from a branch.
5. Choose the main branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish.

The deployable files are:

- `index.html`
- `styles.css`
- `script.js`
- `.nojekyll`
- `reference/Vish Potrait.png`
- `reference/Sabari_Jaikrishnan_StaffAIEngineer_EA_Resume.pdf`

The `venv-resume/` folder is for local development only and is intentionally ignored by Git.
