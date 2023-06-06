import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Alarm from '../Alarm';

const Wrapper = styled.div`
  margin-top: 40px;
  text-align: start;
`;
const Ol = styled.ol`
  border: 1px solid #fff;
  padding: 10px 15px;
`;

function AlarmList() {
  const alarms = useSelector(({ alarm }) => {
    const result = [];

    Object.entries(alarm.storage).sort().forEach((dateProperty) => {
      const date = dateProperty[0];
      const dateEntries = Object.entries(dateProperty[1]);

      const dateInfos = dateEntries.sort().map((timeProperty) => {
        const time = timeProperty[0];
        const timeInfos = timeProperty[1];

        return { date: date, time: time, ...timeInfos };
      });

      result.push(...dateInfos);
    });

    return result;
  });

  return (
    <>
      {
        alarms[0] && (
          <Wrapper>
            <h2>알람 목록</h2>
            <Ol>
              {alarms.map((alarm) => {
                return (
                  <Alarm
                    key={self.crypto.randomUUID()}
                    data={alarm}
                  />
                );
              })}
            </Ol>
          </Wrapper>
        )
      }
    </>
  );
}

export default AlarmList;
