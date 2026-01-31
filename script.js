const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

/* Footer year */
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

/* i18n core */
const LANG_KEY = "tt_lang";
const SUPPORTED = ["es", "en", "pt", "fr"];

function getLang() {
  const saved = localStorage.getItem(LANG_KEY); // [web:83][web:39]
  return SUPPORTED.includes(saved) ? saved : "es";
}
function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang); // [web:39]
}
function setDocumentLang(lang) {
  document.documentElement.lang = lang; // [web:33]
}

const I18N = {
  es: {
    skip:"Saltar al contenido",
    lang_label:"Idioma",
    nav_menu:"Menú",
    nav_services:"Servicios",
    nav_process:"Cómo trabajamos",
    nav_industries:"Sectores",
    nav_cases:"Casos",
    nav_contact:"Contacto",
    cta_schedule:"Agendar llamada",
    cta_quote:"Cotizar importación",
    cta_whatsapp:"Hablar por WhatsApp",

    hero_eyebrow:"Consultoría de Negocios Internacionales e Importación • Colombia & LatAm",
    hero_h1:"Importa con seguridad, costos claros y cumplimiento desde el día 1.",
    hero_lead:"Diagnóstico, proveedores, documentación, logística e internacionalización con acompañamiento end-to-end.",
    trust_1:"Respuesta en 24h hábiles",
    trust_2:"Diagnóstico inicial para definir viabilidad, costos y tiempos",
    trust_3:"Atención nacional y remota desde Cúcuta",

    vp_1_t:"Decisiones con datos",
    vp_1_d:"Escenarios de costo/tiempo/riesgo con supuestos claros para decidir rápido.",
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
  },

  en: {
    skip:"Skip to content",
    lang_label:"Language",
    nav_menu:"Menu",
    nav_services:"Services",
    nav_process:"Process",
    nav_industries:"Industries",
    nav_cases:"Success",
    nav_contact:"Contact",
    cta_schedule:"Schedule a call",
    cta_quote:"Request an import quote",
    cta_whatsapp:"WhatsApp us",

    hero_eyebrow:"International Trade & Import Consulting • Colombia & LatAm",
    hero_h1:"Import with confidence, clear costs, and compliance from day one.",
    hero_lead:"Diagnosis, suppliers, documentation, logistics and international expansion with end-to-end support.",
    trust_1:"Reply within 24 business hours",
    trust_2:"Initial diagnosis to define feasibility, costs and timelines",
    trust_3:"Remote & nationwide service from Cúcuta",

    vp_1_t:"Data-driven decisions",
    vp_1_d:"Cost/time/risk scenarios with clear assumptions so you can decide faster.",
    vp_2_t:"Compliance first",
    vp_2_d:"Checklist and pre-review to reduce document inconsistencies and issues.",

    metric_1:"Cost scenarios (based on available info)",
    metric_2:"4-step process, no improvisation",
    metric_3a:"End-to-end",
    metric_3b:"Strategy → execution → follow-up",
    panel_cta_text:"Schedule a diagnostic call and define your next step.",

    services_h2:"Services",
    services_p:"Clear modules to import safely or expand into new markets.",
    see_detail:"See details",
    svc_1_t:"Import diagnosis & strategy",
    svc_1_d:"Feasibility, timeline, risks and action plan. Ideal to start or correct course.",
    svc_1_b1:"Deliverable: roadmap + info checklist.",
    svc_1_b2:"Includes: cost and timing scenarios per option.",
    svc_2_t:"Supplier sourcing & verification",
    svc_2_d:"Reduce risk before negotiating, paying or producing.",
    svc_2_b1:"Filter: capacity, lead times, documentation and references (placeholder).",
    svc_2_b2:"Negotiation support: milestones and recommended terms.",
    svc_3_t:"Documentation & compliance",
    svc_3_d:"Critical documents, consistency and traceability to minimize issues.",
    svc_3_b1:"Checklist by goods type (case-based).",
    svc_3_b2:"Consistency pre-check to avoid rework.",
    svc_4_t:"Logistics coordination",
    svc_4_d:"Incoterms, transport, insurance and partner coordination with milestone control.",
    svc_4_b1:"Responsibilities and control points definition.",
    svc_4_b2:"Transit tracking (scope-based).",
    svc_5_t:"Costing & optimization",
    svc_5_d:"Full cost structure to compare options and decide clearly.",
    svc_5_b1:"Scenarios: variations by freight, Incoterm and timing.",
    svc_5_b2:"Optimization: saving points and extra-cost risks.",
    svc_6_t:"International expansion consulting",
    svc_6_d:"New market entry: strategy, partners and commercial validation.",
    svc_6_b1:"Market map (placeholder by country/sector).",
    svc_6_b2:"Commercial due diligence and partner criteria.",

    how_h2:"How we work",
    how_p:"A simple, measurable method focused on decision and execution.",
    how_1_t:"Discovery",
    how_1_d:"We define product, origin/destination, volume, constraints and objective.",
    how_2_t:"Plan",
    how_2_d:"Checklist, strategy and milestones with estimated timing and owners.",
    how_3_t:"Execution",
    how_3_d:"Coordination with supplier, documents and logistics (scope-based).",
    how_4_t:"Follow-up",
    how_4_d:"Milestone control, alerts and closure with recommendations for the next operation.",

    ind_h2:"Industries",
    ind_p:"Examples where we apply controls, costing and compliance (placeholder depending on your focus).",
    ind_1:"Retail & e-commerce",
    ind_d1:"Improve unit costs, timing and turnover with scenarios and document control.",
    ind_2:"Tech & accessories",
    ind_d2:"Supplier verification, specifications and warranty risks (placeholder).",
    ind_3:"Spare parts & auto parts",
    ind_d3:"SKU control, compatibility and cost structure for recurring imports.",
    ind_4:"Textile & apparel",
    ind_d4:"Season planning, timeline control and product documentation.",
    ind_5:"Non-perishable foods",
    ind_d5:"Requirements, labeling and risk control (depending on goods).",
    ind_6:"Home / Hardware / Light industrial",
    ind_d6:"Standardize international purchasing with reliable suppliers and controlled costs.",

    cases_h2:"Success stories",
    cases_p:"Placeholder stories to showcase work style and delivered value.",
    case_t1:"Retail: costing and control before shipping",
    case_d1:"Scenario-based costing and document corrections before shipment, improving cost visibility.",
    case_1_sig:"<strong>M.G.</strong>, Retail (Bogotá)",
    case_t2:"Tech: supplier verification",
    case_d2:"Verification milestones and recommended terms before payment, reducing uncertainty and improving negotiation.",
    case_2_sig:"<strong>L.P.</strong>, Tech (Medellín)",
    case_t3:"Spare parts: repeatable milestone process",
    case_d3:"Checklist and staged tracking to turn isolated imports into a controlled, scalable process.",
    case_3_sig:"<strong>C.R.</strong>, Spare parts (Cali)",

    contact_h2:"Contact",
    contact_p:"Tell us what you want to import or which market you want to enter. We reply within 24 business hours.",
    contact_fast:"Fast channels",
    contact_form:"Form",
    contact_base:"<strong>Base:</strong> Cúcuta, Norte de Santander (remote & nationwide)",

    f_name:"Full name",
    f_company:"Company",
    f_country:"Country",
    f_phone:"Phone",
    f_email:"Email",
    f_service:"Service type",
    f_service_0:"Select an option",
    f_service_1:"Diagnosis & strategy",
    f_service_2:"Supplier verification",
    f_service_3:"Documentation & compliance",
    f_service_4:"Logistics coordination",
    f_service_5:"Costing & optimization",
    f_service_6:"International expansion",
    f_message:"Message",
    f_message_ph:"Example: product, origin, approximate quantity, urgency, supplier status…",
    f_privacy:"I accept the privacy policy (placeholder).",
    f_submit:"Send and request diagnosis",

    footer_loc:"Cúcuta, Norte de Santander • Remote & nationwide",
    footer_links:"Links",
    footer_legal:"Legal",
    footer_privacy:"Privacy policy (placeholder)",
    footer_notice:"Legal notice (placeholder)",
    footer_rights:"All rights reserved.",

    err_name:"Please enter your name.",
    err_company:"Please enter your company name.",
    err_country:"Please enter your country.",
    err_phone:"Please enter a contact phone.",
    err_email:"Please enter a valid email.",
    err_service:"Select a service type.",
    err_message:"Tell us a bit more (min. 10 characters).",
    err_privacy:"You must accept the privacy policy.",
    err_fix:"Please review the highlighted fields.",
    form_ok:"Done! We received your request. We'll reply within 24 business hours (placeholder without backend)."
  },

  pt: {
    skip:"Ir para o conteúdo",
    lang_label:"Idioma",
    nav_menu:"Menu",
    nav_services:"Serviços",
    nav_process:"Como trabalhamos",
    nav_industries:"Setores",
    nav_cases:"Casos",
    nav_contact:"Contato",
    cta_schedule:"Agendar chamada",
    cta_quote:"Solicitar cotação",
    cta_whatsapp:"Falar no WhatsApp",

    hero_eyebrow:"Consultoria em Importação e Negócios Internacionais • Colômbia & LatAm",
    hero_h1:"Importe com segurança, custos claros e conformidade desde o primeiro dia.",
    hero_lead:"Diagnóstico, fornecedores, documentação, logística e internacionalização com suporte end-to-end.",
    trust_1:"Resposta em 24h úteis",
    trust_2:"Diagnóstico inicial para definir viabilidade, custos e prazos",
    trust_3:"Atendimento remoto e nacional a partir de Cúcuta",

    vp_1_t:"Decisões com dados",
    vp_1_d:"Cenários de custo/tempo/risco com premissas claras para decidir mais rápido.",
    vp_2_t:"Conformidade primeiro",
    vp_2_d:"Checklist e revisão prévia para reduzir inconsistências e contingências.",

    metric_1:"Cenários de custos (conforme info disponível)",
    metric_2:"Processo em 4 etapas, sem improviso",
    metric_3a:"End-to-end",
    metric_3b:"Estratégia → execução → acompanhamento",
    panel_cta_text:"Agende uma chamada diagnóstica e defina seu próximo passo.",

    services_h2:"Serviços",
    services_p:"Módulos claros para importar com segurança ou expandir para novos mercados.",
    see_detail:"Ver detalhes",
    svc_1_t:"Diagnóstico e estratégia de importação",
    svc_1_d:"Viabilidade, cronograma, riscos e plano de ação. Ideal para começar ou ajustar a rota.",
    svc_1_b1:"Entregável: roteiro + checklist de informações.",
    svc_1_b2:"Inclui: cenários de custos e prazos por alternativa.",
    svc_2_t:"Busca e verificação de fornecedores",
    svc_2_d:"Reduza o risco antes de negociar, pagar ou produzir.",
    svc_2_b1:"Filtro: capacidade, prazos, documentação e referências (placeholder).",
    svc_2_b2:"Apoio na negociação: marcos e condições recomendadas.",
    svc_3_t:"Documentação e compliance",
    svc_3_d:"Documentos críticos, coerência e rastreabilidade para minimizar contingências.",
    svc_3_b1:"Checklist por tipo de mercadoria (conforme o caso).",
    svc_3_b2:"Revisão de consistência para evitar retrabalho.",
    svc_4_t:"Logística e coordenação",
    svc_4_d:"Incoterms, transporte, seguros e coordenação com parceiros para controle por marcos.",
    svc_4_b1:"Definição de responsabilidades e pontos de controle.",
    svc_4_b2:"Acompanhamento do trânsito (conforme escopo).",
    svc_5_t:"Custeio e otimização",
    svc_5_d:"Estrutura de custos completa para comparar alternativas e decidir com clareza.",
    svc_5_b1:"Cenários: variações por frete, Incoterm e prazos.",
    svc_5_b2:"Otimização: pontos de economia e riscos de custos extras.",
    svc_6_t:"Consultoria de internacionalização",
    svc_6_d:"Entrada em novos mercados: estratégia, parceiros e validação comercial.",
    svc_6_b1:"Mapa de mercado (placeholder por país/setor).",
    svc_6_b2:"Due diligence comercial e critérios de parceiro.",

    how_h2:"Como trabalhamos",
    how_p:"Um método simples, mensurável e orientado a decisão e execução.",
    how_1_t:"Descoberta",
    how_1_d:"Definimos produto, origem/destino, volume, restrições e objetivo.",
    how_2_t:"Plano",
    how_2_d:"Checklist, estratégia e marcos com prazos estimados e responsáveis.",
    how_3_t:"Execução",
    how_3_d:"Coordenação com fornecedor, documentos e logística conforme o escopo.",
    how_4_t:"Acompanhamento",
    how_4_d:"Controle por marcos, alertas e fechamento com recomendações para a próxima operação.",

    ind_h2:"Setores atendidos",
    ind_p:"Exemplos de categorias em que aplicamos controles, custeio e compliance (placeholder conforme seu foco).",
    ind_1:"Varejo e e-commerce",
    ind_d1:"Otimize custos unitários, prazos e giro com cenários e controle documental.",
    ind_2:"Tecnologia e acessórios",
    ind_d2:"Verificação de fornecedor, especificações e riscos de garantia (placeholder).",
    ind_3:"Peças e autopeças",
    ind_d3:"Controle de referências, compatibilidade e estrutura de custos para importações recorrentes.",
    ind_4:"Têxtil e confecção",
    ind_d4:"Planejamento por temporadas, controle de prazos e documentação do produto.",
    ind_5:"Alimentos não perecíveis",
    ind_d5:"Requisitos, rotulagem e controle de riscos (conforme mercadoria).",
    ind_6:"Casa / Ferragens / Industrial leve",
    ind_d6:"Padronize compras internacionais com fornecedores confiáveis e custos controlados.",

    cases_h2:"Casos de sucesso",
    cases_p:"Histórias modelo (placeholders) para mostrar o estilo de trabalho e o valor entregue.",
    case_t1:"Varejo: custeio e controle antes do embarque",
    case_d1:"Custeio por cenários e correção de inconsistências documentais antes do envio, melhorando a visibilidade de custos.",
    case_1_sig:"<strong>M.G.</strong>, Varejo (Bogotá)",
    case_t2:"Tecnologia: verificação de fornecedor",
    case_d2:"Definição de marcos de verificação e condições recomendadas antes do pagamento, reduzindo incerteza e melhorando a negociação.",
    case_2_sig:"<strong>L.P.</strong>, Tecnologia (Medellín)",
    case_t3:"Peças: processo repetível por marcos",
    case_d3:"Checklist e acompanhamento por etapas para transformar importações isoladas em um processo controlado e escalável.",
    case_3_sig:"<strong>C.R.</strong>, Peças (Cali)",

    contact_h2:"Contato",
    contact_p:"Conte o que deseja importar ou em qual mercado quer entrar. Respondemos em 24h úteis.",
    contact_fast:"Canais rápidos",
    contact_form:"Formulário",
    contact_base:"<strong>Base:</strong> Cúcuta, Norte de Santander (atendimento remoto e nacional)",

    f_name:"Nome e sobrenome",
    f_company:"Empresa",
    f_country:"País",
    f_phone:"Telefone",
    f_email:"Email",
    f_service:"Tipo de serviço",
    f_service_0:"Selecione uma opção",
    f_service_1:"Diagnóstico e estratégia",
    f_service_2:"Verificação de fornecedores",
    f_service_3:"Documentação e compliance",
    f_service_4:"Logística e coordenação",
    f_service_5:"Custeio e otimização",
    f_service_6:"Internacionalização",
    f_message:"Mensagem",
    f_message_ph:"Ex.: produto, origem, quantidade aproximada, urgência, se já tem fornecedor…",
    f_privacy:"Aceito a política de privacidade (placeholder).",
    f_submit:"Enviar e solicitar diagnóstico",

    footer_loc:"Cúcuta, Norte de Santander • Atendimento remoto e nacional",
    footer_links:"Links",
    footer_legal:"Legal",
    footer_privacy:"Política de privacidade (placeholder)",
    footer_notice:"Aviso legal (placeholder)",
    footer_rights:"Todos os direitos reservados.",

    err_name:"Por favor, informe seu nome.",
    err_company:"Por favor, informe o nome da empresa.",
    err_country:"Por favor, informe o país.",
    err_phone:"Por favor, informe um telefone de contato.",
    err_email:"Por favor, informe um email válido.",
    err_service:"Selecione um tipo de serviço.",
    err_message:"Conte um pouco mais (mín. 10 caracteres).",
    err_privacy:"Você deve aceitar a política de privacidade.",
    err_fix:"Revise os campos marcados para poder enviar.",
    form_ok:"Pronto! Recebemos sua solicitação. Responderemos em 24h úteis (placeholder sem backend)."
  },

  fr: {
    skip:"Aller au contenu",
    lang_label:"Langue",
    nav_menu:"Menu",
    nav_services:"Services",
    nav_process:"Méthode",
    nav_industries:"Secteurs",
    nav_cases:"Cas",
    nav_contact:"Contact",
    cta_schedule:"Planifier un appel",
    cta_quote:"Demander un devis",
    cta_whatsapp:"Nous écrire sur WhatsApp",

    hero_eyebrow:"Conseil en importation & développement international • Colombie & Amérique latine",
    hero_h1:"Importez en toute sécurité, avec des coûts clairs et la conformité dès le premier jour.",
    hero_lead:"Diagnostic, fournisseurs, documents, logistique et développement international avec un accompagnement de bout en bout.",
    trust_1:"Réponse sous 24h ouvrées",
    trust_2:"Diagnostic initial pour définir faisabilité, coûts et délais",
    trust_3:"Service à distance et national depuis Cúcuta",

    vp_1_t:"Décisions basées sur les données",
    vp_1_d:"Scénarios coût/délai/risque avec hypothèses claires pour décider plus vite.",
    vp_2_t:"Conformité d’abord",
    vp_2_d:"Checklist et revue préalable pour réduire incohérences et incidents.",

    metric_1:"Scénarios de coûts (selon les infos disponibles)",
    metric_2:"Processus en 4 étapes, sans improvisation",
    metric_3a:"End-to-end",
    metric_3b:"Stratégie → exécution → suivi",
    panel_cta_text:"Planifiez un appel de diagnostic et définissez la prochaine étape.",

    services_h2:"Services",
    services_p:"Modules clairs pour importer en sécurité ou se développer sur de nouveaux marchés.",
    see_detail:"Voir le détail",
    svc_1_t:"Diagnostic & stratégie d’import",
    svc_1_d:"Faisabilité, planning, risques et plan d’action. Idéal pour démarrer ou ajuster.",
    svc_1_b1:"Livrable : feuille de route + checklist d’informations.",
    svc_1_b2:"Inclut : scénarios de coûts et délais par option.",
    svc_2_t:"Sourcing & vérification fournisseurs",
    svc_2_d:"Réduisez le risque avant négociation, paiement ou production.",
    svc_2_b1:"Filtre : capacité, délais, documents et références (placeholder).",
    svc_2_b2:"Aide à la négociation : jalons et conditions recommandées.",
    svc_3_t:"Documents & conformité",
    svc_3_d:"Documents critiques, cohérence et traçabilité pour minimiser les incidents.",
    svc_3_b1:"Checklist selon la marchandise (selon le cas).",
    svc_3_b2:"Revue de cohérence pour éviter les retours.",
    svc_4_t:"Logistique & coordination",
    svc_4_d:"Incoterms, transport, assurance et coordination partenaires avec contrôle par jalons.",
    svc_4_b1:"Définition des responsabilités et points de contrôle.",
    svc_4_b2:"Suivi du transit (selon le périmètre).",
    svc_5_t:"Chiffrage & optimisation",
    svc_5_d:"Structure de coûts complète pour comparer les options et décider clairement.",
    svc_5_b1:"Scénarios : variations fret, Incoterm et délais.",
    svc_5_b2:"Optimisation : leviers d’économie et risques de surcoûts.",
    svc_6_t:"Conseil en internationalisation",
    svc_6_d:"Entrée sur de nouveaux marchés : stratégie, partenaires et validation commerciale.",
    svc_6_b1:"Carte de marché (placeholder par pays/secteur).",
    svc_6_b2:"Due diligence commerciale et critères de partenaire.",

    how_h2:"Notre méthode",
    how_p:"Une méthode simple, mesurable, orientée décision et exécution.",
    how_1_t:"Découverte",
    how_1_d:"Définition du produit, origine/destination, volume, contraintes et objectif.",
    how_2_t:"Plan",
    how_2_d:"Checklist, stratégie et jalons avec délais estimés et responsables.",
    how_3_t:"Exécution",
    how_3_d:"Coordination fournisseur, documents et logistique selon le périmètre.",
    how_4_t:"Suivi",
    how_4_d:"Contrôle par jalons, alertes et clôture avec recommandations pour la prochaine opération.",

    ind_h2:"Secteurs",
    ind_p:"Exemples de catégories où nous appliquons contrôles, chiffrage et conformité (placeholder selon votre focus).",
    ind_1:"Retail & e-commerce",
    ind_d1:"Optimisez les coûts unitaires, délais et rotation avec scénarios et contrôle documentaire.",
    ind_2:"Tech & accessoires",
    ind_d2:"Vérification fournisseur, spécifications et risques de garantie (placeholder).",
    ind_3:"Pièces & auto-pièces",
    ind_d3:"Contrôle des références, compatibilité et structure de coûts pour imports récurrents.",
    ind_4:"Textile & habillement",
    ind_d4:"Planification saisonnière, contrôle des délais et documentation produit.",
    ind_5:"Aliments non périssables",
    ind_d5:"Exigences, étiquetage et contrôle des risques (selon marchandise).",
    ind_6:"Maison / Quincaillerie / Industrie légère",
    ind_d6:"Standardisez vos achats internationaux avec fournisseurs fiables et coûts maîtrisés.",

    cases_h2:"Cas de réussite",
    cases_p:"Histoires type (placeholders) pour illustrer le style de travail et la valeur livrée.",
    case_t1:"Retail : chiffrage et contrôle avant expédition",
    case_d1:"Chiffrage par scénarios et correction d’incohérences documentaires avant expédition, pour une meilleure visibilité des coûts.",
    case_1_sig:"<strong>M.G.</strong>, Retail (Bogotá)",
    case_t2:"Tech : vérification fournisseur",
    case_d2:"Jalons de vérification et conditions recommandées avant paiement, réduisant l’incertitude et améliorant la négociation.",
    case_2_sig:"<strong>L.P.</strong>, Tech (Medellín)",
    case_t3:"Pièces : processus répétable par jalons",
    case_d3:"Checklist et suivi par étapes pour transformer des imports isolés en un processus maîtrisé et scalable.",
    case_3_sig:"<strong>C.R.</strong>, Pièces (Cali)",

    contact_h2:"Contact",
    contact_p:"Dites-nous ce que vous souhaitez importer ou quel marché viser. Réponse sous 24h ouvrées.",
    contact_fast:"Canaux rapides",
    contact_form:"Formulaire",
    contact_base:"<strong>Base :</strong> Cúcuta, Norte de Santander (à distance et national)",

    f_name:"Nom et prénom",
    f_company:"Entreprise",
    f_country:"Pays",
    f_phone:"Téléphone",
    f_email:"Email",
    f_service:"Type de service",
    f_service_0:"Choisir une option",
    f_service_1:"Diagnostic & stratégie",
    f_service_2:"Vérification fournisseurs",
    f_service_3:"Documents & conformité",
    f_service_4:"Logistique & coordination",
    f_service_5:"Chiffrage & optimisation",
    f_service_6:"Internationalisation",
    f_message:"Message",
    f_message_ph:"Ex. : produit, origine, quantité, urgence, fournisseur déjà identifié…",
    f_privacy:"J’accepte la politique de confidentialité (placeholder).",
    f_submit:"Envoyer et demander un diagnostic",

    footer_loc:"Cúcuta, Norte de Santander • À distance et national",
    footer_links:"Liens",
    footer_legal:"Mentions",
    footer_privacy:"Politique de confidentialité (placeholder)",
    footer_notice:"Mentions légales (placeholder)",
    footer_rights:"Tous droits réservés.",

    err_name:"Veuillez saisir votre nom.",
    err_company:"Veuillez saisir le nom de l’entreprise.",
    err_country:"Veuillez saisir votre pays.",
    err_phone:"Veuillez saisir un téléphone de contact.",
    err_email:"Veuillez saisir un email valide.",
    err_service:"Sélectionnez un type de service.",
    err_message:"Ajoutez plus de détails (min. 10 caractères).",
    err_privacy:"Vous devez accepter la politique de confidentialité.",
    err_fix:"Veuillez vérifier les champs en erreur.",
    form_ok:"C’est reçu ! Réponse sous 24h ouvrées (placeholder sans backend)."
  }
};

