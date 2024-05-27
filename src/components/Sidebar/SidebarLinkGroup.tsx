'use client';
import { ReactNode, useState } from 'react';

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
}

const SidebarLinkGroup = ({ children }: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li className="list-none mb-1">{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
