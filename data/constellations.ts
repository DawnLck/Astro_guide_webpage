
import { ConstellationData } from '../types';

export const CONSTELLATIONS: ConstellationData[] = [
  {
    id: 'orion',
    name: 'Orion',
    nameZh: '猎户座',
    latinName: 'The Hunter',
    stars: [
      { id: 'betelgeuse', name: 'Betelgeuse', ra: 88.79, dec: 7.41, magnitude: 0.45, color: '#ffcc99' },
      { id: 'rigel', name: 'Rigel', ra: 78.63, dec: -8.2, magnitude: 0.12, color: '#99ccff' },
      { id: 'bellatrix', name: 'Bellatrix', ra: 81.28, dec: 6.35, magnitude: 1.64, color: '#ccdaff' },
      { id: 'saiph', name: 'Saiph', ra: 86.94, dec: -9.67, magnitude: 2.07, color: '#ccdaff' },
      { id: 'alnitak', name: 'Alnitak', ra: 85.19, dec: -1.94, magnitude: 1.74, color: '#ccdaff' },
      { id: 'alnilam', name: 'Alnilam', ra: 84.05, dec: -1.20, magnitude: 1.69, color: '#ccdaff' },
      { id: 'mintaka', name: 'Mintaka', ra: 83.00, dec: -0.30, magnitude: 2.25, color: '#ccdaff' },
      { id: 'meissa', name: 'Meissa', ra: 83.5, dec: 9.93, magnitude: 3.39, color: '#ffffff' } // Head
    ],
    connections: [
      [0, 2], [0, 4], [2, 6], [4, 5], [5, 6], [4, 3], [6, 1], [1, 3], // Body
      [7, 0], [7, 2] // Head
    ]
  },
  {
    id: 'ursa_major',
    name: 'Big Dipper',
    nameZh: '大熊座',
    latinName: 'Ursa Major',
    stars: [
      { id: 'dubhe', name: 'Dubhe', ra: 165.93, dec: 61.75, magnitude: 1.8, color: '#ffddaa' },
      { id: 'merak', name: 'Merak', ra: 165.46, dec: 56.38, magnitude: 2.3, color: '#ffffff' },
      { id: 'phecda', name: 'Phecda', ra: 178.46, dec: 53.69, magnitude: 2.4, color: '#ffffff' },
      { id: 'megrez', name: 'Megrez', ra: 183.86, dec: 57.03, magnitude: 3.3, color: '#ffffff' },
      { id: 'alioth', name: 'Alioth', ra: 193.51, dec: 55.96, magnitude: 1.76, color: '#ffffff' },
      { id: 'mizar', name: 'Mizar', ra: 200.98, dec: 54.92, magnitude: 2.2, color: '#ffffff' },
      { id: 'alkaid', name: 'Alkaid', ra: 206.88, dec: 49.31, magnitude: 1.85, color: '#99ccff' }
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]
    ]
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    nameZh: '仙后座',
    latinName: 'The Queen',
    stars: [
      { id: 'caph', name: 'Caph', ra: 2.29, dec: 59.15, magnitude: 2.28, color: '#fff8e7' },
      { id: 'schedar', name: 'Schedar', ra: 10.12, dec: 56.53, magnitude: 2.24, color: '#ffcc99' },
      { id: 'gamma', name: 'Gamma Cas', ra: 14.17, dec: 60.71, magnitude: 2.15, color: '#99ccff' },
      { id: 'ruchbah', name: 'Ruchbah', ra: 19.86, dec: 60.23, magnitude: 2.66, color: '#ffffff' },
      { id: 'segin', name: 'Segin', ra: 28.59, dec: 63.67, magnitude: 3.35, color: '#ffffff' }
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4]
    ]
  },
  // --- ZODIAC CONSTELLATIONS (Ordered roughly by zodiac month) ---
  {
      id: 'aries',
      name: 'Aries',
      nameZh: '白羊座',
      latinName: 'The Ram',
      stars: [
          { id: 'hamal', name: 'Hamal', ra: 30.63, dec: 23.46, magnitude: 2.0, color: '#ffcc99' },
          { id: 'sheratan', name: 'Sheratan', ra: 28.97, dec: 20.80, magnitude: 2.6, color: '#ffffff' },
          { id: 'mesarthim', name: 'Mesarthim', ra: 27.90, dec: 19.30, magnitude: 3.9, color: '#ffffff' },
          { id: '41ari', name: 'Bharani', ra: 41.0, dec: 27.3, magnitude: 3.6, color: '#ffffff' }
      ],
      connections: [
          [0, 1], [1, 2], [2, 3] // Simple Arc
      ]
  },
  {
      id: 'taurus',
      name: 'Taurus',
      nameZh: '金牛座',
      latinName: 'The Bull',
      stars: [
          { id: 'aldebaran', name: 'Aldebaran', ra: 68.98, dec: 16.5, magnitude: 0.87, color: '#ff5533' },
          { id: 'elnath', name: 'Elnath', ra: 81.57, dec: 28.6, magnitude: 1.65, color: '#99ccff' },
          { id: 'zeta_tau', name: 'Tianguan', ra: 84.4, dec: 21.1, magnitude: 2.9, color: '#99ccff' },
          { id: 'epsilon_tau', name: 'Ain', ra: 67.0, dec: 19.1, magnitude: 3.5, color: '#ffcc33' },
          { id: 'gamma_tau', name: 'Hyadum I', ra: 64.9, dec: 15.6, magnitude: 3.6, color: '#ffcc33' },
          { id: 'delta_tau', name: 'Hyadum II', ra: 65.7, dec: 17.5, magnitude: 3.7, color: '#ffcc33' }
      ],
      connections: [
          [0, 3], [3, 5], [5, 4], [4, 0], // Hyades V (approximate loop)
          [0, 2], // Aldebaran -> Tianguan (Horn 1)
          [3, 1]  // Ain -> Elnath (Horn 2)
      ]
  },
  {
      id: 'gemini',
      name: 'Gemini',
      nameZh: '双子座',
      latinName: 'The Twins',
      stars: [
          { id: 'pollux', name: 'Pollux', ra: 116.0, dec: 28.0, magnitude: 1.16, color: '#ffddaa' },
          { id: 'castor', name: 'Castor', ra: 113.6, dec: 31.8, magnitude: 1.58, color: '#ffffff' },
          { id: 'alhena', name: 'Alhena', ra: 99.4, dec: 16.4, magnitude: 1.9, color: '#ffffff' },
          { id: 'tejat', name: 'Tejat', ra: 95.5, dec: 22.5, magnitude: 2.8, color: '#ff5533' },
          { id: 'mebsuta', name: 'Mebsuta', ra: 98.5, dec: 25.1, magnitude: 3.0, color: '#ffcc33' },
          { id: 'mekbuda', name: 'Mekbuda', ra: 106.0, dec: 20.5, magnitude: 4.0, color: '#ffcc33' },
          { id: 'wasat', name: 'Wasat', ra: 110.0, dec: 21.9, magnitude: 3.5, color: '#ffffff' },
          { id: 'propus', name: 'Propus', ra: 93.0, dec: 22.5, magnitude: 3.3, color: '#ff5533' }
      ],
      connections: [
          [0, 1], // Hand holding
          [0, 6], [6, 5], [5, 2], // Pollux Line: Pollux -> Wasat -> Mekbuda -> Alhena
          [1, 4], [4, 3], [3, 7]  // Castor Line: Castor -> Mebsuta -> Tejat -> Propus
      ]
  },
  {
      id: 'cancer',
      name: 'Cancer',
      nameZh: '巨蟹座',
      latinName: 'The Crab',
      stars: [
          { id: 'acubens', name: 'Acubens', ra: 134.5, dec: 11.8, magnitude: 4.2, color: '#ffffff' },
          { id: 'altarf', name: 'Altarf', ra: 124.0, dec: 9.0, magnitude: 3.5, color: '#ffcc99' },
          { id: 'asellus_borealis', name: 'Asellus Borealis', ra: 128.0, dec: 21.5, magnitude: 4.6, color: '#ffffff' },
          { id: 'asellus_australis', name: 'Asellus Australis', ra: 129.0, dec: 18.0, magnitude: 3.9, color: '#ffddaa' },
          { id: 'iota_cnc', name: 'Iota Cnc', ra: 131.0, dec: 28.8, magnitude: 4.0, color: '#fff8e7' }
      ],
      connections: [
          // Inverted Y / Lambda shape
          [3, 2], // Delta (Center) -> Gamma (Top)
          [2, 4], // Gamma -> Iota (Top extension)
          [3, 0], // Delta -> Alpha (Left Leg)
          [3, 1]  // Delta -> Beta (Right Leg)
      ]
  },
  {
      id: 'leo',
      name: 'Leo',
      nameZh: '狮子座',
      latinName: 'The Lion',
      stars: [
          { id: 'regulus', name: 'Regulus', ra: 152.09, dec: 11.96, magnitude: 1.36, color: '#99ccff' },
          { id: 'algieba', name: 'Algieba', ra: 154.99, dec: 19.84, magnitude: 2.01, color: '#ffddaa' },
          { id: 'denebola', name: 'Denebola', ra: 177.2, dec: 14.57, magnitude: 2.14, color: '#ffffff' },
          { id: 'zosma', name: 'Zosma', ra: 168.52, dec: 20.52, magnitude: 2.56, color: '#ffffff' },
          { id: 'chertan', name: 'Chertan', ra: 168.0, dec: 15.43, magnitude: 3.3, color: '#ffffff' },
          { id: 'adhafera', name: 'Adhafera', ra: 154.0, dec: 23.42, magnitude: 3.4, color: '#ffffff' },
          { id: 'rasalas', name: 'Rasalas', ra: 148.0, dec: 26.0, magnitude: 3.8, color: '#ffffff' },
          { id: 'algenubi', name: 'Algenubi', ra: 146.4, dec: 23.7, magnitude: 2.98, color: '#ffcc33' },
          { id: 'aljabhah', name: 'Al Jabhah', ra: 151.8, dec: 16.7, magnitude: 3.4, color: '#ffffff' }
      ],
      connections: [
          // The Sickle
          [0, 8], [8, 1], [1, 5], [5, 6], [6, 7], // Regulus -> Eta -> Gamma -> Zeta -> Mu -> Epsilon
          // The Body
          [1, 3], // Algieba -> Zosma
          [3, 2], // Zosma -> Denebola
          [2, 4], // Denebola -> Chertan
          [4, 0]  // Chertan -> Regulus
      ]
  },
  {
      id: 'virgo',
      name: 'Virgo',
      nameZh: '室女座',
      latinName: 'The Virgin',
      stars: [
          { id: 'spica', name: 'Spica', ra: 201.3, dec: -11.1, magnitude: 0.98, color: '#99ccff' },
          { id: 'zavijava', name: 'Zavijava', ra: 177.0, dec: 1.7, magnitude: 3.6, color: '#fff8e7' },
          { id: 'porrima', name: 'Porrima', ra: 190.0, dec: -1.4, magnitude: 2.7, color: '#fff8e7' },
          { id: 'auva', name: 'Auva', ra: 193.0, dec: 3.4, magnitude: 3.4, color: '#ffcc33' },
          { id: 'vindemiatrix', name: 'Vindemiatrix', ra: 195.0, dec: 10.9, magnitude: 2.8, color: '#ffcc33' },
          { id: 'heze', name: 'Heze', ra: 205.0, dec: -0.6, magnitude: 3.3, color: '#ffffff' },
          { id: 'zaniah', name: 'Zaniah', ra: 185.0, dec: 0.0, magnitude: 3.9, color: '#ffffff' }
      ],
      connections: [
          // Central Polygon
          [0, 5], // Spica -> Heze
          [5, 3], // Heze -> Auva
          [3, 2], // Auva -> Porrima
          [2, 0], // Porrima -> Spica
          // Limbs
          [3, 4], // Auva -> Vindemiatrix (Arm/Wing)
          [2, 6], // Porrima -> Zaniah
          [6, 1]  // Zaniah -> Zavijava (Head)
      ]
  },
  {
      id: 'libra',
      name: 'Libra',
      nameZh: '天秤座',
      latinName: 'The Scales',
      stars: [
          { id: 'zubenelgenubi', name: 'Zubenelgenubi', ra: 222.7, dec: -16.0, magnitude: 2.7, color: '#ffffff' }, // Alpha
          { id: 'zubeneschamali', name: 'Zubeneschamali', ra: 229.2, dec: -9.4, magnitude: 2.6, color: '#99ccff' }, // Beta
          { id: 'zubenelakrab', name: 'Zubenelakrab', ra: 233.0, dec: -14.8, magnitude: 3.9, color: '#ffcc33' }, // Gamma
          { id: 'brachium', name: 'Brachium', ra: 225.0, dec: -25.0, magnitude: 3.3, color: '#ffffff' } // Sigma
      ],
      connections: [
          // The Diamond / Kite
          [0, 1], // Alpha -> Beta
          [1, 2], // Beta -> Gamma
          [2, 3], // Gamma -> Sigma
          [3, 0]  // Sigma -> Alpha
      ]
  },
  {
      id: 'scorpius',
      name: 'Scorpius',
      nameZh: '天蝎座',
      latinName: 'The Scorpion',
      stars: [
          { id: 'antares', name: 'Antares', ra: 247.35, dec: -26.43, magnitude: 0.96, color: '#ff5533' },
          { id: 'graffias', name: 'Acrab', ra: 241.3, dec: -19.8, magnitude: 2.56, color: '#ffffff' },
          { id: 'dschubba', name: 'Dschubba', ra: 240.0, dec: -22.6, magnitude: 2.29, color: '#ffffff' },
          { id: 'pi', name: 'Pi Sco', ra: 239.0, dec: -26.1, magnitude: 2.89, color: '#ffffff' },
          { id: 'sigma', name: 'Alniyat', ra: 245.0, dec: -25.5, magnitude: 2.9, color: '#ffffff' },
          { id: 'tau', name: 'Paikauhale', ra: 249.0, dec: -28.2, magnitude: 2.8, color: '#ffffff' },
          { id: 'epsilon_sco', name: 'Larawag', ra: 252.0, dec: -34.3, magnitude: 2.29, color: '#ffcc33' },
          { id: 'mu_sco', name: 'Xamidimura', ra: 253.0, dec: -38.0, magnitude: 3.0, color: '#ffffff' },
          { id: 'zeta_sco', name: 'Zeta Sco', ra: 254.0, dec: -42.3, magnitude: 3.6, color: '#ffffff' },
          { id: 'eta_sco', name: 'Eta Sco', ra: 257.0, dec: -43.2, magnitude: 3.3, color: '#ffffff' },
          { id: 'sargas', name: 'Sargas', ra: 264.0, dec: -42.9, magnitude: 1.86, color: '#ffffff' },
          { id: 'kappa', name: 'Kappa Sco', ra: 266.0, dec: -39.0, magnitude: 2.39, color: '#ffffff' },
          { id: 'shaula', name: 'Shaula', ra: 263.0, dec: -37.1, magnitude: 1.62, color: '#99ccff' }
      ],
      connections: [
          [1, 2], [2, 3], [2, 0], // Head (Graffias, Dschubba, Pi, Antares)
          [0, 4], [0, 5], // Antares to body
          [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12] // The Tail hook
      ]
  },
  {
      id: 'sagittarius',
      name: 'Sagittarius',
      nameZh: '人马座',
      latinName: 'The Archer',
      stars: [
          { id: 'kaus_australis', name: 'Kaus Australis', ra: 276.0, dec: -34.3, magnitude: 1.79, color: '#99ccff' }, // Epsilon
          { id: 'nunki', name: 'Nunki', ra: 284.0, dec: -26.3, magnitude: 2.05, color: '#99ccff' }, // Sigma
          { id: 'ascella', name: 'Ascella', ra: 285.0, dec: -30.0, magnitude: 2.6, color: '#ffffff' }, // Zeta
          { id: 'kaus_media', name: 'Kaus Media', ra: 275.0, dec: -29.8, magnitude: 2.7, color: '#ffcc33' }, // Delta
          { id: 'kaus_borealis', name: 'Kaus Borealis', ra: 277.0, dec: -25.4, magnitude: 2.8, color: '#ffcc33' }, // Lambda
          { id: 'alnasl', name: 'Alnasl', ra: 271.4, dec: -30.4, magnitude: 3.0, color: '#ffcc33' }, // Gamma
          { id: 'phi', name: 'Phi Sgr', ra: 282.0, dec: -27.0, magnitude: 3.1, color: '#ffffff' } // Lid handle
      ],
      connections: [
          // The Teapot
          [5, 3], // Spout: Alnasl -> Kaus Media
          [3, 0], // Body front: Kaus Media -> Kaus Australis
          [0, 2], // Body bottom: Kaus Australis -> Ascella
          [2, 1], // Handle: Ascella -> Nunki
          [1, 4], // Lid right: Nunki -> Kaus Borealis
          [4, 3], // Lid left: Kaus Borealis -> Kaus Media
          [4, 6]  // Lid top: Kaus Borealis -> Phi
      ]
  },
  {
      id: 'capricornus',
      name: 'Capricornus',
      nameZh: '摩羯座',
      latinName: 'The Sea Goat',
      stars: [
          { id: 'deneb_algedi', name: 'Deneb Algedi', ra: 327.0, dec: -16.1, magnitude: 2.8, color: '#ffffff' }, // Delta
          { id: 'dabih', name: 'Dabih', ra: 305.0, dec: -14.7, magnitude: 3.0, color: '#ffddaa' }, // Beta
          { id: 'algedi', name: 'Algedi', ra: 304.0, dec: -12.5, magnitude: 3.5, color: '#ffcc33' }, // Alpha
          { id: 'nashira', name: 'Nashira', ra: 326.0, dec: -16.6, magnitude: 3.7, color: '#ffffff' }, // Gamma
          { id: 'theta_cap', name: 'Theta Cap', ra: 317.0, dec: -17.2, magnitude: 4.1, color: '#ffffff' },
          { id: 'psi_cap', name: 'Psi Cap', ra: 312.0, dec: -25.0, magnitude: 4.1, color: '#ffffff' } // Bottom tip
      ],
      connections: [
          // The Sea Goat Triangle / Bikini
          [2, 1], // Algedi -> Dabih (Head)
          [1, 5], // Dabih -> Psi
          [5, 0], // Psi -> Deneb Algedi
          [0, 3], // Deneb Algedi -> Nashira (Tail)
          [0, 4], // Deneb Algedi -> Theta (Back line)
          [4, 1]  // Theta -> Dabih
      ]
  },
  {
      id: 'aquarius',
      name: 'Aquarius',
      nameZh: '宝瓶座',
      latinName: 'The Water Bearer',
      stars: [
          { id: 'sadalsuud', name: 'Sadalsuud', ra: 323.0, dec: -5.5, magnitude: 2.9, color: '#ffddaa' }, // Beta
          { id: 'sadalmelik', name: 'Sadalmelik', ra: 331.0, dec: -0.3, magnitude: 2.95, color: '#ffddaa' }, // Alpha
          { id: 'skat', name: 'Skat', ra: 343.0, dec: -15.8, magnitude: 3.2, color: '#ffffff' }, // Delta
          { id: 'eta_aqr', name: 'Eta Aqr', ra: 332.0, dec: -0.1, magnitude: 4.0, color: '#ffffff' },
          { id: 'zeta_aqr', name: 'Zeta Aqr', ra: 333.0, dec: 0.0, magnitude: 3.6, color: '#ffffff' },
          { id: 'pi_aqr', name: 'Pi Aqr', ra: 336.0, dec: 1.3, magnitude: 4.6, color: '#ffffff' },
          { id: 'sadachbia', name: 'Sadachbia', ra: 335.4, dec: -1.38, magnitude: 3.8, color: '#ffffff' }, // Gamma
          { id: 'lambda_aqr', name: 'Hydor', ra: 341.0, dec: -7.5, magnitude: 3.7, color: '#ffffff' }
      ],
      connections: [
          [1, 0], // Alpha -> Beta
          [0, 4], // Beta -> Zeta (Shoulder -> Jar Center)
          // The Water Jar (Mercedes symbol shape)
          [4, 6], // Zeta -> Gamma
          [4, 3], // Zeta -> Eta
          [4, 5], // Zeta -> Pi
          [3, 5], // Eta -> Pi (Rim)
          // The Stream
          [6, 7], // Gamma -> Lambda
          [7, 2]  // Lambda -> Skat
      ]
  },
  {
      id: 'pisces',
      name: 'Pisces',
      nameZh: '双鱼座',
      latinName: 'The Fish',
      stars: [
          { id: 'alrescha', name: 'Alrescha', ra: 30.0, dec: 2.7, magnitude: 3.8, color: '#ffffff' }, // Alpha (The Knot)
          { id: 'eta_psc', name: 'Eta Psc', ra: 23.0, dec: 15.3, magnitude: 3.6, color: '#ffddaa' }, // North Fish
          { id: 'gamma_psc', name: 'Gamma Psc', ra: 349.0, dec: 3.2, magnitude: 3.7, color: '#ffcc33' }, // Circlet
          { id: 'omega_psc', name: 'Omega Psc', ra: 359.0, dec: 6.9, magnitude: 4.0, color: '#ffffff' },
          { id: 'tx_psc', name: 'TX Psc', ra: 356.0, dec: 2.0, magnitude: 4.8, color: '#ff5533' },
          { id: 'iota_psc', name: 'Iota Psc', ra: 350.0, dec: 5.0, magnitude: 4.1, color: '#ffffff' },
          { id: 'omicron_psc', name: 'Omicron Psc', ra: 26.0, dec: 9.0, magnitude: 4.2, color: '#ffffff' }, // Connecting to North
          { id: 'nu_psc', name: 'Nu Psc', ra: 27.0, dec: 5.0, magnitude: 4.4, color: '#ffffff' }
      ],
      connections: [
          // The V Shape
          [0, 7], [7, 6], [6, 1], // North Cord: Alrescha -> Nu -> Omicron -> Eta
          [0, 3], [3, 5], // West Cord: Alrescha -> Omega -> Iota
          // The Circlet (West Fish)
          [5, 2], [2, 4], [4, 3] // Iota -> Gamma -> TX -> Omega
      ]
  }
];
