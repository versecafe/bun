//#FILE: test-stream-end-paused.js
//#SHA1: 4ebe901f30ba0469bb75c7f9f7ba5316ceb271a5
//-----------------
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";
const { Readable } = require("stream");

test("end event for paused 0-length streams", done => {
  // Make sure we don't miss the end event for paused 0-length streams

  const stream = new Readable();
  let calledRead = false;
  stream._read = function () {
    expect(calledRead).toBe(false);
    calledRead = true;
    this.push(null);
  };

  stream.on("data", () => {
    throw new Error("should not ever get data");
  });
  stream.pause();

  setTimeout(() => {
    stream.on("end", () => {
      expect(calledRead).toBe(true);
      done();
    });
    stream.resume();
  }, 1);
});

//<#END_FILE: test-stream-end-paused.js
