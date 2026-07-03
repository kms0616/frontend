import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type HomeInfo = {
  nickname: string;
  createdCardCount: number;
  receivedCardCount: number;
  sendableCardCount: number;
};

const menuItems = [
  {
    title: "나의 생존법 작성하기",
    image: "/images/write-card.png",
    path: "/write",
  },
  {
    title: "카드 보내기",
    image: "/images/send-card.svg",
    path: "/send",
  },
  {
    title: "보관함 보기",
    image: "/images/storage-card.svg",
    path: "/storage",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [homeInfo, setHomeInfo] = useState<HomeInfo | null>(null);

  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await fetch("/api/users/me/home", {
          headers: {
            "X-USER-ID": userId ?? "",
          },
        });

        if (!response.ok) {
          throw new Error("홈 조회 실패");
        }

        const data: HomeInfo = await response.json();
        setHomeInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeInfo();
  }, []);

  if (!homeInfo) return null;

  return (
    <main className="mx-auto h-[852px] w-[393px] rounded-[48px] bg-[#FBFBFB] font-['Pretendard']">
      <section className="px-[20px] py-[32px]">
        <div>
          <h2 className="mb-[44px] text-[24px] font-bold leading-[34px] text-black">
            <span className="bg-[#D9F3DD]">{homeInfo.nickname}님</span>의
            <br />
            생존 우편
          </h2>

          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => navigate(menuItems[0].path)}
              className="h-[224px] w-[353px] cursor-pointer overflow-hidden rounded-[24px]"
            >
              <img
                src={menuItems[0].image}
                alt={menuItems[0].title}
                className="h-full w-full object-cover"
              />
            </button>

            <div className="mt-[14px] flex w-[353px] justify-between">
              {menuItems.slice(1).map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="h-[159px] w-[169px] cursor-pointer overflow-hidden rounded-[24px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="mt-[14px] flex h-[128px] w-[353px] items-center rounded-[24px] border-[2px] border-black bg-white">
              <CountBox
                count={homeInfo.createdCardCount}
                label="내가 만든 카드"
                color="#F6DC4D"
                labelWidth="w-[78px]"
              />
              <Divider />
              <CountBox
                count={homeInfo.receivedCardCount}
                label="받은 카드"
                color="#78A6E8"
                labelWidth="w-[46px]"
              />
              <Divider />
              <CountBox
                count={homeInfo.sendableCardCount}
                label="보낼 수 있는 카드"
                color="#A66BE8"
                labelWidth="w-[99px]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CountBox({
  count,
  label,
  color,
  labelWidth,
}: {
  count: number;
  label: string;
  color: string;
  labelWidth: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <strong
        className="font-['KIMM'] text-[32px] font-bold leading-none"
        style={{ color }}
      >
        {count}
      </strong>

      <span
        className={`mt-[8px] ${labelWidth} whitespace-pre-line text-center font-['KIMM'] text-[16px] font-bold leading-[19px] text-black`}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="h-[70px] w-[2px] bg-black" />;
}