import { clsx, type ClassValue } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const letterFormatMoney = (num: number, digits = 1) => {
   const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
   ];
   const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
   const item = lookup
      .slice()
      .reverse()
      .find(function (item) {
         return num >= item.value;
      });
   return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0';
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function formatPrice(
   value: number,
   locale: string = 'en-US',
   currency: string = 'USD'
): string {
   return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
   }).format(value);
}

export function formatPriceWithoutSymbol(
   value: number,
   locale: string = 'id-ID'
): string {
   return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
   }).format(value);
}

export const addCountdownConfig = (
   endTimeMillis: number,
   updateFunc?: React.Dispatch<
      React.SetStateAction<{ hours: number; minutes: number; seconds: number }>
   >
) => {
   const now = DateTime.now();
   const endTime = DateTime.fromMillis(endTimeMillis);
   const { hours, minutes, seconds } = endTime
      .diff(now, ['hours', 'minutes', 'seconds'])
      .toObject();

   const countdown = {
      hours: Math.round(hours || 0),
      minutes: Math.round(minutes || 0),
      seconds: Math.round(seconds || 0),
   };

   if (updateFunc) {
      updateFunc(countdown);
   }

   return countdown;
};

export const addCountdownTotalTime = ({
   hours,
   minutes,
   seconds,
}: {
   hours: number;
   minutes: number;
   seconds: number;
}) => {
   return hours * 3600 + minutes * 60 + seconds;
};

export const formatLabelNumber = (value: number): string => {
   const suffixes = [
      '',
      'K',
      'M',
      'B',
      'T',
      'Q',
      'Qi',
      'S',
      'Sp',
      'O',
      'N',
      'D',
   ]; // Extending suffixes for larger numbers
   const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

   if (tier === 0) return value.toString();

   const suffix = suffixes[tier] || `e${tier * 3}`; // Use scientific notation for unsupported tiers
   const scale = Math.pow(10, tier * 3);
   const scaled = value / scale;

   return `${scaled.toFixed(1).replace(/\.0$/, '')}${suffix}`;
};
