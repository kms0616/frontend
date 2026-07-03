// import { useEffect, useState } from 'react';
// import { getEffectTypes } from '../api/effectType';
// import type { EffectType } from '../types/effectType';
// import { LOCAL_ICON_MAP } from '../constants/effects';

// export interface EffectTypeWithStyle extends EffectType {
//   localIcon?: string;
//   activeColor: string;
//   iconColor: string;
//   textColor: string;
// }

// export function useEffectTypes() {
//   const [effectTypes, setEffectTypes] = useState<EffectTypeWithStyle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getEffectTypes()
//       .then((data) => {
//         const merged = data.map((et) => {
//           const local = LOCAL_ICON_MAP[et.code];
//           return {
//             ...et,
//             localIcon: local?.icon,
//             activeColor: local?.activeColor ?? 'border-gray-300 bg-gray-50',
//             iconColor: local?.iconColor ?? 'bg-gray-300',
//             textColor: local?.textColor ?? 'text-gray-600',
//           };
//         });
//         setEffectTypes(merged);
//       })
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   const getById = (effectTypeId: number) =>
//     effectTypes.find((e) => e.effectTypeId === effectTypeId);

//   return { effectTypes, loading, error, getById };
// }