# react-paginated-table

`@tatlapa/react-datatable-plugin` is an npm package designed to seamlessly integrate paginated, filtered, and sortable tables into your web applications. Built with React, TypeScript, and TailwindCSS, it offers a robust solution for table management.

## Installation

Install the package using npm:

```bash
npm i @tatlapa/react-datatable-plugin
```

Import the table component into your project:

```javascript
import { DataTable } from "@tatlapa/react-datatable-plugin";
```

Use it as a standard React component:

```javascript
<DataTable titles={titles} rows={rows} />
```

## Usage

### Arguments

The `DataTable` component can accept up to 2 arguments:

- **titles**: An array of objects defining the table columns. Each object should have the following properties:

  - **title**: The display name of the column.
  - **key**: The key corresponding to the data field.
  - **type**: The type of data in the column (`"string"`, `"number"`, or `"date"`).

- **rows**: An array of objects representing the table rows. Each object should have keys corresponding to the column keys defined in `titles`. For example:
  - If a column key is `firstName`, the row object should have a `firstName` property with a string value.
  - If a column key is `startDate`, the row object should have a `startDate` property with a date value.
  - If a column key is `zip`, the row object should have a `zip` property with a number value.

### Functionality

See the example below for more details.

## Example

An example with the following parameters:

1. **titles**

```javascript
const titles = [
  { title: "First Name", key: "firstName", type: "string" },
  { title: "Last Name", key: "lastName", type: "string" },
  { title: "Start Date", key: "startDate", type: "date" },
  { title: "Department", key: "department", type: "string" },
  { title: "Birth Date", key: "birthDate", type: "date" },
  { title: "Street", key: "street", type: "string" },
  { title: "City", key: "city", type: "string" },
  { title: "State", key: "state", type: "string" },
  { title: "ZipCode", key: "zip", type: "number" },
];
```

2. **rows**

```javascript
const rows = [
  {
    firstName: "Alice",
    lastName: "Doe",
    startDate: "1/15/2023",
    department: "Marketing",
    birthDate: "5/22/1990",
    street: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: 62704,
  },
];
```

3. **Component**

```javascript
  DataTable titles={titles} rows={rows} />

```
