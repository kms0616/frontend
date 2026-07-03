import type { EffectType } from '../types/effectType';

export async function getEffectTypes(): Promise<EffectType[]> {
  const res = await fetch('/api/effect-types');

  if (!res.ok) {
    throw new Error(`효과 유형 조회 실패: ${res.status}`);
  }

  const data: EffectType[] = await res.json();
  return data.sort((a, b) => a.displayOrder - b.displayOrder);
}