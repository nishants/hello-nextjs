

# Getting started



Strage errors: 

- unused functions exported and imported can results in very very weird errors e.g. `module fs not found`



### Lessons

- **[Setup](./Lessons/01-Setup.md)**

  > - Create new project 
  > - View default files created
  > - Customize image, description, site title

- Pre-rendering

  > - By default pre-renders pages (generates html in advance)
  > - Minimal js created for each page.
  > - hydarates rendered-html pages on page load.

-  **[Static Site Generation](./Lessons/02-static-site-generation.md)**

  > - Use `getStaticProps` to run async function and pass props at build time
  
- **[Using markdown metadata](./Lessons/03-md-metadata.md)**

  > - Use `gray-matter` to read markdown metadata
  > - Creating dynamic routes in `pages/index.js`
  
- **[Create Page and Routes](./Lessons/04-create-page-and-routes.md)**

  > - Create route `/posts/params.id` by creating `posts/[id].js`
  > - Export `getStaticPaths` to set possible values of params for route `/posts`
  > - Export `getStaticProps` to create page props based on `params`
  
  
  
- **[Render markdown as html](./Lessons/05-render-markdown.md)**

  > - Install `remark` and ` remark-html` 
  > - Return post content as html

  

  

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