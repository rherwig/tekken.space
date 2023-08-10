import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

interface Props {
    href: string;
}

export default component$<Props>((props) => {
    return (
        <li class="h-full">
            <Link
                href={props.href}
                class="flex items-center h-full px-6 hover:bg-black/10 transition-colors"
            >
                <Slot />
            </Link>
        </li>
    );
});
