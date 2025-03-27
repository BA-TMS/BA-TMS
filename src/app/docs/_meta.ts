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

const meta: MetaRecord = {
  index: {
    title: 'About TMS',
    // type: 'page',
  },
  // You can use JSX elements to change the look of titles in the sidebar, e.g. insert icons if needed

  signup: {
    // this is for the signup route
    // can set title with `title` property
    title: 'Signup',
  },
};

export default meta;
