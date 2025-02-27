/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file Generates 11ty data file for paginated tags pages,
 * the page(s) that displays all the tags. Filters out tags with no posts
 * as well as sorts the elements by their titles.
 */

const {i18n} = require('../_filters/i18n');

/**
 * @param {string} locale
 * @return {EleventyData}
 */
module.exports = locale => ({
  pagination: {
    /**
     * @param {Tag[]} tags
     * @return {LocalizedTag[]}
     */
    before: tags => {
      /** @type LocalizedTag[] */
      const filtered = [];
      for (const tag of tags) {
        const posts = tag.posts[locale];
        if (!posts.length) {
          continue;
        }

        filtered.push({
          key: tag.key,
          posts,
          title: tag.overrideTitle ?? i18n(tag.title, locale),
        });
      }

      return filtered.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );
    },
  },
});
