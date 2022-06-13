import { api } from "./services/axios";

const basicFetch = async (endpoint) => {
  const response = await api.get(`${endpoint}`);
  const data = await response.data.data;

  return data;
};

export async function getHomeList() {
  return [
    {
      slug: "airing-animes",
      title: "Airing Animes",
      items: await basicFetch(`seasons/now`),
    },
    {
      slug: "top-animes",
      title: "Top Animes",
      items: await basicFetch(`top/anime`),
    },
    {
      slug: "up-coming",
      title: "Upcoming",
      items: await basicFetch(`seasons/upcoming`),
    },
  ];
}
