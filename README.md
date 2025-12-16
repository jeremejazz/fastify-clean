# Fastify Clean Architecture Example

Directory Structure

```
src/
├── **domain/** (Core Business Logic - Innermost Layer)
│   ├── entities/      # Core business objects (e.g., User, Product)
│   └── interfaces/    # Interfaces/Contracts for repositories, services, etc. (e.g., UserRepository)
│
├── **application/** (Use Cases/Application Business Rules)
│   ├── use-cases/     # Specific actions or features (e.g., CreateUser, GetAllUsers)
│
├── **infrastructure/** (Frameworks and Drivers - Outermost Layer)
│   ├── persistence/   # Concrete implementations of the interfaces (e.g., MongoDBUserRepository)
│   ├── services/      # Implementations for external services (e.g., EmailService)
│   └── web/           # Express setup, server config, and middleware
│
└── **interface-adapters/** (Glue Code/Controllers)
    ├── controllers/   # Adapt Express request/response to Use Cases
    └── routes/        # Express route definitions (maps URL to Controller method)


```