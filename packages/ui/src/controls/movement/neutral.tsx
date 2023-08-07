import { component$ } from '@builder.io/qwik';

import styles from './neutral.module.scss';

export default component$(() => {
    return (
        <div class={styles.wrapper}>
            <div class={styles.neutral}></div>
        </div>
    );
});
