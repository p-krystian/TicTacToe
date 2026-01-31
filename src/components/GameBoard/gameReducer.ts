import { getCleanState, getWonKeys } from "@/utils/gameLogic";
import { GameBoardT, GameStateT } from "@/utils/types";

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

export default reducer;
