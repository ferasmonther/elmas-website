const safeCodes = new Set([
  'EAUTH',
  'ESOCKET',
  'ECONNECTION',
  'ETIMEDOUT',
  'ENOTFOUND',
  'EAI_AGAIN',
  'ECONNREFUSED',
  'ECONNRESET',
  'EENVELOPE',
  'EMESSAGE',
  'EPROTOCOL',
  'ETLS',
  'CERT_HAS_EXPIRED',
  'DEPTH_ZERO_SELF_SIGNED_CERT',
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  'ERR_TLS_CERT_ALTNAME_INVALID',
]);
const safeCommands = new Set([
  'CONN',
  'EHLO',
  'HELO',
  'STARTTLS',
  'AUTH',
  'MAIL FROM',
  'RCPT TO',
  'DATA',
]);

// Never log the raw error: SMTP responses can contain addresses or credentials.
export function smtpErrorDetails(error: unknown) {
  const value = error && typeof error === 'object' ? (error as Record<string, unknown>) : {};
  const code =
    typeof value.code === 'string' && safeCodes.has(value.code) ? value.code : 'SMTP_FAILURE';
  const command = typeof value.command === 'string' ? value.command.split(' ')[0] : '';
  return {
    code,
    ...(typeof value.responseCode === 'number' &&
    Number.isInteger(value.responseCode) &&
    value.responseCode >= 400 &&
    value.responseCode <= 599
      ? { smtpStatus: value.responseCode }
      : {}),
    ...(command === 'AUTH'
      ? { command: 'AUTH' }
      : typeof value.command === 'string' && safeCommands.has(value.command)
        ? { command: value.command }
        : {}),
  };
}
