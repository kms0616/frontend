import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPreview from "./CardPreview";
import snowIcon from "../assets/snow.svg";
import brainIcon from "../assets/brain.svg";
import powerIconn from "../assets/power.svg";
import capitalIcon from "../assets/capital.svg";
import patienceIcon from "../assets/patience.svg";

interface SurvivalCreatePageProps {
  onOpenPreview?: (data: PreviewData) => void;
}

// onOpenPreview로 다음 화면에 넘겨줄 데이터 모양
// (다음 화면에서 folderId, newFolderName, newFolderColor, favorite, imageUrl, imageKey 등을 합쳐서
//  최종 createSurvivalCard API body를 완성하게 됨)
export interface PreviewData {
  title: string;
  description: string;
  recommendedSituation: string;
  difficulty: number;
  primaryEffectTypeId: number | null;
  effects: {
    effectTypeId: number;
    level: number;
    displayOrder: number;
  }[];
}

// TODO: effectTypeId는 임시값(0~4)! 백엔드 "효과 목록 조회" API 확인 후 실제 값으로 교체 필요
const EFFECT_OPTIONS = [
  {
    id: "cooling",
    effectTypeId: 1,
    label: "냉각력",
    activeColor: "border-[#00B8ED] bg-[#E5F7FE]",
    iconColor: "bg-[#00B8ED]",
    textColor: "text-[#00B8ED]",
    icon: snowIcon,
  },
  {
    id: "mental",
    effectTypeId: 2,
    label: "정신력",
    activeColor: "border-[#A27DDB] bg-[#F3EDFD]",
    iconColor: "bg-[#A27DDB]",
    textColor: "text-[#A27DDB]",
    icon: brainIcon,
  },
  {
    id: "stamina",
    effectTypeId: 3,
    label: "체력",
    activeColor: "border-[#00C772] bg-[#E4FAED]",
    iconColor: "bg-[#00C772]",
    textColor: "text-[#00C772]",
    icon: powerIconn,
  },
  {
    id: "wealth",
    effectTypeId: 4,
    label: "자본력",
    activeColor: "border-[#FFA300] bg-[#FFF5DE]",
    iconColor: "bg-[#FFA300]",
    textColor: "text-[#FFA300]",
    icon: capitalIcon,
  },
  {
    id: "endurance",
    effectTypeId: 5,
    label: "인내력",
    activeColor: "border-[#FC504C] bg-[#FEE]",
    iconColor: "bg-[#FC504C]",
    textColor: "text-[#FC504C]",
    icon: patienceIcon,
  },
];

