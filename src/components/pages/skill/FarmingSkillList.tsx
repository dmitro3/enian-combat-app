import { FarmingSkillDataItem } from '@/types/skill';
import FarmingSkillListItem from './FarrmingSkillListItem';
import { cn } from '@/lib/utils';
import { SkillTypes } from '@/types/stores';

interface FarmingSkillList {
   data: SkillTypes[];
   className?: string;
}

export default function FarmingSkillList({
   data,
   className,
}: FarmingSkillList) {
   return (
      <div
         className={cn(
            'no-scrollbar flex w-full flex-col gap-2 overflow-y-scroll transition',
            className
         )}
      >
         {data.map((item) => {
            return <FarmingSkillListItem key={item.name} data={item} />;
         })}
      </div>
   );
}
