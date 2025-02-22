var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.24.2/node_modules/@esbuild-plugins/node-globals-polyfill/process.js
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env, argv, version, versions, release, config, on, addListener, once, off, removeListener, removeAllListeners, emit, performance, performanceNow, startTime, process, defines;
var init_process = __esm({
  "node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.24.2/node_modules/@esbuild-plugins/node-globals-polyfill/process.js"() {
    cachedSetTimeout = defaultSetTimout;
    cachedClearTimeout = defaultClearTimeout;
    if (typeof globalThis.setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    }
    if (typeof globalThis.clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    }
    queue = [];
    draining = false;
    queueIndex = -1;
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser";
    platform = "browser";
    browser = true;
    env = {};
    argv = [];
    version = "";
    versions = {};
    release = {};
    config = {};
    on = noop;
    addListener = noop;
    once = noop;
    off = noop;
    removeListener = noop;
    removeAllListeners = noop;
    emit = noop;
    performance = globalThis.performance || {};
    performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
      return (/* @__PURE__ */ new Date()).getTime();
    };
    startTime = /* @__PURE__ */ new Date();
    process = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform,
      release,
      config,
      uptime
    };
    defines = {};
    Object.keys(defines).forEach((key) => {
      const segs = key.split(".");
      let target = process;
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        if (i === segs.length - 1) {
          target[seg] = defines[key];
        } else {
          target = target[seg] || (target[seg] = {});
        }
      }
    });
  }
});

// node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.24.2/node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js
function init() {
  inited = true;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
}
function base64toByteArray(b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
  arr = new Arr(len * 3 / 4 - placeHolders);
  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 255;
    arr[L++] = tmp >> 8 & 255;
    arr[L++] = tmp & 255;
  }
  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 255;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 255;
    arr[L++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function base64fromByteArray(uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var output = "";
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(
      encodeChunk(
        uint8,
        i,
        i + maxChunkLength > len2 ? len2 : i + maxChunkLength
      )
    );
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 63];
    output += "==";
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 63];
    output += lookup[tmp << 2 & 63];
    output += "=";
  }
  parts.push(output);
  return parts.join("");
}
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError("Invalid typed array length");
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = new Uint8Array(length);
    that.__proto__ = Buffer2.prototype;
  } else {
    if (that === null) {
      that = new Buffer2(length);
    }
    that.length = length;
  }
  return that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
    return new Buffer2(arg, encodingOrOffset, length);
  }
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
function from(that, value, encodingOrOffset, length) {
  if (typeof value === "number") {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }
  if (typeof value === "string") {
    return fromString(that, value, encodingOrOffset);
  }
  return fromObject(that, value);
}
function assertSize(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}
function alloc(that, size, fill2, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill2 !== void 0) {
    return typeof encoding === "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2);
  }
  return createBuffer(that, size);
}
function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer2.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}
function fromString(that, string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer2.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  if (actual !== length) {
    that = that.slice(0, actual);
  }
  return that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength;
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError("'offset' is out of bounds");
  }
  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError("'length' is out of bounds");
  }
  if (byteOffset === void 0 && length === void 0) {
    array = new Uint8Array(array);
  } else if (length === void 0) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    that = array;
    that.__proto__ = Buffer2.prototype;
  } else {
    that = fromArrayLike(that, array);
  }
  return that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);
    if (that.length === 0) {
      return that;
    }
    obj.copy(that, 0, 0, len);
    return that;
  }
  if (obj) {
    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
      if (typeof obj.length !== "number" || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }
  throw new TypeError(
    "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
  );
}
function checked(length) {
  if (length >= kMaxLength()) {
    throw new RangeError(
      "Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes"
    );
  }
  return length | 0;
}
function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}
function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== "string") {
    string = "" + string;
  }
  var len = string.length;
  if (len === 0) return 0;
  var loweredCase = false;
  for (; ; ) {
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
function slowToString(encoding, start, end) {
  var loweredCase = false;
  if (start === void 0 || start < 0) {
    start = 0;
  }
  if (start > this.length) {
    return "";
  }
  if (end === void 0 || end > this.length) {
    end = this.length;
  }
  if (end <= 0) {
    return "";
  }
  end >>>= 0;
  start >>>= 0;
  if (end <= start) {
    return "";
  }
  if (!encoding) encoding = "utf8";
  while (true) {
    switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase)
          throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
}
function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0) return -1;
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length - 1;
  }
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1;
  }
  if (typeof val === "string") {
    val = Buffer2.from(val, encoding);
  }
  if (internalIsBuffer(val)) {
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === "number") {
    val = val & 255;
    if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(
          buffer,
          val,
          byteOffset
        );
      } else {
        return Uint8Array.prototype.lastIndexOf.call(
          buffer,
          val,
          byteOffset
        );
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;
  if (encoding !== void 0) {
    encoding = String(encoding).toLowerCase();
    if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }
  function read(buf, i2) {
    if (indexSize === 1) {
      return buf[i2];
    } else {
      return buf.readUInt16BE(i2 * indexSize);
    }
  }
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength)
          return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength)
      byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }
  return -1;
}
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(
    utf8ToBytes(string, buf.length - offset),
    buf,
    offset,
    length
  );
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(
    utf16leToBytes(string, buf.length - offset),
    buf,
    offset,
    length
  );
}
function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64fromByteArray(buf);
  } else {
    return base64fromByteArray(buf.slice(start, end));
  }
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  var res = "";
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 127);
  }
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = "";
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}
function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = "";
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError("offset is not uint");
  if (offset + ext > length)
    throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 65535 + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}
function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 4294967295 + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
  }
}
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError("Index out of range");
  if (offset < 0) throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      4,
      34028234663852886e22,
      -34028234663852886e22
    );
  }
  ieee754write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(
      buf,
      value,
      offset,
      8,
      17976931348623157e292,
      -17976931348623157e292
    );
  }
  ieee754write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}
function base64clean(str) {
  str = stringtrim(str).replace(INVALID_BASE64_RE, "");
  if (str.length < 2) return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, "");
}
function toHex(n) {
  if (n < 16) return "0" + n.toString(16);
  return n.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];
  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0) break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0) break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    byteArray.push(str.charCodeAt(i) & 255);
  }
  return byteArray;
}
function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }
  return byteArray;
}
function base64ToBytes(str) {
  return base64toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}
function isnan(val) {
  return val !== val;
}
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
}
function ieee754read(buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
  }
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
function ieee754write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
  }
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
  }
  buffer[offset + i - d] |= s * 128;
}
var lookup, revLookup, Arr, inited, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE;
var init_Buffer = __esm({
  "node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.24.2/node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js"() {
    init_process();
    init_buffer();
    lookup = [];
    revLookup = [];
    Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    inited = false;
    Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
    Buffer2.poolSize = 8192;
    Buffer2._augment = function(arr) {
      arr.__proto__ = Buffer2.prototype;
      return arr;
    };
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    Buffer2.kMaxLength = kMaxLength();
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      Buffer2.prototype.__proto__ = Uint8Array.prototype;
      Buffer2.__proto__ = Uint8Array;
      if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
      }
    }
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(null, size, fill2, encoding);
    };
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.isBuffer = isBuffer;
    Buffer2.compare = function compare(a, b) {
      if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a === b) return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    Buffer2.byteLength = byteLength;
    Buffer2.prototype._isBuffer = true;
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      var length = this.length | 0;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.equals = function equals(b) {
      if (!internalIsBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    MAX_ARGUMENTS_LENGTH = 4096;
    Buffer2.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer2.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf;
    };
    Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754read(this, offset, false, 52, 8);
    };
    Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer2.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer2.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i;
      if (this === target && start < targetStart && targetStart < end) {
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
        var len = bytes.length;
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  }
});

// node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.24.2/node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js
var init_buffer = __esm({
  "node_modules/.pnpm/@esbuild-plugins+node-globals-polyfill@0.2.3_esbuild@0.24.2/node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js"() {
    init_Buffer();
  }
});

// node_modules/.pnpm/mocha@11.1.0/node_modules/mocha/mocha.js
var require_mocha = __commonJS({
  "node_modules/.pnpm/mocha@11.1.0/node_modules/mocha/mocha.js"(exports, module2) {
    init_process();
    init_buffer();
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.mocha = factory());
    })(exports, function() {
      "use strict";
      var global$2 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      var global$1 = typeof global$2 !== "undefined" ? global$2 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      function defaultSetTimout$1() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout$1() {
        throw new Error("clearTimeout has not been defined");
      }
      var cachedSetTimeout$1 = defaultSetTimout$1;
      var cachedClearTimeout$1 = defaultClearTimeout$1;
      if (typeof global$1.setTimeout === "function") {
        cachedSetTimeout$1 = setTimeout;
      }
      if (typeof global$1.clearTimeout === "function") {
        cachedClearTimeout$1 = clearTimeout;
      }
      function runTimeout$1(fun) {
        if (cachedSetTimeout$1 === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout$1 === defaultSetTimout$1 || !cachedSetTimeout$1) && setTimeout) {
          cachedSetTimeout$1 = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout$1(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout$1.call(null, fun, 0);
          } catch (e2) {
            return cachedSetTimeout$1.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout$1(marker) {
        if (cachedClearTimeout$1 === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout$1 === defaultClearTimeout$1 || !cachedClearTimeout$1) && clearTimeout) {
          cachedClearTimeout$1 = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout$1(marker);
        } catch (e) {
          try {
            return cachedClearTimeout$1.call(null, marker);
          } catch (e2) {
            return cachedClearTimeout$1.call(this, marker);
          }
        }
      }
      var queue$1 = [];
      var draining$1 = false;
      var currentQueue$1;
      var queueIndex$1 = -1;
      function cleanUpNextTick$1() {
        if (!draining$1 || !currentQueue$1) {
          return;
        }
        draining$1 = false;
        if (currentQueue$1.length) {
          queue$1 = currentQueue$1.concat(queue$1);
        } else {
          queueIndex$1 = -1;
        }
        if (queue$1.length) {
          drainQueue$1();
        }
      }
      function drainQueue$1() {
        if (draining$1) {
          return;
        }
        var timeout2 = runTimeout$1(cleanUpNextTick$1);
        draining$1 = true;
        var len = queue$1.length;
        while (len) {
          currentQueue$1 = queue$1;
          queue$1 = [];
          while (++queueIndex$1 < len) {
            if (currentQueue$1) {
              currentQueue$1[queueIndex$1].run();
            }
          }
          queueIndex$1 = -1;
          len = queue$1.length;
        }
        currentQueue$1 = null;
        draining$1 = false;
        runClearTimeout$1(timeout2);
      }
      function nextTick$1(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue$1.push(new Item$1(fun, args));
        if (queue$1.length === 1 && !draining$1) {
          runTimeout$1(drainQueue$1);
        }
      }
      function Item$1(fun, array2) {
        this.fun = fun;
        this.array = array2;
      }
      Item$1.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      var title$1 = "browser";
      var platform$1 = "browser";
      var browser$4 = true;
      var env$1 = {};
      var argv$1 = [];
      var version$2 = "";
      var versions$1 = {};
      var release$1 = {};
      var config$1 = {};
      function noop$1() {
      }
      var on$1 = noop$1;
      var addListener$1 = noop$1;
      var once$1 = noop$1;
      var off$1 = noop$1;
      var removeListener$1 = noop$1;
      var removeAllListeners$1 = noop$1;
      var emit$1 = noop$1;
      function binding$1(name2) {
        throw new Error("process.binding is not supported");
      }
      function cwd$1() {
        return "/";
      }
      function chdir$1(dir) {
        throw new Error("process.chdir is not supported");
      }
      function umask$1() {
        return 0;
      }
      var performance$1 = global$1.performance || {};
      var performanceNow$1 = performance$1.now || performance$1.mozNow || performance$1.msNow || performance$1.oNow || performance$1.webkitNow || function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
      function hrtime$1(previousTimestamp) {
        var clocktime = performanceNow$1.call(performance$1) * 1e-3;
        var seconds = Math.floor(clocktime);
        var nanoseconds = Math.floor(clocktime % 1 * 1e9);
        if (previousTimestamp) {
          seconds = seconds - previousTimestamp[0];
          nanoseconds = nanoseconds - previousTimestamp[1];
          if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
          }
        }
        return [seconds, nanoseconds];
      }
      var startTime$1 = /* @__PURE__ */ new Date();
      function uptime$1() {
        var currentTime = /* @__PURE__ */ new Date();
        var dif = currentTime - startTime$1;
        return dif / 1e3;
      }
      var process2 = {
        nextTick: nextTick$1,
        title: title$1,
        browser: browser$4,
        env: env$1,
        argv: argv$1,
        version: version$2,
        versions: versions$1,
        on: on$1,
        addListener: addListener$1,
        once: once$1,
        off: off$1,
        removeListener: removeListener$1,
        removeAllListeners: removeAllListeners$1,
        emit: emit$1,
        binding: binding$1,
        cwd: cwd$1,
        chdir: chdir$1,
        umask: umask$1,
        hrtime: hrtime$1,
        platform: platform$1,
        release: release$1,
        config: config$1,
        uptime: uptime$1
      };
      var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : {};
      function getAugmentedNamespace(n) {
        if (n.__esModule) return n;
        var a = Object.defineProperty({}, "__esModule", { value: true });
        Object.keys(n).forEach(function(k) {
          var d2 = Object.getOwnPropertyDescriptor(n, k);
          Object.defineProperty(a, k, d2.get ? d2 : {
            enumerable: true,
            get: function() {
              return n[k];
            }
          });
        });
        return a;
      }
      function commonjsRequire(path) {
        throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
      }
      var domain;
      function EventHandlers() {
      }
      EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
      function EventEmitter$2() {
        EventEmitter$2.init.call(this);
      }
      EventEmitter$2.EventEmitter = EventEmitter$2;
      EventEmitter$2.usingDomains = false;
      EventEmitter$2.prototype.domain = void 0;
      EventEmitter$2.prototype._events = void 0;
      EventEmitter$2.prototype._maxListeners = void 0;
      EventEmitter$2.defaultMaxListeners = 10;
      EventEmitter$2.init = function() {
        this.domain = null;
        if (EventEmitter$2.usingDomains) {
          if (domain.active) ;
        }
        if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter$2.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || isNaN(n))
          throw new TypeError('"n" argument must be a positive number');
        this._maxListeners = n;
        return this;
      };
      function $getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter$2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter$2.prototype.getMaxListeners = function getMaxListeners() {
        return $getMaxListeners(this);
      };
      function emitNone(handler, isFn, self2) {
        if (isFn)
          handler.call(self2);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2);
        }
      }
      function emitOne(handler, isFn, self2, arg1) {
        if (isFn)
          handler.call(self2, arg1);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1);
        }
      }
      function emitTwo(handler, isFn, self2, arg1, arg2) {
        if (isFn)
          handler.call(self2, arg1, arg2);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1, arg2);
        }
      }
      function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
        if (isFn)
          handler.call(self2, arg1, arg2, arg3);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1, arg2, arg3);
        }
      }
      function emitMany(handler, isFn, self2, args) {
        if (isFn)
          handler.apply(self2, args);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].apply(self2, args);
        }
      }
      EventEmitter$2.prototype.emit = function emit3(type) {
        var er, handler, len, args, i, events, domain2;
        var doError = type === "error";
        events = this._events;
        if (events)
          doError = doError && events.error == null;
        else if (!doError)
          return false;
        domain2 = this.domain;
        if (doError) {
          er = arguments[1];
          if (domain2) {
            if (!er)
              er = new Error('Uncaught, unspecified "error" event');
            er.domainEmitter = this;
            er.domain = domain2;
            er.domainThrown = false;
            domain2.emit("error", er);
          } else if (er instanceof Error) {
            throw er;
          } else {
            var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
            err.context = er;
            throw err;
          }
          return false;
        }
        handler = events[type];
        if (!handler)
          return false;
        var isFn = typeof handler === "function";
        len = arguments.length;
        switch (len) {
          // fast cases
          case 1:
            emitNone(handler, isFn, this);
            break;
          case 2:
            emitOne(handler, isFn, this, arguments[1]);
            break;
          case 3:
            emitTwo(handler, isFn, this, arguments[1], arguments[2]);
            break;
          case 4:
            emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
            break;
          // slower
          default:
            args = new Array(len - 1);
            for (i = 1; i < len; i++)
              args[i - 1] = arguments[i];
            emitMany(handler, isFn, this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m2;
        var events;
        var existing;
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        events = target._events;
        if (!events) {
          events = target._events = new EventHandlers();
          target._eventsCount = 0;
        } else {
          if (events.newListener) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (!existing) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else {
            if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            }
          }
          if (!existing.warned) {
            m2 = $getMaxListeners(target);
            if (m2 && m2 > 0 && existing.length > m2) {
              existing.warned = true;
              var w2 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type + " listeners added. Use emitter.setMaxListeners() to increase limit");
              w2.name = "MaxListenersExceededWarning";
              w2.emitter = target;
              w2.type = type;
              w2.count = existing.length;
              emitWarning$1(w2);
            }
          }
        }
        return target;
      }
      function emitWarning$1(e) {
        typeof console.warn === "function" ? console.warn(e) : console.log(e);
      }
      EventEmitter$2.prototype.addListener = function addListener3(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter$2.prototype.on = EventEmitter$2.prototype.addListener;
      EventEmitter$2.prototype.prependListener = function prependListener2(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function _onceWrap(target, type, listener) {
        var fired = false;
        function g() {
          target.removeListener(type, g);
          if (!fired) {
            fired = true;
            listener.apply(target, arguments);
          }
        }
        g.listener = listener;
        return g;
      }
      EventEmitter$2.prototype.once = function once3(type, listener) {
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter$2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter$2.prototype.removeListener = function removeListener3(type, listener) {
        var list2, events, position, i, originalListener;
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        events = this._events;
        if (!events)
          return this;
        list2 = events[type];
        if (!list2)
          return this;
        if (list2 === listener || list2.listener && list2.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list2.listener || listener);
          }
        } else if (typeof list2 !== "function") {
          position = -1;
          for (i = list2.length; i-- > 0; ) {
            if (list2[i] === listener || list2[i].listener && list2[i].listener === listener) {
              originalListener = list2[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (list2.length === 1) {
            list2[0] = void 0;
            if (--this._eventsCount === 0) {
              this._events = new EventHandlers();
              return this;
            } else {
              delete events[type];
            }
          } else {
            spliceOne(list2, position);
          }
          if (events.removeListener)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter$2.prototype.off = function(type, listener) {
        return this.removeListener(type, listener);
      };
      EventEmitter$2.prototype.removeAllListeners = function removeAllListeners3(type) {
        var listeners, events;
        events = this._events;
        if (!events)
          return this;
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = new EventHandlers();
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = new EventHandlers();
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys2 = Object.keys(events);
          for (var i = 0, key; i < keys2.length; ++i) {
            key = keys2[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = new EventHandlers();
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners) {
          do {
            this.removeListener(type, listeners[listeners.length - 1]);
          } while (listeners[0]);
        }
        return this;
      };
      EventEmitter$2.prototype.listeners = function listeners(type) {
        var evlistener;
        var ret;
        var events = this._events;
        if (!events)
          ret = [];
        else {
          evlistener = events[type];
          if (!evlistener)
            ret = [];
          else if (typeof evlistener === "function")
            ret = [evlistener.listener || evlistener];
          else
            ret = unwrapListeners(evlistener);
        }
        return ret;
      };
      EventEmitter$2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount$1.call(emitter, type);
        }
      };
      EventEmitter$2.prototype.listenerCount = listenerCount$1;
      function listenerCount$1(type) {
        var events = this._events;
        if (events) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter$2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      };
      function spliceOne(list2, index) {
        for (var i = index, k = i + 1, n = list2.length; k < n; i += 1, k += 1)
          list2[i] = list2[k];
        list2.pop();
      }
      function arrayClone(arr, i) {
        var copy2 = new Array(i);
        while (i--)
          copy2[i] = arr[i];
        return copy2;
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      var _polyfillNode_events = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": EventEmitter$2,
        EventEmitter: EventEmitter$2
      });
      var lookup$1 = [];
      var revLookup$1 = [];
      var Arr$1 = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var inited$1 = false;
      function init$1() {
        inited$1 = true;
        var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup$1[i] = code[i];
          revLookup$1[code.charCodeAt(i)] = i;
        }
        revLookup$1["-".charCodeAt(0)] = 62;
        revLookup$1["_".charCodeAt(0)] = 63;
      }
      function toByteArray$1(b64) {
        if (!inited$1) {
          init$1();
        }
        var i, j, l, tmp, placeHolders, arr;
        var len = b64.length;
        if (len % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
        arr = new Arr$1(len * 3 / 4 - placeHolders);
        l = placeHolders > 0 ? len - 4 : len;
        var L = 0;
        for (i = 0, j = 0; i < l; i += 4, j += 3) {
          tmp = revLookup$1[b64.charCodeAt(i)] << 18 | revLookup$1[b64.charCodeAt(i + 1)] << 12 | revLookup$1[b64.charCodeAt(i + 2)] << 6 | revLookup$1[b64.charCodeAt(i + 3)];
          arr[L++] = tmp >> 16 & 255;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        if (placeHolders === 2) {
          tmp = revLookup$1[b64.charCodeAt(i)] << 2 | revLookup$1[b64.charCodeAt(i + 1)] >> 4;
          arr[L++] = tmp & 255;
        } else if (placeHolders === 1) {
          tmp = revLookup$1[b64.charCodeAt(i)] << 10 | revLookup$1[b64.charCodeAt(i + 1)] << 4 | revLookup$1[b64.charCodeAt(i + 2)] >> 2;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64$1(num) {
        return lookup$1[num >> 18 & 63] + lookup$1[num >> 12 & 63] + lookup$1[num >> 6 & 63] + lookup$1[num & 63];
      }
      function encodeChunk$1(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i = start; i < end; i += 3) {
          tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
          output.push(tripletToBase64$1(tmp));
        }
        return output.join("");
      }
      function fromByteArray$1(uint8) {
        if (!inited$1) {
          init$1();
        }
        var tmp;
        var len = uint8.length;
        var extraBytes = len % 3;
        var output = "";
        var parts = [];
        var maxChunkLength = 16383;
        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk$1(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len - 1];
          output += lookup$1[tmp >> 2];
          output += lookup$1[tmp << 4 & 63];
          output += "==";
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + uint8[len - 1];
          output += lookup$1[tmp >> 10];
          output += lookup$1[tmp >> 4 & 63];
          output += lookup$1[tmp << 2 & 63];
          output += "=";
        }
        parts.push(output);
        return parts.join("");
      }
      function read$1(buffer, offset, isLE, mLen, nBytes) {
        var e, m2;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d2 = isLE ? -1 : 1;
        var s2 = buffer[offset + i];
        i += d2;
        e = s2 & (1 << -nBits) - 1;
        s2 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d2, nBits -= 8) {
        }
        m2 = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m2 = m2 * 256 + buffer[offset + i], i += d2, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m2 ? NaN : (s2 ? -1 : 1) * Infinity;
        } else {
          m2 = m2 + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s2 ? -1 : 1) * m2 * Math.pow(2, e - mLen);
      }
      function write$1(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m2, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d2 = isLE ? 1 : -1;
        var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m2 = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m2 = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m2 = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m2 & 255, i += d2, m2 /= 256, mLen -= 8) {
        }
        e = e << mLen | m2;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d2, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d2] |= s2 * 128;
      }
      var toString$2 = {}.toString;
      var isArray$2 = Array.isArray || function(arr) {
        return toString$2.call(arr) == "[object Array]";
      };
      var INSPECT_MAX_BYTES$1 = 50;
      Buffer$1.TYPED_ARRAY_SUPPORT = global$2.TYPED_ARRAY_SUPPORT !== void 0 ? global$2.TYPED_ARRAY_SUPPORT : true;
      kMaxLength$1();
      function kMaxLength$1() {
        return Buffer$1.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function createBuffer$1(that, length) {
        if (kMaxLength$1() < length) {
          throw new RangeError("Invalid typed array length");
        }
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length);
          that.__proto__ = Buffer$1.prototype;
        } else {
          if (that === null) {
            that = new Buffer$1(length);
          }
          that.length = length;
        }
        return that;
      }
      function Buffer$1(arg, encodingOrOffset, length) {
        if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
          return new Buffer$1(arg, encodingOrOffset, length);
        }
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          }
          return allocUnsafe$1(this, arg);
        }
        return from$1(this, arg, encodingOrOffset, length);
      }
      Buffer$1.poolSize = 8192;
      Buffer$1._augment = function(arr) {
        arr.__proto__ = Buffer$1.prototype;
        return arr;
      };
      function from$1(that, value, encodingOrOffset, length) {
        if (typeof value === "number") {
          throw new TypeError('"value" argument must not be a number');
        }
        if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
          return fromArrayBuffer$1(that, value, encodingOrOffset, length);
        }
        if (typeof value === "string") {
          return fromString$1(that, value, encodingOrOffset);
        }
        return fromObject$1(that, value);
      }
      Buffer$1.from = function(value, encodingOrOffset, length) {
        return from$1(null, value, encodingOrOffset, length);
      };
      if (Buffer$1.TYPED_ARRAY_SUPPORT) {
        Buffer$1.prototype.__proto__ = Uint8Array.prototype;
        Buffer$1.__proto__ = Uint8Array;
      }
      function assertSize$1(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be a number');
        } else if (size < 0) {
          throw new RangeError('"size" argument must not be negative');
        }
      }
      function alloc$1(that, size, fill2, encoding) {
        assertSize$1(size);
        if (size <= 0) {
          return createBuffer$1(that, size);
        }
        if (fill2 !== void 0) {
          return typeof encoding === "string" ? createBuffer$1(that, size).fill(fill2, encoding) : createBuffer$1(that, size).fill(fill2);
        }
        return createBuffer$1(that, size);
      }
      Buffer$1.alloc = function(size, fill2, encoding) {
        return alloc$1(null, size, fill2, encoding);
      };
      function allocUnsafe$1(that, size) {
        assertSize$1(size);
        that = createBuffer$1(that, size < 0 ? 0 : checked$1(size) | 0);
        if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
          for (var i = 0; i < size; ++i) {
            that[i] = 0;
          }
        }
        return that;
      }
      Buffer$1.allocUnsafe = function(size) {
        return allocUnsafe$1(null, size);
      };
      Buffer$1.allocUnsafeSlow = function(size) {
        return allocUnsafe$1(null, size);
      };
      function fromString$1(that, string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer$1.isEncoding(encoding)) {
          throw new TypeError('"encoding" must be a valid string encoding');
        }
        var length = byteLength$1(string, encoding) | 0;
        that = createBuffer$1(that, length);
        var actual = that.write(string, encoding);
        if (actual !== length) {
          that = that.slice(0, actual);
        }
        return that;
      }
      function fromArrayLike$1(that, array2) {
        var length = array2.length < 0 ? 0 : checked$1(array2.length) | 0;
        that = createBuffer$1(that, length);
        for (var i = 0; i < length; i += 1) {
          that[i] = array2[i] & 255;
        }
        return that;
      }
      function fromArrayBuffer$1(that, array2, byteOffset, length) {
        array2.byteLength;
        if (byteOffset < 0 || array2.byteLength < byteOffset) {
          throw new RangeError("'offset' is out of bounds");
        }
        if (array2.byteLength < byteOffset + (length || 0)) {
          throw new RangeError("'length' is out of bounds");
        }
        if (byteOffset === void 0 && length === void 0) {
          array2 = new Uint8Array(array2);
        } else if (length === void 0) {
          array2 = new Uint8Array(array2, byteOffset);
        } else {
          array2 = new Uint8Array(array2, byteOffset, length);
        }
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          that = array2;
          that.__proto__ = Buffer$1.prototype;
        } else {
          that = fromArrayLike$1(that, array2);
        }
        return that;
      }
      function fromObject$1(that, obj) {
        if (internalIsBuffer$1(obj)) {
          var len = checked$1(obj.length) | 0;
          that = createBuffer$1(that, len);
          if (that.length === 0) {
            return that;
          }
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if (typeof obj.length !== "number" || isnan$1(obj.length)) {
              return createBuffer$1(that, 0);
            }
            return fromArrayLike$1(that, obj);
          }
          if (obj.type === "Buffer" && isArray$2(obj.data)) {
            return fromArrayLike$1(that, obj.data);
          }
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function checked$1(length) {
        if (length >= kMaxLength$1()) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength$1().toString(16) + " bytes");
        }
        return length | 0;
      }
      Buffer$1.isBuffer = isBuffer$2;
      function internalIsBuffer$1(b) {
        return !!(b != null && b._isBuffer);
      }
      Buffer$1.compare = function compare3(a, b) {
        if (!internalIsBuffer$1(a) || !internalIsBuffer$1(b)) {
          throw new TypeError("Arguments must be Buffers");
        }
        if (a === b) return 0;
        var x = a.length;
        var y2 = b.length;
        for (var i = 0, len = Math.min(x, y2); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y2 = b[i];
            break;
          }
        }
        if (x < y2) return -1;
        if (y2 < x) return 1;
        return 0;
      };
      Buffer$1.isEncoding = function isEncoding2(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer$1.concat = function concat2(list2, length) {
        if (!isArray$2(list2)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list2.length === 0) {
          return Buffer$1.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list2.length; ++i) {
            length += list2[i].length;
          }
        }
        var buffer = Buffer$1.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list2.length; ++i) {
          var buf = list2[i];
          if (!internalIsBuffer$1(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength$1(string, encoding) {
        if (internalIsBuffer$1(string)) {
          return string.length;
        }
        if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          string = "" + string;
        }
        var len = string.length;
        if (len === 0) return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
            case void 0:
              return utf8ToBytes$1(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes$1(string).length;
            default:
              if (loweredCase) return utf8ToBytes$1(string).length;
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer$1.byteLength = byteLength$1;
      function slowToString$1(encoding, start, end) {
        var loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice$1(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice$1(this, start, end);
            case "ascii":
              return asciiSlice$1(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice$1(this, start, end);
            case "base64":
              return base64Slice$1(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice$1(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer$1.prototype._isBuffer = true;
      function swap$1(b, n, m2) {
        var i = b[n];
        b[n] = b[m2];
        b[m2] = i;
      }
      Buffer$1.prototype.swap16 = function swap162() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap$1(this, i, i + 1);
        }
        return this;
      };
      Buffer$1.prototype.swap32 = function swap322() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap$1(this, i, i + 3);
          swap$1(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer$1.prototype.swap64 = function swap642() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap$1(this, i, i + 7);
          swap$1(this, i + 1, i + 6);
          swap$1(this, i + 2, i + 5);
          swap$1(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer$1.prototype.toString = function toString3() {
        var length = this.length | 0;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice$1(this, 0, length);
        return slowToString$1.apply(this, arguments);
      };
      Buffer$1.prototype.equals = function equals2(b) {
        if (!internalIsBuffer$1(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer$1.compare(this, b) === 0;
      };
      Buffer$1.prototype.inspect = function inspect2() {
        var str = "";
        var max = INSPECT_MAX_BYTES$1;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          if (this.length > max) str += " ... ";
        }
        return "<Buffer " + str + ">";
      };
      Buffer$1.prototype.compare = function compare3(target, start, end, thisStart, thisEnd) {
        if (!internalIsBuffer$1(target)) {
          throw new TypeError("Argument must be a Buffer");
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y2 = end - start;
        var len = Math.min(x, y2);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y2 = targetCopy[i];
            break;
          }
        }
        if (x < y2) return -1;
        if (y2 < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf$1(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (isNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer$1.from(val, encoding);
        }
        if (internalIsBuffer$1(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf$1(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (Buffer$1.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf$1(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf$1(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read2(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
              if (read2(arr, i + j) !== read2(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer$1.prototype.includes = function includes2(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer$1.prototype.indexOf = function indexOf3(val, byteOffset, encoding) {
        return bidirectionalIndexOf$1(this, val, byteOffset, encoding, true);
      };
      Buffer$1.prototype.lastIndexOf = function lastIndexOf2(val, byteOffset, encoding) {
        return bidirectionalIndexOf$1(this, val, byteOffset, encoding, false);
      };
      function hexWrite$1(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (isNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write$1(buf, string, offset, length) {
        return blitBuffer$1(utf8ToBytes$1(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite$1(buf, string, offset, length) {
        return blitBuffer$1(asciiToBytes$1(string), buf, offset, length);
      }
      function latin1Write$1(buf, string, offset, length) {
        return asciiWrite$1(buf, string, offset, length);
      }
      function base64Write$1(buf, string, offset, length) {
        return blitBuffer$1(base64ToBytes$1(string), buf, offset, length);
      }
      function ucs2Write$1(buf, string, offset, length) {
        return blitBuffer$1(utf16leToBytes$1(string, buf.length - offset), buf, offset, length);
      }
      Buffer$1.prototype.write = function write3(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length)) {
            length = length | 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite$1(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write$1(this, string, offset, length);
            case "ascii":
              return asciiWrite$1(this, string, offset, length);
            case "latin1":
            case "binary":
              return latin1Write$1(this, string, offset, length);
            case "base64":
              return base64Write$1(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write$1(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer$1.prototype.toJSON = function toJSON2() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice$1(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return fromByteArray$1(buf);
        } else {
          return fromByteArray$1(buf.slice(start, end));
        }
      }
      function utf8Slice$1(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray$1(res);
      }
      var MAX_ARGUMENTS_LENGTH$1 = 4096;
      function decodeCodePointsArray$1(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH$1) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = "";
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH$1)
          );
        }
        return res;
      }
      function asciiSlice$1(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice$1(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice$1(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        var out = "";
        for (var i = start; i < end; ++i) {
          out += toHex$1(buf[i]);
        }
        return out;
      }
      function utf16leSlice$1(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer$1.prototype.slice = function slice2(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        var newBuf;
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer$1.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer$1(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }
        return newBuf;
      };
      function checkOffset$1(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer$1.prototype.readUIntLE = function readUIntLE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) checkOffset$1(offset, byteLength3, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength3 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer$1.prototype.readUIntBE = function readUIntBE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          checkOffset$1(offset, byteLength3, this.length);
        }
        var val = this[offset + --byteLength3];
        var mul = 1;
        while (byteLength3 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength3] * mul;
        }
        return val;
      };
      Buffer$1.prototype.readUInt8 = function readUInt82(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 1, this.length);
        return this[offset];
      };
      Buffer$1.prototype.readUInt16LE = function readUInt16LE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer$1.prototype.readUInt16BE = function readUInt16BE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer$1.prototype.readUInt32LE = function readUInt32LE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer$1.prototype.readUInt32BE = function readUInt32BE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer$1.prototype.readIntLE = function readIntLE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) checkOffset$1(offset, byteLength3, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength3 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
        return val;
      };
      Buffer$1.prototype.readIntBE = function readIntBE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) checkOffset$1(offset, byteLength3, this.length);
        var i = byteLength3;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
        return val;
      };
      Buffer$1.prototype.readInt8 = function readInt82(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer$1.prototype.readInt16LE = function readInt16LE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer$1.prototype.readInt16BE = function readInt16BE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer$1.prototype.readInt32LE = function readInt32LE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer$1.prototype.readInt32BE = function readInt32BE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer$1.prototype.readFloatLE = function readFloatLE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 4, this.length);
        return read$1(this, offset, true, 23, 4);
      };
      Buffer$1.prototype.readFloatBE = function readFloatBE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 4, this.length);
        return read$1(this, offset, false, 23, 4);
      };
      Buffer$1.prototype.readDoubleLE = function readDoubleLE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 8, this.length);
        return read$1(this, offset, true, 52, 8);
      };
      Buffer$1.prototype.readDoubleBE = function readDoubleBE2(offset, noAssert) {
        if (!noAssert) checkOffset$1(offset, 8, this.length);
        return read$1(this, offset, false, 52, 8);
      };
      function checkInt$1(buf, value, offset, ext, max, min2) {
        if (!internalIsBuffer$1(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min2) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer$1.prototype.writeUIntLE = function writeUIntLE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
          checkInt$1(this, value, offset, byteLength3, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength3 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength3;
      };
      Buffer$1.prototype.writeUIntBE = function writeUIntBE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
          checkInt$1(this, value, offset, byteLength3, maxBytes, 0);
        }
        var i = byteLength3 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength3;
      };
      Buffer$1.prototype.writeUInt8 = function writeUInt82(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 1, 255, 0);
        if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
        this[offset] = value & 255;
        return offset + 1;
      };
      function objectWriteUInt16$1(buf, value, offset, littleEndian) {
        if (value < 0) value = 65535 + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
          buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }
      Buffer$1.prototype.writeUInt16LE = function writeUInt16LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 2, 65535, 0);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16$1(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer$1.prototype.writeUInt16BE = function writeUInt16BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 2, 65535, 0);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16$1(this, value, offset, false);
        }
        return offset + 2;
      };
      function objectWriteUInt32$1(buf, value, offset, littleEndian) {
        if (value < 0) value = 4294967295 + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
        }
      }
      Buffer$1.prototype.writeUInt32LE = function writeUInt32LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 4, 4294967295, 0);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 255;
        } else {
          objectWriteUInt32$1(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer$1.prototype.writeUInt32BE = function writeUInt32BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 4, 4294967295, 0);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32$1(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer$1.prototype.writeIntLE = function writeIntLE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength3 - 1);
          checkInt$1(this, value, offset, byteLength3, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength3 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength3;
      };
      Buffer$1.prototype.writeIntBE = function writeIntBE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength3 - 1);
          checkInt$1(this, value, offset, byteLength3, limit - 1, -limit);
        }
        var i = byteLength3 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength3;
      };
      Buffer$1.prototype.writeInt8 = function writeInt82(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 1, 127, -128);
        if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer$1.prototype.writeInt16LE = function writeInt16LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 2, 32767, -32768);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16$1(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer$1.prototype.writeInt16BE = function writeInt16BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 2, 32767, -32768);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16$1(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer$1.prototype.writeInt32LE = function writeInt32LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else {
          objectWriteUInt32$1(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer$1.prototype.writeInt32BE = function writeInt32BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt$1(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        if (Buffer$1.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32$1(this, value, offset, false);
        }
        return offset + 4;
      };
      function checkIEEE754$1(buf, value, offset, ext, max, min2) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat$1(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754$1(buf, value, offset, 4);
        }
        write$1(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer$1.prototype.writeFloatLE = function writeFloatLE2(value, offset, noAssert) {
        return writeFloat$1(this, value, offset, true, noAssert);
      };
      Buffer$1.prototype.writeFloatBE = function writeFloatBE2(value, offset, noAssert) {
        return writeFloat$1(this, value, offset, false, noAssert);
      };
      function writeDouble$1(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754$1(buf, value, offset, 8);
        }
        write$1(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer$1.prototype.writeDoubleLE = function writeDoubleLE2(value, offset, noAssert) {
        return writeDouble$1(this, value, offset, true, noAssert);
      };
      Buffer$1.prototype.writeDoubleBE = function writeDoubleBE2(value, offset, noAssert) {
        return writeDouble$1(this, value, offset, false, noAssert);
      };
      Buffer$1.prototype.copy = function copy2(target, targetStart, start, end) {
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1e3 || !Buffer$1.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, start + len),
            targetStart
          );
        }
        return len;
      };
      Buffer$1.prototype.fill = function fill2(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer$1.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
        } else if (typeof val === "number") {
          val = val & 255;
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = internalIsBuffer$1(val) ? val : utf8ToBytes$1(new Buffer$1(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var INVALID_BASE64_RE$1 = /[^+\/0-9A-Za-z-_]/g;
      function base64clean$1(str) {
        str = stringtrim$1(str).replace(INVALID_BASE64_RE$1, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function stringtrim$1(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      function toHex$1(n) {
        if (n < 16) return "0" + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes$1(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes$1(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes$1(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes$1(str) {
        return toByteArray$1(base64clean$1(str));
      }
      function blitBuffer$1(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isnan$1(val) {
        return val !== val;
      }
      function isBuffer$2(obj) {
        return obj != null && (!!obj._isBuffer || isFastBuffer$1(obj) || isSlowBuffer$1(obj));
      }
      function isFastBuffer$1(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      }
      function isSlowBuffer$1(obj) {
        return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer$1(obj.slice(0, 0));
      }
      function defaultSetTimout2() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout2() {
        throw new Error("clearTimeout has not been defined");
      }
      var cachedSetTimeout2 = defaultSetTimout2;
      var cachedClearTimeout2 = defaultClearTimeout2;
      if (typeof global$2.setTimeout === "function") {
        cachedSetTimeout2 = setTimeout;
      }
      if (typeof global$2.clearTimeout === "function") {
        cachedClearTimeout2 = clearTimeout;
      }
      function runTimeout2(fun) {
        if (cachedSetTimeout2 === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout2 === defaultSetTimout2 || !cachedSetTimeout2) && setTimeout) {
          cachedSetTimeout2 = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout2(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout2.call(null, fun, 0);
          } catch (e2) {
            return cachedSetTimeout2.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout2(marker) {
        if (cachedClearTimeout2 === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout2 === defaultClearTimeout2 || !cachedClearTimeout2) && clearTimeout) {
          cachedClearTimeout2 = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout2(marker);
        } catch (e) {
          try {
            return cachedClearTimeout2.call(null, marker);
          } catch (e2) {
            return cachedClearTimeout2.call(this, marker);
          }
        }
      }
      var queue2 = [];
      var draining2 = false;
      var currentQueue2;
      var queueIndex2 = -1;
      function cleanUpNextTick2() {
        if (!draining2 || !currentQueue2) {
          return;
        }
        draining2 = false;
        if (currentQueue2.length) {
          queue2 = currentQueue2.concat(queue2);
        } else {
          queueIndex2 = -1;
        }
        if (queue2.length) {
          drainQueue2();
        }
      }
      function drainQueue2() {
        if (draining2) {
          return;
        }
        var timeout2 = runTimeout2(cleanUpNextTick2);
        draining2 = true;
        var len = queue2.length;
        while (len) {
          currentQueue2 = queue2;
          queue2 = [];
          while (++queueIndex2 < len) {
            if (currentQueue2) {
              currentQueue2[queueIndex2].run();
            }
          }
          queueIndex2 = -1;
          len = queue2.length;
        }
        currentQueue2 = null;
        draining2 = false;
        runClearTimeout2(timeout2);
      }
      function nextTick2(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue2.push(new Item2(fun, args));
        if (queue2.length === 1 && !draining2) {
          runTimeout2(drainQueue2);
        }
      }
      function Item2(fun, array2) {
        this.fun = fun;
        this.array = array2;
      }
      Item2.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      var title2 = "browser";
      var platform2 = "browser";
      var browser$3 = true;
      var env2 = {};
      var argv2 = [];
      var version$1 = "";
      var versions2 = {};
      var release2 = {};
      var config2 = {};
      function noop2() {
      }
      var on2 = noop2;
      var addListener2 = noop2;
      var once2 = noop2;
      var off2 = noop2;
      var removeListener2 = noop2;
      var removeAllListeners2 = noop2;
      var emit2 = noop2;
      function binding2(name2) {
        throw new Error("process.binding is not supported");
      }
      function cwd2() {
        return "/";
      }
      function chdir2(dir) {
        throw new Error("process.chdir is not supported");
      }
      function umask2() {
        return 0;
      }
      var performance2 = global$2.performance || {};
      var performanceNow2 = performance2.now || performance2.mozNow || performance2.msNow || performance2.oNow || performance2.webkitNow || function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
      function hrtime2(previousTimestamp) {
        var clocktime = performanceNow2.call(performance2) * 1e-3;
        var seconds = Math.floor(clocktime);
        var nanoseconds = Math.floor(clocktime % 1 * 1e9);
        if (previousTimestamp) {
          seconds = seconds - previousTimestamp[0];
          nanoseconds = nanoseconds - previousTimestamp[1];
          if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
          }
        }
        return [seconds, nanoseconds];
      }
      var startTime2 = /* @__PURE__ */ new Date();
      function uptime2() {
        var currentTime = /* @__PURE__ */ new Date();
        var dif = currentTime - startTime2;
        return dif / 1e3;
      }
      var browser$1$1 = {
        nextTick: nextTick2,
        title: title2,
        browser: browser$3,
        env: env2,
        argv: argv2,
        version: version$1,
        versions: versions2,
        on: on2,
        addListener: addListener2,
        once: once2,
        off: off2,
        removeListener: removeListener2,
        removeAllListeners: removeAllListeners2,
        emit: emit2,
        binding: binding2,
        cwd: cwd2,
        chdir: chdir2,
        umask: umask2,
        hrtime: hrtime2,
        platform: platform2,
        release: release2,
        config: config2,
        uptime: uptime2
      };
      var inherits$2;
      if (typeof Object.create === "function") {
        inherits$2 = function inherits2(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        inherits$2 = function inherits2(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
      var inherits$3 = inherits$2;
      var formatRegExp = /%[sdj%]/g;
      function format$1(f) {
        if (!isString$1(f)) {
          var objects = [];
          for (var i = 0; i < arguments.length; i++) {
            objects.push(inspect(arguments[i]));
          }
          return objects.join(" ");
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function(x2) {
          if (x2 === "%%") return "%";
          if (i >= len) return x2;
          switch (x2) {
            case "%s":
              return String(args[i++]);
            case "%d":
              return Number(args[i++]);
            case "%j":
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return "[Circular]";
              }
            default:
              return x2;
          }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
          if (isNull(x) || !isObject(x)) {
            str += " " + x;
          } else {
            str += " " + inspect(x);
          }
        }
        return str;
      }
      function deprecate$1(fn, msg) {
        if (isUndefined(global$2.process)) {
          return function() {
            return deprecate$1(fn, msg).apply(this, arguments);
          };
        }
        if (browser$1$1.noDeprecation === true) {
          return fn;
        }
        var warned = false;
        function deprecated() {
          if (!warned) {
            if (browser$1$1.throwDeprecation) {
              throw new Error(msg);
            } else if (browser$1$1.traceDeprecation) {
              console.trace(msg);
            } else {
              console.error(msg);
            }
            warned = true;
          }
          return fn.apply(this, arguments);
        }
        return deprecated;
      }
      var debugs = {};
      var debugEnviron;
      function debuglog(set) {
        if (isUndefined(debugEnviron))
          debugEnviron = browser$1$1.env.NODE_DEBUG || "";
        set = set.toUpperCase();
        if (!debugs[set]) {
          if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
            var pid = 0;
            debugs[set] = function() {
              var msg = format$1.apply(null, arguments);
              console.error("%s %d: %s", set, pid, msg);
            };
          } else {
            debugs[set] = function() {
            };
          }
        }
        return debugs[set];
      }
      function inspect(obj, opts) {
        var ctx = {
          seen: [],
          stylize: stylizeNoColor
        };
        if (arguments.length >= 3) ctx.depth = arguments[2];
        if (arguments.length >= 4) ctx.colors = arguments[3];
        if (isBoolean(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          _extend(ctx, opts);
        }
        if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
        if (isUndefined(ctx.depth)) ctx.depth = 2;
        if (isUndefined(ctx.colors)) ctx.colors = false;
        if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
        if (ctx.colors) ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }
      inspect.colors = {
        "bold": [1, 22],
        "italic": [3, 23],
        "underline": [4, 24],
        "inverse": [7, 27],
        "white": [37, 39],
        "grey": [90, 39],
        "black": [30, 39],
        "blue": [34, 39],
        "cyan": [36, 39],
        "green": [32, 39],
        "magenta": [35, 39],
        "red": [31, 39],
        "yellow": [33, 39]
      };
      inspect.styles = {
        "special": "cyan",
        "number": "yellow",
        "boolean": "yellow",
        "undefined": "grey",
        "null": "bold",
        "string": "green",
        "date": "magenta",
        // "name": intentionally not styling
        "regexp": "red"
      };
      function stylizeWithColor(str, styleType) {
        var style = inspect.styles[styleType];
        if (style) {
          return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
        } else {
          return str;
        }
      }
      function stylizeNoColor(str, styleType) {
        return str;
      }
      function arrayToHash(array2) {
        var hash = {};
        array2.forEach(function(val, idx) {
          hash[val] = true;
        });
        return hash;
      }
      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
        value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
          var ret = value.inspect(recurseTimes, ctx);
          if (!isString$1(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
          }
          return ret;
        }
        var primitive = formatPrimitive(ctx, value);
        if (primitive) {
          return primitive;
        }
        var keys2 = Object.keys(value);
        var visibleKeys = arrayToHash(keys2);
        if (ctx.showHidden) {
          keys2 = Object.getOwnPropertyNames(value);
        }
        if (isError$1(value) && (keys2.indexOf("message") >= 0 || keys2.indexOf("description") >= 0)) {
          return formatError(value);
        }
        if (keys2.length === 0) {
          if (isFunction(value)) {
            var name2 = value.name ? ": " + value.name : "";
            return ctx.stylize("[Function" + name2 + "]", "special");
          }
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          }
          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), "date");
          }
          if (isError$1(value)) {
            return formatError(value);
          }
        }
        var base2 = "", array2 = false, braces = ["{", "}"];
        if (isArray$1(value)) {
          array2 = true;
          braces = ["[", "]"];
        }
        if (isFunction(value)) {
          var n = value.name ? ": " + value.name : "";
          base2 = " [Function" + n + "]";
        }
        if (isRegExp(value)) {
          base2 = " " + RegExp.prototype.toString.call(value);
        }
        if (isDate(value)) {
          base2 = " " + Date.prototype.toUTCString.call(value);
        }
        if (isError$1(value)) {
          base2 = " " + formatError(value);
        }
        if (keys2.length === 0 && (!array2 || value.length == 0)) {
          return braces[0] + base2 + braces[1];
        }
        if (recurseTimes < 0) {
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          } else {
            return ctx.stylize("[Object]", "special");
          }
        }
        ctx.seen.push(value);
        var output;
        if (array2) {
          output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2);
        } else {
          output = keys2.map(function(key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array2);
          });
        }
        ctx.seen.pop();
        return reduceToSingleString(output, base2, braces);
      }
      function formatPrimitive(ctx, value) {
        if (isUndefined(value))
          return ctx.stylize("undefined", "undefined");
        if (isString$1(value)) {
          var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
          return ctx.stylize(simple, "string");
        }
        if (isNumber(value))
          return ctx.stylize("" + value, "number");
        if (isBoolean(value))
          return ctx.stylize("" + value, "boolean");
        if (isNull(value))
          return ctx.stylize("null", "null");
      }
      function formatError(value) {
        return "[" + Error.prototype.toString.call(value) + "]";
      }
      function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
        var output = [];
        for (var i = 0, l = value.length; i < l; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              String(i),
              true
            ));
          } else {
            output.push("");
          }
        }
        keys2.forEach(function(key) {
          if (!key.match(/^\d+$/)) {
            output.push(formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              key,
              true
            ));
          }
        });
        return output;
      }
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array2) {
        var name2, str, desc;
        desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
        if (desc.get) {
          if (desc.set) {
            str = ctx.stylize("[Getter/Setter]", "special");
          } else {
            str = ctx.stylize("[Getter]", "special");
          }
        } else {
          if (desc.set) {
            str = ctx.stylize("[Setter]", "special");
          }
        }
        if (!hasOwnProperty(visibleKeys, key)) {
          name2 = "[" + key + "]";
        }
        if (!str) {
          if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
              str = formatValue(ctx, desc.value, null);
            } else {
              str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf("\n") > -1) {
              if (array2) {
                str = str.split("\n").map(function(line2) {
                  return "  " + line2;
                }).join("\n").substr(2);
              } else {
                str = "\n" + str.split("\n").map(function(line2) {
                  return "   " + line2;
                }).join("\n");
              }
            }
          } else {
            str = ctx.stylize("[Circular]", "special");
          }
        }
        if (isUndefined(name2)) {
          if (array2 && key.match(/^\d+$/)) {
            return str;
          }
          name2 = JSON.stringify("" + key);
          if (name2.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name2 = name2.substr(1, name2.length - 2);
            name2 = ctx.stylize(name2, "name");
          } else {
            name2 = name2.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name2 = ctx.stylize(name2, "string");
          }
        }
        return name2 + ": " + str;
      }
      function reduceToSingleString(output, base2, braces) {
        var length = output.reduce(function(prev, cur) {
          if (cur.indexOf("\n") >= 0) ;
          return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
        }, 0);
        if (length > 60) {
          return braces[0] + (base2 === "" ? "" : base2 + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
        }
        return braces[0] + base2 + " " + output.join(", ") + " " + braces[1];
      }
      function isArray$1(ar) {
        return Array.isArray(ar);
      }
      function isBoolean(arg) {
        return typeof arg === "boolean";
      }
      function isNull(arg) {
        return arg === null;
      }
      function isNullOrUndefined(arg) {
        return arg == null;
      }
      function isNumber(arg) {
        return typeof arg === "number";
      }
      function isString$1(arg) {
        return typeof arg === "string";
      }
      function isSymbol(arg) {
        return typeof arg === "symbol";
      }
      function isUndefined(arg) {
        return arg === void 0;
      }
      function isRegExp(re) {
        return isObject(re) && objectToString(re) === "[object RegExp]";
      }
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      function isDate(d2) {
        return isObject(d2) && objectToString(d2) === "[object Date]";
      }
      function isError$1(e) {
        return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
      }
      function isFunction(arg) {
        return typeof arg === "function";
      }
      function isPrimitive(arg) {
        return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
        typeof arg === "undefined";
      }
      function isBuffer$1(maybeBuf) {
        return Buffer$1.isBuffer(maybeBuf);
      }
      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }
      function pad(n) {
        return n < 10 ? "0" + n.toString(10) : n.toString(10);
      }
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      function timestamp() {
        var d2 = /* @__PURE__ */ new Date();
        var time = [
          pad(d2.getHours()),
          pad(d2.getMinutes()),
          pad(d2.getSeconds())
        ].join(":");
        return [d2.getDate(), months[d2.getMonth()], time].join(" ");
      }
      function log() {
        console.log("%s - %s", timestamp(), format$1.apply(null, arguments));
      }
      function _extend(origin, add) {
        if (!add || !isObject(add)) return origin;
        var keys2 = Object.keys(add);
        var i = keys2.length;
        while (i--) {
          origin[keys2[i]] = add[keys2[i]];
        }
        return origin;
      }
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      var _polyfillNode_util = {
        inherits: inherits$3,
        _extend,
        log,
        isBuffer: isBuffer$1,
        isPrimitive,
        isFunction,
        isError: isError$1,
        isDate,
        isObject,
        isRegExp,
        isUndefined,
        isSymbol,
        isString: isString$1,
        isNumber,
        isNullOrUndefined,
        isNull,
        isBoolean,
        isArray: isArray$1,
        inspect,
        deprecate: deprecate$1,
        format: format$1,
        debuglog
      };
      var _polyfillNode_util$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        format: format$1,
        deprecate: deprecate$1,
        debuglog,
        inspect,
        isArray: isArray$1,
        isBoolean,
        isNull,
        isNullOrUndefined,
        isNumber,
        isString: isString$1,
        isSymbol,
        isUndefined,
        isRegExp,
        isObject,
        isDate,
        isError: isError$1,
        isFunction,
        isPrimitive,
        isBuffer: isBuffer$1,
        log,
        inherits: inherits$3,
        _extend,
        "default": _polyfillNode_util
      });
      function BufferList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList.prototype.push = function(v2) {
        var entry = { data: v2, next: null };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList.prototype.unshift = function(v2) {
        var entry = { data: v2, next: this.head };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList.prototype.shift = function() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList.prototype.clear = function() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList.prototype.join = function(s2) {
        if (this.length === 0) return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s2 + p.data;
        }
        return ret;
      };
      BufferList.prototype.concat = function(n) {
        if (this.length === 0) return Buffer$1.alloc(0);
        if (this.length === 1) return this.head.data;
        var ret = Buffer$1.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          p.data.copy(ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
      var isBufferEncoding = Buffer$1.isEncoding || function(encoding) {
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function assertEncoding(encoding) {
        if (encoding && !isBufferEncoding(encoding)) {
          throw new Error("Unknown encoding: " + encoding);
        }
      }
      function StringDecoder(encoding) {
        this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
        assertEncoding(encoding);
        switch (this.encoding) {
          case "utf8":
            this.surrogateSize = 3;
            break;
          case "ucs2":
          case "utf16le":
            this.surrogateSize = 2;
            this.detectIncompleteChar = utf16DetectIncompleteChar;
            break;
          case "base64":
            this.surrogateSize = 3;
            this.detectIncompleteChar = base64DetectIncompleteChar;
            break;
          default:
            this.write = passThroughWrite;
            return;
        }
        this.charBuffer = new Buffer$1(6);
        this.charReceived = 0;
        this.charLength = 0;
      }
      StringDecoder.prototype.write = function(buffer) {
        var charStr = "";
        while (this.charLength) {
          var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
          buffer.copy(this.charBuffer, this.charReceived, 0, available);
          this.charReceived += available;
          if (this.charReceived < this.charLength) {
            return "";
          }
          buffer = buffer.slice(available, buffer.length);
          charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
          var charCode = charStr.charCodeAt(charStr.length - 1);
          if (charCode >= 55296 && charCode <= 56319) {
            this.charLength += this.surrogateSize;
            charStr = "";
            continue;
          }
          this.charReceived = this.charLength = 0;
          if (buffer.length === 0) {
            return charStr;
          }
          break;
        }
        this.detectIncompleteChar(buffer);
        var end = buffer.length;
        if (this.charLength) {
          buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
          end -= this.charReceived;
        }
        charStr += buffer.toString(this.encoding, 0, end);
        var end = charStr.length - 1;
        var charCode = charStr.charCodeAt(end);
        if (charCode >= 55296 && charCode <= 56319) {
          var size = this.surrogateSize;
          this.charLength += size;
          this.charReceived += size;
          this.charBuffer.copy(this.charBuffer, size, 0, size);
          buffer.copy(this.charBuffer, 0, 0, size);
          return charStr.substring(0, end);
        }
        return charStr;
      };
      StringDecoder.prototype.detectIncompleteChar = function(buffer) {
        var i = buffer.length >= 3 ? 3 : buffer.length;
        for (; i > 0; i--) {
          var c = buffer[buffer.length - i];
          if (i == 1 && c >> 5 == 6) {
            this.charLength = 2;
            break;
          }
          if (i <= 2 && c >> 4 == 14) {
            this.charLength = 3;
            break;
          }
          if (i <= 3 && c >> 3 == 30) {
            this.charLength = 4;
            break;
          }
        }
        this.charReceived = i;
      };
      StringDecoder.prototype.end = function(buffer) {
        var res = "";
        if (buffer && buffer.length)
          res = this.write(buffer);
        if (this.charReceived) {
          var cr = this.charReceived;
          var buf = this.charBuffer;
          var enc = this.encoding;
          res += buf.slice(0, cr).toString(enc);
        }
        return res;
      };
      function passThroughWrite(buffer) {
        return buffer.toString(this.encoding);
      }
      function utf16DetectIncompleteChar(buffer) {
        this.charReceived = buffer.length % 2;
        this.charLength = this.charReceived ? 2 : 0;
      }
      function base64DetectIncompleteChar(buffer) {
        this.charReceived = buffer.length % 3;
        this.charLength = this.charReceived ? 3 : 0;
      }
      Readable.ReadableState = ReadableState;
      var debug$2 = debuglog("stream");
      inherits$3(Readable, EventEmitter$2);
      function prependListener(emitter, event, fn) {
        if (typeof emitter.prependListener === "function") {
          return emitter.prependListener(event, fn);
        } else {
          if (!emitter._events || !emitter._events[event])
            emitter.on(event, fn);
          else if (Array.isArray(emitter._events[event]))
            emitter._events[event].unshift(fn);
          else
            emitter._events[event] = [fn, emitter._events[event]];
        }
      }
      function listenerCount(emitter, type) {
        return emitter.listeners(type).length;
      }
      function ReadableState(options, stream) {
        options = options || {};
        this.objectMode = !!options.objectMode;
        if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
        var hwm = options.highWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
        this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
        this.highWaterMark = ~~this.highWaterMark;
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = null;
        this.pipesCount = 0;
        this.flowing = null;
        this.ended = false;
        this.endEmitted = false;
        this.reading = false;
        this.sync = true;
        this.needReadable = false;
        this.emittedReadable = false;
        this.readableListening = false;
        this.resumeScheduled = false;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.ranOut = false;
        this.awaitDrain = 0;
        this.readingMore = false;
        this.decoder = null;
        this.encoding = null;
        if (options.encoding) {
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      function Readable(options) {
        if (!(this instanceof Readable)) return new Readable(options);
        this._readableState = new ReadableState(options, this);
        this.readable = true;
        if (options && typeof options.read === "function") this._read = options.read;
        EventEmitter$2.call(this);
      }
      Readable.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        if (!state.objectMode && typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer$1.from(chunk, encoding);
            encoding = "";
          }
        }
        return readableAddChunk(this, state, chunk, encoding, false);
      };
      Readable.prototype.unshift = function(chunk) {
        var state = this._readableState;
        return readableAddChunk(this, state, chunk, "", true);
      };
      Readable.prototype.isPaused = function() {
        return this._readableState.flowing === false;
      };
      function readableAddChunk(stream, state, chunk, encoding, addToFront) {
        var er = chunkInvalid(state, chunk);
        if (er) {
          stream.emit("error", er);
        } else if (chunk === null) {
          state.reading = false;
          onEofChunk(stream, state);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (state.ended && !addToFront) {
            var e = new Error("stream.push() after EOF");
            stream.emit("error", e);
          } else if (state.endEmitted && addToFront) {
            var _e = new Error("stream.unshift() after end event");
            stream.emit("error", _e);
          } else {
            var skipAdd;
            if (state.decoder && !addToFront && !encoding) {
              chunk = state.decoder.write(chunk);
              skipAdd = !state.objectMode && chunk.length === 0;
            }
            if (!addToFront) state.reading = false;
            if (!skipAdd) {
              if (state.flowing && state.length === 0 && !state.sync) {
                stream.emit("data", chunk);
                stream.read(0);
              } else {
                state.length += state.objectMode ? 1 : chunk.length;
                if (addToFront) state.buffer.unshift(chunk);
                else state.buffer.push(chunk);
                if (state.needReadable) emitReadable(stream);
              }
            }
            maybeReadMore(stream, state);
          }
        } else if (!addToFront) {
          state.reading = false;
        }
        return needMoreData(state);
      }
      function needMoreData(state) {
        return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
      }
      Readable.prototype.setEncoding = function(enc) {
        this._readableState.decoder = new StringDecoder(enc);
        this._readableState.encoding = enc;
        return this;
      };
      var MAX_HWM = 8388608;
      function computeNewHighWaterMark(n) {
        if (n >= MAX_HWM) {
          n = MAX_HWM;
        } else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended) return 0;
        if (state.objectMode) return 1;
        if (n !== n) {
          if (state.flowing && state.length) return state.buffer.head.data.length;
          else return state.length;
        }
        if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
        if (n <= state.length) return n;
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        }
        return state.length;
      }
      Readable.prototype.read = function(n) {
        debug$2("read", n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        if (n !== 0) state.emittedReadable = false;
        if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
          debug$2("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended) endReadable(this);
          else emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0) endReadable(this);
          return null;
        }
        var doRead = state.needReadable;
        debug$2("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug$2("length less than watermark", doRead);
        }
        if (state.ended || state.reading) {
          doRead = false;
          debug$2("reading or ended", doRead);
        } else if (doRead) {
          debug$2("do read");
          state.reading = true;
          state.sync = true;
          if (state.length === 0) state.needReadable = true;
          this._read(state.highWaterMark);
          state.sync = false;
          if (!state.reading) n = howMuchToRead(nOrig, state);
        }
        var ret;
        if (n > 0) ret = fromList(n, state);
        else ret = null;
        if (ret === null) {
          state.needReadable = true;
          n = 0;
        } else {
          state.length -= n;
        }
        if (state.length === 0) {
          if (!state.ended) state.needReadable = true;
          if (nOrig !== n && state.ended) endReadable(this);
        }
        if (ret !== null) this.emit("data", ret);
        return ret;
      };
      function chunkInvalid(state, chunk) {
        var er = null;
        if (!Buffer$1.isBuffer(chunk) && typeof chunk !== "string" && chunk !== null && chunk !== void 0 && !state.objectMode) {
          er = new TypeError("Invalid non-string/buffer chunk");
        }
        return er;
      }
      function onEofChunk(stream, state) {
        if (state.ended) return;
        if (state.decoder) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        emitReadable(stream);
      }
      function emitReadable(stream) {
        var state = stream._readableState;
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug$2("emitReadable", state.flowing);
          state.emittedReadable = true;
          if (state.sync) nextTick2(emitReadable_, stream);
          else emitReadable_(stream);
        }
      }
      function emitReadable_(stream) {
        debug$2("emit readable");
        stream.emit("readable");
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        if (!state.readingMore) {
          state.readingMore = true;
          nextTick2(maybeReadMore_, stream, state);
        }
      }
      function maybeReadMore_(stream, state) {
        var len = state.length;
        while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
          debug$2("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length)
            break;
          else len = state.length;
        }
        state.readingMore = false;
      }
      Readable.prototype._read = function(n) {
        this.emit("error", new Error("not implemented"));
      };
      Readable.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch (state.pipesCount) {
          case 0:
            state.pipes = dest;
            break;
          case 1:
            state.pipes = [state.pipes, dest];
            break;
          default:
            state.pipes.push(dest);
            break;
        }
        state.pipesCount += 1;
        debug$2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var doEnd = !pipeOpts || pipeOpts.end !== false;
        var endFn = doEnd ? onend2 : cleanup;
        if (state.endEmitted) nextTick2(endFn);
        else src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable) {
          debug$2("onunpipe");
          if (readable === src) {
            cleanup();
          }
        }
        function onend2() {
          debug$2("onend");
          dest.end();
        }
        var ondrain = pipeOnDrain(src);
        dest.on("drain", ondrain);
        var cleanedUp = false;
        function cleanup() {
          debug$2("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          dest.removeListener("drain", ondrain);
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend2);
          src.removeListener("end", cleanup);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
        }
        var increasedAwaitDrain = false;
        src.on("data", ondata);
        function ondata(chunk) {
          debug$2("ondata");
          increasedAwaitDrain = false;
          var ret = dest.write(chunk);
          if (false === ret && !increasedAwaitDrain) {
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf2(state.pipes, dest) !== -1) && !cleanedUp) {
              debug$2("false write response, pause", src._readableState.awaitDrain);
              src._readableState.awaitDrain++;
              increasedAwaitDrain = true;
            }
            src.pause();
          }
        }
        function onerror(er) {
          debug$2("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (listenerCount(dest, "error") === 0) dest.emit("error", er);
        }
        prependListener(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug$2("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug$2("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (!state.flowing) {
          debug$2("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src) {
        return function() {
          var state = src._readableState;
          debug$2("pipeOnDrain", state.awaitDrain);
          if (state.awaitDrain) state.awaitDrain--;
          if (state.awaitDrain === 0 && src.listeners("data").length) {
            state.flowing = true;
            flow(src);
          }
        };
      }
      Readable.prototype.unpipe = function(dest) {
        var state = this._readableState;
        if (state.pipesCount === 0) return this;
        if (state.pipesCount === 1) {
          if (dest && dest !== state.pipes) return this;
          if (!dest) dest = state.pipes;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          if (dest) dest.emit("unpipe", this);
          return this;
        }
        if (!dest) {
          var dests = state.pipes;
          var len = state.pipesCount;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          for (var _i = 0; _i < len; _i++) {
            dests[_i].emit("unpipe", this);
          }
          return this;
        }
        var i = indexOf2(state.pipes, dest);
        if (i === -1) return this;
        state.pipes.splice(i, 1);
        state.pipesCount -= 1;
        if (state.pipesCount === 1) state.pipes = state.pipes[0];
        dest.emit("unpipe", this);
        return this;
      };
      Readable.prototype.on = function(ev, fn) {
        var res = EventEmitter$2.prototype.on.call(this, ev, fn);
        if (ev === "data") {
          if (this._readableState.flowing !== false) this.resume();
        } else if (ev === "readable") {
          var state = this._readableState;
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.emittedReadable = false;
            if (!state.reading) {
              nextTick2(nReadingNextTick, this);
            } else if (state.length) {
              emitReadable(this);
            }
          }
        }
        return res;
      };
      Readable.prototype.addListener = Readable.prototype.on;
      function nReadingNextTick(self2) {
        debug$2("readable nexttick read 0");
        self2.read(0);
      }
      Readable.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
          debug$2("resume");
          state.flowing = true;
          resume(this, state);
        }
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          nextTick2(resume_, stream, state);
        }
      }
      function resume_(stream, state) {
        if (!state.reading) {
          debug$2("resume read 0");
          stream.read(0);
        }
        state.resumeScheduled = false;
        state.awaitDrain = 0;
        stream.emit("resume");
        flow(stream);
        if (state.flowing && !state.reading) stream.read(0);
      }
      Readable.prototype.pause = function() {
        debug$2("call pause flowing=%j", this._readableState.flowing);
        if (false !== this._readableState.flowing) {
          debug$2("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        return this;
      };
      function flow(stream) {
        var state = stream._readableState;
        debug$2("flow", state.flowing);
        while (state.flowing && stream.read() !== null) {
        }
      }
      Readable.prototype.wrap = function(stream) {
        var state = this._readableState;
        var paused = false;
        var self2 = this;
        stream.on("end", function() {
          debug$2("wrapped end");
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) self2.push(chunk);
          }
          self2.push(null);
        });
        stream.on("data", function(chunk) {
          debug$2("wrapped data");
          if (state.decoder) chunk = state.decoder.write(chunk);
          if (state.objectMode && (chunk === null || chunk === void 0)) return;
          else if (!state.objectMode && (!chunk || !chunk.length)) return;
          var ret = self2.push(chunk);
          if (!ret) {
            paused = true;
            stream.pause();
          }
        });
        for (var i in stream) {
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = /* @__PURE__ */ function(method2) {
              return function() {
                return stream[method2].apply(stream, arguments);
              };
            }(i);
          }
        }
        var events = ["error", "close", "destroy", "pause", "resume"];
        forEach(events, function(ev) {
          stream.on(ev, self2.emit.bind(self2, ev));
        });
        self2._read = function(n) {
          debug$2("wrapped _read", n);
          if (paused) {
            paused = false;
            stream.resume();
          }
        };
        return self2;
      };
      Readable._fromList = fromList;
      function fromList(n, state) {
        if (state.length === 0) return null;
        var ret;
        if (state.objectMode) ret = state.buffer.shift();
        else if (!n || n >= state.length) {
          if (state.decoder) ret = state.buffer.join("");
          else if (state.buffer.length === 1) ret = state.buffer.head.data;
          else ret = state.buffer.concat(state.length);
          state.buffer.clear();
        } else {
          ret = fromListPartial(n, state.buffer, state.decoder);
        }
        return ret;
      }
      function fromListPartial(n, list2, hasStrings) {
        var ret;
        if (n < list2.head.data.length) {
          ret = list2.head.data.slice(0, n);
          list2.head.data = list2.head.data.slice(n);
        } else if (n === list2.head.data.length) {
          ret = list2.shift();
        } else {
          ret = hasStrings ? copyFromBufferString(n, list2) : copyFromBuffer(n, list2);
        }
        return ret;
      }
      function copyFromBufferString(n, list2) {
        var p = list2.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          if (nb === str.length) ret += str;
          else ret += str.slice(0, n);
          n -= nb;
          if (n === 0) {
            if (nb === str.length) {
              ++c;
              if (p.next) list2.head = p.next;
              else list2.head = list2.tail = null;
            } else {
              list2.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        list2.length -= c;
        return ret;
      }
      function copyFromBuffer(n, list2) {
        var ret = Buffer$1.allocUnsafe(n);
        var p = list2.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (n === 0) {
            if (nb === buf.length) {
              ++c;
              if (p.next) list2.head = p.next;
              else list2.head = list2.tail = null;
            } else {
              list2.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        list2.length -= c;
        return ret;
      }
      function endReadable(stream) {
        var state = stream._readableState;
        if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
        if (!state.endEmitted) {
          state.ended = true;
          nextTick2(endReadableNT, state, stream);
        }
      }
      function endReadableNT(state, stream) {
        if (!state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.readable = false;
          stream.emit("end");
        }
      }
      function forEach(xs, f) {
        for (var i = 0, l = xs.length; i < l; i++) {
          f(xs[i], i);
        }
      }
      function indexOf2(xs, x) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) return i;
        }
        return -1;
      }
      Writable.WritableState = WritableState;
      inherits$3(Writable, EventEmitter$2);
      function nop() {
      }
      function WriteReq(chunk, encoding, cb) {
        this.chunk = chunk;
        this.encoding = encoding;
        this.callback = cb;
        this.next = null;
      }
      function WritableState(options, stream) {
        Object.defineProperty(this, "buffer", {
          get: deprecate$1(function() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
        });
        options = options || {};
        this.objectMode = !!options.objectMode;
        if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
        var hwm = options.highWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
        this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
        this.highWaterMark = ~~this.highWaterMark;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        var noDecode = options.decodeStrings === false;
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = function(er) {
          onwrite(stream, er);
        };
        this.writecb = null;
        this.writelen = 0;
        this.bufferedRequest = null;
        this.lastBufferedRequest = null;
        this.pendingcb = 0;
        this.prefinished = false;
        this.errorEmitted = false;
        this.bufferedRequestCount = 0;
        this.corkedRequestsFree = new CorkedRequest(this);
      }
      WritableState.prototype.getBuffer = function writableStateGetBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while (current) {
          out.push(current);
          current = current.next;
        }
        return out;
      };
      function Writable(options) {
        if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);
        this._writableState = new WritableState(options, this);
        this.writable = true;
        if (options) {
          if (typeof options.write === "function") this._write = options.write;
          if (typeof options.writev === "function") this._writev = options.writev;
        }
        EventEmitter$2.call(this);
      }
      Writable.prototype.pipe = function() {
        this.emit("error", new Error("Cannot pipe, not readable"));
      };
      function writeAfterEnd(stream, cb) {
        var er = new Error("write after end");
        stream.emit("error", er);
        nextTick2(cb, er);
      }
      function validChunk(stream, state, chunk, cb) {
        var valid = true;
        var er = false;
        if (chunk === null) {
          er = new TypeError("May not write null values to stream");
        } else if (!Buffer$1.isBuffer(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
          er = new TypeError("Invalid non-string/buffer chunk");
        }
        if (er) {
          stream.emit("error", er);
          nextTick2(cb, er);
          valid = false;
        }
        return valid;
      }
      Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (Buffer$1.isBuffer(chunk)) encoding = "buffer";
        else if (!encoding) encoding = state.defaultEncoding;
        if (typeof cb !== "function") cb = nop;
        if (state.ended) writeAfterEnd(this, cb);
        else if (validChunk(this, state, chunk, cb)) {
          state.pendingcb++;
          ret = writeOrBuffer(this, state, chunk, encoding, cb);
        }
        return ret;
      };
      Writable.prototype.cork = function() {
        var state = this._writableState;
        state.corked++;
      };
      Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        if (typeof encoding === "string") encoding = encoding.toLowerCase();
        if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      function decodeChunk(state, chunk, encoding) {
        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
          chunk = Buffer$1.from(chunk, encoding);
        }
        return chunk;
      }
      function writeOrBuffer(stream, state, chunk, encoding, cb) {
        chunk = decodeChunk(state, chunk, encoding);
        if (Buffer$1.isBuffer(chunk)) encoding = "buffer";
        var len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        var ret = state.length < state.highWaterMark;
        if (!ret) state.needDrain = true;
        if (state.writing || state.corked) {
          var last = state.lastBufferedRequest;
          state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
          if (last) {
            last.next = state.lastBufferedRequest;
          } else {
            state.bufferedRequest = state.lastBufferedRequest;
          }
          state.bufferedRequestCount += 1;
        } else {
          doWrite(stream, state, false, len, chunk, encoding, cb);
        }
        return ret;
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (writev) stream._writev(chunk, state.onwrite);
        else stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      function onwriteError(stream, state, sync, er, cb) {
        --state.pendingcb;
        if (sync) nextTick2(cb, er);
        else cb(er);
        stream._writableState.errorEmitted = true;
        stream.emit("error", er);
      }
      function onwriteStateUpdate(state) {
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
      }
      function onwrite(stream, er) {
        var state = stream._writableState;
        var sync = state.sync;
        var cb = state.writecb;
        onwriteStateUpdate(state);
        if (er) onwriteError(stream, state, sync, er, cb);
        else {
          var finished = needFinish(state);
          if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
            clearBuffer(stream, state);
          }
          if (sync) {
            nextTick2(afterWrite, stream, state, finished, cb);
          } else {
            afterWrite(stream, state, finished, cb);
          }
        }
      }
      function afterWrite(stream, state, finished, cb) {
        if (!finished) onwriteDrain(stream, state);
        state.pendingcb--;
        cb();
        finishMaybe(stream, state);
      }
      function onwriteDrain(stream, state) {
        if (state.length === 0 && state.needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
      }
      function clearBuffer(stream, state) {
        state.bufferProcessing = true;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
          var l = state.bufferedRequestCount;
          var buffer = new Array(l);
          var holder = state.corkedRequestsFree;
          holder.entry = entry;
          var count = 0;
          while (entry) {
            buffer[count] = entry;
            entry = entry.next;
            count += 1;
          }
          doWrite(stream, state, true, state.length, buffer, "", holder.finish);
          state.pendingcb++;
          state.lastBufferedRequest = null;
          if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
          } else {
            state.corkedRequestsFree = new CorkedRequest(state);
          }
        } else {
          while (entry) {
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            if (state.writing) {
              break;
            }
          }
          if (entry === null) state.lastBufferedRequest = null;
        }
        state.bufferedRequestCount = 0;
        state.bufferedRequest = entry;
        state.bufferProcessing = false;
      }
      Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new Error("not implemented"));
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (!state.ending && !state.finished) endWritable(this, state, cb);
      };
      function needFinish(state) {
        return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
      }
      function prefinish(stream, state) {
        if (!state.prefinished) {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
      function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need) {
          if (state.pendingcb === 0) {
            prefinish(stream, state);
            state.finished = true;
            stream.emit("finish");
          } else {
            prefinish(stream, state);
          }
        }
        return need;
      }
      function endWritable(stream, state, cb) {
        state.ending = true;
        finishMaybe(stream, state);
        if (cb) {
          if (state.finished) nextTick2(cb);
          else stream.once("finish", cb);
        }
        state.ended = true;
        stream.writable = false;
      }
      function CorkedRequest(state) {
        var _this = this;
        this.next = null;
        this.entry = null;
        this.finish = function(err) {
          var entry = _this.entry;
          _this.entry = null;
          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          }
          if (state.corkedRequestsFree) {
            state.corkedRequestsFree.next = _this;
          } else {
            state.corkedRequestsFree = _this;
          }
        };
      }
      inherits$3(Duplex, Readable);
      var keys = Object.keys(Writable.prototype);
      for (var v = 0; v < keys.length; v++) {
        var method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
      function Duplex(options) {
        if (!(this instanceof Duplex)) return new Duplex(options);
        Readable.call(this, options);
        Writable.call(this, options);
        if (options && options.readable === false) this.readable = false;
        if (options && options.writable === false) this.writable = false;
        this.allowHalfOpen = true;
        if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
        this.once("end", onend);
      }
      function onend() {
        if (this.allowHalfOpen || this._writableState.ended) return;
        nextTick2(onEndNT, this);
      }
      function onEndNT(self2) {
        self2.end();
      }
      inherits$3(Transform, Duplex);
      function TransformState(stream) {
        this.afterTransform = function(er, data) {
          return afterTransform(stream, er, data);
        };
        this.needTransform = false;
        this.transforming = false;
        this.writecb = null;
        this.writechunk = null;
        this.writeencoding = null;
      }
      function afterTransform(stream, er, data) {
        var ts = stream._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (!cb) return stream.emit("error", new Error("no writecb in Transform class"));
        ts.writechunk = null;
        ts.writecb = null;
        if (data !== null && data !== void 0) stream.push(data);
        cb(er);
        var rs = stream._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          stream._read(rs.highWaterMark);
        }
      }
      function Transform(options) {
        if (!(this instanceof Transform)) return new Transform(options);
        Duplex.call(this, options);
        this._transformState = new TransformState(this);
        var stream = this;
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (options) {
          if (typeof options.transform === "function") this._transform = options.transform;
          if (typeof options.flush === "function") this._flush = options.flush;
        }
        this.once("prefinish", function() {
          if (typeof this._flush === "function") this._flush(function(er) {
            done(stream, er);
          });
          else done(stream);
        });
      }
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        throw new Error("Not implemented");
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      function done(stream, er) {
        if (er) return stream.emit("error", er);
        var ws = stream._writableState;
        var ts = stream._transformState;
        if (ws.length) throw new Error("Calling transform done when ws.length != 0");
        if (ts.transforming) throw new Error("Calling transform done when still transforming");
        return stream.push(null);
      }
      inherits$3(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough)) return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
      inherits$3(Stream, EventEmitter$2);
      Stream.Readable = Readable;
      Stream.Writable = Writable;
      Stream.Duplex = Duplex;
      Stream.Transform = Transform;
      Stream.PassThrough = PassThrough;
      Stream.Stream = Stream;
      function Stream() {
        EventEmitter$2.call(this);
      }
      Stream.prototype.pipe = function(dest, options) {
        var source = this;
        function ondata(chunk) {
          if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
              source.pause();
            }
          }
        }
        source.on("data", ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        dest.on("drain", ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on("end", onend2);
          source.on("close", onclose);
        }
        var didOnEnd = false;
        function onend2() {
          if (didOnEnd) return;
          didOnEnd = true;
          dest.end();
        }
        function onclose() {
          if (didOnEnd) return;
          didOnEnd = true;
          if (typeof dest.destroy === "function") dest.destroy();
        }
        function onerror(er) {
          cleanup();
          if (EventEmitter$2.listenerCount(this, "error") === 0) {
            throw er;
          }
        }
        source.on("error", onerror);
        dest.on("error", onerror);
        function cleanup() {
          source.removeListener("data", ondata);
          dest.removeListener("drain", ondrain);
          source.removeListener("end", onend2);
          source.removeListener("close", onclose);
          source.removeListener("error", onerror);
          dest.removeListener("error", onerror);
          source.removeListener("end", cleanup);
          source.removeListener("close", cleanup);
          dest.removeListener("close", cleanup);
        }
        source.on("end", cleanup);
        source.on("close", cleanup);
        dest.on("close", cleanup);
        dest.emit("pipe", source);
        return dest;
      };
      var _polyfillNode_stream = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": Stream,
        Readable,
        Writable,
        Duplex,
        Transform,
        PassThrough,
        Stream
      });
      var require$$0$2 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_stream);
      var require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_util$1);
      var WritableStream = require$$0$2.Writable;
      var inherits$1 = require$$0$1.inherits;
      var browserStdout = BrowserStdout;
      inherits$1(BrowserStdout, WritableStream);
      function BrowserStdout(opts) {
        if (!(this instanceof BrowserStdout)) return new BrowserStdout(opts);
        opts = opts || {};
        WritableStream.call(this, opts);
        this.label = opts.label !== void 0 ? opts.label : "stdout";
      }
      BrowserStdout.prototype._write = function(chunks, encoding, cb) {
        var output = chunks.toString ? chunks.toString() : chunks;
        if (this.label === false) {
          console.log(output);
        } else {
          console.log(this.label + ":", output);
        }
        nextTick$1(cb);
      };
      var parseQuery$1 = function parseQuery2(qs) {
        return qs.replace("?", "").split("&").reduce(function(obj, pair) {
          var i = pair.indexOf("=");
          var key = pair.slice(0, i);
          var val = pair.slice(++i);
          obj[key] = decodeURIComponent(val.replace(/\+/g, "%20"));
          return obj;
        }, {});
      };
      function highlight(js) {
        return js.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>').replace(/('.*?')/gm, '<span class="string">$1</span>').replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>').replace(/(\d+)/gm, '<span class="number">$1</span>').replace(
          /\bnew[ \t]+(\w+)/gm,
          '<span class="keyword">new</span> <span class="init">$1</span>'
        ).replace(
          /\b(function|new|throw|return|var|if|else)\b/gm,
          '<span class="keyword">$1</span>'
        );
      }
      var highlightTags$1 = function highlightTags2(name2) {
        var code = document.getElementById("mocha").getElementsByTagName(name2);
        for (var i = 0, len = code.length; i < len; ++i) {
          code[i].innerHTML = highlight(code[i].innerHTML);
        }
      };
      var mocha$1 = { exports: {} };
      var escapeStringRegexp = (string) => {
        if (typeof string !== "string") {
          throw new TypeError("Expected a string");
        }
        return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
      };
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === ".") {
            parts.splice(i, 1);
          } else if (last === "..") {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift("..");
          }
        }
        return parts;
      }
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      var splitPath = function(filename) {
        return splitPathRe.exec(filename).slice(1);
      };
      function resolve() {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : "/";
          if (typeof path !== "string") {
            throw new TypeError("Arguments to path.resolve must be strings");
          } else if (!path) {
            continue;
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charAt(0) === "/";
        }
        resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
          return !!p;
        }), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      }
      function normalize(path) {
        var isPathAbsolute = isAbsolute(path), trailingSlash = substr(path, -1) === "/";
        path = normalizeArray(filter(path.split("/"), function(p) {
          return !!p;
        }), !isPathAbsolute).join("/");
        if (!path && !isPathAbsolute) {
          path = ".";
        }
        if (path && trailingSlash) {
          path += "/";
        }
        return (isPathAbsolute ? "/" : "") + path;
      }
      function isAbsolute(path) {
        return path.charAt(0) === "/";
      }
      function join() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return normalize(filter(paths, function(p, index) {
          if (typeof p !== "string") {
            throw new TypeError("Arguments to path.join must be strings");
          }
          return p;
        }).join("/"));
      }
      function relative(from3, to) {
        from3 = resolve(from3).substr(1);
        to = resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== "") break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== "") break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from3.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push("..");
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      }
      var sep = "/";
      var delimiter = ":";
      function dirname(path) {
        var result = splitPath(path), root = result[0], dir = result[1];
        if (!root && !dir) {
          return ".";
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      }
      function basename(path, ext) {
        var f = splitPath(path)[2];
        if (ext && f.substr(-1 * ext.length) === ext) {
          f = f.substr(0, f.length - ext.length);
        }
        return f;
      }
      function extname(path) {
        return splitPath(path)[3];
      }
      var _polyfillNode_path = {
        extname,
        basename,
        dirname,
        sep,
        delimiter,
        relative,
        join,
        isAbsolute,
        normalize,
        resolve
      };
      function filter(xs, f) {
        if (xs.filter) return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs)) res.push(xs[i]);
        }
        return res;
      }
      var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
        return str.substr(start, len);
      } : function(str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
      };
      var _polyfillNode_path$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        resolve,
        normalize,
        isAbsolute,
        join,
        relative,
        sep,
        delimiter,
        dirname,
        basename,
        extname,
        "default": _polyfillNode_path
      });
      var require$$1 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_path$1);
      var reporters = {};
      var base$1 = { exports: {} };
      var lib = {};
      var base = {};
      (function(exports2) {
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = Diff;
        function Diff() {
        }
        Diff.prototype = {
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          diff: function diff2(oldString, newString) {
            var _options$timeout;
            var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
            var callback = options.callback;
            if (typeof options === "function") {
              callback = options;
              options = {};
            }
            this.options = options;
            var self2 = this;
            function done2(value) {
              if (callback) {
                setTimeout(function() {
                  callback(void 0, value);
                }, 0);
                return true;
              } else {
                return value;
              }
            }
            oldString = this.castInput(oldString);
            newString = this.castInput(newString);
            oldString = this.removeEmpty(this.tokenize(oldString));
            newString = this.removeEmpty(this.tokenize(newString));
            var newLen = newString.length, oldLen = oldString.length;
            var editLength = 1;
            var maxEditLength = newLen + oldLen;
            if (options.maxEditLength) {
              maxEditLength = Math.min(maxEditLength, options.maxEditLength);
            }
            var maxExecutionTime = (
              /*istanbul ignore start*/
              (_options$timeout = /*istanbul ignore end*/
              options.timeout) !== null && _options$timeout !== void 0 ? _options$timeout : Infinity
            );
            var abortAfterTimestamp = Date.now() + maxExecutionTime;
            var bestPath = [{
              oldPos: -1,
              lastComponent: void 0
            }];
            var newPos = this.extractCommon(bestPath[0], newString, oldString, 0);
            if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
              return done2([{
                value: this.join(newString),
                count: newString.length
              }]);
            }
            var minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;
            function execEditLength() {
              for (var diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
                var basePath = (
                  /*istanbul ignore start*/
                  void 0
                );
                var removePath = bestPath[diagonalPath - 1], addPath = bestPath[diagonalPath + 1];
                if (removePath) {
                  bestPath[diagonalPath - 1] = void 0;
                }
                var canAdd = false;
                if (addPath) {
                  var addPathNewPos = addPath.oldPos - diagonalPath;
                  canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
                }
                var canRemove = removePath && removePath.oldPos + 1 < oldLen;
                if (!canAdd && !canRemove) {
                  bestPath[diagonalPath] = void 0;
                  continue;
                }
                if (!canRemove || canAdd && removePath.oldPos + 1 < addPath.oldPos) {
                  basePath = self2.addToPath(addPath, true, void 0, 0);
                } else {
                  basePath = self2.addToPath(removePath, void 0, true, 1);
                }
                newPos = self2.extractCommon(basePath, newString, oldString, diagonalPath);
                if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
                  return done2(buildValues(self2, basePath.lastComponent, newString, oldString, self2.useLongestToken));
                } else {
                  bestPath[diagonalPath] = basePath;
                  if (basePath.oldPos + 1 >= oldLen) {
                    maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
                  }
                  if (newPos + 1 >= newLen) {
                    minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
                  }
                }
              }
              editLength++;
            }
            if (callback) {
              (function exec() {
                setTimeout(function() {
                  if (editLength > maxEditLength || Date.now() > abortAfterTimestamp) {
                    return callback();
                  }
                  if (!execEditLength()) {
                    exec();
                  }
                }, 0);
              })();
            } else {
              while (editLength <= maxEditLength && Date.now() <= abortAfterTimestamp) {
                var ret = execEditLength();
                if (ret) {
                  return ret;
                }
              }
            }
          },
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          addToPath: function addToPath(path, added, removed, oldPosInc) {
            var last = path.lastComponent;
            if (last && last.added === added && last.removed === removed) {
              return {
                oldPos: path.oldPos + oldPosInc,
                lastComponent: {
                  count: last.count + 1,
                  added,
                  removed,
                  previousComponent: last.previousComponent
                }
              };
            } else {
              return {
                oldPos: path.oldPos + oldPosInc,
                lastComponent: {
                  count: 1,
                  added,
                  removed,
                  previousComponent: last
                }
              };
            }
          },
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
            var newLen = newString.length, oldLen = oldString.length, oldPos = basePath.oldPos, newPos = oldPos - diagonalPath, commonCount = 0;
            while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
              newPos++;
              oldPos++;
              commonCount++;
            }
            if (commonCount) {
              basePath.lastComponent = {
                count: commonCount,
                previousComponent: basePath.lastComponent
              };
            }
            basePath.oldPos = oldPos;
            return newPos;
          },
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          equals: function equals2(left, right) {
            if (this.options.comparator) {
              return this.options.comparator(left, right);
            } else {
              return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
            }
          },
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          removeEmpty: function removeEmpty(array2) {
            var ret = [];
            for (var i = 0; i < array2.length; i++) {
              if (array2[i]) {
                ret.push(array2[i]);
              }
            }
            return ret;
          },
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          castInput: function castInput(value) {
            return value;
          },
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          tokenize: function tokenize(value) {
            return value.split("");
          },
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          join: function join2(chars) {
            return chars.join("");
          }
        };
        function buildValues(diff2, lastComponent, newString, oldString, useLongestToken) {
          var components = [];
          var nextComponent;
          while (lastComponent) {
            components.push(lastComponent);
            nextComponent = lastComponent.previousComponent;
            delete lastComponent.previousComponent;
            lastComponent = nextComponent;
          }
          components.reverse();
          var componentPos = 0, componentLen = components.length, newPos = 0, oldPos = 0;
          for (; componentPos < componentLen; componentPos++) {
            var component = components[componentPos];
            if (!component.removed) {
              if (!component.added && useLongestToken) {
                var value = newString.slice(newPos, newPos + component.count);
                value = value.map(function(value2, i) {
                  var oldValue = oldString[oldPos + i];
                  return oldValue.length > value2.length ? oldValue : value2;
                });
                component.value = diff2.join(value);
              } else {
                component.value = diff2.join(newString.slice(newPos, newPos + component.count));
              }
              newPos += component.count;
              if (!component.added) {
                oldPos += component.count;
              }
            } else {
              component.value = diff2.join(oldString.slice(oldPos, oldPos + component.count));
              oldPos += component.count;
              if (componentPos && components[componentPos - 1].added) {
                var tmp = components[componentPos - 1];
                components[componentPos - 1] = components[componentPos];
                components[componentPos] = tmp;
              }
            }
          }
          var finalComponent = components[componentLen - 1];
          if (componentLen > 1 && typeof finalComponent.value === "string" && (finalComponent.added || finalComponent.removed) && diff2.equals("", finalComponent.value)) {
            components[componentLen - 2].value += finalComponent.value;
            components.pop();
          }
          return components;
        }
      })(base);
      var character = {};
      Object.defineProperty(character, "__esModule", {
        value: true
      });
      character.diffChars = diffChars;
      character.characterDiff = void 0;
      var _base$6 = _interopRequireDefault$7(base);
      function _interopRequireDefault$7(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var characterDiff = new /*istanbul ignore start*/
      _base$6[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      character.characterDiff = characterDiff;
      function diffChars(oldStr, newStr, options) {
        return characterDiff.diff(oldStr, newStr, options);
      }
      var word = {};
      var params = {};
      Object.defineProperty(params, "__esModule", {
        value: true
      });
      params.generateOptions = generateOptions;
      function generateOptions(options, defaults) {
        if (typeof options === "function") {
          defaults.callback = options;
        } else if (options) {
          for (var name2 in options) {
            if (options.hasOwnProperty(name2)) {
              defaults[name2] = options[name2];
            }
          }
        }
        return defaults;
      }
      Object.defineProperty(word, "__esModule", {
        value: true
      });
      word.diffWords = diffWords;
      word.diffWordsWithSpace = diffWordsWithSpace;
      word.wordDiff = void 0;
      var _base$5 = _interopRequireDefault$6(base);
      var _params$1 = params;
      function _interopRequireDefault$6(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
      var reWhitespace = /\S/;
      var wordDiff = new /*istanbul ignore start*/
      _base$5[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      word.wordDiff = wordDiff;
      wordDiff.equals = function(left, right) {
        if (this.options.ignoreCase) {
          left = left.toLowerCase();
          right = right.toLowerCase();
        }
        return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
      };
      wordDiff.tokenize = function(value) {
        var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);
        for (var i = 0; i < tokens.length - 1; i++) {
          if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
            tokens[i] += tokens[i + 2];
            tokens.splice(i + 1, 2);
            i--;
          }
        }
        return tokens;
      };
      function diffWords(oldStr, newStr, options) {
        options = /*istanbul ignore start*/
        /*istanbul ignore end*/
        /*istanbul ignore start*/
        (0, _params$1.generateOptions)(options, {
          ignoreWhitespace: true
        });
        return wordDiff.diff(oldStr, newStr, options);
      }
      function diffWordsWithSpace(oldStr, newStr, options) {
        return wordDiff.diff(oldStr, newStr, options);
      }
      var line = {};
      Object.defineProperty(line, "__esModule", {
        value: true
      });
      line.diffLines = diffLines;
      line.diffTrimmedLines = diffTrimmedLines;
      line.lineDiff = void 0;
      var _base$4 = _interopRequireDefault$5(base);
      var _params = params;
      function _interopRequireDefault$5(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var lineDiff = new /*istanbul ignore start*/
      _base$4[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      line.lineDiff = lineDiff;
      lineDiff.tokenize = function(value) {
        if (this.options.stripTrailingCr) {
          value = value.replace(/\r\n/g, "\n");
        }
        var retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
        if (!linesAndNewlines[linesAndNewlines.length - 1]) {
          linesAndNewlines.pop();
        }
        for (var i = 0; i < linesAndNewlines.length; i++) {
          var line2 = linesAndNewlines[i];
          if (i % 2 && !this.options.newlineIsToken) {
            retLines[retLines.length - 1] += line2;
          } else {
            if (this.options.ignoreWhitespace) {
              line2 = line2.trim();
            }
            retLines.push(line2);
          }
        }
        return retLines;
      };
      function diffLines(oldStr, newStr, callback) {
        return lineDiff.diff(oldStr, newStr, callback);
      }
      function diffTrimmedLines(oldStr, newStr, callback) {
        var options = (
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _params.generateOptions)(callback, {
            ignoreWhitespace: true
          })
        );
        return lineDiff.diff(oldStr, newStr, options);
      }
      var sentence = {};
      Object.defineProperty(sentence, "__esModule", {
        value: true
      });
      sentence.diffSentences = diffSentences;
      sentence.sentenceDiff = void 0;
      var _base$3 = _interopRequireDefault$4(base);
      function _interopRequireDefault$4(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var sentenceDiff = new /*istanbul ignore start*/
      _base$3[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      sentence.sentenceDiff = sentenceDiff;
      sentenceDiff.tokenize = function(value) {
        return value.split(/(\S.+?[.!?])(?=\s+|$)/);
      };
      function diffSentences(oldStr, newStr, callback) {
        return sentenceDiff.diff(oldStr, newStr, callback);
      }
      var css = {};
      Object.defineProperty(css, "__esModule", {
        value: true
      });
      css.diffCss = diffCss;
      css.cssDiff = void 0;
      var _base$2 = _interopRequireDefault$3(base);
      function _interopRequireDefault$3(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var cssDiff = new /*istanbul ignore start*/
      _base$2[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      css.cssDiff = cssDiff;
      cssDiff.tokenize = function(value) {
        return value.split(/([{}:;,]|\s+)/);
      };
      function diffCss(oldStr, newStr, callback) {
        return cssDiff.diff(oldStr, newStr, callback);
      }
      var json$1 = {};
      Object.defineProperty(json$1, "__esModule", {
        value: true
      });
      json$1.diffJson = diffJson;
      json$1.canonicalize = canonicalize;
      json$1.jsonDiff = void 0;
      var _base$1 = _interopRequireDefault$2(base);
      var _line$1 = line;
      function _interopRequireDefault$2(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      var objectPrototypeToString = Object.prototype.toString;
      var jsonDiff = new /*istanbul ignore start*/
      _base$1[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      json$1.jsonDiff = jsonDiff;
      jsonDiff.useLongestToken = true;
      jsonDiff.tokenize = /*istanbul ignore start*/
      _line$1.lineDiff.tokenize;
      jsonDiff.castInput = function(value) {
        var _this$options = (
          /*istanbul ignore end*/
          this.options
        ), undefinedReplacement = _this$options.undefinedReplacement, _this$options$stringi = _this$options.stringifyReplacer, stringifyReplacer = _this$options$stringi === void 0 ? function(k, v2) {
          return (
            /*istanbul ignore end*/
            typeof v2 === "undefined" ? undefinedReplacement : v2
          );
        } : _this$options$stringi;
        return typeof value === "string" ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, "  ");
      };
      jsonDiff.equals = function(left, right) {
        return (
          /*istanbul ignore start*/
          _base$1[
            /*istanbul ignore start*/
            "default"
            /*istanbul ignore end*/
          ].prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"))
        );
      };
      function diffJson(oldObj, newObj, options) {
        return jsonDiff.diff(oldObj, newObj, options);
      }
      function canonicalize(obj, stack, replacementStack, replacer, key) {
        stack = stack || [];
        replacementStack = replacementStack || [];
        if (replacer) {
          obj = replacer(key, obj);
        }
        var i;
        for (i = 0; i < stack.length; i += 1) {
          if (stack[i] === obj) {
            return replacementStack[i];
          }
        }
        var canonicalizedObj;
        if ("[object Array]" === objectPrototypeToString.call(obj)) {
          stack.push(obj);
          canonicalizedObj = new Array(obj.length);
          replacementStack.push(canonicalizedObj);
          for (i = 0; i < obj.length; i += 1) {
            canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
          }
          stack.pop();
          replacementStack.pop();
          return canonicalizedObj;
        }
        if (obj && obj.toJSON) {
          obj = obj.toJSON();
        }
        if (
          /*istanbul ignore start*/
          _typeof(
            /*istanbul ignore end*/
            obj
          ) === "object" && obj !== null
        ) {
          stack.push(obj);
          canonicalizedObj = {};
          replacementStack.push(canonicalizedObj);
          var sortedKeys = [], _key;
          for (_key in obj) {
            if (obj.hasOwnProperty(_key)) {
              sortedKeys.push(_key);
            }
          }
          sortedKeys.sort();
          for (i = 0; i < sortedKeys.length; i += 1) {
            _key = sortedKeys[i];
            canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
          }
          stack.pop();
          replacementStack.pop();
        } else {
          canonicalizedObj = obj;
        }
        return canonicalizedObj;
      }
      var array$1 = {};
      Object.defineProperty(array$1, "__esModule", {
        value: true
      });
      array$1.diffArrays = diffArrays;
      array$1.arrayDiff = void 0;
      var _base = _interopRequireDefault$1(base);
      function _interopRequireDefault$1(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var arrayDiff = new /*istanbul ignore start*/
      _base[
        /*istanbul ignore start*/
        "default"
        /*istanbul ignore end*/
      ]();
      array$1.arrayDiff = arrayDiff;
      arrayDiff.tokenize = function(value) {
        return value.slice();
      };
      arrayDiff.join = arrayDiff.removeEmpty = function(value) {
        return value;
      };
      function diffArrays(oldArr, newArr, callback) {
        return arrayDiff.diff(oldArr, newArr, callback);
      }
      var apply = {};
      var parse$2 = {};
      Object.defineProperty(parse$2, "__esModule", {
        value: true
      });
      parse$2.parsePatch = parsePatch;
      function parsePatch(uniDiff) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/), delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [], list2 = [], i = 0;
        function parseIndex() {
          var index = {};
          list2.push(index);
          while (i < diffstr.length) {
            var line2 = diffstr[i];
            if (/^(\-\-\-|\+\+\+|@@)\s/.test(line2)) {
              break;
            }
            var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line2);
            if (header) {
              index.index = header[1];
            }
            i++;
          }
          parseFileHeader(index);
          parseFileHeader(index);
          index.hunks = [];
          while (i < diffstr.length) {
            var _line2 = diffstr[i];
            if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line2)) {
              break;
            } else if (/^@@/.test(_line2)) {
              index.hunks.push(parseHunk());
            } else if (_line2 && options.strict) {
              throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(_line2));
            } else {
              i++;
            }
          }
        }
        function parseFileHeader(index) {
          var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);
          if (fileHeader) {
            var keyPrefix = fileHeader[1] === "---" ? "old" : "new";
            var data = fileHeader[2].split("	", 2);
            var fileName = data[0].replace(/\\\\/g, "\\");
            if (/^".*"$/.test(fileName)) {
              fileName = fileName.substr(1, fileName.length - 2);
            }
            index[keyPrefix + "FileName"] = fileName;
            index[keyPrefix + "Header"] = (data[1] || "").trim();
            i++;
          }
        }
        function parseHunk() {
          var chunkHeaderIndex = i, chunkHeaderLine = diffstr[i++], chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
          var hunk = {
            oldStart: +chunkHeader[1],
            oldLines: typeof chunkHeader[2] === "undefined" ? 1 : +chunkHeader[2],
            newStart: +chunkHeader[3],
            newLines: typeof chunkHeader[4] === "undefined" ? 1 : +chunkHeader[4],
            lines: [],
            linedelimiters: []
          };
          if (hunk.oldLines === 0) {
            hunk.oldStart += 1;
          }
          if (hunk.newLines === 0) {
            hunk.newStart += 1;
          }
          var addCount = 0, removeCount = 0;
          for (; i < diffstr.length; i++) {
            if (diffstr[i].indexOf("--- ") === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf("+++ ") === 0 && diffstr[i + 2].indexOf("@@") === 0) {
              break;
            }
            var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? " " : diffstr[i][0];
            if (operation === "+" || operation === "-" || operation === " " || operation === "\\") {
              hunk.lines.push(diffstr[i]);
              hunk.linedelimiters.push(delimiters[i] || "\n");
              if (operation === "+") {
                addCount++;
              } else if (operation === "-") {
                removeCount++;
              } else if (operation === " ") {
                addCount++;
                removeCount++;
              }
            } else {
              break;
            }
          }
          if (!addCount && hunk.newLines === 1) {
            hunk.newLines = 0;
          }
          if (!removeCount && hunk.oldLines === 1) {
            hunk.oldLines = 0;
          }
          if (options.strict) {
            if (addCount !== hunk.newLines) {
              throw new Error("Added line count did not match for hunk at line " + (chunkHeaderIndex + 1));
            }
            if (removeCount !== hunk.oldLines) {
              throw new Error("Removed line count did not match for hunk at line " + (chunkHeaderIndex + 1));
            }
          }
          return hunk;
        }
        while (i < diffstr.length) {
          parseIndex();
        }
        return list2;
      }
      var distanceIterator = {};
      (function(exports2) {
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = _default;
        function _default(start, minLine, maxLine) {
          var wantForward = true, backwardExhausted = false, forwardExhausted = false, localOffset = 1;
          return function iterator() {
            if (wantForward && !forwardExhausted) {
              if (backwardExhausted) {
                localOffset++;
              } else {
                wantForward = false;
              }
              if (start + localOffset <= maxLine) {
                return localOffset;
              }
              forwardExhausted = true;
            }
            if (!backwardExhausted) {
              if (!forwardExhausted) {
                wantForward = true;
              }
              if (minLine <= start - localOffset) {
                return -localOffset++;
              }
              backwardExhausted = true;
              return iterator();
            }
          };
        }
      })(distanceIterator);
      Object.defineProperty(apply, "__esModule", {
        value: true
      });
      apply.applyPatch = applyPatch;
      apply.applyPatches = applyPatches;
      var _parse$1 = parse$2;
      var _distanceIterator = _interopRequireDefault(distanceIterator);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      function applyPatch(source, uniDiff) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (typeof uniDiff === "string") {
          uniDiff = /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _parse$1.parsePatch)(uniDiff);
        }
        if (Array.isArray(uniDiff)) {
          if (uniDiff.length > 1) {
            throw new Error("applyPatch only works with a single input.");
          }
          uniDiff = uniDiff[0];
        }
        var lines = source.split(/\r\n|[\n\v\f\r\x85]/), delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [], hunks = uniDiff.hunks, compareLine = options.compareLine || function(lineNumber, line3, operation2, patchContent) {
          return (
            /*istanbul ignore end*/
            line3 === patchContent
          );
        }, errorCount = 0, fuzzFactor = options.fuzzFactor || 0, minLine = 0, offset = 0, removeEOFNL, addEOFNL;
        function hunkFits(hunk2, toPos2) {
          for (var j2 = 0; j2 < hunk2.lines.length; j2++) {
            var line3 = hunk2.lines[j2], operation2 = line3.length > 0 ? line3[0] : " ", content2 = line3.length > 0 ? line3.substr(1) : line3;
            if (operation2 === " " || operation2 === "-") {
              if (!compareLine(toPos2 + 1, lines[toPos2], operation2, content2)) {
                errorCount++;
                if (errorCount > fuzzFactor) {
                  return false;
                }
              }
              toPos2++;
            }
          }
          return true;
        }
        for (var i = 0; i < hunks.length; i++) {
          var hunk = hunks[i], maxLine = lines.length - hunk.oldLines, localOffset = 0, toPos = offset + hunk.oldStart - 1;
          var iterator = (
            /*istanbul ignore start*/
            /*istanbul ignore end*/
            /*istanbul ignore start*/
            (0, _distanceIterator[
              /*istanbul ignore start*/
              "default"
              /*istanbul ignore end*/
            ])(toPos, minLine, maxLine)
          );
          for (; localOffset !== void 0; localOffset = iterator()) {
            if (hunkFits(hunk, toPos + localOffset)) {
              hunk.offset = offset += localOffset;
              break;
            }
          }
          if (localOffset === void 0) {
            return false;
          }
          minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
        }
        var diffOffset = 0;
        for (var _i = 0; _i < hunks.length; _i++) {
          var _hunk = hunks[_i], _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;
          diffOffset += _hunk.newLines - _hunk.oldLines;
          for (var j = 0; j < _hunk.lines.length; j++) {
            var line2 = _hunk.lines[j], operation = line2.length > 0 ? line2[0] : " ", content = line2.length > 0 ? line2.substr(1) : line2, delimiter2 = _hunk.linedelimiters && _hunk.linedelimiters[j] || "\n";
            if (operation === " ") {
              _toPos++;
            } else if (operation === "-") {
              lines.splice(_toPos, 1);
              delimiters.splice(_toPos, 1);
            } else if (operation === "+") {
              lines.splice(_toPos, 0, content);
              delimiters.splice(_toPos, 0, delimiter2);
              _toPos++;
            } else if (operation === "\\") {
              var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
              if (previousOperation === "+") {
                removeEOFNL = true;
              } else if (previousOperation === "-") {
                addEOFNL = true;
              }
            }
          }
        }
        if (removeEOFNL) {
          while (!lines[lines.length - 1]) {
            lines.pop();
            delimiters.pop();
          }
        } else if (addEOFNL) {
          lines.push("");
          delimiters.push("\n");
        }
        for (var _k = 0; _k < lines.length - 1; _k++) {
          lines[_k] = lines[_k] + delimiters[_k];
        }
        return lines.join("");
      }
      function applyPatches(uniDiff, options) {
        if (typeof uniDiff === "string") {
          uniDiff = /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _parse$1.parsePatch)(uniDiff);
        }
        var currentIndex = 0;
        function processIndex() {
          var index = uniDiff[currentIndex++];
          if (!index) {
            return options.complete();
          }
          options.loadFile(index, function(err, data) {
            if (err) {
              return options.complete(err);
            }
            var updatedContent = applyPatch(data, index, options);
            options.patched(index, updatedContent, function(err2) {
              if (err2) {
                return options.complete(err2);
              }
              processIndex();
            });
          });
        }
        processIndex();
      }
      var merge$1 = {};
      var create = {};
      Object.defineProperty(create, "__esModule", {
        value: true
      });
      create.structuredPatch = structuredPatch;
      create.formatPatch = formatPatch;
      create.createTwoFilesPatch = createTwoFilesPatch;
      create.createPatch = createPatch;
      var _line = line;
      function _toConsumableArray$1(arr) {
        return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
      }
      function _nonIterableSpread$1() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray$1(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
      }
      function _iterableToArray$1(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
      }
      function _arrayWithoutHoles$1(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
      }
      function _arrayLikeToArray$1(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
        if (!options) {
          options = {};
        }
        if (typeof options.context === "undefined") {
          options.context = 4;
        }
        var diff2 = (
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _line.diffLines)(oldStr, newStr, options)
        );
        if (!diff2) {
          return;
        }
        diff2.push({
          value: "",
          lines: []
        });
        function contextLines(lines) {
          return lines.map(function(entry) {
            return " " + entry;
          });
        }
        var hunks = [];
        var oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
        var _loop = function _loop2(i2) {
          var current = diff2[i2], lines = current.lines || current.value.replace(/\n$/, "").split("\n");
          current.lines = lines;
          if (current.added || current.removed) {
            var _curRange;
            if (!oldRangeStart) {
              var prev = diff2[i2 - 1];
              oldRangeStart = oldLine;
              newRangeStart = newLine;
              if (prev) {
                curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
                oldRangeStart -= curRange.length;
                newRangeStart -= curRange.length;
              }
            }
            (_curRange = /*istanbul ignore end*/
            curRange).push.apply(
              /*istanbul ignore start*/
              _curRange,
              /*istanbul ignore start*/
              _toConsumableArray$1(
                /*istanbul ignore end*/
                lines.map(function(entry) {
                  return (current.added ? "+" : "-") + entry;
                })
              )
            );
            if (current.added) {
              newLine += lines.length;
            } else {
              oldLine += lines.length;
            }
          } else {
            if (oldRangeStart) {
              if (lines.length <= options.context * 2 && i2 < diff2.length - 2) {
                var _curRange2;
                (_curRange2 = /*istanbul ignore end*/
                curRange).push.apply(
                  /*istanbul ignore start*/
                  _curRange2,
                  /*istanbul ignore start*/
                  _toConsumableArray$1(
                    /*istanbul ignore end*/
                    contextLines(lines)
                  )
                );
              } else {
                var _curRange3;
                var contextSize = Math.min(lines.length, options.context);
                (_curRange3 = /*istanbul ignore end*/
                curRange).push.apply(
                  /*istanbul ignore start*/
                  _curRange3,
                  /*istanbul ignore start*/
                  _toConsumableArray$1(
                    /*istanbul ignore end*/
                    contextLines(lines.slice(0, contextSize))
                  )
                );
                var hunk = {
                  oldStart: oldRangeStart,
                  oldLines: oldLine - oldRangeStart + contextSize,
                  newStart: newRangeStart,
                  newLines: newLine - newRangeStart + contextSize,
                  lines: curRange
                };
                if (i2 >= diff2.length - 2 && lines.length <= options.context) {
                  var oldEOFNewline = /\n$/.test(oldStr);
                  var newEOFNewline = /\n$/.test(newStr);
                  var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;
                  if (!oldEOFNewline && noNlBeforeAdds && oldStr.length > 0) {
                    curRange.splice(hunk.oldLines, 0, "\\ No newline at end of file");
                  }
                  if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
                    curRange.push("\\ No newline at end of file");
                  }
                }
                hunks.push(hunk);
                oldRangeStart = 0;
                newRangeStart = 0;
                curRange = [];
              }
            }
            oldLine += lines.length;
            newLine += lines.length;
          }
        };
        for (var i = 0; i < diff2.length; i++) {
          _loop(
            /*istanbul ignore end*/
            i
          );
        }
        return {
          oldFileName,
          newFileName,
          oldHeader,
          newHeader,
          hunks
        };
      }
      function formatPatch(diff2) {
        if (Array.isArray(diff2)) {
          return diff2.map(formatPatch).join("\n");
        }
        var ret = [];
        if (diff2.oldFileName == diff2.newFileName) {
          ret.push("Index: " + diff2.oldFileName);
        }
        ret.push("===================================================================");
        ret.push("--- " + diff2.oldFileName + (typeof diff2.oldHeader === "undefined" ? "" : "	" + diff2.oldHeader));
        ret.push("+++ " + diff2.newFileName + (typeof diff2.newHeader === "undefined" ? "" : "	" + diff2.newHeader));
        for (var i = 0; i < diff2.hunks.length; i++) {
          var hunk = diff2.hunks[i];
          if (hunk.oldLines === 0) {
            hunk.oldStart -= 1;
          }
          if (hunk.newLines === 0) {
            hunk.newStart -= 1;
          }
          ret.push("@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart + "," + hunk.newLines + " @@");
          ret.push.apply(ret, hunk.lines);
        }
        return ret.join("\n") + "\n";
      }
      function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
        return formatPatch(structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options));
      }
      function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
        return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
      }
      var array = {};
      Object.defineProperty(array, "__esModule", {
        value: true
      });
      array.arrayEqual = arrayEqual;
      array.arrayStartsWith = arrayStartsWith;
      function arrayEqual(a, b) {
        if (a.length !== b.length) {
          return false;
        }
        return arrayStartsWith(a, b);
      }
      function arrayStartsWith(array2, start) {
        if (start.length > array2.length) {
          return false;
        }
        for (var i = 0; i < start.length; i++) {
          if (start[i] !== array2[i]) {
            return false;
          }
        }
        return true;
      }
      Object.defineProperty(merge$1, "__esModule", {
        value: true
      });
      merge$1.calcLineCount = calcLineCount;
      merge$1.merge = merge;
      var _create = create;
      var _parse = parse$2;
      var _array = array;
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }
      function calcLineCount(hunk) {
        var _calcOldNewLineCount = (
          /*istanbul ignore end*/
          calcOldNewLineCount(hunk.lines)
        ), oldLines = _calcOldNewLineCount.oldLines, newLines = _calcOldNewLineCount.newLines;
        if (oldLines !== void 0) {
          hunk.oldLines = oldLines;
        } else {
          delete hunk.oldLines;
        }
        if (newLines !== void 0) {
          hunk.newLines = newLines;
        } else {
          delete hunk.newLines;
        }
      }
      function merge(mine, theirs, base2) {
        mine = loadPatch(mine, base2);
        theirs = loadPatch(theirs, base2);
        var ret = {};
        if (mine.index || theirs.index) {
          ret.index = mine.index || theirs.index;
        }
        if (mine.newFileName || theirs.newFileName) {
          if (!fileNameChanged(mine)) {
            ret.oldFileName = theirs.oldFileName || mine.oldFileName;
            ret.newFileName = theirs.newFileName || mine.newFileName;
            ret.oldHeader = theirs.oldHeader || mine.oldHeader;
            ret.newHeader = theirs.newHeader || mine.newHeader;
          } else if (!fileNameChanged(theirs)) {
            ret.oldFileName = mine.oldFileName;
            ret.newFileName = mine.newFileName;
            ret.oldHeader = mine.oldHeader;
            ret.newHeader = mine.newHeader;
          } else {
            ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
            ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
            ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
            ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
          }
        }
        ret.hunks = [];
        var mineIndex = 0, theirsIndex = 0, mineOffset = 0, theirsOffset = 0;
        while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
          var mineCurrent = mine.hunks[mineIndex] || {
            oldStart: Infinity
          }, theirsCurrent = theirs.hunks[theirsIndex] || {
            oldStart: Infinity
          };
          if (hunkBefore(mineCurrent, theirsCurrent)) {
            ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
            mineIndex++;
            theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
          } else if (hunkBefore(theirsCurrent, mineCurrent)) {
            ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
            theirsIndex++;
            mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
          } else {
            var mergedHunk = {
              oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
              oldLines: 0,
              newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
              newLines: 0,
              lines: []
            };
            mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
            theirsIndex++;
            mineIndex++;
            ret.hunks.push(mergedHunk);
          }
        }
        return ret;
      }
      function loadPatch(param, base2) {
        if (typeof param === "string") {
          if (/^@@/m.test(param) || /^Index:/m.test(param)) {
            return (
              /*istanbul ignore start*/
              /*istanbul ignore end*/
              /*istanbul ignore start*/
              (0, _parse.parsePatch)(param)[0]
            );
          }
          if (!base2) {
            throw new Error("Must provide a base reference or pass in a patch");
          }
          return (
            /*istanbul ignore start*/
            /*istanbul ignore end*/
            /*istanbul ignore start*/
            (0, _create.structuredPatch)(void 0, void 0, base2, param)
          );
        }
        return param;
      }
      function fileNameChanged(patch) {
        return patch.newFileName && patch.newFileName !== patch.oldFileName;
      }
      function selectField(index, mine, theirs) {
        if (mine === theirs) {
          return mine;
        } else {
          index.conflict = true;
          return {
            mine,
            theirs
          };
        }
      }
      function hunkBefore(test3, check) {
        return test3.oldStart < check.oldStart && test3.oldStart + test3.oldLines < check.oldStart;
      }
      function cloneHunk(hunk, offset) {
        return {
          oldStart: hunk.oldStart,
          oldLines: hunk.oldLines,
          newStart: hunk.newStart + offset,
          newLines: hunk.newLines,
          lines: hunk.lines
        };
      }
      function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
        var mine = {
          offset: mineOffset,
          lines: mineLines,
          index: 0
        }, their = {
          offset: theirOffset,
          lines: theirLines,
          index: 0
        };
        insertLeading(hunk, mine, their);
        insertLeading(hunk, their, mine);
        while (mine.index < mine.lines.length && their.index < their.lines.length) {
          var mineCurrent = mine.lines[mine.index], theirCurrent = their.lines[their.index];
          if ((mineCurrent[0] === "-" || mineCurrent[0] === "+") && (theirCurrent[0] === "-" || theirCurrent[0] === "+")) {
            mutualChange(hunk, mine, their);
          } else if (mineCurrent[0] === "+" && theirCurrent[0] === " ") {
            var _hunk$lines;
            (_hunk$lines = /*istanbul ignore end*/
            hunk.lines).push.apply(
              /*istanbul ignore start*/
              _hunk$lines,
              /*istanbul ignore start*/
              _toConsumableArray(
                /*istanbul ignore end*/
                collectChange(mine)
              )
            );
          } else if (theirCurrent[0] === "+" && mineCurrent[0] === " ") {
            var _hunk$lines2;
            (_hunk$lines2 = /*istanbul ignore end*/
            hunk.lines).push.apply(
              /*istanbul ignore start*/
              _hunk$lines2,
              /*istanbul ignore start*/
              _toConsumableArray(
                /*istanbul ignore end*/
                collectChange(their)
              )
            );
          } else if (mineCurrent[0] === "-" && theirCurrent[0] === " ") {
            removal(hunk, mine, their);
          } else if (theirCurrent[0] === "-" && mineCurrent[0] === " ") {
            removal(hunk, their, mine, true);
          } else if (mineCurrent === theirCurrent) {
            hunk.lines.push(mineCurrent);
            mine.index++;
            their.index++;
          } else {
            conflict(hunk, collectChange(mine), collectChange(their));
          }
        }
        insertTrailing(hunk, mine);
        insertTrailing(hunk, their);
        calcLineCount(hunk);
      }
      function mutualChange(hunk, mine, their) {
        var myChanges = collectChange(mine), theirChanges = collectChange(their);
        if (allRemoves(myChanges) && allRemoves(theirChanges)) {
          if (
            /*istanbul ignore start*/
            /*istanbul ignore end*/
            /*istanbul ignore start*/
            (0, _array.arrayStartsWith)(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)
          ) {
            var _hunk$lines3;
            (_hunk$lines3 = /*istanbul ignore end*/
            hunk.lines).push.apply(
              /*istanbul ignore start*/
              _hunk$lines3,
              /*istanbul ignore start*/
              _toConsumableArray(
                /*istanbul ignore end*/
                myChanges
              )
            );
            return;
          } else if (
            /*istanbul ignore start*/
            /*istanbul ignore end*/
            /*istanbul ignore start*/
            (0, _array.arrayStartsWith)(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)
          ) {
            var _hunk$lines4;
            (_hunk$lines4 = /*istanbul ignore end*/
            hunk.lines).push.apply(
              /*istanbul ignore start*/
              _hunk$lines4,
              /*istanbul ignore start*/
              _toConsumableArray(
                /*istanbul ignore end*/
                theirChanges
              )
            );
            return;
          }
        } else if (
          /*istanbul ignore start*/
          /*istanbul ignore end*/
          /*istanbul ignore start*/
          (0, _array.arrayEqual)(myChanges, theirChanges)
        ) {
          var _hunk$lines5;
          (_hunk$lines5 = /*istanbul ignore end*/
          hunk.lines).push.apply(
            /*istanbul ignore start*/
            _hunk$lines5,
            /*istanbul ignore start*/
            _toConsumableArray(
              /*istanbul ignore end*/
              myChanges
            )
          );
          return;
        }
        conflict(hunk, myChanges, theirChanges);
      }
      function removal(hunk, mine, their, swap3) {
        var myChanges = collectChange(mine), theirChanges = collectContext(their, myChanges);
        if (theirChanges.merged) {
          var _hunk$lines6;
          (_hunk$lines6 = /*istanbul ignore end*/
          hunk.lines).push.apply(
            /*istanbul ignore start*/
            _hunk$lines6,
            /*istanbul ignore start*/
            _toConsumableArray(
              /*istanbul ignore end*/
              theirChanges.merged
            )
          );
        } else {
          conflict(hunk, swap3 ? theirChanges : myChanges, swap3 ? myChanges : theirChanges);
        }
      }
      function conflict(hunk, mine, their) {
        hunk.conflict = true;
        hunk.lines.push({
          conflict: true,
          mine,
          theirs: their
        });
      }
      function insertLeading(hunk, insert, their) {
        while (insert.offset < their.offset && insert.index < insert.lines.length) {
          var line2 = insert.lines[insert.index++];
          hunk.lines.push(line2);
          insert.offset++;
        }
      }
      function insertTrailing(hunk, insert) {
        while (insert.index < insert.lines.length) {
          var line2 = insert.lines[insert.index++];
          hunk.lines.push(line2);
        }
      }
      function collectChange(state) {
        var ret = [], operation = state.lines[state.index][0];
        while (state.index < state.lines.length) {
          var line2 = state.lines[state.index];
          if (operation === "-" && line2[0] === "+") {
            operation = "+";
          }
          if (operation === line2[0]) {
            ret.push(line2);
            state.index++;
          } else {
            break;
          }
        }
        return ret;
      }
      function collectContext(state, matchChanges) {
        var changes = [], merged = [], matchIndex = 0, contextChanges = false, conflicted = false;
        while (matchIndex < matchChanges.length && state.index < state.lines.length) {
          var change = state.lines[state.index], match = matchChanges[matchIndex];
          if (match[0] === "+") {
            break;
          }
          contextChanges = contextChanges || change[0] !== " ";
          merged.push(match);
          matchIndex++;
          if (change[0] === "+") {
            conflicted = true;
            while (change[0] === "+") {
              changes.push(change);
              change = state.lines[++state.index];
            }
          }
          if (match.substr(1) === change.substr(1)) {
            changes.push(change);
            state.index++;
          } else {
            conflicted = true;
          }
        }
        if ((matchChanges[matchIndex] || "")[0] === "+" && contextChanges) {
          conflicted = true;
        }
        if (conflicted) {
          return changes;
        }
        while (matchIndex < matchChanges.length) {
          merged.push(matchChanges[matchIndex++]);
        }
        return {
          merged,
          changes
        };
      }
      function allRemoves(changes) {
        return changes.reduce(function(prev, change) {
          return prev && change[0] === "-";
        }, true);
      }
      function skipRemoveSuperset(state, removeChanges, delta) {
        for (var i = 0; i < delta; i++) {
          var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);
          if (state.lines[state.index + i] !== " " + changeContent) {
            return false;
          }
        }
        state.index += delta;
        return true;
      }
      function calcOldNewLineCount(lines) {
        var oldLines = 0;
        var newLines = 0;
        lines.forEach(function(line2) {
          if (typeof line2 !== "string") {
            var myCount = calcOldNewLineCount(line2.mine);
            var theirCount = calcOldNewLineCount(line2.theirs);
            if (oldLines !== void 0) {
              if (myCount.oldLines === theirCount.oldLines) {
                oldLines += myCount.oldLines;
              } else {
                oldLines = void 0;
              }
            }
            if (newLines !== void 0) {
              if (myCount.newLines === theirCount.newLines) {
                newLines += myCount.newLines;
              } else {
                newLines = void 0;
              }
            }
          } else {
            if (newLines !== void 0 && (line2[0] === "+" || line2[0] === " ")) {
              newLines++;
            }
            if (oldLines !== void 0 && (line2[0] === "-" || line2[0] === " ")) {
              oldLines++;
            }
          }
        });
        return {
          oldLines,
          newLines
        };
      }
      var reverse = {};
      Object.defineProperty(reverse, "__esModule", {
        value: true
      });
      reverse.reversePatch = reversePatch;
      function ownKeys(object, enumerableOnly) {
        var keys2 = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
          keys2.push.apply(keys2, symbols);
        }
        return keys2;
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function reversePatch(structuredPatch2) {
        if (Array.isArray(structuredPatch2)) {
          return structuredPatch2.map(reversePatch).reverse();
        }
        return (
          /*istanbul ignore start*/
          _objectSpread(_objectSpread(
            {},
            /*istanbul ignore end*/
            structuredPatch2
          ), {}, {
            oldFileName: structuredPatch2.newFileName,
            oldHeader: structuredPatch2.newHeader,
            newFileName: structuredPatch2.oldFileName,
            newHeader: structuredPatch2.oldHeader,
            hunks: structuredPatch2.hunks.map(function(hunk) {
              return {
                oldLines: hunk.newLines,
                oldStart: hunk.newStart,
                newLines: hunk.oldLines,
                newStart: hunk.oldStart,
                linedelimiters: hunk.linedelimiters,
                lines: hunk.lines.map(function(l) {
                  if (l.startsWith("-")) {
                    return (
                      /*istanbul ignore start*/
                      "+".concat(
                        /*istanbul ignore end*/
                        l.slice(1)
                      )
                    );
                  }
                  if (l.startsWith("+")) {
                    return (
                      /*istanbul ignore start*/
                      "-".concat(
                        /*istanbul ignore end*/
                        l.slice(1)
                      )
                    );
                  }
                  return l;
                })
              };
            })
          })
        );
      }
      var dmp = {};
      Object.defineProperty(dmp, "__esModule", {
        value: true
      });
      dmp.convertChangesToDMP = convertChangesToDMP;
      function convertChangesToDMP(changes) {
        var ret = [], change, operation;
        for (var i = 0; i < changes.length; i++) {
          change = changes[i];
          if (change.added) {
            operation = 1;
          } else if (change.removed) {
            operation = -1;
          } else {
            operation = 0;
          }
          ret.push([operation, change.value]);
        }
        return ret;
      }
      var xml = {};
      Object.defineProperty(xml, "__esModule", {
        value: true
      });
      xml.convertChangesToXML = convertChangesToXML;
      function convertChangesToXML(changes) {
        var ret = [];
        for (var i = 0; i < changes.length; i++) {
          var change = changes[i];
          if (change.added) {
            ret.push("<ins>");
          } else if (change.removed) {
            ret.push("<del>");
          }
          ret.push(escapeHTML(change.value));
          if (change.added) {
            ret.push("</ins>");
          } else if (change.removed) {
            ret.push("</del>");
          }
        }
        return ret.join("");
      }
      function escapeHTML(s2) {
        var n = s2;
        n = n.replace(/&/g, "&amp;");
        n = n.replace(/</g, "&lt;");
        n = n.replace(/>/g, "&gt;");
        n = n.replace(/"/g, "&quot;");
        return n;
      }
      (function(exports2) {
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        Object.defineProperty(exports2, "Diff", {
          enumerable: true,
          get: function get() {
            return _base2["default"];
          }
        });
        Object.defineProperty(exports2, "diffChars", {
          enumerable: true,
          get: function get() {
            return _character.diffChars;
          }
        });
        Object.defineProperty(exports2, "diffWords", {
          enumerable: true,
          get: function get() {
            return _word.diffWords;
          }
        });
        Object.defineProperty(exports2, "diffWordsWithSpace", {
          enumerable: true,
          get: function get() {
            return _word.diffWordsWithSpace;
          }
        });
        Object.defineProperty(exports2, "diffLines", {
          enumerable: true,
          get: function get() {
            return _line2.diffLines;
          }
        });
        Object.defineProperty(exports2, "diffTrimmedLines", {
          enumerable: true,
          get: function get() {
            return _line2.diffTrimmedLines;
          }
        });
        Object.defineProperty(exports2, "diffSentences", {
          enumerable: true,
          get: function get() {
            return _sentence.diffSentences;
          }
        });
        Object.defineProperty(exports2, "diffCss", {
          enumerable: true,
          get: function get() {
            return _css.diffCss;
          }
        });
        Object.defineProperty(exports2, "diffJson", {
          enumerable: true,
          get: function get() {
            return _json.diffJson;
          }
        });
        Object.defineProperty(exports2, "canonicalize", {
          enumerable: true,
          get: function get() {
            return _json.canonicalize;
          }
        });
        Object.defineProperty(exports2, "diffArrays", {
          enumerable: true,
          get: function get() {
            return _array2.diffArrays;
          }
        });
        Object.defineProperty(exports2, "applyPatch", {
          enumerable: true,
          get: function get() {
            return _apply.applyPatch;
          }
        });
        Object.defineProperty(exports2, "applyPatches", {
          enumerable: true,
          get: function get() {
            return _apply.applyPatches;
          }
        });
        Object.defineProperty(exports2, "parsePatch", {
          enumerable: true,
          get: function get() {
            return _parse2.parsePatch;
          }
        });
        Object.defineProperty(exports2, "merge", {
          enumerable: true,
          get: function get() {
            return _merge.merge;
          }
        });
        Object.defineProperty(exports2, "reversePatch", {
          enumerable: true,
          get: function get() {
            return _reverse.reversePatch;
          }
        });
        Object.defineProperty(exports2, "structuredPatch", {
          enumerable: true,
          get: function get() {
            return _create2.structuredPatch;
          }
        });
        Object.defineProperty(exports2, "createTwoFilesPatch", {
          enumerable: true,
          get: function get() {
            return _create2.createTwoFilesPatch;
          }
        });
        Object.defineProperty(exports2, "createPatch", {
          enumerable: true,
          get: function get() {
            return _create2.createPatch;
          }
        });
        Object.defineProperty(exports2, "formatPatch", {
          enumerable: true,
          get: function get() {
            return _create2.formatPatch;
          }
        });
        Object.defineProperty(exports2, "convertChangesToDMP", {
          enumerable: true,
          get: function get() {
            return _dmp.convertChangesToDMP;
          }
        });
        Object.defineProperty(exports2, "convertChangesToXML", {
          enumerable: true,
          get: function get() {
            return _xml.convertChangesToXML;
          }
        });
        var _base2 = _interopRequireDefault2(base);
        var _character = character;
        var _word = word;
        var _line2 = line;
        var _sentence = sentence;
        var _css = css;
        var _json = json$1;
        var _array2 = array$1;
        var _apply = apply;
        var _parse2 = parse$2;
        var _merge = merge$1;
        var _reverse = reverse;
        var _create2 = create;
        var _dmp = dmp;
        var _xml = xml;
        function _interopRequireDefault2(obj) {
          return obj && obj.__esModule ? obj : { "default": obj };
        }
      })(lib);
      var s$1 = 1e3;
      var m$1 = s$1 * 60;
      var h$1 = m$1 * 60;
      var d$1 = h$1 * 24;
      var w$1 = d$1 * 7;
      var y$1 = d$1 * 365.25;
      var ms$1 = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse$1(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong$1(val) : fmtShort$1(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse$1(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y$1;
          case "weeks":
          case "week":
          case "w":
            return n * w$1;
          case "days":
          case "day":
          case "d":
            return n * d$1;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h$1;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m$1;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s$1;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort$1(ms2) {
        var msAbs = Math.abs(ms2);
        if (msAbs >= d$1) {
          return Math.round(ms2 / d$1) + "d";
        }
        if (msAbs >= h$1) {
          return Math.round(ms2 / h$1) + "h";
        }
        if (msAbs >= m$1) {
          return Math.round(ms2 / m$1) + "m";
        }
        if (msAbs >= s$1) {
          return Math.round(ms2 / s$1) + "s";
        }
        return ms2 + "ms";
      }
      function fmtLong$1(ms2) {
        var msAbs = Math.abs(ms2);
        if (msAbs >= d$1) {
          return plural$1(ms2, msAbs, d$1, "day");
        }
        if (msAbs >= h$1) {
          return plural$1(ms2, msAbs, h$1, "hour");
        }
        if (msAbs >= m$1) {
          return plural$1(ms2, msAbs, m$1, "minute");
        }
        if (msAbs >= s$1) {
          return plural$1(ms2, msAbs, s$1, "second");
        }
        return ms2 + " ms";
      }
      function plural$1(ms2, msAbs, n, name2) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms2 / n) + " " + name2 + (isPlural ? "s" : "");
      }
      var lookup2 = [];
      var revLookup2 = [];
      var Arr2 = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var inited2 = false;
      function init2() {
        inited2 = true;
        var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup2[i] = code[i];
          revLookup2[code.charCodeAt(i)] = i;
        }
        revLookup2["-".charCodeAt(0)] = 62;
        revLookup2["_".charCodeAt(0)] = 63;
      }
      function toByteArray(b64) {
        if (!inited2) {
          init2();
        }
        var i, j, l, tmp, placeHolders, arr;
        var len = b64.length;
        if (len % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
        arr = new Arr2(len * 3 / 4 - placeHolders);
        l = placeHolders > 0 ? len - 4 : len;
        var L = 0;
        for (i = 0, j = 0; i < l; i += 4, j += 3) {
          tmp = revLookup2[b64.charCodeAt(i)] << 18 | revLookup2[b64.charCodeAt(i + 1)] << 12 | revLookup2[b64.charCodeAt(i + 2)] << 6 | revLookup2[b64.charCodeAt(i + 3)];
          arr[L++] = tmp >> 16 & 255;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        if (placeHolders === 2) {
          tmp = revLookup2[b64.charCodeAt(i)] << 2 | revLookup2[b64.charCodeAt(i + 1)] >> 4;
          arr[L++] = tmp & 255;
        } else if (placeHolders === 1) {
          tmp = revLookup2[b64.charCodeAt(i)] << 10 | revLookup2[b64.charCodeAt(i + 1)] << 4 | revLookup2[b64.charCodeAt(i + 2)] >> 2;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase642(num) {
        return lookup2[num >> 18 & 63] + lookup2[num >> 12 & 63] + lookup2[num >> 6 & 63] + lookup2[num & 63];
      }
      function encodeChunk2(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i = start; i < end; i += 3) {
          tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
          output.push(tripletToBase642(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        if (!inited2) {
          init2();
        }
        var tmp;
        var len = uint8.length;
        var extraBytes = len % 3;
        var output = "";
        var parts = [];
        var maxChunkLength = 16383;
        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk2(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len - 1];
          output += lookup2[tmp >> 2];
          output += lookup2[tmp << 4 & 63];
          output += "==";
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + uint8[len - 1];
          output += lookup2[tmp >> 10];
          output += lookup2[tmp >> 4 & 63];
          output += lookup2[tmp << 2 & 63];
          output += "=";
        }
        parts.push(output);
        return parts.join("");
      }
      function read(buffer, offset, isLE, mLen, nBytes) {
        var e, m2;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d2 = isLE ? -1 : 1;
        var s2 = buffer[offset + i];
        i += d2;
        e = s2 & (1 << -nBits) - 1;
        s2 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d2, nBits -= 8) {
        }
        m2 = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m2 = m2 * 256 + buffer[offset + i], i += d2, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m2 ? NaN : (s2 ? -1 : 1) * Infinity;
        } else {
          m2 = m2 + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s2 ? -1 : 1) * m2 * Math.pow(2, e - mLen);
      }
      function write2(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m2, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d2 = isLE ? 1 : -1;
        var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m2 = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m2 = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m2 = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m2 & 255, i += d2, m2 /= 256, mLen -= 8) {
        }
        e = e << mLen | m2;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d2, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d2] |= s2 * 128;
      }
      var toString$1 = {}.toString;
      var isArray = Array.isArray || function(arr) {
        return toString$1.call(arr) == "[object Array]";
      };
      var INSPECT_MAX_BYTES = 50;
      Buffer3.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== void 0 ? global$1.TYPED_ARRAY_SUPPORT : true;
      kMaxLength2();
      function kMaxLength2() {
        return Buffer3.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function createBuffer2(that, length) {
        if (kMaxLength2() < length) {
          throw new RangeError("Invalid typed array length");
        }
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length);
          that.__proto__ = Buffer3.prototype;
        } else {
          if (that === null) {
            that = new Buffer3(length);
          }
          that.length = length;
        }
        return that;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (!Buffer3.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer3)) {
          return new Buffer3(arg, encodingOrOffset, length);
        }
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          }
          return allocUnsafe2(this, arg);
        }
        return from2(this, arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      Buffer3._augment = function(arr) {
        arr.__proto__ = Buffer3.prototype;
        return arr;
      };
      function from2(that, value, encodingOrOffset, length) {
        if (typeof value === "number") {
          throw new TypeError('"value" argument must not be a number');
        }
        if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
          return fromArrayBuffer2(that, value, encodingOrOffset, length);
        }
        if (typeof value === "string") {
          return fromString2(that, value, encodingOrOffset);
        }
        return fromObject2(that, value);
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from2(null, value, encodingOrOffset, length);
      };
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        Buffer3.prototype.__proto__ = Uint8Array.prototype;
        Buffer3.__proto__ = Uint8Array;
        if (typeof Symbol !== "undefined" && Symbol.species && Buffer3[Symbol.species] === Buffer3) ;
      }
      function assertSize2(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be a number');
        } else if (size < 0) {
          throw new RangeError('"size" argument must not be negative');
        }
      }
      function alloc2(that, size, fill2, encoding) {
        assertSize2(size);
        if (size <= 0) {
          return createBuffer2(that, size);
        }
        if (fill2 !== void 0) {
          return typeof encoding === "string" ? createBuffer2(that, size).fill(fill2, encoding) : createBuffer2(that, size).fill(fill2);
        }
        return createBuffer2(that, size);
      }
      Buffer3.alloc = function(size, fill2, encoding) {
        return alloc2(null, size, fill2, encoding);
      };
      function allocUnsafe2(that, size) {
        assertSize2(size);
        that = createBuffer2(that, size < 0 ? 0 : checked2(size) | 0);
        if (!Buffer3.TYPED_ARRAY_SUPPORT) {
          for (var i = 0; i < size; ++i) {
            that[i] = 0;
          }
        }
        return that;
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe2(null, size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe2(null, size);
      };
      function fromString2(that, string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError('"encoding" must be a valid string encoding');
        }
        var length = byteLength2(string, encoding) | 0;
        that = createBuffer2(that, length);
        var actual = that.write(string, encoding);
        if (actual !== length) {
          that = that.slice(0, actual);
        }
        return that;
      }
      function fromArrayLike2(that, array2) {
        var length = array2.length < 0 ? 0 : checked2(array2.length) | 0;
        that = createBuffer2(that, length);
        for (var i = 0; i < length; i += 1) {
          that[i] = array2[i] & 255;
        }
        return that;
      }
      function fromArrayBuffer2(that, array2, byteOffset, length) {
        array2.byteLength;
        if (byteOffset < 0 || array2.byteLength < byteOffset) {
          throw new RangeError("'offset' is out of bounds");
        }
        if (array2.byteLength < byteOffset + (length || 0)) {
          throw new RangeError("'length' is out of bounds");
        }
        if (byteOffset === void 0 && length === void 0) {
          array2 = new Uint8Array(array2);
        } else if (length === void 0) {
          array2 = new Uint8Array(array2, byteOffset);
        } else {
          array2 = new Uint8Array(array2, byteOffset, length);
        }
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          that = array2;
          that.__proto__ = Buffer3.prototype;
        } else {
          that = fromArrayLike2(that, array2);
        }
        return that;
      }
      function fromObject2(that, obj) {
        if (internalIsBuffer2(obj)) {
          var len = checked2(obj.length) | 0;
          that = createBuffer2(that, len);
          if (that.length === 0) {
            return that;
          }
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if (typeof obj.length !== "number" || isnan2(obj.length)) {
              return createBuffer2(that, 0);
            }
            return fromArrayLike2(that, obj);
          }
          if (obj.type === "Buffer" && isArray(obj.data)) {
            return fromArrayLike2(that, obj.data);
          }
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function checked2(length) {
        if (length >= kMaxLength2()) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength2().toString(16) + " bytes");
        }
        return length | 0;
      }
      Buffer3.isBuffer = isBuffer2;
      function internalIsBuffer2(b) {
        return !!(b != null && b._isBuffer);
      }
      Buffer3.compare = function compare3(a, b) {
        if (!internalIsBuffer2(a) || !internalIsBuffer2(b)) {
          throw new TypeError("Arguments must be Buffers");
        }
        if (a === b) return 0;
        var x = a.length;
        var y2 = b.length;
        for (var i = 0, len = Math.min(x, y2); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y2 = b[i];
            break;
          }
        }
        if (x < y2) return -1;
        if (y2 < x) return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding2(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat2(list2, length) {
        if (!isArray(list2)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list2.length === 0) {
          return Buffer3.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list2.length; ++i) {
            length += list2[i].length;
          }
        }
        var buffer = Buffer3.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list2.length; ++i) {
          var buf = list2[i];
          if (!internalIsBuffer2(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength2(string, encoding) {
        if (internalIsBuffer2(string)) {
          return string.length;
        }
        if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          string = "" + string;
        }
        var len = string.length;
        if (len === 0) return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
            case void 0:
              return utf8ToBytes2(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes2(string).length;
            default:
              if (loweredCase) return utf8ToBytes2(string).length;
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength2;
      function slowToString2(encoding, start, end) {
        var loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice2(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice2(this, start, end);
            case "ascii":
              return asciiSlice2(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice2(this, start, end);
            case "base64":
              return base64Slice2(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice2(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap2(b, n, m2) {
        var i = b[n];
        b[n] = b[m2];
        b[m2] = i;
      }
      Buffer3.prototype.swap16 = function swap162() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap2(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap322() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap2(this, i, i + 3);
          swap2(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap642() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap2(this, i, i + 7);
          swap2(this, i + 1, i + 6);
          swap2(this, i + 2, i + 5);
          swap2(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString3() {
        var length = this.length | 0;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice2(this, 0, length);
        return slowToString2.apply(this, arguments);
      };
      Buffer3.prototype.equals = function equals2(b) {
        if (!internalIsBuffer2(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect2() {
        var str = "";
        var max = INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          if (this.length > max) str += " ... ";
        }
        return "<Buffer " + str + ">";
      };
      Buffer3.prototype.compare = function compare3(target, start, end, thisStart, thisEnd) {
        if (!internalIsBuffer2(target)) {
          throw new TypeError("Argument must be a Buffer");
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y2 = end - start;
        var len = Math.min(x, y2);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y2 = targetCopy[i];
            break;
          }
        }
        if (x < y2) return -1;
        if (y2 < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf2(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (isNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (internalIsBuffer2(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf2(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (Buffer3.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf2(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf2(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read2(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
              if (read2(arr, i + j) !== read2(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes2(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf3(val, byteOffset, encoding) {
        return bidirectionalIndexOf2(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf2(val, byteOffset, encoding) {
        return bidirectionalIndexOf2(this, val, byteOffset, encoding, false);
      };
      function hexWrite2(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (isNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write2(buf, string, offset, length) {
        return blitBuffer2(utf8ToBytes2(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite2(buf, string, offset, length) {
        return blitBuffer2(asciiToBytes2(string), buf, offset, length);
      }
      function latin1Write2(buf, string, offset, length) {
        return asciiWrite2(buf, string, offset, length);
      }
      function base64Write2(buf, string, offset, length) {
        return blitBuffer2(base64ToBytes2(string), buf, offset, length);
      }
      function ucs2Write2(buf, string, offset, length) {
        return blitBuffer2(utf16leToBytes2(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write3(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length)) {
            length = length | 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite2(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write2(this, string, offset, length);
            case "ascii":
              return asciiWrite2(this, string, offset, length);
            case "latin1":
            case "binary":
              return latin1Write2(this, string, offset, length);
            case "base64":
              return base64Write2(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write2(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON2() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice2(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return fromByteArray(buf);
        } else {
          return fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice2(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray2(res);
      }
      var MAX_ARGUMENTS_LENGTH2 = 4096;
      function decodeCodePointsArray2(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH2) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = "";
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH2)
          );
        }
        return res;
      }
      function asciiSlice2(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice2(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice2(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        var out = "";
        for (var i = start; i < end; ++i) {
          out += toHex2(buf[i]);
        }
        return out;
      }
      function utf16leSlice2(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice2(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        var newBuf;
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer3.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer3(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }
        return newBuf;
      };
      function checkOffset2(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUIntLE = function readUIntLE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) checkOffset2(offset, byteLength3, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength3 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUIntBE = function readUIntBE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          checkOffset2(offset, byteLength3, this.length);
        }
        var val = this[offset + --byteLength3];
        var mul = 1;
        while (byteLength3 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength3] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUInt8 = function readUInt82(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUInt16LE = function readUInt16LE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUInt16BE = function readUInt16BE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUInt32LE = function readUInt32LE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUInt32BE = function readUInt32BE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readIntLE = function readIntLE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) checkOffset2(offset, byteLength3, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength3 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) checkOffset2(offset, byteLength3, this.length);
        var i = byteLength3;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt82(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readFloatLE = function readFloatLE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 4, this.length);
        return read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 4, this.length);
        return read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 8, this.length);
        return read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE2(offset, noAssert) {
        if (!noAssert) checkOffset2(offset, 8, this.length);
        return read(this, offset, false, 52, 8);
      };
      function checkInt2(buf, value, offset, ext, max, min2) {
        if (!internalIsBuffer2(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min2) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUIntLE = function writeUIntLE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
          checkInt2(this, value, offset, byteLength3, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength3 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength3;
      };
      Buffer3.prototype.writeUIntBE = function writeUIntBE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
          checkInt2(this, value, offset, byteLength3, maxBytes, 0);
        }
        var i = byteLength3 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength3;
      };
      Buffer3.prototype.writeUInt8 = function writeUInt82(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 1, 255, 0);
        if (!Buffer3.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
        this[offset] = value & 255;
        return offset + 1;
      };
      function objectWriteUInt162(buf, value, offset, littleEndian) {
        if (value < 0) value = 65535 + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
          buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }
      Buffer3.prototype.writeUInt16LE = function writeUInt16LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 2, 65535, 0);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt162(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer3.prototype.writeUInt16BE = function writeUInt16BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 2, 65535, 0);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt162(this, value, offset, false);
        }
        return offset + 2;
      };
      function objectWriteUInt322(buf, value, offset, littleEndian) {
        if (value < 0) value = 4294967295 + value + 1;
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
        }
      }
      Buffer3.prototype.writeUInt32LE = function writeUInt32LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 4, 4294967295, 0);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 255;
        } else {
          objectWriteUInt322(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer3.prototype.writeUInt32BE = function writeUInt32BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 4, 4294967295, 0);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt322(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer3.prototype.writeIntLE = function writeIntLE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength3 - 1);
          checkInt2(this, value, offset, byteLength3, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength3 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength3;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength3 - 1);
          checkInt2(this, value, offset, byteLength3, limit - 1, -limit);
        }
        var i = byteLength3 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength3;
      };
      Buffer3.prototype.writeInt8 = function writeInt82(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 1, 127, -128);
        if (!Buffer3.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 2, 32767, -32768);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt162(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 2, 32767, -32768);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt162(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else {
          objectWriteUInt322(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) checkInt2(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt322(this, value, offset, false);
        }
        return offset + 4;
      };
      function checkIEEE7542(buf, value, offset, ext, max, min2) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat2(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE7542(buf, value, offset, 4);
        }
        write2(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE2(value, offset, noAssert) {
        return writeFloat2(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE2(value, offset, noAssert) {
        return writeFloat2(this, value, offset, false, noAssert);
      };
      function writeDouble2(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE7542(buf, value, offset, 8);
        }
        write2(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE2(value, offset, noAssert) {
        return writeDouble2(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE2(value, offset, noAssert) {
        return writeDouble2(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy2(target, targetStart, start, end) {
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1e3 || !Buffer3.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, start + len),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill2(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
        } else if (typeof val === "number") {
          val = val & 255;
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = internalIsBuffer2(val) ? val : utf8ToBytes2(new Buffer3(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var INVALID_BASE64_RE2 = /[^+\/0-9A-Za-z-_]/g;
      function base64clean2(str) {
        str = stringtrim2(str).replace(INVALID_BASE64_RE2, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function stringtrim2(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      function toHex2(n) {
        if (n < 16) return "0" + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes2(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes2(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes2(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes2(str) {
        return toByteArray(base64clean2(str));
      }
      function blitBuffer2(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isnan2(val) {
        return val !== val;
      }
      function isBuffer2(obj) {
        return obj != null && (!!obj._isBuffer || isFastBuffer2(obj) || isSlowBuffer2(obj));
      }
      function isFastBuffer2(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      }
      function isSlowBuffer2(obj) {
        return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer2(obj.slice(0, 0));
      }
      var browser$2 = true;
      var utils$3 = {};
      var he = { exports: {} };
      (function(module3, exports2) {
        (function(root) {
          var freeExports = exports2;
          var freeModule = module3 && module3.exports == freeExports && module3;
          var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;
          if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
            root = freeGlobal;
          }
          var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
          var regexAsciiWhitelist = /[\x01-\x7F]/g;
          var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
          var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
          var encodeMap = { "\xAD": "shy", "\u200C": "zwnj", "\u200D": "zwj", "\u200E": "lrm", "\u2063": "ic", "\u2062": "it", "\u2061": "af", "\u200F": "rlm", "\u200B": "ZeroWidthSpace", "\u2060": "NoBreak", "\u0311": "DownBreve", "\u20DB": "tdot", "\u20DC": "DotDot", "	": "Tab", "\n": "NewLine", "\u2008": "puncsp", "\u205F": "MediumSpace", "\u2009": "thinsp", "\u200A": "hairsp", "\u2004": "emsp13", "\u2002": "ensp", "\u2005": "emsp14", "\u2003": "emsp", "\u2007": "numsp", "\xA0": "nbsp", "\u205F\u200A": "ThickSpace", "\u203E": "oline", "_": "lowbar", "\u2010": "dash", "\u2013": "ndash", "\u2014": "mdash", "\u2015": "horbar", ",": "comma", ";": "semi", "\u204F": "bsemi", ":": "colon", "\u2A74": "Colone", "!": "excl", "\xA1": "iexcl", "?": "quest", "\xBF": "iquest", ".": "period", "\u2025": "nldr", "\u2026": "mldr", "\xB7": "middot", "'": "apos", "\u2018": "lsquo", "\u2019": "rsquo", "\u201A": "sbquo", "\u2039": "lsaquo", "\u203A": "rsaquo", '"': "quot", "\u201C": "ldquo", "\u201D": "rdquo", "\u201E": "bdquo", "\xAB": "laquo", "\xBB": "raquo", "(": "lpar", ")": "rpar", "[": "lsqb", "]": "rsqb", "{": "lcub", "}": "rcub", "\u2308": "lceil", "\u2309": "rceil", "\u230A": "lfloor", "\u230B": "rfloor", "\u2985": "lopar", "\u2986": "ropar", "\u298B": "lbrke", "\u298C": "rbrke", "\u298D": "lbrkslu", "\u298E": "rbrksld", "\u298F": "lbrksld", "\u2990": "rbrkslu", "\u2991": "langd", "\u2992": "rangd", "\u2993": "lparlt", "\u2994": "rpargt", "\u2995": "gtlPar", "\u2996": "ltrPar", "\u27E6": "lobrk", "\u27E7": "robrk", "\u27E8": "lang", "\u27E9": "rang", "\u27EA": "Lang", "\u27EB": "Rang", "\u27EC": "loang", "\u27ED": "roang", "\u2772": "lbbrk", "\u2773": "rbbrk", "\u2016": "Vert", "\xA7": "sect", "\xB6": "para", "@": "commat", "*": "ast", "/": "sol", "undefined": null, "&": "amp", "#": "num", "%": "percnt", "\u2030": "permil", "\u2031": "pertenk", "\u2020": "dagger", "\u2021": "Dagger", "\u2022": "bull", "\u2043": "hybull", "\u2032": "prime", "\u2033": "Prime", "\u2034": "tprime", "\u2057": "qprime", "\u2035": "bprime", "\u2041": "caret", "`": "grave", "\xB4": "acute", "\u02DC": "tilde", "^": "Hat", "\xAF": "macr", "\u02D8": "breve", "\u02D9": "dot", "\xA8": "die", "\u02DA": "ring", "\u02DD": "dblac", "\xB8": "cedil", "\u02DB": "ogon", "\u02C6": "circ", "\u02C7": "caron", "\xB0": "deg", "\xA9": "copy", "\xAE": "reg", "\u2117": "copysr", "\u2118": "wp", "\u211E": "rx", "\u2127": "mho", "\u2129": "iiota", "\u2190": "larr", "\u219A": "nlarr", "\u2192": "rarr", "\u219B": "nrarr", "\u2191": "uarr", "\u2193": "darr", "\u2194": "harr", "\u21AE": "nharr", "\u2195": "varr", "\u2196": "nwarr", "\u2197": "nearr", "\u2198": "searr", "\u2199": "swarr", "\u219D": "rarrw", "\u219D\u0338": "nrarrw", "\u219E": "Larr", "\u219F": "Uarr", "\u21A0": "Rarr", "\u21A1": "Darr", "\u21A2": "larrtl", "\u21A3": "rarrtl", "\u21A4": "mapstoleft", "\u21A5": "mapstoup", "\u21A6": "map", "\u21A7": "mapstodown", "\u21A9": "larrhk", "\u21AA": "rarrhk", "\u21AB": "larrlp", "\u21AC": "rarrlp", "\u21AD": "harrw", "\u21B0": "lsh", "\u21B1": "rsh", "\u21B2": "ldsh", "\u21B3": "rdsh", "\u21B5": "crarr", "\u21B6": "cularr", "\u21B7": "curarr", "\u21BA": "olarr", "\u21BB": "orarr", "\u21BC": "lharu", "\u21BD": "lhard", "\u21BE": "uharr", "\u21BF": "uharl", "\u21C0": "rharu", "\u21C1": "rhard", "\u21C2": "dharr", "\u21C3": "dharl", "\u21C4": "rlarr", "\u21C5": "udarr", "\u21C6": "lrarr", "\u21C7": "llarr", "\u21C8": "uuarr", "\u21C9": "rrarr", "\u21CA": "ddarr", "\u21CB": "lrhar", "\u21CC": "rlhar", "\u21D0": "lArr", "\u21CD": "nlArr", "\u21D1": "uArr", "\u21D2": "rArr", "\u21CF": "nrArr", "\u21D3": "dArr", "\u21D4": "iff", "\u21CE": "nhArr", "\u21D5": "vArr", "\u21D6": "nwArr", "\u21D7": "neArr", "\u21D8": "seArr", "\u21D9": "swArr", "\u21DA": "lAarr", "\u21DB": "rAarr", "\u21DD": "zigrarr", "\u21E4": "larrb", "\u21E5": "rarrb", "\u21F5": "duarr", "\u21FD": "loarr", "\u21FE": "roarr", "\u21FF": "hoarr", "\u2200": "forall", "\u2201": "comp", "\u2202": "part", "\u2202\u0338": "npart", "\u2203": "exist", "\u2204": "nexist", "\u2205": "empty", "\u2207": "Del", "\u2208": "in", "\u2209": "notin", "\u220B": "ni", "\u220C": "notni", "\u03F6": "bepsi", "\u220F": "prod", "\u2210": "coprod", "\u2211": "sum", "+": "plus", "\xB1": "pm", "\xF7": "div", "\xD7": "times", "<": "lt", "\u226E": "nlt", "<\u20D2": "nvlt", "=": "equals", "\u2260": "ne", "=\u20E5": "bne", "\u2A75": "Equal", ">": "gt", "\u226F": "ngt", ">\u20D2": "nvgt", "\xAC": "not", "|": "vert", "\xA6": "brvbar", "\u2212": "minus", "\u2213": "mp", "\u2214": "plusdo", "\u2044": "frasl", "\u2216": "setmn", "\u2217": "lowast", "\u2218": "compfn", "\u221A": "Sqrt", "\u221D": "prop", "\u221E": "infin", "\u221F": "angrt", "\u2220": "ang", "\u2220\u20D2": "nang", "\u2221": "angmsd", "\u2222": "angsph", "\u2223": "mid", "\u2224": "nmid", "\u2225": "par", "\u2226": "npar", "\u2227": "and", "\u2228": "or", "\u2229": "cap", "\u2229\uFE00": "caps", "\u222A": "cup", "\u222A\uFE00": "cups", "\u222B": "int", "\u222C": "Int", "\u222D": "tint", "\u2A0C": "qint", "\u222E": "oint", "\u222F": "Conint", "\u2230": "Cconint", "\u2231": "cwint", "\u2232": "cwconint", "\u2233": "awconint", "\u2234": "there4", "\u2235": "becaus", "\u2236": "ratio", "\u2237": "Colon", "\u2238": "minusd", "\u223A": "mDDot", "\u223B": "homtht", "\u223C": "sim", "\u2241": "nsim", "\u223C\u20D2": "nvsim", "\u223D": "bsim", "\u223D\u0331": "race", "\u223E": "ac", "\u223E\u0333": "acE", "\u223F": "acd", "\u2240": "wr", "\u2242": "esim", "\u2242\u0338": "nesim", "\u2243": "sime", "\u2244": "nsime", "\u2245": "cong", "\u2247": "ncong", "\u2246": "simne", "\u2248": "ap", "\u2249": "nap", "\u224A": "ape", "\u224B": "apid", "\u224B\u0338": "napid", "\u224C": "bcong", "\u224D": "CupCap", "\u226D": "NotCupCap", "\u224D\u20D2": "nvap", "\u224E": "bump", "\u224E\u0338": "nbump", "\u224F": "bumpe", "\u224F\u0338": "nbumpe", "\u2250": "doteq", "\u2250\u0338": "nedot", "\u2251": "eDot", "\u2252": "efDot", "\u2253": "erDot", "\u2254": "colone", "\u2255": "ecolon", "\u2256": "ecir", "\u2257": "cire", "\u2259": "wedgeq", "\u225A": "veeeq", "\u225C": "trie", "\u225F": "equest", "\u2261": "equiv", "\u2262": "nequiv", "\u2261\u20E5": "bnequiv", "\u2264": "le", "\u2270": "nle", "\u2264\u20D2": "nvle", "\u2265": "ge", "\u2271": "nge", "\u2265\u20D2": "nvge", "\u2266": "lE", "\u2266\u0338": "nlE", "\u2267": "gE", "\u2267\u0338": "ngE", "\u2268\uFE00": "lvnE", "\u2268": "lnE", "\u2269": "gnE", "\u2269\uFE00": "gvnE", "\u226A": "ll", "\u226A\u0338": "nLtv", "\u226A\u20D2": "nLt", "\u226B": "gg", "\u226B\u0338": "nGtv", "\u226B\u20D2": "nGt", "\u226C": "twixt", "\u2272": "lsim", "\u2274": "nlsim", "\u2273": "gsim", "\u2275": "ngsim", "\u2276": "lg", "\u2278": "ntlg", "\u2277": "gl", "\u2279": "ntgl", "\u227A": "pr", "\u2280": "npr", "\u227B": "sc", "\u2281": "nsc", "\u227C": "prcue", "\u22E0": "nprcue", "\u227D": "sccue", "\u22E1": "nsccue", "\u227E": "prsim", "\u227F": "scsim", "\u227F\u0338": "NotSucceedsTilde", "\u2282": "sub", "\u2284": "nsub", "\u2282\u20D2": "vnsub", "\u2283": "sup", "\u2285": "nsup", "\u2283\u20D2": "vnsup", "\u2286": "sube", "\u2288": "nsube", "\u2287": "supe", "\u2289": "nsupe", "\u228A\uFE00": "vsubne", "\u228A": "subne", "\u228B\uFE00": "vsupne", "\u228B": "supne", "\u228D": "cupdot", "\u228E": "uplus", "\u228F": "sqsub", "\u228F\u0338": "NotSquareSubset", "\u2290": "sqsup", "\u2290\u0338": "NotSquareSuperset", "\u2291": "sqsube", "\u22E2": "nsqsube", "\u2292": "sqsupe", "\u22E3": "nsqsupe", "\u2293": "sqcap", "\u2293\uFE00": "sqcaps", "\u2294": "sqcup", "\u2294\uFE00": "sqcups", "\u2295": "oplus", "\u2296": "ominus", "\u2297": "otimes", "\u2298": "osol", "\u2299": "odot", "\u229A": "ocir", "\u229B": "oast", "\u229D": "odash", "\u229E": "plusb", "\u229F": "minusb", "\u22A0": "timesb", "\u22A1": "sdotb", "\u22A2": "vdash", "\u22AC": "nvdash", "\u22A3": "dashv", "\u22A4": "top", "\u22A5": "bot", "\u22A7": "models", "\u22A8": "vDash", "\u22AD": "nvDash", "\u22A9": "Vdash", "\u22AE": "nVdash", "\u22AA": "Vvdash", "\u22AB": "VDash", "\u22AF": "nVDash", "\u22B0": "prurel", "\u22B2": "vltri", "\u22EA": "nltri", "\u22B3": "vrtri", "\u22EB": "nrtri", "\u22B4": "ltrie", "\u22EC": "nltrie", "\u22B4\u20D2": "nvltrie", "\u22B5": "rtrie", "\u22ED": "nrtrie", "\u22B5\u20D2": "nvrtrie", "\u22B6": "origof", "\u22B7": "imof", "\u22B8": "mumap", "\u22B9": "hercon", "\u22BA": "intcal", "\u22BB": "veebar", "\u22BD": "barvee", "\u22BE": "angrtvb", "\u22BF": "lrtri", "\u22C0": "Wedge", "\u22C1": "Vee", "\u22C2": "xcap", "\u22C3": "xcup", "\u22C4": "diam", "\u22C5": "sdot", "\u22C6": "Star", "\u22C7": "divonx", "\u22C8": "bowtie", "\u22C9": "ltimes", "\u22CA": "rtimes", "\u22CB": "lthree", "\u22CC": "rthree", "\u22CD": "bsime", "\u22CE": "cuvee", "\u22CF": "cuwed", "\u22D0": "Sub", "\u22D1": "Sup", "\u22D2": "Cap", "\u22D3": "Cup", "\u22D4": "fork", "\u22D5": "epar", "\u22D6": "ltdot", "\u22D7": "gtdot", "\u22D8": "Ll", "\u22D8\u0338": "nLl", "\u22D9": "Gg", "\u22D9\u0338": "nGg", "\u22DA\uFE00": "lesg", "\u22DA": "leg", "\u22DB": "gel", "\u22DB\uFE00": "gesl", "\u22DE": "cuepr", "\u22DF": "cuesc", "\u22E6": "lnsim", "\u22E7": "gnsim", "\u22E8": "prnsim", "\u22E9": "scnsim", "\u22EE": "vellip", "\u22EF": "ctdot", "\u22F0": "utdot", "\u22F1": "dtdot", "\u22F2": "disin", "\u22F3": "isinsv", "\u22F4": "isins", "\u22F5": "isindot", "\u22F5\u0338": "notindot", "\u22F6": "notinvc", "\u22F7": "notinvb", "\u22F9": "isinE", "\u22F9\u0338": "notinE", "\u22FA": "nisd", "\u22FB": "xnis", "\u22FC": "nis", "\u22FD": "notnivc", "\u22FE": "notnivb", "\u2305": "barwed", "\u2306": "Barwed", "\u230C": "drcrop", "\u230D": "dlcrop", "\u230E": "urcrop", "\u230F": "ulcrop", "\u2310": "bnot", "\u2312": "profline", "\u2313": "profsurf", "\u2315": "telrec", "\u2316": "target", "\u231C": "ulcorn", "\u231D": "urcorn", "\u231E": "dlcorn", "\u231F": "drcorn", "\u2322": "frown", "\u2323": "smile", "\u232D": "cylcty", "\u232E": "profalar", "\u2336": "topbot", "\u233D": "ovbar", "\u233F": "solbar", "\u237C": "angzarr", "\u23B0": "lmoust", "\u23B1": "rmoust", "\u23B4": "tbrk", "\u23B5": "bbrk", "\u23B6": "bbrktbrk", "\u23DC": "OverParenthesis", "\u23DD": "UnderParenthesis", "\u23DE": "OverBrace", "\u23DF": "UnderBrace", "\u23E2": "trpezium", "\u23E7": "elinters", "\u2423": "blank", "\u2500": "boxh", "\u2502": "boxv", "\u250C": "boxdr", "\u2510": "boxdl", "\u2514": "boxur", "\u2518": "boxul", "\u251C": "boxvr", "\u2524": "boxvl", "\u252C": "boxhd", "\u2534": "boxhu", "\u253C": "boxvh", "\u2550": "boxH", "\u2551": "boxV", "\u2552": "boxdR", "\u2553": "boxDr", "\u2554": "boxDR", "\u2555": "boxdL", "\u2556": "boxDl", "\u2557": "boxDL", "\u2558": "boxuR", "\u2559": "boxUr", "\u255A": "boxUR", "\u255B": "boxuL", "\u255C": "boxUl", "\u255D": "boxUL", "\u255E": "boxvR", "\u255F": "boxVr", "\u2560": "boxVR", "\u2561": "boxvL", "\u2562": "boxVl", "\u2563": "boxVL", "\u2564": "boxHd", "\u2565": "boxhD", "\u2566": "boxHD", "\u2567": "boxHu", "\u2568": "boxhU", "\u2569": "boxHU", "\u256A": "boxvH", "\u256B": "boxVh", "\u256C": "boxVH", "\u2580": "uhblk", "\u2584": "lhblk", "\u2588": "block", "\u2591": "blk14", "\u2592": "blk12", "\u2593": "blk34", "\u25A1": "squ", "\u25AA": "squf", "\u25AB": "EmptyVerySmallSquare", "\u25AD": "rect", "\u25AE": "marker", "\u25B1": "fltns", "\u25B3": "xutri", "\u25B4": "utrif", "\u25B5": "utri", "\u25B8": "rtrif", "\u25B9": "rtri", "\u25BD": "xdtri", "\u25BE": "dtrif", "\u25BF": "dtri", "\u25C2": "ltrif", "\u25C3": "ltri", "\u25CA": "loz", "\u25CB": "cir", "\u25EC": "tridot", "\u25EF": "xcirc", "\u25F8": "ultri", "\u25F9": "urtri", "\u25FA": "lltri", "\u25FB": "EmptySmallSquare", "\u25FC": "FilledSmallSquare", "\u2605": "starf", "\u2606": "star", "\u260E": "phone", "\u2640": "female", "\u2642": "male", "\u2660": "spades", "\u2663": "clubs", "\u2665": "hearts", "\u2666": "diams", "\u266A": "sung", "\u2713": "check", "\u2717": "cross", "\u2720": "malt", "\u2736": "sext", "\u2758": "VerticalSeparator", "\u27C8": "bsolhsub", "\u27C9": "suphsol", "\u27F5": "xlarr", "\u27F6": "xrarr", "\u27F7": "xharr", "\u27F8": "xlArr", "\u27F9": "xrArr", "\u27FA": "xhArr", "\u27FC": "xmap", "\u27FF": "dzigrarr", "\u2902": "nvlArr", "\u2903": "nvrArr", "\u2904": "nvHarr", "\u2905": "Map", "\u290C": "lbarr", "\u290D": "rbarr", "\u290E": "lBarr", "\u290F": "rBarr", "\u2910": "RBarr", "\u2911": "DDotrahd", "\u2912": "UpArrowBar", "\u2913": "DownArrowBar", "\u2916": "Rarrtl", "\u2919": "latail", "\u291A": "ratail", "\u291B": "lAtail", "\u291C": "rAtail", "\u291D": "larrfs", "\u291E": "rarrfs", "\u291F": "larrbfs", "\u2920": "rarrbfs", "\u2923": "nwarhk", "\u2924": "nearhk", "\u2925": "searhk", "\u2926": "swarhk", "\u2927": "nwnear", "\u2928": "toea", "\u2929": "tosa", "\u292A": "swnwar", "\u2933": "rarrc", "\u2933\u0338": "nrarrc", "\u2935": "cudarrr", "\u2936": "ldca", "\u2937": "rdca", "\u2938": "cudarrl", "\u2939": "larrpl", "\u293C": "curarrm", "\u293D": "cularrp", "\u2945": "rarrpl", "\u2948": "harrcir", "\u2949": "Uarrocir", "\u294A": "lurdshar", "\u294B": "ldrushar", "\u294E": "LeftRightVector", "\u294F": "RightUpDownVector", "\u2950": "DownLeftRightVector", "\u2951": "LeftUpDownVector", "\u2952": "LeftVectorBar", "\u2953": "RightVectorBar", "\u2954": "RightUpVectorBar", "\u2955": "RightDownVectorBar", "\u2956": "DownLeftVectorBar", "\u2957": "DownRightVectorBar", "\u2958": "LeftUpVectorBar", "\u2959": "LeftDownVectorBar", "\u295A": "LeftTeeVector", "\u295B": "RightTeeVector", "\u295C": "RightUpTeeVector", "\u295D": "RightDownTeeVector", "\u295E": "DownLeftTeeVector", "\u295F": "DownRightTeeVector", "\u2960": "LeftUpTeeVector", "\u2961": "LeftDownTeeVector", "\u2962": "lHar", "\u2963": "uHar", "\u2964": "rHar", "\u2965": "dHar", "\u2966": "luruhar", "\u2967": "ldrdhar", "\u2968": "ruluhar", "\u2969": "rdldhar", "\u296A": "lharul", "\u296B": "llhard", "\u296C": "rharul", "\u296D": "lrhard", "\u296E": "udhar", "\u296F": "duhar", "\u2970": "RoundImplies", "\u2971": "erarr", "\u2972": "simrarr", "\u2973": "larrsim", "\u2974": "rarrsim", "\u2975": "rarrap", "\u2976": "ltlarr", "\u2978": "gtrarr", "\u2979": "subrarr", "\u297B": "suplarr", "\u297C": "lfisht", "\u297D": "rfisht", "\u297E": "ufisht", "\u297F": "dfisht", "\u299A": "vzigzag", "\u299C": "vangrt", "\u299D": "angrtvbd", "\u29A4": "ange", "\u29A5": "range", "\u29A6": "dwangle", "\u29A7": "uwangle", "\u29A8": "angmsdaa", "\u29A9": "angmsdab", "\u29AA": "angmsdac", "\u29AB": "angmsdad", "\u29AC": "angmsdae", "\u29AD": "angmsdaf", "\u29AE": "angmsdag", "\u29AF": "angmsdah", "\u29B0": "bemptyv", "\u29B1": "demptyv", "\u29B2": "cemptyv", "\u29B3": "raemptyv", "\u29B4": "laemptyv", "\u29B5": "ohbar", "\u29B6": "omid", "\u29B7": "opar", "\u29B9": "operp", "\u29BB": "olcross", "\u29BC": "odsold", "\u29BE": "olcir", "\u29BF": "ofcir", "\u29C0": "olt", "\u29C1": "ogt", "\u29C2": "cirscir", "\u29C3": "cirE", "\u29C4": "solb", "\u29C5": "bsolb", "\u29C9": "boxbox", "\u29CD": "trisb", "\u29CE": "rtriltri", "\u29CF": "LeftTriangleBar", "\u29CF\u0338": "NotLeftTriangleBar", "\u29D0": "RightTriangleBar", "\u29D0\u0338": "NotRightTriangleBar", "\u29DC": "iinfin", "\u29DD": "infintie", "\u29DE": "nvinfin", "\u29E3": "eparsl", "\u29E4": "smeparsl", "\u29E5": "eqvparsl", "\u29EB": "lozf", "\u29F4": "RuleDelayed", "\u29F6": "dsol", "\u2A00": "xodot", "\u2A01": "xoplus", "\u2A02": "xotime", "\u2A04": "xuplus", "\u2A06": "xsqcup", "\u2A0D": "fpartint", "\u2A10": "cirfnint", "\u2A11": "awint", "\u2A12": "rppolint", "\u2A13": "scpolint", "\u2A14": "npolint", "\u2A15": "pointint", "\u2A16": "quatint", "\u2A17": "intlarhk", "\u2A22": "pluscir", "\u2A23": "plusacir", "\u2A24": "simplus", "\u2A25": "plusdu", "\u2A26": "plussim", "\u2A27": "plustwo", "\u2A29": "mcomma", "\u2A2A": "minusdu", "\u2A2D": "loplus", "\u2A2E": "roplus", "\u2A2F": "Cross", "\u2A30": "timesd", "\u2A31": "timesbar", "\u2A33": "smashp", "\u2A34": "lotimes", "\u2A35": "rotimes", "\u2A36": "otimesas", "\u2A37": "Otimes", "\u2A38": "odiv", "\u2A39": "triplus", "\u2A3A": "triminus", "\u2A3B": "tritime", "\u2A3C": "iprod", "\u2A3F": "amalg", "\u2A40": "capdot", "\u2A42": "ncup", "\u2A43": "ncap", "\u2A44": "capand", "\u2A45": "cupor", "\u2A46": "cupcap", "\u2A47": "capcup", "\u2A48": "cupbrcap", "\u2A49": "capbrcup", "\u2A4A": "cupcup", "\u2A4B": "capcap", "\u2A4C": "ccups", "\u2A4D": "ccaps", "\u2A50": "ccupssm", "\u2A53": "And", "\u2A54": "Or", "\u2A55": "andand", "\u2A56": "oror", "\u2A57": "orslope", "\u2A58": "andslope", "\u2A5A": "andv", "\u2A5B": "orv", "\u2A5C": "andd", "\u2A5D": "ord", "\u2A5F": "wedbar", "\u2A66": "sdote", "\u2A6A": "simdot", "\u2A6D": "congdot", "\u2A6D\u0338": "ncongdot", "\u2A6E": "easter", "\u2A6F": "apacir", "\u2A70": "apE", "\u2A70\u0338": "napE", "\u2A71": "eplus", "\u2A72": "pluse", "\u2A73": "Esim", "\u2A77": "eDDot", "\u2A78": "equivDD", "\u2A79": "ltcir", "\u2A7A": "gtcir", "\u2A7B": "ltquest", "\u2A7C": "gtquest", "\u2A7D": "les", "\u2A7D\u0338": "nles", "\u2A7E": "ges", "\u2A7E\u0338": "nges", "\u2A7F": "lesdot", "\u2A80": "gesdot", "\u2A81": "lesdoto", "\u2A82": "gesdoto", "\u2A83": "lesdotor", "\u2A84": "gesdotol", "\u2A85": "lap", "\u2A86": "gap", "\u2A87": "lne", "\u2A88": "gne", "\u2A89": "lnap", "\u2A8A": "gnap", "\u2A8B": "lEg", "\u2A8C": "gEl", "\u2A8D": "lsime", "\u2A8E": "gsime", "\u2A8F": "lsimg", "\u2A90": "gsiml", "\u2A91": "lgE", "\u2A92": "glE", "\u2A93": "lesges", "\u2A94": "gesles", "\u2A95": "els", "\u2A96": "egs", "\u2A97": "elsdot", "\u2A98": "egsdot", "\u2A99": "el", "\u2A9A": "eg", "\u2A9D": "siml", "\u2A9E": "simg", "\u2A9F": "simlE", "\u2AA0": "simgE", "\u2AA1": "LessLess", "\u2AA1\u0338": "NotNestedLessLess", "\u2AA2": "GreaterGreater", "\u2AA2\u0338": "NotNestedGreaterGreater", "\u2AA4": "glj", "\u2AA5": "gla", "\u2AA6": "ltcc", "\u2AA7": "gtcc", "\u2AA8": "lescc", "\u2AA9": "gescc", "\u2AAA": "smt", "\u2AAB": "lat", "\u2AAC": "smte", "\u2AAC\uFE00": "smtes", "\u2AAD": "late", "\u2AAD\uFE00": "lates", "\u2AAE": "bumpE", "\u2AAF": "pre", "\u2AAF\u0338": "npre", "\u2AB0": "sce", "\u2AB0\u0338": "nsce", "\u2AB3": "prE", "\u2AB4": "scE", "\u2AB5": "prnE", "\u2AB6": "scnE", "\u2AB7": "prap", "\u2AB8": "scap", "\u2AB9": "prnap", "\u2ABA": "scnap", "\u2ABB": "Pr", "\u2ABC": "Sc", "\u2ABD": "subdot", "\u2ABE": "supdot", "\u2ABF": "subplus", "\u2AC0": "supplus", "\u2AC1": "submult", "\u2AC2": "supmult", "\u2AC3": "subedot", "\u2AC4": "supedot", "\u2AC5": "subE", "\u2AC5\u0338": "nsubE", "\u2AC6": "supE", "\u2AC6\u0338": "nsupE", "\u2AC7": "subsim", "\u2AC8": "supsim", "\u2ACB\uFE00": "vsubnE", "\u2ACB": "subnE", "\u2ACC\uFE00": "vsupnE", "\u2ACC": "supnE", "\u2ACF": "csub", "\u2AD0": "csup", "\u2AD1": "csube", "\u2AD2": "csupe", "\u2AD3": "subsup", "\u2AD4": "supsub", "\u2AD5": "subsub", "\u2AD6": "supsup", "\u2AD7": "suphsub", "\u2AD8": "supdsub", "\u2AD9": "forkv", "\u2ADA": "topfork", "\u2ADB": "mlcp", "\u2AE4": "Dashv", "\u2AE6": "Vdashl", "\u2AE7": "Barv", "\u2AE8": "vBar", "\u2AE9": "vBarv", "\u2AEB": "Vbar", "\u2AEC": "Not", "\u2AED": "bNot", "\u2AEE": "rnmid", "\u2AEF": "cirmid", "\u2AF0": "midcir", "\u2AF1": "topcir", "\u2AF2": "nhpar", "\u2AF3": "parsim", "\u2AFD": "parsl", "\u2AFD\u20E5": "nparsl", "\u266D": "flat", "\u266E": "natur", "\u266F": "sharp", "\xA4": "curren", "\xA2": "cent", "$": "dollar", "\xA3": "pound", "\xA5": "yen", "\u20AC": "euro", "\xB9": "sup1", "\xBD": "half", "\u2153": "frac13", "\xBC": "frac14", "\u2155": "frac15", "\u2159": "frac16", "\u215B": "frac18", "\xB2": "sup2", "\u2154": "frac23", "\u2156": "frac25", "\xB3": "sup3", "\xBE": "frac34", "\u2157": "frac35", "\u215C": "frac38", "\u2158": "frac45", "\u215A": "frac56", "\u215D": "frac58", "\u215E": "frac78", "\u{1D4B6}": "ascr", "\u{1D552}": "aopf", "\u{1D51E}": "afr", "\u{1D538}": "Aopf", "\u{1D504}": "Afr", "\u{1D49C}": "Ascr", "\xAA": "ordf", "\xE1": "aacute", "\xC1": "Aacute", "\xE0": "agrave", "\xC0": "Agrave", "\u0103": "abreve", "\u0102": "Abreve", "\xE2": "acirc", "\xC2": "Acirc", "\xE5": "aring", "\xC5": "angst", "\xE4": "auml", "\xC4": "Auml", "\xE3": "atilde", "\xC3": "Atilde", "\u0105": "aogon", "\u0104": "Aogon", "\u0101": "amacr", "\u0100": "Amacr", "\xE6": "aelig", "\xC6": "AElig", "\u{1D4B7}": "bscr", "\u{1D553}": "bopf", "\u{1D51F}": "bfr", "\u{1D539}": "Bopf", "\u212C": "Bscr", "\u{1D505}": "Bfr", "\u{1D520}": "cfr", "\u{1D4B8}": "cscr", "\u{1D554}": "copf", "\u212D": "Cfr", "\u{1D49E}": "Cscr", "\u2102": "Copf", "\u0107": "cacute", "\u0106": "Cacute", "\u0109": "ccirc", "\u0108": "Ccirc", "\u010D": "ccaron", "\u010C": "Ccaron", "\u010B": "cdot", "\u010A": "Cdot", "\xE7": "ccedil", "\xC7": "Ccedil", "\u2105": "incare", "\u{1D521}": "dfr", "\u2146": "dd", "\u{1D555}": "dopf", "\u{1D4B9}": "dscr", "\u{1D49F}": "Dscr", "\u{1D507}": "Dfr", "\u2145": "DD", "\u{1D53B}": "Dopf", "\u010F": "dcaron", "\u010E": "Dcaron", "\u0111": "dstrok", "\u0110": "Dstrok", "\xF0": "eth", "\xD0": "ETH", "\u2147": "ee", "\u212F": "escr", "\u{1D522}": "efr", "\u{1D556}": "eopf", "\u2130": "Escr", "\u{1D508}": "Efr", "\u{1D53C}": "Eopf", "\xE9": "eacute", "\xC9": "Eacute", "\xE8": "egrave", "\xC8": "Egrave", "\xEA": "ecirc", "\xCA": "Ecirc", "\u011B": "ecaron", "\u011A": "Ecaron", "\xEB": "euml", "\xCB": "Euml", "\u0117": "edot", "\u0116": "Edot", "\u0119": "eogon", "\u0118": "Eogon", "\u0113": "emacr", "\u0112": "Emacr", "\u{1D523}": "ffr", "\u{1D557}": "fopf", "\u{1D4BB}": "fscr", "\u{1D509}": "Ffr", "\u{1D53D}": "Fopf", "\u2131": "Fscr", "\uFB00": "fflig", "\uFB03": "ffilig", "\uFB04": "ffllig", "\uFB01": "filig", "fj": "fjlig", "\uFB02": "fllig", "\u0192": "fnof", "\u210A": "gscr", "\u{1D558}": "gopf", "\u{1D524}": "gfr", "\u{1D4A2}": "Gscr", "\u{1D53E}": "Gopf", "\u{1D50A}": "Gfr", "\u01F5": "gacute", "\u011F": "gbreve", "\u011E": "Gbreve", "\u011D": "gcirc", "\u011C": "Gcirc", "\u0121": "gdot", "\u0120": "Gdot", "\u0122": "Gcedil", "\u{1D525}": "hfr", "\u210E": "planckh", "\u{1D4BD}": "hscr", "\u{1D559}": "hopf", "\u210B": "Hscr", "\u210C": "Hfr", "\u210D": "Hopf", "\u0125": "hcirc", "\u0124": "Hcirc", "\u210F": "hbar", "\u0127": "hstrok", "\u0126": "Hstrok", "\u{1D55A}": "iopf", "\u{1D526}": "ifr", "\u{1D4BE}": "iscr", "\u2148": "ii", "\u{1D540}": "Iopf", "\u2110": "Iscr", "\u2111": "Im", "\xED": "iacute", "\xCD": "Iacute", "\xEC": "igrave", "\xCC": "Igrave", "\xEE": "icirc", "\xCE": "Icirc", "\xEF": "iuml", "\xCF": "Iuml", "\u0129": "itilde", "\u0128": "Itilde", "\u0130": "Idot", "\u012F": "iogon", "\u012E": "Iogon", "\u012B": "imacr", "\u012A": "Imacr", "\u0133": "ijlig", "\u0132": "IJlig", "\u0131": "imath", "\u{1D4BF}": "jscr", "\u{1D55B}": "jopf", "\u{1D527}": "jfr", "\u{1D4A5}": "Jscr", "\u{1D50D}": "Jfr", "\u{1D541}": "Jopf", "\u0135": "jcirc", "\u0134": "Jcirc", "\u0237": "jmath", "\u{1D55C}": "kopf", "\u{1D4C0}": "kscr", "\u{1D528}": "kfr", "\u{1D4A6}": "Kscr", "\u{1D542}": "Kopf", "\u{1D50E}": "Kfr", "\u0137": "kcedil", "\u0136": "Kcedil", "\u{1D529}": "lfr", "\u{1D4C1}": "lscr", "\u2113": "ell", "\u{1D55D}": "lopf", "\u2112": "Lscr", "\u{1D50F}": "Lfr", "\u{1D543}": "Lopf", "\u013A": "lacute", "\u0139": "Lacute", "\u013E": "lcaron", "\u013D": "Lcaron", "\u013C": "lcedil", "\u013B": "Lcedil", "\u0142": "lstrok", "\u0141": "Lstrok", "\u0140": "lmidot", "\u013F": "Lmidot", "\u{1D52A}": "mfr", "\u{1D55E}": "mopf", "\u{1D4C2}": "mscr", "\u{1D510}": "Mfr", "\u{1D544}": "Mopf", "\u2133": "Mscr", "\u{1D52B}": "nfr", "\u{1D55F}": "nopf", "\u{1D4C3}": "nscr", "\u2115": "Nopf", "\u{1D4A9}": "Nscr", "\u{1D511}": "Nfr", "\u0144": "nacute", "\u0143": "Nacute", "\u0148": "ncaron", "\u0147": "Ncaron", "\xF1": "ntilde", "\xD1": "Ntilde", "\u0146": "ncedil", "\u0145": "Ncedil", "\u2116": "numero", "\u014B": "eng", "\u014A": "ENG", "\u{1D560}": "oopf", "\u{1D52C}": "ofr", "\u2134": "oscr", "\u{1D4AA}": "Oscr", "\u{1D512}": "Ofr", "\u{1D546}": "Oopf", "\xBA": "ordm", "\xF3": "oacute", "\xD3": "Oacute", "\xF2": "ograve", "\xD2": "Ograve", "\xF4": "ocirc", "\xD4": "Ocirc", "\xF6": "ouml", "\xD6": "Ouml", "\u0151": "odblac", "\u0150": "Odblac", "\xF5": "otilde", "\xD5": "Otilde", "\xF8": "oslash", "\xD8": "Oslash", "\u014D": "omacr", "\u014C": "Omacr", "\u0153": "oelig", "\u0152": "OElig", "\u{1D52D}": "pfr", "\u{1D4C5}": "pscr", "\u{1D561}": "popf", "\u2119": "Popf", "\u{1D513}": "Pfr", "\u{1D4AB}": "Pscr", "\u{1D562}": "qopf", "\u{1D52E}": "qfr", "\u{1D4C6}": "qscr", "\u{1D4AC}": "Qscr", "\u{1D514}": "Qfr", "\u211A": "Qopf", "\u0138": "kgreen", "\u{1D52F}": "rfr", "\u{1D563}": "ropf", "\u{1D4C7}": "rscr", "\u211B": "Rscr", "\u211C": "Re", "\u211D": "Ropf", "\u0155": "racute", "\u0154": "Racute", "\u0159": "rcaron", "\u0158": "Rcaron", "\u0157": "rcedil", "\u0156": "Rcedil", "\u{1D564}": "sopf", "\u{1D4C8}": "sscr", "\u{1D530}": "sfr", "\u{1D54A}": "Sopf", "\u{1D516}": "Sfr", "\u{1D4AE}": "Sscr", "\u24C8": "oS", "\u015B": "sacute", "\u015A": "Sacute", "\u015D": "scirc", "\u015C": "Scirc", "\u0161": "scaron", "\u0160": "Scaron", "\u015F": "scedil", "\u015E": "Scedil", "\xDF": "szlig", "\u{1D531}": "tfr", "\u{1D4C9}": "tscr", "\u{1D565}": "topf", "\u{1D4AF}": "Tscr", "\u{1D517}": "Tfr", "\u{1D54B}": "Topf", "\u0165": "tcaron", "\u0164": "Tcaron", "\u0163": "tcedil", "\u0162": "Tcedil", "\u2122": "trade", "\u0167": "tstrok", "\u0166": "Tstrok", "\u{1D4CA}": "uscr", "\u{1D566}": "uopf", "\u{1D532}": "ufr", "\u{1D54C}": "Uopf", "\u{1D518}": "Ufr", "\u{1D4B0}": "Uscr", "\xFA": "uacute", "\xDA": "Uacute", "\xF9": "ugrave", "\xD9": "Ugrave", "\u016D": "ubreve", "\u016C": "Ubreve", "\xFB": "ucirc", "\xDB": "Ucirc", "\u016F": "uring", "\u016E": "Uring", "\xFC": "uuml", "\xDC": "Uuml", "\u0171": "udblac", "\u0170": "Udblac", "\u0169": "utilde", "\u0168": "Utilde", "\u0173": "uogon", "\u0172": "Uogon", "\u016B": "umacr", "\u016A": "Umacr", "\u{1D533}": "vfr", "\u{1D567}": "vopf", "\u{1D4CB}": "vscr", "\u{1D519}": "Vfr", "\u{1D54D}": "Vopf", "\u{1D4B1}": "Vscr", "\u{1D568}": "wopf", "\u{1D4CC}": "wscr", "\u{1D534}": "wfr", "\u{1D4B2}": "Wscr", "\u{1D54E}": "Wopf", "\u{1D51A}": "Wfr", "\u0175": "wcirc", "\u0174": "Wcirc", "\u{1D535}": "xfr", "\u{1D4CD}": "xscr", "\u{1D569}": "xopf", "\u{1D54F}": "Xopf", "\u{1D51B}": "Xfr", "\u{1D4B3}": "Xscr", "\u{1D536}": "yfr", "\u{1D4CE}": "yscr", "\u{1D56A}": "yopf", "\u{1D4B4}": "Yscr", "\u{1D51C}": "Yfr", "\u{1D550}": "Yopf", "\xFD": "yacute", "\xDD": "Yacute", "\u0177": "ycirc", "\u0176": "Ycirc", "\xFF": "yuml", "\u0178": "Yuml", "\u{1D4CF}": "zscr", "\u{1D537}": "zfr", "\u{1D56B}": "zopf", "\u2128": "Zfr", "\u2124": "Zopf", "\u{1D4B5}": "Zscr", "\u017A": "zacute", "\u0179": "Zacute", "\u017E": "zcaron", "\u017D": "Zcaron", "\u017C": "zdot", "\u017B": "Zdot", "\u01B5": "imped", "\xFE": "thorn", "\xDE": "THORN", "\u0149": "napos", "\u03B1": "alpha", "\u0391": "Alpha", "\u03B2": "beta", "\u0392": "Beta", "\u03B3": "gamma", "\u0393": "Gamma", "\u03B4": "delta", "\u0394": "Delta", "\u03B5": "epsi", "\u03F5": "epsiv", "\u0395": "Epsilon", "\u03DD": "gammad", "\u03DC": "Gammad", "\u03B6": "zeta", "\u0396": "Zeta", "\u03B7": "eta", "\u0397": "Eta", "\u03B8": "theta", "\u03D1": "thetav", "\u0398": "Theta", "\u03B9": "iota", "\u0399": "Iota", "\u03BA": "kappa", "\u03F0": "kappav", "\u039A": "Kappa", "\u03BB": "lambda", "\u039B": "Lambda", "\u03BC": "mu", "\xB5": "micro", "\u039C": "Mu", "\u03BD": "nu", "\u039D": "Nu", "\u03BE": "xi", "\u039E": "Xi", "\u03BF": "omicron", "\u039F": "Omicron", "\u03C0": "pi", "\u03D6": "piv", "\u03A0": "Pi", "\u03C1": "rho", "\u03F1": "rhov", "\u03A1": "Rho", "\u03C3": "sigma", "\u03A3": "Sigma", "\u03C2": "sigmaf", "\u03C4": "tau", "\u03A4": "Tau", "\u03C5": "upsi", "\u03A5": "Upsilon", "\u03D2": "Upsi", "\u03C6": "phi", "\u03D5": "phiv", "\u03A6": "Phi", "\u03C7": "chi", "\u03A7": "Chi", "\u03C8": "psi", "\u03A8": "Psi", "\u03C9": "omega", "\u03A9": "ohm", "\u0430": "acy", "\u0410": "Acy", "\u0431": "bcy", "\u0411": "Bcy", "\u0432": "vcy", "\u0412": "Vcy", "\u0433": "gcy", "\u0413": "Gcy", "\u0453": "gjcy", "\u0403": "GJcy", "\u0434": "dcy", "\u0414": "Dcy", "\u0452": "djcy", "\u0402": "DJcy", "\u0435": "iecy", "\u0415": "IEcy", "\u0451": "iocy", "\u0401": "IOcy", "\u0454": "jukcy", "\u0404": "Jukcy", "\u0436": "zhcy", "\u0416": "ZHcy", "\u0437": "zcy", "\u0417": "Zcy", "\u0455": "dscy", "\u0405": "DScy", "\u0438": "icy", "\u0418": "Icy", "\u0456": "iukcy", "\u0406": "Iukcy", "\u0457": "yicy", "\u0407": "YIcy", "\u0439": "jcy", "\u0419": "Jcy", "\u0458": "jsercy", "\u0408": "Jsercy", "\u043A": "kcy", "\u041A": "Kcy", "\u045C": "kjcy", "\u040C": "KJcy", "\u043B": "lcy", "\u041B": "Lcy", "\u0459": "ljcy", "\u0409": "LJcy", "\u043C": "mcy", "\u041C": "Mcy", "\u043D": "ncy", "\u041D": "Ncy", "\u045A": "njcy", "\u040A": "NJcy", "\u043E": "ocy", "\u041E": "Ocy", "\u043F": "pcy", "\u041F": "Pcy", "\u0440": "rcy", "\u0420": "Rcy", "\u0441": "scy", "\u0421": "Scy", "\u0442": "tcy", "\u0422": "Tcy", "\u045B": "tshcy", "\u040B": "TSHcy", "\u0443": "ucy", "\u0423": "Ucy", "\u045E": "ubrcy", "\u040E": "Ubrcy", "\u0444": "fcy", "\u0424": "Fcy", "\u0445": "khcy", "\u0425": "KHcy", "\u0446": "tscy", "\u0426": "TScy", "\u0447": "chcy", "\u0427": "CHcy", "\u045F": "dzcy", "\u040F": "DZcy", "\u0448": "shcy", "\u0428": "SHcy", "\u0449": "shchcy", "\u0429": "SHCHcy", "\u044A": "hardcy", "\u042A": "HARDcy", "\u044B": "ycy", "\u042B": "Ycy", "\u044C": "softcy", "\u042C": "SOFTcy", "\u044D": "ecy", "\u042D": "Ecy", "\u044E": "yucy", "\u042E": "YUcy", "\u044F": "yacy", "\u042F": "YAcy", "\u2135": "aleph", "\u2136": "beth", "\u2137": "gimel", "\u2138": "daleth" };
          var regexEscape = /["&'<>`]/g;
          var escapeMap = {
            '"': "&quot;",
            "&": "&amp;",
            "'": "&#x27;",
            "<": "&lt;",
            // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
            // following is not strictly necessary unless it’s part of a tag or an
            // unquoted attribute value. We’re only escaping it to support those
            // situations, and for XML support.
            ">": "&gt;",
            // In Internet Explorer ≤ 8, the backtick character can be used
            // to break out of (un)quoted attribute values or HTML comments.
            // See http://html5sec.org/#102, http://html5sec.org/#108, and
            // http://html5sec.org/#133.
            "`": "&#x60;"
          };
          var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
          var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
          var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
          var decodeMap = { "aacute": "\xE1", "Aacute": "\xC1", "abreve": "\u0103", "Abreve": "\u0102", "ac": "\u223E", "acd": "\u223F", "acE": "\u223E\u0333", "acirc": "\xE2", "Acirc": "\xC2", "acute": "\xB4", "acy": "\u0430", "Acy": "\u0410", "aelig": "\xE6", "AElig": "\xC6", "af": "\u2061", "afr": "\u{1D51E}", "Afr": "\u{1D504}", "agrave": "\xE0", "Agrave": "\xC0", "alefsym": "\u2135", "aleph": "\u2135", "alpha": "\u03B1", "Alpha": "\u0391", "amacr": "\u0101", "Amacr": "\u0100", "amalg": "\u2A3F", "amp": "&", "AMP": "&", "and": "\u2227", "And": "\u2A53", "andand": "\u2A55", "andd": "\u2A5C", "andslope": "\u2A58", "andv": "\u2A5A", "ang": "\u2220", "ange": "\u29A4", "angle": "\u2220", "angmsd": "\u2221", "angmsdaa": "\u29A8", "angmsdab": "\u29A9", "angmsdac": "\u29AA", "angmsdad": "\u29AB", "angmsdae": "\u29AC", "angmsdaf": "\u29AD", "angmsdag": "\u29AE", "angmsdah": "\u29AF", "angrt": "\u221F", "angrtvb": "\u22BE", "angrtvbd": "\u299D", "angsph": "\u2222", "angst": "\xC5", "angzarr": "\u237C", "aogon": "\u0105", "Aogon": "\u0104", "aopf": "\u{1D552}", "Aopf": "\u{1D538}", "ap": "\u2248", "apacir": "\u2A6F", "ape": "\u224A", "apE": "\u2A70", "apid": "\u224B", "apos": "'", "ApplyFunction": "\u2061", "approx": "\u2248", "approxeq": "\u224A", "aring": "\xE5", "Aring": "\xC5", "ascr": "\u{1D4B6}", "Ascr": "\u{1D49C}", "Assign": "\u2254", "ast": "*", "asymp": "\u2248", "asympeq": "\u224D", "atilde": "\xE3", "Atilde": "\xC3", "auml": "\xE4", "Auml": "\xC4", "awconint": "\u2233", "awint": "\u2A11", "backcong": "\u224C", "backepsilon": "\u03F6", "backprime": "\u2035", "backsim": "\u223D", "backsimeq": "\u22CD", "Backslash": "\u2216", "Barv": "\u2AE7", "barvee": "\u22BD", "barwed": "\u2305", "Barwed": "\u2306", "barwedge": "\u2305", "bbrk": "\u23B5", "bbrktbrk": "\u23B6", "bcong": "\u224C", "bcy": "\u0431", "Bcy": "\u0411", "bdquo": "\u201E", "becaus": "\u2235", "because": "\u2235", "Because": "\u2235", "bemptyv": "\u29B0", "bepsi": "\u03F6", "bernou": "\u212C", "Bernoullis": "\u212C", "beta": "\u03B2", "Beta": "\u0392", "beth": "\u2136", "between": "\u226C", "bfr": "\u{1D51F}", "Bfr": "\u{1D505}", "bigcap": "\u22C2", "bigcirc": "\u25EF", "bigcup": "\u22C3", "bigodot": "\u2A00", "bigoplus": "\u2A01", "bigotimes": "\u2A02", "bigsqcup": "\u2A06", "bigstar": "\u2605", "bigtriangledown": "\u25BD", "bigtriangleup": "\u25B3", "biguplus": "\u2A04", "bigvee": "\u22C1", "bigwedge": "\u22C0", "bkarow": "\u290D", "blacklozenge": "\u29EB", "blacksquare": "\u25AA", "blacktriangle": "\u25B4", "blacktriangledown": "\u25BE", "blacktriangleleft": "\u25C2", "blacktriangleright": "\u25B8", "blank": "\u2423", "blk12": "\u2592", "blk14": "\u2591", "blk34": "\u2593", "block": "\u2588", "bne": "=\u20E5", "bnequiv": "\u2261\u20E5", "bnot": "\u2310", "bNot": "\u2AED", "bopf": "\u{1D553}", "Bopf": "\u{1D539}", "bot": "\u22A5", "bottom": "\u22A5", "bowtie": "\u22C8", "boxbox": "\u29C9", "boxdl": "\u2510", "boxdL": "\u2555", "boxDl": "\u2556", "boxDL": "\u2557", "boxdr": "\u250C", "boxdR": "\u2552", "boxDr": "\u2553", "boxDR": "\u2554", "boxh": "\u2500", "boxH": "\u2550", "boxhd": "\u252C", "boxhD": "\u2565", "boxHd": "\u2564", "boxHD": "\u2566", "boxhu": "\u2534", "boxhU": "\u2568", "boxHu": "\u2567", "boxHU": "\u2569", "boxminus": "\u229F", "boxplus": "\u229E", "boxtimes": "\u22A0", "boxul": "\u2518", "boxuL": "\u255B", "boxUl": "\u255C", "boxUL": "\u255D", "boxur": "\u2514", "boxuR": "\u2558", "boxUr": "\u2559", "boxUR": "\u255A", "boxv": "\u2502", "boxV": "\u2551", "boxvh": "\u253C", "boxvH": "\u256A", "boxVh": "\u256B", "boxVH": "\u256C", "boxvl": "\u2524", "boxvL": "\u2561", "boxVl": "\u2562", "boxVL": "\u2563", "boxvr": "\u251C", "boxvR": "\u255E", "boxVr": "\u255F", "boxVR": "\u2560", "bprime": "\u2035", "breve": "\u02D8", "Breve": "\u02D8", "brvbar": "\xA6", "bscr": "\u{1D4B7}", "Bscr": "\u212C", "bsemi": "\u204F", "bsim": "\u223D", "bsime": "\u22CD", "bsol": "\\", "bsolb": "\u29C5", "bsolhsub": "\u27C8", "bull": "\u2022", "bullet": "\u2022", "bump": "\u224E", "bumpe": "\u224F", "bumpE": "\u2AAE", "bumpeq": "\u224F", "Bumpeq": "\u224E", "cacute": "\u0107", "Cacute": "\u0106", "cap": "\u2229", "Cap": "\u22D2", "capand": "\u2A44", "capbrcup": "\u2A49", "capcap": "\u2A4B", "capcup": "\u2A47", "capdot": "\u2A40", "CapitalDifferentialD": "\u2145", "caps": "\u2229\uFE00", "caret": "\u2041", "caron": "\u02C7", "Cayleys": "\u212D", "ccaps": "\u2A4D", "ccaron": "\u010D", "Ccaron": "\u010C", "ccedil": "\xE7", "Ccedil": "\xC7", "ccirc": "\u0109", "Ccirc": "\u0108", "Cconint": "\u2230", "ccups": "\u2A4C", "ccupssm": "\u2A50", "cdot": "\u010B", "Cdot": "\u010A", "cedil": "\xB8", "Cedilla": "\xB8", "cemptyv": "\u29B2", "cent": "\xA2", "centerdot": "\xB7", "CenterDot": "\xB7", "cfr": "\u{1D520}", "Cfr": "\u212D", "chcy": "\u0447", "CHcy": "\u0427", "check": "\u2713", "checkmark": "\u2713", "chi": "\u03C7", "Chi": "\u03A7", "cir": "\u25CB", "circ": "\u02C6", "circeq": "\u2257", "circlearrowleft": "\u21BA", "circlearrowright": "\u21BB", "circledast": "\u229B", "circledcirc": "\u229A", "circleddash": "\u229D", "CircleDot": "\u2299", "circledR": "\xAE", "circledS": "\u24C8", "CircleMinus": "\u2296", "CirclePlus": "\u2295", "CircleTimes": "\u2297", "cire": "\u2257", "cirE": "\u29C3", "cirfnint": "\u2A10", "cirmid": "\u2AEF", "cirscir": "\u29C2", "ClockwiseContourIntegral": "\u2232", "CloseCurlyDoubleQuote": "\u201D", "CloseCurlyQuote": "\u2019", "clubs": "\u2663", "clubsuit": "\u2663", "colon": ":", "Colon": "\u2237", "colone": "\u2254", "Colone": "\u2A74", "coloneq": "\u2254", "comma": ",", "commat": "@", "comp": "\u2201", "compfn": "\u2218", "complement": "\u2201", "complexes": "\u2102", "cong": "\u2245", "congdot": "\u2A6D", "Congruent": "\u2261", "conint": "\u222E", "Conint": "\u222F", "ContourIntegral": "\u222E", "copf": "\u{1D554}", "Copf": "\u2102", "coprod": "\u2210", "Coproduct": "\u2210", "copy": "\xA9", "COPY": "\xA9", "copysr": "\u2117", "CounterClockwiseContourIntegral": "\u2233", "crarr": "\u21B5", "cross": "\u2717", "Cross": "\u2A2F", "cscr": "\u{1D4B8}", "Cscr": "\u{1D49E}", "csub": "\u2ACF", "csube": "\u2AD1", "csup": "\u2AD0", "csupe": "\u2AD2", "ctdot": "\u22EF", "cudarrl": "\u2938", "cudarrr": "\u2935", "cuepr": "\u22DE", "cuesc": "\u22DF", "cularr": "\u21B6", "cularrp": "\u293D", "cup": "\u222A", "Cup": "\u22D3", "cupbrcap": "\u2A48", "cupcap": "\u2A46", "CupCap": "\u224D", "cupcup": "\u2A4A", "cupdot": "\u228D", "cupor": "\u2A45", "cups": "\u222A\uFE00", "curarr": "\u21B7", "curarrm": "\u293C", "curlyeqprec": "\u22DE", "curlyeqsucc": "\u22DF", "curlyvee": "\u22CE", "curlywedge": "\u22CF", "curren": "\xA4", "curvearrowleft": "\u21B6", "curvearrowright": "\u21B7", "cuvee": "\u22CE", "cuwed": "\u22CF", "cwconint": "\u2232", "cwint": "\u2231", "cylcty": "\u232D", "dagger": "\u2020", "Dagger": "\u2021", "daleth": "\u2138", "darr": "\u2193", "dArr": "\u21D3", "Darr": "\u21A1", "dash": "\u2010", "dashv": "\u22A3", "Dashv": "\u2AE4", "dbkarow": "\u290F", "dblac": "\u02DD", "dcaron": "\u010F", "Dcaron": "\u010E", "dcy": "\u0434", "Dcy": "\u0414", "dd": "\u2146", "DD": "\u2145", "ddagger": "\u2021", "ddarr": "\u21CA", "DDotrahd": "\u2911", "ddotseq": "\u2A77", "deg": "\xB0", "Del": "\u2207", "delta": "\u03B4", "Delta": "\u0394", "demptyv": "\u29B1", "dfisht": "\u297F", "dfr": "\u{1D521}", "Dfr": "\u{1D507}", "dHar": "\u2965", "dharl": "\u21C3", "dharr": "\u21C2", "DiacriticalAcute": "\xB4", "DiacriticalDot": "\u02D9", "DiacriticalDoubleAcute": "\u02DD", "DiacriticalGrave": "`", "DiacriticalTilde": "\u02DC", "diam": "\u22C4", "diamond": "\u22C4", "Diamond": "\u22C4", "diamondsuit": "\u2666", "diams": "\u2666", "die": "\xA8", "DifferentialD": "\u2146", "digamma": "\u03DD", "disin": "\u22F2", "div": "\xF7", "divide": "\xF7", "divideontimes": "\u22C7", "divonx": "\u22C7", "djcy": "\u0452", "DJcy": "\u0402", "dlcorn": "\u231E", "dlcrop": "\u230D", "dollar": "$", "dopf": "\u{1D555}", "Dopf": "\u{1D53B}", "dot": "\u02D9", "Dot": "\xA8", "DotDot": "\u20DC", "doteq": "\u2250", "doteqdot": "\u2251", "DotEqual": "\u2250", "dotminus": "\u2238", "dotplus": "\u2214", "dotsquare": "\u22A1", "doublebarwedge": "\u2306", "DoubleContourIntegral": "\u222F", "DoubleDot": "\xA8", "DoubleDownArrow": "\u21D3", "DoubleLeftArrow": "\u21D0", "DoubleLeftRightArrow": "\u21D4", "DoubleLeftTee": "\u2AE4", "DoubleLongLeftArrow": "\u27F8", "DoubleLongLeftRightArrow": "\u27FA", "DoubleLongRightArrow": "\u27F9", "DoubleRightArrow": "\u21D2", "DoubleRightTee": "\u22A8", "DoubleUpArrow": "\u21D1", "DoubleUpDownArrow": "\u21D5", "DoubleVerticalBar": "\u2225", "downarrow": "\u2193", "Downarrow": "\u21D3", "DownArrow": "\u2193", "DownArrowBar": "\u2913", "DownArrowUpArrow": "\u21F5", "DownBreve": "\u0311", "downdownarrows": "\u21CA", "downharpoonleft": "\u21C3", "downharpoonright": "\u21C2", "DownLeftRightVector": "\u2950", "DownLeftTeeVector": "\u295E", "DownLeftVector": "\u21BD", "DownLeftVectorBar": "\u2956", "DownRightTeeVector": "\u295F", "DownRightVector": "\u21C1", "DownRightVectorBar": "\u2957", "DownTee": "\u22A4", "DownTeeArrow": "\u21A7", "drbkarow": "\u2910", "drcorn": "\u231F", "drcrop": "\u230C", "dscr": "\u{1D4B9}", "Dscr": "\u{1D49F}", "dscy": "\u0455", "DScy": "\u0405", "dsol": "\u29F6", "dstrok": "\u0111", "Dstrok": "\u0110", "dtdot": "\u22F1", "dtri": "\u25BF", "dtrif": "\u25BE", "duarr": "\u21F5", "duhar": "\u296F", "dwangle": "\u29A6", "dzcy": "\u045F", "DZcy": "\u040F", "dzigrarr": "\u27FF", "eacute": "\xE9", "Eacute": "\xC9", "easter": "\u2A6E", "ecaron": "\u011B", "Ecaron": "\u011A", "ecir": "\u2256", "ecirc": "\xEA", "Ecirc": "\xCA", "ecolon": "\u2255", "ecy": "\u044D", "Ecy": "\u042D", "eDDot": "\u2A77", "edot": "\u0117", "eDot": "\u2251", "Edot": "\u0116", "ee": "\u2147", "efDot": "\u2252", "efr": "\u{1D522}", "Efr": "\u{1D508}", "eg": "\u2A9A", "egrave": "\xE8", "Egrave": "\xC8", "egs": "\u2A96", "egsdot": "\u2A98", "el": "\u2A99", "Element": "\u2208", "elinters": "\u23E7", "ell": "\u2113", "els": "\u2A95", "elsdot": "\u2A97", "emacr": "\u0113", "Emacr": "\u0112", "empty": "\u2205", "emptyset": "\u2205", "EmptySmallSquare": "\u25FB", "emptyv": "\u2205", "EmptyVerySmallSquare": "\u25AB", "emsp": "\u2003", "emsp13": "\u2004", "emsp14": "\u2005", "eng": "\u014B", "ENG": "\u014A", "ensp": "\u2002", "eogon": "\u0119", "Eogon": "\u0118", "eopf": "\u{1D556}", "Eopf": "\u{1D53C}", "epar": "\u22D5", "eparsl": "\u29E3", "eplus": "\u2A71", "epsi": "\u03B5", "epsilon": "\u03B5", "Epsilon": "\u0395", "epsiv": "\u03F5", "eqcirc": "\u2256", "eqcolon": "\u2255", "eqsim": "\u2242", "eqslantgtr": "\u2A96", "eqslantless": "\u2A95", "Equal": "\u2A75", "equals": "=", "EqualTilde": "\u2242", "equest": "\u225F", "Equilibrium": "\u21CC", "equiv": "\u2261", "equivDD": "\u2A78", "eqvparsl": "\u29E5", "erarr": "\u2971", "erDot": "\u2253", "escr": "\u212F", "Escr": "\u2130", "esdot": "\u2250", "esim": "\u2242", "Esim": "\u2A73", "eta": "\u03B7", "Eta": "\u0397", "eth": "\xF0", "ETH": "\xD0", "euml": "\xEB", "Euml": "\xCB", "euro": "\u20AC", "excl": "!", "exist": "\u2203", "Exists": "\u2203", "expectation": "\u2130", "exponentiale": "\u2147", "ExponentialE": "\u2147", "fallingdotseq": "\u2252", "fcy": "\u0444", "Fcy": "\u0424", "female": "\u2640", "ffilig": "\uFB03", "fflig": "\uFB00", "ffllig": "\uFB04", "ffr": "\u{1D523}", "Ffr": "\u{1D509}", "filig": "\uFB01", "FilledSmallSquare": "\u25FC", "FilledVerySmallSquare": "\u25AA", "fjlig": "fj", "flat": "\u266D", "fllig": "\uFB02", "fltns": "\u25B1", "fnof": "\u0192", "fopf": "\u{1D557}", "Fopf": "\u{1D53D}", "forall": "\u2200", "ForAll": "\u2200", "fork": "\u22D4", "forkv": "\u2AD9", "Fouriertrf": "\u2131", "fpartint": "\u2A0D", "frac12": "\xBD", "frac13": "\u2153", "frac14": "\xBC", "frac15": "\u2155", "frac16": "\u2159", "frac18": "\u215B", "frac23": "\u2154", "frac25": "\u2156", "frac34": "\xBE", "frac35": "\u2157", "frac38": "\u215C", "frac45": "\u2158", "frac56": "\u215A", "frac58": "\u215D", "frac78": "\u215E", "frasl": "\u2044", "frown": "\u2322", "fscr": "\u{1D4BB}", "Fscr": "\u2131", "gacute": "\u01F5", "gamma": "\u03B3", "Gamma": "\u0393", "gammad": "\u03DD", "Gammad": "\u03DC", "gap": "\u2A86", "gbreve": "\u011F", "Gbreve": "\u011E", "Gcedil": "\u0122", "gcirc": "\u011D", "Gcirc": "\u011C", "gcy": "\u0433", "Gcy": "\u0413", "gdot": "\u0121", "Gdot": "\u0120", "ge": "\u2265", "gE": "\u2267", "gel": "\u22DB", "gEl": "\u2A8C", "geq": "\u2265", "geqq": "\u2267", "geqslant": "\u2A7E", "ges": "\u2A7E", "gescc": "\u2AA9", "gesdot": "\u2A80", "gesdoto": "\u2A82", "gesdotol": "\u2A84", "gesl": "\u22DB\uFE00", "gesles": "\u2A94", "gfr": "\u{1D524}", "Gfr": "\u{1D50A}", "gg": "\u226B", "Gg": "\u22D9", "ggg": "\u22D9", "gimel": "\u2137", "gjcy": "\u0453", "GJcy": "\u0403", "gl": "\u2277", "gla": "\u2AA5", "glE": "\u2A92", "glj": "\u2AA4", "gnap": "\u2A8A", "gnapprox": "\u2A8A", "gne": "\u2A88", "gnE": "\u2269", "gneq": "\u2A88", "gneqq": "\u2269", "gnsim": "\u22E7", "gopf": "\u{1D558}", "Gopf": "\u{1D53E}", "grave": "`", "GreaterEqual": "\u2265", "GreaterEqualLess": "\u22DB", "GreaterFullEqual": "\u2267", "GreaterGreater": "\u2AA2", "GreaterLess": "\u2277", "GreaterSlantEqual": "\u2A7E", "GreaterTilde": "\u2273", "gscr": "\u210A", "Gscr": "\u{1D4A2}", "gsim": "\u2273", "gsime": "\u2A8E", "gsiml": "\u2A90", "gt": ">", "Gt": "\u226B", "GT": ">", "gtcc": "\u2AA7", "gtcir": "\u2A7A", "gtdot": "\u22D7", "gtlPar": "\u2995", "gtquest": "\u2A7C", "gtrapprox": "\u2A86", "gtrarr": "\u2978", "gtrdot": "\u22D7", "gtreqless": "\u22DB", "gtreqqless": "\u2A8C", "gtrless": "\u2277", "gtrsim": "\u2273", "gvertneqq": "\u2269\uFE00", "gvnE": "\u2269\uFE00", "Hacek": "\u02C7", "hairsp": "\u200A", "half": "\xBD", "hamilt": "\u210B", "hardcy": "\u044A", "HARDcy": "\u042A", "harr": "\u2194", "hArr": "\u21D4", "harrcir": "\u2948", "harrw": "\u21AD", "Hat": "^", "hbar": "\u210F", "hcirc": "\u0125", "Hcirc": "\u0124", "hearts": "\u2665", "heartsuit": "\u2665", "hellip": "\u2026", "hercon": "\u22B9", "hfr": "\u{1D525}", "Hfr": "\u210C", "HilbertSpace": "\u210B", "hksearow": "\u2925", "hkswarow": "\u2926", "hoarr": "\u21FF", "homtht": "\u223B", "hookleftarrow": "\u21A9", "hookrightarrow": "\u21AA", "hopf": "\u{1D559}", "Hopf": "\u210D", "horbar": "\u2015", "HorizontalLine": "\u2500", "hscr": "\u{1D4BD}", "Hscr": "\u210B", "hslash": "\u210F", "hstrok": "\u0127", "Hstrok": "\u0126", "HumpDownHump": "\u224E", "HumpEqual": "\u224F", "hybull": "\u2043", "hyphen": "\u2010", "iacute": "\xED", "Iacute": "\xCD", "ic": "\u2063", "icirc": "\xEE", "Icirc": "\xCE", "icy": "\u0438", "Icy": "\u0418", "Idot": "\u0130", "iecy": "\u0435", "IEcy": "\u0415", "iexcl": "\xA1", "iff": "\u21D4", "ifr": "\u{1D526}", "Ifr": "\u2111", "igrave": "\xEC", "Igrave": "\xCC", "ii": "\u2148", "iiiint": "\u2A0C", "iiint": "\u222D", "iinfin": "\u29DC", "iiota": "\u2129", "ijlig": "\u0133", "IJlig": "\u0132", "Im": "\u2111", "imacr": "\u012B", "Imacr": "\u012A", "image": "\u2111", "ImaginaryI": "\u2148", "imagline": "\u2110", "imagpart": "\u2111", "imath": "\u0131", "imof": "\u22B7", "imped": "\u01B5", "Implies": "\u21D2", "in": "\u2208", "incare": "\u2105", "infin": "\u221E", "infintie": "\u29DD", "inodot": "\u0131", "int": "\u222B", "Int": "\u222C", "intcal": "\u22BA", "integers": "\u2124", "Integral": "\u222B", "intercal": "\u22BA", "Intersection": "\u22C2", "intlarhk": "\u2A17", "intprod": "\u2A3C", "InvisibleComma": "\u2063", "InvisibleTimes": "\u2062", "iocy": "\u0451", "IOcy": "\u0401", "iogon": "\u012F", "Iogon": "\u012E", "iopf": "\u{1D55A}", "Iopf": "\u{1D540}", "iota": "\u03B9", "Iota": "\u0399", "iprod": "\u2A3C", "iquest": "\xBF", "iscr": "\u{1D4BE}", "Iscr": "\u2110", "isin": "\u2208", "isindot": "\u22F5", "isinE": "\u22F9", "isins": "\u22F4", "isinsv": "\u22F3", "isinv": "\u2208", "it": "\u2062", "itilde": "\u0129", "Itilde": "\u0128", "iukcy": "\u0456", "Iukcy": "\u0406", "iuml": "\xEF", "Iuml": "\xCF", "jcirc": "\u0135", "Jcirc": "\u0134", "jcy": "\u0439", "Jcy": "\u0419", "jfr": "\u{1D527}", "Jfr": "\u{1D50D}", "jmath": "\u0237", "jopf": "\u{1D55B}", "Jopf": "\u{1D541}", "jscr": "\u{1D4BF}", "Jscr": "\u{1D4A5}", "jsercy": "\u0458", "Jsercy": "\u0408", "jukcy": "\u0454", "Jukcy": "\u0404", "kappa": "\u03BA", "Kappa": "\u039A", "kappav": "\u03F0", "kcedil": "\u0137", "Kcedil": "\u0136", "kcy": "\u043A", "Kcy": "\u041A", "kfr": "\u{1D528}", "Kfr": "\u{1D50E}", "kgreen": "\u0138", "khcy": "\u0445", "KHcy": "\u0425", "kjcy": "\u045C", "KJcy": "\u040C", "kopf": "\u{1D55C}", "Kopf": "\u{1D542}", "kscr": "\u{1D4C0}", "Kscr": "\u{1D4A6}", "lAarr": "\u21DA", "lacute": "\u013A", "Lacute": "\u0139", "laemptyv": "\u29B4", "lagran": "\u2112", "lambda": "\u03BB", "Lambda": "\u039B", "lang": "\u27E8", "Lang": "\u27EA", "langd": "\u2991", "langle": "\u27E8", "lap": "\u2A85", "Laplacetrf": "\u2112", "laquo": "\xAB", "larr": "\u2190", "lArr": "\u21D0", "Larr": "\u219E", "larrb": "\u21E4", "larrbfs": "\u291F", "larrfs": "\u291D", "larrhk": "\u21A9", "larrlp": "\u21AB", "larrpl": "\u2939", "larrsim": "\u2973", "larrtl": "\u21A2", "lat": "\u2AAB", "latail": "\u2919", "lAtail": "\u291B", "late": "\u2AAD", "lates": "\u2AAD\uFE00", "lbarr": "\u290C", "lBarr": "\u290E", "lbbrk": "\u2772", "lbrace": "{", "lbrack": "[", "lbrke": "\u298B", "lbrksld": "\u298F", "lbrkslu": "\u298D", "lcaron": "\u013E", "Lcaron": "\u013D", "lcedil": "\u013C", "Lcedil": "\u013B", "lceil": "\u2308", "lcub": "{", "lcy": "\u043B", "Lcy": "\u041B", "ldca": "\u2936", "ldquo": "\u201C", "ldquor": "\u201E", "ldrdhar": "\u2967", "ldrushar": "\u294B", "ldsh": "\u21B2", "le": "\u2264", "lE": "\u2266", "LeftAngleBracket": "\u27E8", "leftarrow": "\u2190", "Leftarrow": "\u21D0", "LeftArrow": "\u2190", "LeftArrowBar": "\u21E4", "LeftArrowRightArrow": "\u21C6", "leftarrowtail": "\u21A2", "LeftCeiling": "\u2308", "LeftDoubleBracket": "\u27E6", "LeftDownTeeVector": "\u2961", "LeftDownVector": "\u21C3", "LeftDownVectorBar": "\u2959", "LeftFloor": "\u230A", "leftharpoondown": "\u21BD", "leftharpoonup": "\u21BC", "leftleftarrows": "\u21C7", "leftrightarrow": "\u2194", "Leftrightarrow": "\u21D4", "LeftRightArrow": "\u2194", "leftrightarrows": "\u21C6", "leftrightharpoons": "\u21CB", "leftrightsquigarrow": "\u21AD", "LeftRightVector": "\u294E", "LeftTee": "\u22A3", "LeftTeeArrow": "\u21A4", "LeftTeeVector": "\u295A", "leftthreetimes": "\u22CB", "LeftTriangle": "\u22B2", "LeftTriangleBar": "\u29CF", "LeftTriangleEqual": "\u22B4", "LeftUpDownVector": "\u2951", "LeftUpTeeVector": "\u2960", "LeftUpVector": "\u21BF", "LeftUpVectorBar": "\u2958", "LeftVector": "\u21BC", "LeftVectorBar": "\u2952", "leg": "\u22DA", "lEg": "\u2A8B", "leq": "\u2264", "leqq": "\u2266", "leqslant": "\u2A7D", "les": "\u2A7D", "lescc": "\u2AA8", "lesdot": "\u2A7F", "lesdoto": "\u2A81", "lesdotor": "\u2A83", "lesg": "\u22DA\uFE00", "lesges": "\u2A93", "lessapprox": "\u2A85", "lessdot": "\u22D6", "lesseqgtr": "\u22DA", "lesseqqgtr": "\u2A8B", "LessEqualGreater": "\u22DA", "LessFullEqual": "\u2266", "LessGreater": "\u2276", "lessgtr": "\u2276", "LessLess": "\u2AA1", "lesssim": "\u2272", "LessSlantEqual": "\u2A7D", "LessTilde": "\u2272", "lfisht": "\u297C", "lfloor": "\u230A", "lfr": "\u{1D529}", "Lfr": "\u{1D50F}", "lg": "\u2276", "lgE": "\u2A91", "lHar": "\u2962", "lhard": "\u21BD", "lharu": "\u21BC", "lharul": "\u296A", "lhblk": "\u2584", "ljcy": "\u0459", "LJcy": "\u0409", "ll": "\u226A", "Ll": "\u22D8", "llarr": "\u21C7", "llcorner": "\u231E", "Lleftarrow": "\u21DA", "llhard": "\u296B", "lltri": "\u25FA", "lmidot": "\u0140", "Lmidot": "\u013F", "lmoust": "\u23B0", "lmoustache": "\u23B0", "lnap": "\u2A89", "lnapprox": "\u2A89", "lne": "\u2A87", "lnE": "\u2268", "lneq": "\u2A87", "lneqq": "\u2268", "lnsim": "\u22E6", "loang": "\u27EC", "loarr": "\u21FD", "lobrk": "\u27E6", "longleftarrow": "\u27F5", "Longleftarrow": "\u27F8", "LongLeftArrow": "\u27F5", "longleftrightarrow": "\u27F7", "Longleftrightarrow": "\u27FA", "LongLeftRightArrow": "\u27F7", "longmapsto": "\u27FC", "longrightarrow": "\u27F6", "Longrightarrow": "\u27F9", "LongRightArrow": "\u27F6", "looparrowleft": "\u21AB", "looparrowright": "\u21AC", "lopar": "\u2985", "lopf": "\u{1D55D}", "Lopf": "\u{1D543}", "loplus": "\u2A2D", "lotimes": "\u2A34", "lowast": "\u2217", "lowbar": "_", "LowerLeftArrow": "\u2199", "LowerRightArrow": "\u2198", "loz": "\u25CA", "lozenge": "\u25CA", "lozf": "\u29EB", "lpar": "(", "lparlt": "\u2993", "lrarr": "\u21C6", "lrcorner": "\u231F", "lrhar": "\u21CB", "lrhard": "\u296D", "lrm": "\u200E", "lrtri": "\u22BF", "lsaquo": "\u2039", "lscr": "\u{1D4C1}", "Lscr": "\u2112", "lsh": "\u21B0", "Lsh": "\u21B0", "lsim": "\u2272", "lsime": "\u2A8D", "lsimg": "\u2A8F", "lsqb": "[", "lsquo": "\u2018", "lsquor": "\u201A", "lstrok": "\u0142", "Lstrok": "\u0141", "lt": "<", "Lt": "\u226A", "LT": "<", "ltcc": "\u2AA6", "ltcir": "\u2A79", "ltdot": "\u22D6", "lthree": "\u22CB", "ltimes": "\u22C9", "ltlarr": "\u2976", "ltquest": "\u2A7B", "ltri": "\u25C3", "ltrie": "\u22B4", "ltrif": "\u25C2", "ltrPar": "\u2996", "lurdshar": "\u294A", "luruhar": "\u2966", "lvertneqq": "\u2268\uFE00", "lvnE": "\u2268\uFE00", "macr": "\xAF", "male": "\u2642", "malt": "\u2720", "maltese": "\u2720", "map": "\u21A6", "Map": "\u2905", "mapsto": "\u21A6", "mapstodown": "\u21A7", "mapstoleft": "\u21A4", "mapstoup": "\u21A5", "marker": "\u25AE", "mcomma": "\u2A29", "mcy": "\u043C", "Mcy": "\u041C", "mdash": "\u2014", "mDDot": "\u223A", "measuredangle": "\u2221", "MediumSpace": "\u205F", "Mellintrf": "\u2133", "mfr": "\u{1D52A}", "Mfr": "\u{1D510}", "mho": "\u2127", "micro": "\xB5", "mid": "\u2223", "midast": "*", "midcir": "\u2AF0", "middot": "\xB7", "minus": "\u2212", "minusb": "\u229F", "minusd": "\u2238", "minusdu": "\u2A2A", "MinusPlus": "\u2213", "mlcp": "\u2ADB", "mldr": "\u2026", "mnplus": "\u2213", "models": "\u22A7", "mopf": "\u{1D55E}", "Mopf": "\u{1D544}", "mp": "\u2213", "mscr": "\u{1D4C2}", "Mscr": "\u2133", "mstpos": "\u223E", "mu": "\u03BC", "Mu": "\u039C", "multimap": "\u22B8", "mumap": "\u22B8", "nabla": "\u2207", "nacute": "\u0144", "Nacute": "\u0143", "nang": "\u2220\u20D2", "nap": "\u2249", "napE": "\u2A70\u0338", "napid": "\u224B\u0338", "napos": "\u0149", "napprox": "\u2249", "natur": "\u266E", "natural": "\u266E", "naturals": "\u2115", "nbsp": "\xA0", "nbump": "\u224E\u0338", "nbumpe": "\u224F\u0338", "ncap": "\u2A43", "ncaron": "\u0148", "Ncaron": "\u0147", "ncedil": "\u0146", "Ncedil": "\u0145", "ncong": "\u2247", "ncongdot": "\u2A6D\u0338", "ncup": "\u2A42", "ncy": "\u043D", "Ncy": "\u041D", "ndash": "\u2013", "ne": "\u2260", "nearhk": "\u2924", "nearr": "\u2197", "neArr": "\u21D7", "nearrow": "\u2197", "nedot": "\u2250\u0338", "NegativeMediumSpace": "\u200B", "NegativeThickSpace": "\u200B", "NegativeThinSpace": "\u200B", "NegativeVeryThinSpace": "\u200B", "nequiv": "\u2262", "nesear": "\u2928", "nesim": "\u2242\u0338", "NestedGreaterGreater": "\u226B", "NestedLessLess": "\u226A", "NewLine": "\n", "nexist": "\u2204", "nexists": "\u2204", "nfr": "\u{1D52B}", "Nfr": "\u{1D511}", "nge": "\u2271", "ngE": "\u2267\u0338", "ngeq": "\u2271", "ngeqq": "\u2267\u0338", "ngeqslant": "\u2A7E\u0338", "nges": "\u2A7E\u0338", "nGg": "\u22D9\u0338", "ngsim": "\u2275", "ngt": "\u226F", "nGt": "\u226B\u20D2", "ngtr": "\u226F", "nGtv": "\u226B\u0338", "nharr": "\u21AE", "nhArr": "\u21CE", "nhpar": "\u2AF2", "ni": "\u220B", "nis": "\u22FC", "nisd": "\u22FA", "niv": "\u220B", "njcy": "\u045A", "NJcy": "\u040A", "nlarr": "\u219A", "nlArr": "\u21CD", "nldr": "\u2025", "nle": "\u2270", "nlE": "\u2266\u0338", "nleftarrow": "\u219A", "nLeftarrow": "\u21CD", "nleftrightarrow": "\u21AE", "nLeftrightarrow": "\u21CE", "nleq": "\u2270", "nleqq": "\u2266\u0338", "nleqslant": "\u2A7D\u0338", "nles": "\u2A7D\u0338", "nless": "\u226E", "nLl": "\u22D8\u0338", "nlsim": "\u2274", "nlt": "\u226E", "nLt": "\u226A\u20D2", "nltri": "\u22EA", "nltrie": "\u22EC", "nLtv": "\u226A\u0338", "nmid": "\u2224", "NoBreak": "\u2060", "NonBreakingSpace": "\xA0", "nopf": "\u{1D55F}", "Nopf": "\u2115", "not": "\xAC", "Not": "\u2AEC", "NotCongruent": "\u2262", "NotCupCap": "\u226D", "NotDoubleVerticalBar": "\u2226", "NotElement": "\u2209", "NotEqual": "\u2260", "NotEqualTilde": "\u2242\u0338", "NotExists": "\u2204", "NotGreater": "\u226F", "NotGreaterEqual": "\u2271", "NotGreaterFullEqual": "\u2267\u0338", "NotGreaterGreater": "\u226B\u0338", "NotGreaterLess": "\u2279", "NotGreaterSlantEqual": "\u2A7E\u0338", "NotGreaterTilde": "\u2275", "NotHumpDownHump": "\u224E\u0338", "NotHumpEqual": "\u224F\u0338", "notin": "\u2209", "notindot": "\u22F5\u0338", "notinE": "\u22F9\u0338", "notinva": "\u2209", "notinvb": "\u22F7", "notinvc": "\u22F6", "NotLeftTriangle": "\u22EA", "NotLeftTriangleBar": "\u29CF\u0338", "NotLeftTriangleEqual": "\u22EC", "NotLess": "\u226E", "NotLessEqual": "\u2270", "NotLessGreater": "\u2278", "NotLessLess": "\u226A\u0338", "NotLessSlantEqual": "\u2A7D\u0338", "NotLessTilde": "\u2274", "NotNestedGreaterGreater": "\u2AA2\u0338", "NotNestedLessLess": "\u2AA1\u0338", "notni": "\u220C", "notniva": "\u220C", "notnivb": "\u22FE", "notnivc": "\u22FD", "NotPrecedes": "\u2280", "NotPrecedesEqual": "\u2AAF\u0338", "NotPrecedesSlantEqual": "\u22E0", "NotReverseElement": "\u220C", "NotRightTriangle": "\u22EB", "NotRightTriangleBar": "\u29D0\u0338", "NotRightTriangleEqual": "\u22ED", "NotSquareSubset": "\u228F\u0338", "NotSquareSubsetEqual": "\u22E2", "NotSquareSuperset": "\u2290\u0338", "NotSquareSupersetEqual": "\u22E3", "NotSubset": "\u2282\u20D2", "NotSubsetEqual": "\u2288", "NotSucceeds": "\u2281", "NotSucceedsEqual": "\u2AB0\u0338", "NotSucceedsSlantEqual": "\u22E1", "NotSucceedsTilde": "\u227F\u0338", "NotSuperset": "\u2283\u20D2", "NotSupersetEqual": "\u2289", "NotTilde": "\u2241", "NotTildeEqual": "\u2244", "NotTildeFullEqual": "\u2247", "NotTildeTilde": "\u2249", "NotVerticalBar": "\u2224", "npar": "\u2226", "nparallel": "\u2226", "nparsl": "\u2AFD\u20E5", "npart": "\u2202\u0338", "npolint": "\u2A14", "npr": "\u2280", "nprcue": "\u22E0", "npre": "\u2AAF\u0338", "nprec": "\u2280", "npreceq": "\u2AAF\u0338", "nrarr": "\u219B", "nrArr": "\u21CF", "nrarrc": "\u2933\u0338", "nrarrw": "\u219D\u0338", "nrightarrow": "\u219B", "nRightarrow": "\u21CF", "nrtri": "\u22EB", "nrtrie": "\u22ED", "nsc": "\u2281", "nsccue": "\u22E1", "nsce": "\u2AB0\u0338", "nscr": "\u{1D4C3}", "Nscr": "\u{1D4A9}", "nshortmid": "\u2224", "nshortparallel": "\u2226", "nsim": "\u2241", "nsime": "\u2244", "nsimeq": "\u2244", "nsmid": "\u2224", "nspar": "\u2226", "nsqsube": "\u22E2", "nsqsupe": "\u22E3", "nsub": "\u2284", "nsube": "\u2288", "nsubE": "\u2AC5\u0338", "nsubset": "\u2282\u20D2", "nsubseteq": "\u2288", "nsubseteqq": "\u2AC5\u0338", "nsucc": "\u2281", "nsucceq": "\u2AB0\u0338", "nsup": "\u2285", "nsupe": "\u2289", "nsupE": "\u2AC6\u0338", "nsupset": "\u2283\u20D2", "nsupseteq": "\u2289", "nsupseteqq": "\u2AC6\u0338", "ntgl": "\u2279", "ntilde": "\xF1", "Ntilde": "\xD1", "ntlg": "\u2278", "ntriangleleft": "\u22EA", "ntrianglelefteq": "\u22EC", "ntriangleright": "\u22EB", "ntrianglerighteq": "\u22ED", "nu": "\u03BD", "Nu": "\u039D", "num": "#", "numero": "\u2116", "numsp": "\u2007", "nvap": "\u224D\u20D2", "nvdash": "\u22AC", "nvDash": "\u22AD", "nVdash": "\u22AE", "nVDash": "\u22AF", "nvge": "\u2265\u20D2", "nvgt": ">\u20D2", "nvHarr": "\u2904", "nvinfin": "\u29DE", "nvlArr": "\u2902", "nvle": "\u2264\u20D2", "nvlt": "<\u20D2", "nvltrie": "\u22B4\u20D2", "nvrArr": "\u2903", "nvrtrie": "\u22B5\u20D2", "nvsim": "\u223C\u20D2", "nwarhk": "\u2923", "nwarr": "\u2196", "nwArr": "\u21D6", "nwarrow": "\u2196", "nwnear": "\u2927", "oacute": "\xF3", "Oacute": "\xD3", "oast": "\u229B", "ocir": "\u229A", "ocirc": "\xF4", "Ocirc": "\xD4", "ocy": "\u043E", "Ocy": "\u041E", "odash": "\u229D", "odblac": "\u0151", "Odblac": "\u0150", "odiv": "\u2A38", "odot": "\u2299", "odsold": "\u29BC", "oelig": "\u0153", "OElig": "\u0152", "ofcir": "\u29BF", "ofr": "\u{1D52C}", "Ofr": "\u{1D512}", "ogon": "\u02DB", "ograve": "\xF2", "Ograve": "\xD2", "ogt": "\u29C1", "ohbar": "\u29B5", "ohm": "\u03A9", "oint": "\u222E", "olarr": "\u21BA", "olcir": "\u29BE", "olcross": "\u29BB", "oline": "\u203E", "olt": "\u29C0", "omacr": "\u014D", "Omacr": "\u014C", "omega": "\u03C9", "Omega": "\u03A9", "omicron": "\u03BF", "Omicron": "\u039F", "omid": "\u29B6", "ominus": "\u2296", "oopf": "\u{1D560}", "Oopf": "\u{1D546}", "opar": "\u29B7", "OpenCurlyDoubleQuote": "\u201C", "OpenCurlyQuote": "\u2018", "operp": "\u29B9", "oplus": "\u2295", "or": "\u2228", "Or": "\u2A54", "orarr": "\u21BB", "ord": "\u2A5D", "order": "\u2134", "orderof": "\u2134", "ordf": "\xAA", "ordm": "\xBA", "origof": "\u22B6", "oror": "\u2A56", "orslope": "\u2A57", "orv": "\u2A5B", "oS": "\u24C8", "oscr": "\u2134", "Oscr": "\u{1D4AA}", "oslash": "\xF8", "Oslash": "\xD8", "osol": "\u2298", "otilde": "\xF5", "Otilde": "\xD5", "otimes": "\u2297", "Otimes": "\u2A37", "otimesas": "\u2A36", "ouml": "\xF6", "Ouml": "\xD6", "ovbar": "\u233D", "OverBar": "\u203E", "OverBrace": "\u23DE", "OverBracket": "\u23B4", "OverParenthesis": "\u23DC", "par": "\u2225", "para": "\xB6", "parallel": "\u2225", "parsim": "\u2AF3", "parsl": "\u2AFD", "part": "\u2202", "PartialD": "\u2202", "pcy": "\u043F", "Pcy": "\u041F", "percnt": "%", "period": ".", "permil": "\u2030", "perp": "\u22A5", "pertenk": "\u2031", "pfr": "\u{1D52D}", "Pfr": "\u{1D513}", "phi": "\u03C6", "Phi": "\u03A6", "phiv": "\u03D5", "phmmat": "\u2133", "phone": "\u260E", "pi": "\u03C0", "Pi": "\u03A0", "pitchfork": "\u22D4", "piv": "\u03D6", "planck": "\u210F", "planckh": "\u210E", "plankv": "\u210F", "plus": "+", "plusacir": "\u2A23", "plusb": "\u229E", "pluscir": "\u2A22", "plusdo": "\u2214", "plusdu": "\u2A25", "pluse": "\u2A72", "PlusMinus": "\xB1", "plusmn": "\xB1", "plussim": "\u2A26", "plustwo": "\u2A27", "pm": "\xB1", "Poincareplane": "\u210C", "pointint": "\u2A15", "popf": "\u{1D561}", "Popf": "\u2119", "pound": "\xA3", "pr": "\u227A", "Pr": "\u2ABB", "prap": "\u2AB7", "prcue": "\u227C", "pre": "\u2AAF", "prE": "\u2AB3", "prec": "\u227A", "precapprox": "\u2AB7", "preccurlyeq": "\u227C", "Precedes": "\u227A", "PrecedesEqual": "\u2AAF", "PrecedesSlantEqual": "\u227C", "PrecedesTilde": "\u227E", "preceq": "\u2AAF", "precnapprox": "\u2AB9", "precneqq": "\u2AB5", "precnsim": "\u22E8", "precsim": "\u227E", "prime": "\u2032", "Prime": "\u2033", "primes": "\u2119", "prnap": "\u2AB9", "prnE": "\u2AB5", "prnsim": "\u22E8", "prod": "\u220F", "Product": "\u220F", "profalar": "\u232E", "profline": "\u2312", "profsurf": "\u2313", "prop": "\u221D", "Proportion": "\u2237", "Proportional": "\u221D", "propto": "\u221D", "prsim": "\u227E", "prurel": "\u22B0", "pscr": "\u{1D4C5}", "Pscr": "\u{1D4AB}", "psi": "\u03C8", "Psi": "\u03A8", "puncsp": "\u2008", "qfr": "\u{1D52E}", "Qfr": "\u{1D514}", "qint": "\u2A0C", "qopf": "\u{1D562}", "Qopf": "\u211A", "qprime": "\u2057", "qscr": "\u{1D4C6}", "Qscr": "\u{1D4AC}", "quaternions": "\u210D", "quatint": "\u2A16", "quest": "?", "questeq": "\u225F", "quot": '"', "QUOT": '"', "rAarr": "\u21DB", "race": "\u223D\u0331", "racute": "\u0155", "Racute": "\u0154", "radic": "\u221A", "raemptyv": "\u29B3", "rang": "\u27E9", "Rang": "\u27EB", "rangd": "\u2992", "range": "\u29A5", "rangle": "\u27E9", "raquo": "\xBB", "rarr": "\u2192", "rArr": "\u21D2", "Rarr": "\u21A0", "rarrap": "\u2975", "rarrb": "\u21E5", "rarrbfs": "\u2920", "rarrc": "\u2933", "rarrfs": "\u291E", "rarrhk": "\u21AA", "rarrlp": "\u21AC", "rarrpl": "\u2945", "rarrsim": "\u2974", "rarrtl": "\u21A3", "Rarrtl": "\u2916", "rarrw": "\u219D", "ratail": "\u291A", "rAtail": "\u291C", "ratio": "\u2236", "rationals": "\u211A", "rbarr": "\u290D", "rBarr": "\u290F", "RBarr": "\u2910", "rbbrk": "\u2773", "rbrace": "}", "rbrack": "]", "rbrke": "\u298C", "rbrksld": "\u298E", "rbrkslu": "\u2990", "rcaron": "\u0159", "Rcaron": "\u0158", "rcedil": "\u0157", "Rcedil": "\u0156", "rceil": "\u2309", "rcub": "}", "rcy": "\u0440", "Rcy": "\u0420", "rdca": "\u2937", "rdldhar": "\u2969", "rdquo": "\u201D", "rdquor": "\u201D", "rdsh": "\u21B3", "Re": "\u211C", "real": "\u211C", "realine": "\u211B", "realpart": "\u211C", "reals": "\u211D", "rect": "\u25AD", "reg": "\xAE", "REG": "\xAE", "ReverseElement": "\u220B", "ReverseEquilibrium": "\u21CB", "ReverseUpEquilibrium": "\u296F", "rfisht": "\u297D", "rfloor": "\u230B", "rfr": "\u{1D52F}", "Rfr": "\u211C", "rHar": "\u2964", "rhard": "\u21C1", "rharu": "\u21C0", "rharul": "\u296C", "rho": "\u03C1", "Rho": "\u03A1", "rhov": "\u03F1", "RightAngleBracket": "\u27E9", "rightarrow": "\u2192", "Rightarrow": "\u21D2", "RightArrow": "\u2192", "RightArrowBar": "\u21E5", "RightArrowLeftArrow": "\u21C4", "rightarrowtail": "\u21A3", "RightCeiling": "\u2309", "RightDoubleBracket": "\u27E7", "RightDownTeeVector": "\u295D", "RightDownVector": "\u21C2", "RightDownVectorBar": "\u2955", "RightFloor": "\u230B", "rightharpoondown": "\u21C1", "rightharpoonup": "\u21C0", "rightleftarrows": "\u21C4", "rightleftharpoons": "\u21CC", "rightrightarrows": "\u21C9", "rightsquigarrow": "\u219D", "RightTee": "\u22A2", "RightTeeArrow": "\u21A6", "RightTeeVector": "\u295B", "rightthreetimes": "\u22CC", "RightTriangle": "\u22B3", "RightTriangleBar": "\u29D0", "RightTriangleEqual": "\u22B5", "RightUpDownVector": "\u294F", "RightUpTeeVector": "\u295C", "RightUpVector": "\u21BE", "RightUpVectorBar": "\u2954", "RightVector": "\u21C0", "RightVectorBar": "\u2953", "ring": "\u02DA", "risingdotseq": "\u2253", "rlarr": "\u21C4", "rlhar": "\u21CC", "rlm": "\u200F", "rmoust": "\u23B1", "rmoustache": "\u23B1", "rnmid": "\u2AEE", "roang": "\u27ED", "roarr": "\u21FE", "robrk": "\u27E7", "ropar": "\u2986", "ropf": "\u{1D563}", "Ropf": "\u211D", "roplus": "\u2A2E", "rotimes": "\u2A35", "RoundImplies": "\u2970", "rpar": ")", "rpargt": "\u2994", "rppolint": "\u2A12", "rrarr": "\u21C9", "Rrightarrow": "\u21DB", "rsaquo": "\u203A", "rscr": "\u{1D4C7}", "Rscr": "\u211B", "rsh": "\u21B1", "Rsh": "\u21B1", "rsqb": "]", "rsquo": "\u2019", "rsquor": "\u2019", "rthree": "\u22CC", "rtimes": "\u22CA", "rtri": "\u25B9", "rtrie": "\u22B5", "rtrif": "\u25B8", "rtriltri": "\u29CE", "RuleDelayed": "\u29F4", "ruluhar": "\u2968", "rx": "\u211E", "sacute": "\u015B", "Sacute": "\u015A", "sbquo": "\u201A", "sc": "\u227B", "Sc": "\u2ABC", "scap": "\u2AB8", "scaron": "\u0161", "Scaron": "\u0160", "sccue": "\u227D", "sce": "\u2AB0", "scE": "\u2AB4", "scedil": "\u015F", "Scedil": "\u015E", "scirc": "\u015D", "Scirc": "\u015C", "scnap": "\u2ABA", "scnE": "\u2AB6", "scnsim": "\u22E9", "scpolint": "\u2A13", "scsim": "\u227F", "scy": "\u0441", "Scy": "\u0421", "sdot": "\u22C5", "sdotb": "\u22A1", "sdote": "\u2A66", "searhk": "\u2925", "searr": "\u2198", "seArr": "\u21D8", "searrow": "\u2198", "sect": "\xA7", "semi": ";", "seswar": "\u2929", "setminus": "\u2216", "setmn": "\u2216", "sext": "\u2736", "sfr": "\u{1D530}", "Sfr": "\u{1D516}", "sfrown": "\u2322", "sharp": "\u266F", "shchcy": "\u0449", "SHCHcy": "\u0429", "shcy": "\u0448", "SHcy": "\u0428", "ShortDownArrow": "\u2193", "ShortLeftArrow": "\u2190", "shortmid": "\u2223", "shortparallel": "\u2225", "ShortRightArrow": "\u2192", "ShortUpArrow": "\u2191", "shy": "\xAD", "sigma": "\u03C3", "Sigma": "\u03A3", "sigmaf": "\u03C2", "sigmav": "\u03C2", "sim": "\u223C", "simdot": "\u2A6A", "sime": "\u2243", "simeq": "\u2243", "simg": "\u2A9E", "simgE": "\u2AA0", "siml": "\u2A9D", "simlE": "\u2A9F", "simne": "\u2246", "simplus": "\u2A24", "simrarr": "\u2972", "slarr": "\u2190", "SmallCircle": "\u2218", "smallsetminus": "\u2216", "smashp": "\u2A33", "smeparsl": "\u29E4", "smid": "\u2223", "smile": "\u2323", "smt": "\u2AAA", "smte": "\u2AAC", "smtes": "\u2AAC\uFE00", "softcy": "\u044C", "SOFTcy": "\u042C", "sol": "/", "solb": "\u29C4", "solbar": "\u233F", "sopf": "\u{1D564}", "Sopf": "\u{1D54A}", "spades": "\u2660", "spadesuit": "\u2660", "spar": "\u2225", "sqcap": "\u2293", "sqcaps": "\u2293\uFE00", "sqcup": "\u2294", "sqcups": "\u2294\uFE00", "Sqrt": "\u221A", "sqsub": "\u228F", "sqsube": "\u2291", "sqsubset": "\u228F", "sqsubseteq": "\u2291", "sqsup": "\u2290", "sqsupe": "\u2292", "sqsupset": "\u2290", "sqsupseteq": "\u2292", "squ": "\u25A1", "square": "\u25A1", "Square": "\u25A1", "SquareIntersection": "\u2293", "SquareSubset": "\u228F", "SquareSubsetEqual": "\u2291", "SquareSuperset": "\u2290", "SquareSupersetEqual": "\u2292", "SquareUnion": "\u2294", "squarf": "\u25AA", "squf": "\u25AA", "srarr": "\u2192", "sscr": "\u{1D4C8}", "Sscr": "\u{1D4AE}", "ssetmn": "\u2216", "ssmile": "\u2323", "sstarf": "\u22C6", "star": "\u2606", "Star": "\u22C6", "starf": "\u2605", "straightepsilon": "\u03F5", "straightphi": "\u03D5", "strns": "\xAF", "sub": "\u2282", "Sub": "\u22D0", "subdot": "\u2ABD", "sube": "\u2286", "subE": "\u2AC5", "subedot": "\u2AC3", "submult": "\u2AC1", "subne": "\u228A", "subnE": "\u2ACB", "subplus": "\u2ABF", "subrarr": "\u2979", "subset": "\u2282", "Subset": "\u22D0", "subseteq": "\u2286", "subseteqq": "\u2AC5", "SubsetEqual": "\u2286", "subsetneq": "\u228A", "subsetneqq": "\u2ACB", "subsim": "\u2AC7", "subsub": "\u2AD5", "subsup": "\u2AD3", "succ": "\u227B", "succapprox": "\u2AB8", "succcurlyeq": "\u227D", "Succeeds": "\u227B", "SucceedsEqual": "\u2AB0", "SucceedsSlantEqual": "\u227D", "SucceedsTilde": "\u227F", "succeq": "\u2AB0", "succnapprox": "\u2ABA", "succneqq": "\u2AB6", "succnsim": "\u22E9", "succsim": "\u227F", "SuchThat": "\u220B", "sum": "\u2211", "Sum": "\u2211", "sung": "\u266A", "sup": "\u2283", "Sup": "\u22D1", "sup1": "\xB9", "sup2": "\xB2", "sup3": "\xB3", "supdot": "\u2ABE", "supdsub": "\u2AD8", "supe": "\u2287", "supE": "\u2AC6", "supedot": "\u2AC4", "Superset": "\u2283", "SupersetEqual": "\u2287", "suphsol": "\u27C9", "suphsub": "\u2AD7", "suplarr": "\u297B", "supmult": "\u2AC2", "supne": "\u228B", "supnE": "\u2ACC", "supplus": "\u2AC0", "supset": "\u2283", "Supset": "\u22D1", "supseteq": "\u2287", "supseteqq": "\u2AC6", "supsetneq": "\u228B", "supsetneqq": "\u2ACC", "supsim": "\u2AC8", "supsub": "\u2AD4", "supsup": "\u2AD6", "swarhk": "\u2926", "swarr": "\u2199", "swArr": "\u21D9", "swarrow": "\u2199", "swnwar": "\u292A", "szlig": "\xDF", "Tab": "	", "target": "\u2316", "tau": "\u03C4", "Tau": "\u03A4", "tbrk": "\u23B4", "tcaron": "\u0165", "Tcaron": "\u0164", "tcedil": "\u0163", "Tcedil": "\u0162", "tcy": "\u0442", "Tcy": "\u0422", "tdot": "\u20DB", "telrec": "\u2315", "tfr": "\u{1D531}", "Tfr": "\u{1D517}", "there4": "\u2234", "therefore": "\u2234", "Therefore": "\u2234", "theta": "\u03B8", "Theta": "\u0398", "thetasym": "\u03D1", "thetav": "\u03D1", "thickapprox": "\u2248", "thicksim": "\u223C", "ThickSpace": "\u205F\u200A", "thinsp": "\u2009", "ThinSpace": "\u2009", "thkap": "\u2248", "thksim": "\u223C", "thorn": "\xFE", "THORN": "\xDE", "tilde": "\u02DC", "Tilde": "\u223C", "TildeEqual": "\u2243", "TildeFullEqual": "\u2245", "TildeTilde": "\u2248", "times": "\xD7", "timesb": "\u22A0", "timesbar": "\u2A31", "timesd": "\u2A30", "tint": "\u222D", "toea": "\u2928", "top": "\u22A4", "topbot": "\u2336", "topcir": "\u2AF1", "topf": "\u{1D565}", "Topf": "\u{1D54B}", "topfork": "\u2ADA", "tosa": "\u2929", "tprime": "\u2034", "trade": "\u2122", "TRADE": "\u2122", "triangle": "\u25B5", "triangledown": "\u25BF", "triangleleft": "\u25C3", "trianglelefteq": "\u22B4", "triangleq": "\u225C", "triangleright": "\u25B9", "trianglerighteq": "\u22B5", "tridot": "\u25EC", "trie": "\u225C", "triminus": "\u2A3A", "TripleDot": "\u20DB", "triplus": "\u2A39", "trisb": "\u29CD", "tritime": "\u2A3B", "trpezium": "\u23E2", "tscr": "\u{1D4C9}", "Tscr": "\u{1D4AF}", "tscy": "\u0446", "TScy": "\u0426", "tshcy": "\u045B", "TSHcy": "\u040B", "tstrok": "\u0167", "Tstrok": "\u0166", "twixt": "\u226C", "twoheadleftarrow": "\u219E", "twoheadrightarrow": "\u21A0", "uacute": "\xFA", "Uacute": "\xDA", "uarr": "\u2191", "uArr": "\u21D1", "Uarr": "\u219F", "Uarrocir": "\u2949", "ubrcy": "\u045E", "Ubrcy": "\u040E", "ubreve": "\u016D", "Ubreve": "\u016C", "ucirc": "\xFB", "Ucirc": "\xDB", "ucy": "\u0443", "Ucy": "\u0423", "udarr": "\u21C5", "udblac": "\u0171", "Udblac": "\u0170", "udhar": "\u296E", "ufisht": "\u297E", "ufr": "\u{1D532}", "Ufr": "\u{1D518}", "ugrave": "\xF9", "Ugrave": "\xD9", "uHar": "\u2963", "uharl": "\u21BF", "uharr": "\u21BE", "uhblk": "\u2580", "ulcorn": "\u231C", "ulcorner": "\u231C", "ulcrop": "\u230F", "ultri": "\u25F8", "umacr": "\u016B", "Umacr": "\u016A", "uml": "\xA8", "UnderBar": "_", "UnderBrace": "\u23DF", "UnderBracket": "\u23B5", "UnderParenthesis": "\u23DD", "Union": "\u22C3", "UnionPlus": "\u228E", "uogon": "\u0173", "Uogon": "\u0172", "uopf": "\u{1D566}", "Uopf": "\u{1D54C}", "uparrow": "\u2191", "Uparrow": "\u21D1", "UpArrow": "\u2191", "UpArrowBar": "\u2912", "UpArrowDownArrow": "\u21C5", "updownarrow": "\u2195", "Updownarrow": "\u21D5", "UpDownArrow": "\u2195", "UpEquilibrium": "\u296E", "upharpoonleft": "\u21BF", "upharpoonright": "\u21BE", "uplus": "\u228E", "UpperLeftArrow": "\u2196", "UpperRightArrow": "\u2197", "upsi": "\u03C5", "Upsi": "\u03D2", "upsih": "\u03D2", "upsilon": "\u03C5", "Upsilon": "\u03A5", "UpTee": "\u22A5", "UpTeeArrow": "\u21A5", "upuparrows": "\u21C8", "urcorn": "\u231D", "urcorner": "\u231D", "urcrop": "\u230E", "uring": "\u016F", "Uring": "\u016E", "urtri": "\u25F9", "uscr": "\u{1D4CA}", "Uscr": "\u{1D4B0}", "utdot": "\u22F0", "utilde": "\u0169", "Utilde": "\u0168", "utri": "\u25B5", "utrif": "\u25B4", "uuarr": "\u21C8", "uuml": "\xFC", "Uuml": "\xDC", "uwangle": "\u29A7", "vangrt": "\u299C", "varepsilon": "\u03F5", "varkappa": "\u03F0", "varnothing": "\u2205", "varphi": "\u03D5", "varpi": "\u03D6", "varpropto": "\u221D", "varr": "\u2195", "vArr": "\u21D5", "varrho": "\u03F1", "varsigma": "\u03C2", "varsubsetneq": "\u228A\uFE00", "varsubsetneqq": "\u2ACB\uFE00", "varsupsetneq": "\u228B\uFE00", "varsupsetneqq": "\u2ACC\uFE00", "vartheta": "\u03D1", "vartriangleleft": "\u22B2", "vartriangleright": "\u22B3", "vBar": "\u2AE8", "Vbar": "\u2AEB", "vBarv": "\u2AE9", "vcy": "\u0432", "Vcy": "\u0412", "vdash": "\u22A2", "vDash": "\u22A8", "Vdash": "\u22A9", "VDash": "\u22AB", "Vdashl": "\u2AE6", "vee": "\u2228", "Vee": "\u22C1", "veebar": "\u22BB", "veeeq": "\u225A", "vellip": "\u22EE", "verbar": "|", "Verbar": "\u2016", "vert": "|", "Vert": "\u2016", "VerticalBar": "\u2223", "VerticalLine": "|", "VerticalSeparator": "\u2758", "VerticalTilde": "\u2240", "VeryThinSpace": "\u200A", "vfr": "\u{1D533}", "Vfr": "\u{1D519}", "vltri": "\u22B2", "vnsub": "\u2282\u20D2", "vnsup": "\u2283\u20D2", "vopf": "\u{1D567}", "Vopf": "\u{1D54D}", "vprop": "\u221D", "vrtri": "\u22B3", "vscr": "\u{1D4CB}", "Vscr": "\u{1D4B1}", "vsubne": "\u228A\uFE00", "vsubnE": "\u2ACB\uFE00", "vsupne": "\u228B\uFE00", "vsupnE": "\u2ACC\uFE00", "Vvdash": "\u22AA", "vzigzag": "\u299A", "wcirc": "\u0175", "Wcirc": "\u0174", "wedbar": "\u2A5F", "wedge": "\u2227", "Wedge": "\u22C0", "wedgeq": "\u2259", "weierp": "\u2118", "wfr": "\u{1D534}", "Wfr": "\u{1D51A}", "wopf": "\u{1D568}", "Wopf": "\u{1D54E}", "wp": "\u2118", "wr": "\u2240", "wreath": "\u2240", "wscr": "\u{1D4CC}", "Wscr": "\u{1D4B2}", "xcap": "\u22C2", "xcirc": "\u25EF", "xcup": "\u22C3", "xdtri": "\u25BD", "xfr": "\u{1D535}", "Xfr": "\u{1D51B}", "xharr": "\u27F7", "xhArr": "\u27FA", "xi": "\u03BE", "Xi": "\u039E", "xlarr": "\u27F5", "xlArr": "\u27F8", "xmap": "\u27FC", "xnis": "\u22FB", "xodot": "\u2A00", "xopf": "\u{1D569}", "Xopf": "\u{1D54F}", "xoplus": "\u2A01", "xotime": "\u2A02", "xrarr": "\u27F6", "xrArr": "\u27F9", "xscr": "\u{1D4CD}", "Xscr": "\u{1D4B3}", "xsqcup": "\u2A06", "xuplus": "\u2A04", "xutri": "\u25B3", "xvee": "\u22C1", "xwedge": "\u22C0", "yacute": "\xFD", "Yacute": "\xDD", "yacy": "\u044F", "YAcy": "\u042F", "ycirc": "\u0177", "Ycirc": "\u0176", "ycy": "\u044B", "Ycy": "\u042B", "yen": "\xA5", "yfr": "\u{1D536}", "Yfr": "\u{1D51C}", "yicy": "\u0457", "YIcy": "\u0407", "yopf": "\u{1D56A}", "Yopf": "\u{1D550}", "yscr": "\u{1D4CE}", "Yscr": "\u{1D4B4}", "yucy": "\u044E", "YUcy": "\u042E", "yuml": "\xFF", "Yuml": "\u0178", "zacute": "\u017A", "Zacute": "\u0179", "zcaron": "\u017E", "Zcaron": "\u017D", "zcy": "\u0437", "Zcy": "\u0417", "zdot": "\u017C", "Zdot": "\u017B", "zeetrf": "\u2128", "ZeroWidthSpace": "\u200B", "zeta": "\u03B6", "Zeta": "\u0396", "zfr": "\u{1D537}", "Zfr": "\u2128", "zhcy": "\u0436", "ZHcy": "\u0416", "zigrarr": "\u21DD", "zopf": "\u{1D56B}", "Zopf": "\u2124", "zscr": "\u{1D4CF}", "Zscr": "\u{1D4B5}", "zwj": "\u200D", "zwnj": "\u200C" };
          var decodeMapLegacy = { "aacute": "\xE1", "Aacute": "\xC1", "acirc": "\xE2", "Acirc": "\xC2", "acute": "\xB4", "aelig": "\xE6", "AElig": "\xC6", "agrave": "\xE0", "Agrave": "\xC0", "amp": "&", "AMP": "&", "aring": "\xE5", "Aring": "\xC5", "atilde": "\xE3", "Atilde": "\xC3", "auml": "\xE4", "Auml": "\xC4", "brvbar": "\xA6", "ccedil": "\xE7", "Ccedil": "\xC7", "cedil": "\xB8", "cent": "\xA2", "copy": "\xA9", "COPY": "\xA9", "curren": "\xA4", "deg": "\xB0", "divide": "\xF7", "eacute": "\xE9", "Eacute": "\xC9", "ecirc": "\xEA", "Ecirc": "\xCA", "egrave": "\xE8", "Egrave": "\xC8", "eth": "\xF0", "ETH": "\xD0", "euml": "\xEB", "Euml": "\xCB", "frac12": "\xBD", "frac14": "\xBC", "frac34": "\xBE", "gt": ">", "GT": ">", "iacute": "\xED", "Iacute": "\xCD", "icirc": "\xEE", "Icirc": "\xCE", "iexcl": "\xA1", "igrave": "\xEC", "Igrave": "\xCC", "iquest": "\xBF", "iuml": "\xEF", "Iuml": "\xCF", "laquo": "\xAB", "lt": "<", "LT": "<", "macr": "\xAF", "micro": "\xB5", "middot": "\xB7", "nbsp": "\xA0", "not": "\xAC", "ntilde": "\xF1", "Ntilde": "\xD1", "oacute": "\xF3", "Oacute": "\xD3", "ocirc": "\xF4", "Ocirc": "\xD4", "ograve": "\xF2", "Ograve": "\xD2", "ordf": "\xAA", "ordm": "\xBA", "oslash": "\xF8", "Oslash": "\xD8", "otilde": "\xF5", "Otilde": "\xD5", "ouml": "\xF6", "Ouml": "\xD6", "para": "\xB6", "plusmn": "\xB1", "pound": "\xA3", "quot": '"', "QUOT": '"', "raquo": "\xBB", "reg": "\xAE", "REG": "\xAE", "sect": "\xA7", "shy": "\xAD", "sup1": "\xB9", "sup2": "\xB2", "sup3": "\xB3", "szlig": "\xDF", "thorn": "\xFE", "THORN": "\xDE", "times": "\xD7", "uacute": "\xFA", "Uacute": "\xDA", "ucirc": "\xFB", "Ucirc": "\xDB", "ugrave": "\xF9", "Ugrave": "\xD9", "uml": "\xA8", "uuml": "\xFC", "Uuml": "\xDC", "yacute": "\xFD", "Yacute": "\xDD", "yen": "\xA5", "yuml": "\xFF" };
          var decodeMapNumeric = { "0": "\uFFFD", "128": "\u20AC", "130": "\u201A", "131": "\u0192", "132": "\u201E", "133": "\u2026", "134": "\u2020", "135": "\u2021", "136": "\u02C6", "137": "\u2030", "138": "\u0160", "139": "\u2039", "140": "\u0152", "142": "\u017D", "145": "\u2018", "146": "\u2019", "147": "\u201C", "148": "\u201D", "149": "\u2022", "150": "\u2013", "151": "\u2014", "152": "\u02DC", "153": "\u2122", "154": "\u0161", "155": "\u203A", "156": "\u0153", "158": "\u017E", "159": "\u0178" };
          var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
          var stringFromCharCode = String.fromCharCode;
          var object = {};
          var hasOwnProperty2 = object.hasOwnProperty;
          var has = function(object2, propertyName) {
            return hasOwnProperty2.call(object2, propertyName);
          };
          var contains = function(array2, value) {
            var index = -1;
            var length = array2.length;
            while (++index < length) {
              if (array2[index] == value) {
                return true;
              }
            }
            return false;
          };
          var merge2 = function(options, defaults) {
            if (!options) {
              return defaults;
            }
            var result = {};
            var key2;
            for (key2 in defaults) {
              result[key2] = has(options, key2) ? options[key2] : defaults[key2];
            }
            return result;
          };
          var codePointToSymbol = function(codePoint, strict) {
            var output = "";
            if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
              if (strict) {
                parseError("character reference outside the permissible Unicode range");
              }
              return "\uFFFD";
            }
            if (has(decodeMapNumeric, codePoint)) {
              if (strict) {
                parseError("disallowed character reference");
              }
              return decodeMapNumeric[codePoint];
            }
            if (strict && contains(invalidReferenceCodePoints, codePoint)) {
              parseError("disallowed character reference");
            }
            if (codePoint > 65535) {
              codePoint -= 65536;
              output += stringFromCharCode(codePoint >>> 10 & 1023 | 55296);
              codePoint = 56320 | codePoint & 1023;
            }
            output += stringFromCharCode(codePoint);
            return output;
          };
          var hexEscape = function(codePoint) {
            return "&#x" + codePoint.toString(16).toUpperCase() + ";";
          };
          var decEscape = function(codePoint) {
            return "&#" + codePoint + ";";
          };
          var parseError = function(message) {
            throw Error("Parse error: " + message);
          };
          var encode = function(string, options) {
            options = merge2(options, encode.options);
            var strict = options.strict;
            if (strict && regexInvalidRawCodePoint.test(string)) {
              parseError("forbidden code point");
            }
            var encodeEverything = options.encodeEverything;
            var useNamedReferences = options.useNamedReferences;
            var allowUnsafeSymbols = options.allowUnsafeSymbols;
            var escapeCodePoint = options.decimal ? decEscape : hexEscape;
            var escapeBmpSymbol = function(symbol) {
              return escapeCodePoint(symbol.charCodeAt(0));
            };
            if (encodeEverything) {
              string = string.replace(regexAsciiWhitelist, function(symbol) {
                if (useNamedReferences && has(encodeMap, symbol)) {
                  return "&" + encodeMap[symbol] + ";";
                }
                return escapeBmpSymbol(symbol);
              });
              if (useNamedReferences) {
                string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
              }
              if (useNamedReferences) {
                string = string.replace(regexEncodeNonAscii, function(string2) {
                  return "&" + encodeMap[string2] + ";";
                });
              }
            } else if (useNamedReferences) {
              if (!allowUnsafeSymbols) {
                string = string.replace(regexEscape, function(string2) {
                  return "&" + encodeMap[string2] + ";";
                });
              }
              string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
              string = string.replace(regexEncodeNonAscii, function(string2) {
                return "&" + encodeMap[string2] + ";";
              });
            } else if (!allowUnsafeSymbols) {
              string = string.replace(regexEscape, escapeBmpSymbol);
            }
            return string.replace(regexAstralSymbols, function($0) {
              var high = $0.charCodeAt(0);
              var low = $0.charCodeAt(1);
              var codePoint = (high - 55296) * 1024 + low - 56320 + 65536;
              return escapeCodePoint(codePoint);
            }).replace(regexBmpWhitelist, escapeBmpSymbol);
          };
          encode.options = {
            "allowUnsafeSymbols": false,
            "encodeEverything": false,
            "strict": false,
            "useNamedReferences": false,
            "decimal": false
          };
          var decode = function(html2, options) {
            options = merge2(options, decode.options);
            var strict = options.strict;
            if (strict && regexInvalidEntity.test(html2)) {
              parseError("malformed character reference");
            }
            return html2.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
              var codePoint;
              var semicolon;
              var decDigits;
              var hexDigits;
              var reference;
              var next;
              if ($1) {
                reference = $1;
                return decodeMap[reference];
              }
              if ($2) {
                reference = $2;
                next = $3;
                if (next && options.isAttributeValue) {
                  if (strict && next == "=") {
                    parseError("`&` did not start a character reference");
                  }
                  return $0;
                } else {
                  if (strict) {
                    parseError(
                      "named character reference was not terminated by a semicolon"
                    );
                  }
                  return decodeMapLegacy[reference] + (next || "");
                }
              }
              if ($4) {
                decDigits = $4;
                semicolon = $5;
                if (strict && !semicolon) {
                  parseError("character reference was not terminated by a semicolon");
                }
                codePoint = parseInt(decDigits, 10);
                return codePointToSymbol(codePoint, strict);
              }
              if ($6) {
                hexDigits = $6;
                semicolon = $7;
                if (strict && !semicolon) {
                  parseError("character reference was not terminated by a semicolon");
                }
                codePoint = parseInt(hexDigits, 16);
                return codePointToSymbol(codePoint, strict);
              }
              if (strict) {
                parseError(
                  "named character reference was not terminated by a semicolon"
                );
              }
              return $0;
            });
          };
          decode.options = {
            "isAttributeValue": false,
            "strict": false
          };
          var escape = function(string) {
            return string.replace(regexEscape, function($0) {
              return escapeMap[$0];
            });
          };
          var he2 = {
            "version": "1.2.0",
            "encode": encode,
            "decode": decode,
            "escape": escape,
            "unescape": decode
          };
          if (freeExports && !freeExports.nodeType) {
            if (freeModule) {
              freeModule.exports = he2;
            } else {
              for (var key in he2) {
                has(he2, key) && (freeExports[key] = he2[key]);
              }
            }
          } else {
            root.he = he2;
          }
        })(commonjsGlobal);
      })(he, he.exports);
      (function(exports2) {
        var path = require$$1;
        var util = require$$0$1;
        var he$1 = he.exports;
        const MOCHA_ID_PROP_NAME2 = "__mocha_id__";
        exports2.inherits = util.inherits;
        exports2.escape = function(html2) {
          return he$1.encode(String(html2), { useNamedReferences: false });
        };
        exports2.isString = function(obj) {
          return typeof obj === "string";
        };
        exports2.slug = function(str) {
          return str.toLowerCase().replace(/\s+/g, "-").replace(/[^-\w]/g, "").replace(/-{2,}/g, "-");
        };
        exports2.clean = function(str) {
          str = str.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, "").replace(
            /^function(?:\s*|\s[^(]*)\([^)]*\)\s*\{((?:.|\n)*?)\}$|^\([^)]*\)\s*=>\s*(?:\{((?:.|\n)*?)\}|((?:.|\n)*))$/,
            "$1$2$3"
          );
          var spaces = str.match(/^\n?( *)/)[1].length;
          var tabs = str.match(/^\n?(\t*)/)[1].length;
          var re = new RegExp(
            "^\n?" + (tabs ? "	" : " ") + "{" + (tabs || spaces) + "}",
            "gm"
          );
          str = str.replace(re, "");
          return str.trim();
        };
        function emptyRepresentation(value, typeHint) {
          switch (typeHint) {
            case "function":
              return "[Function]";
            case "object":
              return "{}";
            case "array":
              return "[]";
            default:
              return value.toString();
          }
        }
        var canonicalType = exports2.canonicalType = function canonicalType2(value) {
          if (value === void 0) {
            return "undefined";
          } else if (value === null) {
            return "null";
          } else if (isBuffer2(value)) {
            return "buffer";
          } else if (Object.getPrototypeOf(value) === null) {
            return "null-prototype";
          }
          return Object.prototype.toString.call(value).replace(/^\[.+\s(.+?)]$/, "$1").toLowerCase();
        };
        exports2.type = function type(value) {
          if (value === null) return "null";
          const primitives = /* @__PURE__ */ new Set([
            "undefined",
            "boolean",
            "number",
            "string",
            "bigint",
            "symbol"
          ]);
          const _type = typeof value;
          if (_type === "function") return _type;
          if (primitives.has(_type)) return _type;
          if (value instanceof String) return "string";
          if (value instanceof Error) return "error";
          if (Array.isArray(value)) return "array";
          return _type;
        };
        exports2.stringify = function(value) {
          var typeHint = canonicalType(value);
          if (!~["object", "array", "function", "null-prototype"].indexOf(typeHint)) {
            if (typeHint === "buffer") {
              var json2 = Buffer3.prototype.toJSON.call(value);
              return jsonStringify(
                json2.data && json2.type ? json2.data : json2,
                2
              ).replace(/,(\n|$)/g, "$1");
            }
            if (typeHint === "string" && typeof value === "object") {
              value = value.split("").reduce(function(acc, char, idx) {
                acc[idx] = char;
                return acc;
              }, {});
              typeHint = "object";
            } else {
              return jsonStringify(value);
            }
          }
          for (var prop in value) {
            if (Object.prototype.hasOwnProperty.call(value, prop)) {
              return jsonStringify(
                exports2.canonicalize(value, null, typeHint),
                2
              ).replace(/,(\n|$)/g, "$1");
            }
          }
          return emptyRepresentation(value, typeHint);
        };
        function jsonStringify(object, spaces, depth) {
          if (typeof spaces === "undefined") {
            return _stringify(object);
          }
          depth = depth || 1;
          var space = spaces * depth;
          var str = Array.isArray(object) ? "[" : "{";
          var end = Array.isArray(object) ? "]" : "}";
          var length = typeof object.length === "number" ? object.length : Object.keys(object).length;
          function repeat(s2, n) {
            return new Array(n).join(s2);
          }
          function _stringify(val) {
            switch (canonicalType(val)) {
              case "null":
              case "undefined":
                val = "[" + val + "]";
                break;
              case "array":
              case "object":
                val = jsonStringify(val, spaces, depth + 1);
                break;
              case "boolean":
              case "regexp":
              case "symbol":
              case "number":
                val = val === 0 && 1 / val === -Infinity ? "-0" : val.toString();
                break;
              case "bigint":
                val = val.toString() + "n";
                break;
              case "date":
                var sDate = isNaN(val.getTime()) ? val.toString() : val.toISOString();
                val = "[Date: " + sDate + "]";
                break;
              case "buffer":
                var json2 = val.toJSON();
                json2 = json2.data && json2.type ? json2.data : json2;
                val = "[Buffer: " + jsonStringify(json2, 2, depth + 1) + "]";
                break;
              default:
                val = val === "[Function]" || val === "[Circular]" ? val : JSON.stringify(val);
            }
            return val;
          }
          for (var i in object) {
            if (!Object.prototype.hasOwnProperty.call(object, i)) {
              continue;
            }
            --length;
            str += "\n " + repeat(" ", space) + (Array.isArray(object) ? "" : '"' + i + '": ') + // key
            _stringify(object[i]) + // value
            (length ? "," : "");
          }
          return str + // [], {}
          (str.length !== 1 ? "\n" + repeat(" ", --space) + end : end);
        }
        exports2.canonicalize = function canonicalize2(value, stack, typeHint) {
          var canonicalizedObj;
          var prop;
          typeHint = typeHint || canonicalType(value);
          function withStack(value2, fn) {
            stack.push(value2);
            fn();
            stack.pop();
          }
          stack = stack || [];
          if (stack.indexOf(value) !== -1) {
            return "[Circular]";
          }
          switch (typeHint) {
            case "undefined":
            case "buffer":
            case "null":
              canonicalizedObj = value;
              break;
            case "array":
              withStack(value, function() {
                canonicalizedObj = value.map(function(item) {
                  return exports2.canonicalize(item, stack);
                });
              });
              break;
            case "function":
              for (prop in value) {
                canonicalizedObj = {};
                break;
              }
              if (!canonicalizedObj) {
                canonicalizedObj = emptyRepresentation(value, typeHint);
                break;
              }
            /* falls through */
            case "null-prototype":
            case "object":
              canonicalizedObj = canonicalizedObj || {};
              if (typeHint === "null-prototype" && Symbol.toStringTag in value) {
                canonicalizedObj["[Symbol.toStringTag]"] = value[Symbol.toStringTag];
              }
              withStack(value, function() {
                Object.keys(value).sort().forEach(function(key) {
                  canonicalizedObj[key] = exports2.canonicalize(value[key], stack);
                });
              });
              break;
            case "date":
            case "number":
            case "regexp":
            case "boolean":
            case "symbol":
              canonicalizedObj = value;
              break;
            default:
              canonicalizedObj = value + "";
          }
          return canonicalizedObj;
        };
        exports2.stackTraceFilter = function() {
          var is = typeof document === "undefined" ? { node: true } : { browser: true };
          var slash = path.sep;
          var cwd3;
          if (is.node) {
            cwd3 = exports2.cwd() + slash;
          } else {
            cwd3 = (typeof location === "undefined" ? window.location : location).href.replace(/\/[^/]*$/, "/");
            slash = "/";
          }
          function isMochaInternal(line2) {
            return ~line2.indexOf("node_modules" + slash + "mocha" + slash) || ~line2.indexOf(slash + "mocha.js") || ~line2.indexOf(slash + "mocha.min.js");
          }
          function isNodeInternal(line2) {
            return ~line2.indexOf("(timers.js:") || ~line2.indexOf("(events.js:") || ~line2.indexOf("(node.js:") || ~line2.indexOf("(module.js:") || ~line2.indexOf("GeneratorFunctionPrototype.next (native)") || false;
          }
          return function(stack) {
            stack = stack.split("\n");
            stack = stack.reduce(function(list2, line2) {
              if (isMochaInternal(line2)) {
                return list2;
              }
              if (is.node && isNodeInternal(line2)) {
                return list2;
              }
              if (/:\d+:\d+\)?$/.test(line2)) {
                line2 = line2.replace("(" + cwd3, "(");
              }
              list2.push(line2);
              return list2;
            }, []);
            return stack.join("\n");
          };
        };
        exports2.isPromise = function isPromise(value) {
          return typeof value === "object" && value !== null && typeof value.then === "function";
        };
        exports2.clamp = function clamp(value, range) {
          return Math.min(Math.max(value, range[0]), range[1]);
        };
        exports2.noop = function() {
        };
        exports2.createMap = function(obj) {
          return Object.assign.apply(
            null,
            [/* @__PURE__ */ Object.create(null)].concat(Array.prototype.slice.call(arguments))
          );
        };
        exports2.defineConstants = function(obj) {
          if (canonicalType(obj) !== "object" || !Object.keys(obj).length) {
            throw new TypeError("Invalid argument; expected a non-empty object");
          }
          return Object.freeze(exports2.createMap(obj));
        };
        exports2.cwd = function cwd3() {
          return process2.cwd();
        };
        exports2.isBrowser = function isBrowser() {
          return Boolean(browser$2);
        };
        exports2.castArray = function castArray(value) {
          if (value === void 0) {
            return [];
          }
          if (value === null) {
            return [null];
          }
          if (typeof value === "object" && (typeof value[Symbol.iterator] === "function" || value.length !== void 0)) {
            return Array.from(value);
          }
          return [value];
        };
        exports2.constants = exports2.defineConstants({
          MOCHA_ID_PROP_NAME: MOCHA_ID_PROP_NAME2
        });
        const uniqueIDBase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
        exports2.uniqueID = () => {
          let id = "";
          for (let i = 0; i < 21; i++) {
            id += uniqueIDBase[Math.random() * 64 | 0];
          }
          return id;
        };
        exports2.assignNewMochaID = (obj) => {
          const id = exports2.uniqueID();
          Object.defineProperty(obj, MOCHA_ID_PROP_NAME2, {
            get() {
              return id;
            }
          });
          return obj;
        };
        exports2.getMochaID = (obj) => obj && typeof obj === "object" ? obj[MOCHA_ID_PROP_NAME2] : void 0;
        exports2.breakCircularDeps = (inputObj) => {
          const seen = /* @__PURE__ */ new Set();
          function _breakCircularDeps(obj) {
            if (obj && typeof obj !== "object") {
              return obj;
            }
            if (seen.has(obj)) {
              return "[Circular]";
            }
            seen.add(obj);
            for (const k in obj) {
              const descriptor = Object.getOwnPropertyDescriptor(obj, k);
              if (descriptor && descriptor.writable) {
                obj[k] = _breakCircularDeps(obj[k]);
              }
            }
            seen.delete(obj);
            return obj;
          }
          return _breakCircularDeps(inputObj);
        };
        exports2.isNumeric = (input) => {
          return !isNaN(parseFloat(input));
        };
      })(utils$3);
      var _nodeResolve_empty = {};
      var _nodeResolve_empty$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": _nodeResolve_empty
      });
      var require$$18 = /* @__PURE__ */ getAugmentedNamespace(_nodeResolve_empty$1);
      var browser$1 = {
        info: "\u2139\uFE0F",
        success: "\u2705",
        warning: "\u26A0\uFE0F",
        error: "\u274C\uFE0F"
      };
      var require$$0 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_events);
      var pending = Pending$2;
      function Pending$2(message) {
        this.message = message;
      }
      var browser2 = { exports: {} };
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      var ms = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms2) {
        var msAbs = Math.abs(ms2);
        if (msAbs >= d) {
          return Math.round(ms2 / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms2 / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms2 / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms2 / s) + "s";
        }
        return ms2 + "ms";
      }
      function fmtLong(ms2) {
        var msAbs = Math.abs(ms2);
        if (msAbs >= d) {
          return plural(ms2, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms2, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms2, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms2, msAbs, s, "second");
        }
        return ms2 + " ms";
      }
      function plural(ms2, msAbs, n, name2) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms2 / n) + " " + name2 + (isPlural ? "s" : "");
      }
      function setup(env3) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = ms;
        createDebug.destroy = destroy;
        Object.keys(env3).forEach((key) => {
          createDebug[key] = env3[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug2(...args) {
            if (!debug2.enabled) {
              return;
            }
            const self2 = debug2;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms2 = curr - (prevTime || curr);
            self2.diff = ms2;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format2];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug2.namespace = namespace;
          debug2.useColors = createDebug.useColors();
          debug2.color = createDebug.selectColor(namespace);
          debug2.extend = extend;
          debug2.destroy = createDebug.destroy;
          Object.defineProperty(debug2, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v2) => {
              enableOverride = v2;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug2);
          }
          return debug2;
        }
        function extend(namespace, delimiter2) {
          const newDebug = createDebug(this.namespace + (typeof delimiter2 === "undefined" ? ":" : delimiter2) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          let i;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            } else {
              createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name2) {
          if (name2[name2.length - 1] === "*") {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name2)) {
              return false;
            }
          }
          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name2)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      var common$1 = setup;
      (function(module3, exports2) {
        exports2.formatArgs = formatArgs;
        exports2.save = save;
        exports2.load = load;
        exports2.useColors = useColors;
        exports2.storage = localstorage();
        exports2.destroy = /* @__PURE__ */ (() => {
          let warned = false;
          return () => {
            if (!warned) {
              warned = true;
              console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
            }
          };
        })();
        exports2.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33"
        ];
        function useColors() {
          if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
            return true;
          }
          if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
            return false;
          }
          return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
          typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
          // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
          typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
          typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }
        function formatArgs(args) {
          args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module3.exports.humanize(this.diff);
          if (!this.useColors) {
            return;
          }
          const c = "color: " + this.color;
          args.splice(1, 0, c, "color: inherit");
          let index = 0;
          let lastC = 0;
          args[0].replace(/%[a-zA-Z%]/g, (match) => {
            if (match === "%%") {
              return;
            }
            index++;
            if (match === "%c") {
              lastC = index;
            }
          });
          args.splice(lastC, 0, c);
        }
        exports2.log = console.debug || console.log || (() => {
        });
        function save(namespaces) {
          try {
            if (namespaces) {
              exports2.storage.setItem("debug", namespaces);
            } else {
              exports2.storage.removeItem("debug");
            }
          } catch (error) {
          }
        }
        function load() {
          let r;
          try {
            r = exports2.storage.getItem("debug");
          } catch (error) {
          }
          if (!r && typeof process2 !== "undefined" && "env" in process2) {
            r = process2.env.DEBUG;
          }
          return r;
        }
        function localstorage() {
          try {
            return localStorage;
          } catch (error) {
          }
        }
        module3.exports = common$1(exports2);
        const { formatters } = module3.exports;
        formatters.j = function(v2) {
          try {
            return JSON.stringify(v2);
          } catch (error) {
            return "[UnexpectedJSONParseError]: " + error.message;
          }
        };
      })(browser2, browser2.exports);
      const { format } = require$$0$1;
      const emitWarning = (msg, type) => {
        if (process2.emitWarning) {
          process2.emitWarning(msg, type);
        } else {
          nextTick$1(function() {
            console.warn(type + ": " + msg);
          });
        }
      };
      const deprecate = (msg) => {
        msg = String(msg);
        if (msg && !deprecate.cache[msg]) {
          deprecate.cache[msg] = true;
          emitWarning(msg, "DeprecationWarning");
        }
      };
      deprecate.cache = {};
      const warn = (msg) => {
        if (msg) {
          emitWarning(msg);
        }
      };
      var constants$4 = {
        /**
         * An unrecoverable error.
         * @constant
         * @default
         */
        FATAL: "ERR_MOCHA_FATAL",
        /**
         * The type of an argument to a function call is invalid
         * @constant
         * @default
         */
        INVALID_ARG_TYPE: "ERR_MOCHA_INVALID_ARG_TYPE",
        /**
         * The value of an argument to a function call is invalid
         * @constant
         * @default
         */
        INVALID_ARG_VALUE: "ERR_MOCHA_INVALID_ARG_VALUE",
        /**
         * Something was thrown, but it wasn't an `Error`
         * @constant
         * @default
         */
        INVALID_EXCEPTION: "ERR_MOCHA_INVALID_EXCEPTION",
        /**
         * An interface (e.g., `Mocha.interfaces`) is unknown or invalid
         * @constant
         * @default
         */
        INVALID_INTERFACE: "ERR_MOCHA_INVALID_INTERFACE",
        /**
         * A reporter (.e.g, `Mocha.reporters`) is unknown or invalid
         * @constant
         * @default
         */
        INVALID_REPORTER: "ERR_MOCHA_INVALID_REPORTER",
        /**
         * `done()` was called twice in a `Test` or `Hook` callback
         * @constant
         * @default
         */
        MULTIPLE_DONE: "ERR_MOCHA_MULTIPLE_DONE",
        /**
         * No files matched the pattern provided by the user
         * @constant
         * @default
         */
        NO_FILES_MATCH_PATTERN: "ERR_MOCHA_NO_FILES_MATCH_PATTERN",
        /**
         * Known, but unsupported behavior of some kind
         * @constant
         * @default
         */
        UNSUPPORTED: "ERR_MOCHA_UNSUPPORTED",
        /**
         * Invalid state transition occurring in `Mocha` instance
         * @constant
         * @default
         */
        INSTANCE_ALREADY_RUNNING: "ERR_MOCHA_INSTANCE_ALREADY_RUNNING",
        /**
         * Invalid state transition occurring in `Mocha` instance
         * @constant
         * @default
         */
        INSTANCE_ALREADY_DISPOSED: "ERR_MOCHA_INSTANCE_ALREADY_DISPOSED",
        /**
         * Use of `only()` w/ `--forbid-only` results in this error.
         * @constant
         * @default
         */
        FORBIDDEN_EXCLUSIVITY: "ERR_MOCHA_FORBIDDEN_EXCLUSIVITY",
        /**
         * To be thrown when a user-defined plugin implementation (e.g., `mochaHooks`) is invalid
         * @constant
         * @default
         */
        INVALID_PLUGIN_IMPLEMENTATION: "ERR_MOCHA_INVALID_PLUGIN_IMPLEMENTATION",
        /**
         * To be thrown when a builtin or third-party plugin definition (the _definition_ of `mochaHooks`) is invalid
         * @constant
         * @default
         */
        INVALID_PLUGIN_DEFINITION: "ERR_MOCHA_INVALID_PLUGIN_DEFINITION",
        /**
         * When a runnable exceeds its allowed run time.
         * @constant
         * @default
         */
        TIMEOUT: "ERR_MOCHA_TIMEOUT",
        /**
         * Input file is not able to be parsed
         * @constant
         * @default
         */
        UNPARSABLE_FILE: "ERR_MOCHA_UNPARSABLE_FILE"
      };
      const MOCHA_ERRORS = new Set(Object.values(constants$4));
      function createNoFilesMatchPatternError(message, pattern) {
        var err = new Error(message);
        err.code = constants$4.NO_FILES_MATCH_PATTERN;
        err.pattern = pattern;
        return err;
      }
      function createInvalidReporterError(message, reporter2) {
        var err = new TypeError(message);
        err.code = constants$4.INVALID_REPORTER;
        err.reporter = reporter2;
        return err;
      }
      function createInvalidInterfaceError(message, ui2) {
        var err = new Error(message);
        err.code = constants$4.INVALID_INTERFACE;
        err.interface = ui2;
        return err;
      }
      function createUnsupportedError$2(message) {
        var err = new Error(message);
        err.code = constants$4.UNSUPPORTED;
        return err;
      }
      function createMissingArgumentError$1(message, argument, expected) {
        return createInvalidArgumentTypeError$1(message, argument, expected);
      }
      function createInvalidArgumentTypeError$1(message, argument, expected) {
        var err = new TypeError(message);
        err.code = constants$4.INVALID_ARG_TYPE;
        err.argument = argument;
        err.expected = expected;
        err.actual = typeof argument;
        return err;
      }
      function createInvalidArgumentValueError(message, argument, value, reason) {
        var err = new TypeError(message);
        err.code = constants$4.INVALID_ARG_VALUE;
        err.argument = argument;
        err.value = value;
        err.reason = typeof reason !== "undefined" ? reason : "is invalid";
        return err;
      }
      function createInvalidExceptionError$2(message, value) {
        var err = new Error(message);
        err.code = constants$4.INVALID_EXCEPTION;
        err.valueType = typeof value;
        err.value = value;
        return err;
      }
      function createFatalError$1(message, value) {
        var err = new Error(message);
        err.code = constants$4.FATAL;
        err.valueType = typeof value;
        err.value = value;
        return err;
      }
      function createInvalidLegacyPluginError(message, pluginType, pluginId) {
        switch (pluginType) {
          case "reporter":
            return createInvalidReporterError(message, pluginId);
          case "ui":
            return createInvalidInterfaceError(message, pluginId);
          default:
            throw new Error('unknown pluginType "' + pluginType + '"');
        }
      }
      function createInvalidPluginError(...args) {
        deprecate("Use createInvalidLegacyPluginError() instead");
        return createInvalidLegacyPluginError(...args);
      }
      function createMochaInstanceAlreadyDisposedError(message, cleanReferencesAfterRun, instance) {
        var err = new Error(message);
        err.code = constants$4.INSTANCE_ALREADY_DISPOSED;
        err.cleanReferencesAfterRun = cleanReferencesAfterRun;
        err.instance = instance;
        return err;
      }
      function createMochaInstanceAlreadyRunningError(message, instance) {
        var err = new Error(message);
        err.code = constants$4.INSTANCE_ALREADY_RUNNING;
        err.instance = instance;
        return err;
      }
      function createMultipleDoneError$1(runnable2, originalErr) {
        var title3;
        try {
          title3 = format("<%s>", runnable2.fullTitle());
          if (runnable2.parent.root) {
            title3 += " (of root suite)";
          }
        } catch (ignored) {
          title3 = format("<%s> (of unknown suite)", runnable2.title);
        }
        var message = format(
          "done() called multiple times in %s %s",
          runnable2.type ? runnable2.type : "unknown runnable",
          title3
        );
        if (runnable2.file) {
          message += format(" of file %s", runnable2.file);
        }
        if (originalErr) {
          message += format("; in addition, done() received error: %s", originalErr);
        }
        var err = new Error(message);
        err.code = constants$4.MULTIPLE_DONE;
        err.valueType = typeof originalErr;
        err.value = originalErr;
        return err;
      }
      function createForbiddenExclusivityError$1(mocha3) {
        var err = new Error(
          mocha3.isWorker ? "`.only` is not supported in parallel mode" : "`.only` forbidden by --forbid-only"
        );
        err.code = constants$4.FORBIDDEN_EXCLUSIVITY;
        return err;
      }
      function createInvalidPluginDefinitionError(msg, pluginDef) {
        const err = new Error(msg);
        err.code = constants$4.INVALID_PLUGIN_DEFINITION;
        err.pluginDef = pluginDef;
        return err;
      }
      function createInvalidPluginImplementationError(msg, { pluginDef, pluginImpl } = {}) {
        const err = new Error(msg);
        err.code = constants$4.INVALID_PLUGIN_IMPLEMENTATION;
        err.pluginDef = pluginDef;
        err.pluginImpl = pluginImpl;
        return err;
      }
      function createTimeoutError$1(msg, timeout2, file) {
        const err = new Error(msg);
        err.code = constants$4.TIMEOUT;
        err.timeout = timeout2;
        err.file = file;
        return err;
      }
      function createUnparsableFileError(message, filename) {
        var err = new Error(message);
        err.code = constants$4.UNPARSABLE_FILE;
        return err;
      }
      const isMochaError$1 = (err) => Boolean(err && typeof err === "object" && MOCHA_ERRORS.has(err.code));
      var errors$2 = {
        constants: constants$4,
        createFatalError: createFatalError$1,
        createForbiddenExclusivityError: createForbiddenExclusivityError$1,
        createInvalidArgumentTypeError: createInvalidArgumentTypeError$1,
        createInvalidArgumentValueError,
        createInvalidExceptionError: createInvalidExceptionError$2,
        createInvalidInterfaceError,
        createInvalidLegacyPluginError,
        createInvalidPluginDefinitionError,
        createInvalidPluginError,
        createInvalidPluginImplementationError,
        createInvalidReporterError,
        createMissingArgumentError: createMissingArgumentError$1,
        createMochaInstanceAlreadyDisposedError,
        createMochaInstanceAlreadyRunningError,
        createMultipleDoneError: createMultipleDoneError$1,
        createNoFilesMatchPatternError,
        createTimeoutError: createTimeoutError$1,
        createUnparsableFileError,
        createUnsupportedError: createUnsupportedError$2,
        deprecate,
        isMochaError: isMochaError$1,
        warn
      };
      var EventEmitter$1 = require$$0.EventEmitter;
      var Pending$1 = pending;
      var debug$1 = browser2.exports("mocha:runnable");
      var milliseconds = ms$1;
      var utils$2 = utils$3;
      const {
        createInvalidExceptionError: createInvalidExceptionError$1,
        createMultipleDoneError,
        createTimeoutError
      } = errors$2;
      var Date$3 = commonjsGlobal.Date;
      var setTimeout$2 = commonjsGlobal.setTimeout;
      var clearTimeout$1 = commonjsGlobal.clearTimeout;
      var toString2 = Object.prototype.toString;
      var MAX_TIMEOUT = Math.pow(2, 31) - 1;
      var runnable = Runnable$3;
      function Runnable$3(title3, fn) {
        this.title = title3;
        this.fn = fn;
        this.body = (fn || "").toString();
        this.async = fn && fn.length;
        this.sync = !this.async;
        this._timeout = 2e3;
        this._slow = 75;
        this._retries = -1;
        utils$2.assignNewMochaID(this);
        Object.defineProperty(this, "id", {
          get() {
            return utils$2.getMochaID(this);
          }
        });
        this.reset();
      }
      utils$2.inherits(Runnable$3, EventEmitter$1);
      Runnable$3.prototype.reset = function() {
        this.timedOut = false;
        this._currentRetry = 0;
        this.pending = false;
        delete this.state;
        delete this.err;
      };
      Runnable$3.prototype.timeout = function(ms2) {
        if (!arguments.length) {
          return this._timeout;
        }
        if (typeof ms2 === "string") {
          ms2 = milliseconds(ms2);
        }
        var range = [0, MAX_TIMEOUT];
        ms2 = utils$2.clamp(ms2, range);
        if (ms2 === range[0] || ms2 === range[1]) {
          this._timeout = 0;
        } else {
          this._timeout = ms2;
        }
        debug$1("timeout %d", this._timeout);
        if (this.timer) {
          this.resetTimeout();
        }
        return this;
      };
      Runnable$3.prototype.slow = function(ms2) {
        if (!arguments.length || typeof ms2 === "undefined") {
          return this._slow;
        }
        if (typeof ms2 === "string") {
          ms2 = milliseconds(ms2);
        }
        debug$1("slow %d", ms2);
        this._slow = ms2;
        return this;
      };
      Runnable$3.prototype.skip = function() {
        this.pending = true;
        throw new Pending$1("sync skip; aborting execution");
      };
      Runnable$3.prototype.isPending = function() {
        return this.pending || this.parent && this.parent.isPending();
      };
      Runnable$3.prototype.isFailed = function() {
        return !this.isPending() && this.state === constants$3.STATE_FAILED;
      };
      Runnable$3.prototype.isPassed = function() {
        return !this.isPending() && this.state === constants$3.STATE_PASSED;
      };
      Runnable$3.prototype.retries = function(n) {
        if (!arguments.length) {
          return this._retries;
        }
        this._retries = n;
      };
      Runnable$3.prototype.currentRetry = function(n) {
        if (!arguments.length) {
          return this._currentRetry;
        }
        this._currentRetry = n;
      };
      Runnable$3.prototype.fullTitle = function() {
        return this.titlePath().join(" ");
      };
      Runnable$3.prototype.titlePath = function() {
        return this.parent.titlePath().concat([this.title]);
      };
      Runnable$3.prototype.clearTimeout = function() {
        clearTimeout$1(this.timer);
      };
      Runnable$3.prototype.resetTimeout = function() {
        var self2 = this;
        var ms2 = this.timeout() || MAX_TIMEOUT;
        this.clearTimeout();
        this.timer = setTimeout$2(function() {
          if (self2.timeout() === 0) {
            return;
          }
          self2.callback(self2._timeoutError(ms2));
          self2.timedOut = true;
        }, ms2);
      };
      Runnable$3.prototype.globals = function(globals2) {
        if (!arguments.length) {
          return this._allowedGlobals;
        }
        this._allowedGlobals = globals2;
      };
      Runnable$3.prototype.run = function(fn) {
        var self2 = this;
        var start = new Date$3();
        var ctx = this.ctx;
        var finished;
        var errorWasHandled = false;
        if (this.isPending()) return fn();
        if (ctx && ctx.runnable) {
          ctx.runnable(this);
        }
        function multiple(err) {
          if (errorWasHandled) {
            return;
          }
          errorWasHandled = true;
          self2.emit("error", createMultipleDoneError(self2, err));
        }
        function done2(err) {
          var ms2 = self2.timeout();
          if (self2.timedOut) {
            return;
          }
          if (finished) {
            return multiple(err);
          }
          self2.clearTimeout();
          self2.duration = new Date$3() - start;
          finished = true;
          if (!err && self2.duration > ms2 && ms2 > 0) {
            err = self2._timeoutError(ms2);
          }
          fn(err);
        }
        this.callback = done2;
        if (this.fn && typeof this.fn.call !== "function") {
          done2(
            new TypeError(
              "A runnable must be passed a function as its second argument."
            )
          );
          return;
        }
        if (this.async) {
          this.resetTimeout();
          this.skip = function asyncSkip() {
            this.pending = true;
            done2();
            throw new Pending$1("async skip; aborting execution");
          };
          try {
            callFnAsync(this.fn);
          } catch (err) {
            errorWasHandled = true;
            if (err instanceof Pending$1) {
              return;
            } else if (this.allowUncaught) {
              throw err;
            }
            done2(Runnable$3.toValueOrError(err));
          }
          return;
        }
        try {
          callFn(this.fn);
        } catch (err) {
          errorWasHandled = true;
          if (err instanceof Pending$1) {
            return done2();
          } else if (this.allowUncaught) {
            throw err;
          }
          done2(Runnable$3.toValueOrError(err));
        }
        function callFn(fn2) {
          var result = fn2.call(ctx);
          if (result && typeof result.then === "function") {
            self2.resetTimeout();
            result.then(
              function() {
                done2();
                return null;
              },
              function(reason) {
                done2(reason || new Error("Promise rejected with no or falsy reason"));
              }
            );
          } else {
            if (self2.asyncOnly) {
              return done2(
                new Error(
                  "--async-only option in use without declaring `done()` or returning a promise"
                )
              );
            }
            done2();
          }
        }
        function callFnAsync(fn2) {
          var result = fn2.call(ctx, function(err) {
            if (err instanceof Error || toString2.call(err) === "[object Error]") {
              return done2(err);
            }
            if (err) {
              if (Object.prototype.toString.call(err) === "[object Object]") {
                return done2(
                  new Error("done() invoked with non-Error: " + JSON.stringify(err))
                );
              }
              return done2(new Error("done() invoked with non-Error: " + err));
            }
            if (result && utils$2.isPromise(result)) {
              return done2(
                new Error(
                  "Resolution method is overspecified. Specify a callback *or* return a Promise; not both."
                )
              );
            }
            done2();
          });
        }
      };
      Runnable$3.prototype._timeoutError = function(ms2) {
        let msg = `Timeout of ${ms2}ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.`;
        if (this.file) {
          msg += " (" + this.file + ")";
        }
        return createTimeoutError(msg, ms2, this.file);
      };
      var constants$3 = utils$2.defineConstants(
        /**
         * {@link Runnable}-related constants.
         * @public
         * @memberof Runnable
         * @readonly
         * @static
         * @alias constants
         * @enum {string}
         */
        {
          /**
           * Value of `state` prop when a `Runnable` has failed
           */
          STATE_FAILED: "failed",
          /**
           * Value of `state` prop when a `Runnable` has passed
           */
          STATE_PASSED: "passed",
          /**
           * Value of `state` prop when a `Runnable` has been skipped by user
           */
          STATE_PENDING: "pending"
        }
      );
      Runnable$3.toValueOrError = function(value) {
        return value || createInvalidExceptionError$1(
          "Runnable failed with falsy or undefined exception. Please throw an Error instead.",
          value
        );
      };
      Runnable$3.constants = constants$3;
      var suite2 = { exports: {} };
      var Runnable$2 = runnable;
      const { inherits, constants: constants$2 } = utils$3;
      const { MOCHA_ID_PROP_NAME: MOCHA_ID_PROP_NAME$1 } = constants$2;
      var hook = Hook;
      function Hook(title3, fn) {
        Runnable$2.call(this, title3, fn);
        this.type = "hook";
      }
      inherits(Hook, Runnable$2);
      Hook.prototype.reset = function() {
        Runnable$2.prototype.reset.call(this);
        delete this._error;
      };
      Hook.prototype.error = function(err) {
        if (!arguments.length) {
          err = this._error;
          this._error = null;
          return err;
        }
        this._error = err;
      };
      Hook.prototype.serialize = function serialize() {
        return {
          $$currentRetry: this.currentRetry(),
          $$fullTitle: this.fullTitle(),
          $$isPending: Boolean(this.isPending()),
          $$titlePath: this.titlePath(),
          ctx: this.ctx && this.ctx.currentTest ? {
            currentTest: {
              title: this.ctx.currentTest.title,
              [MOCHA_ID_PROP_NAME$1]: this.ctx.currentTest.id
            }
          } : {},
          duration: this.duration,
          file: this.file,
          parent: {
            $$fullTitle: this.parent.fullTitle(),
            [MOCHA_ID_PROP_NAME$1]: this.parent.id
          },
          state: this.state,
          title: this.title,
          type: this.type,
          [MOCHA_ID_PROP_NAME$1]: this.id
        };
      };
      (function(module3, exports2) {
        const { EventEmitter: EventEmitter2 } = require$$0;
        const Hook2 = hook;
        var {
          assignNewMochaID,
          clamp,
          constants: utilsConstants,
          defineConstants,
          getMochaID,
          inherits: inherits2,
          isString: isString2
        } = utils$3;
        const debug2 = browser2.exports("mocha:suite");
        const milliseconds2 = ms$1;
        const errors2 = errors$2;
        const { MOCHA_ID_PROP_NAME: MOCHA_ID_PROP_NAME2 } = utilsConstants;
        module3.exports = Suite2;
        Suite2.create = function(parent, title3) {
          var suite3 = new Suite2(title3, parent.ctx);
          suite3.parent = parent;
          title3 = suite3.fullTitle();
          parent.addSuite(suite3);
          return suite3;
        };
        function Suite2(title3, parentContext, isRoot) {
          if (!isString2(title3)) {
            throw errors2.createInvalidArgumentTypeError(
              'Suite argument "title" must be a string. Received type "' + typeof title3 + '"',
              "title",
              "string"
            );
          }
          this.title = title3;
          function Context2() {
          }
          Context2.prototype = parentContext;
          this.ctx = new Context2();
          this.suites = [];
          this.tests = [];
          this.root = isRoot === true;
          this.pending = false;
          this._retries = -1;
          this._beforeEach = [];
          this._beforeAll = [];
          this._afterEach = [];
          this._afterAll = [];
          this._timeout = 2e3;
          this._slow = 75;
          this._bail = false;
          this._onlyTests = [];
          this._onlySuites = [];
          assignNewMochaID(this);
          Object.defineProperty(this, "id", {
            get() {
              return getMochaID(this);
            }
          });
          this.reset();
        }
        inherits2(Suite2, EventEmitter2);
        Suite2.prototype.reset = function() {
          this.delayed = false;
          function doReset(thingToReset) {
            thingToReset.reset();
          }
          this.suites.forEach(doReset);
          this.tests.forEach(doReset);
          this._beforeEach.forEach(doReset);
          this._afterEach.forEach(doReset);
          this._beforeAll.forEach(doReset);
          this._afterAll.forEach(doReset);
        };
        Suite2.prototype.clone = function() {
          var suite3 = new Suite2(this.title);
          debug2("clone");
          suite3.ctx = this.ctx;
          suite3.root = this.root;
          suite3.timeout(this.timeout());
          suite3.retries(this.retries());
          suite3.slow(this.slow());
          suite3.bail(this.bail());
          return suite3;
        };
        Suite2.prototype.timeout = function(ms2) {
          if (!arguments.length) {
            return this._timeout;
          }
          if (typeof ms2 === "string") {
            ms2 = milliseconds2(ms2);
          }
          var INT_MAX = Math.pow(2, 31) - 1;
          var range = [0, INT_MAX];
          ms2 = clamp(ms2, range);
          debug2("timeout %d", ms2);
          this._timeout = parseInt(ms2, 10);
          return this;
        };
        Suite2.prototype.retries = function(n) {
          if (!arguments.length) {
            return this._retries;
          }
          debug2("retries %d", n);
          this._retries = parseInt(n, 10) || 0;
          return this;
        };
        Suite2.prototype.slow = function(ms2) {
          if (!arguments.length) {
            return this._slow;
          }
          if (typeof ms2 === "string") {
            ms2 = milliseconds2(ms2);
          }
          debug2("slow %d", ms2);
          this._slow = ms2;
          return this;
        };
        Suite2.prototype.bail = function(bail) {
          if (!arguments.length) {
            return this._bail;
          }
          debug2("bail %s", bail);
          this._bail = bail;
          return this;
        };
        Suite2.prototype.isPending = function() {
          return this.pending || this.parent && this.parent.isPending();
        };
        Suite2.prototype._createHook = function(title3, fn) {
          var hook2 = new Hook2(title3, fn);
          hook2.parent = this;
          hook2.timeout(this.timeout());
          hook2.retries(this.retries());
          hook2.slow(this.slow());
          hook2.ctx = this.ctx;
          hook2.file = this.file;
          return hook2;
        };
        Suite2.prototype.beforeAll = function(title3, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title3 === "function") {
            fn = title3;
            title3 = fn.name;
          }
          title3 = '"before all" hook' + (title3 ? ": " + title3 : "");
          var hook2 = this._createHook(title3, fn);
          this._beforeAll.push(hook2);
          this.emit(constants2.EVENT_SUITE_ADD_HOOK_BEFORE_ALL, hook2);
          return hook2;
        };
        Suite2.prototype.afterAll = function(title3, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title3 === "function") {
            fn = title3;
            title3 = fn.name;
          }
          title3 = '"after all" hook' + (title3 ? ": " + title3 : "");
          var hook2 = this._createHook(title3, fn);
          this._afterAll.push(hook2);
          this.emit(constants2.EVENT_SUITE_ADD_HOOK_AFTER_ALL, hook2);
          return hook2;
        };
        Suite2.prototype.beforeEach = function(title3, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title3 === "function") {
            fn = title3;
            title3 = fn.name;
          }
          title3 = '"before each" hook' + (title3 ? ": " + title3 : "");
          var hook2 = this._createHook(title3, fn);
          this._beforeEach.push(hook2);
          this.emit(constants2.EVENT_SUITE_ADD_HOOK_BEFORE_EACH, hook2);
          return hook2;
        };
        Suite2.prototype.afterEach = function(title3, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title3 === "function") {
            fn = title3;
            title3 = fn.name;
          }
          title3 = '"after each" hook' + (title3 ? ": " + title3 : "");
          var hook2 = this._createHook(title3, fn);
          this._afterEach.push(hook2);
          this.emit(constants2.EVENT_SUITE_ADD_HOOK_AFTER_EACH, hook2);
          return hook2;
        };
        Suite2.prototype.addSuite = function(suite3) {
          suite3.parent = this;
          suite3.root = false;
          suite3.timeout(this.timeout());
          suite3.retries(this.retries());
          suite3.slow(this.slow());
          suite3.bail(this.bail());
          this.suites.push(suite3);
          this.emit(constants2.EVENT_SUITE_ADD_SUITE, suite3);
          return this;
        };
        Suite2.prototype.addTest = function(test3) {
          test3.parent = this;
          test3.timeout(this.timeout());
          test3.retries(this.retries());
          test3.slow(this.slow());
          test3.ctx = this.ctx;
          this.tests.push(test3);
          this.emit(constants2.EVENT_SUITE_ADD_TEST, test3);
          return this;
        };
        Suite2.prototype.fullTitle = function() {
          return this.titlePath().join(" ");
        };
        Suite2.prototype.titlePath = function() {
          var result = [];
          if (this.parent) {
            result = result.concat(this.parent.titlePath());
          }
          if (!this.root) {
            result.push(this.title);
          }
          return result;
        };
        Suite2.prototype.total = function() {
          return this.suites.reduce(function(sum, suite3) {
            return sum + suite3.total();
          }, 0) + this.tests.length;
        };
        Suite2.prototype.eachTest = function(fn) {
          this.tests.forEach(fn);
          this.suites.forEach(function(suite3) {
            suite3.eachTest(fn);
          });
          return this;
        };
        Suite2.prototype.run = function run2() {
          if (this.root) {
            this.emit(constants2.EVENT_ROOT_SUITE_RUN);
          }
        };
        Suite2.prototype.hasOnly = function hasOnly() {
          return this._onlyTests.length > 0 || this._onlySuites.length > 0 || this.suites.some(function(suite3) {
            return suite3.hasOnly();
          });
        };
        Suite2.prototype.filterOnly = function filterOnly() {
          if (this._onlyTests.length) {
            this.tests = this._onlyTests;
            this.suites = [];
          } else {
            this.tests = [];
            this._onlySuites.forEach(function(onlySuite) {
              if (onlySuite.hasOnly()) {
                onlySuite.filterOnly();
              }
            });
            var onlySuites = this._onlySuites;
            this.suites = this.suites.filter(function(childSuite) {
              return onlySuites.indexOf(childSuite) !== -1 || childSuite.filterOnly();
            });
          }
          return this.tests.length > 0 || this.suites.length > 0;
        };
        Suite2.prototype.appendOnlySuite = function(suite3) {
          this._onlySuites.push(suite3);
        };
        Suite2.prototype.markOnly = function() {
          this.parent && this.parent.appendOnlySuite(this);
        };
        Suite2.prototype.appendOnlyTest = function(test3) {
          this._onlyTests.push(test3);
        };
        Suite2.prototype.getHooks = function getHooks(name2) {
          return this["_" + name2];
        };
        Suite2.prototype.dispose = function() {
          this.suites.forEach(function(suite3) {
            suite3.dispose();
          });
          this.cleanReferences();
        };
        Suite2.prototype.cleanReferences = function cleanReferences() {
          function cleanArrReferences(arr) {
            for (var i2 = 0; i2 < arr.length; i2++) {
              delete arr[i2].fn;
            }
          }
          if (Array.isArray(this._beforeAll)) {
            cleanArrReferences(this._beforeAll);
          }
          if (Array.isArray(this._beforeEach)) {
            cleanArrReferences(this._beforeEach);
          }
          if (Array.isArray(this._afterAll)) {
            cleanArrReferences(this._afterAll);
          }
          if (Array.isArray(this._afterEach)) {
            cleanArrReferences(this._afterEach);
          }
          for (var i = 0; i < this.tests.length; i++) {
            delete this.tests[i].fn;
          }
        };
        Suite2.prototype.serialize = function serialize() {
          return {
            _bail: this._bail,
            $$fullTitle: this.fullTitle(),
            $$isPending: Boolean(this.isPending()),
            root: this.root,
            title: this.title,
            [MOCHA_ID_PROP_NAME2]: this.id,
            parent: this.parent ? { [MOCHA_ID_PROP_NAME2]: this.parent.id } : null
          };
        };
        var constants2 = defineConstants(
          /**
           * {@link Suite}-related constants.
           * @public
           * @memberof Suite
           * @alias constants
           * @readonly
           * @static
           * @enum {string}
           */
          {
            /**
             * Event emitted after a test file has been loaded. Not emitted in browser.
             */
            EVENT_FILE_POST_REQUIRE: "post-require",
            /**
             * Event emitted before a test file has been loaded. In browser, this is emitted once an interface has been selected.
             */
            EVENT_FILE_PRE_REQUIRE: "pre-require",
            /**
             * Event emitted immediately after a test file has been loaded. Not emitted in browser.
             */
            EVENT_FILE_REQUIRE: "require",
            /**
             * Event emitted when `global.run()` is called (use with `delay` option).
             */
            EVENT_ROOT_SUITE_RUN: "run",
            /**
             * Namespace for collection of a `Suite`'s "after all" hooks.
             */
            HOOK_TYPE_AFTER_ALL: "afterAll",
            /**
             * Namespace for collection of a `Suite`'s "after each" hooks.
             */
            HOOK_TYPE_AFTER_EACH: "afterEach",
            /**
             * Namespace for collection of a `Suite`'s "before all" hooks.
             */
            HOOK_TYPE_BEFORE_ALL: "beforeAll",
            /**
             * Namespace for collection of a `Suite`'s "before each" hooks.
             */
            HOOK_TYPE_BEFORE_EACH: "beforeEach",
            /**
             * Emitted after a child `Suite` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_SUITE: "suite",
            /**
             * Emitted after an "after all" `Hook` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_HOOK_AFTER_ALL: "afterAll",
            /**
             * Emitted after an "after each" `Hook` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_HOOK_AFTER_EACH: "afterEach",
            /**
             * Emitted after an "before all" `Hook` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_HOOK_BEFORE_ALL: "beforeAll",
            /**
             * Emitted after an "before each" `Hook` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_HOOK_BEFORE_EACH: "beforeEach",
            /**
             * Emitted after a `Test` has been added to a `Suite`.
             */
            EVENT_SUITE_ADD_TEST: "test"
          }
        );
        Suite2.constants = constants2;
      })(suite2);
      var EventEmitter = require$$0.EventEmitter;
      var Pending = pending;
      var utils$1 = utils$3;
      var debug = browser2.exports("mocha:runner");
      var Runnable$1 = runnable;
      var Suite$2 = suite2.exports;
      var HOOK_TYPE_BEFORE_EACH = Suite$2.constants.HOOK_TYPE_BEFORE_EACH;
      var HOOK_TYPE_AFTER_EACH = Suite$2.constants.HOOK_TYPE_AFTER_EACH;
      var HOOK_TYPE_AFTER_ALL = Suite$2.constants.HOOK_TYPE_AFTER_ALL;
      var HOOK_TYPE_BEFORE_ALL = Suite$2.constants.HOOK_TYPE_BEFORE_ALL;
      var EVENT_ROOT_SUITE_RUN = Suite$2.constants.EVENT_ROOT_SUITE_RUN;
      var STATE_FAILED = Runnable$1.constants.STATE_FAILED;
      var STATE_PASSED = Runnable$1.constants.STATE_PASSED;
      var STATE_PENDING = Runnable$1.constants.STATE_PENDING;
      var stackFilter = utils$1.stackTraceFilter();
      var stringify = utils$1.stringify;
      const {
        createInvalidExceptionError,
        createUnsupportedError: createUnsupportedError$1,
        createFatalError,
        isMochaError,
        constants: errorConstants
      } = errors$2;
      var globals = [
        "setTimeout",
        "clearTimeout",
        "setInterval",
        "clearInterval",
        "XMLHttpRequest",
        "Date",
        "setImmediate",
        "clearImmediate"
      ];
      var constants$1 = utils$1.defineConstants(
        /**
         * {@link Runner}-related constants.
         * @public
         * @memberof Runner
         * @readonly
         * @alias constants
         * @static
         * @enum {string}
         */
        {
          /**
           * Emitted when {@link Hook} execution begins
           */
          EVENT_HOOK_BEGIN: "hook",
          /**
           * Emitted when {@link Hook} execution ends
           */
          EVENT_HOOK_END: "hook end",
          /**
           * Emitted when Root {@link Suite} execution begins (all files have been parsed and hooks/tests are ready for execution)
           */
          EVENT_RUN_BEGIN: "start",
          /**
           * Emitted when Root {@link Suite} execution has been delayed via `delay` option
           */
          EVENT_DELAY_BEGIN: "waiting",
          /**
           * Emitted when delayed Root {@link Suite} execution is triggered by user via `global.run()`
           */
          EVENT_DELAY_END: "ready",
          /**
           * Emitted when Root {@link Suite} execution ends
           */
          EVENT_RUN_END: "end",
          /**
           * Emitted when {@link Suite} execution begins
           */
          EVENT_SUITE_BEGIN: "suite",
          /**
           * Emitted when {@link Suite} execution ends
           */
          EVENT_SUITE_END: "suite end",
          /**
           * Emitted when {@link Test} execution begins
           */
          EVENT_TEST_BEGIN: "test",
          /**
           * Emitted when {@link Test} execution ends
           */
          EVENT_TEST_END: "test end",
          /**
           * Emitted when {@link Test} execution fails
           */
          EVENT_TEST_FAIL: "fail",
          /**
           * Emitted when {@link Test} execution succeeds
           */
          EVENT_TEST_PASS: "pass",
          /**
           * Emitted when {@link Test} becomes pending
           */
          EVENT_TEST_PENDING: "pending",
          /**
           * Emitted when {@link Test} execution has failed, but will retry
           */
          EVENT_TEST_RETRY: "retry",
          /**
           * Initial state of Runner
           */
          STATE_IDLE: "idle",
          /**
           * State set to this value when the Runner has started running
           */
          STATE_RUNNING: "running",
          /**
           * State set to this value when the Runner has stopped
           */
          STATE_STOPPED: "stopped"
        }
      );
      class Runner extends EventEmitter {
        /**
         * Initialize a `Runner` at the Root {@link Suite}, which represents a hierarchy of {@link Suite|Suites} and {@link Test|Tests}.
         *
         * @extends external:EventEmitter
         * @public
         * @class
         * @param {Suite} suite - Root suite
         * @param {Object} [opts] - Settings object
         * @param {boolean} [opts.cleanReferencesAfterRun] - Whether to clean references to test fns and hooks when a suite is done.
         * @param {boolean} [opts.delay] - Whether to delay execution of root suite until ready.
         * @param {boolean} [opts.dryRun] - Whether to report tests without running them.
         * @param {boolean} [opts.failZero] - Whether to fail test run if zero tests encountered.
         */
        constructor(suite3, opts = {}) {
          super();
          var self2 = this;
          this._globals = [];
          this._abort = false;
          this.suite = suite3;
          this._opts = opts;
          this.state = constants$1.STATE_IDLE;
          this.total = suite3.total();
          this.failures = 0;
          this._eventListeners = /* @__PURE__ */ new Map();
          this.on(constants$1.EVENT_TEST_END, function(test3) {
            if (test3.type === "test" && test3.retriedTest() && test3.parent) {
              var idx = test3.parent.tests && test3.parent.tests.indexOf(test3.retriedTest());
              if (idx > -1) test3.parent.tests[idx] = test3;
            }
            self2.checkGlobals(test3);
          });
          this.on(constants$1.EVENT_HOOK_END, function(hook2) {
            self2.checkGlobals(hook2);
          });
          this._defaultGrep = /.*/;
          this.grep(this._defaultGrep);
          this.globals(this.globalProps());
          this.uncaught = this._uncaught.bind(this);
          this.unhandled = (reason, promise) => {
            if (isMochaError(reason)) {
              debug(
                "trapped unhandled rejection coming out of Mocha; forwarding to uncaught handler:",
                reason
              );
              this.uncaught(reason);
            } else {
              debug(
                "trapped unhandled rejection from (probably) user code; re-emitting on process"
              );
              this._removeEventListener(
                process2,
                "unhandledRejection",
                this.unhandled
              );
              try {
                process2.emit("unhandledRejection", reason, promise);
              } finally {
                this._addEventListener(process2, "unhandledRejection", this.unhandled);
              }
            }
          };
        }
      }
      Runner.immediately = commonjsGlobal.setImmediate || nextTick$1;
      Runner.prototype._addEventListener = function(target, eventName, listener) {
        debug(
          "_addEventListener(): adding for event %s; %d current listeners",
          eventName,
          target.listenerCount(eventName)
        );
        if (this._eventListeners.has(target) && this._eventListeners.get(target).has(eventName) && this._eventListeners.get(target).get(eventName).has(listener)) {
          debug(
            "warning: tried to attach duplicate event listener for %s",
            eventName
          );
          return;
        }
        target.on(eventName, listener);
        const targetListeners = this._eventListeners.has(target) ? this._eventListeners.get(target) : /* @__PURE__ */ new Map();
        const targetEventListeners = targetListeners.has(eventName) ? targetListeners.get(eventName) : /* @__PURE__ */ new Set();
        targetEventListeners.add(listener);
        targetListeners.set(eventName, targetEventListeners);
        this._eventListeners.set(target, targetListeners);
      };
      Runner.prototype._removeEventListener = function(target, eventName, listener) {
        target.removeListener(eventName, listener);
        if (this._eventListeners.has(target)) {
          const targetListeners = this._eventListeners.get(target);
          if (targetListeners.has(eventName)) {
            const targetEventListeners = targetListeners.get(eventName);
            targetEventListeners.delete(listener);
            if (!targetEventListeners.size) {
              targetListeners.delete(eventName);
            }
          }
          if (!targetListeners.size) {
            this._eventListeners.delete(target);
          }
        } else {
          debug("trying to remove listener for untracked object %s", target);
        }
      };
      Runner.prototype.dispose = function() {
        this.removeAllListeners();
        this._eventListeners.forEach((targetListeners, target) => {
          targetListeners.forEach((targetEventListeners, eventName) => {
            targetEventListeners.forEach((listener) => {
              target.removeListener(eventName, listener);
            });
          });
        });
        this._eventListeners.clear();
      };
      Runner.prototype.grep = function(re, invert) {
        debug("grep(): setting to %s", re);
        this._grep = re;
        this._invert = invert;
        this.total = this.grepTotal(this.suite);
        return this;
      };
      Runner.prototype.grepTotal = function(suite3) {
        var self2 = this;
        var total = 0;
        suite3.eachTest(function(test3) {
          var match = self2._grep.test(test3.fullTitle());
          if (self2._invert) {
            match = !match;
          }
          if (match) {
            total++;
          }
        });
        return total;
      };
      Runner.prototype.globalProps = function() {
        var props = Object.keys(commonjsGlobal);
        for (var i = 0; i < globals.length; ++i) {
          if (~props.indexOf(globals[i])) {
            continue;
          }
          props.push(globals[i]);
        }
        return props;
      };
      Runner.prototype.globals = function(arr) {
        if (!arguments.length) {
          return this._globals;
        }
        debug("globals(): setting to %O", arr);
        this._globals = this._globals.concat(arr);
        return this;
      };
      Runner.prototype.checkGlobals = function(test3) {
        if (!this.checkLeaks) {
          return;
        }
        var ok = this._globals;
        var globals2 = this.globalProps();
        var leaks;
        if (test3) {
          ok = ok.concat(test3._allowedGlobals || []);
        }
        if (this.prevGlobalsLength === globals2.length) {
          return;
        }
        this.prevGlobalsLength = globals2.length;
        leaks = filterLeaks(ok, globals2);
        this._globals = this._globals.concat(leaks);
        if (leaks.length) {
          var msg = `global leak(s) detected: ${leaks.map((e) => `'${e}'`).join(", ")}`;
          this.fail(test3, new Error(msg));
        }
      };
      Runner.prototype.fail = function(test3, err, force) {
        force = force === true;
        if (test3.isPending() && !force) {
          return;
        }
        if (this.state === constants$1.STATE_STOPPED) {
          if (err.code === errorConstants.MULTIPLE_DONE) {
            throw err;
          }
          throw createFatalError(
            "Test failed after root suite execution completed!",
            err
          );
        }
        ++this.failures;
        debug("total number of failures: %d", this.failures);
        test3.state = STATE_FAILED;
        if (!isError(err)) {
          err = thrown2Error(err);
        }
        if (!this.fullStackTrace) {
          const alreadyFiltered = /* @__PURE__ */ new Set();
          let currentErr = err;
          while (currentErr && currentErr.stack && !alreadyFiltered.has(currentErr)) {
            alreadyFiltered.add(currentErr);
            try {
              currentErr.stack = stackFilter(currentErr.stack);
            } catch (ignore) {
            }
            currentErr = currentErr.cause;
          }
        }
        this.emit(constants$1.EVENT_TEST_FAIL, test3, err);
      };
      Runner.prototype.hook = function(name2, fn) {
        if (this._opts.dryRun) return fn();
        var suite3 = this.suite;
        var hooks = suite3.getHooks(name2);
        var self2 = this;
        function next(i) {
          var hook2 = hooks[i];
          if (!hook2) {
            return fn();
          }
          self2.currentRunnable = hook2;
          if (name2 === HOOK_TYPE_BEFORE_ALL) {
            hook2.ctx.currentTest = hook2.parent.tests[0];
          } else if (name2 === HOOK_TYPE_AFTER_ALL) {
            hook2.ctx.currentTest = hook2.parent.tests[hook2.parent.tests.length - 1];
          } else {
            hook2.ctx.currentTest = self2.test;
          }
          setHookTitle(hook2);
          hook2.allowUncaught = self2.allowUncaught;
          self2.emit(constants$1.EVENT_HOOK_BEGIN, hook2);
          if (!hook2.listeners("error").length) {
            self2._addEventListener(hook2, "error", function(err) {
              self2.fail(hook2, err);
            });
          }
          hook2.run(function cbHookRun(err) {
            var testError = hook2.error();
            if (testError) {
              self2.fail(self2.test, testError);
            }
            if (hook2.pending) {
              if (name2 === HOOK_TYPE_AFTER_EACH) {
                if (self2.test) {
                  self2.test.pending = true;
                }
              } else if (name2 === HOOK_TYPE_BEFORE_EACH) {
                if (self2.test) {
                  self2.test.pending = true;
                }
                self2.emit(constants$1.EVENT_HOOK_END, hook2);
                hook2.pending = false;
                return fn(new Error("abort hookDown"));
              } else if (name2 === HOOK_TYPE_BEFORE_ALL) {
                suite3.tests.forEach(function(test3) {
                  test3.pending = true;
                });
                suite3.suites.forEach(function(suite4) {
                  suite4.pending = true;
                });
                hooks = [];
              } else {
                hook2.pending = false;
                var errForbid = createUnsupportedError$1("`this.skip` forbidden");
                self2.fail(hook2, errForbid);
                return fn(errForbid);
              }
            } else if (err) {
              self2.fail(hook2, err);
              return fn(err);
            }
            self2.emit(constants$1.EVENT_HOOK_END, hook2);
            delete hook2.ctx.currentTest;
            setHookTitle(hook2);
            next(++i);
          });
          function setHookTitle(hook3) {
            hook3.originalTitle = hook3.originalTitle || hook3.title;
            if (hook3.ctx && hook3.ctx.currentTest) {
              hook3.title = `${hook3.originalTitle} for "${hook3.ctx.currentTest.title}"`;
            } else {
              var parentTitle;
              if (hook3.parent.title) {
                parentTitle = hook3.parent.title;
              } else {
                parentTitle = hook3.parent.root ? "{root}" : "";
              }
              hook3.title = `${hook3.originalTitle} in "${parentTitle}"`;
            }
          }
        }
        Runner.immediately(function() {
          next(0);
        });
      };
      Runner.prototype.hooks = function(name2, suites, fn) {
        var self2 = this;
        var orig = this.suite;
        function next(suite3) {
          self2.suite = suite3;
          if (!suite3) {
            self2.suite = orig;
            return fn();
          }
          self2.hook(name2, function(err) {
            if (err) {
              var errSuite = self2.suite;
              self2.suite = orig;
              return fn(err, errSuite);
            }
            next(suites.pop());
          });
        }
        next(suites.pop());
      };
      Runner.prototype.hookUp = function(name2, fn) {
        var suites = [this.suite].concat(this.parents()).reverse();
        this.hooks(name2, suites, fn);
      };
      Runner.prototype.hookDown = function(name2, fn) {
        var suites = [this.suite].concat(this.parents());
        this.hooks(name2, suites, fn);
      };
      Runner.prototype.parents = function() {
        var suite3 = this.suite;
        var suites = [];
        while (suite3.parent) {
          suite3 = suite3.parent;
          suites.push(suite3);
        }
        return suites;
      };
      Runner.prototype.runTest = function(fn) {
        if (this._opts.dryRun) return Runner.immediately(fn);
        var self2 = this;
        var test3 = this.test;
        if (!test3) {
          return;
        }
        if (this.asyncOnly) {
          test3.asyncOnly = true;
        }
        this._addEventListener(test3, "error", function(err) {
          self2.fail(test3, err);
        });
        if (this.allowUncaught) {
          test3.allowUncaught = true;
          return test3.run(fn);
        }
        try {
          test3.run(fn);
        } catch (err) {
          fn(err);
        }
      };
      Runner.prototype.runTests = function(suite3, fn) {
        var self2 = this;
        var tests = suite3.tests.slice();
        var test3;
        function hookErr(_, errSuite, after) {
          var orig = self2.suite;
          self2.suite = after ? errSuite.parent : errSuite;
          if (self2.suite) {
            self2.hookUp(HOOK_TYPE_AFTER_EACH, function(err2, errSuite2) {
              self2.suite = orig;
              if (err2) {
                return hookErr(err2, errSuite2, true);
              }
              fn(errSuite);
            });
          } else {
            self2.suite = orig;
            fn(errSuite);
          }
        }
        function next(err, errSuite) {
          if (self2.failures && suite3._bail) {
            tests = [];
          }
          if (self2._abort) {
            return fn();
          }
          if (err) {
            return hookErr(err, errSuite, true);
          }
          test3 = tests.shift();
          if (!test3) {
            return fn();
          }
          var match = self2._grep.test(test3.fullTitle());
          if (self2._invert) {
            match = !match;
          }
          if (!match) {
            if (self2._grep !== self2._defaultGrep) {
              Runner.immediately(next);
            } else {
              next();
            }
            return;
          }
          if (test3.isPending()) {
            if (self2.forbidPending) {
              self2.fail(test3, new Error("Pending test forbidden"), true);
            } else {
              test3.state = STATE_PENDING;
              self2.emit(constants$1.EVENT_TEST_PENDING, test3);
            }
            self2.emit(constants$1.EVENT_TEST_END, test3);
            return next();
          }
          self2.emit(constants$1.EVENT_TEST_BEGIN, self2.test = test3);
          self2.hookDown(HOOK_TYPE_BEFORE_EACH, function(err2, errSuite2) {
            if (test3.isPending()) {
              if (self2.forbidPending) {
                self2.fail(test3, new Error("Pending test forbidden"), true);
              } else {
                test3.state = STATE_PENDING;
                self2.emit(constants$1.EVENT_TEST_PENDING, test3);
              }
              self2.emit(constants$1.EVENT_TEST_END, test3);
              var origSuite = self2.suite;
              self2.suite = errSuite2 || self2.suite;
              return self2.hookUp(HOOK_TYPE_AFTER_EACH, function(e, eSuite) {
                self2.suite = origSuite;
                next(e, eSuite);
              });
            }
            if (err2) {
              return hookErr(err2, errSuite2, false);
            }
            self2.currentRunnable = self2.test;
            self2.runTest(function(err3) {
              test3 = self2.test;
              if (test3.pending) {
                if (self2.forbidPending) {
                  self2.fail(test3, new Error("Pending test forbidden"), true);
                } else {
                  test3.state = STATE_PENDING;
                  self2.emit(constants$1.EVENT_TEST_PENDING, test3);
                }
                self2.emit(constants$1.EVENT_TEST_END, test3);
                return self2.hookUp(HOOK_TYPE_AFTER_EACH, next);
              } else if (err3) {
                var retry = test3.currentRetry();
                if (retry < test3.retries()) {
                  var clonedTest = test3.clone();
                  clonedTest.currentRetry(retry + 1);
                  tests.unshift(clonedTest);
                  self2.emit(constants$1.EVENT_TEST_RETRY, test3, err3);
                  return self2.hookUp(HOOK_TYPE_AFTER_EACH, next);
                } else {
                  self2.fail(test3, err3);
                }
                self2.emit(constants$1.EVENT_TEST_END, test3);
                return self2.hookUp(HOOK_TYPE_AFTER_EACH, next);
              }
              test3.state = STATE_PASSED;
              self2.emit(constants$1.EVENT_TEST_PASS, test3);
              self2.emit(constants$1.EVENT_TEST_END, test3);
              self2.hookUp(HOOK_TYPE_AFTER_EACH, next);
            });
          });
        }
        this.next = next;
        this.hookErr = hookErr;
        next();
      };
      Runner.prototype.runSuite = function(suite3, fn) {
        var i = 0;
        var self2 = this;
        var total = this.grepTotal(suite3);
        debug("runSuite(): running %s", suite3.fullTitle());
        if (!total || self2.failures && suite3._bail) {
          debug("runSuite(): bailing");
          return fn();
        }
        this.emit(constants$1.EVENT_SUITE_BEGIN, this.suite = suite3);
        function next(errSuite) {
          if (errSuite) {
            if (errSuite === suite3) {
              return done2();
            }
            return done2(errSuite);
          }
          if (self2._abort) {
            return done2();
          }
          var curr = suite3.suites[i++];
          if (!curr) {
            return done2();
          }
          if (self2._grep !== self2._defaultGrep) {
            Runner.immediately(function() {
              self2.runSuite(curr, next);
            });
          } else {
            self2.runSuite(curr, next);
          }
        }
        function done2(errSuite) {
          self2.suite = suite3;
          self2.nextSuite = next;
          delete self2.test;
          self2.hook(HOOK_TYPE_AFTER_ALL, function() {
            self2.emit(constants$1.EVENT_SUITE_END, suite3);
            fn(errSuite);
          });
        }
        this.nextSuite = next;
        this.hook(HOOK_TYPE_BEFORE_ALL, function(err) {
          if (err) {
            return done2();
          }
          self2.runTests(suite3, next);
        });
      };
      Runner.prototype._uncaught = function(err) {
        if (!(this instanceof Runner)) {
          throw createFatalError(
            "Runner#uncaught() called with invalid context",
            this
          );
        }
        if (err instanceof Pending) {
          debug("uncaught(): caught a Pending");
          return;
        }
        if (this.allowUncaught && !utils$1.isBrowser()) {
          debug("uncaught(): bubbling exception due to --allow-uncaught");
          throw err;
        }
        if (this.state === constants$1.STATE_STOPPED) {
          debug("uncaught(): throwing after run has completed!");
          throw err;
        }
        if (err) {
          debug("uncaught(): got truthy exception %O", err);
        } else {
          debug("uncaught(): undefined/falsy exception");
          err = createInvalidExceptionError(
            "Caught falsy/undefined exception which would otherwise be uncaught. No stack trace found; try a debugger",
            err
          );
        }
        if (!isError(err)) {
          err = thrown2Error(err);
          debug('uncaught(): converted "error" %o to Error', err);
        }
        err.uncaught = true;
        var runnable2 = this.currentRunnable;
        if (!runnable2) {
          runnable2 = new Runnable$1("Uncaught error outside test suite");
          debug("uncaught(): no current Runnable; created a phony one");
          runnable2.parent = this.suite;
          if (this.state === constants$1.STATE_RUNNING) {
            debug("uncaught(): failing gracefully");
            this.fail(runnable2, err);
          } else {
            debug("uncaught(): test run has not yet started; unrecoverable");
            this.emit(constants$1.EVENT_RUN_BEGIN);
            this.fail(runnable2, err);
            this.emit(constants$1.EVENT_RUN_END);
          }
          return;
        }
        runnable2.clearTimeout();
        if (runnable2.isFailed()) {
          debug("uncaught(): Runnable has already failed");
          return;
        } else if (runnable2.isPending()) {
          debug("uncaught(): pending Runnable wound up failing!");
          this.fail(runnable2, err, true);
          return;
        }
        if (runnable2.isPassed()) {
          debug("uncaught(): Runnable has already passed; bailing gracefully");
          this.fail(runnable2, err);
          this.abort();
        } else {
          debug("uncaught(): forcing Runnable to complete with Error");
          return runnable2.callback(err);
        }
      };
      Runner.prototype.run = function(fn, opts = {}) {
        var rootSuite = this.suite;
        var options = opts.options || {};
        debug("run(): got options: %O", options);
        fn = fn || function() {
        };
        const end = () => {
          if (!this.total && this._opts.failZero) this.failures = 1;
          debug("run(): root suite completed; emitting %s", constants$1.EVENT_RUN_END);
          this.emit(constants$1.EVENT_RUN_END);
        };
        const begin = () => {
          debug("run(): emitting %s", constants$1.EVENT_RUN_BEGIN);
          this.emit(constants$1.EVENT_RUN_BEGIN);
          debug("run(): emitted %s", constants$1.EVENT_RUN_BEGIN);
          this.runSuite(rootSuite, end);
        };
        const prepare = () => {
          debug("run(): starting");
          if (rootSuite.hasOnly()) {
            rootSuite.filterOnly();
            debug("run(): filtered exclusive Runnables");
          }
          this.state = constants$1.STATE_RUNNING;
          if (this._opts.delay) {
            this.emit(constants$1.EVENT_DELAY_END);
            debug('run(): "delay" ended');
          }
          return begin();
        };
        if (this._opts.cleanReferencesAfterRun) {
          this.on(constants$1.EVENT_SUITE_END, (suite3) => {
            suite3.cleanReferences();
          });
        }
        this.on(constants$1.EVENT_RUN_END, function() {
          this.state = constants$1.STATE_STOPPED;
          debug("run(): emitted %s", constants$1.EVENT_RUN_END);
          fn(this.failures);
        });
        this._removeEventListener(process2, "uncaughtException", this.uncaught);
        this._removeEventListener(process2, "unhandledRejection", this.unhandled);
        this._addEventListener(process2, "uncaughtException", this.uncaught);
        this._addEventListener(process2, "unhandledRejection", this.unhandled);
        if (this._opts.delay) {
          this.emit(constants$1.EVENT_DELAY_BEGIN, rootSuite);
          rootSuite.once(EVENT_ROOT_SUITE_RUN, prepare);
          debug("run(): waiting for green light due to --delay");
        } else {
          Runner.immediately(prepare);
        }
        return this;
      };
      Runner.prototype.linkPartialObjects = function(value) {
        return this;
      };
      Runner.prototype.runAsync = async function runAsync(opts = {}) {
        return new Promise((resolve2) => {
          this.run(resolve2, opts);
        });
      };
      Runner.prototype.abort = function() {
        debug("abort(): aborting");
        this._abort = true;
        return this;
      };
      Runner.prototype.isParallelMode = function isParallelMode() {
        return false;
      };
      Runner.prototype.workerReporter = function() {
        throw createUnsupportedError$1("workerReporter() not supported in serial mode");
      };
      function filterLeaks(ok, globals2) {
        return globals2.filter(function(key) {
          if (/^\d+/.test(key)) {
            return false;
          }
          if (commonjsGlobal.navigator && /^getInterface/.test(key)) {
            return false;
          }
          if (commonjsGlobal.navigator && /^\d+/.test(key)) {
            return false;
          }
          if (/^mocha-/.test(key)) {
            return false;
          }
          var matched = ok.filter(function(ok2) {
            if (~ok2.indexOf("*")) {
              return key.indexOf(ok2.split("*")[0]) === 0;
            }
            return key === ok2;
          });
          return !matched.length && (!commonjsGlobal.navigator || key !== "onerror");
        });
      }
      function isError(err) {
        return err instanceof Error || err && typeof err.message === "string";
      }
      function thrown2Error(err) {
        return new Error(
          `the ${utils$1.canonicalType(err)} ${stringify(
            err
          )} was thrown, throw an Error :)`
        );
      }
      Runner.constants = constants$1;
      var runner = Runner;
      (function(module3, exports2) {
        var diff2 = lib;
        var milliseconds2 = ms$1;
        var utils2 = utils$3;
        var supportsColor = require$$18;
        var symbols = browser$1;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        const isBrowser = utils2.isBrowser();
        function getBrowserWindowSize() {
          if ("innerHeight" in commonjsGlobal) {
            return [commonjsGlobal.innerHeight, commonjsGlobal.innerWidth];
          }
          return [640, 480];
        }
        exports2 = module3.exports = Base;
        var isatty = isBrowser || process2.stdout.isTTY && process2.stderr.isTTY;
        var consoleLog = console.log;
        exports2.useColors = !isBrowser && (supportsColor.stdout || process2.env.MOCHA_COLORS !== void 0);
        exports2.inlineDiffs = false;
        exports2.maxDiffSize = 8192;
        exports2.colors = {
          pass: 90,
          fail: 31,
          "bright pass": 92,
          "bright fail": 91,
          "bright yellow": 93,
          pending: 36,
          suite: 0,
          "error title": 0,
          "error message": 31,
          "error stack": 90,
          checkmark: 32,
          fast: 90,
          medium: 33,
          slow: 31,
          green: 32,
          light: 90,
          "diff gutter": 90,
          "diff added": 32,
          "diff removed": 31,
          "diff added inline": "30;42",
          "diff removed inline": "30;41"
        };
        exports2.symbols = {
          ok: symbols.success,
          err: symbols.error,
          dot: ".",
          comma: ",",
          bang: "!"
        };
        var color = exports2.color = function(type, str) {
          if (!exports2.useColors) {
            return String(str);
          }
          return "\x1B[" + exports2.colors[type] + "m" + str + "\x1B[0m";
        };
        exports2.window = {
          width: 75
        };
        if (isatty) {
          if (isBrowser) {
            exports2.window.width = getBrowserWindowSize()[1];
          } else {
            exports2.window.width = process2.stdout.getWindowSize(1)[0];
          }
        }
        exports2.cursor = {
          hide: function() {
            isatty && process2.stdout.write("\x1B[?25l");
          },
          show: function() {
            isatty && process2.stdout.write("\x1B[?25h");
          },
          deleteLine: function() {
            isatty && process2.stdout.write("\x1B[2K");
          },
          beginningOfLine: function() {
            isatty && process2.stdout.write("\x1B[0G");
          },
          CR: function() {
            if (isatty) {
              exports2.cursor.deleteLine();
              exports2.cursor.beginningOfLine();
            } else {
              process2.stdout.write("\r");
            }
          }
        };
        var showDiff = exports2.showDiff = function(err) {
          return err && err.showDiff !== false && sameType(err.actual, err.expected) && err.expected !== void 0;
        };
        function stringifyDiffObjs(err) {
          if (!utils2.isString(err.actual) || !utils2.isString(err.expected)) {
            err.actual = utils2.stringify(err.actual);
            err.expected = utils2.stringify(err.expected);
          }
        }
        var generateDiff = exports2.generateDiff = function(actual, expected) {
          try {
            var maxLen = exports2.maxDiffSize;
            var skipped = 0;
            if (maxLen > 0) {
              skipped = Math.max(actual.length - maxLen, expected.length - maxLen);
              actual = actual.slice(0, maxLen);
              expected = expected.slice(0, maxLen);
            }
            let result = exports2.inlineDiffs ? inlineDiff(actual, expected) : unifiedDiff(actual, expected);
            if (skipped > 0) {
              result = `${result}
      [mocha] output truncated to ${maxLen} characters, see "maxDiffSize" reporter-option
`;
            }
            return result;
          } catch (err) {
            var msg = "\n      " + color("diff added", "+ expected") + " " + color("diff removed", "- actual:  failed to generate Mocha diff") + "\n";
            return msg;
          }
        };
        var getFullErrorStack = function(err, seen) {
          if (seen && seen.has(err)) {
            return { message: "", msg: "<circular>", stack: "" };
          }
          var message;
          if (typeof err.inspect === "function") {
            message = err.inspect() + "";
          } else if (err.message && typeof err.message.toString === "function") {
            message = err.message + "";
          } else {
            message = "";
          }
          var msg;
          var stack = err.stack || message;
          var index = message ? stack.indexOf(message) : -1;
          if (index === -1) {
            msg = message;
          } else {
            index += message.length;
            msg = stack.slice(0, index);
            stack = stack.slice(index + 1);
            if (err.cause) {
              seen = seen || /* @__PURE__ */ new Set();
              seen.add(err);
              const causeStack = getFullErrorStack(err.cause, seen);
              stack += "\n   Caused by: " + causeStack.msg + (causeStack.stack ? "\n" + causeStack.stack : "");
            }
          }
          return {
            message,
            msg,
            stack
          };
        };
        exports2.list = function(failures) {
          var multipleErr, multipleTest;
          Base.consoleLog();
          failures.forEach(function(test3, i) {
            var fmt = color("error title", "  %s) %s:\n") + color("error message", "     %s") + color("error stack", "\n%s\n");
            var err;
            if (test3.err && test3.err.multiple) {
              if (multipleTest !== test3) {
                multipleTest = test3;
                multipleErr = [test3.err].concat(test3.err.multiple);
              }
              err = multipleErr.shift();
            } else {
              err = test3.err;
            }
            var { message, msg, stack } = getFullErrorStack(err);
            if (err.uncaught) {
              msg = "Uncaught " + msg;
            }
            if (!exports2.hideDiff && showDiff(err)) {
              stringifyDiffObjs(err);
              fmt = color("error title", "  %s) %s:\n%s") + color("error stack", "\n%s\n");
              var match = message.match(/^([^:]+): expected/);
              msg = "\n      " + color("error message", match ? match[1] : msg);
              msg += generateDiff(err.actual, err.expected);
            }
            stack = stack.replace(/^/gm, "  ");
            var testTitle = "";
            test3.titlePath().forEach(function(str, index) {
              if (index !== 0) {
                testTitle += "\n     ";
              }
              for (var i2 = 0; i2 < index; i2++) {
                testTitle += "  ";
              }
              testTitle += str;
            });
            Base.consoleLog(fmt, i + 1, testTitle, msg, stack);
          });
        };
        function Base(runner2, options) {
          var failures = this.failures = [];
          if (!runner2) {
            throw new TypeError("Missing runner argument");
          }
          this.options = options || {};
          this.runner = runner2;
          this.stats = runner2.stats;
          var maxDiffSizeOpt = this.options.reporterOption && this.options.reporterOption.maxDiffSize;
          if (maxDiffSizeOpt !== void 0 && !isNaN(Number(maxDiffSizeOpt))) {
            exports2.maxDiffSize = Number(maxDiffSizeOpt);
          }
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            if (test3.duration > test3.slow()) {
              test3.speed = "slow";
            } else if (test3.duration > test3.slow() / 2) {
              test3.speed = "medium";
            } else {
              test3.speed = "fast";
            }
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3, err) {
            if (showDiff(err)) {
              stringifyDiffObjs(err);
            }
            if (test3.err && err instanceof Error) {
              test3.err.multiple = (test3.err.multiple || []).concat(err);
            } else {
              test3.err = err;
            }
            failures.push(test3);
          });
        }
        Base.prototype.epilogue = function() {
          var stats = this.stats;
          var fmt;
          Base.consoleLog();
          fmt = color("bright pass", " ") + color("green", " %d passing") + color("light", " (%s)");
          Base.consoleLog(fmt, stats.passes || 0, milliseconds2(stats.duration));
          if (stats.pending) {
            fmt = color("pending", " ") + color("pending", " %d pending");
            Base.consoleLog(fmt, stats.pending);
          }
          if (stats.failures) {
            fmt = color("fail", "  %d failing");
            Base.consoleLog(fmt, stats.failures);
            Base.list(this.failures);
            Base.consoleLog();
          }
          Base.consoleLog();
        };
        function pad2(str, len) {
          str = String(str);
          return Array(len - str.length + 1).join(" ") + str;
        }
        function inlineDiff(actual, expected) {
          var msg = errorDiff(actual, expected);
          var lines = msg.split("\n");
          if (lines.length > 4) {
            var width = String(lines.length).length;
            msg = lines.map(function(str, i) {
              return pad2(++i, width) + " | " + str;
            }).join("\n");
          }
          msg = "\n" + color("diff removed inline", "actual") + " " + color("diff added inline", "expected") + "\n\n" + msg + "\n";
          msg = msg.replace(/^/gm, "      ");
          return msg;
        }
        function unifiedDiff(actual, expected) {
          var indent = "      ";
          function cleanUp(line2) {
            if (line2[0] === "+") {
              return indent + colorLines("diff added", line2);
            }
            if (line2[0] === "-") {
              return indent + colorLines("diff removed", line2);
            }
            if (line2.match(/@@/)) {
              return "--";
            }
            if (line2.match(/\\ No newline/)) {
              return null;
            }
            return indent + line2;
          }
          function notBlank(line2) {
            return typeof line2 !== "undefined" && line2 !== null;
          }
          var msg = diff2.createPatch("string", actual, expected);
          var lines = msg.split("\n").splice(5);
          return "\n      " + colorLines("diff added", "+ expected") + " " + colorLines("diff removed", "- actual") + "\n\n" + lines.map(cleanUp).filter(notBlank).join("\n");
        }
        function errorDiff(actual, expected) {
          return diff2.diffWordsWithSpace(actual, expected).map(function(str) {
            if (str.added) {
              return colorLines("diff added inline", str.value);
            }
            if (str.removed) {
              return colorLines("diff removed inline", str.value);
            }
            return str.value;
          }).join("");
        }
        function colorLines(name2, str) {
          return str.split("\n").map(function(str2) {
            return color(name2, str2);
          }).join("\n");
        }
        var objToString = Object.prototype.toString;
        function sameType(a, b) {
          return objToString.call(a) === objToString.call(b);
        }
        Base.consoleLog = consoleLog;
        Base.abstract = true;
      })(base$1, base$1.exports);
      var dot = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var inherits2 = utils$3.inherits;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        module3.exports = Dot;
        function Dot(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var width = Base.window.width * 0.75 | 0;
          var n = -1;
          runner2.on(EVENT_RUN_BEGIN2, function() {
            process2.stdout.write("\n");
          });
          runner2.on(EVENT_TEST_PENDING2, function() {
            if (++n % width === 0) {
              process2.stdout.write("\n  ");
            }
            process2.stdout.write(Base.color("pending", Base.symbols.comma));
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            if (++n % width === 0) {
              process2.stdout.write("\n  ");
            }
            if (test3.speed === "slow") {
              process2.stdout.write(Base.color("bright yellow", Base.symbols.dot));
            } else {
              process2.stdout.write(Base.color(test3.speed, Base.symbols.dot));
            }
          });
          runner2.on(EVENT_TEST_FAIL2, function() {
            if (++n % width === 0) {
              process2.stdout.write("\n  ");
            }
            process2.stdout.write(Base.color("fail", Base.symbols.bang));
          });
          runner2.once(EVENT_RUN_END2, function() {
            process2.stdout.write("\n");
            self2.epilogue();
          });
        }
        inherits2(Dot, Base);
        Dot.description = "dot matrix representation";
      })(dot);
      var doc = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var utils2 = utils$3;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_SUITE_BEGIN2 = constants2.EVENT_SUITE_BEGIN;
        var EVENT_SUITE_END = constants2.EVENT_SUITE_END;
        module3.exports = Doc;
        function Doc(runner2, options) {
          Base.call(this, runner2, options);
          var indents = 2;
          function indent() {
            return Array(indents).join("  ");
          }
          runner2.on(EVENT_SUITE_BEGIN2, function(suite3) {
            if (suite3.root) {
              return;
            }
            ++indents;
            Base.consoleLog('%s<section class="suite">', indent());
            ++indents;
            Base.consoleLog("%s<h1>%s</h1>", indent(), utils2.escape(suite3.title));
            Base.consoleLog("%s<dl>", indent());
          });
          runner2.on(EVENT_SUITE_END, function(suite3) {
            if (suite3.root) {
              return;
            }
            Base.consoleLog("%s</dl>", indent());
            --indents;
            Base.consoleLog("%s</section>", indent());
            --indents;
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            Base.consoleLog("%s  <dt>%s</dt>", indent(), utils2.escape(test3.title));
            Base.consoleLog("%s  <dt>%s</dt>", indent(), utils2.escape(test3.file));
            var code = utils2.escape(utils2.clean(test3.body));
            Base.consoleLog("%s  <dd><pre><code>%s</code></pre></dd>", indent(), code);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3, err) {
            Base.consoleLog(
              '%s  <dt class="error">%s</dt>',
              indent(),
              utils2.escape(test3.title)
            );
            Base.consoleLog(
              '%s  <dt class="error">%s</dt>',
              indent(),
              utils2.escape(test3.file)
            );
            var code = utils2.escape(utils2.clean(test3.body));
            Base.consoleLog(
              '%s  <dd class="error"><pre><code>%s</code></pre></dd>',
              indent(),
              code
            );
            Base.consoleLog(
              '%s  <dd class="error">%s</dd>',
              indent(),
              utils2.escape(err)
            );
          });
        }
        Doc.description = "HTML documentation";
      })(doc);
      var tap = { exports: {} };
      (function(module3, exports2) {
        var util = require$$0$1;
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var EVENT_TEST_END2 = constants2.EVENT_TEST_END;
        var inherits2 = utils$3.inherits;
        var sprintf = util.format;
        module3.exports = TAP;
        function TAP(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var n = 1;
          var tapVersion = "12";
          if (options && options.reporterOptions) {
            if (options.reporterOptions.tapVersion) {
              tapVersion = options.reporterOptions.tapVersion.toString();
            }
          }
          this._producer = createProducer(tapVersion);
          runner2.once(EVENT_RUN_BEGIN2, function() {
            self2._producer.writeVersion();
          });
          runner2.on(EVENT_TEST_END2, function() {
            ++n;
          });
          runner2.on(EVENT_TEST_PENDING2, function(test3) {
            self2._producer.writePending(n, test3);
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            self2._producer.writePass(n, test3);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3, err) {
            self2._producer.writeFail(n, test3, err);
          });
          runner2.once(EVENT_RUN_END2, function() {
            self2._producer.writeEpilogue(runner2.stats);
          });
        }
        inherits2(TAP, Base);
        function title3(test3) {
          return test3.fullTitle().replace(/#/g, "");
        }
        function println(format2, varArgs) {
          var vargs = Array.from(arguments);
          vargs[0] += "\n";
          process2.stdout.write(sprintf.apply(null, vargs));
        }
        function createProducer(tapVersion) {
          var producers = {
            12: new TAP12Producer(),
            13: new TAP13Producer()
          };
          var producer = producers[tapVersion];
          if (!producer) {
            throw new Error(
              "invalid or unsupported TAP version: " + JSON.stringify(tapVersion)
            );
          }
          return producer;
        }
        function TAPProducer() {
        }
        TAPProducer.prototype.writeVersion = function() {
        };
        TAPProducer.prototype.writePlan = function(ntests) {
          println("%d..%d", 1, ntests);
        };
        TAPProducer.prototype.writePass = function(n, test3) {
          println("ok %d %s", n, title3(test3));
        };
        TAPProducer.prototype.writePending = function(n, test3) {
          println("ok %d %s # SKIP -", n, title3(test3));
        };
        TAPProducer.prototype.writeFail = function(n, test3, err) {
          println("not ok %d %s", n, title3(test3));
        };
        TAPProducer.prototype.writeEpilogue = function(stats) {
          println("# tests " + (stats.passes + stats.failures));
          println("# pass " + stats.passes);
          println("# fail " + stats.failures);
          this.writePlan(stats.passes + stats.failures + stats.pending);
        };
        function TAP12Producer() {
          this.writeFail = function(n, test3, err) {
            TAPProducer.prototype.writeFail.call(this, n, test3, err);
            if (err.message) {
              println(err.message.replace(/^/gm, "  "));
            }
            if (err.stack) {
              println(err.stack.replace(/^/gm, "  "));
            }
          };
        }
        inherits2(TAP12Producer, TAPProducer);
        function TAP13Producer() {
          this.writeVersion = function() {
            println("TAP version 13");
          };
          this.writeFail = function(n, test3, err) {
            TAPProducer.prototype.writeFail.call(this, n, test3, err);
            var emitYamlBlock = err.message != null || err.stack != null;
            if (emitYamlBlock) {
              println(indent(1) + "---");
              if (err.message) {
                println(indent(2) + "message: |-");
                println(err.message.replace(/^/gm, indent(3)));
              }
              if (err.stack) {
                println(indent(2) + "stack: |-");
                println(err.stack.replace(/^/gm, indent(3)));
              }
              println(indent(1) + "...");
            }
          };
          function indent(level) {
            return Array(level + 1).join("  ");
          }
        }
        inherits2(TAP13Producer, TAPProducer);
        TAP.description = "TAP-compatible output";
      })(tap);
      var json = { exports: {} };
      var _polyfillNode_fs = {};
      var _polyfillNode_fs$1 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        "default": _polyfillNode_fs
      });
      var require$$2 = /* @__PURE__ */ getAugmentedNamespace(_polyfillNode_fs$1);
      (function(module3, exports2) {
        var Base = base$1.exports;
        var fs = require$$2;
        var path = require$$1;
        const createUnsupportedError2 = errors$2.createUnsupportedError;
        const utils2 = utils$3;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_TEST_END2 = constants2.EVENT_TEST_END;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        module3.exports = JSONReporter;
        function JSONReporter(runner2, options = {}) {
          Base.call(this, runner2, options);
          var self2 = this;
          var tests = [];
          var pending2 = [];
          var failures = [];
          var passes = [];
          var output;
          if (options.reporterOption && options.reporterOption.output) {
            if (utils2.isBrowser()) {
              throw createUnsupportedError2("file output not supported in browser");
            }
            output = options.reporterOption.output;
          }
          runner2.on(EVENT_TEST_END2, function(test3) {
            tests.push(test3);
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            passes.push(test3);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3) {
            failures.push(test3);
          });
          runner2.on(EVENT_TEST_PENDING2, function(test3) {
            pending2.push(test3);
          });
          runner2.once(EVENT_RUN_END2, function() {
            var obj = {
              stats: self2.stats,
              tests: tests.map(clean),
              pending: pending2.map(clean),
              failures: failures.map(clean),
              passes: passes.map(clean)
            };
            runner2.testResults = obj;
            var json2 = JSON.stringify(obj, null, 2);
            if (output) {
              try {
                fs.mkdirSync(path.dirname(output), { recursive: true });
                fs.writeFileSync(output, json2);
              } catch (err) {
                console.error(
                  `${Base.symbols.err} [mocha] writing output to "${output}" failed: ${err.message}
`
                );
                process2.stdout.write(json2);
              }
            } else {
              process2.stdout.write(json2);
            }
          });
        }
        function clean(test3) {
          var err = test3.err || {};
          if (err instanceof Error) {
            err = errorJSON(err);
          }
          return {
            title: test3.title,
            fullTitle: test3.fullTitle(),
            file: test3.file,
            duration: test3.duration,
            currentRetry: test3.currentRetry(),
            speed: test3.speed,
            err: cleanCycles(err)
          };
        }
        function cleanCycles(obj) {
          var cache = [];
          return JSON.parse(
            JSON.stringify(obj, function(key, value) {
              if (typeof value === "object" && value !== null) {
                if (cache.indexOf(value) !== -1) {
                  return "" + value;
                }
                cache.push(value);
              }
              return value;
            })
          );
        }
        function errorJSON(err) {
          var res = {};
          Object.getOwnPropertyNames(err).forEach(function(key) {
            res[key] = err[key];
          }, err);
          return res;
        }
        JSONReporter.description = "single JSON object";
      })(json);
      var html = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var utils2 = utils$3;
        var escapeRe = escapeStringRegexp;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_SUITE_BEGIN2 = constants2.EVENT_SUITE_BEGIN;
        var EVENT_SUITE_END = constants2.EVENT_SUITE_END;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var escape = utils2.escape;
        var Date2 = commonjsGlobal.Date;
        module3.exports = HTML;
        var statsTemplate = '<ul id="mocha-stats"><li class="result"></li><li class="progress-contain"><progress class="progress-element" max="100" value="0"></progress><svg class="progress-ring"><circle class="ring-flatlight" stroke-dasharray="100%,0%"/><circle class="ring-highlight" stroke-dasharray="0%,100%"/></svg><div class="progress-text">0%</div></li><li class="passes"><a href="javascript:void(0);">passes:</a> <em>0</em></li><li class="failures"><a href="javascript:void(0);">failures:</a> <em>0</em></li><li class="duration">duration: <em>0</em>s</li></ul>';
        var playIcon = "&#x2023;";
        function HTML(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var stats = this.stats;
          var stat = fragment(statsTemplate);
          var items = stat.getElementsByTagName("li");
          const resultIndex = 0;
          const progressIndex = 1;
          const passesIndex = 2;
          const failuresIndex = 3;
          const durationIndex = 4;
          var resultIndicator = items[resultIndex];
          const passesStat = items[passesIndex];
          const passesCount = passesStat.getElementsByTagName("em")[0];
          const passesLink = passesStat.getElementsByTagName("a")[0];
          const failuresStat = items[failuresIndex];
          const failuresCount = failuresStat.getElementsByTagName("em")[0];
          const failuresLink = failuresStat.getElementsByTagName("a")[0];
          var duration = items[durationIndex].getElementsByTagName("em")[0];
          var report = fragment('<ul id="mocha-report"></ul>');
          var stack = [report];
          var progressText = items[progressIndex].getElementsByTagName("div")[0];
          var progressBar = items[progressIndex].getElementsByTagName("progress")[0];
          var progressRing = [
            items[progressIndex].getElementsByClassName("ring-flatlight")[0],
            items[progressIndex].getElementsByClassName("ring-highlight")[0]
          ];
          var root = document.getElementById("mocha");
          if (!root) {
            return error("#mocha div missing, add it to your document");
          }
          on3(passesLink, "click", function(evt) {
            evt.preventDefault();
            unhide();
            var name2 = /pass/.test(report.className) ? "" : " pass";
            report.className = report.className.replace(/fail|pass/g, "") + name2;
            if (report.className.trim()) {
              hideSuitesWithout("test pass");
            }
          });
          on3(failuresLink, "click", function(evt) {
            evt.preventDefault();
            unhide();
            var name2 = /fail/.test(report.className) ? "" : " fail";
            report.className = report.className.replace(/fail|pass/g, "") + name2;
            if (report.className.trim()) {
              hideSuitesWithout("test fail");
            }
          });
          root.appendChild(stat);
          root.appendChild(report);
          runner2.on(EVENT_SUITE_BEGIN2, function(suite3) {
            if (suite3.root) {
              return;
            }
            var url = self2.suiteURL(suite3);
            var el = fragment(
              '<li class="suite"><h1><a href="%s">%s</a></h1></li>',
              url,
              escape(suite3.title)
            );
            stack[0].appendChild(el);
            stack.unshift(document.createElement("ul"));
            el.appendChild(stack[0]);
          });
          runner2.on(EVENT_SUITE_END, function(suite3) {
            if (suite3.root) {
              if (stats.failures === 0) {
                text(resultIndicator, "\u2713");
                stat.className += " pass";
              }
              updateStats();
              return;
            }
            stack.shift();
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            var url = self2.testURL(test3);
            var markup = '<li class="test pass %e"><h2>%e<span class="duration">%ems</span> <a href="%s" class="replay">' + playIcon + "</a></h2></li>";
            var el = fragment(markup, test3.speed, test3.title, test3.duration, url);
            self2.addCodeToggle(el, test3.body);
            appendToStack(el);
            updateStats();
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3) {
            text(resultIndicator, "\u2716");
            stat.className += " fail";
            var el = fragment(
              '<li class="test fail"><h2>%e <a href="%e" class="replay">' + playIcon + "</a></h2></li>",
              test3.title,
              self2.testURL(test3)
            );
            var stackString;
            var message = test3.err.toString();
            if (message === "[object Error]") {
              message = test3.err.message;
            }
            if (test3.err.stack) {
              var indexOfMessage = test3.err.stack.indexOf(test3.err.message);
              if (indexOfMessage === -1) {
                stackString = test3.err.stack;
              } else {
                stackString = test3.err.stack.slice(
                  test3.err.message.length + indexOfMessage
                );
              }
            } else if (test3.err.sourceURL && test3.err.line !== void 0) {
              stackString = "\n(" + test3.err.sourceURL + ":" + test3.err.line + ")";
            }
            stackString = stackString || "";
            if (test3.err.htmlMessage && stackString) {
              el.appendChild(
                fragment(
                  '<div class="html-error">%s\n<pre class="error">%e</pre></div>',
                  test3.err.htmlMessage,
                  stackString
                )
              );
            } else if (test3.err.htmlMessage) {
              el.appendChild(
                fragment('<div class="html-error">%s</div>', test3.err.htmlMessage)
              );
            } else {
              el.appendChild(
                fragment('<pre class="error">%e%e</pre>', message, stackString)
              );
            }
            self2.addCodeToggle(el, test3.body);
            appendToStack(el);
            updateStats();
          });
          runner2.on(EVENT_TEST_PENDING2, function(test3) {
            var el = fragment(
              '<li class="test pass pending"><h2>%e</h2></li>',
              test3.title
            );
            appendToStack(el);
            updateStats();
          });
          function appendToStack(el) {
            if (stack[0]) {
              stack[0].appendChild(el);
            }
          }
          function updateStats() {
            var percent = stats.tests / runner2.total * 100 | 0;
            progressBar.value = percent;
            if (progressText) {
              var decimalPlaces = Math.ceil(Math.log10(runner2.total / 100));
              text(
                progressText,
                percent.toFixed(Math.min(Math.max(decimalPlaces, 0), 100)) + "%"
              );
            }
            if (progressRing) {
              var radius = parseFloat(getComputedStyle(progressRing[0]).getPropertyValue("r"));
              var wholeArc = Math.PI * 2 * radius;
              var highlightArc = percent * (wholeArc / 100);
              progressRing[0].style["stroke-dasharray"] = `0,${highlightArc}px,${wholeArc}px`;
              progressRing[1].style["stroke-dasharray"] = `${highlightArc}px,${wholeArc}px`;
            }
            var ms2 = new Date2() - stats.start;
            text(passesCount, stats.passes);
            text(failuresCount, stats.failures);
            text(duration, (ms2 / 1e3).toFixed(2));
          }
        }
        function makeUrl(s2) {
          var search = window.location.search;
          if (search) {
            search = search.replace(/[?&](?:f?grep|invert)=[^&\s]*/g, "").replace(/^&/, "?");
          }
          return window.location.pathname + (search ? search + "&" : "?") + "grep=" + encodeURIComponent(s2);
        }
        HTML.prototype.suiteURL = function(suite3) {
          return makeUrl("^" + escapeRe(suite3.fullTitle()) + " ");
        };
        HTML.prototype.testURL = function(test3) {
          return makeUrl("^" + escapeRe(test3.fullTitle()) + "$");
        };
        HTML.prototype.addCodeToggle = function(el, contents) {
          var h2 = el.getElementsByTagName("h2")[0];
          on3(h2, "click", function() {
            pre.style.display = pre.style.display === "none" ? "block" : "none";
          });
          var pre = fragment("<pre><code>%e</code></pre>", utils2.clean(contents));
          el.appendChild(pre);
          pre.style.display = "none";
        };
        function error(msg) {
          document.body.appendChild(fragment('<div id="mocha-error">%s</div>', msg));
        }
        function fragment(html2) {
          var args = arguments;
          var div = document.createElement("div");
          var i = 1;
          div.innerHTML = html2.replace(/%([se])/g, function(_, type) {
            switch (type) {
              case "s":
                return String(args[i++]);
              case "e":
                return escape(args[i++]);
            }
          });
          return div.firstChild;
        }
        function hideSuitesWithout(classname) {
          var suites = document.getElementsByClassName("suite");
          for (var i = 0; i < suites.length; i++) {
            var els = suites[i].getElementsByClassName(classname);
            if (!els.length) {
              suites[i].className += " hidden";
            }
          }
        }
        function unhide() {
          var els = document.getElementsByClassName("suite hidden");
          while (els.length > 0) {
            els[0].className = els[0].className.replace("suite hidden", "suite");
          }
        }
        function text(el, contents) {
          if (el.textContent) {
            el.textContent = contents;
          } else {
            el.innerText = contents;
          }
        }
        function on3(el, event, fn) {
          if (el.addEventListener) {
            el.addEventListener(event, fn, false);
          } else {
            el.attachEvent("on" + event, fn);
          }
        }
        HTML.browserOnly = true;
      })(html);
      var list = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var inherits2 = utils$3.inherits;
        var constants2 = runner.constants;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_BEGIN = constants2.EVENT_TEST_BEGIN;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var color = Base.color;
        var cursor = Base.cursor;
        module3.exports = List;
        function List(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var n = 0;
          runner2.on(EVENT_RUN_BEGIN2, function() {
            Base.consoleLog();
          });
          runner2.on(EVENT_TEST_BEGIN, function(test3) {
            process2.stdout.write(color("pass", "    " + test3.fullTitle() + ": "));
          });
          runner2.on(EVENT_TEST_PENDING2, function(test3) {
            var fmt = color("checkmark", "  -") + color("pending", " %s");
            Base.consoleLog(fmt, test3.fullTitle());
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            var fmt = color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s: ") + color(test3.speed, "%dms");
            cursor.CR();
            Base.consoleLog(fmt, test3.fullTitle(), test3.duration);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3) {
            cursor.CR();
            Base.consoleLog(color("fail", "  %d) %s"), ++n, test3.fullTitle());
          });
          runner2.once(EVENT_RUN_END2, self2.epilogue.bind(self2));
        }
        inherits2(List, Base);
        List.description = 'like "spec" reporter but flat';
      })(list);
      var min = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var inherits2 = utils$3.inherits;
        var constants2 = runner.constants;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        module3.exports = Min;
        function Min(runner2, options) {
          Base.call(this, runner2, options);
          runner2.on(EVENT_RUN_BEGIN2, function() {
            process2.stdout.write("\x1B[2J");
            process2.stdout.write("\x1B[1;3H");
          });
          runner2.once(EVENT_RUN_END2, this.epilogue.bind(this));
        }
        inherits2(Min, Base);
        Min.description = "essentially just a summary";
      })(min);
      var spec = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_SUITE_BEGIN2 = constants2.EVENT_SUITE_BEGIN;
        var EVENT_SUITE_END = constants2.EVENT_SUITE_END;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var inherits2 = utils$3.inherits;
        var color = Base.color;
        module3.exports = Spec;
        function Spec(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var indents = 0;
          var n = 0;
          function indent() {
            return Array(indents).join("  ");
          }
          runner2.on(EVENT_RUN_BEGIN2, function() {
            Base.consoleLog();
          });
          runner2.on(EVENT_SUITE_BEGIN2, function(suite3) {
            ++indents;
            Base.consoleLog(color("suite", "%s%s"), indent(), suite3.title);
          });
          runner2.on(EVENT_SUITE_END, function() {
            --indents;
            if (indents === 1) {
              Base.consoleLog();
            }
          });
          runner2.on(EVENT_TEST_PENDING2, function(test3) {
            var fmt = indent() + color("pending", "  - %s");
            Base.consoleLog(fmt, test3.title);
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            var fmt;
            if (test3.speed === "fast") {
              fmt = indent() + color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s");
              Base.consoleLog(fmt, test3.title);
            } else {
              fmt = indent() + color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s") + color(test3.speed, " (%dms)");
              Base.consoleLog(fmt, test3.title, test3.duration);
            }
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3) {
            Base.consoleLog(indent() + color("fail", "  %d) %s"), ++n, test3.title);
          });
          runner2.once(EVENT_RUN_END2, self2.epilogue.bind(self2));
        }
        inherits2(Spec, Base);
        Spec.description = "hierarchical & verbose [default]";
      })(spec);
      var nyan = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var inherits2 = utils$3.inherits;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        module3.exports = NyanCat;
        function NyanCat(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var width = Base.window.width * 0.75 | 0;
          var nyanCatWidth = this.nyanCatWidth = 11;
          this.colorIndex = 0;
          this.numberOfLines = 4;
          this.rainbowColors = self2.generateColors();
          this.scoreboardWidth = 5;
          this.tick = 0;
          this.trajectories = [[], [], [], []];
          this.trajectoryWidthMax = width - nyanCatWidth;
          runner2.on(EVENT_RUN_BEGIN2, function() {
            Base.cursor.hide();
            self2.draw();
          });
          runner2.on(EVENT_TEST_PENDING2, function() {
            self2.draw();
          });
          runner2.on(EVENT_TEST_PASS2, function() {
            self2.draw();
          });
          runner2.on(EVENT_TEST_FAIL2, function() {
            self2.draw();
          });
          runner2.once(EVENT_RUN_END2, function() {
            Base.cursor.show();
            for (var i = 0; i < self2.numberOfLines; i++) {
              process2.stdout.write("\n");
            }
            self2.epilogue();
          });
        }
        inherits2(NyanCat, Base);
        NyanCat.prototype.draw = function() {
          this.appendRainbow();
          this.drawScoreboard();
          this.drawRainbow();
          this.drawNyanCat();
          this.tick = !this.tick;
        };
        NyanCat.prototype.drawScoreboard = function() {
          var stats = this.stats;
          function draw(type, n) {
            process2.stdout.write(" ");
            process2.stdout.write(Base.color(type, n));
            process2.stdout.write("\n");
          }
          draw("green", stats.passes);
          draw("fail", stats.failures);
          draw("pending", stats.pending);
          process2.stdout.write("\n");
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.appendRainbow = function() {
          var segment = this.tick ? "_" : "-";
          var rainbowified = this.rainbowify(segment);
          for (var index = 0; index < this.numberOfLines; index++) {
            var trajectory = this.trajectories[index];
            if (trajectory.length >= this.trajectoryWidthMax) {
              trajectory.shift();
            }
            trajectory.push(rainbowified);
          }
        };
        NyanCat.prototype.drawRainbow = function() {
          var self2 = this;
          this.trajectories.forEach(function(line2) {
            process2.stdout.write("\x1B[" + self2.scoreboardWidth + "C");
            process2.stdout.write(line2.join(""));
            process2.stdout.write("\n");
          });
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.drawNyanCat = function() {
          var self2 = this;
          var startWidth = this.scoreboardWidth + this.trajectories[0].length;
          var dist = "\x1B[" + startWidth + "C";
          var padding = "";
          process2.stdout.write(dist);
          process2.stdout.write("_,------,");
          process2.stdout.write("\n");
          process2.stdout.write(dist);
          padding = self2.tick ? "  " : "   ";
          process2.stdout.write("_|" + padding + "/\\_/\\ ");
          process2.stdout.write("\n");
          process2.stdout.write(dist);
          padding = self2.tick ? "_" : "__";
          var tail = self2.tick ? "~" : "^";
          process2.stdout.write(tail + "|" + padding + this.face() + " ");
          process2.stdout.write("\n");
          process2.stdout.write(dist);
          padding = self2.tick ? " " : "  ";
          process2.stdout.write(padding + '""  "" ');
          process2.stdout.write("\n");
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.face = function() {
          var stats = this.stats;
          if (stats.failures) {
            return "( x .x)";
          } else if (stats.pending) {
            return "( o .o)";
          } else if (stats.passes) {
            return "( ^ .^)";
          }
          return "( - .-)";
        };
        NyanCat.prototype.cursorUp = function(n) {
          process2.stdout.write("\x1B[" + n + "A");
        };
        NyanCat.prototype.cursorDown = function(n) {
          process2.stdout.write("\x1B[" + n + "B");
        };
        NyanCat.prototype.generateColors = function() {
          var colors = [];
          for (var i = 0; i < 6 * 7; i++) {
            var pi3 = Math.floor(Math.PI / 3);
            var n = i * (1 / 6);
            var r = Math.floor(3 * Math.sin(n) + 3);
            var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);
            var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);
            colors.push(36 * r + 6 * g + b + 16);
          }
          return colors;
        };
        NyanCat.prototype.rainbowify = function(str) {
          if (!Base.useColors) {
            return str;
          }
          var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];
          this.colorIndex += 1;
          return "\x1B[38;5;" + color + "m" + str + "\x1B[0m";
        };
        NyanCat.description = '"nyan cat"';
      })(nyan);
      var xunit = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var utils2 = utils$3;
        var fs = require$$2;
        var path = require$$1;
        var errors2 = errors$2;
        var createUnsupportedError2 = errors2.createUnsupportedError;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_PENDING2 = constants2.EVENT_TEST_PENDING;
        var STATE_FAILED2 = runnable.constants.STATE_FAILED;
        var inherits2 = utils2.inherits;
        var escape = utils2.escape;
        var Date2 = commonjsGlobal.Date;
        module3.exports = XUnit;
        function XUnit(runner2, options) {
          Base.call(this, runner2, options);
          var stats = this.stats;
          var tests = [];
          var self2 = this;
          var suiteName;
          var DEFAULT_SUITE_NAME = "Mocha Tests";
          if (options && options.reporterOptions) {
            if (options.reporterOptions.output) {
              if (!fs.createWriteStream) {
                throw createUnsupportedError2("file output not supported in browser");
              }
              fs.mkdirSync(path.dirname(options.reporterOptions.output), {
                recursive: true
              });
              self2.fileStream = fs.createWriteStream(options.reporterOptions.output);
            }
            suiteName = options.reporterOptions.suiteName;
          }
          suiteName = suiteName || DEFAULT_SUITE_NAME;
          runner2.on(EVENT_TEST_PENDING2, function(test3) {
            tests.push(test3);
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            tests.push(test3);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3) {
            tests.push(test3);
          });
          runner2.once(EVENT_RUN_END2, function() {
            self2.write(
              tag(
                "testsuite",
                {
                  name: suiteName,
                  tests: stats.tests,
                  failures: 0,
                  errors: stats.failures,
                  skipped: stats.tests - stats.failures - stats.passes,
                  timestamp: new Date2().toUTCString(),
                  time: stats.duration / 1e3 || 0
                },
                false
              )
            );
            tests.forEach(function(t) {
              self2.test(t);
            });
            self2.write("</testsuite>");
          });
        }
        inherits2(XUnit, Base);
        XUnit.prototype.done = function(failures, fn) {
          if (this.fileStream) {
            this.fileStream.end(function() {
              fn(failures);
            });
          } else {
            fn(failures);
          }
        };
        XUnit.prototype.write = function(line2) {
          if (this.fileStream) {
            this.fileStream.write(line2 + "\n");
          } else if (typeof process2 === "object" && process2.stdout) {
            process2.stdout.write(line2 + "\n");
          } else {
            Base.consoleLog(line2);
          }
        };
        XUnit.prototype.test = function(test3) {
          Base.useColors = false;
          var attrs = {
            classname: test3.parent.fullTitle(),
            name: test3.title,
            file: test3.file,
            time: test3.duration / 1e3 || 0
          };
          if (test3.state === STATE_FAILED2) {
            var err = test3.err;
            var diff2 = !Base.hideDiff && Base.showDiff(err) ? "\n" + Base.generateDiff(err.actual, err.expected) : "";
            this.write(
              tag(
                "testcase",
                attrs,
                false,
                tag(
                  "failure",
                  {},
                  false,
                  escape(err.message) + escape(diff2) + "\n" + escape(err.stack)
                )
              )
            );
          } else if (test3.isPending()) {
            this.write(tag("testcase", attrs, false, tag("skipped", {}, true)));
          } else {
            this.write(tag("testcase", attrs, true));
          }
        };
        function tag(name2, attrs, close, content) {
          var end = close ? "/>" : ">";
          var pairs = [];
          var tag2;
          for (var key in attrs) {
            if (Object.prototype.hasOwnProperty.call(attrs, key)) {
              pairs.push(key + '="' + escape(attrs[key]) + '"');
            }
          }
          tag2 = "<" + name2 + (pairs.length ? " " + pairs.join(" ") : "") + end;
          if (content) {
            tag2 += content + "</" + name2 + end;
          }
          return tag2;
        }
        XUnit.description = "XUnit-compatible XML output";
      })(xunit);
      var markdown = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var utils2 = utils$3;
        var constants2 = runner.constants;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_SUITE_BEGIN2 = constants2.EVENT_SUITE_BEGIN;
        var EVENT_SUITE_END = constants2.EVENT_SUITE_END;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var SUITE_PREFIX = "$";
        module3.exports = Markdown;
        function Markdown(runner2, options) {
          Base.call(this, runner2, options);
          var level = 0;
          var buf = "";
          function title3(str) {
            return Array(level).join("#") + " " + str;
          }
          function mapTOC(suite3, obj) {
            var ret = obj;
            var key = SUITE_PREFIX + suite3.title;
            obj = obj[key] = obj[key] || { suite: suite3 };
            suite3.suites.forEach(function(suite4) {
              mapTOC(suite4, obj);
            });
            return ret;
          }
          function stringifyTOC(obj, level2) {
            ++level2;
            var buf2 = "";
            var link;
            for (var key in obj) {
              if (key === "suite") {
                continue;
              }
              if (key !== SUITE_PREFIX) {
                link = " - [" + key.substring(1) + "]";
                link += "(#" + utils2.slug(obj[key].suite.fullTitle()) + ")\n";
                buf2 += Array(level2).join("  ") + link;
              }
              buf2 += stringifyTOC(obj[key], level2);
            }
            return buf2;
          }
          function generateTOC(suite3) {
            var obj = mapTOC(suite3, {});
            return stringifyTOC(obj, 0);
          }
          generateTOC(runner2.suite);
          runner2.on(EVENT_SUITE_BEGIN2, function(suite3) {
            ++level;
            var slug = utils2.slug(suite3.fullTitle());
            buf += '<a name="' + slug + '"></a>\n';
            buf += title3(suite3.title) + "\n";
          });
          runner2.on(EVENT_SUITE_END, function() {
            --level;
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            var code = utils2.clean(test3.body);
            buf += test3.title + ".\n";
            buf += "\n```js\n";
            buf += code + "\n";
            buf += "```\n\n";
          });
          runner2.once(EVENT_RUN_END2, function() {
            process2.stdout.write("# TOC\n");
            process2.stdout.write(generateTOC(runner2.suite));
            process2.stdout.write(buf);
          });
        }
        Markdown.description = "GitHub Flavored Markdown";
      })(markdown);
      var progress = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_TEST_END2 = constants2.EVENT_TEST_END;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var inherits2 = utils$3.inherits;
        var color = Base.color;
        var cursor = Base.cursor;
        module3.exports = Progress;
        Base.colors.progress = 90;
        function Progress(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var width = Base.window.width * 0.5 | 0;
          var total = runner2.total;
          var complete = 0;
          var lastN = -1;
          options = options || {};
          var reporterOptions = options.reporterOptions || {};
          options.open = reporterOptions.open || "[";
          options.complete = reporterOptions.complete || "\u25AC";
          options.incomplete = reporterOptions.incomplete || Base.symbols.dot;
          options.close = reporterOptions.close || "]";
          options.verbose = reporterOptions.verbose || false;
          runner2.on(EVENT_RUN_BEGIN2, function() {
            process2.stdout.write("\n");
            cursor.hide();
          });
          runner2.on(EVENT_TEST_END2, function() {
            complete++;
            var percent = complete / total;
            var n = width * percent | 0;
            var i = width - n;
            if (n === lastN && !options.verbose) {
              return;
            }
            lastN = n;
            cursor.CR();
            process2.stdout.write("\x1B[J");
            process2.stdout.write(color("progress", "  " + options.open));
            process2.stdout.write(Array(n).join(options.complete));
            process2.stdout.write(Array(i).join(options.incomplete));
            process2.stdout.write(color("progress", options.close));
            if (options.verbose) {
              process2.stdout.write(color("progress", " " + complete + " of " + total));
            }
          });
          runner2.once(EVENT_RUN_END2, function() {
            cursor.show();
            process2.stdout.write("\n");
            self2.epilogue();
          });
        }
        inherits2(Progress, Base);
        Progress.description = "a progress bar";
      })(progress);
      var landing = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var inherits2 = utils$3.inherits;
        var constants2 = runner.constants;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        var EVENT_TEST_END2 = constants2.EVENT_TEST_END;
        var STATE_FAILED2 = runnable.constants.STATE_FAILED;
        var cursor = Base.cursor;
        var color = Base.color;
        module3.exports = Landing;
        Base.colors.plane = 0;
        Base.colors["plane crash"] = 31;
        Base.colors.runway = 90;
        function Landing(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var width = Base.window.width * 0.75 | 0;
          var stream = process2.stdout;
          var plane = color("plane", "\u2708");
          var crashed = -1;
          var n = 0;
          var total = 0;
          function runway() {
            var buf = Array(width).join("-");
            return "  " + color("runway", buf);
          }
          runner2.on(EVENT_RUN_BEGIN2, function() {
            stream.write("\n\n\n  ");
            cursor.hide();
          });
          runner2.on(EVENT_TEST_END2, function(test3) {
            var col = crashed === -1 ? width * ++n / ++total | 0 : crashed;
            if (test3.state === STATE_FAILED2) {
              plane = color("plane crash", "\u2708");
              crashed = col;
            }
            stream.write("\x1B[" + (width + 1) + "D\x1B[2A");
            stream.write(runway());
            stream.write("\n  ");
            stream.write(color("runway", Array(col).join("\u22C5")));
            stream.write(plane);
            stream.write(color("runway", Array(width - col).join("\u22C5") + "\n"));
            stream.write(runway());
            stream.write("\x1B[0m");
          });
          runner2.once(EVENT_RUN_END2, function() {
            cursor.show();
            process2.stdout.write("\n");
            self2.epilogue();
          });
          process2.once("SIGINT", function() {
            cursor.show();
            nextTick$1(function() {
              process2.kill(process2.pid, "SIGINT");
            });
          });
        }
        inherits2(Landing, Base);
        Landing.description = "Unicode landing strip";
      })(landing);
      var jsonStream = { exports: {} };
      (function(module3, exports2) {
        var Base = base$1.exports;
        var constants2 = runner.constants;
        var EVENT_TEST_PASS2 = constants2.EVENT_TEST_PASS;
        var EVENT_TEST_FAIL2 = constants2.EVENT_TEST_FAIL;
        var EVENT_RUN_BEGIN2 = constants2.EVENT_RUN_BEGIN;
        var EVENT_RUN_END2 = constants2.EVENT_RUN_END;
        module3.exports = JSONStream;
        function JSONStream(runner2, options) {
          Base.call(this, runner2, options);
          var self2 = this;
          var total = runner2.total;
          runner2.once(EVENT_RUN_BEGIN2, function() {
            writeEvent(["start", { total }]);
          });
          runner2.on(EVENT_TEST_PASS2, function(test3) {
            writeEvent(["pass", clean(test3)]);
          });
          runner2.on(EVENT_TEST_FAIL2, function(test3, err) {
            test3 = clean(test3);
            test3.err = err.message;
            test3.stack = err.stack || null;
            writeEvent(["fail", test3]);
          });
          runner2.once(EVENT_RUN_END2, function() {
            writeEvent(["end", self2.stats]);
          });
        }
        function writeEvent(event) {
          process2.stdout.write(JSON.stringify(event) + "\n");
        }
        function clean(test3) {
          return {
            title: test3.title,
            fullTitle: test3.fullTitle(),
            file: test3.file,
            duration: test3.duration,
            currentRetry: test3.currentRetry(),
            speed: test3.speed
          };
        }
        JSONStream.description = "newline delimited JSON events";
      })(jsonStream);
      (function(exports2) {
        exports2.Base = exports2.base = base$1.exports;
        exports2.Dot = exports2.dot = dot.exports;
        exports2.Doc = exports2.doc = doc.exports;
        exports2.TAP = exports2.tap = tap.exports;
        exports2.JSON = exports2.json = json.exports;
        exports2.HTML = exports2.html = html.exports;
        exports2.List = exports2.list = list.exports;
        exports2.Min = exports2.min = min.exports;
        exports2.Spec = exports2.spec = spec.exports;
        exports2.Nyan = exports2.nyan = nyan.exports;
        exports2.XUnit = exports2.xunit = xunit.exports;
        exports2.Markdown = exports2.markdown = markdown.exports;
        exports2.Progress = exports2.progress = progress.exports;
        exports2.Landing = exports2.landing = landing.exports;
        exports2.JSONStream = exports2["json-stream"] = jsonStream.exports;
      })(reporters);
      var diff = true;
      var extension = [
        "js",
        "cjs",
        "mjs"
      ];
      var reporter = "spec";
      var slow = 75;
      var timeout = 2e3;
      var ui = "bdd";
      var require$$4 = {
        diff,
        extension,
        "package": "./package.json",
        reporter,
        slow,
        timeout,
        ui,
        "watch-ignore": [
          "node_modules",
          ".git"
        ]
      };
      var constants = runner.constants;
      var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
      var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
      var EVENT_SUITE_BEGIN = constants.EVENT_SUITE_BEGIN;
      var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
      var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
      var EVENT_RUN_END = constants.EVENT_RUN_END;
      var EVENT_TEST_END = constants.EVENT_TEST_END;
      var Date$2 = commonjsGlobal.Date;
      function createStatsCollector(runner2) {
        var stats = {
          suites: 0,
          tests: 0,
          passes: 0,
          pending: 0,
          failures: 0
        };
        if (!runner2) {
          throw new TypeError("Missing runner argument");
        }
        runner2.stats = stats;
        runner2.once(EVENT_RUN_BEGIN, function() {
          stats.start = new Date$2();
        });
        runner2.on(EVENT_SUITE_BEGIN, function(suite3) {
          suite3.root || stats.suites++;
        });
        runner2.on(EVENT_TEST_PASS, function() {
          stats.passes++;
        });
        runner2.on(EVENT_TEST_FAIL, function() {
          stats.failures++;
        });
        runner2.on(EVENT_TEST_PENDING, function() {
          stats.pending++;
        });
        runner2.on(EVENT_TEST_END, function() {
          stats.tests++;
        });
        runner2.once(EVENT_RUN_END, function() {
          stats.end = new Date$2();
          stats.duration = stats.end - stats.start;
        });
      }
      var statsCollector = createStatsCollector;
      var interfaces = {};
      var bdd = { exports: {} };
      var Runnable = runnable;
      var utils = utils$3;
      var errors$1 = errors$2;
      var createInvalidArgumentTypeError = errors$1.createInvalidArgumentTypeError;
      var isString = utils.isString;
      const { MOCHA_ID_PROP_NAME } = utils.constants;
      var test2 = Test$4;
      function Test$4(title3, fn) {
        if (!isString(title3)) {
          throw createInvalidArgumentTypeError(
            'Test argument "title" should be a string. Received type "' + typeof title3 + '"',
            "title",
            "string"
          );
        }
        this.type = "test";
        Runnable.call(this, title3, fn);
        this.reset();
      }
      utils.inherits(Test$4, Runnable);
      Test$4.prototype.reset = function() {
        Runnable.prototype.reset.call(this);
        this.pending = !this.fn;
        delete this.state;
      };
      Test$4.prototype.retriedTest = function(n) {
        if (!arguments.length) {
          return this._retriedTest;
        }
        this._retriedTest = n;
      };
      Test$4.prototype.markOnly = function() {
        this.parent.appendOnlyTest(this);
      };
      Test$4.prototype.clone = function() {
        var test3 = new Test$4(this.title, this.fn);
        test3.timeout(this.timeout());
        test3.slow(this.slow());
        test3.retries(this.retries());
        test3.currentRetry(this.currentRetry());
        test3.retriedTest(this.retriedTest() || this);
        test3.globals(this.globals());
        test3.parent = this.parent;
        test3.file = this.file;
        test3.ctx = this.ctx;
        return test3;
      };
      Test$4.prototype.serialize = function serialize() {
        return {
          $$currentRetry: this._currentRetry,
          $$fullTitle: this.fullTitle(),
          $$isPending: Boolean(this.pending),
          $$retriedTest: this._retriedTest || null,
          $$slow: this._slow,
          $$titlePath: this.titlePath(),
          body: this.body,
          duration: this.duration,
          err: this.err,
          parent: {
            $$fullTitle: this.parent.fullTitle(),
            [MOCHA_ID_PROP_NAME]: this.parent.id
          },
          speed: this.speed,
          state: this.state,
          title: this.title,
          type: this.type,
          file: this.file,
          [MOCHA_ID_PROP_NAME]: this.id
        };
      };
      var Suite$1 = suite2.exports;
      var errors = errors$2;
      var createMissingArgumentError = errors.createMissingArgumentError;
      var createUnsupportedError = errors.createUnsupportedError;
      var createForbiddenExclusivityError = errors.createForbiddenExclusivityError;
      var common = function(suites, context2, mocha3) {
        function shouldBeTested(suite3) {
          return !mocha3.options.grep || mocha3.options.grep && mocha3.options.grep.test(suite3.fullTitle()) && !mocha3.options.invert;
        }
        return {
          /**
           * This is only present if flag --delay is passed into Mocha. It triggers
           * root suite execution.
           *
           * @param {Suite} suite The root suite.
           * @return {Function} A function which runs the root suite
           */
          runWithSuite: function runWithSuite(suite3) {
            return function run2() {
              suite3.run();
            };
          },
          /**
           * Execute before running tests.
           *
           * @param {string} name
           * @param {Function} fn
           */
          before: function(name2, fn) {
            return suites[0].beforeAll(name2, fn);
          },
          /**
           * Execute after running tests.
           *
           * @param {string} name
           * @param {Function} fn
           */
          after: function(name2, fn) {
            return suites[0].afterAll(name2, fn);
          },
          /**
           * Execute before each test case.
           *
           * @param {string} name
           * @param {Function} fn
           */
          beforeEach: function(name2, fn) {
            return suites[0].beforeEach(name2, fn);
          },
          /**
           * Execute after each test case.
           *
           * @param {string} name
           * @param {Function} fn
           */
          afterEach: function(name2, fn) {
            return suites[0].afterEach(name2, fn);
          },
          suite: {
            /**
             * Create an exclusive Suite; convenience function
             * See docstring for create() below.
             *
             * @param {Object} opts
             * @returns {Suite}
             */
            only: function only(opts) {
              if (mocha3.options.forbidOnly) {
                throw createForbiddenExclusivityError(mocha3);
              }
              opts.isOnly = true;
              return this.create(opts);
            },
            /**
             * Create a Suite, but skip it; convenience function
             * See docstring for create() below.
             *
             * @param {Object} opts
             * @returns {Suite}
             */
            skip: function skip(opts) {
              opts.pending = true;
              return this.create(opts);
            },
            /**
             * Creates a suite.
             *
             * @param {Object} opts Options
             * @param {string} opts.title Title of Suite
             * @param {Function} [opts.fn] Suite Function (not always applicable)
             * @param {boolean} [opts.pending] Is Suite pending?
             * @param {string} [opts.file] Filepath where this Suite resides
             * @param {boolean} [opts.isOnly] Is Suite exclusive?
             * @returns {Suite}
             */
            create: function create2(opts) {
              var suite3 = Suite$1.create(suites[0], opts.title);
              suite3.pending = Boolean(opts.pending);
              suite3.file = opts.file;
              suites.unshift(suite3);
              if (opts.isOnly) {
                suite3.markOnly();
              }
              if (suite3.pending && mocha3.options.forbidPending && shouldBeTested(suite3)) {
                throw createUnsupportedError("Pending test forbidden");
              }
              if (typeof opts.fn === "function") {
                opts.fn.call(suite3);
                suites.shift();
              } else if (typeof opts.fn === "undefined" && !suite3.pending) {
                throw createMissingArgumentError(
                  'Suite "' + suite3.fullTitle() + '" was defined but no callback was supplied. Supply a callback or explicitly skip the suite.',
                  "callback",
                  "function"
                );
              } else if (!opts.fn && suite3.pending) {
                suites.shift();
              }
              return suite3;
            }
          },
          test: {
            /**
             * Exclusive test-case.
             *
             * @param {Object} mocha
             * @param {Function} test
             * @returns {*}
             */
            only: function(mocha4, test3) {
              if (mocha4.options.forbidOnly) {
                throw createForbiddenExclusivityError(mocha4);
              }
              test3.markOnly();
              return test3;
            },
            /**
             * Pending test case.
             *
             * @param {string} title
             */
            skip: function(title3) {
              context2.test(title3);
            }
          }
        };
      };
      var Test$3 = test2;
      var EVENT_FILE_PRE_REQUIRE$2 = suite2.exports.constants.EVENT_FILE_PRE_REQUIRE;
      bdd.exports = function bddInterface(suite3) {
        var suites = [suite3];
        suite3.on(EVENT_FILE_PRE_REQUIRE$2, function(context2, file, mocha3) {
          var common$12 = common(suites, context2, mocha3);
          context2.before = common$12.before;
          context2.after = common$12.after;
          context2.beforeEach = common$12.beforeEach;
          context2.afterEach = common$12.afterEach;
          context2.run = mocha3.options.delay && common$12.runWithSuite(suite3);
          context2.describe = context2.context = function(title3, fn) {
            return common$12.suite.create({
              title: title3,
              file,
              fn
            });
          };
          context2.xdescribe = context2.xcontext = context2.describe.skip = function(title3, fn) {
            return common$12.suite.skip({
              title: title3,
              file,
              fn
            });
          };
          context2.describe.only = function(title3, fn) {
            return common$12.suite.only({
              title: title3,
              file,
              fn
            });
          };
          context2.it = context2.specify = function(title3, fn) {
            var suite4 = suites[0];
            if (suite4.isPending()) {
              fn = null;
            }
            var test3 = new Test$3(title3, fn);
            test3.file = file;
            suite4.addTest(test3);
            return test3;
          };
          context2.it.only = function(title3, fn) {
            return common$12.test.only(mocha3, context2.it(title3, fn));
          };
          context2.xit = context2.xspecify = context2.it.skip = function(title3) {
            return context2.it(title3);
          };
        });
      };
      bdd.exports.description = "BDD or RSpec style [default]";
      var tdd = { exports: {} };
      var Test$2 = test2;
      var EVENT_FILE_PRE_REQUIRE$1 = suite2.exports.constants.EVENT_FILE_PRE_REQUIRE;
      tdd.exports = function(suite3) {
        var suites = [suite3];
        suite3.on(EVENT_FILE_PRE_REQUIRE$1, function(context2, file, mocha3) {
          var common$12 = common(suites, context2, mocha3);
          context2.setup = common$12.beforeEach;
          context2.teardown = common$12.afterEach;
          context2.suiteSetup = common$12.before;
          context2.suiteTeardown = common$12.after;
          context2.run = mocha3.options.delay && common$12.runWithSuite(suite3);
          context2.suite = function(title3, fn) {
            return common$12.suite.create({
              title: title3,
              file,
              fn
            });
          };
          context2.suite.skip = function(title3, fn) {
            return common$12.suite.skip({
              title: title3,
              file,
              fn
            });
          };
          context2.suite.only = function(title3, fn) {
            return common$12.suite.only({
              title: title3,
              file,
              fn
            });
          };
          context2.test = function(title3, fn) {
            var suite4 = suites[0];
            if (suite4.isPending()) {
              fn = null;
            }
            var test3 = new Test$2(title3, fn);
            test3.file = file;
            suite4.addTest(test3);
            return test3;
          };
          context2.test.only = function(title3, fn) {
            return common$12.test.only(mocha3, context2.test(title3, fn));
          };
          context2.test.skip = common$12.test.skip;
        });
      };
      tdd.exports.description = `traditional "suite"/"test" instead of BDD's "describe"/"it"`;
      var qunit = { exports: {} };
      var Test$1 = test2;
      var EVENT_FILE_PRE_REQUIRE = suite2.exports.constants.EVENT_FILE_PRE_REQUIRE;
      qunit.exports = function qUnitInterface(suite3) {
        var suites = [suite3];
        suite3.on(EVENT_FILE_PRE_REQUIRE, function(context2, file, mocha3) {
          var common$12 = common(suites, context2, mocha3);
          context2.before = common$12.before;
          context2.after = common$12.after;
          context2.beforeEach = common$12.beforeEach;
          context2.afterEach = common$12.afterEach;
          context2.run = mocha3.options.delay && common$12.runWithSuite(suite3);
          context2.suite = function(title3) {
            if (suites.length > 1) {
              suites.shift();
            }
            return common$12.suite.create({
              title: title3,
              file,
              fn: false
            });
          };
          context2.suite.only = function(title3) {
            if (suites.length > 1) {
              suites.shift();
            }
            return common$12.suite.only({
              title: title3,
              file,
              fn: false
            });
          };
          context2.test = function(title3, fn) {
            var test3 = new Test$1(title3, fn);
            test3.file = file;
            suites[0].addTest(test3);
            return test3;
          };
          context2.test.only = function(title3, fn) {
            return common$12.test.only(mocha3, context2.test(title3, fn));
          };
          context2.test.skip = common$12.test.skip;
        });
      };
      qunit.exports.description = "QUnit style";
      var exports$1 = { exports: {} };
      var Suite = suite2.exports;
      var Test = test2;
      exports$1.exports = function(suite3) {
        var suites = [suite3];
        suite3.on(Suite.constants.EVENT_FILE_REQUIRE, visit);
        function visit(obj, file) {
          var suite4;
          for (var key in obj) {
            if (typeof obj[key] === "function") {
              var fn = obj[key];
              switch (key) {
                case "before":
                  suites[0].beforeAll(fn);
                  break;
                case "after":
                  suites[0].afterAll(fn);
                  break;
                case "beforeEach":
                  suites[0].beforeEach(fn);
                  break;
                case "afterEach":
                  suites[0].afterEach(fn);
                  break;
                default:
                  var test3 = new Test(key, fn);
                  test3.file = file;
                  suites[0].addTest(test3);
              }
            } else {
              suite4 = Suite.create(suites[0], key);
              suites.unshift(suite4);
              visit(obj[key], file);
              suites.shift();
            }
          }
        }
      };
      exports$1.exports.description = 'Node.js module ("exports") style';
      interfaces.bdd = bdd.exports;
      interfaces.tdd = tdd.exports;
      interfaces.qunit = qunit.exports;
      interfaces.exports = exports$1.exports;
      var context = Context;
      function Context() {
      }
      Context.prototype.runnable = function(runnable2) {
        if (!arguments.length) {
          return this._runnable;
        }
        this.test = this._runnable = runnable2;
        return this;
      };
      Context.prototype.timeout = function(ms2) {
        if (!arguments.length) {
          return this.runnable().timeout();
        }
        this.runnable().timeout(ms2);
        return this;
      };
      Context.prototype.slow = function(ms2) {
        if (!arguments.length) {
          return this.runnable().slow();
        }
        this.runnable().slow(ms2);
        return this;
      };
      Context.prototype.skip = function() {
        this.runnable().skip();
      };
      Context.prototype.retries = function(n) {
        if (!arguments.length) {
          return this.runnable().retries();
        }
        this.runnable().retries(n);
        return this;
      };
      var name = "mocha";
      var version2 = "11.1.0";
      var homepage = "https://mochajs.org/";
      var notifyLogo = "https://ibin.co/4QuRuGjXvl36.png";
      var require$$17 = {
        name,
        version: version2,
        homepage,
        notifyLogo
      };
      (function(module3, exports2) {
        var escapeRe = escapeStringRegexp;
        var path = require$$1;
        var builtinReporters = reporters;
        var utils2 = utils$3;
        var mocharc = require$$4;
        var Suite2 = suite2.exports;
        var esmUtils = require$$18;
        var createStatsCollector2 = statsCollector;
        const {
          createInvalidReporterError: createInvalidReporterError2,
          createInvalidInterfaceError: createInvalidInterfaceError2,
          createMochaInstanceAlreadyDisposedError: createMochaInstanceAlreadyDisposedError2,
          createMochaInstanceAlreadyRunningError: createMochaInstanceAlreadyRunningError2,
          createUnsupportedError: createUnsupportedError2
        } = errors$2;
        const { EVENT_FILE_PRE_REQUIRE: EVENT_FILE_PRE_REQUIRE2, EVENT_FILE_POST_REQUIRE, EVENT_FILE_REQUIRE } = Suite2.constants;
        var debug2 = browser2.exports("mocha:mocha");
        exports2 = module3.exports = Mocha2;
        var mochaStates = utils2.defineConstants({
          /**
           * Initial state of the mocha instance
           * @private
           */
          INIT: "init",
          /**
           * Mocha instance is running tests
           * @private
           */
          RUNNING: "running",
          /**
           * Mocha instance is done running tests and references to test functions and hooks are cleaned.
           * You can reset this state by unloading the test files.
           * @private
           */
          REFERENCES_CLEANED: "referencesCleaned",
          /**
           * Mocha instance is disposed and can no longer be used.
           * @private
           */
          DISPOSED: "disposed"
        });
        if (!utils2.isBrowser() && typeof module3.paths !== "undefined") {
          var cwd3 = utils2.cwd();
          module3.paths.push(cwd3, path.join(cwd3, "node_modules"));
        }
        exports2.utils = utils2;
        exports2.interfaces = interfaces;
        exports2.reporters = builtinReporters;
        exports2.Runnable = runnable;
        exports2.Context = context;
        exports2.Runner = runner;
        exports2.Suite = Suite2;
        exports2.Hook = hook;
        exports2.Test = test2;
        let currentContext;
        exports2.afterEach = function(...args) {
          return (currentContext.afterEach || currentContext.teardown).apply(
            this,
            args
          );
        };
        exports2.after = function(...args) {
          return (currentContext.after || currentContext.suiteTeardown).apply(
            this,
            args
          );
        };
        exports2.beforeEach = function(...args) {
          return (currentContext.beforeEach || currentContext.setup).apply(this, args);
        };
        exports2.before = function(...args) {
          return (currentContext.before || currentContext.suiteSetup).apply(this, args);
        };
        exports2.describe = function(...args) {
          return (currentContext.describe || currentContext.suite).apply(this, args);
        };
        exports2.describe.only = function(...args) {
          return (currentContext.describe || currentContext.suite).only.apply(
            this,
            args
          );
        };
        exports2.describe.skip = function(...args) {
          return (currentContext.describe || currentContext.suite).skip.apply(
            this,
            args
          );
        };
        exports2.it = function(...args) {
          return (currentContext.it || currentContext.test).apply(this, args);
        };
        exports2.it.only = function(...args) {
          return (currentContext.it || currentContext.test).only.apply(this, args);
        };
        exports2.it.skip = function(...args) {
          return (currentContext.it || currentContext.test).skip.apply(this, args);
        };
        exports2.xdescribe = exports2.describe.skip;
        exports2.xit = exports2.it.skip;
        exports2.setup = exports2.beforeEach;
        exports2.suiteSetup = exports2.before;
        exports2.suiteTeardown = exports2.after;
        exports2.suite = exports2.describe;
        exports2.teardown = exports2.afterEach;
        exports2.test = exports2.it;
        exports2.run = function(...args) {
          return currentContext.run.apply(this, args);
        };
        function Mocha2(options = {}) {
          options = { ...mocharc, ...options };
          this.files = [];
          this.options = options;
          this.suite = new exports2.Suite("", new exports2.Context(), true);
          this._cleanReferencesAfterRun = true;
          this._state = mochaStates.INIT;
          this.grep(options.grep).fgrep(options.fgrep).ui(options.ui).reporter(
            options.reporter,
            options["reporter-option"] || options.reporterOption || options.reporterOptions
            // for backwards compatibility
          ).slow(options.slow).global(options.global);
          if (typeof options.timeout !== "undefined") {
            this.timeout(options.timeout === false ? 0 : options.timeout);
          }
          if ("retries" in options) {
            this.retries(options.retries);
          }
          [
            "allowUncaught",
            "asyncOnly",
            "bail",
            "checkLeaks",
            "color",
            "delay",
            "diff",
            "dryRun",
            "passOnFailingTestSuite",
            "failZero",
            "forbidOnly",
            "forbidPending",
            "fullTrace",
            "inlineDiffs",
            "invert"
          ].forEach(function(opt) {
            if (options[opt]) {
              this[opt]();
            }
          }, this);
          if (options.rootHooks) {
            this.rootHooks(options.rootHooks);
          }
          this._runnerClass = exports2.Runner;
          this._lazyLoadFiles = false;
          this.isWorker = Boolean(options.isWorker);
          this.globalSetup(options.globalSetup).globalTeardown(options.globalTeardown).enableGlobalSetup(options.enableGlobalSetup).enableGlobalTeardown(options.enableGlobalTeardown);
          if (options.parallel && (typeof options.jobs === "undefined" || options.jobs > 1)) {
            debug2("attempting to enable parallel mode");
            this.parallelMode(true);
          }
        }
        Mocha2.prototype.bail = function(bail) {
          this.suite.bail(bail !== false);
          return this;
        };
        Mocha2.prototype.addFile = function(file) {
          this.files.push(file);
          return this;
        };
        Mocha2.prototype.reporter = function(reporterName, reporterOptions) {
          if (typeof reporterName === "function") {
            this._reporter = reporterName;
          } else {
            reporterName = reporterName || "spec";
            var reporter2;
            if (builtinReporters[reporterName]) {
              reporter2 = builtinReporters[reporterName];
            }
            if (!reporter2) {
              let foundReporter;
              try {
                foundReporter = require.resolve(reporterName);
                reporter2 = commonjsRequire(foundReporter);
              } catch (err) {
                if (foundReporter) {
                  throw createInvalidReporterError2(err.message, foundReporter);
                }
                try {
                  reporter2 = commonjsRequire(path.resolve(reporterName));
                } catch (e) {
                  throw createInvalidReporterError2(e.message, reporterName);
                }
              }
            }
            this._reporter = reporter2;
          }
          this.options.reporterOption = reporterOptions;
          this.options.reporterOptions = reporterOptions;
          return this;
        };
        Mocha2.prototype.ui = function(ui2) {
          var bindInterface;
          if (typeof ui2 === "function") {
            bindInterface = ui2;
          } else {
            ui2 = ui2 || "bdd";
            bindInterface = exports2.interfaces[ui2];
            if (!bindInterface) {
              try {
                bindInterface = commonjsRequire(ui2);
              } catch (err) {
                throw createInvalidInterfaceError2(`invalid interface '${ui2}'`, ui2);
              }
            }
          }
          bindInterface(this.suite);
          this.suite.on(EVENT_FILE_PRE_REQUIRE2, function(context2) {
            currentContext = context2;
          });
          return this;
        };
        Mocha2.prototype.loadFiles = function(fn) {
          var self2 = this;
          var suite3 = this.suite;
          this.files.forEach(function(file) {
            file = path.resolve(file);
            suite3.emit(EVENT_FILE_PRE_REQUIRE2, commonjsGlobal, file, self2);
            suite3.emit(EVENT_FILE_REQUIRE, commonjsRequire(file), file, self2);
            suite3.emit(EVENT_FILE_POST_REQUIRE, commonjsGlobal, file, self2);
          });
          fn && fn();
        };
        Mocha2.prototype.loadFilesAsync = function({ esmDecorator } = {}) {
          var self2 = this;
          var suite3 = this.suite;
          this.lazyLoadFiles(true);
          return esmUtils.loadFilesAsync(
            this.files,
            function(file) {
              suite3.emit(EVENT_FILE_PRE_REQUIRE2, commonjsGlobal, file, self2);
            },
            function(file, resultModule) {
              suite3.emit(EVENT_FILE_REQUIRE, resultModule, file, self2);
              suite3.emit(EVENT_FILE_POST_REQUIRE, commonjsGlobal, file, self2);
            },
            esmDecorator
          );
        };
        Mocha2.unloadFile = function(file) {
          if (utils2.isBrowser()) {
            throw createUnsupportedError2(
              "unloadFile() is only supported in a Node.js environment"
            );
          }
          return require$$18.unloadFile(file);
        };
        Mocha2.prototype.unloadFiles = function() {
          if (this._state === mochaStates.DISPOSED) {
            throw createMochaInstanceAlreadyDisposedError2(
              "Mocha instance is already disposed, it cannot be used again.",
              this._cleanReferencesAfterRun,
              this
            );
          }
          this.files.forEach(function(file) {
            Mocha2.unloadFile(file);
          });
          this._state = mochaStates.INIT;
          return this;
        };
        Mocha2.prototype.fgrep = function(str) {
          if (!str) {
            return this;
          }
          return this.grep(new RegExp(escapeRe(str)));
        };
        Mocha2.prototype.grep = function(re) {
          if (utils2.isString(re)) {
            var arg = re.match(/^\/(.*)\/([gimy]{0,4})$|.*/);
            this.options.grep = new RegExp(arg[1] || arg[0], arg[2]);
          } else {
            this.options.grep = re;
          }
          return this;
        };
        Mocha2.prototype.invert = function() {
          this.options.invert = true;
          return this;
        };
        Mocha2.prototype.checkLeaks = function(checkLeaks) {
          this.options.checkLeaks = checkLeaks !== false;
          return this;
        };
        Mocha2.prototype.cleanReferencesAfterRun = function(cleanReferencesAfterRun) {
          this._cleanReferencesAfterRun = cleanReferencesAfterRun !== false;
          return this;
        };
        Mocha2.prototype.dispose = function() {
          if (this._state === mochaStates.RUNNING) {
            throw createMochaInstanceAlreadyRunningError2(
              "Cannot dispose while the mocha instance is still running tests."
            );
          }
          this.unloadFiles();
          this._previousRunner && this._previousRunner.dispose();
          this.suite.dispose();
          this._state = mochaStates.DISPOSED;
        };
        Mocha2.prototype.fullTrace = function(fullTrace) {
          this.options.fullTrace = fullTrace !== false;
          return this;
        };
        Mocha2.prototype.global = function(global2) {
          this.options.global = (this.options.global || []).concat(global2).filter(Boolean).filter(function(elt, idx, arr) {
            return arr.indexOf(elt) === idx;
          });
          return this;
        };
        Mocha2.prototype.globals = Mocha2.prototype.global;
        Mocha2.prototype.color = function(color) {
          this.options.color = color !== false;
          return this;
        };
        Mocha2.prototype.inlineDiffs = function(inlineDiffs) {
          this.options.inlineDiffs = inlineDiffs !== false;
          return this;
        };
        Mocha2.prototype.diff = function(diff2) {
          this.options.diff = diff2 !== false;
          return this;
        };
        Mocha2.prototype.timeout = function(msecs) {
          this.suite.timeout(msecs);
          return this;
        };
        Mocha2.prototype.retries = function(retry) {
          this.suite.retries(retry);
          return this;
        };
        Mocha2.prototype.slow = function(msecs) {
          this.suite.slow(msecs);
          return this;
        };
        Mocha2.prototype.asyncOnly = function(asyncOnly) {
          this.options.asyncOnly = asyncOnly !== false;
          return this;
        };
        Mocha2.prototype.noHighlighting = function() {
          this.options.noHighlighting = true;
          return this;
        };
        Mocha2.prototype.allowUncaught = function(allowUncaught) {
          this.options.allowUncaught = allowUncaught !== false;
          return this;
        };
        Mocha2.prototype.delay = function delay() {
          this.options.delay = true;
          return this;
        };
        Mocha2.prototype.dryRun = function(dryRun) {
          this.options.dryRun = dryRun !== false;
          return this;
        };
        Mocha2.prototype.failZero = function(failZero) {
          this.options.failZero = failZero !== false;
          return this;
        };
        Mocha2.prototype.passOnFailingTestSuite = function(passOnFailingTestSuite) {
          this.options.passOnFailingTestSuite = passOnFailingTestSuite === true;
          return this;
        };
        Mocha2.prototype.forbidOnly = function(forbidOnly) {
          this.options.forbidOnly = forbidOnly !== false;
          return this;
        };
        Mocha2.prototype.forbidPending = function(forbidPending) {
          this.options.forbidPending = forbidPending !== false;
          return this;
        };
        Mocha2.prototype._guardRunningStateTransition = function() {
          if (this._state === mochaStates.RUNNING) {
            throw createMochaInstanceAlreadyRunningError2(
              "Mocha instance is currently running tests, cannot start a next test run until this one is done",
              this
            );
          }
          if (this._state === mochaStates.DISPOSED || this._state === mochaStates.REFERENCES_CLEANED) {
            throw createMochaInstanceAlreadyDisposedError2(
              "Mocha instance is already disposed, cannot start a new test run. Please create a new mocha instance. Be sure to set disable `cleanReferencesAfterRun` when you want to reuse the same mocha instance for multiple test runs.",
              this._cleanReferencesAfterRun,
              this
            );
          }
        };
        Object.defineProperty(Mocha2.prototype, "version", {
          value: require$$17.version,
          configurable: false,
          enumerable: true,
          writable: false
        });
        Mocha2.prototype.run = function(fn) {
          this._guardRunningStateTransition();
          this._state = mochaStates.RUNNING;
          if (this._previousRunner) {
            this._previousRunner.dispose();
            this.suite.reset();
          }
          if (this.files.length && !this._lazyLoadFiles) {
            this.loadFiles();
          }
          var suite3 = this.suite;
          var options = this.options;
          options.files = this.files;
          const runner2 = new this._runnerClass(suite3, {
            cleanReferencesAfterRun: this._cleanReferencesAfterRun,
            delay: options.delay,
            dryRun: options.dryRun,
            failZero: options.failZero
          });
          createStatsCollector2(runner2);
          var reporter2 = new this._reporter(runner2, options);
          runner2.checkLeaks = options.checkLeaks === true;
          runner2.fullStackTrace = options.fullTrace;
          runner2.asyncOnly = options.asyncOnly;
          runner2.allowUncaught = options.allowUncaught;
          runner2.forbidOnly = options.forbidOnly;
          runner2.forbidPending = options.forbidPending;
          if (options.grep) {
            runner2.grep(options.grep, options.invert);
          }
          if (options.global) {
            runner2.globals(options.global);
          }
          if (options.color !== void 0) {
            exports2.reporters.Base.useColors = options.color;
          }
          exports2.reporters.Base.inlineDiffs = options.inlineDiffs;
          exports2.reporters.Base.hideDiff = !options.diff;
          const done2 = (failures) => {
            this._previousRunner = runner2;
            this._state = this._cleanReferencesAfterRun ? mochaStates.REFERENCES_CLEANED : mochaStates.INIT;
            fn = fn || utils2.noop;
            if (typeof reporter2.done === "function") {
              reporter2.done(failures, fn);
            } else {
              fn(failures);
            }
          };
          const runAsync = async (runner3) => {
            const context2 = this.options.enableGlobalSetup && this.hasGlobalSetupFixtures() ? await this.runGlobalSetup(runner3) : {};
            const failureCount = await runner3.runAsync({
              files: this.files,
              options
            });
            if (this.options.enableGlobalTeardown && this.hasGlobalTeardownFixtures()) {
              await this.runGlobalTeardown(runner3, { context: context2 });
            }
            return failureCount;
          };
          runAsync(runner2).then(done2);
          return runner2;
        };
        Mocha2.prototype.rootHooks = function rootHooks({
          beforeAll = [],
          beforeEach = [],
          afterAll = [],
          afterEach = []
        } = {}) {
          beforeAll = utils2.castArray(beforeAll);
          beforeEach = utils2.castArray(beforeEach);
          afterAll = utils2.castArray(afterAll);
          afterEach = utils2.castArray(afterEach);
          beforeAll.forEach((hook2) => {
            this.suite.beforeAll(hook2);
          });
          beforeEach.forEach((hook2) => {
            this.suite.beforeEach(hook2);
          });
          afterAll.forEach((hook2) => {
            this.suite.afterAll(hook2);
          });
          afterEach.forEach((hook2) => {
            this.suite.afterEach(hook2);
          });
          return this;
        };
        Mocha2.prototype.parallelMode = function parallelMode(enable = true) {
          if (utils2.isBrowser()) {
            throw createUnsupportedError2("parallel mode is only supported in Node.js");
          }
          const parallel = Boolean(enable);
          if (parallel === this.options.parallel && this._lazyLoadFiles && this._runnerClass !== exports2.Runner) {
            return this;
          }
          if (this._state !== mochaStates.INIT) {
            throw createUnsupportedError2(
              "cannot change parallel mode after having called run()"
            );
          }
          this.options.parallel = parallel;
          this._runnerClass = parallel ? require$$18 : exports2.Runner;
          return this.lazyLoadFiles(this._lazyLoadFiles || parallel);
        };
        Mocha2.prototype.lazyLoadFiles = function lazyLoadFiles(enable) {
          this._lazyLoadFiles = enable === true;
          debug2("set lazy load to %s", enable);
          return this;
        };
        Mocha2.prototype.globalSetup = function globalSetup(setupFns = []) {
          setupFns = utils2.castArray(setupFns);
          this.options.globalSetup = setupFns;
          debug2("configured %d global setup functions", setupFns.length);
          return this;
        };
        Mocha2.prototype.globalTeardown = function globalTeardown(teardownFns = []) {
          teardownFns = utils2.castArray(teardownFns);
          this.options.globalTeardown = teardownFns;
          debug2("configured %d global teardown functions", teardownFns.length);
          return this;
        };
        Mocha2.prototype.runGlobalSetup = async function runGlobalSetup(context2 = {}) {
          const { globalSetup } = this.options;
          if (globalSetup && globalSetup.length) {
            debug2("run(): global setup starting");
            await this._runGlobalFixtures(globalSetup, context2);
            debug2("run(): global setup complete");
          }
          return context2;
        };
        Mocha2.prototype.runGlobalTeardown = async function runGlobalTeardown(context2 = {}) {
          const { globalTeardown } = this.options;
          if (globalTeardown && globalTeardown.length) {
            debug2("run(): global teardown starting");
            await this._runGlobalFixtures(globalTeardown, context2);
          }
          debug2("run(): global teardown complete");
          return context2;
        };
        Mocha2.prototype._runGlobalFixtures = async function _runGlobalFixtures(fixtureFns = [], context2 = {}) {
          for await (const fixtureFn of fixtureFns) {
            await fixtureFn.call(context2);
          }
          return context2;
        };
        Mocha2.prototype.enableGlobalSetup = function enableGlobalSetup(enabled = true) {
          this.options.enableGlobalSetup = Boolean(enabled);
          return this;
        };
        Mocha2.prototype.enableGlobalTeardown = function enableGlobalTeardown(enabled = true) {
          this.options.enableGlobalTeardown = Boolean(enabled);
          return this;
        };
        Mocha2.prototype.hasGlobalSetupFixtures = function hasGlobalSetupFixtures() {
          return Boolean(this.options.globalSetup.length);
        };
        Mocha2.prototype.hasGlobalTeardownFixtures = function hasGlobalTeardownFixtures() {
          return Boolean(this.options.globalTeardown.length);
        };
      })(mocha$1, mocha$1.exports);
      process2.stdout = browserStdout({ label: false });
      var parseQuery = parseQuery$1;
      var highlightTags = highlightTags$1;
      var Mocha = mocha$1.exports;
      var mocha2 = new Mocha({ reporter: "html" });
      var Date$1 = commonjsGlobal.Date;
      var setTimeout$1 = commonjsGlobal.setTimeout;
      commonjsGlobal.setInterval;
      commonjsGlobal.clearTimeout;
      commonjsGlobal.clearInterval;
      var uncaughtExceptionHandlers = [];
      var originalOnerrorHandler = commonjsGlobal.onerror;
      process2.removeListener = function(e, fn) {
        if (e === "uncaughtException") {
          if (originalOnerrorHandler) {
            commonjsGlobal.onerror = originalOnerrorHandler;
          } else {
            commonjsGlobal.onerror = function() {
            };
          }
          var i = uncaughtExceptionHandlers.indexOf(fn);
          if (i !== -1) {
            uncaughtExceptionHandlers.splice(i, 1);
          }
        }
      };
      process2.listenerCount = function(name2) {
        if (name2 === "uncaughtException") {
          return uncaughtExceptionHandlers.length;
        }
        return 0;
      };
      process2.on = function(e, fn) {
        if (e === "uncaughtException") {
          commonjsGlobal.onerror = function(msg, url, line2, col, err) {
            fn(err || new Error(msg + " (" + url + ":" + line2 + ":" + col + ")"));
            return !mocha2.options.allowUncaught;
          };
          uncaughtExceptionHandlers.push(fn);
        }
      };
      process2.listeners = function(e) {
        if (e === "uncaughtException") {
          return uncaughtExceptionHandlers;
        }
        return [];
      };
      mocha2.suite.removeAllListeners("pre-require");
      var immediateQueue = [];
      var immediateTimeout;
      function timeslice() {
        var immediateStart = new Date$1().getTime();
        while (immediateQueue.length && new Date$1().getTime() - immediateStart < 100) {
          immediateQueue.shift()();
        }
        if (immediateQueue.length) {
          immediateTimeout = setTimeout$1(timeslice, 0);
        } else {
          immediateTimeout = null;
        }
      }
      Mocha.Runner.immediately = function(callback) {
        immediateQueue.push(callback);
        if (!immediateTimeout) {
          immediateTimeout = setTimeout$1(timeslice, 0);
        }
      };
      mocha2.throwError = function(err) {
        uncaughtExceptionHandlers.forEach(function(fn) {
          fn(err);
        });
        throw err;
      };
      mocha2.ui = function(ui2) {
        Mocha.prototype.ui.call(this, ui2);
        this.suite.emit("pre-require", commonjsGlobal, null, this);
        return this;
      };
      mocha2.setup = function(opts) {
        if (typeof opts === "string") {
          opts = { ui: opts };
        }
        if (opts.delay === true) {
          this.delay();
        }
        var self2 = this;
        Object.keys(opts).filter(function(opt) {
          return opt !== "delay";
        }).forEach(function(opt) {
          if (Object.prototype.hasOwnProperty.call(opts, opt)) {
            self2[opt](opts[opt]);
          }
        });
        return this;
      };
      mocha2.run = function(fn) {
        var options = mocha2.options;
        mocha2.globals("location");
        var query = parseQuery(commonjsGlobal.location.search || "");
        if (query.grep) {
          mocha2.grep(query.grep);
        }
        if (query.fgrep) {
          mocha2.fgrep(query.fgrep);
        }
        if (query.invert) {
          mocha2.invert();
        }
        return Mocha.prototype.run.call(mocha2, function(err) {
          var document2 = commonjsGlobal.document;
          if (document2 && document2.getElementById("mocha") && options.noHighlighting !== true) {
            highlightTags("code");
          }
          if (fn) {
            fn(err);
          }
        });
      };
      Mocha.process = process2;
      commonjsGlobal.Mocha = Mocha;
      commonjsGlobal.mocha = mocha2;
      [
        "describe",
        "context",
        "it",
        "specify",
        "xdescribe",
        "xcontext",
        "xit",
        "xspecify",
        "before",
        "beforeEach",
        "afterEach",
        "after"
      ].forEach(function(key) {
        mocha2[key] = commonjsGlobal[key];
      });
      var browserEntry = mocha2;
      return browserEntry;
    });
  }
});

// node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var hasSymbols = require_shams();
    module2.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Object;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Error;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = EvalError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = RangeError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = ReferenceError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = SyntaxError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = TypeError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = URIError;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Math.abs;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Math.floor;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Math.max;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Math.min;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Math.pow;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Math.round;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var $isNaN = require_isNaN();
    module2.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Function.prototype.call;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = Function.prototype.apply;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind.call($call, $apply);
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    };
  }
});

// node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/.pnpm/get-intrinsic@1.2.7/node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/.pnpm/get-intrinsic@1.2.7/node_modules/get-intrinsic/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = (
        /** @type {Parameters<typeof callBindBasic>[0][0]} */
        GetIntrinsic(name, !!allowMissing)
      );
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBindBasic([intrinsic]);
      }
      return intrinsic;
    };
  }
});

// node_modules/.pnpm/is-arguments@1.2.0/node_modules/is-arguments/index.js
var require_is_arguments = __commonJS({
  "node_modules/.pnpm/is-arguments@1.2.0/node_modules/is-arguments/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var hasToStringTag = require_shams2()();
    var callBound = require_call_bound();
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && "callee" in value && $toString(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module2.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  }
});

// node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js
var require_is_regex = __commonJS({
  "node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var callBound = require_call_bound();
    var hasToStringTag = require_shams2()();
    var hasOwn = require_hasown();
    var gOPD = require_gopd();
    var fn;
    if (hasToStringTag) {
      $exec = callBound("RegExp.prototype.exec");
      isRegexMarker = {};
      throwRegexMarker = function() {
        throw isRegexMarker;
      };
      badStringifier = {
        toString: throwRegexMarker,
        valueOf: throwRegexMarker
      };
      if (typeof Symbol.toPrimitive === "symbol") {
        badStringifier[Symbol.toPrimitive] = throwRegexMarker;
      }
      fn = function isRegex(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        var descriptor = (
          /** @type {NonNullable<typeof gOPD>} */
          gOPD(
            /** @type {{ lastIndex?: unknown }} */
            value,
            "lastIndex"
          )
        );
        var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, "value");
        if (!hasLastIndexDataProperty) {
          return false;
        }
        try {
          $exec(
            value,
            /** @type {string} */
            /** @type {unknown} */
            badStringifier
          );
        } catch (e) {
          return e === isRegexMarker;
        }
      };
    } else {
      $toString = callBound("Object.prototype.toString");
      regexClass = "[object RegExp]";
      fn = function isRegex(value) {
        if (!value || typeof value !== "object" && typeof value !== "function") {
          return false;
        }
        return $toString(value) === regexClass;
      };
    }
    var $exec;
    var isRegexMarker;
    var throwRegexMarker;
    var badStringifier;
    var $toString;
    var regexClass;
    module2.exports = fn;
  }
});

// node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js
var require_safe_regex_test = __commonJS({
  "node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var callBound = require_call_bound();
    var isRegex = require_is_regex();
    var $exec = callBound("RegExp.prototype.exec");
    var $TypeError = require_type();
    module2.exports = function regexTester(regex) {
      if (!isRegex(regex)) {
        throw new $TypeError("`regex` must be a RegExp");
      }
      return function test2(s) {
        return $exec(regex, s) !== null;
      };
    };
  }
});

// node_modules/.pnpm/is-generator-function@1.1.0/node_modules/is-generator-function/index.js
var require_is_generator_function = __commonJS({
  "node_modules/.pnpm/is-generator-function@1.1.0/node_modules/is-generator-function/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var callBound = require_call_bound();
    var safeRegexTest = require_safe_regex_test();
    var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
    var hasToStringTag = require_shams2()();
    var getProto = require_get_proto();
    var toStr = callBound("Object.prototype.toString");
    var fnToStr = callBound("Function.prototype.toString");
    var getGeneratorFunc = function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e) {
      }
    };
    var GeneratorFunction;
    module2.exports = function isGeneratorFunction(fn) {
      if (typeof fn !== "function") {
        return false;
      }
      if (isFnRegex(fnToStr(fn))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr(fn);
        return str === "[object GeneratorFunction]";
      }
      if (!getProto) {
        return false;
      }
      if (typeof GeneratorFunction === "undefined") {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? (
          /** @type {GeneratorFunctionConstructor} */
          getProto(generatorFunc)
        ) : false;
      }
      return getProto(fn) === GeneratorFunction;
    };
  }
});

// node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module2.exports = reflectApply ? function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// node_modules/.pnpm/for-each@0.3.5/node_modules/for-each/index.js
var require_for_each = __commonJS({
  "node_modules/.pnpm/for-each@0.3.5/node_modules/for-each/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var isCallable = require_is_callable();
    var toStr = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var forEachArray = function forEachArray2(array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array);
          } else {
            iterator.call(receiver, array[i], i, array);
          }
        }
      }
    };
    var forEachString = function forEachString2(string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
        if (receiver == null) {
          iterator(string.charAt(i), i, string);
        } else {
          iterator.call(receiver, string.charAt(i), i, string);
        }
      }
    };
    var forEachObject = function forEachObject2(object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object);
          } else {
            iterator.call(receiver, object[k], k, object);
          }
        }
      }
    };
    function isArray(x) {
      return toStr.call(x) === "[object Array]";
    }
    module2.exports = function forEach(list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError("iterator must be a function");
      }
      var receiver;
      if (arguments.length >= 3) {
        receiver = thisArg;
      }
      if (isArray(list)) {
        forEachArray(list, iterator, receiver);
      } else if (typeof list === "string") {
        forEachString(list, iterator, receiver);
      } else {
        forEachObject(list, iterator, receiver);
      }
    };
  }
});

// node_modules/.pnpm/possible-typed-array-names@1.1.0/node_modules/possible-typed-array-names/index.js
var require_possible_typed_array_names = __commonJS({
  "node_modules/.pnpm/possible-typed-array-names@1.1.0/node_modules/possible-typed-array-names/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = [
      "Float16Array",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "BigInt64Array",
      "BigUint64Array"
    ];
  }
});

// node_modules/.pnpm/available-typed-arrays@1.0.7/node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS({
  "node_modules/.pnpm/available-typed-arrays@1.0.7/node_modules/available-typed-arrays/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var possibleNames = require_possible_typed_array_names();
    var g = typeof globalThis === "undefined" ? globalThis : globalThis;
    module2.exports = function availableTypedArrays() {
      var out = [];
      for (var i = 0; i < possibleNames.length; i++) {
        if (typeof g[possibleNames[i]] === "function") {
          out[out.length] = possibleNames[i];
        }
      }
      return out;
    };
  }
});

// node_modules/.pnpm/define-data-property@1.1.4/node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/.pnpm/define-data-property@1.1.4/node_modules/define-data-property/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var $defineProperty = require_es_define_property();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var gopd = require_gopd();
    module2.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// node_modules/.pnpm/has-property-descriptors@1.0.2/node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/.pnpm/has-property-descriptors@1.0.2/node_modules/has-property-descriptors/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var $defineProperty = require_es_define_property();
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      return !!$defineProperty;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    };
    module2.exports = hasPropertyDescriptors;
  }
});

// node_modules/.pnpm/set-function-length@1.2.2/node_modules/set-function-length/index.js
var require_set_function_length = __commonJS({
  "node_modules/.pnpm/set-function-length@1.2.2/node_modules/set-function-length/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var GetIntrinsic = require_get_intrinsic();
    var define2 = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var gOPD = require_gopd();
    var $TypeError = require_type();
    var $floor = GetIntrinsic("%Math.floor%");
    module2.exports = function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length,
            true,
            true
          );
        } else {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length
          );
        }
      }
      return fn;
    };
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/applyBind.js
var require_applyBind = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/applyBind.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var actualApply = require_actualApply();
    module2.exports = function applyBind() {
      return actualApply(bind, $apply, arguments);
    };
  }
});

// node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var setFunctionLength = require_set_function_length();
    var $defineProperty = require_es_define_property();
    var callBindBasic = require_call_bind_apply_helpers();
    var applyBind = require_applyBind();
    module2.exports = function callBind(originalFunction) {
      var func = callBindBasic(arguments);
      var adjustedLength = originalFunction.length - (arguments.length - 1);
      return setFunctionLength(
        func,
        1 + (adjustedLength > 0 ? adjustedLength : 0),
        true
      );
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  }
});

// node_modules/.pnpm/which-typed-array@1.1.18/node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS({
  "node_modules/.pnpm/which-typed-array@1.1.18/node_modules/which-typed-array/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var forEach = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBind = require_call_bind();
    var callBound = require_call_bound();
    var gOPD = require_gopd();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var g = typeof globalThis === "undefined" ? globalThis : globalThis;
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var getPrototypeOf = Object.getPrototypeOf;
    var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf2(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var cache = { __proto__: null };
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr) {
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          cache["$" + typedArray] = callBind(descriptor.get);
        }
      });
    } else {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        var fn = arr.slice || arr.set;
        if (fn) {
          cache["$" + typedArray] = callBind(fn);
        }
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var found = false;
      forEach(
        // eslint-disable-next-line no-extra-parens
        /** @type {Record<`\$${TypedArrayName}`, Getter>} */
        /** @type {any} */
        cache,
        /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
        function(getter, typedArray) {
          if (!found) {
            try {
              if ("$" + getter(value) === typedArray) {
                found = $slice(typedArray, 1);
              }
            } catch (e) {
            }
          }
        }
      );
      return found;
    };
    var trySlices = function tryAllSlices(value) {
      var found = false;
      forEach(
        // eslint-disable-next-line no-extra-parens
        /** @type {Record<`\$${TypedArrayName}`, Getter>} */
        /** @type {any} */
        cache,
        /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
        function(getter, name) {
          if (!found) {
            try {
              getter(value);
              found = $slice(name, 1);
            } catch (e) {
            }
          }
        }
      );
      return found;
    };
    module2.exports = function whichTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag) {
        var tag = $slice($toString(value), 8, -1);
        if ($indexOf(typedArrays, tag) > -1) {
          return tag;
        }
        if (tag !== "Object") {
          return false;
        }
        return trySlices(value);
      }
      if (!gOPD) {
        return null;
      }
      return tryTypedArrays(value);
    };
  }
});

// node_modules/.pnpm/is-typed-array@1.1.15/node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS({
  "node_modules/.pnpm/is-typed-array@1.1.15/node_modules/is-typed-array/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var whichTypedArray = require_which_typed_array();
    module2.exports = function isTypedArray(value) {
      return !!whichTypedArray(value);
    };
  }
});

// node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js
var require_types = __commonJS({
  "node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js"(exports) {
    "use strict";
    init_process();
    init_buffer();
    var isArgumentsObject = require_is_arguments();
    var isGeneratorFunction = require_is_generator_function();
    var whichTypedArray = require_which_typed_array();
    var isTypedArray = require_is_typed_array();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    var bigIntValue;
    if (SymbolSupported) {
      symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    var symbolValue;
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isArgumentsObject = isArgumentsObject;
    exports.isGeneratorFunction = isGeneratorFunction;
    exports.isTypedArray = isTypedArray;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray(value) || isDataView(value);
    }
    exports.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }
    exports.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray(value) === "Uint8ClampedArray";
    }
    exports.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray(value) === "Uint16Array";
    }
    exports.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray(value) === "Uint32Array";
    }
    exports.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }
    exports.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray(value) === "Int16Array";
    }
    exports.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray(value) === "Int32Array";
    }
    exports.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray(value) === "Float32Array";
    }
    exports.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }
    exports.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray(value) === "BigInt64Array";
    }
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray(value) === "BigUint64Array";
    }
    exports.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    exports.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  }
});

// node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js
var require_isBufferBrowser = __commonJS({
  "node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js"(exports, module2) {
    init_process();
    init_buffer();
    module2.exports = function isBuffer2(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  }
});

// node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js"(exports, module2) {
    init_process();
    init_buffer();
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/.pnpm/util@0.12.5/node_modules/util/util.js
var require_util = __commonJS({
  "node_modules/.pnpm/util@0.12.5/node_modules/util/util.js"(exports) {
    init_process();
    init_buffer();
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%") return "%";
        if (i >= len) return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (typeof process !== "undefined" && process.noDeprecation === true) {
        return fn;
      }
      if (typeof process === "undefined") {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (process.env.NODE_DEBUG) {
      debugEnv = process.env.NODE_DEBUG;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    var debugEnv;
    exports.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3) ctx.depth = arguments[2];
      if (arguments.length >= 4) ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
      if (isUndefined(ctx.depth)) ctx.depth = 2;
      if (isUndefined(ctx.colors)) ctx.colors = false;
      if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
      if (ctx.colors) ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").slice(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, -1);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    exports.types = require_types();
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    exports.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    exports.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    exports.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require_isBufferBrowser();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = /* @__PURE__ */ new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require_inherits_browser();
    exports._extend = function(origin, add) {
      if (!add || !isObject(add)) return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err, value) {
          if (err) {
            promiseReject(err);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err) {
          promiseReject(err);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    };
    exports.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self2 = this;
        var cb = function() {
          return maybeCb.apply(self2, arguments);
        };
        original.apply(this, args).then(
          function(ret) {
            process.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    exports.callbackify = callbackify;
  }
});

// node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/errors.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return _typeof(key) === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (_typeof(input) !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      Object.defineProperty(subClass, "prototype", { writable: false });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    var codes = {};
    var assert2;
    var util;
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inherits(NodeError2, _Base);
        var _super = _createSuper(NodeError2);
        function NodeError2(arg1, arg2, arg3) {
          var _this;
          _classCallCheck(this, NodeError2);
          _this = _super.call(this, getMessage(arg1, arg2, arg3));
          _this.code = code;
          return _this;
        }
        return _createClass(NodeError2);
      }(Base);
      codes[code] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i) {
          return String(i);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes2(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      if (assert2 === void 0) assert2 = require_assert();
      assert2(typeof name === "string", "'name' must be a string");
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type = includes2(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      msg += ". Received type ".concat(_typeof(actual));
      return msg;
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_VALUE", function(name, value) {
      var reason = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
      if (util === void 0) util = require_util();
      var inspected = util.inspect(value);
      if (inspected.length > 128) {
        inspected = "".concat(inspected.slice(0, 128), "...");
      }
      return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
    }, TypeError, RangeError);
    createErrorType("ERR_INVALID_RETURN_VALUE", function(input, name, value) {
      var type;
      if (value && value.constructor && value.constructor.name) {
        type = "instance of ".concat(value.constructor.name);
      } else {
        type = "type ".concat(_typeof(value));
      }
      return "Expected ".concat(input, ' to be returned from the "').concat(name, '"') + " function but got ".concat(type, ".");
    }, TypeError);
    createErrorType("ERR_MISSING_ARGS", function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (assert2 === void 0) assert2 = require_assert();
      assert2(args.length > 0, "At least one arg needs to be specified");
      var msg = "The ";
      var len = args.length;
      args = args.map(function(a) {
        return '"'.concat(a, '"');
      });
      switch (len) {
        case 1:
          msg += "".concat(args[0], " argument");
          break;
        case 2:
          msg += "".concat(args[0], " and ").concat(args[1], " arguments");
          break;
        default:
          msg += args.slice(0, len - 1).join(", ");
          msg += ", and ".concat(args[len - 1], " arguments");
          break;
      }
      return "".concat(msg, " must be specified");
    }, TypeError);
    module2.exports.codes = codes;
  }
});

// node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/assert/assertion_error.js
var require_assertion_error = __commonJS({
  "node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/assert/assertion_error.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return _typeof(key) === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (_typeof(input) !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      Object.defineProperty(subClass, "prototype", { writable: false });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
      _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
        if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
        if (typeof Class2 !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
          if (_cache.has(Class2)) return _cache.get(Class2);
          _cache.set(Class2, Wrapper);
        }
        function Wrapper() {
          return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
        return _setPrototypeOf(Wrapper, Class2);
      };
      return _wrapNativeSuper(Class);
    }
    function _construct(Parent, args, Class) {
      if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct.bind();
      } else {
        _construct = function _construct2(Parent2, args2, Class2) {
          var a = [null];
          a.push.apply(a, args2);
          var Constructor = Function.bind.apply(Parent2, a);
          var instance = new Constructor();
          if (Class2) _setPrototypeOf(instance, Class2.prototype);
          return instance;
        };
      }
      return _construct.apply(null, arguments);
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var _require = require_util();
    var inspect = _require.inspect;
    var _require2 = require_errors();
    var ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function repeat(str, count) {
      count = Math.floor(count);
      if (str.length == 0 || count == 0) return "";
      var maxCount = str.length * count;
      count = Math.floor(Math.log(count) / Math.log(2));
      while (count) {
        str += str;
        count--;
      }
      str += str.substring(0, maxCount - str.length);
      return str;
    }
    var blue = "";
    var green = "";
    var red = "";
    var white = "";
    var kReadableOperator = {
      deepStrictEqual: "Expected values to be strictly deep-equal:",
      strictEqual: "Expected values to be strictly equal:",
      strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
      deepEqual: "Expected values to be loosely deep-equal:",
      equal: "Expected values to be loosely equal:",
      notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
      notStrictEqual: 'Expected "actual" to be strictly unequal to:',
      notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
      notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
      notEqual: 'Expected "actual" to be loosely unequal to:',
      notIdentical: "Values identical but not reference-equal:"
    };
    var kMaxShortLength = 10;
    function copyError(source) {
      var keys = Object.keys(source);
      var target = Object.create(Object.getPrototypeOf(source));
      keys.forEach(function(key) {
        target[key] = source[key];
      });
      Object.defineProperty(target, "message", {
        value: source.message
      });
      return target;
    }
    function inspectValue(val) {
      return inspect(val, {
        compact: false,
        customInspect: false,
        depth: 1e3,
        maxArrayLength: Infinity,
        // Assert compares only enumerable properties (with a few exceptions).
        showHidden: false,
        // Having a long line as error is better than wrapping the line for
        // comparison for now.
        // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
        // have meta information about the inspected properties (i.e., know where
        // in what line the property starts and ends).
        breakLength: Infinity,
        // Assert does not detect proxies currently.
        showProxy: false,
        sorted: true,
        // Inspect getters as we also check them when comparing entries.
        getters: true
      });
    }
    function createErrDiff(actual, expected, operator) {
      var other = "";
      var res = "";
      var lastPos = 0;
      var end = "";
      var skipped = false;
      var actualInspected = inspectValue(actual);
      var actualLines = actualInspected.split("\n");
      var expectedLines = inspectValue(expected).split("\n");
      var i = 0;
      var indicator = "";
      if (operator === "strictEqual" && _typeof(actual) === "object" && _typeof(expected) === "object" && actual !== null && expected !== null) {
        operator = "strictEqualObject";
      }
      if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
        var inputLength = actualLines[0].length + expectedLines[0].length;
        if (inputLength <= kMaxShortLength) {
          if ((_typeof(actual) !== "object" || actual === null) && (_typeof(expected) !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
            return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
          }
        } else if (operator !== "strictEqualObject") {
          var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
          if (inputLength < maxLength) {
            while (actualLines[0][i] === expectedLines[0][i]) {
              i++;
            }
            if (i > 2) {
              indicator = "\n  ".concat(repeat(" ", i), "^");
              i = 0;
            }
          }
        }
      }
      var a = actualLines[actualLines.length - 1];
      var b = expectedLines[expectedLines.length - 1];
      while (a === b) {
        if (i++ < 2) {
          end = "\n  ".concat(a).concat(end);
        } else {
          other = a;
        }
        actualLines.pop();
        expectedLines.pop();
        if (actualLines.length === 0 || expectedLines.length === 0) break;
        a = actualLines[actualLines.length - 1];
        b = expectedLines[expectedLines.length - 1];
      }
      var maxLines = Math.max(actualLines.length, expectedLines.length);
      if (maxLines === 0) {
        var _actualLines = actualInspected.split("\n");
        if (_actualLines.length > 30) {
          _actualLines[26] = "".concat(blue, "...").concat(white);
          while (_actualLines.length > 27) {
            _actualLines.pop();
          }
        }
        return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join("\n"), "\n");
      }
      if (i > 3) {
        end = "\n".concat(blue, "...").concat(white).concat(end);
        skipped = true;
      }
      if (other !== "") {
        end = "\n  ".concat(other).concat(end);
        other = "";
      }
      var printedLines = 0;
      var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
      var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
      for (i = 0; i < maxLines; i++) {
        var cur = i - lastPos;
        if (actualLines.length < i + 1) {
          if (cur > 1 && i > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(expectedLines[i - 2]);
              printedLines++;
            }
            res += "\n  ".concat(expectedLines[i - 1]);
            printedLines++;
          }
          lastPos = i;
          other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
          printedLines++;
        } else if (expectedLines.length < i + 1) {
          if (cur > 1 && i > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(actualLines[i - 2]);
              printedLines++;
            }
            res += "\n  ".concat(actualLines[i - 1]);
            printedLines++;
          }
          lastPos = i;
          res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
          printedLines++;
        } else {
          var expectedLine = expectedLines[i];
          var actualLine = actualLines[i];
          var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
          if (divergingLines && endsWith(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
            divergingLines = false;
            actualLine += ",";
          }
          if (divergingLines) {
            if (cur > 1 && i > 2) {
              if (cur > 4) {
                res += "\n".concat(blue, "...").concat(white);
                skipped = true;
              } else if (cur > 3) {
                res += "\n  ".concat(actualLines[i - 2]);
                printedLines++;
              }
              res += "\n  ".concat(actualLines[i - 1]);
              printedLines++;
            }
            lastPos = i;
            res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
            other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
            printedLines += 2;
          } else {
            res += other;
            other = "";
            if (cur === 1 || i === 0) {
              res += "\n  ".concat(actualLine);
              printedLines++;
            }
          }
        }
        if (printedLines > 20 && i < maxLines - 2) {
          return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
        }
      }
      return "".concat(msg).concat(skipped ? skippedMsg : "", "\n").concat(res).concat(other).concat(end).concat(indicator);
    }
    var AssertionError = /* @__PURE__ */ function(_Error, _inspect$custom) {
      _inherits(AssertionError2, _Error);
      var _super = _createSuper(AssertionError2);
      function AssertionError2(options) {
        var _this;
        _classCallCheck(this, AssertionError2);
        if (_typeof(options) !== "object" || options === null) {
          throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
        }
        var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
        var actual = options.actual, expected = options.expected;
        var limit = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        if (message != null) {
          _this = _super.call(this, String(message));
        } else {
          if (process.stderr && process.stderr.isTTY) {
            if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
              blue = "\x1B[34m";
              green = "\x1B[32m";
              white = "\x1B[39m";
              red = "\x1B[31m";
            } else {
              blue = "";
              green = "";
              white = "";
              red = "";
            }
          }
          if (_typeof(actual) === "object" && actual !== null && _typeof(expected) === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
            actual = copyError(actual);
            expected = copyError(expected);
          }
          if (operator === "deepStrictEqual" || operator === "strictEqual") {
            _this = _super.call(this, createErrDiff(actual, expected, operator));
          } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
            var base = kReadableOperator[operator];
            var res = inspectValue(actual).split("\n");
            if (operator === "notStrictEqual" && _typeof(actual) === "object" && actual !== null) {
              base = kReadableOperator.notStrictEqualObject;
            }
            if (res.length > 30) {
              res[26] = "".concat(blue, "...").concat(white);
              while (res.length > 27) {
                res.pop();
              }
            }
            if (res.length === 1) {
              _this = _super.call(this, "".concat(base, " ").concat(res[0]));
            } else {
              _this = _super.call(this, "".concat(base, "\n\n").concat(res.join("\n"), "\n"));
            }
          } else {
            var _res = inspectValue(actual);
            var other = "";
            var knownOperators = kReadableOperator[operator];
            if (operator === "notDeepEqual" || operator === "notEqual") {
              _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
              if (_res.length > 1024) {
                _res = "".concat(_res.slice(0, 1021), "...");
              }
            } else {
              other = "".concat(inspectValue(expected));
              if (_res.length > 512) {
                _res = "".concat(_res.slice(0, 509), "...");
              }
              if (other.length > 512) {
                other = "".concat(other.slice(0, 509), "...");
              }
              if (operator === "deepEqual" || operator === "equal") {
                _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
              } else {
                other = " ".concat(operator, " ").concat(other);
              }
            }
            _this = _super.call(this, "".concat(_res).concat(other));
          }
        }
        Error.stackTraceLimit = limit;
        _this.generatedMessage = !message;
        Object.defineProperty(_assertThisInitialized(_this), "name", {
          value: "AssertionError [ERR_ASSERTION]",
          enumerable: false,
          writable: true,
          configurable: true
        });
        _this.code = "ERR_ASSERTION";
        _this.actual = actual;
        _this.expected = expected;
        _this.operator = operator;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
        }
        _this.stack;
        _this.name = "AssertionError";
        return _possibleConstructorReturn(_this);
      }
      _createClass(AssertionError2, [{
        key: "toString",
        value: function toString2() {
          return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
        }
      }, {
        key: _inspect$custom,
        value: function value(recurseTimes, ctx) {
          return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
            customInspect: false,
            depth: 0
          }));
        }
      }]);
      return AssertionError2;
    }(/* @__PURE__ */ _wrapNativeSuper(Error), inspect.custom);
    module2.exports = AssertionError;
  }
});

// node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var toStr = Object.prototype.toString;
    module2.exports = function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === "[object Arguments]";
      if (!isArgs) {
        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
      }
      return isArgs;
    };
  }
});

// node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/implementation.js
var require_implementation2 = __commonJS({
  "node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/implementation.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var keysShim;
    if (!Object.keys) {
      has = Object.prototype.hasOwnProperty;
      toStr = Object.prototype.toString;
      isArgs = require_isArguments();
      isEnumerable = Object.prototype.propertyIsEnumerable;
      hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      hasAutomationEqualityBug = function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      }();
      equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      };
      keysShim = function keys(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr.call(object) === "[object Function]";
        var isArguments = isArgs(object);
        var isString = isObject && toStr.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0)) {
          for (var i = 0; i < object.length; ++i) {
            theKeys.push(String(i));
          }
        }
        if (isArguments && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      };
    }
    var has;
    var toStr;
    var isArgs;
    var isEnumerable;
    var hasDontEnumBug;
    var hasProtoEnumBug;
    var dontEnums;
    var equalsConstructorPrototype;
    var excludedKeys;
    var hasAutomationEqualityBug;
    var equalsConstructorPrototypeIfNotBuggy;
    module2.exports = keysShim;
  }
});

// node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js
var require_object_keys = __commonJS({
  "node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var slice2 = Array.prototype.slice;
    var isArgs = require_isArguments();
    var origKeys = Object.keys;
    var keysShim = origKeys ? function keys(o) {
      return origKeys(o);
    } : require_implementation2();
    var originalKeys = Object.keys;
    keysShim.shim = function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = function() {
          var args = Object.keys(arguments);
          return args && args.length === arguments.length;
        }(1, 2);
        if (!keysWorksWithArguments) {
          Object.keys = function keys(object) {
            if (isArgs(object)) {
              return originalKeys(slice2.call(object));
            }
            return originalKeys(object);
          };
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    };
    module2.exports = keysShim;
  }
});

// node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/implementation.js
var require_implementation3 = __commonJS({
  "node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/implementation.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var objectKeys = require_object_keys();
    var hasSymbols = require_shams()();
    var callBound = require_call_bound();
    var $Object = require_es_object_atoms();
    var $push = callBound("Array.prototype.push");
    var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
    var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;
    module2.exports = function assign(target, source1) {
      if (target == null) {
        throw new TypeError("target must be an object");
      }
      var to = $Object(target);
      if (arguments.length === 1) {
        return to;
      }
      for (var s = 1; s < arguments.length; ++s) {
        var from2 = $Object(arguments[s]);
        var keys = objectKeys(from2);
        var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
        if (getSymbols) {
          var syms = getSymbols(from2);
          for (var j = 0; j < syms.length; ++j) {
            var key = syms[j];
            if ($propIsEnumerable(from2, key)) {
              $push(keys, key);
            }
          }
        }
        for (var i = 0; i < keys.length; ++i) {
          var nextKey = keys[i];
          if ($propIsEnumerable(from2, nextKey)) {
            var propValue = from2[nextKey];
            to[nextKey] = propValue;
          }
        }
      }
      return to;
    };
  }
});

// node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/polyfill.js
var require_polyfill = __commonJS({
  "node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/polyfill.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var implementation = require_implementation3();
    var lacksProperEnumerationOrder = function() {
      if (!Object.assign) {
        return false;
      }
      var str = "abcdefghijklmnopqrst";
      var letters = str.split("");
      var map = {};
      for (var i = 0; i < letters.length; ++i) {
        map[letters[i]] = letters[i];
      }
      var obj = Object.assign({}, map);
      var actual = "";
      for (var k in obj) {
        actual += k;
      }
      return str !== actual;
    };
    var assignHasPendingExceptions = function() {
      if (!Object.assign || !Object.preventExtensions) {
        return false;
      }
      var thrower = Object.preventExtensions({ 1: 2 });
      try {
        Object.assign(thrower, "xy");
      } catch (e) {
        return thrower[1] === "y";
      }
      return false;
    };
    module2.exports = function getPolyfill() {
      if (!Object.assign) {
        return implementation;
      }
      if (lacksProperEnumerationOrder()) {
        return implementation;
      }
      if (assignHasPendingExceptions()) {
        return implementation;
      }
      return Object.assign;
    };
  }
});

// node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/implementation.js
var require_implementation4 = __commonJS({
  "node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/implementation.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var numberIsNaN = function(value) {
      return value !== value;
    };
    module2.exports = function is(a, b) {
      if (a === 0 && b === 0) {
        return 1 / a === 1 / b;
      }
      if (a === b) {
        return true;
      }
      if (numberIsNaN(a) && numberIsNaN(b)) {
        return true;
      }
      return false;
    };
  }
});

// node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/polyfill.js
var require_polyfill2 = __commonJS({
  "node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/polyfill.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var implementation = require_implementation4();
    module2.exports = function getPolyfill() {
      return typeof Object.is === "function" ? Object.is : implementation;
    };
  }
});

// node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/callBound.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/.pnpm/define-properties@1.2.1/node_modules/define-properties/index.js
var require_define_properties = __commonJS({
  "node_modules/.pnpm/define-properties@1.2.1/node_modules/define-properties/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var keys = require_object_keys();
    var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
    var toStr = Object.prototype.toString;
    var concat2 = Array.prototype.concat;
    var defineDataProperty = require_define_data_property();
    var isFunction = function(fn) {
      return typeof fn === "function" && toStr.call(fn) === "[object Function]";
    };
    var supportsDescriptors = require_has_property_descriptors()();
    var defineProperty = function(object, name, value, predicate) {
      if (name in object) {
        if (predicate === true) {
          if (object[name] === value) {
            return;
          }
        } else if (!isFunction(predicate) || !predicate()) {
          return;
        }
      }
      if (supportsDescriptors) {
        defineDataProperty(object, name, value, true);
      } else {
        defineDataProperty(object, name, value);
      }
    };
    var defineProperties = function(object, map) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys(map);
      if (hasSymbols) {
        props = concat2.call(props, Object.getOwnPropertySymbols(map));
      }
      for (var i = 0; i < props.length; i += 1) {
        defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
      }
    };
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    module2.exports = defineProperties;
  }
});

// node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/shim.js
var require_shim = __commonJS({
  "node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/shim.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var getPolyfill = require_polyfill2();
    var define2 = require_define_properties();
    module2.exports = function shimObjectIs() {
      var polyfill = getPolyfill();
      define2(Object, { is: polyfill }, {
        is: function testObjectIs() {
          return Object.is !== polyfill;
        }
      });
      return polyfill;
    };
  }
});

// node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/index.js
var require_object_is = __commonJS({
  "node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var define2 = require_define_properties();
    var callBind = require_call_bind();
    var implementation = require_implementation4();
    var getPolyfill = require_polyfill2();
    var shim = require_shim();
    var polyfill = callBind(getPolyfill(), Object);
    define2(polyfill, {
      getPolyfill,
      implementation,
      shim
    });
    module2.exports = polyfill;
  }
});

// node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/implementation.js
var require_implementation5 = __commonJS({
  "node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/implementation.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    module2.exports = function isNaN2(value) {
      return value !== value;
    };
  }
});

// node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/polyfill.js
var require_polyfill3 = __commonJS({
  "node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/polyfill.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var implementation = require_implementation5();
    module2.exports = function getPolyfill() {
      if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a")) {
        return Number.isNaN;
      }
      return implementation;
    };
  }
});

// node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/shim.js
var require_shim2 = __commonJS({
  "node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/shim.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var define2 = require_define_properties();
    var getPolyfill = require_polyfill3();
    module2.exports = function shimNumberIsNaN() {
      var polyfill = getPolyfill();
      define2(Number, { isNaN: polyfill }, {
        isNaN: function testIsNaN() {
          return Number.isNaN !== polyfill;
        }
      });
      return polyfill;
    };
  }
});

// node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/index.js
var require_is_nan = __commonJS({
  "node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/index.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    var callBind = require_call_bind();
    var define2 = require_define_properties();
    var implementation = require_implementation5();
    var getPolyfill = require_polyfill3();
    var shim = require_shim2();
    var polyfill = callBind(getPolyfill(), Number);
    define2(polyfill, {
      getPolyfill,
      implementation,
      shim
    });
    module2.exports = polyfill;
  }
});

// node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/util/comparisons.js
var require_comparisons = __commonJS({
  "node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/util/comparisons.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t) return;
            f = false;
          } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var regexFlagsSupported = /a/g.flags !== void 0;
    var arrayFromSet = function arrayFromSet2(set) {
      var array = [];
      set.forEach(function(value) {
        return array.push(value);
      });
      return array;
    };
    var arrayFromMap = function arrayFromMap2(map) {
      var array = [];
      map.forEach(function(value, key) {
        return array.push([key, value]);
      });
      return array;
    };
    var objectIs = Object.is ? Object.is : require_object_is();
    var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
      return [];
    };
    var numberIsNaN = Number.isNaN ? Number.isNaN : require_is_nan();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
    var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
    var objectToString = uncurryThis(Object.prototype.toString);
    var _require$types = require_util().types;
    var isAnyArrayBuffer = _require$types.isAnyArrayBuffer;
    var isArrayBufferView = _require$types.isArrayBufferView;
    var isDate = _require$types.isDate;
    var isMap = _require$types.isMap;
    var isRegExp = _require$types.isRegExp;
    var isSet = _require$types.isSet;
    var isNativeError = _require$types.isNativeError;
    var isBoxedPrimitive = _require$types.isBoxedPrimitive;
    var isNumberObject = _require$types.isNumberObject;
    var isStringObject = _require$types.isStringObject;
    var isBooleanObject = _require$types.isBooleanObject;
    var isBigIntObject = _require$types.isBigIntObject;
    var isSymbolObject = _require$types.isSymbolObject;
    var isFloat32Array = _require$types.isFloat32Array;
    var isFloat64Array = _require$types.isFloat64Array;
    function isNonIndex(key) {
      if (key.length === 0 || key.length > 10) return true;
      for (var i = 0; i < key.length; i++) {
        var code = key.charCodeAt(i);
        if (code < 48 || code > 57) return true;
      }
      return key.length === 10 && key >= Math.pow(2, 32);
    }
    function getOwnNonIndexProperties(value) {
      return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
    }
    function compare3(a, b) {
      if (a === b) {
        return 0;
      }
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1;
      }
      return 0;
    }
    var ONLY_ENUMERABLE = void 0;
    var kStrict = true;
    var kLoose = false;
    var kNoIterator = 0;
    var kIsArray = 1;
    var kIsSet = 2;
    var kIsMap = 3;
    function areSimilarRegExps(a, b) {
      return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
    }
    function areSimilarFloatArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      for (var offset = 0; offset < a.byteLength; offset++) {
        if (a[offset] !== b[offset]) {
          return false;
        }
      }
      return true;
    }
    function areSimilarTypedArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return compare3(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
    }
    function areEqualArrayBuffers(buf1, buf2) {
      return buf1.byteLength === buf2.byteLength && compare3(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
    }
    function isEqualBoxedPrimitive(val1, val2) {
      if (isNumberObject(val1)) {
        return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
      }
      if (isStringObject(val1)) {
        return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
      }
      if (isBooleanObject(val1)) {
        return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
      }
      if (isBigIntObject(val1)) {
        return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
      }
      return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
    }
    function innerDeepEqual(val1, val2, strict, memos) {
      if (val1 === val2) {
        if (val1 !== 0) return true;
        return strict ? objectIs(val1, val2) : true;
      }
      if (strict) {
        if (_typeof(val1) !== "object") {
          return typeof val1 === "number" && numberIsNaN(val1) && numberIsNaN(val2);
        }
        if (_typeof(val2) !== "object" || val1 === null || val2 === null) {
          return false;
        }
        if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
          return false;
        }
      } else {
        if (val1 === null || _typeof(val1) !== "object") {
          if (val2 === null || _typeof(val2) !== "object") {
            return val1 == val2;
          }
          return false;
        }
        if (val2 === null || _typeof(val2) !== "object") {
          return false;
        }
      }
      var val1Tag = objectToString(val1);
      var val2Tag = objectToString(val2);
      if (val1Tag !== val2Tag) {
        return false;
      }
      if (Array.isArray(val1)) {
        if (val1.length !== val2.length) {
          return false;
        }
        var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
        var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
        if (keys1.length !== keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
      }
      if (val1Tag === "[object Object]") {
        if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
          return false;
        }
      }
      if (isDate(val1)) {
        if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
          return false;
        }
      } else if (isRegExp(val1)) {
        if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
          return false;
        }
      } else if (isNativeError(val1) || val1 instanceof Error) {
        if (val1.message !== val2.message || val1.name !== val2.name) {
          return false;
        }
      } else if (isArrayBufferView(val1)) {
        if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
          if (!areSimilarFloatArrays(val1, val2)) {
            return false;
          }
        } else if (!areSimilarTypedArrays(val1, val2)) {
          return false;
        }
        var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
        var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
        if (_keys.length !== _keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
      } else if (isSet(val1)) {
        if (!isSet(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsSet);
      } else if (isMap(val1)) {
        if (!isMap(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsMap);
      } else if (isAnyArrayBuffer(val1)) {
        if (!areEqualArrayBuffers(val1, val2)) {
          return false;
        }
      } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
        return false;
      }
      return keyCheck(val1, val2, strict, memos, kNoIterator);
    }
    function getEnumerables(val, keys) {
      return keys.filter(function(k) {
        return propertyIsEnumerable(val, k);
      });
    }
    function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
      if (arguments.length === 5) {
        aKeys = Object.keys(val1);
        var bKeys = Object.keys(val2);
        if (aKeys.length !== bKeys.length) {
          return false;
        }
      }
      var i = 0;
      for (; i < aKeys.length; i++) {
        if (!hasOwnProperty(val2, aKeys[i])) {
          return false;
        }
      }
      if (strict && arguments.length === 5) {
        var symbolKeysA = objectGetOwnPropertySymbols(val1);
        if (symbolKeysA.length !== 0) {
          var count = 0;
          for (i = 0; i < symbolKeysA.length; i++) {
            var key = symbolKeysA[i];
            if (propertyIsEnumerable(val1, key)) {
              if (!propertyIsEnumerable(val2, key)) {
                return false;
              }
              aKeys.push(key);
              count++;
            } else if (propertyIsEnumerable(val2, key)) {
              return false;
            }
          }
          var symbolKeysB = objectGetOwnPropertySymbols(val2);
          if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
            return false;
          }
        } else {
          var _symbolKeysB = objectGetOwnPropertySymbols(val2);
          if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
            return false;
          }
        }
      }
      if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
        return true;
      }
      if (memos === void 0) {
        memos = {
          val1: /* @__PURE__ */ new Map(),
          val2: /* @__PURE__ */ new Map(),
          position: 0
        };
      } else {
        var val2MemoA = memos.val1.get(val1);
        if (val2MemoA !== void 0) {
          var val2MemoB = memos.val2.get(val2);
          if (val2MemoB !== void 0) {
            return val2MemoA === val2MemoB;
          }
        }
        memos.position++;
      }
      memos.val1.set(val1, memos.position);
      memos.val2.set(val2, memos.position);
      var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
      memos.val1.delete(val1);
      memos.val2.delete(val2);
      return areEq;
    }
    function setHasEqualElement(set, val1, strict, memo) {
      var setValues = arrayFromSet(set);
      for (var i = 0; i < setValues.length; i++) {
        var val2 = setValues[i];
        if (innerDeepEqual(val1, val2, strict, memo)) {
          set.delete(val2);
          return true;
        }
      }
      return false;
    }
    function findLooseMatchingPrimitives(prim) {
      switch (_typeof(prim)) {
        case "undefined":
          return null;
        case "object":
          return void 0;
        case "symbol":
          return false;
        case "string":
          prim = +prim;
        // Loose equal entries exist only if the string is possible to convert to
        // a regular number and not NaN.
        // Fall through
        case "number":
          if (numberIsNaN(prim)) {
            return false;
          }
      }
      return true;
    }
    function setMightHaveLoosePrim(a, b, prim) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null) return altValue;
      return b.has(altValue) && !a.has(altValue);
    }
    function mapMightHaveLoosePrim(a, b, prim, item, memo) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null) {
        return altValue;
      }
      var curB = b.get(altValue);
      if (curB === void 0 && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
        return false;
      }
      return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
    }
    function setEquiv(a, b, strict, memo) {
      var set = null;
      var aValues = arrayFromSet(a);
      for (var i = 0; i < aValues.length; i++) {
        var val = aValues[i];
        if (_typeof(val) === "object" && val !== null) {
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(val);
        } else if (!b.has(val)) {
          if (strict) return false;
          if (!setMightHaveLoosePrim(a, b, val)) {
            return false;
          }
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(val);
        }
      }
      if (set !== null) {
        var bValues = arrayFromSet(b);
        for (var _i = 0; _i < bValues.length; _i++) {
          var _val = bValues[_i];
          if (_typeof(_val) === "object" && _val !== null) {
            if (!setHasEqualElement(set, _val, strict, memo)) return false;
          } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
            return false;
          }
        }
        return set.size === 0;
      }
      return true;
    }
    function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
      var setValues = arrayFromSet(set);
      for (var i = 0; i < setValues.length; i++) {
        var key2 = setValues[i];
        if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
          set.delete(key2);
          return true;
        }
      }
      return false;
    }
    function mapEquiv(a, b, strict, memo) {
      var set = null;
      var aEntries = arrayFromMap(a);
      for (var i = 0; i < aEntries.length; i++) {
        var _aEntries$i = _slicedToArray(aEntries[i], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
        if (_typeof(key) === "object" && key !== null) {
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(key);
        } else {
          var item2 = b.get(key);
          if (item2 === void 0 && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
            if (strict) return false;
            if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(key);
          }
        }
      }
      if (set !== null) {
        var bEntries = arrayFromMap(b);
        for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
          var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), _key = _bEntries$_i[0], item = _bEntries$_i[1];
          if (_typeof(_key) === "object" && _key !== null) {
            if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
          } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
            return false;
          }
        }
        return set.size === 0;
      }
      return true;
    }
    function objEquiv(a, b, strict, keys, memos, iterationType) {
      var i = 0;
      if (iterationType === kIsSet) {
        if (!setEquiv(a, b, strict, memos)) {
          return false;
        }
      } else if (iterationType === kIsMap) {
        if (!mapEquiv(a, b, strict, memos)) {
          return false;
        }
      } else if (iterationType === kIsArray) {
        for (; i < a.length; i++) {
          if (hasOwnProperty(a, i)) {
            if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
              return false;
            }
          } else if (hasOwnProperty(b, i)) {
            return false;
          } else {
            var keysA = Object.keys(a);
            for (; i < keysA.length; i++) {
              var key = keysA[i];
              if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
                return false;
              }
            }
            if (keysA.length !== Object.keys(b).length) {
              return false;
            }
            return true;
          }
        }
      }
      for (i = 0; i < keys.length; i++) {
        var _key2 = keys[i];
        if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
          return false;
        }
      }
      return true;
    }
    function isDeepEqual(val1, val2) {
      return innerDeepEqual(val1, val2, kLoose);
    }
    function isDeepStrictEqual(val1, val2) {
      return innerDeepEqual(val1, val2, kStrict);
    }
    module2.exports = {
      isDeepEqual,
      isDeepStrictEqual
    };
  }
});

// node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js
var require_assert = __commonJS({
  "node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js"(exports, module2) {
    "use strict";
    init_process();
    init_buffer();
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return _typeof(key) === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (_typeof(input) !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var _require = require_errors();
    var _require$codes = _require.codes;
    var ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE;
    var ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var AssertionError = require_assertion_error();
    var _require2 = require_util();
    var inspect = _require2.inspect;
    var _require$types = require_util().types;
    var isPromise = _require$types.isPromise;
    var isRegExp = _require$types.isRegExp;
    var objectAssign = require_polyfill()();
    var objectIs = require_polyfill2()();
    var RegExpPrototypeTest = require_callBound()("RegExp.prototype.test");
    var isDeepEqual;
    var isDeepStrictEqual;
    function lazyLoadComparison() {
      var comparison = require_comparisons();
      isDeepEqual = comparison.isDeepEqual;
      isDeepStrictEqual = comparison.isDeepStrictEqual;
    }
    var warned = false;
    var assert2 = module2.exports = ok;
    var NO_EXCEPTION_SENTINEL = {};
    function innerFail(obj) {
      if (obj.message instanceof Error) throw obj.message;
      throw new AssertionError(obj);
    }
    function fail(actual, expected, message, operator, stackStartFn) {
      var argsLen = arguments.length;
      var internalMessage;
      if (argsLen === 0) {
        internalMessage = "Failed";
      } else if (argsLen === 1) {
        message = actual;
        actual = void 0;
      } else {
        if (warned === false) {
          warned = true;
          var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
          warn("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
        }
        if (argsLen === 2) operator = "!=";
      }
      if (message instanceof Error) throw message;
      var errArgs = {
        actual,
        expected,
        operator: operator === void 0 ? "fail" : operator,
        stackStartFn: stackStartFn || fail
      };
      if (message !== void 0) {
        errArgs.message = message;
      }
      var err = new AssertionError(errArgs);
      if (internalMessage) {
        err.message = internalMessage;
        err.generatedMessage = true;
      }
      throw err;
    }
    assert2.fail = fail;
    assert2.AssertionError = AssertionError;
    function innerOk(fn, argLen, value, message) {
      if (!value) {
        var generatedMessage = false;
        if (argLen === 0) {
          generatedMessage = true;
          message = "No value argument passed to `assert.ok()`";
        } else if (message instanceof Error) {
          throw message;
        }
        var err = new AssertionError({
          actual: value,
          expected: true,
          message,
          operator: "==",
          stackStartFn: fn
        });
        err.generatedMessage = generatedMessage;
        throw err;
      }
    }
    function ok() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      innerOk.apply(void 0, [ok, args.length].concat(args));
    }
    assert2.ok = ok;
    assert2.equal = function equal(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (actual != expected) {
        innerFail({
          actual,
          expected,
          message,
          operator: "==",
          stackStartFn: equal
        });
      }
    };
    assert2.notEqual = function notEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (actual == expected) {
        innerFail({
          actual,
          expected,
          message,
          operator: "!=",
          stackStartFn: notEqual
        });
      }
    };
    assert2.deepEqual = function deepEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0) lazyLoadComparison();
      if (!isDeepEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "deepEqual",
          stackStartFn: deepEqual
        });
      }
    };
    assert2.notDeepEqual = function notDeepEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0) lazyLoadComparison();
      if (isDeepEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notDeepEqual",
          stackStartFn: notDeepEqual
        });
      }
    };
    assert2.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0) lazyLoadComparison();
      if (!isDeepStrictEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "deepStrictEqual",
          stackStartFn: deepStrictEqual
        });
      }
    };
    assert2.notDeepStrictEqual = notDeepStrictEqual;
    function notDeepStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0) lazyLoadComparison();
      if (isDeepStrictEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notDeepStrictEqual",
          stackStartFn: notDeepStrictEqual
        });
      }
    }
    assert2.strictEqual = function strictEqual2(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (!objectIs(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "strictEqual",
          stackStartFn: strictEqual2
        });
      }
    };
    assert2.notStrictEqual = function notStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (objectIs(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notStrictEqual",
          stackStartFn: notStrictEqual
        });
      }
    };
    var Comparison = /* @__PURE__ */ _createClass(function Comparison2(obj, keys, actual) {
      var _this = this;
      _classCallCheck(this, Comparison2);
      keys.forEach(function(key) {
        if (key in obj) {
          if (actual !== void 0 && typeof actual[key] === "string" && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
            _this[key] = actual[key];
          } else {
            _this[key] = obj[key];
          }
        }
      });
    });
    function compareExceptionKey(actual, expected, key, message, keys, fn) {
      if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
        if (!message) {
          var a = new Comparison(actual, keys);
          var b = new Comparison(expected, keys, actual);
          var err = new AssertionError({
            actual: a,
            expected: b,
            operator: "deepStrictEqual",
            stackStartFn: fn
          });
          err.actual = actual;
          err.expected = expected;
          err.operator = fn.name;
          throw err;
        }
        innerFail({
          actual,
          expected,
          message,
          operator: fn.name,
          stackStartFn: fn
        });
      }
    }
    function expectedException(actual, expected, msg, fn) {
      if (typeof expected !== "function") {
        if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
        if (arguments.length === 2) {
          throw new ERR_INVALID_ARG_TYPE("expected", ["Function", "RegExp"], expected);
        }
        if (_typeof(actual) !== "object" || actual === null) {
          var err = new AssertionError({
            actual,
            expected,
            message: msg,
            operator: "deepStrictEqual",
            stackStartFn: fn
          });
          err.operator = fn.name;
          throw err;
        }
        var keys = Object.keys(expected);
        if (expected instanceof Error) {
          keys.push("name", "message");
        } else if (keys.length === 0) {
          throw new ERR_INVALID_ARG_VALUE("error", expected, "may not be an empty object");
        }
        if (isDeepEqual === void 0) lazyLoadComparison();
        keys.forEach(function(key) {
          if (typeof actual[key] === "string" && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
            return;
          }
          compareExceptionKey(actual, expected, key, msg, keys, fn);
        });
        return true;
      }
      if (expected.prototype !== void 0 && actual instanceof expected) {
        return true;
      }
      if (Error.isPrototypeOf(expected)) {
        return false;
      }
      return expected.call({}, actual) === true;
    }
    function getActual(fn) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", "Function", fn);
      }
      try {
        fn();
      } catch (e) {
        return e;
      }
      return NO_EXCEPTION_SENTINEL;
    }
    function checkIsPromise(obj) {
      return isPromise(obj) || obj !== null && _typeof(obj) === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
    }
    function waitForActual(promiseFn) {
      return Promise.resolve().then(function() {
        var resultPromise;
        if (typeof promiseFn === "function") {
          resultPromise = promiseFn();
          if (!checkIsPromise(resultPromise)) {
            throw new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", resultPromise);
          }
        } else if (checkIsPromise(promiseFn)) {
          resultPromise = promiseFn;
        } else {
          throw new ERR_INVALID_ARG_TYPE("promiseFn", ["Function", "Promise"], promiseFn);
        }
        return Promise.resolve().then(function() {
          return resultPromise;
        }).then(function() {
          return NO_EXCEPTION_SENTINEL;
        }).catch(function(e) {
          return e;
        });
      });
    }
    function expectsError(stackStartFn, actual, error, message) {
      if (typeof error === "string") {
        if (arguments.length === 4) {
          throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
        }
        if (_typeof(actual) === "object" && actual !== null) {
          if (actual.message === error) {
            throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error message "'.concat(actual.message, '" is identical to the message.'));
          }
        } else if (actual === error) {
          throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error "'.concat(actual, '" is identical to the message.'));
        }
        message = error;
        error = void 0;
      } else if (error != null && _typeof(error) !== "object" && typeof error !== "function") {
        throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
      }
      if (actual === NO_EXCEPTION_SENTINEL) {
        var details = "";
        if (error && error.name) {
          details += " (".concat(error.name, ")");
        }
        details += message ? ": ".concat(message) : ".";
        var fnType = stackStartFn.name === "rejects" ? "rejection" : "exception";
        innerFail({
          actual: void 0,
          expected: error,
          operator: stackStartFn.name,
          message: "Missing expected ".concat(fnType).concat(details),
          stackStartFn
        });
      }
      if (error && !expectedException(actual, error, message, stackStartFn)) {
        throw actual;
      }
    }
    function expectsNoError(stackStartFn, actual, error, message) {
      if (actual === NO_EXCEPTION_SENTINEL) return;
      if (typeof error === "string") {
        message = error;
        error = void 0;
      }
      if (!error || expectedException(actual, error)) {
        var details = message ? ": ".concat(message) : ".";
        var fnType = stackStartFn.name === "doesNotReject" ? "rejection" : "exception";
        innerFail({
          actual,
          expected: error,
          operator: stackStartFn.name,
          message: "Got unwanted ".concat(fnType).concat(details, "\n") + 'Actual message: "'.concat(actual && actual.message, '"'),
          stackStartFn
        });
      }
      throw actual;
    }
    assert2.throws = function throws(promiseFn) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
    };
    assert2.rejects = function rejects(promiseFn) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return waitForActual(promiseFn).then(function(result) {
        return expectsError.apply(void 0, [rejects, result].concat(args));
      });
    };
    assert2.doesNotThrow = function doesNotThrow(fn) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
    };
    assert2.doesNotReject = function doesNotReject(fn) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }
      return waitForActual(fn).then(function(result) {
        return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
      });
    };
    assert2.ifError = function ifError(err) {
      if (err !== null && err !== void 0) {
        var message = "ifError got unwanted exception: ";
        if (_typeof(err) === "object" && typeof err.message === "string") {
          if (err.message.length === 0 && err.constructor) {
            message += err.constructor.name;
          } else {
            message += err.message;
          }
        } else {
          message += inspect(err);
        }
        var newErr = new AssertionError({
          actual: err,
          expected: null,
          operator: "ifError",
          message,
          stackStartFn: ifError
        });
        var origStack = err.stack;
        if (typeof origStack === "string") {
          var tmp2 = origStack.split("\n");
          tmp2.shift();
          var tmp1 = newErr.stack.split("\n");
          for (var i = 0; i < tmp2.length; i++) {
            var pos = tmp1.indexOf(tmp2[i]);
            if (pos !== -1) {
              tmp1 = tmp1.slice(0, pos);
              break;
            }
          }
          newErr.stack = "".concat(tmp1.join("\n"), "\n").concat(tmp2.join("\n"));
        }
        throw newErr;
      }
    };
    function internalMatch(string, regexp, message, fn, fnName) {
      if (!isRegExp(regexp)) {
        throw new ERR_INVALID_ARG_TYPE("regexp", "RegExp", regexp);
      }
      var match = fnName === "match";
      if (typeof string !== "string" || RegExpPrototypeTest(regexp, string) !== match) {
        if (message instanceof Error) {
          throw message;
        }
        var generatedMessage = !message;
        message = message || (typeof string !== "string" ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
        var err = new AssertionError({
          actual: string,
          expected: regexp,
          message,
          operator: fnName,
          stackStartFn: fn
        });
        err.generatedMessage = generatedMessage;
        throw err;
      }
    }
    assert2.match = function match(string, regexp, message) {
      internalMatch(string, regexp, message, match, "match");
    };
    assert2.doesNotMatch = function doesNotMatch(string, regexp, message) {
      internalMatch(string, regexp, message, doesNotMatch, "doesNotMatch");
    };
    function strict() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      innerOk.apply(void 0, [strict, args.length].concat(args));
    }
    assert2.strict = objectAssign(strict, assert2, {
      equal: assert2.strictEqual,
      deepEqual: assert2.deepStrictEqual,
      notEqual: assert2.notStrictEqual,
      notDeepEqual: assert2.notDeepStrictEqual
    });
    assert2.strict.strict = assert2.strict;
  }
});

// src/web/test/suite/extension.test.ts
var extension_test_exports = {};
var assert, vscode;
var init_extension_test = __esm({
  "src/web/test/suite/extension.test.ts"() {
    "use strict";
    init_process();
    init_buffer();
    assert = __toESM(require_assert());
    vscode = __toESM(require("vscode"));
    suite("Web Extension Test Suite", () => {
      vscode.window.showInformationMessage("Start all tests.");
      test("Sample test", () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
      });
    });
  }
});

// src/web/test/suite/extensionTests.ts
var extensionTests_exports = {};
__export(extensionTests_exports, {
  run: () => run
});
module.exports = __toCommonJS(extensionTests_exports);
init_process();
init_buffer();

// src/web/test/suite/mochaTestRunner.ts
init_process();
init_buffer();
var import_mocha = __toESM(require_mocha());
mocha.setup({
  ui: "tdd",
  reporter: void 0
});
function run() {
  return new Promise((c, e) => {
    try {
      mocha.run((failures) => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
    } catch (err) {
      console.error(err);
      e(err);
    }
  });
}

// src/web/test/suite/extensionTests.ts
Promise.resolve().then(() => init_extension_test());
/*! Bundled license information:

@esbuild-plugins/node-globals-polyfill/Buffer.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)

mocha/mocha.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)
  (*! https://mths.be/he v1.2.0 by @mathias | MIT license *)
  (*!
   * mocha
   * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
   * MIT Licensed
   *)

assert/build/internal/util/comparisons.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)
*/
//# sourceMappingURL=extensionTests.js.map
