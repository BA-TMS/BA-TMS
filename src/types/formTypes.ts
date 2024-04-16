/**
 *  Types meant to facilitate communication with pages and the DB actions they
 *  perform upon submission.
 */

export interface ConsigneeFormDataState {
  consigneeName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  contactName: string;
  phone: string;
  email: string;
  notes?: string | undefined;
}
