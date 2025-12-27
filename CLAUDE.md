# Bellog Development Guide

프로젝트 가이드 for Claude Code & AI Assistants

## 프로젝트 개요

**Bellog**는 Next.js 15와 Notion을 기반으로 한 현대적인 개인 블로그입니다.

### 기술 스택

- **Frontend:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** TailwindCSS 4.x with custom HSL CSS variables
- **Animation:** Framer Motion
- **CMS:** Notion (Headless CMS)
- **Deployment:** Vercel
- **Package Manager:** pnpm

### 핵심 기능

- 🌓 다크/라이트 모드 (next-themes)
- ✨ Framer Motion 애니메이션
- 📝 Notion 기반 콘텐츠 관리
- 📱 완전 반응형 디자인
- 🔍 SEO 최적화 (sitemap, robots.txt)
- 💬 Giscus 댓글 시스템
- 📊 Vercel Analytics & Speed Insights
- 🏷️ 태그 기반 포스트 필터링
- 📖 스크롤 스파이 TOC (Table of Contents)

---

## 🤖 Claude Code 설정

이 프로젝트는 **5개의 Custom Sub-Agents**와 **6개의 Custom Skills**로 구성된 AI 지원 개발 워크플로우를 사용합니다.

### Sub-Agents

명시적으로 호출하여 사용합니다:

| Agent | 용도 | 호출 방법 |
|-------|------|-----------|
| **@feature-architect** | 새 기능 요구사항 분석 및 구현 전략 설계 | `@feature-architect "기능 설명"` |
| **@ui-engineer** | 인터랙티브 UI 컴포넌트 구현 | `@ui-engineer "UI 요소 설명"` |
| **@code-guardian** | 코드 품질 검증 및 표준 준수 확인 | `@code-guardian review-changes` |
| **@test-orchestrator** | 테스트 계획 생성 및 빌드 검증 | `@test-orchestrator verify-feature [name]` |
| **@git-flow** | 커밋 생성 및 PR 작성 | `@git-flow commit` or `@git-flow pr main` |

### Skills

컨텍스트에 따라 자동으로 활성화됩니다:

| Skill | 활성화 조건 | 제공 내용 |
|-------|------------|----------|
| **bellog-animations** | 애니메이션 구현 시 | Framer Motion 패턴 |
| **bellog-theme** | 스타일링된 컴포넌트 생성 시 | CSS 변수 및 테마 통합 |
| **bellog-hooks** | 커스텀 훅 생성 시 | React 훅 패턴 |
| **bellog-rsc** | 새 컴포넌트 생성 시 | Server/Client Component 결정 |
| **bellog-structure** | 파일 생성 또는 재구성 시 | 파일 구조 및 명명 규칙 |
| **bellog-notion** | Notion 데이터 처리 시 | Notion API 통합 패턴 |

---

## 📂 프로젝트 구조

```
/src
├── app/                 # Next.js App Router
│   ├── page.tsx        # 홈 페이지
│   ├── posts/          # 블로그 포스트
│   └── api/            # API 엔드포인트
├── components/
│   ├── common/         # 공통 컴포넌트 (Navbar, Footer, Intro)
│   ├── posts/          # 포스트 전용 (PostCard, NotionToc)
│   └── ui/             # UI 프리미티브 (Tag, ThemeToggle)
├── hooks/              # 커스텀 훅 (useScrollSpy, useTocObserver)
├── lib/                # 비즈니스 로직 (notion.ts, posts.ts)
├── constants/          # 공유 상수 (ui.ts)
├── types/              # TypeScript 타입 정의
└── styles/             # 글로벌 스타일
```

---

## 🎨 디자인 시스템

### 색상 시스템

**모든 색상은 CSS 변수를 사용해야 합니다** (하드코딩 금지):

```typescript
// ✅ 올바른 사용
className="bg-background text-foreground border-border"
className="bg-primary text-primary-foreground"
className="bg-card border-border/50"

// ❌ 잘못된 사용
className="bg-white text-black"        // 하드코딩
className="bg-gray-100"                // Tailwind 기본 색상
```

