/* Element Health Club: class schedule and booking.
   With PAYMENTS_LIVE on, the timetable, the spots left and every booking come from Vorzal (the club's booking system),
   and payment goes through Wompi. If Vorzal can't be reached, the page falls back to the built-in timetable below and a
   booking ends in a pre-filled WhatsApp message to the club, as it did before online payment.
   Add ?demo=1 to the URL to preview the full pay-online flow with sample availability and a simulated checkout. */
(function () {
  "use strict";

  /* ---------- launch settings ---------- */
  var OPENING = Date.UTC(2026, 11, 1);        /* Tuesday 1 December 2026: first day of classes */
  var FOUNDING_END = OPENING;                 /* no founding class price: classes are $60.000 and the first class is free */
  var PRICE_REG = 60000;                      /* COP, regular price per class */
  var PRICE_FOUNDING = 40000;                 /* COP, founding price (unused while FOUNDING_END = OPENING) */
  var PACK3 = 100000;                         /* COP, 3 classes in 7 days, shown in the welcome offer */
  var CAP = 16;                               /* spots per class */
  var LAST = 3;                               /* spot counts are never shown; "Last spots" appears at this many or fewer */
  var WA_NUMBER = "573106508588";             /* same number as site.js */
  var PAYMENTS_LIVE = true;                   /* true: classes, spots and online payment run on Vorzal (see README, "Booking and payments") */
  var VORZAL = "https://www.vorzal.com/api/classes/element_health_club";   /* the club's timetable and bookings in Vorzal */
  var DEMO = /[?&]demo=1(&|$)/.test(location.search);
  var PAY = PAYMENTS_LIVE || DEMO;            /* show the pay-online flow; switched off if Vorzal can't be reached */
  var live = null;                            /* the classes Vorzal sent; null until they arrive */
  var loading = PAYMENTS_LIVE && !DEMO;       /* true until Vorzal has answered (or failed) for the first time */
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {   /* local testing only: ?api=<address> points the page at another Vorzal */
    var apiOverride = new URLSearchParams(location.search).get("api");
    if (apiOverride) VORZAL = apiOverride;
  }

  /* ---------- copy ---------- */
  var S = {
    en: {
      "meta.title": "Classes · Element Health Club",
      "meta.description": "See this week's HIIT, trampoline and mat pilates classes in Laureles, Medellín. Free, optional sauna and cold plunge after every class. Book and pay online.",
      "nav.schedule": "Classes", "nav.cta": "Book a class",
      "hero.eyebrow": "Classes",
      "hero.title": "Move for an hour. <em>Stay for recovery if you like.</em>",
      "hero.lead": "Every class is one hour. Afterwards, the saunas and cold plunge are yours for up to an hour, free and completely optional. Pick a time, reserve your spot and pay in under a minute.",
      "ritual.kicker": "Free with every class", "ritual.title": "Recovery is on the house",
      "ritual.text": "After class, stay up to an hour in Recovery, with Finnish and infrared saunas and a cold plunge, at no extra charge. Use one, two or all three, come and go as you like, or head straight out. Your class is still just one hour.",
      "ritual.s1": "Your class", "ritual.s1b": "One hour: HIIT, trampoline or mat pilates",
      "ritual.s2": "Saunas", "ritual.s2b": "Finnish and infrared",
      "ritual.s3": "Cold plunge", "ritual.s3b": "If you're up for it", "ritual.free": "Free · optional",
      "offer.tag": "Your first class is free", "offer.post": "Recovery included. After that, {p} per class, or 3 classes in 7 days for {k}.", "firstFree": "1st class free",
      "week.label": "Week", "week.this": "This week", "week.next": "Next week",
      "filter.label": "Filter classes", "filter.all": "All classes", "day.label": "Day",
      "sch.foot": "Closed on Sundays.",
      "c.hiit": "HIIT · Kettlebells", "c.tramp": "Trampoline", "c.pil": "Mat Pilates",
      "e.fire": "Fire", "e.air": "Air", "e.earth": "Earth",
      "morning": "Morning", "evening": "Evening", "today": "Today",
      "with": "with {name}", "last": "Last spots", "full": "Full", "ended": "Ended", "closed": "Booking closed",
      "busy": "One moment…", "fullNow": "This class just filled up. Please pick another time.",
      "already": "This WhatsApp number already has a spot in this class.",
      "pend.title": "Confirming your payment", "pend.text": "This usually takes a few seconds. Your spot is safe while we check.",
      "pend.long": "Your bank is still confirming the payment. We'll email {email} as soon as it's approved.",
      "booked": "You're booked", "bookedShort": "Booked",
      "spaBand": "Free recovery after class, optional · until {e}", "spaMini": "+ Free recovery",
      "book": "Book", "noClasses": "No classes match this filter on this day.",
      "how.eyebrow": "How booking works", "how.title": "Three taps and you're in",
      "how.s1": "Pick a class", "how.s1b": "Choose a day and time. Every class shows who's teaching and the free recovery time after it.",
      "how.s2": "Reserve your spot", "how.s2b": "Add your name, WhatsApp and email. No account or password needed.",
      "how.s3": "Pay and you're in", "how.s3b": "Pay by card, PSE, Nequi, Bancolombia or Daviplata. Your confirmation arrives straight away.",
      "know.c": "Cancellations", "know.cb": "Cancel at least 12 hours before your class and we'll give you a class credit.",
      "know.s": "Recovery", "know.sb": "Free after every class, and completely optional. Stay five minutes or the full hour.",
      "know.h": "Hours", "know.hb": "Monday to Friday, 6:00 to 21:00. Saturday, 8:00 to 20:00. Closed on Sundays.",
      "close": "Close", "step.1": "Class", "step.2": "Details", "step.3": "Payment",
      "p1.title": "Your class", "spa.tl": "Free recovery, optional: saunas and cold plunge", "spa.until": "After class, until {e}",
      "spa.note": "No need to decide now. Stay five minutes or the full hour, or head straight out after class.",
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
      "l.spa": "Recovery after class", "l.free": "Free", "l.found": "December founding price", "l.code": "Code {c}",
      "payWith": "You can pay with", "m.card": "Card",
      "secure": "Payments are processed securely by Wompi. Element never sees your card details.",
      "pay": "Pay {p} with Wompi", "confirm": "Confirm booking",
      "sim.tag": "Simulation", "sim.title": "Wompi checkout",
      "sim.text": "On the live site, Wompi's secure payment window opens here. Pick a method to simulate the result.",
      "sim.ok": "Simulate approved payment", "sim.no": "Simulate declined payment", "sim.close": "Close",
      "p4.title": "You're booked", "p4.text": "A confirmation is on its way to {email}.",
      "ref": "Booking reference", "bring": "What to bring",
      "b1": "Training clothes and shoes", "b2": "A water bottle", "b3": "Swimwear, if you'd like to stay for recovery", "b4": "Arrive 10 minutes early",
      "ics": "Add to calendar", "getHere": "How to get here", "done": "Done",
      "ics.desc": "Class at Element Health Club, Laureles, Medellín.", "ics.spa": "Free recovery after class (optional), until {e}.",
      "meta.description@pre": "See this week's HIIT, trampoline and mat pilates classes in Laureles, Medellín. Free, optional sauna and cold plunge after every class. Book online.",
      "hero.lead@pre": "Every class is one hour. Afterwards, the saunas and cold plunge are yours for up to an hour, free and completely optional. Pick a time and reserve your spot in under a minute.",
      "how.s3@pre": "Confirm on WhatsApp", "how.s3b@pre": "Send us your booking in one tap. We'll confirm your spot and send you a secure payment link.",
      "step.3@pre": "Confirm", "toPay@pre": "Continue", "p3.title@pre": "Confirm your spot",
      "pre.note": "Online payment opens soon. For now, send us your booking on WhatsApp: we'll confirm your spot and send you a secure payment link.",
      "pre.btn": "Send on WhatsApp", "pre.again": "Open WhatsApp again",
      "p4.title@pre": "Almost there", "p4.text@pre": "Send the WhatsApp message to finish. We'll reply to confirm your spot and send your payment link.",
      "week.open": "Opening week", "week.second": "Second week", "opening": "Classes start {d}.",
      "mock.pill": "Demo", "mock.text": "Availability and payment on this page are simulated.",
      "wa.hi": "Hi! I'd like to book a class at Element:", "wa.class": "Class", "wa.date": "Date", "wa.price": "Price", "wa.name": "Name",
      "wa.email": "Email", "wa.first": "First time at Element", "wa.yes": "Yes", "wa.no": "No",
      "wa.waiver": "I accept the health waiver and the cancellation policy."
    },
    es: {
      "meta.title": "Clases · Element Health Club",
      "meta.description": "Consulta las clases de HIIT, trampolín y pilates en colchoneta de esta semana en Laureles, Medellín. Sauna y cold plunge gratis y opcionales después de cada clase. Reserva y paga en línea.",
      "nav.schedule": "Clases", "nav.cta": "Reserva tu clase",
      "hero.eyebrow": "Clases",
      "hero.title": "Una hora para moverte. <em>Y Recovery, si te provoca.</em>",
      "hero.lead": "Cada clase dura una hora. Después, los saunas y el cold plunge son tuyos hasta por una hora, gratis y totalmente opcional. Elige un horario, reserva tu cupo y paga en menos de un minuto.",
      "ritual.kicker": "Gratis con cada clase", "ritual.title": "Recovery va por cuenta de la casa",
      "ritual.text": "Después de clase, quédate hasta una hora en Recovery, nuestra zona húmeda con sauna finlandés, sauna infrarrojo y cold plunge, sin costo adicional. Usa uno, dos o los tres, entra y sal cuando quieras, o vete directo. Tu clase sigue siendo de solo una hora.",
      "ritual.s1": "Tu clase", "ritual.s1b": "Una hora: HIIT, trampolín o pilates en colchoneta",
      "ritual.s2": "Saunas", "ritual.s2b": "Finlandés e infrarrojo",
      "ritual.s3": "Cold plunge", "ritual.s3b": "Si te animas", "ritual.free": "Gratis · opcional",
      "offer.tag": "Tu primera clase es gratis", "offer.post": "Con Recovery incluido. Después, {p} por clase, o 3 clases en 7 días por {k}.", "firstFree": "1ª clase gratis",
      "week.label": "Semana", "week.this": "Esta semana", "week.next": "Próxima semana",
      "filter.label": "Filtrar clases", "filter.all": "Todas las clases", "day.label": "Día",
      "sch.foot": "Los domingos cerramos.",
      "c.hiit": "HIIT con kettlebells", "c.tramp": "Trampolín", "c.pil": "Pilates en colchoneta",
      "e.fire": "Fuego", "e.air": "Aire", "e.earth": "Tierra",
      "morning": "Mañana", "evening": "Tarde", "today": "Hoy",
      "with": "con {name}", "last": "Últimos cupos", "full": "Llena", "ended": "Finalizada", "closed": "Reservas cerradas",
      "busy": "Un momento…", "fullNow": "Esta clase se acaba de llenar. Elige otro horario.",
      "already": "Este número de WhatsApp ya tiene un cupo en esta clase.",
      "pend.title": "Estamos confirmando tu pago", "pend.text": "Suele tardar unos segundos. Tu cupo está guardado mientras verificamos.",
      "pend.long": "Tu banco aún está confirmando el pago. Te escribiremos a {email} apenas quede aprobado.",
      "booked": "Ya reservaste", "bookedShort": "Reservada",
      "spaBand": "Recovery gratis después de clase, opcional · hasta las {e}", "spaMini": "+ Recovery gratis",
      "book": "Reservar", "noClasses": "Ese día no hay clases con este filtro.",
      "how.eyebrow": "Cómo reservar", "how.title": "Tres toques y listo",
      "how.s1": "Elige tu clase", "how.s1b": "Escoge el día y la hora. Cada clase muestra quién la dicta y el Recovery gratis que viene después.",
      "how.s2": "Reserva tu cupo", "how.s2b": "Escribe tu nombre, WhatsApp y correo. No necesitas cuenta ni contraseña.",
      "how.s3": "Paga y listo", "how.s3b": "Paga con tarjeta, PSE, Nequi, Bancolombia o Daviplata. La confirmación te llega al instante.",
      "know.c": "Cancelaciones", "know.cb": "Cancela con al menos 12 horas de anticipación y te damos un crédito de clase.",
      "know.s": "Recovery", "know.sb": "Gratis después de cada clase y totalmente opcional. Quédate cinco minutos o la hora completa.",
      "know.h": "Horario", "know.hb": "De lunes a viernes, de 6:00 a 21:00. Sábados, de 8:00 a 20:00. Los domingos cerramos.",
      "close": "Cerrar", "step.1": "Clase", "step.2": "Datos", "step.3": "Pago",
      "p1.title": "Tu clase", "spa.tl": "Recovery gratis y opcional: saunas y cold plunge en la zona húmeda", "spa.until": "Después de clase, hasta las {e}",
      "spa.note": "No tienes que decidir ahora. Quédate cinco minutos o la hora completa, o vete directo después de clase.",
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
      "l.spa": "Recovery después de clase", "l.free": "Gratis", "l.found": "Precio fundador de diciembre", "l.code": "Código {c}",
      "payWith": "Puedes pagar con", "m.card": "Tarjeta",
      "secure": "Los pagos se procesan de forma segura con Wompi. Element nunca ve los datos de tu tarjeta.",
      "pay": "Pagar {p} con Wompi", "confirm": "Confirmar reserva",
      "sim.tag": "Simulación", "sim.title": "Pago con Wompi",
      "sim.text": "En el sitio real, aquí se abre la ventana de pago segura de Wompi. Elige un método para simular el resultado.",
      "sim.ok": "Simular pago aprobado", "sim.no": "Simular pago rechazado", "sim.close": "Cerrar",
      "p4.title": "¡Listo, ya tienes tu cupo!", "p4.text": "Te enviamos la confirmación a {email}.",
      "ref": "Código de reserva", "bring": "Qué traer",
      "b1": "Ropa y zapatos deportivos", "b2": "Una botella de agua", "b3": "Vestido de baño, si quieres quedarte en Recovery", "b4": "Llega 10 minutos antes",
      "ics": "Agregar al calendario", "getHere": "Cómo llegar", "done": "Listo",
      "ics.desc": "Clase en Element Health Club, Laureles, Medellín.", "ics.spa": "Recovery gratis después de clase (opcional), hasta las {e}.",
      "meta.description@pre": "Consulta las clases de HIIT, trampolín y pilates en colchoneta de esta semana en Laureles, Medellín. Sauna y cold plunge gratis y opcionales después de cada clase. Reserva en línea.",
      "hero.lead@pre": "Cada clase dura una hora. Después, los saunas y el cold plunge son tuyos hasta por una hora, gratis y totalmente opcional. Elige un horario y reserva tu cupo en menos de un minuto.",
      "how.s3@pre": "Confirma por WhatsApp", "how.s3b@pre": "Envíanos tu reserva con un toque. Te confirmamos el cupo y te enviamos un link de pago seguro.",
      "step.3@pre": "Confirmar", "toPay@pre": "Continuar", "p3.title@pre": "Confirma tu cupo",
      "pre.note": "El pago en línea abre muy pronto. Por ahora, envíanos tu reserva por WhatsApp: te confirmamos el cupo y te enviamos un link de pago seguro.",
      "pre.btn": "Enviar por WhatsApp", "pre.again": "Abrir WhatsApp de nuevo",
      "p4.title@pre": "¡Ya casi!", "p4.text@pre": "Envía el mensaje de WhatsApp para terminar. Te respondemos para confirmar tu cupo y enviarte el link de pago.",
      "week.open": "Semana de apertura", "week.second": "Segunda semana", "opening": "Las clases empiezan el {d}.",
      "mock.pill": "Demo", "mock.text": "La disponibilidad y el pago en esta página son simulados.",
      "wa.hi": "¡Hola! Quiero reservar una clase en Element:", "wa.class": "Clase", "wa.date": "Fecha", "wa.price": "Precio", "wa.name": "Nombre",
      "wa.email": "Correo", "wa.first": "Primera vez en Element", "wa.yes": "Sí", "wa.no": "No",
      "wa.waiver": "Acepto el consentimiento de salud y la política de cancelación."
    }
  };
  function L() { return document.documentElement.lang === "es" ? "es" : "en"; }
  /* keys ending in "@pre" replace their plain version until online payment is switched on */
  function t(k, v) {
    var d = S[L()];
    if (!PAY && (d[k + "@pre"] != null || S.en[k + "@pre"] != null)) k += "@pre";
    var s = d[k];
    if (s == null) s = S.en[k] != null ? S.en[k] : k;
    return v ? s.replace(/\{(\w+)\}/g, function (m, x) { return v[x] != null ? v[x] : m; }) : s;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- classes ---------- */
  var TYPES = {
    hiit: { el: "fire", who: ["Juan Pablo"] },
    tramp: { el: "air", who: ["Stefi", "Diana"] },
    pil: { el: "earth", who: ["Camila"] }
  };
  /* weekday rotation, by start hour: Mon & Thu = A, Tue & Fri = B, Wed = C.
     Evening pilates is paused for now (A 19:00, B 17:00, C 18:00 were pilates). */
  var A = { 6: "hiit", 7: "tramp", 8: "pil", 17: "tramp", 18: "hiit" };
  var B = { 6: "tramp", 7: "pil", 8: "hiit", 18: "tramp", 19: "hiit" };
  var C = { 6: "pil", 7: "hiit", 8: "tramp", 17: "hiit", 19: "tramp" };
  var ROTA = [A, B, C, A, B];
  var ROW = { 6: 0, 7: 1, 8: 2, 17: 3, 18: 4, 19: 5 };   /* keeps the weekday trampoline split between Stefi and Diana (5 each) */
  /* Saturday: three morning classes. The order rotates every week so each class gets each time,
     and the trampoline class alternates between Stefi and Diana. */
  var SAT_HOURS = [8, 9, 10];
  var SAT_ORDERS = [["pil", "hiit", "tramp"], ["hiit", "tramp", "pil"], ["tramp", "pil", "hiit"]];
  /* one-off changes for a specific date: { "YYYY-MM-DD": { hour: class or null } } */
  var OVERRIDES = {
    "2026-12-03": { 6: "pil", 8: "hiit" },   /* Camila can't do Thursday 8am in the first two weeks: pilates and HIIT swap */
    "2026-12-10": { 6: "pil", 8: "hiit" }
  };
  var HOLD_MS = 15 * 60 * 1000;   /* spot held while paying online */
  var PROMO = "PRIMERA";          /* demo-only code */
  var POPULAR = { 6: 7, 7: 6, 8: 5, 9: 9, 10: 7, 17: 6, 18: 9, 19: 4 };   /* demo-only sample bookings */

  /* ---------- time: everything is Medellín wall-clock time (UTC-5, no daylight saving) ---------- */
  var DAY = 864e5, HOUR = 36e5, TZ_MS = 5 * HOUR;
  function nowBog() {
    var q = new URLSearchParams(location.search).get("now");   /* e.g. ?now=2026-12-02T07:30 to preview a date */
    if (q) { var d = new Date(q + "Z"); if (!isNaN(d)) return d; }
    return new Date(Date.now() - TZ_MS);
  }
  var NOW = nowBog();
  function dayStart(d) { return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); }
  var OPEN_MON = OPENING - ((new Date(OPENING).getUTCDay() + 6) % 7) * DAY;   /* Monday of the opening week */
  function currentMonday() {
    var d = dayStart(NOW), dow = d.getUTCDay();
    return d.getTime() + (dow === 0 ? 1 : 1 - dow) * DAY;   /* on Sunday the coming week is shown */
  }
  function preOpening() { return currentMonday() < OPEN_MON; }
  function monday(w) { return new Date(Math.max(currentMonday(), OPEN_MON) + 7 * w * DAY); }
  function weekDows(w) {   /* Monday = 0 … Saturday = 5, skipping days before opening */
    var mon = monday(w).getTime(), out = [];
    for (var i = 0; i < 6; i++) if (mon + i * DAY >= OPENING) out.push(i);
    return out;
  }
  function ymd(d) { return d.toISOString().slice(0, 10); }
  function fmt(d, o) { o.timeZone = "UTC"; return new Intl.DateTimeFormat(L() === "es" ? "es-CO" : "en-US", o).format(d); }
  function longDate(d) { var s = fmt(d, { weekday: "long", day: "numeric", month: "long" }); return L() === "es" ? s.replace(",", "") : s; }
  function cap1(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function hm(h) { return (((h + 11) % 12) + 1) + ":00"; }
  function ap(h) { var pm = h >= 12; return L() === "es" ? (pm ? "p. m." : "a. m.") : (pm ? "pm" : "am"); }
  function range(a, b) { return ap(a) === ap(b) ? hm(a) + "–" + hm(b) + " " + ap(b) : hm(a) + " " + ap(a) + "–" + hm(b) + " " + ap(b); }
  function until(h) { return hm(h + 2) + " " + ap(h + 2); }   /* the free spa time runs until 2 hours after class start */
  function money(n) { return L() === "es" ? "$" + n.toLocaleString("es-CO") : "$" + n.toLocaleString("en-US"); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  var FIRST_SAT = OPENING + ((6 - new Date(OPENING).getUTCDay() + 7) % 7) * DAY;   /* first Saturday with classes */
  function saturdayNumber(day) { return Math.round((day.getTime() - FIRST_SAT) / (7 * DAY)); }
  function mod(a, n) { return ((a % n) + n) % n; }
  /* the classes on a given day: { hour: { type, who } } */
  function dayPlan(day, i) {
    var plan = {}, ov = OVERRIDES[ymd(day)] || {}, h;
    if (i === 5) {
      var k = saturdayNumber(day), order = SAT_ORDERS[mod(k, 3)];
      SAT_HOURS.forEach(function (hr, j) { plan[hr] = { type: order[j], who: order[j] === "tramp" ? TYPES.tramp.who[mod(k + 1, 2)] : TYPES[order[j]].who[0] }; });   /* Diana first: the opening week has no Monday, which is hers */
    } else {
      for (h in ROTA[i]) { var ty = ROTA[i][h]; plan[h] = { type: ty, who: TYPES[ty].who[(i + ROW[h]) % TYPES[ty].who.length] }; }
    }
    for (h in ov) { if (ov[h]) plan[h] = { type: ov[h], who: TYPES[ov[h]].who[0] }; else delete plan[h]; }
    return plan;
  }
  /* with Vorzal's timetable each class carries its own price; the built-in one goes by date */
  function priceOf(s) { return s.price != null ? s.price : s.day.getTime() < FOUNDING_END ? PRICE_FOUNDING : PRICE_REG; }
  function regOf(s) { return s.list != null ? s.list : PRICE_REG; }
  /* a kind of class this page has no wording for yet is shown with the name Vorzal gave it */
  function cname(s) { return s.name && !TYPES[s.type] ? s.name : t("c." + s.type); }

  /* small helpers for this browser's memory (the classes this visitor booked, and a payment in progress) */
  function read(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function store(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var state = { week: 0, day: null, filter: "all", mine: (!DEMO && read("ehc.mine")) || {}, b: null, trigger: null };

  /* the classes Vorzal sent, for one week */
  function liveSessions(w) {
    var mon = monday(w).getTime(), out = [];
    live.forEach(function (c) {
      var day = new Date(c.date + "T00:00:00Z"), i = Math.round((day.getTime() - mon) / DAY);
      if (i < 0 || i > 5 || day.getTime() < OPENING) return;
      var h = +c.time.slice(0, 2), known = !!TYPES[c.type], mine = !!state.mine[c.id];
      out.push({ id: c.id, day: day, di: i, h: h, type: known ? c.type : "other", el: known ? TYPES[c.type].el : "fire",
                 name: L() === "es" && c.name_es ? c.name_es : c.name, who: c.coach || "", start: new Date(day.getTime() + h * HOUR),
                 left: c.state === "full" ? 0 : c.left == null ? CAP : c.left, mine: mine,
                 past: c.state === "ended", closed: c.state === "closed", price: c.price, list: c.list_price });
    });
    return out.sort(function (a, b) { return a.start - b.start; });
  }

  function sessions(w) {
    if (live) return liveSessions(w);
    var mon = monday(w), out = [];
    weekDows(w).forEach(function (i) {
      var day = new Date(mon.getTime() + i * DAY);
      var plan = dayPlan(day, i);
      Object.keys(plan).map(Number).sort(function (a, b) { return a - b; }).forEach(function (h) {
        var id = ymd(day) + "-" + h, type = plan[h].type, mine = !!state.mine[id];
        /* real availability will come from the booking server; until then every class shows as open (the demo uses sample numbers) */
        var taken = DEMO ? Math.min(CAP, Math.min(CAP, POPULAR[h] + hash(id) % 7) + (mine ? 1 : 0)) : 0;
        var start = new Date(day.getTime() + h * HOUR);
        out.push({ id: id, day: day, di: i, h: h, type: type, el: TYPES[type].el, who: plan[h].who,
                   start: start, taken: taken, left: CAP - taken, mine: mine, past: start <= NOW });
      });
    });
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
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.8 4.5 4 1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"/></svg>'
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
  /* availability is shown only when it helps (nearly full or full), never as a count */
  function isLast(s) { return !s.past && !s.mine && s.left > 0 && s.left <= LAST; }
  function statusText(s) {
    if (s.past) return t("ended");
    if (s.mine) return "✓ " + t("bookedShort");
    if (s.left <= 0) return t("full");
    if (s.closed) return t("closed");
    return isLast(s) ? t("last") : "";
  }
  function matches(s) { return state.filter === "all" || state.filter === s.type; }

  function renderBar() {
    var mon = monday(state.week), sat = new Date(mon.getTime() + 5 * DAY), dows = weekDows(state.week);
    var first = new Date(mon.getTime() + dows[0] * DAY);
    $("weekRange").textContent = (fmt(first, { day: "numeric", month: "short" }) + " – " + fmt(sat, { day: "numeric", month: "short" })).replace(/\./g, "");
    var pre = preOpening();
    document.querySelectorAll("[data-week]").forEach(function (b) {
      var w = +b.getAttribute("data-week");
      b.textContent = t(pre ? (w ? "week.second" : "week.open") : (w ? "week.next" : "week.this"));
      b.setAttribute("aria-pressed", String(w === state.week));
    });
    var chips = '<button type="button" class="chip" data-f="all" aria-pressed="' + (state.filter === "all") + '"><i></i>' + esc(t("filter.all")) + "</button>";
    Object.keys(TYPES).forEach(function (k) {
      chips += '<button type="button" class="chip el-' + TYPES[k].el + '" data-f="' + k + '" aria-pressed="' + (state.filter === k) + '"><i></i>' + esc(t("c." + k)) + "</button>";
    });
    $("chips").innerHTML = chips;
    var offer = $("offer");   /* the welcome offer: first class free, then the regular price or the 3-class pack */
    offer.hidden = false;
    offer.innerHTML = '<span class="offer-tag">' + esc(t("offer.tag")) + "</span><span>" + esc(t("offer.post", { p: money(PRICE_REG), k: money(PACK3) })) + "</span>" +
      (pre ? '<span class="offer-open">' + esc(t("opening", { d: longDate(new Date(OPENING)) })) + "</span>" : "");
  }

  function defaultDay() {
    var dows = weekDows(state.week);
    if (state.week === 0) {
      var i = Math.round((dayStart(NOW) - monday(0)) / DAY);
      if (dows.indexOf(i) >= 0) return i;
    }
    return dows[0];
  }

  function renderDays() {
    var mon = monday(state.week), today = ymd(dayStart(NOW)), dows = weekDows(state.week), html = "";
    dows.forEach(function (i) {
      var d = new Date(mon.getTime() + i * DAY);
      html += '<button type="button" class="day' + (ymd(d) === today ? " is-today" : "") + '" data-day="' + i + '" aria-pressed="' + (i === state.day) +
        '" aria-label="' + esc(cap1(longDate(d))) + '"><small>' + esc(fmt(d, { weekday: "short" }).replace(".", "")) +
        "</small><b>" + d.getUTCDate() + "</b></button>";
    });
    $("days").style.gridTemplateColumns = "repeat(" + dows.length + ", 1fr)";
    $("days").innerHTML = html;
  }

  function priceHTML(s) {
    var p = priceOf(s);
    return '<span class="price">' + (p < regOf(s) ? "<s>" + money(regOf(s)) + "</s>" : "") + money(p) + "<small>COP</small>" + (p > 0 ? "<em>" + esc(t("firstFree")) + "</em>" : "") + "</span>";
  }

  function cardHTML(s) {
    var action = s.mine ? '<span class="state ok">✓ ' + esc(t("booked")) + "</span>"
      : s.past ? '<span class="state">' + esc(t("ended")) + "</span>"
      : s.left <= 0 ? '<span class="state">' + esc(t("full")) + "</span>"
      : s.closed ? '<span class="state">' + esc(t("closed")) + "</span>"
      : '<button type="button" class="btn btn-primary btn-sm" data-book="' + s.id + '">' + esc(t("book")) + "</button>";
    return '<article class="cls el-' + s.el + (s.past ? " is-past" : "") + '">' +
      '<div class="cls-time"><b>' + hm(s.h) + "</b><span>" + ap(s.h) + "</span></div>" +
      '<div class="cls-card"><div class="cls-top"><h4>' + esc(cname(s)) + '</h4><span class="el-tag">' + esc(t("e." + s.el)) + "</span></div>" +
      '<p class="cls-meta">' + esc(t("with", { name: s.who })) + (isLast(s) ? ' · <span class="low">' + esc(t("last")) + "</span>" : "") + "</p>" +
      '<div class="spa-band">' + IC.drop + "<span>" + esc(t("spaBand", { e: until(s.h) })) + "</span></div>" +
      '<div class="cls-foot">' + priceHTML(s) + action + "</div></div></article>";
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
    var dis = s.past || s.mine || s.closed || s.left <= 0, st = statusText(s);
    var label = cname(s) + ", " + cap1(longDate(s.day)) + ", " + hm(s.h) + " " + ap(s.h) + ", " + t("with", { name: s.who }) + (st ? ", " + st.replace("✓ ", "") : "");
    var cls = "cell el-" + s.el + (s.left <= 0 && !s.mine ? " is-full" : "") + (s.mine ? " is-booked" : "") + (matches(s) ? "" : " is-dim");
    return '<button type="button" class="' + cls + '" data-book="' + s.id + '"' + (dis ? " disabled" : "") + ' aria-label="' + esc(label) + '">' +
      '<span class="el-tag">' + esc(t("e." + s.el)) + '</span><span class="nm">' + esc(cname(s)) + '</span><span class="who">' + esc(s.who) + "</span>" +
      '<span class="bot"><span class="spots' + (isLast(s) ? " low" : "") + '">' + esc(st) + '</span><span class="spa-mini">' + esc(t("spaMini")) + "</span></span></button>";
  }

  function renderGrid() {
    var list = sessions(state.week), mon = monday(state.week), today = ymd(dayStart(NOW)), dows = weekDows(state.week);
    var html = '<div class="wk-corner"></div>';
    dows.forEach(function (i) {
      var d = new Date(mon.getTime() + i * DAY), isT = ymd(d) === today;
      html += '<div class="wk-head' + (isT ? " is-today" : "") + '"><small>' + esc(isT ? t("today") : fmt(d, { weekday: "short" }).replace(".", "")) + "</small><b>" +
        esc(fmt(d, { day: "numeric", month: "short" }).replace(".", "")) + "</b></div>";
    });
    var hours = list.map(function (s) { return s.h; }).filter(function (h, k, a) { return a.indexOf(h) === k; }).sort(function (a, b) { return a - b; });
    hours.forEach(function (h, k) {
      if (k === 0 && h < 12) html += '<div class="wk-sep">' + esc(t("morning")) + "</div>";
      if (h >= 12 && (k === 0 || hours[k - 1] < 12)) html += '<div class="wk-sep">' + esc(t("evening")) + "</div>";
      html += '<div class="wk-time"><b>' + hm(h) + "</b><span>" + ap(h) + "</span></div>";
      dows.forEach(function (i) {
        var s = list.filter(function (x) { return x.di === i && x.h === h; })[0];
        html += s ? cellHTML(s) : '<div class="cell-empty" aria-hidden="true"></div>';
      });
    });
    $("weekGrid").style.gridTemplateColumns = "74px repeat(" + dows.length + ", minmax(0, 1fr))";
    $("weekGrid").innerHTML = html;
  }

  function renderAll() {
    if (state.day == null || weekDows(state.week).indexOf(state.day) < 0) state.day = defaultDay();
    renderBar(); renderDays(); renderList(); renderGrid();
  }

  /* ---------- booking panel ---------- */
  var sheet = $("sheet"), body = $("sheetBody"), foot = $("sheetFoot"), sim = $("sim"), timer = null;

  function openBook(id, trigger) {
    var s = find(id);
    if (loading || !s || s.past || s.mine || s.closed || s.left <= 0) return;
    state.trigger = trigger || null;
    state.b = newBooking(id);
    showSheet();
  }
  function newBooking(id) {
    return { id: id, step: 1, promo: false, promoMsg: null, showPromo: false, holdEnd: 0, expired: false, declined: false,
             showPolicy: false, method: "card", errs: {}, f: { name: "", wa: "", email: "", first: false, waiver: false }, ref: "",
             /* set by Vorzal once the spot is held: the booking's id, the Wompi payment link, and what went wrong if anything */
             bid: "", payUrl: "", busy: false, fail: null, pending: null };
  }
  function showSheet() {
    renderSheet();
    if (!sheet.open) sheet.showModal();
    clearInterval(timer); timer = setInterval(tick, 1000);
  }
  function total(s) { return state.b.promo ? 0 : priceOf(s); }
  function summaryHTML(s) {
    return '<div class="sum el-' + s.el + '"><span class="el-tag">' + esc(t("e." + s.el)) + "</span><h3>" + esc(cname(s)) + "</h3>" +
      "<p>" + esc(cap1(longDate(s.day))) + " · " + esc(t("with", { name: s.who })) + "</p>" +
      '<ol class="tl"><li><b>' + range(s.h, s.h + 1) + "</b>" + esc(cname(s)) + "</li>" +
      '<li class="spa"><b>' + esc(t("spa.until", { e: until(s.h) })) + "</b>" + esc(t("spa.tl")) + "</li></ol></div>";
  }
  function totHTML(s) {
    return '<div class="tot"><small>' + esc(t("total")) + "</small><b>" + money(total(s)) + "</b>" + (total(s) < regOf(s) ? "<s>" + money(regOf(s)) + "</s>" : "") + "</div>";
  }
  function linesHTML(s, b) {
    var p = priceOf(s), reg = Math.max(regOf(s), p);
    return '<ul class="lines"><li><span>' + esc(cname(s)) + "<br><small>" + esc(cap1(fmt(s.day, { weekday: "short", day: "numeric", month: "short" }))) + ", " + hm(s.h) + " " + ap(s.h) + "</small></span><b>" + money(reg) + "</b></li>" +
      (p < reg ? "<li><span>" + esc(t("l.found")) + "</span><b>−" + money(reg - p) + "</b></li>" : "") +
      "<li><span>" + esc(t("l.spa")) + "</span><b>" + esc(t("l.free")) + "</b></li>" +
      (b.promo ? "<li><span>" + esc(t("l.code", { c: PROMO })) + "</span><b>−" + money(p) + "</b></li>" : "") +
      "<li><b>" + esc(t("total")) + "</b><b>" + money(total(s)) + "</b></li></ul>";
  }
  function mmss(ms) { var x = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(x / 60) + ":" + String(x % 60).padStart(2, "0"); }

  /* the booking request sent by WhatsApp while online payment is not switched on */
  function waURL(s, b) {
    var lines = [t("wa.hi"),
      "• " + t("wa.class") + ": " + cname(s) + " " + t("with", { name: s.who }),
      "• " + t("wa.date") + ": " + cap1(longDate(s.day)) + ", " + hm(s.h) + " " + ap(s.h),
      "• " + t("wa.price") + ": " + money(priceOf(s)) + " COP",
      "• " + t("wa.name") + ": " + b.f.name,
      "• WhatsApp: " + b.f.wa,
      "• " + t("wa.email") + ": " + b.f.email,
      "• " + t("wa.first") + ": " + (b.f.first ? t("wa.yes") : t("wa.no")),
      "", t("wa.waiver")];
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  function renderSheet() {
    var b = state.b, s = find(b.id) || {}, html = "", f = "";
    document.querySelectorAll("#steps li").forEach(function (li) {
      var n = +li.getAttribute("data-step");
      li.className = b.step === 4 || n < b.step ? "done" : n === b.step ? "on" : "";
    });
    if (b.step === 3 && b.pending) {
      /* back from Wompi and the bank has not answered yet: the page keeps asking Vorzal for a while */
      html += '<h2 id="sheetTitle">' + esc(t("pend.title")) + "</h2>" + summaryHTML(s) +
        '<p class="hold">' + IC.clock + "<span>" + esc(t(b.pending === "long" ? "pend.long" : "pend.text", { email: b.f.email })) + "</span></p>";
      f = '<button type="button" class="btn btn-ghost btn-wide" id="doneBtn">' + esc(t("done")) + "</button>";
    } else if (b.step === 1) {
      if (b.expired) html += '<p class="alert" role="alert">' + esc(t("expired")) + "</p>";
      if (b.fail) html += '<p class="alert" role="alert">' + esc(t(b.fail)) + "</p>";
      html += '<h2 id="sheetTitle">' + esc(t("p1.title")) + "</h2>" + summaryHTML(s) +
        '<p class="spa-note">' + IC.drop + "<span>" + esc(t("spa.note")) + "</span></p>";
      if (DEMO) {
        html += '<div class="promo"><button type="button" class="link-btn" id="promoToggle" aria-expanded="' + b.showPromo + '">' + esc(t("promo.q")) + "</button>" +
          (b.showPromo ? '<div class="promo-row"><input type="text" id="promoIn" autocomplete="off" aria-label="' + esc(t("promo.ph")) + '" placeholder="' + esc(t("promo.ph")) + '" value="' + (b.promo ? PROMO : "") + '">' +
            '<button type="button" class="btn btn-ghost btn-sm" id="promoApply">' + esc(t("promo.apply")) + "</button></div>" +
            (b.promoMsg ? '<p class="msg ' + (b.promo ? "ok" : "bad") + '" role="status">' + esc(t(b.promoMsg)) + "</p>" : "") +
            '<p class="hint">' + esc(t("promo.hint")) + "</p>" : "") + "</div>";
      }
      f = totHTML(s) + '<button type="button" class="btn btn-primary" data-go="2">' + esc(t("continue")) + "</button>";
    } else if (b.step === 2) {
      var e = b.errs;
      var field = function (id, key, type, val, ac, extra) {
        return '<div class="field"><label for="' + id + '">' + esc(t(key)) + '</label><input type="' + type + '" id="' + id + '" autocomplete="' + ac + '" value="' + esc(val) + '"' +
          (e[id] ? ' aria-invalid="true" aria-describedby="' + id + 'E"' : "") + (extra || "") + ">" +
          (e[id] ? '<span class="err" id="' + id + 'E">' + esc(t(e[id])) + "</span>" : "") + "</div>";
      };
      html += (b.fail ? '<p class="alert" role="alert">' + esc(t(b.fail)) + "</p>" : "") +
        '<h2 id="sheetTitle">' + esc(t("p2.title")) + "</h2>" +
        field("fName", "f.name", "text", b.f.name, "name") +
        field("fWa", "f.wa", "tel", b.f.wa, "tel", ' inputmode="tel" placeholder="300 123 4567"') +
        '<p class="hint" style="margin:-8px 0 14px">' + esc(t("f.waHint")) + "</p>" +
        field("fEmail", "f.email", "email", b.f.email, "email") +
        '<label class="check"><input type="checkbox" id="fFirst"' + (b.f.first ? " checked" : "") + "><span>" + esc(t("f.first")) + "</span></label>" +
        '<label class="check"><input type="checkbox" id="fWaiver"' + (b.f.waiver ? " checked" : "") + (e.fWaiver ? ' aria-invalid="true" aria-describedby="fWaiverE"' : "") + "><span>" + esc(t("f.waiver")) + "</span></label>" +
        (e.fWaiver ? '<p class="msg bad" id="fWaiverE" style="margin:-6px 0 12px">' + esc(t(e.fWaiver)) + "</p>" : "") +
        '<button type="button" class="link-btn" id="polToggle" aria-expanded="' + b.showPolicy + '" style="margin:0 0 12px 32px">' + esc(t("f.read")) + "</button>" +
        (b.showPolicy ? '<p class="policy">' + esc(t("policy")) + "</p>" : "");
      f = '<button type="button" class="link-btn" data-go="1">' + esc(t("back")) + '</button><button type="button" class="btn btn-primary" data-go="3"' + (b.busy ? " disabled" : "") + ">" + esc(t(b.busy ? "busy" : "toPay")) + "</button>";
    } else if (b.step === 3 && !PAY) {
      html += '<h2 id="sheetTitle">' + esc(t("p3.title")) + "</h2>" + linesHTML(s, b) +
        '<p class="pre-note">' + IC.wa + "<span>" + esc(t("pre.note")) + "</span></p>";
      f = '<button type="button" class="link-btn" data-go="2">' + esc(t("back")) + '</button><a class="btn btn-primary btn-wide" id="waBook" href="' + esc(waURL(s, b)) +
        '" target="_blank" rel="noopener">' + IC.wa + esc(t("pre.btn")) + "</a>";
    } else if (b.step === 3) {
      html += '<p class="hold">' + IC.clock + "<span>" + esc(t("hold")) + ' <b id="holdT">' + mmss(b.holdEnd - Date.now()) + "</b></span></p>" +
        (b.declined ? '<p class="alert" role="alert">' + esc(t("declined")) + "</p>" : "") +
        '<h2 id="sheetTitle">' + esc(t("p3.title")) + "</h2>" + linesHTML(s, b) +
        (total(s) > 0 ? '<p class="hint">' + esc(t("payWith")) + '</p><div class="methods"><span>' + esc(t("m.card")) + "</span><span>PSE</span><span>Nequi</span><span>Bancolombia</span><span>Daviplata</span></div>" +
          '<p class="secure">' + IC.shield + "<span>" + esc(t("secure")) + "</span></p>" : "");
      f = '<button type="button" class="link-btn" data-go="2">' + esc(t("back")) + '</button><button type="button" class="btn btn-primary btn-wide" id="payBtn">' +
        esc(total(s) > 0 ? t("pay", { p: money(total(s)) }) : t("confirm")) + "</button>";
    } else if (!PAY) {
      html += '<div class="done-ic wa-ic">' + IC.wa + '</div><h2 id="sheetTitle">' + esc(t("p4.title")) + "</h2>" +
        '<p style="color:var(--ink-2);margin:-6px 0 18px">' + esc(t("p4.text")) + "</p>" + summaryHTML(s) +
        '<div class="bring"><h3>' + esc(t("bring")) + "</h3><ul><li>" + esc(t("b1")) + "</li><li>" + esc(t("b2")) + "</li><li>" + esc(t("b3")) + "</li><li>" + esc(t("b4")) + "</li></ul></div>" +
        '<div class="done-actions"><a class="btn btn-primary" href="' + esc(waURL(s, b)) + '" target="_blank" rel="noopener">' + IC.wa + esc(t("pre.again")) + '</a><a class="btn btn-ghost" href="/location">' + esc(t("getHere")) + "</a></div>";
      f = '<button type="button" class="btn btn-ghost btn-wide" id="doneBtn">' + esc(t("done")) + "</button>";
    } else {
      html += '<div class="done-ic">' + IC.check + '</div><h2 id="sheetTitle">' + esc(t("p4.title")) + "</h2>" +
        '<p style="color:var(--ink-2);margin:-6px 0 18px">' + esc(t("p4.text", { email: b.f.email })) + "</p>" + summaryHTML(s) +
        '<p class="ref">' + esc(t("ref")) + " <b>" + esc(b.ref) + "</b></p>" +
        '<div class="bring"><h3>' + esc(t("bring")) + "</h3><ul><li>" + esc(t("b1")) + "</li><li>" + esc(t("b2")) + "</li><li>" + esc(t("b3")) + "</li><li>" + esc(t("b4")) + "</li></ul></div>" +
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
  function focusTitle() { var h = $("sheetTitle"); if (h) { h.setAttribute("tabindex", "-1"); h.focus(); } }
  function go(n) {
    var b = state.b;
    readForm();
    if (n === 3 && b.step === 2 && !validate()) {
      renderSheet();
      var first = body.querySelector('[aria-invalid="true"]'); if (first) first.focus();
      return;
    }
    if (n === 2) b.expired = false;
    b.fail = null;
    if (n === 3 && b.step === 2 && live && PAY) { reserve(); return; }   /* Vorzal holds the spot from here and prepares the payment */
    if (n === 3 && DEMO && (!b.holdEnd || b.holdEnd <= Date.now())) b.holdEnd = Date.now() + HOLD_MS;   /* the demo's pretend hold */
    b.step = n; b.declined = false;
    renderSheet(); focusTitle();
  }
  function tick() {
    var b = state.b; if (!b || !b.holdEnd || b.step === 4 || b.pending) return;
    var left = b.holdEnd - Date.now(), el = $("holdT");
    if (el) el.textContent = mmss(left);
    if (left <= 0) { b.holdEnd = 0; b.expired = true; b.step = 1; renderSheet(); }
  }
  function confirmBooking() {
    var b = state.b;
    state.mine[b.id] = true;
    if (DEMO) b.ref = "EHC-" + Math.random().toString(36).slice(2, 8).toUpperCase();   /* a real booking carries Vorzal's reference */
    else store("ehc.mine", state.mine);
    b.step = 4; b.holdEnd = 0; b.pending = null;
    renderSheet(); renderAll(); focusTitle();
  }

  /* ---------- Vorzal: the club's booking system ---------- */
  /* every call answers { ok, status, data }; a network failure is { ok: false, status: 0 } */
  function api(method, path, payload) {
    return fetch(VORZAL + path, { method: method, headers: payload ? { "Content-Type": "application/json" } : undefined, body: payload ? JSON.stringify(payload) : undefined })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (d) { return { ok: res.ok, status: res.status, data: d }; }); })
      .catch(function () { return { ok: false, status: 0, data: {} }; });
  }
  var here = function () { return location.origin + location.pathname; };

  /* the timetable and spots left. The first answer switches the page from "loading" to live; no answer means the
     built-in timetable and the WhatsApp booking stay in place. */
  function load() {
    if (!PAYMENTS_LIVE || DEMO) return Promise.resolve();
    return api("GET", "?from=" + ymd(monday(0)) + "&days=14").then(function (r) {
      var first = loading;
      loading = false;
      if (r.ok && r.data.classes) live = r.data.classes;
      else if (first) PAY = false;
      if (first || !state.b) { applyStatic(); renderAll(); }
    });
  }

  /* step 2 → 3: Vorzal takes the spot (held for 15 minutes) and answers with the Wompi payment link */
  function reserve() {
    var b = state.b;
    if (b.busy) return;
    b.busy = true; renderSheet();
    api("POST", "/book", { class_id: b.id, name: b.f.name, phone: b.f.wa, email: b.f.email, lang: L(), first_visit: b.f.first, return_url: here() }).then(function (r) {
      if (state.b !== b) return;
      b.busy = false;
      var err = r.data && r.data.error;
      if (r.ok && r.data.booking) {
        b.bid = r.data.booking.id; b.ref = r.data.booking.code; b.payUrl = r.data.payment_url || "";
        if (r.data.booking.state === "confirmed") { confirmBooking(); return; }
        b.holdEnd = Date.parse(r.data.booking.hold_expires_at) || Date.now() + HOLD_MS;
        b.step = 3; b.declined = false;
      } else if (err === "full" || err === "closed" || err === "not_found") { b.step = 1; b.fail = "fullNow"; load(); }
      else if (err === "already_booked") b.fail = "already";
      else if (err === "bad_phone") b.errs = { fWa: "err.wa" };
      else if (err === "bad_email") b.errs = { fEmail: "err.email" };
      else { PAY = false; b.step = 3; applyStatic(); }   /* Vorzal can't take it right now: this booking finishes on WhatsApp */
      renderSheet(); focusTitle();
    });
  }

  /* Online payment. The demo opens a simulated checkout; a real booking goes to Wompi's checkout with the link Vorzal made.
     The booking is remembered in this browser so the page can pick it up when Wompi sends the visitor back. */
  function startPayment() {
    if (DEMO) { openSim(); return; }
    var b = state.b;
    if (!b.payUrl) return;
    store("ehc.pending", { bid: b.bid, f: b.f });
    location.href = b.payUrl;
  }

  /* Back from Wompi: the address carries the booking (?booking=) and Wompi's payment id (id=). Vorzal says where it stands. */
  function resume() {
    var q = new URLSearchParams(location.search), bid = q.get("booking") || "", tx = q.get("id") || "";
    var glued = /^([0-9a-f-]{36})\?id=(.+)$/i.exec(bid);   /* in case the payment id was added with a second "?" */
    if (glued) { bid = glued[1]; tx = tx || glued[2]; }
    var kept = read("ehc.pending");
    var sent = !!bid || !!tx;   /* Wompi sent the visitor back */
    /* Wompi shows its own "payment approved" page first, and some visitors close it and come back on their own later:
       this browser remembers the booking, so the page can still tell them they are booked. */
    if (!bid && kept) bid = kept.bid;
    if (!bid) return;
    ["booking", "id", "env"].forEach(function (k) { q.delete(k); });
    if (sent) history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q.toString() : ""));
    check(bid, tx, kept && kept.bid === bid ? kept.f : null, 0, sent);
  }
  function check(bid, tx, f, tries, sent) {
    api("GET", "/bookings/" + bid + (tx ? "?tx=" + encodeURIComponent(tx) + "&return_url=" + encodeURIComponent(here()) : "")).then(function (r) {
      if (!r.ok || !r.data.booking) return;
      var d = r.data, st = d.state, id = d.booking.class_id;
      /* a visitor who came back on their own only hears good news: an unpaid or lapsed booking is not put in front of them again */
      if (!sent && st !== "confirmed") { if (st === "expired" || st === "cancelled") store("ehc.pending", null); return; }
      if (st === "confirmed") { state.mine[id] = true; store("ehc.mine", state.mine); store("ehc.pending", null); }
      if (st === "cancelled") { store("ehc.pending", null); return; }
      for (var w = 0; w < 2; w++) if (sessions(w).some(function (x) { return x.id === id; })) state.week = w;
      var s = find(id);
      if (!s) { renderAll(); return; }
      state.day = s.di;
      var b = state.b && state.b.bid === bid ? state.b : newBooking(id);
      b.bid = bid; b.ref = d.booking.code; b.payUrl = d.payment_url || "";
      if (f) b.f = f; else if (!b.f.email) { b.f.name = d.booking.name || ""; b.f.email = d.booking.email || ""; b.f.waiver = true; }
      b.holdEnd = Date.parse(d.booking.hold_expires_at) || 0;
      b.pending = null; b.declined = false; b.expired = false;
      if (st === "confirmed") { b.step = 4; b.holdEnd = 0; }
      else if (st === "expired") { b.step = 1; b.expired = true; b.holdEnd = 0; store("ehc.pending", null); }
      else if (st === "pending") {
        b.step = 3; b.pending = tries < 15 ? "short" : "long";
        if (tries < 15) setTimeout(function () { if (state.b === b) check(bid, tx, null, tries + 1, sent); }, 4000);
      }
      else { b.step = 3; b.declined = st === "declined"; }   /* declined, or came back without paying: the spot is still held */
      state.b = b;
      renderAll(); showSheet(); focusTitle();
    });
  }
  function openSim() {
    var ms = [["card", t("m.card")], ["pse", "PSE"], ["nequi", "Nequi"], ["bancolombia", "Bancolombia"], ["daviplata", "Daviplata"]];
    $("simMethods").innerHTML = ms.map(function (m) {
      return '<button type="button" data-m="' + m[0] + '" aria-pressed="' + (state.b.method === m[0]) + '">' + esc(m[1]) + "</button>";
    }).join("");
    sim.showModal();
  }
  function downloadICS() {
    var b = state.b, s = find(b.id);
    function z(d) { return new Date(d.getTime() + TZ_MS).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
    var end = new Date(s.start.getTime() + HOUR);   /* the calendar holds the class hour only; the spa is optional */
    var title = cname(s) + " · Element Health Club";
    var desc = t("ics.desc") + " " + t("ics.spa", { e: until(s.h) }) + " " + t("ref") + ": " + b.ref;
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Element Health Club//Schedule//ES", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      "UID:" + b.ref + "@elementhealthclub.com", "DTSTAMP:" + z(new Date(Date.now() - TZ_MS)), "DTSTART:" + z(s.start), "DTEND:" + z(end),
      "SUMMARY:" + title.replace(/[,;]/g, "\\$&"), "DESCRIPTION:" + desc.replace(/[,;]/g, "\\$&"), "LOCATION:Element Health Club\\, Tv 39D #74-105 Piso 4\\, Laureles - Estadio\\, Medellín",
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
      case "waBook":   /* WhatsApp opens in a new tab; the panel moves on to the "almost there" step */
        setTimeout(function () { if (state.b) { state.b.step = 4; renderSheet(); focusTitle(); } }, 300); break;
      case "promoToggle": state.b.showPromo = !state.b.showPromo; renderSheet(); var pi = $("promoIn"); if (pi) pi.focus(); break;
      case "promoApply":
        var ok = $("promoIn").value.trim().toUpperCase() === PROMO;
        state.b.promo = ok; state.b.promoMsg = ok ? "promo.ok" : "promo.bad"; renderSheet(); break;
      case "polToggle": readForm(); state.b.showPolicy = !state.b.showPolicy; renderSheet(); $("polToggle").focus(); break;
      case "payBtn": if (total(find(state.b.id)) > 0) startPayment(); else confirmBooking(); break;
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
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter" && ev.target.id === "promoIn") { ev.preventDefault(); $("promoApply").click(); }
  });
  sheet.addEventListener("close", function () {
    clearInterval(timer); timer = null;
    state.b = null;
    if (sim.open) sim.close();
    renderAll();
    load();   /* spots may have changed while the panel was open */
    var tr = state.trigger && document.querySelector('[data-book="' + (state.trigger.getAttribute("data-book") || "") + '"]');
    if (tr && !tr.disabled) tr.focus();
  });
  sheet.addEventListener("click", function (ev) { if (ev.target === sheet) sheet.close(); });   /* click on the backdrop */

  /* re-render when the visitor switches EN / ES */
  new MutationObserver(function () { applyStatic(); renderAll(); if (state.b) renderSheet(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  if (DEMO) { var mb = $("mockBar"); if (mb) mb.hidden = false; }
  applyStatic();
  renderAll();
  /* Vorzal's timetable replaces the built-in one as soon as it arrives; then a visitor coming back from Wompi is picked up */
  load().then(resume);
  setInterval(function () { if (!document.hidden && !state.b) load(); }, 60000);   /* keep "Last spots" and "Full" current */
})();
