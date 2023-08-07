// Generated from src/grammar/TekkenNotationSeven.g4 by ANTLR 4.13.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
    ATN,
    ATNDeserializer,
    BailErrorStrategy,
    DecisionState,
    DFA,
    FailedPredicateException,
    Interval,
    IntervalSet,
    NoViableAltException,
    Parser,
    ParserATNSimulator,
    ParserRuleContext,
    PredictionContextCache,
    PredictionMode,
    RecognitionException,
    RuleContext,
    RuleNode,
    TerminalNode,
    Token,
    TokenStream,
} from 'antlr4';
import TekkenNotationSevenVisitor from './TekkenNotationSevenVisitor.js';

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class TekkenNotationSevenParser extends Parser {
    public static readonly ACTION_INPUT = 1;
    public static readonly MOVEMENT_INPUT = 2;
    public static readonly SPECIAL_INPUT = 3;
    public static readonly TEXT = 4;
    public static readonly ACTION_COMBINATOR = 5;
    public static readonly JUST_FRAME_COMBINATOR = 6;
    public static readonly IMMEDIATE_COMBINATOR = 7;
    public static readonly DELAYED_COMBINATOR = 8;
    public static readonly ALTERNATIVE_COMBINATOR = 9;
    public static readonly MOVEMENT_COMBINATOR = 10;
    public static readonly MOVE_SEPARATOR = 11;
    public static readonly INSTRUCTION_SEPARATOR = 12;
    public static readonly TEXT_DELIMITER = 13;
    public static readonly OPTIONAL_START_DELIMITER = 14;
    public static readonly OPTIONAL_END_DELIMITER = 15;
    public static readonly THROW_BREAK_START_DELIMITER = 16;
    public static readonly THROW_BREAK_END_DELIMITER = 17;
    public static readonly WS = 18;
    public static readonly EOF = Token.EOF;
    public static readonly RULE_combo = 0;
    public static readonly RULE_move = 1;
    public static readonly RULE_instruction = 2;
    public static readonly RULE_movement = 3;
    public static readonly RULE_action = 4;
    public static readonly RULE_special = 5;
    public static readonly RULE_text = 6;
    public static readonly literalNames: (string | null)[] = [
        null,
        null,
        null,
        null,
        null,
        "'+'",
        "':'",
        "'~'",
        "'<'",
        "'_'",
        "'/'",
        "';'",
        "','",
        "'\"'",
        "'['",
        "']'",
        "'{'",
        "'}'",
    ];
    public static readonly symbolicNames: (string | null)[] = [
        null,
        'ACTION_INPUT',
        'MOVEMENT_INPUT',
        'SPECIAL_INPUT',
        'TEXT',
        'ACTION_COMBINATOR',
        'JUST_FRAME_COMBINATOR',
        'IMMEDIATE_COMBINATOR',
        'DELAYED_COMBINATOR',
        'ALTERNATIVE_COMBINATOR',
        'MOVEMENT_COMBINATOR',
        'MOVE_SEPARATOR',
        'INSTRUCTION_SEPARATOR',
        'TEXT_DELIMITER',
        'OPTIONAL_START_DELIMITER',
        'OPTIONAL_END_DELIMITER',
        'THROW_BREAK_START_DELIMITER',
        'THROW_BREAK_END_DELIMITER',
        'WS',
    ];
    // tslint:disable:no-trailing-whitespace
    public static readonly ruleNames: string[] = [
        'combo',
        'move',
        'instruction',
        'movement',
        'action',
        'special',
        'text',
    ];
    public get grammarFileName(): string {
        return 'TekkenNotationSeven.g4';
    }
    public get literalNames(): (string | null)[] {
        return TekkenNotationSevenParser.literalNames;
    }
    public get symbolicNames(): (string | null)[] {
        return TekkenNotationSevenParser.symbolicNames;
    }
    public get ruleNames(): string[] {
        return TekkenNotationSevenParser.ruleNames;
    }
    public get serializedATN(): number[] {
        return TekkenNotationSevenParser._serializedATN;
    }

    protected createFailedPredicateException(
        predicate?: string,
        message?: string,
    ): FailedPredicateException {
        return new FailedPredicateException(this, predicate, message);
    }

    constructor(input: TokenStream) {
        super(input);
        this._interp = new ParserATNSimulator(
            this,
            TekkenNotationSevenParser._ATN,
            TekkenNotationSevenParser.DecisionsToDFA,
            new PredictionContextCache(),
        );
    }
    // @RuleVersion(0)
    public combo(): ComboContext {
        let localctx: ComboContext = new ComboContext(
            this,
            this._ctx,
            this.state,
        );
        this.enterRule(localctx, 0, TekkenNotationSevenParser.RULE_combo);
        let _la: number;
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 19;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 14;
                                this.move();
                                this.state = 15;
                                this.match(
                                    TekkenNotationSevenParser.MOVE_SEPARATOR,
                                );
                            }
                        }
                    }
                    this.state = 21;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(
                        this._input,
                        0,
                        this._ctx,
                    );
                }
                this.state = 22;
                this.move();
                this.state = 24;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 11) {
                    {
                        this.state = 23;
                        this.match(TekkenNotationSevenParser.MOVE_SEPARATOR);
                    }
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    public move(): MoveContext {
        let localctx: MoveContext = new MoveContext(
            this,
            this._ctx,
            this.state,
        );
        this.enterRule(localctx, 2, TekkenNotationSevenParser.RULE_move);
        let _la: number;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 30;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 26;
                            this.instruction();
                            this.state = 28;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === 12) {
                                {
                                    this.state = 27;
                                    this.match(
                                        TekkenNotationSevenParser.INSTRUCTION_SEPARATOR,
                                    );
                                }
                            }
                        }
                    }
                    this.state = 32;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while ((_la & ~0x1f) === 0 && ((1 << _la) & 30) !== 0);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    public instruction(): InstructionContext {
        let localctx: InstructionContext = new InstructionContext(
            this,
            this._ctx,
            this.state,
        );
        this.enterRule(localctx, 4, TekkenNotationSevenParser.RULE_instruction);
        let _la: number;
        try {
            this.state = 50;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 2:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 34;
                        this.movement();
                        this.state = 37;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if ((_la & ~0x1f) === 0 && ((1 << _la) & 480) !== 0) {
                            {
                                this.state = 35;
                                _la = this._input.LA(1);
                                if (
                                    !(
                                        (_la & ~0x1f) === 0 &&
                                        ((1 << _la) & 480) !== 0
                                    )
                                ) {
                                    this._errHandler.recoverInline(this);
                                } else {
                                    this._errHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 36;
                                this.action();
                            }
                        }
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 39;
                        this.special();
                        this.state = 42;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if ((_la & ~0x1f) === 0 && ((1 << _la) & 480) !== 0) {
                            {
                                this.state = 40;
                                _la = this._input.LA(1);
                                if (
                                    !(
                                        (_la & ~0x1f) === 0 &&
                                        ((1 << _la) & 480) !== 0
                                    )
                                ) {
                                    this._errHandler.recoverInline(this);
                                } else {
                                    this._errHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 41;
                                this.action();
                            }
                        }
                    }
                    break;
                case 1:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 44;
                        this.action();
                        this.state = 47;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if ((_la & ~0x1f) === 0 && ((1 << _la) & 480) !== 0) {
                            {
                                this.state = 45;
                                _la = this._input.LA(1);
                                if (
                                    !(
                                        (_la & ~0x1f) === 0 &&
                                        ((1 << _la) & 480) !== 0
                                    )
                                ) {
                                    this._errHandler.recoverInline(this);
                                } else {
                                    this._errHandler.reportMatch(this);
                                    this.consume();
                                }
                                this.state = 46;
                                this.action();
                            }
                        }
                    }
                    break;
                case 4:
                    this.enterOuterAlt(localctx, 4);
                    {
                        this.state = 49;
                        this.text();
                    }
                    break;
                default:
                    throw new NoViableAltException(this);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    public movement(): MovementContext {
        let localctx: MovementContext = new MovementContext(
            this,
            this._ctx,
            this.state,
        );
        this.enterRule(localctx, 6, TekkenNotationSevenParser.RULE_movement);
        let _la: number;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 52;
                this.match(TekkenNotationSevenParser.MOVEMENT_INPUT);
                this.state = 57;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 10) {
                    {
                        {
                            this.state = 53;
                            this.match(
                                TekkenNotationSevenParser.MOVEMENT_COMBINATOR,
                            );
                            this.state = 54;
                            this.match(
                                TekkenNotationSevenParser.MOVEMENT_INPUT,
                            );
                        }
                    }
                    this.state = 59;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    public action(): ActionContext {
        let localctx: ActionContext = new ActionContext(
            this,
            this._ctx,
            this.state,
        );
        this.enterRule(localctx, 8, TekkenNotationSevenParser.RULE_action);
        try {
            let _alt: number;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 60;
                this.match(TekkenNotationSevenParser.ACTION_INPUT);
                this.state = 65;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 61;
                                this.match(
                                    TekkenNotationSevenParser.ACTION_COMBINATOR,
                                );
                                this.state = 62;
                                this.match(
                                    TekkenNotationSevenParser.ACTION_INPUT,
                                );
                            }
                        }
                    }
                    this.state = 67;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(
                        this._input,
                        9,
                        this._ctx,
                    );
                }
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    public special(): SpecialContext {
        let localctx: SpecialContext = new SpecialContext(
            this,
            this._ctx,
            this.state,
        );
        this.enterRule(localctx, 10, TekkenNotationSevenParser.RULE_special);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 68;
                this.match(TekkenNotationSevenParser.SPECIAL_INPUT);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    public text(): TextContext {
        let localctx: TextContext = new TextContext(
            this,
            this._ctx,
            this.state,
        );
        this.enterRule(localctx, 12, TekkenNotationSevenParser.RULE_text);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 70;
                this.match(TekkenNotationSevenParser.TEXT);
            }
        } catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    public static readonly _serializedATN: number[] = [
        4, 1, 18, 73, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7,
        4, 2, 5, 7, 5, 2, 6, 7, 6, 1, 0, 1, 0, 1, 0, 5, 0, 18, 8, 0, 10, 0, 12,
        0, 21, 9, 0, 1, 0, 1, 0, 3, 0, 25, 8, 0, 1, 1, 1, 1, 3, 1, 29, 8, 1, 4,
        1, 31, 8, 1, 11, 1, 12, 1, 32, 1, 2, 1, 2, 1, 2, 3, 2, 38, 8, 2, 1, 2,
        1, 2, 1, 2, 3, 2, 43, 8, 2, 1, 2, 1, 2, 1, 2, 3, 2, 48, 8, 2, 1, 2, 3,
        2, 51, 8, 2, 1, 3, 1, 3, 1, 3, 5, 3, 56, 8, 3, 10, 3, 12, 3, 59, 9, 3,
        1, 4, 1, 4, 1, 4, 5, 4, 64, 8, 4, 10, 4, 12, 4, 67, 9, 4, 1, 5, 1, 5, 1,
        6, 1, 6, 1, 6, 0, 0, 7, 0, 2, 4, 6, 8, 10, 12, 0, 1, 1, 0, 5, 8, 77, 0,
        19, 1, 0, 0, 0, 2, 30, 1, 0, 0, 0, 4, 50, 1, 0, 0, 0, 6, 52, 1, 0, 0, 0,
        8, 60, 1, 0, 0, 0, 10, 68, 1, 0, 0, 0, 12, 70, 1, 0, 0, 0, 14, 15, 3, 2,
        1, 0, 15, 16, 5, 11, 0, 0, 16, 18, 1, 0, 0, 0, 17, 14, 1, 0, 0, 0, 18,
        21, 1, 0, 0, 0, 19, 17, 1, 0, 0, 0, 19, 20, 1, 0, 0, 0, 20, 22, 1, 0, 0,
        0, 21, 19, 1, 0, 0, 0, 22, 24, 3, 2, 1, 0, 23, 25, 5, 11, 0, 0, 24, 23,
        1, 0, 0, 0, 24, 25, 1, 0, 0, 0, 25, 1, 1, 0, 0, 0, 26, 28, 3, 4, 2, 0,
        27, 29, 5, 12, 0, 0, 28, 27, 1, 0, 0, 0, 28, 29, 1, 0, 0, 0, 29, 31, 1,
        0, 0, 0, 30, 26, 1, 0, 0, 0, 31, 32, 1, 0, 0, 0, 32, 30, 1, 0, 0, 0, 32,
        33, 1, 0, 0, 0, 33, 3, 1, 0, 0, 0, 34, 37, 3, 6, 3, 0, 35, 36, 7, 0, 0,
        0, 36, 38, 3, 8, 4, 0, 37, 35, 1, 0, 0, 0, 37, 38, 1, 0, 0, 0, 38, 51,
        1, 0, 0, 0, 39, 42, 3, 10, 5, 0, 40, 41, 7, 0, 0, 0, 41, 43, 3, 8, 4, 0,
        42, 40, 1, 0, 0, 0, 42, 43, 1, 0, 0, 0, 43, 51, 1, 0, 0, 0, 44, 47, 3,
        8, 4, 0, 45, 46, 7, 0, 0, 0, 46, 48, 3, 8, 4, 0, 47, 45, 1, 0, 0, 0, 47,
        48, 1, 0, 0, 0, 48, 51, 1, 0, 0, 0, 49, 51, 3, 12, 6, 0, 50, 34, 1, 0,
        0, 0, 50, 39, 1, 0, 0, 0, 50, 44, 1, 0, 0, 0, 50, 49, 1, 0, 0, 0, 51, 5,
        1, 0, 0, 0, 52, 57, 5, 2, 0, 0, 53, 54, 5, 10, 0, 0, 54, 56, 5, 2, 0, 0,
        55, 53, 1, 0, 0, 0, 56, 59, 1, 0, 0, 0, 57, 55, 1, 0, 0, 0, 57, 58, 1,
        0, 0, 0, 58, 7, 1, 0, 0, 0, 59, 57, 1, 0, 0, 0, 60, 65, 5, 1, 0, 0, 61,
        62, 5, 5, 0, 0, 62, 64, 5, 1, 0, 0, 63, 61, 1, 0, 0, 0, 64, 67, 1, 0, 0,
        0, 65, 63, 1, 0, 0, 0, 65, 66, 1, 0, 0, 0, 66, 9, 1, 0, 0, 0, 67, 65, 1,
        0, 0, 0, 68, 69, 5, 3, 0, 0, 69, 11, 1, 0, 0, 0, 70, 71, 5, 4, 0, 0, 71,
        13, 1, 0, 0, 0, 10, 19, 24, 28, 32, 37, 42, 47, 50, 57, 65,
    ];

    private static __ATN: ATN;
    public static get _ATN(): ATN {
        if (!TekkenNotationSevenParser.__ATN) {
            TekkenNotationSevenParser.__ATN = new ATNDeserializer().deserialize(
                TekkenNotationSevenParser._serializedATN,
            );
        }

        return TekkenNotationSevenParser.__ATN;
    }

    static DecisionsToDFA = TekkenNotationSevenParser._ATN.decisionToState.map(
        (ds: DecisionState, index: number) => new DFA(ds, index),
    );
}

