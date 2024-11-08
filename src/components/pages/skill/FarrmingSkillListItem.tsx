import { Button3D } from '@/components/ui/button-3d';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import Image from '@/lib/Image';
import { cn } from '@/lib/utils';
import { FarmingSkillDataItem } from '@/types/skill';
import { useState } from 'react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { SkillTypes } from '@/types/stores';
import { toast } from 'sonner';
import { useMockStore } from '@/stores/mock.store';
import { calculateNextValue, getMinExpAllowedFastUpgrade } from '@/lib/formula';
import { handleFastUpgrade } from '@/lib/processFarming';
import { DateTime } from 'luxon';

interface FarmingSkillListItemProps {
   data: SkillTypes;
}

export default function FarmingSkillListItem({
   data,
}: FarmingSkillListItemProps) {
   const { skill, setSkill, profile, setProfile } = useMockStore();
   const [openUpgradeModal, setOpenUpgradeModal] = useState(false);

   return (
      <div
         className={cn(
            'w-limit max-w-screen-xs rounded-[8px] border-[0.5px] border-custom-blue bg-[radial-gradient(151.92%_127.02%_at_15.32%_21.04%,rgba(165,239,255,0.20)_0%,rgba(110,191,244,0.04)_77.08%,rgba(70,144,212,0.00)_100%)] shadow-2xl backdrop-blur-[6px]',
            'flex items-center justify-between gap-5 p-3 text-white'
         )}
      >
         <Image
            src={data.imageUrl}
            alt={data.name}
            className="h-[48px] w-[48px]"
         />
         <div className="flex w-full flex-col gap-0.5">
            <p className="whitespace-pre-wrap text-lg font-bold">
               {data.name} - Lv {data.level === 100 ? 'MAX' : data.level}
            </p>
            <p className="text-sm capitalize text-yellow-400">
               +{data.claimedResource} {data.resource}/8h
            </p>
         </div>

         <Button3D
            btnClassName="mt-3 w-fit"
            onClick={() => setOpenUpgradeModal(true)}
            textClassName="text-base py-1.5 px-4 -translate-y-1 capitalize"
         >
            Look
         </Button3D>

         {/* OPEN FARMING MODAL */}
         <Dialog open={openUpgradeModal} onOpenChange={setOpenUpgradeModal}>
            <DialogContent
               iconImageUrl={data.imageUrl}
               overlayClassName="place-items-start"
               className="mt-[122px] translate-y-[-20%] p-3"
            >
               <VisuallyHidden.Root>
                  <DialogHeader>
                     <DialogTitle>sr only</DialogTitle>
                     <DialogDescription>sr only</DialogDescription>
                  </DialogHeader>
               </VisuallyHidden.Root>
               <div className="flex flex-col gap-10 text-white">
                  <div className="flex flex-col items-center gap-2">
                     <p className="text-xl font-bold">
                        {data.name} - Lv{' '}
                        {data.level === 100 ? 'MAX' : data.level}
                     </p>
                     <p className="text-xs font-medium text-[#FFB961]">
                        {data.exp} / {data.expNeededToNextLevel}
                     </p>
                     <p className="text-center text-base">{data.desc}</p>
                  </div>
                  <div className="flex gap-2">
                     <div className="flex w-full flex-col gap-1 rounded-[8px] border border-black/0 bg-black/5 px-3.5 py-2 text-base font-bold text-white shadow-[0px_0px_13px_0px_rgba(0,0,0,0.80)_inset]">
                        <p className="text-xs font-medium text-[#FFB961]">
                           Next Level Benefit
                        </p>
                        <p className="text-base font-bold capitalize">
                           +{data.nextClaimedResource} {data.resource}/8h
                        </p>
                     </div>
                     <div className="flex w-full flex-col gap-1 rounded-[8px] border border-black/0 bg-black/5 px-3.5 py-2 text-base font-bold text-white shadow-[0px_0px_13px_0px_rgba(0,0,0,0.80)_inset]">
                        <p className="text-xs font-medium text-[#FFB961]">
                           Upgrade Cost
                        </p>
                        <p className="text-base font-bold">
                           {data.upgradeCost.toLocaleString()} Gold
                        </p>
                     </div>
                  </div>
               </div>
               <div className="mt-6">
                  <Button3D
                     btnClassName={cn({
                        'bg-pushable-process-gradient relative':
                           data.level === 1,
                     })}
                     disabled={data.level === 1}
                     percentage={data.level === 1 ? '100' : undefined}
                     onClick={() => {
                        if (data.exp < data.minExpAllowedFastUpgrade) {
                           toast.error('Not enough EXP to Fast Upgrade');
                           return;
                        }

                        // add transaction in gold
                        setProfile({
                           ...profile!,
                           metadata: {
                              gold: [
                                 ...profile?.metadata.gold!,
                                 {
                                    id: `fast-upgrade-${DateTime.now().toMillis()}`,
                                    value: -data.upgradeCost,
                                    status: 'claimed',
                                 },
                              ],
                           },
                        });

                        handleFastUpgrade(skill, setSkill, data);
                     }}
                  >
                     <span className={cn('relative z-[5] capitalize')}>
                        Fast Upgrade
                     </span>
                  </Button3D>
                  <p className="text-center text-xs font-medium text-[#FFB961]">
                     *Min. Exp Allowed to Fast Upgrade :{' '}
                     {data.minExpAllowedFastUpgrade} Exp
                  </p>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
}
