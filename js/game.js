/* ===========================================================
   게임 핵심 로직
   - 게임 상태(state)를 관리하고 씬을 전환합니다.
   - state 구조:
     {
       characterId: 'newbie',
       day: 1,
       stats: { 평판: 30, 스트레스: 20, ... },
       usedQuestIds: ['first_day_idle']   // 중복 등장 방지
     }
   =========================================================== */

(function () {
  'use strict';

  let state = null;
  let currentQuest = null;

  /** 타이틀 → '새 게임' 클릭시 */
  function start() {
    state = null;
    currentQuest = null;
    window.CharacterSelectScene.render();
  }

  /** 직급 카드를 클릭했을 때 */
  function selectCharacter(characterId, gender) {
    const character = window.KKONDAE.CHARACTERS.find(c => c.id === characterId);
    if (!character) return;

    state = {
      characterId,
      gender: gender === 'female' ? 'female' : 'male',
      day: 1,
      // 스탯은 복사해서 시작 (원본 데이터 오염 방지)
      stats: Object.assign({}, character.startStats),
      usedQuestIds: []
    };

    saveAndRenderNextQuest();
  }

  /** 저장된 게임 이어하기 */
  function continueFromSave() {
    const loaded = window.Storage.load();
    if (!loaded) {
      alert('저장된 게임이 없습니다.');
      return;
    }
    state = loaded;
    if (state.day > window.KKONDAE.MAX_DAYS) {
      window.EndingScene.render(state);
    } else {
      pickAndRenderQuest();
    }
  }

  /** 선택지를 클릭했을 때 — 효과 반영 후 결과 화면을 보여준다 */
  function applyChoice(choiceIndex) {
    if (!currentQuest) return;
    const choice = currentQuest.choices[choiceIndex];
    if (!choice) return;

    // 효과 반영 + 0~100 범위로 클램핑 (스탯 카드에 즉시 반영됨)
    for (const [key, delta] of Object.entries(choice.effects || {})) {
      const cur = state.stats[key] ?? 0;
      state.stats[key] = clamp(cur + delta, 0, 100);
    }

    // 결과 화면 표시 — 아직 다음 턴으로 넘어가지 않음
    window.OfficeScene.renderResult(state, currentQuest, choice);
  }

  /** 결과 화면의 "다음" 버튼 클릭시 — 다음 턴으로 진행 */
  function advanceFromResult() {
    if (!currentQuest) return;

    state.usedQuestIds.push(currentQuest.id);
    state.day += 1;

    saveAndRenderNextQuest();
  }

  /** 저장 후, 다음 턴 진행 */
  function saveAndRenderNextQuest() {
    window.Storage.save(state);

    if (state.day > window.KKONDAE.MAX_DAYS) {
      window.EndingScene.render(state);
      return;
    }
    pickAndRenderQuest();
  }

  /** 현재 캐릭터에게 가능한 퀘스트 중 안 본 것 하나 고르기 */
  function pickAndRenderQuest() {
    const all = window.KKONDAE.QUESTS.filter(q =>
      q.forCharacters.includes(state.characterId) &&
      !state.usedQuestIds.includes(q.id)
    );

    // 더 이상 신규 퀘스트가 없으면 같은 캐릭터의 풀에서 랜덤 재사용
    let pool = all;
    if (pool.length === 0) {
      pool = window.KKONDAE.QUESTS.filter(q =>
        q.forCharacters.includes(state.characterId)
      );
    }

    if (pool.length === 0) {
      // 데이터가 아예 없으면 즉시 엔딩으로
      window.EndingScene.render(state);
      return;
    }

    currentQuest = pool[Math.floor(Math.random() * pool.length)];
    window.OfficeScene.render(state, currentQuest);
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  window.Game = {
    start,
    selectCharacter,
    continueFromSave,
    applyChoice,
    advanceFromResult,
    // 디버그용
    _getState: () => state
  };
})();
