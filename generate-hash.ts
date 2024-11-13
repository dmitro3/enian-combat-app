import { mockTgInitDataRaw } from '@/data/mocks/telegram';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const main = async () => {
   const initData = new URLSearchParams(mockTgInitDataRaw);

   const dataToCheck = [...initData.entries()]
      .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
      .sort()
      .join('\n');

   const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(process.env.TELEGRAM_BOT_TOKEN as string)
      .digest();
   const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataToCheck)
      .digest('hex');

   console.log('hash:', computedHash);
};

main()
   .catch((error) => {
      console.error(error);
   })
   .finally(() => {
      process.exit(1);
   });
