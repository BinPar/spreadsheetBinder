import { DataTable } from './types/tables';
import processDataText from './processDataText';
import dataFromEMP from '../test/data/dataFromEMP';
import dataFromMIR from '../test/data/dataFromMIR';
import { CompareTypes } from './types/action';

export interface Association {
  targetCol?: number;
  type?: CompareTypes;
  value: number;
}

export interface State {
  currentStep: number;
  maxStep: number;
  tables: DataTable[];
  associations: Association[];
  result: DataTable;
}

const empData = processDataText(dataFromEMP);

const state: State = {
  currentStep: 2,
  maxStep: 2,
  tables: [empData, processDataText(dataFromMIR)],
  associations: empData.headers.map(
    (): Association => ({
      value: 0,
    }),
  ),
  result: null,
};

export default state;
