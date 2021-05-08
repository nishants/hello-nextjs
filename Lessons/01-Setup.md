# Gettings started

source: https://nextjs.org/learn/basics/data-fetching/setup



- Create project

  ```bash
  # Choose a compatible node version
  nvm use v12.16.0
  
  # Create boilerplate
  yarn create next-app --example "https://github.com/vercel/next-learn-starter/tree/master/data-fetching-starter" hello-nextjs
  
  # Install app
  cd  hello-nextjs
  yarn
  
  # Start dev server
  yarn dev
  ```

  

- Created code : 

  ```yaml
   hello-nextjs
   	- components
   		- layout.js  # Common layout HOC
   		- layout.css 
    - pages
    	- index.js   # Home page
    	- app.js     # Parent of all components (common props ?)
    	- pages
    		- first-post.js # a page in app
  	- public
  		- favicon.ico        # explictly imported in layout.js
  		- images/profile.jpg # imported explictly when required
   	- styles
   		- global.css         # ??
   		- utils.module.css   # ??
  ```

  

- `layout.js `
  - Header for page (open graph, favicon, title etc.)
  - Imported explicitly (and optionally) on each page.
- `pages/index.js`
  - home page 
- `.next`
  - created on running `yarn dev` (build output ?)



### Customize 

- `public/images/profile.jpg` with your photo (Recommended: 400px width/height).
- `const name = '[Your Name]'` in `components/layout.js` with your name.
- `<p>[Your Self Introduction]</p>` in `pages/index.js` with your self introduction.

