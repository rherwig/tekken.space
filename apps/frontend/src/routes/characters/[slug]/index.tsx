import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { CharacterWithMoves} from '@tekken-space/database';
import { prisma } from '@tekken-space/database';

import CharacterMove from '../../../components/moves/character-move';

export const useCharacter = routeLoader$(
    async (requestEvent): Promise<CharacterWithMoves | null> => {
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
    },
);

export default component$(() => {
    const character = useCharacter();

    return (
        <div class="container py-10">
            <h1 class="mb-4 text-xl">{character.value?.name}</h1>
            <div class="grid grid-cols-1 gap-2">
                {character.value?.moves.map((move) => (
                    <CharacterMove
                        move={move}
                        key={move.id}
                    />
                ))}
            </div>
        </div>
    );
});
