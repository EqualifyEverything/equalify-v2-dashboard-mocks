# Demo to Validate Features and Layout for Screen Readers

Equalify is built to manage many web accessibility issues.

Blake will guide our target users through this demo. (We're targeting project managers and accessibility managers - those who use SiteImprove.)

The goal of this demo is to validate features and layout of pages for screen readers.

By default, the demo covers the use case of an accessibilty lead (Lucy) at a university (Berkely) wanting to survey a few pages of a new site they need to review, before setting up a new audit for monthly OCR reviews with custom checks on additional pages. They also will receive notifications so they can track their team's progress over time. The user  relies on screen readers.

## Steps
Open [1-audits-no_content.html](1-audits-no_content.html) in your browser, then follow these steps:

1. Select Build Audit.
2. Sign in as "lgreco@berkeley.edu," password "pass".
3. Add pages: "https://update.lib.berkeley.edu/, https://www-stg.berkeley.edu"
4. Click next step.
5. Add checks the last two checks: "empty-alt-elements" and "Unique Link and Button Text"
6. Click next step.
7. Save the audit as "Lucy's Review" with "Monthly" frequency and notifications on.
8. Select and ignore the item with the ID of "2"
9. Select the remaining checks and generate a ticket.
10. Copy the ticket, then click the "Pages" from the main nav.
11. Select the page with ID 2.
12. Visit "Logs"
13. Select "Log 3".
14. Visit "Audits".
15. Run Lucy's Audit again.
16. Upgrade to Enterprise account.
17. Visit Account.
18. Add "cboyden@berkeley.edu" to team and save.
19. Now view [19-emailed_summary.html](18-emailed_summary.html) to see what Lucy receives in email when her OCR audit is run.

Demo is done.

## Objectives
With this Demo, a user:
- Played with Equalify.
- Created a new audit that was meaningful to them.
- Ran the audit and filtered content to meaniful info.
- Setup regular notifications to keep tabs on progress.

## Additional Notes
This repo is live at [https://equalifyeverything.github.io/equalify-v2]( https://equalifyeverything.github.io/equalify-v2/)