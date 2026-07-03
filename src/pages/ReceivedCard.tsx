import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FolderSelect from "../components/FolderSelect";
import { getSurvivalCard } from "../api/survivalCard";
import type { SurvivalCard } from "../types/survivalCard";

export default function ReceivedCardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [card, setCard] = useState<SurvivalCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getSurvivalCard(Number(id))
      .then(setCard)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return null; // 필요하면 로딩 스피너로 교체
  if (error || !card) return null;

  return (
    <main className="relative mx-auto h-[852px] w-[393px] rounded-[48px] bg-[#FBFBFB]">
      <section className="h-full w-full">
        <header className="mt-[54px] flex h-[40px] w-[393px] items-center">
          <button
            onClick={() => navigate("/main")}
            type="button"
            className="ml-[30px] h-[24px] w-[24px] cursor-pointer"
          >
            <img src="/images/back.svg" alt="뒤로가기" className="h-full w-full" />
          </button>
          <h1 className="ml-[102px] font-['Pretendard'] text-[18px] font-semibold text-black">
            받은 생존법
          </h1>
        </header>

        <div className="mt-[42px] px-[20px]">
          {/* senderNickname / message는 API에 없어서 임시로 비워둠 - 확인 필요 */}

          <div className="relative mt-[24px] h-[600px] w-[353px] overflow-visible rounded-[12px]">
            <div className="absolute inset-0 px-[37px] pt-[52px] text-center">
              <img
                src={card.primaryEffect.icon}
                alt=""
                className="mx-auto h-[92px] w-[92px]"
              />

              <h2 className="mt-[80px] font-['KIMM'] text-[24px] font-bold leading-[34px] tracking-[-0.03em] text-black">
                {card.title}
              </h2>

              <p className="mx-auto mt-[28px] w-[237px] font-['KIMM'] text-[14px] font-bold leading-[24px] tracking-[-0.03em] text-black">
                {card.description}
              </p>

              <div className="mt-[24px] flex justify-between font-['Pretendard'] text-[12px] text-[#9B9B9B]">
                <span>{new Date(card.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="mt-[18px] flex items-center py-[6px]">
                <span className="font-['Pretendard'] text-[12px] font-semibold text-[#777777]">
                  추천 상황
                </span>
                <span className="ml-auto flex items-center gap-[4px]">
                  <img src="/images/recommend.svg" alt="" className="h-[14px] w-[14px]" />
                  <span className="font-['Pretendard'] text-[12px] font-semibold text-black">
                    {card.recommendedSituation}
                  </span>
                </span>
              </div>

              <div className="mt-[10px] text-left">
                <span className="font-['Pretendard'] text-[12px] font-semibold text-[#777777]">
                  효과
                </span>
                <div className="mt-[8px] flex flex-wrap gap-[12px]">
                  {card.effects.map((effect) => (
                    <div
                      key={effect.effectTypeId}
                      className="flex items-center gap-[4px] rounded-full bg-gray-100 px-[12px] py-[4px]"
                    >
                      <span className="font-['Pretendard'] text-[12px] font-semibold text-gray-700">
                        {effect.name} {effect.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[14px] flex items-center">
                <span className="font-['Pretendard'] text-[12px] font-semibold text-[#777777]">
                  난이도
                </span>
                <div className="ml-auto flex gap-[2px]">
                  {Array.from({ length: card.difficulty }).map((_, index) => (
                    <img key={index} src="/images/star.svg" alt="" className="h-[16px] w-[16px]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[72px] flex flex-col items-center gap-[8px]">
            <button
              type="button"
              onClick={() => navigate("/main")}
              className="font-['Pretendard'] text-[16px] font-semibold text-[#BCBCBC]"
            >
              건너뛰기
            </button>
            <button
              type="button"
              onClick={() => setIsFolderModalOpen(true)}
              className="h-[56px] w-[353px] rounded-[16px] bg-[#4759A6] font-['Pretendard'] text-[20px] font-semibold text-white"
            >
              폴더에 저장
            </button>
          </div>
        </div>
      </section>

      {isFolderModalOpen && (
        <FolderSelect isOpen={isFolderModalOpen} onClose={() => setIsFolderModalOpen(false)} />
      )}
    </main>
  );
}