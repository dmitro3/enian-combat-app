import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import Image from '@/lib/Image';
import { FARMING_LIST } from '@/constant/core';
import { Button3D } from '@/components/ui/button-3d';
import Countdown from '@/lib/Countdown';
import {
   addCountdownConfig,
   addCountdownTotalTime,
   cn,
   sleep,
} from '@/lib/utils';
import party from 'party-js';
import MainLayout from '@/components/layouts/MainLayout';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import SelectFarming from '@/components/pages/gameplay/SelectFarming';
import FarmingBubble from '@/components/pages/gameplay/FarmingBubble';
import ResourceList from '@/components/pages/gameplay/ResourceList';
import { useMockStore } from '@/stores/mock.store';
import { DateTime } from 'luxon';
import { ResourceNameTypes } from '@/types/stores';
import { handleProcessFarming } from '@/lib/processFarming';
import { toast } from 'sonner';

export const Route = createFileRoute('/main')({
  component: Main,
})

function Main() {
  const [process, setProcess] = React.useState<'START' | 'PROCESS' | 'END'>(
     'START'
  );
  const [textRender, setTextRender] = React.useState('Start Farming');
  const [processPercentage, setProcessPercentage] = React.useState(0);
  const [openFarming, setOpenFarming] = React.useState(false);
  const [resource, setResource] = React.useState('');
  const {
     farming,
     setFarming,
     resource: localResource,
     setResource: setLocalResource,
     skill,
     setSkill,
  } = useMockStore();

  // set coutndown
  const [cd, setCd] = React.useState({
     hours: 0,
     minutes: 0,
     seconds: 0,
  });

  const textBtn = textRender;
  const prcntg = processPercentage;
  const countdown = cd;

  const handleProcess = async () => {
     const bubbles: NodeListOf<HTMLElement> =
        document.querySelectorAll('.bubble');

     switch (process) {
        case 'PROCESS':
           bubbles.forEach((bubble) => {
              // Remove the bubble after the confetti
              bubble.style.opacity = '100'; // Fade out animation
           });
           await sleep(500);
           setProcess('END');
           setTextRender('Claim Resource');
           setFarming({
              ...farming!,
              process: 'end',
           });

           break;

        case 'END':
           // break the bubble
           bubbles.forEach((bubble) => {
              party.sparkles(bubble, {
                 count: party.variation.range(1, 30), // Customize the amount of confetti
                 size: party.variation.range(0.2, 0.65),
              });

              // Remove the bubble after the confetti
              bubble.style.opacity = '0'; // Fade out animation
           });

           // handle exp + get resource after claim
           handleProcessFarming(
              farming,
              skill,
              setSkill,
              localResource,
              setLocalResource
           );

           await sleep(500);
           setProcess('START');
           setTextRender('Start Farming');
           setResource('');
           setFarming({
              ...farming!,
              process: 'idle',
           });

           break;

        default:
           const endTime = DateTime.now().plus({ minutes: 1 }).toMillis();
           const duration = addCountdownConfig(endTime);
           setCd(duration);
           setFarming({
              ...farming!,
              endTime,
              process: 'running',
              resource: resource as ResourceNameTypes,
              totalTime: addCountdownTotalTime(duration),
           });

           setProcess('PROCESS');
           setTextRender('Countdown');

           break;
     }
  };

  React.useEffect(() => {
     if (farming) {
        if (farming.process === 'running') {
           setProcess('PROCESS');
           setTextRender('Countdown');
           addCountdownConfig(farming.endTime, setCd);
           setResource(farming.resource);
        } else if (farming.process === 'end') {
           setProcess('END');
           setTextRender('Claim Resource');
           setResource(farming.resource);
        }
     }
  }, []);

  return (
     <>
        <MainLayout
           wrapperClassName="p-5 ty:gap-6 h-screen"
           navClassName="ty:pb-0"
        >
           <div className="flex flex-1 flex-col items-center justify-end">
              <div className="relative mb-4 w-full ty:mb-[1.375rem]">
                 <Image
                    src="/assets/original/knight.png"
                    alt="knight"
                    width={328}
                    height={323}
                    className="mx-auto w-4/6 ty:w-auto"
                 />
                 {/* RESOURCES LIST */}
                 <ResourceList />

                 <>
                    {/* RESOURCE RESULT AFTER FARMING */}
                    <FarmingBubble
                       type={resource}
                       className={cn('bottom-[35%] left-[10%]', {
                          'opacity-100': process === 'END',
                       })}
                    />
                    <FarmingBubble
                       type={resource}
                       className={cn(
                          'bottom-[20%] right-[23%] [animation-delay:2s]',
                          {
                             'opacity-100': process === 'END',
                          }
                       )}
                    />
                    <FarmingBubble
                       type={resource}
                       className={cn(
                          'bottom-[48%] right-[3%] [animation-delay:1s]',
                          {
                             'opacity-100': process === 'END',
                          }
                       )}
                    />
                 </>
              </div>
              {/* START FARMING */}
              <Button3D
                 onClick={() => {
                    if (process === 'END') {
                       handleProcess();
                       return;
                    }
                    setOpenFarming(true);
                 }}
                 disabled={process === 'PROCESS'}
                 btnClassName={cn({
                    'bg-pushable-process-gradient relative':
                       process === 'PROCESS',
                 })}
                 percentage={(100 - prcntg).toString()}
              >
                 {process === 'PROCESS' ? (
                    <Countdown
                       hours={countdown.hours}
                       minutes={countdown.minutes}
                       seconds={countdown.seconds}
                       totalCountdownTime={farming?.totalTime}
                       onCountdownFinished={() => handleProcess()}
                       onPercentage={(percentage) => {
                          setProcessPercentage(Number(percentage));
                       }}
                    />
                 ) : (
                    textBtn
                 )}
              </Button3D>
           </div>
        </MainLayout>

        {/* OPEN FARMING MODAL */}
        <Dialog open={openFarming} onOpenChange={setOpenFarming}>
           <DialogContent
              className="p-3"
              iconImageUrl="/assets/pickaxe.svg"
              iconClassName="size-[52px]"
           >
              <VisuallyHidden.Root>
                 <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                       Make changes to your profile here. Click save when
                       you're done.
                    </DialogDescription>
                 </DialogHeader>
              </VisuallyHidden.Root>
              <div className="flex flex-col gap-3">
                 {FARMING_LIST.map((rsc, key) => (
                    <SelectFarming
                       key={key}
                       id={rsc.name}
                       value={rsc.name}
                       onChange={(value) => {
                          setResource(value);
                       }}
                       metadata={rsc}
                       checked={rsc.name === resource}
                    />
                 ))}
              </div>
              <div className="mt-6 space-y-3">
                 <Button3D
                    onClick={() => {
                       if (!resource) {
                          toast.error('Please select a resource');
                          return;
                       }
                       handleProcess();
                       setOpenFarming(false);
                    }}
                 >
                    Start Farming
                 </Button3D>
              </div>
           </DialogContent>
        </Dialog>
     </>
  );
}