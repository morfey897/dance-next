import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'wrapper',
  title: 'Wrapper',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: Rule => Rule.regex(/\w{2,}/i).error(`A tag should be more than 2 characters and contain A-Z, a-z, 0-9, and '-'.`),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    })
  ],
  preview: {
    select: {
      code: 'code',
      description: 'description',
    },
    prepare: ({ description, code }) => {
      return {
        title: code,
        subtitle: description,
      }
    }
  }
})
