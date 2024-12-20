import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetail";
import AlbumList from "./components/AlbumList";
import AlbumDetails from "./components/AlbumDetail";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
