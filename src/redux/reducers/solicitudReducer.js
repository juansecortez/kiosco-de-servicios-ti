const initialState = {
  solicitudes: [],
  comentarios: [],
  loading: false,
  error: null,
  service: null,
};

function solicitudReducer(state = initialState, action) {
  switch (action.type) {
    case 'CAMBIAR_ESTADO_SERVICIO_SUCCESS': {
      const solicitudActualizada = action.payload;
      const nuevasSolicitudes = state.solicitudes.map(solicitud => {
        if (solicitud.ID === solicitudActualizada.ID) {
          return solicitudActualizada; // Reemplaza la solicitud antigua con la nueva solicitud actualizada
        }
        return solicitud; // Retorna la solicitud inalterada
      });

      return {
        ...state,
        solicitudes: nuevasSolicitudes,
        loading: false,
      };
    }
    case 'CREAR_SOLICITUD_SUCCESS':
      return {
        ...state,
        solicitudes: [...state.solicitudes, action.payload],
        loading: false,
      };
      case 'AGREGAR_IMAGEN_SUCCESS':
  return {
    ...state,
    imagenes: [...state.imagenes, action.payload], // Asume que hay un array de imágenes en el estado inicial
    loading: false,
  };

case 'AGREGAR_IMAGEN_FAILURE':
  return {
    ...state,
    loading: false,
    error: action.payload,
  };

case 'OBTENER_IMAGEN_SUCCESS':
  return {
    ...state,
    imagen: action.payload, // Asume que hay un objeto de imagen en el estado inicial
    loading: false,
  };

case 'OBTENER_IMAGEN_FAILURE':
  return {
    ...state,
    loading: false,
    error: action.payload,
  };

    case 'LISTAR_SOLICITUDES_SUCCESS':
      return {
        ...state,
        solicitudes: action.payload,
      };
      case 'GET_SERVICE_BY_ID_SUCCESS':
        return { ...state, service: action.payload };

    case 'GET_SERVICE_BY_ID_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case 'LISTAR_SOLICITUDES_ID_SUCCESS':
        return {
            ...state,
            solicitudes: action.payload,
        };
    
    case 'LISTAR_SOLICITUDES_ID_FAILURE':
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    case 'AGREGAR_COMENTARIO_SUCCESS':
      return {
        ...state,
        comentarios: [...state.comentarios, action.payload],
        loading: false,
      };

    case 'LISTAR_COMENTARIOS_POR_SERVICIO_SUCCESS':
      return {
        ...state,
        comentarios: action.payload,
      };

    case 'FETCH_FAILURE':
    case 'CAMBIAR_ESTADO_SERVICIO_FAILURE':
    case 'LISTAR_SOLICITUDES_FAILURE':
    case 'CREAR_SOLICITUD_FAILURE':
    case 'AGREGAR_COMENTARIO_FAILURE':
    case 'LISTAR_COMENTARIOS_POR_SERVICIO_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default solicitudReducer;
