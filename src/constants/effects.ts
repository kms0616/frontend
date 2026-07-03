import snowIcon from "../assets/snow.svg";
import brainIcon from "../assets/brain.svg";
import powerIconn from "../assets/power.svg";
import capitalIcon from "../assets/capital.svg";
import patienceIcon from "../assets/patience.svg";

// 실제 값 확인 완료 (GET /api/effect-types 응답 기준)
export const EFFECT_OPTIONS = [
  { id: "cooling", effectTypeId: 1, label: "냉각력", activeColor: "border-[#00B8ED] bg-[#E5F7FE]", iconColor: "bg-[#00B8ED]", textColor: "text-[#00B8ED]", icon: snowIcon },
  { id: "mental", effectTypeId: 2, label: "정신력", activeColor: "border-[#A27DDB] bg-[#F3EDFD]", iconColor: "bg-[#A27DDB]", textColor: "text-[#A27DDB]", icon: brainIcon },
  { id: "stamina", effectTypeId: 3, label: "체력", activeColor: "border-[#00C772] bg-[#E4FAED]", iconColor: "bg-[#00C772]", textColor: "text-[#00C772]", icon: powerIconn },
  { id: "wealth", effectTypeId: 4, label: "자본력", activeColor: "border-[#FFA300] bg-[#FFF5DE]", iconColor: "bg-[#FFA300]", textColor: "text-[#FFA300]", icon: capitalIcon },
  { id: "endurance", effectTypeId: 5, label: "인내력", activeColor: "border-[#FC504C] bg-[#FEE]", iconColor: "bg-[#FC504C]", textColor: "text-[#FC504C]", icon: patienceIcon },
];

export function getEffectMeta(effectTypeId: number) {
  return EFFECT_OPTIONS.find((o) => o.effectTypeId === effectTypeId);
}