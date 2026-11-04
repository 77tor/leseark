window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-1",
  title: "Leseark 1 – is",
  subtitle: "Bokstaver: I, S",
  nextPageNotice: "Ekstra leselekse på baksiden.",
  
  // Her starter matrisen med sider for dette arket:
  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_is.png",
      
      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "I – S – I – S – I – I – S – S – S – I",
      learnedLettersSmall: "i – s – i – s – i – i – i – s – s – i – s",
      
      wordsTitle: "Les tre ganger:",
      words: [
        { word: "is" },
        { word: "si" }
      ],

      soundTaskType: "centerLetters",
      soundTaskQuestion: "Hvilken lyd er først i ordet?",
      
      soundTaskImages: {
        left: { imageSrc: "Bilder/isbjorn.png", alt: "Isbjørn" },
        right: { imageSrc: "Bilder/is.png", alt: "Saftis" },
        bottomLeft: { imageSrc: "Bilder/sel.png", alt: "Sel" },
        bottomRight: { imageSrc: "Bilder/sol.png", alt: "Sol" }
      },

      soundTaskLetters: [
        { char: "S", color: "text-blue-600" },
        { char: "I", color: "text-red-600" }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra lekse:",
      extraSentences: [
        "Siri ser en gul is.",
        "Per ser en sel.",
        "Ole vil se i en isbjørn.",
        "Sola er gul og fin."
      ],
      mouseImage: "Bilder/tekst_01.png",
      imageStyle: "photo-frame",
      imageMargin: "ml-[70px]",
      imageSize: "max-h-64 max-w-[280px]"
    }
  ]
});