/*
  Memberships: joining online. A plan's Reserve button opens a panel: name, WhatsApp, email and an OK to be charged
  every month. The card or Nequi account is saved in Wompi's own window (the card number never touches this site),
  and Vorzal (the club's booking system) charges the first month at once and then every month on the same day.
  Prices charged come from Vorzal (Members → Prices in the Vorzal dashboard), so keep the prices on this page the same.
  If Vorzal can't be reached, or a plan isn't set up there, the Reserve button keeps opening WhatsApp as before.

  Photo: on the welcome screen the new member can add a photo of their face (optional, with a box to tick first), so the
  front desk recognizes them at the entrance. It is made small here and sent to Vorzal, which keeps it private; they can
  change or remove it later on their membership page.

  Manage my membership: any link with a data-manage attribute opens a small panel that asks for the member's email;
  Vorzal emails the link to their own membership page (change card or Nequi, freeze, cancel). Same fallback to WhatsApp.
*/
(function () {
  "use strict";

  var VORZAL = "https://www.vorzal.com/api/classes/element_health_club";
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {   /* local testing only: ?api=<address> points the page at another Vorzal */
    var apiOverride = new URLSearchParams(location.search).get("api");
    if (apiOverride) VORZAL = apiOverride;
  }
  var WA_NUMBER = "573106508588";

  var S = {
    en: {
      title: "Join {plan}", perMonth: "{p} COP a month",
      how: "We charge {p} today, then automatically every month on the same day. Cancel or freeze anytime from your membership page (the link is in your emails).",
      packNote: "Bought the 3-class pack in the last 7 days? Use the same WhatsApp number and its price comes off today's charge.",
      name: "Full name", wa: "WhatsApp", waHint: "Use the number you book classes with.", email: "Email",
      agree: "I agree to be charged {p} every month until I cancel.",
      err: { name: "Please enter your name.", wa: "Please enter a valid WhatsApp number.", email: "Please enter a valid email.", agree: "Please accept to continue." },
      methods: "Card or Nequi", secure: "Your card or Nequi account is saved securely by Wompi. Element never sees your details.",
      cta: "Continue to payment", busy: "One moment…", close: "Close",
      working: "Confirming your first payment…", workingText: "This usually takes a few seconds.",
      doneTitle: "Welcome to Element{n}!", doneText: "Your {plan} membership is active. A confirmation is on its way to {email}.",
      paid: "Paid today", method: "Paid with", discount: "{d} off for your pack", next: "Next charge",
      classes: "Book your classes on the Classes page with this same WhatsApp number: they're included.", book: "Book a class",
      recovery: "Come any day, Monday to Saturday.", done: "Done",
      declined: "The payment wasn't approved{r}. No membership was created: try another card or Nequi.", again: "Try again",
      already: "You already have an active membership with this number or email. Questions? Message us on WhatsApp.",
      long: "Your bank is still confirming the payment. We'll email {email} as soon as it's approved.",
      failed: "Something went wrong. Please try again, or message us on WhatsApp.", waBtn: "Message us on WhatsApp",
      mKicker: "Members", mTitle: "Manage my membership",
      mText: "Type the email you joined with and we'll send you the link to your membership page. There you can see your payments, change your card, freeze or cancel.",
      mCta: "Email me the link", mSentTitle: "Check your inbox", mSentText: "If {email} has a membership with us, the link is on its way. It can take a minute, and it may land in spam.",
      mLink: "Email me my membership link",
      pTitle: "Add your photo (optional)", pText: "So we recognize you at the entrance. Face the camera, in good light, with no cap or sunglasses.",
      pAgree: "I agree that Element Health Club uses this photo to recognize me at the entrance. I can remove it from my membership page whenever I want.",
      pBtn: "Take or choose a photo", pAgain: "Change photo", pBusy: "Saving your photo…",
      pSaved: "Photo saved. You can change or remove it from your membership page (the link is in your email).",
      pErrAgree: "Tick the box first.", pErr: "We couldn't save that picture. Try another one, or add it later from your membership page."
    },
    es: {
      title: "Únete a {plan}", perMonth: "{p} COP al mes",
      how: "Cobramos {p} hoy y luego automáticamente cada mes el mismo día. Cancela o congela cuando quieras desde tu página de membresía (el enlace va en tus correos).",
      packNote: "¿Compraste el paquete de 3 clases en los últimos 7 días? Usa el mismo número de WhatsApp y su precio se descuenta del cobro de hoy.",
      name: "Nombre completo", wa: "WhatsApp", waHint: "Usa el número con el que reservas tus clases.", email: "Correo",
      agree: "Acepto que me cobren {p} cada mes hasta que cancele.",
      err: { name: "Escribe tu nombre.", wa: "Escribe un número de WhatsApp válido.", email: "Escribe un correo válido.", agree: "Debes aceptar para continuar." },
      methods: "Tarjeta o Nequi", secure: "Tu tarjeta o cuenta Nequi queda guardada de forma segura con Wompi. Element nunca ve tus datos.",
      cta: "Continuar al pago", busy: "Un momento…", close: "Cerrar",
      working: "Estamos confirmando tu primer pago…", workingText: "Suele tardar unos segundos.",
      doneTitle: "¡Te damos la bienvenida a Element{n}!", doneText: "Tu membresía {plan} está activa. Te enviamos la confirmación a {email}.",
      paid: "Pagado hoy", method: "Método de pago", discount: "{d} menos por tu paquete", next: "Próximo cobro",
      classes: "Reserva tus clases en la página de Clases con este mismo número de WhatsApp: están incluidas.", book: "Reservar una clase",
      recovery: "Ven cualquier día, de lunes a sábado.", done: "Listo",
      declined: "El pago no fue aprobado{r}. No se creó ninguna membresía: prueba con otra tarjeta o con Nequi.", again: "Intentar de nuevo",
      already: "Ya tienes una membresía activa con este número o correo. ¿Dudas? Escríbenos por WhatsApp.",
      long: "Tu banco aún está confirmando el pago. Te escribiremos a {email} apenas quede aprobado.",
      failed: "Algo salió mal. Inténtalo de nuevo o escríbenos por WhatsApp.", waBtn: "Escríbenos por WhatsApp",
      mKicker: "Miembros", mTitle: "Administra tu membresía",
      mText: "Escribe el correo con el que te inscribiste y te enviamos el enlace a tu página de membresía. Ahí ves tus pagos y puedes cambiar tu tarjeta, congelarla o cancelarla.",
      mCta: "Enviarme el enlace", mSentTitle: "Revisa tu correo", mSentText: "Si {email} tiene una membresía con nosotros, el enlace va en camino. Puede tardar un minuto, y puede llegar a spam.",
      mLink: "Enviarme el enlace de mi membresía",
      pTitle: "Agrega tu foto (opcional)", pText: "Para reconocerte en la entrada. Mira a la cámara, con buena luz, sin gorra ni gafas oscuras.",
      pAgree: "Acepto que Element Health Club use esta foto para reconocerme en la entrada. Puedo quitarla desde mi página de membresía cuando quiera.",
      pBtn: "Tomar o elegir una foto", pAgain: "Cambiar foto", pBusy: "Guardando tu foto…",
      pSaved: "Foto guardada. Puedes cambiarla o quitarla desde tu página de membresía (el enlace va en tu correo).",
      pErrAgree: "Marca la casilla primero.", pErr: "No pudimos guardar esa imagen. Prueba con otra, o agrégala después desde tu página de membresía."
    }
  };
  function L() { return document.documentElement.lang === "es" ? "es" : "en"; }
  function t(k, v) {
    var s = k.split(".").reduce(function (o, x) { return o && o[x]; }, S[L()]) || k;
    return String(s).replace(/\{(\w+)\}/g, function (_, n) { return v && v[n] != null ? v[n] : ""; });
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function money(n) { return "$" + Math.round(n).toLocaleString(L() === "es" ? "es-CO" : "en-US"); }
  function dateLong(iso) { return new Date(iso).toLocaleDateString(L() === "es" ? "es-CO" : "en-US", { day: "numeric", month: "long", timeZone: "America/Bogota" }); }

  function api(method, path, payload) {
    return fetch(VORZAL + path, { method: method, headers: payload ? { "Content-Type": "application/json" } : undefined, body: payload ? JSON.stringify(payload) : undefined })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (d) { return { ok: res.ok, status: res.status, data: d }; }); })
      .catch(function () { return { ok: false, status: 0, data: {} }; });
  }

  /* ---------- the panel ---------- */
  var dlg = document.createElement("dialog");
  dlg.className = "jn";
  dlg.setAttribute("aria-labelledby", "jnTitle");
  dlg.innerHTML = '<div class="jn-head"><span class="jn-kicker" id="jnKicker"></span><button type="button" class="jn-x" id="jnClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
    '<div class="jn-body" id="jnBody"></div><div class="jn-foot" id="jnFoot"></div>';
  document.body.appendChild(dlg);
  var body = dlg.querySelector("#jnBody"), foot = dlg.querySelector("#jnFoot");

  var plans = {}, publicKey = null, state = null, packCounts = false, manageReady = false;
  function plan() { return state && plans[state.key]; }
  function planName(p) { return (L() === "es" && p.name_es) || p.name; }

  function open(key) {
    /* Someone who closed Wompi's window without saving comes back to the details they typed. */
    var kept = state && state.step === "form" ? state.f : null;
    state = { key: key, step: "form", f: kept || { name: "", wa: "", email: "", agree: false }, errs: {}, busy: false, result: null, tries: 0 };
    render();
    if (!dlg.open) dlg.showModal();
  }

  /* Manage my membership: the email is all we ask; the link goes to that inbox, never shown here. */
  function openManage(email, send) {
    state = { step: "manage", f: { email: email || "" }, errs: {}, busy: false };
    render();
    if (!dlg.open) dlg.showModal();
    if (send) sendLink();
  }
  function renderManage() {
    dlg.querySelector("#jnClose").setAttribute("aria-label", t("close"));
    dlg.querySelector("#jnKicker").textContent = t("mKicker");
    var html, f;
    if (state.step === "manage") {
      var bad = state.errs.jnMEmail;
      html = '<h2 id="jnTitle">' + esc(t("mTitle")) + '</h2><p class="jn-how">' + esc(t("mText")) + "</p>" +
        (state.fail ? '<p class="jn-alert" role="alert">' + esc(state.fail) + "</p>" : "") +
        '<div class="jn-field"><label for="jnMEmail">' + esc(t("email")) + '</label><input type="email" id="jnMEmail" autocomplete="email" value="' + esc(state.f.email) + '"' +
        (bad ? ' aria-invalid="true" aria-describedby="jnMEmailE"' : "") + ">" + (bad ? '<span class="jn-err" id="jnMEmailE">' + esc(t("err.email")) + "</span>" : "") + "</div>";
      f = '<button type="button" class="btn btn-primary jn-wide" id="jnSend"' + (state.busy ? " disabled" : "") + ">" + esc(t(state.busy ? "busy" : "mCta")) + "</button>";
    } else {
      html = '<div class="jn-ok" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg></div>' +
        '<h2 id="jnTitle">' + esc(t("mSentTitle")) + '</h2><p class="jn-how">' + esc(t("mSentText", { email: state.f.email })) + "</p>";
      f = '<button type="button" class="btn btn-primary jn-wide" id="jnDone">' + esc(t("done")) + "</button>";
    }
    body.innerHTML = html;
    foot.innerHTML = f;
    foot.hidden = false;
  }
  function sendLink() {
    var input = dlg.querySelector("#jnMEmail");
    if (input) state.f.email = input.value.trim();
    state.fail = null;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(state.f.email)) { state.errs = { jnMEmail: "email" }; render(); var el = dlg.querySelector("#jnMEmail"); if (el) el.focus(); return; }
    state.errs = {}; state.busy = true; render();
    api("POST", "/member-link", { email: state.f.email }).then(function (r) {
      state.busy = false;
      if (r.ok) state.step = "manageSent"; else state.fail = t("failed");
      render();
    });
  }

  function render() {
    if (state && (state.step === "manage" || state.step === "manageSent")) { renderManage(); return; }
    var p = plan(); if (!p) return;
    var price = money(p.price), html = "", f = "";
    dlg.querySelector("#jnClose").setAttribute("aria-label", t("close"));
    dlg.querySelector("#jnKicker").textContent = t("perMonth", { p: price });
    if (state.step === "form") {
      var e = state.errs;
      var field = function (id, key, type, val, ac, extra, hint) {
        return '<div class="jn-field"><label for="' + id + '">' + esc(t(key)) + '</label><input type="' + type + '" id="' + id + '" autocomplete="' + ac + '" value="' + esc(val) + '"' +
          (e[id] ? ' aria-invalid="true" aria-describedby="' + id + 'E"' : "") + (extra || "") + ">" +
          (hint ? '<span class="jn-hint">' + esc(hint) + "</span>" : "") + (e[id] ? '<span class="jn-err" id="' + id + 'E">' + esc(t("err." + e[id])) + "</span>" : "") + "</div>";
      };
      html = '<h2 id="jnTitle">' + esc(t("title", { plan: planName(p) })) + "</h2>" +
        '<p class="jn-how">' + esc(t("how", { p: price })) + "</p>" +
        (p.includes_classes && packCounts ? '<p class="jn-note">' + esc(t("packNote")) + "</p>" : "") +
        (state.fail ? '<p class="jn-alert" role="alert">' + esc(state.fail) + "</p>" : "") +
        field("jnName", "name", "text", state.f.name, "name") +
        field("jnWa", "wa", "tel", state.f.wa, "tel", ' inputmode="tel" placeholder="300 123 4567"', p.includes_classes ? t("waHint") : "") +
        field("jnEmail", "email", "email", state.f.email, "email") +
        '<label class="jn-check"><input type="checkbox" id="jnAgree"' + (state.f.agree ? " checked" : "") + (e.jnAgree ? ' aria-invalid="true"' : "") + "><span>" + esc(t("agree", { p: price })) + "</span></label>" +
        (e.jnAgree ? '<p class="jn-err">' + esc(t("err.agree")) + "</p>" : "") +
        '<p class="jn-methods"><b>' + esc(t("methods")) + "</b> · " + esc(t("secure")) + "</p>";
      f = '<button type="button" class="btn btn-primary jn-wide" id="jnGo"' + (state.busy ? " disabled" : "") + ">" + esc(t(state.busy ? "busy" : "cta")) + "</button>";
    } else if (state.step === "working") {
      html = '<h2 id="jnTitle">' + esc(t("working")) + '</h2><p class="jn-how">' + esc(state.long ? t("long", { email: state.f.email }) : t("workingText")) + '</p><div class="jn-spin" aria-hidden="true"></div>';
      f = state.long ? '<button type="button" class="btn btn-ghost jn-wide" id="jnDone">' + esc(t("done")) + "</button>" : "";
    } else if (state.step === "done") {
      var m = state.result || {};
      var first = state.f.name.trim().split(/\s+/)[0];
      html = '<div class="jn-ok" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg></div>' +
        '<h2 id="jnTitle">' + esc(t("doneTitle", { n: first ? ", " + first : "" })) + "</h2>" +
        '<p class="jn-how">' + esc(t("doneText", { plan: planName(p), email: state.f.email })) + "</p>" +
        '<ul class="jn-lines">' +
        (m.paid_today != null ? "<li><span>" + esc(t("paid")) + "</span><b>" + money(m.paid_today) + "</b></li>" : "") +
        (m.discount ? "<li><span>" + esc(t("discount", { d: money(m.discount) })) + "</span><b>✓</b></li>" : "") +
        (m.next_charge_at ? "<li><span>" + esc(t("next")) + "</span><b>" + esc(dateLong(m.next_charge_at)) + " · " + money(p.price) + "</b></li>" : "") +
        (m.method ? "<li><span>" + esc(t("method")) + "</span><b>" + esc(m.method) + "</b></li>" : "") +
        "</ul>" +
        '<p class="jn-note">' + esc(p.includes_classes ? t("classes") : t("recovery")) + "</p>" +
        (m.id ? photoHTML() : "");
      f = p.includes_classes
        ? '<a class="btn btn-primary jn-wide" href="/schedule">' + esc(t("book")) + "</a>"
        : '<button type="button" class="btn btn-primary jn-wide" id="jnDone">' + esc(t("done")) + "</button>";
    } else {   /* declined, already a member, or an error */
      var msg = state.step === "declined" ? t("declined", { r: state.reason ? ": " + state.reason.replace(/\.$/, "") : "" }) : state.step === "already" ? t("already") : t("failed");
      html = '<h2 id="jnTitle">' + esc(t("title", { plan: planName(p) })) + '</h2><p class="jn-alert" role="alert">' + esc(msg) + "</p>";
      f = (state.step === "declined" || state.step === "error" ? '<button type="button" class="btn btn-primary" id="jnAgain">' + esc(t("again")) + "</button>" : "") +
        (state.step === "already" ? '<button type="button" class="btn btn-primary" id="jnLink">' + esc(t("mLink")) + "</button>" : "") +
        '<a class="btn btn-ghost" target="_blank" rel="noopener" href="https://wa.me/' + WA_NUMBER + '">' + esc(t("waBtn")) + "</a>";
    }
    body.innerHTML = html;
    foot.innerHTML = f;
    foot.hidden = !f;
  }

  /* The photo block on the welcome screen. state.photo: { ok (box ticked), busy, saved (a small preview), err } */
  function photoHTML() {
    var ph = state.photo || (state.photo = { ok: false, busy: false, saved: null, err: null });
    return '<div class="jn-photo">' +
      (ph.saved ? '<img class="jn-photo-img" alt="" src="' + esc(ph.saved) + '">' : "") +
      '<div class="jn-photo-main"><b>' + esc(t("pTitle")) + "</b>" +
      '<p>' + esc(ph.saved ? t("pSaved") : t("pText")) + "</p>" +
      (ph.saved ? "" : '<label class="jn-check"><input type="checkbox" id="jnPhotoOk"' + (ph.ok ? " checked" : "") + "><span>" + esc(t("pAgree")) + "</span></label>") +
      (ph.err ? '<p class="jn-err" role="alert">' + esc(t(ph.err)) + "</p>" : "") +
      '<button type="button" class="btn btn-ghost" id="jnPhotoBtn"' + (ph.busy ? " disabled" : "") + ">" + esc(t(ph.busy ? "pBusy" : ph.saved ? "pAgain" : "pBtn")) + "</button>" +
      '<input type="file" accept="image/*" id="jnPhotoFile" hidden></div></div>';
  }
  /* A phone photo is several megabytes: draw it at most 900 px wide or tall and send that as a JPEG. */
  function smallPhoto(file) {
    return new Promise(function (ok, no) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        try {
          var k = Math.min(1, 900 / Math.max(img.naturalWidth, img.naturalHeight));
          var c = document.createElement("canvas");
          c.width = Math.max(1, Math.round(img.naturalWidth * k)); c.height = Math.max(1, Math.round(img.naturalHeight * k));
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          ok(c.toDataURL("image/jpeg", 0.86));
        } catch (e) { no(e); } finally { URL.revokeObjectURL(url); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); no(new Error("not a picture")); };
      img.src = url;
    });
  }
  function sendPhoto(file) {
    var m = state.result, ph = state.photo;
    if (!file || !m || !m.id || !ph) return;
    ph.busy = true; ph.err = null; render();
    smallPhoto(file).then(function (data) {
      return api("POST", "/join/" + m.id + "/photo", { photo: data, consent: true }).then(function (r) {
        ph.busy = false;
        if (r.ok) { ph.saved = data; ph.err = null; } else ph.err = "pErr";
        render();
      });
    }, function () { ph.busy = false; ph.err = "pErr"; render(); });
  }

  function readForm() {
    if (state.step !== "form") return;
    state.f.name = dlg.querySelector("#jnName").value.trim();
    state.f.wa = dlg.querySelector("#jnWa").value.trim();
    state.f.email = dlg.querySelector("#jnEmail").value.trim();
    state.f.agree = dlg.querySelector("#jnAgree").checked;
  }
  function validate() {
    var f = state.f, e = {}, digits = f.wa.replace(/\D/g, "");
    if (f.name.length < 2) e.jnName = "name";
    if (digits.length < 10 || digits.length > 15) e.jnWa = "wa";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.jnEmail = "email";
    if (!f.agree) e.jnAgree = "agree";
    state.errs = e;
    return !Object.keys(e).length;
  }

  /* Wompi's window, in "save a card or Nequi" mode; its script loads the first time it is needed. */
  var widgetReady = null;
  function loadWidget() {
    if (window.WidgetCheckout) return Promise.resolve();
    if (!widgetReady) widgetReady = new Promise(function (ok, no) {
      var s = document.createElement("script");
      s.src = "https://checkout.wompi.co/widget.js";
      s.onload = ok; s.onerror = function () { widgetReady = null; no(); };
      document.head.appendChild(s);
    });
    return widgetReady;
  }

  function go() {
    readForm();
    state.fail = null;
    if (!validate()) { render(); var bad = body.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }
    state.busy = true; render();
    loadWidget().then(function () {
      state.busy = false; render();
      dlg.close();   /* Wompi's window sits on top of the page; ours comes back with the answer */
      new window.WidgetCheckout({ publicKey: publicKey, widgetOperation: "tokenize" }).open(function (result) {
        var src = result && result.payment_source;
        dlg.showModal();
        if (!src || !src.token) { render(); return; }   /* closed without saving: back to the form */
        state.step = "working"; render();
        api("POST", "/join", { plan: state.key, name: state.f.name, phone: state.f.wa, email: state.f.email, lang: L(), token: src.token, token_type: src.type === "NEQUI" ? "NEQUI" : "CARD" }).then(answer);
      });
    }, function () { state.busy = false; state.step = "error"; render(); });
  }

  function answer(r) {
    var m = r.data && r.data.membership;
    if (!r.ok || !m) {
      var err = r.data && r.data.error;
      state.step = err === "already_member" ? "already" : err === "card_refused" ? "declined" : err === "bad_phone" || err === "bad_email" ? "form" : "error";
      if (err === "bad_phone") state.errs = { jnWa: "wa" };
      if (err === "bad_email") state.errs = { jnEmail: "email" };
      render(); return;
    }
    state.result = m;
    if (m.state === "active" || m.state === "past_due") { state.step = "done"; render(); return; }
    if (m.state === "declined") { state.step = "declined"; state.reason = m.declined_reason || ""; render(); return; }
    /* still waiting on Wompi or the bank: ask again for a while, then say we'll email */
    state.tries++;
    state.long = state.tries > 15;
    state.step = "working"; render();
    if (!state.long) setTimeout(function () { if (state && state.step === "working") api("GET", "/join/" + m.id).then(answer); }, 3000);
  }

  dlg.addEventListener("click", function (ev) {
    if (ev.target === dlg) { dlg.close(); return; }
    var el = ev.target.closest("button, a"); if (!el) return;
    if (el.id === "jnClose" || el.id === "jnDone") dlg.close();
    else if (el.id === "jnGo") go();
    else if (el.id === "jnAgain") { state.step = "form"; state.errs = {}; render(); }
    else if (el.id === "jnPhotoBtn") {
      var ph = state.photo, box = dlg.querySelector("#jnPhotoOk");
      if (box) ph.ok = box.checked;
      if (!ph.saved && !ph.ok) { ph.err = "pErrAgree"; render(); return; }
      ph.err = null;
      dlg.querySelector("#jnPhotoFile").click();
    }
    else if (el.id === "jnSend") sendLink();
    else if (el.id === "jnLink") openManage(state.f.email, true);
  });
  dlg.addEventListener("change", function (ev) {
    if (!ev.target) return;
    if (ev.target.id === "jnPhotoOk" && state.photo) { state.photo.ok = ev.target.checked; if (ev.target.checked && state.photo.err === "pErrAgree") { state.photo.err = null; render(); } }
    if (ev.target.id === "jnPhotoFile") { var file = ev.target.files && ev.target.files[0]; ev.target.value = ""; sendPhoto(file); }
  });
  dlg.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter" && ev.target && ev.target.id === "jnMEmail") { ev.preventDefault(); sendLink(); }
  });

  /* "Manage my membership" links (the page's language switch redraws them, so the click is caught on the page) */
  document.addEventListener("click", function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest("[data-manage]");
    if (!a || !manageReady) return;   /* Vorzal not reachable: the link opens WhatsApp */
    ev.preventDefault();
    openManage("");
  });

  /* ---------- the Reserve buttons ---------- */
  api("GET", "/plans").then(function (r) {
    if (r.ok) manageReady = true;
    if (!r.ok || !r.data.payments || !r.data.payments.public_key) return;   /* not set up: WhatsApp as before */
    publicKey = r.data.payments.public_key;
    (r.data.plans || []).forEach(function (p) { if (p.kind === "membership") plans[p.key] = p; if (p.kind === "pack" && p.counts_toward_membership) packCounts = true; });
    document.querySelectorAll("article[data-plan]").forEach(function (card) {
      var key = card.getAttribute("data-plan"), btn = card.querySelector("a[data-wa]");
      if (!btn || !plans[key]) return;
      btn.addEventListener("click", function (ev) { ev.preventDefault(); open(key); });
      btn.removeAttribute("target");
    });
  });
})();
