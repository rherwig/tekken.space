import type { Character, Move } from '@prisma/client';

export type MoveWithVariants = Move & {
    variants: Move[];
};

export type CharacterWithMoves = Character & {
    moves: MoveWithVariants[];
};

export interface MoveMetadata {
    isImported: boolean;
}

export interface MoveProperties {
    isKeyMove: boolean;
    isStandingPunish: boolean;
    isCrouchingPunish: boolean;
    isWhiffPunish: boolean;
    isStandardCombo: boolean;
    isLauncher: boolean;
    isScrew: boolean;
}

export interface FrameData {
    min: number;
    max?: number;
    rawValue: string;
}

export interface MoveFrames {
    startup?: FrameData;
    block?: FrameData;
    hit?: FrameData;
    counterHit?: FrameData;
}
