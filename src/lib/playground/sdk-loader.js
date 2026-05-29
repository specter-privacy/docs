const SDK_URLS = [
  'https://cdn.jsdelivr.net/npm/@specterpq/sdk@0.2.0/dist/index.js',
  'https://unpkg.com/@specterpq/sdk@0.2.0/dist/index.js',
];

async function importExternalModule(url) {
  const blob = new Blob([`export * from ${JSON.stringify(url)};`], {
    type: 'text/javascript',
  });
  const blobUrl = URL.createObjectURL(blob);

  try {
    return await import(/* webpackIgnore: true */ blobUrl);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

export async function loadSpecterSdk() {
  let lastError;

  for (const url of SDK_URLS) {
    try {
      return await importExternalModule(url);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
