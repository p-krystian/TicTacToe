import BoardField from '@/components/BoardField/BoardField';
import { View } from '@/components/ui';
import { GameBoardT } from '@/utils/types';
import { useEffect, useReducer } from 'react';

type ReducerAction =
  | { type: 'player-move'; payload: keyof GameBoardT }
  | { type: 'bot-move' }
  | { type: 'reset' }
  | { type: 'unlock' };

type GameState = {
  boardState: GameBoardT;
  nextSymbol: 'x' | 'o';
  wonSymbol: 'x' | 'o' | 'xo' | null;
  isLocked: boolean;
  isBotTurn: boolean;
};

const getInitState = () => {
  const botFirst = Math.random() > 0.5;

  return {
    boardState: { ...fieldsBoard },
    nextSymbol: Math.random() > 0.5 ? 'x' : 'o',
    wonSymbol: null,
    isLocked: botFirst,
    isBotTurn: botFirst
  } as GameState;
};

// prettier-ignore
const fieldsBoard = {
  A0: null, A1: null, A2: null,
  B0: null, B1: null, B2: null,
  C0: null, C1: null, C2: null
} as GameBoardT;

const getWonSymbol = (state: GameBoardT) => {
  if (state.A0 === state.A1 && state.A1 === state.A2 && state.A1) return state.A0;
  if (state.B0 === state.B1 && state.B1 === state.B2 && state.B1) return state.B0;
  if (state.C0 === state.C1 && state.C1 === state.C2 && state.C1) return state.C0;

  if (state.A0 === state.B0 && state.B0 === state.C0 && state.B0) return state.A0;
  if (state.A1 === state.B1 && state.B1 === state.C1 && state.B1) return state.A1;
  if (state.A2 === state.B2 && state.B2 === state.C2 && state.B2) return state.A2;

  if (state.A0 === state.B1 && state.B1 === state.C2 && state.B1) return state.B1;
  if (state.A2 === state.B1 && state.B1 === state.C0 && state.B1) return state.B1;

  if (Object.values(state).every(field => field)) return 'xo';

  return null;
};

function reducer(state: GameState, action: ReducerAction) {
  const newState = { ...state };
  const nextSymbol = state.nextSymbol === 'x' ? 'o' : 'x';

  switch (action.type) {
    case 'player-move':
      if (state.isLocked || state.boardState[action.payload]) return state;
      newState.boardState[action.payload] = state.nextSymbol;
      newState.nextSymbol = nextSymbol;
      newState.isLocked = true;
      newState.wonSymbol = getWonSymbol(newState.boardState);
      newState.isBotTurn = true;
      return newState;
    case 'bot-move':
      if (state.wonSymbol) return state;
      const emptyFields = Object.keys(state.boardState).filter(
        key => !state.boardState[key as keyof GameBoardT]
      );
      const randomIndex = Math.floor(Math.random() * emptyFields.length);
      const randomField = emptyFields[randomIndex] as keyof GameBoardT;
      newState.boardState[randomField] = state.nextSymbol;
      newState.nextSymbol = nextSymbol;
      newState.isLocked = true;
      newState.wonSymbol = getWonSymbol(newState.boardState);
      newState.isBotTurn = false;
      return newState;
    case 'reset':
      return getInitState();
    case 'unlock':
      newState.isLocked = false;
      return newState;
  }

  return newState;
}

function GameBoard() {
  const [gameState, dispatch] = useReducer(reducer, getInitState());

  useEffect(() => {
    const action = gameState.wonSymbol ? 'reset' : gameState.isBotTurn ? 'bot-move' : 'unlock';
    const timeout = setTimeout(() => dispatch({ type: action }), gameState.wonSymbol ? 2000 : 300);

    return () => clearTimeout(timeout);
  }, [gameState]);

  return (
    <View className="bg-content border-card size-96 flex-row flex-wrap content-between justify-between border-6">
      {Object.entries(gameState.boardState).map(([index, field]) => (
        <BoardField
          key={index}
          symbol={field}
          fill={gameState.wonSymbol === field || gameState.wonSymbol === 'xo'}
          onChoose={() => dispatch({ type: 'player-move', payload: index as keyof GameBoardT })}
        />
      ))}
    </View>
  );
}

export default GameBoard;
