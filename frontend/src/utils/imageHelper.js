// Build full TMDB poster URL
export const getFullPosterPath = (posterPath) => {
  if (!posterPath) return "https://via.placeholder.com/500x750?text=No+Image";

  // TMDB poster base URL
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

// Build full TMDB backdrop URL
export const getFullBackdropPath = (backdropPath) => {
  if (!backdropPath) return "https://via.placeholder.com/1280x720?text=No+Backdrop";

  return `https://image.tmdb.org/t/p/original${backdropPath}`;
};

// Format year from release_date
export const getYear = (dateString) => {
  if (!dateString) return "";
  return dateString.slice(0, 4);
};
