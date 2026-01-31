const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

qs("#year").textContent = new Date().getFullYear();

/* Mobile nav */
const toggle = qs(".nav-toggle");
const nav = qs("#nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  qsa("#nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

/* Reveal */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
}, { threshold: 0.12 });
qsa(".reveal").forEach(el => io.observe(el));

/* Counters */
const animateCounter = (el, to) => {
  const dur = 800;
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = String(Math.floor(to * p));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const to = Number(el.getAttribute("data-counter"));
    if (!Number.isFinite(to) || el.dataset.done === "1") return;
    el.dataset.done = "1";
    animateCounter(el, to);
  });
}, { threshold: 0.6 });
qsa("[data-counter]").forEach(el => counterIO.observe(el));

/* i18n */
const dict = {
  es: {
    skip:"Saltar al contenido",
    wa_float:"WhatsApp",
    lang_label:"Idioma",
    nav_menu:"Menú",
    nav_services:"Servicios",
    nav_process:"Cómo trabajamos",
    nav_industries:"Sectores",
    nav_cases:"Casos",
    nav_contact:"Contacto",
    hero_eyebrow:"Consultoría de Negocios Internacionales e Importación • Colombia & LatAm",
    hero_h1:"Importa con seguridad, costos claros y cumplimiento desde el día 1.",
    hero_lead:"Diagnóstico, proveedores, documentación, logística e internacionalización con acompañamiento end-to-end.",
    cta_schedule:"Agendar llamada",
    cta_quote:"Cotizar importación",
    cta_whatsapp:"Hablar por WhatsApp",
    trust_1:"Respuesta en 24h hábiles",
    trust_2:"Diagnóstico inicial para definir viabilidad, costos y tiempos",
    trust_3:"Atención nacional y remota desde Cúcuta",
    vp_1_t:"Decisiones con datos",
    vp_1_d:"Te damos escenarios de costo/tiempo/riesgo con supuestos claros para que puedas decidir rápido.",
    vp_2_t:"Cumplimiento primero",
    vp_2_d:"Checklist y revisión previa para reducir inconsistencias documentales y contingencias.",
    metric_1:"Escenarios de costos (según info disponible)",
    metric_2:"Proceso en 4 pasos, sin improvisación",
    metric_3a:"End-to-end",
    metric_3b:"Estrategia → ejecución → seguimiento",
    panel_cta_text:"Agenda una llamada diagnóstica y define tu siguiente paso.",
    services_h2:"Servicios",
    services_p:"Módulos claros para importar con seguridad o expandirte a nuevos mercados.",
    see_detail:"Ver detalle",
    svc_1_t:"Diagnóstico y estrategia de importación",
    svc_1_d:"Viabilidad, cronograma, riesgos y plan de acción. Ideal para iniciar o corregir rumbo.",
    svc_1_b1:"Entregable: mapa de ruta + checklist de información.",
    svc_1_b2:"Incluye: escenarios de costos y tiempos por alternativa.",
    svc_2_t:"Búsqueda y verificación de proveedores",
    svc_2_d:"Reduce el riesgo antes de negociar, pagar o producir.",
    svc_2_b1:"Filtro: capacidad, tiempos, documentación y referencias (placeholder).",
    svc_2_b2:"Apoyo en negociación: hitos y condiciones recomendadas.",
    svc_3_t:"Gestión documental y compliance",
    svc_3_d:"Documentos críticos, coherencia y trazabilidad para minimizar contingencias.",
    svc_3_b1:"Checklist por tipo de mercancía (según caso).",
    svc_3_b2:"Revisión previa de consistencia para evitar retrabajos.",
    svc_4_t:"Logística y coordinación",
    svc_4_d:"Incoterms, transporte, seguros y coordinación con aliados para control por hitos.",
    svc_4_b1:"Definición de responsabilidades y puntos de control.",
    svc_4_b2:"Seguimiento del tránsito (según alcance).",
    svc_5_t:"Costeo y optimización",
    svc_5_d:"Estructura de costos completa para comparar alternativas y decidir con claridad.",
    svc_5_b1:"Escenarios: variaciones por flete, Incoterm y tiempos.",
    svc_5_b2:"Optimización: puntos de ahorro y riesgos de sobrecostos.",
    svc_6_t:"Consultoría de internacionalización",
    svc_6_d:"Entrada a nuevos mercados: estrategia, partners y validación comercial.",
    svc_6_b1:"Mapa de mercado (placeholder por país/sector).",
    svc_6_b2:"Due diligence comercial y criterios de partner.",
    how_h2:"Cómo trabajamos",
    how_p:"Un método simple, medible y orientado a decisión y ejecución.",
    how_1_t:"Descubrimiento",
    how_1_d:"Definimos producto, origen/destino, volumen, restricciones y objetivo.",
    how_2_t:"Plan",
    how_2_d:"Checklist, estrategia e hitos con tiempos estimados y responsables.",
    how_3_t:"Ejecución",
    how_3_d:"Coordinación con proveedor, documentos y logística según el alcance.",
    how_4_t:"Seguimiento",
    how_4_d:"Control por hitos, alertas y cierre con recomendaciones para la siguiente operación.",
    ind_h2:"Sectores atendidos",
    ind_p:"Ejemplos de categorías donde aplicamos controles, costeo y compliance (placeholder según tu foco).",
    ind_1:"Retail y e-commerce",
    ind_d1:"Optimiza costos unitarios, tiempos y rotación con escenarios y control documental.",
    ind_2:"Tecnología y accesorios",
    ind_d2:"Verificación de proveedor, especificaciones y riesgos de garantía (placeholder).",
    ind_3:"Repuestos y autopartes",
    ind_d3:"Control de referencias, compatibilidad y estructura de costos para importación recurrente.",
    ind_4:"Textil y confección",
    ind_d4:"Planificación por temporadas, control de tiempos y documentación del producto.",
    ind_5:"Alimentos no perecederos",
    ind_d5:"Requisitos, etiquetado y control de riesgos (según mercancía).",
    ind_6:"Hogar / Ferretería / Industrial liviano",
    ind_d6:"Estandariza compras internacionales con proveedores confiables y costos controlados.",
    cases_h2:"Casos de éxito",
    cases_p:"Historias tipo (placeholders) para mostrar el estilo de trabajo y el valor entregado.",
    case_t1:"Retail: costeo y control antes de embarcar",
    case_d1:"Se organizó el costeo por escenarios y se corrigieron inconsistencias documentales antes del envío, mejorando la visibilidad de costos.",
    case_1_sig:"<strong>M.G.</strong>, Retail (Bogotá)",
    case_t2:"Tecnología: verificación de proveedor",
    case_d2:"Se definieron hitos de verificación y condiciones recomendadas antes del pago, reduciendo incertidumbre y mejorando la negociación.",
    case_2_sig:"<strong>L.P.</strong>, Tecnología (Medellín)",
    case_t3:"Repuestos: proceso repetible por hitos",
    case_d3:"Se implementó checklist y seguimiento por etapas para convertir importaciones aisladas en un proceso controlado y escalable.",
    case_3_sig:"<strong>C.R.</strong>, Repuestos (Cali)",
    contact_h2:"Contacto",
    contact_p:"Cuéntanos qué quieres importar o a qué mercado quieres entrar. Te respondemos en 24h hábiles.",
    contact_fast:"Vías rápidas",
    contact_form:"Formulario",
    contact_base:"<strong>Base:</strong> Cúcuta, Norte de Santander (atención nacional y remota)",
    f_name:"Nombre y apellido",
    f_company:"Empresa",
    f_country:"País",
    f_phone:"Teléfono",
    f_email:"Email",
    f_service:"Tipo de servicio",
    f_service_0:"Selecciona una opción",
    f_service_1:"Diagnóstico y estrategia",
    f_service_2:"Verificación de proveedores",
    f_service_3:"Documental y compliance",
    f_service_4:"Logística y coordinación",
    f_service_5:"Costeo y optimización",
    f_service_6:"Internacionalización",
    f_message:"Mensaje",
    f_message_ph:"Ej.: Producto, origen, cantidad aproximada, urgencia, si ya tienes proveedor…",
    f_privacy:"Acepto la política de privacidad (placeholder).",
    f_submit:"Enviar y solicitar diagnóstico",
    footer_loc:"Cúcuta, Norte de Santander • Atención nacional y remota",
    footer_links:"Enlaces",
    footer_legal:"Legal",
    footer_privacy:"Política de privacidad (placeholder)",
    footer_notice:"Aviso legal (placeholder)",
    footer_rights:"Todos los derechos reservados.",
    err_name:"Por favor escribe tu nombre.",
    err_company:"Por favor escribe el nombre de tu empresa.",
    err_country:"Por favor indica tu país.",
    err_phone:"Por favor indica un teléfono de contacto.",
    err_email:"Por favor escribe un email válido.",
    err_service:"Selecciona un tipo de servicio.",
    err_message:"Cuéntanos un poco más (mín. 10 caracteres).",
    err_privacy:"Debes aceptar la política de privacidad.",
    err_fix:"Revisa los campos marcados para poder enviar.",
    form_ok:"¡Listo! Recibimos tu solicitud. Te responderemos en 24h hábiles (placeholder sin backend)."
  }
};

