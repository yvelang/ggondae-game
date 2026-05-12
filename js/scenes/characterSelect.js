/* ===========================================================
   직급(캐릭터) 선택 화면
   - 상단에 성별(남자/여자) 토글이 있고, 토글에 따라 캐릭터
     미리보기가 즉시 다시 렌더링됩니다.
   - 직급 카드를 클릭하면 현재 선택된 성별과 함께 게임을 시작합니다.
   =========================================================== */

(function () {
  'use strict';

  function render(selectedGender) {
    const gender = selectedGender === 'female' ? 'female' : 'male';

    const { el, mount } = window.UI;
    const { CHARACTERS } = window.KKONDAE;

    const scene = el('div', { className: 'scene' });
    scene.appendChild(el('div', { className: 'scene__title', text: '직급을 선택하세요' }));
    scene.appendChild(el('div', {
      className: 'scene__subtitle',
      text: '선택한 직급에 따라 시작 스탯과 게임 목표가 달라집니다.'
    }));

    /* ---------- 성별 토글 ---------- */
    const genderToggle = el('div', { className: 'gender-toggle' });

    const maleBtn = el('button', {
      className: 'gender-btn' + (gender === 'male' ? ' gender-btn--active' : ''),
      text: '👔 남자',
      onClick: () => render('male')
    });
    const femaleBtn = el('button', {
      className: 'gender-btn' + (gender === 'female' ? ' gender-btn--active' : ''),
      text: '👗 여자',
      onClick: () => render('female')
    });
    genderToggle.appendChild(maleBtn);
    genderToggle.appendChild(femaleBtn);
    scene.appendChild(genderToggle);

    /* ---------- 캐릭터 카드 목록 ---------- */
    const list = el('div', { className: 'character-list' });

    CHARACTERS.forEach(ch => {
      const card = el('button', {
        className: 'character-card',
        onClick: () => window.Game.selectCharacter(ch.id, gender)
      });

      // 좌측: 캐릭터 미니 프리뷰 (이미지 우선, 없으면 SVG 폴백)
      card.appendChild(window.Sprite.characterFullBody({
        characterId: ch.id,
        gender,
        visual: ch.visual,
        className: 'character-card__preview'
      }));

      // 우측: 정보
      const info = el('div', { className: 'character-card__info' });
      info.appendChild(el('div', { className: 'character-card__name', text: ch.name }));
      info.appendChild(el('div', { className: 'character-card__desc', text: ch.description }));
      info.appendChild(el('div', { className: 'character-card__goal', text: '🎯 ' + ch.goal }));
      card.appendChild(info);

      list.appendChild(card);
    });

    scene.appendChild(list);

    scene.appendChild(el('div', { className: 'btn-row' }, [
      el('button', {
        className: 'btn',
        text: '◀ 타이틀로',
        onClick: () => window.TitleScene.render()
      })
    ]));

    mount(scene);
  }

  window.CharacterSelectScene = { render };
})();
