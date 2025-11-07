![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=flat-square&logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-black?style=flat-square)
![Zod](https://img.shields.io/badge/Validation-Zod-3E67B1?style=flat-square)
![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448C5?style=flat-square&logo=cloudinary)
![Framer Motion](https://img.shields.io/badge/Animation-Framer_Motion-EF008F?style=flat-square&logo=framer)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)


# Workly Contacts

🔗 **Live Demo:** [https://contacts.workly.ink](https://contacts.workly.ink)


A modern, production-grade contact management platform — inspired by Google Contacts — built with Next.js 15 and TypeScript.
Designed for reliability, security, and exceptional user experience, Workly Contacts demonstrates enterprise-ready frontend development practices with a focus on performance and accessibility.

## Description

Workly Contacts is a full-featured frontend application for a modern contact management platform.
It provides an intuitive interface for secure authentication, comprehensive profile and session management, real-time activity tracking, and complete contact lifecycle operations.
Built with Next.js 15, TypeScript, and modern React patterns, it follows component-driven architecture principles, implements state management with Zustand, and integrates advanced UI features including smooth animations, responsive design, and robust form validation.
The application seamlessly connects with a scalable Node.js backend to deliver a fast, secure, and user-friendly contact management experience.RetryClaude can make mistakes. Please double-check responses.

---

## Features

### Authentication & Authorization
- **Local Authentication**: Secure login and signup with email and password
- **OAuth Integration**: Sign in seamlessly using Google OAuth
- **Password Management**: Reset password via secure forgot password flow with email verification
- **Multi-Device Sessions**: Support for up to 3 concurrent device logins
- **Hybrid Authentication System**: Combination of session-based and token-based authentication with token rotation
- **Access & Refresh Tokens**: Automatic token rotation for enhanced security
- **Session Management**: Token revocation and session blacklisting capabilities

### Account Security
- **Robust Account Center**: Centralized hub for managing all account settings and security features
- **Security Dashboard**: Comprehensive overview of account security status including:
  - Last password change date
  - Last login timestamp and location
  - Last login device information
  - Account creation date
  - Active sessions monitoring
  - Recent security activity log
- **Advanced Threat Protection**: Multi-layer security system to prevent bot attacks and unauthorized access:
  - Email notifications after 3 failed login attempts
  - reCAPTCHA challenge activated after 3 failed attempts
  - Account lockout after 9 failed login attempts
  - Secure account unlock via password reset
  - Automatic account removal if unlock is not completed
- **Activity Monitoring**: Track and review suspicious activities with detailed activity logs
- **Session Management**: View and manage active sessions across all logged-in devices with remote logout capability
- **Password Security**: Change password using old password verification
- **Account Deletion**: Schedule account deletion with 7-day grace period before permanent removal

### Personal Information Management
- **Profile Management**: View and edit personal information including:
  - Basic information (name, bio, etc.)
  - Profile avatar
  - Contact information
  - Multiple addresses
- **Password & Security Page**: Dedicated section for managing security settings and monitoring account safety

### Contact Management
- **CRUD Operations**: Create, read, update, and delete contacts with ease
- **Trash Management**: Soft delete contacts with 28-day retention and recovery options
- **Permanent Deletion**: Permanently remove contacts from trash
- **Favorites**: Mark important contacts as favorites for quick access
- **Labels & Organization**: Create custom labels to organize contacts efficiently
- **Label Management**: Create, update, and delete labels; manage contacts within specific labels
- **Bulk Operations**: Perform actions on multiple contacts simultaneously
- **Advanced Search**: Search contacts by name, email, or phone number
- **Unsaved Changes Protection**: Discard feature prevents data loss from accidental browser or tab closure

### Import & Export
- **Export Contacts**: Export single or multiple contacts in multiple formats:
  - JSON
  - CSV
  - vCard
- **Import Contacts**: Import contacts using CSV or vCard files with standardized templates
- **Print Functionality**: Print contact information directly from the dashboard

### Rate Limiting & Security Controls
- **Forgot Password Rate Limiting**: Prevents abuse of password reset functionality
- **OTP Resend with Exponential Backoff**: Smart retry mechanism for OTP verification in both signup and password reset flows
- **Unverified Account Cleanup**: Automatic removal of unverified accounts after 24 hours
- **Automatic Data Cleanup**: Trash and activity logs automatically deleted after 28 days
- **OAuth Password Enforcement**: Users signing up via OAuth must set a password before accessing the system

### User Experience
- **Responsive Design**: Fully responsive UI that works seamlessly across all devices
- **User Security-Centric**: Every feature designed with user security as the top priority
- **Reliable & Secure**: Comprehensive security measures to protect user data and accounts
- **Email Notifications**: Stay informed about account activities and security events

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.5** - React framework for production with server-side rendering and static site generation
- **TypeScript** - Type-safe JavaScript for enhanced developer experience and code reliability

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Re-usable component library built with Radix UI and Tailwind CSS
- **Framer Motion** - Production-ready animation library for React
- **GSAP** - Professional-grade animation platform for complex animations

### Icons
- **Lucide React** - Beautiful and consistent icon toolkit
- **React Icons** - Popular icon library with multiple icon sets
- **Google Material Icons** - Google's official material design icons

### State Management & Validation
- **Zustand** - Lightweight and flexible state management solution
- **Zod** - TypeScript-first schema validation library

### API & Security
- **Axios** - Promise-based HTTP client for API requests
- **reCAPTCHA** - Google's bot protection service for enhanced security

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Steps

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/workly-contact.git
    cd workly-contact
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up the backend server**
   
   Clone and set up the backend repository:
    ```bash
    git clone https://github.com/Abdullah00001/workly-contacts-server.git
    cd workly-contacts-server
    ```
   
   Follow the backend installation instructions in the [server repository](https://github.com/Abdullah00001/workly-contacts-server)

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add the following variables:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
    API_BASE_URL=http://localhost:5000/api/v1
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
    ```

5. **Start the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

> **Note:** Make sure the backend server is running before starting the frontend application.

## 🎯 Scripts

| Script                | Description                      |
| --------------------- | -------------------------------- |
| `npm run dev`         | Start development server         |
| `npm run build`       | Build for production             |
| `npm run preview`     | Preview production build         |
| `npm run lint`        | Run ESLint                       |
| `npm run lint:fix`    | Fix ESLint issues                |
| `npm run format`      | Format code with Prettier        |
| `npm run type-check`  | Run TypeScript type checking     |

## 📂 Project Structure

```
.
|
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── components.json
├── CONTRIBUTING.md
├── eslint.config.mjs
├── LICENSE
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
├── README.md
├── SECURITY.md
├── src
├── tsconfig.json
├── public/
│   ├── fonts/
│   └── videos/
└── src/
    ├── app/
    │   ├── (account-center)/
    │   │   └── accountscenter/
    │   │       └── security/
    │   ├── (activity)/
    │   │   └── activity/
    │   │       └── [objectId]/
    │   ├── (auth)/
    │   │   └── auth/
    │   │       ├── clear-session/
    │   │       ├── create-password/
    │   │       ├── login/
    │   │       ├── recover/
    │   │       ├── signup/
    │   │       ├── unlock/
    │   │       │   └── change/
    │   │       │       └── [uuid]/
    │   │       └── verify/
    │   ├── (dashboard)/
    │   │   ├── dashboard
    │   │   ├── favorite
    │   │   ├── label/
    │   │   │   └── [labelId]
    │   │   ├── new/
    │   │   ├── person/
    │   │   │   └── [objectId]/
    │   │   └── trash/
    │   └── (public pages)/
    │       ├── contact/
    │       ├── help/
    │       ├── privacy/
    │       └── terms/
    ├── components/
    │   ├── common/
    │   └── ui/
    ├── consts/
    ├── features/
    │   ├── account-center/
    │   │   ├── components/
    │   │   ├── services/
    │   │   └── types/
    │   ├── activity/
    │   │   ├── components/
    │   │   ├── lib/
    │   │   ├── services/
    │   │   └── types/
    │   ├── auth/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── lib/
    │   │   ├── service/
    │   │   └── types/
    │   ├── contact-details/
    │   │   ├── components/
    │   │   ├── helpers/
    │   │   ├── service/
    │   │   └── types/
    │   ├── contact-us/
    │   │   ├── components/
    │   │   └── services/
    │   ├── create-contact/
    │   │   ├── components/
    │   │   ├── helpers/
    │   │   ├── services/
    │   │   └── types/
    │   ├── dashboard/
    │   │   ├── components/
    │   │   ├── helper/
    │   │   ├── services/
    │   │   └── types/
    │   ├── home/
    │   │   └── components/
    │   ├── trash/
    │   │   ├── components/
    │   │   ├── services/
    │   │   └── types/
    │   └── update-contact/
    │       ├── components/
    │       ├── services/
    │       └── types/
    ├── hooks/
    ├── lib/
    │   └── validation/
    ├── providers/
    ├── stores/
    └── types/
```

## Contributing

This is a personal portfolio project created to showcase technical skills and coding abilities. While direct contributions are not accepted, feedback and suggestions are always welcome!

## How You Can Help

### Feedback & Suggestions

- Found a bug or issue? Please report it in the Issues section
- Have suggestions for improvements? I'd love to hear your thoughts
- Code review feedback is appreciated for learning purposes

### Professional Inquiries

- Interested in discussing the technical implementation? Feel free to reach out
- Questions about design decisions or architecture choices are welcome
- Open to networking and professional discussions about the project

### Educational Use

- Feel free to study the code structure and implementation patterns
- Use this project as a learning reference for similar applications
- Educational discussions about the codebase are encouraged

## Contact for Discussion

If you're interested in discussing this project, potential collaborations, or have professional inquiries:

- Open an issue for technical discussions
- Contact directly for professional inquiries
- Connect for networking and knowledge sharing

> **Note:** This project represents original work created entirely by the author for portfolio and learning purposes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have questions, please:

1. Check the [Issues](https://github.com/yourusername/workly-contacts/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the development team

## Acknowledgments

- Inspired by Google Contacts
- Built with modern web technologies
- Community-driven development

---

**Developed with ❤️ by Abdullah Bin Omar Chowdhury**  
_Designed for scalability, security, and real-world backend excellence._
