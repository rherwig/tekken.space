import { component$, useSignal } from '@builder.io/qwik';
import { Tag } from '@tekken-space/ui';
import type { MoveWithVariants } from '@tekken-space/database';

import GenericMove from './generic-move';

interface Props {
    move: MoveWithVariants;
}

export default component$<Props>(({ move }) => {
    const isExpanded = useSignal(false);

    return (
        <section class="border-l-primary border-l-2 bg-black/25">
            <div class="flex flex-col gap-2 p-4">
                <div class="flex items-center justify-between">
                    <h3>{move.name}</h3>
                    <div>
                        {move.variants.length > 0 && (
                            <div
                                class="bg-primary cursor-pointer rounded-sm px-2 py-0.5 text-sm text-white"
                                onClick$={() =>
                                    (isExpanded.value = !isExpanded.value)
                                }
                            >
                                {move.variants.length} Variants
                            </div>
                        )}
                    </div>
                </div>
                <GenericMove notation={move.notation} />
            </div>

            <div
                class={{
                    'overflow-hidden transition-all duration-500 ease-in-out':
                        true,
                    'max-h-0': !isExpanded.value,
                    'max-h-screen': isExpanded.value,
                }}
            >
                {move.variants.map((variant, index) => (
                    <div
                        class="flex flex-col gap-2 bg-black/25 p-4"
                        key={index}
                    >
                        <h3 class="text-sm">{variant.name}</h3>
                        <GenericMove
                            notation={variant.notation}
                            hiddenMoves={[0]}
                        />

                        <div class="flex items-center gap-1">
                            {variant.notation
                                .toLowerCase()
                                .includes('rage') && (
                                <Tag color="red">Rage</Tag>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});
