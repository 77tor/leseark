window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-5",
  title: "Leseark 5 – bt",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_bt.png",
      
      learnedLettersTitle: "Les tre ganger:",
      learnedLetters: "B b a O R S b i l e V r o A S",
      learnedLettersSmall: "i b s e r T t a E v o l T t i",
      
      wordsTitle: "Les tre ganger:",
      words: [
        { word: "ro" }, { word: "ta" }, { word: "re" },
        { word: "bi" }, { word: "ba" }, { word: "te" }
      ],

      // Ny oppgavetype nederst på Side 1
      sentenceTaskTitle: "Les tre ganger:",
      sentenceTask: [
        { text: "Se tre.", image: "Bilder/tre.png" },
        { text: "Se sol.", image: "Bilder/sol.png" },
        { text: "Se bil.", image: "Bilder/bil.png" }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra lekse:",
      extraSentences: [
        "Ser du ei mus?",
        "Ei mus kan bo i en mur.",
        "Pek på musa.",
        "Musa er en lur mus.",
        "Musa ler."
      ],
      mouseImage: "Bilder/mus_i_mur.png", // Bildet av musa i murveggen
      imageMargin: "ml-8",
      imageSize: "max-h-72 max-w-[260px]",


      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",

    tasks: [
        {
            image: "matte/ark_05_01.png",
            alt: "Telle",
            imageSize: "size-large",
            instruction: "Sett ring rundt den største mengden."
        },
        {
            image: "matte/ark_05_02.png",
            alt: "Telle",
            imageSize: "size-large",
            instruction: "Sett kryss over den minste mengden."
     }
  ]
},
// NY norskoppgave / skriveoppgave (hentes fra mappen norsk/)
    norskTask: {
      title: "Skriveoppgave:",
      instruction: "Øv på b og t.",
      tasks: [
        {
          image: "norsk/bokstav_bt.png",
        imageSize: "size-xxxl"
        }
      ]
    }
  }
]

});