import { describe } from 'vitest';

import config from '../next';

import {
    checkLintingErrors,
    checkValidity,
    createEngine,
} from './utils';

describe('next config', () => {
    const engine = createEngine(config);

    checkValidity(engine);
    checkLintingErrors(engine);
});
