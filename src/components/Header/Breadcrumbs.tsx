import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, ReactNode } from 'react';

type Parameters = {
  className?: string;
  root: string;
  separator: ReactNode;
  pathComponentClassName?: string;
  capitalizePathComponents?: boolean;
};

const Breadcrumbs = ({
  className,
  root,
  separator,
  pathComponentClassName,
  capitalizePathComponents,
}: Parameters) => {
  function maybeCapitalize(text: string) {
    return capitalizePathComponents
      ? text[0].toUpperCase() + text.slice(1)
      : text;
  }

  function breadcrumb(linkPath: string, text: string) {
    return (
      <li className={pathComponentClassName}>
        <Link
          className="body2 text-grey-600 dark:text-grey-300"
          href={linkPath}
        >
          {maybeCapitalize(text)}
        </Link>
      </li>
    );
  }

  const components = usePathname()
    .split('/')
    .filter((component) => component.length > 0);

  function maybeSeparator(index: number) {
    return components.length > index && separator;
  }

  const nonRootBreadcrumbs = components.map((component, index) => {
    const linkPath = `/${components.slice(0, index + 1).join('/')}`;

    return (
      <Fragment key={index}>
        {breadcrumb(linkPath, component)}
        {maybeSeparator(index + 1)}
      </Fragment>
    );
  });

  return (
    <ul className={`flex${className ? ` ${className}` : ''}`}>
      {breadcrumb('/', root)}
      {maybeSeparator(0)}
      {nonRootBreadcrumbs}
    </ul>
  );
};

export default Breadcrumbs;
