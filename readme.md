To use this Craft boilerplate:
====================================

1. Download this repo (or clone it locally and then delete the `.git` directory for a fresh start).
1. For CLD devs only, turbo-charge the boilerplate by importing the CLD Craft boilerplate database and installing our standard plugin base (not included in this repo). Otherwise...
1. Create a blank database and new local vhost pointing to your local clone's public_html directory
1. Download the latest Craft and add the latest Craft `app` directory to your `craft` directory
1. Copy `craft/config/local-SAMPLE` and rename to `local` (don't delete/rename the sample directory as it should remain in the repo).
1. Edit `craft/config/local/db.php` and `craft/config/local/general.php` with your details
1. Edit `craft/config/general.php` to use a unique CP trigger word (`cpTrigger`) instead of "admin".
1. Edit `public_html/index.php` to whitelist your environment domain names (this protects against potential cache poisoning attacks).
1. Navigate to your local `site.test/{cpTrigger}` to install Craft
1. Install `assetrev` plugin, `minify`, and others if necessary (not included in this repo).
1. Update the vhost name in `gulpfile.js` - this is used by BrowserSync to proxy through.
1. Update the project name in `package.json` (no spaces or capital letters)
1. If you haven't already, install `ncu` (`npm install -g npm-check-updates`) and then run `ncu -u` to automatically update all the version numbers in `package.json` to their latest stable releases.
1. Run `npm install`
1. Finally, run `gulp` to start work. You can also run `gulp images` separately to compress all images and SVGs in the `assets/img` directory.

-------------------------------------------

MIT License

Copyright &copy; 2017-2018 Clever Little Design Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.