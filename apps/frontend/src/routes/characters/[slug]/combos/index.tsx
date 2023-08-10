import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { type InitialValues, useForm } from '@modular-forms/qwik';

type CreateComboForm = {
    notation: string;
    name?: string;
};

export const useFormLoader = routeLoader$<InitialValues<CreateComboForm>>(
    () => {
        return {
            notation: '',
            name: '',
        };
    },
);

export default component$(() => {
    useForm<CreateComboForm>({
        loader: {
            value: {
                name: '',
                notation: '',
            },
        },
    });

    return (
        <div class="container py-10">
            <h1 class="mb-4 text-xl">Characters</h1>
        </div>
    );
});
