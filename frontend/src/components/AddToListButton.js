import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

import { getUserLists, addMovieToList, removeMovieFromList } from "../api/listApi";
import { useAuth } from "../hooks/useAuth";

const AddToListButton = ({ movieId }) => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [checked, setChecked] = useState({});

  const [error, setError] = useState("");

  const openDialog = async () => {
    if (!user) {
      setError("You must be logged in to add to lists.");
      return;
    }

    setError("");
    setOpen(true);
    await loadLists();
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const loadLists = async () => {
    const data = await getUserLists(user._id);
    setLists(data);

    // Pre-check lists that already contain this movie
    const initialChecked = {};
    data.forEach((list) => {
      initialChecked[list._id] = list.movies.some(
        (m) => m.tmdbId === Number(movieId)
      );
    });
    setChecked(initialChecked);
  };

  const toggleCheck = async (listId) => {
    const isAlreadyInList = checked[listId];

    try {
      if (isAlreadyInList) {
        await removeMovieFromList(listId, { movieId });
      } else {
        await addMovieToList(listId, { movieId });
      }

      setChecked({ ...checked, [listId]: !isAlreadyInList });
    } catch (err) {
      console.error(err);
      setError("Failed to update list.");
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={openDialog} sx={{ marginRight: 1 }}>
        Add to List
      </Button>

      {/* Dialog */}
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Choose Lists</DialogTitle>

        <DialogContent>
          {error && (
            <Typography color="error" sx={{ marginBottom: "10px" }}>
              {error}
            </Typography>
          )}

          {lists.length === 0 ? (
            <Typography>You have no lists. Create one first!</Typography>
          ) : (
            <Box>
              {lists.map((list) => (
                <FormControlLabel
                  key={list._id}
                  control={
                    <Checkbox
                      checked={checked[list._id] || false}
                      onChange={() => toggleCheck(list._id)}
                    />
                  }
                  label={`${list.title} (${list.movies.length} movies)`}
                />
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToListButton;
