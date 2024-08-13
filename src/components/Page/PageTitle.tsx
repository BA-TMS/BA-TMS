import Breadcrumbs from '@/components/Header/Breadcrumbs';

interface PageTitleProps {
  pageTitle: string;
}

const PageTitle = ({ pageTitle }: PageTitleProps) => {
  return (
    <>
      <h1 className="pagetitle">{pageTitle}</h1>
      <Breadcrumbs
        className="py-2 text-grey-600 dark:text-grey-300"
        root="Home"
        separator={<p className="mx-2">&#8226;</p>}
        pathComponentClassName="hover:underline"
        capitalizePathComponents
      />
    </>
  );
};

export default PageTitle;
