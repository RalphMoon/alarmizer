import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setAlarm } from '../../../services/slices/alarm';
import { AlarmContext } from '../context/contextAlarm';

const List = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  padding-left: 10px;
`;
const Span = styled.span`
  margin-right: 5px;
  vertical-align: -5px;
`;
const Button = styled.button`
  margin-right: 5px;
  font-size: .9rem;
`;

function Alarm({ data, onAlarmClick }) {
  const dispatch = useDispatch();
  const storageCopy = useSelector(({ alarm }) => JSON.parse(JSON.stringify(alarm.storage)));
  const { message, setMessage } = useContext(AlarmContext);
  const disabled = storageCopy[data.date][data.time].disabled;
  const formattedDateTime = formatDateString(data.id);

  function onAlarmClick() {
    setMessage({
      datetime: data.id,
      description: data.description
    });
  }

  function onActivateClick() {
    storageCopy[data.date][data.time].disabled = !disabled;

    dispatch(setAlarm(storageCopy));
  }

  function onDeleteClick() {
    if (message.datetime === data.id) {
      setMessage(null);
    }

    delete storageCopy[data.date][data.time];

    dispatch(setAlarm(storageCopy));
  }

  return (
    <>
      <List>
        <div onClick={() => onAlarmClick()}>
          <Span>{ formattedDateTime.slice(0, 5) }</Span>
          <Span style={{ fontWeight: 600 }}>{ formattedDateTime.slice(6) }</Span>
          <Span style={{ marginLeft: '20px', fontSize: '1.2rem' }}>{ data.description }</Span>
        </div>
        <div>
          <Button
            onClick={onActivateClick}
            style={disabled ? { backgroundColor: '#3d8c40' } : {}}
          >
            {disabled ? '켜기' : '끄기'}
          </Button>
          <Button onClick={onDeleteClick}>삭제</Button>
        </div>
      </List>
    </>
  );
}

function formatDateString(dateString) {
  const formatted = new Intl.DateTimeFormat('ko', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));

  return formatted;
}

export default Alarm;
