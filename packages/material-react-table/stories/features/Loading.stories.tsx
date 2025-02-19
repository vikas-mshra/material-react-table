import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Loading Examples',
};

export default meta;

interface Person {
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  state: string | null;
  phoneNumber: string | null;
}

const columns: MRT_ColumnDef<Person>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

const blankData = [...Array(100)].map(() => ({
  firstName: null,
  lastName: null,
  address: null,
  state: null,
  phoneNumber: null,
}));

export const Loading = () => (
  <MaterialReactTable columns={columns} data={[]} state={{ isLoading: true }} />
);

export const LoadingWithSomeData = () => (
  <MaterialReactTable
    columns={columns}
    data={[...data.slice(0, 5), ...blankData]}
    state={{ isLoading: true }}
  />
);

export const LoadingWithSelection = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    enableRowSelection
    state={{ isLoading: true }}
  />
);

export const LoadingWithDetailPanelExample = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    state={{ isLoading: true }}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.firstName?.toString()}</span>
        <span>State: {row.original.state}</span>
        <span>Address: {row.original.address}</span>
        <span>Phone: {row.original.phoneNumber}</span>
      </div>
    )}
  />
);

export const SkeletonDisplayColumns = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    enableRowSelection
    enableRowNumbers
    enableExpanding
    enableRowActions
    state={{ showSkeletons: true }}
  />
);

export const ReloadingExample = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    state={{ showProgressBars: true }}
  />
);

export const OnlyTopProgressBar = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    state={{ showProgressBars: true }}
    muiLinearProgressProps={({ isTopToolbar }) => ({
      sx: { display: isTopToolbar ? 'block' : 'none' },
    })}
  />
);
