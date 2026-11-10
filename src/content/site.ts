export interface NavItem {
  label: string;
  href: string;
  /** 좁은 화면에서는 숨긴다 */
  hideOnMobile?: boolean;
}

export interface Stat {
  value: string;
  label: string;
  note: string;
}

export interface SkillGroup {
  category: string;
  items: string;
}

export type TimelineIcon = "merge" | "package" | "graduation" | "school";

export interface TimelineItem {
  when: string;
  title: string;
  description: string;
  icon: TimelineIcon;
}

export const site = {
  name: "이승빈",
  title: "이승빈 포트폴리오",
  description: "LLM 보안 측정, garak 기여, presidio-ko, Pray for Hana",
  tagline: "LLM 평가와 개발 환경에 관심 있는 개발자",
  lede: "외국인 근로자 급여 검증 서비스에 LLM 보안 서버를 붙이고 직접 공격하며 측정했습니다. 그 과정에서 레드티밍 도구 garak의 버그 두 건을 고쳐 병합했고, 한국어 문맥을 놓치던 Presidio를 고쳐 presidio-ko로 공개했습니다.",
  github: { label: "github.com/Bin0917", href: "https://github.com/Bin0917" },
  /** GitHub 프로필 README에 공개해 둔 주소 */
  emails: ["leesd132@naver.com", "leesd365@gmail.com"],
} as const;

export interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks: FooterLink[] = [
  { label: "GitHub", href: "https://github.com/Bin0917" },
  {
    label: "garak 병합 PR",
    href: "https://github.com/NVIDIA/garak/pulls?q=is%3Apr+author%3ABin0917+is%3Amerged",
  },
  { label: "presidio-ko", href: "https://github.com/Bin0917/presidio-ko" },
];

export const navItems: NavItem[] = [
  { label: "소개", href: "/#about", hideOnMobile: true },
  { label: "기술", href: "/#skills", hideOnMobile: true },
  { label: "프로젝트", href: "/#projects" },
  { label: "경력", href: "/#career" },
  { label: "연락", href: "/#contact" },
];

export const aboutHeading = "확인하기 전까지는 가설로 둡니다";

/** **굵게** 표기는 RichText가 해석한다 */
export const aboutParagraphs: string[] = [
  "이 습관은 고객을 만나면서 생겼습니다. 시니어 교인을 위한 헌금 서비스를 만들 때 팀원 중 교회를 다니는 사람이 없었고, 저희는 앱으로 헌금하면 편할 거라고 확신했습니다. 교회를 두 번 찾아가 어르신들을 인터뷰하니 답이 달랐습니다. 현금을 손수 내는 데에는 봉사하는 마음이 담겨 있다는 이야기였습니다. 방향을 바꿨고, 그 프로젝트로 우수상을 받았습니다.",
  "그 뒤로는 숫자와 도구를 볼 때도 같은 순서로 봅니다. 결과가 예상과 다르면 넘기지 않고 재현해 보고, 원인이 제 코드 밖에 있으면 그 저장소까지 따라갑니다. 고친 뒤에는 다시 깨지지 않도록 테스트로 남기고, 같은 문제를 겪는 사람이 있으면 쓸 수 있게 공개합니다.",
  '아래 네 프로젝트는 모두 **"어, 이상한데"**에서 시작했습니다.',
];

export const stats: Stat[] = [
  {
    value: "23.8%",
    label: "LLM까지 닿은 공격 비율",
    note: "82.4%에서, 579건 짝비교",
  },
  { value: "2건", label: "garak 오픈소스 PR 병합", note: "#2305, #2326" },
  {
    value: "우수상",
    label: "디지털하나로 8기 최종 프로젝트",
    note: "교회 인터뷰 후 방향 전환",
  },
];

export const skillsHeading = "써 본 만큼만 적었습니다";

export const skillGroups: SkillGroup[] = [
  { category: "언어", items: "TypeScript, Python, Java, SQL" },
  { category: "프론트엔드", items: "Next.js, React, Prisma, Tauri 2, Biome" },
  { category: "백엔드", items: "Spring 기반 MSA, Kafka, Feign" },
  {
    category: "LLM 평가와 보안",
    items:
      "garak, Presidio, spaCy, mmBERT 분류 모델, McNemar 검정, Wilson 신뢰구간",
  },
  {
    category: "자동화",
    items: "GitHub Actions, pytest, 회귀 테스트, 모델 파일 SHA-256 검증",
  },
  {
    category: "AI 개발 환경",
    items:
      "Claude Code, Gemini CLI, AI PR 리뷰. 개인 프로젝트 한 줄 로그에서는 LLM 에이전트가 단계별 진행 상태를 읽고 쓰는 `phases/` 폴더를 두고 작업합니다",
  },
];

export const projectsHeading = "무엇이 이상했고, 왜 그렇게 판단했는지";

export const careerHeading = "지나온 곳";

export const timeline: TimelineItem[] = [
  {
    when: "2026",
    title: "garak 컨트리뷰터",
    description:
      "PromptInject 중복 생성, 번역 프로브 공유 상태 버그 수정. PR 2건 병합",
    icon: "merge",
  },
  {
    when: "2026",
    title: "presidio-ko 공개",
    description: "Presidio 한국어 문맥 인식 수정과 한국어 인식기, MIT 라이선스",
    icon: "package",
  },
  {
    when: "수료",
    title: "하나금융 디지털하나로 8기",
    description: "금융 IT 교육과정. 최종 프로젝트 Pray for Hana 우수상",
    icon: "graduation",
  },
  {
    when: "재학",
    title: "상명대학교 컴퓨터과학과 3학년",
    description: "자격증 SQLD, ADsP",
    icon: "school",
  },
];

export const contactHeading = "코드는 GitHub에 있습니다";
