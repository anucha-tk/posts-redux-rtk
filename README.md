# Posts React RTK Advanced

CRUD with Redux RTK Query Advanced with createEntityAdapter and InjectEndpoints

# Tech stack

- Front end: [React](https://reactjs.org/)
- Css: [Chakra-ui](https://chakra-ui.com/)
- Api: [Json-server](https://github.com/typicode/json-server)
- State management & api Cache: [Redux toolkit RTK](https://redux-toolkit.js.org/)

# Table of contents

- [Post React RTK Advanced](#post-react-rtk-advanced)
- [Tech stack](#tech-stack)
- [Table of contents](#table-of-contents)
- [Features and Tactical](#features-and-tactical)
  - [Advanced RTK createEntityAdapter](#custom-redux-toolkit-rtk-query)
  - [RTK InjectEndpoints](#rtk-injectendpoints)

# Features and Tacticals

## Advanced RTK createEntityAdapter

we add selectId and sortComparer for query

```typescript
// postSlice.ts
const postAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});
```

## RTK InjectEndpoints
