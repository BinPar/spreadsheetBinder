import { DataTable } from './types/tables';
import { State } from './state';

const processResult = (state: State): DataTable => {
  const [tableA, tableB] = state.tables;
  if (!tableA || !tableB) {
    return null;
  }
  if (!tableA.body.length || !tableB.body.length) {
    return null;
  }
  const result: DataTable = {
    headers: [
      ...state.tables[0].headers,
      'Puntuación',
      ...state.tables[1].headers,
    ],
    body: [],
  };

  interface ValuesPerRow {
    [id: number]: number;
  }
  interface Bindings {
    [id: number]: ValuesPerRow;
  }

  const bindings: Bindings = {};

  state.associations.forEach((association, index): void => {
    if (association.value && association.type && association.targetCol) {
      tableA.body.forEach((tableARow): void => {
        const value = tableARow[index] || '';
        if (value) {
          tableB.body.forEach((tableBRow): void => {
            const target = tableBRow[association.targetCol] || '';
            if (target) {
              let match = false;
              switch (association.type) {
                case 'string':                  
                  match = value === target;
                  break;
                default:
                  match = false;
                  break;
              }
              if (match) {
                if (!bindings[index]) {
                  bindings[index] = {};
                }
                if (!bindings[index][association.targetCol]) {
                  bindings[index][association.targetCol] = 0;
                }
                bindings[index][association.targetCol] += association.value;
              }
            }
          });
        }
      });
    }
  });
  return result;
};

export default processResult;
