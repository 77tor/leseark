window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-7",
  title: "Leseark 7 – åj",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M, Å, J",
  nextPageNotice: "Leselekse også på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_aaj.png",
      
      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "å s l o r e m a v j ø t",
      learnedLettersSmall: "v j r m t a ø s t v o å",
      
      wordsTitle: "Les tre ganger:",
      words: [
        { word: "mø" }, { word: "ro" }, { word: "jo" },
        { word: "to" }, { word: "ål" }, { word: "ja" }
      ],

// Oppgave 3 med 4 bilder øverst og 3 nederst
      matchTaskTitle: "Les og sett strek til riktig bilde:",
      matchTask: {
      boxed: true,
        words: ["lås", "båt", "mel", "jojo", "tre", "ost", "bål"],
        row1: [
          { src: "Bilder/jojo.png", size: "h-20" },
          { src: "Bilder/mel.png", size: "h-20" },
          { src: "Bilder/tre.png", size: "h-20" },
          { src: "Bilder/baal.png", size: "h-20" }
        ],
        row2: [
          { src: "Bilder/ost.png", size: "h-14" },
          { src: "Bilder/baat.png", size: "h-14" },
          { src: "Bilder/laas.png", size: "h-16" }
        ]
      },

    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      
      // Øverste del av Side 2
      topReadingTask: {
        title: "Les teksten tre ganger.",
        sentences: [
          "Tåa til Åse er blå.",
          "Jim ser to blå båter.",
          "Jo er tre år.",
          "Tor sier jojo er moro."
        ],
        image: "Bilder/jojo.png"
      },

      // Nederste del av Side 2 (Ekstra leselekse)
      extraTitle: "Ekstra leselekse:",
      extraSentences: [
        "Per bor i en by.",
        "Han bor i et hus.",
        "Han bor med mor og far.",
        "Per har en katt."
      ],
      mouseImage: "Bilder/tekst_07.png",
      imageMargin: "relative -left-[40px] mt-[1px]",
      imageSize: "max-h-56 max-w-[280px]",
      imageStyle: "photo-frame",


      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",

    tasks: [
        {
            image: "matte/ark_07_01.png",
            alt: "Telle",
            imageSize: "size-large",
            instruction: "Hvor mange? Sett ring rundt riktig antall."
     }
  ]
},
// NY norskoppgave / skriveoppgave (hentes fra mappen norsk/)
    norskTask: {
      title: "Skriveoppgave:",
      instruction: "Øv på å og j.",
      tasks: [
        {
          image: "norsk/bokstav_aaj.png",
        imageSize: "size-xxxl"
        }
      ]
    }
  }
]

});