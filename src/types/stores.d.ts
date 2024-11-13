export type Gold = {
   id: string;
   value: string | number;
   status?: 'claim' | 'claimed';
};

export type ProfileTypes = {
   metadata: {
      gold: Gold[];
   };
};

export type ResourceTypes = {
   id: string;
   name: string;
   total: number | string;
};

export type ResourceNameTypes = 'wood' | 'iron' | 'leather';

export type SkillTypes = {
   id: string;
   name: string;
   level: number;
   claimedResource: string | number;
   nextClaimedResource: string | number;
   upgradeCost: number;
   exp: number;
   expNeededToNextLevel: number;
   desc: string;
   imageUrl: string;
   resource: ResourceNameTypes;
   minExpAllowedFastUpgrade: number;
};

export type FarmingTypes = {
   process: 'idle' | 'running' | 'end';
   endTime: number;
   totalTime: number;
   resource: ResourceNameTypes;
};
