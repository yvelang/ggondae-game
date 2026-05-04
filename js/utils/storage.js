/* ===========================================================
   저장 / 불러오기
   - localStorage 를 사용합니다 (브라우저에 저장됨).
   - 추후 클라우드 저장으로 바꿔도 호출부는 그대로일 수 있도록
     save/load/clear/has 인터페이스만 외부에 노출합니다.
   =========================================================== */

(function () {
  'use strict';

  const KEY = 'kkondae-office:save:v1';

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      console.warn('저장 실패:', e);
      return false;
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('불러오기 실패:', e);
      return null;
    }
  }

  function has() {
    return localStorage.getItem(KEY) != null;
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  window.Storage = { save, load, has, clear };
})();
