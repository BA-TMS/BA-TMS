type TableProps = {
  columns: string[],
  tableData: object[]
}

type RowProps = {
  rowData: object,
  columns: string[]
}

type CellList = {
  items: string[]
}

export default function Table({ columns, tableData }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((columnName: string) => <th>{columnName}</th>)}
        </tr>
      </thead>
      <tbody>
        {tableData.map((currRow: object) => <TableRow columns={columns} rowData={currRow} />)}
      </tbody>
    </table>
  );
}

/* Order the row data and send it to the cell builder */
function TableRow({ rowData, columns }: RowProps) {
  return (
    <tr>
      {columns.map((colName: string) => <Cell content={rowData[colName]} />)}
    </tr>
  );
}

/* Unpack data for a table cell */
function Cell({ content }: any) { // B/c there's a failover, we can accept anything here.
  let processedContent;
  // Check is content is a string, or array.
  if ((typeof content) === 'string' || (typeof content) === 'number') {
    processedContent = content;
  } else if (Array.isArray(content)) {
    if (content.length === 0) {
      processedContent = '';
    } else if (content.length === 1) {
      processedContent = content[0];
    } else {
      // If there are multiple items, put them in a UL
      processedContent = <CellList items={content} />;
    }
  } else {
    // If it's neither, just use a placeholder
    processedContent = '-- NO DATA --';
  }
  return (<td>{processedContent}</td>);
}

/* Create a list for cells that have multiple entries. */
function CellList({ items }: CellList ) { // Also: is this a type of musician?
  return (
    <ul>
      {items.map((item: string) => <li>{item}</li>)}
    </ul>
  );
}
