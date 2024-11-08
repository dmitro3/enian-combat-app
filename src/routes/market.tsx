import MainLayout from '@/components/layouts/MainLayout';
import ResourceList from '@/components/pages/gameplay/ResourceList';
import MarketCard from '@/components/pages/market/MarketCard';
import BattleSkillComingSoon from '@/components/pages/skill/BattleSkillComingSoon';
import Menu from '@/components/ui/menu';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/market')({
   component: Market,
});

const tabsMenu = [
   { label: 'Wood', key: 'wood' },
   { label: 'Iron', key: 'iron' },
   { label: 'Leather', key: 'leather' },
];

const MarketListData: { [x: string]: any } = {
   'wood': [
      {
         boughtQty: 100,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 1000,
         soldImg: '/assets/original/resource/raw-wood.svg',
      },
      {
         boughtQty: 1000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 10000,
         soldImg: '/assets/original/resource/raw-wood.svg',
      },
      {
         boughtQty: 5000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 50000,
         soldImg: '/assets/original/resource/raw-wood.svg',
      },
      {
         boughtQty: 10000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 100000,
         soldImg: '/assets/original/resource/raw-wood.svg',
      },
      {
         boughtQty: 50000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 500000,
         soldImg: '/assets/original/resource/raw-wood.svg',
      },
      {
         boughtQty: 100000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 1000000,
         soldImg: '/assets/original/resource/raw-wood.svg',
      },
   ],
   'iron': [
      {
         boughtQty: 100,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 1000,
         soldImg: '/assets/original/resource/raw-iron.svg',
      },
      {
         boughtQty: 1000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 10000,
         soldImg: '/assets/original/resource/raw-iron.svg',
      },
      {
         boughtQty: 5000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 50000,
         soldImg: '/assets/original/resource/raw-iron.svg',
      },
      {
         boughtQty: 10000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 100000,
         soldImg: '/assets/original/resource/raw-iron.svg',
      },
      {
         boughtQty: 50000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 500000,
         soldImg: '/assets/original/resource/raw-iron.svg',
      },
      {
         boughtQty: 100000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 1000000,
         soldImg: '/assets/original/resource/raw-iron.svg',
      },
   ],
   'leather': [
      {
         boughtQty: 100,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 1000,
         soldImg: '/assets/original/resource/raw-leather.svg',
      },
      {
         boughtQty: 1000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 10000,
         soldImg: '/assets/original/resource/raw-leather.svg',
      },
      {
         boughtQty: 5000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 50000,
         soldImg: '/assets/original/resource/raw-leather.svg',
      },
      {
         boughtQty: 10000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 100000,
         soldImg: '/assets/original/resource/raw-leather.svg',
      },
      {
         boughtQty: 50000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 500000,
         soldImg: '/assets/original/resource/raw-leather.svg',
      },
      {
         boughtQty: 100000,
         boughtImg: '/assets/original/resource/raw-gold.svg',
         soldQty: 1000000,
         soldImg: '/assets/original/resource/raw-leather.svg',
      },
   ],
}

function Market() {
   const [selectedTab, setSelectedTab] = useState(tabsMenu[0].key);

   return (
      <MainLayout
         wrapperClassName="p-5 ty:gap-6 h-screen"
         navClassName="ty:pb-0"
         bgUrl="/assets/background/forest.png"
      >
         <div className="flex h-full flex-col gap-6 relative">
            <Menu
               menus={tabsMenu}
               selected={selectedTab}
               onSelected={(value) => setSelectedTab(value)}
               activeLayoutId="skill-menu"
            />
            <div className="w-full grid grid-cols-3 gap-3">
               {MarketListData?.[selectedTab]?.length > 0 && MarketListData[selectedTab].map((item: any) => (
                  <MarketCard
                     boughtImg={item.boughtImg}
                     boughtQty={item.boughtQty}
                     soldImg={item.soldImg}
                     soldQty={item.soldQty}
                  />
               ))}
            </div>
            <ResourceList />
         </div>
      </MainLayout>
   );
}
