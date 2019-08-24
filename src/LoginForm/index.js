import React, { useState } from "react";
import { Formik } from "formik";
import { withRouter, Link } from "react-router-dom";
import * as Yup from "yup";
import { login, register } from "../services/Authentication/index";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormHelperText } from "@material-ui/core";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    "& #component-error-text": {
      color: "red"
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const LoginForm = ({ type, history, ...rest }) => {
  const classes = useStyles();

  const [serverError, setServerError] = useState({
    error: false,
    text: ""
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, actions) => {
        try {
          if (type === "login") {
            await login(values.email, values.password);
            history.push("/");
          } else {
            await register(values.email, values.password);
          }
          setServerError({ error: false, text: "" });

          actions.setSubmitting(false);
        } catch (e) {
          console.log(e);
          setServerError({ error: true, text: "Invalid login information" });
          actions.setSubmitting(false);
        }
      }}
      render={({
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        dirty
      }) => (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              {type === "login" ? "Sign-in" : "Register"}
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <FormHelperText id="component-error-text">
                  {errors.email}
                </FormHelperText>
              ) : null}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <FormHelperText id="component-error-text">
                  {errors.password}
                </FormHelperText>
              ) : null}
              {serverError.error ? (
                <FormHelperText id="component-error-text">
                  {serverError.text}
                </FormHelperText>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {!isSubmitting ? type : <div>Loading</div>}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {type === "login" ? (
                    <Link to={"/register"} variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  ) : (
                    <Link to={"/login"} variant="body2">
                      Already have an account? Sign-in
                    </Link>
                  )}
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    />
  );
};

export default withRouter(LoginForm);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {". Built with "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}
