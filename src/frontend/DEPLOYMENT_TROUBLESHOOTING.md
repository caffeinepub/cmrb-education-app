# Deployment Troubleshooting Guide

## Issue Resolved: Frontend Build Failures

### Root Cause
The deployment was failing due to missing TypeScript modules and configuration files required for the frontend to communicate with the Internet Computer backend canister:

1. **Missing `config.ts`**: The `useActor.ts` hook was importing `createActorWithConfig` from a non-existent `config.ts` file
2. **Missing `backend.did.ts`**: No Candid interface definition file for the actor factory
3. **Missing `urlParams.ts`**: Utility function for extracting URL parameters was not implemented
4. **Runtime safety**: Study material file handling in `SubjectCard.tsx` needed guards to prevent crashes when ExternalBlob methods are unavailable

### Fix Applied
Created the following files to resolve the build and runtime issues:

1. **`frontend/src/config.ts`**: Implements backend connection configuration
   - `loadConfig()`: Loads canister configuration from `env.json` or environment variables
   - `createActorWithConfig()`: Creates an authenticated or anonymous actor with proper agent setup
   - Handles both local development and IC mainnet environments
   - Fetches root key for local replica

2. **`frontend/src/backend.did.ts`**: Candid interface factory
   - Exports `idlFactory` function that defines the backend service interface
   - Maps all backend types (UserProfile, Course, Category, Level, Topic, etc.)
   - Required by `Actor.createActor()` to structure canister calls

3. **`frontend/src/utils/urlParams.ts`**: URL parameter extraction utility
   - `getSecretParameter()`: Safely extracts query parameters from the URL
   - Used for admin token initialization

4. **Updated `frontend/src/hooks/useActor.ts`**:
   - Now properly imports from the new `config.ts` module
   - Added error handling for access control initialization
   - Guards against crashes when `_initializeAccessControlWithSecret` is unavailable

5. **Updated `frontend/src/components/SubjectCard.tsx`**:
   - Added runtime guards for ExternalBlob `getDirectURL()` calls
   - Prevents crashes when study material files don't have expected methods
   - Improved error handling with try-catch blocks

## Build and Deploy Steps

### Prerequisites
- dfx CLI installed (version 0.15.0 or later)
- Node.js and npm/pnpm installed
- Internet Computer local replica running

### Local Development Build & Deploy

1. **Start the local Internet Computer replica**:
   ```bash
   dfx start --clean --background
   ```

2. **Create the backend canister**:
   ```bash
   dfx canister create backend
   ```

3. **Generate backend bindings** (creates type declarations):
   ```bash
   dfx generate backend
   ```

4. **Deploy the backend canister**:
   ```bash
   dfx deploy backend
   ```

5. **Build the frontend**:
   ```bash
   cd frontend
   pnpm install
   pnpm build
   cd ..
   ```

6. **Deploy the frontend canister** (if using dfx for frontend hosting):
   ```bash
   dfx deploy frontend
   ```

7. **Access the application**:
   - The dfx output will show the canister URLs
   - Typically: `http://localhost:4943/?canisterId=<frontend-canister-id>`

### Production Deploy to IC Mainnet

1. **Ensure you have cycles** (ICP tokens converted to cycles for computation)

2. **Deploy to mainnet**:
   ```bash
   dfx deploy --network ic
   ```

3. **Verify deployment**:
   ```bash
   dfx canister --network ic status backend
   dfx canister --network ic status frontend
   ```

### Troubleshooting Tips

- **Build fails with "Cannot find module"**: Run `dfx generate backend` to regenerate type declarations
- **Actor initialization fails**: Ensure the local replica is running with `dfx start`
- **Root key fetch warning**: Normal in local development; not needed on IC mainnet
- **Access control errors**: Check that the admin token is passed correctly via URL parameter `?caffeineAdminToken=<token>`
- **Asset loading issues**: Verify all static assets exist in `frontend/public/assets/generated/`

### Environment Configuration

The app expects an `env.json` file in the frontend build output with:
