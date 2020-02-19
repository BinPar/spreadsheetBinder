export interface MoveNext {
  type: 'next';
}

export interface MoveBack {
  type: 'back';
}


export interface Process {
  type: 'process';
}

export interface JumpTo {
  type: 'jump';
  step: number;
}

export interface PasteTextAction {
  type: 'paste';
  tableIndex: number;
  text: string;
}

export interface SetColumnAction {
  type: 'setColumn';
  index: number;
  toColumn: number;
}

export type CompareTypes = 'string' | 'dni' | 'postal' | 'email';

export interface SetTypeAction {
  type: 'setType';
  index: number;
  toType?: CompareTypes;
}

export interface SetValueAction {
  type: 'setValue';
  index: number;
  toValue: number;
}

export type Action =
  | PasteTextAction
  | MoveNext
  | MoveBack
  | JumpTo
  | SetColumnAction
  | SetTypeAction
  | SetValueAction
  | Process;
