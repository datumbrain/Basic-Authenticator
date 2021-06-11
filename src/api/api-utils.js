import axios from 'axios';

// MAKE AN API REQUEST & RESOLVE PROMISE AFTER AXIOS REQUEST
export const makeAPICall = ({
  url = '',
  method = 'GET',
  data = {},
  headers = {},
}) => {
  return new Promise((resolve, reject) => {
    const config = { url, method, data, headers };
    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            reject('Bad Request');
          } else if (error.response.status === 401) {
            reject('Unauthorized Access');
          } else if (error.response.status === 403) {
            reject('Forbidden Action');
          } else if (error.response.status === 404) {
            reject('Unable to find requested record');
          } else if (error.response.status === 406) {
            reject('Not Acceptable');
          } else if (error.response.status === 500) {
            reject('Internal Server Error');
          } else if (error.response.status === 502) {
            reject('Bad Gateway');
          } else {
            reject('Could not Process Request');
          }
        }
        reject('Could not Process Request');
      });
  });
};

export const getJWT = () => {
  return localStorage.getItem('jwt-token');
};

export const getHeaders = (jwtToken) => {
  return {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + jwtToken,
  };
};
