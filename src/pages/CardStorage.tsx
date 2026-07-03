import React, { useState } from 'react';

// 폴더 데이터 타입 정의
interface Folder {
  id: number;
  name: string;
  bgColor: string;
  frontColor: string;
  cardCount: number;
  createdAt: number;
  updatedAt: number;
}

interface CardStorageProps {
  onFolderClick?: (folderName: string) => void;
}

export default function CardStorage({ onFolderClick }: CardStorageProps) {
  // 🔥 정렬과 수정 모드를 위해 더미 데이터에 속성(카드 수, 생성일, 수정일) 추가
  const [folders, setFolders] = useState<Folder[]>([
    { id: 1, name: '기본 폴더', bgColor: 'bg-[#FF7474]', frontColor: 'bg-[#FBB]', cardCount: 5, createdAt: 1700000000000, updatedAt: 1700000000000 },
    { id: 2, name: '해본 카드', bgColor: 'bg-[#E1D145]', frontColor: 'bg-[#F3E888]', cardCount: 12, createdAt: 1700000000001, updatedAt: 1700000005000 },
    { id: 3, name: '즐겨찾기', bgColor: 'bg-[#9AD0FF]', frontColor: 'bg-[#CDE7FE]', cardCount: 3, createdAt: 1700000000002, updatedAt: 1700000001000 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // 🔥 새로 추가된 상태들
  const [sortBy, setSortBy] = useState<'creation' | 'update'>('creation');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [editFolderName, setEditFolderName] = useState("");

  // 정렬 로직
  const sortedFolders = [...folders].sort((a, b) => {
    if (sortBy === 'creation') return b.createdAt - a.createdAt;
    if (sortBy === 'update') return b.updatedAt - a.updatedAt;
    return 0;
  });

  // 폴더 추가 핸들러
  const handleAddFolder = () => {
    if (newFolderName.trim() !== '') {
      const now = Date.now();
      setFolders((prev) => [
        ...prev,
        {
          id: now,
          name: newFolderName.trim(),
          bgColor: 'bg-[#B4D9A7]', 
          frontColor: 'bg-[#D5EBD0]',
          cardCount: 0, // 기본 카드 수 0
          createdAt: now,
          updatedAt: now,
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

  // 🔥 폴더 저장 및 삭제 핸들러
  const handleSaveChanges = () => {
    if (editingFolder) {
      setFolders(folders.map(f => 
        f.id === editingFolder.id 
          ? { ...f, name: editFolderName, updatedAt: Date.now() } 
          : f
      ));
      setEditingFolder(null);
      setIsEditMode(false);
    }
  };

  const handleDeleteFolder = () => {
    if (editingFolder) {
      setFolders(folders.filter(f => f.id !== editingFolder.id));
      setEditingFolder(null);
      setIsEditMode(false);
    }
  };

  const cardBorderPath = "M6.51572 7.41901C8.33211 5.27477 8.44669 2.51023 8.44669 1.17008L135.026 0.5C134.837 2.06351 134.913 5.7266 136.729 7.87084C138.545 10.0151 142.027 10.1044 143.54 9.88107V180.119C142.594 179.896 140.135 179.985 137.864 182.129C135.594 184.273 135.405 187.936 135.594 189.5H7.87907C7.87907 187.713 8.52096 185.118 6.51572 182.35C4.7955 179.976 1.82445 180.119 0.5 180.119V9.88107C1.63524 10.1044 4.69933 9.56326 6.51572 7.41901Z";

  return (
    <>
      <main className="mx-auto w-[393px] h-[881px] bg-[#FBFBFB] rounded-[48px] overflow-y-auto font-['Pretendard'] relative shadow-lg">
      
        <header className='flex items-center justify-between w-full px-[20px] py-[8px] mt-[54px] mb-[24px] relative'>
          <button className="z-10 p-2 -ml-2">
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.3257 0.481935C10.9819 1.09717 10.9819 2.13623 10.3257 2.75147L5.51318 7.59131L20.2788 7.59131C21.1812 7.59131 21.8921 8.30225 21.8921 9.20459C21.8921 10.0933 21.1812 10.8042 20.2788 10.8179L5.51318 10.8179L10.3257 15.6577C10.9819 16.273 10.9819 17.2983 10.3257 17.8999C9.71045 18.5562 8.68506 18.5562 8.0835 17.8999L0.481933 10.3257C-0.160645 9.71045 -0.160645 8.68506 0.481933 8.05615L8.08349 0.481935C8.68506 -0.160643 9.71045 -0.160643 10.3257 0.481935Z" fill="#C7C7C9"/>
            </svg>
          </button>
          
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[18px] font-[600]">보관함</h1>
            <button 
            onClick={() => setIsEditMode(!isEditMode)} 
            className={`z-10 p-2 -mr-2 transition-colors ${isEditMode ? 'bg-gray-200 rounded-full' : ''}`}
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_60_15475)">
                <path d="M9 20.2501H4.5C4.30109 20.2501 4.11032 20.1711 3.96967 20.0305C3.82902 19.8898 3.75 19.699 3.75 19.5001V15.3104C3.75009 15.1118 3.82899 14.9213 3.96938 14.7807L15.5306 3.2195C15.6713 3.07895 15.862 3 16.0608 3C16.2596 3 16.4503 3.07895 16.5909 3.2195L20.7806 7.40637C20.9212 7.54701 21.0001 7.7377 21.0001 7.93653C21.0001 8.13535 20.9212 8.32605 20.7806 8.46668L9 20.2501Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.25 20.25H9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.75 6L18 11.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_60_15475">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>

            </button>
        </header>

        <section className="px-[20px] mb-[24px] flex gap-[8px]">
          <button 
            onClick={() => setSortBy('creation')}
            className={`px-[14px] py-[6px] rounded-[16px] border text-[14px] font-[600] transition-colors ${
              sortBy === 'creation' ? 'border-black text-black bg-white' : 'border-[#C7C7C9] text-[#888888] bg-transparent'
            }`}
          >
            생성순
          </button>
          <button 
            onClick={() => setSortBy('update')}
            className={`px-[14px] py-[6px] rounded-[16px] border text-[14px] font-[600] transition-colors ${
              sortBy === 'update' ? 'border-black text-black bg-white' : 'border-[#C7C7C9] text-[#888888] bg-transparent'
            }`}
          >
            업데이트 순
          </button>
        </section>

        {/* {isEditMode && (
          <p className="px-[20px] mb-[12px] text-[12px] text-red-500 font-[600] animate-pulse">
            수정할 폴더를 선택해주세요.
          </p>
        )} */}

        <section className="px-[20px] grid grid-cols-2 gap-x-[16px] gap-y-[32px] pb-[40px]">
          
          {sortedFolders.map((folder) => (
            <div key={folder.id}
              onClick={() => {
                if (isEditMode) {
                  setEditingFolder(folder);
                  setEditFolderName(folder.name);
                } else {
                  onFolderClick && onFolderClick(folder.name);
                }
              }}
              className={`relative w-full aspect-[3/4] mt-[12px] cursor-pointer ${isEditMode ? 'hover:scale-105 transition-transform' : ''}`}
            >
              <div className={`absolute top-[-27px] left-[0%] right-[0%] bottom-[27px] rounded-[24px] border border-black ${folder.bgColor}`} />
              <div className={`absolute top-[-18px] left-[0%] right-[0%] bottom-[18px] rounded-[24px] border border-black ${folder.bgColor}`} />
              <div className={`absolute top-[-9px] left-[0%] right-[0%] bottom-[9px] rounded-[24px] border border-black ${folder.bgColor}`} />
              
              <div className={`w-[169px] h-[215px] absolute inset-0 rounded-[24px] border border-black ${folder.frontColor} relative flex flex-col items-center justify-center overflow-hidden`}>
                <svg className="absolute inset-0 w-full h-full p-[6px]" viewBox="0 0 145 190" fill="none" preserveAspectRatio="none">
                  <path d={cardBorderPath} stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>

                <div className="relative z-10 flex flex-col items-center justify-center gap-[16px]">
                  <div className="mb-[40px] w-[73px] h-[1px] bg-black" />
                  <div className={`flex items-center justify-center w-fit px-[10px] py-[4px] border border-black rounded-[4px] ${folder.bgColor}`}> 
                    <span className="text-[12px] font-[600] text-black tracking-tight whitespace-nowrap leading-none">{folder.name}</span>
                  </div>
                  <div className="mt-[40px] w-[73px] h-[1px] bg-black" />
                </div>
              </div>
            </div>
          ))}

          <div 
            className={`relative w-full aspect-[3/4] mt-[12px] opacity-[0.3] ${isEditMode ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => {
              if (!isEditMode && !isAdding) setIsAdding(true);
            }}
          >
            <div className="absolute top-[-27px] left-[0%] right-[0%] bottom-[27px] rounded-[24px] border border-[#000] bg-[#999]" />
            <div className="absolute top-[-18px] left-[0%] right-[0%] bottom-[18px] rounded-[24px] border border-[#000] bg-[#999]" />
            <div className="absolute top-[-9px] left-[0%] right-[0%] bottom-[9px] rounded-[24px] border border-[#000] bg-[#999]" />
            
            <div className="w-[169px] h-[215px] absolute inset-0 rounded-[16px] border border-[#000] bg-[#F5F5F5] relative flex flex-col items-center justify-center overflow-hidden">
              <svg className="absolute inset-0 w-full h-full p-[6px]" viewBox="0 0 145 190" fill="none" preserveAspectRatio="none">
                <path d={cardBorderPath} stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>

              <div className="relative z-10 flex flex-col items-center justify-center w-full px-[10px]">
                <div className="mb-[40px] w-[73px] h-[1px] bg-[#000]" />
                
                {!isAdding ? (
                  <div className="flex flex-col items-center gap-[8px]">
                    <div className="w-[32px] h-[32px] rounded-full border-[1.5px] border-[#000] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2.5 8H13.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 2.5V13.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[12px] font-[600] text-[#000]">폴더 추가</span>
                  </div>
                ) : (
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

      {editingFolder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center max-w-[393px] mx-auto w-full h-full">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditingFolder(null)} />
        
          <div className="relative w-[320px] bg-white rounded-[24px] p-[24px] font-['Pretendard']">
            
            <div className="flex justify-between items-center mb-[20px]">
              <h2 className="text-[18px] font-[700] text-black">수정 및 삭제</h2>
              <button onClick={() => setEditingFolder(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.75 5.25L5.25 18.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.75 18.75L5.25 5.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 수정 */}
            <input 
              type="text" 
              value={editFolderName}
              onChange={(e) => setEditFolderName(e.target.value)}
              className="w-full h-[48px] px-[16px] border border-black rounded-[12px] mb-[12px] text-[16px] font-[600] outline-none focus:ring-1 focus:ring-black"
            />

            <div className="w-full h-[48px] px-[16px] border border-black rounded-[12px] mb-[24px] flex justify-between items-center bg-white">
              <span className="text-[16px] font-[600] text-black">카드 수</span>
              <span className="text-[16px] font-[700] text-black">{editingFolder.cardCount}</span>
            </div>

            <div className="flex gap-[12px]">
              <button 
                onClick={handleDeleteFolder}
                className="flex-1 h-[52px] bg-[#5465A9] rounded-[12px] text-white text-[16px] font-[600] active:scale-95 transition-transform"
              >
                삭제하기
              </button>
              <button 
                onClick={handleSaveChanges}
                className="flex-1 h-[52px] bg-[#F5E674] rounded-[12px] text-[#222] text-[16px] font-[600] active:scale-95 transition-transform border border-black"
              >
                저장하기
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}