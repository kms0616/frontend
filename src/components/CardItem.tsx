type Effect = {
  name: string;
  level: number;
  frame: string;
  icon: string;
};

type CardItemProps = {
  title: string;
  description: string;
  difficulty: number;
  effects: Effect[];
  onClick?: () => void;
};

export default function CardItem({
  title,
  description,
  difficulty,
  effects = [],
  onClick,
}: CardItemProps) {
  const mainEffect =
    effects.length > 0
      ? effects.reduce((max, effect) =>
          effect.level > max.level ? effect : max,
        )
      : null;

  if (!mainEffect) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[443px] w-[260.63px] shrink-0 cursor-pointer overflow-hidden rounded-[12px]"
    >
      <img
        src={mainEffect.frame}
        alt=""
        className="absolute inset-0 h-full w-full object-fill"
      />

      <div className="absolute inset-0 flex flex-col items-center px-[30px] pt-[155px]">
        <h3 className="text-center absolute top-[180px] font-['KIMM'] text-[16px] font-bold leading-[24px] tracking-[-0.03em] text-black">
          {title}
        </h3>

        <p className="mt-[24px] absolute top-[205px] w-[180px] text-center font-['KIMM'] text-[10px] font-bold leading-[16px] tracking-[-0.03em] text-black">
          {description}
        </p>

        <div className="mt-auto mb-[80px] absolute top-[280px] flex flex-col items-center">
          <span className="font-['Pretendard'] text-[12px] font-semibold text-[#777777]">
            난이도
          </span>

          <div className="mt-[6px] flex gap-[3px]">
            {Array.from({ length: difficulty }).map((_, index) => (
              <img
                key={index}
                src="/images/star.svg"
                alt="별"
                className="h-[13px] w-[13px]"
              />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
