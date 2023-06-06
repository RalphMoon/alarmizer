import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

export const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    setAlarm: (state, { payload }) => {
      if (!payload.id) {
        state.storage = payload;
        return;
      }

      const date = payload.id.split('T')[0];
      const time = payload.id.split('T')[1];

      if (Object.hasOwn(state.storage, date) &&
          Object.hasOwn(state.storage[date], time)) {
        alert('이미 동일한 날짜와 시간에 알람이 있습니다!');

        return;
      }

      if (!state.storage[date]) {
        state.storage[date] = {};
      }

      const dateProp = state.storage[date];

      dateProp[time] = {
        ...payload,
        id: payload.id + ':00',
        disabled: false,
        urgent: !!Number(payload.urgent),
      };
    }
  }
});

export const { setAlarm } = alarmSlice.actions;
export default alarmSlice.reducer;


