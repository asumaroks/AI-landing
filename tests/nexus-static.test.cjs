const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
test('v1 exists as a complete standalone HTML document', () => {
  assert.ok(fs.existsSync(path.join(root, 'nexus-landing-v1.html')), 'NEXUS v1 HTML is missing');
  const html = fs.readFileSync(path.join(root, 'nexus-landing-v1.html'), 'utf8');
  assert.match(html, /<!DOCTYPE html>/i);
  assert.match(html, /<\/html>/);
  assert.doesNotMatch(html, /placeholder|real data needed|\[image|\[icon|\[logo|\bTBD\b|70%|SOC.?2|GDPR|99\.9%|encryption|href="\/dashboard|href="\/privacy/i);
  for (const id of ['demo', 'features', 'integrations', 'cta']) assert.match(html, new RegExp(`id="${id}"`));
  for (const agent of ['Planner', 'Researcher', 'Executor', 'Reviewer']) assert.ok(html.includes(agent));
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /Illustrative demo/);
});
test('approved v0 remains byte-identical', () => {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'nexus-landing-v0.html'))).digest('hex').toUpperCase();
  assert.equal(hash, '3D3EF6F82E552ED933524F41361BD778DEE1EC2E356DF6D0BAF7168D5FAA62CE');
});
