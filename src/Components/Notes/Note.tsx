import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArchiveOutlined,
  DeleteOutlineOutlined,
  PushPinOutlined,
  PushPinOutlined as PushPinOutlinedFilled,
} from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";
import axios from "../../utils/axios";

const NoteCard = styled(Card)`
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);
  }
`;

const Note = ({
  note,
  setRefetchAPI,
  refetchaPI,
  pinnedNotes,
}: {
  note: any;
  setRefetchAPI: any;
  refetchaPI: any;
  pinnedNotes?: any;
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isPinned, setIsPinned] = useState(note.is_pinned);
  const [isArchived, setIsArchived] = useState(note.is_archived);

  const updateNote = async (data: any) => {
    console.log("UPDATE Data", data);
    try {
      const token = localStorage.getItem("user");

      const response = await axios.put(
        `https://notes-backend-production-b684.up.railway.app/api/notes/update/${note.id}/`,
        data
      );
      console.log("UPDATED Notes", response.data);
      setRefetchAPI(!refetchaPI);
    } catch (error: any) {
      console.error("Error fetching user notes:", error.message);
    }
  };

  const deleteNote = async () => {
    try {
      const response = await axios.delete(
        `https://notes-backend-production-b684.up.railway.app/api/notes/delete/${note.id}/`
      );
      setRefetchAPI(!refetchaPI);
    } catch (error: any) {
      console.error("Error fetching user notes:", error.message);
    }
  };

  const archiveNote = { is_archived: !isArchived };
  const pinNote = { is_pinned: !isPinned };

  // const archiveNote = (note: any) => {
  //   if (archiveNote?.find((n: any) => n.id === note.id)) {
  //     // changes made here to fix the bug
  //     setNotes((prevArr: any) => [...prevArr, note]);
  //   } else {
  //     const updatedNotes = notes.filter((data: any) => data.id !== note.id);
  //     setNotes(updatedNotes);
  //     setArchivedNotes((prevArr: any) => [...prevArr, note]);
  //   }
  // };

  // const deleteNote = (note: any) => {
  //   const updatedNotes = notes.filter((data: any) => data.id !== note.id);
  //   setNotes(updatedNotes);
  //   setDeletedNotes((prevArr: any) => [...prevArr, note]);
  // };

  // const togglePinNote = (note: any) => {
  //   if (pinnedNotes.find((n: any) => n.id === note.id)) {
  //     setPinnedNotes((prevArr: any) =>
  //       prevArr.filter((n: any) => n.id !== note.id)
  //     );
  //     setNotes((prevArr: any) => [note, ...prevArr]);
  //   } else {
  //     setNotes((prevArr: any) => prevArr.filter((n: any) => n.id !== note.id));
  //     setPinnedNotes((prevArr: any) => [note, ...prevArr]);
  //   }
  // };

  return (
    <NoteCard
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      // sx={{
      //   backgroundColor: pinnedNotes.find((n: any) => n.id === note.id)
      //     ? "#f0f0f0"
      //     : "inherit",
      // }}
      sx={{
        backgroundColor: note.bg_color,
      }}
    >
      <CardContent sx={{ wordWrap: "break-word" }}>
        <Typography>{note.title}</Typography>
        <Typography>{note.content}</Typography> 
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}
      >
        <Tooltip title="Archive">
          <IconButton
            sx={{ visibility: showActions ? "visible" : "hidden" }}
            onClick={() => {
              updateNote(archiveNote);
            }}
          >
            <ArchiveOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            sx={{ visibility: showActions ? "visible" : "hidden" }}
            onClick={() => deleteNote()}
          >
            <DeleteOutlineOutlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={
            pinnedNotes?.find((n: any) => n?.id === note?.id) ? "Unpin" : "Pin"
          }
        >
          <IconButton
            sx={{ visibility: showActions ? "visible" : "hidden" }}
            onClick={() => updateNote(pinNote)}
          >
            {pinnedNotes?.find((n: any) => n?.id === note?.id) ? (
              <PushPinOutlinedFilled fontSize="small" />
            ) : (
              <PushPinOutlined fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </CardActions>
    </NoteCard>
  );
};

export default Note;
