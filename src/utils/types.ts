type GameBoardT = {
  A0: 'x' | 'o' | null;
  A1: 'x' | 'o' | null;
  A2: 'x' | 'o' | null;
  B0: 'x' | 'o' | null;
  B1: 'x' | 'o' | null;
  B2: 'x' | 'o' | null;
  C0: 'x' | 'o' | null;
  C1: 'x' | 'o' | null;
  C2: 'x' | 'o' | null;
};

type GameStateT = {
  board: GameBoardT;
  next: 'x' | 'o';
  wonKeys: (keyof GameBoardT)[number][];
  locked: boolean;
  botTurn: boolean;
};

export { type GameBoardT, type GameStateT };
