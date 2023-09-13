export const selectLastIDServicio = state => {
    const solicitudes = state.solicitudReducer.solicitudes;
    const lastSolicitud = solicitudes[solicitudes.length - 1];
    return lastSolicitud ? lastSolicitud.ID_Servicio : null;
  };
  export const selectLastIDComentario = state => {
    const comentarios = state.solicitudReducer.comentarios;
    const lastComentario = comentarios[comentarios.length - 1];
    return lastComentario ? lastComentario.ID_Comentario : null;
  };
  