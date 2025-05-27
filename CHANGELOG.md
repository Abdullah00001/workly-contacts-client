# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [v1.1.0] - 2025-05-27

### ✨ Added
- Redesigned the **Forgot Password** frontend flow with step-based page guards.
- Implemented protected routes to restrict access based on backend token validation.
- Integrated with backend endpoints to verify step tokens via HTTP-only cookies:
  - `POST /auth/recover/check/stp1`
  - `POST /auth/recover/check/stp2`
  - `POST /auth/recover/check/stp3`

### ♻️ Changed
- Refactored routing logic for improved maintainability and security.
- Enhanced user experience by preventing unauthorized access to recovery steps.

### 🔧 Notes
- This update aligns frontend access control with backend security for the password recovery process.
- Prepares the frontend for further enhancements such as error handling and cooldown mechanisms.



## [1.0.2] - 2025-05-26

### Added
- CI/CD pipeline configuration to automate builds and deployments.
- NGINX configuration for serving the frontend application.

### Deployment
- Integrated with [Render](https://render.com) for seamless production deployment.

## [v1.0.1] - 2025-05-26

### Fixed
- Improved toast message on the forgot password **verify user info** page for clearer user feedback and better UX.

## [1.0.0] - 2025-05-25

### Added

#### Authentication (functional)

- Signup with email/phone
- OTP verification
- Logout

#### Forgot Password (functional)

- Find account by email/phone
- Verify user info & send OTP
- Verify OTP
- Reset password

#### Dashboard (static with fake data)

- Responsive layout
- Search feature
- Profile page with edit profile and change password
- Account settings: delete account, feedback
- Contacts management: add, delete, edit, favorite, select multiple

### Notes

- All authentication and recovery features are fully implemented and tested locally.
- Dashboard is currently static and will be powered by live data in upcoming versions.
