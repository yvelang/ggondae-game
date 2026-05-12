/* ===========================================================
   캐릭터(직급) 데이터
   - 새 직급을 추가하려면 이 배열에만 항목을 추가하면 됩니다.
   - id 는 다른 곳(quests.js의 forCharacters)에서 참조됩니다.
   - startStats 의 키는 모든 캐릭터에서 동일하게 유지하세요.
   =========================================================== */

(function () {
  'use strict';

  const CHARACTERS = [
    {
      id: 'newbie',
      name: '신입사원',
      description: '회사 첫 출근! 모든 게 어색하고 긴장된다.',
      goal: '꼰대 오피스에서 살아남기 / 에이스 되기',
      startStats: {
        평판: 30,
        스트레스: 20,
        실력: 30,
        인맥: 10,
        꼰대지수: 0
      },
      // SVG 캐릭터 색상 (스프라이트 렌더러에서 사용)
      visual: {
        hairColor: '#2b1f1a',
        skinColor: '#fad6b3',
        suitColor: '#2c3e50',
        shirtColor: '#ffffff',
        accentColor: '#c0392b',
        hairStyle: 'short',          // 남자용
        hairStyleFemale: 'bob'        // 여자용
      }
    },
    {
      id: 'junior',
      name: '대리',
      description: '실무를 가장 많이 하는 허리. 위아래로 치인다.',
      goal: '평판 유지하며 성장하기',
      startStats: {
        평판: 50,
        스트레스: 40,
        실력: 55,
        인맥: 40,
        꼰대지수: 15
      },
      visual: {
        hairColor: '#3a2a1a',
        skinColor: '#f5cba0',
        suitColor: '#5d4e75',
        shirtColor: '#f0f0f0',
        accentColor: '#27ae60',
        hairStyle: 'medium',
        hairStyleFemale: 'longStraight'
      }
    },
    {
      id: 'senior',
      name: '시니어',
      description: '실력은 충분하지만, 자칫하면... 꼰대가 될 수 있다.',
      goal: '꼰대되지 않기',
      startStats: {
        평판: 60,
        스트레스: 50,
        실력: 80,
        인맥: 70,
        꼰대지수: 60
      },
      visual: {
        hairColor: '#555555',
        skinColor: '#ecbfa0',
        suitColor: '#1a2530',
        shirtColor: '#f8f8f8',
        accentColor: '#8b0000',
        hairStyle: 'sleek',
        hairStyleFemale: 'shortPro'
      }
    }
  ];

  // 모든 캐릭터가 공유하는 스탯 키 (UI 표시 순서)
  const STAT_KEYS = ['평판', '스트레스', '실력', '인맥', '꼰대지수'];

  // 게임 종료 조건이 되는 최대 턴 수 (며칠)
  const MAX_DAYS = 5;

  window.KKONDAE = window.KKONDAE || {};
  window.KKONDAE.CHARACTERS = CHARACTERS;
  window.KKONDAE.STAT_KEYS = STAT_KEYS;
  window.KKONDAE.MAX_DAYS = MAX_DAYS;
})();
