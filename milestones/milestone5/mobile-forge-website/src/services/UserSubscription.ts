import api from './CoreAPI';

export interface PlanFeature {
  title: string;
  description: string;
  locked?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: string;
  features: PlanFeature[];
  isActive: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE';
  startDate: string;
  endDate: string | null;
  createdAt: string;
}

export const getPlans = async (): Promise<SubscriptionPlan[]> => {
  const response = await api.get<any[]>('/subscription-plans');
  return response.data.map(p => ({ ...p, features: JSON.parse(p.features) }));
};

export const getPlanById = async (id: string): Promise<SubscriptionPlan> => {
  const response = await api.get<any>(`/subscription-plans/${id}`);
  return { ...response.data, features: JSON.parse(response.data.features) };
};

export const getSubscription = async (): Promise<UserSubscription> => {
  const response = await api.get<UserSubscription>('/subscriptions');
  return response.data;
};

export const createSubscription = async (planId: string): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/subscriptions', { planId });
  return response.data;
};

export const updateSubscription = async (planId: string): Promise<{ message: string }> => {
  const response = await api.put<{ message: string }>('/subscriptions', { planId });
  return response.data;
};

export const cancelSubscription = async (): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>('/subscriptions');
  return response.data;
};
