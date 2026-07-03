import React, { useEffect, useState } from "react";
import { getFolders } from "../api/folder";
import type { FolderResponse } from "../types/folder";

interface FolderSelectProps {
  isOpen: boolean;
  onClose: () => void;
  // 부모(CardPreview)가 실제 저장 API를 호출할 수 있도록 선택 결과를 전달
  onSelect: (folderId: number | null, newFolderName?: string) => void;
  isSaving?: boolean;
}

const FolderSelect: React.FC<FolderSelectProps> = ({
  isOpen,
  onClose,
  onSelect,
  isSaving = false,
}) => {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderInput, setNewFolderInput] = useState("");

  // selectedFolderId: null = "전체"(폴더 없이 저장), 숫자 = 기존 폴더, "new" = 새 폴더 입력 중
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [pendingNewFolderName, setPendingNewFolderName] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    getFolders()
      .then((data) => {
        setFolders(data);
        setLoadError(null);
      })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, [isOpen]);

  const handleFolderClick = (folderId: number | null) => {
    setSelectedFolderId(folderId);
    setPendingNewFolderName(null);
    setIsAddingFolder(false);
  };

  const handleAddFolderClick = () => {
    setIsAddingFolder(true);
    setSelectedFolderId(null);
  };

  const handleConfirmNewFolder = () => {
    const trimmed = newFolderInput.trim();
    if (!trimmed) return;
    setPendingNewFolderName(trimmed);
    setIsAddingFolder(false);
  };

  const handleCancelNewFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingFolder(false);
    setNewFolderInput("");
  };

  const handleSave = () => {
    if (pendingNewFolderName) {
      onSelect(null, pendingNewFolderName);
    } else {
      // selectedFolderId가 null이면 "전체" = 폴더 없이 저장 → folderId 0
      onSelect(selectedFolderId ?? 0);
    }
  };

  if (!isOpen) return null;

  const isAllSelected = selectedFolderId === null && !pendingNewFolderName;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="w-[352px] bg-white rounded-[24px] px-[24px] pb-[24px] pt-[32px] transition-all duration-300 font-['Pretendard']">
        <div className="flex justify-between items-center mb-[16px]">
          <h2 className="text-[18px] font-[600] text-[#222]">폴더 선택</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.75 5.25L5.25 18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.75 18.75L5.25 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex max-h-[280px] flex-col gap-[8px] mb-[8px] overflow-y-auto">
          {/* 전체 = 폴더 지정 없이 저장 */}
          <button
            onClick={() => handleFolderClick(null)}
            className={`flex items-center justify-between w-full h-[56px] px-[16px] rounded-[16px] border ${
              isAllSelected ? "border-[#F3E888] bg-[#FFF5DE]" : "border-[#000] bg-white"
            }`}
          >
            <div className="flex items-center gap-[8px]">
              <span className="text-[20px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 4.67001V16.74C22 17.7 21.22 18.6 20.26 18.72L19.93 18.76C17.75 19.05 14.39 20.16 12.47 21.22C12.21 21.37 11.78 21.37 11.51 21.22L11.47 21.2C9.54997 20.15 6.20003 19.05 4.03003 18.76L3.73999 18.72C2.77999 18.6 2 17.7 2 16.74V4.66C2 3.47 2.96997 2.57001 4.15997 2.67001C6.25997 2.84001 9.43997 3.90003 11.22 5.01003L11.47 5.16C11.76 5.34 12.24 5.34 12.53 5.16L12.7 5.05001C13.33 4.66001 14.13 4.27001 15 3.92001V8.00002L17 6.67001L19 8.00002V2.78005C19.27 2.73005 19.53 2.70002 19.77 2.68002H19.83C21.02 2.58002 22 3.47001 22 4.67001Z" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5.48999V20.49" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 2.78003V8L17 6.66998L15 8V3.91998C16.31 3.39998 17.77 2.98003 19 2.78003Z" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[16px] font-[700]">전체</span>
            </div>
            <CheckBadge active={isAllSelected} />
          </button>

          {/* 실제 폴더 목록 */}
          {loading && (
            <p className="py-[12px] text-center text-[14px] text-[#888]">폴더 불러오는 중...</p>
          )}
          {loadError && (
            <p className="py-[12px] text-center text-[14px] text-red-500">{loadError}</p>
          )}
          {!loading &&
            !loadError &&
            folders.map((folder) => {
              const isActive = selectedFolderId === folder.folderId;
              return (
                <button
                  key={folder.folderId}
                  onClick={() => handleFolderClick(folder.folderId)}
                  className={`flex items-center justify-between w-full h-[56px] px-[16px] rounded-[16px] border ${
                    isActive ? "border-[#F3E888] bg-[#FFF5DE]" : "border-[#E5E5E5] bg-white"
                  }`}
                >
                  <div className="flex items-center gap-[8px]">
                    <span
                      className="h-[20px] w-[20px] rounded-full border border-black"
                      style={{ backgroundColor: folder.color }}
                    />
                    <span className="text-[16px] font-[500]">{folder.name}</span>
                    <span className="text-[12px] text-[#999]">({folder.cardCount})</span>
                  </div>
                  <CheckBadge active={isActive} />
                </button>
              );
            })}

          {/* 새로 만들 폴더가 선택된 상태 표시 */}
          {pendingNewFolderName && (
            <div className="flex items-center justify-between w-full h-[56px] px-[16px] rounded-[16px] border border-[#F3E888] bg-[#FFF5DE]">
              <span className="text-[16px] font-[700]">{pendingNewFolderName} (새 폴더)</span>
              <CheckBadge active />
            </div>
          )}
        </div>

        {/* 폴더 추가 */}
        <div className="w-full border border-dashed border-[#888] rounded-[16px] px-[21px] py-[14px] mb-[20px] transition-all duration-300">
          <button
            onClick={handleAddFolderClick}
            className="flex justify-between items-center w-full text-[#888]"
          >
            <span className="text-[16px] pl-[5px] font-[700]">폴더 추가</span>
            <span className="pr-[5px]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_60_10346)">
                  <path d="M2.5 8H13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 2.5V13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_60_10346">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </button>

          {isAddingFolder && (
            <div className="flex flex-col gap-[20px]">
              <input
                type="text"
                value={newFolderInput}
                onChange={(e) => setNewFolderInput(e.target.value)}
                placeholder="내 폴더 이름"
                className="w-full h-[48px] bg-[#F5F5F5] rounded-[12px] px-[16px] mt-[10px] outline-none text-[16px]"
              />
              <div className="flex justify-end gap-[8px]">
                <button
                  onClick={handleConfirmNewFolder}
                  className="w-[54px] h-[40px] px-[10px] py-[8px] rounded-[24px] bg-[#F3E888] border border-[#000] text-[#000] font-[600] text-[16px]"
                >
                  추가
                </button>
                <button
                  onClick={handleCancelNewFolder}
                  className="w-[54px] h-[40px] px-[10px] py-[8px] rounded-[24px] bg-[#DFDFDF] border border-[#000] text-[#000] font-[600] text-[16px]"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full h-[56px] bg-[#4759A6] text-white rounded-[16px] text-[18px] font-[600] disabled:opacity-50"
        >
          {isSaving ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </div>
  );
};

function CheckBadge({ active }: { active: boolean }) {
  return (
    <div
      className={`flex items-center justify-center w-[24px] h-[24px] rounded-full shrink-0 ${
        active ? "bg-[#FFD600]" : "bg-[#D9D9D9]"
      }`}
    >
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.517334 3.62066L2.93113 6.03445L8.44837 0.517212"
          stroke="white"
          strokeWidth="1.03448"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default FolderSelect;
