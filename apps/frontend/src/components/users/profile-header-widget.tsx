import { component$ } from '@builder.io/qwik';
import type { User } from '@prisma/client';
import { Link } from '@builder.io/qwik-city';

interface Props {
    user: User;
}

export default component$<Props>(({ user }) => {
    return (
        <Link
            href="/profile"
            class="h-full flex items-center gap-4 hover:bg-black/10 px-6 -mr-6"
        >
            {user.image && (
                <img
                    src={user.image}
                    width={48}
                    height={48}
                    class="rounded-full h-8 w-8"
                    alt=""
                />
            )}
            <div>{user.handle ?? 'Profile'}</div>
        </Link>
    );
});
