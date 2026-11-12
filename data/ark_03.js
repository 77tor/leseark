window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-3",
  title: "Leseark 3 – re",
  subtitle: "Bokstaver: I, S, L, O, R, E",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_re.png",
      
      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "I S L O R E",
      learnedLettersSmall: "i   s   l   o   r   e",
      
      wordsTitle: "Les tre ganger:",
      words: [
        { word: "ri" }, { word: "ro" }, { word: "re" },
        { word: "el" }, { word: "es" }, { word: "er" }
      ],

      soundTaskType: "centerLetters",
      soundTaskQuestion: "Hvilken lyd er først i ordet?",
      
      soundTaskImages: {
        left: { imageSrc: "Bilder/esel.png", alt: "Esel" },
        right: { imageSrc: "Bilder/rose.png", alt: "Rose" },
        bottomLeft: { imageSrc: "Bilder/regnbue.png", alt: "Regnbue" },
        bottomRight: { imageSrc: "Bilder/eple.png", alt: "Eple" }
      },

      soundTaskLetters: [
        { char: "E", color: "text-red-600" },
        { char: "R", color: "text-blue-600" }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra lekse:",
      extraSentences: [
        "Jon har en syl.",
        "Han får et sår.",
        "Da er han sur.",
        "Er du sur?"
      ],
      mouseImage: "Bilder/syl.png",
      imageMargin: "ml-[140px]",
      imageSize: "max-h-72 max-w-[200px]",


      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",
        instruction: "Hvor mange hjørner?",

        tasks: [
          {
            image: "matte/ark_03_01.png",
            alt: "Telle",
            imageSize: "size-xxxxl"
     }
  ]
},
// NY norskoppgave / skriveoppgave (hentes fra mappen norsk/)
    norskTask: {
      title: "Skriveoppgave:",
      instruction: "Øv på r og e.",
      tasks: [
        {
          image: "norsk/bokstav_re.png",
        imageSize: "size-xxxl"
        }
      ]
    }
  }
]

});