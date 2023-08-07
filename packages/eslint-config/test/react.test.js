import { describe } from 'vitest';

import config from '../react';

import {
    checkLintingErrors,
    checkValidity,
    createEngine,
} from './utils';

describe('vue config', () => {
    const engine = createEngine(config);

    checkValidity(engine);
    checkLintingErrors(engine);
});
