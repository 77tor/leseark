window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-8",
  title: "Leseark 8 – du",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M, Å, J, D, U",
  nextPageNotice: "Leselekse også på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_du.png",
      
      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "i s l o r e m a v d u t å",
      learnedLettersSmall: "l v r m t a å d s t v o u",
      
      wordsTitle: "Les tre ganger:",
      words: [
        { word: "ål" }, { word: "ås" }, { word: "tå" }, { word: "må" }, { word: "så" }
      ],

      // Strek-oppgave med rammer på ord (3 bilder i row1, 2 bilder i row2)
      matchTaskTitle: "Les og sett strek til riktig bilde.",
      matchTask: {
        boxed: true,
        words: ["dal", "mål", "åre", "våt", "lås"],
        row1: [
          { src: "Bilder/aare.png", size: "h-20" },
          { src: "Bilder/dal.png", size: "h-20" },
          { src: "Bilder/vaat.png", size: "h-20" }
        ],
        row2: [
          { src: "Bilder/maal.png", size: "h-20" },
          { src: "Bilder/laas.png", size: "h-16" }
        ]
      }
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      topReadingTask: {
        title: "Les teksten tre ganger.",
        sentences: [
          "Ser du et tre?",
          "Ser du ei lue?",
          "Ja sier Trine.",
          "Nei sier Ola.",
          "Trine ler.",
          "Ola ler."
        ],
        image: "Bilder/lue.png",
        imageSize: "h-36 max-w-[160px]"
      },

      extraTitle: "Ekstra leselekser:",
      extraSentences: [
        "Det er sol i dag.",
        "Åge og Pål er ute på tur i bilen.",
        "Bilen er rød.",
        "Den er kul.",
        "Åge ler.",
        "Pål ler.",
        "Begge to ler."
      ],
      mouseImage: "Bilder/tekst_08.png",
      imageMargin: "relative -left-[80px] mt-[120px]",
      imageSize: "max-h-52 max-w-[280px]",
      imageStyle: "photo-frame"
    }
  ]
});