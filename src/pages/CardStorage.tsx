import React, { useEffect, useState } from "react";

interface CardStorageProps {
  onFolderClick?: (folderName: string) => void;
  collectionCardId?: number | null;
}
type CollectionCard = {
  collectionCardId: number;
  cardId: number;
  source: "CREATED" | "RECEIVED";
  favorite: boolean;
  title: string;
  description: string;
  recommendedSituation: string;
  difficulty: number;
  imageUrl: string;
  message: string;
  primaryEffect: {
    effectTypeId: number;
    name: string;
    color: string;
    icon: string;
  };
  collectedAt: string;
};

type Folder = {
  id: number;
  name: string;
  bgColor: string;
  frontColor: string;
  count?: number;
};

export default function CardStorage({
  onFolderClick,
  collectionCardId,
}: CardStorageProps) {
  const [cards, setCards] = useState<CollectionCard[]>([]);
  const [folders, setFolders] = useState<Folder[]>([
    {
      id: 1,
      name: "기본 폴더",
      bgColor: "bg-[#FF7474]",
      frontColor: "bg-[#FBB]",
    },
    {
      id: 2,
      name: "받은 카드",
      bgColor: "bg-[#E1D145]",
      frontColor: "bg-[#F3E888]",
    },
    {
      id: 3,
      name: "즐겨찾기",
      bgColor: "bg-[#9AD0FF]",
      frontColor: "bg-[#CDE7FE]",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    const fetchCollectionCards = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await fetch("/api/collection-cards", {
          method: "GET",
          headers: {
            "X-USER-ID": userId ?? "",
          },
        });

        if (!response.ok) {
          throw new Error("보관함 카드 목록 조회 실패");
        }

        const data: CollectionCard[] = await response.json();

        console.log("보관함 카드 목록:", data);

        setCards(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollectionCards();
  }, []);

  const getFolderCount = (folderName: string) => {
    if (folderName === "기본 폴더") {
      return cards.length;
    }

    if (folderName === "받은 카드") {
      return cards.filter((card) => card.source === "RECEIVED").length;
    }

    if (folderName === "즐겨찾기") {
      return cards.filter((card) => card.favorite).length;
    }

    return 0;
  };
  const handleChangeFolder = async (
    target: string,
    folderId?: number,
    newFolderName?: string,
    newFolderColor?: string,
  ) => {
    if (collectionCardId == null) return;

    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `/api/collection-cards/${collectionCardId}/folder`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-USER-ID": userId ?? "",
          },
          body: JSON.stringify({
            target,
            folderId,
            newFolderName,
            newFolderColor,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("폴더 변경 실패");
      }

      const data = await response.json();

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  const handleAddFolder = async () => {
    if (newFolderName.trim() !== "") {
      await handleChangeFolder(
        "NEW_FOLDER",
        undefined,
        newFolderName.trim(),
        "#B4D9A7",
      );

      setFolders((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newFolderName,
          bgColor: "bg-[#B4D9A7]",
          frontColor: "bg-[#D5EBD0]",
        },
      ]);

      setNewFolderName("");
    }

    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddFolder();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewFolderName("");
    }
  };

  const cardBorderPath =
    "M6.51572 7.41901C8.33211 5.27477 8.44669 2.51023 8.44669 1.17008L135.026 0.5C134.837 2.06351 134.913 5.7266 136.729 7.87084C138.545 10.0151 142.027 10.1044 143.54 9.88107V180.119C142.594 179.896 140.135 179.985 137.864 182.129C135.594 184.273 135.405 187.936 135.594 189.5H7.87907C7.87907 187.713 8.52096 185.118 6.51572 182.35C4.7955 179.976 1.82445 180.119 0.5 180.119V9.88107C1.63524 10.1044 4.69933 9.56326 6.51572 7.41901Z";

  return (
    <main className="relative mx-auto h-[881px] w-[393px] overflow-y-auto rounded-[48px] bg-[#FBFBFB] font-['Pretendard'] shadow-lg">
      <header className="mt-[54px] mb-[70px] flex w-full items-center px-[20px] py-[8px]">
        <button type="button" className="mr-auto">
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
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-[18px] font-[600]">
          보관함
        </h1>
      </header>

      <section className="mt-[10px] grid grid-cols-2 gap-x-[16px] gap-y-[32px] px-[20px] pb-[40px]">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={async () => {
              onFolderClick?.(folder.name);

              if (folder.name === "기본 폴더") {
                await handleChangeFolder("ALL");
              } else if (folder.name === "즐겨찾기") {
                await handleChangeFolder("FOLDER", folder.id);
              } else {
                await handleChangeFolder("FOLDER", folder.id);
              }
            }}
            className="relative mt-[12px] aspect-[3/4] w-full cursor-pointer"
          >
            <div
              className={`absolute top-[-27px] right-0 bottom-[27px] left-0 rounded-[24px] border border-black ${folder.bgColor}`}
            />
            <div
              className={`absolute top-[-18px] right-0 bottom-[18px] left-0 rounded-[24px] border border-black ${folder.bgColor}`}
            />
            <div
              className={`absolute top-[-9px] right-0 bottom-[9px] left-0 rounded-[24px] border border-black ${folder.bgColor}`}
            />

            <div
              className={`relative absolute inset-0 flex h-[215px] w-[169px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-black ${folder.frontColor}`}
            >
              <svg
                className="absolute inset-0 h-full w-full p-[6px]"
                viewBox="0 0 145 190"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d={cardBorderPath}
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="relative z-10 flex flex-col items-center justify-center gap-[16px]">
                <div className="mb-[40px] h-[1px] w-[73px] bg-black" />

                <div
                  className={`flex w-fit items-center justify-center rounded-[4px] border border-black px-[10px] py-[4px] ${folder.bgColor}`}
                >
                  <span className="whitespace-nowrap text-[12px] font-[600] leading-none tracking-tight text-black">
                    {folder.name}
                  </span>
                </div>

                <span className="text-[11px] font-[600] text-black">
                  {getFolderCount(folder.name)}장
                </span>

                <div className="mt-[40px] h-[1px] w-[73px] bg-black" />
              </div>
            </div>
          </div>
        ))}

        <div
          className="relative mt-[12px] aspect-[3/4] w-full cursor-pointer opacity-[0.3]"
          onClick={() => {
            if (!isAdding) setIsAdding(true);
          }}
        >
          <div className="absolute top-[-27px] right-0 bottom-[27px] left-0 rounded-[24px] border border-black bg-[#999]" />
          <div className="absolute top-[-18px] right-0 bottom-[18px] left-0 rounded-[24px] border border-black bg-[#999]" />
          <div className="absolute top-[-9px] right-0 bottom-[9px] left-0 rounded-[24px] border border-black bg-[#999]" />

          <div className="relative absolute inset-0 flex h-[215px] w-[169px] flex-col items-center justify-center overflow-hidden rounded-[16px] border border-black bg-[#F5F5F5]">
            <svg
              className="absolute inset-0 h-full w-full p-[6px]"
              viewBox="0 0 145 190"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d={cardBorderPath}
                stroke="#000"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            <div className="relative z-10 flex w-full flex-col items-center justify-center px-[10px]">
              <div className="mb-[40px] h-[1px] w-[73px] bg-black" />

              {!isAdding ? (
                <div className="flex flex-col items-center gap-[8px]">
                  <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border-[1.5px] border-black">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 8H13.5"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 2.5V13.5"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="text-[12px] font-[600] text-black">
                    폴더 추가
                  </span>
                </div>
              ) : (
                <div className="flex w-full flex-col items-center gap-[8px]">
                  <input
                    autoFocus
                    type="text"
                    placeholder="폴더 이름을 입력해주세요."
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleAddFolder}
                    className="w-full bg-transparent pb-[2px] text-center text-[10px] font-[600] text-black outline-none placeholder:text-[#666]"
                  />
                </div>
              )}

              <div className="mt-[40px] h-[1px] w-[73px] bg-black" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
