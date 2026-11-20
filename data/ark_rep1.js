window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-rep-1",
  title: "Repetisjon (islorevabt)",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Repetisjon ---
    {
      pageNumber: 1,
      headerImage: "repetisjon",

      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "I  S  L  O  R  E  V  A  B  T",
      learnedLettersSmall: "i  s  l  o  r  e  v  a  b  t",

      wordsTitle: "Les tre ganger:",
      words: [
        { word: "is" },
        { word: "se" },
        { word: "ro" },
        { word: "ta" },
        { word: "vi" },
        { word: "si" },
        { word: "lo" },
        { word: "re" },
        { word: "av" },
        { word: "ri" },
        { word: "ti" },
        { lineBreak: true },
        { word: "sol" },
        { word: "sil" },
        { word: "bil" },
        { word: "rev" },
        { word: "ser" },
        { word: "les" },
        { word: "sel" },
        { word: "tre" },
        { word: "rot" }
      ],

      readingSentencesTitle: "Les tre ganger:",
      readingSentences: [
        "Siri ser en bil.",
        "Ola ror i elva.",
        "Lisa leser et brev.",
        "Toril ser en stor rev."
      ],
      readingSentencesImage: "Bilder/rev_i_skogen.png",
      readingSentencesImageStyle: "photo-frame"
    },

// --- SIDE 2: Ekstra leselekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra leselekse:",
      extraMargin: "mt-8",
      extraSentences: [
        "Ola eier en stor bil.",
        "Siri vil sitte i bilen.",
        "Tore sitter i setet.",
        "Bilen raser bort.",
        "Alle tre ler."
      ],
      mouseImage: "Bilder/biltur.png",
      imageStyle: "photo-frame",
      imageMargin: "ml-8",
      imageSize: "max-h-48 max-w-[240px]",

      extraWordsTitle: "Ekstra - øveord med bokstavene vi har lært:",
      extraWords: [
        // 2-lydsord
        { word: "is" }, { word: "si" }, { word: "se" }, { word: "lo" }, { word: "ro" }, { word: "vi" }, { word: "av" }, 
	{ word: "to" }, { word: "ta" }, { word: "bo" }, { word: "la" }, { word: "le" }, { word: "li" }, { word: "sa" }, 

        { lineBreak: true },

        // 3-lydsord
        { word: "bil" }, { word: "sol" }, { word: "sil" }, { word: "sal" }, { word: "sel" }, { word: "rev" }, { word: "ris" },
        { word: "rot" }, { word: "ras" }, { word: "ost" }, { word: "bot" }, { word: "bit" }, { word: "ser" }, { word: "ler" }, 
	{ word: "les" }, { word: "let" }, { word: "vet" }, { word: "var" }, { word: "vil" }, { word: "tre" }, { word: "bra" }, 

        { lineBreak: true },

        // 4-lydsord
        { word: "stol" }, { word: "stor" }, { word: "stiv" }, { word: "blir" }, { word: "brev" }, { word: "bror" },{ word: "vilt" }, 
	{ word: "rive" }, { word: "vise" }, { word: "vare" }, { word: "bare" }, { word: "base" }, { word: "rase" }, { word: "rose" },
      ]
    }
  ]
});