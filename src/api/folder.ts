import type {
  FolderResponse,
  FolderCard,
  CreateFolderRequest,
  UpdateFolderRequest,
  AddCardToFolderRequest,
  AddCardToFolderResponse,
} from '../types/folder';

function authHeaders() {
  const userId = localStorage.getItem('userId');
  return { 'X-USER-ID': userId ?? '' };
}

// 폴더 목록 조회
export async function getFolders(): Promise<FolderResponse[]> {
  const res = await fetch('/api/folders', {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`폴더 목록 조회 실패: ${res.status}`);
  }

  return res.json();
}

// 폴더 생성
export async function createFolder(
  body: CreateFolderRequest,
): Promise<FolderResponse> {
  const res = await fetch('/api/folders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`폴더 생성 실패: ${res.status}`);
  }

  return res.json();
}

// 폴더 이름/색상 수정
export async function updateFolder(
  folderId: number,
  body: UpdateFolderRequest,
): Promise<FolderResponse> {
  const res = await fetch(`/api/folders/${folderId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`폴더 수정 실패: ${res.status}`);
  }

  return res.json();
}

// 폴더 삭제
export async function deleteFolder(folderId: number): Promise<{ message: string }> {
  const res = await fetch(`/api/folders/${folderId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`폴더 삭제 실패: ${res.status}`);
  }

  return res.json();
}

// 특정 폴더의 카드 목록 조회
export async function getFolderCards(
  folderId: number,
  effectTypeId?: number,
): Promise<FolderCard[]> {
  const query = effectTypeId !== undefined ? `?effectTypeId=${effectTypeId}` : '';

  const res = await fetch(`/api/folders/${folderId}/cards${query}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`폴더 카드 목록 조회 실패: ${res.status}`);
  }

  return res.json();
}

// 폴더에 카드 추가
export async function addCardToFolder(
  folderId: number,
  body: AddCardToFolderRequest,
): Promise<AddCardToFolderResponse> {
  const res = await fetch(`/api/folders/${folderId}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`폴더에 카드 추가 실패: ${res.status}`);
  }

  return res.json();
}