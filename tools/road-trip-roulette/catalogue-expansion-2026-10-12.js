// Catalogue expansion researched and audited on 2026-10-12.
// Destinations are balanced across all 18 mainland districts; map points were
// resolved against OpenStreetMap/Nominatim and reviewed by distance.
const specs = [
  {
    "district": "Aveiro",
    "id": "ovar-destination",
    "name": "Ovar",
    "lat": 40.8586,
    "lon": -8.6251,
    "terrain": "coast",
    "vibes": [
      "coast",
      "history",
      "food"
    ],
    "emoji": "🎭",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Ovar"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Colourful azulejos, Atlantic fishing traditions and the Furadouro shore make Ovar an easy coastal detour.",
      "pt": "Azulejos coloridos, tradições piscatórias atlânticas e a costa do Furadouro fazem de Ovar um desvio fácil junto ao mar."
    },
    "stops": [
      "Igreja Matriz de Ovar",
      "Casa-Museu Júlio Dinis, Ovar",
      "Praia do Furadouro"
    ],
    "points": [
      {
        "lat": 40.8614147,
        "lon": -8.620911
      },
      {
        "lat": 40.859686,
        "lon": -8.6281385
      },
      {
        "lat": 40.8751527,
        "lon": -8.6767972
      }
    ]
  },
  {
    "district": "Aveiro",
    "id": "sever-vouga-destination",
    "name": "Sever do Vouga",
    "lat": 40.7316,
    "lon": -8.3674,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "viewpoint",
      "history"
    ],
    "emoji": "🌿",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Sever_do_Vouga"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Waterfalls, old railway bridges and green Vouga valleys reward a quiet inland drive.",
      "pt": "Cascatas, antigas pontes ferroviárias e vales verdes do Vouga recompensam um passeio tranquilo pelo interior."
    },
    "stops": [
      "Cascata da Cabreia",
      "Ponte do Poço de Santiago",
      "Museu Municipal de Sever do Vouga"
    ],
    "points": [
      {
        "lat": 40.7534231,
        "lon": -8.3896454
      },
      {
        "lat": 40.6992626,
        "lon": -8.3757007
      },
      {
        "lat": 40.7321039,
        "lon": -8.3681925
      }
    ]
  },
  {
    "district": "Beja",
    "id": "odemira-destination",
    "name": "Odemira",
    "lat": 37.5981,
    "lon": -8.6397,
    "terrain": "coast",
    "vibes": [
      "coast",
      "nature",
      "food"
    ],
    "emoji": "🌊",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Odemira"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A whitewashed hill town above the Mira opens onto wild beaches and Alentejo countryside.",
      "pt": "Uma vila caiada sobre o Mira abre caminho para praias selvagens e para a paisagem alentejana."
    },
    "stops": [
      "Igreja de Santa Maria de Odemira",
      "Moinho de Vento de Malavado",
      "Ponte de Odemira"
    ],
    "points": [
      {
        "lat": 37.5968215,
        "lon": -8.6404612
      },
      {
        "lat": 37.5805286,
        "lon": -8.7217593
      },
      {
        "lat": 37.5960546,
        "lon": -8.6436376
      }
    ]
  },
  {
    "district": "Beja",
    "id": "alvito-destination",
    "name": "Alvito",
    "lat": 38.2577,
    "lon": -7.9912,
    "terrain": "normal",
    "vibes": [
      "history",
      "food"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Alvito"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Manueline details, a castle-pousada and calm lanes reveal a compact historic Alentejo town.",
      "pt": "Pormenores manuelinos, um castelo-pousada e ruas sossegadas revelam uma vila histórica alentejana compacta."
    },
    "stops": [
      "Castelo de Alvito",
      "Igreja Matriz de Alvito",
      "Pelourinho de Alvito"
    ],
    "points": [
      {
        "lat": 38.2578532,
        "lon": -7.9917602
      },
      {
        "lat": 38.2567304,
        "lon": -7.9940086
      },
      {
        "lat": 38.2573431,
        "lon": -7.9920892
      }
    ]
  },
  {
    "district": "Braga",
    "id": "fafe-destination",
    "name": "Fafe",
    "lat": 41.4542,
    "lon": -8.168,
    "terrain": "mountain",
    "vibes": [
      "history",
      "nature",
      "food"
    ],
    "emoji": "🌲",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Fafe"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Granite architecture, garden squares and the Queimadela reservoir frame this Minho stop.",
      "pt": "Arquitetura de granito, jardins e a albufeira da Queimadela enquadram esta paragem minhota."
    },
    "stops": [
      "Jardim do Calvário, Fafe",
      "Igreja Nova de São José, Fafe",
      "Barragem da Queimadela"
    ],
    "points": [
      {
        "lat": 41.4518001,
        "lon": -8.1675304
      },
      {
        "lat": 41.4498872,
        "lon": -8.168391
      },
      {
        "lat": 41.501984,
        "lon": -8.1571368
      }
    ]
  },
  {
    "district": "Braga",
    "id": "povoa-lanhoso-destination",
    "name": "Póvoa de Lanhoso",
    "lat": 41.5755,
    "lon": -8.268,
    "terrain": "mountain",
    "vibes": [
      "history",
      "viewpoint",
      "nature"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/P%C3%B3voa_de_Lanhoso"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A dramatic hilltop castle, sanctuary and traditional goldwork overlook the Ave valley.",
      "pt": "Um castelo dramático no alto, um santuário e a ourivesaria tradicional dominam o vale do Ave."
    },
    "stops": [
      "Castelo de Lanhoso",
      "Santuário de Nossa Senhora do Pilar, Póvoa de Lanhoso",
      "Museu do Ouro de Travassos"
    ],
    "points": [
      {
        "lat": 41.5869323,
        "lon": -8.2814698
      },
      {
        "lat": 41.5864359,
        "lon": -8.281293
      },
      {
        "lat": 41.5729399,
        "lon": -8.2015298
      }
    ]
  },
  {
    "district": "Bragança",
    "id": "vinhais-destination",
    "name": "Vinhais",
    "lat": 41.8351,
    "lon": -7.0042,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "food",
      "history"
    ],
    "emoji": "🐗",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Vinhais"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Chestnut woods, mountain food and the edge of Montesinho make Vinhais a slow rural escape.",
      "pt": "Soutos, sabores de montanha e a proximidade de Montesinho fazem de Vinhais uma escapadinha rural sem pressa."
    },
    "stops": [
      "Parque Biológico de Vinhais",
      "Centro Cultural Solar dos Condes de Vinhais",
      "Castelo de Vinhais"
    ],
    "points": [
      {
        "lat": 41.8591702,
        "lon": -6.9875583
      },
      {
        "lat": 41.834019,
        "lon": -7.0046371
      },
      {
        "lat": 41.8356499,
        "lon": -7.0001677
      }
    ]
  },
  {
    "district": "Bragança",
    "id": "freixo-espada-destination",
    "name": "Freixo de Espada à Cinta",
    "lat": 41.0903,
    "lon": -6.8065,
    "terrain": "mountain",
    "vibes": [
      "history",
      "nature",
      "viewpoint"
    ],
    "emoji": "🦅",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Freixo_de_Espada_%C3%A0_Cinta"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Manueline stonework and sweeping Douro cliffs meet in Portugal's far northeast.",
      "pt": "A cantaria manuelina e as escarpas amplas do Douro encontram-se no extremo nordeste de Portugal."
    },
    "stops": [
      "Igreja Matriz de Freixo de Espada à Cinta",
      "Torre do Galo, Freixo de Espada à Cinta",
      "Miradouro do Penedo Durão"
    ],
    "points": [
      {
        "lat": 41.0921495,
        "lon": -6.8051716
      },
      {
        "lat": 41.092567,
        "lon": -6.8046923
      },
      {
        "lat": 41.0466503,
        "lon": -6.8184282
      }
    ]
  },
  {
    "district": "Castelo Branco",
    "id": "penamacor-destination",
    "name": "Penamacor",
    "lat": 40.1682,
    "lon": -7.1691,
    "terrain": "mountain",
    "vibes": [
      "history",
      "viewpoint",
      "food"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Penamacor"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Frontier towers and granite lanes look across the broad Beira Baixa landscape.",
      "pt": "Torres de fronteira e ruas de granito contemplam a ampla paisagem da Beira Baixa."
    },
    "stops": [
      "Pelourinho de Penamacor",
      "Torre de Menagem de Penamacor",
      "Museu Municipal de Penamacor"
    ],
    "points": [
      {
        "lat": 40.1677544,
        "lon": -7.1677021
      },
      {
        "lat": 40.167025,
        "lon": -7.1658064
      },
      {
        "lat": 40.1666167,
        "lon": -7.1706484
      }
    ]
  },
  {
    "district": "Castelo Branco",
    "id": "serta-destination",
    "name": "Sertã",
    "lat": 39.8085,
    "lon": -8.0988,
    "terrain": "normal",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "🌉",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Sert%C3%A3"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A riverside castle, old bridge and wooded valleys give Sertã a relaxed central-Portugal rhythm.",
      "pt": "Um castelo ribeirinho, uma ponte antiga e vales arborizados dão à Sertã um ritmo tranquilo do centro de Portugal."
    },
    "stops": [
      "Castelo da Sertã",
      "Ponte da Carvalha, Sertã",
      "Igreja Matriz da Sertã"
    ],
    "points": [
      {
        "lat": 39.8048526,
        "lon": -8.0988627
      },
      {
        "lat": 39.7996787,
        "lon": -8.0989824
      },
      {
        "lat": 39.8067602,
        "lon": -8.0993584
      }
    ]
  },
  {
    "district": "Coimbra",
    "id": "montemor-velho-destination",
    "name": "Montemor-o-Velho",
    "lat": 40.1728,
    "lon": -8.685,
    "terrain": "normal",
    "vibes": [
      "history",
      "nature",
      "viewpoint"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Montemor-o-Velho"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A vast castle surveys rice fields and wetlands along the lower Mondego.",
      "pt": "Um vasto castelo domina os arrozais e zonas húmidas do Baixo Mondego."
    },
    "stops": [
      "Castelo de Montemor-o-Velho",
      "Igreja de Santa Maria da Alcáçova, Montemor-o-Velho",
      "Paul do Taipal"
    ],
    "points": [
      {
        "lat": 40.1751843,
        "lon": -8.6841922
      },
      {
        "lat": 40.1754577,
        "lon": -8.6837345
      },
      {
        "lat": 40.1827264,
        "lon": -8.6878323
      }
    ]
  },
  {
    "district": "Coimbra",
    "id": "gois-destination",
    "name": "Góis",
    "lat": 40.1551,
    "lon": -8.1101,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "🌿",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/G%C3%B3is"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A graceful stone bridge and river beach sit among the forested hills of the Ceira valley.",
      "pt": "Uma elegante ponte de pedra e uma praia fluvial encontram-se entre as colinas arborizadas do vale do Ceira."
    },
    "stops": [
      "Ponte Real de Góis",
      "Igreja Matriz de Góis",
      "Praia Fluvial da Peneda, Góis"
    ],
    "points": [
      {
        "lat": 40.1549092,
        "lon": -8.1120909
      },
      {
        "lat": 40.1534336,
        "lon": -8.1104491
      },
      {
        "lat": 40.153853,
        "lon": -8.1122976
      }
    ]
  },
  {
    "district": "Évora",
    "id": "redondo-destination",
    "name": "Redondo",
    "lat": 38.6489,
    "lon": -7.5471,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "nature"
    ],
    "emoji": "🏺",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Redondo"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Pottery traditions, wine culture and old walls anchor this village beneath Serra d'Ossa.",
      "pt": "Tradição oleira, cultura do vinho e antigas muralhas marcam esta vila sob a Serra d'Ossa."
    },
    "stops": [
      "Castelo de Redondo",
      "Pelourinho de Redondo",
      "Praça da República, Redondo"
    ],
    "points": [
      {
        "lat": 38.6493339,
        "lon": -7.5429153
      },
      {
        "lat": 38.6487727,
        "lon": -7.543588
      },
      {
        "lat": 38.6468862,
        "lon": -7.5466764
      }
    ]
  },
  {
    "district": "Évora",
    "id": "portel-destination",
    "name": "Portel",
    "lat": 38.3066,
    "lon": -7.7024,
    "terrain": "normal",
    "vibes": [
      "history",
      "viewpoint",
      "food"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Portel"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A powerful hilltop castle overlooks white streets and the landscapes near Alqueva.",
      "pt": "Um poderoso castelo no alto domina ruas brancas e as paisagens próximas do Alqueva."
    },
    "stops": [
      "Castelo de Portel",
      "Igreja Matriz de Portel",
      "Igreja da Misericórdia de Portel"
    ],
    "points": [
      {
        "lat": 38.3090752,
        "lon": -7.70284
      },
      {
        "lat": 38.3086507,
        "lon": -7.7049138
      },
      {
        "lat": 38.3098395,
        "lon": -7.7026212
      }
    ]
  },
  {
    "district": "Faro",
    "id": "castro-marim-destination",
    "name": "Castro Marim",
    "lat": 37.2174,
    "lon": -7.4437,
    "terrain": "coast",
    "vibes": [
      "history",
      "nature",
      "viewpoint"
    ],
    "emoji": "🧂",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Castro_Marim"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Twin fortifications rise above salt marshes, flamingo habitat and the Guadiana frontier.",
      "pt": "Duas fortificações elevam-se sobre sapais, habitats de flamingos e a fronteira do Guadiana."
    },
    "stops": [
      "Castelo de Castro Marim",
      "Forte de São Sebastião, Castro Marim",
      "Reserva Natural do Sapal de Castro Marim e Vila Real de Santo António"
    ],
    "points": [
      {
        "lat": 37.2187649,
        "lon": -7.4417245
      },
      {
        "lat": 37.2163482,
        "lon": -7.4442033
      },
      {
        "lat": 37.2136976,
        "lon": -7.4420708
      }
    ]
  },
  {
    "district": "Faro",
    "id": "sao-bras-alportel-destination",
    "name": "São Brás de Alportel",
    "lat": 37.1531,
    "lon": -7.8873,
    "terrain": "normal",
    "vibes": [
      "history",
      "nature",
      "food"
    ],
    "emoji": "🌳",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/S%C3%A3o_Br%C3%A1s_de_Alportel"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Cork heritage, a Roman path and whitewashed streets reveal the quieter Algarve interior.",
      "pt": "A herança da cortiça, uma calçada romana e ruas caiadas revelam o interior mais tranquilo do Algarve."
    },
    "stops": [
      "Museu do Traje de São Brás de Alportel",
      "Calçadinha Romana de São Brás de Alportel",
      "Igreja Matriz de São Brás de Alportel"
    ],
    "points": [
      {
        "lat": 37.1531732,
        "lon": -7.8857737
      },
      {
        "lat": 37.1495752,
        "lon": -7.887651
      },
      {
        "lat": 37.1502078,
        "lon": -7.888246
      }
    ]
  },
  {
    "district": "Guarda",
    "id": "sabugal-destination",
    "name": "Sabugal",
    "lat": 40.3513,
    "lon": -7.091,
    "terrain": "mountain",
    "vibes": [
      "history",
      "nature",
      "viewpoint"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Sabugal"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A five-cornered keep watches the Côa river and the medieval frontier landscape.",
      "pt": "Uma torre de cinco quinas vigia o rio Côa e a paisagem medieval de fronteira."
    },
    "stops": [
      "Castelo do Sabugal",
      "Museu do Sabugal",
      "Praia Fluvial do Sabugal"
    ],
    "points": [
      {
        "lat": 40.3514117,
        "lon": -7.0939321
      },
      {
        "lat": 40.3524194,
        "lon": -7.0929597
      },
      {
        "lat": 40.3482797,
        "lon": -7.0920858
      }
    ]
  },
  {
    "district": "Guarda",
    "id": "celorico-beira-destination",
    "name": "Celorico da Beira",
    "lat": 40.6339,
    "lon": -7.3904,
    "terrain": "mountain",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "🧀",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Celorico_da_Beira"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Castle walls, Serra da Estrela cheese and high Beira views define this hill town.",
      "pt": "Muralhas, queijo Serra da Estrela e vistas altas da Beira definem esta vila."
    },
    "stops": [
      "Castelo de Celorico da Beira",
      "Igreja de Santa Maria, Celorico da Beira",
      "Centro Cultural de Celorico da Beira"
    ],
    "points": [
      {
        "lat": 40.6370302,
        "lon": -7.3921673
      },
      {
        "lat": 40.6381462,
        "lon": -7.3910087
      },
      {
        "lat": 40.631633,
        "lon": -7.3952955
      }
    ]
  },
  {
    "district": "Leiria",
    "id": "porto-mos-destination",
    "name": "Porto de Mós",
    "lat": 39.6019,
    "lon": -8.8184,
    "terrain": "mountain",
    "vibes": [
      "history",
      "nature",
      "viewpoint"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Porto_de_M%C3%B3s"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A green-roofed castle stands at the gateway to limestone valleys and caves.",
      "pt": "Um castelo de telhados verdes ergue-se à entrada de vales calcários e grutas."
    },
    "stops": [
      "Castelo de Porto de Mós",
      "Fórnea de Porto de Mós",
      "Grutas de Mira de Aire"
    ],
    "points": [
      {
        "lat": 39.6034367,
        "lon": -8.8187936
      },
      {
        "lat": 39.5586563,
        "lon": -8.8057578
      },
      {
        "lat": 39.5402481,
        "lon": -8.7040735
      }
    ]
  },
  {
    "district": "Leiria",
    "id": "pombal-destination",
    "name": "Pombal",
    "lat": 39.9167,
    "lon": -8.6333,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "nature"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Pombal"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A Templar castle, local heritage and a walkable centre make a useful midway detour.",
      "pt": "Um castelo templário, património local e um centro agradável fazem um bom desvio a meio do caminho."
    },
    "stops": [
      "Castelo de Pombal",
      "Museu de Arte Popular Portuguesa, Pombal",
      "Igreja do Cardal, Pombal"
    ],
    "points": [
      {
        "lat": 39.9139469,
        "lon": -8.6248078
      },
      {
        "lat": 39.913984,
        "lon": -8.6276421
      },
      {
        "lat": 39.9155617,
        "lon": -8.6289569
      }
    ]
  },
  {
    "district": "Lisboa",
    "id": "vila-franca-xira-destination",
    "name": "Vila Franca de Xira",
    "lat": 38.9553,
    "lon": -8.9897,
    "terrain": "normal",
    "vibes": [
      "history",
      "nature",
      "food"
    ],
    "emoji": "🐂",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Vila_Franca_de_Xira"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Tagus river walks, contemporary culture and lezíria traditions meet north of Lisbon.",
      "pt": "Passeios junto ao Tejo, cultura contemporânea e tradições da lezíria encontram-se a norte de Lisboa."
    },
    "stops": [
      "Museu do Neo-Realismo",
      "Fábrica das Palavras",
      "Jardim Municipal Constantino Palha"
    ],
    "points": [
      {
        "lat": 38.9553459,
        "lon": -8.9889789
      },
      {
        "lat": 38.9521003,
        "lon": -8.9881396
      },
      {
        "lat": 38.9550141,
        "lon": -8.9857444
      }
    ]
  },
  {
    "district": "Lisboa",
    "id": "lourinha-destination",
    "name": "Lourinhã",
    "lat": 39.2417,
    "lon": -9.3125,
    "terrain": "coast",
    "vibes": [
      "coast",
      "history",
      "nature"
    ],
    "emoji": "🦕",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Lourinh%C3%A3"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Dinosaur discoveries, a compact museum and Atlantic beaches give Lourinhã its character.",
      "pt": "Descobertas de dinossauros, um museu compacto e praias atlânticas dão personalidade à Lourinhã."
    },
    "stops": [
      "Museu da Lourinhã",
      "Dino Parque Lourinhã",
      "Praia da Areia Branca"
    ],
    "points": [
      {
        "lat": 39.2419588,
        "lon": -9.3132617
      },
      {
        "lat": 39.2790352,
        "lon": -9.2916689
      },
      {
        "lat": 39.2660777,
        "lon": -9.3333141
      }
    ]
  },
  {
    "district": "Portalegre",
    "id": "crato-destination",
    "name": "Crato",
    "lat": 39.2866,
    "lon": -7.6441,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "nature"
    ],
    "emoji": "⛪",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Crato"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "The monumental Flor da Rosa monastery recalls the Order of Malta amid northern Alentejo plains.",
      "pt": "O monumental Mosteiro da Flor da Rosa recorda a Ordem de Malta entre as planícies do norte alentejano."
    },
    "stops": [
      "Mosteiro da Flor da Rosa",
      "Castelo do Crato",
      "Museu Municipal do Crato"
    ],
    "points": [
      {
        "lat": 39.3060599,
        "lon": -7.6476326
      },
      {
        "lat": 39.284492,
        "lon": -7.6434095
      },
      {
        "lat": 39.2855038,
        "lon": -7.6457616
      }
    ]
  },
  {
    "district": "Portalegre",
    "id": "avis-destination",
    "name": "Avis",
    "lat": 39.0559,
    "lon": -7.8916,
    "terrain": "normal",
    "vibes": [
      "history",
      "nature",
      "viewpoint"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Avis"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "The town of the Order of Avis overlooks white lanes and the Maranhão reservoir.",
      "pt": "A vila da Ordem de Avis domina ruas brancas e a albufeira do Maranhão."
    },
    "stops": [
      "Pelourinho de Avis",
      "Igreja Matriz de Avis",
      "Jardim do Mestre de Avis"
    ],
    "points": [
      {
        "lat": 39.056737,
        "lon": -7.890732
      },
      {
        "lat": 39.05688,
        "lon": -7.89076
      },
      {
        "lat": 39.0556194,
        "lon": -7.8913851
      }
    ]
  },
  {
    "district": "Porto",
    "id": "penafiel-destination",
    "name": "Penafiel",
    "lat": 41.2083,
    "lon": -8.2829,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "nature"
    ],
    "emoji": "🏛️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Penafiel"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Roman archaeology, vinho verde country and a lively historic centre meet east of Porto.",
      "pt": "Arqueologia romana, terra de vinho verde e um centro histórico animado encontram-se a leste do Porto."
    },
    "stops": [
      "Museu Municipal de Penafiel",
      "Santuário do Sameiro, Penafiel",
      "Castro de Monte Mozinho"
    ],
    "points": [
      {
        "lat": 41.2067345,
        "lon": -8.2826343
      },
      {
        "lat": 41.2086654,
        "lon": -8.2753129
      },
      {
        "lat": 41.1465726,
        "lon": -8.3110987
      }
    ]
  },
  {
    "district": "Porto",
    "id": "marco-canaveses-destination",
    "name": "Marco de Canaveses",
    "lat": 41.1839,
    "lon": -8.1486,
    "terrain": "normal",
    "vibes": [
      "history",
      "viewpoint",
      "food"
    ],
    "emoji": "⛪",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Marco_de_Canaveses"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Roman Tongobriga, contemporary sacred architecture and Douro-Tâmega flavours share one landscape.",
      "pt": "A Tongobriga romana, arquitetura sacra contemporânea e sabores do Douro-Tâmega partilham a mesma paisagem."
    },
    "stops": [
      "Igreja de Santa Maria de Marco de Canaveses",
      "Parque Fluvial do Tâmega, Marco de Canaveses",
      "Tongobriga"
    ],
    "points": [
      {
        "lat": 41.1885708,
        "lon": -8.1455396
      },
      {
        "lat": 41.1958219,
        "lon": -8.1619461
      },
      {
        "lat": 41.1616468,
        "lon": -8.1474184
      }
    ]
  },
  {
    "district": "Santarém",
    "id": "ourem-destination",
    "name": "Ourém",
    "lat": 39.656,
    "lon": -8.577,
    "terrain": "normal",
    "vibes": [
      "history",
      "viewpoint",
      "food"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Our%C3%A9m"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A hilltop medieval quarter and castle overlook central Portugal's rolling limestone country.",
      "pt": "Um bairro medieval e um castelo no alto dominam a paisagem calcária ondulante do centro de Portugal."
    },
    "stops": [
      "Castelo de Ourém",
      "Igreja Colegiada de Ourém",
      "Museu Municipal de Ourém"
    ],
    "points": [
      {
        "lat": 39.6414307,
        "lon": -8.5921621
      },
      {
        "lat": 39.6434761,
        "lon": -8.5917861
      },
      {
        "lat": 39.6567718,
        "lon": -8.5759355
      }
    ]
  },
  {
    "district": "Santarém",
    "id": "golega-destination",
    "name": "Golegã",
    "lat": 39.4047,
    "lon": -8.4866,
    "terrain": "normal",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "🐎",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Goleg%C3%A3"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Horse culture, Manueline detail and nearby wetlands define this Ribatejo village.",
      "pt": "Cultura equestre, pormenores manuelinos e zonas húmidas próximas definem esta vila ribatejana."
    },
    "stops": [
      "Casa-Estúdio Carlos Relvas",
      "Igreja Matriz da Golegã",
      "Reserva Natural do Paul do Boquilobo"
    ],
    "points": [
      {
        "lat": 39.4021693,
        "lon": -8.4886178
      },
      {
        "lat": 39.4016623,
        "lon": -8.486664
      },
      {
        "lat": 39.3877962,
        "lon": -8.5338617
      }
    ]
  },
  {
    "district": "Setúbal",
    "id": "alcacer-sal-destination",
    "name": "Alcácer do Sal",
    "lat": 38.3733,
    "lon": -8.5144,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "nature"
    ],
    "emoji": "🌾",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Alc%C3%A1cer_do_Sal"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A castle and archaeological crypt rise above the Sado, rice fields and old riverfront streets.",
      "pt": "Um castelo e uma cripta arqueológica elevam-se sobre o Sado, arrozais e antigas ruas ribeirinhas."
    },
    "stops": [
      "Castelo de Alcácer do Sal",
      "Cripta Arqueológica do Castelo de Alcácer do Sal",
      "Cais Palafítico da Carrasqueira"
    ],
    "points": [
      {
        "lat": 38.3724654,
        "lon": -8.5140178
      },
      {
        "lat": 38.3722127,
        "lon": -8.5141595
      },
      {
        "lat": 38.4127301,
        "lon": -8.7569554
      }
    ]
  },
  {
    "district": "Setúbal",
    "id": "santiago-cacem-destination",
    "name": "Santiago do Cacém",
    "lat": 38.0169,
    "lon": -8.6948,
    "terrain": "normal",
    "vibes": [
      "history",
      "coast",
      "nature"
    ],
    "emoji": "🏛️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Santiago_do_Cac%C3%A9m"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A medieval castle and Roman Miróbriga sit between Alentejo hills and the Atlantic plain.",
      "pt": "Um castelo medieval e a Miróbriga romana encontram-se entre colinas alentejanas e a planície atlântica."
    },
    "stops": [
      "Castelo de Santiago do Cacém",
      "Museu Municipal de Santiago do Cacém",
      "Ruínas Romanas de Miróbriga"
    ],
    "points": [
      {
        "lat": 38.0146416,
        "lon": -8.6984439
      },
      {
        "lat": 38.0164175,
        "lon": -8.6918987
      },
      {
        "lat": 38.0096392,
        "lon": -8.6845357
      }
    ]
  },
  {
    "district": "Viana do Castelo",
    "id": "arcos-valdevez-destination",
    "name": "Arcos de Valdevez",
    "lat": 41.8467,
    "lon": -8.4191,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "🌉",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Arcos_de_Valdevez"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Baroque riverfronts and the Lima valley form a welcoming gateway to Peneda-Gerês.",
      "pt": "Frentes ribeirinhas barrocas e o vale do Lima formam uma entrada acolhedora para a Peneda-Gerês."
    },
    "stops": [
      "Paço de Giela",
      "Ponte da Vila, Arcos de Valdevez",
      "Igreja da Lapa, Arcos de Valdevez"
    ],
    "points": [
      {
        "lat": 41.8496936,
        "lon": -8.4082317
      },
      {
        "lat": 41.8439845,
        "lon": -8.417348
      },
      {
        "lat": 41.846049,
        "lon": -8.4190214
      }
    ]
  },
  {
    "district": "Viana do Castelo",
    "id": "vila-nova-cerveira-destination",
    "name": "Vila Nova de Cerveira",
    "lat": 41.9412,
    "lon": -8.7424,
    "terrain": "normal",
    "vibes": [
      "history",
      "nature",
      "viewpoint"
    ],
    "emoji": "🦌",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Vila_Nova_de_Cerveira"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Art, fortress walls and a hilltop stag viewpoint overlook the Minho and Galicia.",
      "pt": "Arte, muralhas e um miradouro com um cervo no alto contemplam o Minho e a Galiza."
    },
    "stops": [
      "Castelo de Vila Nova de Cerveira",
      "Aquamuseu do Rio Minho",
      "Miradouro do Cervo"
    ],
    "points": [
      {
        "lat": 41.9404451,
        "lon": -8.7449598
      },
      {
        "lat": 41.93788,
        "lon": -8.74954
      },
      {
        "lat": 41.9472291,
        "lon": -8.7278525
      }
    ]
  },
  {
    "district": "Vila Real",
    "id": "boticas-destination",
    "name": "Boticas",
    "lat": 41.6894,
    "lon": -7.6691,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "🌿",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Boticas"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Barroso landscapes, contemporary art and ancient hill forts reward a northern mountain drive.",
      "pt": "Paisagens do Barroso, arte contemporânea e castros antigos recompensam uma viagem pelas montanhas do norte."
    },
    "stops": [
      "Centro de Artes Nadir Afonso, Boticas",
      "Igreja de Nossa Senhora da Livração, Boticas",
      "Castro de Carvalhelhos"
    ],
    "points": [
      {
        "lat": 41.6861424,
        "lon": -7.6683978
      },
      {
        "lat": 41.6884,
        "lon": -7.66456
      },
      {
        "lat": 41.6983102,
        "lon": -7.7327642
      }
    ]
  },
  {
    "district": "Vila Real",
    "id": "murca-destination",
    "name": "Murça",
    "lat": 41.4067,
    "lon": -7.4537,
    "terrain": "mountain",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "🐗",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Mur%C3%A7a"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "An ancient granite sow, wine country and civic heritage mark this Trás-os-Montes town.",
      "pt": "Uma antiga porca de granito, terra de vinho e património cívico marcam esta vila transmontana."
    },
    "stops": [
      "Porca de Murça",
      "Igreja Matriz de Murça",
      "Pelourinho de Murça"
    ],
    "points": [
      {
        "lat": 41.4072413,
        "lon": -7.4533833
      },
      {
        "lat": 41.4077691,
        "lon": -7.4534949
      },
      {
        "lat": 41.4080549,
        "lon": -7.4538965
      }
    ]
  },
  {
    "district": "Viseu",
    "id": "sernancelhe-destination",
    "name": "Sernancelhe",
    "lat": 40.8987,
    "lon": -7.4941,
    "terrain": "mountain",
    "vibes": [
      "history",
      "food",
      "nature"
    ],
    "emoji": "🌰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Sernancelhe"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Romanesque stone, chestnut country and the devotional landscape of Lapa define this quiet corner.",
      "pt": "Pedra românica, terra de castanha e a paisagem devocional da Lapa definem este recanto tranquilo."
    },
    "stops": [
      "Pelourinho de Sernancelhe",
      "Santuário de Nossa Senhora da Lapa",
      "Castelo de Sernancelhe"
    ],
    "points": [
      {
        "lat": 40.900062,
        "lon": -7.494253
      },
      {
        "lat": 40.866663,
        "lon": -7.566667
      },
      {
        "lat": 40.9010409,
        "lon": -7.4955287
      }
    ]
  },
  {
    "district": "Viseu",
    "id": "castro-daire-destination",
    "name": "Castro Daire",
    "lat": 40.8984,
    "lon": -7.9338,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "⛰️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Castro_Daire"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Montemuro scenery, thermal waters and Paiva valleys surround this highland town.",
      "pt": "Paisagens do Montemuro, águas termais e vales do Paiva rodeiam esta vila serrana."
    },
    "stops": [
      "Museu Municipal de Castro Daire",
      "Termas do Carvalhal",
      "Igreja Matriz de Castro Daire"
    ],
    "points": [
      {
        "lat": 40.8985859,
        "lon": -7.9339906
      },
      {
        "lat": 40.8583291,
        "lon": -7.935332
      },
      {
        "lat": 40.8970064,
        "lon": -7.9351301
      }
    ]
  }
];

export const octoberExpansionDestinations = specs.map(({ stops, points, ...destination }) => ({
  ...destination,
  stops: { en: stops, pt: stops },
}));

export const octoberExpansionStopMapQueries = Object.fromEntries(specs.map((item) => [item.id, item.stops]));
export const octoberExpansionStopMapPoints = Object.fromEntries(specs.map((item) => [item.id, item.points]));
