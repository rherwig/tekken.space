export type InstructionType = 'action' | 'movement' | 'compound' | 'text' | 'special' | 'unknown';
export type CombinatorType = '+' | '/' | ':' | '~' | '<';

export interface ParsedCombo {
    notation: string;
    moves: ParsedMove[];
}

export interface ParsedMove {
    notation: string;
    instructions: ParsedInstruction[];
}

export interface ParsedInstruction {
    notation: string;
    type: InstructionType;
    children: ParsedChildInstruction[];
}

export interface ParsedChildInstruction extends ParsedInstruction {
    combinator?: CombinatorType;
}
