/* Heartfulness Radio — Studio UI translation engine.
   Dictionary-based: swaps known English UI strings live across every page.
   Proper nouns, show titles, and data are intentionally left untouched. */
(function () {
  const DICT = {
    es: {
      "Morning Stillness": "Quietud matinal", "Heart to Heart": "De corazón a corazón", "Sounds of Silence": "Sonidos del silencio", "Wisdom Talk": "Charla de sabiduría", "Stories of the Heart": "Historias del corazón", "Midday Mantra": "Mantra del mediodía", "Evening Unwind": "Calma del atardecer", "Night Frequencies": "Frecuencias nocturnas", "The Inner Journey": "El viaje interior", "Letters on Meditation": "Cartas sobre la meditación", "Breath & Being": "Respiración y ser",
      "Today's schedule": "Horario de hoy", "Listeners · last 24 hours": "Oyentes · últimas 24 horas", "Unique · 24h": "Únicos · 24h", "Today": "Hoy", "Listening hours · this week": "Horas de escucha · esta semana",
      // nav + groups
      "Overview": "Resumen", "Library": "Biblioteca", "Media": "Medios", "Playlists": "Listas",
      "Programming": "Programación", "Schedule": "Horario", "Presenters & DJs": "Presentadores y DJs",
      "On demand": "Bajo demanda", "Podcasts": "Pódcasts", "Audience": "Audiencia", "Listeners": "Oyentes",
      "Settings": "Ajustes", "Sign out": "Cerrar sesión", "Language": "Idioma",
      // topbar
      "Live": "En vivo", "Search the studio…": "Buscar en el estudio…",
      // overview
      "Good morning, Studio": "Buenos días, Estudio", "Everything is running smoothly": "Todo funciona sin problemas",
      "Broadcast": "Transmisión", "Go live": "Salir en vivo", "Start broadcasting": "Empezar a transmitir",
      "Listeners now": "Oyentes ahora", "Peak today": "Pico de hoy", "Stream health": "Estado del flujo",
      "Online": "En línea", "On air now": "Al aire ahora", "Up next": "A continuación", "Live DJ": "DJ en vivo",
      "Listening hours · this week": "Horas de escucha · esta semana", "Pending requests": "Solicitudes pendientes",
      "vs. yesterday": "vs. ayer", "reach": "alcance",
      // headings / subtitles
      "How music and talk rotate through the day": "Cómo rotan música y charla durante el día",
      "Weekly broadcast calendar": "Calendario semanal de transmisión",
      "Series, episodes and subscribers": "Series, episodios y suscriptores",
      "Streamer accounts and live broadcast slots": "Cuentas de locutores y franjas en vivo",
      "Your music & talk library": "Tu biblioteca de música y charla",
      // buttons
      "Add event": "Añadir evento", "New playlist": "Nueva lista", "New series": "Nueva serie",
      "Add presenter": "Añadir presentador", "Episode": "Episodio", "Edit": "Editar", "Manage": "Gestionar",
      "Save changes": "Guardar cambios", "Cancel": "Cancelar", "Delete": "Eliminar", "Close": "Cerrar",
      "Done": "Hecho", "Create series": "Crear serie", "Add tracks": "Añadir pistas", "Jump to date": "Ir a fecha",
      // misc labels
      "tracks": "pistas", "episodes": "episodios", "Active": "Activa", "Paused": "Pausada",
      "Weight": "Peso", "Tracks": "Pistas", "Trending this week": "Tendencia esta semana", "All artists": "Todos los artistas",
      "On air": "Al aire", "Offline": "Desconectado", "Up next": "A continuación",
    },
    fr: {
      "Morning Stillness": "Quiétude du matin", "Heart to Heart": "Cœur à cœur", "Sounds of Silence": "Sons du silence", "Wisdom Talk": "Parole de sagesse", "Stories of the Heart": "Histoires du cœur", "Midday Mantra": "Mantra de midi", "Evening Unwind": "Détente du soir", "Night Frequencies": "Fréquences nocturnes", "The Inner Journey": "Le voyage intérieur", "Letters on Meditation": "Lettres sur la méditation", "Breath & Being": "Souffle et être",
      "Today's schedule": "Programme du jour", "Listeners · last 24 hours": "Auditeurs · dernières 24 heures", "Unique · 24h": "Uniques · 24h", "Today": "Aujourd'hui", "Listening hours · this week": "Heures d'écoute · cette semaine",
      "Overview": "Aperçu", "Library": "Bibliothèque", "Media": "Médias", "Playlists": "Listes",
      "Programming": "Programmation", "Schedule": "Horaire", "Presenters & DJs": "Présentateurs et DJs",
      "On demand": "À la demande", "Podcasts": "Podcasts", "Audience": "Audience", "Listeners": "Auditeurs",
      "Settings": "Paramètres", "Sign out": "Déconnexion", "Language": "Langue",
      "Live": "En direct", "Search the studio…": "Rechercher dans le studio…",
      "Good morning, Studio": "Bonjour, Studio", "Everything is running smoothly": "Tout fonctionne parfaitement",
      "Broadcast": "Diffusion", "Go live": "Passer en direct", "Start broadcasting": "Commencer la diffusion",
      "Listeners now": "Auditeurs actuels", "Peak today": "Pic du jour", "Stream health": "État du flux",
      "Online": "En ligne", "On air now": "À l’antenne", "Up next": "À suivre", "Live DJ": "DJ en direct",
      "Listening hours · this week": "Heures d’écoute · cette semaine", "Pending requests": "Demandes en attente",
      "vs. yesterday": "vs hier", "reach": "portée",
      "How music and talk rotate through the day": "Comment musique et parole alternent dans la journée",
      "Weekly broadcast calendar": "Calendrier de diffusion hebdomadaire",
      "Series, episodes and subscribers": "Séries, épisodes et abonnés",
      "Streamer accounts and live broadcast slots": "Comptes des animateurs et créneaux en direct",
      "Your music & talk library": "Votre bibliothèque musique et parole",
      "Add event": "Ajouter un événement", "New playlist": "Nouvelle liste", "New series": "Nouvelle série",
      "Add presenter": "Ajouter un présentateur", "Episode": "Épisode", "Edit": "Modifier", "Manage": "Gérer",
      "Save changes": "Enregistrer", "Cancel": "Annuler", "Delete": "Supprimer", "Close": "Fermer",
      "Done": "Terminé", "Create series": "Créer la série", "Add tracks": "Ajouter des titres", "Jump to date": "Aller à la date",
      "tracks": "titres", "episodes": "épisodes", "Active": "Active", "Paused": "En pause",
      "Weight": "Poids", "Tracks": "Titres", "Trending this week": "Tendances cette semaine", "All artists": "Tous les artistes",
      "On air": "À l’antenne", "Offline": "Hors ligne",
    },
    te: {
      "Morning Stillness": "ఉదయ ప్రశాంతత", "Heart to Heart": "హృదయం నుండి హృదయానికి", "Sounds of Silence": "నిశ్శబ్ద ధ్వనులు", "Wisdom Talk": "జ్ఞాన సంభాషణ", "Stories of the Heart": "హృదయ కథలు", "Midday Mantra": "మధ్యాహ్న మంత్రం", "Evening Unwind": "సాయంత్ర విశ్రాంతి", "Night Frequencies": "రాత్రి ఫ్రీక్వెన్సీలు", "The Inner Journey": "అంతర్యాన ప్రయాణం", "Letters on Meditation": "ధ్యానంపై లేఖలు", "Breath & Being": "శ్వాస & అస్తిత్వం",
      "Today's schedule": "నేటి షెడ్యూల్", "Listeners · last 24 hours": "శ్రోతలు · గత 24 గంటలు", "Unique · 24h": "ప్రత్యేక · 24గం", "Today": "నేడు", "Listening hours · this week": "వినే గంటలు · ఈ వారం",
      "Overview": "అవలోకనం", "Library": "లైబ్రరీ", "Media": "మీడియా", "Playlists": "ప్లేలిస్టులు",
      "Programming": "ప్రోగ్రామింగ్", "Schedule": "షెడ్యూల్", "Presenters & DJs": "ప్రెజెంటర్లు & DJలు",
      "On demand": "డిమాండ్‌పై", "Podcasts": "పాడ్‌కాస్ట్‌లు", "Audience": "శ్రోతలు", "Listeners": "శ్రోతలు",
      "Settings": "సెట్టింగ్లు", "Sign out": "సైన్ ఌట్", "Language": "భాష",
      "Live": "లైవ్", "Search the studio…": "స్టూడియోలో వెతకండి…",
      "Good morning, Studio": "శుభోదయం, స్టూడియో", "Everything is running smoothly": "అన్నీ సజావుగా నడుస్తోంది",
      "Broadcast": "ప్రసారం", "Go live": "లైవ్‌కి వెళ్లండి", "Start broadcasting": "ప్రసారం ప్రారంభించండి",
      "Listeners now": "ఇప్పుడు శ్రోతలు", "Peak today": "నేటి గరిష్ఠం", "Stream health": "స్ట్రీమ్ స్థితి",
      "Online": "ఆన్‌లైన్", "On air now": "ఇప్పుడు ప్రసారంలో", "Up next": "తరువాత", "Live DJ": "లైవ్ DJ",
      "Listening hours · this week": "వినే గంటలు · ఈ వారం", "Pending requests": "పెండింగ్ అభ్యర్థనలు",
      "vs. yesterday": "నిన్నటితో", "reach": "పరిధి",
      "How music and talk rotate through the day": "రోజంతా సంగీతం మరియు టాక్ ఎలా మారుతాయి",
      "Weekly broadcast calendar": "వారపు ప్రసార క్యాలెండర్",
      "Series, episodes and subscribers": "సీరిస్, ఎపిసోడ్లు మరియు చందాదారులు",
      "Streamer accounts and live broadcast slots": "స్ట్రీమర్ ఖాతాలు మరియు లైవ్ స్లాట్‌లు",
      "Your music & talk library": "మీ సంగీత & టాక్ లైబ్రరీ",
      "Add event": "ఈవెంట్ జోడించు", "New playlist": "కొత్త ప్లేలిస్ట్", "New series": "కొత్త సీరిస్",
      "Add presenter": "ప్రెజెంటర్‌ను జోడించు", "Episode": "ఎపిసోడ్", "Edit": "సవరించు", "Manage": "నిర్వహించు",
      "Save changes": "మార్పులు సేవ్ చేయి", "Cancel": "రద్దు చేయి", "Delete": "తొలగించు", "Close": "మూసివేయి",
      "Done": "పూర్తయింది", "Create series": "సీరిస్ సృష్టించు", "Add tracks": "ట్రాక్‌లు జోడించు", "Jump to date": "తేదీకి వెళ్లండి",
      "tracks": "ట్రాక్‌లు", "episodes": "ఎపిసోడ్లు", "Active": "క్రియాశీలం", "Paused": "ఆపివేయబడింది",
      "Weight": "బరువు", "Tracks": "ట్రాక్‌లు", "Trending this week": "ఈ వారం ట్రెండింగ్", "All artists": "అందరు కళాకారులు",
      "On air": "ప్రసారంలో", "Offline": "ఆఫ్‌లైన్",
    },
    hi: {
      "Morning Stillness": "प्रातः शांति", "Heart to Heart": "दिल से दिल", "Sounds of Silence": "मौन की ध्वनियाँ", "Wisdom Talk": "ज्ञान वार्ता", "Stories of the Heart": "दिल की कहानियाँ", "Midday Mantra": "मध्याह्न मंत्र", "Evening Unwind": "सांझ की शांति", "Night Frequencies": "रात्रि आवृत्तियाँ", "The Inner Journey": "अंतर्यात्रा", "Letters on Meditation": "ध्यान पर पत्र", "Breath & Being": "श्वास और अस्तित्व",
      "Today's schedule": "आज का कार्यक्रम", "Listeners · last 24 hours": "श्रोता · पिछले 24 घंटे", "Unique · 24h": "विशिष्ट · 24घं", "Today": "आज", "Listening hours · this week": "सुनने के घंटे · इस सप्ताह",
      "Overview": "अवलोकन", "Library": "लाइब्रेरी", "Media": "मीडिया", "Playlists": "प्लेलिस्ट",
      "Programming": "प्रोग्रामिंग", "Schedule": "समय-सारणी", "Presenters & DJs": "प्रस्तुतकर्ता और डीजे",
      "On demand": "मांग पर", "Podcasts": "पॉडकास्ट", "Audience": "श्रोता", "Listeners": "श्रोता",
      "Settings": "सेटिंग्स", "Sign out": "साइन आउट", "Language": "भाषा",
      "Live": "लाइव", "Search the studio…": "स्टूडियो में खोजें…",
      "Good morning, Studio": "सुप्रभात, स्टूडियो", "Everything is running smoothly": "सब कुछ सुचारू रूप से चल रहा है",
      "Broadcast": "प्रसारण", "Go live": "लाइव जाएँ", "Start broadcasting": "प्रसारण शुरू करें",
      "Listeners now": "अभी श्रोता", "Peak today": "आज का शिखर", "Stream health": "स्ट्रीम स्थिति",
      "Online": "ऑनलाइन", "On air now": "अभी प्रसारण में", "Up next": "आगे", "Live DJ": "लाइव डीजे",
      "Listening hours · this week": "सुनने के घंटे · इस सप्ताह", "Pending requests": "लंबित अनुरोध",
      "vs. yesterday": "कल की तुलना में", "reach": "पहुँच",
      "How music and talk rotate through the day": "दिन भर संगीत और वार्ता कैसे बदलते हैं",
      "Weekly broadcast calendar": "साप्ताहिक प्रसारण कैलेंडर",
      "Series, episodes and subscribers": "सीरीज़, एपिसोड और सब्सक्राइबर",
      "Streamer accounts and live broadcast slots": "स्ट्रीमर खाते और लाइव प्रसारण स्लॉट",
      "Your music & talk library": "आपकी संगीत और वार्ता लाइब्रेरी",
      "Add event": "इवेंट जोड़ें", "New playlist": "नई प्लेलिस्ट", "New series": "नई सीरीज़",
      "Add presenter": "प्रस्तुतकर्ता जोड़ें", "Episode": "एपिसोड", "Edit": "संपादित करें", "Manage": "प्रबंधित करें",
      "Save changes": "परिवर्तन सहेजें", "Cancel": "रद्द करें", "Delete": "हटाएँ", "Close": "बंद करें",
      "Done": "हो गया", "Create series": "सीरीज़ बनाएँ", "Add tracks": "ट्रैक जोड़ें", "Jump to date": "तारीख़ पर जाएँ",
      "tracks": "ट्रैक", "episodes": "एपिसोड", "Active": "सक्रिय", "Paused": "रुका हुआ",
      "Weight": "भार", "Tracks": "ट्रैक", "Trending this week": "इस सप्ताह ट्रेंडिंग", "All artists": "सभी कलाकार",
      "On air": "प्रसारण में", "Offline": "ऑफ़लाइन",
    },
  };

  const LANGS = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "te", label: "తెలుగు" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
  ];

  const ORIG = new WeakMap();
  const KNOWN_KEYS = new Set();
  Object.keys(DICT).forEach(function (l) { Object.keys(DICT[l]).forEach(function (k) { KNOWN_KEYS.add(k); }); });
  let current = "en";
  let observer = null;
  let pending = null;

  function translateNode(n, dict) {
    let orig = ORIG.get(n);
    if (orig === undefined) {
      // Only ever adopt nodes whose text is a known UI string. Dynamic text
      // (timers, counts, names) is never cached or reverted — leave it alone.
      const k = (n.nodeValue || "").trim();
      if (!k || !KNOWN_KEYS.has(k)) return;
      ORIG.set(n, n.nodeValue);
      orig = n.nodeValue;
    }
    const key = orig.trim();
    if (!key) return;
    if (current === "en") { if (n.nodeValue !== orig) n.nodeValue = orig; return; }
    const t = dict[key];
    if (t !== undefined) {
      const replaced = orig.replace(key, t);
      if (n.nodeValue !== replaced) n.nodeValue = replaced;
    } else if (n.nodeValue !== orig) {
      n.nodeValue = orig;
    }
  }

  function apply() {
    const root = document.querySelector(".studio");
    if (!root) return;
    const dict = DICT[current] || {};
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "INPUT" || tag === "TEXTAREA") return NodeFilter.FILTER_REJECT;
        if (p.closest("[data-no-i18n]")) return NodeFilter.FILTER_REJECT;
        return n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    let n;
    while ((n = w.nextNode())) translateNode(n, dict);
    document.documentElement.lang = current;
  }

  function scheduleApply() {
    if (pending) cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => { pending = null; if (observer) observer.disconnect(); apply(); startObserver(); });
  }

  function startObserver() {
    const root = document.querySelector(".studio");
    if (!root) return;
    if (!observer) observer = new MutationObserver(() => scheduleApply());
    observer.observe(root, { childList: true, subtree: true, characterData: true });
  }

  function setLang(code) {
    current = code;
    try { localStorage.setItem("hfr_lang", code); } catch (e) {}
    apply();
    startObserver();
  }

  function init() {
    try { current = localStorage.getItem("hfr_lang") || "en"; } catch (e) {}
    apply();
    startObserver();
  }

  window.HFR_I18N = { LANGS, setLang, getLang: () => current, init, apply };
})();
