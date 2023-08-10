import clsx from 'classnames';
import { component$ } from '@builder.io/qwik';

import styles from './action-controls.module.scss';

export enum ControllerLayout {
    UNKNOWN = 'UNKNOWN',
    GAMEPAD = 'GAMEPAD',
    XBOX = 'XBOX',
    PLAYSTATION = 'PLAYSTATION',
    ARCADE = 'ARCADE',
    HITBOX = 'HITBOX',
}

interface Props {
    actions: string[];
    scheme?: ControllerLayout;
}

const colorSchemes: Record<ControllerLayout, string[]> = {
    UNKNOWN: [],
    XBOX: [
        'bg-blue-500 text-blue-900',
        'bg-yellow-500 text-yellow-900',
        'bg-green-500 text-green-900',
        'bg-red-500 text-red-900',
    ],
    PLAYSTATION: [
        'bg-pink-400 text-pink-900',
        'bg-green-500 text-green-900',
        'bg-slate-500 text-slate-900',
        'bg-red-500 text-red-950',
    ],
    GAMEPAD: [
        'bg-blue-500 text-blue-900',
        'bg-yellow-500 text-yellow-900',
        'bg-green-500 text-green-900',
        'bg-red-500 text-red-900',
    ],
    ARCADE: [
        'bg-blue-500 text-blue-900',
        'bg-yellow-500 text-yellow-900',
        'bg-green-500 text-green-900',
        'bg-red-500 text-red-900',
    ],
    HITBOX: [
        'bg-red-500 text-red-900',
        'bg-red-500 text-red-900',
        'bg-red-500 text-red-900',
        'bg-red-500 text-red-900',
    ],
};

const buttonSchemes: Record<ControllerLayout, string[]> = {
    UNKNOWN: [],
    XBOX: ['X', 'Y', 'A', 'B'],
    PLAYSTATION: ['1', '2', '3', '4'],
    GAMEPAD: ['1', '2', '3', '4'],
    ARCADE: ['1', '2', '3', '4'],
    HITBOX: ['1', '2', '3', '4'],
};

export default component$((props: Props) => {
    const inactiveColor = 'bg-white';
    const scheme = props.scheme ?? 'GAMEPAD';
    const activeColors = colorSchemes[scheme];
    const labels = buttonSchemes[scheme];
    const isArcadeLayout = scheme === 'ARCADE' || scheme === 'HITBOX';

    return (
        <div class="action-controls relative aspect-square w-[56px]">
            <div
                class={clsx(
                    styles.button,
                    isArcadeLayout ? styles.arcade1 : styles.gamepad1,
                    props.actions.includes('1')
                        ? activeColors.at(0)
                        : inactiveColor,
                )}
            >
                {labels.at(0)}
            </div>
            <div
                class={clsx(
                    styles.button,
                    isArcadeLayout ? styles.arcade2 : styles.gamepad2,
                    props.actions.includes('2')
                        ? activeColors.at(1)
                        : inactiveColor,
                )}
            >
                {labels.at(1)}
            </div>
            <div
                class={clsx(
                    styles.button,
                    isArcadeLayout ? styles.arcade3 : styles.gamepad3,
                    props.actions.includes('3')
                        ? activeColors.at(2)
                        : inactiveColor,
                )}
            >
                {labels.at(2)}
            </div>
            <div
                class={clsx(
                    styles.button,
                    isArcadeLayout ? styles.arcade4 : styles.gamepad4,
                    props.actions.includes('4')
                        ? activeColors.at(3)
                        : inactiveColor,
                )}
            >
                {labels.at(3)}
            </div>
        </div>
    );
});
