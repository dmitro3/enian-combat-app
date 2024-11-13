import { Button3D } from '@/components/ui/button-3d';
import NumberTicker from '@/components/ui/number-ticker';
import { ONBOARDING_RESOURCES } from '@/constant/core';
import Image from '@/lib/Image';
import { useMockStore } from '@/stores/mock.store';
import { StarterResourceProps } from '@/types/onboarding';

export default function StarterResource(props: StarterResourceProps) {
   const { setProfile, profile } = useMockStore();

   return (
      <div className="flex w-full flex-col items-center px-3 pb-5">
         <div className="age-result-card mb-2">
            <span className="age-result-title">Your Telegram Age</span>
            <h4 className="text-shadow-age-result text-xl tracking-[0.4px]">
               <NumberTicker value={4} className="age-big text-white" />
               Years <NumberTicker value={8} className="age-big text-white" />
               Month <NumberTicker value={10} className="age-big text-white" />
               Day
            </h4>
         </div>
         <div className="age-result-card">
            <span className="age-result-title mb-3">Free Starter Resource</span>
            <div className="flex items-center justify-center">
               {ONBOARDING_RESOURCES.map((resource) => (
                  <div
                     key={resource.name}
                     className="flex items-start justify-center gap-3"
                  >
                     <Image
                        src={resource.img}
                        alt={resource.name}
                        width={56}
                        height={56}
                     />
                     <div className="flex flex-col text-left font-bold text-white">
                        <span className="tracing-[0.24px] mt-1 text-xs/none capitalize">
                           {resource.name}
                        </span>
                        <div className="tracing-[0.48px] mt-2 text-2xl/none">
                           <NumberTicker
                              value={Number(resource.total)}
                              className="text-white"
                           />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <Button3D
            btnClassName="mt-3.5"
            onClick={() => {
               const check = profile?.metadata.gold?.find(
                  (q) => q.id === 'starter-resource'
               );
               if (!check) {
                  setProfile({
                     metadata: {
                        gold: [
                           {
                              id: 'starter-resource',
                              value: 12000,
                              status: 'claimed',
                           },
                        ],
                     },
                  });
               }
               props.onClick?.();
            }}
         >
            Continue
         </Button3D>
      </div>
   );
}
