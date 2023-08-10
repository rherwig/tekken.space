import { component$ } from '@builder.io/qwik';
import type { Move } from '@prisma/client';
import type { MoveFrames } from '@tekken-space/database';

import GenericMove from '../../moves/generic-move';

import BaseOverviewCard from './base-overview-card';

interface Props {
    title: string;
    moves: Move[];
}

export default component$<Props>(({ title, moves }) => {
    return (
        <BaseOverviewCard title={title}>
            <div class="grid gap-1 grid-cols-[min-content]">
                {moves.map(move => (
                    <div
                        key={move.id}
                        class="flex gap-8 items-center bg-black/25 px-4"
                    >
                        <div class="text-xl font-bold">{(move.frames as MoveFrames).startup?.min ?? '?'}F</div>
                        <GenericMove notation={move.notation} />
                    </div>
                ))}
            </div>
        </BaseOverviewCard>
    );
});
