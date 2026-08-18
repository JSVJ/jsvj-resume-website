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

## Updating the Resume PDF

The "View Resume" button and link on the site always point to:

```text
reference/Sabari_Jaikrishnan_StaffAIEngineer_EA_Resume.pdf
```

Whenever you have a newer resume export, publish it with one command:

```bash
scripts/update_resume.sh /path/to/your-new-resume.pdf
```

This copies the file into place under that same filename, runs the static
site checks, commits the change, and pushes it — GitHub Pages picks up the
new PDF on the next deploy (usually under a minute). The link itself never
changes, so there's nothing to update in `index.html`.

If you'd rather do it by hand:

```bash
cp /path/to/your-new-resume.pdf "reference/Sabari_Jaikrishnan_StaffAIEngineer_EA_Resume.pdf"
git add reference/Sabari_Jaikrishnan_StaffAIEngineer_EA_Resume.pdf
git commit -m "Update published resume PDF"
git push
```

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
