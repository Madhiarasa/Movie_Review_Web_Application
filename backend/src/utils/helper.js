// Build full poster image URL from TMDB poster path
exports.getFullPosterPath = (posterPath) => {
  if (!posterPath) return "";
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

// Format a date to YYYY-MM-DD
exports.formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

// Standard API response wrapper
exports.apiResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data,
  };
};

// Validate required fields
exports.checkRequired = (fields) => {
  for (let key in fields) {
    if (!fields[key]) {
      return `${key} is required`;
    }
  }
  return null;
};
