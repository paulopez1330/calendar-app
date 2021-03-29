import { types } from '../types/types';

const initialState = {
  events: [],
  activeEvent: null
}

export const calendarReducer = ( state = initialState, { type, payload } ) => {

  switch (type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: payload
      }

    case types.eventAddNew:
      return {
        ...state,
        events: [
          ...state.events,
          payload
        ]
      }

    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null
      }

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(
          event => ( event.id === payload.id ) ? payload : event
        )
      }

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          event => ( event.id !== state.activeEvent.id )
        ),
        activeEvent: null
      }

    case types.eventLoaded:
      return {
        ...state,
        activeEvent: null,
        events: [ ...payload ]
      }
    case types.eventLogout:
      return { ...initialState };
    default:
      return state;
  }

}