import { useContext } from 'react';
import styled from 'styled-components';

import { AlarmContext } from '../context/ContextAlarm';

const Wrapper = styled.div`
  text-align: start;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const Section = styled.section`
  border: 1px solid #fff;
`;
const Title = styled.h4`
  margin-top: 15px;
  padding: 0 15px;
  &:after {
    content: '';
    display: block;
    border-bottom: 1px solid rgba(128, 128, 128, .9);
    width: 103%;
    margin-top: 11px;
    margin-left: -10px;
  }
`;
const Body = styled.p`
  padding: 0 15px;
  font-size: 1.3rem;
  font-weight: 700;
`;

function AlarmMessage() {
  const { message } = useContext(AlarmContext);
  const datetime = message?.datetime;

  return (
    <>
      {
        message &&
          <Wrapper>
            <h2>메시지</h2>
            <Section>
              <Title>
                { formatDateString(datetime) }
              </Title>
              <Body>{ message.description }</Body>
            </Section>
          </Wrapper>
      }
    </>
  );
}

function formatDateString(dateString) {
  const formatted = new Intl.DateTimeFormat('ko', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));

  return formatted;
}

export default AlarmMessage;
