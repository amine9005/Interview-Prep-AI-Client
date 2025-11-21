export const BASE_URL = "http://localhost:4200/api";

export const apiPaths = {
  AUTH: {
    LOGIN: `${BASE_URL}/user/login`,
    REGISTER: `${BASE_URL}/user/register`,
    GET_PROFILE: `${BASE_URL}/user/profile`,
  },
  IMAGE: {
    UPLOAD: `${BASE_URL}/user/upload-image`,
  },

  SESSIONS: {
    GET_ALL: `${BASE_URL}/session/my-sessions`,
  },
};
