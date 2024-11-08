import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Menu {
   label: string;
   key: string;
}

interface Props {
   menus: Menu[];
   selected: string;
   onSelected: (val: string) => void;
   activeLayoutId: string;
}

const Menu = (props: Props) => {
   const { menus, selected, onSelected, activeLayoutId } = props;

   return (
      <div
         className={`border-custom-blue flex w-full rounded-[50px] border bg-opacity-20 p-2 text-center font-medium text-white backdrop-blur-[6px]`}
      >
         {menus.map((item) => {
            const isSelected = item.key === selected;
            return (
               <button
                  key={item.key}
                  className={`relative w-full rounded-full p-3 hover:cursor-pointer`}
                  onClick={() => onSelected(item.key)}
               >
                  {isSelected && (
                     <motion.div
                        layoutId={activeLayoutId}
                        className={`absolute inset-0`}
                        style={{
                           borderRadius: 9999,
                           boxShadow: '-1px -1px 0px 2px #FFFFFF40 inset, 0px 0px 0px 2px #29BFDA33, 0px 2px 8px 0px #00000066',
                           border: '1px solid #FFFFFF33',
                           background: 'linear-gradient(0deg,#14B9D6,#14B9D6),linear-gradient(180deg,rgba(255,255,255,0.3)7.29%,rgba(255,255,255,0)65.62%)',
                        }}
                        transition={{ type: 'spring', duration: 0.6 }}
                     />
                  )}
                  <span className="relative z-10 text-lg font-bold drop-shadow-md">
                     {item.label}
                  </span>
               </button>
            );
         })}
      </div>
   );
};

export default Menu;
