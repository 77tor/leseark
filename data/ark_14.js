window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-14",
  title: "Leseark 14 – wxz",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M, Å, J, D, U, G, N, P, Y, H, F, K, Æ, C, Q, W, X, Z",
  nextPageNotice: "Leselekse også på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_wxz.png",

      // Ordoppgave
      wordsTitle: "Les tre ganger:",
      words: [
        { word: "yacht" },
        { word: "Zalo" },
        { word: "yoghurt" },
        { word: "western" },
        { word: "xylofon" },
        { word: "zebra" },
        { word: "zoo" }
      ],

      // Setningsoppgave
      sentenceTaskTitle: "Les setningene tre ganger:",
      sentenceTask: [
        { text: "Vi ser en zebra." },
        { text: "Pappa tar taxi." },
        { text: "Vi lager wok." }
      ],

      // Strek-oppgave
      matchTaskTitle: "Les og sett strek til riktig bilde.",
      matchTask: {
        boxed: true,
        words: ["Zalo", "yoghurt", "yoga", "xylofon", "yacht"],
        row1: [
          { src: "Bilder/yacht.png", size: "h-20" },
          { src: "Bilder/yoghurt.png", size: "h-20" },
          { src: "Bilder/yoga.png", size: "h-20" }
        ],
        row2: [
          { src: "Bilder/xylofon.png", size: "h-20" },
          { src: "Bilder/zalo.png", size: "h-20" }
        ]
      }
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,

      topReadingTask: {
        title: "Les teksten tre ganger.",
        sentences: [
          "Zara ser en zebra i en zoo.",
          "Zebraen går rolig.",
          "Hun tar taxi hjem.",
          "Hjemme spiller hun på xylofon.",
          "Det er gøy!"
        ],
        image: "Bilder/zoo.png",
        imageSize: "h-36 max-w-[220px]"
      },

      extraTitle: "Ekstra leselekser:",
      extraSentences: [
        "Vi lager wok til mat.",
        "Live elsker wok!",
        "De vasker opp.",
        "Pappa tar i mye Zalo.",
        "Det blir masse skum!"
      ],

      mouseImage: "Bilder/tekst_14.png",
      imageMargin: "mt-6",
      imageSize: "max-h-56 max-w-[280px]",
      imageStyle: "photo-frame"
    }
  ]
});