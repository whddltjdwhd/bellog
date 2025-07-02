import React from "react";
import { ProjectData } from "@/types";
import ProjectCard from "@/components/projects/ProjectCard";

const projects: ProjectData[] = [
  {
    id: 1,
    title: "키오스쿨 (KioSchool)",
    description:
      "대학교 축제 주점 운영을 위한 서비스입니다. 누적 사용자 수 5,500명 이상을 달성했으며, 2024년 건국대학교 축제 주점 3곳에서 시범 도입되었습니다. 2025년에는 세종대학교 9곳, 경희대학교 1곳, 건국대학교 20곳에 도입되었습니다.",
    websiteUrl: "https://kio-school.com/",
    githubUrl: "https://github.com/KioSchool/KioSchool",
    techStack: ["React", "TypeScript", "Emotion", "Recoil"],
    emoji: "🏫",
    image: "/images/projects/KIO.png",
  },
  {
    id: 2,
    title: "쿠맵 (RoadMapKU)",
    description:
      "건국대학교에서 실제 사용 중인 로드맵 서비스입니다. 건국대학교 학생개발팀에서 개발한 온라인 로드맵으로, 누적 사용자 수 400명 이상을 기록했습니다.",
    websiteUrl: "https://kumap.konkuk.ac.kr/",
    githubUrl: "https://github.com/Konkuk-Univ-Student-Developer/RoadMapKU",
    techStack: ["React", "JavaScript", "Styled-Components", "Recoil"],
    emoji: "🗺️",
    image: "/images/projects/KUMAP.png",
  },
  {
    id: 3,
    title: "U2E",
    description:
      "폭염, 산불, 홍수와 같은 다양한 기후 이상 현상 관련 뉴스 데이터를 3D 지구상에 핀으로 시각화하여 표시하는 서비스입니다. Gemini 및 Gemma AI 모델을 활용한 AI 대응 전략 제안과 글로벌 댓글 시스템을 통한 국제적 소통을 지원합니다.",
    websiteUrl: "https://u2e.netlify.app/",
    githubUrl: "https://github.com/gdsc-konkuk/24-25-proj-U2E-Client",
    techStack: ["React", "TypeScript", "Styled-Components", "Three.js"],
    emoji: "🚀",
    image: "/images/projects/U2E.png",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-16">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-3">프로젝트</h1>
        <p className="text-[var(--text-muted)]">
          아이디어에서 시작해 실제 서비스까지 이어진 결과물들입니다.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
