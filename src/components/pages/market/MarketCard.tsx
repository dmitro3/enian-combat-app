import Image from "@/lib/Image";
import { cn, formatLabelNumber } from "@/lib/utils";

interface MarketCardProps {
  boughtQty?: number;
  soldQty?: number;
  boughtImg?: string;
  soldImg?: string;
}

const MarketCard: React.FC<MarketCardProps> = ({
  boughtQty = 0,
  soldQty = 0,
  boughtImg,
  soldImg,
}) => {
  return (
    <div className="border-custom-blue flex flex-col gap-2 w-full rounded-[8px] border bg-opacity-20 p-2 text-center font-medium bg-[radial-gradient(151.92%_127.02%_at_15.32%_21.04%,rgba(165,239,255,0.20)_0%,rgba(110,191,244,0.04)_77.08%,rgba(70,144,212,0.00)_100%)] text-white backdrop-blur-[24px]">
      <div className="flex flex-col items-center gap-2">
        {boughtImg && (
          <Image
            src={boughtImg}
            alt={'bought-image'}
            width={'60'}
            height={'60'}
          />
        )}
        <p className="text-lg">{formatLabelNumber(boughtQty)} Gold</p>
      </div>
      <button className="flex justify-center items-center bg-white/20 backdrop-blur-[12px] rounded-[50px] w-full py-1 px-2 gap-1 transition-transform duration-200 active:scale-90">
        {soldImg && (
          <Image
            src={soldImg}
            alt={'sold-image'}
            width={'24'}
            height={'24'}
          />
        )}
        <p className="text-base font-medium">{formatLabelNumber(soldQty)}</p>
      </button>
    </div>
  )
}

export default MarketCard;