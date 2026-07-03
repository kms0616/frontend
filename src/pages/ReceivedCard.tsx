import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FolderSelect from "../components/FolderSelect";

type Effect = {
  effectTypeId: number;
  name: string;
  level: number;
};

type CardExchangeResponse = {
  exchangeId: number;
  exchangedAt: string;
  sentCard: {
    cardId: number;
    title: string;
    imageUrl: string;
  };
  receivedCard: {
    collectionCardId: number;
    cardId: number;
    title: string;
    description: string;
    recommendedSituation: string;
    difficulty: number;
    imageUrl: string;
    message: string;
    authorUserId: number;
    authorNickname: string;
    primaryEffect: {
      effectTypeId: number;
      name: string;
      color: string;
      icon: string;
    };
    effects: Effect[];
    createdAt: string;
  };
};

const effectAssetMap: Record<
  number,
  {
    color: string;
    text: string;
    icon: string;
    frame: string;
  }
> = {
  1: {
    color: "#E5F7FE",
    text: "#4759A6",
    icon: "/images/cold.svg",
    frame: "/images/cards/cold-frame.svg",
  },
  2: {
    color: "#F3EDFD",
    text: "#A27DDB",
    icon: "/images/brain.svg",
    frame: "/images/cards/cold-frame.svg",
  },
  3: {
    color: "#E4FAED",
    text: "#00C772",
    icon: "/images/power.svg",
    frame: "/images/cards/cold-frame.svg",
  },
  4: {
    color: "#FFF5DE",
    text: "#FFA300",
    icon: "/images/money.svg",
    frame: "/images/cards/money-frame.svg",
  },
  5: {
    color: "#FFD0D0",
    text: "#FF3333",
    icon: "/images/fire.svg",
    frame: "/images/cards/fire-frame.svg",
  },
};

export default function ReceivedCardPage() {
  const navigate = useNavigate();
  const { id: exchangeId } = useParams();

  const [exchange, setExchange] = useState<CardExchangeResponse | null>(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  useEffect(() => {
    if (!exchangeId) return;

    const fetchExchange = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await fetch(`/api/card-exchange/${exchangeId}`, {
          method: "GET",
          headers: {
            "X-USER-ID": userId ?? "",
          },
        });

        if (!response.ok) {
          throw new Error("교환 결과 조회 실패");
        }

        const data: CardExchangeResponse = await response.json();
        setExchange(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExchange();
  }, [exchangeId]);

  if (!exchange) return null;

  const card = exchange.receivedCard;

  const mainEffect =
    card.effects.find(
      (effect) => effect.effectTypeId === card.primaryEffect.effectTypeId,
    ) ?? card.effects[0];

  const mainEffectAsset = effectAssetMap[mainEffect.effectTypeId] ?? {
    color: "#E5F7FE",
    text: "#4759A6",
    icon: card.primaryEffect.icon,
    frame: "/images/cards/cold-frame.svg",
  };

  return (
    <main className="relative mx-auto h-[852px] w-[393px] rounded-[48px] bg-[#FBFBFB]">
      <section className="h-full w-full">
        <header className="mt-[54px] flex h-[40px] w-[393px] items-center">
          <button
            onClick={() => navigate("/main")}
            type="button"
            className="ml-[30px] h-[24px] w-[24px] cursor-pointer"
          >
            <img
              src="/images/back.svg"
              alt="뒤로가기"
              className="h-full w-full"
            />
          </button>

          <h1 className="ml-[102px] font-['Pretendard'] text-[18px] font-semibold text-black">
            받은 생존법
          </h1>
        </header>

        <div className="mt-[42px] px-[20px]">
          <div className="h-[90px] w-[353px] rounded-[24px] border border-black px-[20px] py-[18px]">
            <div className="flex h-[24px] items-center gap-[12px]">
              <img
                src="/images/email.svg"
                alt=""
                className="h-[20px] w-[20px]"
              />

              <p className="font-['Pretendard'] text-[14px] font-semibold text-black">
                {card.authorNickname}님의 메시지
              </p>
            </div>

            <p className="mt-[8px] font-['Pretendard'] text-[16px] font-semibold text-black">
              {card.message}
            </p>
          </div>

          <div className="relative mt-[24px] h-[600px] w-[353px] overflow-visible rounded-[12px]">
            <img
              src={mainEffectAsset.frame}
              alt=""
              className="absolute left-[-1px] top-[-5px] h-[610px] w-[363px] max-w-none"
            />

            <div className="absolute inset-0 px-[37px] pt-[52px] text-center">
              <img
                src={mainEffectAsset.icon}
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
                <span>{card.authorNickname}</span>
                <span>{new Date(card.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="mt-[18px] flex items-center py-[6px]">
                <span className="font-['Pretendard'] text-[12px] font-semibold text-[#777777]">
                  추천 상황
                </span>

                <span className="ml-auto flex items-center gap-[4px]">
                  <img
                    src="/images/recommend.svg"
                    alt=""
                    className="h-[14px] w-[14px]"
                  />
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
                  {card.effects.map((effect) => {
                    const asset = effectAssetMap[effect.effectTypeId] ?? {
                      color: "#E5F7FE",
                      text: "#4759A6",
                      icon: card.primaryEffect.icon,
                      frame: "/images/cards/cold-frame.svg",
                    };

                    return (
                      <div
                        key={effect.effectTypeId}
                        className="flex items-center gap-[4px] rounded-full px-[12px] py-[4px]"
                        style={{ backgroundColor: asset.color }}
                      >
                        <img
                          src={asset.icon}
                          alt=""
                          className="h-[14px] w-[14px]"
                        />

                        <span
                          className="font-['Pretendard'] text-[12px] font-semibold"
                          style={{ color: asset.text }}
                        >
                          {effect.name} {effect.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-[14px] flex items-center">
                <span className="font-['Pretendard'] text-[12px] font-semibold text-[#777777]">
                  난이도
                </span>

                <div className="ml-auto flex gap-[2px]">
                  {Array.from({ length: card.difficulty }).map((_, index) => (
                    <img
                      key={index}
                      src="/images/star.svg"
                      alt=""
                      className="h-[16px] w-[16px]"
                    />
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
        <FolderSelect
          isOpen={isFolderModalOpen}
          onClose={() => setIsFolderModalOpen(false)}
        />
      )}
    </main>
  );
}
