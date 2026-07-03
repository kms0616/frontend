import React, { useEffect, useState } from "react";

interface CardDetailProps {
  isOpen: boolean;
  onClose: () => void;
  collectionCardId: number | null;
}

type CardDetailData = {
  collectionCardId: number;
  cardId: number;
  source: "CREATED" | "RECEIVED";
  favorite: boolean;
  memo: string;
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
  cardCreatedAt: string;
  collectedAt: string;
};

const CardDetail: React.FC<CardDetailProps> = ({
  isOpen,
  onClose,
  collectionCardId,
}) => {
  const [cardData, setCardData] = useState<CardDetailData | null>(null);
  const [memo, setMemo] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFavoriteSaving, setIsFavoriteSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || collectionCardId === null) return;

    const fetchCardDetail = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await fetch(
          `/api/collection-cards/${collectionCardId}`,
          {
            method: "GET",
            headers: {
              "X-USER-ID": userId ?? "",
            },
          },
        );

        if (!response.ok) {
          throw new Error("보관 카드 상세 조회 실패");
        }

        const data: CardDetailData = await response.json();

        setCardData(data);
        setMemo(data.memo ?? "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchCardDetail();
  }, [isOpen, collectionCardId]);

  const handleSaveMemo = async () => {
    if (!cardData) return;

    try {
      setIsSaving(true);

      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `/api/collection-cards/${cardData.collectionCardId}/memo`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-USER-ID": userId ?? "",
          },
          body: JSON.stringify({
            memo,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("메모 수정 실패");
      }

      const data = await response.json();

      setCardData((prev) => (prev ? { ...prev, memo: data.memo } : prev));

      alert("메모가 저장되었습니다.");
    } catch (error) {
      console.error(error);
      alert("메모 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!cardData || isFavoriteSaving) return;

    try {
      setIsFavoriteSaving(true);

      const nextFavorite = !cardData.favorite;
      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `/api/collection-cards/${cardData.collectionCardId}/favorite`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-USER-ID": userId ?? "",
          },
          body: JSON.stringify({
            favorite: nextFavorite,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("즐겨찾기 변경 실패");
      }

      const data = await response.json();

      setCardData((prev) =>
        prev ? { ...prev, favorite: data.favorite } : prev,
      );
    } catch (error) {
      console.error(error);
      alert("즐겨찾기 변경에 실패했습니다.");
    } finally {
      setIsFavoriteSaving(false);
    }
  };

  if (!isOpen || collectionCardId === null) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] flex justify-center items-end transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`relative w-[393px] bg-[#FFFFFF] rounded-t-[32px] transition-transform duration-500 ease-out transform overflow-y-auto flex flex-col ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "calc(100% - 45px)", maxHeight: "824px" }}
      >
        <main className="w-full mx-auto font-['Pretendard'] pb-[29px]">
          <header className="relative flex items-center justify-center w-full px-[20px] pt-[31px] pb-[30px]">
            {cardData && (
              <button
                type="button"
                onClick={handleToggleFavorite}
                disabled={isFavoriteSaving}
                className="absolute left-[20px] text-[26px] leading-none disabled:opacity-50"
              >
                {cardData.favorite ? "★" : "☆"}
              </button>
            )}

            <h1 className="text-[18px] font-[600]">나의 카드</h1>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-[20px]"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.75"
                  y="0.75"
                  width="30.5"
                  height="30.5"
                  rx="15.25"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M22.75 9.25L9.25 22.75"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.75 22.75L9.25 9.25"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </header>

          {!cardData ? (
            <div className="pt-[120px] text-center text-[14px] text-[#888]">
              카드 정보를 불러오는 중입니다.
            </div>
          ) : (
            <section className="flex flex-col items-center">
              {cardData.message && (
                <div className="w-[353px] min-h-[90px] border border-black rounded-[24px] px-[19px] py-[18px] mb-[25px]">
                  <div className="flex items-center gap-[12px] mb-[5px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 5.25L12 13.5L3 5.25"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="text-[12px] font-[600] text-black">
                      {cardData.authorNickname}님의 메세지
                    </span>
                  </div>

                  <p className="text-[14px] font-[600] text-black leading-snug">
                    {cardData.message}
                  </p>
                </div>
              )}

              <div className="w-[353px] min-h-[600px] bg-[#9BC3FE] rounded-[16px] relative overflow-hidden flex flex-col items-center p-[24px] border border-black">
                {cardData.imageUrl && (
                  <img
                    src={cardData.imageUrl}
                    alt={cardData.title}
                    className="w-full h-[240px] object-cover rounded-[12px] mb-[24px]"
                  />
                )}

                <h2 className="text-[28px] font-[700] text-black text-center leading-tight">
                  {cardData.title}
                </h2>

                <p className="mt-[16px] text-[14px] font-[500] text-black text-center leading-snug">
                  {cardData.description}
                </p>

                <div className="mt-[20px] text-[13px] font-[600] text-black">
                  추천 상황: {cardData.recommendedSituation}
                </div>

                <div className="mt-[16px] flex flex-wrap justify-center gap-[8px]">
                  {cardData.effects.map((effect) => (
                    <span
                      key={effect.effectTypeId}
                      className="rounded-full border border-black bg-white px-[12px] py-[5px] text-[12px] font-[600]"
                    >
                      {effect.name} Lv.{effect.level}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-[24px] w-[353px]">
                <label className="block mb-[8px] text-[14px] font-[600] text-black">
                  개인 메모
                </label>

                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="이 카드에 대한 메모를 입력해주세요."
                  className="w-full h-[120px] resize-none rounded-[16px] border border-black px-[16px] py-[14px] text-[14px] font-[500] outline-none"
                />

                <button
                  type="button"
                  onClick={handleSaveMemo}
                  disabled={isSaving}
                  className="mt-[12px] w-full h-[48px] rounded-[16px] bg-black text-white text-[15px] font-[600] disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : "메모 저장"}
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CardDetail;
