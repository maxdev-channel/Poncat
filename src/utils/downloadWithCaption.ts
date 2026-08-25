export interface CaptionOptions {
  imageUrl: string;
  topText?: string;
  bottomText?: string;
  badgeText?: string;
  filename?: string;
  fontFamily?: string;
  topColor?: string;
  bottomColor?: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export async function downloadImageWithCaption(options: CaptionOptions): Promise<boolean> {
  const {
    imageUrl,
    topText = '',
    bottomText = '',
    badgeText = '$PONCAT',
    filename = `poncat-image-${Date.now()}.png`,
    fontFamily = 'Impact, sans-serif',
    topColor = '#FFFFFF',
    bottomColor = '#FFD700',
    fontSize = 'md',
  } = options;

  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font loading errors
    }
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  let loadedImg: HTMLImageElement | null = null;
  let objectUrlToRevoke: string | null = null;

  // Try fetching image via server proxy first to prevent canvas taint
  if (imageUrl.startsWith('http')) {
    try {
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
      const resp = await fetch(proxyUrl);
      if (resp.ok) {
        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        objectUrlToRevoke = blobUrl;

        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = blobUrl;
        });
        loadedImg = img;
      }
    } catch (err) {
      console.warn('Server proxy fetch failed, trying direct CORS load:', err);
    }
  }

  // Fallback to direct HTMLImageElement
  if (!loadedImg) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });
      loadedImg = img;
    } catch (err) {
      console.warn('Direct crossOrigin image load failed:', err);
    }
  }

  const width = loadedImg?.naturalWidth || 1200;
  const height = loadedImg?.naturalHeight || 1200;
  canvas.width = width;
  canvas.height = height;

  // 1. Draw image or fallback background
  if (loadedImg) {
    ctx.drawImage(loadedImg, 0, 0, width, height);
  } else {
    // Fallback 8-bit dark green themed background frame if image is blocked
    ctx.fillStyle = '#0a140d';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00C805';
    ctx.fillRect(20, 20, width - 40, height - 40);
    ctx.fillStyle = '#101c14';
    ctx.fillRect(28, 28, width - 56, height - 56);
  }

  if (objectUrlToRevoke) {
    URL.revokeObjectURL(objectUrlToRevoke);
  }

  // 2. Prepare typography font size
  let baseFontSize = width * 0.075;
  if (fontSize === 'sm') baseFontSize = width * 0.05;
  if (fontSize === 'lg') baseFontSize = width * 0.095;
  if (fontSize === 'xl') baseFontSize = width * 0.115;

  const drawTextLine = (text: string, yPos: number, fillStyle: string, isBottom: boolean) => {
    if (!text || !text.trim()) return;

    ctx.save();
    ctx.font = `900 ${baseFontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.max(4, baseFontSize * 0.18);
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = baseFontSize * 0.25;

    const words = text.toUpperCase().trim().split(/\s+/);
    let line = '';
    const lines: string[] = [];
    const maxWidth = width * 0.88;

    for (let n = 0; n < words.length; n++) {
      const testLine = line ? line + ' ' + words[n] : words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n];
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);

    const lineHeight = baseFontSize * 1.2;
    let startY = yPos;
    if (isBottom) {
      startY = yPos - (lines.length - 1) * lineHeight;
    }

    lines.forEach((l, idx) => {
      const curY = startY + idx * lineHeight;
      ctx.strokeText(l, width / 2, curY);
      ctx.fillText(l, width / 2, curY);
    });

    ctx.restore();
  };

  if (topText) {
    drawTextLine(topText, height * 0.13, topColor, false);
  }

  if (bottomText) {
    drawTextLine(bottomText, height * 0.86, bottomColor, true);
  }

  // 3. Draw Brand Badge / Watermark Tag
  if (badgeText) {
    ctx.save();
    const badgeFontSize = Math.max(14, width * 0.032);
    ctx.font = `900 ${badgeFontSize}px monospace`;
    const textMetrics = ctx.measureText(badgeText);
    const badgePadding = width * 0.015;
    const badgeW = textMetrics.width + badgePadding * 2;
    const badgeH = badgeFontSize * 1.6;
    const badgeX = width * 0.03;
    const badgeY = height * 0.92 - badgeH / 2;

    ctx.fillStyle = '#00C805';
    ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.max(2, width * 0.004);
    ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);

    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, badgeX + badgePadding, badgeY + badgeH / 2);
    ctx.restore();
  }

  // Export & trigger browser file download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
}
