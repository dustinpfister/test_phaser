# test_phaser

This is a collection of phaser demos that I have made for content on my site here at github via github pages at [https://dustinpfister.github.io/](https://dustinpfister.github.io/). I copy and past many of the code examples here to the blog post markdown files in my blog_posts repo that is used in the build process of the site.

## If you really want to run the demos locally

I am not doing anything fancy with this repo, so everything of interest is in the public folder. I have a simple express backend but all it does is host the public folder. So if you have another way of hosting a public folder that contains static assets, there is no need to do an npm install, just host the public folder.

```js
$ git clone --depth 1 https://github.com/dustinpfister/test_phaser
$ cd test_phaser
$ npm install
$ node app 4000
```
