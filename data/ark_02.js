window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-2",
  title: "Leseark 2 – lo",
  subtitle: "Bokstaver: I, S, L, O",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_lo.png",
      
      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "I – S – L – O – S – L – I – S – O – L",
      learnedLettersSmall: "i – s – l – o – i – i – s – i – o – s – l – o",
      
wordsTitle: "Les tre ganger:",
      words: [
        // Linje 1: 2-lydsord
        { word: "lo" },
        { word: "ol" },
        { word: "so" },
        { word: "os" },
        { word: "il" },
        { word: "li" },
        { word: "si" },
        { word: "is" },
        { lineBreak: true }, // Tvinger neste ord ned på linje 2

        // Linje 2: 3-lydsord
        { word: "sol" },
        { word: "los" },
        { word: "sil" },
        { word: "isi" },
        { word: "sos" },
        { word: "lol" }
      ],

      soundTaskType: "centerLetters",
      soundTaskQuestion: "Hvilken lyd er først i ordet?",
      
      soundTaskImages: {
        left: { imageSrc: "Bilder/okse.png", alt: "Okse" },
        right: { imageSrc: "Bilder/ost.png", alt: "Ost" },
        bottomLeft: { imageSrc: "Bilder/lue.png", alt: "Lue" },
        bottomRight: { imageSrc: "Bilder/lam.png", alt: "Lam" }
      },

      soundTaskLetters: [
        { char: "o", color: "text-red-600" },
        { char: "l", color: "text-blue-600" }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra lekse:",
      extraSentences: [
        "Si sol.",
        "Si solo.",
        "Sola er varm.",
        "Solo er en brus.",

      ],
      mouseImage: "Bilder/solo.png",
      imageMargin: "ml-[140px]",
      imageSize: "max-h-50 max-w-[65px]",

      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",
        instruction: "Hvor mange hjørner?",

    tasks: [
        {
            image: "matte/ark_02_01.png",
            alt: "Telle",
            imageSize: "size-xxxl"
    }
  ]
},
// NY norskoppgave / skriveoppgave (hentes fra mappen norsk/)
    norskTask: {
      title: "Skriveoppgave:",
      instruction: "Øv på l og o.",
      tasks: [
        {
          image: "norsk/bokstav_lo.png",
        imageSize: "size-xxxl"
        }
      ]
    }
  }
]

});