/**
 * Utility to reliably download the project ZIP archive even inside sandboxed iframes.
 * Uses Base64 JSON fetching to avoid browser iframe download blocks or 0-byte truncations.
 */
export async function downloadProjectArchive(
  onProgress?: (status: 'fetching' | 'ready' | 'error', message?: string) => void
): Promise<boolean> {
  try {
    onProgress?.('fetching', 'Preparing 143 KB archive...');

    // 1. Fetch base64 data to guarantee non-zero payload
    const response = await fetch('/api/download-zip-base64');
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data.ok || !data.base64) {
      throw new Error(data.error || 'Empty archive data received');
    }

    // 2. Decode Base64 into binary Uint8Array
    const binaryString = window.atob(data.base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 3. Create Blob with verified size
    const blob = new Blob([bytes], { type: 'application/zip' });
    if (blob.size < 50000) {
      throw new Error(`Archive size check failed (${blob.size} bytes)`);
    }

    // 4. Trigger download
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = data.filename || 'diplomatscholar-source.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 60000);

    onProgress?.('ready', `Saved ${data.sizeFormatted || '143 KB'} successfully!`);
    return true;
  } catch (err: any) {
    console.error('Download error:', err);
    onProgress?.('error', err.message || 'Failed to download');
    // Fallback: try opening in a new tab directly
    window.open('/api/download-zip', '_blank');
    return false;
  }
}
