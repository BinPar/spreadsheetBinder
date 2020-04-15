import { DataTable } from './types/tables';

const processDataText = (text: string): DataTable => {
  const lines = text.split('\n');
  const rows = lines
    .filter(line => line)
    .map(line => line.split('\t').map(cell => cell.trim()));
  const dataTable: DataTable = {
    headers: rows.shift(),
    body: rows,
  };
  return dataTable;
};

export default processDataText;
