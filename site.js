/* Element Health Club: shared behavior and EN/ES copy for every page. */
(function () {
  document.documentElement.classList.add("js");

  /* links from the old single-page site (/#experiences etc.) now live on their own pages */
  var moved = { "#elements": "/elements", "#experiences": "/experiences", "#day": "/a-day-here", "#memberships": "/memberships", "#location": "/location" };
  if (/^\/(index(\.html)?)?$/.test(location.pathname) && moved[location.hash]) {
    location.replace(moved[location.hash] + location.search);
    return;
  }
  var T = {
    en: {
      "meta.title": "Element Health Club · Laureles, Medellín",
      "meta.description": "A health and wellness club in Laureles, Medellín. Cold plunge, sauna, HIIT, pilates, dance exercise, trampoline fitness and a juice bar, all under one roof.",
      "meta.title.elements": "The four elements · Element Health Club",
      "meta.description.elements": "Water, fire, earth and air: the philosophy behind Element Health Club, a health and wellness club in Laureles, Medellín.",
      "meta.title.experiences": "Experiences · Element Health Club",
      "meta.description.experiences": "Cold plunge, sauna, HIIT, fitness classes, pilates, dance exercise, trampoline fitness and a juice bar at Element Health Club in Laureles, Medellín.",
      "meta.title.day": "A day at Element · Element Health Club",
      "meta.description.day": "Move, heat, cold, refuel, dance. See how a day at Element Health Club in Laureles, Medellín can flow.",
      "meta.title.memberships": "Memberships · Element Health Club",
      "meta.description.memberships": "Flex, Element and Recovery memberships at Element Health Club in Laureles, Medellín. Founding member pricing for a limited time. Contact us for rates.",
      "meta.title.location": "Location and hours · Element Health Club",
      "meta.description.location": "Find Element Health Club in Laureles, Medellín, near Segundo Parque and the Estadio metro station. Hours, contact details and WhatsApp booking.",
      "brand.tag": "Health Club · Laureles",
      "nav.elements": "The elements",
      "nav.experiences": "Experiences",
      "nav.day": "A day here",
      "nav.memberships": "Memberships",
      "nav.location": "Location",
      "nav.cta": "Book a visit",

      "hero.eyebrow": "Opening soon in Laureles, Medellín",
      "hero.title": "Where the body <em>finds its balance</em>",
      "hero.lead": "A health and wellness club built around the four elements. Plunge into ice water, sweat in the sauna, move through HIIT, pilates and dance exercise, then refuel at the juice bar. Everything you need to feel alive, in one place.",
      "hero.cta1": "Book a visit",
      "hero.cta2": "See all experiences",
      "hero.note": "Founding memberships are limited. Join the list to lock in opening pricing.",
      "hero.chip1": "Cold plunge · 4 °C",
      "hero.chip2": "Sauna · 85 °C",
      "stats.one": "experiences under one roof",
      "stats.two": "elements, one philosophy",
      "stats.three": "days a week in Laureles",

      "elements.eyebrow": "Our philosophy",
      "elements.title": "Four elements. One complete practice.",
      "elements.lead": "Real wellbeing is not one thing. It is contrast, movement, recovery and nourishment working together. We built the club so you can touch all four in a single visit.",
      "el.water.title": "Water",
      "el.water.text": "Shock the system, calm the mind. Cold immersion and hydration that resets you from the inside.",
      "el.fire.title": "Fire",
      "el.fire.text": "Heat, light and intensity. Sweat it out, recover faster and build real conditioning.",
      "el.earth.title": "Earth",
      "el.earth.text": "Strength, stability and control. The foundation that everything else is built on.",
      "el.air.title": "Air",
      "el.air.text": "Rhythm, bounce and joy. Movement that makes you forget you are exercising.",

      "svc.eyebrow": "Everything inside",
      "svc.title": "Nine ways to feel better today.",
      "svc.lead": "Drop in for one thing or stay for the whole circuit. Every experience is included in membership, and most are available as single sessions.",
      "svc.plunge.name": "Cold plunge",
      "svc.plunge.text": "Guided immersion at 4 °C to 8 °C. Reduces inflammation, sharpens focus and builds a calm you can carry all day.",
      "svc.sauna.name": "Sauna",
      "svc.sauna.text": "Traditional dry sauna up to 85 °C. Pair it with the plunge for the classic hot and cold contrast circuit.",
      "svc.hiit.name": "HIIT classes",
      "svc.hiit.text": "Forty-five minutes of high-intensity intervals, coached in small groups. Maximum result, minimum time.",
      "svc.fitness.name": "Fitness classes",
      "svc.fitness.text": "Strength, mobility and functional training for every level, led by coaches who know your name.",
      "svc.pilates.name": "Pilates",
      "svc.pilates.text": "Mat and reformer pilates to build core strength, posture and long, controlled movement.",
      "svc.dance.name": "Dance exercise classes",
      "svc.dance.text": "High-energy dance workouts led by local instructors. No experience needed, just bring your energy.",
      "svc.trampoline.name": "Trampoline fitness",
      "svc.trampoline.text": "Low-impact, high-energy rebounding classes. Great for the lymphatic system, better for your mood.",
      "svc.juice.name": "Juice & protein bar",
      "svc.juice.text": "Cold-pressed juices, protein shakes and post-session recovery drinks made with Colombian fruit.",
      "svc.cafe.name": "Smoothie café",
      "svc.cafe.text": "A café stand with smoothies, bowls, Colombian coffee and light, healthy food. Stay a while.",

      "day.eyebrow": "A day at Element",
      "day.title": "Come for an hour. Leave feeling like a new person.",
      "day.lead": "There is no right way to use the club, but here is one we love. Mix it up however your body asks.",
      "day.cta": "Plan your first visit",
      "day.1.title": "Move", "day.1.text": "Start with HIIT, pilates or a trampoline class. Wake the body up.",
      "day.2.title": "Heat", "day.2.text": "Fifteen minutes in the sauna to loosen everything.",
      "day.3.title": "Cold", "day.3.text": "Three minutes in the plunge. Breathe. This is the part you will talk about.",
      "day.5.title": "Refuel", "day.5.text": "Protein shake or a smoothie bowl at the café. Then go run your day.",
      "day.6.title": "Dance", "day.6.text": "Come back for a dance exercise class. Because you are in Medellín.",

      "plans.eyebrow": "Memberships",
      "plans.title": "Pick the rhythm that fits your life.",
      "plans.lead": "Founding member pricing is available for a limited time before opening. Contact us for current rates.",
      "plans.badge": "Most popular",
      "plans.cta": "Ask about pricing",
      "plans.flex.name": "Flex", "plans.flex.sub": "For when you want to drop in.",
      "plans.flex.1": "Single sessions and class packs", "plans.flex.2": "Sauna and cold plunge access", "plans.flex.3": "No commitment",
      "plans.full.name": "Element", "plans.full.sub": "The full club, every day.",
      "plans.full.1": "Unlimited classes: HIIT, pilates, fitness, trampoline and dance exercise",
      "plans.full.2": "Unlimited sauna and cold plunge",
      "plans.full.4": "Member discount at the juice bar and café",
      "plans.recovery.name": "Recovery", "plans.recovery.sub": "For athletes and busy bodies.",
      "plans.recovery.1": "Unlimited sauna and cold plunge", "plans.recovery.3": "Mobility classes",

      "loc.eyebrow": "Find us",
      "loc.title": "In the heart of Laureles.",
      "loc.lead": "Tree-lined streets, the best cafés in the city and now a place to take care of yourself. A short walk from Segundo Parque and the Estadio metro station.",
      "loc.address.label": "Address", "loc.address.value": "Laureles, Medellín, Antioquia. Exact address announced soon.",
      "loc.hours.label": "Hours", "loc.hours.value": "Monday to Saturday 6:00 to 20:00 · Sunday closed for private events",
      "loc.contact.label": "Contact",

      "cta.title": "Ready to find your element?",
      "cta.text": "Send us a message on WhatsApp to book a free first visit, ask about founding memberships or just say hello.",
      "cta.whatsapp": "Message us on WhatsApp",
      "cta.email": "Send an email",
      "wa.text": "Hi, I'd like to book a visit to Element Health Club.",

      "footer.copy": "© 2026 Element Health Club · Laureles, Medellín"
    },
    es: {
      "meta.title": "Element Health Club · Laureles, Medellín",
      "meta.description": "Un club de salud y bienestar en Laureles, Medellín. Cold plunge, sauna, HIIT, pilates, baile fitness, trampolín y bar de jugos, todo en un solo lugar.",
      "meta.title.elements": "Los cuatro elementos · Element Health Club",
      "meta.description.elements": "Agua, fuego, tierra y aire: la filosofía de Element Health Club, un club de salud y bienestar en Laureles, Medellín.",
      "meta.title.experiences": "Experiencias · Element Health Club",
      "meta.description.experiences": "Cold plunge, sauna, HIIT, clases de fitness, pilates, baile fitness, trampolín y bar de jugos en Element Health Club, Laureles, Medellín.",
      "meta.title.day": "Un día en Element · Element Health Club",
      "meta.description.day": "Muévete, calor, frío, recarga y baila. Así puede fluir un día en Element Health Club, en Laureles, Medellín.",
      "meta.title.memberships": "Membresías · Element Health Club",
      "meta.description.memberships": "Membresías Flex, Element y Recovery en Element Health Club, Laureles, Medellín. Precios de miembro fundador por tiempo limitado. Escríbenos para conocer las tarifas.",
      "meta.title.location": "Ubicación y horario · Element Health Club",
      "meta.description.location": "Encuentra Element Health Club en Laureles, Medellín, cerca de Segundo Parque y la estación Estadio del metro. Horario, contacto y reservas por WhatsApp.",
      "brand.tag": "Club de bienestar · Laureles",
      "nav.elements": "Los elementos",
      "nav.experiences": "Experiencias",
      "nav.day": "Un día aquí",
      "nav.memberships": "Membresías",
      "nav.location": "Ubicación",
      "nav.cta": "Reserva una visita",

      "hero.eyebrow": "Próximamente en Laureles, Medellín",
      "hero.title": "Donde el cuerpo <em>encuentra su equilibrio</em>",
      "hero.lead": "Un club de salud y bienestar inspirado en los cuatro elementos. Sumérgete en agua helada, suda en el sauna, muévete con HIIT, pilates y baile fitness, y recarga energía en el bar de jugos. Todo lo que necesitas para sentirte vivo, en un solo lugar.",
      "hero.cta1": "Reserva una visita",
      "hero.cta2": "Ver todas las experiencias",
      "hero.note": "Las membresías fundadoras son limitadas. Únete a la lista y asegura el precio de apertura.",
      "hero.chip1": "Cold plunge · 4 °C",
      "hero.chip2": "Sauna · 85 °C",
      "stats.one": "experiencias bajo un mismo techo",
      "stats.two": "elementos, una filosofía",
      "stats.three": "días a la semana en Laureles",

      "elements.eyebrow": "Nuestra filosofía",
      "elements.title": "Cuatro elementos. Una práctica completa.",
      "elements.lead": "El bienestar real no es una sola cosa. Es contraste, movimiento, recuperación y nutrición trabajando juntos. Diseñamos el club para que toques los cuatro en una sola visita.",
      "el.water.title": "Agua",
      "el.water.text": "Despierta el cuerpo, calma la mente. Inmersión en frío e hidratación que te reinician desde adentro.",
      "el.fire.title": "Fuego",
      "el.fire.text": "Calor, luz e intensidad. Suda, recupérate más rápido y construye una condición física real.",
      "el.earth.title": "Tierra",
      "el.earth.text": "Fuerza, estabilidad y control. La base sobre la que se construye todo lo demás.",
      "el.air.title": "Aire",
      "el.air.text": "Ritmo, salto y alegría. Movimiento que te hace olvidar que estás haciendo ejercicio.",

      "svc.eyebrow": "Todo lo que hay adentro",
      "svc.title": "Nueve formas de sentirte mejor hoy.",
      "svc.lead": "Ven por una sola cosa o quédate para el circuito completo. Todas las experiencias están incluidas en la membresía, y la mayoría también se pueden tomar por sesión.",
      "svc.plunge.name": "Cold plunge",
      "svc.plunge.text": "Inmersión guiada en agua de 4 °C a 8 °C. Reduce la inflamación, agudiza el enfoque y te da una calma que dura todo el día.",
      "svc.sauna.name": "Sauna",
      "svc.sauna.text": "Sauna seco tradicional hasta 85 °C. Combínalo con el cold plunge para el clásico circuito de contraste frío y calor.",
      "svc.hiit.name": "Clases de HIIT",
      "svc.hiit.text": "Cuarenta y cinco minutos de intervalos de alta intensidad en grupos pequeños. Máximo resultado, mínimo tiempo.",
      "svc.fitness.name": "Clases de fitness",
      "svc.fitness.text": "Fuerza, movilidad y entrenamiento funcional para todos los niveles, con entrenadores que saben tu nombre.",
      "svc.pilates.name": "Pilates",
      "svc.pilates.text": "Pilates en colchoneta y reformer para fortalecer el core, mejorar la postura y moverte con control.",
      "svc.dance.name": "Clases de baile fitness",
      "svc.dance.text": "Entrenamientos de baile llenos de energía con instructores locales. No necesitas experiencia, solo ganas de moverte.",
      "svc.trampoline.name": "Trampolín fitness",
      "svc.trampoline.text": "Clases de rebote de bajo impacto y alta energía. Buenísimo para el sistema linfático, mejor para el ánimo.",
      "svc.juice.name": "Bar de jugos y proteína",
      "svc.juice.text": "Jugos prensados en frío, batidos de proteína y bebidas de recuperación con fruta colombiana.",
      "svc.cafe.name": "Café de smoothies",
      "svc.cafe.text": "Un stand de café con smoothies, bowls, café colombiano y comida ligera y saludable. Quédate un rato.",

      "day.eyebrow": "Un día en Element",
      "day.title": "Ven por una hora. Sal sintiéndote otra persona.",
      "day.lead": "No hay una forma correcta de usar el club, pero esta es una que nos encanta. Cámbiala como tu cuerpo lo pida.",
      "day.cta": "Planea tu primera visita",
      "day.1.title": "Muévete", "day.1.text": "Empieza con HIIT, pilates o una clase de trampolín. Despierta el cuerpo.",
      "day.2.title": "Calor", "day.2.text": "Quince minutos en el sauna para soltar todo.",
      "day.3.title": "Frío", "day.3.text": "Tres minutos en el cold plunge. Respira. Esta es la parte de la que vas a hablar.",
      "day.5.title": "Recarga", "day.5.text": "Batido de proteína o un bowl de smoothie en el café. Y a conquistar el día.",
      "day.6.title": "Baila", "day.6.text": "Vuelve en la noche para la clase de baile fitness. Porque estás en Medellín.",

      "plans.eyebrow": "Membresías",
      "plans.title": "Elige el ritmo que va con tu vida.",
      "plans.lead": "El precio de miembro fundador está disponible por tiempo limitado antes de la apertura. Escríbenos para conocer las tarifas actuales.",
      "plans.badge": "La más popular",
      "plans.cta": "Pregunta por precios",
      "plans.flex.name": "Flex", "plans.flex.sub": "Para cuando quieres venir de vez en cuando.",
      "plans.flex.1": "Sesiones individuales y paquetes de clases", "plans.flex.2": "Acceso a sauna y cold plunge", "plans.flex.3": "Sin compromiso",
      "plans.full.name": "Element", "plans.full.sub": "Todo el club, todos los días.",
      "plans.full.1": "Clases ilimitadas: HIIT, pilates, fitness, trampolín y baile fitness",
      "plans.full.2": "Sauna y cold plunge ilimitados",
      "plans.full.4": "Descuento de miembro en el bar de jugos y el café",
      "plans.recovery.name": "Recovery", "plans.recovery.sub": "Para deportistas y cuerpos ocupados.",
      "plans.recovery.1": "Sauna y cold plunge ilimitados", "plans.recovery.3": "Clases de movilidad",

      "loc.eyebrow": "Encuéntranos",
      "loc.title": "En el corazón de Laureles.",
      "loc.lead": "Calles arboladas, los mejores cafés de la ciudad y ahora un lugar para cuidarte. A pocos pasos del Segundo Parque y de la estación Estadio del metro.",
      "loc.address.label": "Dirección", "loc.address.value": "Laureles, Medellín, Antioquia. Pronto anunciamos la dirección exacta.",
      "loc.hours.label": "Horario", "loc.hours.value": "Lunes a sábado 6:00 a 20:00 · Domingo cerrado por eventos privados",
      "loc.contact.label": "Contacto",

      "cta.title": "¿Listo para encontrar tu elemento?",
      "cta.text": "Escríbenos por WhatsApp para reservar una primera visita gratis, preguntar por las membresías fundadoras o simplemente saludar.",
      "cta.whatsapp": "Escríbenos por WhatsApp",
      "cta.email": "Envíanos un correo",
      "wa.text": "Hola, quiero reservar una visita a Element Health Club.",

      "footer.copy": "© 2026 Element Health Club · Laureles, Medellín"
    }
  };

  var WA_NUMBER = "573106508588"; /* club WhatsApp number: country code + number, no + or spaces */

  function setLang(lang) {
    if (!T[lang]) lang = "en";
    var dict = T[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-content");
      if (dict[k] != null) el.setAttribute("content", dict[k]);
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    var wa = document.getElementById("waLink");
    if (wa) wa.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(dict["wa.text"]);
    try { localStorage.setItem("element-lang", lang); } catch (e) {}
  }

  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && T[q]) return q;
    try { var s = localStorage.getItem("element-lang"); if (s && T[s]) return s; } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : "en";
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });
  setLang(initialLang());

  /* mobile menu */
  var nav = document.getElementById("nav"), menuBtn = document.getElementById("menuBtn");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); });
  });

  /* reveal on scroll */
  var els = document.querySelectorAll(".fade");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }
  /* safety net: never leave content hidden */
  setTimeout(function () { els.forEach(function (el) { el.classList.add("in"); }); }, 1800);
})();
