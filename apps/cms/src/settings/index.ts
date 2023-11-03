import { defineField, defineType } from 'sanity';
import phone from "./phone";
import social from "./social";
import address from './address';
import { filterUnique } from '../utils/unique';

export const types = [phone, social, address];

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
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
      name: 'phones',
      title: 'Phones',
      type: 'array',
      of: [{
        type: 'reference', to: { type: 'phone' }, options: {
          filter: filterUnique()
        }
      }],
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [{
        type: 'reference', to: { type: 'social' }, options: {
          filter: filterUnique
        }
      }],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'reference',
      to: [{ type: 'address' }],
    }),
  ],

  options: {
    languageFilter: true,
  },
})