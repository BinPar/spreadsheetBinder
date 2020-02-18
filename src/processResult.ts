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
    if (
      association.value &&
      association.type &&
      association.targetCol !== undefined
    ) {
      tableA.body.forEach((tableARow, tableAIndex): void => {
        const value = tableARow[index] || '';
        if (value) {
          tableB.body.forEach((tableBRow, tableBIndex): void => {
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
                if (!bindings[tableAIndex]) {
                  bindings[tableAIndex] = {};
                }
                if (!bindings[tableAIndex][tableBIndex]) {
                  bindings[tableAIndex][tableBIndex] = 0;
                }
                bindings[tableAIndex][tableBIndex] += association.value;
              }
            }
          });
        }
      });
    }
  });

  Object.keys(bindings).forEach((sourceRow: string) => {
    const sourceRowNum = parseInt(sourceRow, 10);
    Object.keys(bindings[sourceRowNum]).forEach((targetRow: string) => {
      const targetRowNum = parseInt(targetRow, 10);
      const row = [
        ...tableA.body[sourceRowNum],
        bindings[sourceRowNum][targetRowNum].toString(),
        ...tableB.body[targetRowNum],
      ];
      result.body.push(row);
    });
  });

  return result;
};

export default processResult;
