// this component helps with the layout of full page forms

type ContainerProps = {
  title: string;
  children: React.ReactNode;
};

export default function FullPageFormContainer({
  title,
  children,
}: ContainerProps) {
  return (
    <section>
      <h1 className="pagetitle text-grey-800 dark:text-white pb-4.5">
        {title}
      </h1>
      <div className="px-4.5 rounded-[14.5px] border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900">
        <section>{children}</section>
      </div>
    </section>
  );
}
