import { test } from 'node:test';
import assert from 'node:assert/strict';
import { smtpErrorDetails } from '../src/lib/smtp-errors';

test('SMTP diagnostics identify authentication failures without credentials or addresses', () => {
  const details = smtpErrorDetails({
    code: 'EAUTH',
    responseCode: 535,
    command: 'AUTH PLAIN',
    message: 'Password secret-password was rejected for customer@example.com',
    response: '535 customer@example.com secret-password',
  });
  assert.deepEqual(details, { code: 'EAUTH', smtpStatus: 535, command: 'AUTH' });
  assert.doesNotMatch(JSON.stringify(details), /secret-password|customer@example.com/);
});

test('SMTP diagnostics distinguish connection and certificate failures and reject arbitrary content', () => {
  for (const code of ['ENOTFOUND', 'ETIMEDOUT', 'ERR_TLS_CERT_ALTNAME_INVALID']) {
    assert.equal(smtpErrorDetails({ code, command: 'CONN' }).code, code);
  }
  assert.deepEqual(
    smtpErrorDetails({
      code: 'secret-password',
      command: 'RCPT TO customer@example.com',
      responseCode: '535',
    }),
    { code: 'SMTP_FAILURE' },
  );
  assert.deepEqual(smtpErrorDetails(null), { code: 'SMTP_FAILURE' });
});
