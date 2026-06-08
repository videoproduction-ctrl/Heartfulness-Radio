/* Heartfulness Radio — admin/studio mock data (global: window.HFRADMIN) */
(function () {
  "use strict";

  const station = {
    name: "Heartfulness Radio",
    shortcode: "heartfulness",
    status: "online",
    listeners: 1284,
    peak: 1612,
    unique: 9740,
    bitrate: 128,
    format: "MP3",
    uptime: "42d 6h",
    storage: { used: 18.4, total: 50 }, // GB
  };

  // 24h listener curve (hourly)
  const listeners24h = [310,260,210,180,160,150,190,420,860,1180,1340,1290,1210,1260,1180,1090,980,1010,1190,1420,1612,1480,980,540];

  // 7-day total hours listened (thousands)
  const week = [
    { d: "Mon", v: 18.2 }, { d: "Tue", v: 19.5 }, { d: "Wed", v: 22.1 },
    { d: "Thu", v: 20.8 }, { d: "Fri", v: 24.6 }, { d: "Sat", v: 28.3 }, { d: "Sun", v: 26.1 },
  ];

  const media = [
    { id: "m1", title: "Antara", artist: "Nila Sharma", album: "Heartwaters", dur: "7:42", playlist: "Morning", plays: 412, hue: 158 },
    { id: "m2", title: "Breath of the Hills", artist: "Tenzin & Co.", album: "Highlands", dur: "9:05", playlist: "Ambient", plays: 388, hue: 205 },
    { id: "m3", title: "Reflection No. 4", artist: "Arjun Mehta", album: "Talks Vol. 2", dur: "8:20", playlist: "Talks", plays: 506, hue: 28 },
    { id: "m4", title: "Stillwater", artist: "Marek Olsson", album: "Slowly", dur: "6:14", playlist: "Ambient", plays: 277, hue: 188 },
    { id: "m5", title: "Morning Raag", artist: "Kavya Iyer", album: "Dawn Series", dur: "11:30", playlist: "Morning", plays: 631, hue: 42 },
    { id: "m6", title: "Open Sky", artist: "The Quiet Ensemble", album: "Expanse", dur: "5:48", playlist: "Ambient", plays: 198, hue: 268 },
    { id: "m7", title: "Mantra of Light", artist: "Sangha Voices", album: "Resonance", dur: "10:12", playlist: "Chant", plays: 442, hue: 340 },
    { id: "m8", title: "Evening Drift", artist: "Marek Olsson", album: "Slowly", dur: "7:01", playlist: "Evening", plays: 312, hue: 14 },
  ];

  const playlists = [
    { id: "p1", name: "Morning Stillness", type: "Scheduled", tracks: 84, weight: 5, schedule: "06:00–07:00 daily", enabled: true, hue: 158 },
    { id: "p2", name: "Ambient Beds", type: "General rotation", tracks: 212, weight: 3, schedule: "All day", enabled: true, hue: 205 },
    { id: "p3", name: "Talks & Conversations", type: "Sequential", tracks: 56, weight: 4, schedule: "07:00–08:30", enabled: true, hue: 28 },
    { id: "p4", name: "Chant & Resonance", type: "Shuffle", tracks: 38, weight: 2, schedule: "12:00–13:30", enabled: true, hue: 340 },
    { id: "p5", name: "Evening Unwind", type: "Scheduled", tracks: 96, weight: 4, schedule: "18:00–20:00", enabled: true, hue: 14 },
    { id: "p6", name: "Station IDs & Spots", type: "Jingles", tracks: 14, weight: 1, schedule: "Between tracks", enabled: false, hue: 42 },
  ];

  const streamers = [
    { id: "s1", name: "Arjun Mehta", handle: "arjun", live: true, since: "07:00", next: "—", note: "Heart to Heart" },
    { id: "s2", name: "Anaya Reddy", handle: "anaya", live: false, since: "—", next: "Tomorrow 06:00", note: "Morning Stillness" },
    { id: "s3", name: "Sister Clara", handle: "clara", live: false, since: "—", next: "Wed 10:00", note: "Wisdom Talk" },
    { id: "s4", name: "Maya Iyer", handle: "maya", live: false, since: "—", next: "Thu 10:30", note: "Stories of the Heart" },
  ];

  const requests = [
    { id: "r1", track: "Morning Raag", artist: "Kavya Iyer", by: "Priya, Chennai", time: "2m ago", status: "pending" },
    { id: "r2", track: "Open Sky", artist: "The Quiet Ensemble", by: "Tom, Leeds", time: "11m ago", status: "pending" },
    { id: "r3", track: "Antara", artist: "Nila Sharma", by: "Aisha, Dubai", time: "26m ago", status: "approved" },
    { id: "r4", track: "Stillwater", artist: "Marek Olsson", by: "Anonymous", time: "38m ago", status: "approved" },
    { id: "r5", track: "Unlisted track", artist: "—", by: "Sam, Berlin", time: "51m ago", status: "rejected" },
  ];

  const podcasts = [
    { id: "pod1", title: "The Inner Journey", episodes: 42, subs: 8420, lastPublished: "May 28", hue: 188 },
    { id: "pod2", title: "Letters on Meditation", episodes: 18, subs: 5110, lastPublished: "May 30", hue: 340 },
    { id: "pod3", title: "Breath & Being", episodes: 9, subs: 3240, lastPublished: "Jun 01", hue: 158 },
  ];

  const topTracks = [
    { title: "Morning Raag", artist: "Kavya Iyer", plays: 631 },
    { title: "Reflection No. 4", artist: "Arjun Mehta", plays: 506 },
    { title: "Mantra of Light", artist: "Sangha Voices", plays: 442 },
    { title: "Antara", artist: "Nila Sharma", plays: 412 },
    { title: "Breath of the Hills", artist: "Tenzin & Co.", plays: 388 },
  ];

  const countries = [
    { name: "India", pct: 38 }, { name: "United States", pct: 17 }, { name: "United Kingdom", pct: 11 },
    { name: "U.A.E.", pct: 8 }, { name: "Canada", pct: 6 }, { name: "Australia", pct: 5 }, { name: "Other", pct: 15 },
  ];

  const devices = [ { name: "Mobile", pct: 58 }, { name: "Desktop", pct: 29 }, { name: "Smart speaker", pct: 9 }, { name: "Other", pct: 4 } ];

  // schedule grid events (admin programming view)
  const programming = [
    { time: "06:00", title: "Morning Stillness", playlist: "Morning Stillness", host: "Anaya Reddy", hue: 158 },
    { time: "07:00", title: "Heart to Heart", playlist: "Live DJ", host: "Arjun Mehta", hue: 28, live: true },
    { time: "08:30", title: "Sounds of Silence", playlist: "Ambient Beds", host: "Auto", hue: 205 },
    { time: "10:00", title: "Wisdom Talk", playlist: "Talks & Conversations", host: "Sister Clara", hue: 268 },
    { time: "10:30", title: "Stories of the Heart", playlist: "Talks & Conversations", host: "Maya Iyer", hue: 340 },
    { time: "12:00", title: "Midday Mantra", playlist: "Chant & Resonance", host: "Auto", hue: 42 },
    { time: "18:00", title: "Evening Unwind", playlist: "Evening Unwind", host: "Auto", hue: 14 },
    { time: "22:00", title: "Night Frequencies", playlist: "Ambient Beds", host: "Anaya Reddy", hue: 232 },
  ];

  window.HFRADMIN = { station, listeners24h, week, media, playlists, streamers, requests, podcasts, topTracks, countries, devices, programming };
})();
