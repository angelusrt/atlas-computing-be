export default {
  "pt": {
    "identity": [
      {
        "prop": "name",
        "helper": ["ficou em", "a posição"],
        "types": "",
        "titles": [
          "Você tem o nome mais popular",
          "Você tem o segundo nome mais popular",
          "Você tem o terceiro nome mais popular",
          "O seu nome não ficou no pódio"
        ]
      },
      {
        "prop": "continent",
        "helper": ["ficou em", "o lugar"],
        "types": ["America do Sul", "America do Norte", "Europa", "Asia", "Oceania", "Africa"],
        "titles": [
          "Seu continente foi o mais popular",
          "Seu continente foi o segundo mais popular",
          "Seu continente foi o terceiro mais popular",
          "O seu continente não ficou no pódio"
        ]
      },
      {
        "prop": "favAnimal",
        "helper": ["ficou em", "o lugar"],
        "types": ["Cachorro", "Gato", "Leão", "Lobo", "Urso", "Cavalo", "Porco", "Vaca"],
        "titles": [
          "Sua opção foi a mais popular",
          "Sua opção foi o segundo mais popular",
          "Sua opção foi o terceiro mais popular",
          "A sua opção não ficou no pódio"
        ]
      }
    ],
    "sensation": [
      {
        "prop": "mood",
        "helper": ["E ficou junto a ", "% das pessoas."],
        "types": ["Ótimo", "Bom", "Normal", "Ruim", "Péssimo"],
        "titles": [
          "Você teve um dia ótimo",
          "Você teve um dia bom",
          "Você teve um dia normal",
          "Você teve um dia ruim",
          "Você teve um dia péssimo"
        ],
      },
      {
        "prop": "globalWarming",
        "helper": ["E ", "% das pessoas."],
        "types": ["Ótimo", "Bom", "Normal", "Ruim", "Péssimo"],
        "titles": [
          "Você gosta do clima de verão",
          "O clima nunca esteve melhor",
          "O clima podia estar pior",
          "O clima te afeta bastante",
          "Mudanças climáticas tem um peso para você"
        ],
      },
      {
        "prop": "globalism",
        "helper": ["Assim como ", "% dos avaliados."],
        "types": ["Ótimo", "Bom", "Normal", "Ruim", "Péssimo"],
        "titles": [
          "Você é otimista a globalização",
          "A globalização tem seus fortes para você",
          "O globalismo tem seus momentos",
          "Você prefere as soluções locais",
          "Você é pessimista a globalização"
        ]
      }
    ]
  },
  "en": {
    "identity": [
      {
        "prop": "name",
        "helper": ["stood in", "° position"],
        "types": "",
        "titles": [
          "You have the most popular name",
          "You have the second most popular name",
          "You have the third most popular name",
          "Your name didn`t reach the podium"
        ]
      },
      {
        "prop": "continent",
        "helper": ["stood in", "° position"],
        "types": ["South America", "North America", "Europe", "Asia", "Oceania", "Africa"],
        "titles": [
          "Your continent was the most popular",
          "Your continent was the second most popular",
          "Your continent was the third most popular",
          "Your continent didn`t reach the podium"
        ]
      },
      {
        "prop": "favAnimal",
        "helper": ["stood in", "° position"],
        "types": ["Dog", "Cat", "Lion", "Wolf", "Bear", "Horse", "Pig", "Cow"],
        "titles": [
          "Your option was the most popular",
          "Your option was the second most popular",
          "Your option was the third most popular",
          "Your option didn`t reach the podium"
        ]
      }
    ],
    "sensation": [
      {
        "prop": "mood",
        "helper": ["And stood up with ", "% of people."],
        "types": ["Very good", "Good", "Normal", "Bad", "Very bad"],
        "titles": [
          "You had a wonderful day",
          "You had a good day",
          "You had a normal day",
          "You had a bad day",
          "You had a terrible day"
        ],
      },
      {
        "prop": "globalWarming",
        "helper": ["As well as for ", "% of people."],
        "types": ["Very good", "Good", "Normal", "Bad", "Very bad"],
        "titles": [
          "You like the summer times",
          "The climate never had been better",
          "The climate could be worse",
          "The climate bothers you terribly",
          "Climate change has a huge impact for you"
        ],
      },
      {
        "prop": "globalism",
        "helper": ["As well as for ", "% of the interviewed."],
        "types": ["Very good", "Good", "Normal", "Bad", "Very bad"],
        "titles": [
          "You are optimistic towards globalism",
          "Globalization has its stregths",
          "Globalism has its moments",
          "You prefer the local alternatives",
          "You are pessimistic towards globalization"
        ]
      }
    ]
  }
} as const