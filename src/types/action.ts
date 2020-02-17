export interface BasicAction {
  type: string;
}

export interface MoveNext {
  type: 'next';
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

export type CompareTypes = 'string' | 'dni' | 'postal';


export interface SetTypeAction {
  type: 'setType';
  index: number;
  toType?:  CompareTypes;
}

export interface SetValueAction {
  type: 'setValue';
  index: number;
  toValue: number;
}


export type Action = PasteTextAction | MoveNext | JumpTo | SetColumnAction | SetTypeAction | SetValueAction;