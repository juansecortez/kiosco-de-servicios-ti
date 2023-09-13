import React, { useState, useEffect } from 'react';
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import './Gallery.css'; // Importamos los estilos

const Gallery = ({ ID_Externo }) => {
  const [files, setFiles] = useState([]);

  const isImage = (filename) => {
    const ext = filename.split('.').pop();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext.toLowerCase());
  };

  useEffect(() => {
    setFiles([]);
    fetch(`http://vwebgama:4001/api/v1/solicitud/imagen/externo/${ID_Externo}`)
      .then((response) => response.json())
      .then((data) => setFiles(data));
  }, [ID_Externo]);

  return (
    <div>
      <ImageList variant="masonry" cols={3}>
        {Array.isArray(files) &&
          files.map((file, index) => (
            <ImageListItem key={index} className="image-list-item"> {/* Añadimos la clase aquí */}
              {isImage(file.fileName) ? (
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  <img className="galleryImage" src={file.url} alt={file.fileName} />
                </a>
              ) : (
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  <img className="galleryImage" src="https://cdn.icon-icons.com/icons2/3456/PNG/512/document_paperclip_list_paper_icon_219544.png" alt="Archivo no es imagen" />
                </a>
              )}

              <ImageListItemBar
                title={file.fileName}
                actionIcon={
                  <IconButton aria-label={`info about ${file.fileName}`}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
      </ImageList>
    </div>
  );
};

export default Gallery;
