// GET /api/folders 응답 아이템
export interface FolderResponse {
  folderId: number;
  name: string;
  color: string;
  cardCount: number;
}

// 화면에서 쓰는 형태
export interface Folder {
  id: number;
  name: string;
  color: string;
  cardCount: number;
}

// GET /api/folders/{folderId}/cards 응답 아이템
export interface FolderCard {
  collectionCardId: number;
  cardId: number;
  title: string;
  description: string;
  imageUrl: string;
  primaryEffect: {
    effectTypeId: number;
    name: string;
    color: string;
    icon: string;
  };
}

// POST /api/folders 요청 바디
export interface CreateFolderRequest {
  name: string;
  color: string;
}

// PATCH /api/folders/{folderId} 요청 바디
export interface UpdateFolderRequest {
  name: string;
  color: string;
}

// POST /api/folders/{folderId}/cards 요청 바디
export interface AddCardToFolderRequest {
  collectionCardId: number;
}

// POST /api/folders/{folderId}/cards 응답
export interface AddCardToFolderResponse {
  folderId: number;
  collectionCardId: number;
  message: string;
}