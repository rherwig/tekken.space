import { component$, useSignal } from '@builder.io/qwik';
import { parseTekkenNotation } from '@tekken-space/parser';

import Move from './move';
import MovesSeparator from './moves-separator';

interface Props {
    notation: string;
    hiddenMoves?: number[];
}

export default component$<Props>((props) => {
    const moves = useSignal(() => {
        try {
            return parseTekkenNotation(props.notation).moves;
        } catch (error: any) {
            return [];
        }
    });

    if (!moves.value.length) {
        return null;
    }

    const indexOfLastMove = moves.value.length - 1;
    const hiddenMoveIndexes = props.hiddenMoves ?? [];

    return (
        <div class="flex gap-2 px-4 py-4 overflow-x-auto overflow-y-hidden scrollbar scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-rounded-sm scrollbar-thumb-zinc-950">
            {moves.value.map((move, index) => (
                <div
                    key={index}
                    class={{
                        'flex gap-2': true,
                        'invisible': hiddenMoveIndexes.includes(index),
                    }}
                >
                    <Move move={move} />

                    {index < indexOfLastMove && <MovesSeparator />}
                </div>
            ))}
        </div>
    );
});
