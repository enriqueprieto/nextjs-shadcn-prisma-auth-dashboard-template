# Pantore Dev

The **Pantore Dev** is a full-stack application built with Next.js that integrates both backend and frontend in a single repository for a technical challenge by [Pantore Pay](https://pantorepay.com.br). The technical challenge involves creating an application for managing users, show up my tech skills and join in development team of company. If you want to know more about this challenge follow the test description [link](https://github.com/Pantore/developer-test/blob/main/BACKEND.md).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Environment Setup](#environment-setup)
- [Testing](#testing)

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

## Technologies

- **Next.js:** React framework for server-side rendering (SSR) and API routes.
- **TypeScript:** Provides static type checking.
- **NextAuth.js:** Authentication with JWT support.
- **Prisma:** ORM for PostgreSQL.
- **Formik:** Used to create pettry interactions with forms.
- **Yup:** Used to create validation schemas.
- **PostgreSQL:** Relational database.
- **Tailwind CSS & shadcn/ui:** Component library and styling framework.
- **Jest & React Testing Library:** For unit and integration testing.
- **bcrypt:** For password hashing.

## Environment Setup

1. **Clone the repository:**

```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
```

2. **Install dependencies:**

```
npm install
```

You can use `yarn install` as well.

3. **Create a .env file in the project root with the following variables:**

```bash
cp .env.example .env
```

4. **Run `docker-compose` command**

```bash
docker-compose up -d
```

This command will up our Postgre database with `.env` values.

5. **Run dabatase setup**

```bash
npm run prisma:bootstrap
```

This command will connect, setup, migrate and seed our database.


6. **Run application**

```bash
npm run dev
```

Now the url `http://localhost:3000` is available to access.


