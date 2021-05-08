# Render markdown



- Install remark 

  ```bash
  yarn add remark remark-html
  ```

  

- Import these libs in in `lib/posts.js`

  ```javascript
  import remark from 'remark'
  import html from 'remark-html'
  ```

  

- `getPostsData`

  ```javascript
  
  export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
  
    const contentHtml = processedContent.toString()
  
    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }
  ```

   

- Now use this in component

  ```react
  <section
  	dangerouslySetInnerHTML={{ __html: postData.contentHtml }}/>
  ```

  