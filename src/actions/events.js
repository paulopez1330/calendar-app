import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStarAddNew = ( event ) => {
  return async ( dispatch, getState ) => {
    
    const { uid, name } = getState().auth;

    try {
      
      const resp = await fetchConToken( 'events', event, 'POST' );
      const body = await resp.json();

      if( body.ok ) {
        
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name
        };

        dispatch( eventAddNew ( event ) );
      } else {

      }
    } catch (error) {
      console.log(error);
    }
  }
}

const eventAddNew = ( event ) => ({
  type: types.eventAddNew,
  payload: event
});

export const eventSetActive = ( event ) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventStartUpdate = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      
      const resp = await fetchConToken( `events/${ event.id }`, event, 'PUT' );
      const body = await resp.json();

      if( body.ok ) {
        dispatch( eventUpdated ( event ) );
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const eventUpdated = ( event ) => ({
  type: types.eventUpdated,
  payload: event
});

export const eventStarDelete = ( event ) => {
  return async ( dispatch, getState ) => {
    try {
      
      const { id } = getState().calendar.activeEvent;
      await fetchConToken( `events/${ id }`, {}, 'DELETE' );

      dispatch( eventDeleted ( event ) );

    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'error al borrar en base de datos', 'error');
    }
  }
}

export const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStarLoading = ( event ) => {
  return async ( dispatch, getState ) => {
    
    // const { uid, name } = getState().auth;

    try {
      
      const resp = await fetchConToken( 'events' );
      const body = await resp.json();
      
      if( body.ok ) {
      
        const events = prepareEvents( body.eventos );
        dispatch( eventLoaded ( events ) );
      
      } else {

      }
    } catch (error) {
      console.log(error);
    }
  }
}

const eventLoaded = ( eventos ) => ({
  type: types.eventLoaded,
  payload: eventos
});

export const eventStarLogout = () => ({ type: types.eventLogout });