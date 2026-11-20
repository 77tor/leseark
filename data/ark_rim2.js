window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-rim-2",
  title: "Rim og stavelser 2",
  uppercaseLetters: false,
  subtitle: "Tema: Rim og stavelser",
  defaultWeek: 35,

  pages: [
    {
      pageNumber: 1,
      rhymeMatchTask: {
        title: "Hvilke ord rimer?",
        instruction: "Sett strek mellom ordene som rimer.",
        rows: [
          {
            left:  { image: "Bilder/bok.png", alt: "Bok" },
            right: { image: "Bilder/bru.png", alt: "Bru" }
          },
          {
            left:  { image: "Bilder/ku.png", alt: "Ku" },
            right: { image: "Bilder/krok.png", alt: "Krok" }
          },
          {
            left:  { image: "Bilder/katt.png", alt: "Katt" },
            right: { image: "Bilder/ball.png", alt: "Ball" }
          },
          {
            left:  { image: "Bilder/tall.png", alt: "Tall" },
            right: { image: "Bilder/hatt.png", alt: "Hatt" }
          }
        ]
      },
      syllableTask: {
        title: "Hvor mange stavelser?",
        instruction: "Klapp ordet og sett ring rundt riktig tall.",
        items: [
          { image: "Bilder/banan.png", alt: "Banan (2)" },
          { image: "Bilder/krokodille.png", alt: "Krokodille (4)" },
          { image: "Bilder/bil.png", alt: "Bil (1)" },
          { image: "Bilder/krone.png", alt: "Krone (2)" }
        ]
      }
    }
  ]
});