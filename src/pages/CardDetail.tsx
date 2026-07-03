import React from 'react';

interface CardDetailProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: any;
}

const CardDetail: React.FC<CardDetailProps> = ({ isOpen, onClose, cardData }) => {
  if (!cardData) return null;

  return (
    <div className={`fixed inset-0 z-[70] flex justify-center items-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div 
        className={`relative w-[393px] bg-[#FFFFFF] rounded-t-[32px] transition-transform duration-500 ease-out transform overflow-y-auto flex flex-col ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: 'calc(100% - 45px)', maxHeight: '824px' }}
      >
        <main className="w-full mx-auto font-['Pretendard'] pb-[29px]">
          <header className='relative flex items-center justify-center w-full px-[20px] pt-[31px] pb-[30px]'>
                <h1 className="text-[18px] font-[600]">나의 카드</h1>            
                <button onClick={onClose} className="absolute right-[20px]">
                    <div>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="15.25" stroke="black" stroke-width="1.5"/>
                        <g clip-path="url(#clip0_60_8434)">
                        <path d="M22.75 9.25L9.25 22.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22.75 22.75L9.25 9.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_60_8434">
                        <rect width="24" height="24" fill="white" transform="translate(4 4)"/>
                        </clipPath>
                        </defs>
                        </svg>

                    </div>
                </button>
            </header>

          <section className="flex flex-col items-center">
            {/* 메세지 */}
            {cardData.description && (
              <div className="w-[353px] h-[90px] border border-black rounded-[24px] pl-[19px] py-[18px] mb-[25px]">
                <div className="flex items-center gap-[12px] mb-[5px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_60_9783)">
                        <path d="M21 5.25L12 13.5L3 5.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.3639 12L3.23145 18.5381" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.7687 18.5381L13.6362 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_60_9783">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                  <span className="text-[12px] font-[600] text-black">{cardData.author}님의 메세지</span>
                </div>
                <p className="text-[14px] font-[600] text-black leading-snug">
                  {cardData.description}
                </p>
              </div>
            )}

            {/* 임시 카드 */}
            <div className='w-[353px] h-[600px] bg-[#9BC3FE] rounded-[16px] relative overflow-hidden flex flex-col items-center p-[24px]'>
               
            
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CardDetail;