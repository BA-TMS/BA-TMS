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

```
DB_USER=''
DB_PASSWORD=''
DB_NAME=''

DATABASE_URL=''
```

The first 3 are arbitrary. Whatever you choose will be applied to the database when it is created. DATABASE_URL needs to combine the other elements like thi: `DATABASE_URL='postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/$(DB_NAME)`

## Creating a local database container

If your .env file is configured properly, and you have Docker installed, running `yarn docker` will create a Docker container, create a Postgres DB that reflects our Prisma schema and seeds it with some dummy data. Running `yarn docker` again will recognize the container has already been created and start it if it has been stopped.

The seed script (`yarn seed`) can be run at any time to restore dummy DB data. The seed script is non-destrutive.
