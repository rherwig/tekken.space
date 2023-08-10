import { component$, Slot } from '@builder.io/qwik';

interface Props {
    title: string;
}

export default component$<Props>((props) => {
    return (
        <div class="">
            <h3 class="text-lg mb-2">
                {props.title}
            </h3>
            <Slot/>
        </div>
    )
});
