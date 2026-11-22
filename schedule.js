/* Element Health Club: class schedule and booking flow (design mockup).
   Everything here is simulated in the browser: sessions, spots, prices and payment.
   In the real build, sessions and spots come from the server and payment opens Wompi's checkout. */
(function () {
  "use strict";

  /* ---------- copy ---------- */
  var S = {
    en: {
      "meta.title": "Class schedule · Element Health Club",
      "meta.description": "See this week's HIIT, trampoline and mat pilates classes in Laureles, Medellín. Every class includes an hour of sauna and cold plunge. Book and pay online.",
      "nav.schedule": "Schedule", "nav.cta": "Book a class",
      "mock.pill": "Mockup", "mock.text": "Classes, instructors, prices and spots are placeholders, and no real payment is taken.",
      "hero.eyebrow": "Class schedule",
      "hero.title": "Move for an hour. <em>Recover for another.</em>",
      "hero.lead": "Every class comes with an hour in the sauna and cold plunge afterwards, included in the price. Pick a time, reserve your spot and pay in under a minute.",
      "ritual.kicker": "Class + Spa", "ritual.title": "Two hours, one price",
      "ritual.text": "Train for an hour, then stay for an hour of sauna and cold plunge. It's optional, and it's always included.",
      "ritual.s1": "1 hour class", "ritual.s1b": "HIIT, trampoline or mat pilates",
      "ritual.s2": "Sauna", "ritual.s2b": "Dry heat up to 85 °C",
      "ritual.s3": "Cold plunge", "ritual.s3b": "Guided, 4 to 8 °C",
      "week.label": "Week", "week.this": "This week", "week.next": "Next week",
      "filter.label": "Filter classes", "filter.all": "All classes", "day.label": "Day",
      "sch.foot": "Closed Sundays for private events.",
      "c.hiit": "HIIT · Kettlebells", "c.tramp": "Trampoline", "c.pil": "Mat Pilates",
      "e.fire": "Fire", "e.air": "Air", "e.earth": "Earth",
      "morning": "Morning", "evening": "Evening", "today": "Today",
      "with": "with {name}", "spots": "{n} spots left", "spot1": "1 spot left", "full": "Full", "ended": "Ended",
      "left": "{n} left", "booked": "You're booked", "bookedShort": "Booked",
      "spaBand": "+ Spa {r} · sauna + cold plunge · included", "spaMini": "+ Spa",
      "book": "Book", "noClasses": "No classes match this filter on this day.",
      "how.eyebrow": "How booking works", "how.title": "Three taps and you're in",
      "how.s1": "Pick a class", "how.s1b": "Choose a day and time. Every class shows the spots left and the spa hour that follows.",
      "how.s2": "Reserve your spot", "how.s2b": "Add your name, WhatsApp and email. No account or password needed.",
      "how.s3": "Pay and you're in", "how.s3b": "Pay by card, PSE, Nequi, Bancolombia or Daviplata. Your confirmation arrives straight away.",
      "know.c": "Cancellations", "know.cb": "Cancel at least 12 hours before your class and we'll give you a class credit.",
      "know.s": "The spa hour", "know.sb": "Optional, and always included. Swimwear on, phone off.",
      "know.h": "Hours", "know.hb": "Monday to Saturday. Closed Sundays for private events.",
      "close": "Close", "step.1": "Class", "step.2": "Details", "step.3": "Payment",
      "p1.title": "Your class", "spaLine": "Spa: sauna + cold plunge", "spaOff": "Not today",
      "sw.title": "Stay for the spa hour", "sw.sub": "Sauna + cold plunge from {r}, included in your class.",
      "promo.q": "Have a code?", "promo.ph": "Code", "promo.apply": "Apply", "promo.ok": "First class free applied.",
      "promo.bad": "That code isn't valid.", "promo.hint": "Mockup: try PRIMERA",
      "total": "Total", "continue": "Continue", "back": "Back", "toPay": "Continue to payment",
      "expired": "Your hold ran out, so the spot was released. Check the class and try again.",
      "p2.title": "Your details", "f.name": "Full name", "f.wa": "WhatsApp", "f.waHint": "A Colombian mobile, or include your country code.",
      "f.email": "Email", "f.first": "It's my first time at Element",
      "f.waiver": "I accept the health waiver and the cancellation policy", "f.read": "Read them",
      "policy": "Cancel at least 12 hours before your class for a class credit. Tell us about any heart condition, high or low blood pressure, pregnancy or injury before you train or use the sauna and cold plunge.",
      "err.name": "Please enter your name.", "err.wa": "Please enter a valid WhatsApp number.",
      "err.email": "Please enter a valid email.", "err.waiver": "Please accept to continue.",
      "p3.title": "Payment", "hold": "Your spot is held for",
      "declined": "The payment wasn't approved. Your spot is still held, so you can try again or use another method.",
      "l.spa": "Spa hour", "l.incl": "Included", "l.code": "Code {c}",
      "payWith": "You can pay with", "m.card": "Card",
      "secure": "Payments are processed securely by Wompi. Element never sees your card details.",
      "pay": "Pay {p} with Wompi", "confirm": "Confirm booking",
      "sim.tag": "Simulation", "sim.title": "Wompi checkout",
      "sim.text": "On the live site, Wompi's secure payment window opens here. Pick a method to simulate the result.",
      "sim.ok": "Simulate approved payment", "sim.no": "Simulate declined payment", "sim.close": "Close",
      "p4.title": "You're booked", "p4.text": "A confirmation is on its way to {email}.",
      "ref": "Booking reference", "bring": "What to bring",
      "b1": "Training clothes and shoes", "b2": "A water bottle", "b3": "Swimwear for the sauna and cold plunge", "b4": "Arrive 10 minutes early",
      "ics": "Add to calendar", "getHere": "How to get here", "done": "Done",
      "ics.desc": "Class at Element Health Club, Laureles, Medellín.", "ics.spa": "Followed by an hour of sauna and cold plunge, included."
    },
    es: {
      "meta.title": "Horario de clases · Element Health Club",
      "meta.description": "Consulta las clases de HIIT, trampolín y pilates en colchoneta de esta semana en Laureles, Medellín. Cada clase incluye una hora de sauna y cold plunge. Reserva y paga en línea.",
      "nav.schedule": "Horario", "nav.cta": "Reserva tu clase",
      "mock.pill": "Maqueta", "mock.text": "Las clases, los instructores, los precios y los cupos son de ejemplo, y no se cobra ningún pago real.",
      "hero.eyebrow": "Horario de clases",
      "hero.title": "Una hora para moverte. <em>Otra para recuperarte.</em>",
      "hero.lead": "Cada clase incluye, al terminar, una hora de sauna y cold plunge sin costo adicional. Elige un horario, reserva tu cupo y paga en menos de un minuto.",
      "ritual.kicker": "Clase + Spa", "ritual.title": "Dos horas, un solo precio",
      "ritual.text": "Entrena una hora y quédate otra hora en el sauna y el cold plunge. Es opcional y siempre está incluida.",
      "ritual.s1": "Clase de 1 hora", "ritual.s1b": "HIIT, trampolín o pilates en colchoneta",
      "ritual.s2": "Sauna", "ritual.s2b": "Calor seco hasta 85 °C",
      "ritual.s3": "Cold plunge", "ritual.s3b": "Guiado, de 4 a 8 °C",
      "week.label": "Semana", "week.this": "Esta semana", "week.next": "Próxima semana",
      "filter.label": "Filtrar clases", "filter.all": "Todas las clases", "day.label": "Día",
      "sch.foot": "Los domingos cerramos para eventos privados.",
      "c.hiit": "HIIT con kettlebells", "c.tramp": "Trampolín", "c.pil": "Pilates en colchoneta",
      "e.fire": "Fuego", "e.air": "Aire", "e.earth": "Tierra",
      "morning": "Mañana", "evening": "Tarde", "today": "Hoy",
      "with": "con {name}", "spots": "Quedan {n} cupos", "spot1": "Queda 1 cupo", "full": "Llena", "ended": "Finalizada",
      "left": "{n} cupos", "booked": "Ya reservaste", "bookedShort": "Reservada",
      "spaBand": "+ Spa {r} · sauna + cold plunge · incluido", "spaMini": "+ Spa",
      "book": "Reservar", "noClasses": "Ese día no hay clases con este filtro.",
      "how.eyebrow": "Cómo reservar", "how.title": "Tres toques y listo",
      "how.s1": "Elige tu clase", "how.s1b": "Escoge el día y la hora. Cada clase muestra los cupos disponibles y la hora de spa que sigue.",
      "how.s2": "Reserva tu cupo", "how.s2b": "Escribe tu nombre, WhatsApp y correo. No necesitas cuenta ni contraseña.",
      "how.s3": "Paga y listo", "how.s3b": "Paga con tarjeta, PSE, Nequi, Bancolombia o Daviplata. La confirmación te llega al instante.",
      "know.c": "Cancelaciones", "know.cb": "Cancela con al menos 12 horas de anticipación y te damos un crédito de clase.",
      "know.s": "La hora de spa", "know.sb": "Opcional y siempre incluida. Vestido de baño puesto, celular guardado.",
      "know.h": "Horario", "know.hb": "De lunes a sábado. Los domingos cerramos para eventos privados.",
      "close": "Cerrar", "step.1": "Clase", "step.2": "Datos", "step.3": "Pago",
      "p1.title": "Tu clase", "spaLine": "Spa: sauna + cold plunge", "spaOff": "Hoy no",
      "sw.title": "Quedarme a la hora de spa", "sw.sub": "Sauna + cold plunge de {r}, incluida en tu clase.",
      "promo.q": "¿Tienes un código?", "promo.ph": "Código", "promo.apply": "Aplicar", "promo.ok": "Primera clase gratis aplicada.",
      "promo.bad": "Ese código no es válido.", "promo.hint": "Maqueta: prueba con PRIMERA",
      "total": "Total", "continue": "Continuar", "back": "Atrás", "toPay": "Continuar al pago",
      "expired": "Se acabó el tiempo de reserva y el cupo se liberó. Revisa la clase e inténtalo de nuevo.",
      "p2.title": "Tus datos", "f.name": "Nombre completo", "f.wa": "WhatsApp", "f.waHint": "Un celular colombiano, o incluye el código de tu país.",
      "f.email": "Correo electrónico", "f.first": "Es mi primera vez en Element",
      "f.waiver": "Acepto el consentimiento de salud y la política de cancelación", "f.read": "Leerlos",
      "policy": "Cancela con al menos 12 horas de anticipación para recibir un crédito de clase. Cuéntanos si tienes alguna condición cardíaca, presión arterial alta o baja, embarazo o lesión antes de entrenar o usar el sauna y el cold plunge.",
      "err.name": "Escribe tu nombre.", "err.wa": "Escribe un número de WhatsApp válido.",
      "err.email": "Escribe un correo válido.", "err.waiver": "Debes aceptar para continuar.",
      "p3.title": "Pago", "hold": "Tu cupo está reservado por",
      "declined": "El pago no fue aprobado. Tu cupo sigue reservado: puedes intentarlo de nuevo o usar otro método.",
      "l.spa": "Hora de spa", "l.incl": "Incluida", "l.code": "Código {c}",
      "payWith": "Puedes pagar con", "m.card": "Tarjeta",
      "secure": "Los pagos se procesan de forma segura con Wompi. Element nunca ve los datos de tu tarjeta.",
      "pay": "Pagar {p} con Wompi", "confirm": "Confirmar reserva",
      "sim.tag": "Simulación", "sim.title": "Pago con Wompi",
      "sim.text": "En el sitio real, aquí se abre la ventana de pago segura de Wompi. Elige un método para simular el resultado.",
      "sim.ok": "Simular pago aprobado", "sim.no": "Simular pago rechazado", "sim.close": "Cerrar",
      "p4.title": "¡Listo, ya tienes tu cupo!", "p4.text": "Te enviamos la confirmación a {email}.",
      "ref": "Código de reserva", "bring": "Qué traer",
      "b1": "Ropa y zapatos deportivos", "b2": "Una botella de agua", "b3": "Vestido de baño para el sauna y el cold plunge", "b4": "Llega 10 minutos antes",
      "ics": "Agregar al calendario", "getHere": "Cómo llegar", "done": "Listo",
      "ics.desc": "Clase en Element Health Club, Laureles, Medellín.", "ics.spa": "Seguida de una hora de sauna y cold plunge, incluida."
    }
  };
  function L() { return document.documentElement.lang === "es" ? "es" : "en"; }
  function t(k, v) {
    var s = S[L()][k];
    if (s == null) s = S.en[k] != null ? S.en[k] : k;
    return v ? s.replace(/\{(\w+)\}/g, function (m, x) { return v[x] != null ? v[x] : m; }) : s;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- placeholder data for the mockup ---------- */
  var PRICE = 45000;              /* COP, class + spa hour */
  var CAP = 12;                   /* spots per class */
  var HOLD_MS = 15 * 60 * 1000;   /* spot held while paying */
  var PROMO = "PRIMERA";
  var SLOTS = [6, 7, 8, 17, 18, 19];
  var TYPES = {
    hiit: { el: "fire", who: ["Valentina", "Mateo"] },
    tramp: { el: "air", who: ["Camila", "Sara"] },
    pil: { el: "earth", who: ["Laura", "Daniela"] }
  };
  /* weekly rotation: Mon & Thu = A, Tue & Fri = B, Wed & Sat = C (one entry per slot above) */
  var A = ["hiit", "tramp", "pil", "tramp", "hiit", "pil"];
  var B = ["tramp", "pil", "hiit", "pil", "tramp", "hiit"];
  var C = ["pil", "hiit", "tramp", "hiit", "pil", "tramp"];
  var ROTA = [A, B, C, A, B, C];
  var POPULAR = { 6: 5, 7: 4, 8: 2, 17: 4, 18: 7, 19: 3 };

  /* ---------- time: everything is Medellín wall-clock time (UTC-5, no daylight saving) ---------- */
  var DAY = 864e5, HOUR = 36e5, TZ_MS = 5 * HOUR;
  function nowBog() {
    var q = new URLSearchParams(location.search).get("now");   /* e.g. ?now=2026-11-23T07:30 for testing */
    if (q) { var d = new Date(q + "Z"); if (!isNaN(d)) return d; }
    return new Date(Date.now() - TZ_MS);
  }
  var NOW = nowBog();
  function dayStart(d) { return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); }
  function monday(w) {
    var d = dayStart(NOW), dow = d.getUTCDay();
    return new Date(d.getTime() + ((dow === 0 ? 1 : 1 - dow) + 7 * w) * DAY);   /* Sunday shows the coming week */
  }
  function ymd(d) { return d.toISOString().slice(0, 10); }
  function fmt(d, o) { o.timeZone = "UTC"; return new Intl.DateTimeFormat(L() === "es" ? "es-CO" : "en-US", o).format(d); }
  function cap1(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function hm(h) { return (((h + 11) % 12) + 1) + ":00"; }
  function ap(h) { var pm = h >= 12; return L() === "es" ? (pm ? "p. m." : "a. m.") : (pm ? "pm" : "am"); }
  function range(a, b) { return ap(a) === ap(b) ? hm(a) + "–" + hm(b) + " " + ap(b) : hm(a) + " " + ap(a) + "–" + hm(b) + " " + ap(b); }
  function money(n) { return L() === "es" ? "$" + n.toLocaleString("es-CO") : "$" + n.toLocaleString("en-US"); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  var state = { week: 0, day: null, filter: "all", mine: {}, b: null, trigger: null };

  function sessions(w) {
    var mon = monday(w), out = [];
    for (var i = 0; i < 6; i++) {
      var day = new Date(mon.getTime() + i * DAY);
      SLOTS.forEach(function (h, j) {
        var id = ymd(day) + "-" + h, type = ROTA[i][j];
        var base = Math.min(CAP, POPULAR[h] + hash(id) % 6);
        var mine = !!state.mine[id];
        var taken = Math.min(CAP, base + (mine ? 1 : 0));
        var start = new Date(day.getTime() + h * HOUR);
        out.push({ id: id, day: day, di: i, h: h, type: type, el: TYPES[type].el, who: TYPES[type].who[(i + j) % 2],
                   start: start, taken: taken, left: CAP - taken, mine: mine, past: start <= NOW });
      });
    }
    return out;
  }
  function find(id) {
    for (var w = 0; w < 2; w++) { var s = sessions(w); for (var i = 0; i < s.length; i++) if (s[i].id === id) return s[i]; }
    return null;
  }

  /* ---------- icons ---------- */
  var IC = {
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c3 4 6 7.3 6 11a6 6 0 0 1-12 0c0-3.7 3-7 6-11z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>'
  };

  /* ---------- static text ---------- */
  function applyStatic() {
    document.title = t("meta.title");
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", t("meta.description"));
    document.querySelectorAll("[data-s]").forEach(function (el) { el.textContent = t(el.getAttribute("data-s")); });
    document.querySelectorAll("[data-s-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-s-html")); });
    document.querySelectorAll("[data-s-label]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-s-label"))); });
  }

  /* ---------- schedule ---------- */
  var $ = function (id) { return document.getElementById(id); };
  function spotsText(s, short) {
    if (s.mine) return t("bookedShort");
    if (s.left <= 0) return t("full");
    if (short) return t("left", { n: s.left });
    return s.left === 1 ? t("spot1") : t("spots", { n: s.left });
  }
  function matches(s) { return state.filter === "all" || state.filter === s.type; }

  function renderBar() {
    var mon = monday(state.week), sat = new Date(mon.getTime() + 5 * DAY);
    $("weekRange").textContent = (fmt(mon, { day: "numeric", month: "short" }) + " – " + fmt(sat, { day: "numeric", month: "short" })).replace(/\./g, "");
    document.querySelectorAll("[data-week]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-week") === state.week)); });
    var chips = '<button type="button" class="chip" data-f="all" aria-pressed="' + (state.filter === "all") + '"><i></i>' + esc(t("filter.all")) + "</button>";
    Object.keys(TYPES).forEach(function (k) {
      chips += '<button type="button" class="chip el-' + TYPES[k].el + '" data-f="' + k + '" aria-pressed="' + (state.filter === k) + '"><i></i>' + esc(t("c." + k)) + "</button>";
    });
    $("chips").innerHTML = chips;
  }

  function defaultDay() {
    if (state.week !== 0) return 0;
    var i = Math.round((dayStart(NOW) - monday(0)) / DAY);
    return i >= 0 && i < 6 ? i : 0;
  }

  function renderDays() {
    var mon = monday(state.week), today = ymd(dayStart(NOW)), html = "";
    for (var i = 0; i < 6; i++) {
      var d = new Date(mon.getTime() + i * DAY);
      html += '<button type="button" class="day' + (ymd(d) === today ? " is-today" : "") + '" data-day="' + i + '" aria-pressed="' + (i === state.day) +
        '" aria-label="' + esc(cap1(fmt(d, { weekday: "long", day: "numeric", month: "long" }))) + '"><small>' + esc(fmt(d, { weekday: "short" }).replace(".", "")) +
        "</small><b>" + d.getUTCDate() + "</b></button>";
    }
    $("days").innerHTML = html;
  }

  function cardHTML(s) {
    var spaR = range(s.h + 1, s.h + 2), low = !s.mine && s.left > 0 && s.left <= 3;
    var action = s.mine ? '<span class="state ok">✓ ' + esc(t("booked")) + "</span>"
      : s.past ? '<span class="state">' + esc(t("ended")) + "</span>"
      : s.left <= 0 ? '<span class="state">' + esc(t("full")) + "</span>"
      : '<button type="button" class="btn btn-primary btn-sm" data-book="' + s.id + '">' + esc(t("book")) + "</button>";
    return '<article class="cls el-' + s.el + (s.past ? " is-past" : "") + '">' +
      '<div class="cls-time"><b>' + hm(s.h) + "</b><span>" + ap(s.h) + "</span></div>" +
      '<div class="cls-card"><div class="cls-top"><h4>' + esc(t("c." + s.type)) + '</h4><span class="el-tag">' + esc(t("e." + s.el)) + "</span></div>" +
      '<p class="cls-meta">' + esc(t("with", { name: s.who })) + (s.past ? "" : ' · <span class="' + (low ? "low" : "") + '">' + esc(spotsText(s)) + "</span>") + "</p>" +
      '<div class="spa-band">' + IC.drop + "<span>" + esc(t("spaBand", { r: spaR })) + "</span></div>" +
      '<div class="cls-foot"><span class="price">' + money(PRICE) + "<small>COP</small></span>" + action + "</div></div></article>";
  }

  function renderList() {
    var list = sessions(state.week).filter(function (s) { return s.di === state.day && matches(s); });
    var am = list.filter(function (s) { return s.h < 12; }), pm = list.filter(function (s) { return s.h >= 12; });
    var html = "";
    if (am.length) html += "<h3>" + esc(t("morning")) + "</h3>" + am.map(cardHTML).join("");
    if (pm.length) html += "<h3>" + esc(t("evening")) + "</h3>" + pm.map(cardHTML).join("");
    $("dayList").innerHTML = html || '<p class="empty">' + esc(t("noClasses")) + "</p>";
  }

  function cellHTML(s) {
    var dis = s.past || s.mine || s.left <= 0;
    var label = t("c." + s.type) + ", " + cap1(fmt(s.day, { weekday: "long", day: "numeric", month: "long" })) + ", " + hm(s.h) + " " + ap(s.h) + ", " +
      t("with", { name: s.who }) + ", " + (s.past ? t("ended") : spotsText(s));
    var meter = "";
    for (var i = 0; i < CAP; i++) meter += '<i class="' + (i < s.taken ? "" : "free") + '"></i>';
    var cls = "cell el-" + s.el + (s.left <= 0 && !s.mine ? " is-full" : "") + (s.mine ? " is-booked" : "") + (matches(s) ? "" : " is-dim");
    var low = !s.mine && s.left > 0 && s.left <= 3;
    return '<button type="button" class="' + cls + '" data-book="' + s.id + '"' + (dis ? " disabled" : "") + ' aria-label="' + esc(label) + '">' +
      '<span class="el-tag">' + esc(t("e." + s.el)) + '</span><span class="nm">' + esc(t("c." + s.type)) + '</span><span class="who">' + esc(s.who) + "</span>" +
      '<span class="meter" aria-hidden="true">' + meter + "</span>" +
      '<span class="bot"><span class="spots' + (low ? " low" : "") + '">' + esc(s.past ? t("ended") : (s.mine ? "✓ " : "") + spotsText(s, true)) + '</span><span class="spa-mini">' + esc(t("spaMini")) + "</span></span></button>";
  }

  function renderGrid() {
    var list = sessions(state.week), mon = monday(state.week), today = ymd(dayStart(NOW));
    var html = '<div class="wk-corner"></div>';
    for (var i = 0; i < 6; i++) {
      var d = new Date(mon.getTime() + i * DAY), isT = ymd(d) === today;
      html += '<div class="wk-head' + (isT ? " is-today" : "") + '"><small>' + esc(isT ? t("today") : fmt(d, { weekday: "short" }).replace(".", "")) + "</small><b>" +
        esc(fmt(d, { day: "numeric", month: "short" }).replace(".", "")) + "</b></div>";
    }
    SLOTS.forEach(function (h) {
      if (h === 6) html += '<div class="wk-sep">' + esc(t("morning")) + "</div>";
      if (h === 17) html += '<div class="wk-sep">' + esc(t("evening")) + "</div>";
      html += '<div class="wk-time"><b>' + hm(h) + "</b><span>" + ap(h) + "</span></div>";
      for (var i = 0; i < 6; i++) html += cellHTML(list.filter(function (s) { return s.di === i && s.h === h; })[0]);
    });
    $("weekGrid").innerHTML = html;
  }

  function renderAll() {
    if (state.day == null) state.day = defaultDay();
    renderBar(); renderDays(); renderList(); renderGrid();
  }

  /* ---------- booking panel ---------- */
  var sheet = $("sheet"), body = $("sheetBody"), foot = $("sheetFoot"), sim = $("sim"), timer = null;

  function openBook(id, trigger) {
    var s = find(id);
    if (!s || s.past || s.mine || s.left <= 0) return;
    state.trigger = trigger || null;
    state.b = { id: id, step: 1, spa: true, promo: false, promoMsg: null, showPromo: false, holdEnd: 0, expired: false, declined: false,
                showPolicy: false, method: "card", errs: {}, f: { name: "", wa: "", email: "", first: false, waiver: false }, ref: "" };
    renderSheet();
    sheet.showModal();
    clearInterval(timer); timer = setInterval(tick, 1000);
  }
  function total() { return state.b.promo ? 0 : PRICE; }
  function summaryHTML(s, b) {
    return '<div class="sum el-' + s.el + '"><span class="el-tag">' + esc(t("e." + s.el)) + "</span><h3>" + esc(t("c." + s.type)) + "</h3>" +
      "<p>" + esc(cap1(fmt(s.day, { weekday: "long", day: "numeric", month: "long" }))) + " · " + esc(t("with", { name: s.who })) + "</p>" +
      '<ol class="tl"><li><b>' + range(s.h, s.h + 1) + "</b>" + esc(t("c." + s.type)) + "</li>" +
      '<li class="spa' + (b.spa ? "" : " off") + '"><b>' + range(s.h + 1, s.h + 2) + "</b>" + esc(b.spa ? t("spaLine") : t("spaLine") + " · " + t("spaOff")) + "</li></ol></div>";
  }
  function totHTML() {
    return '<div class="tot"><small>' + esc(t("total")) + "</small><b>" + money(total()) + "</b>" + (state.b.promo ? "<s>" + money(PRICE) + "</s>" : "") + "</div>";
  }
  function mmss(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

  function renderSheet() {
    var b = state.b, s = find(b.id) || {}, html = "", f = "";
    document.querySelectorAll("#steps li").forEach(function (li) {
      var n = +li.getAttribute("data-step");
      li.className = b.step === 4 || n < b.step ? "done" : n === b.step ? "on" : "";
    });
    if (b.step === 1) {
      if (b.expired) html += '<p class="alert" role="alert">' + esc(t("expired")) + "</p>";
      html += '<h2 id="sheetTitle">' + esc(t("p1.title")) + "</h2>" + summaryHTML(s, b) +
        '<label class="switch-row"><span class="sw-text"><b>' + esc(t("sw.title")) + '</b><span class="sw-sub">' + esc(t("sw.sub", { r: range(s.h + 1, s.h + 2) })) + "</span></span>" +
        '<input type="checkbox" role="switch" class="switch" id="spaSw"' + (b.spa ? " checked" : "") + "></label>" +
        '<div class="promo"><button type="button" class="link-btn" id="promoToggle" aria-expanded="' + b.showPromo + '">' + esc(t("promo.q")) + "</button>" +
        (b.showPromo ? '<div class="promo-row"><input type="text" id="promoIn" autocomplete="off" aria-label="' + esc(t("promo.ph")) + '" placeholder="' + esc(t("promo.ph")) + '" value="' + (b.promo ? PROMO : "") + '">' +
          '<button type="button" class="btn btn-ghost btn-sm" id="promoApply">' + esc(t("promo.apply")) + "</button></div>" +
          (b.promoMsg ? '<p class="msg ' + (b.promo ? "ok" : "bad") + '" role="status">' + esc(t(b.promoMsg)) + "</p>" : "") +
          '<p class="hint">' + esc(t("promo.hint")) + "</p>" : "") + "</div>";
      f = totHTML() + '<button type="button" class="btn btn-primary" data-go="2">' + esc(t("continue")) + "</button>";
    } else if (b.step === 2) {
      var e = b.errs;
      function field(id, key, type, val, ac, extra) {
        return '<div class="field"><label for="' + id + '">' + esc(t(key)) + '</label><input type="' + type + '" id="' + id + '" autocomplete="' + ac + '" value="' + esc(val) + '"' +
          (e[id] ? ' aria-invalid="true" aria-describedby="' + id + 'E"' : "") + (extra || "") + ">" +
          (e[id] ? '<span class="err" id="' + id + 'E">' + esc(t(e[id])) + "</span>" : "") + "</div>";
      }
      html += '<h2 id="sheetTitle">' + esc(t("p2.title")) + "</h2>" +
        field("fName", "f.name", "text", b.f.name, "name") +
        field("fWa", "f.wa", "tel", b.f.wa, "tel", ' inputmode="tel" placeholder="300 123 4567"') +
        '<p class="hint" style="margin:-8px 0 14px">' + esc(t("f.waHint")) + "</p>" +
        field("fEmail", "f.email", "email", b.f.email, "email") +
        '<label class="check"><input type="checkbox" id="fFirst"' + (b.f.first ? " checked" : "") + "><span>" + esc(t("f.first")) + "</span></label>" +
        '<label class="check"><input type="checkbox" id="fWaiver"' + (b.f.waiver ? " checked" : "") + (e.fWaiver ? ' aria-invalid="true" aria-describedby="fWaiverE"' : "") + "><span>" + esc(t("f.waiver")) + "</span></label>" +
        (e.fWaiver ? '<p class="msg bad" id="fWaiverE" style="margin:-6px 0 12px">' + esc(t(e.fWaiver)) + "</p>" : "") +
        '<button type="button" class="link-btn" id="polToggle" aria-expanded="' + b.showPolicy + '" style="margin:0 0 12px 32px">' + esc(t("f.read")) + "</button>" +
        (b.showPolicy ? '<p class="policy">' + esc(t("policy")) + "</p>" : "");
      f = '<button type="button" class="link-btn" data-go="1">' + esc(t("back")) + '</button><button type="button" class="btn btn-primary" data-go="3">' + esc(t("toPay")) + "</button>";
    } else if (b.step === 3) {
      html += '<p class="hold">' + IC.clock + "<span>" + esc(t("hold")) + ' <b id="holdT">' + mmss(b.holdEnd - Date.now()) + "</b></span></p>" +
        (b.declined ? '<p class="alert" role="alert">' + esc(t("declined")) + "</p>" : "") +
        '<h2 id="sheetTitle">' + esc(t("p3.title")) + "</h2>" +
        '<ul class="lines"><li><span>' + esc(t("c." + s.type)) + "<br><small>" + esc(cap1(fmt(s.day, { weekday: "short", day: "numeric", month: "short" }))) + ", " + hm(s.h) + " " + ap(s.h) + "</small></span><b>" + money(PRICE) + "</b></li>" +
        "<li><span>" + esc(t("l.spa")) + "</span><b>" + esc(b.spa ? t("l.incl") : t("spaOff")) + "</b></li>" +
        (b.promo ? "<li><span>" + esc(t("l.code", { c: PROMO })) + "</span><b>−" + money(PRICE) + "</b></li>" : "") +
        "<li><b>" + esc(t("total")) + "</b><b>" + money(total()) + "</b></li></ul>" +
        (total() > 0 ? '<p class="hint">' + esc(t("payWith")) + '</p><div class="methods"><span>' + esc(t("m.card")) + "</span><span>PSE</span><span>Nequi</span><span>Bancolombia</span><span>Daviplata</span></div>" +
          '<p class="secure">' + IC.shield + "<span>" + esc(t("secure")) + "</span></p>" : "");
      f = '<button type="button" class="link-btn" data-go="2">' + esc(t("back")) + '</button><button type="button" class="btn btn-primary btn-wide" id="payBtn">' +
        esc(total() > 0 ? t("pay", { p: money(total()) }) : t("confirm")) + "</button>";
    } else {
      html += '<div class="done-ic">' + IC.check + '</div><h2 id="sheetTitle">' + esc(t("p4.title")) + "</h2>" +
        '<p style="color:var(--ink-2);margin:-6px 0 18px">' + esc(t("p4.text", { email: b.f.email })) + "</p>" + summaryHTML(s, b) +
        '<p class="ref">' + esc(t("ref")) + " <b>" + esc(b.ref) + "</b></p>" +
        '<div class="bring"><h3>' + esc(t("bring")) + "</h3><ul><li>" + esc(t("b1")) + "</li><li>" + esc(t("b2")) + "</li>" + (b.spa ? "<li>" + esc(t("b3")) + "</li>" : "") + "<li>" + esc(t("b4")) + "</li></ul></div>" +
        '<div class="done-actions"><button type="button" class="btn btn-primary" id="icsBtn">' + IC.cal + esc(t("ics")) + '</button><a class="btn btn-ghost" href="/location">' + esc(t("getHere")) + "</a></div>";
      f = '<button type="button" class="btn btn-ghost btn-wide" id="doneBtn">' + esc(t("done")) + "</button>";
    }
    body.innerHTML = html;
    foot.innerHTML = f;
    body.scrollTop = 0;
  }

  function readForm() {
    var b = state.b;
    if (b.step !== 2) return;
    b.f.name = $("fName").value.trim(); b.f.wa = $("fWa").value.trim(); b.f.email = $("fEmail").value.trim();
    b.f.first = $("fFirst").checked; b.f.waiver = $("fWaiver").checked;
  }
  function validate() {
    var b = state.b, e = {}, digits = b.f.wa.replace(/\D/g, "");
    if (b.f.name.length < 2) e.fName = "err.name";
    if (digits.length < 10 || digits.length > 15) e.fWa = "err.wa";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.f.email)) e.fEmail = "err.email";
    if (!b.f.waiver) e.fWaiver = "err.waiver";
    b.errs = e;
    return !Object.keys(e).length;
  }
  function go(n) {
    var b = state.b;
    readForm();
    if (n === 3 && b.step === 2 && !validate()) {
      renderSheet();
      var first = body.querySelector('[aria-invalid="true"]'); if (first) first.focus();
      return;
    }
    if (n === 2) b.expired = false;
    if (n === 3 && (!b.holdEnd || b.holdEnd <= Date.now())) b.holdEnd = Date.now() + HOLD_MS;   /* the spot is held from here */
    b.step = n; b.declined = false;
    renderSheet();
    var h = $("sheetTitle"); if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
  }
  function tick() {
    var b = state.b; if (!b || !b.holdEnd || b.step === 4) return;
    var left = b.holdEnd - Date.now(), el = $("holdT");
    if (el) el.textContent = mmss(left);
    if (left <= 0) { b.holdEnd = 0; b.expired = true; b.step = 1; renderSheet(); }
  }
  function confirmBooking() {
    var b = state.b;
    state.mine[b.id] = true;
    b.ref = "EHC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    b.step = 4; b.holdEnd = 0;
    renderSheet(); renderAll();
    var h = $("sheetTitle"); if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
  }
  function openSim() {
    var ms = [["card", t("m.card")], ["pse", "PSE"], ["nequi", "Nequi"], ["bancolombia", "Bancolombia"], ["daviplata", "Daviplata"]];
    $("simMethods").innerHTML = ms.map(function (m) {
      return '<button type="button" data-m="' + m[0] + '" aria-pressed="' + (state.b.method === m[0]) + '">' + esc(m[1]) + "</button>";
    }).join("");
    sim.showModal();
  }
  function downloadICS() {
    var b = state.b, s = find(b.id) || sessions(0).concat(sessions(1)).filter(function (x) { return x.id === b.id; })[0];
    function z(d) { return new Date(d.getTime() + TZ_MS).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
    var end = new Date(s.start.getTime() + (b.spa ? 2 : 1) * HOUR);
    var title = t("c." + s.type) + (b.spa ? " + Spa" : "") + " · Element Health Club";
    var desc = t("ics.desc") + (b.spa ? " " + t("ics.spa") : "") + " " + t("ref") + ": " + b.ref;
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Element Health Club//Schedule//ES", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      "UID:" + b.ref + "@elementhealthclub.com", "DTSTAMP:" + z(new Date(Date.now() - TZ_MS)), "DTSTART:" + z(s.start), "DTEND:" + z(end),
      "SUMMARY:" + title.replace(/[,;]/g, "\\$&"), "DESCRIPTION:" + desc.replace(/[,;]/g, "\\$&"), "LOCATION:Element Health Club\\, Laureles\\, Medellín",
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    a.download = "element-" + s.id + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (ev) {
    var el = ev.target.closest("button, a"); if (!el) return;
    if (el.hasAttribute("data-week")) { state.week = +el.getAttribute("data-week"); state.day = defaultDay(); renderAll(); return; }
    if (el.hasAttribute("data-f")) { state.filter = el.getAttribute("data-f"); renderAll(); return; }
    if (el.hasAttribute("data-day")) { state.day = +el.getAttribute("data-day"); renderDays(); renderList(); return; }
    if (el.hasAttribute("data-book") && !sheet.contains(el)) { openBook(el.getAttribute("data-book"), el); return; }
    if (!state.b) return;
    if (el.hasAttribute("data-go")) { go(+el.getAttribute("data-go")); return; }
    switch (el.id) {
      case "sheetClose": case "doneBtn": sheet.close(); break;
      case "promoToggle": state.b.showPromo = !state.b.showPromo; renderSheet(); var pi = $("promoIn"); if (pi) pi.focus(); break;
      case "promoApply":
        var ok = $("promoIn").value.trim().toUpperCase() === PROMO;
        state.b.promo = ok; state.b.promoMsg = ok ? "promo.ok" : "promo.bad"; renderSheet(); break;
      case "polToggle": readForm(); state.b.showPolicy = !state.b.showPolicy; renderSheet(); $("polToggle").focus(); break;
      case "payBtn": if (total() > 0) openSim(); else confirmBooking(); break;
      case "icsBtn": downloadICS(); break;
      case "simOk": sim.close(); confirmBooking(); break;
      case "simNo": sim.close(); state.b.declined = true; renderSheet(); break;
      case "simClose": sim.close(); break;
    }
    if (el.hasAttribute("data-m")) {
      state.b.method = el.getAttribute("data-m");
      $("simMethods").querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === el)); });
    }
  });
  document.addEventListener("change", function (ev) {
    if (ev.target.id === "spaSw" && state.b) { state.b.spa = ev.target.checked; renderSheet(); $("spaSw").focus(); }
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter" && ev.target.id === "promoIn") { ev.preventDefault(); $("promoApply").click(); }
  });
  sheet.addEventListener("close", function () {
    clearInterval(timer); timer = null;
    state.b = null;
    if (sim.open) sim.close();
    renderAll();
    var tr = state.trigger && document.querySelector('[data-book="' + (state.trigger.getAttribute("data-book") || "") + '"]');
    if (tr && !tr.disabled) tr.focus();
  });
  sheet.addEventListener("click", function (ev) { if (ev.target === sheet) sheet.close(); });   /* click on the backdrop */

  /* re-render when the visitor switches EN / ES */
  new MutationObserver(function () { applyStatic(); renderAll(); if (state.b) renderSheet(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  applyStatic();
  renderAll();
})();
