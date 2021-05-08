# Pages and Routes 



Source :

-  Read page meta at build time : https://nextjs.org/learn/basics/data-fetching/implement-getstaticprops

  

- Create dir `posts`

  ```bash
  mkdir posts
  cd posts
  touch my-first-post.md
  ```

  

- Create a markdown with `metada` on top: 

  ```markdown
  ---
  title: 'My first post'
  date: '2021-05-08'
  ---
  
  # My first post with next js
  
  source : https://nextjs.org/learn/basics/data-fetching/blog-data
  
  Static code generation is awesome.
  
  - Export `async getStaticProps`
  - Read network/remote server/file system and pass data as props on build time
  ```



- install module to parse the metadata in markdown file

  ```bash
  yarn add gray-matter
  ```



- Create `lib/posts.js` to read all the files in `posts/` and return metadat sorted by date

  ```javascript
  import fs from 'fs'
  import path from 'path'
  import matter from 'gray-matter'
  
  const postsDirectory = path.join(process.cwd(), 'posts')
  
  export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')
  
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
  
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)
  
      // Combine the data with the id
      return {
        id,
        ...matterResult.data
      }
    })
    
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  }
  ```

  

- Use the static data in `pages/index.js` to create links : 

  ```javascript
  import {getSortedPostsData} from '../lib/posts';
  
  export async function getStaticProps() {
    return new Promise(resolve => {
      const posts = getSortedPostsData();
      resolve({props: {posts}});
    });
  }
  ```

  

To create dynamic routes, continue with : 