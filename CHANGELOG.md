# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [v1.2.0-beta] - 2025-07-05

### 🚧 Beta Release Notes

This beta release introduces major feature sets and UI improvements across the application. It sets the foundation for a stable and feature-rich MVP.

---

### ✨ Features

- **Edit Contact**
  - Full edit page UI and backend logic
  - Discard changes support on edit
- **Create Contact**
  - Discard functionality added for safer exit
- **Get All Contacts**
  - Backend support for retrieving all contact records
- **Bulk Trash**
  - Move multiple contacts to trash at once
- **Single Trash & Recovery**
  - Delete or recover individual trashed contacts
- **Search**
  - Contact search by name or email integrated into UI and API
- **Favorite Page**
  - Connected to backend and now fully functional
- **Feedback**
  - Feedback form/modal implemented with backend integration
- **Profile**
  - “Coming Soon” UI placeholder added

---

### 💄 UI Improvements

- Updated **Trash Page**:
  - More responsive layout
  - Improved mobile accessibility for action menus
  - Empty state visuals added
- General UI polishing across contact list, form inputs, and empty pages

---

### ⚙️ Developer Notes

- All features were manually tested locally.
- These features will undergo further QA and refinement before a stable release.
- No breaking changes introduced.

---

🔖 Tag: `v1.2.0-beta`  
📅 Date: **July 5, 2025**

## [v1.1.1] - 2025-06-03

### Fixed

- Updated Vercel configuration to fix an issue in production where reloading the page caused an unintended redirect to the home page.

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
