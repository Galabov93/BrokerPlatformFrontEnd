import ProtectedRoute from "../../utils/ProtectedRoute/index";
import RealEstates from "../../pages/RealEstates";
import PropertyPage from "../../pages/PropertyPage";
import AddNewProperty from "../../pages/AddNewProperty";
import { Link, withRouter } from "react-router-dom";
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
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { logout } from "../../services/Authentication";
import { useTheme } from "@material-ui/styles";
import RealEstatesPage from "../../pages/RealEstatesProvider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    // padding: theme.spacing(3)
  },
}));

function UserRoutes({ history, container }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentFilters, setCurrentFilters] = React.useState({
    propertySellType: "",
    constructionType: [],
    neighbourhoods: [],
    priceFrom: "",
    priceTo: "",
    sizeFrom: "",
    sizeTo: "",
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleLogout() {
    logout();
    history.push("/login");
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          { text: "Имоти", route: "/real-estates/1" },
          { text: "Добави имот", route: "/property/add/100" },
        ].map((item, index) => (
          <Link key={item.text} className={classes.link} to={item.route}>
            <ListItem button>
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
          <ListItem button onClick={handleLogout} key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            REFER+
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ProtectedRoute exact path="/" component={() => <div>Dashboard</div>} />
        <ProtectedRoute
          exact
          path="/real-estates/:page"
          component={() => (
            <RealEstatesPage
              currentFilters={currentFilters}
              setCurrentFilters={setCurrentFilters}
            />
          )}
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

export default withRouter(UserRoutes);
