import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isSameOrigin, parseContact } from '../src/lib/contact.ts';

const form = (fields: Record<string, string>) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
};

test('accepts a valid message and collapses whitespace in the name', () => {
  const r = parseContact(
    form({
      name: '  Ada \r\n Lovelace ',
      email: 'ada@example.com',
      topic: 'consulting',
      message: 'Hello there, a platform question.',
    }),
  );
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.name, 'Ada Lovelace');
    assert.equal(r.value.topic, 'consulting');
  }
});

test('defaults the topic to a role', () => {
  const r = parseContact(form({ name: 'A', email: 'a@b.co', message: 'long enough message' }));
  assert.ok(r.ok && r.value.topic === 'role');
});

test('reports every bad field at once', () => {
  const r = parseContact(form({ name: '', email: 'nope', topic: 'spam', message: 'hi' }));
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.equal(r.status, 422);
    assert.deepEqual(Object.keys(r.fields ?? {}).sort(), ['email', 'message', 'name', 'topic']);
  }
});

test('rejects over-long messages', () => {
  const r = parseContact(form({ name: 'A', email: 'a@b.co', message: 'x'.repeat(5001) }));
  assert.ok(!r.ok && r.fields?.message);
});

test('origin check: self, site host and localhost only', () => {
  const url = 'https://sujal-portfolio.example.workers.dev/api/contact';
  assert.equal(
    isSameOrigin('https://sujal-portfolio.example.workers.dev', url, 'sujal.datasparta.com'),
    true,
  );
  assert.equal(isSameOrigin('https://sujal.datasparta.com', url, 'sujal.datasparta.com'), true);
  assert.equal(isSameOrigin('http://localhost:4321', url, 'sujal.datasparta.com'), true);
  assert.equal(isSameOrigin('https://evil.example', url, 'sujal.datasparta.com'), false);
  assert.equal(isSameOrigin(null, url, 'sujal.datasparta.com'), false);
  assert.equal(isSameOrigin('not a url', url, 'sujal.datasparta.com'), false);
});
