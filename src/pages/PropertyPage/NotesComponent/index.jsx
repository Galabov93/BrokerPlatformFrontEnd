import React, { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import parse from "date-fns/parse";
import axios from "../../../config/API";
import { Grid, Typography, makeStyles, Link } from "@material-ui/core";
import AddNote from "../AddNoteComponent";

const useStyles = makeStyles((theme) => ({
  notesContainer: {
    margin: `${theme.spacing(2)}px 0`,
  },
  noteRow: {
    margin: "2px auto",
    padding: theme.spacing(2),
    backgroundColor: "lightgray",
    alignItems: "center",
  },
}));

export default function Notes({ realEstateId }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/notes?realEstateId=${realEstateId}&$limit=100`
      );
      console.log("fetchData -> response", response);
      if (!response.data) return;
      setNotes(response.data.data);
    }
    fetchData();
  }, [realEstateId]);

  return (
    <>
      <NotesList notes={notes} />

      <AddNote notes={notes} setNotes={setNotes} realEstateId={realEstateId} />
    </>
  );
}

export function NotesList({ notes, hasLink }) {
  const classes = useStyles();
  return (
    <div className={classes.notesContainer}>
      {notes.map((note, index) => (
        <React.Fragment key={`note-${index}`}>
          <Grid container className={classes.noteRow}>
            <Grid item xs={12} md={2} lg={2}>
              <Typography variant="subtitle1">
                {format(
                  parse(note.createdAt.slice(0, 10), "yyyy-MM-dd", new Date()),
                  "dd-MM-yyyy"
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <Typography variant="subtitle1">{note.text}</Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              <strong>{note["user.email"]}</strong>
            </Grid>
            {hasLink && (
              <Grid item xs={12} md={2} lg={1}>
                <Link href={`/property-page/${note["real_estate.id"]}`}>
                  Към Имота
                </Link>
              </Grid>
            )}
          </Grid>
        </React.Fragment>
      ))}
    </div>
  );
}
