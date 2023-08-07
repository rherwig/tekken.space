import { describe } from 'vitest';

import config from '../nuxt';

import { checkLintingErrors, checkValidity, createEngine } from './utils';

describe('nuxt config', () => {
    const engine = createEngine(config);

    checkValidity(engine);
    checkLintingErrors(engine);
});
