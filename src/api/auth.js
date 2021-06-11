import { makeAPICall } from './api-utils';
import { LOGIN } from './api-urls';

export const loginRequest = (login) =>
  makeAPICall({
    method: 'POST',
    url: LOGIN(),
    data: login,
  });
