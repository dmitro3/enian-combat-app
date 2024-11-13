import { DEFAULT_RESOURCE, DEFAULT_SKILL } from '@/constant/store.const';
import {
   FarmingTypes,
   ProfileTypes,
   ResourceTypes,
   SkillTypes,
} from '@/types/stores';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MockState {
   profile: ProfileTypes | null;
   setProfile: (profile: ProfileTypes) => void;
   resource: ResourceTypes[];
   setResource: (resource: ResourceTypes[]) => void;
   skill: SkillTypes[];
   setSkill: (skill: SkillTypes[]) => void;
   farming: FarmingTypes | null;
   setFarming: (farming: FarmingTypes | null) => void;
}

// Persistent Zustand store for user data
export const useMockStore = create<MockState>()(
   persist(
      (set) => ({
         profile: {
            metadata: {
               gold: [],
            },
         },
         setProfile: (profile) => set({ profile }),
         resource: DEFAULT_RESOURCE,
         setResource: (resource) => set({ resource }),
         skill: DEFAULT_SKILL,
         setSkill: (skill) => set({ skill }),
         farming: null,
         setFarming: (farming) => set({ farming }),
      }),
      { name: 'enain-combat-mock' }
   )
);
