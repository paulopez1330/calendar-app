import moment from 'moment';

import { types } from '../types/types';

const initialState = {
  events: [{
    id: new Date().getTime(),
    title:'sasdasd',
    start: moment().toDate(),
    end: moment().add(2,'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'comprar',
    user: {
      _id: '123',
      name: 'Paulo'
    }
  }],
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
    default:
      return state;
  }

}