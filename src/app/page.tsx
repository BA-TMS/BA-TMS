// import ECommerce from "@/components/Dashboard/E-commerce";
import CRM from '@/components/Dashboard/CRM';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TailAdmin | E-commerce Dashboard Template',
  description: 'This is Home for TailAdmin',
  // other metadata
};

export default function Home() {
  return (
    <>
      <CRM />
    </>
  );
}
