# Welcome

This repository provides a dashboard template designed to assist developers from initial setup to deployment.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Environment Setup](#environment-setup)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Roadmap](#roadmap)

## Features

- **User CRUD Operations:**
  - **Create:** Create a new user with a hashed password and role (ADMIN or CLIENT).
  - **Read:** Retrieve and list users with filters (name, email, role).
  - **Update:** Update user profiles.
  - **Delete:** Delete a user with restrictions that prevent users from deleting themselves and only administrators can delete.

- **Authentication:**
  - Implemented using NextAuth.js with a Credentials Provider (email/password).
  - Extended type definitions to include custom fields such as `role`.
  - Middleware protects routes, redirecting unauthorized access to `/auth/login` for pages and returning a 401 error for API routes.

- **Frontend:**
  - Dashboard with a Data Table component built with shadcn/ui and Tailwind CSS.
  - Filter forms with validation using Formik and Yup.
  - Popover-based filters that close upon form submission.

- **API Features**
    - **User Management**
        - **`GET /api/users`** → Returns a paginated list of users with filtering options (`name`, `email`, `role`).
        - **`POST /api/users/create`** → Creates a new user with a hashed password.
        - **`GET /api/users/:userId`** → Retrieves details of a specific user.
        - **`PUT /api/users/:userId`** → Updates user details.
        - **`DELETE /api/users/:userId`** → Deletes a user (cannot delete self).

    - **Authentication API**
        - **`POST /api/auth/login`** → Logs in a user and returns a session.
        - **`POST /api/auth/logout`** → Logs out the user.

- **Middleware**
  - Protects all `/dashboard` routes using `withAuth`.
  - Restricts API routes by returning a **401 Unauthorized** response instead of a redirect.
  - Checks user roles and permissions dynamically.

## Technologies

- **Next.js:** React framework for server-side rendering (SSR) and API routes.
- **TypeScript:** Provides static type checking.
- **NextAuth.js:** Authentication with JWT support.
- **Prisma:** ORM for PostgreSQL.
- **Formik:** Used for handling form interactions.
- **Yup:** Used for form validation schemas.
- **PostgreSQL:** Relational database.
- **Tailwind CSS & shadcn/ui:** Component library and styling framework.
- **Jest & React Testing Library:** For unit and integration testing.
- **bcrypt:** For password hashing.

## Environment Setup

> Warning: To run this application in your environment system, take sure you have already `Docker Compose` installed in your system. Let's check out next steps.

1. **Clone the repository:**

```bash
   git clone git@github.com:enriqueprieto/nextjs-shadcn-prisma-auth-dashboard-template.git
   cd nextjs-shadcn-prisma-auth-dashboard-template
```

2. **Install dependencies:**

```bash
npm install
```

You can also use `yarn install`.

3. **Create a .env file in the project root with the following variables:**

```bash
cp .env.example .env
```

4. **Setup NextAuth Secret token**

```bash
npm run next-auth:secret
```

This command will generate a new `NEXTAUTH_SECRET` token and update your `.env`.

4. **Run `docker-compose` command**

```bash
docker-compose up -d
```

This command will start a PostgreSQL database using the values from the `.env` file.

5. **Run dabatase setup**

```bash
npm run prisma:bootstrap
```

This command will connect to the database, set it up, run migrations, and seed initial data.


6. **Run application**

```bash
npm run dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License, see the [LICENSE.md](./LICENSE.md) file for details

## Roadmap

In this section you'll find all task I had mapped for while, all of the task is about the future of this template.

- [ ] i18n
- [ ] Setup `husky` for git commits handles.
  - [ ] Run `eslint`
  - [ ] Run unit tests with coverage
- [ ] Command-line
  - [ ] Generate new resources feature
- [ ] Tests
  - [ ] Unit tests
    - [ ] Create tests for `User` resources
    - [ ] Create tests for `Authentication` feature.
  - [ ] End to End
    - [ ] Setup `e2e` tests using `Cypress`
    - [ ] Create tests for `Authentication` feature.
      - [ ] Create a config to setup `authentication` state on sections.
  - [ ] Create an tests for `User` resrouce.

