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

export type Action = PasteTextAction | MoveNext | JumpTo;