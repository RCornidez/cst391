import api from './CoreAPI';

export interface ApiKey {
  id: string;
  userId: string;
  providerType: 'GITHUB' | 'DIGITAL_OCEAN';
  keyName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApiKeyPayload {
  providerType: 'GITHUB' | 'DIGITAL_OCEAN';
  keyName: string;
  apiKey: string;
}

export const getKeys = async (): Promise<ApiKey[]> => {
  const response = await api.get<ApiKey[]>('/keys');
  return response.data;
};

export const createKey = async (payload: CreateApiKeyPayload): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/keys', payload);
  return response.data;
};

export const renameKey = async (id: string, keyName: string): Promise<{ message: string }> => {
  const response = await api.put<{ message: string }>(`/keys/${id}`, { keyName });
  return response.data;
};

export const deleteKey = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/keys/${id}`);
  return response.data;
};
