
CREATE TABLE users (
    id              CHAR(36)        NOT NULL    DEFAULT (UUID()),
    email           VARCHAR(255)    NOT NULL,
    password_hash   VARCHAR(255)    NOT NULL,
    created_at      DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT uk_users_email UNIQUE (email)
);

CREATE TABLE subscription_plans (
    id              CHAR(36)        NOT NULL    DEFAULT (UUID()),
    name            VARCHAR(255)    NOT NULL,
    price           DECIMAL(10, 2)  NOT NULL,
    billing_period  ENUM('MONTHLY', 'YEARLY') NOT NULL,
    features        JSON            NOT NULL,
    is_active       BOOLEAN         NOT NULL    DEFAULT TRUE,

    CONSTRAINT pk_subscription_plans PRIMARY KEY (id)
);

CREATE TABLE api_keys (
    id              CHAR(36)        NOT NULL    DEFAULT (UUID()),
    user_id         CHAR(36)        NOT NULL,
    provider_type   ENUM('GITHUB', 'DIGITAL_OCEAN') NOT NULL,
    key_name        VARCHAR(255)    NOT NULL,
    encrypted_key   VARCHAR(255)    NOT NULL,
    created_at      DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_api_keys PRIMARY KEY (id),
    CONSTRAINT fk_api_keys_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE billing_info (
    id                      CHAR(36)        NOT NULL    DEFAULT (UUID()),
    user_id                 CHAR(36)        NOT NULL,
    payment_provider_token  VARCHAR(255)    NOT NULL,
    card_last_four          CHAR(4)         NOT NULL,
    card_type               ENUM('VISA', 'MASTERCARD', 'AMEX', 'DISCOVER') NOT NULL,
    created_at              DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_billing_info PRIMARY KEY (id),
    CONSTRAINT fk_billing_info_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE provisions (
    id                  CHAR(36)        NOT NULL    DEFAULT (UUID()),
    user_id             CHAR(36)        NOT NULL,
    server_name         VARCHAR(255)    NOT NULL,
    server_size         VARCHAR(255)    NOT NULL,
    status              ENUM('PENDING', 'PROVISIONING', 'ACTIVE', 'FAILED', 'DELETED') NOT NULL DEFAULT 'PENDING',
    droplet_id          VARCHAR(255),
    ip_address          VARCHAR(45),
    github_repo_url     VARCHAR(255),
    created_at          DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    provisioned_at      DATETIME,
    deleted_at          DATETIME,

    CONSTRAINT pk_provisions PRIMARY KEY (id),
    CONSTRAINT fk_provisions_user FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO subscription_plans (id, name, price, billing_period, features, is_active)
VALUES
    (
        UUID(),
        'The Journeyman',
        0.00,
        'MONTHLY',
        '[
            { "title": "SSH Access", "description": "Securely connect to your servers directly from your mobile device." },
            { "title": "SFTP Editor", "description": "Browse and edit your project files on the go." },
            { "title": "Provisioning", "description": "Automatic provisioning? You have not yet earned the right to wield such power. Sharpen your own blade.", "locked": true },
            { "title": "GitHub Integration", "description": "The ravens do not fly for free. Upgrade to send them.", "locked": true },
            { "title": "Feature Voting", "description": "One does not simply walk into the voting chamber.", "locked": true }
        ]',
        TRUE
    ),
    (
        UUID(),
        'The Apprentice',
        15.00,
        'MONTHLY',
        '[
            { "title": "SSH Access", "description": "Securely connect to your servers directly from your mobile device." },
            { "title": "SFTP Editor", "description": "Browse and edit your project files on the go." },
            { "title": "WireGuard VPN Setup", "description": "Automatically initialize VPN config files for easy security lockdown — just login, download, and restrict the firewall." },
            { "title": "Unlimited Provisioning", "description": "Spin up as many servers as you need, anytime." },
            { "title": "GitHub Integration", "description": "Automatically clone repositories and stage your project on provision." },
            { "title": "Feature Voting", "description": "Propose and vote on upcoming MobileForge features." }
        ]',
        TRUE
    ),
    (
        UUID(),
        'The Blacksmith',
        10.00,
        'YEARLY',
        '[
            { "title": "SSH Access", "description": "Securely connect to your servers directly from your mobile device." },
            { "title": "SFTP Editor", "description": "Browse and edit your project files on the go." },
            { "title": "WireGuard VPN Setup", "description": "Automatically initialize VPN config files for easy security lockdown — just login, download, and restrict the firewall." },
            { "title": "Unlimited Provisioning", "description": "Spin up as many servers as you need, anytime." },
            { "title": "GitHub Integration", "description": "Automatically clone repositories and stage your project on provision." },
            { "title": "Feature Voting", "description": "Propose and vote on upcoming MobileForge features. Your votes carry double the weight." },
            { "title": "Forge Savings", "description": "Save $60/year compared to the monthly plan." }
        ]',
        TRUE
    );