import React, { useState } from 'react';
import CardDetail from './CardDetail';

export default function FolderDetail() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const tags = [
    { id: "cooling", label: "냉각력", borderColor: "border-[#0DBAEE]", bgColor: 'bg-[#E5F7FE]' },
    { id: "mental", label: "정신력", borderColor: "border-[#A27DDB]", bgColor: 'bg-[#F3EDFD]'},
    { id: "stamina", label: "체력", borderColor: "border-[#00C772]", bgColor: 'bg-[#E4FAED]' },
    { id: "wealth", label: "자본력", borderColor: "border-[#FFA300]", bgColor: 'bg-[#FFF5DE]' },
    { id: "endurance", label: "인내력", borderColor: "border-[#FC504C]", bgColor: 'bg-[#FEE]' },
  ];

  // 더미 데이터
  const cards = [
    {
      id: 1,
      title: "아이스 아메리카노 방어술",
      description: "일단 손에 차가운 걸 쥐고 있어야 오늘을 시작할 수 있다",
      date: "2026.07.01",
      author: "반쯤 녹은 우산",
      cardBg: "bg-[#FFF]", 
      accentColor: "bg-[#9AD0FF]",
      // 필터링 테스트를 위한 효과도 임시로 추가
      effects: ["cooling", "mental"],
    },
    {
      id: 2,
      title: "에어컨 명당 사수법",
      description: "바람이 가장 잘 오는 자리를 찾아 조용히 하루를 버틴다.",
      date: "2026.07.01",
      author: "둥근해또떴네",
      cardBg: "bg-[#FFF]",
      accentColor: "bg-[#FFD0D0]",
      effects: ["cooling", "endurance"],
    },
    {
      id: 3,
      title: "택시비 플렉스",
      description: "너무 더울 땐 그냥 택시를 타자. 내 지갑 눈 감아...",
      date: "2026.07.02",
      author: "텅장요정",
      cardBg: "bg-[#FFF]",
      accentColor: "bg-[#FFA300]",
      effects: ["wealth"],
    }
  ];

  const filteredCards = activeFilter 
    ? cards.filter(card => card.effects.includes(activeFilter))
    : cards;

  const handleTagClick = (tagId: string) => {
    setActiveFilter(prev => prev === tagId ? null : tagId);
  };

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setIsCardOpen(true);
  };

  return (
    <>
    <main className="mx-auto w-[393px] h-[881px] bg-[#FBFBFB] rounded-[48px] overflow-y-auto font-['Pretendard'] relative shadow-lg">
      <header className='flex items-center w-full px-[20px] py-[8px] mt-[54px] mb-[24px]'>
        <button className="mr-auto">
          <div>
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.3257 0.481935C10.9819 1.09717 10.9819 2.13623 10.3257 2.75147L5.51318 7.59131L20.2788 7.59131C21.1812 7.59131 21.8921 8.30225 21.8921 9.20459C21.8921 10.0933 21.1812 10.8042 20.2788 10.8179L5.51318 10.8179L10.3257 15.6577C10.9819 16.273 10.9819 17.2983 10.3257 17.8999C9.71045 18.5562 8.68506 18.5562 8.0835 17.8999L0.481933 10.3257C-0.160645 9.71045 -0.160645 8.68506 0.481933 8.05615L8.08349 0.481935C8.68506 -0.160643 9.71045 -0.160643 10.3257 0.481935Z" fill="#C7C7C9"/>
            </svg>
          </div>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[18px] font-[600]">즐겨찾기</h1>
      </header>

      {/* 필터 태그 */}
      <section className="px-[20px] mb-[24px]">
        <div className="flex gap-[8px] overflow-x-auto scrollbar-hide pb-[4px]">
          {tags.map((tag) => {
            const isActive = activeFilter === tag.id;
            
            return (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag.id)}
                className={`shrink-0 px-[14px] py-[6px] rounded-[16px] border ${tag.borderColor} text-[14px] font-[600] text-[#222] transition-colors ${
                  isActive ? tag.bgColor : 'bg-white border-dashed'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 카드 리스트 */}
      <section className="px-[20px] flex flex-col gap-[8px] pb-[40px]">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div 
              key={card.id} 
              onClick={() => handleCardClick(card)}
              className={`w-full h-[116px] rounded-[16px] border border-black px-[31px] py-[10px] relative overflow-hidden ${card.cardBg} cursor-pointer hover:opacity-90 transition-opacity`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-[12px] border-r border-black ${card.accentColor}`} />
              
              <h3 className="text-[24px] font-[700] text-black leading-tight truncate">
                {card.title}
              </h3>
              <p className="text-[12px] font-[400] text-[#000] mt-[8px] leading-snug line-clamp-2">
                {card.description}
              </p>
              
              <div className="flex justify-between items-center mt-[16px] text-[12px] text-[#C7C7C9]">
                <span>{card.date}</span>
                <span>from. {card.author}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-[40px] text-[#888] text-[14px]">
            해당하는 효과의 카드가 없습니다.
          </div>
        )}
      </section>
    </main>
    <CardDetail
    isOpen={isCardOpen}
    onClose={() => setIsCardOpen(false)}
    cardData={selectedCard}
    />

    </>
   
  );
}