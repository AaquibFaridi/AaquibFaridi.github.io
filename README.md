# Frontend Build: React App

https://testlastazri.herokuapp.com/backendapi/admin/actiavte?userid=vipinkus24@gmail.com
We will be :
=>bootstraping our project with [`create-react-app`](https://github.com/facebook/create-react-app).

//https://itnext.io/pwa-splash-screen-and-icon-generator-a74ebb8a130

### 1. Design Principle

    ├── root(Directory)
    │   public (Directory name)
        │   ├── index.html
        │   └── favicons
        |
    │   src (Directory name)
        ├── Assets (Directory name)
        │   ├── xy.png(files)
        │   ├── xyz.svg
        │   └── xyza.jpg
    │   ├── Authentication (Directory name)
        │   ├── Mobile (Directory name)
        │   │   ├── index.js - (Higher Order Component)
        │   │   ├── style.css - (Customized CSS, media-query )
        │   │   ├── Actions.js (redux handling files)
        │   │   ├── ActionsTypes.js (redux handling files)
        │   │   ├── ActionsCreators.js (redux handling files)
        │   │   └── Reducer.js (redux handling files)
        |
        ├── index.js - (Entry Point)
        ├── index.css
        ├── app.js - (Base Component )
        ├── app.css
        ├── store.js(redux store configuration )
        ├── router.js(react routing )
        └── rootreducer.js(combines individual reducers to state)

    ├── .env.dev - (lower env configuration for development)
    ├── .env.qa - (qa env configuration)
    ├── .env.preprod - (preprod env configuration)
    ├── .env.prod - (prod env configuration)
    ├── .babel.config.js - (babel configuration )
    ├── .prettier.rc - (prettier configuration )
    ├── .eslintrc - (es lint configuration) ref : https://www.npmjs.com/package/eslint-config-airbnb
    ├── .stylelintrc - (style lint configuration) ref : https://www.npmjs.com/package/stylelint-config-standard
    ├── jsconfig.json - (Absolute path for app) ref :
    └── package.json - (project dependencies)
    ```

### 2. How to start the development server in project

Step 1 -- Make sure you have installed the extensions required for the project :
EditorConfig
Eslint
gitlens
prettier
docthis

Step 2 -- In the root directory, run `npm install`. This will install the core and the dev dependencies requied for the project

Step 3 -- Run 'npm run start' to start the development server and open `localhost:3000` in your browser.

---

# Coding guidelines

Prevalent standards in JavaScript and React

### 1. Branching

Branch name should either be created from featured tasks/stories or it should be a meaningful name.

##### Correct usage

`feature/FEATURE-STORYNO.-description`

##### Incorrect usage

`feature/random-description-timestamp`

---

### 2. Commit message format

=> Every commit message should in active case.
=> Must not be greater than 72 characters.
=> Should summarize the code changes in commit.
=> After a newline, it should have Story number
=> Followed by task description.
Reference: https://chris.beams.io/posts/git-commit

Rules for committing:

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. How

##### Correct usage

`LOGIN-01 : Mobile otp login, Handle no. validation`

##### Incorrect usage

`payu gateway integrated”, hot fixes`

---

### 3. Avoid making large pull requests so that code review gets easier

### 4. Use semantic HTML elements as per W3C standards(MDN article)

### 5. Use JS Docs Comments

Try to document every function or complex logic by adding comments to it. Comments should
follow JS Docs formatting.

##### Correct usage

For example:

```sh
/**
 * @function initializeGoogleSdk
 * @param {String} `src` - api url of the sdk
 * @description Loads Google SDK script and appends to head
 */
function initializeGoogleSdk(src) {
 statements...
}
```

##### Incorrect usage

For example:

```sh
// Initializes SDK and appends to head
function initializeGoogleSdk(src) {
 statements...
}
```

---

### 6. Meaningful Identifiers. Nomenclature should be relevant

### 7. Prefer ES6 functions strictly over conventional methods (like arrow functions, proptypes, default props)

### 8. Prefer ternary operator if required in nested if-else loops, optional chaining, null coallescing

### 9. No unnecessary props as constructor arguments in class components

### 10. Always use React’s Prop-Types for type checking

### 11. Use a linter to make your code easier to review(npm run lint)

### 12. Developers code-review to ensure sanity of your feature or hotfix before MR/CR is raised

### 13. If using JEST and enzyme, write your test cases and check coverage before committing your code.

### 14. Objects and arrays destructuring should be preferred

### 15. Functional components are to be used (avoid class components)

### 15. Unnecessary logs should be removed

### 16. Prettier configuration should be constant(Prefer VS code extensions).

    Run the followng command to prettify the code before raising MR :
    (.prettierrc.js should be present with configurations)
    // prettier --check "src/**/*.js"
    // prettier --write "src/**/*.js"

### 17. Maintain proper indentation of the blocks

### 18. Use utility functions extensively wherever required

### 19. Follow the camel casing convention in directory and file name

---

├──Account (Directory name)
│ ├── Login (Directory name)
│ │ ├── index.js - (Higher Order Component)
│ │ ├── style.css - (Styled components)
│ │ ├── Actions.js -(Redux Managers)
│ │ ├── ActionsTypes.js -(Redux Managers)
│ │ ├── ActionsCreators.js -(Redux Managers)
│ │

### 20.Babel would be used

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

$ pwa-asset-generator --help
pwa-asset-generator ./src/assets/img/logo/favic.png ./public/images -i ./public/index.html -m ./public/manifest.json
pwa-asset-generator ./src/assets/img/logo/favrm.png --icon-only --favicon --opaque false --maskable false ./public/test -i ./public/index.html -m ./public/manifest.json

Usage
$ pwa-asset-generator [source-file] [output-folder]

    The assets will be saved to the folder where the command is executed if no output-folder provided.

Options
-b --background Page background to use when image source is provided: css value [default: transparent]
-o --opaque Shows white as canvas background and generates images without transparency [default: true]
-p --padding Padding to use when image source provided: css value [default: "10%"]
-s --scrape Scraping Apple Human Interface guidelines to fetch splash screen specs [default: true]
-m --manifest Web app manifest file path to automatically update manifest file with the generated icons
-i --index Index HTML file path to automatically put splash screen and icon meta tags in
-a --path Path prefix to prepend for href links generated for meta tags
-v --path-override Override the path of images used in href/src tags of manifest and HTML files
-t --type Image type: png|jpg [default: jpg - with the exception of manifest files]
-q --quality Image quality: 0...100 (Only for JPG) [default: 70]
-h --splash-only Only generate splash screens [default: false]
-c --icon-only Only generate icons [default: false]
-f --favicon Generate favicon image and HTML meta tag [default: false]
-w --mstile Generate Windows static tile icons and HTML meta tags [default: false]
-e --maskable Declare icons in manifest file as maskable icons [default: true]
-l --landscape-only Only generate landscape splash screens [default: false]
-r --portrait-only Only generate portrait splash screens [default: false]
-d --dark-mode Generate iOS splash screen meta with (prefers-color-scheme: dark) media attr [default: false]
-u --single-quotes Generate HTML meta tags with single quotes [default: false]
-x --xhtml Generate HTML meta tags by self-closing the tags [default: false]
-g --log Logs the steps of the library process [default: true]
-n --no-sandbox Disable sandbox on bundled Chromium on Linux platforms - not recommended [default: false]

pwa-asset-generator logo.html
$ pwa-asset-generator logo.svg -i ./index.html -m ./manifest.json
$ pwa-asset-generator https://your-cdn-server.com/assets/logo.png ./ -t jpg -q 90 --splash-only --portrait-only
$ pwa-asset-generator logo.svg ./assets --splash-only --xhtml --single-quotes
$ pwa-asset-generator logo.svg ./assets --scrape false --icon-only --path "%PUBLIC_URL%"
$ pwa-asset-generator logo.svg ./assets --icon-only --favicon --opaque false --maskable false --type png
$ pwa-asset-generator logo.svg ./assets --dark-mode --background dimgrey --splash-only --quality 80
$ pwa-asset-generator logo.svg ./assets --padding "calc(50vh - 5%) calc(50vw - 10%)" --path-override "./your-custom-image-folder-path"
$ pwa-asset-generator https://onderceylan.github.io/pwa-asset-generator/static/logo.png ./temp -p "15%" -b "linear-gradient(to right, #fa709a 0%, #fee140 100%)"
$ pwa-asset-generator https://onderceylan.github.io/pwa-asset-generator/static/blm.png ./blm -p "15%" -b "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)"

Flag examples
--background "rgba(255, 255, 255, .5)"
--opaque false
--padding "10px"
--scrape false
--manifest ./src/manifest.json
--index ./src/index.html
--path "%PUBLIC_URL%"
--path-override "./your-custom-image-folder-path"
--type jpg
--quality 80
--splash-only
--icon-only
--favicon
--mstile
--maskable false
--landscape-only
--portrait-only
--dark-mode
--single-quotes
--xhtml
--log false
Module
pwa-asset-generator is not only a CLI. It's a CLI wrapper around a JavaScript module. It's possible to access the underlying API of the library as it's described in below example;

const pwaAssetGenerator = require('pwa-asset-generator');

// Generate images over a module function call, instead of using CLI commands
(async () => {
const { savedImages, htmlMeta, manifestJsonContent } = await pwaAssetGenerator.generateImages(
'https://onderceylan.github.io/pwa-asset-generator/static/logo.png',
'./temp',
{
scrape: false,
background: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
splashOnly: true,
portraitOnly: true,
log: false
});
})();

// Access to static data for Apple Device specs that are used for generating launch images
const appleDeviceSpecsForLaunchImages = pwaAssetGenerator.appleDeviceSpecsForLaunchImages;
FAQ
What kind of image input should I use with this library? What are the safe margins for a logo?
Any image format that a Chrome browser can render within an <img> HTML tag, is a compatible image input. It can be an icon, an SVG file, a JPEG or PNG logo, even a WebP image.

pwa-asset-generator uses a Chrome tab as an art board. Your input image is being scaled to fit the viewport of the target device resolution while generating splash screens. Since your input image is being scaled for generating splash screens, it's best advised to use a vector image - like an SVG file as an input.

There's no particular safe margin requirement as 10% padding is added around your image input by default with CSS. That being said, you can customize the padding as it's described in the next answer. The library uses a similar approach while generating icons too, with the same default padding 10% around the image input. See it in action here at this tweet to understand the concept.

How can I make an image smaller or larger relative to the background?
The default value for the padding surrounding the image is 10%. But it's just a css padding value that you can configure and override yourself with -p --padding option.

You can use a more advanced padding value based on your taste and goal;

Larger logo: --padding "calc(50vh - 20%) calc(50vw - 40%)"

Smaller logo: --padding "calc(50vh - 5%) calc(50vw - 10%)"

You can create your own html input file which uses css media queries and provides different padding options based on breakpoints: https://material.io/design/layout/responsive-layout-grid.html#breakpoints

How can I generate a PNG image with a transparency?
Although the default background color is transparent, there's another option that you need to use for generating transparent images: opaque.

You need to run your CLI command with --opaque false option in order to get the transparency; pwa-asset-generator logo.svg --opaque false --type png.

This might be confusing for some, but it's necessary to support the use of background values with alpha channels.

How can I generate a transparent favicon, and app icons with opaque background?
Default behaviour of the library is to generate a favicon along with app icons. So, it's not possible to generate one without other.

However, you can use this workaround to work with this edge case:

First, generate a favicon with --opaque false --icon-only --favicon --type png options.
Then, overwrite app icons with --background "#FFF" --icon-only options.
How can I generate both dark mode and light mode splash screen images?
You need to execute two consequent commands in order to generate both dark mode and light mode splash screens for you PWA running on iOS.

Here's a pair of example commands that can be used for generating both modes;

npx pwa-asset-generator light-logo.svg ./assets --dark-mode --background dimgrey --splash-only --type jpeg --quality 80 --index ./src/app/index.html
npx pwa-asset-generator dark-logo.svg ./assets --background lightgray --splash-only --type jpeg --quality 80 --index ./src/app/index.html
As you can see from the demonstration of dark mode splash screens at this tweet, users have to re-add a PWA to the home screen in order to react to a system setting change.

An existing PWA on a home screen will not be able to recognize changed system settings for it's launch image. This is a limitation on iOS.

Are deprecated device-width and device-height media queries necessary?
Even though they're deprecated, device-width and device-height media queries are still being used by iOS to declare splash screen images for web apps added to a home screen.

When it's an exact match with device's resolution, iOS displays the splash screen as a launch image on bookmarks / PWAs added to a home screen.

How can I use JSX syntax to generate the meta tags?
If you don't have HTML files in your project, and have a JSX/TSX files instead, you can either use --xhtml option or self-generate the meta tags.

The --xhtml option allows you to generate the required meta tags with self-closing them - < />. This will allow copying generated tags directly to a JSX/TSX file.

Alternatively, you can use static data that this library exports to generate the required meta tags! pwa-asset-generator exposes the static Apple device specification data via it's module API. Here's an example JSX snippet;

import { appleDeviceSpecsForLaunchImages } from 'pwa-asset-generator';

render() {
return (
<>
{appleDeviceSpecsForLaunchImages.map((spec) => {
return (
<>

<link
key={`apple-splash-${spec.portrait.width}-${spec.portrait.height}`}
rel="apple-touch-startup-image"
href={`apple-splash-${spec.portrait.width}-${spec.portrait.height}.png`}
media={`(device-width: ${spec.portrait.width / spec.scaleFactor}px) and (device-height: ${spec.portrait .height / spec.scaleFactor}px) and (-webkit-device-pixel-ratio: ${ spec.scaleFactor }) and (orientation: portrait)`}
/>
<link
key={`apple-splash-${spec.portrait.width}-${spec.portrait.height}`}
rel="apple-touch-startup-image"
href={`apple-splash-${spec.portrait.width}-${spec.portrait.height}.png`}
media={`(device-width: ${spec.portrait.height / spec.scaleFactor}px) and (device-height: ${spec.portrait .width / spec.scaleFactor}px) and (-webkit-device-pixel-ratio: ${ spec.scaleFactor }) and (orientation: landscape)`}
/>
</>
);
})}
</>
);
}
My index.html file's format has been changed after an automated update. Is there any way to re-format it?
pwa-asset-generator uses pretty for formatting your index.html file with a simple, opinionated output.

A recommended way to maintain the same format for your index.html file would be using Prettier and adding the following script to your project's package.json file.

"format:index": "prettier \"index.html\" --write"
Executing npm run format:index after using pwa-asset-generator assures the same format for your HTML file.

When generating PNG images, there's no compression settings. Is there a way to introduce compression for PNG files?
pwa-asset-generator depends on Puppeteer, and it's screenshot API for image generation. Puppeteer doesn't provide compression settings for PNG files for the time being.

However, you can use one of the lossless / lossy compression libraries - like pngquant to compress the generated PNG images.

Running the CLI command on CI server causes Puppeteer error: "Running as root without --no-sandbox is not supported". How can I disable sandboxing?
In case of getting "No usable sandbox!" error on Linux, you need to enable system sandboxing.

PAG provides users the --no-sandbox option to tackle this issue. Note that there are limitations for this option; it can only be used on Linux platforms and HTML inputs are disabled for security purposes.

You saved me hours of work with pwa-asset-generator. How can I support this project?
I'm happy to hear you enjoy my work, and it saved you your precious time. Let's call it even! Make a donation and help me support students in developing countries!

Keywords
pwapuppeteerchromiumiconlaunch-imageiosandroidsplashscreensplash-screenimage-generationimagemanifestmobilefaviconmstilepwa-assets
Install
npm i pwa-asset-generator

Repository
github.com/onderceylan/pwa-asset-generator

Homepage
github.com/onderceylan/pwa-asset-generator#readme
