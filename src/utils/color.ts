// 헥스 색상을 흰색과 섞어서 연하게 만듦 (frontColor 대체용)
export function lightenColor(hex: string, amount = 0.75): string {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) return hex; // 형식이 다르면 원본 그대로 반환

  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);

  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * amount);

  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}