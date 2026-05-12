/* ===========================================================
   퀘스트(상황) 데이터
   - 게임 진행 중 매 턴(하루) 발생하는 상황입니다.
   - forCharacters: 어떤 직급에게 등장 가능한지
   - mood: 이 상황(질문 단계)에서 캐릭터 초상화에 사용할 표정
   - choices[].effects: 선택시 스탯에 더해질 값 (음수도 가능)
   - choices[].result: 선택 후 무슨 일이 벌어졌는지 (대화창에 표시)
   - choices[].resultMood: 결과 화면에서 캐릭터 초상화 표정

     표정 키: 'neutral' | 'joy' | 'sad' | 'angry'
              | 'flustered' | 'tired' | 'surprised' | 'smirk'
   =========================================================== */

(function () {
  'use strict';

  const QUESTS = [
    /* ---------------- 신입사원 ---------------- */
    {
      id: 'first_day_idle',
      forCharacters: ['newbie'],
      mood: 'flustered',
      title: '입사 첫 날, 한가한 오전',
      description:
        '입사 후 첫 출근! 회사 사람들에게 인사도 마쳤고\n자리에 앉아 기본 업무 세팅을 마쳤다.\n아직 전달받은 업무가 없는데 무얼 하면 좋을까?',
      choices: [
        {
          label: '업무 지시가 내려지기 전까지 자유시간! 핸드폰을 한다.',
          effects: { 평판: -8, 스트레스: -2 },
          result: '옆자리 선배가 슬쩍 보더니 작게 한숨을 쉰다.\n"첫날인데 벌써 핸드폰이라니..." 분위기가 미묘해졌다.',
          resultMood: 'flustered'
        },
        {
          label: '노트북 세팅은 끝났으니, 열람 가능한 회사 정보를 훑어본다.',
          effects: { 평판: +6, 실력: +5, 스트레스: +2 },
          result: '선배가 모니터를 슬쩍 보더니 작게 끄덕인다.\n"적극적이네." 좋은 첫인상을 남겼다.',
          resultMood: 'joy'
        },
        {
          label: '옆자리 선배에게 "도와드릴 일 있을까요?" 라고 묻는다.',
          effects: { 평판: +8, 인맥: +5, 스트레스: +3 },
          result: '선배가 환하게 웃는다. "오, 마침 잘됐다!"\n작은 일거리를 받았고, 의욕적인 신입으로 각인됐다.',
          resultMood: 'joy'
        }
      ]
    },
    {
      id: 'newbie_lunch',
      forCharacters: ['newbie'],
      mood: 'flustered',
      title: '첫 점심시간',
      description:
        '팀장님이 "오늘 점심 같이 먹지?" 라고 물어본다.\n사실 좀 부담스럽다. 어떻게 할까?',
      choices: [
        {
          label: '"네! 좋아요" 라고 따라간다.',
          effects: { 평판: +5, 인맥: +6, 스트레스: +5 },
          result: '점심 내내 어색한 미소를 유지하느라 입꼬리가 아팠다.\n그래도 팀장님과 친해질 기회를 잡았다.',
          resultMood: 'flustered'
        },
        {
          label: '"죄송해요, 약속이 있어서요" 하고 빠진다.',
          effects: { 평판: -4, 스트레스: -3 },
          result: '팀장님이 잠깐 머뭇하더니 "그래... 알겠어."\n살짝 미묘한 공기가 남았지만, 일단 혼자만의 시간을 확보했다.',
          resultMood: 'flustered'
        },
        {
          label: '"오늘은 혼자 좀 정리하고 싶어서요" 라고 솔직히 말한다.',
          effects: { 평판: -1, 스트레스: -2, 실력: +2 },
          result: '팀장님이 "그래, 첫날이니 그래도 돼." 라고 한다.\n오히려 솔직함이 통한 듯하다.',
          resultMood: 'neutral'
        }
      ]
    },
    {
      id: 'newbie_unknown_task',
      forCharacters: ['newbie'],
      mood: 'flustered',
      title: '처음 받은 업무',
      description:
        '선배가 "이거 좀 해줘" 라며 자료를 넘겼다.\n그런데 정확히 뭘 어떻게 해야 할지 모르겠다.',
      choices: [
        {
          label: '일단 내가 이해한 대로 시작한다. 모르면 검색!',
          effects: { 평판: -3, 실력: +4, 스트레스: +6 },
          result: '결과물을 본 선배의 미간이 찌푸려진다.\n"이거 절반은 다시 해야 해..." 그래도 검색하면서 배운 건 많다.',
          resultMood: 'tired'
        },
        {
          label: '바로 다시 가서 "정확히 뭘 원하시는지" 한 번에 물어본다.',
          effects: { 평판: +6, 실력: +3, 스트레스: -2, 인맥: +2 },
          result: '선배가 "오, 물어봐줘서 고마워" 라며 친절히 설명해준다.\n시작 전에 명확히 하니 진행이 부드럽다.',
          resultMood: 'joy'
        },
        {
          label: '동기 단톡방에 "이거 어떻게 해?" 라고 묻는다.',
          effects: { 평판: 0, 인맥: +3, 실력: +1 },
          result: '동기들이 "나도 비슷한 거 해봤어!" 라며 팁을 공유해준다.\n동기 네트워크가 든든하다.',
          resultMood: 'neutral'
        }
      ]
    },

    /* ---------------- 대리 ---------------- */
    {
      id: 'junior_overflow',
      forCharacters: ['junior'],
      mood: 'tired',
      title: '쏟아지는 업무',
      description:
        '오전 10시. 이미 메신저 알림이 23개.\n동시에 진행 중인 업무가 5개.\n어디서부터 손대야 할까?',
      choices: [
        {
          label: '급한 것부터 하나씩, 메신저는 잠시 무음.',
          effects: { 실력: +5, 스트레스: +3, 평판: +2 },
          result: '집중 모드 ON. 오후엔 굵직한 건 다 처리했다.\n약간 피곤하지만 일을 끝낸 뿌듯함이 크다.',
          resultMood: 'neutral'
        },
        {
          label: '들어오는 순서대로 그냥 다 한다.',
          effects: { 실력: -2, 스트레스: +10, 평판: -3 },
          result: '하루 종일 뭔가 했는데 정작 중요한 건 못 끝냈다.\n"대리님 이거 언제 돼요?" 메시지만 쌓여간다.',
          resultMood: 'tired'
        },
        {
          label: '팀장에게 "우선순위 정리 좀 도와주세요" 요청한다.',
          effects: { 평판: +5, 인맥: +3, 스트레스: -3 },
          result: '팀장이 "이거랑 이거만 오늘 끝내. 나머지는 내일."\n정리해주니 한결 가뿐해진 하루.',
          resultMood: 'joy'
        }
      ]
    },

    /* ---------------- 시니어 ---------------- */
    {
      id: 'senior_newbie_question',
      forCharacters: ['senior'],
      mood: 'smirk',
      title: '신입의 어이없는 질문',
      description:
        '신입사원이 "이거 어떻게 하는 거예요?" 라고 묻는다.\n사실 너무 기본적인 질문이다. 어떻게 답할까?',
      choices: [
        {
          label: '"그것도 몰라? 내가 신입 때는 말이야..." 라고 시작한다.',
          effects: { 꼰대지수: +15, 평판: -8, 스트레스: -2 },
          result: '신입이 어색하게 "아... 네..." 하며 자리로 돌아간다.\n속은 시원했지만, 등 뒤에서 작은 한숨 소리가 들렸다.',
          resultMood: 'smirk'
        },
        {
          label: '"좋은 질문이에요" 하고 차근차근 알려준다.',
          effects: { 꼰대지수: -5, 평판: +8, 인맥: +4, 스트레스: +3 },
          result: '신입이 환하게 웃으며 "정말 감사합니다!"\n시간은 좀 들었지만 진짜 선배의 길을 걸은 기분이다.',
          resultMood: 'joy'
        },
        {
          label: '"검색해보고 그래도 모르겠으면 다시 와요" 라고 답한다.',
          effects: { 꼰대지수: +3, 평판: 0, 실력: +1 },
          result: '신입이 "네..." 하고 돌아간다.\n적당히 자기 시간 챙기면서 가르치는 책임도 살짝 회피한 셈.',
          resultMood: 'neutral'
        }
      ]
    },
    {
      id: 'senior_after_work',
      forCharacters: ['senior'],
      mood: 'neutral',
      title: '퇴근 5분 전, 술 한잔?',
      description:
        '오후 5시 55분. 팀원들에게 한마디 던지고 싶다.\n"오늘 한잔 어때?"',
      choices: [
        {
          label: '"오늘 다 같이 한잔 어때?" 호쾌하게 제안한다.',
          effects: { 꼰대지수: +12, 평판: -5, 인맥: +2 },
          result: '팀원들 표정이 살짝 굳는다. "저는 약속이..." "저도..."\n결국 막내 두 명만 따라왔다. 미묘한 술자리.',
          resultMood: 'sad'
        },
        {
          label: '아무 말 없이 조용히 퇴근한다.',
          effects: { 꼰대지수: -8, 스트레스: -5 },
          result: '오늘 하루도 무사히 마쳤다.\n가벼운 발걸음으로 엘리베이터를 탔다.',
          resultMood: 'neutral'
        },
        {
          label: '"가고 싶은 사람만 와요, 강제 아님" 이라고 톡 남긴다.',
          effects: { 꼰대지수: -3, 평판: +3, 인맥: +3 },
          result: '의외로 절반이 "저요!" 라고 답한다.\n강요 없는 회식이 이렇게 가능한 거였구나.',
          resultMood: 'joy'
        }
      ]
    }
  ];

  window.KKONDAE = window.KKONDAE || {};
  window.KKONDAE.QUESTS = QUESTS;
})();
