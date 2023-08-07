import { CharStream, CommonTokenStream } from 'antlr4';

import TekkenNotationSevenLexer from './parser/TekkenNotationSevenLexer';
import TekkenNotationSevenParser from './parser/TekkenNotationSevenParser';
import type  { TekkenCombo } from './types';
import { TekkenVisitor } from './visitor';

export * from './types';
export * from './visitor';

/**
 * Parse a Tekken combo notation string into a TekkenCombo object.
 * @param {string} notation
 * @example parseTekkenNotation('d/f,2;b,4');
 */
export function parseTekkenNotation(notation: string): TekkenCombo {
    const charStream = new CharStream(notation);

    const lexer = new TekkenNotationSevenLexer(charStream);
    const tokens = new CommonTokenStream(lexer);
    const parser = new TekkenNotationSevenParser(tokens);

    parser.buildParseTrees = true;

    const tree = parser.combo();

    const visitor = new TekkenVisitor();

    return visitor.visit(tree) as TekkenCombo;
}
