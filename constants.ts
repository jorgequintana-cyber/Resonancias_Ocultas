import { TuningSystem } from './types';

// Pythagorean ratios (Just Intonation)
const PYTHAGOREAN_RATIOS = [
  1, 256/243, 9/8, 32/27, 81/64, 4/3, 729/512, 3/2, 128/81, 27/16, 16/9, 243/128, 2
];

// EDO ratios calculation function
const edoRatios = (steps: number) => Array.from({ length: steps + 1 }, (_, i) => Math.pow(2, i / steps));

// Bohlen-Pierce ratios calculation function (based on tritave 3:1)
const bpRatios = () => Array.from({ length: 14 }, (_, i) => Math.pow(3, i / 13));

export const TUNING_SYSTEMS: TuningSystem[] = [
  {
    id: 'pythagorean',
    name: 'Pitagórica',
    baseFrequency: 261.63, // C4
    description: 'La afinación pitagórica es un sistema de afinación musical basado en una secuencia de quintas perfectas (relación 3:2). Es uno de los sistemas más antiguos, atribuido a Pitágoras. Genera consonancias muy puras para quintas y cuartas, pero produce terceras disonantes y un intervalo problemático conocido como la "quinta del lobo".',
    scale: { name: 'Escala Diatónica Pitagórica', ratios: PYTHAGOREAN_RATIOS },
    chords: [
      { name: 'Acorde Mayor', intervals: [0, 4, 7] },
      { name: 'Acorde Menor', intervals: [0, 3, 7] },
    ],
    piece: {
      name: 'Bach',
      audioUrl: 'https://raw.githubusercontent.com/jorgequintana-cyber/Resonancias_Ocultas/main/Pit.mp3',
      noteSequence: [
        { note: 0, duration: 0.5 }, { note: 4, duration: 0.5 }, { note: 7, duration: 0.5 }, { note: 11, duration: 0.5 },
        { note: 12, duration: 1.0 }, { note: 9, duration: 0.5 }, { note: 5, duration: 0.5 }, { note: 2, duration: 1.0 }
      ]
    }
  },
  {
    id: '12edo',
    name: '12-EDO',
    baseFrequency: 261.63,
    description: 'El Temperamento Igual de 12 Divisiones por Octava (12-EDO) es el sistema de afinación estándar en la música occidental. Divide la octava en 12 semitonos exactamente iguales. Aunque ningún intervalo (excepto la octava) es perfectamente puro, todos son suficientemente cercanos, lo que permite modular a cualquier tonalidad sin disonancias extremas.',
    scale: { name: 'Escala Cromática de 12-EDO', ratios: edoRatios(12) },
    chords: [
      { name: 'Acorde Mayor', intervals: [0, 4, 7] },
      { name: 'Acorde Menor', intervals: [0, 3, 7] },
      { name: 'Acorde Disminuido', intervals: [0, 3, 6] },
    ],
    piece: {
      name: 'Melodía Temperada',
      audioUrl: 'https://raw.githubusercontent.com/jorgequintana-cyber/Resonancias_Ocultas/main/12EDO.mp3',
      noteSequence: [
        { note: 0, duration: 0.4 }, { note: 2, duration: 0.4 }, { note: 4, duration: 0.4 }, { note: 5, duration: 0.4 },
        { note: 7, duration: 0.8 }, { note: 5, duration: 0.4 }, { note: 4, duration: 0.8 }
      ]
    }
  },
  {
    id: '19edo',
    name: '19-EDO',
    baseFrequency: 261.63,
    description: '19-EDO divide la octava en 19 pasos iguales. Es notable por tener una tercera menor y sexta mayor muy cercanas a las puras de la entonación justa. Esto le da un color único y permite modulaciones interesantes, siendo un punto de entrada popular al mundo de la microtonalidad.',
    scale: { name: 'Escala Cromática de 19-EDO', ratios: edoRatios(19) },
    chords: [
      { name: 'Acorde Mayor (6+9)', intervals: [0, 6, 11] }, // ~Major
      { name: 'Acorde Menor (5+9)', intervals: [0, 5, 11] }, // ~Minor
    ],
    piece: {
      name: 'Estudio en 19',
      audioUrl: 'https://raw.githubusercontent.com/jorgequintana-cyber/Resonancias_Ocultas/main/19EDO.mp3'
    }
  },
  {
    id: '22edo',
    name: '22-EDO',
    baseFrequency: 261.63,
    description: '22-EDO divide la octava en 22 pasos. Es conocido en la música turca y árabe. Ofrece una aproximación muy buena a la "quinta neutra" y a intervalos basados en el séptimo armónico (séptima menor pura), abriendo un nuevo mundo de posibilidades armónicas que no existen en 12-EDO.',
    scale: { name: 'Escala Cromática de 22-EDO', ratios: edoRatios(22) },
    chords: [
      { name: 'Acorde "Mágico" (0-7-12)', intervals: [0, 7, 12] }, // 7th harmonic chord
      { name: 'Tríada Submenor (0-6-15)', intervals: [0, 6, 15] },
    ],
    piece: {
      name: '22edo',
      audioUrl: 'https://raw.githubusercontent.com/jorgequintana-cyber/Resonancias_Ocultas/main/22EDO.mp3',
      noteSequence: [
        { note: 0, duration: 0.5 }, { note: 4, duration: 0.25 }, { note: 7, duration: 0.5 }, { note: 10, duration: 0.25 },
        { note: 12, duration: 0.5 }, { note: 15, duration: 0.5 }, { note: 18, duration: 0.5 }, { note: 22, duration: 1.0 }
      ]
    }
  },
  {
    id: '31edo',
    name: '31-EDO',
    baseFrequency: 261.63,
    description: '31-EDO es un sistema de temperamento mesotónico que ofrece quintas ligeramente temperadas y terceras mayores casi perfectamente puras. Fue propuesto por teóricos como Christiaan Huygens. Es excelente para música renacentista y barroca, y permite modulaciones a tonalidades lejanas sin la "quinta del lobo".',
    scale: { name: 'Escala Cromática de 31-EDO', ratios: edoRatios(31) },
    chords: [
      { name: 'Acorde Mayor Puro', intervals: [0, 10, 18] },
      { name: 'Acorde Menor Puro', intervals: [0, 8, 18] },
    ],
    piece: {
      name: 'Overjoy',
      audioUrl: 'https://raw.githubusercontent.com/jorgequintana-cyber/Resonancias_Ocultas/main/31EDO.mp3',
      noteSequence: [
        { note: 0, duration: 0.4 }, { note: 10, duration: 0.4 }, { note: 18, duration: 0.8 }, { note: 23, duration: 0.4 },
        { note: 31, duration: 0.8 }, { note: 28, duration: 0.4 }, { note: 18, duration: 0.8 }
      ]
    }
  },
  {
    id: 'bohlen-pierce',
    name: 'Bohlen-Pierce',
    baseFrequency: 174.61, // F3
    description: 'La escala Bohlen-Pierce es una escala no-octava. Se repite en la "tritava" (relación 3:1) en lugar de la octava (2:1), y se divide en 13 pasos. Utiliza solo armónicos impares (3, 5, 7, 9...), lo que le da un sonido radicalmente diferente, consonante a su manera, pero ajeno a la tradición occidental.',
    scale: { name: 'Escala Cromática B-P', ratios: bpRatios() },
    chords: [
      { name: 'Acorde "Mayor" BP', intervals: [0, 4, 7] },
      { name: 'Acorde "Menor" BP', intervals: [0, 3, 7] },
    ],
    piece: {
      name: 'Sevish',
      audioUrl: 'https://raw.githubusercontent.com/jorgequintana-cyber/Resonancias_Ocultas/main/BPED3.mp3'
    }
  }
];