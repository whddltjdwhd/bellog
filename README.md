# ✨ Bellog - 개발자의 성장 기록 저장소

<div align="center">
  <p>
    <strong>"기록은 가장 강력한 학습 도구다"</strong>
  </p>
  <p>
    <a href="https://www.castle-bell.site/">
      <img src="https://img.shields.io/badge/Website-black?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website"/>
    </a>
    <a href="https://github.com/whddltjdwhd/bellog">
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
    </a>
  </p>
</div>

**Bellog**는 개발자로서 겪는 다양한 경험과 생각을 기록하고 공유하기 위해 만든 개인 기술 블로그입니다. Next.js(App Router) 기반으로 구축되었으며, 모든 콘텐츠는 Notion 데이터베이스를 통해 효율적으로 관리됩니다.

---

## 🚀 주요 기능

- **✍️ Notion 기반 콘텐츠 관리**: 모든 포스트는 Notion 데이터베이스를 통해 작성, 수정, 게시되어 콘텐츠 관리가 매우 편리합니다.
- **🎨 다크/라이트 모드**: `next-themes`를 활용하여 사용자의 시각적 편안함을 위한 테마 전환 기능을 제공합니다.
- **🧭 자동 목차 (TOC)**: `IntersectionObserver`를 사용해 구현된 목차는 스크롤 위치에 따라 현재 읽고 있는 섹션을 자동으로 하이라이트하여 긴 글의 가독성을 높여줍니다.
- **💬 댓글 기능**: [Giscus](https://giscus.app/ko)를 연동하여 GitHub Discussions를 통해 방문자들이 소통할 수 있는 창구를 마련했습니다.
- **📊 읽기 진행률 표시줄**: 스크롤에 따라 페이지 상단에 읽기 진행률을 시각적으로 표시하여 사용자 경험을 향상시킵니다.
- **📱 반응형 디자인**: TailwindCSS를 사용하여 모든 디바이스(데스크톱, 태블릿, 모바일)에서 최적화된 UI를 제공합니다.
- **🏷️ 태그 시스템**: 각 포스트에 태그를 부여하여 관련 주제의 글들을 쉽게 탐색할 수 있습니다.
- **✨ 프로젝트 쇼케이스**: 별도의 프로젝트 페이지를 통해 진행했던 프로젝트들을 소개하고 아카이빙합니다.

## 🛠️ 기술 스택

| Category      | Technology                                                                                                                            |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework** | [Next.js](https://nextjs.org/) (App Router)                                                                                           |
| **Language**  | [TypeScript](https://www.typescriptlang.org/)                                                                                         |
| **Styling**   | [TailwindCSS](https://tailwindcss.com/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| **CMS**       | [Notion API](https://developers.notion.com/), [@notionhq/client](https://github.com/makenotion/notion-sdk-js), [react-notion-x](https://github.com/NotionX/react-notion-x) |
| **UI/UX**     | [Shadcn/ui](https://ui.shadcn.com/), [lucide-react](https://lucide.dev/), [next-themes](https://github.com/pacocoursey/next-themes)       |
| **Comments**  | [Giscus](https://giscus.app/ko)                                                                                                       |
| **Analytics** | [@vercel/analytics](https://vercel.com/analytics), [@vercel/speed-insights](https://vercel.com/speed-insights)                         |
| **Deployment**| [Vercel](https://vercel.com/)                                                                                                         |

## ⚙️ 시작하기

### 1. 환경 변수 설정

프로젝트를 로컬에서 실행하기 위해 Notion API 연동이 필요합니다. 프로젝트 루트 디렉터리에 `.env.local` 파일을 생성하고 아래 내용을 채워주세요.

```env
# Notion API 키
NOTION_API_KEY=secret_...

# Notion 데이터베이스 ID
NOTION_DATABASE_ID=...

# react-notion-x를 위한 추가 정보 (선택 사항)
# 비공개 페이지 렌더링 시 필요
NOTION_TOKEN_V2=...
NOTION_ACTIVE_USER=...
```

- `NOTION_API_KEY`와 `NOTION_DATABASE_ID`는 [Notion Developers](https://developers.notion.com/)에서 발급받을 수 있습니다.
- `NOTION_TOKEN_V2`는 브라우저 쿠키에서 확인할 수 있습니다.

### 2. 의존성 설치 및 실행

```bash
# 1. 레포지토리 복제
git clone https://github.com/whddltjdwhd/bellog.git
cd bellog

# 2. 의존성 설치 (pnpm 사용 권장)
pnpm install

# 3. 개발 서버 실행
pnpm run dev
```

이제 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 블로그를 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── app/               # Next.js 앱 라우터
│   ├── posts/         # 게시물 목록 및 상세 페이지
│   ├── projects/      # 프로젝트 소개 페이지
│   └── ...
├── components/        # 재사용 가능한 리액트 컴포넌트
│   ├── common/        # 헤더, 푸터 등 공통 컴포넌트
│   ├── posts/         # 포스트 렌더링, 목차, 댓글 등 관련 컴포넌트
│   └── ui/            # Shadcn/ui 기반의 저수준 UI 컴포넌트
├── hooks/             # 커스텀 훅 (e.g., useTocObserver)
├── lib/               # 라이브러리 및 유틸리티 함수
│   └── notion.ts      # Notion API 데이터 페칭 로직
├── styles/            # 전역 CSS
└── types/             # 프로젝트에서 사용되는 타입 정의
```

## 👨‍💻 만든 사람

- **이름**: 이성종
- **GitHub**: [@whddltjdwhd](https://github.com/whddltjdwhd)
- **이메일**: [sungjong5k@naver.com](mailto:sungjong5k@naver.com)

---

_이 프로젝트는 꾸준히 개선되고 있습니다. 피드백이나 제안 사항이 있다면 언제든지 이슈를 남겨주세요!_