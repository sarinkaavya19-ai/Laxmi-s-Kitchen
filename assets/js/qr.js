/* ==========================================================================
   QR table card generator
   Uses the vendored qrcode-generator library (MIT).
   ========================================================================== */

(() => {
  "use strict";

  const qrCodeBox = document.getElementById("qr-code");
  const urlInput = document.getElementById("qr-url");
  const urlLabel = document.getElementById("qr-url-label");
  const errorBox = document.getElementById("qr-url-error");
  const statusBox = document.getElementById("qr-status");
  const printButton = document.getElementById("qr-print");
  const pngButton = document.getElementById("qr-png");
  const svgButton = document.getElementById("qr-svg");

  if (!qrCodeBox || !urlInput) return;

  const PLACEHOLDER = "https://YOUR-USERNAME.github.io/laxmis-kitchen/";
  let currentSvg = "";
  let currentQr = null;
  let debounceTimer = null;

  const defaultUrl = () => {
    if (window.location.protocol === "file:") return PLACEHOLDER;

    const path = window.location.pathname.replace(/qr(\.html)?$/i, "");
    return `${window.location.origin}${path || "/"}`;
  };

  const displayUrl = (url) =>
    url.replace(/^https?:\/\//i, "").replace(/\/$/, "");

  const setStatus = (message) => {
    if (statusBox) statusBox.textContent = message;
  };

  const setError = (message) => {
    if (errorBox) errorBox.textContent = message;
    urlInput.setAttribute("aria-invalid", message ? "true" : "false");
  };

  const normalizeUrl = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    try {
      const parsed = new URL(withProtocol);
      if (!["http:", "https:"].includes(parsed.protocol)) return null;
      return parsed.href;
    } catch {
      return null;
    }
  };

  const createQr = (url) => {
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();
    return qr;
  };

  const createSvg = (qr) => {
    const count = qr.getModuleCount();
    const quiet = 4;
    const total = count + quiet * 2;
    let path = "";

    for (let row = 0; row < count; row += 1) {
      for (let column = 0; column < count; column += 1) {
        if (!qr.isDark(row, column)) continue;
        path += `M${column + quiet} ${row + quiet}h1v1h-1z`;
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" role="img" aria-label="QR code linking to the Laxmi’s Kitchen menu" shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="#ffffff"/><path d="${path}" fill="#183d2b"/></svg>`;
  };

  const updateQr = (rawValue) => {
    const url = normalizeUrl(rawValue);

    if (!url) {
      setError("Please enter a full menu link, for example https://your-name.github.io/laxmis-kitchen/");
      return;
    }

    setError("");

    try {
      const qr = createQr(url);
      currentQr = qr;
      currentSvg = createSvg(qr);
      qrCodeBox.innerHTML = currentSvg;
      if (urlLabel) urlLabel.textContent = displayUrl(url);
      setStatus("");
    } catch {
      setError("That link is a little too long for a QR code. Try a shorter address.");
    }
  };

  const downloadBlob = (blob, filename) => {
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  };

  const downloadPng = () => {
    if (!currentQr) return;

    const count = currentQr.getModuleCount();
    const quiet = 4;
    const scale = 16;
    const size = (count + quiet * 2) * scale;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);
    context.fillStyle = "#183d2b";

    for (let row = 0; row < count; row += 1) {
      for (let column = 0; column < count; column += 1) {
        if (!currentQr.isDark(row, column)) continue;
        context.fillRect(
          (column + quiet) * scale,
          (row + quiet) * scale,
          scale,
          scale
        );
      }
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      downloadBlob(blob, "laxmis-kitchen-qr.png");
      setStatus("QR code downloaded as a PNG.");
    }, "image/png");
  };

  const downloadSvg = () => {
    if (!currentSvg) return;
    const blob = new Blob([currentSvg], { type: "image/svg+xml" });
    downloadBlob(blob, "laxmis-kitchen-qr.svg");
    setStatus("QR code downloaded as an SVG.");
  };

  urlInput.value = defaultUrl();
  updateQr(urlInput.value);

  urlInput.addEventListener("input", () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => updateQr(urlInput.value), 220);
  });

  printButton?.addEventListener("click", () => {
    if (!currentQr) return;
    setStatus("Opening the print dialog…");
    window.print();
  });

  pngButton?.addEventListener("click", downloadPng);
  svgButton?.addEventListener("click", downloadSvg);
})();
