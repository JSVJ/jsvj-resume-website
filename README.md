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

## Resume

The site intentionally does not link to a resume. Visitors who want one can
reach out by email or LinkedIn. `scripts/check_site.py` fails if a
"View Resume"/"Download Resume" link or a resume PDF reference is added back.

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

The `venv-resume/` folder is for local development only and is intentionally ignored by Git.