**사용 가능한 CSS 변수:**
- `background`, `foreground`
- `card`, `card-foreground`
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `muted`, `muted-foreground`
- `accent`, `accent-foreground`
- `border`, `input`, `ring`

### 애니메이션 원칙

- **타이밍:** 상호작용 0.2-0.5s, 전환 0.4s, 앰비언트 3-4s
- **Easing:** 항상 `easeInOut` 사용 (linear 금지)
- **패턴:** Variants 패턴 사용 (인라인 props 지양)
- **성능:** Transform 사용 (width/height 직접 애니메이션 지양)

### 스타일링 규칙

- Border radius: `rounded-3xl` (카드), `rounded-full` (버튼)
- Shadows: `shadow-sm` (기본), `shadow-md` (hover)
- Backdrop blur: `backdrop-blur-xl`
- Hover scale: `hover:scale-[1.02]`

---

## ⚛️ 컴포넌트 가이드라인

### Server vs Client Components

**기본값: Server Component**

Client Component는 다음 경우에만 사용:
- React Hooks 필요 (useState, useEffect 등)
- 이벤트 핸들러 필요 (onClick, onChange 등)
- Browser APIs 필요 (window, document 등)
- framer-motion 사용
- next-themes 사용

```typescript
// Server Component (기본)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component (필요시에만)
"use client";

import { useState } from 'react';

export function Interactive() {
  const [state, setState] = useState();
  return <button onClick={...}>Click</button>;
}
```

### 명명 규칙

- **Components:** PascalCase (PostCard.tsx)
- **Hooks:** camelCase with 'use' prefix (useScrollSpy.ts)
- **Utils:** camelCase (notion.ts, posts.ts)
- **Constants:** SCREAMING_SNAKE_CASE

---

## 💾 Notion CMS 통합

### 데이터 Fetching

```typescript
// 모든 포스트 가져오기
import { getAllPosts } from '@/lib/posts';
const posts = await getAllPosts();

// 특정 포스트 가져오기
import { getPostBySlugFromNotion } from '@/lib/notion';
const post = await getPostBySlugFromNotion('slug');

// 포스트 콘텐츠 렌더링
import { getPostRecordMap } from '@/lib/notion';
const recordMap = await getPostRecordMap(postId);
```

### 캐싱 전략

- **React cache()** - 단일 렌더링 내 중복 제거
- **unstable_cache()** - TTL 1시간 영구 캐싱
- **Tags** - `['posts', 'notion']` for bulk invalidation

### On-Demand Revalidation

```bash
# 캐시 무효화
curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET"
```

---

## 🔄 개발 워크플로우

### 새 기능 구현 (6단계)

1. **기능 파악** - `@feature-architect "기능 설명"`
   - 기존 패턴 분석
   - 구현 전략 설계
   - 파일 경로 및 구조 결정

2. **구현** - `@ui-engineer "구현 내용"`
   - 컴포넌트 생성
   - 애니메이션 적용
   - 테마 통합

3. **검증** - `@code-guardian review-changes`
   - ESLint, TypeScript 검사
   - 패턴 준수 확인
   - 보안 스캔

4. **테스트** - `@test-orchestrator verify-feature [name]`
   - 빌드 검증
   - 테스트 체크리스트 생성
   - 사용자 수동 테스트 가이드 제공

5. **커밋** - `@git-flow commit`
   - Conventional Commits 형식
   - 한글 설명
   - Claude 공동 저자 표시

6. **PR** - `@git-flow pr main`
   - 종합 PR 설명
   - 테스팅 체크리스트
   - 스크린샷 (UI 변경 시)

### 에러 발생 시 롤백

```bash
# 안전한 롤백
@git-flow rollback

# 에이전트가 자동으로:
# 1. 변경사항 stash
# 2. 또는 이전 커밋으로 revert
# 3. 문제 분석 및 대안 제시
```

---

## 📋 코딩 표준

### TypeScript

- **엄격 모드** 사용
- 모든 것 타입 지정 (no `any`)
- 명시적 return 타입 선호

### Import 순서

