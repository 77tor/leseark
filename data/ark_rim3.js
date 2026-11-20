window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-rim-3",
  title: "Rim og stavelser 3",
  uppercaseLetters: false,
  subtitle: "Tema: Rim og stavelser",
  defaultWeek: 36,

  pages: [
    {
      pageNumber: 1,
      rhymeMatchTask: {
        title: "Hvilke ord rimer?",
        instruction: "Sett strek mellom ordene som rimer.",
        rows: [
          {
            left:  { image: "Bilder/hest.png", alt: "Hest" },
            right: { image: "Bilder/eske.png", alt: "Eske" }
          },
          {
            left:  { image: "Bilder/veske.png", alt: "Veske" },
            right: { image: "Bilder/vest.png", alt: "Vest" }
          },
          {
            left:  { image: "Bilder/stein.png", alt: "Stein" },
            right: { image: "Bilder/egg.png", alt: "Egg" }
          },
          {
            left:  { image: "Bilder/skjegg.png", alt: "Skjegg" },
            right: { image: "Bilder/regn.png", alt: "Regn" }
          }
        ]
      },
      syllableTask: {
        title: "Hvor mange stavelser?",
        instruction: "Klapp ordet og sett ring rundt riktig tall.",
        items: [
          { image: "Bilder/sykkel.png", alt: "Sykkel (2)" },
          { image: "Bilder/hatt.png", alt: "Hatt (1)" },
          { image: "Bilder/appelsin.png", alt: "Appelsin (3)" },
          { image: "Bilder/sjokolade.png", alt: "Sjokolade (4)" }
        ]
      }
    }
  ]
});