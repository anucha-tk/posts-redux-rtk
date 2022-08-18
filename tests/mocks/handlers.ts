import { rest } from "msw";

export const BASE_URL = `http://localhost:3500`;

export const handlers = [
  rest.get(`${BASE_URL}/posts`, (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 2,
          title: "Title A",
          body: "Body A",
          userId: 1,
          date: "2022-04-13T23:02:19.248Z",
        },
        {
          id: 3,
          title: "Title B",
          body: "Body B",
          userId: 1,
          date: "2022-05-02T20:41:05.437Z",
        },
      ])
    )
  ),
  // rest.post(`${BASE_URL}/posts`, (req, res, ctx) =>
  //   res(
  //     ctx.json([
  //       { name: "Cherries", imagePath: "/images/cherries.png" },
  //       { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
  //       { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
  //     ])
  //   )
  // ),
];
