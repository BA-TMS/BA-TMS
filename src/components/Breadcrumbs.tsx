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

export default ({
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
        <Link href={linkPath}>{maybeCapitalize(text)}</Link>
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
    <div className={className}>
      <ul className="flex">
        {breadcrumb('/', root)}
        {maybeSeparator(0)}
        {nonRootBreadcrumbs}
      </ul>
    </div>
  );
};
