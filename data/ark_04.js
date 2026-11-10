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
        { word: "va" }, { word: "ve" }, { word: "vi" },
        { word: "al" }, { word: "ar" }, { word: "av" }
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
        { char: "V", color: "text-blue-600" },
        { char: "A", color: "text-red-600" }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra lekse:",
      extraSentences: [
        "Ei mus må ha mat.",
        "Den kan ta mel.",
        "Ei mus kan gå ei mil.",
        "Kan vi ha mus i et hus?"
      ],
      mouseImage: "Bilder/mus.png", // Eventuelt "Bilder/mus_ost.png" dersom filen har spesifikt navn
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
      }
    }
  ]
});