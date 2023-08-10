import { component$ } from '@builder.io/qwik';

import Arrow from './movement/arrow';
import Neutral from './movement/neutral';

interface Props {
    notation: string;
}

export default component$<Props>((props) => {
    const notation = props.notation.replace('/', '');
    const isNeutral = notation === 'N' || notation === 'n';
    const isHoldInput = notation.toLowerCase() !== notation;

    return (
        <div class="relative flex h-full items-center justify-center">
            {isNeutral && <Neutral />}

            {!isNeutral && (
                <Arrow
                    direction={notation.toLowerCase() as any}
                    hold={isHoldInput}
                />
            )}
        </div>
    );
});
