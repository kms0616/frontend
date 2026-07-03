import React, { useState } from 'react';

export default function CardStorage() {
  const [folders, setFolders] = useState([
    { id: 1, name: '기본 폴더', bgColor: 'bg-[#FF7474]', frontColor: 'bg-[#FBB]' },
    { id: 2, name: '해본 카드', bgColor: 'bg-[#E1D145]', frontColor: 'bg-[#F3E888]' },
    { id: 3, name: '즐겨찾기', bgColor: 'bg-[#9AD0FF]', frontColor: 'bg-[#CDE7FE]' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = () => {
    if (newFolderName.trim() !== '') {
      setFolders((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newFolderName.trim(),
          bgColor: 'bg-[#B4D9A7]', 
          frontColor: 'bg-[#D5EBD0]',
        },
      ]);
    }
    setNewFolderName('');
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddFolder();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewFolderName('');
    }
  };

  const cardBorderPath = "M6.51572 7.41901C8.33211 5.27477 8.44669 2.51023 8.44669 1.17008L135.026 0.5C134.837 2.06351 134.913 5.7266 136.729 7.87084C138.545 10.0151 142.027 10.1044 143.54 9.88107V180.119C142.594 179.896 140.135 179.985 137.864 182.129C135.594 184.273 135.405 187.936 135.594 189.5H7.87907C7.87907 187.713 8.52096 185.118 6.51572 182.35C4.7955 179.976 1.82445 180.119 0.5 180.119V9.88107C1.63524 10.1044 4.69933 9.56326 6.51572 7.41901Z";

  return (
    <main className="mx-auto w-[393px] h-[881px] bg-[#FBFBFB] rounded-[48px] overflow-y-auto font-['Pretendard'] relative shadow-lg">
      
      {/* 헤더 영역 */}
      <header className='flex items-center w-full px-[20px] py-[8px] mt-[54px] mb-[70px]'>
        <button className="mr-auto">
          <div>
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.3257 0.481935C10.9819 1.09717 10.9819 2.13623 10.3257 2.75147L5.51318 7.59131L20.2788 7.59131C21.1812 7.59131 21.8921 8.30225 21.8921 9.20459C21.8921 10.0933 21.1812 10.8042 20.2788 10.8179L5.51318 10.8179L10.3257 15.6577C10.9819 16.273 10.9819 17.2983 10.3257 17.8999C9.71045 18.5562 8.68506 18.5562 8.0835 17.8999L0.481933 10.3257C-0.160645 9.71045 -0.160645 8.68506 0.481933 8.05615L8.08349 0.481935C8.68506 -0.160643 9.71045 -0.160643 10.3257 0.481935Z" fill="#C7C7C9"/>
            </svg>
          </div>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[18px] font-[600]">보관함</h1>
      </header>

      {/* 폴더 그리드 영역 */}
      <section className="px-[20px] mt-[10px] grid grid-cols-2 gap-x-[16px] gap-y-[32px] pb-[40px]">
        
        {/* 1. 생성된 폴더들 렌더링 */}
        {folders.map((folder) => (
          <div key={folder.id} className="relative w-full aspect-[3/4] mt-[12px] cursor-pointer">
            <div className={`absolute top-[-27px] left-[0%] right-[0%] bottom-[27px] rounded-[24px] border border-black ${folder.bgColor}`} />
            <div className={`absolute top-[-18px] left-[0%] right-[0%] bottom-[18px] rounded-[24px] border border-black ${folder.bgColor}`} />
            <div className={`absolute top-[-9px] left-[0%] right-[0%] bottom-[9px] rounded-[24px] border border-black ${folder.bgColor}`} />
            
            <div className={`w-[169px] h-[215px] absolute inset-0 rounded-[24px] border border-black ${folder.frontColor} relative flex flex-col items-center justify-center overflow-hidden`}>
              <svg 
                className="absolute inset-0 w-full h-full p-[6px]" 
                viewBox="0 0 145 190" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path d={cardBorderPath} stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>

              <div className="relative z-10 flex flex-col items-center justify-center gap-[16px]">
                <div className="mb-[40px] w-[73px] h-[1px] bg-black" />
                <div className="flex items-center justify-center w-fit px-[10px] py-[4px] border border-black bg-transparent rounded-[4px]">
                  <span className="text-[12px] font-[600] text-black tracking-tight whitespace-nowrap leading-none">{folder.name}</span>
                </div>
                <div className="mt-[40px] w-[73px] h-[1px] bg-black" />
              </div>
            </div>
          </div>
        ))}

        {/* 2. 폴더 추가 버튼 */}
        <div 
          className="relative w-full aspect-[3/4] mt-[12px] cursor-pointer opacity-[0.3]"
          onClick={() => {
            if (!isAdding) setIsAdding(true);
          }}
        >
            <div className="absolute top-[-27px] left-[0%] right-[0%] bottom-[27px] rounded-[24px] border border-[#000] bg-[#999]" />
            <div className="absolute top-[-18px] left-[0%] right-[0%] bottom-[18px] rounded-[24px] border border-[#000] bg-[#999]" />
            <div className="absolute top-[-9px] left-[0%] right-[0%] bottom-[9px] rounded-[24px] border border-[#000] bg-[#999]" />
            
            <div className="w-[169px] h-[215px] absolute inset-0 rounded-[16px] border border-[#000] bg-[#F5F5F5] relative flex flex-col items-center justify-center overflow-hidden">
            
            <svg 
                className="absolute inset-0 w-full h-full p-[6px]" 
                viewBox="0 0 145 190" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path d={cardBorderPath} stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>

            {/* 내부 콘텐츠 분기 처리 */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full px-[10px]">
              <div className="mb-[40px] w-[73px] h-[1px] bg-[#000]" />
              
              {!isAdding ? (
                // 2-A. 기본 '폴더 추가' 상태
                <div className="flex flex-col items-center gap-[8px]">
                  <div className="w-[32px] h-[32px] rounded-full border-[1.5px] border-[#000] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 8H13.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2.5V13.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[12px] font-[600] text-[#000]">폴더 추가</span>
                </div>
              ) : (
                // 2-B. 클릭 후 '입력 모드' 상태
                <div className="flex flex-col items-center gap-[8px] w-full">
                  <input
                    autoFocus
                    type="text"
                    placeholder="폴더 이름을 입력해주세요."
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleAddFolder}
                    className="w-full text-center text-[10px] bg-transparent text-[#000] font-[600] outline-none pb-[2px] placeholder:text-[#666]"
                  />
                </div>
              )}

              <div className="mt-[40px] w-[73px] h-[1px] bg-[#000]" />
            </div>

          </div>
        </div>
        
      </section>
    </main>
  );
}