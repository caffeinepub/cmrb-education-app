# Specification

## Summary
**Goal:** Resolve the current deployment error and ensure the project’s standard build and deploy workflow completes successfully for both the Motoko backend canister and the React frontend assets.

**Planned changes:**
- Investigate the root cause of the deployment failure and apply the minimal code/config fixes needed to restore a clean build for both backend and frontend.
- Verify end-to-end deploy succeeds and the deployed app is reachable and renders the main sections (Hero, Subjects, Courses) without runtime crashes.
- Add a short, developer-facing troubleshooting note in the repository documenting the original failure mode, the fix, and exact build/deploy commands to reproduce success.

**User-visible outcome:** The app deploys successfully, loads in the browser, and renders the Hero, Subjects, and Courses sections without errors.
