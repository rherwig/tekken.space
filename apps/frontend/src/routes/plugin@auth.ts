import { serverAuth$ } from '@builder.io/qwik-auth';
import GitHub from '@auth/core/providers/github';
import type { Provider } from '@auth/core/providers';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@tekken-space/database';

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
    serverAuth$(({ env }) => ({
        secret: env.get('AUTH_SECRET'),
        adapter: PrismaAdapter(prisma),
        trustHost: true,
        providers: [
            GitHub({
                clientId: env.get('GITHUB_OAUTH_CLIENT_ID')!,
                clientSecret: env.get('GITHUB_OAUTH_CLIENT_SECRET')!,
            }),
        ] as Provider[],
        callbacks: {
            async session({ session, user }) {
                session.user = user;

                return session;
            },
        },
    }));