```typescript
// 1. React & Next.js
import { useState } from 'react';

// 2. 서드파티 라이브러리
import { motion } from 'framer-motion';

// 3. 내부 imports (@/...)
import { Button } from '@/components/ui/button';

// 4. 상대 imports
import { helper } from '../utils';

// 5. Type imports
import type { Post } from '@/types';
```

### Commit Messages

**형식:** Conventional Commits (commitlint 강제)

```
<type>[(scope)]: <description>

<Korean detailed description>
- <bullet point 1>
- <bullet point 2>

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Types:**
- `feat:` - 새 기능
- `fix:` - 버그 수정
- `style:` - UI/스타일 변경
- `refactor:` - 리팩토링
- `perf:` - 성능 개선
- `docs:` - 문서
- `test:` - 테스트
- `chore:` - 유지보수

---

## 🔑 환경 변수

`.env.local`에 설정:

```bash
# Notion API
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_TOKEN_V2=v02%3Auser_token_or_cookie...
NOTION_ACTIVE_USER=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Revalidation
REVALIDATION_SECRET=your_random_secret_string
```

---

## 🚀 자주 사용하는 명령어

```bash
# 개발 서버
pnpm dev

# 빌드
pnpm build

# 프로덕션 서버
pnpm start

# Linting
pnpm lint

# Type 검사
npx tsc --noEmit
```

---

## 📚 핵심 참고 파일

**애니메이션:**
- `/src/components/common/Intro.tsx` - Framer Motion 패턴
- `/src/app/template.tsx` - 페이지 전환

**Hooks:**
- `/src/hooks/useScrollSpy.ts` - 스크롤 감지
- `/src/hooks/useTocObserver.ts` - IntersectionObserver

**Notion:**
- `/src/lib/notion.ts` - API 클라이언트
- `/src/lib/posts.ts` - 캐싱된 데이터 fetching

**테마:**
- `/src/styles/global.css` - CSS 변수 정의
- `tailwind.config.ts` - TailwindCSS 설정

**상수:**
- `/src/constants/ui.ts` - UI 관련 상수

---

## ⚠️ 중요한 규칙

### 반드시 해야 할 것

✅ CSS 변수 사용 (하드코딩 금지)
✅ Framer Motion variants 패턴
✅ Server Component 기본 사용
✅ Notion 데이터 캐싱
✅ TypeScript strict 모드
✅ Conventional Commits
✅ 명시적 agent 호출

### 절대 하지 말아야 할 것

❌ 하드코딩된 색상 (bg-white, #ffffff 등)
❌ 불필요한 "use client" 추가
❌ Notion API 직접 호출 (캐싱 없이)
❌ 새 패키지 무단 설치 (승인 필요)
❌ Force push to main
❌ Any 타입 사용

---

## 🎯 성공 기준

새 기능이 완성되면:
- ✅ 빌드 성공
- ✅ TypeScript 오류 없음
- ✅ 라이트/다크 모드 모두 작동
- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ CSS 변수만 사용
- ✅ 애니메이션 부드러움 (60fps)
- ✅ 접근성 준수 (키보드 네비게이션, ARIA)
- ✅ Conventional Commit 형식

---

## 🆘 문제 해결

### 빌드 실패
```bash
# Type 검사
npx tsc --noEmit

# Lint 검사
pnpm lint

# 상세 빌드 로그
pnpm build --debug
```

### Notion 데이터 안 나옴
```bash
# 캐시 무효화
curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET"

# 환경 변수 확인
echo $NOTION_API_KEY
```

### Agent 작동 안 함
```bash
# Agent 목록 확인
/agents

# Agent 파일 경로 확인
ls -la .claude/agents/

# Skill 파일 경로 확인
ls -la .claude/skills/
```

---

## 📞 추가 도움말

**Claude Code 문서:**
- `/help` 명령어
- GitHub: https://github.com/anthropics/claude-code

**프로젝트 관련:**
- 이슈 제보: GitHub Issues
- 기능 제안: GitHub Discussions

---

**마지막 업데이트:** 2025-12-27
**프로젝트:** Bellog
**버전:** 1.0.0
