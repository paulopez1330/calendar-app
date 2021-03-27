import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRoute } from './routers/AppRoute';

export const CalendarApp = () => {
  return (
    <div>
      <Provider store={ store }>
        <AppRoute />
      </Provider>
    </div>
  )
}