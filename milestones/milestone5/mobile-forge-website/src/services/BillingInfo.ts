import api from './CoreAPI';

export interface BillingInfo {
  id: string;
  userId: string;
  cardLastFour: string;
  cardType: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER';
  createdAt: string;
  updatedAt: string;
}

export interface BillingFormPayload {
  nameOnCard: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  address: string;
  state: string;
  zip: string;
  cardType: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER';
}

export const getBillingInfo = async (): Promise<BillingInfo> => {
  const response = await api.get<BillingInfo>('/billing');
  return response.data;
};

export const createBillingInfo = async (payload: BillingFormPayload): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/billing', payload);
  return response.data;
};

export const updateBillingInfo = async (payload: BillingFormPayload): Promise<{ message: string }> => {
  const response = await api.put<{ message: string }>('/billing', payload);
  return response.data;
};

export const deleteBillingInfo = async (): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>('/billing');
  return response.data;
};
