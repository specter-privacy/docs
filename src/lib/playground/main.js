import { copyEditorCode, clearConsole, loadSnippet, runCode, wireEditorKeyboard } from './editor.js';
import { buildMetaAddress, createPayment, generateKeys, runBatchScan, scanAnnouncement } from './guided-flow.js';
import { loadSpecterSdk } from './sdk-loader.js';
import { setDomRoot, setSdkModule } from './state.js';
import { PLAYGROUND_TEMPLATE } from './template.js';
import { byId, markSdkReady, setInitError, switchTab, toggleStep, copyField, wireUiControls } from './ui.js';

const PLAYGROUND_MOUNT_ID = 'specter-sdk-playground-root';

const handlers = {
  generateKeys,
  buildMetaAddress,
  createPayment,
  scanAnnouncement,
  runBatchScan,
  loadSnippet,
  copyEditorCode,
  runCode,
  clearConsole,
};

export async function initPlayground(mountTarget) {
  const mount =
    mountTarget ||
    (typeof document !== 'undefined'
      ? document.getElementById(PLAYGROUND_MOUNT_ID)
      : null);
  if (!mount || mount.dataset.ready === 'true') return;

  mount.dataset.ready = 'true';

  const shadowRoot = mount.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = await loadScopedStyles();

  const shell = document.createElement('div');
  shell.innerHTML = PLAYGROUND_TEMPLATE;

  shadowRoot.append(style, shell);
  setDomRoot(shadowRoot);

  installTemporaryGlobals();
  wireUiControls(handlers);
  wireEditorKeyboard();
  await bootstrap();
}

async function bootstrap() {
  let sdk;

  try {
    sdk = await loadSpecterSdk();
  } catch (error) {
    setInitError('Failed to load SDK', error);
    return;
  }

  setSdkModule(sdk);
  installRealGlobals();

  try {
    await sdk.initSpecterSdk();
    markSdkReady();

    byId('btn-keygen').disabled = false;
    byId('btn-payment').disabled = false;
    byId('btn-scan').disabled = false;
    byId('btn-batch-scan').disabled = false;
    loadSnippet('full-flow');
  } catch (error) {
    setInitError('WASM init failed', error);
  }
}

function installTemporaryGlobals() {
  window.switchTab = switchTab;
  window.toggleStep = toggleStep;
  window.copyField = copyField;
  window.loadSnippet = () => {};
  window.copyEditorCode = () => {};
  window.runCode = () => {};
  window.clearConsole = () => {};
}

function installRealGlobals() {
  Object.assign(window, {
    switchTab,
    toggleStep,
    copyField,
    loadSnippet,
    copyEditorCode,
    runCode,
    clearConsole,
    doGenerateKeys: generateKeys,
    doBuildMeta: buildMetaAddress,
    doCreatePayment: createPayment,
    doScanAnnouncement: scanAnnouncement,
    runBatchScan,
  });
}

async function loadScopedStyles() {
  const response = await fetch('/playground-embed/src/styles/main.css');
  const rawCss = await response.text();

  return rawCss
    .replace(/:root/g, ':host')
    .replace(/(^|[\s}])body::before(?=\s*\{)/gm, '$1:host::before')
    .replace(/(^|[\s}])body(?=\s*\{)/gm, '$1:host');
}
