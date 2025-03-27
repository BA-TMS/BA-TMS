import { Footer, Layout, Navbar } from 'nextra-theme-docs';
// import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

const navbar = (
  <Navbar
    logo={<b>TMS</b>}
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
        banner={null}
        navbar={navbar}
        pageMap={await getPageMap()}
        docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
        footer={footer}
        // ... Your additional layout options
      >
        {children}
      </Layout>
    </>
  );
}
