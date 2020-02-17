import { useReducer, Dispatch } from 'react';
import state, { State } from '../src/state';
import reducer from '../src/reducer';
import { Action } from '../src/types/action';

const useAppReducer = (): [State, Dispatch<Action>] => {
  const [current, dispatch] = useReducer(reducer, state);
  return [current, dispatch];
}

export default useAppReducer;
