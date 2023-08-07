import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';

import Button from './button';

test(`[Ui Component]: Should render`, async () => {
    const { screen, render } = await createDOM();
    await render(<Button />);
    expect(screen.innerHTML).toContain('button');
});
