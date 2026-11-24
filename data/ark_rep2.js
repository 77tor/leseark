window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-rep-2",
  title: "Repetisjon (ømåjdugnpy)",
  subtitle: "Bokstaver: Ø, M, Å, J, D, U, G, N, P, Y",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Repetisjon ---
    {
      pageNumber: 1,
      headerImage: "repetisjon",

      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "Ø  M  Å  J  D  U  G  N  P  Y",
      learnedLettersSmall: "ø  m  å  j  d  u  g  n  p  y",

      wordsTitle: "Les tre ganger:",
      words: [
        { word: "mø" },
        { word: "gå" },
        { word: "ja" },
        { word: "du" },
        { word: "ny" },
        { word: "på" },
        { word: "må" },
        { word: "om" },
        { word: "nå" },
        { lineBreak: true },
        { word: "mus" },
        { word: "båt" },
        { word: "gul" },
        { word: "sol" },
        { word: "sjø" },
        { word: "dag" },
        { word: "pus" },
        { word: "lyd" }
      ],

      readingSentencesTitle: "Les tre ganger:",
      readingSentences: [
        "Guro ser en gul båt.",
        "Maja og Jon går tur.",
        "Ei mus bor under et tre.",
        "Pappa maler døra blå."
      ],
      readingSentencesImage: "Bilder/pappa_dor.png",
      readingSentencesImageStyle: "photo-frame",
      readingSentencesImageCustomStyle: "max-height: 200px; margin-top: 12px; margin-left: 16px;"
    },

    // --- SIDE 2: Ekstra leselekse ---
    {
      pageNumber: 2,
      extraMargin: "mt-8",
      extraTitle: "Ekstra leselekse:",
      extraSentences: [
        "Ida og Mons går ut i snøen.",
        "De aker på akebrett.",
        "På toppen av bakken står en snømann.",
        "Den har en blå lue og en gulrot til nese.",
        "Ungene ler og aker ned igjen."
      ],
      mouseImage: "Bilder/snomann.png",
      imageStyle: "photo-frame",
      imageMargin: "ml-8",
      imageSize: "max-h-40 max-w-[150px]",

      extraWordsTitle: "Ekstra - øveord med bokstavene vi har lært:",
      extraWords: [
        // 2-lydsord
        { word: "mø" }, { word: "øm" }, { word: "gå" }, { word: "på" }, { word: "må" }, { word: "nå" }, { word: "så" },
        { word: "ja" }, { word: "jo" }, { word: "du" }, { word: "ut" }, { word: "ny" }, { word: "by" }, { word: "om" },

        { lineBreak: true },

        // 3-lydsord
        { word: "mus" }, { word: "pus" }, { word: "gul" }, { word: "dag" }, { word: "tog" }, 
        { word: "båt" }, { word: "våt" }, { word: "sjø" }, { word: "snø" }, { word: "dør" }, { word: "mor" },
        { word: "mat" }, { word: "man" }, { word: "min" }, { word: "din" }, { word: "sin" }, 
        { word: "lyd" }, { word: "bud" }, { word: "jul" }, { word: "pen" },
        { word: "par" },

        { lineBreak: true },

        // 4-lydsord
        { word: "møte" }, { word: "søte" }, { word: "måne" }, { word: "låne" }, { word: "jage" }, { word: "sage" }, { word: "duge" },
        { word: "pynt" }, { word: "puse" }, { word: "gule" }, { word: "drøm" }, { word: "brun" }, { word: "mjau" }, { word: "mygg" }
      ]
    }
  ]
});