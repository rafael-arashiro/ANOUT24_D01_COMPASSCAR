exports.seed = (knex) => {
  date = new Date()
  date.setMilliseconds(0)
  date.setSeconds(0)
  return knex('cars_items')
    .del()
    .then(() => knex('cars').del())
    .then(() =>
      knex('cars').insert([
        {
          id: 10001,
          brand: 'Fusca',
          model: 'Small ball',
          year: 2016,
          plate: 'LMN-9A23',
          created_at: date
        },
        {
          id: 10002,
          brand: 'Brasilia',
          model: 'No new model',
          year: 2019,
          plate: 'YUI-1G21',
          created_at: date
        },
        {
          id: 10003,
          brand: 'Ferrari',
          model: 'Red',
          year: 2024,
          plate: 'QWX-3L24',
          created_at: date
        },
        {
          id: 10004,
          brand: 'Bug',
          model: 'Bug Bug',
          year: 2018,
          plate: 'TGH-6797',
          created_at: date
        },
        {
          id: 10005,
          brand: 'Gurgel',
          model: 'Eletric',
          year: 2022,
          plate: 'AAA-0A00',
          created_at: date
        },
        {
          id: 10006,
          brand: 'Fuscão',
          model: 'Big ball',
          year: 2023,
          plate: 'III-6186',
          created_at: date
        },
        {
          id: 10007,
          brand: 'Limousine',
          model: 'Small Limo',
          year: 2024,
          plate: 'PSD-6Q22',
          created_at: date
        },
        {
          id: 10008,
          brand: 'Batmovel',
          model: 'TV show',
          year: 2015,
          plate: 'BAT-9M99',
          created_at: date
        },
        {
          id: 10009,
          brand: 'Porsche',
          model: 'Carrera',
          year: 2021,
          plate: 'POP-7777',
          created_at: date
        },
        {
          id: 10010,
          brand: 'Marauder',
          model: 'Viper Mackay',
          year: 2022,
          plate: 'LOL-0101',
          created_at: date
        },
        {
          id: 10011,
          brand: 'Air Blade',
          model: 'Grinder X19',
          year: 2022,
          plate: 'FFA-7T56',
          created_at: date
        },
        {
          id: 10012,
          brand: 'Battle Trak',
          model: 'Ragewortt',
          year: 2022,
          plate: 'BOB-5263',
          created_at: date
        },
        {
          id: 10013,
          brand: 'Battle Trak',
          model: 'Roadkill Kelly',
          year: 2022,
          plate: 'ABA-3641',
          created_at: date
        },
        {
          id: 10014,
          brand: 'Havac',
          model: 'Butcher Icebone',
          year: 2022,
          plate: 'NBA-6V22',
          created_at: date
        },
        {
          id: 10015,
          brand: 'Havac',
          model: 'J.B Slash',
          year: 2022,
          plate: 'TDD-4738',
          created_at: date
        },
        {
          id: 10016,
          brand: 'Kart',
          model: 'Mario',
          year: 2021,
          plate: 'QWE-2516',
          created_at: date
        },
        {
          id: 10017,
          brand: 'Kart',
          model: 'Luigi',
          year: 2021,
          plate: 'CCC-8D53',
          created_at: date
        },
        {
          id: 10018,
          brand: 'Number 1',
          model: 'The Boulder Mobile',
          year: 2020,
          plate: 'TRE-8547',
          created_at: date
        },
        {
          id: 10019,
          brand: 'Number 2',
          model: 'The Creepy Coupe',
          year: 2020,
          plate: 'HJK-7456',
          created_at: date
        },
        {
          id: 10020,
          brand: 'Number 3',
          model: 'The Convert-a-Car',
          year: 2020,
          plate: 'DSA-7875',
          created_at: date
        },
        {
          id: 10021,
          brand: 'Number 4',
          model: 'The Crimson Haybailer',
          year: 2020,
          plate: 'UIO-8126',
          created_at: date
        },
        {
          id: 10022,
          brand: 'Number 5',
          model: 'The Compact Pussycat',
          year: 2020,
          plate: 'MNB-3572',
          created_at: date
        },
        {
          id: 10023,
          brand: 'Number 6',
          model: 'The Army Surplus Special',
          year: 2020,
          plate: 'CAL-0011',
          created_at: date
        },
        {
          id: 10024,
          brand: 'Number 7',
          model: 'The Bullet-Proof Bomb',
          year: 2020,
          plate: 'JFD-1J89',
          created_at: date
        },
        {
          id: 10025,
          brand: 'Number 8',
          model: 'The Arkansas Chuggabug',
          year: 2020,
          plate: 'GFH-6341',
          created_at: date
        },
        {
          id: 10026,
          brand: 'Number 9',
          model: 'The Turbo Terrific',
          year: 2020,
          plate: 'RFG-1A54',
          created_at: date
        },
        {
          id: 10027,
          brand: 'Number 10',
          model: 'The Buzz Wagon',
          year: 2020,
          plate: 'ZAZ-9611',
          created_at: date
        },
        {
          id: 10028,
          brand: 'Number 00',
          model: 'The Mean Machine',
          year: 2020,
          plate: 'PIP-7471',
          created_at: date
        },
        {
          id: 10029,
          brand: 'Plymouth',
          model: 'Plymouth Fury',
          year: 2015,
          plate: 'CQB-2410',
          created_at: date
        },
        {
          id: 10030,
          brand: 'Bus',
          model: 'Bus',
          year: 2016,
          plate: 'QQQ-1H11',
          created_at: date
        },
        {
          id: 10031,
          brand: 'Truck',
          model: 'Truck',
          year: 2017,
          plate: 'JHL-3L32',
          created_at: date
        }
      ])
    )
}
