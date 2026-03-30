export interface PaymentCard {
    nameOnCard: string;
    cardNumber: string;
    expMonth: number;
    expYear: number;
    cvv: string;
    address: string;
    state: string;
    zip: string;
}

export interface PaymentResult {
    token: string;
    last4: string;
    success: boolean;
}

export const createPaymentToken = async (card: PaymentCard): Promise<PaymentResult> => {
    const randomId = Math.random().toString(36).substring(2, 18).toUpperCase();
    return {
        token: randomId,
        last4: card.cardNumber.slice(-4),
        success: true,
    };
};

export const updatePaymentToken = async (card: PaymentCard): Promise<PaymentResult> => {
    const randomId = Math.random().toString(36).substring(2, 18).toUpperCase();
    return {
        token: `tok_live_${randomId}`,
        last4: card.cardNumber.slice(-4),
        success: true,
    };
};

export const deletePaymentToken = async (token: string): Promise<boolean> => {
    console.log(`[external-payment.service] Mock delete: token ${token}`);
    return true;
};

export const chargePaymentToken = async (token: string, amount: number): Promise<boolean> => {
    console.log(`[external-payment.service] Mock charge: $${amount} on token ${token}`);
    return true;
};