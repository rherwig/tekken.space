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
        <div class="flex gap-2">
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
