import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Пользователи</Link>
      <Link to="/albums">Альбомы</Link>
    </nav>
  );
};

export default Navbar;
