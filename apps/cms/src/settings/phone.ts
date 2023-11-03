import { defineField, defineType } from 'sanity';
import { MobileDeviceIcon } from '@sanity/icons'

export default defineType({
  name: 'phone',
  title: 'Phone',
  type: 'document',
  icon: MobileDeviceIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      options: {
        list: [
          { value: '+380', title: 'Ukraine (+380)' }
        ]
      }
    }),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      validation: (Rule) => Rule.regex(/^\d{9}$/i).error(`A number should have only 9 numbers`),
    })
  ],
  preview: {
    select: {
      code: 'code',
      number: 'number',
    },
    prepare: ({ code, number }) => {
      const n = String(number);
      return {
        title: code + " " + '(' + n.slice(0, 2) + ')' + " " + n.slice(2, 5) + '-' + n.slice(5, 7) + '-' + n.slice(7, 9),
      }
    }
  }
});