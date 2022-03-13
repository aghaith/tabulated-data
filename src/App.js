import React, { useState } from "react";
// import { faker } from '@faker-js/faker';
import { format, parse } from 'date-fns';
import mockData from "./mockData";
import useTable from './hooks/useTable';
import './style.scss';

const COLUMNS = [
  {
    accessor: "id",
    label: "ID"
  },
  {
    accessor: "name",
    label: "Name"
  },
  {
    accessor: ({ dateOfBirth }) => format(parse(dateOfBirth, "yyyy-MM-dd", new Date()), "do MMMM yyyy"),
    label: "Date Of Birth"
  },
  {
    accessor: "favouriteFood",
    label: "Favourite Food"
  }
]

let nextId = 8;

const App = () => {
  const [data, setData] = useState(mockData);
  const [pageSize, setPageSize] = useState(2);

  const {
    headers,
    pagination: {
      nextPage,
      pageNumber,
      previousPage,
      totalPages
    },
    rows
  } = useTable({
    columns: COLUMNS,
    data,
    pagination: { pageSize }
  })

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map(({ label }, index) => (
              <th key={index}>{label}</th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.cells.map((cell, index) => (
                <td key={index}>
                  {cell.renderedValue}
                </td>
              ))}
              <td>
                <button onClick={() => setData(data.filter((unused, innerIndex) => index !== innerIndex))}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()}>&lt;</button>
        <span>Page {pageNumber} of {totalPages}</span>
        <button onClick={() => nextPage()}>&gt;</button>
        &nbsp;
        <button onClick={() => setData([
          ...data,
          {
            // dateOfBirth: format(faker.date.past(), 'yyyy-MM-dd'),
            // favouriteFood: faker.lorem.words(),
            // id: Math.random().toString(),
            // name: faker.name.firstName()

            dateOfBirth: '1899-12-31',
            favouriteFood: 'Cheese',
            id: "" + nextId++,
            name: 'Abbas ' + Math.random()
          }
        ])}>Add Person</button>
        &nbsp;
        <button onClick={() => setPageSize(pageSize + 1)}>Page Size + 1</button>
      </div>
    </div>
  );
};

export default App;