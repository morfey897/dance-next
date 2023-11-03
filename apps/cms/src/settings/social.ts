import { defineField, defineType } from 'sanity';
import { EarthAmericasIcon } from '@sanity/icons'

export default defineType({
  name: 'social',
  title: 'Social',
  type: 'document',
  icon: EarthAmericasIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { value: 'instagram', title: 'Instagram' },
          { value: 'fb', title: 'Facebook' },
          { value: 'ticktok', title: 'TickTok' },
          { value: 'telegram', title: 'Telegram' },
          { value: 'viber', title: 'Viber' },
          { value: 'whatsapp', title: 'WhatsApp' },
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: Rule => Rule.required(),
    })
  ],
  preview: {
    select: {
      title: 'title',
      title2: 'type',
      subtitle: 'link',
    },
    prepare: ({ title, title2, subtitle }) => {
      return {
        title: title || title2,
        subtitle
      }
    }
  }
});