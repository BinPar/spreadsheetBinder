import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Next from '@material-ui/icons/SkipNext';
import Back from '@material-ui/icons/SkipPrevious';
import TuneIcon from '@material-ui/icons/Tune';
import { green } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import DataTable from './DataTable';
import useAppReducer from '../hooks/userAppReducer';
import Associations from './Associations';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#e9ecf0',
      width: '100vw',
      position: 'relative',
      minHeight: '100vh',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(10),
    },
    fabB: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabC: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(18),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }),
);

const tabTitles = [
  'Celdas a puntuar',
  'Celdas a comparar',
  'Asociaciones',
  'Resultado',
];

export default function SimpleTabs(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [state, dispatch] = useAppReducer();

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    dispatch({
      type: 'jump',
      step: newValue,
    });
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary' as 'primary',
      className: classes.fab,
      icon: <CloudUploadIcon />,
      label: 'Pegar datos de las celdas a puntuar',
      click: (): void => {
        navigator.clipboard.readText().then((clipText): void => {
          dispatch({
            type: 'paste',
            tableIndex: 0,
            text: clipText,
          });
        });
      },
    },
    {
      color: 'secondary' as 'secondary',
      className: classes.fab,
      icon: <CloudUploadIcon />,
      label: 'Pegar datos de las celdas a comparar',
      click: (): void => {
        navigator.clipboard.readText().then((clipText): void => {
          dispatch({
            type: 'paste',
            tableIndex: 1,
            text: clipText,
          });
        });
      },
    },
    {
      color: 'inherit' as 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <TuneIcon />,
      label: 'Procesar asociaciones',
      click: (): void => {
        dispatch({
          type: 'process',
        });
      },
    },
    {
      color: 'inherit' as 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <CloudDownloadIcon />,
      label: 'Copiar resultado',
      click: (): void => {
        navigator.clipboard.writeText(
          [
            state.result.headers.join('\t'),
            ...state.result.body.map(row => row.join('\t')),
          ].join('\n'),
        );
      },
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={state.currentStep}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
        >
          {tabTitles.map(
            (title: string, i: number): JSX.Element => (
              <Tab key={title} label={title} disabled={i > state.maxStep} />
            ),
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={state.currentStep} index={0}>
        <DataTable data={state.tables[0]} />
      </TabPanel>
      <TabPanel value={state.currentStep} index={1}>
        <DataTable data={state.tables[1]} />
      </TabPanel>
      <TabPanel value={state.currentStep} index={2}>
        <Associations state={state} dispatch={dispatch} />
      </TabPanel>
      <TabPanel value={state.currentStep} index={3}>
        <DataTable data={state.result} />
      </TabPanel>
      <Tooltip title="Anterior">
        <div className={classes.fabC}>
          <Fab
            disabled={state.currentStep === 0}
            color="secondary"
            onClick={(): void => {
              dispatch({ type: 'back' });
            }}
          >
            <Back />
          </Fab>
        </div>
      </Tooltip>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.label}
          in={state.currentStep === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              state.currentStep === index ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Tooltip title={fab.label} aria-label={fab.label}>
            <Fab
              onClick={fab.click}
              aria-label={fab.label}
              className={fab.className}
              color={fab.color}
            >
              {fab.icon}
            </Fab>
          </Tooltip>
        </Zoom>
      ))}
      <Tooltip title="Siguiente">
        <div className={classes.fabB}>
          <Fab
            disabled={state.currentStep >= state.maxStep}
            color="primary"
            onClick={(): void => {
              dispatch({ type: 'next' });
            }}
          >
            <Next />
          </Fab>
        </div>
      </Tooltip>
    </div>
  );
}
