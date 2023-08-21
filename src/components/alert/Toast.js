import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const Toast = ({ title, body, bgColor }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const handleClose = () => {
    dispatch({ type: 'ALERT', payload: {} });
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'ALERT', payload: {} });
    }, 3000);
  }, [dispatch]);
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: '5px', right: '5px', zIndex: 50, minWidth: '200px' }}
      ref={ref}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="me-auto">{title}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={handleClose}
        />
      </div>
      <div className="toast-body">
        {typeof body === 'string' ? (
          body
        ) : (
          <ul>
            {body.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Toast;
