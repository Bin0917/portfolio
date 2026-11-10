# 이승빈 포트폴리오

Next.js(App Router), TypeScript, Tailwind CSS로 만든 한 페이지 포트폴리오입니다.

배포 링크: (Vercel 배포 후 주소를 여기에 적습니다)

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인합니다.

```bash
npm run lint
npm run build
```

## 구조

```
src/
  app/
    page.tsx                  메인 페이지 (섹션 조립)
    projects/[slug]/page.tsx  프로젝트 상세 (정적 생성)
    layout.tsx, globals.css   공통 레이아웃, 색 변수, 다크모드
  components/                 Nav, Hero, SectionTitle, About, Skills,
                              ProjectCard, ProjectDetail, ReachChart,
                              Timeline, Contact
  content/
    projects.ts               Project 타입과 프로젝트 데이터
    site.ts                   소개, 기술, 경력 등 나머지 문구
```

- 문구와 수치는 모두 `src/content`에 있고, 컴포넌트는 데이터를 받아 그리기만 합니다.
- 색은 `globals.css`의 CSS 변수로 관리하고, 다크모드는 `next-themes`의 class 토글을 씁니다.
- 도달률 차트는 라이브러리 없이 div 너비로 그립니다.
- 푸터와 연락 섹션의 이메일, 링크는 `src/content/site.ts`의 `emails`, `footerLinks`에서 바꿉니다.
- 프로젝트 이미지는 `public/projects`에 있고, 각 프로젝트의 `cover`로 연결합니다.

## 배포

1. GitHub에 `portfolio` 저장소를 만들고 푸시합니다.
2. vercel.com → Add New Project → 저장소 선택 → 기본 설정으로 Deploy.
3. 배포된 주소를 이 README의 배포 링크에 적습니다.
