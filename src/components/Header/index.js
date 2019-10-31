import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link, withRouter } from "react-router-dom";
import PlusIcon from "@material-ui/icons/Add";
import uuid from "uuid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logout } from "../../services/Authentication/index";

const useStyles = makeStyles(theme => ({
  appBar: {
    display: "flex",
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginTop: 0
  },
  toolbar: {
    flexWrap: "wrap",
    "& #homeButton": {
      textDecoration: "none",
      color: "inherit",
      textTransform: "uppercase"
    }
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: "none",
    color: "inherit",
    textTransform: "uppercase"
  },
  navigation: {
    display: "flex",
    alignItems: "center"
  }
}));

function Header({ history }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [uid, setUid] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setUid(uuid());
  }, []);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleProfileClick(params) {
    handleMenuClose();
    history.push("/profile");
  }

  function handleLogout() {
    handleMenuClose();
    logout();
    history.push("/login");
  }
  const menuId = "primary-search-account-menu";
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link to={"/"} id="homeButton">
              Refer
            </Link>
          </Typography>
          <nav className={classes.navigation}>
            <Link className={classes.link} to={"/real-estates"}>
              Имоти
            </Link>
            <Link style={{ textDecoration: "none" }} to={`property/add/${uid}`}>
              <Button
                name="newRealEstate"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Добави имот
                <PlusIcon className={classes.rightIcon} />
              </Button>
            </Link>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </nav>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </AppBar>
    </>
  );
}

export default withRouter(Header);
