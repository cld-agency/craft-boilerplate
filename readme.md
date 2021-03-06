To use this Craft boilerplate:
====================================

1. Download this repo (or clone it locally and then delete the `.git` directory for a fresh start).
1. To ensure that the ready-made Project Config gets processed, which includes various default fields and sections etc, you must first manually update Craft's system schema version number in `config/project.yaml` to match the version of Craft that you're installing. (Under `system -> schemaVersion`).
1. Run `composer install` to download Craft and plugins.
1. Create a blank local database and new local vhost pointing to your local clone's public_html directory.
1. Duplicate `example.env` and rename to `.env` (don't delete/rename the example file as it should remain in the repo).
1. Edit `.env` with your local DB details and add a random `security_key`. If you want to connect directly to the remote DB you can do so here.
1. Edit `config/general.php` to use a unique CP trigger word (`cpTrigger`) instead of "admin".
1. Navigate to your local `site.test/{cpTrigger}` to install Craft.
1. Update the vhost name in `gulpfile.js` - this is used by BrowserSync to proxy through.
1. Update the project name in `package.json` (no spaces or capital letters).
1. Run `npm install`.
1. Finally, run `gulp` to start work. You can also run `gulp images` separately to compress all images and SVGs in the `assets/img` directory.

-------------------------------------------

MIT License

Copyright &copy; 2019 Clever Little Design Ltd.

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