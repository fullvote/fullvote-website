# Before Next -- Deploy
- (Remove '--' in header when adding to this list)


#The FullVote Website (static marketing pages & web app)

Table of contents
<b>Getting Setup</b>
<b>Content: Static vs Dynamic</b>
<b>Resources: Assets vs Public</b>
<b>Deployment</b>
<b>Random Images Mind Dump</b>
<b>High level TODOs/ideas</b>



## Getting Setup

To get the project setup:
1. Have `node`, `npm` installed
2. Have `eb cli` installed (https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
3. `npm install && npm run build`


## Development Note
- Open dev tools -> Application, and then select "Update on Reload" and "Bypass for network". Otherwise, since the browser session is in tact, the service worker won't yeild to the newer one, and changes to static source does not take affect.

## Error Handling
In own code, errors are never expected, either from async or sync code.
In async/sync, if something error-like can occur, Either objects are used.
Thus, all "catch" promise resolutions are for truly exceptional code that got past my error handling.



## Content: Static vs Dynamic

#### Static Content

In development, static content is served dynamically using the web framework.

In production, nginx maps specified "static" content page urls to the built/compiled html files.
These pages are cached locally for 10 minutes, then e-tag.
TODO: use s3 / cdn for this purpose?

#### Dynamic Content

These pages are always served through the web framework.
These pages are cached locally for 1 minute, then e-tag.

#### Resources

In development, resources are served from the assets dir.

In production, resouces are served from the public dir.
These resources have the file hash in the file name and so are cached for 1 year.

More about this process in the "Resources: Assets vs Public" section.




## Resources: Assets vs Public - how static resources are managed

`/assets` are static static resources. They may or may not have been built and gitignored.
`/public` is assets that are exposed through nginx. They arive in this directory through a build script. This separates how assets are saved in version control, vs how/what is exposed. Exposed assets, for instance, have a copy saved with their hash in the filename for caching purposes.

### How does this work in...?

#### HTML

In html, the paths to static resources use the /assets path surrounded by a mustache {{#urlFor}}...{{/urlFor}} function. In a development setting (ie, `SUPRESS_CACHING` is set to true), the mustache function returns the path back. In a production setting, the mustache function returns the exposed path. The mapping from assets paths to public paths are stored in `assets-manifest`.

#### Server Javascript

Same as with HTML, except by using the real getUrlFor javascript function (which the mustache one calls).

#### Client Javascript

No use cases of client javascript using a static resource.

#### CSS

Because CSS doesn't have a runtime, I cannot use the urlFor function in any capacity. Instead, the /assets path is used (as in the other cases) and then in the build script, static find/replace is used to swap these paths with the exposed path (again, using the assets-manifest). NOTE: CSS is built from sass and placed into the assets/css/{filename}.css built dir which gets exposed as public/built/{filename}-{hash}.css.

#### Sitemap

Like CSS, xml doesn't have a runtime, so it is accounted for exactly like css (assets path is used and found/replaced with exposed path using asset-manifest).


### What if I forget to surrond my static resources path with the urlFor function?

There is static text testing that try to ensure the function is used. TODO: need some for server js.



## Deployment

Add section about deployment: eb deploy, nginx config, what gets built/optimized/compressed, what gets sent to server..





## High Level TODOs/ideas

- use jsDOM instead of {{#urlFor}}, static\_replace
  - in general, our mustache templates have both static cases (partials, urlFor, etc) and dynamic (variables that really won't be known until runtime. It is un-ideal that these two are treated equally.
