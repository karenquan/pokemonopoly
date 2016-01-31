var $cells = $([
  { //COLUMN 1 (LEFT)-------------------
      boardIndex: 0,
      column: 1,
      index: 7,
      name: 'Go',
      type: 'Go',
      text: 'Go',
      image: 'go.png'
  },
  {
      boardIndex: 1,
      column: 1,
      index: 6,
      name: 'Voltorb',
      city: 'Pallet Town',
      value: 60,
      color: '#e48f89',
      type: 'Property',
      image: 'voltorb.png'
  },
  {
      boardIndex: 2,
      column: 1,
      index: 5,
      name: 'Electrode',
      city: 'Pallet Town',
      value: 60,
      color: '#e48f89',
      type: 'Property',
      image: 'electrode.png'
  },
  {
      boardIndex: 3,
      column: 1,
      index: 4,
      name: 'Articuno',
      value: 150,
      type: 'legendary',
      color: '#76b8e1',
      image: 'articuno.png'
  },
  {
      boardIndex: 4,
      column: 1,
      index: 3,
      name: 'Poke Ball',
      value: 200,
      type: 'Ball',
      color: '#f18e38',
      image: 'pokeball.png'
  },
  {
      boardIndex: 5,
      column: 1,
      index: 2,
      name: 'Bulbasaur',
      city: 'Viridian City',
      value: 100,
      color: '#8abd8a',
      type: 'Property',
      image: 'bulbasaur.png'
  },
  {
      boardIndex: 6,
      column: 1,
      index: 1,
      name: 'Venusaur',
      city: 'Viridian City',
      value: 120,
      color: '#8abd8a',
      type: 'Property',
      image: 'venusaur.png'
  },
  {
      boardIndex: 7,
      column: 1,
      index: 0,
      name: 'Jail',
      type: 'Jail',
      text: 'Jail',
      image: 'jail.png'
  },
  { //COLUMN 2 (TOP)-------------------
      boardIndex: 8,
      column: 2,
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
      index: 2,
      name: 'Ultra Ball',
      value: 200,
      type: 'Ball',
      color: '#677280',
      image: 'ultraball.png'
  },
  {
      boardIndex: 11,
      column: 2,
      index: 3,
      name: 'Attack',
      value: 200,
      type: 'Attack',
      color: '#cc0000',
      image: 'attack.png'
  },
  {
      boardIndex: 12,
      column: 2,
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
      text: 'Free Parking',
      image: 'freeparking.png'
  },
  {
      boardIndex: 15,
      column: 3,
      index: 1,
      name: 'Pikachu',
      city: 'Vermilion City',
      value: 220,
      color: '#f4d77c',
      type: 'Property',
      image: 'pikachu.png'
  },
  {
      boardIndex: 15,
      column: 3,
      index: 2,
      name: 'Raichu',
      city: 'Vermilion City',
      value: 240,
      color: '#f4d77c',
      type: 'Property',
      image: 'raichu.png'
  },
  {
      boardIndex: 17,
      column: 3,
      index: 3,
      name: 'Great Ball',
      value: 200,
      type: 'Ball',
      color: '#3b82c4',
      image: 'greatball.png'
  },
  {
      boardIndex: 18,
      column: 3,
      index: 4,
      name: 'Attack',
      value: 200,
      type: 'Attack',
      color: '#cc0000',
      image: 'attacktwo.png'
  },
  {
      boardIndex: 19,
      column: 3,
      index: 5,
      name: 'Haunter',
      city: 'Lavender Town',
      value: 260,
      color: '#534a58',
      type: 'Property',
      image: 'haunter.png'
  },
  {
      boardIndex: 20,
      column: 3,
      index: 6,
      name: 'Gengar',
      city: 'Lavender Town',
      value: 280,
      color: '#534a58',
      type: 'Property',
      image: 'gengar.png'
  },
  {
      boardIndex: 21,
      column: 3,
      index: 7,
      name: 'Go To Jail',
      type: 'GoToJail',
      text: 'Go To Jail',
      image: 'gotojail.png'
  },
  //COLUMN 4 (BOTTOM)-------------------
  {
      boardIndex: 22,
      column: 4,
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
      index: 2,
      name: 'Master Ball',
      value: 200,
      type: 'ball',
      color: '#7e308e',
      image: 'masterball.png'
  },
  {
      boardIndex: 25,
      column: 4,
      index: 3,
      name: 'Zapdos',
      value: 150,
      type: 'Legendary',
      color: '#ffe081',
      image: 'zapdos.png'
  },
  {
      boardIndex: 26,
      column: 4,
      index: 4,
      name: 'Hitmonlee',
      city: 'Fuchsia City',
      value: 320,
      color: '#c7b7a7',
      type: 'Property',
      image: 'hitmonlee.png'
  },
  {
      boardIndex: 27,
      column: 4,
      index: 5,
      name: 'Hitmonchan',
      city: 'Fuchsia City',
      value: 300,
      color: '#c7b7a7',
      type: 'Property',
      image: 'hitmonchan.png'
  }
]);
