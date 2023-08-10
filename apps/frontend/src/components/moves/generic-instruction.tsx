import { component$ } from '@builder.io/qwik';
import type { ParsedInstruction } from '@tekken-space/parser';
import { ActionControls, MovementControls, Tag } from '@tekken-space/ui';

import GenericInstruction from './generic-instruction';

interface Props {
    instruction: ParsedInstruction;
}

export default component$<Props>(({ instruction }) => {
    if (instruction.type === 'compound') {
        return (
            <div class="flex items-center gap-2">
                {instruction.children.map((child) => (
                    <>
                        <GenericInstruction instruction={child}/>
                        {child.combinator && <span class="combinator">{child.combinator}</span>}
                    </>
                ))}
            </div>
        );
    }

    if (instruction.type === 'movement') {
        return (
            <div class="flex items-center gap-2">
                <MovementControls notation={instruction.notation}/>
            </div>
        );
    }

    if (instruction.type === 'action') {
        if (/^\d(?:\+\d)*$/.test(instruction.notation)) {
            return (
                <div class="flex items-center gap-2">
                    <ActionControls actions={instruction.notation.split('+')}/>
                </div>
            );
        }

        if (instruction.children) {
            return (
                <div class="flex items-center gap-2">
                    {instruction.children.map((child) => (
                        <>
                            <ActionControls actions={[child.notation]}/>
                            {child.combinator && <span class="combinator">{child.combinator}</span>}
                        </>
                    ))}
                </div>
            );
        }
    }

    if (instruction.type === 'special') {
        return (
            <div class="flex items-center gap-2 mr-2">
                <Tag color={'yellow'}>{instruction.notation}</Tag>
            </div>
        );
    }

    if (instruction.type === 'text') {
        return (
            <div class="flex items-center gap-2 mr-2">
                <Tag>{instruction.notation}</Tag>
            </div>
        );
    }

    return (
        <div class="flex items-center">
            ?? {instruction.notation} ??
        </div>
    );
});
