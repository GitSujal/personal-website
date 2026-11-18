/**
 * The three data sources on the homepage, shared by the page (DataSea.astro), the controller and the 3D
 * world, so names, colours and the lesson stay in one place. Positions are scene units.
 */
export type Method = 'none' | 'bucket' | 'pulley' | 'conveyor';

export const SOURCES = [
  {
    letter: 'A',
    name: 'On-demand',
    color: '#f5a524',
    x: -10,
    z: 1.8,
    pattern: 'Drops 100 rows only when a bucket sits on its pad. No request, no data.',
    best: 'bucket' as Method,
    start: 'bucket' as Method,
  },
  {
    letter: 'B',
    name: 'Batch',
    color: '#3ec1d3',
    x: -7,
    z: -5.6,
    pattern: 'Drops 100 rows every ~12 s into a tray that holds one drop. Miss a pickup and it overflows.',
    best: 'pulley' as Method,
    start: 'pulley' as Method,
  },
  {
    letter: 'C',
    name: 'Stream',
    color: '#b58cff',
    x: -1.6,
    z: -9.6,
    pattern: 'Rains rows without stopping. Whatever nothing catches falls into the sea.',
    best: 'conveyor' as Method,
    start: 'conveyor' as Method,
  },
] as const;

export const METHODS: { id: Method; name: string; cost: string }[] = [
  { id: 'bucket', name: 'Bucket', cost: '$1 per run' },
  { id: 'pulley', name: 'Pulley', cost: '$1 per round trip' },
  { id: 'conveyor', name: 'Conveyor', cost: '$0.10 per second' },
  { id: 'none', name: 'Off', cost: 'free, and everything is lost' },
];

export const PULLEY_EVERY = [12, 6] as const;
export const BATCH_EVERY = 12;
