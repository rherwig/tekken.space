import { component$ } from '@builder.io/qwik';
import type { TekkenInstruction } from '@tekken-space/parser';
import { TekkenInstructionType } from '@tekken-space/parser';
import { ActionControls, MovementControls, Tag } from '@tekken-space/ui';

interface Props {
    instruction: TekkenInstruction;
}

export default component$<Props>((props) => {
    if (props.instruction.type === TekkenInstructionType.HIDDEN) {
        return null;
    }

    if (props.instruction.type === TekkenInstructionType.MOVEMENT) {
        return <MovementControls slug={props.instruction.slug} />;
    }

    if (props.instruction.type === TekkenInstructionType.ACTION) {
        return <ActionControls inputs={props.instruction.inputs} />;
    }

    if (props.instruction.type === TekkenInstructionType.CONTROL) {
        return <div class="flex gap-2">control</div>;
    }

    if (props.instruction.type === TekkenInstructionType.TEXT) {
        return <div class="flex gap-2">text</div>;
    }

    if (props.instruction.type === TekkenInstructionType.SPECIAL) {
        return <div class="flex gap-2">special</div>;
    }

    const isRage = props.instruction.slug.toLowerCase().includes('rage');

    return (
        <div class="flex items-center">
            <Tag color={isRage ? 'red' : 'gray'}>{props.instruction.slug}</Tag>
        </div>
    );
});
