import { component$ } from '@builder.io/qwik';
import type { User } from '@prisma/client';

import { useAuthSession } from '../routes/plugin@auth';

import NavigationItem from './navigation/navigation-item';
import LoginForm from './users/login-form';
import ProfileHeaderWidget from './users/profile-header-widget';

export default component$(() => {
    const session = useAuthSession();
    const user = session.value?.user as User;

    return (
        <header class="h-16 bg-black/25">
            <div class="flex h-full container">
                <div class="flex items-center px-6 -ml-6">
                    <a
                        href="/"
                        class="flex items-center h-full text-lg font-bold text-white hover:text-white/50 transition-colors"
                    >
                        TekkenSpace
                    </a>
                </div>
                <nav class="h-full flex-1">
                    <ul class="flex m-0 p-0 h-full">
                        <NavigationItem href="/characters">
                            Characters
                        </NavigationItem>
                        <NavigationItem href="/share">Share</NavigationItem>
                    </ul>
                </nav>
                <div class="h-full flex items-center">
                    {user ? <ProfileHeaderWidget user={user} /> : <LoginForm />}
                </div>
            </div>
        </header>
    );
});
