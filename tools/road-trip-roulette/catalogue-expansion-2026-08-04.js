// Catalogue expansion audited on 2026-08-04.
// All destination sources resolve to relevant pages, and every named stop was
// checked against its expected area before its Google Maps link was generated.
const specs = [
  {
    "district": "Aveiro",
    "id": "espinho-destination",
    "name": "Espinho",
    "lat": 41.0076,
    "lon": -8.6413,
    "terrain": "coast",
    "vibes": [
      "coast",
      "food",
      "history"
    ],
    "emoji": "🌊",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Espinho_(Portugal)"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "An Atlantic promenade, broad surf beach and fishing traditions make an easy seaside escape.",
      "pt": "Um passeio atlântico, uma ampla praia de surf e tradições piscatórias fazem uma escapadinha à beira-mar."
    },
    "stops": [
      "Praia da Baía, Espinho",
      "Museu Municipal de Espinho",
      "Castro de Ovil, Espinho"
    ],
    "points": [
      {
        "lat": 41.0070324,
        "lon": -8.6460934
      },
      {
        "lat": 40.9999544,
        "lon": -8.6440152
      },
      {
        "lat": 40.9790805,
        "lon": -8.6207821
      }
    ]
  },
  {
    "district": "Aveiro",
    "id": "ilhavo-destination",
    "name": "Ílhavo",
    "lat": 40.6019,
    "lon": -8.6702,
    "terrain": "coast",
    "vibes": [
      "coast",
      "history",
      "food"
    ],
    "emoji": "⚓",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/%C3%8Dlhavo"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Cod-fishing heritage, Vista Alegre porcelain and the Aveiro lagoon shape this maritime town.",
      "pt": "A herança da pesca do bacalhau, a porcelana Vista Alegre e a Ria de Aveiro marcam esta terra marítima."
    },
    "stops": [
      "Museu Marítimo de Ílhavo",
      "Museu Vista Alegre, Ílhavo",
      "Navio Museu Santo André, Ílhavo"
    ],
    "points": [
      {
        "lat": 40.6043243,
        "lon": -8.6661619
      },
      {
        "lat": 40.5892872,
        "lon": -8.6846319
      },
      {
        "lat": 40.6414132,
        "lon": -8.7302621
      }
    ]
  },
  {
    "district": "Beja",
    "id": "moura-destination",
    "name": "Moura",
    "lat": 38.1401,
    "lon": -7.4486,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Moura"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A border castle, whitewashed lanes and olive-country flavours overlook the Alentejo plains.",
      "pt": "Um castelo raiano, ruas caiadas e sabores de terra de oliveiras dominam as planícies alentejanas."
    },
    "stops": [
      "Castelo de Moura",
      "Jardim Doutor Santiago, Moura",
      "Igreja de São João Baptista, Moura"
    ],
    "points": [
      {
        "lat": 38.143333,
        "lon": -7.451585
      },
      {
        "lat": 38.1443967,
        "lon": -7.4498245
      },
      {
        "lat": 38.1435472,
        "lon": -7.4494797
      }
    ]
  },
  {
    "district": "Beja",
    "id": "castro-verde-destination",
    "name": "Castro Verde",
    "lat": 37.698,
    "lon": -8.0858,
    "terrain": "normal",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "🦅",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Castro_Verde"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Wide cereal plains, rare steppe birds and a remarkable tiled basilica define the Campo Branco.",
      "pt": "Vastas planícies cerealíferas, aves estepárias raras e uma basílica de azulejos definem o Campo Branco."
    },
    "stops": [
      "Basílica Real de Castro Verde",
      "Museu da Ruralidade, Entradas",
      "Centro de Educação Ambiental do Vale Gonçalinho"
    ],
    "points": [
      {
        "lat": 37.6978086,
        "lon": -8.0819212
      },
      {
        "lat": 37.7775601,
        "lon": -8.0121954
      },
      {
        "lat": 37.7364011,
        "lon": -8.0315983
      }
    ]
  },
  {
    "district": "Braga",
    "id": "esposende-destination",
    "name": "Esposende",
    "lat": 41.5361,
    "lon": -8.782,
    "terrain": "coast",
    "vibes": [
      "coast",
      "nature",
      "history"
    ],
    "emoji": "🌾",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Esposende"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Dunes, river estuary and Atlantic beaches meet an archaeological hill above the Cávado.",
      "pt": "Dunas, estuário e praias atlânticas encontram um monte arqueológico sobre o Cávado."
    },
    "stops": [
      "Castro de São Lourenço, Esposende",
      "Museu Municipal de Esposende",
      "Praia de Ofir"
    ],
    "points": [
      {
        "lat": 41.555323,
        "lon": -8.7614875
      },
      {
        "lat": 41.5306793,
        "lon": -8.7809305
      },
      {
        "lat": 41.5184725,
        "lon": -8.787816
      }
    ]
  },
  {
    "district": "Braga",
    "id": "vieira-minho-destination",
    "name": "Vieira do Minho",
    "lat": 41.6347,
    "lon": -8.1424,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "viewpoint",
      "history"
    ],
    "emoji": "🏞️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Vieira_do_Minho"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Reservoir roads, wooded mountains and granite villages open a quieter gateway to Gerês.",
      "pt": "Estradas de albufeira, montanhas arborizadas e aldeias de granito abrem uma porta tranquila para o Gerês."
    },
    "stops": [
      "Santuário de Nossa Senhora da Lapa, Soutelo, Vieira do Minho",
      "Barragem do Ermal",
      "Miradouro da Serradela, Vieira do Minho"
    ],
    "points": [
      {
        "lat": 41.6135861,
        "lon": -8.1879583
      },
      {
        "lat": 41.5857677,
        "lon": -8.1379865
      },
      {
        "lat": 41.656378,
        "lon": -8.0773455
      }
    ]
  },
  {
    "district": "Bragança",
    "id": "mirandela-destination",
    "name": "Mirandela",
    "lat": 41.4874,
    "lon": -7.1869,
    "terrain": "normal",
    "vibes": [
      "food",
      "history",
      "nature"
    ],
    "emoji": "🌉",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Mirandela"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A long stone bridge, riverside parks and celebrated olive oil anchor this Tua valley city.",
      "pt": "Uma longa ponte de pedra, parques ribeirinhos e azeite celebrado marcam esta cidade do vale do Tua."
    },
    "stops": [
      "Ponte Velha de Mirandela",
      "Museu da Oliveira e do Azeite, Mirandela",
      "Parque do Império, Mirandela"
    ],
    "points": [
      {
        "lat": 41.484944,
        "lon": -7.1849091
      },
      {
        "lat": 41.4832264,
        "lon": -7.1830674
      },
      {
        "lat": 41.4836238,
        "lon": -7.1840253
      }
    ]
  },
  {
    "district": "Bragança",
    "id": "macedo-cavaleiros-destination",
    "name": "Macedo de Cavaleiros",
    "lat": 41.5382,
    "lon": -6.9611,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "food",
      "viewpoint"
    ],
    "emoji": "💧",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Macedo_de_Cavaleiros"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "The Azibo reservoir, geosite landscapes and Transmontano flavours reward a slow inland detour.",
      "pt": "A albufeira do Azibo, paisagens de geossítios e sabores transmontanos recompensam um desvio pelo interior."
    },
    "stops": [
      "Praia Fluvial do Azibo, Macedo de Cavaleiros",
      "Museu Municipal de Arqueologia Coronel Albino Pereira Lopo",
      "Museu Rural de Salselas"
    ],
    "points": [
      {
        "lat": 41.5862207,
        "lon": -6.9061262
      },
      {
        "lat": 41.5361009,
        "lon": -6.9565545
      },
      {
        "lat": 41.5499891,
        "lon": -6.8770261
      }
    ]
  },
  {
    "district": "Castelo Branco",
    "id": "fundao-destination",
    "name": "Fundão",
    "lat": 40.1402,
    "lon": -7.5013,
    "terrain": "mountain",
    "vibes": [
      "food",
      "history",
      "nature"
    ],
    "emoji": "🍒",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Fund%C3%A3o_(Portugal)"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Cherry orchards, Gardunha foothills and a compact historic centre give Fundão four-season appeal.",
      "pt": "Pomares de cerejeiras, a encosta da Gardunha e um centro histórico compacto dão ao Fundão interesse todo o ano."
    },
    "stops": [
      "Museu Arqueológico Municipal José Monteiro, Fundão",
      "Igreja da Misericórdia do Fundão",
      "Palácio do Picadeiro, Alpedrinha"
    ],
    "points": [
      {
        "lat": 40.136359,
        "lon": -7.5001458
      },
      {
        "lat": 40.1372926,
        "lon": -7.4989595
      },
      {
        "lat": 40.1004474,
        "lon": -7.4687887
      }
    ]
  },
  {
    "district": "Castelo Branco",
    "id": "vila-velha-rodao-destination",
    "name": "Vila Velha de Ródão",
    "lat": 39.6546,
    "lon": -7.6762,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "viewpoint",
      "history"
    ],
    "emoji": "🦅",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Vila_Velha_de_R%C3%B3d%C3%A3o"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "The Tagus squeezes through monumental quartzite gates beneath a castle and griffon-vulture skies.",
      "pt": "O Tejo atravessa monumentais portas de quartzito sob um castelo e céus de grifos."
    },
    "stops": [
      "Portas de Ródão",
      "Castelo do Rei Wamba, Vila Velha de Ródão",
      "Casa de Artes e Cultura do Tejo, Vila Velha de Ródão"
    ],
    "points": [
      {
        "lat": 39.6427828,
        "lon": -7.6830751
      },
      {
        "lat": 39.6474143,
        "lon": -7.6902372
      },
      {
        "lat": 39.6573156,
        "lon": -7.6751863
      }
    ]
  },
  {
    "district": "Coimbra",
    "id": "lousa-destination",
    "name": "Lousã",
    "lat": 40.1167,
    "lon": -8.25,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "🌲",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Lous%C3%A3"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A forested mountain, a riverside castle and schist villages begin just beyond the town centre.",
      "pt": "Uma serra arborizada, um castelo ribeirinho e aldeias de xisto começam logo além do centro da vila."
    },
    "stops": [
      "Castelo da Lousã",
      "Santuário de Nossa Senhora da Piedade, Lousã",
      "Ecomuseu da Serra da Lousã"
    ],
    "points": [
      {
        "lat": 40.100472,
        "lon": -8.2354576
      },
      {
        "lat": 40.0992281,
        "lon": -8.2344374
      },
      {
        "lat": 40.1165684,
        "lon": -8.2484862
      }
    ]
  },
  {
    "district": "Coimbra",
    "id": "penacova-destination",
    "name": "Penacova",
    "lat": 40.269,
    "lon": -8.2824,
    "terrain": "mountain",
    "vibes": [
      "viewpoint",
      "nature",
      "history"
    ],
    "emoji": "🌬️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Penacova"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Mondego viewpoints, hillside windmills and the nearby Lorvão monastery make a scenic inland loop.",
      "pt": "Miradouros sobre o Mondego, moinhos na serra e o Mosteiro de Lorvão formam um circuito paisagístico."
    },
    "stops": [
      "Mirante Emídio da Silva, Penacova",
      "Mosteiro de Lorvão",
      "Moinhos da Serra da Atalhada"
    ],
    "points": [
      {
        "lat": 40.27031,
        "lon": -8.276779
      },
      {
        "lat": 40.259429,
        "lon": -8.3174741
      },
      {
        "lat": 40.2580021,
        "lon": -8.2275891
      }
    ]
  },
  {
    "district": "Évora",
    "id": "vila-vicosa-destination",
    "name": "Vila Viçosa",
    "lat": 38.7777,
    "lon": -7.4179,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "👑",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Vila_Vi%C3%A7osa"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Royal marble façades, a vast ducal palace and castle walls tell an unusually grand Alentejo story.",
      "pt": "Fachadas reais de mármore, um vasto paço ducal e muralhas contam uma história alentejana invulgarmente grandiosa."
    },
    "stops": [
      "Paço Ducal de Vila Viçosa",
      "Castelo de Vila Viçosa",
      "Igreja de Nossa Senhora da Conceição, Vila Viçosa"
    ],
    "points": [
      {
        "lat": 38.7835527,
        "lon": -7.4222029
      },
      {
        "lat": 38.7800017,
        "lon": -7.4146337
      },
      {
        "lat": 38.7809594,
        "lon": -7.4155413
      }
    ]
  },
  {
    "district": "Évora",
    "id": "arraiolos-destination",
    "name": "Arraiolos",
    "lat": 38.7236,
    "lon": -7.9852,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "🧶",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Arraiolos"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A circular hilltop castle overlooks a white town famous for centuries of handwoven rugs.",
      "pt": "Um castelo circular domina uma vila branca famosa por séculos de tapetes tecidos à mão."
    },
    "stops": [
      "Castelo de Arraiolos",
      "Centro Interpretativo do Tapete de Arraiolos",
      "Igreja da Misericórdia de Arraiolos"
    ],
    "points": [
      {
        "lat": 38.7255754,
        "lon": -7.9880266
      },
      {
        "lat": 38.72582,
        "lon": -7.984422
      },
      {
        "lat": 38.7251724,
        "lon": -7.9844355
      }
    ]
  },
  {
    "district": "Faro",
    "id": "vila-real-santo-antonio-destination",
    "name": "Vila Real de Santo António",
    "lat": 37.195,
    "lon": -7.4177,
    "terrain": "coast",
    "vibes": [
      "coast",
      "history",
      "food"
    ],
    "emoji": "☀️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Vila_Real_de_Santo_Ant%C3%B3nio"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A planned Pombaline square, Guadiana waterfront and long sandy coast meet at Portugal’s eastern edge.",
      "pt": "Uma praça pombalina planeada, a marginal do Guadiana e uma longa costa arenosa encontram-se no extremo oriental de Portugal."
    },
    "stops": [
      "Praça Marquês de Pombal, Vila Real de Santo António",
      "Farol de Vila Real de Santo António",
      "Praia de Santo António, Vila Real de Santo António"
    ],
    "points": [
      {
        "lat": 37.1950168,
        "lon": -7.4157204
      },
      {
        "lat": 37.1867677,
        "lon": -7.4163131
      },
      {
        "lat": 37.1719456,
        "lon": -7.4145582
      }
    ]
  },
  {
    "district": "Faro",
    "id": "olhao-destination",
    "name": "Olhão",
    "lat": 37.0286,
    "lon": -7.8411,
    "terrain": "coast",
    "vibes": [
      "coast",
      "food",
      "history"
    ],
    "emoji": "🐟",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Olh%C3%A3o"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Cubist white lanes, landmark market halls and ferries into the Ria Formosa islands define Olhão.",
      "pt": "Ruas brancas cubistas, mercados emblemáticos e barcos para as ilhas da Ria Formosa definem Olhão."
    },
    "stops": [
      "Mercados de Olhão",
      "Museu Municipal de Olhão",
      "Jardim Pescador Olhanense"
    ],
    "points": [
      {
        "lat": 37.023919446,
        "lon": -7.840966277
      },
      {
        "lat": 37.0259811,
        "lon": -7.841026
      },
      {
        "lat": 37.0234858,
        "lon": -7.8436236
      }
    ]
  },
  {
    "district": "Guarda",
    "id": "manteigas-destination",
    "name": "Manteigas",
    "lat": 40.4028,
    "lon": -7.5398,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "viewpoint",
      "food"
    ],
    "emoji": "🏔️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Manteigas"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Glacial-valley roads, mountain water and Serra da Estrela trails surround this highland town.",
      "pt": "Estradas de vale glaciar, água de montanha e trilhos da Serra da Estrela rodeiam esta vila serrana."
    },
    "stops": [
      "Poço do Inferno, Manteigas",
      "Viveiro das Trutas de Manteigas",
      "Miradouro do Fragão do Corvo"
    ],
    "points": [
      {
        "lat": 40.3735911,
        "lon": -7.5177771
      },
      {
        "lat": 40.3819357,
        "lon": -7.5454077
      },
      {
        "lat": 40.4058613,
        "lon": -7.5616441
      }
    ]
  },
  {
    "district": "Guarda",
    "id": "seia-destination",
    "name": "Seia",
    "lat": 40.4151,
    "lon": -7.7086,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "food",
      "history"
    ],
    "emoji": "🍞",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Seia"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Mountain museums, local bread and western access to Serra da Estrela make Seia a useful base.",
      "pt": "Museus serranos, pão local e o acesso ocidental à Serra da Estrela fazem de Seia uma boa base."
    },
    "stops": [
      "Museu do Pão, Seia",
      "Museu Natural da Electricidade, Seia",
      "Igreja da Misericórdia de Seia"
    ],
    "points": [
      {
        "lat": 40.4177804,
        "lon": -7.6944744
      },
      {
        "lat": 40.398556,
        "lon": -7.6868696
      },
      {
        "lat": 40.419409,
        "lon": -7.7011681
      }
    ]
  },
  {
    "district": "Leiria",
    "id": "alcobaca-destination",
    "name": "Alcobaça",
    "lat": 39.552,
    "lon": -8.977,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "nature"
    ],
    "emoji": "⛪",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Alcoba%C3%A7a_(Portugal)"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A monumental monastery, royal love story and orchard country make Alcobaça much more than a quick stop.",
      "pt": "Um mosteiro monumental, uma história de amor real e terras de pomares fazem de Alcobaça muito mais que uma paragem rápida."
    },
    "stops": [
      "Mosteiro de Alcobaça",
      "Castelo de Alcobaça",
      "Jardim do Amor, Alcobaça"
    ],
    "points": [
      {
        "lat": 39.548594,
        "lon": -8.978628
      },
      {
        "lat": 39.5504608,
        "lon": -8.9824145
      },
      {
        "lat": 39.5508603,
        "lon": -8.979037
      }
    ]
  },
  {
    "district": "Leiria",
    "id": "caldas-rainha-destination",
    "name": "Caldas da Rainha",
    "lat": 39.4033,
    "lon": -9.1384,
    "terrain": "normal",
    "vibes": [
      "food",
      "history",
      "nature"
    ],
    "emoji": "🎨",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Caldas_da_Rainha"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A daily produce market, romantic park and distinctive ceramic tradition animate this spa city.",
      "pt": "Um mercado diário, um parque romântico e uma tradição cerâmica singular animam esta cidade termal."
    },
    "stops": [
      "Parque Dom Carlos I, Caldas da Rainha",
      "Museu José Malhoa",
      "Praça da Fruta, Caldas da Rainha"
    ],
    "points": [
      {
        "lat": 39.4012756,
        "lon": -9.1335923
      },
      {
        "lat": 39.4008339,
        "lon": -9.1339678
      },
      {
        "lat": 39.4040404,
        "lon": -9.1336443
      }
    ]
  },
  {
    "district": "Lisboa",
    "id": "mafra-destination",
    "name": "Mafra",
    "lat": 38.937,
    "lon": -9.3276,
    "terrain": "normal",
    "vibes": [
      "history",
      "nature",
      "food"
    ],
    "emoji": "🏛️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Mafra_(Portugal)"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A colossal royal palace, historic library and walled hunting park anchor this Lisbon-region escape.",
      "pt": "Um colossal palácio real, uma biblioteca histórica e uma tapada murada marcam esta escapadinha na região de Lisboa."
    },
    "stops": [
      "Palácio Nacional de Mafra",
      "Jardim do Cerco, Mafra",
      "Tapada Nacional de Mafra"
    ],
    "points": [
      {
        "lat": 38.9368915,
        "lon": -9.3257732
      },
      {
        "lat": 38.9373316,
        "lon": -9.3219793
      },
      {
        "lat": 38.952737,
        "lon": -9.2929682
      }
    ]
  },
  {
    "district": "Lisboa",
    "id": "torres-vedras-destination",
    "name": "Torres Vedras",
    "lat": 39.0911,
    "lon": -9.2586,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "🛡️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Torres_Vedras"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Castle ruins, Napoleonic defence lines and Atlantic wine country meet north of Lisbon.",
      "pt": "Ruínas de castelo, linhas defensivas napoleónicas e terras de vinho atlântico encontram-se a norte de Lisboa."
    },
    "stops": [
      "Castelo de Torres Vedras",
      "Museu Municipal Leonel Trindade",
      "Forte de São Vicente, Torres Vedras"
    ],
    "points": [
      {
        "lat": 39.0946196,
        "lon": -9.2612224
      },
      {
        "lat": 39.0901781,
        "lon": -9.2591305
      },
      {
        "lat": 39.0994477,
        "lon": -9.2643586
      }
    ]
  },
  {
    "district": "Portalegre",
    "id": "campo-maior-destination",
    "name": "Campo Maior",
    "lat": 39.0177,
    "lon": -7.0648,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "🌸",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Campo_Maior_(Portugal)"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Flower-festival streets, a stark bone chapel and border fortifications give this town a vivid identity.",
      "pt": "Ruas de festas floridas, uma marcante capela dos ossos e fortificações raianas dão identidade viva à vila."
    },
    "stops": [
      "Castelo de Campo Maior",
      "Capela dos Ossos de Campo Maior",
      "Centro de Ciência do Café"
    ],
    "points": [
      {
        "lat": 39.0109593,
        "lon": -7.0717857
      },
      {
        "lat": 39.0126114,
        "lon": -7.0697605
      },
      {
        "lat": 39.0433567,
        "lon": -7.0962312
      }
    ]
  },
  {
    "district": "Portalegre",
    "id": "alter-chao-destination",
    "name": "Alter do Chão",
    "lat": 39.1973,
    "lon": -7.6587,
    "terrain": "normal",
    "vibes": [
      "history",
      "nature",
      "food"
    ],
    "emoji": "🐎",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Alter_do_Ch%C3%A3o"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A compact castle and the historic Alter Real stud farm celebrate Alentejo’s equestrian heritage.",
      "pt": "Um castelo compacto e a histórica Coudelaria de Alter Real celebram a tradição equestre alentejana."
    },
    "stops": [
      "Castelo de Alter do Chão",
      "Coudelaria de Alter, Alter do Chão",
      "Chafariz da Praça da República, Alter do Chão"
    ],
    "points": [
      {
        "lat": 39.199006,
        "lon": -7.6586527
      },
      {
        "lat": 39.2221099,
        "lon": -7.6863782
      },
      {
        "lat": 39.1994094,
        "lon": -7.6585349
      }
    ]
  },
  {
    "district": "Porto",
    "id": "matosinhos-destination",
    "name": "Matosinhos",
    "lat": 41.1821,
    "lon": -8.6891,
    "terrain": "coast",
    "vibes": [
      "coast",
      "food",
      "history"
    ],
    "emoji": "🐟",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Matosinhos"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Ocean architecture, fish restaurants and long beaches make Porto’s coastal neighbour a destination itself.",
      "pt": "Arquitetura junto ao oceano, restaurantes de peixe e longas praias fazem da vizinha costeira do Porto um destino próprio."
    },
    "stops": [
      "Mercado Municipal de Matosinhos",
      "Piscina das Marés, Leça da Palmeira",
      "Farol de Leça"
    ],
    "points": [
      {
        "lat": 41.1869987,
        "lon": -8.6930991
      },
      {
        "lat": 41.1930765,
        "lon": -8.7072863
      },
      {
        "lat": 41.2013031,
        "lon": -8.7121378
      }
    ]
  },
  {
    "district": "Porto",
    "id": "povoa-varzim-destination",
    "name": "Póvoa de Varzim",
    "lat": 41.3834,
    "lon": -8.7636,
    "terrain": "coast",
    "vibes": [
      "coast",
      "history",
      "food"
    ],
    "emoji": "⚓",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/P%C3%B3voa_de_Varzim"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A fishing-city waterfront, tiled historic quarter and Iron Age hillfort sit along the northern coast.",
      "pt": "Uma marginal piscatória, um bairro histórico de azulejos e uma citânia da Idade do Ferro alinham-se na costa norte."
    },
    "stops": [
      "Fortaleza de Nossa Senhora da Conceição, Póvoa de Varzim",
      "Museu Municipal de Etnografia e História da Póvoa de Varzim",
      "Cividade de Terroso"
    ],
    "points": [
      {
        "lat": 41.3780235,
        "lon": -8.7642183
      },
      {
        "lat": 41.3805381,
        "lon": -8.7581199
      },
      {
        "lat": 41.4123231,
        "lon": -8.7210021
      }
    ]
  },
  {
    "district": "Santarém",
    "id": "fatima-destination",
    "name": "Fátima",
    "lat": 39.6256,
    "lon": -8.6651,
    "terrain": "normal",
    "vibes": [
      "history",
      "food"
    ],
    "emoji": "🕊️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/F%C3%A1tima"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "One of Europe’s major pilgrimage centres combines monumental spaces with a quieter surrounding landscape.",
      "pt": "Um dos grandes centros de peregrinação europeus combina espaços monumentais com uma paisagem envolvente tranquila."
    },
    "stops": [
      "Santuário de Fátima",
      "Basílica de Nossa Senhora do Rosário de Fátima",
      "Casa dos Pastorinhos, Aljustrel"
    ],
    "points": [
      {
        "lat": 39.6300079,
        "lon": -8.6746971
      },
      {
        "lat": 39.6323333,
        "lon": -8.6716865
      },
      {
        "lat": 39.6163052,
        "lon": -8.6635611
      }
    ]
  },
  {
    "district": "Santarém",
    "id": "rio-maior-destination",
    "name": "Rio Maior",
    "lat": 39.3373,
    "lon": -8.9382,
    "terrain": "normal",
    "vibes": [
      "nature",
      "history",
      "food"
    ],
    "emoji": "🧂",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Rio_Maior"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Inland salt pans, limestone landscapes and Roman traces make an unexpectedly varied Ribatejo stop.",
      "pt": "Salinas interiores, paisagens calcárias e vestígios romanos fazem uma paragem ribatejana inesperadamente variada."
    },
    "stops": [
      "Salinas de Rio Maior",
      "Villa Romana de Rio Maior",
      "Anta de Alcobertas"
    ],
    "points": [
      {
        "lat": 39.363523,
        "lon": -8.9439677
      },
      {
        "lat": 39.3331379,
        "lon": -8.9395131
      },
      {
        "lat": 39.4185181,
        "lon": -8.9035906
      }
    ]
  },
  {
    "district": "Setúbal",
    "id": "palmela-destination",
    "name": "Palmela",
    "lat": 38.569,
    "lon": -8.9013,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "🍷",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Palmela"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A hilltop castle surveys vineyards, windmills and the Sado plain just beyond Setúbal.",
      "pt": "Um castelo no alto domina vinhas, moinhos e a planície do Sado nos arredores de Setúbal."
    },
    "stops": [
      "Castelo de Palmela",
      "Casa Mãe da Rota de Vinhos da Península de Setúbal",
      "Moinhos Vivos de Palmela"
    ],
    "points": [
      {
        "lat": 38.5659704,
        "lon": -8.9003659
      },
      {
        "lat": 38.5714996,
        "lon": -8.9027114
      },
      {
        "lat": 38.5675878,
        "lon": -8.9118592
      }
    ]
  },
  {
    "district": "Setúbal",
    "id": "sines-destination",
    "name": "Sines",
    "lat": 37.9562,
    "lon": -8.8698,
    "terrain": "coast",
    "vibes": [
      "coast",
      "history",
      "food"
    ],
    "emoji": "🌊",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Sines"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A castle above the bay, maritime history and Alentejo-coast beaches reveal more than the industrial skyline.",
      "pt": "Um castelo sobre a baía, história marítima e praias da costa alentejana revelam mais do que a paisagem industrial."
    },
    "stops": [
      "Castelo de Sines",
      "Museu de Sines",
      "Praia Vasco da Gama, Sines"
    ],
    "points": [
      {
        "lat": 37.955222,
        "lon": -8.866501
      },
      {
        "lat": 37.9555458,
        "lon": -8.8665391
      },
      {
        "lat": 37.9528272,
        "lon": -8.8648305
      }
    ]
  },
  {
    "district": "Viana do Castelo",
    "id": "valenca-destination",
    "name": "Valença",
    "lat": 42.0287,
    "lon": -8.6339,
    "terrain": "normal",
    "vibes": [
      "history",
      "food",
      "viewpoint"
    ],
    "emoji": "🏰",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Valen%C3%A7a_(Portugal)"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A vast double fortress overlooks the Minho and neighbouring Tui at Portugal’s northern border.",
      "pt": "Uma vasta fortaleza dupla domina o Minho e a vizinha Tui na fronteira norte de Portugal."
    },
    "stops": [
      "Muralhas de Valença",
      "Igreja de Santo Estêvão, Valença",
      "Pelourinho de Valença"
    ],
    "points": [
      {
        "lat": 42.0305,
        "lon": -8.644
      },
      {
        "lat": 42.0317129,
        "lon": -8.6445384
      },
      {
        "lat": 42.0315512,
        "lon": -8.644863
      }
    ]
  },
  {
    "district": "Viana do Castelo",
    "id": "moncao-destination",
    "name": "Monção",
    "lat": 42.0789,
    "lon": -8.4808,
    "terrain": "normal",
    "vibes": [
      "food",
      "history",
      "nature"
    ],
    "emoji": "🍇",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Mon%C3%A7%C3%A3o"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Alvarinho country, riverside fortifications and a grand palace garden line the upper Minho.",
      "pt": "Terra de Alvarinho, fortificações ribeirinhas e jardins palacianos acompanham o Alto Minho."
    },
    "stops": [
      "Muralhas de Monção",
      "Palácio da Brejoeira",
      "Termas de Monção"
    ],
    "points": [
      {
        "lat": 42.0789999,
        "lon": -8.4809
      },
      {
        "lat": 42.0426637,
        "lon": -8.4951525
      },
      {
        "lat": 42.0792381,
        "lon": -8.4733837
      }
    ]
  },
  {
    "district": "Vila Real",
    "id": "peso-regua-destination",
    "name": "Peso da Régua",
    "lat": 41.1649,
    "lon": -7.787,
    "terrain": "mountain",
    "vibes": [
      "food",
      "viewpoint",
      "history"
    ],
    "emoji": "🍇",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Peso_da_R%C3%A9gua"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "River quays, wine history and terraced Douro viewpoints make Régua a natural valley hub.",
      "pt": "Cais ribeirinhos, história do vinho e miradouros sobre socalcos fazem da Régua um centro natural do vale."
    },
    "stops": [
      "Museu do Douro, Peso da Régua",
      "Estação Ferroviária de Peso da Régua",
      "Miradouro de São Leonardo de Galafura"
    ],
    "points": [
      {
        "lat": 41.1614127,
        "lon": -7.7900006
      },
      {
        "lat": 41.1585668,
        "lon": -7.7836318
      },
      {
        "lat": 41.1726414,
        "lon": -7.6723388
      }
    ]
  },
  {
    "district": "Vila Real",
    "id": "mondim-basto-destination",
    "name": "Mondim de Basto",
    "lat": 41.4116,
    "lon": -7.9547,
    "terrain": "mountain",
    "vibes": [
      "nature",
      "viewpoint",
      "food"
    ],
    "emoji": "⛰️",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Mondim_de_Basto"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "The Senhora da Graça climb and dramatic Fisgas de Ermelo waterfall frame this mountain town.",
      "pt": "A subida à Senhora da Graça e a dramática cascata das Fisgas de Ermelo enquadram esta vila serrana."
    },
    "stops": [
      "Santuário de Nossa Senhora da Graça, Mondim de Basto",
      "Fisgas de Ermelo",
      "Ponte da Abelheira, Ermelo"
    ],
    "points": [
      {
        "lat": 41.4164869,
        "lon": -7.9158019
      },
      {
        "lat": 41.3775049,
        "lon": -7.8674126
      },
      {
        "lat": 41.3523529,
        "lon": -7.9014942
      }
    ]
  },
  {
    "district": "Viseu",
    "id": "caramulo-destination",
    "name": "Caramulo",
    "lat": 40.5723037,
    "lon": -8.1668801,
    "terrain": "mountain",
    "vibes": [
      "history",
      "nature",
      "viewpoint"
    ],
    "emoji": "🚗",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Caramulo"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "Classic cars, modern art and granite mountain views meet in a purpose-built highland village.",
      "pt": "Automóveis clássicos, arte moderna e vistas graníticas encontram-se numa vila serrana planeada."
    },
    "stops": [
      "Museu do Caramulo",
      "Caramulinho",
      "Cabeço da Neve, Caramulo"
    ],
    "points": [
      {
        "lat": 40.5698153,
        "lon": -8.1715267
      },
      {
        "lat": 40.5472672,
        "lon": -8.2020536
      },
      {
        "lat": 40.5535518,
        "lon": -8.1788608
      }
    ]
  },
  {
    "district": "Viseu",
    "id": "vouzela-destination",
    "name": "Vouzela",
    "lat": 40.7236,
    "lon": -8.1128,
    "terrain": "mountain",
    "vibes": [
      "history",
      "nature",
      "food"
    ],
    "emoji": "🌿",
    "source": {
      "pt": "https://pt.wikipedia.org/wiki/Vouzela"
    },
    "sourceLabel": {
      "en": "Wikipedia",
      "pt": "Wikipédia"
    },
    "sourceType": "independent",
    "copy": {
      "en": "A stone bridge, medieval towers and Lafões woodland make a calm base beside the Vouga.",
      "pt": "Uma ponte de pedra, torres medievais e bosques de Lafões fazem uma base tranquila junto ao Vouga."
    },
    "stops": [
      "Ponte Ferroviária de Vouzela",
      "Torre de Vilharigues",
      "Igreja Matriz de Vouzela"
    ],
    "points": [
      {
        "lat": 40.7213709,
        "lon": -8.110073
      },
      {
        "lat": 40.7155772,
        "lon": -8.1294401
      },
      {
        "lat": 40.7216629,
        "lon": -8.109045
      }
    ]
  }
];

export const catalogueExpansionDestinations = specs.map(({ stops, points, ...destination }) => ({
  ...destination,
  stops: { en: stops, pt: stops },
}));

export const catalogueExpansionStopMapQueries = Object.fromEntries(specs.map((item) => [item.id, item.stops]));
export const catalogueExpansionStopMapPoints = Object.fromEntries(specs.map((item) => [item.id, item.points]));
