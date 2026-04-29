import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';

type TableTanstackProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
};

function TableTanstack<T>({ data, columns, onRowClick }: TableTanstackProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='mt-6 rounded-md border overflow-x-auto'>
      <table className='w-full min-w-max text-sm'>
        <thead className='bg-muted text-muted-foreground'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <th
                  key={`${i}-${header.id}`}
                  className='p-3 text-left font-medium'
                  style={
                    header.column.columnDef.size !== undefined
                      ? { width: header.column.getSize() }
                      : undefined
                  }
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={`${i}-${row.id}`}
              className={`border-b transition-colors${onRowClick ? ' hover:bg-muted/50 cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell, j) => (
                <td
                  key={`${j}-${cell.id}`}
                  className='p-3'
                  style={
                    cell.column.columnDef.size !== undefined
                      ? { width: cell.column.getSize() }
                      : undefined
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { TableTanstack };
