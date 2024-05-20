import React, { useContext } from "react";

import Form from "./Form";
import Note from "./Note";
import Archives from "../Archive/Archives";

import { DataContext } from "../../Context/DataProvider";

import { Box, Typography, Container, Grid, CircularProgress } from "@mui/material";

import { LightbulbOutlined } from "@mui/icons-material";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import axios from "../../utils/axios";
import { useEffect } from "react";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [refetchaPI, setRefetchAPI] = useState(false);
  const [loading, setLoading] = useState(true); 

  const fetchnotes = async () => {
    try {
      const token = localStorage.getItem("user");

      const response = await axios.get(
        "https://notes-backend-production-b684.up.railway.app/api/notes/"
      );
      const sortedNotes = response.data.reverse();
      setAllNotes(sortedNotes);
      setLoading(false); 
      console.log("Notes:", response.data);
    } catch (error: any) {
      setLoading(false); 
      console.error("Error fetching user notes:", error.message);
    }
  };

  useEffect(() => {
    const pinNotes = [];
    const normalNotes = [];

    allNotes.forEach((note) => {
      if (note.is_pinned) {
        pinNotes.push(note);
      } else if (!note.is_archived) {
        normalNotes.push(note);
      }
    });
    setPinnedNotes(pinNotes);
    setNotes(normalNotes);
  }, [allNotes]);

  useEffect(() => {
    fetchnotes();
  }, [refetchaPI]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = reorder(
      notes,
      pinnedNotes,
      result.source.index
      // result.destination.index
    );
    setNotes(items);
  };

  return (
    <React.Fragment>
      <Form setRefetchAPI={setRefetchAPI} refetchaPI={refetchaPI} />
      {/* <Archives /> */}
      {loading ? ( 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment>
          {allNotes.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "5rem",
              }}
            >
              <LightbulbOutlined
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
                Notes you add appear here
              </Typography>
            </Box>
          ) : (
            <Container maxWidth="lg">
              {pinnedNotes.length > 0 && (
                <Typography marginTop="2rem" marginBottom="1rem" fontWeight={700}>
                  PINNED NOTES
                </Typography>
              )}

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <Grid
                      spacing={2}
                      container
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {pinnedNotes.map((note, index) => (
                        <Draggable
                          key={note.id}
                          draggableId={note.id}
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
                                note={note}
                                setRefetchAPI={setRefetchAPI}
                                refetchaPI={refetchaPI}
                                pinnedNotes={pinnedNotes}
                              />
                            </Grid>
                          )}
                        </Draggable>
                      ))}
                    </Grid>
                  )}
                </Droppable>
              </DragDropContext>

              <Typography marginTop="2rem" marginBottom="1rem" fontWeight={700}>
                OTHER NOTES
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
                      {notes.map((note, index) => (
                        <Draggable
                          key={note.id}
                          draggableId={note.id}
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
                                note={note}
                                setRefetchAPI={setRefetchAPI}
                                refetchaPI={refetchaPI}
                                pinnedNotes={pinnedNotes}
                              />
                            </Grid>
                          )}
                        </Draggable>
                      ))}
                    </Grid>
                  )}
                </Droppable>
              </DragDropContext>
            </Container>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Notes;
