import { State } from './state';
import { Action } from './types/action';
import processDataText from './processDataText';

const reducer = (current: State, action: Action): State => {
  switch (action.type) {
    case 'paste': {
      const resultData = processDataText(action.text);
      const result = {
        ...current,
        tables: [...current.tables],
      };
      if (resultData && resultData.body && resultData.body.length) {
        result.maxStep = Math.max(action.tableIndex + 1, result.maxStep);
        if (result.maxStep > 2) {
          result.maxStep = 2;
        }
      }
      result.tables[action.tableIndex] = resultData;
      return result;
    }
    case 'next': {
      return {
        ...current,
        currentStep: Math.min(current.currentStep + 1, current.maxStep),
      };
    }
    case 'jump': {
      return {
        ...current,
        currentStep: Math.min(action.step, current.maxStep),
      };
    }
    default:
      return current;
  }
};

export default reducer;
