import { defineType, Rule as ValidationRule } from 'sanity';
import { LOCALES, DEFAULT_LOCALE } from "config";
import dictionary from "../i18n/language.json";

function capitalize(str: string | undefined) {
  str = str || "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const localeFactory = (type: 'string' | 'text' | 'blockContent') => ({
  title: `Localized ${type}`,
  name: `locale${capitalize(type)}`,
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: LOCALES.map(lang => ({
    title: (dictionary as Record<string, string>)[lang] || lang,
    name: lang,
    type: type,
    fieldset: lang === DEFAULT_LOCALE ? undefined : 'translations',
    validation: (Rule: ValidationRule) => Rule.custom<string>((value, context) => {
      if (context.type?.name !== 'string' && context.type?.name !== 'text') return true;
      if (lang === DEFAULT_LOCALE) {
        if (!value) return {
          message: `Can't be empty`,
        };
        if (value.trim().length < 4) return {
          message: `Should type more than 3 symbols`,
        };
      }
      return true;
    }),
  }))
})



export const localeString = defineType(localeFactory('string'));
export const localeText = defineType(localeFactory('text'));
export const localeBlockContent = defineType(localeFactory('blockContent'));
