import { DataTable } from './types/tables';
import { State } from './state';
import { CompareTypes } from './types/action';

export const cleanStringForAssociation = (
  source: string,
  type: CompareTypes,
): string => {
  if (!source) {
    return '';
  }

  let value = source.toLowerCase();
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  value = value.replace(/[^a-zA-Z0-9*@]/g, ' ').trim();
  while (value.indexOf('  ') >= 0) {
    value = value.replace(/ {2}/g, ' ');
  }
  switch (type) {
    case 'dni':
      return value.replace(/\*/g, '').replace(/ /g, '');
    case 'email':
      return value.replace(/ /g, '');
    default:
      return value;
  }
};

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
      const cleanTargets = tableB.body.map((tableBRow): string =>
        cleanStringForAssociation(
          tableBRow[association.targetCol],
          association.type,
        ),
      );
      tableA.body.forEach((tableARow, tableAIndex): void => {
        const value = cleanStringForAssociation(
          tableARow[index],
          association.type,
        );
        if (value) {
          cleanTargets.forEach((target, tableBIndex): void => {
            if (target) {
              let match = false;
              switch (association.type) {
                case 'string':
                  match = value === target;
                  break;
                case 'dni':
                  {
                    let preMatchPosition = value.lastIndexOf(target);
                    if (preMatchPosition  !== -1) {
                      preMatchPosition += target.length;
                      preMatchPosition = value.length - preMatchPosition;
                      const targetValue = cleanStringForAssociation(tableB.body[tableBIndex][association.targetCol], 'string').replace(/\*/g, ' ');
                      const rightStars = targetValue.length - targetValue.trimRight().length;
                      match = preMatchPosition === rightStars;
                    }
                  }
                  break;
                case 'postal':
                  match = value.indexOf(target) !== -1;
                  break;
                case 'email':
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
    let maxBindingValue = 0;
    let maxBindingTargetRowNum = 0;
    Object.keys(bindings[sourceRowNum]).forEach((targetRow: string) => {
      const targetRowNum = parseInt(targetRow, 10);
      if (bindings[sourceRowNum][targetRowNum] > maxBindingValue) {
        maxBindingValue = bindings[sourceRowNum][targetRowNum];
        maxBindingTargetRowNum = targetRowNum;
      }
    });
    const row = [
      ...tableA.body[sourceRowNum],
      bindings[sourceRowNum][maxBindingTargetRowNum].toString(),
      ...tableB.body[maxBindingTargetRowNum],
    ];
    result.body.push(row);
  });

  return result;
};

export default processResult;
