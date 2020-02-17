import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import TuneIcon from '@material-ui/icons/Tune';
import { green } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';

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
      backgroundColor: theme.palette.background.paper,
      width: '100vw',
      position: 'relative',
      minHeight: '100vh',
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
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

export default function SimpleTabs(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue);
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
    },
    {
      color: 'secondary' as 'secondary',
      className: classes.fab,
      icon: <CloudUploadIcon />,
      label: 'Pegar datos de las celdas a comparar',
    },
    {
      color: 'inherit' as 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <TuneIcon />,
      label: 'Procesar asociaciones',
    },
    {
      color: 'inherit' as 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <CloudDownloadIcon />,
      label: 'Copiar resultado',
    },
    
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Celdas a puntuar" />
          <Tab label="Celdas a comparar" />
          <Tab label="Asociaciones" />
          <Tab label="Resultado" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.label}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              value === index ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Tooltip title={fab.label} aria-label={fab.label}>
            <Fab
              aria-label={fab.label}
              className={fab.className}
              color={fab.color}
            >
              {fab.icon}
            </Fab>
          </Tooltip>
        </Zoom>
      ))}
    </div>
  );
}
