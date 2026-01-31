type BoardKey = 'A0' | 'A1' | 'A2' | 'B0' | 'B1' | 'B2' | 'C0' | 'C1' | 'C2';
type CellValue = 'x' | 'o' | null;

type GameBoardT = Record<BoardKey, CellValue>;

type GameStateT = {
  board: GameBoardT;
  next: 'x' | 'o';
  wonKeys: (keyof GameBoardT)[number][];
  locked: boolean;
  botTurn: boolean;
};

export { type GameBoardT, type GameStateT };
