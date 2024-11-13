import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Image from '@/lib/Image';
import {
   sleep,
} from '@/lib/utils';
import Counting from '@/components/pages/onboarding/Counting';
import { Toaster } from '@/components/ui/sonner';

export const Route = createFileRoute('/')({
   component: Loading,
});

function Loading() {
   const [loadingWidth, setLoadingWidth] = React.useState(0);
   const navigate = useNavigate({ from: '/' });

   React.useEffect(() => {
      const initLoading = async () => {
         await sleep(2000);
         setLoadingWidth(20);
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
                  <Counting
                     loadingWidth={loadingWidth}
                     onEnd={() => navigate({
                        to: '/onboarding',
                     })}
                  />
               </div>
            </section>
         </main>
         <Toaster position="top-center" richColors visibleToasts={1} />
      </div>
   );
}
