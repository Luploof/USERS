import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(userResponse.data);

        const albumsResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/albums?userId=${id}`
        );
        setAlbums(albumsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!user) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>
        <strong>Имя пользователя:</strong> {user.username}
      </p>
      <p>
        <strong>Номер телефона:</strong> {user.phone}
      </p>
      <p>
        <strong>Почта:</strong>{" "}
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
      <p>
        <strong>Сайт:</strong>{" "}
        <a
          href={`http://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.website}
        </a>
      </p>

      <h2>Альбомы:</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Назад к альбомам</Link>
    </div>
  );
};

export default UserDetails;
