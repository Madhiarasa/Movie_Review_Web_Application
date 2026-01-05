// frontend/src/components/AddToDiaryButton.js
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { addDiaryEntry } from "../api/diaryApi";
import { useAuth } from "../hooks/useAuth";

/**
 * Props:
 * - movieId (number/string)
 * - onAdded (optional) callback when entry is added (e.g., refresh diary or UI)
 */
const AddToDiaryButton = ({ movieId, onAdded }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [dateWatched, setDateWatched] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openDialog = () => {
    if (!user) {
      setError("You must be logged in to add to diary.");
      return;
    }
    setError("");
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setNote("");
    setDateWatched(new Date().toISOString().slice(0, 10));
    setError("");
  };

  const handleAdd = async () => {
    setError("");
    if (!dateWatched) {
      setError("Please choose a date.");
      return;
    }

    try {
      setLoading(true);
      await addDiaryEntry({
        movieId: Number(movieId),
        dateWatched,
        note,
      });

      setLoading(false);
      closeDialog();

      if (typeof onAdded === "function") onAdded();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add diary entry");
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={openDialog} sx={{ marginRight: 1 }}>
        Add to Diary
      </Button>

      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Add to Diary</DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1, minWidth: 320 }}>
            <TextField
              label="Date watched"
              type="date"
              value={dateWatched}
              onChange={(e) => setDateWatched(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Note (optional)"
              multiline
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog} disabled={loading}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToDiaryButton;
