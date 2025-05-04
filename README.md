# ✨ Bellog - 나만의 개발 이야기

Hi there! 🖐️ Bellog는 제가 개발하면서 겪은 다양한 경험과 생각을 기록하는 개인 기술 블로그입니다.
Next.js 15와 TypeScript, @next/mdx를 활용해 만든 이 공간에서 개발의 즐거움과 고민을 함께 나누고 싶습니다.

> "기록은 가장 강력한 학습 도구다"

## 🚀 이 블로그의 특별한 점

- **심플하지만 유연한 디자인**: 다양한 디바이스에서도 콘텐츠를 즐길 수 있는 반응형 UI
- **개발자를 위한 최적화**: 코드 하이라이팅과 MDX로 개발 관련 콘텐츠 작성이 편리
- **빠른 로딩 속도**: Next.js와 이미지 최적화를 통한 쾌적한 사용자 경험
- **다크/라이트 모드**: 편안한 독서 경험을 위한 테마 지원

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript로 타입 안전성 확보
- **스타일링**: TailwindCSS 4로 빠른 UI 개발
- **MDX파싱**: @next/mdx로 MDX 파싱
- **UI 컴포넌트**: Shadcn/ui 기반의 접근성 높은 인터페이스
- **테마**: next-themes로 다크/라이트 모드 구현
- **애니메이션**: tailwindcss-animate, react-type-animation으로 생동감 부여
- **이미지 최적화**: Plaiceholder, Sharp로 빠른 이미지 로딩 경험

## 📚 주요 콘텐츠 주제

- [Kio-school](https://kio-school.com/) 개발기
- [Bellog](https://www.castle-bell.site/) 개발기
- castle-bell의 일상 이야기
- 기타 개발 이야기

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- pnpm

### 설치

```bash
# 레포지토리 복제
git clone https://github.com/yourusername/bellog.git
cd bellog

# 의존성 설치
pnpm install
```

### 개발 모드로 실행하기

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하면 블로그를 확인할 수 있어요!

### 프로덕션 빌드

```bash
pnpm build
pnpm start  # 빌드된 버전 실행하기
```

## 🧩 주요 기능

- **MDX 기반 블로그 포스팅**: 코드, 이미지, 비디오를 쉽게 삽입할 수 있는 풍부한 마크다운
- **자동 목차 생성**: 긴 글도 쉽게 탐색할 수 있는 TOC 컴포넌트
- **코드 하이라이팅**: 개발자를 위한 가독성 높은 코드 블록
- **반응형 디자인**: 모든 디바이스에서 최적의 읽기 경험
- **다크 모드**: 눈의 피로를 줄이는 다크 테마 지원
- **진행 표시줄**: 글을 읽는 동안 현재 위치를 알려주는 프로그레스 바
- **태그 시스템**: 관련 콘텐츠를 쉽게 찾을 수 있는 태그 기능

## 📁 프로젝트 구조

```
src/
  ├── app/               # Next.js 앱 디렉토리
  │   ├── (contents)/    # 블로그 글 (MDX 파일)
  │   ├── about/         # 소개 페이지
  │   ├── posts/         # 게시물 목록 페이지
  │   ├── projects/      # 프로젝트 페이지
  │   └── page.tsx       # 메인 홈페이지
  ├── components/        # 재사용 가능한 컴포넌트
  │   └── ui/            # UI 컴포넌트
  ├── lib/               # 유틸리티 함수들
  ├── styles/            # 전역 스타일
  └── types/             # 타입 정의
```

## 🌱 앞으로의 계획

- [ ] 댓글 기능 추가
- [ ] 검색 기능 구현
- [ ] 관련 글 추천 시스템
- [ ] Supabase 연동으로 다양한 기능 도입

## 👨‍💻 만든 사람

- **이름**: 이성종
- **역할**: Frontend Developer
- **소속**: 건국대학교 컴퓨터공학부
- **이메일**: [sungjong5k@naver.com](mailto:sungjong5k@naver.com)
- **GitHub**: [whddltjdwhd](https://github.com/whddltjdwhd)
- **LinkedIn**: [이성종 프로필](https://www.linkedin.com/in/%EC%84%B1%EC%A2%85-%EC%9D%B4-94b48a362/)
- **모토**: “더 좋은 개발자이기 전에 더 좋은 사람이 되고 싶습니다.”
- **Tech Stack**: React, Next.js, TypeScript, JavaScript, Recoil, Styled-components, Emotion

## 📝 라이센스

MIT

---

_이 블로그는 지속적으로 개선되고 있습니다. 피드백이나 제안사항이 있으시면 언제든지 이슈를 남겨주시면 감사하겠습니다!_
