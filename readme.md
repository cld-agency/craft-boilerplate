To use this Craft boilerplate:
====================================

1. Clone this repo locally.
1. For CLD devs only, turbo-charge the boilerplate by importing the CLD Craft boilerplate database and installing our standard plugin base (not included in this repo). Otherwise...
1. Create a blank database and new local vhost pointing to your local clone's public_html directory
1. Download the latest Craft and add the latest Craft `app` directory and the blank `storage` directory to your `craft` directory
1. Copy `craft/config/local-SAMPLE` and rename to `local` (don't delete/rename the sample directory as it should remain in the repo).
1. Edit `db.php` and `general.php` with your details
1. Edit `public_html/.htaccess` to account for your local vhost's name so that "www" isn't inserted.
1. Visit your site.dev/admin to install Craft
1. Install `assetrev` plugin and others if necessary.

Next, run `npm update --save-dev` to update the version numbers in `package.json` to the latest and download the latest node modules.

Finally, run `gulp` to start work.

-------------------------------------------

MIT License

Copyright &copy; 2017 Clever Little Design Ltd.

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