This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuring your .env file

Your .env file should include these items:

```bash
DB_DOCKER_CONTAINER_NAME=''
DB_DOCKER_HOST_PORT=''
DB_USER=''
DB_PASSWORD=''
DB_NAME=''

DATABASE_URL=''
```

`DB_DOCKER_CONTAINER_NAME`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` are arbitrary.

`DB_DOCKER_HOST_PORT` must be a [valid port number](<https://en.wikipedia.org/wiki/Port_(computer_networking)#Port_number>).

Whatever you choose will be applied to the Docker container and its database when they are created.

`DATABASE_URL` needs to combine the other elements like this: `DATABASE_URL='postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_DOCKER_HOST_PORT}/${DB_NAME}'`.

### Example .env file inclusion

```bash
DB_DOCKER_CONTAINER_NAME='a2ztmspostgres'
DB_DOCKER_HOST_PORT='5432'
DB_USER='a2ztmsuser'
DB_PASSWORD='a2ztmspassword'
DB_NAME='a2ztmsdbname'

DATABASE_URL='postgresql://a2ztmsuser:a2ztmspassword@localhost:5432/a2ztmsdbname'
```

## Creating a local database container

If your .env file is configured properly, and you have Docker installed, running `yarn docker` will create a Docker container, create a Postgres DB that reflects our Prisma schema and seeds it with some dummy data. Running `yarn docker` again will recognize the container has already been created and start it if it has been stopped.

The seed script (`yarn seed`) can be run at any time to restore dummy DB data. The seed script is non-destrutive.

<br/>

# Style Guide

### File Structure

This is a [Next.js App](https://nextjs.org/docs) using Next.js 14 App router

[Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)

- **prisma** - Prisma schema, migrations, and seed script
  <br >
- **/public** - Contains all static assets such as images (currently images stored as SVGs)
  <br >
- **/scripts** - These are scripts to be run from the command line. These files are not part of the core application
  <br >
- **/src**
  - /src/app - Directories in this folder correspond to routes and contain nested routes, layouts, and server actions as needed
  - /src/assets - Icons being stored as React components (other assets as needed)
  - /src/components - React components
  - /src/context - React context
  - /src/hooks - Custom hooks
  - /src/lib - Specialized helper functions
  - /src/store - Redux store and slices for async thunks
  - /src/types - Files with type declarations that can be used across the app
    <br>
- **/util** - Contains general-purpose utility functions

  <br/>

**Naming Conventions For Files**

- Capitalize folders containing React Components (ex: 'Components')
  - Files containing React components are to be capitalized, using PascalCase (ex: 'AuthButton.tsx')
- Lowercase other folders (ex: 'util')
  - Files not containing React components are to use camelCase (ex: 'carrierTypes.ts')

### Format

All of the code in this repo should be formatted & linted using Prettier and ESLint:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ([archive](https://web.archive.org/web/20231114192610/https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)). Config file: `/.prettierrc.json`

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) ([archive](https://web.archive.org/web/20231120210105/https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)). Config file `/.eslintrc.json`
