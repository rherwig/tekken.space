import type { DefaultSession } from '@auth/core/types';
import type { User } from '@prisma/client';

declare module '@auth/core' {
    interface Session extends DefaultSession {
        user: User;
    }
}
