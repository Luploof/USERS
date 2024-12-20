import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Список альбомов</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
