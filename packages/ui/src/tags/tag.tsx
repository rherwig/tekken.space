import clsx from 'classnames';
import { component$, Slot } from '@builder.io/qwik';

interface Props {
    className?: string;
    color?: 'red' | 'blue' | 'green' | 'yellow' | 'gray';
}

export default component$<Props>(({ color, className }) => {
    const colorSchemes = {
        red: 'bg-red-800 text-red-100',
        blue: 'bg-blue-800 text-blue-100',
        green: 'bg-green-800 text-green-100',
        yellow: 'bg-yellow-800 text-yellow-100',
        gray: 'bg-black/40 text-zinc-300',
        white: 'bg-white/50 text-white',
    };

    return (
        <span
            class={clsx(
                'flex items-center rounded-sm px-3 py-0.5 text-sm',
                colorSchemes[color || 'gray'],
                className,
            )}
        >
            <Slot />
        </span>
    );
});
