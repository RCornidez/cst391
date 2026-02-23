export enum ProviderType {
    GITHUB = "GITHUB",
    DIGITAL_OCEAN = "DIGITAL_OCEAN",
}

export enum CardType {
    VISA = "VISA",
    MASTERCARD = "MASTERCARD",
    AMEX = "AMEX",
    DISCOVER = "DISCOVER",
}

export enum ProvisionStatus {
    PENDING = "PENDING",
    PROVISIONING = "PROVISIONING",
    ACTIVE = "ACTIVE",
    FAILED = "FAILED",
    DELETED = "DELETED",
}

export enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED",
    PAST_DUE = "PAST_DUE",
}