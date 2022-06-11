import { api } from "./services/axios";

const basicFetch = async (endpoint) => {
  const response = await api.get(`${endpoint}`);
  const data = await response.data.data;

  return data;
};

export async function getHomeList() {
  return [
    {
      title: "Mais recentes",
      items: await basicFetch(`seasons/now`),
    },
    {
      title: "Top Animes",
      items: await basicFetch(`top/anime`),
    },
    {
      title: "Upcoming",
      items: await basicFetch(`seasons/upcoming`),
    },
  ];
}
