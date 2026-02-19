# Milestone 2
- Author: Rodrigo Cornidez
- Date: February 19, 2026

# Instructor Feedback
The feedback was positive, there were no direct changes needed at this stage: "Rodrigo, outstanding work and you Mermaid diagrams look fantastic, great work".

# Introduction
In this milestone assignment we are defining the API endpoints and request bodies to further refine our product ideas and 

Project Context:
I have been planning a mobile app design that allows users to develop on-the-go, the app is called MobileForge. I also own the domain mobileforge.app. The app will allow users to manually connect to servers with ssh access and a sftp text editor access. The functional requirements listed below are complimentary to this by offering a paid provisioning service that spins up a server and stages a project for a faster and convenient setup experience. The product that I'm selling is a subscription for this service.

# Requirements
1. User can self-register, login, update user information, and delete account.
2. User can select a subscription to purchase (this is the product).
3. User can add, update, and remove billing information.
4. User can add and delete API keys for GitHub and Digital Ocean. They can update the metadata only after creation.
5. User can provision a server with an optional cloning of a github repository with a minimal form: server name, select server size, select existing repository (optional).

# ER Diagram
```mermaid
erDiagram
    USER ||--o{ API_KEY : "has"
    USER ||--o| BILLING_INFO : "has"
    USER ||--o| USER_SUBSCRIPTION : "has"
    USER ||--o{ BILL : "receives"
    USER ||--o{ PROVISION : "creates"
    USER_SUBSCRIPTION }o--|| SUBSCRIPTION_PLAN : "subscribes to"
    BILL }o--|| USER_SUBSCRIPTION : "bills for"

    USER {
        uuid id PK
        string email UK
        string password_hash
        datetime created_at
        datetime updated_at
    }

    API_KEY {
        uuid id PK
        uuid user_id FK
        enum provider_type
        string key_name
        string encrypted_key
        datetime created_at
        datetime updated_at
    }

    BILLING_INFO {
        uuid id PK
        uuid user_id FK
        string payment_method_token
        string card_last_four      
        enum card_type
        datetime created_at
        datetime updated_at
    }

    BILL {
        uuid id PK
        uuid user_id FK
        uuid user_subscription_id FK
        decimal amount
        enum status
        datetime due_date
        datetime paid_date
        datetime created_at
    }

    PROVISION {
        uuid id PK
        uuid user_id FK
        string server_name
        string server_size
        enum status
        v4_v6 ip_address
        string github_repo_url
        datetime created_at
        datetime provisioned_at
        datetime deleted_at
    }

    USER_SUBSCRIPTION {
        uuid id PK
        uuid user_id FK
        uuid plan_id FK
        enum status
        datetime start_date
        datetime end_date
        datetime created_at
    }

    SUBSCRIPTION_PLAN {
        uuid id PK
        string name
        decimal price
        enum billing_period
        json features
        boolean is_active
    }
```

# UI Sitemap
```mermaid
graph TD
    Home[Landing Page]
    
    Home --> Login[Sign Up/Login]

    Login --> Dashboard

    Dashboard --> GettingStarted[Getting Started]
    Dashboard --> Account
    Dashboard --> Billing
    Dashboard --> Keys

```

# UI Wireframe
## Landing Page

*The landing page has three sections: the call-to-action and demo screen recordings.*

![Landing Page Wireframe Screenshot](screenshots/landing.png)

## Sign Up / Login

*The Sign Up/ Login page has a dynamic form that will either have two fields for logging in or three fields for signing up.*

![Signup/Login Page Wireframe Screenshot](screenshots/signup-login.png)

## Dashboard

*The Dashboard page has a navigation bar to the left and a content section on the right. The navigation links will be: Getting Started, Account, Billing, Keys. The content of these links are fairly minimal so they will navigate to sections using css ids instead of separate pages.*

![Dashboard Page Wireframe Screenshot](screenshots/dashboard.png)

