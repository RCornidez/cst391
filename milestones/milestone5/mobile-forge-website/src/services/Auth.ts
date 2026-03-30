import api from './CoreAPI';

export const login = async (email: string, password: string): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/auth/register', { email, password });
  return response.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/auth/logout', {});
  return response.data;
};
