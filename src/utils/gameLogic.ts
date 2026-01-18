import { GameBoardT, GameStateT } from '@/utils/types';

// prettier-ignore
const gameKeys = [
  'A0', 'A1', 'A2',
  'B0', 'B1', 'B2',
  'C0', 'C1', 'C2'
] as const;

const winOptions = [
  [0, 1, 2], // row A
  [3, 4, 5], // row B
  [6, 7, 8], // row C
  [0, 3, 6], // col 0
  [1, 4, 7], // col 1
  [2, 5, 8], // col 2
  [0, 4, 8], // diag A0-C2
  [2, 4, 6] // diag A2-C0
] as const;

const getCleanState = (): GameStateT => {
  const botFirst = Math.random() > 0.5;

  return {
    board: Object.fromEntries(gameKeys.map(k => [k, null])) as GameBoardT,
    next: Math.random() > 0.5 ? 'x' : 'o',
    wonKeys: [],
    locked: botFirst,
    botTurn: botFirst
  };
};

const getWonKeys = (board: GameBoardT): GameStateT['wonKeys'] => {
  const wonKeys = [] as (typeof gameKeys)[number][];

  for (const [a, c, d] of winOptions) {
    const v = board[gameKeys[a]];
    if (v && v === board[gameKeys[c]] && v === board[gameKeys[d]]) {
      wonKeys.push(gameKeys[a], gameKeys[c], gameKeys[d]);
    }
  }
  if (!wonKeys.length && Object.values(board).every(v => v)) {
    return [...gameKeys];
  }

  return wonKeys;
};

export { getCleanState, getWonKeys };
