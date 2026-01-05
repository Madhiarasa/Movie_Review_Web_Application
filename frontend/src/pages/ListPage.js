import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, Divider } from "@mui/material";

import { getUserLists } from "../api/listApi";
import MovieGrid from "../components/MovieGrid";

const ListPage = () => {
  const { id } = useParams(); // user ID from URL
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    loadUserLists();
  }, [id]);

  const loadUserLists = async () => {
    const data = await getUserLists(id);
    setLists(data);

    // show the first list by default
    if (data.length > 0) {
      setSelectedList(data[0]);
    }
  };

  if (lists.length === 0) {
    return (
      <Typography sx={{ padding: "20px" }}>
        This user has no lists.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      {/* LIST SELECTOR */}
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "20px" }}>
        Lists
      </Typography>

      {lists.map((list) => (
        <Typography
          key={list._id}
          onClick={() => setSelectedList(list)}
          sx={{
            cursor: "pointer",
            marginBottom: "10px",
            fontSize: "18px",
            color: selectedList?._id === list._id ? "skyblue" : "white",
          }}
        >
          • {list.title} ({list.movies.length} movies)
        </Typography>
      ))}

      <Divider sx={{ margin: "20px 0" }} />

      {/* SELECTED LIST CONTENT */}
      {selectedList && (
        <>
          <Typography variant="h4" fontWeight="bold">
            {selectedList.title}
          </Typography>

          <Typography variant="body1" sx={{ color: "gray", marginBottom: "20px" }}>
            {selectedList.description || "No description provided"}
          </Typography>

          {/* MOVIES IN LIST */}
          {selectedList.movies.length === 0 ? (
            <Typography sx={{ color: "gray" }}>
              No movies in this list yet.
            </Typography>
          ) : (
            <MovieGrid movies={selectedList.movies} />
          )}
        </>
      )}
    </Box>
  );
};

export default ListPage;
