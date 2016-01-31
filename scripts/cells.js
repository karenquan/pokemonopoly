var $cells = $([
  { //COLUMN 1 (LEFT)-------------------
      boardIndex: 0,
      column: 1,
      index: 7,
      name: 'Go',
      type: 'Go',
      text: 'Go'
  },
  {
      boardIndex: 1,
      column: 1,
      index: 6,
      name: 'Pikachu',
      city: 'Pallet Town',
      value: 60,
      color: '#f4d77c',
      type: 'Property',
      image: 'pikachu.png'
  },
  {
      boardIndex: 2,
      column: 1,
      index: 5,
      name: 'Raichu',
      city: 'Pallet Town',
      value: 60,
      color: '#f4d77c',
      type: 'Property',
      image: 'raichu.png'
  },
  {
      boardIndex: 3,
      column: 1,
      index: 4,
      name: 'Poke ball',
      value: 200,
      type: 'Ball',
      color: '#a1c1cb',
      image: 'pokeball.png'
  },
  {
      boardIndex: 4,
      column: 1,
      index: 3,
      name: 'Bulbasaur',
      city: 'Viridian City',
      value: 100,
      color: '#8abd8a',
      type: 'Property',
      image: 'bulbasaur.png'
  },
  {
      boardIndex: 5,
      column: 1,
      index: 2,
      name: 'Venusaur',
      city: 'Viridian City',
      value: 120,
      color: '#8abd8a',
      type: 'Property',
      image: 'venusaur.png'
  },
  {
      boardIndex: 6,
      column: 1,
      index: 1,
      name: 'Zapdos',
      value: 150,
      type: 'Legendary',
      color: '#ffe081',
      image: 'zapdos.png'
  },
  {
      boardIndex: 7,
      column: 1,
      index: 0,
      name: 'Jail',
      type: 'Jail',
      text: 'Jail'
  },
  { //COLUMN 2 (TOP)-------------------
      boardIndex: 8,
      column: 2,
      row: 'top',
      index: 0,
      name: 'Charmander',
      city: 'Pewter City',
      value: 140,
      color: '#f1a563',
      type: 'Property',
      image: 'charmander.png'
  },
  {
      boardIndex: 9,
      column: 2,
      row: 'top',
      index: 1,
      name: 'Charizard',
      city: 'Pewter City',
      value: 160,
      color: '#f1a563',
      type: 'Property',
      image: 'charizard.png'
  },
  {
      boardIndex: 10,
      column: 2,
      row: 'top',
      index: 2,
      name: 'Great ball',
      value: 200,
      type: 'Ball',
      color: '#a1c1cb',
      image: 'greatball.png'
  },
  {
      boardIndex: 11,
      column: 2,
      row: 'top',
      index: 3,
      name: 'Attack',
      value: 200,
      type: 'Attack',
      color: '#76b8e1',
      image: 'attack.png'
  },
  {
      boardIndex: 12,
      column: 2,
      row: 'top',
      index: 4,
      name: 'Squirtle',
      city: 'Cerulean City',
      value: 180,
      color: '#8fc4d1',
      type: 'Property',
      image: 'squirtle.png'
  },
  {
      boardIndex: 13,
      column: 2,
      row: 'top',
      index: 5,
      name: 'Blastoise',
      city: 'Cerulean City',
      value: 200,
      color: '#8fc4d1',
      type: 'Property',
      image: 'blastoise.png'
  },
  { //COLUMN 3 (RIGHT)-------------------
      boardIndex: 14,
      column: 3,
      index: 0,
      name: 'Free Parking',
      type: 'Parking',
      text: 'Free Parking'
  },
  {
      boardIndex: 15,
      column: 3,
      index: 1,
      name: 'Voltorb',
      city: 'Vermilion City',
      value: 220,
      color: '#e48f89',
      type: 'Property',
      image: 'voltorb.png'
  },
  {
      boardIndex: 16,
      column: 3,
      index: 2,
      name: 'Electrode',
      city: 'Vermilion City',
      value: 240,
      color: '#e48f89',
      type: 'Property',
      image: 'electrode.png'
  },
  {
      boardIndex: 17,
      column: 3,
      index: 3,
      name: 'Ultra ball',
      value: 200,
      type: 'Ball',
      color: '#a1c1cb',
      image: 'ultraball.png'
  },
  {
      boardIndex: 18,
      column: 3,
      index: 4,
      name: 'Haunter',
      city: 'Lavender Town',
      value: 260,
      color: '#534a58',
      type: 'Property',
      image: 'haunter.png'
  },
  {
      boardIndex: 19,
      column: 3,
      index: 5,
      name: 'Gengar',
      city: 'Lavender Town',
      value: 280,
      color: '#534a58',
      type: 'Property',
      image: 'gengar.png'
  },
  {
      boardIndex: 20,
      column: 3,
      index: 6,
      name: 'Attack',
      value: 200,
      type: 'Attack',
      color: '#ffe081',
      image: 'attack.png'
  },
  {
      boardIndex: 21,
      column: 3,
      index: 7,
      name: 'Go To Jail',
      type: 'GoToJail',
      text: 'Go To Jail'
  },
  //COLUMN 4 (BOTTOM)-------------------
  {
      boardIndex: 22,
      column: 4,
      row: 'bottom',
      index: 0,
      name: 'Magneton',
      city: 'Celadon City',
      value: 360,
      color: '#a1c1cb',
      type: 'Property',
      image: 'magneton.png'
  },
  {
      boardIndex: 23,
      column: 4,
      row: 'bottom',
      index: 1,
      name: 'Magnemite',
      city: 'Celadon City',
      value: 340,
      color: '#a1c1cb',
      type: 'Property',
      image: 'magnemite.png'
  },
  {
      boardIndex: 24,
      column: 4,
      row: 'bottom',
      index: 2,
      name: 'Master ball',
      value: 200,
      type: 'ball',
      color: '#a1c1cb',
      image: 'masterball.png'
  },
  {
      boardIndex: 25,
      column: 4,
      row: 'bottom',
      index: 3,
      name: 'HitmonLee',
      city: 'Fuchsia City',
      value: 320,
      color: '#c7b7a7',
      type: 'Property',
      image: 'hitmonlee.png'
  },
  {
      boardIndex: 26,
      column: 4,
      row: 'bottom',
      index: 4,
      name: 'Hitmonchan',
      city: 'Fuchsia City',
      value: 300,
      color: '#c7b7a7',
      type: 'Property',
      image: 'hitmonchan.png'
  },
  {
      boardIndex: 27,
      column: 4,
      row: 'bottom',
      index: 5,
      name: 'Articuno',
      value: 150,
      type: 'legendary',
      color: '#76b8e1',
      image: 'articuno.png'
  }
]);
