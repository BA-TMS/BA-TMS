'use client';

import Modal from '@ui/Modal/Modal';
import ViewCustomer from '@/components/Forms/Customer/ViewCustomer';

// this is an intercepting route that builds a modal
// it uses dynamic routing as we don't know what the id is

export default function ViewCustomerModal() {
  // get the customer information so we can see it
  // will have to fetch from the database/ pass info?
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const customer = {
    id: 'c8f660e0-4bdd-47b7-a400-d94fd7e13e87',
    createdAt: '2024-10-02T20:55:36.078Z',
    updatedAt: '2024-10-02T20:55:36.078Z',
    status: 'ACTIVE',
    companyName: 'Company',
    contactName: 'Lane Hamilton',
    secondaryContactName: '',
    salesRepName: '',
    contactEmail: 'test@example.us',
    contactTelephone: '6142845263',
    contactTollFree: '',
    contactFax: '',
    contactCountry: 'United States',
    contactAddress: '1600 Amphitheatre Parkway',
    contactAddressField2: '',
    contactAddressField3: '',
    contactCity: 'Mountain View',
    contactState: 'Alaska',
    contactPostCode: '94043',
    billingEmail: 'test@example.us',
    billingTelephone: '6142845263',
    billingCountry: 'United States',
    billingAddress: '1600 Amphitheatre Parkway',
    billingAddressField2: '',
    billingAddressField3: '',
    billingCity: 'Mountain View',
    billingState: 'Alaska',
    billingPostCode: '94043',
    currency: '',
    paymentTerms: '1.5/2 Net 30',
    creditLimit: '5000',
    federalID: '66-55555',
    factorId: null,
    factor: null,
  };

  return (
    <Modal title={'View Customer'}>
      <ViewCustomer data={customer} />
    </Modal>
  );
}
