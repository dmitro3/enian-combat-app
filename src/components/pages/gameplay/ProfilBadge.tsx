import Image from '@/lib/Image';
import ResourceCard from './ResourceCard';
import { useMockStore } from '@/stores/mock.store';
import { useEffect, useState } from 'react';

export default function ProfilBadge() {
   const { profile } = useMockStore();
   const [total, setTotal] = useState(0);
   useEffect(() => {
      if (profile) {
         // Calculate total value for claimed rewards
         const totalClaimedValue = profile.metadata.gold.reduce((acc, gold) => {
            // Only add to the total if the status is "claimed"
            if (gold.status === 'claimed') {
               return acc + Number(gold.value);
            }
            return acc;
         }, 0);

         setTotal(totalClaimedValue);
      }
   }, [profile]);

   const totalResource = total;

   return (
      <div className="mb-2 flex items-center justify-between">
         <Image
            src="/assets/profile-badge.svg"
            alt="profile"
            width={60}
            height={50}
         />
         <div className="">
            <ResourceCard
               size={50}
               item={{
                  img: '/assets/original/resource/gold.png',
                  name: 'gold',
               }}
               className="h-[3.2rem] gap-4"
               textClassName="py-[1.125rem] pr-7 text-lg"
               total={totalResource}
            />
         </div>
      </div>
   );
}
