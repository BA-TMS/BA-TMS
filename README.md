# Auto-formatting

All of the code in this repo should be automatically formatted & linted.

A lot of that should be accomplished by use of two VSCode extensions, plus two config files:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ([archive](https://web.archive.org/web/20231114192610/https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)). Config file: `/.prettierrc.json`

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) ([archive](https://web.archive.org/web/20231120210105/https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)). Config file `/.eslintrc.json`

# From `npx create-next-app`

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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
