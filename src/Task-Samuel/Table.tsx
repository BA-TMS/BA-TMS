import { MouseEventHandler, useCallback, useState } from "react";
import data from "./data.json";

type Data = typeof data;
type SortKeys = keyof Data[0];
type SortOrder = "ascn" | "desc";


// This code will sort our data.
function sortData({
    tableData,
    sortKey,
    reverse,
}: {
    tableData: Data;
    sortKey: SortKeys;
    reverse: boolean;
}) {
    if (!sortKey) return tableData;

    const sortedData = data.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
        return sortedData.reverse();
    }

    return sortedData;
}


// Sort our buttons
function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
}: {
    sortOrder: SortOrder;
    columnKey: SortKeys;
    sortKey: SortKeys;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            onClick= { onClick }
            className = {`${
                sortKey === columnKey && sortOrder === "desc"
                ? "sort-button sort-reverse"
                : "sort-button"
            }`}
        >

        </button>
    );
}


// Sort our table
function SortableTable({ data }: { data: Data }) {
    const [sortKey, setSortKey] = useState<SortKeys>("last_name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

    const headers: { key: SortKeys; label: string }[] = [
        { key: "id", label: "ID" },
        { key: "first_name", label: "First name" },
        { key: "last_name", label: "Last name"},
        { key: "country", label: "Country"},
    ];

    const sortedData = useCallback(
        () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
        [data, sortKey, sortOrder]
    );

    function changeSort(key: SortKeys) {
        setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

        setSortKey(key);
    }

    return (
        <table>
          <thead>
            <tr>
              {headers.map((row) => {
                return (
                  <td key={row.key}>
                    {row.label}{" "}
                    <SortButton
                      columnKey={row.key}
                      onClick={() => changeSort(row.key)}
                      {...{
                        sortOrder,
                        sortKey,
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          </thead>
    
          <tbody>
            {sortedData().map((person: Data[0]) => {
              return (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>{person.first_name}</td>
                  <td>{person.last_name}</td>
                  <td>{person.country}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }

    export default SortableTable;
















/*// Create our Dog table.
interface Dog {
    name: string;
    age: number;
    gender: string;
    breed: string;
    behaviorLevel?: string;
    favoriteFood?: string;
}

type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
    width?: number;
}

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

const style = {
    borderCollapse: 'collapse'
} as const

const Table = <T, K extends keyof T> ({data, columns}: TableProps <T, K>): JSX.Element => {
    return (
        <table style={style}>
            <TableHeader columns={columns} />
            <TableRows
                data={data}
                columns={columns}
            />
        </table>
    );
};

export default Table;*/