import Image from '@/lib/Image';
import { cn, formatPriceWithoutSymbol } from '@/lib/utils';
import QuestCardButton from './QuestCard.Button';
import { CaretDoubleRight, CheckFat } from '@phosphor-icons/react';
import { Button3D } from '@/components/ui/button-3d';
import { QuestCardProps } from '@/types/quest';
import QuestCardIcon from './QuestCard.Icon';

export default function QuestCard({
   onClick,
   className,
   btnClassName,
   questType = 'start',
   metadata,
}: QuestCardProps) {
   return (
      <>
         <div
            className={cn(
               'shadow-[0px_0px_13px_0px_rgba(0,0,0,0.80) inset] flex items-center justify-between gap-3 rounded-xl border border-gray-600 bg-black/10 p-4 backdrop-blur',
               className
            )}
         >
            <div className="flex items-start space-x-4">
               <div className="size-[3.125rem] min-w-[3.125rem]">
                  <QuestCardIcon type={metadata.type} />
               </div>
               <div className="flex flex-col text-white">
                  <h3 className="text-shadow-age-title text-left text-sm font-bold">
                     {metadata.title}
                  </h3>
                  <div className="flex items-center text-xs font-bold">
                     <Image
                        alt="gold"
                        src="/assets/original/resource/raw-gold.svg"
                        width={24}
                        height={24}
                        className="mr-1.5"
                     />
                     +{formatPriceWithoutSymbol(Number(metadata.reward))} Gold
                  </div>
               </div>
            </div>
            {questType !== 'claim' ? (
               <>
                  <QuestCardButton
                     onClick={onClick}
                     className={cn(btnClassName, {
                        'p-3': questType === 'claimed',
                     })}
                     disabled={questType === 'claimed'}
                  >
                     {questType === 'start' && (
                        <>
                           GO
                           <CaretDoubleRight
                              size={16}
                              weight="bold"
                              className="ml-1.5"
                           />
                        </>
                     )}
                     {questType === 'verify' && 'VERIFY'}
                     {questType === 'claimed' && (
                        <>
                           <CheckFat size={16} weight="fill" />
                        </>
                     )}
                  </QuestCardButton>
               </>
            ) : (
               <Button3D
                  btnClassName="mt-3 w-fit"
                  onClick={onClick}
                  textClassName="text-base py-1.5 px-4"
               >
                  Claim
               </Button3D>
            )}
         </div>
      </>
   );
}