export class ComboContext extends ParserRuleContext {
    constructor(
        parser?: TekkenNotationSevenParser,
        parent?: ParserRuleContext,
        invokingState?: number,
    ) {
        super(parent, invokingState);
        this.parser = parser;
    }
    public move_list(): MoveContext[] {
        return this.getTypedRuleContexts(MoveContext as any) as MoveContext[];
    }
    public move(i: number): MoveContext {
        return this.getTypedRuleContext(MoveContext as any, i) as MoveContext;
    }
    public MOVE_SEPARATOR_list(): TerminalNode[] {
        return this.getTokens(TekkenNotationSevenParser.MOVE_SEPARATOR);
    }
    public MOVE_SEPARATOR(i: number): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.MOVE_SEPARATOR, i);
    }
    public get ruleIndex(): number {
        return TekkenNotationSevenParser.RULE_combo;
    }
    // @Override
    public accept<Result>(visitor: TekkenNotationSevenVisitor<Result>): Result {
        if (visitor.visitCombo) {
            return visitor.visitCombo(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class MoveContext extends ParserRuleContext {
    constructor(
        parser?: TekkenNotationSevenParser,
        parent?: ParserRuleContext,
        invokingState?: number,
    ) {
        super(parent, invokingState);
        this.parser = parser;
    }
    public instruction_list(): InstructionContext[] {
        return this.getTypedRuleContexts(
            InstructionContext as any,
        ) as InstructionContext[];
    }
    public instruction(i: number): InstructionContext {
        return this.getTypedRuleContext(
            InstructionContext as any,
            i,
        ) as InstructionContext;
    }
    public INSTRUCTION_SEPARATOR_list(): TerminalNode[] {
        return this.getTokens(TekkenNotationSevenParser.INSTRUCTION_SEPARATOR);
    }
    public INSTRUCTION_SEPARATOR(i: number): TerminalNode {
        return this.getToken(
            TekkenNotationSevenParser.INSTRUCTION_SEPARATOR,
            i,
        );
    }
    public get ruleIndex(): number {
        return TekkenNotationSevenParser.RULE_move;
    }
    // @Override
    public accept<Result>(visitor: TekkenNotationSevenVisitor<Result>): Result {
        if (visitor.visitMove) {
            return visitor.visitMove(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class InstructionContext extends ParserRuleContext {
    constructor(
        parser?: TekkenNotationSevenParser,
        parent?: ParserRuleContext,
        invokingState?: number,
    ) {
        super(parent, invokingState);
        this.parser = parser;
    }
    public movement(): MovementContext {
        return this.getTypedRuleContext(
            MovementContext as any,
            0,
        ) as MovementContext;
    }
    public action_list(): ActionContext[] {
        return this.getTypedRuleContexts(
            ActionContext as any,
        ) as ActionContext[];
    }
    public action(i: number): ActionContext {
        return this.getTypedRuleContext(
            ActionContext as any,
            i,
        ) as ActionContext;
    }
    public ACTION_COMBINATOR(): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.ACTION_COMBINATOR, 0);
    }
    public JUST_FRAME_COMBINATOR(): TerminalNode {
        return this.getToken(
            TekkenNotationSevenParser.JUST_FRAME_COMBINATOR,
            0,
        );
    }
    public DELAYED_COMBINATOR(): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.DELAYED_COMBINATOR, 0);
    }
    public IMMEDIATE_COMBINATOR(): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.IMMEDIATE_COMBINATOR, 0);
    }
    public special(): SpecialContext {
        return this.getTypedRuleContext(
            SpecialContext as any,
            0,
        ) as SpecialContext;
    }
    public text(): TextContext {
        return this.getTypedRuleContext(TextContext as any, 0) as TextContext;
    }
    public get ruleIndex(): number {
        return TekkenNotationSevenParser.RULE_instruction;
    }
    // @Override
    public accept<Result>(visitor: TekkenNotationSevenVisitor<Result>): Result {
        if (visitor.visitInstruction) {
            return visitor.visitInstruction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class MovementContext extends ParserRuleContext {
    constructor(
        parser?: TekkenNotationSevenParser,
        parent?: ParserRuleContext,
        invokingState?: number,
    ) {
        super(parent, invokingState);
        this.parser = parser;
    }
    public MOVEMENT_INPUT_list(): TerminalNode[] {
        return this.getTokens(TekkenNotationSevenParser.MOVEMENT_INPUT);
    }
    public MOVEMENT_INPUT(i: number): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.MOVEMENT_INPUT, i);
    }
    public MOVEMENT_COMBINATOR_list(): TerminalNode[] {
        return this.getTokens(TekkenNotationSevenParser.MOVEMENT_COMBINATOR);
    }
    public MOVEMENT_COMBINATOR(i: number): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.MOVEMENT_COMBINATOR, i);
    }
    public get ruleIndex(): number {
        return TekkenNotationSevenParser.RULE_movement;
    }
    // @Override
    public accept<Result>(visitor: TekkenNotationSevenVisitor<Result>): Result {
        if (visitor.visitMovement) {
            return visitor.visitMovement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class ActionContext extends ParserRuleContext {
    constructor(
        parser?: TekkenNotationSevenParser,
        parent?: ParserRuleContext,
        invokingState?: number,
    ) {
        super(parent, invokingState);
        this.parser = parser;
    }
    public ACTION_INPUT_list(): TerminalNode[] {
        return this.getTokens(TekkenNotationSevenParser.ACTION_INPUT);
    }
    public ACTION_INPUT(i: number): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.ACTION_INPUT, i);
    }
    public ACTION_COMBINATOR_list(): TerminalNode[] {
        return this.getTokens(TekkenNotationSevenParser.ACTION_COMBINATOR);
    }
    public ACTION_COMBINATOR(i: number): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.ACTION_COMBINATOR, i);
    }
    public get ruleIndex(): number {
        return TekkenNotationSevenParser.RULE_action;
    }
    // @Override
    public accept<Result>(visitor: TekkenNotationSevenVisitor<Result>): Result {
        if (visitor.visitAction) {
            return visitor.visitAction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class SpecialContext extends ParserRuleContext {
    constructor(
        parser?: TekkenNotationSevenParser,
        parent?: ParserRuleContext,
        invokingState?: number,
    ) {
        super(parent, invokingState);
        this.parser = parser;
    }
    public SPECIAL_INPUT(): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.SPECIAL_INPUT, 0);
    }
    public get ruleIndex(): number {
        return TekkenNotationSevenParser.RULE_special;
    }
    // @Override
    public accept<Result>(visitor: TekkenNotationSevenVisitor<Result>): Result {
        if (visitor.visitSpecial) {
            return visitor.visitSpecial(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}

export class TextContext extends ParserRuleContext {
    constructor(
        parser?: TekkenNotationSevenParser,
        parent?: ParserRuleContext,
        invokingState?: number,
    ) {
        super(parent, invokingState);
        this.parser = parser;
    }
    public TEXT(): TerminalNode {
        return this.getToken(TekkenNotationSevenParser.TEXT, 0);
    }
    public get ruleIndex(): number {
        return TekkenNotationSevenParser.RULE_text;
    }
    // @Override
    public accept<Result>(visitor: TekkenNotationSevenVisitor<Result>): Result {
        if (visitor.visitText) {
            return visitor.visitText(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
