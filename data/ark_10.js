window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-10",
  title: "Leseark 10 – py",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M, Å, J, D, U, G, N, P, Y",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse (Mandag-Torsdag) ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_py.png",

      dayTasks: [
        // Mandag og tirsdag
        {
          title: "Leselekse mandag og tirsdag:",
          words: "py  pa  pu  på  ap  op  yp  åp  pil  pus  pen",
          sentences: [
            "Mia ser en pinne.",
            "Se, en pil og bue.",
            "Se, en pen pil."
          ],
          image: "Bilder/pil_og_bue.png",
          imageSize: "h-32"
        },
        // Onsdag og torsdag
        {
          title: "Leselekse onsdag og torsdag:",
          words: "sy  my  ny  ly  ty  by  fy  ny  lyn  dyr  lys",
          sentences: [
            "Se et lys, sa Ina.",
            "Se et lyn, sa Una.",
            "Se et fly, sa Dino."
          ],
          image: "Bilder/fly.png",
          imageSize: "h-28"
        }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraMargin: "mt-12",
      extraTitle: "Ekstra leselekse:",
      extraSentences: [
        "Her er et troll.",
        "Det er et rart troll.",
        "Trollet har fint hår.",
        "Trollet heter Pål.",
        "Pål er redd for lyn.",
        "Pål liker å fly."
      ],
      mouseImage: "Bilder/troll.png",
      imageMargin: "relative -left-[20px] mt-[40px]",
      imageSize: "max-h-56 max-w-[260px]",
      imageStyle: "photo-frame"
    }
  ]
});