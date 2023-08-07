export enum TekkenInstructionType {
    UNKNOWN = 'UNKNOWN',
    MOVEMENT = 'MOVEMENT',
    ACTION = 'ACTION',
    SPECIAL = 'SPECIAL',
    TEXT = 'TEXT',
    CONTROL = 'CONTROL',
    HIDDEN = 'HIDDEN',
}

export interface TekkenInput {
    notation: string;
}

export interface TekkenInstruction {
    type: TekkenInstructionType;
    notation: string;
    slug: string;
    inputs: TekkenInput[];
}

export interface TekkenMove {
    notation: string;
    instructions: TekkenInstruction[];
}

export interface TekkenCombo {
    moves: TekkenMove[];
}
