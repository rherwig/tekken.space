import { component$ } from '@builder.io/qwik';
import type { ParsedMove } from '@tekken-space/parser';

import GenericInstruction from './generic-instruction';

interface Props {
    move: ParsedMove;
}

export default component$<Props>((props) => {
    return (
        <div class="flex gap-2">
            {props.move.instructions.map((instruction, index) => (
                <GenericInstruction
                    key={index}
                    instruction={instruction}
                />
            ))}
        </div>
    );
});
