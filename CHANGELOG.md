# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

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
