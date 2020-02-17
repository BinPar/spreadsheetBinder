import { DataTable } from "./types/tables";

export interface State {
  currentStep: number;
  maxStep: number;
  tables: DataTable[];  
}

const state: State  = {
  currentStep: 0,
  maxStep: 0,
  tables: [null, null],
};

export default state;
