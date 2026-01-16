import { View } from '@/components/ui';
import { GameBoardT } from '@/utils/types';
import { useCallback, useRef, useState } from 'react';
import BoardField from '../BoardField/BoardField';

// prettier-ignore
const fieldsBoard = {
  A0: null, A1: null, A2: null,
  B0: null, B1: null, B2: null,
  C0: null, C1: null, C2: null
} as GameBoardT;

function GameBoard() {
  const [gameState, setGameState] = useState<GameBoardT>({ ...fieldsBoard });
  const nextSymbol = useRef<'x' | 'o'>(Math.random() < 0.5 ? 'x' : 'o');

  const chooseField = useCallback((index: keyof typeof fieldsBoard) => {
    setGameState(prev => {
      if (prev[index]) {
        return prev;
      }
      const newState = { ...prev };
      newState[index] = nextSymbol.current;
      return newState;
    });
    nextSymbol.current = nextSymbol.current === 'x' ? 'o' : 'x';
  }, []);

  return (
    <View className="bg-content border-card size-96 flex-row flex-wrap content-between justify-between border-6">
      {Object.entries(gameState).map(([index, field]) => (
        <BoardField
          key={index}
          symbol={field}
          onChoose={() => chooseField(index as keyof typeof fieldsBoard)}
        />
      ))}
    </View>
  );
}

export default GameBoard;
