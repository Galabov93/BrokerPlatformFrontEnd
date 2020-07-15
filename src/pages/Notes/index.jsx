import React, { useState, useEffect } from "react";
import { Grid, Container, makeStyles, Slide } from "@material-ui/core";
import { NotesList } from "../PropertyPage/NotesComponent";
import API from "../../config/API";

const useStyles = makeStyles((theme) => ({}));

export default function NotesPage() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  console.log("NotesPage -> notes", notes);

  useEffect(() => {
    const token = window.localStorage.getItem("userToken");
    async function fetchData() {
      try {
        const response = await API.get(`/notes?$limit=100`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setNotes(response.data.data);
      } catch (e) {
        console.log("eror", e);
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container justify="center" className={classes.notesContainer}>
        <Grid container spacing={3} justify="space-around">
          <Grid item xs={12}>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
              <div>
                <NotesList notes={notes} hasLink={true} />
              </div>
            </Slide>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
