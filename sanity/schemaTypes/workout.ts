import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  icon: () => '💪',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      description: 'The Clerk user ID associated with this workout',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Workout Date',
      description: 'The date of the workout',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      description: 'Total duration of the workout in seconds',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'exercises',
      title: 'Workout Exercises',
      description: 'Exercises performed in this workout',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'workoutExercise',
          title: 'Workout Exercise ',
          description: 'Reference to an exercise document',
          fields: [
            defineField({
              name: 'exercise',
              title: 'Exercise',
              type: 'reference',
              to: [{type: 'exercise'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sets',
              title: 'Sets',
              description: 'Number of sets performed for this exercise',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'excerciseSet',
                  title: 'Exercise Set',
                  fields: [
                    defineField({
                      name: 'reps',
                      title: 'Reps',
                      description: 'Number of repetitions for this set',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(1),
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      description: 'Weight used for this set',
                      type: 'number',
                      validation: (Rule) => Rule.min(0),
                    }),
                    defineField({
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      description: 'Unit of weight used for this set',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Kilograms (kg)', value: 'kg'},
                          {title: 'Pounds (lbs)', value: 'lbs'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'lbs',
                    }),
                  ],
                  preview: {
                    select: {
                      reps: 'reps',
                      weight: 'weight',
                      weightUnit: 'weightUnit',
                    },
                    prepare(selection) {
                      const {reps, weight, weightUnit} = selection
                      return {
                        title: `Set: ${reps} reps`,
                        subtitle: `Weight: ${weight} ${weightUnit}`,
                      }
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'exercise.name',
              setsArray: 'sets',
            },
            prepare(selection) {
              const {title, setsArray} = selection
              const setsCount = setsArray?.length || 0

              return {
                title: title || 'Unnamed Exercise',
                subtitle: `${setsCount} set${setsCount === 1 ? '' : 's'}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      date: 'date',
      duration: 'duration',
      exercises: 'exercises',
    },
    prepare(selection) {
      const {date, duration, exercises} = selection

      return {
        title: date ? `Workout on ${new Date(date).toLocaleDateString()}` : 'Workout (no date)',
        subtitle: `${exercises.length || 0} exercises • ${duration || 0}s`,
      }
    },
  },
})
