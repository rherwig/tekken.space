import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

import GenericMove from '../../components/moves/generic-move';

export const head: DocumentHead = {
    title: 'Tekken Space - Share',
    meta: [
        {
            name: 'description',
            content: '',
        },
    ],
};

export default component$(() => {
    const location = useLocation();
    const nav = useNavigate();
    const notation = useSignal('');

    useTask$(() => {
        const initialNotation = '';
        if (!initialNotation) {
            return;
        }

        notation.value = decodeURI(initialNotation);
    });

    useTask$(({ track }) => {
        track(() => notation.value);

        if (!notation.value) {
            nav(location.url.pathname);
            return;
        }

        nav(`${location.url.pathname}?n=${encodeURI(notation.value)}`);
    });

    return (
        <div class="container">
            <h1 class="text-4xl font-bold mb-8">Share Moves</h1>
            <p class="max-w-[80ch]">
                Enter the notation for the combo you want to share and click the "Copy Share Link" button. The link to
                your combo will be copied to the clipboard. You can then share the link with your friends.
            </p>

            <input
                type="text"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                placeholder="Enter notation here, i.e. d/f+2,1"
                class="block rounded-b-none w-full px-4 py-2 mt-8 border border-black/25 rounded-md bg-black/25"
                bind:value={notation}
            />

            <div class="min-h-[88px] bg-black/25">
                <GenericMove
                    notation={notation.value}
                    key={`k-${notation.value}`}
                />
            </div>
        </div>
    );
});
