import '@testing-library/jest-dom';
//import * as matchers from '@testing-library/jest-dom/types/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

//expect.extend(matchers);

afterEach(() => {
    cleanup();
})