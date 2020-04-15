import { State, Association } from './state';
import { Action } from './types/action';
import processDataText from './processDataText';
import processResult from './processResult';

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

      result.associations = result.tables[0].headers.map(
        (): Association => ({
          value: 0,
        }),
      );

      return result;
    }
    case 'next': {
      return {
        ...current,
        currentStep: Math.min(current.currentStep + 1, current.maxStep),
      };
    }
    case 'back': {
      return {
        ...current,
        currentStep: Math.max(current.currentStep - 1, 0),
      };
    }
    case 'jump': {
      return {
        ...current,
        currentStep: Math.min(action.step, current.maxStep),
      };
    }
    case 'setColumn' : {
      const result =  {
        ...current,
        associations: [...current.associations],
      };
      if (action.index < result.associations.length) {
        result.associations[action.index] = {
          ...result.associations[action.index],
          targetCol: action.toColumn === -1 ? undefined : action.toColumn,
        };
      }
      return result;
    }
    case 'setType' : {
      const result =  {
        ...current,
        associations: [...current.associations],
      };
      if (action.index < result.associations.length) {
        result.associations[action.index] = {
          ...result.associations[action.index],
          type: action.toType,
        };
      }
      return result;
    }
    case 'setValue' : {
      const result =  {
        ...current,
        associations: [...current.associations],
      };
      if (action.index < result.associations.length) {
        result.associations[action.index] = {
          ...result.associations[action.index],
          value: action.toValue,
        };
      }
      return result;
    }
    case 'process' : {
      const result = {
        ...current,      
      };
      
      result.result = processResult(result);
      if (result.result) {
        result.maxStep = 3;
        result.currentStep = 3;
      }      
      return result;
    }
    default:
      return current;
  }
};

export default reducer;
