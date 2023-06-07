import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { formatLocalDate, formatCurrent } from '../../util';

const HeaderTitle = styled.div`
  border: 3px solid #fff;
  margin-top: 20px;
  padding: 20px 20px;
  font-size: 3rem;
`;

function Header() {
  const storage = useSelector(({ alarm }) => alarm.storage);
  const [ currentDateTime, setCurrentDateTime ] = useState(null);
  const currentDate = currentDateTime?.slice(0, 10);
  const currentTime = currentDateTime?.slice(11, 16);

  const clockCallback = useCallback(() => {
    setCurrentDateTime(formatLocalDate());
  }, []);

  useEffect(() => {
    const timerId = setInterval(clockCallback, 1000);

    if (Object.hasOwn(storage, currentDate) &&
        Object.hasOwn(storage[currentDate], currentTime) &&
        storage[currentDate][currentTime].id === currentDateTime &&
        !storage[currentDate][currentTime].disabled) {
      const timeEntity = storage[currentDate][currentTime];
      const urgent = timeEntity.urgent;
      const clockMode = timeEntity.clockMode;
      const description = timeEntity.description;
      const classifyAlert = function (urgent) {
        switch (clockMode) {
          case '진동':
            alert(`${urgent ? '📳 ' + description + ' 🚨' : '📳 ' + description}`);
            break;
          default:
            alert(`${urgent ? '🔊 ' + description + ' 🚨' : '🔊 ' + description}`);
            break;
        }
      };

      switch (urgent) {
        case true:
          classifyAlert(urgent);
          break;
        default:
          classifyAlert(urgent);
          break;
      }
    }

    return () => clearInterval(timerId);
  }, [currentDateTime]);

  return (
    <HeaderTitle>{ formatCurrent(currentDateTime) }</HeaderTitle>
  );
}

export default Header;
