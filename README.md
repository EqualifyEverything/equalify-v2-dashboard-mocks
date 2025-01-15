# Guided Demo 

Equalify is built to manage many web accessibility issues.

Blake will guide our target users through this demo. (We're targeting project managers and accessibility managers - those who use SiteImprove.)

The particular usecase should be tooled to any user its being demoed with.

By default, the demo covers the use case of an accessibilty lead (Lucy) at a university (Berkely) wanting to survey a few pages of a new site they need to review, before setting up a new audit for monthly OCR reviews with custom checks on additional pages. They also will receive notifications so they can track their team's progress over time. The user  relies on screen readers.

## Steps
Open [1-home.html](1-home.html) in your browser, then follow these steps:

1. **Add "https://update.lib.berkeley.edu/, https://www-stg.berkeley.edu" and select "Default Audit" to the form and submit.**
2. **Login as "lgreco@berkeley.edu" - password "pass".**
3. **Ignore Item 2.** It's a false positive.
4. **Hide ignored items in view options** to unclutter list.
5. **Group by page.** Lucy is only concerned with checking out the updates on the pages.
6. Create ticket and edit audit:
    - **Select all items under a page and generate a ticket.** Lucy needs to tell developers to fix things.
    - **Copy Ticket.** Lucy copies content to send it to her team.
    - **Edit Audit.** Lucy wants to make sure the audit includes what OCR demands.
7. **Create a new check.** Existing checks don't include an important check that OCR demands.
8. **Save check with the following info: check name "focus-state", "Category": "General Quality Assurance", check code: `const cssBefore = await page.evaluate(() => {const focusedElement = document.activeElement return window.getComputedStyle(focusedElement).outline; // Check outline or another focus-specific property});`.** This check makes sure tabbed links visually display the focus state.
9. **Go back home.**
10. **Create a new audit.** Lucy wants to create an audit specific for the OCR review she has to do.
11. **Save audit with name to "OCR Review", Frequency to "monthly", then check all items including "focus-state" check from "Custom Checks", select all pages, and turn on email notifications.**
12. **Run the audit.**
13. **Upgrade to Enteprise plan**. Lucy ran out of free scans!
14. **Update view options to only show items tagged "WCAG 2.2 AA" and only show active and equalified items** because OCR only really cares about those.
15. **Visit Account page** - Lucy loves Equalify and wants to add team members to view reprots.
16. **Add "cboyden@berkeley.edu" to team and save.** 
17. Now view [18-emailed_summary.html](18-emailed_summary.html) to see what Lucy receives in email when her OCR audit is run.

Demo is done.

## Objectives
With this Demo, a user:
- Played with Equalify.
- Created a new audit that was meaningful to them.
- Ran the audit and filtered content to meaniful info.
- Setup regular notifications to keep tabs on progress.

## Additional Notes
This repo is live at [https://equalifyeverything.github.io/equalify-v2]( https://equalifyeverything.github.io/equalify-v2/)