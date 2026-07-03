import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import CardItem from "../components/CardItem";

type Effect = {
  name: string;
  level: number;
  frame: string;
  icon: string;
};

const mysteryCards = [
  {
    id: 1,
    coverImage: "/images/mystery/blue.svg",
    title: "아이스 아메리카노 방어술",
    description: "항상 차가운 걸 쥐고 있어야 오늘을 시작할 수 있다",
    difficulty: 2,
    effects: [
      {
        name: "냉각력",
        level: 3,
        frame: "/images/cards/cold-frame.svg",
        icon: "/images/cold.svg",
      },
      {
        name: "자본력",
        level: 5,
        frame: "/images/cards/money-frame.svg",
        icon: "/images/money.svg",
      },
    ],
  },
];

export default function MysteryPage() {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  return (
    <main className="relative mx-auto h-[852px] w-[393px] rounded-[48px] bg-[#FBFBFB]">
      <section className="h-full w-full">
        <header className="mt-[54px] flex h-[40px] w-[393px] items-center">
          <button
            onClick={() => setIsExitModalOpen(true)}
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
            누군가의 생존법
          </h1>
        </header>

        <div className="mt-[36px]">
          <h2 className="ml-[20px] h-[22px] w-[260px] font-['Pretendard'] text-[24px] font-bold text-black">
            4장 중 한 장을 골라보세요
          </h2>

          <p className="ml-[20px] mt-[11px] h-[22px] w-[260px] font-['Pretendard'] text-[16px] font-semibold text-[#909090]">
            탭하면 카드가 열려요
          </p>

          <div className="mt-[36px] grid grid-cols-2 gap-x-[20.33px] gap-y-[26.4px] px-[20px]">
            {mysteryCards.map((card) => {
              const isOpened = selectedCardId === card.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    if (isOpened) {
                      navigate(`/received/${card.id}`);
                    } else {
                      setSelectedCardId(card.id);
                    }
                  }}
                  className="flex h-[276px] w-[166px] items-center justify-center overflow-hidden rounded-[12px]"
                >
                  {isOpened ? (
                    <OpenedMysteryCard
                      title={card.title}
                      description={card.description}
                      difficulty={card.difficulty}
                      effects={card.effects}
                    />
                  ) : (
                    <img
                      src={card.coverImage}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {isExitModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-[48px] bg-black/30">
          <div className="w-[352px] h-[238px] rounded-[24px] bg-white px-[24px] pt-[38px] pb-[22px]">
            <h2 className="text-center font-['Pretendard'] text-[24px] font-bold text-[#222]">
              정말 뒤로 가시겠어요?
            </h2>

            <p className="mt-[14px] text-center font-['Pretendard'] text-[16px] font-bold leading-[24px] text-black">
              화면을 나가면
              <br />
              누군가의 카드를 받을 수 없어요
            </p>

            <div className="mt-[28px] flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/send")}
                className="h-[56px] w-[148px] rounded-[16px] bg-[#D0D0D0] font-['Pretendard'] text-[18px] font-semibold text-white"
              >
                확인
              </button>

              <button
                type="button"
                onClick={() => setIsExitModalOpen(false)}
                className="h-[56px] w-[148px] rounded-[16px] bg-[#4759A6] font-['Pretendard'] text-[18px] font-semibold text-white"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function OpenedMysteryCard({
  title,
  description,
  difficulty,
  effects,
}: {
  title: string;
  description: string;
  difficulty: number;
  effects: Effect[];
}) {
  const mainEffect =
    effects.length > 0
      ? effects.reduce((max, effect) =>
          effect.level > max.level ? effect : max,
        )
      : null;

  if (!mainEffect) return null;

  return (
    <div className="relative h-[276px] w-[166px] overflow-hidden rounded-[12px]">
      <img
        src={mainEffect.frame}
        alt=""
        className="absolute inset-0 h-full w-full object-fill"
      />

      <h3 className="absolute top-[112px] left-1/2 w-[130px] -translate-x-1/2 text-center font-['KIMM'] text-[10px] font-bold leading-[15px] tracking-[-0.03em] text-black">
        {title}
      </h3>

      <p className="absolute top-[132px] left-1/2 w-[120px] -translate-x-1/2 text-center font-['KIMM'] text-[7px] font-bold leading-[10px] tracking-[-0.03em] text-black">
        {description}
      </p>

      <div className="absolute top-[178px] left-1/2 flex -translate-x-1/2 flex-col items-center">
        <span className="font-['Pretendard'] text-[8px] font-semibold text-[#777777]">
          난이도
        </span>

        <div className="mt-[4px] flex gap-[2px]">
          {Array.from({ length: difficulty }).map((_, index) => (
            <img
              key={index}
              src="/images/star.svg"
              alt="별"
              className="h-[8px] w-[8px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
