import * as prismic from '@prismicio/client'

export const repositoryName = 'animelist'

export const prismicClient = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
})