import { describe } from 'vitest';

import config from '../index';

import {
    checkLintingErrors,
    checkValidity,
    createEngine,
} from './utils';

describe('base config', () => {
    const engine = createEngine(config);

    checkValidity(engine);
    checkLintingErrors(engine);
});
