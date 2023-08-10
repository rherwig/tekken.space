import { component$ } from '@builder.io/qwik';
import type { User } from '@prisma/client';
import { useNavigate } from '@builder.io/qwik-city';
import { Avatar } from '@tekken-space/ui';

import { useAuthSession } from '../../plugin@auth';

export default component$(() => {
    const navigate = useNavigate();
    const session = useAuthSession();

    const user = session.value?.user as User | null;
    if (!user) {
        navigate('/404');
        return null;
    }

    return (
        <div class="container">
            <div class="h-28">
                <Avatar imageUrl={user.image} />
            </div>
        </div>
    );
});
