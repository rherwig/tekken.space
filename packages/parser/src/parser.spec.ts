import { describe, expect, it } from 'vitest';

import { parseTekkenNotation } from './parser';

describe('parser', () => {
    describe('basics', () => {
        it('parses a single action', () => {
            const { moves } = parseTekkenNotation('1');

            expect(moves.length).toBe(1);
            expect(moves[0].instructions.length).toBe(1);
            expect(moves[0].instructions[0].type).toBe('action');
            expect(moves[0].instructions[0].notation).toBe('1');
        });

        it('parses a single movement', () => {
            const { moves } = parseTekkenNotation('f');

            expect(moves.length).toBe(1);
            expect(moves[0].instructions.length).toBe(1);
            expect(moves[0].instructions[0].type).toBe('movement');
            expect(moves[0].instructions[0].notation).toBe('f');
        });
    });

    describe('combinators', () => {
        it('parses a combined action', () => {
            const { moves } = parseTekkenNotation('1+2');

            expect(moves.length).toBe(1);
            expect(moves[0].instructions.length).toBe(1);

            expect(moves[0].instructions[0].type).toBe('action');
            expect(moves[0].instructions[0].notation).toBe('1+2');

            expect(moves[0].instructions[0].children.length).toBe(2);
            expect(moves[0].instructions[0].children[0].notation).toBe('1');
            expect(moves[0].instructions[0].children[0].type).toBe('action');
            expect(moves[0].instructions[0].children[1].notation).toBe('2');
            expect(moves[0].instructions[0].children[1].type).toBe('action');
        });

        it('parses a combined movement', () => {
            const { moves } = parseTekkenNotation('d/f');

            expect(moves.length).toBe(1);
            expect(moves[0].instructions.length).toBe(1);

            expect(moves[0].instructions[0].type).toBe('movement');
            expect(moves[0].instructions[0].notation).toBe('d/f');

            expect(moves[0].instructions[0].children.length).toBe(2);
            expect(moves[0].instructions[0].children[0].notation).toBe('d');
            expect(moves[0].instructions[0].children[0].type).toBe('movement');
            expect(moves[0].instructions[0].children[1].notation).toBe('f');
            expect(moves[0].instructions[0].children[1].type).toBe('movement');
        });
    });
});
