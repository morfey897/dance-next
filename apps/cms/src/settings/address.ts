import { defineField, defineType } from 'sanity';
import { PinIcon } from '@sanity/icons'
import { DEFAULT_LOCALE } from 'config';

export default defineType({
  name: 'address',
  title: 'Address',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'place',
      title: 'Place',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'localeString',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'localeString',
    }),
    defineField({
      name: 'street',
      title: 'Street',
      type: 'localeString',
    }),
    defineField({
      name: 'building',
      title: 'Building',
      type: 'localeString',
    }),
    defineField({
      name: 'district',
      title: 'District',
      type: 'localeString',
    }),
    defineField({
      name: 'geo',
      title: 'Geo position',
      type: 'geopoint',
    }),
  ],
  preview: {
    select: {
      place: 'place',
      country: `country.${DEFAULT_LOCALE}`,
      city: `city.${DEFAULT_LOCALE}`,
      street: `street.${DEFAULT_LOCALE}`,
      building: `building.${DEFAULT_LOCALE}`,
    },
    prepare: ({ place, country, city, street, building }) => {
      return {
        title: place,
        subtitle: [building, street, city, country].filter(a => !!a).join(" ")
      }
    }
  },

  options: {
    languageFilter: true,
  },
});