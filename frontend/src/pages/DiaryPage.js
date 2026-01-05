import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, Divider } from "@mui/material";

import { getUserDiaryEntries } from "../api/diaryApi";
import DiaryCard from "../components/DiaryCard";

const DiaryPage = () => {
  const { id } = useParams(); // user ID from URL
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    loadDiary();
  }, [id]);

  const loadDiary = async () => {
    const data = await getUserDiaryEntries(id);
    setDiaryEntries(data);
  };

  if (diaryEntries.length === 0) {
    return (
      <Typography sx={{ padding: "20px" }}>
        No diary entries yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "20px" }}>
        Diary
      </Typography>

      <Divider sx={{ marginBottom: "20px" }} />

      {diaryEntries.map((entry) => (
        <DiaryCard key={entry._id} entry={entry} />
      ))}
    </Box>
  );
};

export default DiaryPage;
