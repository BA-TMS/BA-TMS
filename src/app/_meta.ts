import type { MetaRecord } from 'nextra';

/**
 * type MetaRecordValue =
 *  | TitleSchema
 *  | PageItemSchema
 *  | SeparatorSchema
 *  | MenuSchema
 *
 * type MetaRecord = Record<string, MetaRecordValue>
 **/

// type PageItemSchema = {
//   type: 'page' | 'doc'; // @default 'doc'
//   display: 'normal' | 'hidden' | 'children'; // @default 'normal'
//   title?: TitleSchema;
//   theme?: PageThemeSchema;
// };

const meta: MetaRecord = {
  index: { display: 'hidden' },
  brokers: { display: 'hidden' },
  carriers: { display: 'hidden' },
  consignees: { display: 'hidden' },
  customers: { display: 'hidden' },
  dashboard: { display: 'hidden' },
  dispatch: { display: 'hidden' },
  docs: { title: 'Welcome to Docs', display: 'children' },
  drayage: { display: 'hidden' },
  drivers: { display: 'hidden' },
  error: { display: 'hidden' },
  factors: { display: 'hidden' },
  login: { display: 'hidden' },
  'other-numbers': { display: 'hidden' },
  preferences: { display: 'hidden' },
  settings: { display: 'hidden' },
  shippers: { display: 'hidden' },
  signup: { display: 'hidden' },
  'third-party': { display: 'hidden' },
  trailers: { display: 'hidden' },
  trucks: { display: 'hidden' },
};

// You can use JSX elements to change the look of titles in the sidebar, e.g. insert icons if needed

export default meta;
