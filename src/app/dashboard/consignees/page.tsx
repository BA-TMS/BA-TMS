import ConsigneeForm from '@/components/Forms/ConsigneeForm';
import ConsigneeTable from '@/components/Tables/ConsigneeTable';
import { getConsignees } from '@/lib/dbActions';

const ConsigneePage = async () => {
  const data = await getConsignees();

  return (
    <div>
      <ConsigneeForm></ConsigneeForm>
      <ConsigneeTable data={data} />
    </div>
  );
};

export default ConsigneePage;
