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
      "meta.description.memberships": "Move, Element and Elite memberships and the Recovery Pass at Element Health Club in Laureles, Medellín, at founding member prices. Your first class is free.",
      "meta.title.location": "Location and hours · Element Health Club",
      "meta.description.location": "Find Element Health Club in Laureles, Medellín, near Segundo Parque and the Estadio metro station. Hours, contact details and WhatsApp booking.",
      "brand.tag": "Health Club · Laureles",
      "nav.elements": "The elements",
      "nav.experiences": "Experiences",
      "nav.day": "A day here",
      "nav.memberships": "Memberships",
      "nav.location": "Location",
      "nav.schedule": "Classes",
      "nav.cta": "Book a class",

      "hero.eyebrow": "Opening Tuesday, 1 December",
      "hero.title": "Where the body <em>finds its balance</em>",
      "hero.lead": "A health and wellness club built around the four elements. Plunge into ice water, sweat in the sauna, move through HIIT, pilates and dance exercise, then refuel at the juice bar. Everything you need to feel alive, in one place.",
      "hero.cta1": "Book a visit",
      "hero.cta2": "See all experiences",
      "hero.note": "Your first class is free. Founding memberships with unlimited classes from $349,000 COP a month.",
      "hero.chip1": "Cold plunge",
      "hero.chip2": "Dry sauna",
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
      "svc.plunge.text": "A short immersion in cold water. Reduces inflammation, sharpens focus and builds a calm you can carry all day.",
      "svc.sauna.name": "Sauna",
      "svc.sauna.text": "Traditional dry sauna. Pair it with the plunge for the classic hot and cold contrast circuit.",
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
      "plans.lead": "Founding member prices for the first to join. No contract: cancel anytime.",
      "plans.badge": "Most complete",
      "plans.cta": "Reserve",
      "plans.per": "COP / month",
      "plans.founding": "Founding price",
      "plans.regular": "Regular price",
      "plans.note": "Founding spots are limited. Your founding discount stays for as long as your membership is active.",
      "welcome.eyebrow": "First time here?",
      "welcome.title": "Your first class <em>is free.</em>",
      "welcome.text": "Come to any class and stay for an hour of recovery in our saunas and cold plunge. Both are on us. Book online in under a minute.",
      "welcome.cta": "Book my free class online",
      "welcome.note": "Free class: one per person, booked in advance. The 3-class pack is for new clients, once per person.",
      "welcome.next.k": "And after that?",
      "welcome.next.t": "3 classes in 7 days",
      "welcome.next.p": "$100,000 COP",
      "welcome.next.s": "With free recovery after every class. Join within the 7 days and the $100,000 comes off your first month.",
      "rules.eyebrow": "Good to know",
      "rules.title": "Simple terms, no surprises.",
      "rules.1.t": "Your founding discount stays",
      "rules.1.d": "Join as a founding member and keep your founding discount for as long as your membership is active.",
      "rules.2.t": "Cancel anytime",
      "rules.2.d": "No contract and no minimum stay. You can cancel your membership whenever you like.",
      "rules.3.t": "Freeze up to 30 days a year",
      "rules.3.d": "Travelling or need a break? Pause your membership for up to 30 days a year and keep your founding discount.",
      "rules.4.t": "Bring a guest",
      "rules.4.d": "Element and Elite include guest passes every month. Each pass covers one class for your guest.",
      "rules.single": "No membership? A <b>day pass is $60,000 COP</b>: a class with recovery after, or recovery only. <a href=\"/schedule\">See the classes.</a>",
      "plans.recovery.sub": "Unlimited access to our sauna and cold plunge area. Classes are not included.", "rp.split": "Just here for the sauna and cold plunge?", "rp.tag": "No classes · sauna and plunge only", "rp.up": "Want classes too? <b>Element is $150,000 more</b> a month.",
      "plans.recovery.price": "$249,000",
      "plans.recovery.was": "$369,000",
      "plans.recovery.save": "You save $120,000 a month",
      "wa.plan.recovery": "Hi, I'd like the Recovery Pass at the founding price.",
      "plans.recovery.1": "Dry sauna, unlimited",
      "plans.recovery.2": "Cold plunge, unlimited",
      "plans.recovery.3": "Come any day, Monday to Saturday", "plans.recovery.4": "Made for people who train elsewhere: runners, cyclists, athletes",
      "plans.move.sub": "Unlimited classes, plus 1 hour of Recovery after every one.",
      "plans.move.price": "$349,000",
      "plans.move.was": "$479,000",
      "plans.move.save": "You save $130,000 a month",
      "wa.plan.move": "Hi, I'd like the Move membership at the founding price.",
      "plans.move.1": "Unlimited classes: kettlebell HIIT, trampoline and pilates",
      "plans.move.2": "1 hour of Recovery after every class: saunas and cold plunge",
      "plans.move.3": "Book online, Monday to Saturday",
      "plans.element.sub": "All of Element, one price.",
      "plans.element.price": "$399,000",
      "plans.element.was": "$549,000",
      "plans.element.save": "You save $150,000 a month",
      "wa.plan.element": "Hi, I'd like the Element membership at the founding price.",
      "plans.element.1": "Unlimited classes: HIIT, trampoline and pilates",
      "plans.element.2": "Recovery any day: saunas and cold plunge, unlimited",
      "plans.element.3": "Member discount at the juice bar",
      "plans.element.4": "2 guest class passes a month",
      "plans.elite.sub": "All of Element, plus two massages a month.",
      "plans.elite.price": "$849,000",
      "plans.elite.was": "$1,099,000",
      "plans.elite.save": "You save $250,000 a month",
      "wa.plan.elite": "Hi, I'd like the Elite membership at the founding price.",
      "plans.elite.1": "Everything in Element: unlimited classes and recovery",
      "plans.elite.2": "Two 90-minute massages a month",
      "plans.elite.3": "4 guest class passes a month",
      "plans.elite.4": "A complimentary Fire Shot on every visit: ginger, lime and turmeric",

      "loc.eyebrow": "Find us",
      "loc.title": "In the heart of Laureles.",
      "loc.lead": "Tree-lined streets, the best cafés in the city and now a place to take care of yourself. A short walk from Segundo Parque and the Estadio metro station.",
      "loc.address.label": "Address", "loc.address.value": "Tv 39D #74-105 Piso 4<br>Laureles - Estadio, Medellín",
      "loc.hours.label": "Hours", "loc.hours.value": "Monday to Friday 6:00 to 21:00 · Saturday 8:00 to 20:00 · Sunday closed",
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
      "meta.description.memberships": "Membresías Move, Element y Elite y el Recovery Pass en Element Health Club, Laureles, Medellín, con precio de miembro fundador. Tu primera clase es gratis.",
      "meta.title.location": "Ubicación y horario · Element Health Club",
      "meta.description.location": "Encuentra Element Health Club en Laureles, Medellín, cerca de Segundo Parque y la estación Estadio del metro. Horario, contacto y reservas por WhatsApp.",
      "brand.tag": "Club de bienestar · Laureles",
      "nav.elements": "Los elementos",
      "nav.experiences": "Experiencias",
      "nav.day": "Un día aquí",
      "nav.memberships": "Membresías",
      "nav.location": "Ubicación",
      "nav.schedule": "Clases",
      "nav.cta": "Reserva tu clase",

      "hero.eyebrow": "Abrimos el martes 1 de diciembre",
      "hero.title": "Donde el cuerpo <em>encuentra su equilibrio</em>",
      "hero.lead": "Un club de salud y bienestar inspirado en los cuatro elementos. Sumérgete en agua helada, suda en el sauna, muévete con HIIT, pilates y baile fitness, y recarga energía en el bar de jugos. Todo lo que necesitas para sentirte vivo, en un solo lugar.",
      "hero.cta1": "Reserva una visita",
      "hero.cta2": "Ver todas las experiencias",
      "hero.note": "Tu primera clase es gratis. Membresías fundadoras con clases ilimitadas desde $349.000 al mes.",
      "hero.chip1": "Cold plunge",
      "hero.chip2": "Sauna seco",
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
      "svc.plunge.text": "Una inmersión breve en agua fría. Reduce la inflamación, agudiza el enfoque y te da una calma que dura todo el día.",
      "svc.sauna.name": "Sauna",
      "svc.sauna.text": "Sauna seco tradicional. Combínalo con el cold plunge para el clásico circuito de contraste frío y calor.",
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
      "plans.lead": "Precios de miembro fundador para quienes se unen primero. Sin permanencia: cancela cuando quieras.",
      "plans.badge": "La más completa",
      "plans.cta": "Reservar",
      "plans.per": "/ mes",
      "plans.founding": "Precio fundador",
      "plans.regular": "Precio regular",
      "plans.note": "Cupos fundadores limitados. Tu descuento fundador se mantiene mientras tu membresía siga activa.",
      "welcome.eyebrow": "¿Primera vez?",
      "welcome.title": "Tu primera clase <em>es gratis.</em>",
      "welcome.text": "Ven a cualquier clase y quédate una hora en Recovery, nuestra zona húmeda con saunas y cold plunge. Las dos van por nuestra cuenta. Reserva en línea en menos de un minuto.",
      "welcome.cta": "Reservar mi clase gratis en línea",
      "welcome.note": "Clase gratis: una por persona, con reserva previa. El pack de 3 clases es para nuevos clientes, una vez por persona.",
      "welcome.next.k": "¿Y después?",
      "welcome.next.t": "3 clases en 7 días",
      "welcome.next.p": "$100.000",
      "welcome.next.s": "Con Recovery gratis después de cada clase. Si te haces miembro en esos 7 días, te descontamos los $100.000 de tu primer mes.",
      "rules.eyebrow": "Para que lo sepas",
      "rules.title": "Condiciones claras, sin sorpresas.",
      "rules.1.t": "Tu descuento fundador se mantiene",
      "rules.1.d": "Únete como miembro fundador y conserva tu descuento fundador mientras tu membresía siga activa.",
      "rules.2.t": "Cancela cuando quieras",
      "rules.2.d": "Sin permanencia ni cláusulas. Puedes cancelar tu membresía cuando quieras.",
      "rules.3.t": "Congélala hasta 30 días al año",
      "rules.3.d": "¿Viajas o necesitas una pausa? Congela tu membresía hasta 30 días al año y conserva tu descuento fundador.",
      "rules.4.t": "Trae un invitado",
      "rules.4.d": "Element y Elite incluyen pases de invitado cada mes. Cada pase cubre una clase para tu invitado.",
      "rules.single": "¿Sin membresía? El <b>pase de día cuesta $60.000</b>: una clase con Recovery después, o solo Recovery. <a href=\"/schedule\">Ver las clases.</a>",
      "plans.recovery.sub": "Acceso ilimitado a la zona húmeda: sauna y cold plunge. No incluye clases.", "rp.split": "¿Solo vienes por el sauna y el cold plunge?", "rp.tag": "Sin clases · solo zona húmeda", "rp.up": "¿Quieres clases también? <b>Element por $150.000 más</b> al mes.",
      "plans.recovery.price": "$249.000",
      "plans.recovery.was": "$369.000",
      "plans.recovery.save": "Ahorras $120.000 al mes",
      "wa.plan.recovery": "Hola, quiero el Recovery Pass con precio fundador.",
      "plans.recovery.1": "Sauna seco, sin límite",
      "plans.recovery.2": "Cold plunge, sin límite",
      "plans.recovery.3": "Ven cualquier día, de lunes a sábado", "plans.recovery.4": "Ideal si ya entrenas en otro lado: corredores, ciclistas, deportistas",
      "plans.move.sub": "Clases ilimitadas, más 1 hora de Recovery después de cada una.",
      "plans.move.price": "$349.000",
      "plans.move.was": "$479.000",
      "plans.move.save": "Ahorras $130.000 al mes",
      "wa.plan.move": "Hola, quiero la membresía Move con precio fundador.",
      "plans.move.1": "Clases ilimitadas: HIIT con kettlebells, trampolín y pilates",
      "plans.move.2": "1 hora de Recovery después de cada clase en la zona húmeda: saunas y cold plunge",
      "plans.move.3": "Reserva en línea, de lunes a sábado",
      "plans.element.sub": "Todo Element, un solo precio.",
      "plans.element.price": "$399.000",
      "plans.element.was": "$549.000",
      "plans.element.save": "Ahorras $150.000 al mes",
      "wa.plan.element": "Hola, quiero la membresía Element con precio fundador.",
      "plans.element.1": "Clases ilimitadas: HIIT, trampolín y pilates",
      "plans.element.2": "Recovery cualquier día en la zona húmeda: saunas y cold plunge, sin límite",
      "plans.element.3": "Descuento de miembro en la barra de jugos",
      "plans.element.4": "2 pases de invitado a clase al mes",
      "plans.elite.sub": "Todo Element, más dos masajes al mes.",
      "plans.elite.price": "$849.000",
      "plans.elite.was": "$1.099.000",
      "plans.elite.save": "Ahorras $250.000 al mes",
      "wa.plan.elite": "Hola, quiero la membresía Elite con precio fundador.",
      "plans.elite.1": "Todo lo de Element: clases y Recovery ilimitados",
      "plans.elite.2": "2 masajes de 90 minutos al mes",
      "plans.elite.3": "4 pases de invitado a clase al mes",
      "plans.elite.4": "Un Fire Shot de cortesía en cada visita: jengibre, limón y cúrcuma",

      "loc.eyebrow": "Encuéntranos",
      "loc.title": "En el corazón de Laureles.",
      "loc.lead": "Calles arboladas, los mejores cafés de la ciudad y ahora un lugar para cuidarte. A pocos pasos del Segundo Parque y de la estación Estadio del metro.",
      "loc.address.label": "Dirección", "loc.address.value": "Tv 39D #74-105 Piso 4<br>Laureles - Estadio, Medellín",
      "loc.hours.label": "Horario", "loc.hours.value": "Lunes a viernes 6:00 a 21:00 · Sábado 8:00 a 20:00 · Domingo cerrado",
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
    /* any other WhatsApp link: data-wa names the dictionary key of its pre-filled message */
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      var m = dict[el.getAttribute("data-wa")];
      if (m) el.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(m);
    });
    /* a locked page must not change the visitor's saved language for the rest of the site */
    if (!document.documentElement.hasAttribute("data-lang-lock")) {
      try { localStorage.setItem("element-lang", lang); } catch (e) {}
    }
  }

  function initialLang() {
    /* pages written in one language (the blog) set <html data-lang-lock="es"> */
    var lock = document.documentElement.getAttribute("data-lang-lock");
    if (lock && T[lock]) return lock;
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
