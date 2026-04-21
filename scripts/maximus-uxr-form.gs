/**
 * Maximus Energy — v1 UX feedback form generator
 *
 * Purpose: UXR on the v1 marketing site for 2 family-member reviewers.
 * Creates a Google Form + linked response Sheet in your Drive.
 *
 * HOW TO RUN
 * 1. Go to https://script.google.com, click "New project".
 * 2. Paste this entire file into the editor (replace the default Code.gs).
 * 3. Save. Select `createMaximusUxrForm` in the function dropdown. Click Run.
 * 4. Approve the one-time OAuth prompt (Forms + Drive scopes).
 * 5. Open View → Logs. Copy the "Respondent URL" and share it.
 *
 * Re-running creates a new form each time. Edit the SITE_URL constant below
 * if the preview URL changes.
 */

const SITE_URL =
  'https://dicorner-platform-git-claude-energy-sa-5882a4-tmutonis-projects.vercel.app/maximus';

function createMaximusUxrForm() {
  const form = FormApp.create('Maximus Energy — v1 UX feedback');

  form.setDescription(
    [
      'Thanks for helping review the Maximus Energy Consultations site.',
      'This should take 5–8 minutes.',
      '',
      'Review the site first (no password needed):',
      SITE_URL,
      '',
      'Try to spend 2–3 minutes exploring before answering.',
    ].join('\n'),
  );
  form.setCollectEmail(false);
  form.setShowLinkToRespondAgain(false);
  form.setAllowResponseEdits(true);
  form.setConfirmationMessage(
    'Thank you — your feedback is going straight to the team.',
  );

  // ── Section 1: About you ───────────────────────────────────────────────
  form.addSectionHeaderItem().setTitle('About you').setHelpText('30 seconds.');

  form.addTextItem().setTitle('Your first name').setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Relationship to the person who sent you this')
    .setChoiceValues([
      'Parent',
      'Sibling',
      'Spouse / partner',
      'Cousin',
      'Friend',
      'Other',
    ])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Device you are reviewing on')
    .setChoiceValues(['Phone', 'Tablet', 'Laptop', 'Desktop'])
    .setRequired(true);

  // ── Section 2: First impressions ───────────────────────────────────────
  form
    .addPageBreakItem()
    .setTitle('First impressions')
    .setHelpText('Spend ~30 seconds on the homepage before answering.');

  form
    .addParagraphTextItem()
    .setTitle('In your own words, what does Maximus Energy do?')
    .setHelpText('First impression is fine — no need to re-read.')
    .setRequired(true);

  form
    .addScaleItem()
    .setTitle(
      'The homepage headline is "Comfort first. The savings follow." How much does that resonate with you?',
    )
    .setBounds(1, 5)
    .setLabels("Doesn't land", 'Really lands')
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle(
      'The site calls this work "Behavioral Energy Intelligence." What do you think that phrase means?',
    )
    .setRequired(false);

  form
    .addMultipleChoiceItem()
    .setTitle(
      'Does "Behavioral Energy Intelligence" feel credible or jargon-y?',
    )
    .setChoiceValues([
      'Feels credible',
      'Mostly credible',
      'Mixed',
      'Mostly jargon',
      'Pure jargon',
    ])
    .setRequired(true);

  // ── Section 3: The two moats ───────────────────────────────────────────
  form
    .addPageBreakItem()
    .setTitle('What Maximus does differently')
    .setHelpText(
      [
        'The site highlights two things Maximus does uniquely:',
        '  1) Reading comfort (not just kilowatts)',
        '  2) Doing the math — cost/benefit and quote on one page',
      ].join('\n'),
    );

  form
    .addMultipleChoiceItem()
    .setTitle('Which of the two lands more strongly?')
    .setChoiceValues([
      'Reading comfort',
      'Doing the math',
      'Both equally',
      'Neither',
      "Can't tell / didn't get that far",
    ])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle(
      'Why would that matter to a homeowner? (One or two sentences.)',
    )
    .setRequired(false);

  // ── Section 4: Intent & trust ──────────────────────────────────────────
  form.addPageBreakItem().setTitle('Would you actually contact them?');

  form
    .addScaleItem()
    .setTitle(
      'Imagine you owned a home with a room that never cools in summer. How likely would you be to fill out their 6-question intake after reading the site?',
    )
    .setBounds(1, 5)
    .setLabels('Not at all likely', 'Very likely')
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle(
      "What's ONE thing missing that would make you trust Maximus more?",
    )
    .setHelpText(
      'e.g., photos, reviews, credentials, pricing, a specific case story — whatever comes to mind.',
    )
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle(
      'If a friend mentioned energy problems in their home, would you send them to this site?',
    )
    .setChoiceValues([
      'Definitely',
      'Probably',
      'Unsure',
      'Probably not',
      'Definitely not',
    ])
    .setRequired(true);

  // ── Section 5: The intake form ─────────────────────────────────────────
  form
    .addPageBreakItem()
    .setTitle('The 6-question intake')
    .setHelpText('This is the form at /maximus/start.');

  form
    .addMultipleChoiceItem()
    .setTitle('Did you try the 6-question intake?')
    .setChoiceValues([
      'Yes, I finished it',
      'Yes, I started but did not finish',
      'No',
    ])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle(
      'If you tried it: did any question feel too personal, confusing, or unnecessary?',
    )
    .setRequired(false);

  // ── Section 6: Wrap ────────────────────────────────────────────────────
  form.addPageBreakItem().setTitle('Last three questions');

  form
    .addParagraphTextItem()
    .setTitle('One thing that confused you or slowed you down:')
    .setRequired(false);

  form
    .addParagraphTextItem()
    .setTitle('One thing you liked most:')
    .setRequired(false);

  form
    .addParagraphTextItem()
    .setTitle('Anything else you want the team to hear?')
    .setRequired(false);

  // ── Wire a response spreadsheet ────────────────────────────────────────
  const sheet = SpreadsheetApp.create(
    'Maximus Energy — v1 UX feedback (responses)',
  );
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // ── Output ─────────────────────────────────────────────────────────────
  const respondent = form.getPublishedUrl();
  const editor = form.getEditUrl();
  const responses = sheet.getUrl();

  Logger.log('— Maximus UX form created —');
  Logger.log('Respondent URL (share with family): ' + respondent);
  Logger.log('Editor URL: ' + editor);
  Logger.log('Responses sheet URL: ' + responses);

  return { respondent, editor, responses };
}
