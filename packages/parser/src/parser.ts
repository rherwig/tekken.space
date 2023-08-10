import type { Token } from 'typescript-parsec';
import {
    alt_sc,
    apply,
    buildLexer,
    expectSingleResult,
    kmid,
    list_sc,
    opt_sc,
    rule,
    seq,
    tok,
} from 'typescript-parsec';

import type {
    CombinatorType,
    ParsedInstruction,
    InstructionType,
    ParsedMove,
    ParsedChildInstruction,
    ParsedCombo,
} from './types';

enum TokenKind {
    Space,
    Action,
    Movement,
    Text,
    Special,
    Comma,
    SemiColon,
    Plus,
    Slash,
    Colon,
    Tilde,
    LessThan,
    Quote,
    LeftBracket,
    RightBracket,
}

const tokenizer = buildLexer([
    [true, /^\s+/g, TokenKind.Space],
    [true, /^[1234]/g, TokenKind.Action],
    [true, /^[ufdbn]{1,2}/gi, TokenKind.Movement],
    [true, /^(CH|WS|S!|SS|FC)/gi, TokenKind.Special],
    [true, /^[a-z\s]+/gi, TokenKind.Text],
    [true, /^,\s?/g, TokenKind.Comma],
    [true, /^;/g, TokenKind.SemiColon],
    [true, /^\+/g, TokenKind.Plus],
    [true, /^\//g, TokenKind.Slash],
    [true, /^:/g, TokenKind.Colon],
    [true, /^~/g, TokenKind.Tilde],
    [true, /^</g, TokenKind.LessThan],
    [true, /^"/g, TokenKind.Quote],
    [true, /^\(/g, TokenKind.LeftBracket],
    [true, /^\)/g, TokenKind.RightBracket],
]);

const applyActionInstruction = (
    token: Token<TokenKind.Action>,
): ParsedInstruction => {
    return {
        notation: token.text,
        type: 'action',
        children: [],
    };
};

const applyMovementInstruction = (
    token: Token<TokenKind.Movement>,
): ParsedInstruction => {
    let notation = token.text;
    let children: ParsedChildInstruction[] = [];

    const inputs = notation.split('');

    if (inputs.length > 1) {
        children = inputs.map((input) => {
            return {
                notation: input,
                type: 'movement',
                combinator: '/',
                children: [],
            };
        });

        notation = inputs.join('/');
    }

    return {
        type: 'movement',
        notation,
        children,
    };
};

const applyInstruction = (
    instruction: ParsedInstruction,
): ParsedInstruction => {
    return instruction;
};

const applyCombinator = (
    value: [Token<TokenKind>, Token<TokenKind> | undefined, ParsedInstruction],
): ParsedInstruction => {
    const [instructionToken, combinatorToken, instruction] = value;

    let type: InstructionType = 'unknown';
    let combinator: CombinatorType | undefined =
        combinatorToken?.text as CombinatorType;

    switch (instructionToken.kind) {
        case TokenKind.Action:
            type = 'action';
            combinator = combinator ?? '+';
            break;
        case TokenKind.Movement:
            type = 'movement';
            combinator = combinator ?? '/';
            break;
        default:
            combinator = combinator ?? '';
            break;
    }

    return {
        type,
        notation: `${instructionToken.text}${combinator}${instruction.notation}`,
        children: [
            {
                type,
                notation: instructionToken.text,
                combinator: combinator,
                children: [],
            },
            instruction,
        ],
    };
};

const applyCompoundInstruction = (
    value: [ParsedInstruction, Token<TokenKind>, ParsedInstruction],
): ParsedInstruction => {
    const [leftInstruction, combinatorToken, rightInstruction] = value;

    return {
        type: 'compound',
        notation: `${leftInstruction.notation}${combinatorToken.text}${rightInstruction.notation}`,
        children: [leftInstruction, rightInstruction],
    };
};

const INSTRUCTION = rule<TokenKind, ParsedInstruction>();
const ACTION_INSTRUCTION = rule<TokenKind, ParsedInstruction>();
const MOVEMENT_INSTRUCTION = rule<TokenKind, ParsedInstruction>();
const TEXT_INSTRUCTION = rule<TokenKind, ParsedInstruction>();
const SPECIAL_INSTRUCTION = rule<TokenKind, ParsedInstruction>();
const FALLBACK_INSTRUCTION = rule<TokenKind, ParsedInstruction>();
const MOVE = rule<TokenKind, ParsedInstruction[]>();
const COMBO = rule<TokenKind, ParsedInstruction[][]>();

INSTRUCTION.setPattern(
    alt_sc(
        apply(TEXT_INSTRUCTION, applyInstruction),
        apply(
            seq(
                alt_sc(MOVEMENT_INSTRUCTION, SPECIAL_INSTRUCTION),
                alt_sc(tok(TokenKind.Plus), tok(TokenKind.Colon)),
                ACTION_INSTRUCTION,
            ),
            applyCompoundInstruction,
        ),
        apply(
            seq(
                alt_sc(SPECIAL_INSTRUCTION, TEXT_INSTRUCTION),
                tok(TokenKind.Space),
                INSTRUCTION,
            ),
            applyCompoundInstruction,
        ),
        apply(SPECIAL_INSTRUCTION, applyInstruction),
        apply(ACTION_INSTRUCTION, applyInstruction),
        apply(MOVEMENT_INSTRUCTION, applyInstruction),
        apply(FALLBACK_INSTRUCTION, applyInstruction),
    ),
);

ACTION_INSTRUCTION.setPattern(
    alt_sc(
        apply(
            seq(
                tok(TokenKind.Action),
                opt_sc(
                    alt_sc(
                        tok(TokenKind.Plus),
                        tok(TokenKind.Colon),
                        tok(TokenKind.Tilde),
                        tok(TokenKind.LessThan),
                    ),
                ),
                ACTION_INSTRUCTION,
            ),
            applyCombinator,
        ),
        apply(tok(TokenKind.Action), applyActionInstruction),
    ),
);

MOVEMENT_INSTRUCTION.setPattern(
    alt_sc(
        apply(
            seq(
                tok(TokenKind.Movement),
                opt_sc(tok(TokenKind.Slash)),
                MOVEMENT_INSTRUCTION,
            ),
            applyCombinator,
        ),
        apply(tok(TokenKind.Movement), applyMovementInstruction),
    ),
);

TEXT_INSTRUCTION.setPattern(
    apply(
        kmid(
            alt_sc(tok(TokenKind.Quote), tok(TokenKind.LeftBracket)),
            tok(TokenKind.Text),
            alt_sc(tok(TokenKind.Quote), tok(TokenKind.RightBracket)),
        ),
        (value) => {
            return {
                type: 'text',
                notation: value.text,
                children: [],
            };
        },
    ),
);

FALLBACK_INSTRUCTION.setPattern(
    apply(tok(TokenKind.Text), (value) => {
        return {
            type: 'unknown',
            notation: value.text,
            children: [],
        };
    }),
);

SPECIAL_INSTRUCTION.setPattern(
    apply(tok(TokenKind.Special), (value) => {
        return {
            type: 'special',
            notation: value.text.trim().toUpperCase(),
            children: [],
        };
    }),
);

/**
 * Defines a move as a list of instructions separated by commas.
 */
MOVE.setPattern(list_sc(INSTRUCTION, tok(TokenKind.Comma)));

/**
 * Defines a combo as a list of moves separated by semicolons.
 */
COMBO.setPattern(
    list_sc(MOVE, alt_sc(tok(TokenKind.SemiColon), tok(TokenKind.Space))),
);

/**
 * Parses a Tekken notation string into a list of moves.
 * @param notation
 */
export function parseTekkenNotation(notation: string): ParsedCombo {
    const moves = expectSingleResult(COMBO.parse(tokenizer.parse(notation)));

    const parsedMoves: ParsedMove[] = moves.map((instructions) => {
        const notation = instructions
            .map((instruction) => {
                return instruction.type !== 'text' &&
                    instruction.type !== 'unknown'
                    ? instruction.notation
                    : `"${instruction.notation}"`;
            })
            .join(',');

        return {
            notation,
            instructions,
        };
    });

    const parsedNotation = parsedMoves
        .map((move) => {
            return move.notation;
        })
        .join(';');

    return {
        notation: parsedNotation,
        moves: parsedMoves,
    };
}
