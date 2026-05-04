/* ===========================================================
   엔딩 화면
   - 최종 스탯 기반으로 엔딩 텍스트를 결정합니다.
   - 신입/대리/시니어에 따라 분기됩니다.
   =========================================================== */

(function () {
  'use strict';

  function render(state) {
    const { el, mount } = window.UI;
    const { CHARACTERS } = window.KKONDAE;

    const character = CHARACTERS.find(c => c.id === state.characterId);
    const ending = computeEnding(state, character);

    const scene = el('div', { className: 'scene' });
    scene.appendChild(el('div', { className: 'scene__title', text: '🎬 ' + ending.title }));
    scene.appendChild(el('div', { className: 'scene__body', text: ending.body }));

    // 최종 스탯 표시
    const stats = el('div', { className: 'stats' });
    Object.entries(state.stats).forEach(([k, v]) => {
      const s = el('div', { className: 'stat' });
      s.appendChild(el('div', { className: 'stat__label', text: k }));
      s.appendChild(el('div', { className: 'stat__value', text: String(v) }));
      stats.appendChild(s);
    });
    scene.appendChild(stats);

    scene.appendChild(el('div', { className: 'btn-row' }, [
      el('button', {
        className: 'btn btn--primary',
        text: '🔄 다시 시작',
        onClick: () => {
          window.Storage.clear();
          window.TitleScene.render();
        }
      })
    ]));

    mount(scene);
  }

  /** 캐릭터별 엔딩 분기 로직 */
  function computeEnding(state, character) {
    const s = state.stats;

    if (character.id === 'newbie') {
      if (s.평판 >= 60 && s.실력 >= 50) {
        return {
          title: '에이스 사원 엔딩',
          body: '입사 일주일 만에 모두가 인정하는 신입이 되었다.\n선배들의 기대를 한 몸에 받는 당신, 앞으로의 회사 생활이 기대된다!'
        };
      }
      if (s.스트레스 >= 70) {
        return {
          title: '번아웃 엔딩',
          body: '첫 주부터 너무 무리했다.\n주말 내내 침대에서 일어나지 못한 당신, 다음 주가 두렵다...'
        };
      }
      if (s.평판 <= 10) {
        return {
          title: '눈치 못 채는 신입 엔딩',
          body: '뭔가 분위기가 묘하다. 다들 나만 보면 한숨을 쉰다.\n무엇이 잘못된 걸까?'
        };
      }
      return {
        title: '평범한 신입 엔딩',
        body: '큰 사고도, 큰 활약도 없는 한 주였다.\n그래도 잘 살아남았다. 일단은 합격!'
      };
    }

    if (character.id === 'junior') {
      if (s.스트레스 >= 80) {
        return {
          title: '대리 번아웃 엔딩',
          body: '"오늘만 버티자"가 매일이 되었다.\n결국 휴직계를 제출했다...'
        };
      }
      if (s.평판 >= 70 && s.실력 >= 70) {
        return {
          title: '믿음직한 대리 엔딩',
          body: '위에서도 아래에서도 신뢰받는 진짜 허리가 되었다.\n승진은 시간문제!'
        };
      }
      return {
        title: '그럭저럭 대리 엔딩',
        body: '뭐 그럭저럭. 회사라는 게 다 그렇지.'
      };
    }

    if (character.id === 'senior') {
      if (s.꼰대지수 >= 80) {
        return {
          title: '🚨 진성 꼰대 엔딩',
          body: '"내가 신입 때는 말이야..." 라는 말을 하루에 7번 한다.\n팀원들은 당신을 피해 다닌다. 안타까운 결말...'
        };
      }
      if (s.꼰대지수 <= 30 && s.평판 >= 60) {
        return {
          title: '🌟 멋진 시니어 엔딩',
          body: '후배들이 "저런 선배가 되고 싶어요" 라고 말한다.\n진짜 어른의 모습. 회사의 자랑!'
        };
      }
      return {
        title: '평범한 시니어 엔딩',
        body: '꼰대까진 아니지만, 멋진 시니어도 아닌... 애매한 중간.\n다음 주엔 좀 더 잘해보자.'
      };
    }

    return {
      title: '엔딩',
      body: '한 주가 끝났다.'
    };
  }

  window.EndingScene = { render };
})();
