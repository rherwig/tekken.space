import { component$ } from '@builder.io/qwik';

import Arrow from './movement/arrow';
import Neutral from './movement/neutral';

interface Props {
    slug: string;
}

export default component$<Props>((props) => {
    const isNeutral = props.slug === 'N' || props.slug === 'n';
    const isHoldInput = props.slug.toLowerCase() !== props.slug;

    return (
        <div class="relative flex h-full items-center justify-center">
            {isNeutral && <Neutral />}

            {!isNeutral && (
                <Arrow
                    direction={props.slug.toLowerCase() as any}
                    hold={isHoldInput}
                />
            )}
        </div>
    );
});
