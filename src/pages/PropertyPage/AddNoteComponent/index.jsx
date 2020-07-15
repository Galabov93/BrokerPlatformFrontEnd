import React, { useRef } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "../../../config/API";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function AddNote({ realEstateId, notes, setNotes }) {
  const noteTextRef = useRef(null);

  async function handleClick() {
    const token = window.localStorage.getItem("userToken");
    const noteText = noteTextRef.current.querySelector("textarea").value;
    const { userId } = parseJwt(token);

    if (!noteText) return;

    try {
      // post a note
      const newNote = await axios.post(
        `/notes`,
        {
          text: noteText,
          userId,
          realEstateId,
        },
        {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
          },
        }
      );

      setNotes([...notes, newNote.data]);
      handleDelete();
    } catch (e) {
      console.log("error posting note", e);
    }
  }

  function handleDelete() {
    noteTextRef.current.querySelector("textarea").value = "";
  }

  return (
    <div>
      <TextField
        ref={noteTextRef}
        variant="outlined"
        placeholder="Добави бележка"
        multiline
        rowsMax={4}
        fullWidth
        name={"note"}
      />
      <Button onClick={handleClick} variant="contained" color="secondary">
        Добави
      </Button>
      <Button onClick={handleDelete} variant="contained" color="default">
        Изтрий
      </Button>
    </div>
  );
}