function translatePage(lang) {
  const pack = I18N[lang] || I18N.es;

  qsa("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = (pack[key] ?? I18N.es[key]);
    if (typeof val === "string") el.innerHTML = val;
  });

  qsa("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = (pack[key] ?? I18N.es[key]);
    if (typeof val === "string") el.setAttribute("placeholder", val);
  });

  setDocumentLang(lang);
}

/* Init language: default ES */
const langSelect = qs("#langSelect");
const initial = getLang(); // defaults to 'es' if nothing saved
if (langSelect) {
  langSelect.value = initial;
  langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    translatePage(lang);
    setLang(lang);
  });
}
translatePage(initial);

/* Form validation (localized) */
const form = qs("#formLead");
const note = qs("#formNote");
const setErr = (id, msg) => { const el = qs(`#err-${id}`); if (el) el.textContent = msg || ""; };
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const lang = getLang();
    const pack = I18N[lang] || I18N.es;
    const t = (k) => (pack[k] ?? I18N.es[k] ?? "");

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

    if (!ok) {
      if (note) note.textContent = t("err_fix");
      return;
    }

    form.reset();
    if (note) note.textContent = t("form_ok");
  });
}

/* Service prefill (stable values) */
qsa("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const sel = qs("#service");
    if (sel) sel.value = link.dataset.service || "";
  });
});
