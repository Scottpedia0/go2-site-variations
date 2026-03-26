const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdifzWtat63tJj_ov1WkhF2PnvtulJUqI5JYsar4LQMdHRRzQ/formResponse';

const TEAM_SIZE_OPTIONS = new Set(['1-5', '6-15', '16-40', '41-100', '100+']);
const TEAM_FOCUS_OPTIONS = new Set([
  'Customer support / CX',
  'Sales / RevOps',
  'Recruiting / staffing',
  'Back-office ops',
  'Mixed / cross-functional',
  'Other'
]);

function normalizeValue(value, max = 4000) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, max);
}

function deriveNameFromEmail(email) {
  const local = String(email || '').split('@')[0] || '';
  const parts = local
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return { firstName: 'Website', lastName: 'Lead' };
  }

  const normalized = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return {
    firstName: normalized[0] || 'Website',
    lastName: normalized.slice(1).join(' ') || 'Lead'
  };
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch (_error) {
      return {};
    }
  }
  return body;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const body = parseBody(req.body);
  const derivedName = deriveNameFromEmail(body.email);
  const payload = {
    firstName: normalizeValue(body.firstName, 120) || derivedName.firstName,
    lastName: normalizeValue(body.lastName, 120) || derivedName.lastName,
    email: normalizeValue(body.email, 254).toLowerCase(),
    company: normalizeValue(body.company, 180),
    role: normalizeValue(body.role, 180) || 'Not provided',
    teamSize: normalizeValue(body.teamSize, 20),
    teamFocus: normalizeValue(body.teamFocus, 80) || 'Mixed / cross-functional',
    coreTools: normalizeValue(body.coreTools, 500) || 'Discuss on call',
    messyWorkflow: normalizeValue(body.messyWorkflow, 4000),
    betterState: normalizeValue(body.betterState, 4000) || 'Discuss on Workflow Discovery Call',
    sensitiveNotes: normalizeValue(body.sensitiveNotes, 4000)
  };

  const missing = [
    ['email', payload.email],
    ['company', payload.company],
    ['teamSize', payload.teamSize],
    ['messyWorkflow', payload.messyWorkflow]
  ]
    .filter(([, value]) => !value)
    .map(([field]) => field);

  if (missing.length) {
    res.status(400).json({ ok: false, error: 'missing_fields', missing });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    res.status(400).json({ ok: false, error: 'invalid_email' });
    return;
  }

  if (!TEAM_SIZE_OPTIONS.has(payload.teamSize)) {
    res.status(400).json({ ok: false, error: 'invalid_team_size' });
    return;
  }

  if (!TEAM_FOCUS_OPTIONS.has(payload.teamFocus)) {
    payload.teamFocus = 'Mixed / cross-functional';
  }

  try {
    const formData = new URLSearchParams();
    formData.set('emailAddress', payload.email);
    formData.set('entry.982762131', payload.firstName);
    formData.set('entry.438821150', payload.lastName);
    formData.set('entry.245411494', payload.company);
    formData.set('entry.1026952506', payload.role);
    formData.set('entry.116659962', payload.teamSize);
    formData.set('entry.2128774896', payload.teamFocus);
    formData.set('entry.1245866580', payload.coreTools);
    formData.set('entry.1732085532', payload.messyWorkflow);
    formData.set('entry.92099931', payload.betterState);
    formData.set('entry.1685126233', payload.sensitiveNotes);
    formData.set('fvv', '1');
    formData.set('pageHistory', '0');

    const upstream = await fetch(GOOGLE_FORM_ACTION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formData.toString(),
      redirect: 'follow'
    });

    const responseText = await upstream.text();
    const success =
      upstream.ok &&
      /Your response has been recorded|Submit another response/i.test(responseText);

    if (!success) {
      throw new Error('google_form_submit_failed');
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('SMB intake submit failed', error);
    res.status(502).json({ ok: false, error: 'submit_failed' });
  }
};
