import BoardField from '@/components/BoardField/BoardField';
import { View } from '@/components/ui';
import { GameBoardT } from '@/utils/types';
import { useEffect, useReducer, useRef } from 'react';

type GameState = {
  board: GameBoardT;
  next: 'x' | 'o';
  won: 'x' | 'o' | 'xo' | null;
  locked: boolean;
  botTurn: boolean;
};

const KEYS = ['A0', 'A1', 'A2', 'B0', 'B1', 'B2', 'C0', 'C1', 'C2'] as const;
const WINS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6] // diags
] as const;

const checkWin = (b: GameBoardT): GameState['won'] => {
  for (const [a, c, d] of WINS) {
    const v = b[KEYS[a]];
    if (v && v === b[KEYS[c]] && v === b[KEYS[d]]) return v;
  }
  return KEYS.every(k => b[k]) ? 'xo' : null;
};

const initState = (): GameState => {
  const botFirst = Math.random() > 0.5;
  return {
    board: Object.fromEntries(KEYS.map(k => [k, null])) as GameBoardT,
    next: Math.random() > 0.5 ? 'x' : 'o',
    won: null,
    locked: botFirst,
    botTurn: botFirst
  };
};

type Action =
  | { type: 'move'; key: keyof GameBoardT }
  | { type: 'bot-move' }
  | { type: 'reset' }
  | { type: 'unlock' };

const reducer = (s: GameState, a: Action): GameState => {
  if (a.type === 'reset') return initState();
  if (a.type === 'unlock') return { ...s, locked: false };

  const isBot = a.type === 'bot-move';
  const emptyKeys = KEYS.filter(k => !s.board[k]);
  const key = isBot ? emptyKeys[(Math.random() * emptyKeys.length) | 0] : a.key;

  if ((s.locked && !isBot) || s.board[key] || s.won) return s;

  const board = { ...s.board, [key]: s.next };
  return {
    board,
    next: s.next === 'x' ? 'o' : 'x',
    won: checkWin(board),
    locked: true,
    botTurn: !isBot
  };
};

export default function GameBoard() {
  const [{ board, won, botTurn }, dispatch] = useReducer(reducer, null, initState);
  const handlers = useRef<Record<string, () => void>>({});

  if (!handlers.current.A0) {
    KEYS.forEach(k => (handlers.current[k] = () => dispatch({ type: 'move', key: k })));
  }

  useEffect(() => {
    const delay = won ? 2000 : 300;
    const action: Action = won
      ? { type: 'reset' }
      : botTurn
        ? { type: 'bot-move' }
        : { type: 'unlock' };
    const id = setTimeout(() => dispatch(action), delay);
    return () => clearTimeout(id);
  }, [won, botTurn]);

  return (
    <View className="bg-content border-card size-96 flex-row flex-wrap content-between justify-between border-6">
      {KEYS.map(k => (
        <BoardField
          key={k}
          symbol={board[k]}
          fill={won?.includes(board[k] ?? '-') ?? false}
          onChoose={handlers.current[k]}
        />
      ))}
    </View>
  );
}
