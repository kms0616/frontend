import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import CardItem from "../components/CardItem";

const mysteryCards = [
  {
    id: 1,
    coverImage: "/images/mystery/blue.svg",
    title: "아이스 아메리카노 방어술",
    description: "항상 차가운 걸 쥐고 있어야 오늘을 시작할 수 있다",
    difficulty: 2,
    image: "/images/card-sample.png",
  },
  {
    id: 2,
    coverImage: "/images/mystery/yellow.svg",
    title: "선풍기 사수법",
    description: "바람이 오는 자리를 먼저 차지해야 살아남는다",
    difficulty: 3,
    image: "/images/card-sample.png",
  },
  {
    id: 3,
    coverImage: "/images/mystery/pink.svg",
    title: "얼음물 샤워법",
    description: "더우면 시원한 물로 정신을 깨워보자",
    difficulty: 1,
    image: "/images/card-sample.png",
  },
  {
    id: 4,
    coverImage: "/images/mystery/white.svg",
    title: "그늘 찾기",
    description: "직사광선을 피해 잠시 쉬어가는 것도 방법이다",
    difficulty: 2,
    image: "/images/card-sample.png",
  },
];

export default function MysteryPage() {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

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
                  onClick={() => setSelectedCardId(card.id)}
                  className="flex h-[276px] w-[166px] items-center justify-center overflow-hidden rounded-[12px]"
                >
                  {isOpened ? (
                    <OpenedMysteryCard
                      title={card.title}
                      description={card.description}
                      difficulty={card.difficulty}
                      image={card.image}
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
    </main>
  );
}
function OpenedMysteryCard({
  title,
  description,
  difficulty,
  image,
}: {
  title: string;
  description: string;
  difficulty: number;
  image: string;
}) {
  return (
    <div className="h-[276px] w-[166px] overflow-hidden rounded-[12px] border-2 border-black bg-[#8DBBFA]">
      <div className="m-[13px] h-[250px] bg-white">
        <div className="h-[95px] w-full">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="border-t-2 border-black px-[10px] pt-[14px] text-center">
          <h3 className="font-['KIMM'] text-[10px] font-bold tracking-[-0.03em] text-black">
            {title}
          </h3>

          <p className="mt-[8px] font-['KIMM'] text-[7px] font-bold leading-[10px] tracking-[-0.03em] text-black">
            {description}
          </p>

          <p className="mt-[8px] font-['Pretendard'] text-[8px] font-semibold text-[#777777]">
            난이도
          </p>

          <div className="mt-[4px] flex justify-center gap-[2px]">
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
    </div>
  );
}
