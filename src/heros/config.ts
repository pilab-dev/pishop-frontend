import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Centered Impact',
          value: 'centeredImpact',
        },
        {
          label: 'Side-by-side',
          value: 'sideBySide',
        },
        {
          label: 'Tech Hero',
          value: 'techHero',
        },
      ],
      required: true,
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'standard',
      label: 'Style',
      options: [
        {
          label: 'Standard',
          value: 'standard',
        },
        {
          label: 'Card',
          value: 'card',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'techHero',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'centeredImpact', 'sideBySide', 'techHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
