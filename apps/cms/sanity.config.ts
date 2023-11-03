import { SchemaTypeDefinition, defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { deskStructure, schemaTypes } from './src'
import { languageFilter } from '@sanity/language-filter'
import { LOCALES, DEFAULT_LOCALE } from "config";
import dictionary from "./src/i18n/language.json";

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE,

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,

  plugins: [
    visionTool(),
    deskTool({ structure: deskStructure, }),
    languageFilter({
      supportedLanguages: LOCALES.map(id => ({
        id,
        title: (dictionary as Record<string, string>)[id] || id,
      })),
      defaultLanguages: [DEFAULT_LOCALE],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        return !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name);
      }

    })
  ],

  schema: {
    types: schemaTypes.filter(({ type }) => type != 'divider') as SchemaTypeDefinition[],
  },
})
