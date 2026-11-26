Balashanthi & Simonraja - Wedding e-invitation
================================================

Files
  index.html      the page
  css/style.css   all styles
  js/script.js    doors, garland, scratch card, countdown, music, petals
  images/         artwork taken from the printed invitation

How to host (any one of these works; all are free)
  Netlify Drop : open https://app.netlify.com/drop and drag this whole folder in.
  Vercel       : npx vercel (inside this folder), or import it from a GitHub repo.
  GitHub Pages : push the folder to a repo, then Settings > Pages > deploy from main.
  Any web host : upload the folder contents to public_html.

Keep the folder structure as it is. index.html must stay at the top level.
To test locally, just double-click index.html.

Common edits
  Map link      : in index.html search for "google.com/maps" and paste your exact pin link.
  Guest message : in index.html, the paragraph under "Dear guest".
  Countdown time: in js/script.js, the line with Date.UTC(2026,11,13,5,0,0)
                  (that is 13 Dec 2026, 10:30 AM India time).
