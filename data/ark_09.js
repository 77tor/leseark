window.lesearkData = window.lesearkData || [];

window.lesearkData.push({
  id: "sheet-9",
  title: "Leseark 9 – gn",
  subtitle: "Bokstaver: I, S, L, O, R, E, V, A, B, T, Ø, M, Å, J, D, U, G, N",
  nextPageNotice: "Ekstra leselekse på baksiden.",

  pages: [
    // --- SIDE 1: Hovedlekse (Mandag-Torsdag) ---
    {
      pageNumber: 1,
      headerImage: "Bilder/ukens_bokstaver_gn.png",

      dayTasks: [
        // Mandag og tirsdag
        {
          title: "Leselekse mandag og tirsdag:",
          words: "gå, gi, ga, gul, gir, gli, gre, grå",
          sentences: [
            "Tone vil ut å ri.",
            "Mamma sier ja.",
            "Det er moro å ri."
          ],
          image: "Bilder/ri.png",
          imageSize: "h-36"
        },
        // Onsdag og torsdag
        {
          title: "Leselekse onsdag og torsdag:",
          words: "ni, ne, nå, noe, neste, Norge, nisse",
          sentences: [
            "Gro vil også ut.",
            "Hun vil spille ball.",
            "Ballen er borte."
          ],
          image: "Bilder/ball.png",
          imageSize: "h-28"
        }
      ]
    },

    // --- SIDE 2: Ekstralekse ---
    {
      pageNumber: 2,
      extraTitle: "Ekstra leselekse:",
      extraSentences: [
        "Se, en fin båt, sa Nora.",
        "Den er ikke ny, sa Gunn.",
        "Lurer på om noen eier den, sa Nelly.",
        "Den er litt rar, sa Gunn.",
        "Skal vi leke i båten? sier Nora.",
        "Ja, sier Nelly. Vi leker i båten."
      ],
      mouseImage: "Bilder/tekst_09.png",
      imageMargin: "relative -left-[80px] mt-[-70px]",
      imageSize: "max-h-52 max-w-[220px]",
      imageStyle: "photo-frame",


      // MATTEOPPGAVE
      mathTask: {
        title: "Matteoppgave:",

    tasks: [
        {
            image: "matte/ark_09_01.png",
            alt: "Telle",
            imageSize: "size-xxxxl",
            instruction: "Hvor mange? Tegn strek til tallinja."
        }

        ]
      }
    }
  ]
});