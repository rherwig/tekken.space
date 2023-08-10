import type { FrameData, MoveFrames, MoveProperties } from '@tekken-space/database';
import { prisma } from '@tekken-space/database';
import type { Character, Move } from '@prisma/client';
import { slugify, slugifyCharacterName } from '@tekken-space/utils';
import { parseTekkenNotation } from '@tekken-space/parser';

import type { RawMovesMetadata } from './types';

const NOTATION_SANITIZATIONS = [
    [/\(hard\)/gi, ''],
    [/\(dash\)/gi, '"DASH"'],
    [/S!/gi, ''],
    [/WAKE UP/gi, '"WAKE UP",'],
    [/LOW PARRY/gi, '"LOW PARRY"'],
    [/CH/gi, 'CH,'],
    [/FC/gi, 'FC,'],
    [/EWGF/gi, '"EWGF"'],
    [/([dfub])([dfub])/gi, '$1/$2'],
    [/[()]/g, ''],
];

const COMBO_NOTATION_SANITIZATIONS = [[/\s+/g, ';']];

/**
 * Starts the import of all characters.
 */
async function startCharacterImport() {
    // await start('Akuma');
    // await start('Alisa');
    // await start('Anna');
    // await start('Armor King');
    // await start('Asuka');
    // await start('Bob');
    // await start('Bryan');
    // await start('Claudio');
    // await start('Devil Jin');
    // await start('Dragunov');
    // await start('Eddy');
    // await start('Eliza');
    // await start('Fahkumram');
    // await start('Feng');
    // await start('Ganryu');
    // await start('Geese');
    // await start('Gigas');
    // await start('Heihachi');
    // await start('Hwoarang');
    await start('Jack-7', await import('./assets/meta/jack-7.json'));
    // await start('Jin');
    // await start('Josie');
    // await start('Julia');
    // await start('Katarina');
    // await start('Kazumi');
    await start('Kazuya', await import('./assets/meta/kazuya.json'));
    // await start('King');
    // await start('Kuma');
    // await start('Kunimitsu');
    // await start('Lars');
    // await start('Law');
    // await start('Lee');
    // await start('Lei');
    // await start('Leo');
    // await start('Leroy');
    // await start('Lidia');
    // await start('Lili');
    // await start('Lucky Chloe');
    // await start('Marduk');
    // await start('Master Raven');
    // await start('Miguel');
    // await start('Negan');
    // await start('Nina');
    // await start('Noctis');
    // await start('Paul');
    // await start('Panda');
    // await start('Shaheen');
    // await start('Steve');
    // await start('Xiaoyu');
    // await start('Yoshimitsu');
    // await start('Zafina');
}

/**
 * Normalizes a character's JSON metadata and imports it into the database.
 * @param name
 * @param meta
 */
async function start(name: string, meta?: RawMovesMetadata) {
    const character = await findOrCreateCharacter(slugifyCharacterName(name), name);
    console.info(`:: Retrieved character: ${character.name}`);

    if (!meta) {
        console.info(`:: No metadata found for ${character.name}. Skipping move import.`);
        return;
    }

    console.info(`:: Importing ${meta.keyMoves.length} key moves.`);
    await importKeyMoves(character, meta.keyMoves);

    console.info(`:: Importing ${meta.standingPunishers.length} standing punishes.`);
    await importPunishes(character, meta.standingPunishers, {
        isStandingPunish: true,
    });

    console.info(`:: Importing ${meta.crouchingPunishers.length} crouching punishes.`);
    await importPunishes(character, meta.crouchingPunishers, {
        isCrouchingPunish: true,
    });

    console.info(`:: Importing ${meta.standardCombos.length} combos.`);
    await importStandardCombos(character, meta.standardCombos);
}

/**
 * Imports the key moves of a character into the database.
 * @param character
 * @param keyMoves
 */
async function importKeyMoves(character: Character, keyMoves: string[]) {
    for (const move of keyMoves) {
        const notation = sanitizeNotation(move);

        await upsertMove(
            character,
            notation,
            {
                isImported: true,
            },
            {
                isKeyMove: true,
            },
        );
    }
}

/**
 * Imports the punishes of a character into the database.
 * @param character
 * @param standingPunishes
 * @param properties
 */
async function importPunishes(
    character: Character,
    standingPunishes: string[][],
    properties: Partial<MoveProperties> = {},
) {
    for (const punish of standingPunishes) {
        const [frames, move, alternative] = punish;

        const notation = sanitizeNotation(move);
        const startup: FrameData = {
            rawValue: frames,
            min: parseInt(frames.replace(/f/i, ''), 10),
        };

        await upsertMove(
            character,
            notation,
            {
                isImported: true,
            },
            properties,
            {
                startup,
            },
        );

        if (!alternative) {
            continue;
        }

        const alternativeNotation = sanitizeNotation(alternative);

        await upsertMove(
            character,
            alternativeNotation,
            {
                isImported: true,
            },
            {
                isStandingPunish: true,
            },
            {
                startup,
            },
        );
    }
}

/**
 * Imports the standard combos of a character into the database.
 * @param character
 * @param standardCombos
 */
async function importStandardCombos(character: Character, standardCombos: string[][]) {
    for (const combo of standardCombos) {
        const [rawNotation, ...launchers] = combo;
        if (!launchers.length) {
            continue;
        }

        const launcher = sanitizeNotation(launchers[0]).replace(/\s+/g, '');
        const extender = sanitizeComboNotation(sanitizeNotation(rawNotation));
        const notation = `${launcher};${extender}`;

        await upsertMove(
            character,
            notation,
            {
                isImported: true,
            },
            {
                isStandardCombo: true,
            },
            undefined,
            true,
        );
    }
}

/**
 * Creates a new move in the database or updates an existing one.
 * When updating, the slug is used to find the move. Properties and metadata are merged.
 * @param character
 * @param notation
 * @param metadata
 * @param properties
 * @param moveFrames
 */
async function upsertMove(
    character: Character,
    notation: string,
    metadata: Record<string, any>,
    properties: Record<string, any>,
    moveFrames?: MoveFrames,
    isCombo = false,
): Promise<Move | null> {
    const slug = slugify(notation, character.slug);
    console.info(`Importing move: ${notation}`);

    try {
        parseTekkenNotation(notation);
    } catch (error: any) {
        console.warn(`Invalid notation: ${notation}`);
        return null;
    }

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
                characterId: character.id,
                slug,
                notation,
                metadata,
                properties,
                frames,
                isCombo,
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
                ...(move.metadata as Record<string, any>),
                ...metadata,
            },
            properties: {
                ...(move.properties as Record<string, any>),
                ...properties,
            },
            frames: {
                ...(move.frames as Record<string, any>),
                ...frames,
            },
            isCombo,
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
                imageUrl: `/images/characters/${slug}.png`,
                metadata: {
                    isImported: true,
                },
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

startCharacterImport().catch(console.error);
