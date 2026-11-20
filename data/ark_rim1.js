window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-rim-1",
  title: "Rim og stavelser 1",
  uppercaseLetters: false,
  subtitle: "Tema: Rim og stavelser",
  defaultWeek: 34,

  pages: [
    {
      pageNumber: 1,
      rhymeMatchTask: {
        title: "Hvilke ord rimer?",
        instruction: "Sett strek mellom ordene som rimer.",
rows: [
          {
            left:  { image: "Bilder/sol.png", alt: "Sol" },
            right: { image: "Bilder/hus.png", alt: "Hus" }
          },
          {
            left:  { image: "Bilder/mus_01.png", alt: "Mus" },
            right: { image: "Bilder/is.png", alt: "Is" }
          },
          {
            left:  { image: "Bilder/gris.png", alt: "Gris" },
            right: { image: "Bilder/pil.png", alt: "Pil" }
          },
          {
            left:  { image: "Bilder/bil.png", alt: "Bil" },
            right: { image: "Bilder/stol.png", alt: "Stol" }
          }
        ]
      },
      syllableTask: {
        title: "Hvor mange stavelser?",
        instruction: "Klapp ordet og sett ring rundt riktig tall.",
        items: [
          { image: "Bilder/pære.png", alt: "Pære (2)" },
          { image: "Bilder/sol.png", alt: "Sol (1)" },
          { image: "Bilder/elefant.png", alt: "Elefant (3)" },
          { image: "Bilder/eple.png", alt: "Eple (2)" }
        ]
      }
    }
  ]
});