import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { filterUnique } from "../utils/unique";
import { DEFAULT_LOCALE } from 'config';

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  icon: ComponentIcon,
  groups: [
    {
      name: 'divisions',
      title: 'Divisions',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Internal name',
      type: 'string',
    }),
    defineField({
      name: 'menuName',
      title: 'Menu',
      type: 'localeString',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor',
      type: "reference",
      to: { type: 'tag' },
    }),
    defineField({
      name: 'wrapper',
      title: 'Wrapper',
      type: "reference",
      to: { type: 'wrapper' },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'reference',
        to: { type: 'asset' },
        options: {
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
      name: 'callToAction',
      title: 'Call to action',
      type: 'reference',
      to: { type: 'callToAction' },
    }),
    defineField({
      name: 'filterDivisions',
      title: 'Filter divisions',
      type: 'string',
      group: 'divisions',
      options: {
        list: [
          {
            title: '---', value: '',
          }, {
            title: 'Price', value: 'price',
          }, {
            title: 'Direction', value: 'direction',
          }
        ],
      }
    }),
    defineField({
      name: 'divisions',
      title: 'Divisions',
      type: 'array',
      group: 'divisions',
      of: [{
        type: 'reference',
        to: [{ type: 'direction' }, { type: 'price' }],
        options: {
          filter: filterUnique('filterDivisions')
        }
      }]
    })
  ],
  preview: {
    select: {
      title: `name`,
      subtitle: `headline.${DEFAULT_LOCALE}`,
      image: 'images.0.image',
    },
    prepare({ title, subtitle, image }) {
      return {
        title,
        subtitle,
        media: image,
      }
    },
  },
  options: {
    languageFilter: true,
  },
})
