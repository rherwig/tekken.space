import { component$ } from '@builder.io/qwik';

interface Props {
    imageUrl?: string | null;
}

export default component$<Props>((props) => {
    return (
        <div class="h-full aspect-square">
            {props.imageUrl && (
                <img
                    class="h-full w-full rounded-full"
                    width={256}
                    height={256}
                    src={props.imageUrl}
                />
            )}
        </div>
    );
});
