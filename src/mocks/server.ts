import { setupServer } from 'msw/node';
import { handlers } from './artwork-api.mock';

const server = setupServer(...handlers);

export { server };
