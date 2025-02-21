# Pantore Dev

**Pantore Dev** is a full-stack application built with Next.js that integrates both the backend and frontend in a single repository. It was developed as part of a technical challenge for [Pantore Pay](https://pantorepay.com.br). The challenge involves creating a user management application to showcase my technical skills and join the company's development team. If you want to learn more about this challenge, follow the test description [here](https://github.com/Pantore/developer-test/blob/main/BACKEND.md).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Environment Setup](#environment-setup)
- [Testing](#testing)
- [Demo](#demo)

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
   git clone git@github.com:enriqueprieto/pantore-backend-dev.git
   cd pantore-backend-dev
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

## Demo

You can preview this project on live [here](https://pantore-backend-dev.vercel.app/).

