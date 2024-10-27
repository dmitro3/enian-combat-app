import { clsx, type ClassValue } from 'clsx';
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
