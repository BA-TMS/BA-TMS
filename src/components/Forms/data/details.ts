// a list of details that are used in SelectInput dropdown components

type Status = 'Active' | 'Inactive' | 'Not Available';
type Owner = 'Company Truck' | 'Owner/ Operator';

export const status: Status[] = ['Active', 'Inactive', 'Not Available'];

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
