import React, { useContext, useEffect, useState } from "react";

import Archive from "./Archive";

import { DataContext } from "../../Context/DataProvider";

import { Box, Typography, Container, Grid } from "@mui/material";

import { ArchiveOutlined } from "@mui/icons-material";
import Note from "../Notes/Note";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "../../utils/axios";

const Archives = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [refetchaPI, setRefetchAPI] = useState(false);

  const fetchnotes = async () => {
    try {
      const response = await axios.get(
        "https://notes-backend-production-b684.up.railway.app/notes/"
      );
      setAllNotes(response.data);
    } catch (error: any) {
      console.error("Error fetching user notes:", error.message);
    }
  };

  useEffect(() => {
    fetchnotes();
  }, [refetchaPI]);

  useEffect(() => {
    const archiveNotes = [];
    allNotes.forEach((note) => {
      if (note.is_archived) {
        archiveNotes.push(note);
      }
    });
    setArchivedNotes(archiveNotes);
  }, [allNotes]);

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = reorder(
      archivedNotes,
      result.source.index,
      result.destination.index
    );
    setArchivedNotes(items);
  };

  return (
    <React.Fragment>
      {archivedNotes.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "8rem",
          }}
        >
          <ArchiveOutlined
            sx={{
              backgroundSize: "120px 120px",
              height: "120px",
              margin: "20px",
              opacity: ".1",
              width: "120px",
            }}
          />
          <Typography
            sx={{ fontSize: "1.375rem" }}
            align="center"
            variant="h6"
            color="#5f6368"
          >
            Your archived notes appear here
          </Typography>
        </Box>
      ) : (
        <Container component="div" maxWidth="lg">
          <Typography maxWidth="lg" marginBottom="2rem">
            Archives
          </Typography>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <Grid
                  spacing={2}
                  container
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {archivedNotes.map((archiveNote: any, index: number) => (
                    <Draggable
                      key={archiveNote.id}
                      draggableId={archiveNote.id}
                      index={index}
                    >
                      {(provided) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Note
                            note={archiveNote}
                            refetchaPI={refetchaPI}
                            setRefetchAPI={setRefetchAPI}
                          />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Archives;
