/* Heartfulness Radio — content/data layer (global: window.HFR) */
(function () {
  "use strict";

  // Soft duotone cover generator inputs — covers are rendered in CSS from a hue + glyph.
  const shows = [
    {
      id: "morning-stillness",
      title: "Morning Stillness",
      tagline: "Guided meditation to begin the day",
      presenter: "Anaya Reddy",
      kind: "Meditation",
      hue: 158, // green
      start: "06:00", end: "07:00",
      live: false,
      desc: "A slow, breath-led practice to settle the mind before the world wakes."
    },
    {
      id: "heart-to-heart",
      title: "Heart to Heart",
      tagline: "Conversations on the inner life",
      presenter: "Arjun Mehta",
      kind: "Talk",
      hue: 28, // clay
      start: "07:00", end: "08:30",
      live: true,
      desc: "Long-form conversations with teachers, seekers and ordinary people living with intention."
    },
    {
      id: "sounds-of-silence",
      title: "Sounds of Silence",
      tagline: "Ambient & instrumental",
      presenter: "Auto-curated",
      kind: "Music",
      hue: 205, // blue
      start: "08:30", end: "10:00",
      live: false,
      desc: "Drifting ambient textures and acoustic instrumentals for focus and rest."
    },
    {
      id: "wisdom-talk",
      title: "Wisdom Talk",
      tagline: "Short teachings, daily",
      presenter: "Sister Clara",
      kind: "Talk",
      hue: 268, // violet
      start: "10:00", end: "10:30",
      live: false,
      desc: "A ten-minute reflection drawn from the world's contemplative traditions."
    },
    {
      id: "stories-of-the-heart",
      title: "Stories of the Heart",
      tagline: "Letters & lived experience",
      presenter: "Maya Iyer",
      kind: "Stories",
      hue: 340, // rose
      start: "10:30", end: "12:00",
      live: false,
      desc: "Listener letters and quiet stories of transformation, read aloud."
    },
    {
      id: "midday-mantra",
      title: "Midday Mantra",
      tagline: "Chant & resonance",
      presenter: "Auto-curated",
      kind: "Music",
      hue: 42, // amber
      start: "12:00", end: "13:30",
      live: false,
      desc: "Layered chant, drone and resonance to carry you through the middle of the day."
    },
    {
      id: "the-inner-journey",
      title: "The Inner Journey",
      tagline: "Featured podcast",
      presenter: "Devan Kapoor",
      kind: "Podcast",
      hue: 188, // teal
      start: "13:30", end: "14:30",
      live: false,
      desc: "A weekly podcast tracing the long arc of a meditative life."
    },
    {
      id: "evening-unwind",
      title: "Evening Unwind",
      tagline: "Slow music for dusk",
      presenter: "Auto-curated",
      kind: "Music",
      hue: 14, // sunset
      start: "18:00", end: "20:00",
      live: false,
      desc: "Warm, unhurried music to loosen the shoulders as the light goes down."
    },
    {
      id: "night-frequencies",
      title: "Night Frequencies",
      tagline: "Sleep & deep rest",
      presenter: "Anaya Reddy",
      kind: "Meditation",
      hue: 232, // indigo
      start: "22:00", end: "23:59",
      live: false,
      desc: "Yoga nidra, soft drones and guided rest to carry you into sleep."
    }
  ];

  // Recently played / history
  const history = [
    { id: "h1", title: "Antara (Live take)", artist: "Nila Sharma", at: "11:18", dur: "7:42", hue: 158 },
    { id: "h2", title: "Breath of the Hills", artist: "Tenzin & Co.", at: "11:09", dur: "9:05", hue: 205 },
    { id: "h3", title: "Reflection No. 4", artist: "Arjun Mehta", at: "11:01", dur: "8:20", hue: 28 },
    { id: "h4", title: "Stillwater", artist: "Marek Olsson", at: "10:52", dur: "6:14", hue: 188 },
    { id: "h5", title: "Morning Raag", artist: "Kavya Iyer", at: "10:40", dur: "11:30", hue: 42 },
    { id: "h6", title: "Open Sky", artist: "The Quiet Ensemble", at: "10:31", dur: "5:48", hue: 268 }
  ];

  // Podcast series + episodes (on-demand)
  const podcasts = [
    {
      id: "inner-journey",
      title: "The Inner Journey",
      host: "Devan Kapoor",
      hue: 188,
      desc: "Long conversations on meditation, attention and the shape of a quiet life.",
      episodes: [
        { id: "ij-42", n: 42, title: "On Beginning Again", dur: "48:12", date: "May 28", desc: "Why the practice is mostly about returning." },
        { id: "ij-41", n: 41, title: "The Texture of Attention", dur: "52:40", date: "May 21", desc: "A working musician on listening as practice." },
        { id: "ij-40", n: 40, title: "Letters from the Retreat", dur: "39:55", date: "May 14", desc: "Reading the post bag from ten days of silence." }
      ]
    },
    {
      id: "letters-on-meditation",
      title: "Letters on Meditation",
      host: "Maya Iyer",
      hue: 340,
      desc: "Short, written reflections read aloud — one letter at a time.",
      episodes: [
        { id: "lm-18", n: 18, title: "To the One Who Can't Sit Still", dur: "12:30", date: "May 30", desc: "For the restless beginner." },
        { id: "lm-17", n: 17, title: "On Doubt", dur: "14:02", date: "May 23", desc: "What to do when nothing seems to happen." },
        { id: "lm-16", n: 16, title: "The Morning You Don't Feel Like It", dur: "11:45", date: "May 16", desc: "Showing up anyway." }
      ]
    },
    {
      id: "breath-and-being",
      title: "Breath & Being",
      host: "Anaya Reddy",
      hue: 158,
      desc: "Guided practices you can take anywhere — 5 to 30 minutes.",
      episodes: [
        { id: "bb-09", n: 9, title: "Five-Minute Reset", dur: "5:10", date: "Jun 01", desc: "A pocket practice for the middle of the day." },
        { id: "bb-08", n: 8, title: "Body Scan for Sleep", dur: "22:18", date: "May 25", desc: "Soften from head to toe." },
        { id: "bb-07", n: 7, title: "Walking, Slowly", dur: "16:40", date: "May 18", desc: "Meditation with your eyes open." }
      ]
    }
  ];

  const presenters = [
    { id: "anaya", name: "Anaya Reddy", role: "Meditation guide", hue: 158, shows: "Morning Stillness · Night Frequencies" },
    { id: "arjun", name: "Arjun Mehta", role: "Host, Heart to Heart", hue: 28, shows: "Heart to Heart" },
    { id: "clara", name: "Sister Clara", role: "Contemplative", hue: 268, shows: "Wisdom Talk" },
    { id: "maya", name: "Maya Iyer", role: "Storyteller", hue: 340, shows: "Stories of the Heart · Letters on Meditation" },
    { id: "devan", name: "Devan Kapoor", role: "Podcast host", hue: 188, shows: "The Inner Journey" }
  ];

  // Weekly schedule — reuse the daily program lineup across days with small variations.
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function scheduleForDay(dayIdx) {
    // Each day uses the same backbone; weekends swap a couple of slots.
    const base = shows.map(s => ({ ...s }));
    if (dayIdx >= 5) {
      // weekend tweaks
      const ht = base.find(s => s.id === "heart-to-heart");
      if (ht) { ht.title = "Sunday Long Read"; ht.tagline = "Extended conversation"; }
    }
    return base.sort((a, b) => a.start.localeCompare(b.start));
  }

  const quotes = [
    { text: "When we meditate, we move from thinking to feeling — towards the heart.", who: "Heartfulness Radio" },
    { text: "Stillness is not the absence of sound. It is the presence of attention.", who: "Morning Stillness" },
    { text: "Listen long enough and even silence begins to speak.", who: "Sounds of Silence" }
  ];

  window.HFR = { shows, history, podcasts, presenters, days, scheduleForDay, quotes };
})();
