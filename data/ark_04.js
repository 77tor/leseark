window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-4",
  title: "Leseark 4 – va",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_va.png",
      
      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "I S L O R E V A",
      learnedLettersSmall: "i s l o r e v a",
      
wordsTitle: "Les tre ganger:",
      words: [
        // Linje 1: 2-lydsord
        { word: "sa" },
        { word: "av" },
        { word: "vi" },
        { word: "ri" },
        { word: "ve" },
        { word: "al" },
        { word: "ar" },
        { word: "ra" },

        { lineBreak: true },

        // Linje 2: 3-lydsord
        { word: "var" },
        { word: "sal" },
        { word: "vis" },
        { word: "rav" },
        { word: "las" },
        { word: "rev" }
      ],

      soundTaskType: "centerLetters",
      soundTaskQuestion: "Hvilken lyd er først i ordet?",
      
      soundTaskImages: {
        left: { imageSrc: "Bilder/ape.png", alt: "Ape" },
        right: { imageSrc: "Bilder/vindu.png", alt: "Vindu" },
        bottomLeft: { imageSrc: "Bilder/vulkan.png", alt: "Vulkan" },
        bottomRight: { imageSrc: "Bilder/avis.png", alt: "Avis" }
      },

      soundTaskLetters: [
        { char: "v", color: "text-blue-600" },
        { char: "a", color: "text-red-600" }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra lekse:",
      extraSentences: [
        "Ei mus må ha mat.",
        "Den liker ost.",
        "Ei mus er ikke lett å lure.",
        "Kan vi ha mus i et hus?"
      ],
      mouseImage: "Bilder/mus_felle.png", // Eventuelt "Bilder/mus_ost.png" dersom filen har spesifikt navn
      imageMargin: "ml-8",
      imageSize: "max-h-72 max-w-[220px]",


      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",
        instruction: "En skal ut, hvilken? Sett ring rundt den som skal ut.",

        tasks: [
          {
            image: "matte/ark_04_01.png",
            alt: "Telle",
            imageSize: "size-xxxl"
     }
  ]
},
// NY norskoppgave / skriveoppgave (hentes fra mappen norsk/)
    norskTask: {
      title: "Skriveoppgave:",
      instruction: "Øv på v og a.",
      tasks: [
        {
          image: "norsk/bokstav_va.png",
        imageSize: "size-xxxl"
        }
      ]
    }
  }
]

});