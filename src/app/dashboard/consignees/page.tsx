import ConsigneeForm from '@/components/Forms/ConsigneeForm';
import ConsigneeTable from '@/components/Tables/ConsigneeTable';
import { getConsignees } from '@/lib/dbActions';

import { FormComponent } from '@/components/Forms/Form';

const ConsigneePage = async () => {
  const data = await getConsignees();

  return (
    <div>
      <FormComponent></FormComponent>
      <ConsigneeForm></ConsigneeForm>
      <ConsigneeTable data={data} />;
    </div>
  );
};

export default ConsigneePage;
