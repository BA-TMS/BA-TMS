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
  auth: {
    title: 'Getting Started',
    display: 'normal',
  },
};

// You can use JSX elements to change the look of titles in the sidebar, e.g. insert icons if needed

export default meta;
