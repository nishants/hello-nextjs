

# Getting started

[![Build Status](https://dev.azure.com/nishantsingh870743/nishants.in/_apis/build/status/nishants.nishants.in?branchName=master)](https://dev.azure.com/nishantsingh870743/nishants.in/_build/latest?definitionId=4&branchName=master)



Running on local : 

```bash
yarn dev
```



Generate static website and test on local : 

```
yarn dev:export
```





TODO

- [ ] Creating public assets from markdown
  - [ ] abstract tree parse a markdown
  - [ ] remove all relative paths in image and put to `public/posts/<id>/`
  - [ ] update the markdown to use new paths
  - [ ] transform urls in actual
- [ ] Styling support 
  - remark-gfm: https://github.com/remarkjs/remark-gfm



### Todo

- [ ] Fix for image export 

  - Problem 

    ```bash
    
    yarn export 
    # Error: Image Optimization using Next.js' default loader is not compatible with `next export`.
    ```

    Solution: https://github.com/vercel/next.js/issues/18356#issuecomment-803843108

- [ ] how to add scss ?

- [ ] Image handling

  - [ ] copy images in markdown from relative path
  - [ ] copy images to relative path in public
  - [ ] change the relative paths in module

- [ ] Custom html 

  - [ ] Currently they are shown on page as html.
  - [ ] Ignore them
  - [ ] Add custom react component to handle html component

- [ ] Custom links

  - [ ] Allow having anchors in page 
  - [ ] Allow having bookmarks to anchors in page

- [ ] how to add external html pages ?



- Syntax highlighting using 

  - react-syntax-highlighter: https://github.com/react-syntax-highlighter/react-syntax-highlighter
  - react-markdown: https://github.com/remarkjs/react-markdown

- Custom markdown compoennts : 

  

  > - Creating dynamic routes
  > - How to statically generate pages with [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) using [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).
  > - How to write [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) to fetch the data for each blog post.
  >- How to render markdown using [`remark`](https://github.com/remarkjs/remark).
  > - How to pretty-print date strings.
  >- How to link to a page with [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes).
  > - Some useful information on [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes).

  

Todo

- [ ] how to add scss ?
- [ ] how to generate static link ? 
- [ ] how to add external html pages ?
- [x] Create custom component in markdown ?
  - [x] https://www.npmjs.com/package/html-to-react



- [x] how to add syntax highlighting ? 
  - highlight 
    - https://github.com/remarkjs/remark-highlight.js
    - demo: 
  - prism : 
    - https://github.com/sergioramos/remark-prism
    - demo: 