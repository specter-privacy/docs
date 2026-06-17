export function byId(id) {
  return document.getElementById(id);
}

export function switchTab(tab) {
  document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach((button) => button.classList.remove('active'));

  byId(`panel-${tab}`)?.classList.add('active');
  byId(`tab-${tab}`)?.classList.add('active');
}

export function toggleStep(stepNumber) {
  const step = byId(`step-${stepNumber}`);
  if (!step) return;

  if (step.classList.contains('active')) {
    step.classList.remove('active');
    return;
  }

  openStep(stepNumber);
}

export function openStep(stepNumber) {
  document.querySelectorAll('.step').forEach((step) => step.classList.remove('active'));
  byId(`step-${stepNumber}`)?.classList.add('active');
}

export function setOutputValue(id, text, className = '') {
  const element = byId(id);
  if (!element) return;

  element.textContent = text;
  element.className = `output-value${className ? ` ${className}` : ''}`;
}

const SECRET_MASK = '*'.repeat(48);

// Populate a masked secret field. Stores the real value and renders it hidden
// (asterisks) until the user reveals it with the eye toggle.
export function setSecretValue(id, value) {
  const field = byId(id);
  if (!field) return;

  field.dataset.full = value == null ? '' : String(value);
  field.classList.remove('revealed');

  const hasValue = Boolean(field.dataset.full);

  const toggle = field.querySelector('.secret-toggle');
  if (toggle) {
    toggle.disabled = !hasValue;
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-label', 'Reveal secret key');
  }

  const copy = field.querySelector('.secret-copy');
  if (copy) {
    copy.disabled = !hasValue;
    copy.classList.remove('copied');
  }

  renderSecret(field);
}

export function copySecret(id) {
  const field = byId(id);
  if (!field || !field.dataset.full) return;

  const button = field.querySelector('.secret-copy');
  navigator.clipboard
    .writeText(field.dataset.full)
    .then(() => {
      if (!button) return;
      button.classList.add('copied');
      button.setAttribute('aria-label', 'Copied');
      clearTimeout(button._copyTimer);
      button._copyTimer = setTimeout(() => {
        button.classList.remove('copied');
        button.setAttribute('aria-label', 'Copy secret key');
      }, 1500);
    })
    .catch(() => {});
}

function renderSecret(field) {
  const valueEl = field.querySelector('.secret-value');
  if (!valueEl) return;

  const full = field.dataset.full || '';
  if (!full) {
    valueEl.textContent = '—';
    return;
  }

  valueEl.textContent = field.classList.contains('revealed') ? full : SECRET_MASK;
}

export function toggleSecret(id) {
  const field = byId(id);
  if (!field || !field.dataset.full) return;

  const revealed = field.classList.toggle('revealed');
  const toggle = field.querySelector('.secret-toggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(revealed));
    toggle.setAttribute('aria-label', revealed ? 'Hide secret key' : 'Reveal secret key');
  }

  renderSecret(field);
}

export function truncateHex(hex, maxLength = 60) {
  if (!hex) return '';

  const value = String(hex);
  if (value.length <= maxLength) return value;

  return `${value.slice(0, maxLength)}…`;
}

export function showOutputError(targetId, message) {
  const element = byId(targetId);
  if (!element) return;

  element.textContent = `✕ ${message}`;
  element.className = 'output-value error-text';
}

export function setElementBusy(buttonId, spinnerId, busy) {
  const button = byId(buttonId);
  const spinner = byId(spinnerId);

  if (button) button.disabled = busy;
  if (spinner) spinner.style.display = busy ? 'inline-block' : 'none';
}

export function copyField(id) {
  const element = byId(id);
  if (!element) return;

  const value = element.dataset.full || element.textContent;
  if (value && value !== '—') {
    navigator.clipboard.writeText(value).catch(() => {});
  }
}

export function setInitError(prefix, error) {
  byId('init-status').textContent = `${prefix}: ${error.message}`;
  const badge = byId('init-badge');
  badge.textContent = 'ERROR';
  badge.classList.add('error');
}

export function markSdkReady() {
  byId('init-status').textContent = 'WASM module ready — all crypto runs locally';
  byId('init-badge').textContent = 'READY';
  byId('init-bar').classList.add('ready');
  document.querySelector('.init-icon').textContent = '◉';
  byId('fn-init').classList.add('done');
}

export function wireUiControls(handlers) {
  byId('tab-guided')?.addEventListener('click', () => switchTab('guided'));
  byId('tab-editor')?.addEventListener('click', () => switchTab('editor'));

  document.querySelectorAll('[data-step]').forEach((element) => {
    element.addEventListener('click', () => toggleStep(element.dataset.step));
  });

  document.querySelectorAll('[data-copy-field]').forEach((element) => {
    element.addEventListener('click', () => copyField(element.dataset.copyField));
  });

  document.querySelectorAll('[data-secret-toggle]').forEach((element) => {
    element.addEventListener('click', () => toggleSecret(element.dataset.secretToggle));
  });

  document.querySelectorAll('[data-secret-copy]').forEach((element) => {
    element.addEventListener('click', () => copySecret(element.dataset.secretCopy));
  });

  byId('btn-keygen')?.addEventListener('click', handlers.generateKeys);
  byId('btn-meta')?.addEventListener('click', handlers.buildMetaAddress);
  byId('btn-payment')?.addEventListener('click', handlers.createPayment);
  byId('btn-scan')?.addEventListener('click', handlers.scanAnnouncement);
  byId('btn-batch-scan')?.addEventListener('click', handlers.runBatchScan);
  byId('batch-count')?.addEventListener('input', (event) => {
    byId('batch-count-value').textContent = event.target.value;
  });
  byId('snippet-select')?.addEventListener('change', (event) => handlers.loadSnippet(event.target.value));
  byId('copy-editor')?.addEventListener('click', handlers.copyEditorCode);
  byId('run-code')?.addEventListener('click', handlers.runCode);
  byId('clear-console')?.addEventListener('click', handlers.clearConsole);
}
