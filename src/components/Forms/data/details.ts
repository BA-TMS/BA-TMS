// a list of details that are used in SelectInput dropdown components

type Owner = 'Company Truck' | 'Owner/ Operator';

export const status: string[] = ['ACTIVE', 'INACTIVE', 'NOTAVAILABLE'];

export const owner: Owner[] = ['Company Truck', 'Owner/ Operator'];

export const terms: string[] = [
  'Cash in Advance',
  'Payment in Advance',
  'Cash with Order',
  'Cash before Shipment',
  'Cash on Delivery',
  'Cash Next Delivery',
  'Net 30',
  '2/10 Net 30',
  'Net 60',
  'End of Month',
  'Month Following Invoice',
];

export const trailers: string[] = [
  'Dry Van',
  'Reefer',
  'Flatbed',
  'Step Deck (Drop Deck)',
  'Lowboy',
  'Intermodal Containers',
  'Tanker',
  'Livestock',
  'Curtain Side',
  'Car Hauler',
  'Hazardous Material',
];
