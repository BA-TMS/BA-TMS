import CRM from '@/components/Dashboard/CRM';
import ConsigneeForm from '@/components/Forms/ConsigneeForm';

import ConsigneeTable from '@/components/Tables/ConsigneeTable';

const dummyData = [
  {
    id: 1,
    createdAt: null,
    updatedAt: null,
    name: 'Trucks Unlimited',
    address: '5555 Trucks Rd',
    addressAddOn: null,
    city: 'Birmingham',
    state: 'Alabama',
    postCountry: 'USA',
    postCode: '55555',
    telCountry: 1,
    telephone: '',
  },
  {
    id: 2,
    createdAt: null,
    updatedAt: null,
    name: 'Boats Unlimited',
    address: '5555 Ocean Ave',
    addressAddOn: null,
    city: 'Birmingham',
    state: 'Alabama',
    postCountry: 'USA',
    postCode: '55555',
    telCountry: 1,
    telephone: '',
  },
];

const DashboardHome = () => {
  return (
    <>
      <ConsigneeForm></ConsigneeForm>
      <ConsigneeTable data={dummyData} />
      <CRM />
    </>
  );
};

export default DashboardHome;
