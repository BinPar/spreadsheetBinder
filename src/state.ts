import { DataTable } from './types/tables';
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


const state: State = {
  currentStep: 0,
  maxStep: 0,
  tables: [null, null],
  associations: null,
  result: null,
};

export default state;
