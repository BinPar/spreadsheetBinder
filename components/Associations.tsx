import React, { Dispatch } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import { State } from '../src/state';
import { Action, CompareTypes } from '../src/types/action';

interface AssociationsProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const Associations = ({ state, dispatch }: AssociationsProps): JSX.Element => {
  if (!state.tables[0] || !state.tables[0]) {
    return null;
  }

  const onColumnChanged = (
    event: React.ChangeEvent<{ value: number }>,
    headerIndex: number,
  ): void => {
    dispatch({
      type: 'setColumn',
      index: headerIndex,
      toColumn: event.target.value,
    });
  };

  const onTypeChanged = (
    event: React.ChangeEvent<{ value: CompareTypes | -1 }>,
    headerIndex: number,
  ): void => {
    dispatch({
      type: 'setType',
      index: headerIndex,
      toType: event.target.value === -1 ? undefined : event.target.value,
    });
  };

  const onValueChange = (newValue: number, headerIndex: number): void => {
    dispatch({
      type: 'setValue',
      index: headerIndex,
      toValue: newValue,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Columna de fichero A</TableCell>
            <TableCell>Columna de fichero B</TableCell>
            <TableCell>Tipo de comparación</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.tables[0].headers.map(
            (header: string, headerIndex: number): JSX.Element => (
              <TableRow key={header}>
                <TableCell component="th" scope="row">
                  {header}
                </TableCell>
                <TableCell>
                  <Select
                    value={
                      state.associations[headerIndex].targetCol === undefined
                        ? -1
                        : state.associations[headerIndex].targetCol
                    }
                    onChange={(
                      ev: React.ChangeEvent<{ value: number }>,
                    ): void => onColumnChanged(ev, headerIndex)}
                  >
                    <MenuItem value={-1}>
                      <em>Ninguna</em>
                    </MenuItem>
                    {state.tables[1].headers.map(
                      (subHeader: string, i: number): JSX.Element => (
                        // eslint-disable-next-line react/no-array-index-key
                        <MenuItem key={i} value={i}>
                          {subHeader}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={state.associations[headerIndex].type || -1}
                    onChange={(
                      ev: React.ChangeEvent<{ value: CompareTypes | -1 }>,
                    ): void => onTypeChanged(ev, headerIndex)}
                  >
                    <MenuItem value={-1}>
                      <em>Ninguna</em>
                    </MenuItem>
                    <MenuItem value="string">
                      <em>Cadena</em>
                    </MenuItem>
                    <MenuItem value="dni">
                      <em>DNI</em>
                    </MenuItem>
                    <MenuItem value="postal">
                      <em>Código Postal</em>
                    </MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  {' '}
                  <Slider
                    value={state.associations[headerIndex].value}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    onChange={(_, newValue: number): void => {
                      onValueChange(newValue, headerIndex);
                    }}
                    min={0}
                    max={10}
                  />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Associations;
