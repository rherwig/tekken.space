import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { prisma } from '@tekken-space/database';
import type { Character } from '@prisma/client';

export const useCharacters = routeLoader$(async (): Promise<Character[] | null> => {
    return prisma.character.findMany();
});

export default component$(() => {
    const characters = useCharacters();

    return (
        <div class="container py-10">
            <h1 class="mb-4 text-xl">Characters</h1>
            <div class="grid grid-cols-6 gap-4">
                {characters.value?.map((character) => (
                    <Link
                        key={character.id}
                        href={`/characters/${character.slug}`}
                        class="group relative block w-full aspect-square bg-black/50 hover:bg-black/25 transition-colors rounded-sm"
                    >
                        {!!character.imageUrl && (
                            <img
                                width={200}
                                height={200}
                                src={character.imageUrl}
                                alt={`Picture of ${character.name}`}
                                class="absolute inset-0 object-cover w-full h-full pointer-events-none"
                            />
                        )}

                        <span class="absolute inset-x-0 bottom-0 flex justify-center p-1 bg-black/75">
                            {character.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
});
