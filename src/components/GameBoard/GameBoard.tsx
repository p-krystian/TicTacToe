import BoardField from '@/components/BoardField/BoardField';
import { View } from '@/components/ui';
import useTransitionDuration from '@/hooks/useTransitionDuration';
import { getCleanState } from '@/utils/gameLogic';
import { GameBoardT } from '@/utils/types';
import { useCallback, useEffect, useReducer } from 'react';
import reducer from './gameReducer';

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
