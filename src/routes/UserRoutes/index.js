import ProtectedRoute from "../../utils/ProtectedRoute/index";
// import Header from "../../components/Header/header";
import RealEstates from "../../pages/RealEstates";
import PropertyPage from "../../pages/PropertyPage";
import AddNewProperty from "../../pages/AddNewProperty";

import { Link } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function UserRoutes() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Refer+
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
            { text: "Имоти", route: "/real-estates" },
            { text: "Добави имот", route: "/property/add/100" }
          ].map((item, index) => (
            <Link className={classes.link} to={item.route}>
              <ListItem button key={item.text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["Изход"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ProtectedRoute exact path="/" component={() => <div>Dashboard</div>} />
        <ProtectedRoute
          exact
          path="/real-estates"
          component={() => <RealEstates />}
        />
        <ProtectedRoute
          exact
          path="/property-page/:id"
          component={() => <PropertyPage />}
        />
        <ProtectedRoute
          exact
          path="/profile"
          component={() => <div>My profile</div>}
        />
        <ProtectedRoute
          exact
          path="/property/add/:id"
          component={() => <AddNewProperty />}
        />
        <ProtectedRoute
          exact
          path="/property/edit/:id"
          component={() => <div>Edit a property</div>}
        />
      </main>
    </div>
  );
}

// export default function UserRoutes() {
//   return (
//     <div>
//       {/* <ProtectedRoute component={() => <Header />} /> */}
//       <ProtectedRoute exact path="/" component={() => <div>Dashboard</div>} />
//       <ProtectedRoute
//         exact
//         path="/real-estates"
//         component={() => <RealEstates />}
//       />
//       <ProtectedRoute
//         exact
//         path="/property-page/:id"
//         component={() => <PropertyPage />}
//       />
//       <ProtectedRoute
//         exact
//         path="/profile"
//         component={() => <div>My profile</div>}
//       />
//       <ProtectedRoute
//         exact
//         path="/property/add/:id"
//         component={() => <AddNewProperty />}
//       />
//       <ProtectedRoute
//         exact
//         path="/property/edit/:id"
//         component={() => <div>Edit a property</div>}
//       />
//     </div>
//   );
// }
