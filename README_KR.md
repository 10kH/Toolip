# 🛠️ Toolip - AI 도구 & 웹사이트 허브

> 편리한 사이드바에서 좋아하는 AI 도구와 웹사이트에 즉시 접근하세요. 개발자와 생산성 애호가를 위해 제작되었습니다.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen?logo=google-chrome)](https://chrome.google.com/webstore)
[![Version](https://img.shields.io/badge/Version-1.1.0-blue)](./TECHNICAL_DOCUMENTATION_KR.md)
[![License](https://img.shields.io/badge/License-MIT-yellow)](#라이선스)
[![Developer](https://img.shields.io/badge/Developer-Woody%20Lee-purple)](https://buymeacoffee.com/woody.lee)

## ✨ Toolip이란 무엇인가요?

Toolip은 세련된 사이드바 인터페이스를 통해 좋아하는 AI 도구, 개발 리소스, 생산성 웹사이트에 즉시 접근할 수 있게 해주는 정교한 크롬 익스텐션입니다. 더 이상 북마크를 찾거나 탭을 전환할 필요 없이, 필요한 모든 것이 클릭 한 번으로 가능합니다.

### 🎯 주요 기능

- **🚀 즉시 접근**: 지속적인 사이드바에서 원클릭 실행
- **💾 세션 지속성**: 각 사이트가 방문 간 상태를 유지
- **⚙️ 동적 관리**: 사이트 추가, 편집, 제거, 순서 변경
- **🎨 테마 시스템**: 실시간 전환이 가능한 라이트/다크 모드
- **☁️ 클라우드 동기화**: Chrome 브라우저 간 설정 동기화
- **📦 백업/복원**: 설정을 내보내기/가져오기

## 🖼️ 스크린샷

> *참고: 사용 가능할 때 스크린샷을 여기에 추가하세요*

## 🚀 빠른 시작

### 설치

#### Chrome Web Store (권장)
1. [Chrome Web Store](https://chrome.google.com/webstore) 방문 (링크 업데이트 예정)
2. "Chrome에 추가" 클릭
3. 필요한 권한 승인
4. 도구모음에서 Toolip 아이콘 확인

#### 수동 설치 (개발자용)
```bash
# 이 저장소 복제
git clone https://github.com/your-username/toolip.git

# 또는 ZIP 파일을 다운로드하고 압축 해제
```

1. Chrome을 열고 `chrome://extensions/`로 이동
2. "개발자 모드" 활성화 (우상단 토글)
3. "압축해제된 확장 프로그램을 로드합니다" 클릭하고 `toolip` 폴더 선택
4. 익스텐션이 도구모음에 나타남

### 첫 사용
1. **사이드바 열기**: Toolip 아이콘 클릭 또는 `Ctrl+M` (Mac에서 `Cmd+M`) 누르기
2. **사이트 탐색**: 아이콘 클릭하여 해당 웹사이트 열기
3. **커스터마이징**: 기어 아이콘(⚙️) 클릭하여 설정 접근
4. **사이트 추가**: 설정 페이지를 사용하여 좋아하는 도구 추가

## 🌟 기본 사이트 컬렉션

Toolip은 신중하게 선별된 13개 웹사이트와 함께 제공됩니다:

### 🤖 AI 도구 (6개 사이트)
- **ChatGPT** - OpenAI의 대화형 AI
- **Claude** - Anthropic의 AI 어시스턴트
- **Gemini** - Google의 멀티모달 AI
- **Google AI Studio** - AI 개발 플랫폼
- **Grok** - 실시간 데이터를 가진 X의 AI 챗봇
- **Perplexity** - AI 기반 검색 엔진

### 🛠️ 개발 & 생산성 (5개 사이트)
- **Notion** - 올인원 워크스페이스
- **GitHub** - 코드 저장소 호스팅
- **Hugging Face** - 머신러닝 모델 허브
- **Google Colab** - 클라우드 Jupyter 노트북
- **RunPod** - GPU 클라우드 컴퓨팅

### 🎵 엔터테인먼트 (2개 사이트)
- **YouTube** - 비디오 스트리밍 플랫폼
- **YouTube Music** - 음악 스트리밍 서비스

## 🔧 기술 개요

### 아키텍처
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Background    │    │   Side Panel    │    │  Options Page   │
│   Service       │◄──►│   (Main UI)     │◄──►│   (Settings)    │
│   Worker        │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 기술 스택
- **프레임워크**: Chrome Extension Manifest V3
- **프론트엔드**: 순수 HTML, CSS, JavaScript
- **저장소**: Chrome Storage Sync API + localStorage
- **아이콘**: 자동 폴백이 있는 PNG/SVG
- **빌드**: 빌드 프로세스 불필요

### 주요 기능 구현

#### 세션 지속성
```javascript
// 상태 보존을 위한 개별 iframe 관리
const iframes = new Map();

const openLink = async (url) => {
  // 기존 iframe들 모두 숨기기
  iframes.forEach(iframe => iframe.style.display = 'none');
  
  // URL에 대한 iframe 표시 또는 생성
  let iframe = iframes.get(url);
  if (!iframe) {
    iframe = createNewIframe(url);
    iframes.set(url, iframe);
  } else {
    iframe.style.display = 'block';
  }
};
```

#### 동적 사이트 관리
```javascript
// 실시간 사이트 컬렉션 업데이트
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.toolip_sites) {
    loadSites();
    renderSidebar();
  }
});
```

#### 테마 시스템
```javascript
// 즉시 테마 전환
const changeTheme = async (theme) => {
  await ToolipStorage.saveTheme(theme);
  document.body.className = theme + '-theme';
  chrome.runtime.sendMessage({type: 'themeChanged', theme});
};
```

## 📁 프로젝트 구조

```
toolip/
├── manifest.json              # 익스텐션 설정
├── background.js              # 백그라운드 서비스 워커
├── panel.html/js/css          # 메인 사이드바 인터페이스
├── options.html/js/css        # 설정 페이지
├── storage.js                 # 데이터 관리 유틸리티
├── removeHeader.json          # iframe 임베딩 규칙
├── images/                    # 익스텐션 아이콘 (16-128px)
├── logos/                     # 웹사이트 파비콘
└── docs/
    ├── TECHNICAL_DOCUMENTATION.md    # 완전한 기술 스펙
    ├── TECHNICAL_DOCUMENTATION_KR.md # 한국어 기술 문서
    ├── USER_GUIDE.md                 # 사용자 매뉴얼
    └── USER_GUIDE_KR.md             # 한국어 사용자 가이드
```

## 🎨 커스터마이징

### 새 사이트 추가
1. 설정 열기 (사이드바의 기어 아이콘)
2. 웹사이트 URL과 표시 이름 입력
3. 선택적으로 커스텀 아이콘 URL 추가
4. 사이트가 자동으로 기기 간 동기화됨

### 테마 커스터마이징
- **라이트 모드**: 낮 사용을 위한 깔끔하고 전문적인 외관
- **다크 모드**: 저조도 환경에서 눈의 피로 감소
- **즉시 전환**: 재시작 없이 즉시 변경사항 적용

### 백업 & 복원
```json
// 내보내기 형식
{
  "version": "1.1.0",
  "timestamp": "2025-08-11T...",
  "sites": [...],
  "theme": "light",
  "metadata": {...}
}
```

## 🔒 개인정보 보호 & 보안

### 데이터 처리
- **로컬 우선**: 세션 데이터는 기기에 로컬로 저장
- **Chrome 동기화**: Google의 보안 인프라를 통한 설정 동기화
- **제3자 서버 없음**: 익스텐션이 외부로 데이터를 전송하지 않음
- **최소 데이터**: 필수 정보만 저장

### 권한 설명
- **`sidePanel`**: 메인 사이드바 인터페이스 표시
- **`storage`**: 사이트 컬렉션 및 설정 저장
- **`declarativeNetRequestWithHostAccess`**: iframe 임베딩 허용
- **`contextMenus`**: 우클릭 메뉴 통합
- **`<all_urls>`**: 컬렉션에 추가한 모든 웹사이트 접근

## 🚀 버전 히스토리

### v1.1.0 (2025년 8월 11일) - 현재
**메이저 릴리즈: 동적 관리 & 테마 시스템**

✅ **새로운 기능**:
- 동적 사이트 관리 (추가/편집/삭제/순서변경)
- 실시간 전환이 가능한 라이트/다크 테마 시스템
- 고급 설정 페이지
- 백업/복원 기능
- 드래그 앤 드롭 순서 변경
- 자동 파비콘 통합

✅ **개선사항**:
- 향상된 세션 지속성
- 실시간 업데이트
- 클라우드 동기화
- 개인정보 보호 강화 (중국 서비스 제거)
- 깔끔한 인터페이스

### v1.0.0 (2025년 8월 10일)
**초기 릴리즈: 핵심 기반**

✅ **기초 기능**:
- 웹사이트 탐색을 위한 사이드바 인터페이스
- 세션 지속성 시스템
- 커스텀 브랜딩 및 전문적인 UI
- Chrome Web Store 준비 완료

## 🛠️ 개발

### 사전 요구사항
- **Chrome**: 88+ (Manifest V3 지원)
- **Node.js**: 선택사항 (개발 도구용)
- **Git**: 버전 관리용

### 로컬 개발
```bash
# 저장소 복제
git clone https://github.com/your-username/toolip.git
cd toolip

# Chrome에 로드
# 1. chrome://extensions/ 열기
# 2. 개발자 모드 활성화
# 3. "압축해제된 확장 프로그램을 로드합니다" 클릭
# 4. toolip 폴더 선택
```

### 개발 워크플로우
1. **변경 작업**: 선호하는 에디터에서 파일 편집
2. **로컬 테스트**: Chrome에서 익스텐션 재로드
3. **디버깅**: Chrome DevTools + Extension Inspector 사용
4. **패키징**: 배포용 ZIP 파일 생성

### 기여하기
1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

## 📊 성능

### 메트릭
- **메모리 사용량**: ~10-15MB 기본 + 활성 iframe들
- **CPU 영향**: 최소 (<1% 평균)
- **저장소**: 익스텐션 <1MB + 사용자 데이터
- **로드 시간**: <200ms 초기 로드

### 최적화
- 효율적인 iframe 관리 (재로드 vs 숨기기/표시)
- 성능 향상을 위한 지연 로딩
- 최소 DOM 조작
- 클라우드 동기화를 위한 Chrome Storage API

## 🐛 문제 해결

### 일반적인 문제

**사이트가 로드되지 않나요?**
- 일부 웹사이트는 iframe 임베딩을 차단합니다 (보안 기능)
- 인터넷 연결을 확인하세요
- 익스텐션 새로고침을 시도해보세요

**설정이 저장되지 않나요?**
- Chrome 동기화가 활성화되어 있는지 확인하세요
- 사용 가능한 저장 공간을 확인하세요
- 수동 내보내기/가져오기를 시도해보세요

**테마가 적용되지 않나요?**
- Chrome을 최신 버전으로 업데이트하세요
- 익스텐션 페이지를 새로고침하세요
- 충돌하는 익스텐션이 있는지 확인하세요

**성능 문제가 있나요?**
- 사이드바에서 사용하지 않는 사이트를 닫으세요
- Chrome 브라우저를 재시작하세요
- 임시로 사이트 수를 줄여보세요

### 도움 받기
1. 자세한 지침은 [사용자 가이드](./USER_GUIDE_KR.md)를 확인하세요
2. 구현 세부사항은 [기술 문서](./TECHNICAL_DOCUMENTATION_KR.md)를 검토하세요
3. GitHub에서 기존 이슈를 검색하세요
4. 자세한 정보와 함께 새 이슈를 생성하세요

## 🗺️ 로드맵

### v1.2.0 (계획됨)
- 📂 **사이트 카테고리**: 유형별 구성 (AI, 개발, 생산성)
- 🔍 **검색 기능**: 빠른 사이트 필터링
- ⌨️ **키보드 탐색**: 완전한 키보드 단축키
- 🎨 **커스텀 테마**: 사용자 정의 색상 구성표

### v1.3.0+ (미래)
- 👥 **워크스페이스 프로필**: 업무/개인용 다른 사이트 세트
- 📊 **사용 분석**: 가장 많이 사용하는 도구 추적
- 🔗 **API 통합**: 생산성 앱과 연결
- 📱 **모바일 컴패니언**: 잠재적인 모바일 앱

## 🤝 지원

### 커뮤니티
- **문서**: 포괄적인 가이드 제공
- **이슈**: GitHub에서 버그 신고 및 기능 요청
- **토론**: 팁과 사용 사례 공유

### 전문 지원
비즈니스 문의 또는 커스텀 개발:
- **이메일**: GitHub 프로필을 통해 연락
- **지원**: 개발 지원을 위해 커피 사주기

## ☕ 개발 지원

Toolip이 생산성을 향상시켜준다면, 개발 지원을 고려해주세요:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-☕-orange?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://buymeacoffee.com/woody.lee)

여러분의 지원은 다음에 도움이 됩니다:
- 🔧 기존 기능 유지보수 및 개선
- ✨ 새로운 기능 개발
- 🐛 버그 및 이슈 수정
- 📚 더 나은 문서 작성

## 📜 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스가 부여됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

```
MIT License

Copyright (c) 2025 Woody Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🏷️ 태그

`chrome-extension` `productivity` `ai-tools` `sidebar` `javascript` `manifest-v3` `developer-tools` `browser-extension` `workflow` `automation`

---

## 📞 연락처

- **개발자**: Woody Lee
- **GitHub**: [Your GitHub Profile](https://github.com/your-username)
- **지원**: [커피 사주기](https://buymeacoffee.com/woody.lee)
- **익스텐션 페이지**: [Chrome Web Store](https://chrome.google.com/webstore) (링크 업데이트 예정)

---

**⭐ Toolip이 생산성 향상에 도움이 되었다면 이 저장소에 별을 주세요!**

*개발자와 생산성 애호가를 위해 ❤️로 제작*

*마지막 업데이트: 2025년 8월 11일 | 버전 1.1.0*