import { useState } from "react";
import { useNavigate } from "react-router-dom";
const existingNames = ["반쯤 젖은 우산", "김민서", "테스트"];

export default function LoginPage() {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("2~10자 이내의 닉네임");
  const [isChecked, setIsChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  const isValidLength = nickname.length >= 2 && nickname.length <= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsChecked(false);
    setIsAvailable(false);

    if (e.target.value.length === 0) {
      setMessage("2~10자 이내의 닉네임");
    } else if (e.target.value.length < 2 || e.target.value.length > 10) {
      setMessage("사용 가능한 이름이 아닙니다.");
    } else {
      setMessage("중복확인을 해주세요.");
    }
  };

  const handleCheckDuplicate = () => {
    if (!isValidLength) return;

    const exists = existingNames.includes(nickname);

    setIsChecked(true);
    setIsAvailable(!exists);

    if (exists) {
      setMessage("이미 존재하는 이름입니다.");
    } else {
      setMessage("사용 가능한 이름입니다.");
    }
  };

  const handleStart = () => {
    if (!isValidLength || !isChecked || !isAvailable) return;

    console.log("시작:", nickname);

    navigate("/main");
  };

  return (
    <main className="mx-auto h-[852px] w-[393px] rounded-[48px] bg-[#FBFBFB] font-['KIMM']">
      <section className="relative h-full px-[20px] pt-[104px]">
        <img
          src="/images/login.svg"
          alt="여름 생존 우편"
          className="ml-[17px] h-[199px] w-[298px]"
        />

        <p className="mt-[16px] ml-[36px] h-[52px] w-[281px] text-center text-[16px] font-[700] leading-[26px] text-[#B7B7B7]">
          나만의 여름 생존법을 카드로 만들고
          <br />
          누군가의 생존법을 카드로 모아보세요.
        </p>

        <div className="mt-[72px] h-[22px] w-[353px] text-[16px] font-[700] leading-[22px] text-black">
          닉네임
        </div>

        <div className="mt-[12px] font-['Pretendard'] flex h-[48px] w-[353px] items-center gap-[17px]">
          <input
            value={nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
            className="h-[52px] w-[260px] flex-1 rounded-[16px] border border-black px-[16px] font-['Pretendard'] text-[14px] outline-none placeholder:text-[#B7B7B7]"
          />

          <button
            type="button"
            onClick={handleCheckDuplicate}
            disabled={!isValidLength}
            className={`h-[52px] w-[76px] rounded-[24px] text-[14px] font-[700] text-white ${
              isValidLength
                ? "cursor-pointer bg-black"
                : "cursor-not-allowed bg-[#C9C9C9]"
            }`}
          >
            중복확인
          </button>
        </div>

        <div className="mt-[12px] flex items-center gap-[10px]">
          <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center overflow-hidden">
            <img
              src="/images/info.svg"
              alt="안내"
              className="h-[24px] w-[24px] object-contain"
            />
          </span>

          <p className="font-['Pretendard'] text-[16px] text-[#989898]">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={handleStart}
          disabled={!isValidLength || !isChecked || !isAvailable}
          className={`mt-[24px] h-[48px] w-[353px] font-['Pretendard'] rounded-[16px] text-[20px] font-[500] text-white ${
            isValidLength && isChecked && isAvailable
              ? "cursor-pointer bg-[#4759A6]"
              : "cursor-not-allowed bg-[#C9C9C9]"
          }`}
        >
          여름 생존 시작하기
        </button>
      </section>
    </main>
  );
}
