import { createContext, useState } from 'react';

export const AlarmContext = createContext();

function ContextAlarm({ children }) {
  const [ message, setMessage ] = useState(null);

  return (
    <AlarmContext.Provider
      value={{ message, setMessage }}
    >
      { children }
    </AlarmContext.Provider>
  );
}

export default ContextAlarm;
