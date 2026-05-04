# 꼰대 오피스 (Kkondae Office)

> 회사 생존 시뮬레이션 게임 — 프린세스 메이커 스타일의 선택지 기반 2D 텍스트 게임

플레이어는 자신의 직급(신입/대리/시니어 등)을 선택하고, 매일 발생하는 회사 상황에서 적절한 선택을 통해 살아남거나, 에이스가 되거나, 꼰대가 되지 않는 것을 목표로 합니다.

---

## 🚀 실행 방법

별도의 빌드 과정이 필요 없습니다. 다음 중 하나를 선택하세요.

### 방법 1: 그냥 더블클릭
- `index.html` 파일을 더블클릭하면 브라우저에서 바로 실행됩니다.

### 방법 2: 로컬 서버 (권장)
브라우저 보안 정책상 일부 기능(추후 fetch 등)을 위해 로컬 서버 사용을 권장합니다.

```bash
# Python 3가 설치된 경우
python -m http.server 8000

# Node.js가 설치된 경우
npx serve .
```

이후 브라우저에서 `http://localhost:8000` 으로 접속하세요.

### 방법 3: VS Code Live Server
VS Code의 `Live Server` 확장 설치 → `index.html` 우클릭 → "Open with Live Server"

---

## 🎮 게임 개요

- **장르**: 선택지 기반 시뮬레이션
- **플랫폼**: 웹 브라우저 (PC / 모바일)
- **플레이 타임**: 5~15분 (1회차)

### 주요 캐릭터(직급)

| 직급 | 시작 스탯 특징 | 주 목적 |
|---|---|---|
| 신입사원 | 평판 낮음, 스트레스 낮음 | 살아남기 / 에이스 되기 |
| 대리 | 균형형 | 평판 유지하며 성장 |
| 시니어 | 실력 높음, 꼰대지수 위험 | 꼰대되지 않기 |

### 스탯 시스템

- **평판**: 동료/상사 평가
- **스트레스**: 너무 높으면 번아웃 엔딩
- **실력**: 업무 능력
- **인맥**: 사내 네트워크
- **꼰대지수**: 시니어의 핵심 지표 (높으면 꼰대 엔딩)

---

## 📁 프로젝트 구조

```
ggon/
├── index.html              # 메인 진입점
├── css/
│   └── style.css           # 전체 스타일
├── js/
│   ├── main.js             # 게임 시작 진입점
│   ├── game.js             # 게임 상태 관리
│   ├── scenes/             # 화면별 모듈
│   │   ├── titleScene.js
│   │   ├── characterSelect.js
│   │   ├── officeScene.js
│   │   └── endingScene.js
│   ├── data/               # 게임 데이터
│   │   ├── characters.js   # 직급/캐릭터 정의
│   │   ├── quests.js       # 상황/퀘스트
│   │   └── items.js        # 아이템 (확장용)
│   └── utils/
│       ├── storage.js      # 저장/불러오기
│       └── ui.js           # DOM 헬퍼
├── assets/
│   ├── images/             # 이미지
│   └── sounds/             # 사운드
├── README.md
└── .gitignore
```

---

## 🛠 새 콘텐츠 추가하는 방법 (초보자 가이드)

### 새로운 직급(캐릭터) 추가
[js/data/characters.js](js/data/characters.js) 파일을 열고 `CHARACTERS` 배열에 항목을 추가하세요.

```js
{
  id: 'manager',
  name: '과장',
  description: '중간관리자입니다.',
  startStats: { 평판: 50, 스트레스: 40, 실력: 60, 인맥: 50, 꼰대지수: 30 },
  goal: '팀을 잘 이끌기'
}
```

### 새로운 퀘스트(상황) 추가
[js/data/quests.js](js/data/quests.js) 파일을 열고 `QUESTS` 배열에 항목을 추가하세요.

```js
{
  id: 'lunch_choice',
  forCharacters: ['newbie'],          // 어떤 직급에게 등장할지
  title: '점심시간',
  description: '팀장님이 점심 같이 먹자고 한다. 어떻게 할까?',
  choices: [
    {
      label: '기쁘게 함께한다',
      effects: { 평판: +5, 스트레스: +3, 인맥: +5 }
    },
    {
      label: '선약이 있다고 말한다',
      effects: { 평판: -3, 스트레스: -5 }
    }
  ]
}
```

### 새로운 아이템 추가
[js/data/items.js](js/data/items.js) 파일에 아이템 정의를 추가하세요. (현재는 확장 자리만 마련됨)

### 저장 기능 사용
저장/불러오기는 [js/utils/storage.js](js/utils/storage.js)에 모듈화되어 있습니다. `Storage.save(state)` / `Storage.load()` 형태로 호출합니다.

---

## 📝 라이선스

개인 프로젝트 (MIT 라이선스 예정)

---

## 🗺 로드맵

- [x] 최소 실행 버전 (타이틀 → 직급 선택 → 퀘스트 → 엔딩)
- [ ] 더 많은 직급 / 퀘스트 추가
- [ ] 저장/불러오기 UI
- [ ] 아이템 시스템
- [ ] 캐릭터 일러스트
- [ ] 사운드 / BGM
- [ ] 모바일 UI 최적화
