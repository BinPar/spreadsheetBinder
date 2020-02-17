import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import { DataTable as IDataTable } from '../src/types/tables';

const useStyles = makeStyles({
  table: {
    maxHeight: 'calc(100vh - 160px)',
    width: 'calc(100vw - 50px)',
    overflow: 'scroll',
  },
});

interface DataTableProps {
  data?: IDataTable;
}

const DataTable = ({ data }: DataTableProps): JSX.Element => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPage = data ? Math.ceil(data.body.length / 100) : 0;

  if (currentPage !== 1 && currentPage > maxPage) {
    setCurrentPage(1);
  }

  if (!data) {
    return null;
  }

  const pageChange = (_, value: number): void => {
    setCurrentPage(value);
  };

  return (
    <Paper className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {data.headers.map(
              (title: string): JSX.Element => (
                <TableCell key={title}>{title}</TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.body
            .filter(
              (_, i): boolean =>
                i < currentPage * 100 && i >= (currentPage - 1) * 100,
            )
            .map((row, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={i}>
                {row.map(
                  (cell: string, j: number): JSX.Element => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableCell key={j}>{cell}</TableCell>
                  ),
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        style={{
          position: 'fixed',
          left: '1em',
          bottom: '1.8em',
        }}
        page={currentPage}
        onChange={pageChange}
        color="primary"
        count={maxPage}
        showFirstButton
        showLastButton
      />
    </Paper>
  );
};

export default DataTable;
