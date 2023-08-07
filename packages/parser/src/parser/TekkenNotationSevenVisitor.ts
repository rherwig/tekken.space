// Generated from src/grammar/TekkenNotationSeven.g4 by ANTLR 4.13.0

import {ParseTreeVisitor} from 'antlr4';


import { ComboContext } from "./TekkenNotationSevenParser";
import { MoveContext } from "./TekkenNotationSevenParser";
import { InstructionContext } from "./TekkenNotationSevenParser";
import { MovementContext } from "./TekkenNotationSevenParser";
import { ActionContext } from "./TekkenNotationSevenParser";
import { SpecialContext } from "./TekkenNotationSevenParser";
import { TextContext } from "./TekkenNotationSevenParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `TekkenNotationSevenParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class TekkenNotationSevenVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `TekkenNotationSevenParser.combo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCombo?: (ctx: ComboContext) => Result;
	/**
	 * Visit a parse tree produced by `TekkenNotationSevenParser.move`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMove?: (ctx: MoveContext) => Result;
	/**
	 * Visit a parse tree produced by `TekkenNotationSevenParser.instruction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstruction?: (ctx: InstructionContext) => Result;
	/**
	 * Visit a parse tree produced by `TekkenNotationSevenParser.movement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMovement?: (ctx: MovementContext) => Result;
	/**
	 * Visit a parse tree produced by `TekkenNotationSevenParser.action`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction?: (ctx: ActionContext) => Result;
	/**
	 * Visit a parse tree produced by `TekkenNotationSevenParser.special`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecial?: (ctx: SpecialContext) => Result;
	/**
	 * Visit a parse tree produced by `TekkenNotationSevenParser.text`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitText?: (ctx: TextContext) => Result;
}

