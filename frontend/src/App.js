import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviePage from "./pages/MoviePage";
import ProfilePage from "./pages/ProfilePage";
import ListPage from "./pages/ListPage";
import DiaryPage from "./pages/DiaryPage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import SearchPage from "./pages/SearchPage";


function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Movie */}
            <Route path="/movie/:id" element={<MoviePage />} />

            {/* User/Profile */}
            <Route path="/user/:id" element={<ProfilePage />} />
            <Route path="/user/:id/lists" element={<ListPage />} />
            <Route path="/user/:id/diary" element={<DiaryPage />} />
            <Route path="/user/:id/followers" element={<FollowersPage />} />
            <Route path="/user/:id/following" element={<FollowingPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
