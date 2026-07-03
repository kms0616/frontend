import React, { useState } from "react";
import FolderSelect from "../components/FolderSelect";
import { getEffectMeta } from "../constants/effects";
import { createSurvivalCard } from "../api/survivalCard";
import type { PreviewData } from "../pages/Write";

interface CardPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: PreviewData;
  onSaved?: () => void; // 저장 완료 후 부모(Write.tsx)한테 알려서 화면 이동 등 처리
}

const CardPreview: React.FC<CardPreviewProps> = ({ isOpen, onClose, cardData, onSaved }) => {
  const [isFolderSelectOpen, setIsFolderSelectOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const primaryMeta = getEffectMeta(cardData.primaryEffectTypeId ?? -1);

  // FolderSelect에서 폴더를 고르거나 새로 만들면 이 함수가 호출된다고 가정.
  // ⚠️ FolderSelect.tsx의 실제 콜백 이름/파라미터가 다르면 이 함수 시그니처만 맞춰주면 됨.
  const handleFolderSelected = async (
    folderId: number | null,
    newFolderName?: string,
  ) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await createSurvivalCard({
        title: cardData.title,
        description: cardData.description,
        recommendedSituation: cardData.recommendedSituation,
        difficulty: cardData.difficulty,
        primaryEffectTypeId: cardData.primaryEffectTypeId ?? 0,
        imageUrl: "", // TODO: 이미지 업로드 기능 없음, 추후 연결 필요
        imageKey: "",
        effects: cardData.effects,
        favorite: false,
        folderId: folderId ?? 0,
        newFolderName: newFolderName ?? "",
        newFolderColor: newFolderName ? "#B4D9A7" : "",
      });

      setIsFolderSelectOpen(false);
      onSaved?.();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "저장 중 오류가 발생했습니다");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-end transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`relative w-[393px] bg-[#FBFBFB] rounded-t-[32px] transition-transform duration-500 ease-out transform overflow-y-auto flex flex-col ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "calc(100% - 45px)" }}
      >
        <main className="w-full mx-auto font-['Pretendard'] pb-[32px]">
          <header className="relative flex items-center justify-center w-full px-[20px] pt-[31px] pb-[30px]">
            <h1 className="text-[18px] font-[600]">미리보기</h1>
            <button onClick={onClose} className="absolute right-[20px]">
              <div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="15.25" stroke="black" strokeWidth="1.5" />
                  <g clipPath="url(#clip0_60_8434)">
                    <path d="M22.75 9.25L9.25 22.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22.75 22.75L9.25 9.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_60_8434">
                      <rect width="24" height="24" fill="white" transform="translate(4 4)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </button>
          </header>

          <section className="flex flex-col items-center">
            {/* 실제 데이터로 채운 카드 */}
            <div
              className="w-[353px] min-h-[600px] rounded-[16px] border border-black px-[28px] py-[40px] flex flex-col"
              style={{ backgroundColor: primaryMeta?.iconColor ? undefined : "#9BC3FE" }}
            >
              <div
                className={`mx-auto mb-[24px] flex h-[92px] w-[92px] items-center justify-center rounded-full ${primaryMeta?.iconColor ?? "bg-[#9BC3FE]"}`}
              >
                {primaryMeta?.icon && (
                  <img src={primaryMeta.icon} alt="" className="h-[48px] w-[48px] object-contain" />
                )}
              </div>

              <h2 className="text-center font-['KIMM'] text-[24px] font-bold leading-[34px] tracking-[-0.03em] text-black">
                {cardData.title}
              </h2>

              <p className="mx-auto mt-[16px] max-w-[280px] text-center font-['KIMM'] text-[14px] font-bold leading-[24px] tracking-[-0.03em] text-black">
                {cardData.description}
              </p>

              {cardData.recommendedSituation && (
                <div className="mt-[24px] flex items-center justify-between text-[12px] text-[#777]">
                  <span className="font-semibold">추천 상황</span>
                  <span className="font-semibold text-black">{cardData.recommendedSituation}</span>
                </div>
              )}

              <div className="mt-[16px]">
                <span className="text-[12px] font-semibold text-[#777]">효과</span>
                <div className="mt-[8px] flex flex-wrap gap-[8px]">
                  {cardData.effects.map((e) => {
                    const meta = getEffectMeta(e.effectTypeId);
                    return (
                      <div
                        key={e.effectTypeId}
                        className={`flex items-center gap-[6px] rounded-full px-[12px] py-[6px] ${meta?.activeColor.split(" ")[1] ?? "bg-gray-100"}`}
                      >
                        {meta?.icon && <img src={meta.icon} alt="" className="h-[14px] w-[14px]" />}
                        <span className={`text-[12px] font-semibold ${meta?.textColor ?? "text-black"}`}>
                          {meta?.label} {e.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-[16px] flex items-center">
                <span className="text-[12px] font-semibold text-[#777]">난이도</span>
                <div className="ml-auto flex gap-[2px]">
                  {Array.from({ length: cardData.difficulty }).map((_, i) => (
                    <span key={i} className="text-[#FFA600]">★</span>
                  ))}
                </div>
              </div>
            </div>

            {saveError && (
              <p className="mt-[16px] text-[13px] font-semibold text-red-500">{saveError}</p>
            )}

            <button
              onClick={() => setIsFolderSelectOpen(true)}
              disabled={isSaving}
              className="mt-[32px] w-[349px] rounded-[16px] bg-[#4759A6] text-white text-[20px] font-[600] py-[14px] disabled:opacity-50"
            >
              {isSaving ? "저장 중..." : "카드 저장하기"}
            </button>
          </section>
        </main>
      </div>

      <FolderSelect
        isOpen={isFolderSelectOpen}
        onClose={() => setIsFolderSelectOpen(false)}
        onSelect={handleFolderSelected}
        isSaving={isSaving}
    />
    </div>
  );
};

export default CardPreview;