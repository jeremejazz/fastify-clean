import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroTodo } from './src/infrastructure/persistence/mikro-entities/mikro-todo'
import dotenv from 'dotenv';
 // Adjust path as needed

// Load environment variables from .env file
dotenv.config();

const config: Options<PostgreSqlDriver> = {
    // 1. Database Driver and Connection Details (Uses Environment Variables)
    driver: PostgreSqlDriver,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    dbName: process.env.DB_NAME || 'todo',

    // 2. Entity Management
    // List all entities managed by MikroORM. These are the ORM-specific classes.
    entities: [MikroTodo],
    
    // 3. Migration Setup (Highly Recommended)
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: './src/infrastructure/migrations', // Path to the migration files
        transactional: true, // Wrap migrations in a transaction
        // Recommended settings for production:
        // disableForeignKeys: true, 
        // allOrNothing: true,
    },

    // 4. Debugging and Logging
    // debug: process.env.NODE_ENV !== 'production', // Enable logging of SQL queries
    logger: (message: string) => console.log(message), // Custom logger function

    // 5. Schema Synchronization (Use only for development/testing, prefer migrations for production)
    // allowGlobalContext: true, // Needed for running ORM CLI tools easily
    
    // 6. CLI Configuration
    // These paths are used by the MikroORM CLI tools (e.g., `mikro-orm migration:create`)
    // Ensure the paths are correct relative to your project root.
    // cli: {
    //     entitiesDirsTs: ['./src/infrastructure/persistence/mikro-entities'],
    //     migrationsDirTs: './src/infrastructure/migrations',
    // },
};

export default config;