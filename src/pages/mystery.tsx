import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type MysteryOption = {
  optionId: number;
  position: number;
  cardBackColor: string;
  primaryEffect: {
    effectTypeId: number;
    name: string;
    color: string;
    icon: string;
  };
  selectable: boolean;
};

type MysteryDraw = {
  mysteryDrawId: number;
  status: string;
  options: MysteryOption[];
};

type MysterySelectResponse = {
  exchangeId: number;
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
    effects: {
      effectTypeId: number;
      name: string;
      level: number;
    }[];
    createdAt: string;
  };
};

export default function MysteryPage() {
  const navigate = useNavigate();
  const { mysteryDrawId } = useParams();
  console.log("mysteryDrawId:", mysteryDrawId);
  console.log("userId:", localStorage.getItem("userId"));
  const [mysteryDraw, setMysteryDraw] = useState<MysteryDraw | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (!mysteryDrawId) return;

    const fetchMysteryDraw = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await fetch(`/api/mystery-draws/${mysteryDrawId}`, {
          method: "GET",
          headers: {
            "X-USER-ID": userId ?? "",
          },
        });

        if (!response.ok) {
          throw new Error("미스터리 뽑기 조회 실패");
        }

        const data: MysteryDraw = await response.json();
        setMysteryDraw(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMysteryDraw();
  }, [mysteryDrawId]);

  const handleOptionClick = async (option: MysteryOption) => {
    if (!mysteryDrawId || isSelecting) return;

    if (selectedOptionId !== option.optionId) {
      setSelectedOptionId(option.optionId);
      return;
    }

    try {
      setIsSelecting(true);

      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `/api/mystery-draws/${mysteryDrawId}/select`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-USER-ID": userId ?? "",
          },
          body: JSON.stringify({
            optionId: option.optionId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("미스터리 카드 선택 실패");
      }

      const data: MysterySelectResponse = await response.json();

      navigate(`/received/${data.receivedCard.collectionCardId}`, {
        state: { receivedCard: data.receivedCard },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSelecting(false);
    }
  };

  if (!mysteryDraw) return null;

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
            {mysteryDraw.options.map((option) => {
              const isOpened = selectedOptionId === option.optionId;

              return (
                <button
                  key={option.optionId}
                  type="button"
                  disabled={!option.selectable || isSelecting}
                  onClick={() => handleOptionClick(option)}
                  className="flex h-[276px] w-[166px] items-center justify-center overflow-hidden rounded-[12px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isOpened ? (
                    <OpenedMysteryOption option={option} />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center rounded-[12px]"
                      style={{ backgroundColor: option.cardBackColor }}
                    >
                      <img
                        src="/images/mystery/blue.svg"
                        alt="미스터리 카드"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {isExitModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-[48px] bg-black/30">
          <div className="h-[238px] w-[352px] rounded-[24px] bg-white px-[24px] pt-[38px] pb-[22px]">
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

function OpenedMysteryOption({ option }: { option: MysteryOption }) {
  const frameMap: Record<number, string> = {
    1: "/images/cards/cold-frame.svg",
    2: "/images/cards/money-frame.svg",
    3: "/images/cards/fire-frame.svg",
  };

  const frame =
    frameMap[option.primaryEffect.effectTypeId] ??
    "/images/cards/cold-frame.svg";

  return (
    <div className="relative h-[276px] w-[166px] overflow-hidden rounded-[12px]">
      <img
        src={frame}
        alt=""
        className="absolute inset-0 h-full w-full object-fill"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={option.primaryEffect.icon} className="h-[44px] w-[44px]" />

        <p className="mt-[14px] font-['KIMM'] text-[14px] font-bold text-black">
          {option.primaryEffect.name}
        </p>
      </div>
    </div>
  );
}
