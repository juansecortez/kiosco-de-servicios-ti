const initialState = {
    deviceData: [],
    tables: [],
    areas: [],
    ubicaciones: [],
    tipos: [],
    statsByLocation: [],
    statsByType: [],
    statsByArea: [],
    metricsByState: [],
    monthlyServicesByArea: [],
    totalServicesByArea: [],
    servicesByJefatura: [],
    servicesByIDTecnico: [],
    loading: false,
    error: null,
  };
  
  function deviceReducer(state = initialState, action) {
    switch (action.type) {
      // Reducers para Device Data
      case 'FETCH_DEVICE_DATA_SUCCESS':
        return { ...state, deviceData: action.payload };
      case 'FETCH_DEVICE_DATA_FAILURE':
        return { ...state, error: action.payload };
  
      // Reducers para Tablas
      case 'LIST_TABLES_SUCCESS':
        return { ...state, tables: action.payload };
      case 'LIST_TABLES_FAILURE':
        return { ...state, error: action.payload };
  
      // Reducers para Áreas
      case 'LIST_AREAS_SUCCESS':
        return { ...state, areas: action.payload };
      case 'LIST_AREAS_FAILURE':
        return { ...state, error: action.payload };
  
      // Reducers para Ubicaciones
      case 'LIST_UBICACIONES_SUCCESS':
        return { ...state, ubicaciones: action.payload };
      case 'LIST_UBICACIONES_FAILURE':
        return { ...state, error: action.payload };
  
      // Reducers para Tipos
      case 'LIST_TIPOS_SUCCESS':
        return { ...state, tipos: action.payload };
      case 'LIST_TIPOS_FAILURE':
        return { ...state, error: action.payload };
          // Reducers para Estadísticas por Ubicación
    case 'FETCH_STATS_BY_LOCATION_SUCCESS':
      return { ...state, statsByLocation: action.payload };
    case 'FETCH_STATS_BY_LOCATION_FAILURE':
      return { ...state, error: action.payload };

    // Reducers para Estadísticas por Tipo
    case 'FETCH_STATS_BY_TYPE_SUCCESS':
      return { ...state, statsByType: action.payload };
    case 'FETCH_STATS_BY_TYPE_FAILURE':
      return { ...state, error: action.payload };

    // Reducers para Estadísticas por Área
    case 'FETCH_STATS_BY_AREA_SUCCESS':
      return { ...state, statsByArea: action.payload };
    case 'FETCH_STATS_BY_AREA_FAILURE':
      return { ...state, error: action.payload };
       // Reducers para Métricas por Estado
    case 'FETCH_METRICS_BY_STATE_SUCCESS':
      return { ...state, metricsByState: action.payload };
    case 'FETCH_METRICS_BY_STATE_FAILURE':
      return { ...state, error: action.payload };

    // Reducers para Servicios Mensuales por Área
    case 'FETCH_MONTHLY_SERVICES_BY_AREA_SUCCESS':
      return { ...state, monthlyServicesByArea: action.payload };
    case 'FETCH_MONTHLY_SERVICES_BY_AREA_FAILURE':
      return { ...state, error: action.payload };

    // Reducers para Servicios Totales por Área
    case 'FETCH_TOTAL_SERVICES_BY_AREA_SUCCESS':
      return { ...state, totalServicesByArea: action.payload };
    case 'FETCH_TOTAL_SERVICES_BY_AREA_FAILURE':
      return { ...state, error: action.payload };

    // Reducers para Servicios por Jefatura
    case 'FETCH_SERVICES_BY_JEFATURA_SUCCESS':
      return { ...state, servicesByJefatura: action.payload };
    case 'FETCH_SERVICES_BY_JEFATURA_FAILURE':
      return { ...state, error: action.payload };

    // Reducers para Servicios por ID de Técnico
    case 'FETCH_SERVICES_BY_IDTECNICO_SUCCESS':
      return { ...state, servicesByIDTecnico: action.payload };
    case 'FETCH_SERVICES_BY_IDTECNICO_FAILURE':
      return { ...state, error: action.payload };
  
      default:
        return state;
    }
  }
  
  export default deviceReducer;
  