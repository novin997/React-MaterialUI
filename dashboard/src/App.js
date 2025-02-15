import React,{useRef,useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashBoard from '@material-ui/icons/Dashboard';
import Grid from '@material-ui/core/Grid';

import {Line} from "react-chartjs-2";
import { Switch,Route, BrowserRouter, Redirect} from 'react-router-dom';

const drawerWidth = 240;

const temperature = {
  labels:["Jan","Feb","Mar","Apr","May"],
  datasets:[
    {
      data:[10,20,30,40,50]
    }
  ]
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  temperature:{
    //width:"30%"
  }
}));

export default function App() {
  const itemsList = ["DashBoard","Map"];
  
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  
  const ref = useRef(null);

  useEffect(() => {
    if(open===true)
    {
      console.log(ref.current.chartInstance.chart.height);
      console.log(ref.current.chartInstance.chart.width); 
    }
    return () => {
    }
  }, [open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    // For now it will reload the page not very efficent
    // Solution:
    // -Save prev state and restore it
    // -Remove persistent dashboard
    
    window.location.reload(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {itemsList.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{<DashBoard />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      <BrowserRouter> 
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route exact path="/dashboard">
            <div className={classes.drawerHeader} />
            <div className={classes.temperature}>
              <Grid container direction="row" justify= "center" alignItems="center">
                <Grid item xs={6}>
                  <Line
                    data={temperature}
                    options={
                      {
                        responsive:true,
                        maintainAspectRatio:true
                      }
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Line ref={ref}
                    data={temperature}
                    options={
                      {
                        responsive:true,
                        maintainAspectRatio:true
                      }
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Line ref={ref}
                    data={temperature}
                    options={
                      {
                        responsive:true,
                        maintainAspectRatio:true
                      }
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Line ref={ref}
                    data={temperature}
                    options={
                      {
                        responsive:true,
                        maintainAspectRatio:true
                      }
                    }
                  />
                </Grid>
              </Grid>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>  
      </main>
    </div>
  );
}
