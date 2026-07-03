export interface EffectType {
  effectTypeId: number;
  name: string;
  level: number;
}

export interface PrimaryEffect {
  effectTypeId: number;
  name: string;
  color: string;
  icon: string;
}

export interface SurvivalCard {
  cardId: number;
  title: string;
  description: string;
  recommendedSituation: string;
  difficulty: number;
  imageUrl: string;
  status: 'UNSENT' | string;
  primaryEffect: PrimaryEffect;
  effects: EffectType[];
  createdAt: string;
}

// 카드 저장 요청 body
export interface CreateSurvivalCardRequest {
  title: string;
  description: string;
  recommendedSituation: string;
  difficulty: number;
  primaryEffectTypeId: number;
  imageUrl: string;
  imageKey: string;
  effects: {
    effectTypeId: number;
    level: number;
    displayOrder: number;
  }[];
  favorite: boolean;
  folderId: number;
  newFolderName: string;
  newFolderColor: string;
}

// 카드 저장 응답
export interface CreateSurvivalCardResponse {
  cardId: number;
  collectionCardId: number;
  status: 'UNSENT' | string;
  message: string;
}

export type CardStatus = 'UNSENT' | 'SENT' | 'DELETE';