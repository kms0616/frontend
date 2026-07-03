import React from 'react';
import FolderSelect from '../components/FolderSelect';

interface CardPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: {
    title: string;
    description: string;
    situation: string;
    effects: any;
    difficulty: number;
  };
}

const CardPreview: React.FC<CardPreviewProps> = ({ isOpen, onClose, cardData }) => {
    const [isFolderSelectOpen, setIsFolderSelectOpen] = React.useState(false);

    return (
        <div className={`fixed inset-0 z-50 flex justify-center items-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        <div 
            className={`relative w-[393px] bg-[#FBFBFB] rounded-t-[32px] transition-transform duration-500 ease-out transform overflow-y-auto flex flex-col ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{ height: 'calc(100% - 45px)'}}
        >
            <main className="w-full mx-auto font-['Pretendard'] pb-[32px]">
            <header className='relative flex items-center justify-center w-full px-[20px] pt-[31px] pb-[30px]'>
                <h1 className="text-[18px] font-[600]">미리보기</h1>            
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

                {/* 카드 임시 설정 */}
                <div className='w-[353px] h-[600px] bg-[#9BC3FE] rounded-[16px]'>
                
                </div>

                <button onClick={() => setIsFolderSelectOpen(true)}
                className="mt-[72px] w-[349px] rounded-[16px] bg-[#4759A6] text-white text-[20px] font-[600] py-[14px]">
                카드 저장하기
                </button>
            </section>
            </main>
        </div>
        <FolderSelect isOpen={isFolderSelectOpen} onClose={() => setIsFolderSelectOpen(false)} />
    </div>
    );
};

export default CardPreview;