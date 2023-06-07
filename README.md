* 작업 결과물의 구조, 실행방법, 기타 참고사항을 정리

# 목차
  - 서비스 화면
  - 요구사항
  - 기술 규칙
  - 구조 설명
    - 컴포넌트 계층
    - 상태 계층
      - Redux
        - 데이터 정규화
      - React Hooks
        - useState
        - useReducer
        - useContext
  - 보완 사항

## 서비스 화면
### 알람 등록
![1](https://github.com/RalphMoon/alarmizer/assets/110374331/db5fadc6-c568-42bc-80ac-8c379892e1fc)
![2](https://github.com/RalphMoon/alarmizer/assets/110374331/54ac5249-34d1-4795-abc1-5112f4d9b457)
### 알람 끄기
![3](https://github.com/RalphMoon/alarmizer/assets/110374331/443523d2-d751-431c-bbbe-a22d0a5bf19b)
### 메시지창 출력 / 알람 삭제
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




# 상태 데이터 구조 / 설계
# 코드 구현 이유
  - delete: JSON.parse(JSON.stringify(object))
  ## 사용 모듈 / API
  - hooks: useState, useReducer, useCallback, useContext
  - [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
# 추가 라이브러리
  - redux-logger

> Create > normalizing state (정규화)
> 알람 On/Off
> Delete > JSON.parse(JSON.stringify(object))를 통한 깊은 복사

## 요구사항 외의 구현
- 동일한 날짜와 동일한 시간에 알람이 이미 있는 경우, alert()로 경고 모달이 뜨게 함.
