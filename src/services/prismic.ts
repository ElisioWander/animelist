import * as prismic from "@prismicio/client";

const endPoint = 'animelist';

export const prismicClient = prismic.createClient(endPoint, {
  accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN,

  routes: [
    {
      type: 'post',
      path: '/'
    }
  ]
});
