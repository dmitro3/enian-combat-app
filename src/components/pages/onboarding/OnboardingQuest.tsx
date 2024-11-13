import { handleProcessClaim } from '@/lib/processClaim';
import QuestCard from '../quest/QuestCard';
import { Button3D } from '@/components/ui/button-3d';
import { useMockStore } from '@/stores/mock.store';
import { QuestCardProps } from '@/types/quest';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

const ONBOARDING_QUEST: QuestCardProps['metadata'][] = [
   {
      id: 'join-enian-community',
      title: 'Join Enian Community',
      reward: '20000',
      type: 'telegram',
      url: 'https://t.me/EnianCombatCommunity',
   },
   {
      id: 'follow-enian-x',
      title: 'Follow Enian X',
      reward: '20000',
      type: 'x',
      url: 'https://x.com/eniancombat',
   },
];

export default function OnboardingQuest() {
   const router = useNavigate({
      from: '/onboarding',
   });
   const { profile, setProfile } = useMockStore();

   return (
      <div className="age-result-card w-full rounded-3xl rounded-b-none border border-black/0 bg-black/30 p-3">
         <div className="mb-3">
            <span className="age-result-title">ONE TIME QUEST</span>
            <p className="max-w-sm text-center text-sm font-normal">
               Complete the quests below to continue playing this game
            </p>
         </div>
         <div className="grid w-full gap-2">
            {ONBOARDING_QUEST.map((quest, key) => {
               const check = profile?.metadata.gold.find(
                  (q) => q.id === quest.id
               );
               console.log(`quest ${check?.id} already clicked`);
               return (
                  <QuestCard
                     key={key}
                     metadata={quest}
                     questType={check ? check.status : 'start'}
                     onClick={() =>
                        handleProcessClaim(check!, quest, profile, setProfile)
                     }
                  />
               );
            })}
         </div>
         <Button3D
            btnClassName="mt-6"
            onClick={() => {
               const checkMission = profile?.metadata.gold.filter(
                  (q) =>
                     ['join-enian-community', 'follow-enian-x'].includes(
                        q.id
                     ) && q.status === 'claimed'
               );

               if (checkMission && checkMission.length < 2) {
                  toast.error('Please complete the quests first');
                  return;
               }

               setProfile({
                  ...profile!,
               });

               router({
                  to: '/main',
               });
            }}
         >
            Continue
         </Button3D>
      </div>
   );
}
