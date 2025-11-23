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
    CREATE: `${BASE_URL}/session/create`,
    DELETE: `${BASE_URL}/session/delete/:id`,
    GET_BY_ID: `${BASE_URL}/session/:id`,
  },
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/ai/generate-questions`,
    GENERATE_EXPLANATION: `${BASE_URL}/ai/generate-explanation`,
  },
  QUESTION: {
    UPDATE_NOTE: `${BASE_URL}/question/:id/update-note`,
    ADD: `${BASE_URL}/question/add`,
  },
};
