import styled from 'styled-components';

import AlarmRegister from './AlarmRegsiter';
import ContextAlarm from './context/contextAlarm';
import AlarmList from './AlarmList';
import AlarmMessage from './AlarmMessage';

const Wrapper = styled.div`
  width: 700px;
`;

function Dashboard() {
  return (
    <Wrapper>
      <AlarmRegister />
      <ContextAlarm>
        <AlarmList />
        <AlarmMessage />
      </ContextAlarm>
    </Wrapper>
  );
}

export default Dashboard;