/* For now: if you want EN/PT/FR, I can paste the full dicts too. */
function getLang(){ return localStorage.getItem("tt_lang") || "es"; }
function setLang(lang){ localStorage.setItem("tt_lang", lang); }

function applyLang(lang){
  setLang(lang);
  document.documentElement.setAttribute("lang", lang); // recommended use of lang [web:33]

  const pack = dict[lang] || dict.es;

  qsa("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (pack[key]) el.innerHTML = pack[key];
  });

  qsa("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (pack[key]) el.setAttribute("placeholder", pack[key]);
  });
}

const langSelect = qs("#langSelect");
const initial = getLang();
if (langSelect) {
  langSelect.value = initial;
  langSelect.addEventListener("change", () => applyLang(langSelect.value));
}
applyLang(initial);

/* Form validation */
const form = qs("#formLead");
const note = qs("#formNote");
const setErr = (id, msg) => { const el = qs(`#err-${id}`); if (el) el.textContent = msg || ""; };
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const pack = dict[getLang()] || dict.es;
    const t = (k) => pack[k] || dict.es[k] || "";

    if (note) note.textContent = "";

    const data = {
      name: qs("#name")?.value.trim() || "",
      company: qs("#company")?.value.trim() || "",
      country: qs("#country")?.value.trim() || "",
      phone: qs("#phone")?.value.trim() || "",
      email: qs("#email")?.value.trim() || "",
      service: qs("#service")?.value.trim() || "",
      message: qs("#message")?.value.trim() || "",
      privacy: qs("#privacy")?.checked || false
    };

    setErr("name", data.name ? "" : t("err_name"));
    setErr("company", data.company ? "" : t("err_company"));
    setErr("country", data.country ? "" : t("err_country"));
    setErr("phone", data.phone ? "" : t("err_phone"));
    setErr("email", data.email && isEmail(data.email) ? "" : t("err_email"));
    setErr("service", data.service ? "" : t("err_service"));
    setErr("message", data.message.length >= 10 ? "" : t("err_message"));
    setErr("privacy", data.privacy ? "" : t("err_privacy"));

    const ok =
      data.name && data.company && data.country && data.phone &&
      data.email && isEmail(data.email) &&
      data.service && data.message.length >= 10 && data.privacy;

    if (!ok) { if (note) note.textContent = t("err_fix"); return; }

    form.reset();
    if (note) note.textContent = t("form_ok");
  });
}