export default function SurvivalCreatePage({
  onOpenPreview,
}: SurvivalCreatePageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [situation, setSituation] = useState("");
  const [difficulty, setDifficulty] = useState(0);

  const [effects, setEffects] = useState<
    Record<string, { active: boolean; level: number }>
  >({
    cooling: { active: false, level: 1 },
    mental: { active: false, level: 1 },
    stamina: { active: false, level: 1 },
    wealth: { active: false, level: 1 },
    endurance: { active: false, level: 1 },
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  const handleEffectClick = (id: string) => {
    setEffects((prev) => {
      const isActive = prev[id].active;
      const activeCount = Object.values(prev).filter((e) => e.active).length;
      if (!isActive && activeCount >= 3) return prev;
      return { ...prev, [id]: { ...prev[id], active: !isActive } };
    });
  };

  const handleLevelChange = (id: string, level: number) => {
    setEffects((prev) => ({ ...prev, [id]: { ...prev[id], level } }));
  };

  const handleOpenPreview = () => {
    // 1. 유효성 검사
    if (!name.trim()) {
      alert("생존법 이름을 입력해주세요");
      return;
    }
    if (!description.trim()) {
      alert("설명을 입력해주세요");
      return;
    }

    const selected = Object.entries(effects)
      .filter(([, v]) => v.active)
      .map(([id, v], idx) => {
        const opt = EFFECT_OPTIONS.find((o) => o.id === id)!;
        return {
          effectTypeId: opt.effectTypeId,
          level: v.level,
          displayOrder: idx + 1,
        };
      });

    if (selected.length === 0) {
      alert("효과를 1개 이상 선택해주세요");
      return;
    }

    // 2. 레벨이 가장 높은 효과를 대표 효과로 자동 지정 (동점이면 먼저 선택한 것)
    const primary = selected.reduce(
      (max, e) => (e.level > max.level ? e : max),
      selected[0],
    );

    // 3. 다음 화면(미리보기/폴더선택)으로 데이터 전달
    const nextPreviewData = {
      title: name,
      description,
      recommendedSituation: situation,
      difficulty,
      primaryEffectTypeId: primary.effectTypeId,
      effects: selected,
    };
    setPreviewData(nextPreviewData);
    onOpenPreview?.(nextPreviewData);
    setIsPreviewOpen(true);
  };

  return (
    <main className="mx-auto min-h-screen w-[393px] overflow-y-auto rounded-[48px] bg-[#FBFBFB] font-['Pretendard']">
      <header className="flex items-center w-full px-[20px] py-[8px] mt-[54px] mb-[24px]">
        <button className="mr-auto" onClick={() => navigate("/main")}>
          <div>
            <svg
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3257 0.481935C10.9819 1.09717 10.9819 2.13623 10.3257 2.75147L5.51318 7.59131L20.2788 7.59131C21.1812 7.59131 21.8921 8.30225 21.8921 9.20459C21.8921 10.0933 21.1812 10.8042 20.2788 10.8179L5.51318 10.8179L10.3257 15.6577C10.9819 16.273 10.9819 17.2983 10.3257 17.8999C9.71045 18.5562 8.68506 18.5562 8.0835 17.8999L0.481933 10.3257C-0.160645 9.71045 -0.160645 8.68506 0.481933 8.05615L8.08349 0.481935C8.68506 -0.160643 9.71045 -0.160643 10.3257 0.481935Z"
                fill="#C7C7C9"
              />
            </svg>
          </div>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[18px] font-[600]">
          생존법 작성
        </h1>
      </header>

      <section className="relative px-[20px] pb-[40px]">
        <div className="mb-[16px]">
          <label className="block text-[18px] font-[600] text-[#222] leading-[24px] mb-[8px]">
            생존법 이름
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 에어컨 명당 사수법"
            className="w-full h-[53px] rounded-[16px] border border-black px-[16px] text-[16px] outline-none placeholder:text-[#B7B7B7]"
          />
        </div>

        <div className="mb-[16px]">
          <label className="block text-[18px] font-[600] text-[#222] leading-[24px] mb-[8px]">
            설명
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="예: 바람이 가장 잘 오는 자리를 찾아 조용히 하루를 버틴다."
            className="w-full h-[230px] rounded-[24px] border border-black p-[16px] text-[16px] outline-none resize-none placeholder:text-[#B7B7B7]"
          />
        </div>

        <div className="mb-[24px]">
          <label className="block text-[18px] font-[600] text-[#222] leading-[24px] mb-[8px]">
            추천 상황
          </label>
          <input
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="예: 강의실, 도서관, 카페, 오래 앉아 있어야 하는 날"
            className="w-full h-[53px] rounded-[16px] border border-black px-[16px] text-[16px] outline-none placeholder:text-[#B7B7B7]"
          />
        </div>

        <div className="mb-[24px]">
          <label className="block text-[18px] font-[600] text-[#222] leading-[24px] mb-[8px]">
            효과 선택
          </label>
          <p className="text-[14px] text-[#909090] mb-[16px]">
            1~3가지를 선택 후 레벨을 조절하세요
          </p>

          <div className="flex flex-col gap-[12px]">
            {EFFECT_OPTIONS.map((effect) => {
              const isActive = effects[effect.id].active;
              const currentLevel = effects[effect.id].level;

              return (
                <div key={effect.id} className="flex flex-col gap-[8px]">
                  <button
                    onClick={() => handleEffectClick(effect.id)}
                    className={`flex items-center w-full h-[56px] rounded-[16px] border px-[16px] py-[12px] transition-colors ${
                      isActive ? effect.activeColor : "border-black bg-white"
                    }`}
                  >
                    <div
                      className={`w-[40px] h-[40px] shrink-0 rounded-[20px] mr-[12px] flex items-center justify-center overflow-hidden ${effect.iconColor}`}
                    >
                      {effect.icon ? (
                        <img
                          src={effect.icon}
                          alt={effect.label}
                          className="w-[24px] h-[24px] object-contain"
                        />
                      ) : null}
                    </div>
                    <span className="font-[600] text-[16px] text-black">
                      {effect.label}
                    </span>

                    {isActive && (
                      <div
                        className={`ml-auto w-[24px] h-[24px] shrink-0 rounded-[20px] flex items-center justify-center ${effect.iconColor}`}
                      >
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.75 5.25L4.25 8.75L12.25 0.75"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </button>

                  {isActive && (
                    <div
                      className={`flex items-center justify-between w-full h-[56px] rounded-[16px] px-[16px] py-[12px] ${effect.activeColor.split(" ")[1]}`}
                    >
                      <div className="flex gap-[10px]">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <button
                            key={level}
                            onClick={() => handleLevelChange(effect.id, level)}
                            className={`w-[40px] h-[40px] rounded-[20px] flex items-center justify-center transition-all ${
                              level <= currentLevel
                                ? effect.iconColor
                                : "bg-white/50"
                            }`}
                          >
                            {effect.icon ? (
                              <img
                                src={effect.icon}
                                alt={`${level}레벨`}
                                className="w-[24px] h-[24px] object-contain"
                              />
                            ) : null}
                          </button>
                        ))}
                      </div>
                      <span
                        className={`font-[600] text-[16px] ${effect.textColor}`}
                      >
                        {currentLevel}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 난이도 */}
        <div className="mb-[72px]">
          <span className="block text-[18px] font-[600] text-[#222] leading-[24px] mb-[8px]">난이도</span>
          <div className="flex gap-[8px]">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= difficulty;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setDifficulty(star)}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="-2 -2 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2693 2.6022L24.4633 8.99017C24.8937 9.87361 26.049 10.7118 27.0231 10.893L32.7994 11.8444C36.4917 12.456 37.3525 15.129 34.7022 17.8019L30.1944 22.3098C29.4469 23.0573 29.0165 24.5297 29.2656 25.5944L30.5568 31.1669C31.5762 35.5614 29.2203 37.283 25.3468 34.9725L19.9329 31.7558C18.9588 31.1669 17.3278 31.1669 16.3538 31.7558L10.9399 34.9725C7.06631 37.2603 4.71046 35.5614 5.72981 31.1669L7.021 25.5944C7.22487 24.507 6.79448 23.0346 6.04695 22.2871L1.53912 17.7793C-1.1112 15.129 -0.250414 12.456 3.44192 11.8217L9.21828 10.8703C10.1923 10.7118 11.3476 9.85096 11.778 8.96752L14.972 2.57955C16.7162 -0.863615 19.5251 -0.863615 21.2693 2.6022Z"
                      fill={isFilled ? "#FFA600" : "transparent"}
                      stroke={isFilled ? "none" : "#CBCBCB"}
                      strokeWidth={isFilled ? "0" : "1.5"}
                    />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleOpenPreview}
          className="mx-auto mt-[32px] block w-[349px] rounded-[16px] bg-[#4759A6] text-white text-[20px] font-[600] py-[14px]"
        >
          카드 확인하기
        </button>
      </section>

      {previewData && (
        <CardPreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          cardData={previewData}
          onSaved={() => {
            setIsPreviewOpen(false);
            navigate("/main");
          }}
        />
      )}
    </main>
  );
}
