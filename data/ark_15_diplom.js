window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-diplom",
  title: "Gratulerer! Du har lært alle bokstavene",
  subtitle: "Hele alfabetet: A–Å",
  nextPageNotice: "Leseutfordring på baksiden!",

  pages: [
    // --- SIDE 1: Hele alfabetet & feirende leseoppgaver ---
    {
      pageNumber: 1,
      headerImage: "alfabetet",

      learnedLettersTitle: "Les hele alfabetet tre ganger:",
      learnedLetters: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z Æ Ø Å",
      learnedLettersSmall: "a b c d e f g h i j k l m n o p q r s t u v w x y z æ ø å",

      wordsTitle: "Les tre ganger:",
      words: [
        { word: "avis" },
        { word: "bevis" },
        { word: "due" },
        { word: "lue" },
        { word: "gå" },
        { word: "nå" },
        { word: "pil" },
        { word: "bil" },
        { lineBreak: true },
        { word: "flink" },
        { word: "lese" },
        { word: "skole" },
        { word: "diplom" },
        { word: "hurra" }
      ],

      readingSentencesTitle: "Les teksten tre ganger:",
      readingSentences: [
        "Hurra! Nå har jeg lært alle bokstavene.",
        "Jeg kan lese ord helt selv.",
        "Bøker er fulle av magi.",
        "Jeg er en flink leser!"
      ],
      readingSentencesImage: "Bilder/gratulerer.png",
      readingSentencesImageStyle: "photo-frame",
      readingSentencesImageCustomStyle: "max-height: 180px; margin-top: 48px; margin-left: -100px; margin-right: 45px;"
    },

    // --- SIDE 2: Leseutfordring på baksiden ---
    {
      pageNumber: 2,
      extraMargin: "mt-8",
      extraTitle: "Leseutfordring – en liten fortelling:",
      extraSentences: [
        "I dag er det en helt spesiell dag i klassen.",
        "Alle barna har lært hele alfabetet fra A til Å.",
        "Læreren deler ut diplomer og smiler stort.",
        "Nå kan vi lese skilt, eventyr og tykke bøker.",
        "Hurra for oss som har jobbet så godt!"
],
imagePosition: "bottom",
      mouseImage: "Bilder/pokal.png",
      imageMargin: "mt-16",
      imageSize: "max-h-72 max-w-[300px]"
    }
  ]
});