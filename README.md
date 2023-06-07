## 목차
  - 서비스 화면
  - 요구사항
  - 기술 규칙
  - 구조 설명
    - 컴포넌트 계층
    - 상태 계층
      - Redux
      - 데이터 정규화
  - 보완할 점


## 서비스 화면
- ### 알람 등록
![1](https://github.com/RalphMoon/alarmizer/assets/110374331/db5fadc6-c568-42bc-80ac-8c379892e1fc)
![2](https://github.com/RalphMoon/alarmizer/assets/110374331/54ac5249-34d1-4795-abc1-5112f4d9b457)
- ### 알람 끄기
![3](https://github.com/RalphMoon/alarmizer/assets/110374331/443523d2-d751-431c-bbbe-a22d0a5bf19b)
- ### 메시지창 출력 / 알람 삭제
![4](https://github.com/RalphMoon/alarmizer/assets/110374331/9ea56079-5b96-4b03-9eac-7339b25164fc)


## 요구사항

- [x] 현재 날짜, 요일과 시간이 화면에 표시되어야 하며, 매 초 단위로 현재 시간이 바뀌어야 합니다.
- [x] 시계는 3가지 모드를 지원합니다. 각 모드에서는 아래와 같이 동작합니다.
  - 일반: 소리 알림
  - 진동: 진동 알림
  - 야간: 긴급 알림만 소리 알림
- [x] 알람은 2가지 종류가 있습니다.
  - 일반 알람
  - 긴급 알람
- [x] 알람을 추가할 수 있어야 합니다.
- [x] 알람 목록은 항상 알람시간 오름차순으로 보여야 합니다.
- [x] 개별 알람을 끄거나 삭제할 수 있어야 합니다.
- [x] 현재 시간과 알람 시각이 동일한 경우, 알람 모드에 따라 알람이 울려야 합니다.
- [x] 소리, 진동은 화면 상에서 사용자가 인지할 수 있는 정도로 적절히 표시만 하면 됩니다.


## 기술 규칙

- [x] React, Redux-toolkit과 Redux는 필수적으로 사용되어야 합니다.
- [x] Redux 상태 구조는 정규화하여 사용하세요.
- [x] 가능하다면 테스트 코드를 작성합니다.
- [x] 최신 크롬 브라우저를 지원해야 합니다.
- [x] 가능하다면 Netlify 등을 이용해 배포를 경험해보세요.
- [x] 추가 패키지를 위한 모듈 관리는 npm만 사용이 가능합니다.
- [x] 작업 결과물의 구조, 실행 방법, 기타 참고사항이 정리된 README 파일을 반드시 작성하여 포함하도록 합니다.
- Class, functional, hook 등의 사용에 대한 제약사항은 전혀 없습니다.
- UI, 디자인 요소는 평가기준과 무관합니다.
- 반응형에 대한 대응은 중요하지 않습니다.


## 구조 설명

- ### 컴포넌트 계층
1. App.jsx
    ```javascript
    // App.js
    function App() {
      return (
        <main>
          <Header />
          <Dashboard />
        </main>
      );
    }
    ```
    > 최상위 컴포넌트인 App.js에서는 크게 Header 컴포넌트와 Dashboard 컴포넌트를 자식 컴포넌트로 두도록 하였습니다. Header 함수 내부에는 현재 시간을 1초 간격으로 렌더링하는 기능과, 설정한 알람과 현재 시간이 동일할 때 알람을 alert해주는 기능이 구현되어 있습니다.

2. Dashboard.jsx
    ```javascript
    // Dashboard.jsx
    function Dashboard() {
        return (
          <AlarmRegister />
          <ContextAlarm>
            <AlarmList />
            <AlarmMessage />
          </ContextAlarm>
        );
    }
    ```
    > Dashboard 컴포넌트는 알람 정보를 등록하는 AlarmRegister 컴포넌트와,
    등록된 알람을 리스트로 렌더링하는 AlarmList 컴포넌트, 그리고 해당 리스트를 클릭 시 해당 알람의 시간 정보와 내용을 렌더링 해주는 AlarmMessage를 자식 컴포넌트로 갖습니다.

3.  AlarmList.jsx
    ```javascript
    // AlarmList.jsx
    function AlarmList() {
        return (
            // ...
            alarms[0] && (
              {alarms.map((alarm) => {
                return (
                  <Alarm
                    key={self.crypto.randomUUID()}
                    data={alarm}
                  />
                );
              })}
            )}
        );
      };
    }
    ```
    > AlarmList 컴포넌트는 등록된 알람 수 만큼 Alarm 컴포넌트를 렌더링해주도록 구현하였습니다.

- ### 상태 계층
    - Redux
        ```javascript
        // initialStates.jsx
        const initialState = {
          storage: {},
        };

        // alarm.jsx
        export const alarmSlice = createSlice({
            // ...
          reducers: {
            setAlarm: (state, { payload }) => {
                // ...
            }
          }
        });
        ```
        > 전역 상태로 두어야 하는 데이터는 Header, AlarmRegister, AlarmMessage, AlarmList, Alarm 총 5개의 컴포넌트에서 사용되는 "알람에 대한 정보"라고 판단하였습니다. 그래서 이를 여러가지 정보를 저장하기 용이한 객체의 형태로 초기상태를 설정하고 이에 따른 reducer 함수를 구현하였습니다.

    - 데이터 정규화
        ```javascript
            {
                "2023-06-07": {
                    "17:31": {
                        // ...
                    },
                    "17:29": {
                        // ...
                    }
                },
                "2023-05-31": {
                    "17:29": {
                        // ...
                    }
                }
            }
        ```
        > 사용자가 입력한 AlarmRegister 컴포넌트의 시간 설정 form을 건네받으면, 이를 "날짜"와 "시간"으로 정규화하는 로직을 setAlarm 리듀서 함수 내부에 구현하였습니다.

- ### 보완할 점
  - reducer와 유틸 함수에 대한 테스트 코드
  - 미구현한 react 컴포넌트 유닛 테스트 코드 구현
  - 데이터 정규화에 대한 명확한 이해
  - eslint 등의 정적 분석 도구에 대한 명확한 이해
