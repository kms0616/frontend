type CardItemProps = {
  title: string;
  description: string;
  difficulty: number;
  image: string;
  onClick?: () => void;
};
export default function CardItem({
  title,
  description,
  difficulty,
  image,
  onClick,
}: CardItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[443px] w-[260.6317px] shrink-0 cursor-pointer overflow-hidden rounded-[11.8133px] border-[2px] border-black bg-[#8DBBFA]"
    >
      <div className="mx-[20.6738px] my-[20.6738px] h-[401.6534px] w-[219.285px] overflow-hidden bg-white">
        <div className="h-[153.33px] w-full">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="h-[248.33px] border-t-[2px] border-black pt-[25px] text-center">
          <h3 className="mx-auto w-[184px] break-words text-center font-['KIMM'] text-[16px] font-bold leading-[24px] tracking-[-0.03em] text-black">
            {title}
          </h3>

          <p className="mx-auto mt-[15.78px] w-[174.985px] break-words text-center font-['KIMM'] text-[10.3367px] font-[700] leading-[16px] tracking-[-0.03em] text-black">
            {description}
          </p>

          <p className="mx-auto mt-[15.78px] w-[31px] break-words text-center font-['Pretendard'] text-[12px] font-semibold leading-[18px] tracking-[-0.03em] text-[#777777]">
            난이도
          </p>

          <div className="mt-[6.76px] flex justify-center gap-[3.38px]">
            {Array.from({ length: difficulty }).map((_, index) => (
              <img
                key={index}
                src="/images/star.svg"
                alt="별"
                className="h-[13.518px] w-[13.518px] shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
