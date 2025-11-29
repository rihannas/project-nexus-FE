import { apiClient } from './client';

export const authApi = {
  login: (username: string, password: string) => {
    return apiClient.post<{ access: string; refresh: string }>('/api/token/', {
      username,
      password,
    });
  },

  refreshToken: (refresh: string) => {
    return apiClient.post<{ access: string }>('/api/token/refresh/', {
      refresh,
    });
  },

  register: (userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => {
    return apiClient.post('/api/auth/register/', userData);
  },
};
