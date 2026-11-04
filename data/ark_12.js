window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-12",
  title: "Leseark 12 – kæ",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M, Å, J, D, U, G, N, P, Y, H, F, K, Æ",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse (Mandag-Torsdag) ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_kae.png",

      dayTasks: [
        // Mandag og tirsdag
        {
          title: "Leselekse mandag og tirsdag:",
          words: "kø, ku, ka, ke, ær, æs, æl, kul, kam, kne",
          sentences: [
            "Kim er kul, sa Siri.",
            "Kan du ake?",
            "Vi kan ake."
          ],
          image: "Bilder/ake.png",
          imageSize: "h-36"
        },
        // Onsdag og torsdag
        {
          title: "Leselekse onsdag og torsdag:",
          words: "koko, kaka, kiki, bæ, be, bo, bær, tær, lær",
          sentences: [
            "Bær er bra, sier Bea.",
            "Rips er bær, sier Ina.",
            "Har du ti tær?"
          ],
          image: "Bilder/rips.png",
          imageSize: "h-32"
        }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra leselekse:",
      extraSentences: [
        "I en kasse bor en krabbe.",
        "Krabben heter Krabbe-Kari.",
        "Krabbe-Kari klatrer ut i stranden.",
        "På stranden finner hun tre store bær.",
        "Krabbe-Kari smaker på bærene.",
        "Nam, nam, de er gode."
      ],
      mouseImage: "Bilder/krabbe_strand.png",
      imagePosition: "bottom",
      imageSize: "max-h-56 max-w-[300px]",
      imageMargin: "mt-6",
      imageStyle: "photo-frame"
    }
  ]
});