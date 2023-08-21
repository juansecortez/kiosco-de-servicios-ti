import React from 'react';
import logo from 'src/assets/images/logos/icono.png';
const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading d-flex justify-content-center align-items-center"
      style={{
        background: '#0008',
        color: 'white',
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <div width="205" height="250" viewBox="0 0 40 50">
        <div className="brand_logo_container">
          <img
            src={logo}
            className="brand_logo mb-3"
            alt="Logo"
            style={{
              height: '141px',
              width: '244.5px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
