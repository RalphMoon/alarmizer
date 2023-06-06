import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setAlarm } from '../../../services/slices/alarm';

const Wrapper = styled.div`
  margin-top: 50px;
  text-align: start;
`;
const Form = styled.form`
  border: 1px solid #fff;
  margin-bottom: 30px;
  padding: 30px;
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 100px auto;
  margin-bottom: 15px;
`;
const Select = styled.select`
  text-align: center;
`;
const Input = styled.input`
  text-align: center;
`;
const Button = styled.button`
  width: 100%;
  margin-top: 20px;
`;

const labelEntity = {
  clockMode: '시계 모드',
  id: '시간 설정',
  urgent: '알람 모드',
  description: '내용'
};
const generateKey = function () {
  return self.crypto.randomUUID();
};
const formReducer = (state, ev) => {
  if (!ev) {
    return {};
  }

  return {
    ...state,
    [ev.target.name]: ev.target.value
  };
};

function AlarmRegister() {
  const dispatch = useDispatch();
  const [ formData, setFormData ] = useReducer(formReducer, {});

  function onAlarmSubmit(ev) {
    ev.preventDefault();

    dispatch(setAlarm(formData));
    setFormData(null);
  }

  return (
    <Wrapper>
      <h2>알람 등록</h2>
      <Form onSubmit={onAlarmSubmit}>
        {
          Object.values(labelEntity).map((label, index) => {
            const stateProp = Object.keys(labelEntity)[index];
            const formProp = formData[stateProp];

            return (
              <Label key={label}>
                <p>{ label }</p>
                {
                  !index || index === 2 ? (
                    <Select
                      name={stateProp}
                      value={formProp}
                      onChange={(ev) => setFormData(ev)}
                      required
                    >
                      { <option value=''>선택</option> }
                      {
                        !index
                          ? ['일반', '진동', '야간'].map((title) => {
                              return (
                                <option key={generateKey()} value={title}>
                                  { title }
                                </option>
                              );
                            })
                          : ['일반', '긴급'].map((title, index) => {
                              return (
                                <option
                                  key={generateKey()}
                                  disabled={!index && formData.clockMode === '야간'}
                                  value={index}
                                >
                                  { title }
                                </option>
                              );
                            })
                      }
                    </Select>
                  ) : (
                    <Input
                      name={stateProp}
                      value={formProp || ''}
                      type={index === 1 ? 'datetime-local' : 'text'}
                      onChange={(ev) => setFormData(ev)}
                      required
                    />
                  )
                }
              </Label>
            );
          })
        }
        <Button type='submit'>등록</Button>
      </Form>
    </Wrapper>
  );
}

export default AlarmRegister;
