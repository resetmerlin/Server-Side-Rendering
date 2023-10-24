# Server-Side-Rendering

#### Description
First, my question was why REACT Applications are bad at exposing themselves on search engine. And Why we need such thing as SSR or CSR. I found out that Search engine crawlers, social sharing platform have historically relied exclusively on static HTML markup to index the web and surface content. Google's crawler uses Chrome 41 to execute Javascript and render the final Page, but pages that use newer features like ES6 classes, modules and arrow functions will cause JS errors in this older browser and prevent the page from rendering correctly. So that means that using ES6 syntax would cost search engines issue because of compability. 

Most of SPA produces HTML from executing JS(think about jsx then you will understand). This means that when a crawler initially accesses an SPA, it might only see the basic structure of the page and none of the content, as the content is loaded and rendered via JS. This is the reason why SPAs can sometimes perform poorly on search engines if not optimized correctly. If a crawler doesn't execute or waits for this JS, it won't see the content, leading to poor indexing.

But the thing is headless Chrome doesn't care what library, framework, or tool chain you use. It eats JavaScript for breakfast and spits out static HTML before lunch. Well, hopefully a lot faster than that. Our chrome browser is **not** headless but chrome can be run in a "headless" mode.

"Headless" refers to running a browser without a visible UI—so you can't "see" the browser, but it performs all the tasks a browser does in the background.

Finally these are the reason of using Puppeteer library cause it make us to work with headless Chrome. Its APIs make it possible to take a client-side app and prerender (or "SSR") its markup

#### READ
I put the annoation on the each branch(Kr, En). If you are comfortable with English, go to the En branch.

#### TEST

To test this repo, type below to execute and go to the localhost:8080

```
npm install
```

```
node --experimental-modules server.mjs
```
