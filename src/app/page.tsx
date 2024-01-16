// import ECommerce from "@/components/Dashboard/E-commerce";
import CRM from '@/components/Dashboard/CRM';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TailAdmin | E-commerce Dashboard Tempalte',
  description: 'This is Home for TailAdmin',
  // other metadata
};

// home renders CRM component- is this how we want it?

export default function Home() {
  return (
    <>
      <CRM />
    </>
  );
}
