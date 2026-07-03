import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";

type SendStatus = "idle" | "sending" | "success" | "error";

const cards = [
  {
    id: 1,
    title: "아이스 아메리카노 방어술",
    description: "항상 차가운 걸 쥐고 있어야 오늘을 시작할 수 있다",
    difficulty: 3,
    image: "/images/card-sample.png",
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
      {
        name: "인내력",
        level: 2,
        frame: "/images/cards/fire-frame.svg",
        icon: "/images/fire.svg",
      },
    ],
  },
  {
    id: 2,
    title: "선풍기 사수법",
    description: "바람이 오는 자리를 먼저 차지해야 살아남는다",
    difficulty: 2,
    image: "/images/card-sample.png",
    effects: [
      {
        name: "냉각력",
        level: 4,
        frame: "/images/cards/cold-frame.svg",
        icon: "/images/cold.svg",
      },
      {
        name: "인내력",
        level: 3,
        frame: "/images/cards/fire-frame.svg",
        icon: "/images/fire.svg",
      },
    ],
  },
];

export default function CardSendPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");

  const hasCards = cards.length > 0;
  const canSend = message.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;

    setSendStatus("sending");

    setTimeout(() => {
      setSendStatus("success");
    }, 1200);
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
            카드 보내기
          </h1>
        </header>

        {hasCards ? (
          <div className="mt-[36px]">
            <h2 className="ml-[20px] h-[22px] w-[234px] font-['Pretendard'] text-[24px] font-bold leading-[22px] text-black">
              보낼 카드를 선택하세요
            </h2>

            <div className="mt-[24px] flex gap-[16.37px] overflow-x-auto pl-[20px] hide-scrollbar">
              {cards.map((card) => (
                <CardItem
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  difficulty={card.difficulty}
                  effects={card.effects}
                />
              ))}
            </div>

            <div className="mt-[48px] px-[20px]">
              <h2 className="h-[24px] w-[114px] font-['Pretendard'] text-[18px] font-semibold leading-[24px] text-black">
                메세지 작성하기
              </h2>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메세지를 입력해주세요"
                className="mt-[8px] h-[117px] w-[352px] resize-none rounded-[24px] border border-black px-[20px] pt-[20px] font-['Pretendard'] text-[16px] font-semibold outline-none placeholder:text-[#C2C2C2]"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!canSend}
                className={`mt-[72px] h-[58px] w-[353px] rounded-[16px] font-['Pretendard'] text-[20px] font-semibold text-white ${
                  canSend
                    ? "cursor-pointer bg-[#4759A6]"
                    : "cursor-not-allowed bg-[#D0D0D0]"
                }`}
              >
                발송하기
              </button>
            </div>
          </div>
        ) : (
          <EmptyCard />
        )}
      </section>

      {sendStatus !== "idle" && (
        <SendModal
          status={sendStatus}
          onClose={() => setSendStatus("idle")}
          onSuccessConfirm={() => navigate("/mystery")}
        />
      )}
    </main>
  );
}

function EmptyCard() {
  const navigate = useNavigate();

  return (
    <div className="mt-[293px] flex flex-col items-center">
      <img
        src="/images/NoCardIcon.svg"
        alt="보낼 카드 없음"
        className="h-[40px] w-[40px]"
      />

      <p className="mt-[16px] font-['Pretendard'] text-[16px] font-semibold text-black">
        현재 보낼 수 있는 카드가 없어요
      </p>

      <button
        type="button"
        onClick={() => navigate("/write")}
        className="mt-[16px] h-[48px] w-[247px] rounded-[12px] bg-[#4759A6] font-['Pretendard'] text-[16px] font-semibold text-white"
      >
        생존법 작성하러 가기
      </button>
    </div>
  );
}

function SendModal({
  status,
  onClose,
  onSuccessConfirm,
}: {
  status: SendStatus;
  onClose: () => void;
  onSuccessConfirm: () => void;
}) {
  if (status === "sending") {
    return (
      <div className="absolute inset-0 flex items-center justify-center rounded-[48px] bg-black/80">
        <div className="flex h-[145px] w-[352px] flex-col items-center rounded-[24px] bg-white">
          <img
            src="/images/load_send.svg"
            alt="발송 중"
            className="mt-[36px] h-[24px] w-[24px]"
          />

          <p className="mt-[8px] h-[24px] w-[115px] text-center font-['Pretendard'] text-[24px] font-bold leading-[24px] text-black">
            카드 발송 중
          </p>
        </div>
      </div>
    );
  }

  const isSuccess = status === "success";

  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-[48px] bg-black/80">
      <div className="flex h-[225px] w-[352px] flex-col items-center rounded-[24px] bg-white">
        <img
          src={isSuccess ? "/images/success.svg" : "/images/fail.svg"}
          alt={isSuccess ? "발송 완료" : "발송 실패"}
          className="mt-[41px] h-[24px] w-[24px]"
        />

        <p className="mt-[8px] text-center font-['Pretendard'] text-[24px] font-bold leading-[30px] text-black">
          {isSuccess ? "발송 완료 !" : "발송 실패!"}
        </p>

        <button
          type="button"
          onClick={status === "success" ? onSuccessConfirm : onClose}
          className="mt-[32px] flex h-[56px] w-[304px] items-center justify-center rounded-[16px] bg-[#4759A6] font-['Pretendard'] text-[20px] font-semibold leading-[30px] text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}
