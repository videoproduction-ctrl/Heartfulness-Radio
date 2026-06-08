/* Heartfulness Radio — Listener UI translation engine.
   Dictionary-based live translation of the listener chrome. Proper nouns,
   show/track titles and data are intentionally left untouched. */
(function () {
  const DICT = {
    es: {
      "Morning Stillness": "Quietud matinal", "Heart to Heart": "De corazón a corazón", "Sounds of Silence": "Sonidos del silencio", "Wisdom Talk": "Charla de sabiduría", "Stories of the Heart": "Historias del corazón", "Midday Mantra": "Mantra del mediodía", "The Inner Journey": "El viaje interior", "Evening Unwind": "Calma del atardecer", "Night Frequencies": "Frecuencias nocturnas", "Sunday Long Read": "Lectura larga del domingo",
      "Guided meditation to begin the day": "Meditación guiada para empezar el día", "Conversations on the inner life": "Conversaciones sobre la vida interior", "Ambient & instrumental": "Ambiental e instrumental", "Short teachings, daily": "Enseñanzas breves, a diario", "Letters & lived experience": "Cartas y experiencias vividas", "Chant & resonance": "Canto y resonancia", "Featured podcast": "Pódcast destacado", "Slow music for dusk": "Música lenta para el ocaso", "Sleep & deep rest": "Sueño y descanso profundo", "Extended conversation": "Conversación extendida",
      "Let the breath arrive before the thought.": "Deja que la respiración llegue antes que el pensamiento.", "Stillness, too, is a kind of sound.": "La quietud también es una forma de sonido.", "The heart keeps its own gentle time.": "El corazón lleva su propio ritmo suave.", "Listen until the noise becomes quiet.": "Escucha hasta que el ruido se vuelva silencio.",
      "Letters on Meditation": "Cartas sobre la meditación", "Breath & Being": "Respiración y ser",
      "On Beginning Again": "Sobre volver a empezar", "The Texture of Attention": "La textura de la atención", "Letters from the Retreat": "Cartas desde el retiro", "To the One Who Can't Sit Still": "A quien no puede estarse quieto", "On Doubt": "Sobre la duda", "The Morning You Don't Feel Like It": "La mañana en que no te apetece", "Five-Minute Reset": "Reinicio de cinco minutos", "Body Scan for Sleep": "Escaneo corporal para dormir", "Walking, Slowly": "Caminar, despacio",
      "Antara (Live take)": "Antara (en vivo)", "Breath of the Hills": "Aliento de las colinas", "Reflection No. 4": "Reflexión n.º 4", "Stillwater": "Aguas tranquilas", "Morning Raag": "Raga de la mañana", "Open Sky": "Cielo abierto",
      "Show less": "Ver menos", "On demand · Artists": "Bajo demanda · Artistas",
      "Now": "Ahora", "Sounds": "Sonidos", "Podcasts": "Pódcasts", "Live": "En vivo",
      "Live · Always on": "En vivo · Siempre activo", "On Air": "Al aire", "On demand": "Bajo demanda",
      "Back to live radio": "Volver a la radio en vivo", "with": "con",
      "Continue listening": "Seguir escuchando", "Trending": "Tendencias", "See all": "Ver todo",
      "Up Next · Queue": "A continuación · Cola", "A thought to sit with": "Un pensamiento para meditar",
      "Today's reflection": "Reflexión de hoy", "Episode": "Episodio", "Talk": "Charla", "Music": "Música", "Meditation": "Meditación", "Stories": "Historias", "Podcast": "Pódcast", "Auto-curated": "Curado automáticamente", "Trending this week": "Tendencia esta semana",
      "All artists": "Todos los artistas", "‹ All artists": "‹ Todos los artistas", "Back": "Atrás",
      "episodes": "episodios", "listening": "escuchando", "Share": "Compartir",
    },
    fr: {
      "Morning Stillness": "Quiétude du matin", "Heart to Heart": "Cœur à cœur", "Sounds of Silence": "Sons du silence", "Wisdom Talk": "Parole de sagesse", "Stories of the Heart": "Histoires du cœur", "Midday Mantra": "Mantra de midi", "The Inner Journey": "Le voyage intérieur", "Evening Unwind": "Détente du soir", "Night Frequencies": "Fréquences nocturnes", "Sunday Long Read": "Grande lecture du dimanche",
      "Guided meditation to begin the day": "Méditation guidée pour commencer la journée", "Conversations on the inner life": "Conversations sur la vie intérieure", "Ambient & instrumental": "Ambiant et instrumental", "Short teachings, daily": "Brèves leçons, chaque jour", "Letters & lived experience": "Lettres et expériences vécues", "Chant & resonance": "Chant et résonance", "Featured podcast": "Podcast à la une", "Slow music for dusk": "Musique douce pour le crépuscule", "Sleep & deep rest": "Sommeil et repos profond", "Extended conversation": "Conversation prolongée",
      "Let the breath arrive before the thought.": "Laisse le souffle arriver avant la pensée.", "Stillness, too, is a kind of sound.": "Le silence aussi est une sorte de son.", "The heart keeps its own gentle time.": "Le cœur suit son propre rythme doux.", "Listen until the noise becomes quiet.": "Écoute jusqu'à ce que le bruit devienne silence.",
      "Letters on Meditation": "Lettres sur la méditation", "Breath & Being": "Souffle et être",
      "On Beginning Again": "Recommencer", "The Texture of Attention": "La texture de l'attention", "Letters from the Retreat": "Lettres de la retraite", "To the One Who Can't Sit Still": "À celui qui ne tient pas en place", "On Doubt": "Sur le doute", "The Morning You Don't Feel Like It": "Le matin où tu n'en as pas envie", "Five-Minute Reset": "Réinitialisation de cinq minutes", "Body Scan for Sleep": "Scan corporel pour dormir", "Walking, Slowly": "Marcher, lentement",
      "Antara (Live take)": "Antara (en direct)", "Breath of the Hills": "Souffle des collines", "Reflection No. 4": "Réflexion n° 4", "Stillwater": "Eau calme", "Morning Raag": "Raga du matin", "Open Sky": "Ciel ouvert",
      "Show less": "Voir moins", "On demand · Artists": "À la demande · Artistes",
      "Now": "Maintenant", "Sounds": "Sons", "Podcasts": "Podcasts", "Live": "En direct",
      "Live · Always on": "En direct · Toujours actif", "On Air": "À l’antenne", "On demand": "À la demande",
      "Back to live radio": "Retour à la radio en direct", "with": "avec",
      "Continue listening": "Continuer l’écoute", "Trending": "Tendances", "See all": "Tout voir",
      "Up Next · Queue": "À suivre · File", "A thought to sit with": "Une pensée à méditer",
      "Today's reflection": "Réflexion du jour", "Episode": "Épisode", "Talk": "Parole", "Music": "Musique", "Meditation": "Méditation", "Stories": "Histoires", "Podcast": "Podcast", "Auto-curated": "Auto-sélectionné", "Trending this week": "Tendances cette semaine",
      "All artists": "Tous les artistes", "‹ All artists": "‹ Tous les artistes", "Back": "Retour",
      "episodes": "épisodes", "listening": "à l’écoute", "Share": "Partager",
    },
    hi: {
      "Morning Stillness": "प्रातः शांति", "Heart to Heart": "दिल से दिल", "Sounds of Silence": "मौन की ध्वनियाँ", "Wisdom Talk": "ज्ञान वार्ता", "Stories of the Heart": "दिल की कहानियाँ", "Midday Mantra": "मध्याह्न मंत्र", "The Inner Journey": "अंतर्यात्रा", "Evening Unwind": "सांझ की शांति", "Night Frequencies": "रात्रि आवृत्तियाँ", "Sunday Long Read": "रविवार की लंबी वार्ता",
      "Guided meditation to begin the day": "दिन की शुरुआत के लिए निर्देशित ध्यान", "Conversations on the inner life": "आंतरिक जीवन पर संवाद", "Ambient & instrumental": "आंबिएंट और वाद्य", "Short teachings, daily": "छोटी शिक्षाएँ, रोज़", "Letters & lived experience": "पत्र और जीवनानुभव", "Chant & resonance": "मंत्रोच्चार और अनुनाद", "Featured podcast": "चुनिंदा पॉडकास्ट", "Slow music for dusk": "संध्या के लिए धीमा संगीत", "Sleep & deep rest": "नींद और गहरा विश्राम", "Extended conversation": "विस्तृत संवाद",
      "Let the breath arrive before the thought.": "विचार से पहले सांस को आने दें।", "Stillness, too, is a kind of sound.": "शांति भी एक तरह की ध्वनि है।", "The heart keeps its own gentle time.": "हृदय अपनी कोमल लय स्वयं रखता है।", "Listen until the noise becomes quiet.": "तब तक सुनें जब तक शोर शांत न हो जाए।",
      "Letters on Meditation": "ध्यान पर पत्र", "Breath & Being": "श्वास और अस्तित्व",
      "On Beginning Again": "फिर से शुरुआत पर", "The Texture of Attention": "ध्यान की बनावट", "Letters from the Retreat": "एकांतवास से पत्र", "To the One Who Can't Sit Still": "जो स्थिर नहीं बैठ सकता उसके लिए", "On Doubt": "संदेह पर", "The Morning You Don't Feel Like It": "जिस सुबह मन न करे", "Five-Minute Reset": "पाँच मिनट का रीसेट", "Body Scan for Sleep": "नींद के लिए बॉडी स्कैन", "Walking, Slowly": "धीरे-धीरे चलना",
      "Antara (Live take)": "अंतरा (लाइव)", "Breath of the Hills": "पहाड़ियों की सांस", "Reflection No. 4": "चिंतन सं. 4", "Stillwater": "शांत जल", "Morning Raag": "प्रातः राग", "Open Sky": "खुला आकाश",
      "Show less": "कम दिखाएं", "On demand · Artists": "मांग पर · कलाकार",
      "Now": "अभी", "Sounds": "ध्वनियाँ", "Podcasts": "पॉडकास्ट", "Live": "लाइव",
      "Live · Always on": "लाइव · हमेशा चालू", "On Air": "प्रसारण में", "On demand": "मांग पर",
      "Back to live radio": "लाइव रेडियो पर लौटें", "with": "के साथ",
      "Continue listening": "सुनना जारी रखें", "Trending": "ट्रेंडिंग", "See all": "सभी देखें",
      "Up Next · Queue": "आगे · कतार", "A thought to sit with": "मनन के लिए एक विचार",
      "Today's reflection": "आज का चिंतन", "Episode": "एपिसोड", "Talk": "वार्ता", "Music": "संगीत", "Meditation": "ध्यान", "Stories": "कहानियाँ", "Podcast": "पॉडकास्ट", "Auto-curated": "स्वतः चयनित", "Trending this week": "इस सप्ताह ट्रेंडिंग",
      "All artists": "सभी कलाकार", "‹ All artists": "‹ सभी कलाकार", "Back": "वापस",
      "episodes": "एपिसोड", "listening": "सुन रहे हैं", "Share": "साझा करें",
    },
    te: {
      "Morning Stillness": "ఉదయ ప్రశాంతత", "Heart to Heart": "హృదయం నుండి హృదయానికి", "Sounds of Silence": "నిశ్శబ్ద ధ్వనులు", "Wisdom Talk": "జ్ఞాన సంభాషణ", "Stories of the Heart": "హృదయ కథలు", "Midday Mantra": "మధ్యాహ్న మంత్రం", "The Inner Journey": "అంతర్యాన ప్రయాణం", "Evening Unwind": "సాయంత్ర విశ్రాంతి", "Night Frequencies": "రాత్రి ఫ్రీక్వెన్సీలు", "Sunday Long Read": "ఆదివారం సుదీర్ఘ పఠనం",
      "Guided meditation to begin the day": "రోజును ప్రారంభించేందుకు గైడెడ్ ధ్యానం", "Conversations on the inner life": "అంతరంగ జీవితంపై సంభాషణలు", "Ambient & instrumental": "ఆంబియెంట్ & వాద్య", "Short teachings, daily": "చిన్న బోధనలు, రోజూ", "Letters & lived experience": "లేఖలు & అనుభవాలు", "Chant & resonance": "జపం & ప్రతిధ్వని", "Featured podcast": "ప్రొమోటెడ్ పాడ్‌కాస్ట్", "Slow music for dusk": "సంధ్య కోసం నెమ్మది సంగీతం", "Sleep & deep rest": "నిద్ర & గాఢ విశ్రాంతి", "Extended conversation": "పొడిగించిన సంభాషణ",
      "Let the breath arrive before the thought.": "ఆలోచన కన్నా ముందు శ్వాసను రానీయ్.", "Stillness, too, is a kind of sound.": "నిశ్శబ్దం కూడా ఒక రకమైన ధ్వని.", "The heart keeps its own gentle time.": "హృదయం తన సొంత మృదులయను కాపాడుతుంది.", "Listen until the noise becomes quiet.": "శబ్దం నిశ్శబ్దమయ్యేవరకూ వినండి.",
      "Letters on Meditation": "ధ్యానంపై లేఖలు", "Breath & Being": "శ్వాస & అస్తిత్వం",
      "On Beginning Again": "మళ్లీ ప్రారంభించడం గురించి", "The Texture of Attention": "ఏకాగ్రత ఆకృతి", "Letters from the Retreat": "ఏకాంతం నుండి లేఖలు", "To the One Who Can't Sit Still": "నిశ్చలంగా కూర్చోలేనివారికోసం", "On Doubt": "సందేహం గురించి", "The Morning You Don't Feel Like It": "మనసు రాని ఉదయం", "Five-Minute Reset": "ఐదు నిమిషాల రీసెట్", "Body Scan for Sleep": "నిద్ర కోసం బాడీ స్కాన్", "Walking, Slowly": "నెమ్మదిగా నడవడం",
      "Antara (Live take)": "అంతర (లైవ్)", "Breath of the Hills": "కొండల శ్వాస", "Reflection No. 4": "చింతన సం. 4", "Stillwater": "నిశ్చల నీరు", "Morning Raag": "ఉదయ రాగం", "Open Sky": "తెరిచిన ఆకాశం",
      "Show less": "తక్కువ చూపు", "On demand · Artists": "డిమాండ్‌పై · కళాకారులు",
      "Now": "ఇప్పుడు", "Sounds": "శబ్దాలు", "Podcasts": "పాడ్‌కాస్ట్‌లు", "Live": "లైవ్",
      "Live · Always on": "లైవ్ · ఎల్లప్పుడూ ఆన్", "On Air": "ప్రసారంలో", "On demand": "డిమాండ్‌పై",
      "Back to live radio": "లైవ్ రేడియోకి తిరిగి", "with": "తో",
      "Continue listening": "వినడం కొనసాగించండి", "Trending": "ట్రెండింగ్", "See all": "అన్నీ చూడండి",
      "Up Next · Queue": "తరువాత · క్యూ", "A thought to sit with": "ధ్యానించడానికి ఒక ఆలోచన",
      "Today's reflection": "నేటి చింతన", "Episode": "ఎపిసోడ్", "Talk": "టాక్", "Music": "సంగీతం", "Meditation": "ధ్యానం", "Stories": "కథలు", "Podcast": "పాడ్‌కాస్ట్", "Auto-curated": "ఆటో-క్యూరేటెడ్", "Trending this week": "ఈ వారం ట్రెండింగ్",
      "All artists": "అందరు కళాకారులు", "‹ All artists": "‹ అందరు కళాకారులు", "Back": "వెనుకకు",
      "episodes": "ఎపిసోడ్లు", "listening": "వింటున్నారు", "Share": "షేర్ చేయి",
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
  let current = "en";
  let observer = null;
  let pending = null;

  function translateNode(n, dict) {
    if (!ORIG.has(n)) ORIG.set(n, n.nodeValue);
    const orig = ORIG.get(n);
    const key = orig.trim();
    if (!key) return;
    if (current === "en") { if (n.nodeValue !== orig) n.nodeValue = orig; return; }
    const t = dict[key];
    if (t !== undefined) { const r = orig.replace(key, t); if (n.nodeValue !== r) n.nodeValue = r; }
    else if (n.nodeValue !== orig) n.nodeValue = orig;
  }

  function apply() {
    const root = document.querySelector(".stage") || document.body;
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
    const root = document.querySelector(".stage") || document.body;
    if (!root) return;
    if (!observer) observer = new MutationObserver(() => scheduleApply());
    observer.observe(root, { childList: true, subtree: true, characterData: true });
  }
  function setLang(code) { current = code; try { localStorage.setItem("hfr_listener_lang", code); } catch (e) {} apply(); startObserver(); }
  function init() { try { current = localStorage.getItem("hfr_listener_lang") || "en"; } catch (e) {} apply(); startObserver(); }

  window.IMM_I18N = { LANGS, setLang, getLang: () => current, init, apply };
})();
