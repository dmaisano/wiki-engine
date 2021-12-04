// import path from 'path';

import { resolve } from 'path';

export const PROJECT_ROOT_DIR: string = resolve(__dirname, '../../');

export const __prod__ = process.env.NODE_ENV === `production`;
