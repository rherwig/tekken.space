import { ParseTreeVisitor } from 'antlr4';

import {
    ActionContext,
    ComboContext,
    InstructionContext,
    MoveContext,
    MovementContext,
    SpecialContext,
} from './parser/TekkenNotationSevenParser';
import {
    TekkenCombo,
    TekkenInstruction,
    TekkenInstructionType,
    TekkenMove,
} from './types';
import TekkenNotationSevenLexer from './parser/TekkenNotationSevenLexer';
import TekkenNotationSevenVisitor from './parser/TekkenNotationSevenVisitor';

/**
 * Visitor for the TekkenNotationParser that converts the parse tree into a
 * TekkenCombo object.
 */
export class TekkenVisitor
    extends ParseTreeVisitor<TekkenCombo>
    implements TekkenNotationSevenVisitor<any>
{
    protected defaultResult(): TekkenCombo {
        return {
            moves: [],
        };
    }

    /**
     * Visit a parse tree produced by `TekkenNotationParser.combo`.
     * This is the entrypoint of the program.
     * @param {ComboContext} ctx
     */
    visitCombo: (ctx: ComboContext) => TekkenCombo = (
        ctx: ComboContext,
    ): TekkenCombo => {
        const result: TekkenCombo = {
            moves: [],
        };

        for (const moveCtx of ctx.move_list()) {
            const moveResult = this.visitMove(moveCtx);
            if (!moveResult) {
                continue;
            }

            result.moves.push(moveResult);
        }

        return result;
    };

    /**
     * Visit a parse tree produced by `TekkenNotationParser.move`.
     * This is called by the `visitCombo` method.
     * @param {MoveContext} ctx
     */
    visitMove: (ctx: MoveContext) => TekkenMove | null = (
        ctx: MoveContext,
    ): TekkenMove | null => {
        if (!ctx.children?.length) {
            return null;
        }

        const instructions: TekkenInstruction[] = [];

        for (const instructionCtx of ctx.instruction_list()) {
            const instructionResult = this.visitInstruction(instructionCtx);
            if (!instructionResult) {
                continue;
            }

            instructions.push(...instructionResult);
        }

        const notation = instructions
            .map((instruction) => instruction?.notation || '')
            .join('');

        return {
            notation,
            instructions,
        };
    };

    /**
     * Visit a parse tree produced by `TekkenNotationParser.instruction`.
     * This is called by the `visitMove` method.
     * @param {InstructionContext} ctx
     */
    visitInstruction: (ctx: InstructionContext) => TekkenInstruction[] = (
        ctx: InstructionContext,
    ): TekkenInstruction[] => {
        return (
            ctx.children?.map((child) => {
                if (child instanceof ActionContext) {
                    return this.visitAction(child);
                }

                if (child instanceof MovementContext) {
                    return this.visitMovement(child);
                }

                if (child instanceof SpecialContext) {
                    return this.visitSpecial(child);
                }

                return this._buildInstruction(child.getText());
            }) ?? []
        );
    };

    visitAction: (ctx: ActionContext) => any = (ctx: ActionContext) => {
        return this._buildInstruction(
            ctx.getText().toString(),
            TekkenInstructionType.ACTION,
        );
    };

    visitMovement: (ctx: MovementContext) => any = (ctx: MovementContext) => {
        return this._buildInstruction(
            ctx.getText().toString(),
            TekkenInstructionType.MOVEMENT,
        );
    };

    visitSpecial: (ctx: SpecialContext) => any = (ctx: SpecialContext) => {
        return this._buildInstruction(
            ctx.getText().toString(),
            TekkenInstructionType.SPECIAL,
        );
    };

    private _buildInstruction(
        notation: string,
        type: TekkenInstructionType = TekkenInstructionType.UNKNOWN,
    ): TekkenInstruction {
        const slug = notation.replace(/[^a-zA-Z0-9]/g, '');
        const inputs =
            type === TekkenInstructionType.ACTION ||
            type === TekkenInstructionType.MOVEMENT
                ? slug.split('').map((value) => ({ notation: value }))
                : [];

        if (
            this._isTokenOfType(
                notation,
                TekkenNotationSevenLexer.ACTION_COMBINATOR,
            )
        ) {
            type = TekkenInstructionType.HIDDEN;
        }

        if (
            this._isTokenOfType(
                notation,
                TekkenNotationSevenLexer.JUST_FRAME_COMBINATOR,
            ) ||
            this._isTokenOfType(
                notation,
                TekkenNotationSevenLexer.DELAYED_COMBINATOR,
            ) ||
            this._isTokenOfType(
                notation,
                TekkenNotationSevenLexer.ALTERNATIVE_COMBINATOR,
            ) ||
            this._isTokenOfType(
                notation,
                TekkenNotationSevenLexer.IMMEDIATE_COMBINATOR,
            )
        ) {
            type = TekkenInstructionType.CONTROL;
        }

        return {
            type,
            notation,
            slug,
            inputs,
        };
    }

    private _isTokenOfType(notation: string, type: number) {
        return TekkenNotationSevenLexer.literalNames[type] === `'${notation}'`;
    }
}
