"use strict";

const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const $ = (id) => document.getElementById(id);
const vyGalleri = $("vy-galleri");
const vyVisare = $("vy-visare");

let ventiler = [];
let kv = {}; // { <id>: { granskad, kalla, notering, tabeller: [...] } }
let kategori = "alla"; // vald flik, behålls när man går tillbaka från visaren
let galleriScroll = 0;
let franGalleri = false; // true om vi navigerade till visaren från galleriet inne i appen

function el(tag, klass, text) {
  const e = document.createElement(tag);
  if (klass) e.className = klass;
  if (text !== undefined) e.textContent = text;
  return e;
}

// ---- Galleri ----

function titel(v) {
  return `${v.fabrikat} – ${v.modell}`;
}

function ritaGalleri() {
  const lista = ventiler.filter((v) => kategori === "alla" || v.kategori === kategori);
  const galleri = $("galleri");
  galleri.replaceChildren();
  for (const v of lista) {
    const kort = el("button", "kort");
    kort.type = "button";
    const forsta = v.bilder && v.bilder[0];
    if (forsta) {
      const bild = el("img");
      bild.src = forsta;
      bild.alt = titel(v);
      bild.loading = "lazy";
      kort.append(bild);
    } else {
      kort.append(el("div", "bildplats", "Bild saknas"));
    }
    kort.append(el("span", "", titel(v)));
    kort.addEventListener("click", () => {
      galleriScroll = window.scrollY;
      franGalleri = true;
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

// ---- kv-sektion ----

function ritaKv(v) {
  const sek = $("kv-sektion");
  sek.replaceChildren();
  const data = kv[v.id];
  const tabeller = data && Array.isArray(data.tabeller) ? data.tabeller : [];
  if (!tabeller.length) {
    sek.append(el("p", "kv-saknas", "kv-tabell saknas – läs av i produktbladet nedan."));
    return;
  }
  if (data.granskad !== true) {
    const b = el("div", "varning", "Ej granskad – kontrollera mot produktbladet");
    b.setAttribute("role", "alert");
    sek.append(b);
  }
  for (const t of tabeller) {
    const block = el("div", "kv-block");
    if (t.rubrik) block.append(el("h3", "", t.rubrik));
    const ram = el("div", "tabell-ram");
    const tabell = el("table", "kv-tabell");
    if (Array.isArray(t.kolumner) && t.kolumner.length) {
      const thead = el("thead");
      const tr = el("tr");
      for (const k of t.kolumner) {
        const th = el("th", "", k);
        th.scope = "col";
        tr.append(th);
      }
      thead.append(tr);
      tabell.append(thead);
    }
    const tbody = el("tbody");
    for (const rad of Array.isArray(t.rader) ? t.rader : []) {
      const tr = el("tr");
      rad.forEach((cell, i) => {
        if (i === 0) {
          const th = el("th", "", cell);
          th.scope = "row";
          tr.append(th);
        } else {
          tr.append(el("td", "", cell));
        }
      });
      tbody.append(tr);
    }
    tabell.append(tbody);
    ram.append(tabell);
    block.append(ram);
    sek.append(block);
  }
  if (data.kalla) sek.append(el("p", "liten", `Källa: ${data.kalla}`));
  if (data.notering) sek.append(el("p", "liten", data.notering));
}

// ---- Foton ----

function ritaFoton(v) {
  const sek = $("foton");
  sek.replaceChildren();
  const bilder = v.bilder || [];
  sek.hidden = bilder.length < 2;
  if (bilder.length < 2) return;
  const remsa = el("div", "fotoremsa");
  bilder.forEach((src, i) => {
    const img = el("img");
    img.src = src;
    img.alt = `${titel(v)} (bild ${i + 1})`;
    img.loading = "lazy";
    remsa.append(img);
  });
  sek.append(remsa);
}

// ---- PDF-visare (lazy, sekventiell rendering) ----

let pdfState = null; // { pdf, gen, sidor: [{ruta, n, klar}], obs, bredd, kö, task }

function stoppPdf() {
  if (!pdfState) return;
  const s = pdfState;
  pdfState = null;
  s.gen++;
  if (s.obs) s.obs.disconnect();
  if (s.task) { try { s.task.cancel(); } catch (e) { /* redan klar */ } }
  if (s.pdf) s.pdf.destroy().catch(() => {});
}

async function ritaSida(s, sida) {
  if (pdfState !== s || sida.klar) return;
  const gen = s.gen;
  const page = await s.pdf.getPage(sida.n);
  if (pdfState !== s || gen !== s.gen) return;
  const bredd = $("sidor").clientWidth;
  if (!bredd) return;
  const skala = bredd / page.getViewport({ scale: 1 }).width;
  const vp = page.getViewport({ scale: skala * (window.devicePixelRatio || 1) });
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(vp.width);
  canvas.height = Math.floor(vp.height);
  const task = page.render({ canvasContext: canvas.getContext("2d"), viewport: vp });
  s.task = task;
  try {
    await task.promise;
  } catch (err) {
    if (err && err.name === "RenderingCancelledException") return;
    throw err;
  } finally {
    if (s.task === task) s.task = null;
  }
  if (pdfState !== s || gen !== s.gen) return;
  sida.ruta.style.aspectRatio = `${canvas.width} / ${canvas.height}`;
  sida.ruta.replaceChildren(canvas);
  sida.klar = true;
}

function observera(s) {
  if (s.obs) s.obs.disconnect();
  s.obs = new IntersectionObserver((poster) => {
    for (const p of poster) {
      if (!p.isIntersecting) continue;
      const sida = s.sidor.find((x) => x.ruta === p.target);
      s.obs.unobserve(p.target);
      if (!sida || sida.klar) continue;
      const gen = s.gen;
      s.kö = s.kö
        .then(() => (gen === s.gen ? ritaSida(s, sida) : undefined))
        .catch((err) => console.error(err));
    }
  }, { rootMargin: "800px 0px" });
  for (const sida of s.sidor) if (!sida.klar) s.obs.observe(sida.ruta);
}

function omRitaPdf() {
  const s = pdfState;
  if (!s || vyVisare.hidden) return;
  const bredd = $("sidor").clientWidth;
  if (!bredd || bredd === s.bredd) return;
  s.bredd = bredd;
  s.gen++; // gör köade renderingar inaktuella
  if (s.task) { try { s.task.cancel(); } catch (e) { /* redan klar */ } }
  for (const sida of s.sidor) {
    sida.klar = false;
    sida.ruta.replaceChildren();
    sida.ruta.style.aspectRatio = s.forhall;
  }
  s.kö = Promise.resolve();
  observera(s);
}

let resizeTimer = 0;
function vidResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(omRitaPdf, 250);
}
window.addEventListener("resize", vidResize);
window.addEventListener("orientationchange", vidResize);

async function visaPdf(v) {
  stoppPdf();
  const sidor = $("sidor");
  const status = $("visare-status");
  sidor.replaceChildren();
  status.className = "";
  if (!v.produktblad) {
    status.textContent = "Produktblad saknas";
    status.className = "saknas";
    status.hidden = false;
    $("pdf-lank").parentElement.hidden = true;
    return;
  }
  $("pdf-lank").href = v.produktblad;
  $("pdf-lank").parentElement.hidden = false;
  status.textContent = "Laddar produktblad…";
  status.hidden = false;

  const s = { pdf: null, gen: 0, sidor: [], obs: null, bredd: sidor.clientWidth, kö: Promise.resolve(), task: null, forhall: "1 / 1.414" };
  pdfState = s;
  try {
    if (!window.pdfjsLib) throw new Error("PDF.js kunde inte laddas");
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    const pdf = await pdfjsLib.getDocument(v.produktblad).promise;
    if (pdfState !== s) { pdf.destroy().catch(() => {}); return; }
    s.pdf = pdf;
    const f = await pdf.getPage(1);
    if (pdfState !== s) return;
    const vp = f.getViewport({ scale: 1 });
    s.forhall = `${vp.width} / ${vp.height}`;
    for (let n = 1; n <= pdf.numPages; n++) {
      const ruta = el("div", "pdf-sida");
      ruta.style.aspectRatio = s.forhall;
      sidor.append(ruta);
      s.sidor.push({ ruta, n, klar: false });
    }
    status.hidden = true;
    observera(s);
  } catch (err) {
    if (pdfState !== s) return;
    console.error(err);
    status.className = "fel";
    status.textContent = "Det gick inte att visa produktbladet. Försök igen eller öppna PDF:en i en ny flik.";
    status.hidden = false;
  }
}

function visaVentil(v) {
  $("visare-titel").textContent = titel(v);
  ritaKv(v);
  ritaFoton(v);
  visaPdf(v);
}

// ---- Routing via URL-hash ----

function route() {
  const m = location.hash.match(/^#ventil\/(.+)$/);
  const v = m && ventiler.find((x) => x.id === decodeURIComponent(m[1]));
  if (v) {
    vyGalleri.hidden = true;
    vyVisare.hidden = false;
    window.scrollTo(0, 0);
    visaVentil(v);
  } else {
    stoppPdf();
    franGalleri = false;
    vyVisare.hidden = true;
    vyGalleri.hidden = false;
    window.scrollTo(0, galleriScroll);
  }
}

$("tillbaka").addEventListener("click", () => {
  // Bara om vi kom från galleriet inne i appen går vi bak i historiken; annars (direktlänk) töm hashen.
  if (franGalleri) history.back();
  else location.hash = "";
});

window.addEventListener("hashchange", route);

async function hamtaJson(url, krav) {
  try {
    const svar = await fetch(url);
    if (!svar.ok) throw new Error(`${url}: ${svar.status}`);
    return await svar.json();
  } catch (err) {
    if (krav) throw err;
    console.warn(err);
    return null;
  }
}

async function start() {
  try {
    const [lista, kvData] = await Promise.all([
      hamtaJson("data/ventiler.json", true),
      hamtaJson("data/kv.json", false),
    ]);
    ventiler = lista;
    kv = kvData && typeof kvData === "object" ? kvData : {};
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
