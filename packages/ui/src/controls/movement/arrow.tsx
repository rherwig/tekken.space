import clsx from 'classnames';
import { component$ } from '@builder.io/qwik';

import styles from './arrow.module.scss';

const ARROW_DIRECTIONS = {
    u: 'up',
    d: 'down',
    b: 'back',
    f: 'forward',
    ub: 'up-back',
    uf: 'up-forward',
    db: 'down-back',
    df: 'down-forward',
};

interface Props {
    direction: keyof typeof ARROW_DIRECTIONS;
    hold?: boolean;
}

export default component$((props: Props) => {
    const direction = ARROW_DIRECTIONS[props.direction];
    const isHoldInput = props.hold ?? false;

    return (
        <div class={styles.arrowContainer}>
            <div
                class={clsx(
                    styles.arrow,
                    isHoldInput && styles.hold,
                    styles[direction],
                )}
            ></div>
        </div>
    );
});
