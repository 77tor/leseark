window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-13",
  title: "Leseark 13 – cq",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M, Å, J, D, U, G, N, P, Y, H, F, K, Æ, C, Q",
  nextPageNotice: "Leselekse også på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_cq.png",

      // Ordoppgave
      wordsTitle: "Les tre ganger:",
      words: [
        { word: "cola" }, { word: "cup" }, { word: "camping" }, { word: "quiz" }, { word: "Q-tips" }
      ],

      // Setningsoppgave
      sentenceTaskTitle: "Les setningene tre ganger:",
      sentenceTask: [
        { text: "Ali drikker cola." },
        { text: "Vi skal ha quiz." },
        { text: "En cup er en premie." }
      ],

      // Strek-oppgave
      matchTaskTitle: "Les og sett strek til riktig bilde.",
      matchTask: {
        boxed: true,
        words: ["cowboy", "Q-tips", "cola", "caps", "cello"],
        row1: [
          { src: "Bilder/cola.png", size: "h-20" },
          { src: "Bilder/cello.png", size: "h-20" },
          { src: "Bilder/q-tips.png", size: "h-20" }
        ],
        row2: [

          { src: "Bilder/caps.png", size: "h-20" },
          { src: "Bilder/cowboy.png", size: "h-20" }
        ]
      }
    },

// --- SIDE 2: Ekstralekse ---
{
  pageNumber: 2,

  topReadingTask: {
    title: "Les teksten tre ganger.",
    sentences: [
      "Ali og Mia skal på camping.",
      "De har med telt og mat.",
      "Ali liker å gå med caps.",
      "Mia vil ha cola."
    ],
    image: "Bilder/tekst_13.png",
    imageMargin: "mt-12",
    imageSize: "max-h-56 max-w-[250px]",
    imageStyle: "photo-frame"
  },

  extraTitle: "Ekstra leselekser:",
  extraSentences: [
    "Mamma har kjøpt Q-tips.",
    "Vi skal ha quiz i dag.",
    "Ali liker cola.",
    "Mia har vært på cup i helga."
  ],

  mouseImage: "Bilder/cup.png",
  imageMargin: "mt-6",
  imageSize: "max-h-56 max-w-[250px]",
  imageStyle: "photo-frame",


      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",

    tasks: [
        {
            image: "matte/ark_13_01.png",
            alt: "Telle",
            imageSize: "size-large",
            instruction: "Øv på å skrive tallene."
        }

        ]
      }
    }
  ]
});