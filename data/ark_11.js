window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-11",
  title: "Leseark 11 – hf",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M, Å, J, D, U, G, N, P, Y, H, F",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse (Mandag-Torsdag) ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_hf.png",

      dayTasks: [
        // Mandag og tirsdag
        {
          title: "Leselekse mandag og tirsdag:",
          words: "hå  hi  ha  he  hy  hei  hår  hest",
          sentences: [
            "Hans har en hest.",
            "Hest er fine dyr.",
            "Hans rir fort."
          ],
          image: "Bilder/gutt_hest.png",
          imageSize: "h-36"
        },
        // Onsdag og torsdag
        {
          title: "Leselekse onsdag og torsdag:",
          words: "fi, fe, få, fo, fest, fire, fis",
          sentences: [
            "Runar fisker.",
            "Får han fisk?",
            "Fisken er en frosk."
          ],
          image: "Bilder/gutt_frosk.png",
          imageSize: "h-32"
        }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra leselekse:",
      extraSentences: [
        "En liten bie flyr.",
        "Den samler nektar.",
        "Bier elsker å jobbe.",
        "Bier flyr fra blomst til blomst.",
        "De lager honning.",
        "Alle biene er flinke og glade."
      ],
      mouseImage: "Bilder/bie.png",
      imagePosition: "bottom",
      imageSize: "max-h-56 max-w-[300px]",
      imageMargin: "mt-6",
      imageStyle: "photo-frame"
    }
  ]
});