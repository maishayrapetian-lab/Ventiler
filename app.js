"use strict";

const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const $ = (id) => document.getElementById(id);
const vyGalleri = $("vy-galleri");
const vyVisare = $("vy-visare");

let ventiler = [];
let kategori = "alla"; // vald flik, behålls när man går tillbaka från visaren
let galleriScroll = 0;
let renderId = 0; // avbryter pågående PDF-rendering när man lämnar visaren

// ---- Galleri ----

function titel(v) {
  return `${v.fabrikat} – ${v.modell}`;
}

function ritaGalleri() {
  const lista = ventiler.filter((v) => kategori === "alla" || v.kategori === kategori);
  const galleri = $("galleri");
  galleri.replaceChildren();
  for (const v of lista) {
    const kort = document.createElement("button");
    kort.type = "button";
    kort.className = "kort";
    const bild = document.createElement("img");
    bild.src = v.bild;
    bild.alt = titel(v);
    bild.loading = "lazy";
    const text = document.createElement("span");
    text.textContent = titel(v);
    kort.append(bild, text);
    kort.addEventListener("click", () => {
      galleriScroll = window.scrollY;
      location.hash = `#ventil/${encodeURIComponent(v.id)}`;
    });
    galleri.append(kort);
  }
  $("status").hidden = lista.length > 0;
  if (!lista.length) $("status").textContent = "Inga ventiler i den här kategorin.";
  for (const knapp of document.querySelectorAll("#flikar button")) {
    knapp.setAttribute("aria-pressed", String(knapp.dataset.kategori === kategori));
  }
}

$("flikar").addEventListener("click", (e) => {
  const knapp = e.target.closest("button[data-kategori]");
  if (!knapp) return;
  kategori = knapp.dataset.kategori;
  ritaGalleri();
});

// ---- PDF-visare ----

async function visaPdf(v) {
  const id = ++renderId;
  const sidor = $("sidor");
  const status = $("visare-status");
  $("visare-titel").textContent = titel(v);
  $("pdf-lank").href = v.produktblad;
  sidor.replaceChildren();
  status.className = "";
  status.textContent = "Laddar produktblad…";
  status.hidden = false;

  try {
    if (!window.pdfjsLib) throw new Error("PDF.js kunde inte laddas");
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    const pdf = await pdfjsLib.getDocument(v.produktblad).promise;
    const bredd = sidor.clientWidth;
    const skarpa = window.devicePixelRatio || 1;
    for (let n = 1; n <= pdf.numPages; n++) {
      const sida = await pdf.getPage(n);
      if (id !== renderId) return;
      const skala = bredd / sida.getViewport({ scale: 1 }).width;
      const vp = sida.getViewport({ scale: skala * skarpa });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(vp.width);
      canvas.height = Math.floor(vp.height);
      sidor.append(canvas);
      await sida.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
      if (id !== renderId) return;
      status.hidden = true;
    }
  } catch (err) {
    if (id !== renderId) return;
    console.error(err);
    status.className = "fel";
    status.textContent = "Det gick inte att visa produktbladet. Försök igen eller öppna PDF:en i en ny flik.";
    status.hidden = false;
  }
}

// ---- Routing via URL-hash ----

function route() {
  const m = location.hash.match(/^#ventil\/(.+)$/);
  const v = m && ventiler.find((x) => x.id === decodeURIComponent(m[1]));
  if (v) {
    vyGalleri.hidden = true;
    vyVisare.hidden = false;
    window.scrollTo(0, 0);
    visaPdf(v);
  } else {
    renderId++;
    vyVisare.hidden = true;
    vyGalleri.hidden = false;
    window.scrollTo(0, galleriScroll);
  }
}

$("tillbaka").addEventListener("click", () => {
  // Har vi kommit från galleriet: gå bak i historiken; annars (direktlänk) töm hashen.
  if (history.length > 1) history.back();
  else location.hash = "";
});

window.addEventListener("hashchange", route);

async function start() {
  try {
    const svar = await fetch("data/ventiler.json");
    if (!svar.ok) throw new Error(svar.status);
    ventiler = await svar.json();
  } catch (err) {
    console.error(err);
    $("status").className = "fel";
    $("status").textContent = "Kunde inte läsa in ventillistan.";
    return;
  }
  ritaGalleri();
  route();
}

start();