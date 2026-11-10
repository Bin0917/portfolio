/**
 * 프로젝트 데이터.
 * 본문 문자열은 **굵게** 와 `코드` 두 가지 표기만 쓴다 (RichText가 해석).
 */

export type ProjectSlug = "paycycle" | "garak" | "presidio-ko" | "pray-for-hana";

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

/** 카드에 보이는 세 줄 요약 */
export interface ProjectSummary {
  odd: string;
  judgment: string;
  result: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface CodeBlock {
  type: "code";
  code: string;
}

export type StepContent = ParagraphBlock | CodeBlock;

export interface StepBlock {
  type: "step";
  title: string;
  /** "어, 이상한데" 계열 단계는 primary 색으로 강조한다 */
  highlight?: boolean;
  content: StepContent[];
}

export interface ChartRow {
  label: string;
  note?: string;
  /** 0~100 (%) */
  before: number;
  after: number;
}

export interface ChartBlock {
  type: "chart";
  title: string;
  rows: ChartRow[];
  caption: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** 카드와 상세 상단에 쓰는 대표 이미지 */
export interface ProjectCover extends ProjectImage {
  /** 로고나 카드처럼 잘리면 안 되는 이미지는 contain */
  fit: "cover" | "contain";
  /** contain일 때 여백을 채우는 색 */
  background?: string;
}

export interface ImageBlock extends ProjectImage {
  type: "image";
  caption: string;
}

export type ProjectBlock = StepBlock | ChartBlock | ImageBlock;

export interface Project {
  slug: ProjectSlug;
  no: string;
  title: string;
  headline: string;
  cover: ProjectCover;
  summary: ProjectSummary;
  meta: ProjectMeta[];
  links: ProjectLink[];
  body: ProjectBlock[];
}

const p = (text: string): ParagraphBlock => ({ type: "paragraph", text });

export const projects: Project[] = [
  {
    slug: "paycycle",
    no: "01",
    title: "PayCycle 보안 측정",
    headline: "공격 성공률 1.2%를 주 지표로 쓰지 않은 이유",
    cover: {
      src: "/projects/paycycle.svg",
      alt: "모델까지 닿은 공격 비율 막대 차트. 개선 전 82.4%, 개선 후 23.8%",
      width: 640,
      height: 360,
      fit: "contain",
      background: "#ffffff",
    },
    summary: {
      odd: "보안 서버가 거의 아무것도 막지 않는데 공격 성공률이 1.2%로 나왔습니다.",
      judgment:
        "모델이 스스로 거절한 결과라서, 주 지표를 모델까지 닿은 공격 비율로 바꿨습니다.",
      result: "도달률 82.4% → 23.8% (579건 짝비교, McNemar p<0.001)",
    },
    meta: [
      {
        label: "무엇",
        value: "외국인 근로자 급여 검증 AI 서비스와 LLM 보안 서버",
      },
      { label: "역할", value: "개인, 위협 정리부터 측정까지" },
      {
        label: "기술",
        value: "Python, Next.js, garak, Presidio, mmBERT, GitHub Actions",
      },
    ],
    links: [],
    body: [
      {
        type: "step",
        title: "시작",
        content: [
          p(
            "금융보안원 금융 AI 공모전에 급여 검증 서비스를 냈다가 예선에서 떨어졌습니다. 보안에 미흡한 점을 뒤늦게 알게 되었습니다. 그대로 끝내기 아쉬워서 OWASP LLM Top 10 기준으로 위협을 정리하고, 앞단에 보안 서버를 붙인 뒤 garak으로 직접 공격해 보기로 했습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "어, 이상한데",
        highlight: true,
        content: [
          p(
            "첫 측정에서 공격 성공률이 **1.2%**가 나왔습니다. 보안 서버가 아직 거의 아무것도 막지 않는데 숫자가 너무 좋았습니다. 로그를 열어 보니 공격 대부분이 보안 서버를 그대로 지나 모델까지 갔고, 모델이 스스로 거절해서 실패로 집계된 것이었습니다.",
          ),
          p(
            "보안 서버가 막은 게 아니라서 이 숫자로는 서버 성능을 말할 수 없었습니다. 그래서 주 지표를 **모델까지 닿은 공격 비율**로 바꿨고, 이 기준으로 다시 재니 **82.4%**였습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "측정 방법",
        content: [
          p(
            "같은 공격 문장을 개선 전후에 똑같이 보내 짝을 지었고, 시드를 고정한 707건(설계한 공격 579건, 방어를 설계할 때 쓰지 않은 Base32와 Ascii85 인코딩 128건)으로 실제 LLM 호출 1,414번을 돌렸습니다. 짝비교라서 McNemar 검정을 썼고, 정상 질문 오탐은 Wilson 신뢰구간으로 함께 봤습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "어, 이상한데 2",
        highlight: true,
        content: [
          p(
            "영어 분류 모델을 붙였더니 한국어와 베트남어 정상 질문의 **42%**를 공격으로 막았습니다. 외국인 근로자가 쓰는 서비스라 그대로는 쓸 수 없었습니다. 모델 세 개를 같은 데이터로 비교해 다국어 모델(mmBERT)을 골랐고, 4개 언어 정상 질문 60건 중 오탐은 0건이었습니다. int8로 양자화하자 점수가 1.00에서 0.07로 무너져서 bf16을 유지했습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "어, 이상한데 3",
        highlight: true,
        content: [
          p(
            "백엔드 기준 수치가 좋아진 뒤, 사용자가 실제로 쓰는 화면 경로로 다시 재 봤습니다. Next.js의 fallback 라우트가 보안 서버를 거치지 않고 있었고, 막았다고 집계한 513건 중 **411건**이 실제로는 모델에 닿고 있었습니다. 라우트를 제거하고 같은 우회가 다시 생기면 실패하는 회귀 테스트를 붙였습니다.",
          ),
        ],
      },
      {
        type: "chart",
        title: "모델까지 닿은 공격 비율",
        rows: [
          {
            label: "설계한 공격 전체",
            note: "n=579, p<0.001",
            before: 82.4,
            after: 23.8,
          },
          {
            label: "처음 보는 인코딩",
            note: "n=128, held-out",
            before: 100,
            after: 43.8,
          },
          { label: "숨은 문맥 노출", before: 75.0, after: 4.2 },
          { label: "Hex 인코딩", before: 10.9, after: 1.6 },
        ],
        caption:
          "공격 성공률은 1.2%에서 0.3%로 줄었지만 p=0.12로 유의하지 않아서 개선 근거로 쓰지 않았습니다.",
      },
      {
        type: "step",
        title: "남긴 것 (Claude Code와 함께)",
        content: [
          p(
            "이 부분은 Claude Code와 함께 작업했습니다. 보안 테스트 25개를 GitHub Actions에 올려 푸시마다 돌게 했고, 분류 모델 파일 5개는 SHA-256으로 무결성을 확인합니다. 한국어 개인정보는 Presidio로 가린 뒤 모델에 보내고, 실패하면 막는 쪽(Fail-Closed)으로 설계했습니다. 금융보안원 AI 보안 체크리스트 충족률은 6.8%에서 40.9%가 됐습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "아직 남은 것",
        content: [
          p(
            "23.8%는 여전히 네 건 중 한 건이 닿는다는 뜻입니다. 남은 대부분은 Ascii85처럼 기호가 많은 인코딩 우회라서, 다음은 기호 밀도 기반 탐지를 붙여 같은 방식으로 다시 재는 것입니다.",
          ),
        ],
      },
    ],
  },
  {
    slug: "garak",
    no: "02",
    title: "garak 오픈소스 기여",
    headline: "측정하다가 찾은 garak 버그 두 건",
    cover: {
      src: "/projects/garak-pr-2305.jpg",
      alt: "NVIDIA/garak 저장소에서 Merged 상태인 PR #2305 화면",
      width: 800,
      height: 450,
      fit: "cover",
    },
    summary: {
      odd: "측정을 돌리는데 같은 공격 문장이 계속 반복해서 나갔습니다.",
      judgment:
        "문장이 여러 번 세어지면 도달률과 검정 결과가 틀어지므로, 제 코드가 아니라 도구 쪽을 따라갔습니다.",
      result: "버그 두 건 수정, PR 2건 병합 (#2305, #2326)",
    },
    meta: [
      { label: "무엇", value: "NVIDIA의 LLM 레드티밍 도구" },
      { label: "결과", value: "PR 2건 병합, 메인테이너 승인" },
    ],
    links: [
      { label: "PR #2305", href: "https://github.com/NVIDIA/garak/pull/2305" },
      { label: "PR #2326", href: "https://github.com/NVIDIA/garak/pull/2326" },
    ],
    body: [
      {
        type: "step",
        title: "어, 이상한데",
        highlight: true,
        content: [
          p(
            "01의 측정을 돌리면서 같은 공격 문장이 계속 반복해서 나가는 게 보였습니다. 문장 하나가 여러 번 세어지면 도달률도, 검정 결과도 같이 틀어집니다. 그래서 제 코드가 아니라 도구 쪽을 의심하고 코드를 따라갔습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "원인",
        content: [
          p(
            "PromptInject 프로브가 설정 id 네 개마다 같은 문장을 만들고 있어서, 고유한 공격 175개가 700개로 불어나 있었습니다. 원래 연구 코드는 무작위성을 얻으려고 같은 공격을 여러 번 보냈고, garak에는 그 역할을 하는 `generations` 옵션이 이미 있어서 중복이 됐다는 배경은 메인테이너가 알려 줬습니다. 수정은 #2305로 병합됐습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "두 번째 버그",
        highlight: true,
        content: [
          p(
            "비슷한 버그가 더 있을 것 같아 다른 프로브도 확인했습니다. 번역 프로브가 클래스 속성 리스트에 `+=`로 값을 덧붙이고 있었고, 파이썬에서 이 리스트는 모든 인스턴스가 공유합니다. 그 결과 영어에서 중국어로 번역하는 공격 256건 중 **100건**에 프랑스어가 섞여 나갔습니다.",
          ),
          {
            type: "code",
            code: [
              "# 단순화한 코드",
              "class TranslationProbe:",
              "    triggers = []                         # 모든 인스턴스가 공유",
              "    def __init__(self, lang):",
              "        self.triggers += load(lang)       # 같은 리스트가 늘어나 다른 언어 프로브에 섞임",
            ].join("\n"),
          },
          p(
            "인스턴스마다 새 리스트를 쓰도록 고치고, 수정 전 커밋에서는 실패하고 수정 후에는 통과하는 테스트를 함께 올렸고, 리뷰어가 그 테스트를 직접 돌려 확인한 뒤 병합됐습니다(#2326).",
          ),
        ],
      },
      {
        type: "step",
        title: "배운 것",
        content: [
          p(
            "평가 도구가 내는 결과도 한 번은 직접 확인해야 한다는 걸 알았습니다. 처음 기여하는 저장소였는데, 재현 코드와 실패하는 테스트를 같이 올리니 리뷰가 빨랐습니다. 코드 작성에는 Claude Code의 도움을 받았고 PR에도 밝혔습니다. 문제를 발견하고 원인을 확인하고 테스트로 증명하는 일은 제가 했습니다.",
          ),
        ],
      },
    ],
  },
  {
    slug: "presidio-ko",
    no: "03",
    title: "presidio-ko",
    headline: '"연락처"가 "연+락처+가"로 쪼개지고 있었습니다',
    cover: {
      src: "/projects/presidio-ko-readme.jpg",
      alt: "presidio-ko 저장소 README 화면",
      width: 799,
      height: 459,
      fit: "cover",
    },
    summary: {
      odd: '전화번호 앞에 "연락처"가 있어도 문맥 점수가 오르지 않았습니다.',
      judgment:
        "lemma를 다시 만들면 모델 버전마다 결과가 달라질 수 있어서, 토큰 원문으로 문맥어를 비교하게 했습니다.",
      result: "MIT 라이선스로 공개, 업스트림 PR에 체리픽 반영",
    },
    meta: [
      { label: "무엇", value: "Microsoft Presidio 한국어 확장" },
      { label: "역할", value: "개인, 원인 분석부터 공개까지" },
      {
        label: "기술",
        value:
          "Python, spaCy, presidio-analyzer 2.2.364, pytest, GitHub Actions",
      },
    ],
    links: [
      {
        label: "github.com/Bin0917/presidio-ko",
        href: "https://github.com/Bin0917/presidio-ko",
      },
    ],
    body: [
      {
        type: "step",
        title: "시작",
        content: [
          p(
            "OWASP LLM Top 10의 민감정보 노출에 대응하려고, 사용자 입력을 모델에 보내기 전에 Presidio로 개인정보를 가리게 했습니다. 직접 만든 한국어 인식기도 붙였습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "어, 이상한데",
        highlight: true,
        content: [
          p(
            '전화번호 앞에 "연락처"라는 단어가 있으면 문맥 점수가 올라가야 하는데 그대로였습니다. 문맥어 목록에는 분명히 "연락처"가 들어 있었습니다. 따라가 보니 Presidio의 문맥 강화기는 단어의 lemma끼리 비교하는데, 한국어 spaCy 모델은 "연락처가"의 lemma를 "연+락처+가"처럼 형태소를 이어 붙인 형태로 돌려줬습니다. 그래서 문맥어와 일치할 수가 없었습니다.',
          ),
        ],
      },
      {
        type: "step",
        title: "수정",
        content: [
          p(
            "lemma를 한국어에 맞게 다시 만드는 방법도 있지만, 모델 버전마다 결과가 달라질 수 있었습니다. 그래서 lemma 대신 토큰 원문으로 문맥어를 비교하는 `KoreanContextAwareEnhancer`를 만들고, 한국 전화번호(`KR_PHONE`)와 계좌번호(`KR_BANK_ACCOUNT`) 인식기를 더했습니다. 단위 테스트, 통합 테스트, README 예제가 실제로 돌아가는지 확인하는 테스트까지 CI에 올렸습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "공개",
        highlight: true,
        content: [
          p(
            "한국어로 Presidio를 쓰는 사람이라면 누구나 부딪힐 문제라서, 누구나 설치해 쓸 수 있게 MIT 라이선스로 공개했습니다. 그 뒤 업스트림 저장소를 찾아보니 같은 문제가 이미 이슈로 올라와 있었습니다. 제보자와 이야기를 나눴고, 제보자가 제 수정을 자신의 PR에 체리픽해 반영했습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "배운 것",
        content: [
          p(
            "공개하고 나서야 업스트림에 같은 이슈가 있다는 걸 알았습니다. 다음에는 고치기 전에 업스트림 이슈부터 찾아보려고 합니다.",
          ),
        ],
      },
    ],
  },
  {
    slug: "pray-for-hana",
    no: "04",
    title: "Pray for Hana",
    headline: "교회 인터뷰 후 서비스 방향을 바꿨습니다",
    cover: {
      src: "/projects/pray-for-hana.png",
      alt: "Pray for Hana 소개 이미지와 앱 화면",
      width: 2048,
      height: 1151,
      fit: "cover",
    },
    summary: {
      odd: "앱으로 헌금하면 편할 거라고 생각했는데, 교회 인터뷰에서 돌아온 답은 달랐습니다.",
      judgment:
        "저희가 편하다고 생각한 방식이 어르신들께 맞지 않아서 방향을 바꿨습니다.",
      result: "최종 프로젝트 우수상, 6명 중 커밋 1위(162건 중 62건)",
    },
    meta: [
      {
        label: "무엇",
        value: "시니어 교인을 위한 헌금 서비스, 디지털하나로 8기 최종 프로젝트",
      },
      { label: "결과", value: "우수상, 6명 중 커밋 1위(162건 중 62건)" },
      {
        label: "역할",
        value: "헌금 도메인 출금과 포인트, 메인과 프로필 화면, 공통 컴포넌트",
      },
      {
        label: "기술",
        value: "Next.js, TypeScript, Java, Spring, Kafka, Feign",
      },
    ],
    links: [],
    body: [
      {
        type: "step",
        title: "어, 이상한데",
        highlight: true,
        content: [
          p(
            "팀원 중 교회를 다니는 사람이 없었고, 저희는 현금을 챙길 필요가 없으니 앱이 편할 거라고 생각했습니다. 교회를 두 번 찾아가 어르신들을 인터뷰하니 현금을 손수 내는 데에는 봉사하는 마음이 담겨 있다는 이야기가 돌아왔습니다. 저희가 편하다고 생각한 방식이 어르신들께는 맞지 않았습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "방향 전환",
        content: [
          p(
            "헌금을 대신하는 앱이 아니라, 신앙 활동으로 쌓은 포인트를 헌금에 보태 정성을 더하는 서비스로 방향을 바꿨습니다. 이 방향으로 최종 프로젝트 우수상을 받았습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "어, 이상한데 2",
        highlight: true,
        content: [
          p(
            "처음에는 헌금 등록 전체를 `@Transactional` 하나로 묶었습니다. 그런데 출금은 다른 서비스의 DB에서 이미 확정되기 때문에, 포인트 차감이 실패해 제 쪽을 롤백해도 돈은 빠진 채로 남을 수 있었습니다. 단계마다 앞 단계를 취소하는 보상 트랜잭션(Saga)으로 바꾸고, 결과를 바로 알아야 하는 출금과 차감은 Feign으로, 늦어도 되는 총액 반영은 Kafka로 나눴습니다. 타임아웃 시 재조회, 아웃박스, 멱등 처리는 지금이라면 더할 부분으로 정리해 뒀습니다.",
          ),
        ],
      },
      {
        type: "image",
        src: "/projects/pray-for-hana-architecture.png",
        alt: "Pray for Hana 아키텍처. Nginx와 API Gateway 뒤에 마이크로서비스 다섯 개, Kafka, RDS, S3가 있는 구성",
        width: 2470,
        height: 505,
        caption: "프로젝트 아키텍처 (팀 README)",
      },
      {
        type: "step",
        title: "프론트엔드",
        content: [
          p(
            "프론트는 Figma로 초안을 잡고 공통 컴포넌트를 만든 뒤 Next.js와 TypeScript로 메인과 프로필 화면을 맡았습니다. 화면이나 엔티티보다 props와 interface를 항상 먼저 짰습니다. 타입을 먼저 정해 두면 에디터가 무엇을 구현해야 하는지 알려 주고, AI가 만든 코드도 타입에 맞는지로 먼저 걸러집니다. 1차 프로젝트에서는 localStorage에 쌓인 온보딩 응답을 가입 시점에 Prisma로 사용자와 자녀 사용자 데이터로 옮겼습니다.",
          ),
        ],
      },
      {
        type: "step",
        title: "AI 활용",
        content: [
          p(
            "Gemini CLI에 요구사항과 코드 형식을 정해 구현하고, PR에 AI 리뷰를 붙여 헌금 PR에서만 10번 반영했습니다. 최종 검수와 병합 판단은 제가 했습니다.",
          ),
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
