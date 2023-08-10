import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <div class="container flex flex-col items-center text-md">
            <h1 class="mb-4 text-display font-serif">404</h1>
            <p>Looks like the page you are looking for escaped.</p>
            <p>If you wave-dash fast enough, you might be able to catch it.</p>
            <p class="mt-4">
                Or perhaps you are interested in one of these page...
            </p>

            <ul class="flex gap-4 mt-4">
                <li>
                    <Link
                        href="/"
                        class="underline hover:no-underline"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/characters"
                        class="underline hover:no-underline"
                    >
                        Browse Characters
                    </Link>
                </li>
            </ul>
        </div>
    );
});