# UML classes
```mermaid
classDiagram
    class User {
        -UUID id
        -String email
        -String passwordHash
        -DateTime createdAt
        -DateTime updatedAt
        +register(email, password) User
        +login(email, password) Boolean
        +updateProfile(data) Boolean
        +deleteAccount() Boolean
        +getApiKeys() List~ApiKey~
        +getBillingInfo() BillingInfo
        +getSubscription() UserSubscription
        +getProvisions() List~Provision~
    }

    class ApiKey {
        -UUID id
        -UUID userId
        -ProviderType providerType
        -String keyName
        -String encryptedKey
        -DateTime createdAt
        -DateTime updatedAt
        +create(userId, provider, name, key) ApiKey
        +delete() Boolean
        +updateMetadata(name) Boolean
        +decrypt() String
    }

    

    class BillingInfo {
        -UUID id
        -UUID userId
        -String payment_provider_token
        -String cardLastFour
        -CardType cardType
        -DateTime createdAt
        -DateTime updatedAt
        +create(userId, cardData) BillingInfo
        +update(cardData) Boolean
        +remove() Boolean
        +isValid() Boolean
    }

    class Bill {
        -UUID id
        -UUID userId
        -UUID userSubscriptionId
        -Decimal amount
        -BillStatus status
        -DateTime dueDate
        -DateTime paidDate
        -DateTime createdAt
        +generateBill(subscription) Bill
        +markPaid() Boolean
        +markFailed() Boolean
        +processPayment() Boolean
    }

    class Provision {
        -UUID id
        -UUID userId
        -String serverName
        -String serverSize
        -ProvisionStatus status
        -String ipAddress
        -String githubRepoUrl
        -DateTime createdAt
        -DateTime provisionedAt
        -DateTime deletedAt
        +create(userId, serverName, size, repo) Provision
        +provisionServer() Boolean
        +delete() Boolean
        +getStatus() ProvisionStatus
    }

    class UserSubscription {
        -UUID id
        -UUID userId
        -UUID planId
        -SubscriptionStatus status
        -DateTime startDate
        -DateTime endDate
        -DateTime createdAt
        +subscribe(userId, planId) UserSubscription
        +cancel() Boolean
        +renew() Boolean
        +isActive() Boolean
        +getBills() List~Bill~
    }

    class SubscriptionPlan {
        -UUID id
        -String name
        -Decimal price
        -BillingPeriod billingPeriod
        -JSON features
        -Boolean isActive
        +getAll() List~SubscriptionPlan~
        +getById(id) SubscriptionPlan
        +isAvailable() Boolean
    }

    class ProviderType {
        <<ENUM>>
        GITHUB
        DIGITAL_OCEAN
    }

    class CardType {
        <<ENUM>>
        VISA
        MASTERCARD
        AMEX
        DISCOVER
    }

    class BillStatus {
        <<ENUM>>
        PENDING
        PAID
        FAILED
        CANCELLED
    }

    class ProvisionStatus {
        <<ENUM>>
        PENDING
        PROVISIONING
        ACTIVE
        FAILED
        DELETED
    }

    class SubscriptionStatus {
        <<ENUM>>
        ACTIVE
        CANCELLED
        EXPIRED
        PAST_DUE
    }

    class BillingPeriod {
        <<ENUM>>
        MONTHLY
        YEARLY
    }

    User "1" --> "0..*" ApiKey
    User "1" --> "0..1" BillingInfo
    User "1" --> "0..1" UserSubscription
    User "1" --> "0..*" Bill
    User "1" --> "0..*" Provision
    UserSubscription "0..*" --> "1" SubscriptionPlan
    Bill "0..*" --> "1" UserSubscription
    ApiKey --> ProviderType
    BillingInfo --> CardType
    Bill --> BillStatus
    Provision --> ProvisionStatus
    UserSubscription --> SubscriptionStatus
    SubscriptionPlan --> BillingPeriod

```

# Risks
1. UI design changes to meet undiscovered needs.
2. Object/Entity changes for new actions or fields to meet undiscovered needs.

# REST Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Create a new user account |
| POST | /auth/login | Authenticate and return a token |
| POST | /auth/logout | Invalidate the current token |

#### Sample Request
```json
// POST
{
  "email": "cornidez04@gmail.com",
  "password": "supersecretpassword"
}
```

### User
| Method | Endpoint | Description |
|---|---|---|
| GET | /users | Get the authenticated user's profile using the token |
| PUT | /users | Update the authenticated user's profile using the token |
| DELETE | /users | Permanently delete the authenticated user's account using the token |

#### Sample Request
```json
// PUT
{
  "email": "cornidez04@gmail.com",
  "password": "newpassword"
}
```

### API Keys
| Method | Endpoint | Description |
|---|---|---|
| GET | /keys | List all API keys for the authenticated user |
| POST | /keys | Add a new API key |
| PUT | /keys/:id | Update the metadata (name) of an API key |
| DELETE | /keys/:id | Delete an API key |

#### Sample Request
```json
// POST
{
  "provider_type": "github",
  "key_name": "My GitHub Key",
  "key": "apikey123"
}

// PUT
{
  "key_name": "Updated Key Name"
}
```

### Billing Info
| Method | Endpoint | Description |
|---|---|---|
| GET | /billing | Get the user's billing information using the token |
| POST | /billing | Create billing information using the token |
| PUT | /billing | Update billing information using the token |
| DELETE | /billing | Remove billing information using the token |

#### Sample Request
```json
// POST and PUT
{
  "payment_method_token": "payment_provider_token",
  "card_last_four": "4242",
  "card_type": "VISA"
}
```

### Bills
| Method | Endpoint | Description |
|---|---|---|
| GET | /bills | List all bills for the authenticated user |
| GET | /bills/:id | Get details of a specific bill |
| POST | /bills | Create a bill record |

#### Sample Request
```json
// POST
{
  "user_subscription_id": "UUID",
  "amount": 19.99,
  "due_date": "2026-03-01T00:00:00Z",
  "paid_date": "2026-02-18T00:00:00Z"
}
```

### Subscriptions
| Method | Endpoint | Description |
|---|---|---|
| GET | /subscription-plans | List all available subscription plans |
| GET | /subscription-plans/:id | Get details of a specific subscription plan |
| GET | /subscriptions | Get the user's current subscription using the token |
| POST | /subscriptions | Subscribe to a plan using the token |
| PUT | /subscriptions | Update the plan subscription using the token |
| DELETE | /subscriptions | Cancel the current subscription using the token|

#### Sample Request
```json
// POST and PUT
{
  "plan_id": "uuid"
}
```

### Provisions
| Method | Endpoint | Description |
|---|---|---|
| GET | /provisions | List all provisioned servers for the authenticated user |
| GET | /provisions/:id | Get details of a specific provision |
| POST | /provisions | Provision a new server |
| DELETE | /provisions/:id | Deprovision and delete a server |

#### Sample Request
```json
// POST
{
  "server_name": "my-project-server",
  "server_size": "s-1vcpu-1gb",
  "github_repo_url": "https://github.com/rodrigo/my-project"
}
```


# Conclusion
This assignment allowed me to take time to define the API endpoints that will be needed to meet the user requirements. I was able to define the HTTP methods, routes, definitions, and include sample request bodies.
