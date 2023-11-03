import { defineField, defineType } from 'sanity'
import { BillIcon } from '@sanity/icons'
import { filterUnique } from '../utils/unique';
import { DEFAULT_LOCALE, CURRENCIES } from 'config';
import dictionary from "../i18n/currency.json";

export default defineType({
  name: 'price',
  title: 'Price',
  type: 'document',
  icon: BillIcon,
  groups: [
    {
      name: 'money',
      title: 'Money',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Internal name',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
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
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'money',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Old price',
      type: 'number',
      group: 'money',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      group: 'money',
      options: {
        list: CURRENCIES.map((token) => ({
          value: token.toUpperCase(), title: (dictionary as Record<string, string>)[token] || token
        }))
      }
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      group: 'money',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'labels',
      title: 'Tabels',
      type: 'array',
      group: 'money',
      of: [{
        type: 'reference', to: { type: 'tag' }, options: {
          filter: filterUnique()
        }
      }],
    }),
  ],
  initialValue: {
    currency: 'UAH',
    amount: 1,
  },
  preview: {
    select: {
      title: 'name',
      subtitle: `headline.${DEFAULT_LOCALE}`,
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      }
    },
  },

  options: {
    languageFilter: true,
  },
})
