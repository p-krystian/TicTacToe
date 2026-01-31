import BoardField from '@/components/BoardField/BoardField';
import { View } from '@/components/ui';
import useTransitionDuration from '@/hooks/useTransitionDuration';
import { getCleanState, getWonKeys } from '@/utils/gameLogic';
import { GameBoardT, GameStateT } from '@/utils/types';
import { useCallback, useEffect, useReducer } from 'react';

type ReducerAction =
  | { type: 'move'; key: keyof GameBoardT }
  | { type: 'bot-move' }
  | { type: 'reset' }
  | { type: 'unlock' };

const reducer = (state: GameStateT, action: ReducerAction): GameStateT => {
  const onMove = (key: keyof GameBoardT, botNext: boolean) => {
    const newState = { ...state, board: { ...state.board } };
    newState.board[key] = newState.next;
    newState.next = newState.next === 'x' ? 'o' : 'x';
    newState.botTurn = botNext;
    newState.wonKeys = getWonKeys(newState.board);
    newState.locked = true;
    return newState;
  };

  switch (action.type) {
    case 'move': {
      if (state.board[action.key] || state.locked) {
        return state;
      }
      return onMove(action.key, true);
    }
    case 'bot-move': {
      const emptyKeys = Object.keys(state.board).filter(
        key => !state.board[key as keyof GameBoardT]
      );
      const randomKey = emptyKeys[Math.floor(Math.random() * emptyKeys.length)] as keyof GameBoardT;
      return onMove(randomKey, false);
    }
    case 'reset': {
      return getCleanState();
    }
    case 'unlock': {
      return { ...state, locked: false };
    }
  }
  return state;
};

function GameBoard() {
  const [{ board, botTurn, wonKeys }, dispatch] = useReducer(reducer, null, getCleanState);
  const unlockTimeout = useTransitionDuration('default');
  const resetTimeout = useTransitionDuration('xSlow');

  const userMove = useCallback(
    (key: keyof GameBoardT) => () => dispatch({ type: 'move', key: key }),
    []
  );

  useEffect(() => {
    const gameEnd = wonKeys.length > 0;
    const action = gameEnd ? 'reset' : botTurn ? 'bot-move' : 'unlock';
    const timeout = setTimeout(
      () => dispatch({ type: action }),
      gameEnd ? Math.max(500, resetTimeout) : unlockTimeout
    );

    return () => clearTimeout(timeout);
  }, [board, botTurn, wonKeys, unlockTimeout, resetTimeout]);

  return (
    <View className="bg-content border-card shadow-center size-96 flex-row flex-wrap content-between justify-between border-6">
      {Object.entries(board).map(([key, value]) => (
        <BoardField
          key={key}
          symbol={value}
          fill={wonKeys.includes(key)}
          onChoose={wonKeys.length ? null : userMove(key as keyof GameBoardT)}
        />
      ))}
    </View>
  );
}

export default GameBoard;
