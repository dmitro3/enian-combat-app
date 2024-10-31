import Counting from '@/components/pages/onboarding/Counting';
import OnboardingQuest from '@/components/pages/onboarding/OnboardingQuest';
import StarterResource from '@/components/pages/onboarding/StarterResource';
import Image from '@/lib/Image';
import { sleep } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { Toaster } from 'sonner';

export const Route = createFileRoute('/onboarding')({
   component: Onboarding,
});

function Onboarding() {
   const [loadingWidth, setLoadingWidth] = React.useState(0);
   const [initProcess, setInitProcess] = React.useState<
      'init' | 'result' | 'mission'
   >('init');

   const runInitProcess = initProcess;

   React.useEffect(() => {
      const initLoading = async () => {
         if (initProcess !== 'init') return;
         await sleep(2000);
         setLoadingWidth(100);
      };
      initLoading();
   }, []);

   return (
      <div className="flex flex-1 flex-col">
         <main className="flex-1 overflow-y-auto">
            <section className="w-limit bg-splash relative flex flex-1 flex-col gap-3">
               <div className="flex items-center justify-center">
                  <Image
                     src="/assets/logo.png"
                     alt="logo enian combat"
                     className="w-3/4"
                  />
               </div>
               <div className="flex flex-1 flex-col items-center justify-end">
                  {runInitProcess === 'init' && (
                     <Counting
                        loadingWidth={loadingWidth}
                        onEnd={() => setInitProcess('result')}
                     />
                  )}

                  {runInitProcess === 'result' && (
                     <StarterResource
                        onClick={() => setInitProcess('mission')}
                     />
                  )}

                  {runInitProcess === 'mission' && <OnboardingQuest />}
               </div>
            </section>
         </main>
         <Toaster position="top-center" richColors visibleToasts={1} />
      </div>
   );
}
