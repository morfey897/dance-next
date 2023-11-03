import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { filterUnique } from '../utils/unique'
import { DEFAULT_LOCALE } from 'config'

export default defineType({
  name: 'asset',
  title: 'Asset',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'alt',
      title: 'Alt',
      type: 'localeString'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{
        type: 'reference', to: { type: 'tag' }, options: {
          filter: filterUnique()
        }
      }],
    }),
  ],
  preview: {
    select: {
      title: `alt.${DEFAULT_LOCALE}`,
      media: 'image.asset',
      tag0: 'tags.0.tag',
      tag1: 'tags.1.tag',
      tag2: 'tags.2.tag',
    },
    prepare: ({ title, media, tag0, tag1, tag2 }) => {
      return {
        title,
        media,
        subtitle: [tag0, tag1, tag2].filter((a: string) => !!a).map((a: string) => `#${a}`).join(','),
      }
    }
  },
  options: {
    languageFilter: true,
  },
})
