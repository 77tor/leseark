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
        { word: "is" }, { word: "si" }, { word: "li" }, { word: "lo" },
        { word: "sil" }, { word: "sol" }, { word: "oli" }, { word: "lis" }
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
        { char: "O", color: "text-red-600" },
        { char: "L", color: "text-blue-600" }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra lekse:",
      extraSentences: [
        "Si sol når du ser lyset.",
        "Si solo fem ganger.",
        "Solo er en brus.",
        "Vi ler og koser oss."
      ],
      mouseImage: "Bilder/solo.png",
      imageMargin: "ml-[140px]",
      imageSize: "max-h-50 max-w-[65px]",

      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",

        taskGap: 10,
    tasks: [
        {
            image: "matte/ark_02_01.png",
            alt: "Telle",
            imageSize: "size-large",
            instruction: "Hvor mange? Sett ring rundt riktig tall."
        },
        {
            image: "matte/ark_02_02.png",
            alt: "Telle",
            imageSize: "size-large",
            instruction: "Hvor mange? Skriv riktig antall."
        }

        ]
      }
    }
  ]
});