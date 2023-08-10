import { component$ } from '@builder.io/qwik';
import type { ParsedInstruction } from '@tekken-space/parser';
import { ActionControls } from '@tekken-space/ui';

interface Props {
    instruction: ParsedInstruction;
}

export default component$<Props>(({ instruction }) => {
    if (instruction.type === 'action') {
        return <ActionControls actions={instruction.notation.split('+')}/>
    }

    if (instruction.type === 'movement') {

    }

    if (instruction.type === 'text') {

    }

    if (instruction.type === 'special') {

    }

    return (
        <div>
            {instruction.notation}
        </div>
    )
});
