import type {
  SurvivalCard,
  CreateSurvivalCardRequest,
  CreateSurvivalCardResponse,
  CardStatus,
} from '../types/survivalCard';

export async function getSurvivalCard(cardId: number): Promise<SurvivalCard> {
  const res = await fetch(`/api/survival-cards/${cardId}`);
  if (!res.ok) {
    throw new Error(`카드 조회 실패: ${res.status}`);
  }
  return res.json();
}

export async function createSurvivalCard(
  body: CreateSurvivalCardRequest,
): Promise<CreateSurvivalCardResponse> {
  const userId = localStorage.getItem('userId');

  const res = await fetch('/api/survival-cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-USER-ID': userId ?? '',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`카드 저장 실패: ${res.status}`);
  }

  return res.json();
}

export async function getMySurvivalCards(status?: CardStatus): Promise<SurvivalCard[]> {
  const userId = localStorage.getItem('userId');

  const query = status ? `?status=${status}` : '';

  const res = await fetch(`/api/survival-cards/me${query}`, {
    headers: {
      'X-USER-ID': userId ?? '',
    },
  });

  if (!res.ok) {
    throw new Error(`카드 목록 조회 실패: ${res.status}`);
  }

  return res.json();
}

export async function getMySurvivalCardCounts() {
  const all = await getMySurvivalCards(); // 전체
  const unsent = all.filter((c) => c.status === 'UNSENT');
  const sent = all.filter((c) => c.status === 'SENT');

  return {
    total: all.length,
    unsent: unsent.length, // 보낼 수 있는 카드
    sent: sent.length,
  };
}