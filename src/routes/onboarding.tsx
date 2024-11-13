import OnboardingQuest from '@/components/pages/onboarding/OnboardingQuest';
import Image from '@/lib/Image';
import { createFileRoute } from '@tanstack/react-router';
import { Toaster } from 'sonner';

export const Route = createFileRoute('/onboarding')({
   component: Onboarding,
});

function Onboarding() {
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
                  <OnboardingQuest />
               </div>
            </section>
         </main>
         <Toaster position="top-center" richColors visibleToasts={1} />
      </div>
   );
}
