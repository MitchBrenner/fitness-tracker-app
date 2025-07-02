import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  icon: () => '🏋️',
  fields: [
    defineField({
      name: 'name',
      title: 'Exercise Name',
      description: 'the name of the exercise that will be displayed to the users',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'a brief description of the exercise',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      description: 'the difficulty level of the exercise',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'an image representing the exercise',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'a short description of the image for accessibility purposes',
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'the URL of a video demonstrating the exercise',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: true}),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      description: 'indicates whether the exercise is currently active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'difficulty',
      media: 'image',
    },
  },
})
