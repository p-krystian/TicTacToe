import BoardField from '@/components/BoardField/BoardField';
import { View } from '@/components/ui';
import useTransitionDuration from '@/hooks/useTransitionDuration';
import { getCleanState } from '@/utils/gameLogic';
import { GameBoardT } from '@/utils/types';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import reducer from './gameReducer';

function GameBoard() {
  const { t } = useTranslation();
  const [{ board, botTurn, wonKeys, next }, dispatch] = useReducer(reducer, null, getCleanState);
  const unlockTimeout = useTransitionDuration('default');
  const resetTimeout = useTransitionDuration('xSlow');

  const gameStatus = useMemo(() => {
    if (wonKeys.length > 0) {
      const isDraw = wonKeys.length === 9;
      return isDraw ? t('gameDraw') : t('gameWon', { symbol: next === 'x' ? 'O' : 'X' });
    }
    return botTurn ? t('botTurn') : t('yourTurn', { symbol: next });
  }, [wonKeys, botTurn, next, t]);

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
    <View 
      className="bg-content border-card shadow-center size-96 flex-row flex-wrap content-between justify-between border-6"
      accessibilityLabel={t('gameBoard')}
      accessibilityHint={gameStatus}
    >
      {Object.entries(board).map(([key, value]) => (
        <BoardField
          key={key}
          symbol={value}
          fill={wonKeys.includes(key)}
          onChoose={wonKeys.length ? null : userMove(key as keyof GameBoardT)}
          position={key}
        />
      ))}
    </View>
  );
}

export default GameBoard;
