import CRM from '@/components/Dashboard/CRM';
import ConsigneeForm from '@/components/Forms/ConsigneeForm';

const DashboardHome = () => {
  return (
    <>
      <ConsigneeForm></ConsigneeForm>
      <CRM />
    </>
  );
};

export default DashboardHome;
