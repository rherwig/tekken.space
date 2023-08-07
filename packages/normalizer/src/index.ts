import type { FrameData, MoveFrames } from '@tekken-space/database';
import { prisma } from '@tekken-space/database';
import type { Character, Move } from '@prisma/client';
import { slugify } from '@tekken-space/utils';
import { parseTekkenNotation } from '@tekken-space/parser';

import kazuyaMeta from './assets/meta/kazuya.json';
import type { RawMovesMetadata } from './types';

const NOTATION_SANITIZATIONS = [
    [/\(hard\)/gi, ''],
    [/\(dash\)/gi, '"DASH"'],
    [/S!/gi, ''],
    [/WAKE UP/gi, '"WAKE UP",'],
    [/LOW PARRY/gi, '"LOW PARRY"'],
    [/CH/gi, '"CH",'],
    [/FC/gi, '"FC",'],
    [/EWGF/gi, '"EWGF"'],
    [/([dfub])([dfub])/gi, '$1/$2'],
    [/[()]/g, ''],
];

const COMBO_NOTATION_SANITIZATIONS = [
    [/\s+/g, ';'],
];

/**
 * Normalizes a character's JSON metadata and imports it into the database.
 * @param meta
 */
async function start(meta: RawMovesMetadata) {
    const character = await findOrCreateCharacter('kazuya', 'Kazuya');
    console.info(`:: Retrieved character: ${character.name}`);

    console.info(`:: Importing ${meta.keyMoves.length} key moves.`);
    await importKeyMoves(character.id, meta.keyMoves);

    console.info(`:: Importing ${meta.standingPunishers.length} standing punishes.`);
    await importPunishes(character.id, meta.standingPunishers);

    console.info(`:: Importing ${meta.crouchingPunishers.length} crouching punishes.`);
    await importPunishes(character.id, meta.crouchingPunishers);

    console.info(`:: Importing ${meta.standardCombos.length} combos.`);
    await importStandardCombos(character.id, meta.standardCombos);
}

/**
 * Imports the key moves of a character into the database.
 * @param characterId
 * @param keyMoves
 */
async function importKeyMoves(characterId: string, keyMoves: string[]) {
    for (const move of keyMoves) {
        const notation = sanitizeNotation(move);
        const slug = slugify(notation);

        await upsertMove(characterId, slug, notation, {
            isImported: true,
        }, {
            isKeyMove: true,
        });
    }
}

/**
 * Imports the punishes of a character into the database.
 * @param characterId
 * @param standingPunishes
 */
async function importPunishes(characterId: string, standingPunishes: string[][]) {
    for (const punish of standingPunishes) {
        const [frames, move, alternative] = punish;

        const notation = sanitizeNotation(move);
        const slug = slugify(notation);
        const startup: FrameData = {
            rawValue: frames,
            min: parseInt(frames.replace(/f/i, ''), 10),
        };

        await upsertMove(characterId, slug, notation, {
            isImported: true,
        }, {
            isStandingPunish: true,
        }, {
            startup,
        });

        if (!alternative) {
            continue;
        }

        const alternativeNotation = sanitizeNotation(alternative);
        const alternativeSlug = slugify(alternativeNotation);

        await upsertMove(characterId, alternativeSlug, alternativeNotation, {
            isImported: true,
        }, {
            isStandingPunish: true,
        }, {
            startup,
        });
    }
}

async function importStandardCombos(characterId: string, standardCombos: string[][]) {
    for (const combo of standardCombos) {
        const [rawNotation, ...launchers] = combo;
        if (!launchers.length) {
            continue;
        }

        const launcher = sanitizeNotation(launchers[0]).replace(/\s+/g, '');
        const extender = sanitizeComboNotation(sanitizeNotation(rawNotation));

        const notation = `${launcher};${extender}`;
        const slug = slugify(notation);

        await upsertMove(characterId, slug, notation, {
            isImported: true,
        }, {
            isStandardCombo: true,
        });
    }
}

/**
 * Creates a new move in the database or updates an existing one.
 * When updating, the slug is used to find the move. Properties and metadata are merged.
 * @param characterId
 * @param slug
 * @param notation
 * @param metadata
 * @param properties
 * @param moveFrames
 */
async function upsertMove(characterId: string, slug: string, notation: string, metadata: Record<string, any>, properties: Record<string, any>, moveFrames?: MoveFrames): Promise<Move> {
    console.info(`Importing move: ${notation}`);

    const move = await prisma.move.findUnique({
        where: {
            slug,
        },
    });

    const frames: any = moveFrames ?? {};

    if (!move) {
        console.info(`Move not found. Creating.`);

        return prisma.move.create({
            data: {
                characterId,
                slug,
                notation,
                metadata,
                properties,
                frames,
            },
        });
    }

    console.info(`Move found. Updating.`);

    return prisma.move.update({
        where: {
            id: move.id,
        },
        data: {
            notation,
            metadata: {
                ...move.metadata as Record<string, any>,
                ...metadata,
            },
            properties: {
                ...move.properties as Record<string, any>,
                ...properties,
            },
            frames: {
                ...move.frames as Record<string, any>,
                ...frames,
            },
        },
    });
}

/**
 * Retrieves a character from the database or creates it if it doesn't exist.
 * @param slug
 * @param name
 */
async function findOrCreateCharacter(slug: string, name: string): Promise<Character> {
    let character = await prisma.character.findUnique({
        where: {
            slug,
        },
    });

    if (!character) {
        character = await prisma.character.create({
            data: {
                slug,
                name,
            },
        });

        if (!character) {
            throw new Error('Failed to create character');
        }
    }

    return character;
}

/**
 * Sanitizes a notation to make it compatible with the parser.
 * @param notation
 */
function sanitizeNotation(notation: string): string {
    return NOTATION_SANITIZATIONS.reduce((result: string, [pattern, replacement]) => {
        return result.replace(pattern, replacement.toString());
    }, notation);
}

/**
 * Sanitizes a combo notation and replaces special characters, like spaces.
 * @param notation
 */
function sanitizeComboNotation(notation: string): string {
    return COMBO_NOTATION_SANITIZATIONS.reduce((result: string, [pattern, replacement]) => {
        return result.replace(pattern, replacement.toString());
    }, notation);
}

start(kazuyaMeta).catch(console.error);
