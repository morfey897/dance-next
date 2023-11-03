import { PageParams } from '@/types/params';
import { DEFAULT_LOCALE } from 'config';
import { promises as fs } from 'fs';
import { flatten } from 'flat';

export async function getTranslation(context: PageParams) {
  const locale = context?.params?.locale || DEFAULT_LOCALE;

  const data: Record<string, any> = {};
  try {
    const fileNames = await fs.readdir(process.cwd() + '/src/i18n');
    for (const name of fileNames) {
      try {
        const file = await fs.readFile(process.cwd() + `/src/i18n/${name}`, 'utf8');
        const [fName] = name.split('.');
        const fileData = JSON.parse(file);
        data[fName] = {
          ...fileData[locale]
        };
      } catch (error) {
        console.warn(`${name} ${(error as unknown as Error).message}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
  return flatten<any, Record<string, string>>(data);
}