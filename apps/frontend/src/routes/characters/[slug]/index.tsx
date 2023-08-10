import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { CharacterWithMoves, MoveProperties } from '@tekken-space/database';
import { prisma } from '@tekken-space/database';

import CharacterMove from '../../../components/moves/character-move';
import PunishersCard from '../../../components/characters/overview/punishers-card';
import BaseOverviewCard from '../../../components/characters/overview/base-overview-card';

export const useCharacter = routeLoader$(async (requestEvent): Promise<CharacterWithMoves | null> => {
    return prisma.character.findUnique({
        where: {
            slug: requestEvent.params.slug,
        },
        include: {
            moves: {
                where: {
                    parentId: null,
                },
                include: {
                    variants: true,
                },
            },
        },
    });
});

export const head: DocumentHead = ({ resolveValue }) => {
    const character = resolveValue(useCharacter);

    return {
        title: character?.name ?? 'Character',
    };
};

export default component$(() => {
    const character = useCharacter();
    if (!character.value) {
        return null;
    }

    const { imageUrl } = character.value;

    const keyMoves = character.value.moves.filter((move) => {
        const properties = move.properties as unknown as MoveProperties;

        return !!properties?.isKeyMove;
    });

    const standardCombos = character.value.moves.filter((move) => {
        const properties = move.properties as unknown as MoveProperties;

        return !!properties?.isStandardCombo;
    });

    const standingPunishers = character.value.moves.filter((move) => {
        const properties = move.properties as unknown as MoveProperties;

        return !!properties?.isStandingPunish;
    });

    const crouchingPunishers = character.value.moves.filter((move) => {
        const properties = move.properties as unknown as MoveProperties;

        return !!properties?.isCrouchingPunish;
    });

    return (
        <div class="container py-10">
            <div class="flex items-center gap-4 mb-8">
                {imageUrl && (
                    <div class="relative bg-black/50 rounded-sm">
                        <img
                            src={imageUrl}
                            alt={`Picture of ${character.value?.name}`}
                            width={56}
                            height={56}
                            class="rounded-md"
                        />
                    </div>
                )}
                <div>
                    <h2 class="text-md text-gray-300 leading-none">Overview</h2>
                    <h1 class="text-4xl">{character.value?.name}</h1>
                </div>
            </div>

            <div class="flex gap-2">
                <PunishersCard
                    title="Standing Punishes"
                    moves={standingPunishers}
                />

                <PunishersCard
                    title="Crouching Punishes"
                    moves={crouchingPunishers}
                />
                {/*<div class="grid auto-rows-min gap-1">*/}
                {/*    <h2>Key Moves</h2>*/}

                {/*    {keyMoves.map((move) => (*/}
                {/*        <CharacterMove*/}
                {/*            move={move}*/}
                {/*            key={move.id}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</div>*/}

                <BaseOverviewCard title="Staple Combos">
                    <div class="grid auto-rows-min gap-1">
                        {standardCombos.map((move) => (
                            <CharacterMove
                                move={move}
                                key={move.id}
                            />
                        ))}
                    </div>
                </BaseOverviewCard>
            </div>
        </div>
    );
});
