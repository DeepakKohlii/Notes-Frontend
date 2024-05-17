import React, { useState, useRef, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import {
  Box,
  Container as MuiContainer,
  ClickAwayListener,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
// import { DataContext } from "../../Context/DataProvider";
import axios from "../../utils/axios";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: "#e0e0e0";
  margin: auto;
  margin-bottom: 2rem;
  min-height: 30px;
`;

const note = {
  id: "",
  title: "",
  text: "",
  color: "#FFFFFF",
};

const customColors = ["#FF5733", "#33FF57", "#5733FF", "#33FFFF", "#FF33EA"];

const Form = ({
  setRefetchAPI,
  refetchaPI,
}: {
  setRefetchAPI: any;
  refetchaPI: any;
}) => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState({ ...note, id: uuid() });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const containerRef = useRef<any>();
  // const { setNotes } = useContext<any>(DataContext);

  const onTextChange = (e) => {
    let changedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(changedNote);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleColorChange = (color) => {
    setAddNote((prev) => ({
      ...prev,
      color: color.hex,
    }));
  };

  const postData = async () => {
    try {
      const token = localStorage.getItem("user");

      const { title, text, color } = addNote;
      const newData = { title, content: text, bg_color: color };

      const response = await axios.post(
        "http://notes-backend-production-b684.up.railway.app/api/notes/",
        newData
      );

      console.log("Note posted successfully:", response.data);
      setRefetchAPI(!refetchaPI);
      setShowTextField(false);
      setShowColorPicker(false);
      setAddNote({ ...note, id: uuid() });
      // setNotes((prevArr) => [addNote, ...prevArr]);
    } catch (error: any) {
      console.error("There was an error posting the note:", error.message);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        if (!containerRef.current.contains(e.target)) {
          setShowColorPicker(false);
        }
        setShowTextField(false);
      }}
    >
      <MuiContainer maxWidth="sm">
        <Container
          maxWidth="sm"
          ref={containerRef}
          style={{ backgroundColor: addNote.color }}
        >
          {showTextField && (
            <TextField
              size="small"
              placeholder="Title"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              style={{ marginBottom: 10 }}
              onChange={onTextChange}
              name="title"
              value={addNote.title}
            />
          )}
          <TextField
            multiline
            placeholder="Take a note..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onClick={() => {
              setShowTextField(true);
              containerRef.current.style.minHeight = "70px";
            }}
            onChange={onTextChange}
            name="text"
            value={addNote.text}
            // style={{ backgroundColor: addNote.color }}
          />
          {showTextField && (
            <Box
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              flex={1}
              flexDirection={"row"}
            >
              <IconButton onClick={toggleColorPicker}>
                <ColorLensIcon />
              </IconButton>
              <Button onClick={postData}>Save</Button>
            </Box>
          )}
          {showColorPicker && (
            <Box style={{ display: "flex" }}>
              {customColors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorChange({ hex: color })}
                ></div>
              ))}
            </Box>
          )}
        </Container>
      </MuiContainer>
    </ClickAwayListener>
  );
};

export default Form;
