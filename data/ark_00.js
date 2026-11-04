window.lesearkData = window.lesearkData || [];

window.lesearkData.unshift({
  id: "sheet-0",
  title: "Forside & Innholdsfortegnelse",
  subtitle: "Tittel og oversikt over valgte leseark",
  isCover: true,

  pages: [
    // --- SIDE 1: Forside ---
    {
      pageNumber: 1,
      type: "cover",
      title: "Lesehefte for 1. trinn",
      subtitle: "Leselekser for høsten i 1. klasse",
      coverImage: "Bilder/forside_lesing.png",
      schoolName: "Hånes skoleenhet",
      bulletPoints: [
        "Leseark med alle bokstavene vi lærer på skolen.",
        "Husk å les bokstavlyden «k». Eks: les <u>kkk</u>, ikke <u>kå</u>.",
        "Les tekstene 3 ganger for repetert lesing og leseflyt.",
        "Se arbeidsplanen for riktig leseark for de ulike ukene."
      ]
    },

    // --- SIDE 2: Innholdsfortegnelse ---
    {
      pageNumber: 2,
      type: "toc",
      title: "Innholdsfortegnelse"
    }
  ]
});