/**
 * @license
 * Copyright 2015 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

goog.provide('shaka.asserts');


/**
 * @namespace shaka.asserts
 * @summary An assertion framework which is compiled out for deployment.
 */


/**
 * @define {boolean} true to enable asserts, false otherwise.
 */
goog.define('shaka.asserts.ENABLE_ASSERTS', goog.DEBUG);


/** @type {function()|function(*, string=)} */
shaka.asserts.assert = function() {};


/** @type {function()} */
shaka.asserts.notImplemented = function() {};


/** @type {function()} */
shaka.asserts.unreachable = function() {};


/** @private */
shaka.asserts.patchAssert_ = function() {
  var assert = console.assert;

  if (!assert) {
    console.assert = function() {};
  } else if (!assert.bind) {
    // IE 9 does not provide a .bind for the built-in console functions.
    console.assert = function() {
      assert.apply(console, arguments);
    };
  }
};


// Install assert functions.
if (shaka.asserts.ENABLE_ASSERTS) {
  shaka.asserts.patchAssert_();

  shaka.asserts.assert =
      console.assert.bind(console);

  shaka.asserts.notImplemented =
      console.assert.bind(console, 0 == 1, 'Not implemented.');

  shaka.asserts.unreachable =
      console.assert.bind(console, 0 == 1, 'Unreachable reached.');
}
