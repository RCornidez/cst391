
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