import type { Metadata } from 'next';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { pageMap } from './pageMap';
import 'nextra-theme-docs/style.css';

export const metadata: Metadata = {
  title: 'TMS Docs',
  description: '...',
};

const navbar = (
  <Navbar
    logo={<b>TMS</b>}
    projectLink="https://localhost:3000/" // NOTE: there is something going on with dark/ light mode when clicking
    // ... Your additional navbar options
  />
);
const footer = <Footer>MIT {new Date().getFullYear()} © TMS.</Footer>;

export default async function NextraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout
        // banner={null}
        navbar={navbar}
        pageMap={pageMap}
        docsRepositoryBase="https://github.com/BA-TMS/BA-TMS/tree/develop/src/app/docs/"
        footer={footer}
      >
        {children}
      </Layout>
    </>
  );
}
