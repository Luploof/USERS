import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./AlbumDetails.css"; // Импорт стилей

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${id}`
        );
        setAlbum(albumResponse.data);

        // Получаем информацию о пользователе
        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${albumResponse.data.userId}`
        );
        setUserName(userResponse.data.name);
        setUserId(userResponse.data.id);

        const photosResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
        );
        setPhotos(photosResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;

  if (!album) return <div>Альбом не найден.</div>;

  return (
    <div className="album-details">
      <h1>{album.title}</h1>
      <h2>
        Автор:{" "}
        <Link to={`/user/${userId}`} className="author-link">
          {userName}
        </Link>
      </h2>
      <h2>Фотографии:</h2>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div className="photo-item" key={photo.id}>
            {photo.url ? (
              <img src={photo.thumbnailUrl} alt={photo.title} />
            ) : (
              <div className="placeholder" />
            )}
            <div className="photo-title">{photo.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetails;
