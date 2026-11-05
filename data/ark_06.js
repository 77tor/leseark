window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-6",
  title: "Leseark 6 – øm",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_oem.png",
      
      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "i s l o r e b m a v b ø",
      learnedLettersSmall: "r m b a l ø t e ø o v i",
      
      wordsTitle: "Les tre ganger:",
      words: [
        { word: "mø" }, { word: "mi" }, { word: "om" }, { word: "øm" }, { word: "øre" },
        { word: "mor" }, { word: "øks" }, { word: "øve" }, { word: "mat" }, { word: "mur" }
      ],
      wordsSideImage: "Bilder/oks.png", // Bildet av øksa til høyre for ordene

      // Oppgave 3 nederst på Side 1
      readingSentencesTitle: "Les tre ganger:",
      readingSentences: [
        "Mor leser avis.",
        "Se et tre.",
        "Mormor er søt.",
        "Kua sier mø."
      ],
      readingSentencesImage: "Bilder/tekst_06.png",
      readingSentencesImageStyle: "photo-frame",
    },

// --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra leselekse:",
      extraSentences: [
        "Ser du vann? Nei, det gjør jeg ikke.",
        "Ser du en bil? Ja, det gjør jeg.",
        "Ser du en båt? Nei, det gjør jeg ikke.",
        "Ser du et tog? Ja, det gjør jeg.",
        "Ser du et fly? Ja, det gjør jeg."
      ],
      mouseImage: "Bilder/fly.png",
      imageMargin: "-mt-4 ml-4",
      imageSize: "max-h-28 max-w-[160px]",
      
      bottomImages: [
        { src: "Bilder/tog.png", size: "h-20" },
        { src: "Bilder/bil.png", size: "h-20" }
],

      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",
        instruction: "Hvor mange er det i hver tier-ramme?",

        tasks: [
          {
            image: "matte/ark_06_01.png",
            alt: "Telle",
            imageSize: "size-xxxl"
          }

        ]
      }
    }
  ]
});