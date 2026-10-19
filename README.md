# Nathanael Thomas: Cybersecurity Portfolio

Static site: HTML5, CSS3, vanilla JavaScript. No build step, no frameworks, no backend. Dark/light theme, accessible nav and project dialog, copy-email button, reduced-motion support.

## Structure
```
index.html  style.css  script.js  README.md  .nojekyll
assets/favicon.svg  assets/avatar.svg   (add assets/resume.pdf yourself)
```
`.nojekyll` stops GitHub Pages running Jekyll processing; it is harmless and optional.

## Run locally
Double-click `index.html`, or use VS Code Live Server. (The resume check needs http, so it shows "missing" on `file://`.)

## Edit content
- Name, about, skills, experience, certifications: plain text in `index.html`. Search for `[` to find every placeholder.
- Projects: edit the `PROJECTS` list at the top of `script.js`. Copy the object to add more. Empty `repo`/`demo` render no link. Only add verified results.
- Resume: put your PDF at `assets/resume.pdf`. Until then the button reads "[ADD RESUME PDF]" and is disabled.
- Certifications: replace `[CONFIRM OFFENSIVE SECURITY CERTIFICATION NAME AND STATUS]` only after confirming the exact credential. "OSCP" (OffSec) and the supplied "Offenso Certified Security Professional" wording are not assumed to be the same.
- Colours: CSS variables at the top of `style.css` (`:root` for dark, `[data-theme=light]` for light).
- Avatar: replace `assets/avatar.svg` with a photo and update the `alt` text.
- Confidentiality: keep Kerala Police details general.

## Test responsiveness
Browser DevTools → device toolbar → try 320, 375, 430, 768, 1024, 1440 px. Check keyboard (Tab, Esc), light theme, and "prefers-reduced-motion" via DevTools rendering panel.

## Deploy to GitHub Pages
1. Create a repository on GitHub. Name it `Nathanaelxn.github.io` for a user site (URL: `https://Nathanaelxn.github.io/`) or e.g. `portfolio` for a project site (URL: `https://Nathanaelxn.github.io/portfolio/`).
2. Upload all files (keep `index.html` at the repo root) via "Add file → Upload files", or `git push`.
3. Settings → Pages → Source: "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save.
4. Wait about a minute, then open the URL shown on that page.
All paths are relative, so both repository types work.

## Troubleshooting
Missing styles/script: file names are case-sensitive; confirm `style.css` and `script.js` sit next to `index.html`. Missing images: check the `assets/` folder name and filenames. Hard-refresh (Ctrl+Shift+R) after updates.

## After deployment
Add `og:url` and `og:image` meta tags to `index.html`. Custom domain: Settings → Pages → Custom domain, then add DNS records at your registrar.

## External services
None required. A contact form would need a third-party form service (GitHub Pages is static), so the site uses `mailto:` and copy-email instead.

## Pre-deployment checklist
- [ ] All `[ADD …]` / `[CONFIRM …]` placeholders resolved or intentionally kept
- [ ] Resume added, or placeholder accepted
- [ ] Links open correctly; no console errors
- [ ] Checked at mobile and desktop widths, both themes, keyboard only
- [ ] Nothing confidential published
