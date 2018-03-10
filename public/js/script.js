(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            ;
            (function(exports) {
                'use strict';

                var Arr = (typeof Uint8Array !== 'undefined') ?
                    Uint8Array :
                    Array

                var PLUS = '+'.charCodeAt(0)
                var SLASH = '/'.charCodeAt(0)
                var NUMBER = '0'.charCodeAt(0)
                var LOWER = 'a'.charCodeAt(0)
                var UPPER = 'A'.charCodeAt(0)
                var PLUS_URL_SAFE = '-'.charCodeAt(0)
                var SLASH_URL_SAFE = '_'.charCodeAt(0)

                function decode(elt) {
                    var code = elt.charCodeAt(0)
                    if (code === PLUS ||
                        code === PLUS_URL_SAFE)
                        return 62 // '+'
                    if (code === SLASH ||
                        code === SLASH_URL_SAFE)
                        return 63 // '/'
                    if (code < NUMBER)
                        return -1 //no match
                    if (code < NUMBER + 10)
                        return code - NUMBER + 26 + 26
                    if (code < UPPER + 26)
                        return code - UPPER
                    if (code < LOWER + 26)
                        return code - LOWER + 26
                }

                function b64ToByteArray(b64) {
                    var i, j, l, tmp, placeHolders, arr

                    if (b64.length % 4 > 0) {
                        throw new Error('Invalid string. Length must be a multiple of 4')
                    }

                    // the number of equal signs (place holders)
                    // if there are two placeholders, than the two characters before it
                    // represent one byte
                    // if there is only one, then the three characters before it represent 2 bytes
                    // this is just a cheap hack to not do indexOf twice
                    var len = b64.length
                    placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

                    // base64 is 4/3 + up to two characters of the original data
                    arr = new Arr(b64.length * 3 / 4 - placeHolders)

                    // if there are placeholders, only get up to the last complete 4 chars
                    l = placeHolders > 0 ? b64.length - 4 : b64.length

                    var L = 0

                    function push(v) {
                        arr[L++] = v
                    }

                    for (i = 0, j = 0; i < l; i += 4, j += 3) {
                        tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
                        push((tmp & 0xFF0000) >> 16)
                        push((tmp & 0xFF00) >> 8)
                        push(tmp & 0xFF)
                    }

                    if (placeHolders === 2) {
                        tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
                        push(tmp & 0xFF)
                    } else if (placeHolders === 1) {
                        tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
                        push((tmp >> 8) & 0xFF)
                        push(tmp & 0xFF)
                    }

                    return arr
                }

                function uint8ToBase64(uint8) {
                    var i,
                        extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
                        output = "",
                        temp, length

                    function encode(num) {
                        return lookup.charAt(num)
                    }

                    function tripletToBase64(num) {
                        return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
                    }

                    // go through the array every three bytes, we'll deal with trailing stuff later
                    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
                        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
                        output += tripletToBase64(temp)
                    }

                    // pad the end with zeros, but make sure to not forget the extra bytes
                    switch (extraBytes) {
                        case 1:
                            temp = uint8[uint8.length - 1]
                            output += encode(temp >> 2)
                            output += encode((temp << 4) & 0x3F)
                            output += '=='
                            break
                        case 2:
                            temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
                            output += encode(temp >> 10)
                            output += encode((temp >> 4) & 0x3F)
                            output += encode((temp << 2) & 0x3F)
                            output += '='
                            break
                    }

                    return output
                }

                exports.toByteArray = b64ToByteArray
                exports.fromByteArray = uint8ToBase64
            }(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/base64-js/lib/b64.js", "/../../node_modules/base64-js/lib")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    2: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/browser-resolve/empty.js", "/../../node_modules/browser-resolve")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    3: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
             * @license  MIT
             */

            var base64 = require('base64-js')
            var ieee754 = require('ieee754')

            exports.Buffer = Buffer
            exports.SlowBuffer = Buffer
            exports.INSPECT_MAX_BYTES = 50
            Buffer.poolSize = 8192

            /**
             * If `Buffer._useTypedArrays`:
             *   === true    Use Uint8Array implementation (fastest)
             *   === false   Use Object implementation (compatible down to IE6)
             */
            Buffer._useTypedArrays = (function() {
                // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
                // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
                // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
                // because we need to be able to add all the node Buffer API methods. This is an issue
                // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
                try {
                    var buf = new ArrayBuffer(0)
                    var arr = new Uint8Array(buf)
                    arr.foo = function() {
                        return 42
                    }
                    return 42 === arr.foo() &&
                        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
                } catch (e) {
                    return false
                }
            })()

            /**
             * Class: Buffer
             * =============
             *
             * The Buffer constructor returns instances of `Uint8Array` that are augmented
             * with function properties for all the node `Buffer` API functions. We use
             * `Uint8Array` so that square bracket notation works as expected -- it returns
             * a single octet.
             *
             * By augmenting the instances, we can avoid modifying the `Uint8Array`
             * prototype.
             */
            function Buffer(subject, encoding, noZero) {
                if (!(this instanceof Buffer))
                    return new Buffer(subject, encoding, noZero)

                var type = typeof subject

                // Workaround: node's base64 implementation allows for non-padded strings
                // while base64-js does not.
                if (encoding === 'base64' && type === 'string') {
                    subject = stringtrim(subject)
                    while (subject.length % 4 !== 0) {
                        subject = subject + '='
                    }
                }

                // Find the length
                var length
                if (type === 'number')
                    length = coerce(subject)
                else if (type === 'string')
                    length = Buffer.byteLength(subject, encoding)
                else if (type === 'object')
                    length = coerce(subject.length) // assume that object is array-like
                else
                    throw new Error('First argument needs to be a number, array or string.')

                var buf
                if (Buffer._useTypedArrays) {
                    // Preferred: Return an augmented `Uint8Array` instance for best performance
                    buf = Buffer._augment(new Uint8Array(length))
                } else {
                    // Fallback: Return THIS instance of Buffer (created by `new`)
                    buf = this
                    buf.length = length
                    buf._isBuffer = true
                }

                var i
                if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
                    // Speed optimization -- use set if we're copying from a typed array
                    buf._set(subject)
                } else if (isArrayish(subject)) {
                    // Treat array-ish objects as a byte array
                    for (i = 0; i < length; i++) {
                        if (Buffer.isBuffer(subject))
                            buf[i] = subject.readUInt8(i)
                        else
                            buf[i] = subject[i]
                    }
                } else if (type === 'string') {
                    buf.write(subject, 0, encoding)
                } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
                    for (i = 0; i < length; i++) {
                        buf[i] = 0
                    }
                }

                return buf
            }

            // STATIC METHODS
            // ==============

            Buffer.isEncoding = function(encoding) {
                switch (String(encoding).toLowerCase()) {
                    case 'hex':
                    case 'utf8':
                    case 'utf-8':
                    case 'ascii':
                    case 'binary':
                    case 'base64':
                    case 'raw':
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                        return true
                    default:
                        return false
                }
            }

            Buffer.isBuffer = function(b) {
                return !!(b !== null && b !== undefined && b._isBuffer)
            }

            Buffer.byteLength = function(str, encoding) {
                var ret
                str = str + ''
                switch (encoding || 'utf8') {
                    case 'hex':
                        ret = str.length / 2
                        break
                    case 'utf8':
                    case 'utf-8':
                        ret = utf8ToBytes(str).length
                        break
                    case 'ascii':
                    case 'binary':
                    case 'raw':
                        ret = str.length
                        break
                    case 'base64':
                        ret = base64ToBytes(str).length
                        break
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                        ret = str.length * 2
                        break
                    default:
                        throw new Error('Unknown encoding')
                }
                return ret
            }

            Buffer.concat = function(list, totalLength) {
                assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
                    'list should be an Array.')

                if (list.length === 0) {
                    return new Buffer(0)
                } else if (list.length === 1) {
                    return list[0]
                }

                var i
                if (typeof totalLength !== 'number') {
                    totalLength = 0
                    for (i = 0; i < list.length; i++) {
                        totalLength += list[i].length
                    }
                }

                var buf = new Buffer(totalLength)
                var pos = 0
                for (i = 0; i < list.length; i++) {
                    var item = list[i]
                    item.copy(buf, pos)
                    pos += item.length
                }
                return buf
            }

            // BUFFER INSTANCE METHODS
            // =======================

            function _hexWrite(buf, string, offset, length) {
                offset = Number(offset) || 0
                var remaining = buf.length - offset
                if (!length) {
                    length = remaining
                } else {
                    length = Number(length)
                    if (length > remaining) {
                        length = remaining
                    }
                }

                // must be an even number of digits
                var strLen = string.length
                assert(strLen % 2 === 0, 'Invalid hex string')

                if (length > strLen / 2) {
                    length = strLen / 2
                }
                for (var i = 0; i < length; i++) {
                    var byte = parseInt(string.substr(i * 2, 2), 16)
                    assert(!isNaN(byte), 'Invalid hex string')
                    buf[offset + i] = byte
                }
                Buffer._charsWritten = i * 2
                return i
            }

            function _utf8Write(buf, string, offset, length) {
                var charsWritten = Buffer._charsWritten =
                    blitBuffer(utf8ToBytes(string), buf, offset, length)
                return charsWritten
            }

            function _asciiWrite(buf, string, offset, length) {
                var charsWritten = Buffer._charsWritten =
                    blitBuffer(asciiToBytes(string), buf, offset, length)
                return charsWritten
            }

            function _binaryWrite(buf, string, offset, length) {
                return _asciiWrite(buf, string, offset, length)
            }

            function _base64Write(buf, string, offset, length) {
                var charsWritten = Buffer._charsWritten =
                    blitBuffer(base64ToBytes(string), buf, offset, length)
                return charsWritten
            }

            function _utf16leWrite(buf, string, offset, length) {
                var charsWritten = Buffer._charsWritten =
                    blitBuffer(utf16leToBytes(string), buf, offset, length)
                return charsWritten
            }

            Buffer.prototype.write = function(string, offset, length, encoding) {
                // Support both (string, offset, length, encoding)
                // and the legacy (string, encoding, offset, length)
                if (isFinite(offset)) {
                    if (!isFinite(length)) {
                        encoding = length
                        length = undefined
                    }
                } else { // legacy
                    var swap = encoding
                    encoding = offset
                    offset = length
                    length = swap
                }

                offset = Number(offset) || 0
                var remaining = this.length - offset
                if (!length) {
                    length = remaining
                } else {
                    length = Number(length)
                    if (length > remaining) {
                        length = remaining
                    }
                }
                encoding = String(encoding || 'utf8').toLowerCase()

                var ret
                switch (encoding) {
                    case 'hex':
                        ret = _hexWrite(this, string, offset, length)
                        break
                    case 'utf8':
                    case 'utf-8':
                        ret = _utf8Write(this, string, offset, length)
                        break
                    case 'ascii':
                        ret = _asciiWrite(this, string, offset, length)
                        break
                    case 'binary':
                        ret = _binaryWrite(this, string, offset, length)
                        break
                    case 'base64':
                        ret = _base64Write(this, string, offset, length)
                        break
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                        ret = _utf16leWrite(this, string, offset, length)
                        break
                    default:
                        throw new Error('Unknown encoding')
                }
                return ret
            }

            Buffer.prototype.toString = function(encoding, start, end) {
                var self = this

                encoding = String(encoding || 'utf8').toLowerCase()
                start = Number(start) || 0
                end = (end !== undefined) ?
                    Number(end) :
                    end = self.length

                // Fastpath empty strings
                if (end === start)
                    return ''

                var ret
                switch (encoding) {
                    case 'hex':
                        ret = _hexSlice(self, start, end)
                        break
                    case 'utf8':
                    case 'utf-8':
                        ret = _utf8Slice(self, start, end)
                        break
                    case 'ascii':
                        ret = _asciiSlice(self, start, end)
                        break
                    case 'binary':
                        ret = _binarySlice(self, start, end)
                        break
                    case 'base64':
                        ret = _base64Slice(self, start, end)
                        break
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                        ret = _utf16leSlice(self, start, end)
                        break
                    default:
                        throw new Error('Unknown encoding')
                }
                return ret
            }

            Buffer.prototype.toJSON = function() {
                return {
                    type: 'Buffer',
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }

            // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
            Buffer.prototype.copy = function(target, target_start, start, end) {
                var source = this

                if (!start) start = 0
                if (!end && end !== 0) end = this.length
                if (!target_start) target_start = 0

                // Copy 0 bytes; we're done
                if (end === start) return
                if (target.length === 0 || source.length === 0) return

                // Fatal error conditions
                assert(end >= start, 'sourceEnd < sourceStart')
                assert(target_start >= 0 && target_start < target.length,
                    'targetStart out of bounds')
                assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
                assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

                // Are we oob?
                if (end > this.length)
                    end = this.length
                if (target.length - target_start < end - start)
                    end = target.length - target_start + start

                var len = end - start

                if (len < 100 || !Buffer._useTypedArrays) {
                    for (var i = 0; i < len; i++)
                        target[i + target_start] = this[i + start]
                } else {
                    target._set(this.subarray(start, start + len), target_start)
                }
            }

            function _base64Slice(buf, start, end) {
                if (start === 0 && end === buf.length) {
                    return base64.fromByteArray(buf)
                } else {
                    return base64.fromByteArray(buf.slice(start, end))
                }
            }

            function _utf8Slice(buf, start, end) {
                var res = ''
                var tmp = ''
                end = Math.min(buf.length, end)

                for (var i = start; i < end; i++) {
                    if (buf[i] <= 0x7F) {
                        res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
                        tmp = ''
                    } else {
                        tmp += '%' + buf[i].toString(16)
                    }
                }

                return res + decodeUtf8Char(tmp)
            }

            function _asciiSlice(buf, start, end) {
                var ret = ''
                end = Math.min(buf.length, end)

                for (var i = start; i < end; i++)
                    ret += String.fromCharCode(buf[i])
                return ret
            }

            function _binarySlice(buf, start, end) {
                return _asciiSlice(buf, start, end)
            }

            function _hexSlice(buf, start, end) {
                var len = buf.length

                if (!start || start < 0) start = 0
                if (!end || end < 0 || end > len) end = len

                var out = ''
                for (var i = start; i < end; i++) {
                    out += toHex(buf[i])
                }
                return out
            }

            function _utf16leSlice(buf, start, end) {
                var bytes = buf.slice(start, end)
                var res = ''
                for (var i = 0; i < bytes.length; i += 2) {
                    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
                }
                return res
            }

            Buffer.prototype.slice = function(start, end) {
                var len = this.length
                start = clamp(start, len, 0)
                end = clamp(end, len, len)

                if (Buffer._useTypedArrays) {
                    return Buffer._augment(this.subarray(start, end))
                } else {
                    var sliceLen = end - start
                    var newBuf = new Buffer(sliceLen, undefined, true)
                    for (var i = 0; i < sliceLen; i++) {
                        newBuf[i] = this[i + start]
                    }
                    return newBuf
                }
            }

            // `get` will be removed in Node 0.13+
            Buffer.prototype.get = function(offset) {
                console.log('.get() is deprecated. Access using array indexes instead.')
                return this.readUInt8(offset)
            }

            // `set` will be removed in Node 0.13+
            Buffer.prototype.set = function(v, offset) {
                console.log('.set() is deprecated. Access using array indexes instead.')
                return this.writeUInt8(v, offset)
            }

            Buffer.prototype.readUInt8 = function(offset, noAssert) {
                if (!noAssert) {
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset < this.length, 'Trying to read beyond buffer length')
                }

                if (offset >= this.length)
                    return

                return this[offset]
            }

            function _readUInt16(buf, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
                }

                var len = buf.length
                if (offset >= len)
                    return

                var val
                if (littleEndian) {
                    val = buf[offset]
                    if (offset + 1 < len)
                        val |= buf[offset + 1] << 8
                } else {
                    val = buf[offset] << 8
                    if (offset + 1 < len)
                        val |= buf[offset + 1]
                }
                return val
            }

            Buffer.prototype.readUInt16LE = function(offset, noAssert) {
                return _readUInt16(this, offset, true, noAssert)
            }

            Buffer.prototype.readUInt16BE = function(offset, noAssert) {
                return _readUInt16(this, offset, false, noAssert)
            }

            function _readUInt32(buf, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
                }

                var len = buf.length
                if (offset >= len)
                    return

                var val
                if (littleEndian) {
                    if (offset + 2 < len)
                        val = buf[offset + 2] << 16
                    if (offset + 1 < len)
                        val |= buf[offset + 1] << 8
                    val |= buf[offset]
                    if (offset + 3 < len)
                        val = val + (buf[offset + 3] << 24 >>> 0)
                } else {
                    if (offset + 1 < len)
                        val = buf[offset + 1] << 16
                    if (offset + 2 < len)
                        val |= buf[offset + 2] << 8
                    if (offset + 3 < len)
                        val |= buf[offset + 3]
                    val = val + (buf[offset] << 24 >>> 0)
                }
                return val
            }

            Buffer.prototype.readUInt32LE = function(offset, noAssert) {
                return _readUInt32(this, offset, true, noAssert)
            }

            Buffer.prototype.readUInt32BE = function(offset, noAssert) {
                return _readUInt32(this, offset, false, noAssert)
            }

            Buffer.prototype.readInt8 = function(offset, noAssert) {
                if (!noAssert) {
                    assert(offset !== undefined && offset !== null,
                        'missing offset')
                    assert(offset < this.length, 'Trying to read beyond buffer length')
                }

                if (offset >= this.length)
                    return

                var neg = this[offset] & 0x80
                if (neg)
                    return (0xff - this[offset] + 1) * -1
                else
                    return this[offset]
            }

            function _readInt16(buf, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
                }

                var len = buf.length
                if (offset >= len)
                    return

                var val = _readUInt16(buf, offset, littleEndian, true)
                var neg = val & 0x8000
                if (neg)
                    return (0xffff - val + 1) * -1
                else
                    return val
            }

            Buffer.prototype.readInt16LE = function(offset, noAssert) {
                return _readInt16(this, offset, true, noAssert)
            }

            Buffer.prototype.readInt16BE = function(offset, noAssert) {
                return _readInt16(this, offset, false, noAssert)
            }

            function _readInt32(buf, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
                }

                var len = buf.length
                if (offset >= len)
                    return

                var val = _readUInt32(buf, offset, littleEndian, true)
                var neg = val & 0x80000000
                if (neg)
                    return (0xffffffff - val + 1) * -1
                else
                    return val
            }

            Buffer.prototype.readInt32LE = function(offset, noAssert) {
                return _readInt32(this, offset, true, noAssert)
            }

            Buffer.prototype.readInt32BE = function(offset, noAssert) {
                return _readInt32(this, offset, false, noAssert)
            }

            function _readFloat(buf, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
                }

                return ieee754.read(buf, offset, littleEndian, 23, 4)
            }

            Buffer.prototype.readFloatLE = function(offset, noAssert) {
                return _readFloat(this, offset, true, noAssert)
            }

            Buffer.prototype.readFloatBE = function(offset, noAssert) {
                return _readFloat(this, offset, false, noAssert)
            }

            function _readDouble(buf, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
                }

                return ieee754.read(buf, offset, littleEndian, 52, 8)
            }

            Buffer.prototype.readDoubleLE = function(offset, noAssert) {
                return _readDouble(this, offset, true, noAssert)
            }

            Buffer.prototype.readDoubleBE = function(offset, noAssert) {
                return _readDouble(this, offset, false, noAssert)
            }

            Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
                if (!noAssert) {
                    assert(value !== undefined && value !== null, 'missing value')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset < this.length, 'trying to write beyond buffer length')
                    verifuint(value, 0xff)
                }

                if (offset >= this.length) return

                this[offset] = value
            }

            function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(value !== undefined && value !== null, 'missing value')
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
                    verifuint(value, 0xffff)
                }

                var len = buf.length
                if (offset >= len)
                    return

                for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
                    buf[offset + i] =
                        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
                        (littleEndian ? i : 1 - i) * 8
                }
            }

            Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
                _writeUInt16(this, value, offset, true, noAssert)
            }

            Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
                _writeUInt16(this, value, offset, false, noAssert)
            }

            function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(value !== undefined && value !== null, 'missing value')
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
                    verifuint(value, 0xffffffff)
                }

                var len = buf.length
                if (offset >= len)
                    return

                for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
                    buf[offset + i] =
                        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
                }
            }

            Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
                _writeUInt32(this, value, offset, true, noAssert)
            }

            Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
                _writeUInt32(this, value, offset, false, noAssert)
            }

            Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
                if (!noAssert) {
                    assert(value !== undefined && value !== null, 'missing value')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset < this.length, 'Trying to write beyond buffer length')
                    verifsint(value, 0x7f, -0x80)
                }

                if (offset >= this.length)
                    return

                if (value >= 0)
                    this.writeUInt8(value, offset, noAssert)
                else
                    this.writeUInt8(0xff + value + 1, offset, noAssert)
            }

            function _writeInt16(buf, value, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(value !== undefined && value !== null, 'missing value')
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
                    verifsint(value, 0x7fff, -0x8000)
                }

                var len = buf.length
                if (offset >= len)
                    return

                if (value >= 0)
                    _writeUInt16(buf, value, offset, littleEndian, noAssert)
                else
                    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
            }

            Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
                _writeInt16(this, value, offset, true, noAssert)
            }

            Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
                _writeInt16(this, value, offset, false, noAssert)
            }

            function _writeInt32(buf, value, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(value !== undefined && value !== null, 'missing value')
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
                    verifsint(value, 0x7fffffff, -0x80000000)
                }

                var len = buf.length
                if (offset >= len)
                    return

                if (value >= 0)
                    _writeUInt32(buf, value, offset, littleEndian, noAssert)
                else
                    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
            }

            Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
                _writeInt32(this, value, offset, true, noAssert)
            }

            Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
                _writeInt32(this, value, offset, false, noAssert)
            }

            function _writeFloat(buf, value, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(value !== undefined && value !== null, 'missing value')
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
                    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
                }

                var len = buf.length
                if (offset >= len)
                    return

                ieee754.write(buf, value, offset, littleEndian, 23, 4)
            }

            Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
                _writeFloat(this, value, offset, true, noAssert)
            }

            Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
                _writeFloat(this, value, offset, false, noAssert)
            }

            function _writeDouble(buf, value, offset, littleEndian, noAssert) {
                if (!noAssert) {
                    assert(value !== undefined && value !== null, 'missing value')
                    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
                    assert(offset !== undefined && offset !== null, 'missing offset')
                    assert(offset + 7 < buf.length,
                        'Trying to write beyond buffer length')
                    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
                }

                var len = buf.length
                if (offset >= len)
                    return

                ieee754.write(buf, value, offset, littleEndian, 52, 8)
            }

            Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
                _writeDouble(this, value, offset, true, noAssert)
            }

            Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
                _writeDouble(this, value, offset, false, noAssert)
            }

            // fill(value, start=0, end=buffer.length)
            Buffer.prototype.fill = function(value, start, end) {
                if (!value) value = 0
                if (!start) start = 0
                if (!end) end = this.length

                if (typeof value === 'string') {
                    value = value.charCodeAt(0)
                }

                assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
                assert(end >= start, 'end < start')

                // Fill 0 bytes; we're done
                if (end === start) return
                if (this.length === 0) return

                assert(start >= 0 && start < this.length, 'start out of bounds')
                assert(end >= 0 && end <= this.length, 'end out of bounds')

                for (var i = start; i < end; i++) {
                    this[i] = value
                }
            }

            Buffer.prototype.inspect = function() {
                var out = []
                var len = this.length
                for (var i = 0; i < len; i++) {
                    out[i] = toHex(this[i])
                    if (i === exports.INSPECT_MAX_BYTES) {
                        out[i + 1] = '...'
                        break
                    }
                }
                return '<Buffer ' + out.join(' ') + '>'
            }

            /**
             * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
             * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
             */
            Buffer.prototype.toArrayBuffer = function() {
                if (typeof Uint8Array !== 'undefined') {
                    if (Buffer._useTypedArrays) {
                        return (new Buffer(this)).buffer
                    } else {
                        var buf = new Uint8Array(this.length)
                        for (var i = 0, len = buf.length; i < len; i += 1)
                            buf[i] = this[i]
                        return buf.buffer
                    }
                } else {
                    throw new Error('Buffer.toArrayBuffer not supported in this browser')
                }
            }

            // HELPER FUNCTIONS
            // ================

            function stringtrim(str) {
                if (str.trim) return str.trim()
                return str.replace(/^\s+|\s+$/g, '')
            }

            var BP = Buffer.prototype

            /**
             * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
             */
            Buffer._augment = function(arr) {
                arr._isBuffer = true

                // save reference to original Uint8Array get/set methods before overwriting
                arr._get = arr.get
                arr._set = arr.set

                // deprecated, will be removed in node 0.13+
                arr.get = BP.get
                arr.set = BP.set

                arr.write = BP.write
                arr.toString = BP.toString
                arr.toLocaleString = BP.toString
                arr.toJSON = BP.toJSON
                arr.copy = BP.copy
                arr.slice = BP.slice
                arr.readUInt8 = BP.readUInt8
                arr.readUInt16LE = BP.readUInt16LE
                arr.readUInt16BE = BP.readUInt16BE
                arr.readUInt32LE = BP.readUInt32LE
                arr.readUInt32BE = BP.readUInt32BE
                arr.readInt8 = BP.readInt8
                arr.readInt16LE = BP.readInt16LE
                arr.readInt16BE = BP.readInt16BE
                arr.readInt32LE = BP.readInt32LE
                arr.readInt32BE = BP.readInt32BE
                arr.readFloatLE = BP.readFloatLE
                arr.readFloatBE = BP.readFloatBE
                arr.readDoubleLE = BP.readDoubleLE
                arr.readDoubleBE = BP.readDoubleBE
                arr.writeUInt8 = BP.writeUInt8
                arr.writeUInt16LE = BP.writeUInt16LE
                arr.writeUInt16BE = BP.writeUInt16BE
                arr.writeUInt32LE = BP.writeUInt32LE
                arr.writeUInt32BE = BP.writeUInt32BE
                arr.writeInt8 = BP.writeInt8
                arr.writeInt16LE = BP.writeInt16LE
                arr.writeInt16BE = BP.writeInt16BE
                arr.writeInt32LE = BP.writeInt32LE
                arr.writeInt32BE = BP.writeInt32BE
                arr.writeFloatLE = BP.writeFloatLE
                arr.writeFloatBE = BP.writeFloatBE
                arr.writeDoubleLE = BP.writeDoubleLE
                arr.writeDoubleBE = BP.writeDoubleBE
                arr.fill = BP.fill
                arr.inspect = BP.inspect
                arr.toArrayBuffer = BP.toArrayBuffer

                return arr
            }

            // slice(start, end)
            function clamp(index, len, defaultValue) {
                if (typeof index !== 'number') return defaultValue
                index = ~~index; // Coerce to integer.
                if (index >= len) return len
                if (index >= 0) return index
                index += len
                if (index >= 0) return index
                return 0
            }

            function coerce(length) {
                // Coerce length to a number (possibly NaN), round up
                // in case it's fractional (e.g. 123.456) then do a
                // double negate to coerce a NaN to 0. Easy, right?
                length = ~~Math.ceil(+length)
                return length < 0 ? 0 : length
            }

            function isArray(subject) {
                return (Array.isArray || function(subject) {
                    return Object.prototype.toString.call(subject) === '[object Array]'
                })(subject)
            }

            function isArrayish(subject) {
                return isArray(subject) || Buffer.isBuffer(subject) ||
                    subject && typeof subject === 'object' &&
                    typeof subject.length === 'number'
            }

            function toHex(n) {
                if (n < 16) return '0' + n.toString(16)
                return n.toString(16)
            }

            function utf8ToBytes(str) {
                var byteArray = []
                for (var i = 0; i < str.length; i++) {
                    var b = str.charCodeAt(i)
                    if (b <= 0x7F)
                        byteArray.push(str.charCodeAt(i))
                    else {
                        var start = i
                        if (b >= 0xD800 && b <= 0xDFFF) i++
                            var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%')
                        for (var j = 0; j < h.length; j++)
                            byteArray.push(parseInt(h[j], 16))
                    }
                }
                return byteArray
            }

            function asciiToBytes(str) {
                var byteArray = []
                for (var i = 0; i < str.length; i++) {
                    // Node's code seems to be doing this and not & 0x7F..
                    byteArray.push(str.charCodeAt(i) & 0xFF)
                }
                return byteArray
            }

            function utf16leToBytes(str) {
                var c, hi, lo
                var byteArray = []
                for (var i = 0; i < str.length; i++) {
                    c = str.charCodeAt(i)
                    hi = c >> 8
                    lo = c % 256
                    byteArray.push(lo)
                    byteArray.push(hi)
                }

                return byteArray
            }

            function base64ToBytes(str) {
                return base64.toByteArray(str)
            }

            function blitBuffer(src, dst, offset, length) {
                var pos
                for (var i = 0; i < length; i++) {
                    if ((i + offset >= dst.length) || (i >= src.length))
                        break
                    dst[i + offset] = src[i]
                }
                return i
            }

            function decodeUtf8Char(str) {
                try {
                    return decodeURIComponent(str)
                } catch (err) {
                    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
                }
            }

            /*
             * We have to make sure that the value is a valid integer. This means that it
             * is non-negative. It has no fractional component and that it does not
             * exceed the maximum allowed value.
             */
            function verifuint(value, max) {
                assert(typeof value === 'number', 'cannot write a non-number as a number')
                assert(value >= 0, 'specified a negative value for writing an unsigned value')
                assert(value <= max, 'value is larger than maximum value for type')
                assert(Math.floor(value) === value, 'value has a fractional component')
            }

            function verifsint(value, max, min) {
                assert(typeof value === 'number', 'cannot write a non-number as a number')
                assert(value <= max, 'value larger than maximum allowed value')
                assert(value >= min, 'value smaller than minimum allowed value')
                assert(Math.floor(value) === value, 'value has a fractional component')
            }

            function verifIEEE754(value, max, min) {
                assert(typeof value === 'number', 'cannot write a non-number as a number')
                assert(value <= max, 'value larger than maximum allowed value')
                assert(value >= min, 'value smaller than minimum allowed value')
            }

            function assert(test, message) {
                if (!test) throw new Error(message || 'Failed assertion')
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/buffer/index.js", "/../../node_modules/buffer")
    }, {
        "base64-js": 1,
        "buffer": 3,
        "ieee754": 9,
        "rH1JPG": 13
    }],
    4: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
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

            // NOTE: These type checking functions intentionally don't use `instanceof`
            // because it is fragile and can be easily faked with `Object.create()`.

            function isArray(arg) {
                if (Array.isArray) {
                    return Array.isArray(arg);
                }
                return objectToString(arg) === '[object Array]';
            }
            exports.isArray = isArray;

            function isBoolean(arg) {
                return typeof arg === 'boolean';
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
                return typeof arg === 'number';
            }
            exports.isNumber = isNumber;

            function isString(arg) {
                return typeof arg === 'string';
            }
            exports.isString = isString;

            function isSymbol(arg) {
                return typeof arg === 'symbol';
            }
            exports.isSymbol = isSymbol;

            function isUndefined(arg) {
                return arg === void 0;
            }
            exports.isUndefined = isUndefined;

            function isRegExp(re) {
                return objectToString(re) === '[object RegExp]';
            }
            exports.isRegExp = isRegExp;

            function isObject(arg) {
                return typeof arg === 'object' && arg !== null;
            }
            exports.isObject = isObject;

            function isDate(d) {
                return objectToString(d) === '[object Date]';
            }
            exports.isDate = isDate;

            function isError(e) {
                return (objectToString(e) === '[object Error]' || e instanceof Error);
            }
            exports.isError = isError;

            function isFunction(arg) {
                return typeof arg === 'function';
            }
            exports.isFunction = isFunction;

            function isPrimitive(arg) {
                return arg === null ||
                    typeof arg === 'boolean' ||
                    typeof arg === 'number' ||
                    typeof arg === 'string' ||
                    typeof arg === 'symbol' || // ES6 symbol
                    typeof arg === 'undefined';
            }
            exports.isPrimitive = isPrimitive;

            exports.isBuffer = Buffer.isBuffer;

            function objectToString(o) {
                return Object.prototype.toString.call(o);
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/core-util-is/lib/util.js", "/../../node_modules/core-util-is/lib")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    5: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            /**
             * This is the web browser implementation of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = require('./debug');
            exports.log = log;
            exports.formatArgs = formatArgs;
            exports.save = save;
            exports.load = load;
            exports.useColors = useColors;
            exports.storage = 'undefined' != typeof chrome &&
                'undefined' != typeof chrome.storage ?
                chrome.storage.local :
                localstorage();

            /**
             * Colors.
             */

            exports.colors = [
                'lightseagreen',
                'forestgreen',
                'goldenrod',
                'dodgerblue',
                'darkorchid',
                'crimson'
            ];

            /**
             * Currently only WebKit-based Web Inspectors, Firefox >= v31,
             * and the Firebug extension (any Firefox version) are known
             * to support "%c" CSS customizations.
             *
             * TODO: add a `localStorage` variable to explicitly enable/disable colors
             */

            function useColors() {
                // NB: In an Electron preload script, document will be defined but not fully
                // initialized. Since we know we're in Chrome, we'll just detect this case
                // explicitly
                if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
                    return true;
                }

                // is webkit? http://stackoverflow.com/a/16459606/376773
                // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
                return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
                    // is firebug? http://stackoverflow.com/a/398120/376773
                    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
                    // is firefox >= v31?
                    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
                    // double check webkit in userAgent just in case we are in a worker
                    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
            }

            /**
             * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
             */

            exports.formatters.j = function(v) {
                try {
                    return JSON.stringify(v);
                } catch (err) {
                    return '[UnexpectedJSONParseError]: ' + err.message;
                }
            };


            /**
             * Colorize log arguments if enabled.
             *
             * @api public
             */

            function formatArgs(args) {
                var useColors = this.useColors;

                args[0] = (useColors ? '%c' : '') +
                    this.namespace +
                    (useColors ? ' %c' : ' ') +
                    args[0] +
                    (useColors ? '%c ' : ' ') +
                    '+' + exports.humanize(this.diff);

                if (!useColors) return;

                var c = 'color: ' + this.color;
                args.splice(1, 0, c, 'color: inherit')

                // the final "%c" is somewhat tricky, because there could be other
                // arguments passed either before or after the %c, so we need to
                // figure out the correct index to insert the CSS into
                var index = 0;
                var lastC = 0;
                args[0].replace(/%[a-zA-Z%]/g, function(match) {
                    if ('%%' === match) return;
                    index++;
                    if ('%c' === match) {
                        // we only are interested in the *last* %c
                        // (the user may have provided their own)
                        lastC = index;
                    }
                });

                args.splice(lastC, 0, c);
            }

            /**
             * Invokes `console.log()` when available.
             * No-op when `console.log` is not a "function".
             *
             * @api public
             */

            function log() {
                // this hackery is required for IE8/9, where
                // the `console.log` function doesn't have 'apply'
                return 'object' === typeof console &&
                    console.log &&
                    Function.prototype.apply.call(console.log, console, arguments);
            }

            /**
             * Save `namespaces`.
             *
             * @param {String} namespaces
             * @api private
             */

            function save(namespaces) {
                try {
                    if (null == namespaces) {
                        exports.storage.removeItem('debug');
                    } else {
                        exports.storage.debug = namespaces;
                    }
                } catch (e) {}
            }

            /**
             * Load `namespaces`.
             *
             * @return {String} returns the previously persisted debug modes
             * @api private
             */

            function load() {
                var r;
                try {
                    r = exports.storage.debug;
                } catch (e) {}

                // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
                if (!r && typeof process !== 'undefined' && 'env' in process) {
                    r = process.env.DEBUG;
                }

                return r;
            }

            /**
             * Enable namespaces listed in `localStorage.debug` initially.
             */

            exports.enable(load());

            /**
             * Localstorage attempts to return the localstorage.
             *
             * This is necessary because safari throws
             * when a user disables cookies/localstorage
             * and you attempt to access it.
             *
             * @return {LocalStorage}
             * @api private
             */

            function localstorage() {
                try {
                    return window.localStorage;
                } catch (e) {}
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/debug/src/browser.js", "/../../node_modules/debug/src")
    }, {
        "./debug": 6,
        "buffer": 3,
        "rH1JPG": 13
    }],
    6: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {

            /**
             * This is the common logic for both the Node.js and web browser
             * implementations of `debug()`.
             *
             * Expose `debug()` as the module.
             */

            exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
            exports.coerce = coerce;
            exports.disable = disable;
            exports.enable = enable;
            exports.enabled = enabled;
            exports.humanize = require('ms');

            /**
             * The currently active debug mode names, and names to skip.
             */

            exports.names = [];
            exports.skips = [];

            /**
             * Map of special "%n" handling functions, for the debug "format" argument.
             *
             * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
             */

            exports.formatters = {};

            /**
             * Previous log timestamp.
             */

            var prevTime;

            /**
             * Select a color.
             * @param {String} namespace
             * @return {Number}
             * @api private
             */

            function selectColor(namespace) {
                var hash = 0,
                    i;

                for (i in namespace) {
                    hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
                    hash |= 0; // Convert to 32bit integer
                }

                return exports.colors[Math.abs(hash) % exports.colors.length];
            }

            /**
             * Create a debugger with the given `namespace`.
             *
             * @param {String} namespace
             * @return {Function}
             * @api public
             */

            function createDebug(namespace) {

                function debug() {
                    // disabled?
                    if (!debug.enabled) return;

                    var self = debug;

                    // set `diff` timestamp
                    var curr = +new Date();
                    var ms = curr - (prevTime || curr);
                    self.diff = ms;
                    self.prev = prevTime;
                    self.curr = curr;
                    prevTime = curr;

                    // turn the `arguments` into a proper Array
                    var args = new Array(arguments.length);
                    for (var i = 0; i < args.length; i++) {
                        args[i] = arguments[i];
                    }

                    args[0] = exports.coerce(args[0]);

                    if ('string' !== typeof args[0]) {
                        // anything else let's inspect with %O
                        args.unshift('%O');
                    }

                    // apply any `formatters` transformations
                    var index = 0;
                    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
                        // if we encounter an escaped % then don't increase the array index
                        if (match === '%%') return match;
                        index++;
                        var formatter = exports.formatters[format];
                        if ('function' === typeof formatter) {
                            var val = args[index];
                            match = formatter.call(self, val);

                            // now we need to remove `args[index]` since it's inlined in the `format`
                            args.splice(index, 1);
                            index--;
                        }
                        return match;
                    });

                    // apply env-specific formatting (colors, etc.)
                    exports.formatArgs.call(self, args);

                    var logFn = debug.log || exports.log || console.log.bind(console);
                    logFn.apply(self, args);
                }

                debug.namespace = namespace;
                debug.enabled = exports.enabled(namespace);
                debug.useColors = exports.useColors();
                debug.color = selectColor(namespace);

                // env-specific initialization logic for debug instances
                if ('function' === typeof exports.init) {
                    exports.init(debug);
                }

                return debug;
            }

            /**
             * Enables a debug mode by namespaces. This can include modes
             * separated by a colon and wildcards.
             *
             * @param {String} namespaces
             * @api public
             */

            function enable(namespaces) {
                exports.save(namespaces);

                exports.names = [];
                exports.skips = [];

                var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
                var len = split.length;

                for (var i = 0; i < len; i++) {
                    if (!split[i]) continue; // ignore empty strings
                    namespaces = split[i].replace(/\*/g, '.*?');
                    if (namespaces[0] === '-') {
                        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
                    } else {
                        exports.names.push(new RegExp('^' + namespaces + '$'));
                    }
                }
            }

            /**
             * Disable debug output.
             *
             * @api public
             */

            function disable() {
                exports.enable('');
            }

            /**
             * Returns true if the given mode name is enabled, false otherwise.
             *
             * @param {String} name
             * @return {Boolean}
             * @api public
             */

            function enabled(name) {
                var i, len;
                for (i = 0, len = exports.skips.length; i < len; i++) {
                    if (exports.skips[i].test(name)) {
                        return false;
                    }
                }
                for (i = 0, len = exports.names.length; i < len; i++) {
                    if (exports.names[i].test(name)) {
                        return true;
                    }
                }
                return false;
            }

            /**
             * Coerce `val`.
             *
             * @param {Mixed} val
             * @return {Mixed}
             * @api private
             */

            function coerce(val) {
                if (val instanceof Error) return val.stack || val.message;
                return val;
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/debug/src/debug.js", "/../../node_modules/debug/src")
    }, {
        "buffer": 3,
        "ms": 11,
        "rH1JPG": 13
    }],
    7: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
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

            function EventEmitter() {
                this._events = this._events || {};
                this._maxListeners = this._maxListeners || undefined;
            }
            module.exports = EventEmitter;

            // Backwards-compat with node 0.10.x
            EventEmitter.EventEmitter = EventEmitter;

            EventEmitter.prototype._events = undefined;
            EventEmitter.prototype._maxListeners = undefined;

            // By default EventEmitters will print a warning if more than 10 listeners are
            // added to it. This is a useful default which helps finding memory leaks.
            EventEmitter.defaultMaxListeners = 10;

            // Obviously not all Emitters should be limited to 10. This function allows
            // that to be increased. Set to zero for unlimited.
            EventEmitter.prototype.setMaxListeners = function(n) {
                if (!isNumber(n) || n < 0 || isNaN(n))
                    throw TypeError('n must be a positive number');
                this._maxListeners = n;
                return this;
            };

            EventEmitter.prototype.emit = function(type) {
                var er, handler, len, args, i, listeners;

                if (!this._events)
                    this._events = {};

                // If there is no 'error' event listener then throw.
                if (type === 'error') {
                    if (!this._events.error ||
                        (isObject(this._events.error) && !this._events.error.length)) {
                        er = arguments[1];
                        if (er instanceof Error) {
                            throw er; // Unhandled 'error' event
                        }
                        throw TypeError('Uncaught, unspecified "error" event.');
                    }
                }

                handler = this._events[type];

                if (isUndefined(handler))
                    return false;

                if (isFunction(handler)) {
                    switch (arguments.length) {
                        // fast cases
                        case 1:
                            handler.call(this);
                            break;
                        case 2:
                            handler.call(this, arguments[1]);
                            break;
                        case 3:
                            handler.call(this, arguments[1], arguments[2]);
                            break;
                            // slower
                        default:
                            len = arguments.length;
                            args = new Array(len - 1);
                            for (i = 1; i < len; i++)
                                args[i - 1] = arguments[i];
                            handler.apply(this, args);
                    }
                } else if (isObject(handler)) {
                    len = arguments.length;
                    args = new Array(len - 1);
                    for (i = 1; i < len; i++)
                        args[i - 1] = arguments[i];

                    listeners = handler.slice();
                    len = listeners.length;
                    for (i = 0; i < len; i++)
                        listeners[i].apply(this, args);
                }

                return true;
            };

            EventEmitter.prototype.addListener = function(type, listener) {
                var m;

                if (!isFunction(listener))
                    throw TypeError('listener must be a function');

                if (!this._events)
                    this._events = {};

                // To avoid recursion in the case that type === "newListener"! Before
                // adding it to the listeners, first emit "newListener".
                if (this._events.newListener)
                    this.emit('newListener', type,
                        isFunction(listener.listener) ?
                        listener.listener : listener);

                if (!this._events[type])
                    // Optimize the case of one listener. Don't need the extra array object.
                    this._events[type] = listener;
                else if (isObject(this._events[type]))
                    // If we've already got an array, just append.
                    this._events[type].push(listener);
                else
                    // Adding the second element, need to change to array.
                    this._events[type] = [this._events[type], listener];

                // Check for listener leak
                if (isObject(this._events[type]) && !this._events[type].warned) {
                    var m;
                    if (!isUndefined(this._maxListeners)) {
                        m = this._maxListeners;
                    } else {
                        m = EventEmitter.defaultMaxListeners;
                    }

                    if (m && m > 0 && this._events[type].length > m) {
                        this._events[type].warned = true;
                        console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            this._events[type].length);
                        if (typeof console.trace === 'function') {
                            // not supported in IE 10
                            console.trace();
                        }
                    }
                }

                return this;
            };

            EventEmitter.prototype.on = EventEmitter.prototype.addListener;

            EventEmitter.prototype.once = function(type, listener) {
                if (!isFunction(listener))
                    throw TypeError('listener must be a function');

                var fired = false;

                function g() {
                    this.removeListener(type, g);

                    if (!fired) {
                        fired = true;
                        listener.apply(this, arguments);
                    }
                }

                g.listener = listener;
                this.on(type, g);

                return this;
            };

            // emits a 'removeListener' event iff the listener was removed
            EventEmitter.prototype.removeListener = function(type, listener) {
                var list, position, length, i;

                if (!isFunction(listener))
                    throw TypeError('listener must be a function');

                if (!this._events || !this._events[type])
                    return this;

                list = this._events[type];
                length = list.length;
                position = -1;

                if (list === listener ||
                    (isFunction(list.listener) && list.listener === listener)) {
                    delete this._events[type];
                    if (this._events.removeListener)
                        this.emit('removeListener', type, listener);

                } else if (isObject(list)) {
                    for (i = length; i-- > 0;) {
                        if (list[i] === listener ||
                            (list[i].listener && list[i].listener === listener)) {
                            position = i;
                            break;
                        }
                    }

                    if (position < 0)
                        return this;

                    if (list.length === 1) {
                        list.length = 0;
                        delete this._events[type];
                    } else {
                        list.splice(position, 1);
                    }

                    if (this._events.removeListener)
                        this.emit('removeListener', type, listener);
                }

                return this;
            };

            EventEmitter.prototype.removeAllListeners = function(type) {
                var key, listeners;

                if (!this._events)
                    return this;

                // not listening for removeListener, no need to emit
                if (!this._events.removeListener) {
                    if (arguments.length === 0)
                        this._events = {};
                    else if (this._events[type])
                        delete this._events[type];
                    return this;
                }

                // emit removeListener for all listeners on all events
                if (arguments.length === 0) {
                    for (key in this._events) {
                        if (key === 'removeListener') continue;
                        this.removeAllListeners(key);
                    }
                    this.removeAllListeners('removeListener');
                    this._events = {};
                    return this;
                }

                listeners = this._events[type];

                if (isFunction(listeners)) {
                    this.removeListener(type, listeners);
                } else {
                    // LIFO order
                    while (listeners.length)
                        this.removeListener(type, listeners[listeners.length - 1]);
                }
                delete this._events[type];

                return this;
            };

            EventEmitter.prototype.listeners = function(type) {
                var ret;
                if (!this._events || !this._events[type])
                    ret = [];
                else if (isFunction(this._events[type]))
                    ret = [this._events[type]];
                else
                    ret = this._events[type].slice();
                return ret;
            };

            EventEmitter.listenerCount = function(emitter, type) {
                var ret;
                if (!emitter._events || !emitter._events[type])
                    ret = 0;
                else if (isFunction(emitter._events[type]))
                    ret = 1;
                else
                    ret = emitter._events[type].length;
                return ret;
            };

            function isFunction(arg) {
                return typeof arg === 'function';
            }

            function isNumber(arg) {
                return typeof arg === 'number';
            }

            function isObject(arg) {
                return typeof arg === 'object' && arg !== null;
            }

            function isUndefined(arg) {
                return arg === void 0;
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/events/events.js", "/../../node_modules/events")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    8: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            // originally pulled out of simple-peer

            module.exports = function getBrowserRTC() {
                if (typeof window === 'undefined') return null
                var wrtc = {
                    RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection ||
                        window.webkitRTCPeerConnection,
                    RTCSessionDescription: window.RTCSessionDescription ||
                        window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
                    RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate ||
                        window.webkitRTCIceCandidate
                }
                if (!wrtc.RTCPeerConnection) return null
                return wrtc
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/get-browser-rtc/index.js", "/../../node_modules/get-browser-rtc")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    9: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            exports.read = function(buffer, offset, isLE, mLen, nBytes) {
                var e, m
                var eLen = nBytes * 8 - mLen - 1
                var eMax = (1 << eLen) - 1
                var eBias = eMax >> 1
                var nBits = -7
                var i = isLE ? (nBytes - 1) : 0
                var d = isLE ? -1 : 1
                var s = buffer[offset + i]

                i += d

                e = s & ((1 << (-nBits)) - 1)
                s >>= (-nBits)
                nBits += eLen
                for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

                m = e & ((1 << (-nBits)) - 1)
                e >>= (-nBits)
                nBits += mLen
                for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

                if (e === 0) {
                    e = 1 - eBias
                } else if (e === eMax) {
                    return m ? NaN : ((s ? -1 : 1) * Infinity)
                } else {
                    m = m + Math.pow(2, mLen)
                    e = e - eBias
                }
                return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
            }

            exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
                var e, m, c
                var eLen = nBytes * 8 - mLen - 1
                var eMax = (1 << eLen) - 1
                var eBias = eMax >> 1
                var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
                var i = isLE ? 0 : (nBytes - 1)
                var d = isLE ? 1 : -1
                var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

                value = Math.abs(value)

                if (isNaN(value) || value === Infinity) {
                    m = isNaN(value) ? 1 : 0
                    e = eMax
                } else {
                    e = Math.floor(Math.log(value) / Math.LN2)
                    if (value * (c = Math.pow(2, -e)) < 1) {
                        e--
                        c *= 2
                    }
                    if (e + eBias >= 1) {
                        value += rt / c
                    } else {
                        value += rt * Math.pow(2, 1 - eBias)
                    }
                    if (value * c >= 2) {
                        e++
                        c /= 2
                    }

                    if (e + eBias >= eMax) {
                        m = 0
                        e = eMax
                    } else if (e + eBias >= 1) {
                        m = (value * c - 1) * Math.pow(2, mLen)
                        e = e + eBias
                    } else {
                        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
                        e = 0
                    }
                }

                for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

                e = (e << mLen) | m
                eLen += mLen
                for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

                buffer[offset + i - d] |= s * 128
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/ieee754/index.js", "/../../node_modules/ieee754")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    10: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            if (typeof Object.create === 'function') {
                // implementation from standard node.js 'util' module
                module.exports = function inherits(ctor, superCtor) {
                    ctor.super_ = superCtor
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
                // old school shim for old browsers
                module.exports = function inherits(ctor, superCtor) {
                    ctor.super_ = superCtor
                    var TempCtor = function() {}
                    TempCtor.prototype = superCtor.prototype
                    ctor.prototype = new TempCtor()
                    ctor.prototype.constructor = ctor
                }
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/inherits/inherits_browser.js", "/../../node_modules/inherits")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    11: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            /**
             * Helpers.
             */

            var s = 1000;
            var m = s * 60;
            var h = m * 60;
            var d = h * 24;
            var y = d * 365.25;

            /**
             * Parse or format the given `val`.
             *
             * Options:
             *
             *  - `long` verbose formatting [false]
             *
             * @param {String|Number} val
             * @param {Object} [options]
             * @throws {Error} throw an error if val is not a non-empty string or a number
             * @return {String|Number}
             * @api public
             */

            module.exports = function(val, options) {
                options = options || {};
                var type = typeof val;
                if (type === 'string' && val.length > 0) {
                    return parse(val);
                } else if (type === 'number' && isNaN(val) === false) {
                    return options.long ? fmtLong(val) : fmtShort(val);
                }
                throw new Error(
                    'val is not a non-empty string or a valid number. val=' +
                    JSON.stringify(val)
                );
            };

            /**
             * Parse the given `str` and return milliseconds.
             *
             * @param {String} str
             * @return {Number}
             * @api private
             */

            function parse(str) {
                str = String(str);
                if (str.length > 100) {
                    return;
                }
                var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                    str
                );
                if (!match) {
                    return;
                }
                var n = parseFloat(match[1]);
                var type = (match[2] || 'ms').toLowerCase();
                switch (type) {
                    case 'years':
                    case 'year':
                    case 'yrs':
                    case 'yr':
                    case 'y':
                        return n * y;
                    case 'days':
                    case 'day':
                    case 'd':
                        return n * d;
                    case 'hours':
                    case 'hour':
                    case 'hrs':
                    case 'hr':
                    case 'h':
                        return n * h;
                    case 'minutes':
                    case 'minute':
                    case 'mins':
                    case 'min':
                    case 'm':
                        return n * m;
                    case 'seconds':
                    case 'second':
                    case 'secs':
                    case 'sec':
                    case 's':
                        return n * s;
                    case 'milliseconds':
                    case 'millisecond':
                    case 'msecs':
                    case 'msec':
                    case 'ms':
                        return n;
                    default:
                        return undefined;
                }
            }

            /**
             * Short format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtShort(ms) {
                if (ms >= d) {
                    return Math.round(ms / d) + 'd';
                }
                if (ms >= h) {
                    return Math.round(ms / h) + 'h';
                }
                if (ms >= m) {
                    return Math.round(ms / m) + 'm';
                }
                if (ms >= s) {
                    return Math.round(ms / s) + 's';
                }
                return ms + 'ms';
            }

            /**
             * Long format for `ms`.
             *
             * @param {Number} ms
             * @return {String}
             * @api private
             */

            function fmtLong(ms) {
                return plural(ms, d, 'day') ||
                    plural(ms, h, 'hour') ||
                    plural(ms, m, 'minute') ||
                    plural(ms, s, 'second') ||
                    ms + ' ms';
            }

            /**
             * Pluralization helper.
             */

            function plural(ms, n, name) {
                if (ms < n) {
                    return;
                }
                if (ms < n * 1.5) {
                    return Math.floor(ms / n) + ' ' + name;
                }
                return Math.ceil(ms / n) + ' ' + name + 's';
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/ms/index.js", "/../../node_modules/ms")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    12: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            'use strict';

            if (!process.version ||
                process.version.indexOf('v0.') === 0 ||
                process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
                module.exports = nextTick;
            } else {
                module.exports = process.nextTick;
            }

            function nextTick(fn, arg1, arg2, arg3) {
                if (typeof fn !== 'function') {
                    throw new TypeError('"callback" argument must be a function');
                }
                var len = arguments.length;
                var args, i;
                switch (len) {
                    case 0:
                    case 1:
                        return process.nextTick(fn);
                    case 2:
                        return process.nextTick(function afterTickOne() {
                            fn.call(null, arg1);
                        });
                    case 3:
                        return process.nextTick(function afterTickTwo() {
                            fn.call(null, arg1, arg2);
                        });
                    case 4:
                        return process.nextTick(function afterTickThree() {
                            fn.call(null, arg1, arg2, arg3);
                        });
                    default:
                        args = new Array(len - 1);
                        i = 0;
                        while (i < args.length) {
                            args[i++] = arguments[i];
                        }
                        return process.nextTick(function afterTick() {
                            fn.apply(null, args);
                        });
                }
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/process-nextick-args/index.js", "/../../node_modules/process-nextick-args")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    13: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            // shim for using process in browser

            var process = module.exports = {};

            process.nextTick = (function() {
                var canSetImmediate = typeof window !== 'undefined' &&
                    window.setImmediate;
                var canPost = typeof window !== 'undefined' &&
                    window.postMessage && window.addEventListener;

                if (canSetImmediate) {
                    return function(f) {
                        return window.setImmediate(f)
                    };
                }

                if (canPost) {
                    var queue = [];
                    window.addEventListener('message', function(ev) {
                        var source = ev.source;
                        if ((source === window || source === null) && ev.data === 'process-tick') {
                            ev.stopPropagation();
                            if (queue.length > 0) {
                                var fn = queue.shift();
                                fn();
                            }
                        }
                    }, true);

                    return function nextTick(fn) {
                        queue.push(fn);
                        window.postMessage('process-tick', '*');
                    };
                }

                return function nextTick(fn) {
                    setTimeout(fn, 0);
                };
            })();

            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];

            function noop() {}

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;

            process.binding = function(name) {
                throw new Error('process.binding is not supported');
            }

            // TODO(shtylman)
            process.cwd = function() {
                return '/'
            };
            process.chdir = function(dir) {
                throw new Error('process.chdir is not supported');
            };

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/process/browser.js", "/../../node_modules/process")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    14: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            'use strict'

            function oldBrowser() {
                throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11')
            }

            var Buffer = require('safe-buffer').Buffer
            var crypto = global.crypto || global.msCrypto

            if (crypto && crypto.getRandomValues) {
                module.exports = randomBytes
            } else {
                module.exports = oldBrowser
            }

            function randomBytes(size, cb) {
                // phantomjs needs to throw
                if (size > 65536) throw new Error('requested too many random bytes')
                // in case browserify  isn't using the Uint8Array version
                var rawBytes = new global.Uint8Array(size)

                // This will not work in older browsers.
                // See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
                if (size > 0) { // getRandomValues fails on IE if size == 0
                    crypto.getRandomValues(rawBytes)
                }

                // XXX: phantomjs doesn't like a buffer being passed here
                var bytes = Buffer.from(rawBytes.buffer)

                if (typeof cb === 'function') {
                    return process.nextTick(function() {
                        cb(null, bytes)
                    })
                }

                return bytes
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/randombytes/browser.js", "/../../node_modules/randombytes")
    }, {
        "buffer": 3,
        "rH1JPG": 13,
        "safe-buffer": 25
    }],
    15: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
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

            // a duplex stream is just a stream that is both readable and writable.
            // Since JS doesn't have multiple prototypal inheritance, this class
            // prototypally inherits from Readable, and then parasitically from
            // Writable.

            'use strict';

            /*<replacement>*/

            var processNextTick = require('process-nextick-args');
            /*</replacement>*/

            /*<replacement>*/
            var objectKeys = Object.keys || function(obj) {
                var keys = [];
                for (var key in obj) {
                    keys.push(key);
                }
                return keys;
            };
            /*</replacement>*/

            module.exports = Duplex;

            /*<replacement>*/
            var util = require('core-util-is');
            util.inherits = require('inherits');
            /*</replacement>*/

            var Readable = require('./_stream_readable');
            var Writable = require('./_stream_writable');

            util.inherits(Duplex, Readable);

            var keys = objectKeys(Writable.prototype);
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

                this.once('end', onend);
            }

            // the no-half-open enforcer
            function onend() {
                // if we allow half-open state, or if the writable side ended,
                // then we're ok.
                if (this.allowHalfOpen || this._writableState.ended) return;

                // no more data can be written.
                // But allow more writes to happen in this tick.
                processNextTick(onEndNT, this);
            }

            function onEndNT(self) {
                self.end();
            }

            Object.defineProperty(Duplex.prototype, 'destroyed', {
                get: function() {
                    if (this._readableState === undefined || this._writableState === undefined) {
                        return false;
                    }
                    return this._readableState.destroyed && this._writableState.destroyed;
                },
                set: function(value) {
                    // we ignore the value if the stream
                    // has not been initialized yet
                    if (this._readableState === undefined || this._writableState === undefined) {
                        return;
                    }

                    // backward compatibility, the user is explicitly
                    // managing destroyed
                    this._readableState.destroyed = value;
                    this._writableState.destroyed = value;
                }
            });

            Duplex.prototype._destroy = function(err, cb) {
                this.push(null);
                this.end();

                processNextTick(cb, err);
            };

            function forEach(xs, f) {
                for (var i = 0, l = xs.length; i < l; i++) {
                    f(xs[i], i);
                }
            }
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/lib/_stream_duplex.js", "/../../node_modules/readable-stream/lib")
    }, {
        "./_stream_readable": 17,
        "./_stream_writable": 19,
        "buffer": 3,
        "core-util-is": 4,
        "inherits": 10,
        "process-nextick-args": 12,
        "rH1JPG": 13
    }],
    16: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
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

            // a passthrough stream.
            // basically just the most minimal sort of Transform stream.
            // Every written chunk gets output as-is.

            'use strict';

            module.exports = PassThrough;

            var Transform = require('./_stream_transform');

            /*<replacement>*/
            var util = require('core-util-is');
            util.inherits = require('inherits');
            /*</replacement>*/

            util.inherits(PassThrough, Transform);

            function PassThrough(options) {
                if (!(this instanceof PassThrough)) return new PassThrough(options);

                Transform.call(this, options);
            }

            PassThrough.prototype._transform = function(chunk, encoding, cb) {
                cb(null, chunk);
            };
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/lib/_stream_passthrough.js", "/../../node_modules/readable-stream/lib")
    }, {
        "./_stream_transform": 18,
        "buffer": 3,
        "core-util-is": 4,
        "inherits": 10,
        "rH1JPG": 13
    }],
    17: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
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

            'use strict';

            /*<replacement>*/

            var processNextTick = require('process-nextick-args');
            /*</replacement>*/

            module.exports = Readable;

            /*<replacement>*/
            var isArray = require('isarray');
            /*</replacement>*/

            /*<replacement>*/
            var Duplex;
            /*</replacement>*/

            Readable.ReadableState = ReadableState;

            /*<replacement>*/
            var EE = require('events').EventEmitter;

            var EElistenerCount = function(emitter, type) {
                return emitter.listeners(type).length;
            };
            /*</replacement>*/

            /*<replacement>*/
            var Stream = require('./internal/streams/stream');
            /*</replacement>*/

            // TODO(bmeurer): Change this back to const once hole checks are
            // properly optimized away early in Ignition+TurboFan.
            /*<replacement>*/
            var Buffer = require('safe-buffer').Buffer;
            var OurUint8Array = global.Uint8Array || function() {};

            function _uint8ArrayToBuffer(chunk) {
                return Buffer.from(chunk);
            }

            function _isUint8Array(obj) {
                return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
            }
            /*</replacement>*/

            /*<replacement>*/
            var util = require('core-util-is');
            util.inherits = require('inherits');
            /*</replacement>*/

            /*<replacement>*/
            var debugUtil = require('util');
            var debug = void 0;
            if (debugUtil && debugUtil.debuglog) {
                debug = debugUtil.debuglog('stream');
            } else {
                debug = function() {};
            }
            /*</replacement>*/

            var BufferList = require('./internal/streams/BufferList');
            var destroyImpl = require('./internal/streams/destroy');
            var StringDecoder;

            util.inherits(Readable, Stream);

            var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

            function prependListener(emitter, event, fn) {
                // Sadly this is not cacheable as some libraries bundle their own
                // event emitter implementation with them.
                if (typeof emitter.prependListener === 'function') {
                    return emitter.prependListener(event, fn);
                } else {
                    // This is a hack to make sure that our error handler is attached before any
                    // userland ones.  NEVER DO THIS. This is here only because this code needs
                    // to continue to work with older versions of Node.js that do not include
                    // the prependListener() method. The goal is to eventually remove this hack.
                    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
                    else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
                    else emitter._events[event] = [fn, emitter._events[event]];
                }
            }

            function ReadableState(options, stream) {
                Duplex = Duplex || require('./_stream_duplex');

                options = options || {};

                // object stream flag. Used to make read(n) ignore n and to
                // make all the buffer merging and length checks go away
                this.objectMode = !!options.objectMode;

                if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

                // the point at which it stops calling _read() to fill the buffer
                // Note: 0 is a valid value, means "don't call _read preemptively ever"
                var hwm = options.highWaterMark;
                var defaultHwm = this.objectMode ? 16 : 16 * 1024;
                this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

                // cast to ints.
                this.highWaterMark = Math.floor(this.highWaterMark);

                // A linked list is used to store data chunks instead of an array because the
                // linked list can remove elements from the beginning faster than
                // array.shift()
                this.buffer = new BufferList();
                this.length = 0;
                this.pipes = null;
                this.pipesCount = 0;
                this.flowing = null;
                this.ended = false;
                this.endEmitted = false;
                this.reading = false;

                // a flag to be able to tell if the event 'readable'/'data' is emitted
                // immediately, or on a later tick.  We set this to true at first, because
                // any actions that shouldn't happen until "later" should generally also
                // not happen before the first read call.
                this.sync = true;

                // whenever we return null, then we set a flag to say
                // that we're awaiting a 'readable' event emission.
                this.needReadable = false;
                this.emittedReadable = false;
                this.readableListening = false;
                this.resumeScheduled = false;

                // has it been destroyed
                this.destroyed = false;

                // Crypto is kind of old and crusty.  Historically, its default string
                // encoding is 'binary' so we have to make this configurable.
                // Everything else in the universe uses 'utf8', though.
                this.defaultEncoding = options.defaultEncoding || 'utf8';

                // the number of writers that are awaiting a drain event in .pipe()s
                this.awaitDrain = 0;

                // if true, a maybeReadMore has been scheduled
                this.readingMore = false;

                this.decoder = null;
                this.encoding = null;
                if (options.encoding) {
                    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
                    this.decoder = new StringDecoder(options.encoding);
                    this.encoding = options.encoding;
                }
            }

            function Readable(options) {
                Duplex = Duplex || require('./_stream_duplex');

                if (!(this instanceof Readable)) return new Readable(options);

                this._readableState = new ReadableState(options, this);

                // legacy
                this.readable = true;

                if (options) {
                    if (typeof options.read === 'function') this._read = options.read;

                    if (typeof options.destroy === 'function') this._destroy = options.destroy;
                }

                Stream.call(this);
            }

            Object.defineProperty(Readable.prototype, 'destroyed', {
                get: function() {
                    if (this._readableState === undefined) {
                        return false;
                    }
                    return this._readableState.destroyed;
                },
                set: function(value) {
                    // we ignore the value if the stream
                    // has not been initialized yet
                    if (!this._readableState) {
                        return;
                    }

                    // backward compatibility, the user is explicitly
                    // managing destroyed
                    this._readableState.destroyed = value;
                }
            });

            Readable.prototype.destroy = destroyImpl.destroy;
            Readable.prototype._undestroy = destroyImpl.undestroy;
            Readable.prototype._destroy = function(err, cb) {
                this.push(null);
                cb(err);
            };

            // Manually shove something into the read() buffer.
            // This returns true if the highWaterMark has not been hit yet,
            // similar to how Writable.write() returns true if you should
            // write() some more.
            Readable.prototype.push = function(chunk, encoding) {
                var state = this._readableState;
                var skipChunkCheck;

                if (!state.objectMode) {
                    if (typeof chunk === 'string') {
                        encoding = encoding || state.defaultEncoding;
                        if (encoding !== state.encoding) {
                            chunk = Buffer.from(chunk, encoding);
                            encoding = '';
                        }
                        skipChunkCheck = true;
                    }
                } else {
                    skipChunkCheck = true;
                }

                return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
            };

            // Unshift should *always* be something directly out of read()
            Readable.prototype.unshift = function(chunk) {
                return readableAddChunk(this, chunk, null, true, false);
            };

            function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
                var state = stream._readableState;
                if (chunk === null) {
                    state.reading = false;
                    onEofChunk(stream, state);
                } else {
                    var er;
                    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
                    if (er) {
                        stream.emit('error', er);
                    } else if (state.objectMode || chunk && chunk.length > 0) {
                        if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                            chunk = _uint8ArrayToBuffer(chunk);
                        }

                        if (addToFront) {
                            if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));
                            else addChunk(stream, state, chunk, true);
                        } else if (state.ended) {
                            stream.emit('error', new Error('stream.push() after EOF'));
                        } else {
                            state.reading = false;
                            if (state.decoder && !encoding) {
                                chunk = state.decoder.write(chunk);
                                if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
                                else maybeReadMore(stream, state);
                            } else {
                                addChunk(stream, state, chunk, false);
                            }
                        }
                    } else if (!addToFront) {
                        state.reading = false;
                    }
                }

                return needMoreData(state);
            }

            function addChunk(stream, state, chunk, addToFront) {
                if (state.flowing && state.length === 0 && !state.sync) {
                    stream.emit('data', chunk);
                    stream.read(0);
                } else {
                    // update the buffer info.
                    state.length += state.objectMode ? 1 : chunk.length;
                    if (addToFront) state.buffer.unshift(chunk);
                    else state.buffer.push(chunk);

                    if (state.needReadable) emitReadable(stream);
                }
                maybeReadMore(stream, state);
            }

            function chunkInvalid(state, chunk) {
                var er;
                if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
                    er = new TypeError('Invalid non-string/buffer chunk');
                }
                return er;
            }

            // if it's past the high water mark, we can push in some more.
            // Also, if we have no data yet, we can stand some
            // more bytes.  This is to work around cases where hwm=0,
            // such as the repl.  Also, if the push() triggered a
            // readable event, and the user called read(largeNumber) such that
            // needReadable was set, then we ought to push more, so that another
            // 'readable' event will be triggered.
            function needMoreData(state) {
                return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
            }

            Readable.prototype.isPaused = function() {
                return this._readableState.flowing === false;
            };

            // backwards compatibility.
            Readable.prototype.setEncoding = function(enc) {
                if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
                this._readableState.decoder = new StringDecoder(enc);
                this._readableState.encoding = enc;
                return this;
            };

            // Don't raise the hwm > 8MB
            var MAX_HWM = 0x800000;

            function computeNewHighWaterMark(n) {
                if (n >= MAX_HWM) {
                    n = MAX_HWM;
                } else {
                    // Get the next highest power of 2 to prevent increasing hwm excessively in
                    // tiny amounts
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

            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function howMuchToRead(n, state) {
                if (n <= 0 || state.length === 0 && state.ended) return 0;
                if (state.objectMode) return 1;
                if (n !== n) {
                    // Only flow one buffer at a time
                    if (state.flowing && state.length) return state.buffer.head.data.length;
                    else return state.length;
                }
                // If we're asking for more than the current hwm, then raise the hwm.
                if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
                if (n <= state.length) return n;
                // Don't have enough
                if (!state.ended) {
                    state.needReadable = true;
                    return 0;
                }
                return state.length;
            }

            // you can override either this method, or the async _read(n) below.
            Readable.prototype.read = function(n) {
                debug('read', n);
                n = parseInt(n, 10);
                var state = this._readableState;
                var nOrig = n;

                if (n !== 0) state.emittedReadable = false;

                // if we're doing read(0) to trigger a readable event, but we
                // already have a bunch of data in the buffer, then just trigger
                // the 'readable' event and move on.
                if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
                    debug('read: emitReadable', state.length, state.ended);
                    if (state.length === 0 && state.ended) endReadable(this);
                    else emitReadable(this);
                    return null;
                }

                n = howMuchToRead(n, state);

                // if we've ended, and we're now clear, then finish it up.
                if (n === 0 && state.ended) {
                    if (state.length === 0) endReadable(this);
                    return null;
                }

                // All the actual chunk generation logic needs to be
                // *below* the call to _read.  The reason is that in certain
                // synthetic stream cases, such as passthrough streams, _read
                // may be a completely synchronous operation which may change
                // the state of the read buffer, providing enough data when
                // before there was *not* enough.
                //
                // So, the steps are:
                // 1. Figure out what the state of things will be after we do
                // a read from the buffer.
                //
                // 2. If that resulting state will trigger a _read, then call _read.
                // Note that this may be asynchronous, or synchronous.  Yes, it is
                // deeply ugly to write APIs this way, but that still doesn't mean
                // that the Readable class should behave improperly, as streams are
                // designed to be sync/async agnostic.
                // Take note if the _read call is sync or async (ie, if the read call
                // has returned yet), so that we know whether or not it's safe to emit
                // 'readable' etc.
                //
                // 3. Actually pull the requested chunks out of the buffer and return.

                // if we need a readable event, then we need to do some reading.
                var doRead = state.needReadable;
                debug('need readable', doRead);

                // if we currently have less than the highWaterMark, then also read some
                if (state.length === 0 || state.length - n < state.highWaterMark) {
                    doRead = true;
                    debug('length less than watermark', doRead);
                }

                // however, if we've ended, then there's no point, and if we're already
                // reading, then it's unnecessary.
                if (state.ended || state.reading) {
                    doRead = false;
                    debug('reading or ended', doRead);
                } else if (doRead) {
                    debug('do read');
                    state.reading = true;
                    state.sync = true;
                    // if the length is currently zero, then we *need* a readable event.
                    if (state.length === 0) state.needReadable = true;
                    // call internal read method
                    this._read(state.highWaterMark);
                    state.sync = false;
                    // If _read pushed data synchronously, then `reading` will be false,
                    // and we need to re-evaluate how much data we can return to the user.
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
                    // If we have nothing in the buffer, then we want to know
                    // as soon as we *do* get something into the buffer.
                    if (!state.ended) state.needReadable = true;

                    // If we tried to read() past the EOF, then emit end on the next tick.
                    if (nOrig !== n && state.ended) endReadable(this);
                }

                if (ret !== null) this.emit('data', ret);

                return ret;
            };

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

                // emit 'readable' now to make sure it gets picked up.
                emitReadable(stream);
            }

            // Don't emit readable right away in sync mode, because this can trigger
            // another read() call => stack overflow.  This way, it might trigger
            // a nextTick recursion warning, but that's not so bad.
            function emitReadable(stream) {
                var state = stream._readableState;
                state.needReadable = false;
                if (!state.emittedReadable) {
                    debug('emitReadable', state.flowing);
                    state.emittedReadable = true;
                    if (state.sync) processNextTick(emitReadable_, stream);
                    else emitReadable_(stream);
                }
            }

            function emitReadable_(stream) {
                debug('emit readable');
                stream.emit('readable');
                flow(stream);
            }

            // at this point, the user has presumably seen the 'readable' event,
            // and called read() to consume some data.  that may have triggered
            // in turn another _read(n) call, in which case reading = true if
            // it's in progress.
            // However, if we're not ended, or reading, and the length < hwm,
            // then go ahead and try to read some more preemptively.
            function maybeReadMore(stream, state) {
                if (!state.readingMore) {
                    state.readingMore = true;
                    processNextTick(maybeReadMore_, stream, state);
                }
            }

            function maybeReadMore_(stream, state) {
                var len = state.length;
                while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
                    debug('maybeReadMore read 0');
                    stream.read(0);
                    if (len === state.length)
                        // didn't get any data, stop spinning.
                        break;
                    else len = state.length;
                }
                state.readingMore = false;
            }

            // abstract method.  to be overridden in specific implementation classes.
            // call cb(er, data) where data is <= n in length.
            // for virtual (non-string, non-buffer) streams, "length" is somewhat
            // arbitrary, and perhaps not very meaningful.
            Readable.prototype._read = function(n) {
                this.emit('error', new Error('_read() is not implemented'));
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
                debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

                var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

                var endFn = doEnd ? onend : unpipe;
                if (state.endEmitted) processNextTick(endFn);
                else src.once('end', endFn);

                dest.on('unpipe', onunpipe);

                function onunpipe(readable, unpipeInfo) {
                    debug('onunpipe');
                    if (readable === src) {
                        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                            unpipeInfo.hasUnpiped = true;
                            cleanup();
                        }
                    }
                }

                function onend() {
                    debug('onend');
                    dest.end();
                }

                // when the dest drains, it reduces the awaitDrain counter
                // on the source.  This would be more elegant with a .once()
                // handler in flow(), but adding and removing repeatedly is
                // too slow.
                var ondrain = pipeOnDrain(src);
                dest.on('drain', ondrain);

                var cleanedUp = false;

                function cleanup() {
                    debug('cleanup');
                    // cleanup event handlers once the pipe is broken
                    dest.removeListener('close', onclose);
                    dest.removeListener('finish', onfinish);
                    dest.removeListener('drain', ondrain);
                    dest.removeListener('error', onerror);
                    dest.removeListener('unpipe', onunpipe);
                    src.removeListener('end', onend);
                    src.removeListener('end', unpipe);
                    src.removeListener('data', ondata);

                    cleanedUp = true;

                    // if the reader is waiting for a drain event from this
                    // specific writer, then it would cause it to never start
                    // flowing again.
                    // So, if this is awaiting a drain, then we just call it now.
                    // If we don't know, then assume that we are waiting for one.
                    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
                }

                // If the user pushes more data while we're writing to dest then we'll end up
                // in ondata again. However, we only want to increase awaitDrain once because
                // dest will only emit one 'drain' event for the multiple writes.
                // => Introduce a guard on increasing awaitDrain.
                var increasedAwaitDrain = false;
                src.on('data', ondata);

                function ondata(chunk) {
                    debug('ondata');
                    increasedAwaitDrain = false;
                    var ret = dest.write(chunk);
                    if (false === ret && !increasedAwaitDrain) {
                        // If the user unpiped during `dest.write()`, it is possible
                        // to get stuck in a permanently paused state if that write
                        // also returned false.
                        // => Check whether `dest` is still a piping destination.
                        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                            debug('false write response, pause', src._readableState.awaitDrain);
                            src._readableState.awaitDrain++;
                            increasedAwaitDrain = true;
                        }
                        src.pause();
                    }
                }

                // if the dest has an error, then stop piping into it.
                // however, don't suppress the throwing behavior for this.
                function onerror(er) {
                    debug('onerror', er);
                    unpipe();
                    dest.removeListener('error', onerror);
                    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
                }

                // Make sure our error handler is attached before userland ones.
                prependListener(dest, 'error', onerror);

                // Both close and finish should trigger unpipe, but only once.
                function onclose() {
                    dest.removeListener('finish', onfinish);
                    unpipe();
                }
                dest.once('close', onclose);

                function onfinish() {
                    debug('onfinish');
                    dest.removeListener('close', onclose);
                    unpipe();
                }
                dest.once('finish', onfinish);

                function unpipe() {
                    debug('unpipe');
                    src.unpipe(dest);
                }

                // tell the dest that it's being piped to
                dest.emit('pipe', src);

                // start the flow if it hasn't been started already.
                if (!state.flowing) {
                    debug('pipe resume');
                    src.resume();
                }

                return dest;
            };

            function pipeOnDrain(src) {
                return function() {
                    var state = src._readableState;
                    debug('pipeOnDrain', state.awaitDrain);
                    if (state.awaitDrain) state.awaitDrain--;
                    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
                        state.flowing = true;
                        flow(src);
                    }
                };
            }

            Readable.prototype.unpipe = function(dest) {
                var state = this._readableState;
                var unpipeInfo = {
                    hasUnpiped: false
                };

                // if we're not piping anywhere, then do nothing.
                if (state.pipesCount === 0) return this;

                // just one destination.  most common case.
                if (state.pipesCount === 1) {
                    // passed in one, but it's not the right one.
                    if (dest && dest !== state.pipes) return this;

                    if (!dest) dest = state.pipes;

                    // got a match.
                    state.pipes = null;
                    state.pipesCount = 0;
                    state.flowing = false;
                    if (dest) dest.emit('unpipe', this, unpipeInfo);
                    return this;
                }

                // slow case. multiple pipe destinations.

                if (!dest) {
                    // remove all.
                    var dests = state.pipes;
                    var len = state.pipesCount;
                    state.pipes = null;
                    state.pipesCount = 0;
                    state.flowing = false;

                    for (var i = 0; i < len; i++) {
                        dests[i].emit('unpipe', this, unpipeInfo);
                    }
                    return this;
                }

                // try to find the right one.
                var index = indexOf(state.pipes, dest);
                if (index === -1) return this;

                state.pipes.splice(index, 1);
                state.pipesCount -= 1;
                if (state.pipesCount === 1) state.pipes = state.pipes[0];

                dest.emit('unpipe', this, unpipeInfo);

                return this;
            };

            // set up data events if they are asked for
            // Ensure readable listeners eventually get something
            Readable.prototype.on = function(ev, fn) {
                var res = Stream.prototype.on.call(this, ev, fn);

                if (ev === 'data') {
                    // Start flowing on next tick if stream isn't explicitly paused
                    if (this._readableState.flowing !== false) this.resume();
                } else if (ev === 'readable') {
                    var state = this._readableState;
                    if (!state.endEmitted && !state.readableListening) {
                        state.readableListening = state.needReadable = true;
                        state.emittedReadable = false;
                        if (!state.reading) {
                            processNextTick(nReadingNextTick, this);
                        } else if (state.length) {
                            emitReadable(this);
                        }
                    }
                }

                return res;
            };
            Readable.prototype.addListener = Readable.prototype.on;

            function nReadingNextTick(self) {
                debug('readable nexttick read 0');
                self.read(0);
            }

            // pause() and resume() are remnants of the legacy readable stream API
            // If the user uses them, then switch into old mode.
            Readable.prototype.resume = function() {
                var state = this._readableState;
                if (!state.flowing) {
                    debug('resume');
                    state.flowing = true;
                    resume(this, state);
                }
                return this;
            };

            function resume(stream, state) {
                if (!state.resumeScheduled) {
                    state.resumeScheduled = true;
                    processNextTick(resume_, stream, state);
                }
            }

            function resume_(stream, state) {
                if (!state.reading) {
                    debug('resume read 0');
                    stream.read(0);
                }

                state.resumeScheduled = false;
                state.awaitDrain = 0;
                stream.emit('resume');
                flow(stream);
                if (state.flowing && !state.reading) stream.read(0);
            }

            Readable.prototype.pause = function() {
                debug('call pause flowing=%j', this._readableState.flowing);
                if (false !== this._readableState.flowing) {
                    debug('pause');
                    this._readableState.flowing = false;
                    this.emit('pause');
                }
                return this;
            };

            function flow(stream) {
                var state = stream._readableState;
                debug('flow', state.flowing);
                while (state.flowing && stream.read() !== null) {}
            }

            // wrap an old-style stream as the async data source.
            // This is *not* part of the readable stream interface.
            // It is an ugly unfortunate mess of history.
            Readable.prototype.wrap = function(stream) {
                var state = this._readableState;
                var paused = false;

                var self = this;
                stream.on('end', function() {
                    debug('wrapped end');
                    if (state.decoder && !state.ended) {
                        var chunk = state.decoder.end();
                        if (chunk && chunk.length) self.push(chunk);
                    }

                    self.push(null);
                });

                stream.on('data', function(chunk) {
                    debug('wrapped data');
                    if (state.decoder) chunk = state.decoder.write(chunk);

                    // don't skip over falsy values in objectMode
                    if (state.objectMode && (chunk === null || chunk === undefined)) return;
                    else if (!state.objectMode && (!chunk || !chunk.length)) return;

                    var ret = self.push(chunk);
                    if (!ret) {
                        paused = true;
                        stream.pause();
                    }
                });

                // proxy all the other methods.
                // important when wrapping filters and duplexes.
                for (var i in stream) {
                    if (this[i] === undefined && typeof stream[i] === 'function') {
                        this[i] = function(method) {
                            return function() {
                                return stream[method].apply(stream, arguments);
                            };
                        }(i);
                    }
                }

                // proxy certain important events.
                for (var n = 0; n < kProxyEvents.length; n++) {
                    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
                }

                // when we try to consume some more bytes, simply unpause the
                // underlying stream.
                self._read = function(n) {
                    debug('wrapped _read', n);
                    if (paused) {
                        paused = false;
                        stream.resume();
                    }
                };

                return self;
            };

            // exposed for testing purposes only.
            Readable._fromList = fromList;

            // Pluck off n bytes from an array of buffers.
            // Length is the combined lengths of all the buffers in the list.
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function fromList(n, state) {
                // nothing buffered
                if (state.length === 0) return null;

                var ret;
                if (state.objectMode) ret = state.buffer.shift();
                else if (!n || n >= state.length) {
                    // read it all, truncate the list
                    if (state.decoder) ret = state.buffer.join('');
                    else if (state.buffer.length === 1) ret = state.buffer.head.data;
                    else ret = state.buffer.concat(state.length);
                    state.buffer.clear();
                } else {
                    // read part of list
                    ret = fromListPartial(n, state.buffer, state.decoder);
                }

                return ret;
            }

            // Extracts only enough buffered data to satisfy the amount requested.
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function fromListPartial(n, list, hasStrings) {
                var ret;
                if (n < list.head.data.length) {
                    // slice is the same for buffers and strings
                    ret = list.head.data.slice(0, n);
                    list.head.data = list.head.data.slice(n);
                } else if (n === list.head.data.length) {
                    // first chunk is a perfect match
                    ret = list.shift();
                } else {
                    // result spans more than one buffer
                    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
                }
                return ret;
            }

            // Copies a specified amount of characters from the list of buffered data
            // chunks.
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function copyFromBufferString(n, list) {
                var p = list.head;
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
                            if (p.next) list.head = p.next;
                            else list.head = list.tail = null;
                        } else {
                            list.head = p;
                            p.data = str.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                list.length -= c;
                return ret;
            }

            // Copies a specified amount of bytes from the list of buffered data chunks.
            // This function is designed to be inlinable, so please take care when making
            // changes to the function body.
            function copyFromBuffer(n, list) {
                var ret = Buffer.allocUnsafe(n);
                var p = list.head;
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
                            if (p.next) list.head = p.next;
                            else list.head = list.tail = null;
                        } else {
                            list.head = p;
                            p.data = buf.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                list.length -= c;
                return ret;
            }

            function endReadable(stream) {
                var state = stream._readableState;

                // If we get here before consuming all the bytes, then that is a
                // bug in node.  Should never happen.
                if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

                if (!state.endEmitted) {
                    state.ended = true;
                    processNextTick(endReadableNT, state, stream);
                }
            }

            function endReadableNT(state, stream) {
                // Check that we didn't get one last unshift.
                if (!state.endEmitted && state.length === 0) {
                    state.endEmitted = true;
                    stream.readable = false;
                    stream.emit('end');
                }
            }

            function forEach(xs, f) {
                for (var i = 0, l = xs.length; i < l; i++) {
                    f(xs[i], i);
                }
            }

            function indexOf(xs, x) {
                for (var i = 0, l = xs.length; i < l; i++) {
                    if (xs[i] === x) return i;
                }
                return -1;
            }
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/lib/_stream_readable.js", "/../../node_modules/readable-stream/lib")
    }, {
        "./_stream_duplex": 15,
        "./internal/streams/BufferList": 20,
        "./internal/streams/destroy": 21,
        "./internal/streams/stream": 22,
        "buffer": 3,
        "core-util-is": 4,
        "events": 7,
        "inherits": 10,
        "isarray": 23,
        "process-nextick-args": 12,
        "rH1JPG": 13,
        "safe-buffer": 25,
        "string_decoder/": 27,
        "util": 2
    }],
    18: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {

            'use strict';

            module.exports = Transform;

            var Duplex = require('./_stream_duplex');

            /*<replacement>*/
            var util = require('core-util-is');
            util.inherits = require('inherits');
            /*</replacement>*/

            util.inherits(Transform, Duplex);

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

                if (!cb) {
                    return stream.emit('error', new Error('write callback called multiple times'));
                }

                ts.writechunk = null;
                ts.writecb = null;

                if (data !== null && data !== undefined) stream.push(data);

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

                // start out asking for a readable event once data is transformed.
                this._readableState.needReadable = true;

                // we have implemented the _read method, and done the other things
                // that Readable wants before the first _read call, so unset the
                // sync guard flag.
                this._readableState.sync = false;

                if (options) {
                    if (typeof options.transform === 'function') this._transform = options.transform;

                    if (typeof options.flush === 'function') this._flush = options.flush;
                }

                // When the writable side finishes, then flush out anything remaining.
                this.once('prefinish', function() {
                    if (typeof this._flush === 'function') this._flush(function(er, data) {
                        done(stream, er, data);
                    });
                    else done(stream);
                });
            }

            Transform.prototype.push = function(chunk, encoding) {
                this._transformState.needTransform = false;
                return Duplex.prototype.push.call(this, chunk, encoding);
            };

            // This is the part where you do stuff!
            // override this function in implementation classes.
            // 'chunk' is an input chunk.
            //
            // Call `push(newChunk)` to pass along transformed output
            // to the readable side.  You may call 'push' zero or more times.
            //
            // Call `cb(err)` when you are done with this chunk.  If you pass
            // an error, then that'll put the hurt on the whole operation.  If you
            // never call cb(), then you'll never get another chunk.
            Transform.prototype._transform = function(chunk, encoding, cb) {
                throw new Error('_transform() is not implemented');
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

            // Doesn't matter what the args are here.
            // _transform does all the work.
            // That we got here means that the readable side wants more data.
            Transform.prototype._read = function(n) {
                var ts = this._transformState;

                if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
                    ts.transforming = true;
                    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
                } else {
                    // mark that we need a transform, so that any data that comes in
                    // will get processed, now that we've asked for it.
                    ts.needTransform = true;
                }
            };

            Transform.prototype._destroy = function(err, cb) {
                var _this = this;

                Duplex.prototype._destroy.call(this, err, function(err2) {
                    cb(err2);
                    _this.emit('close');
                });
            };

            function done(stream, er, data) {
                if (er) return stream.emit('error', er);

                if (data !== null && data !== undefined) stream.push(data);

                // if there's nothing in the write buffer, then that means
                // that nothing more will ever be provided
                var ws = stream._writableState;
                var ts = stream._transformState;

                if (ws.length) throw new Error('Calling transform done when ws.length != 0');

                if (ts.transforming) throw new Error('Calling transform done when still transforming');

                return stream.push(null);
            }
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/lib/_stream_transform.js", "/../../node_modules/readable-stream/lib")
    }, {
        "./_stream_duplex": 15,
        "buffer": 3,
        "core-util-is": 4,
        "inherits": 10,
        "rH1JPG": 13
    }],
    19: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {

            'use strict';

            /*<replacement>*/

            var processNextTick = require('process-nextick-args');
            /*</replacement>*/

            module.exports = Writable;

            /* <replacement> */
            function WriteReq(chunk, encoding, cb) {
                this.chunk = chunk;
                this.encoding = encoding;
                this.callback = cb;
                this.next = null;
            }

            // It seems a linked list but it is not
            // there will be only 2 of these for each stream
            function CorkedRequest(state) {
                var _this = this;

                this.next = null;
                this.entry = null;
                this.finish = function() {
                    onCorkedFinish(_this, state);
                };
            }
            /* </replacement> */

            /*<replacement>*/
            var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
            /*</replacement>*/

            /*<replacement>*/
            var Duplex;
            /*</replacement>*/

            Writable.WritableState = WritableState;

            /*<replacement>*/
            var util = require('core-util-is');
            util.inherits = require('inherits');
            /*</replacement>*/

            /*<replacement>*/
            var internalUtil = {
                deprecate: require('util-deprecate')
            };
            /*</replacement>*/

            /*<replacement>*/
            var Stream = require('./internal/streams/stream');
            /*</replacement>*/

            /*<replacement>*/
            var Buffer = require('safe-buffer').Buffer;
            var OurUint8Array = global.Uint8Array || function() {};

            function _uint8ArrayToBuffer(chunk) {
                return Buffer.from(chunk);
            }

            function _isUint8Array(obj) {
                return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
            }
            /*</replacement>*/

            var destroyImpl = require('./internal/streams/destroy');

            util.inherits(Writable, Stream);

            function nop() {}

            function WritableState(options, stream) {
                Duplex = Duplex || require('./_stream_duplex');

                options = options || {};

                // object stream flag to indicate whether or not this stream
                // contains buffers or objects.
                this.objectMode = !!options.objectMode;

                if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

                // the point at which write() starts returning false
                // Note: 0 is a valid value, means that we always return false if
                // the entire buffer is not flushed immediately on write()
                var hwm = options.highWaterMark;
                var defaultHwm = this.objectMode ? 16 : 16 * 1024;
                this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

                // cast to ints.
                this.highWaterMark = Math.floor(this.highWaterMark);

                // if _final has been called
                this.finalCalled = false;

                // drain event flag.
                this.needDrain = false;
                // at the start of calling end()
                this.ending = false;
                // when end() has been called, and returned
                this.ended = false;
                // when 'finish' is emitted
                this.finished = false;

                // has it been destroyed
                this.destroyed = false;

                // should we decode strings into buffers before passing to _write?
                // this is here so that some node-core streams can optimize string
                // handling at a lower level.
                var noDecode = options.decodeStrings === false;
                this.decodeStrings = !noDecode;

                // Crypto is kind of old and crusty.  Historically, its default string
                // encoding is 'binary' so we have to make this configurable.
                // Everything else in the universe uses 'utf8', though.
                this.defaultEncoding = options.defaultEncoding || 'utf8';

                // not an actual buffer we keep track of, but a measurement
                // of how much we're waiting to get pushed to some underlying
                // socket or file.
                this.length = 0;

                // a flag to see when we're in the middle of a write.
                this.writing = false;

                // when true all writes will be buffered until .uncork() call
                this.corked = 0;

                // a flag to be able to tell if the onwrite cb is called immediately,
                // or on a later tick.  We set this to true at first, because any
                // actions that shouldn't happen until "later" should generally also
                // not happen before the first write call.
                this.sync = true;

                // a flag to know if we're processing previously buffered items, which
                // may call the _write() callback in the same tick, so that we don't
                // end up in an overlapped onwrite situation.
                this.bufferProcessing = false;

                // the callback that's passed to _write(chunk,cb)
                this.onwrite = function(er) {
                    onwrite(stream, er);
                };

                // the callback that the user supplies to write(chunk,encoding,cb)
                this.writecb = null;

                // the amount that is being written when _write is called.
                this.writelen = 0;

                this.bufferedRequest = null;
                this.lastBufferedRequest = null;

                // number of pending user-supplied write callbacks
                // this must be 0 before 'finish' can be emitted
                this.pendingcb = 0;

                // emit prefinish if the only thing we're waiting for is _write cbs
                // This is relevant for synchronous Transform streams
                this.prefinished = false;

                // True if the error was already emitted and should not be thrown again
                this.errorEmitted = false;

                // count buffered requests
                this.bufferedRequestCount = 0;

                // allocate the first CorkedRequest, there is always
                // one allocated and free to use, and we maintain at most two
                this.corkedRequestsFree = new CorkedRequest(this);
            }

            WritableState.prototype.getBuffer = function getBuffer() {
                var current = this.bufferedRequest;
                var out = [];
                while (current) {
                    out.push(current);
                    current = current.next;
                }
                return out;
            };

            (function() {
                try {
                    Object.defineProperty(WritableState.prototype, 'buffer', {
                        get: internalUtil.deprecate(function() {
                            return this.getBuffer();
                        }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
                    });
                } catch (_) {}
            })();

            // Test _writableState for inheritance to account for Duplex streams,
            // whose prototype chain only points to Readable.
            var realHasInstance;
            if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
                realHasInstance = Function.prototype[Symbol.hasInstance];
                Object.defineProperty(Writable, Symbol.hasInstance, {
                    value: function(object) {
                        if (realHasInstance.call(this, object)) return true;

                        return object && object._writableState instanceof WritableState;
                    }
                });
            } else {
                realHasInstance = function(object) {
                    return object instanceof this;
                };
            }

            function Writable(options) {
                Duplex = Duplex || require('./_stream_duplex');

                // Writable ctor is applied to Duplexes, too.
                // `realHasInstance` is necessary because using plain `instanceof`
                // would return false, as no `_writableState` property is attached.

                // Trying to use the custom `instanceof` for Writable here will also break the
                // Node.js LazyTransform implementation, which has a non-trivial getter for
                // `_writableState` that would lead to infinite recursion.
                if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
                    return new Writable(options);
                }

                this._writableState = new WritableState(options, this);

                // legacy.
                this.writable = true;

                if (options) {
                    if (typeof options.write === 'function') this._write = options.write;

                    if (typeof options.writev === 'function') this._writev = options.writev;

                    if (typeof options.destroy === 'function') this._destroy = options.destroy;

                    if (typeof options.final === 'function') this._final = options.final;
                }

                Stream.call(this);
            }

            // Otherwise people can pipe Writable streams, which is just wrong.
            Writable.prototype.pipe = function() {
                this.emit('error', new Error('Cannot pipe, not readable'));
            };

            function writeAfterEnd(stream, cb) {
                var er = new Error('write after end');
                // TODO: defer error events consistently everywhere, not just the cb
                stream.emit('error', er);
                processNextTick(cb, er);
            }

            // Checks that a user-supplied chunk is valid, especially for the particular
            // mode the stream is in. Currently this means that `null` is never accepted
            // and undefined/non-string values are only allowed in object mode.
            function validChunk(stream, state, chunk, cb) {
                var valid = true;
                var er = false;

                if (chunk === null) {
                    er = new TypeError('May not write null values to stream');
                } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
                    er = new TypeError('Invalid non-string/buffer chunk');
                }
                if (er) {
                    stream.emit('error', er);
                    processNextTick(cb, er);
                    valid = false;
                }
                return valid;
            }

            Writable.prototype.write = function(chunk, encoding, cb) {
                var state = this._writableState;
                var ret = false;
                var isBuf = _isUint8Array(chunk) && !state.objectMode;

                if (isBuf && !Buffer.isBuffer(chunk)) {
                    chunk = _uint8ArrayToBuffer(chunk);
                }

                if (typeof encoding === 'function') {
                    cb = encoding;
                    encoding = null;
                }

                if (isBuf) encoding = 'buffer';
                else if (!encoding) encoding = state.defaultEncoding;

                if (typeof cb !== 'function') cb = nop;

                if (state.ended) writeAfterEnd(this, cb);
                else if (isBuf || validChunk(this, state, chunk, cb)) {
                    state.pendingcb++;
                    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
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
                // node::ParseEncoding() requires lower case.
                if (typeof encoding === 'string') encoding = encoding.toLowerCase();
                if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
                this._writableState.defaultEncoding = encoding;
                return this;
            };

            function decodeChunk(state, chunk, encoding) {
                if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
                    chunk = Buffer.from(chunk, encoding);
                }
                return chunk;
            }

            // if we're already writing something, then just put this
            // in the queue, and wait our turn.  Otherwise, call _write
            // If we return false, then we need a drain event, so set that flag.
            function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
                if (!isBuf) {
                    var newChunk = decodeChunk(state, chunk, encoding);
                    if (chunk !== newChunk) {
                        isBuf = true;
                        encoding = 'buffer';
                        chunk = newChunk;
                    }
                }
                var len = state.objectMode ? 1 : chunk.length;

                state.length += len;

                var ret = state.length < state.highWaterMark;
                // we must ensure that previous needDrain will not be reset to false.
                if (!ret) state.needDrain = true;

                if (state.writing || state.corked) {
                    var last = state.lastBufferedRequest;
                    state.lastBufferedRequest = {
                        chunk: chunk,
                        encoding: encoding,
                        isBuf: isBuf,
                        callback: cb,
                        next: null
                    };
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

                if (sync) {
                    // defer the callback if we are being called synchronously
                    // to avoid piling up things on the stack
                    processNextTick(cb, er);
                    // this can emit finish, and it will always happen
                    // after error
                    processNextTick(finishMaybe, stream, state);
                    stream._writableState.errorEmitted = true;
                    stream.emit('error', er);
                } else {
                    // the caller expect this to happen before if
                    // it is async
                    cb(er);
                    stream._writableState.errorEmitted = true;
                    stream.emit('error', er);
                    // this can emit finish, but finish must
                    // always follow error
                    finishMaybe(stream, state);
                }
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
                    // Check if we're actually ready to finish, but don't emit yet
                    var finished = needFinish(state);

                    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
                        clearBuffer(stream, state);
                    }

                    if (sync) {
                        /*<replacement>*/
                        asyncWrite(afterWrite, stream, state, finished, cb);
                        /*</replacement>*/
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

            // Must force callback to be called on nextTick, so that we don't
            // emit 'drain' before the write() consumer gets the 'false' return
            // value, and has a chance to attach a 'drain' listener.
            function onwriteDrain(stream, state) {
                if (state.length === 0 && state.needDrain) {
                    state.needDrain = false;
                    stream.emit('drain');
                }
            }

            // if there's something in the buffer waiting, then process it
            function clearBuffer(stream, state) {
                state.bufferProcessing = true;
                var entry = state.bufferedRequest;

                if (stream._writev && entry && entry.next) {
                    // Fast case, write everything using _writev()
                    var l = state.bufferedRequestCount;
                    var buffer = new Array(l);
                    var holder = state.corkedRequestsFree;
                    holder.entry = entry;

                    var count = 0;
                    var allBuffers = true;
                    while (entry) {
                        buffer[count] = entry;
                        if (!entry.isBuf) allBuffers = false;
                        entry = entry.next;
                        count += 1;
                    }
                    buffer.allBuffers = allBuffers;

                    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

                    // doWrite is almost always async, defer these to save a bit of time
                    // as the hot path ends with doWrite
                    state.pendingcb++;
                    state.lastBufferedRequest = null;
                    if (holder.next) {
                        state.corkedRequestsFree = holder.next;
                        holder.next = null;
                    } else {
                        state.corkedRequestsFree = new CorkedRequest(state);
                    }
                } else {
                    // Slow case, write chunks one-by-one
                    while (entry) {
                        var chunk = entry.chunk;
                        var encoding = entry.encoding;
                        var cb = entry.callback;
                        var len = state.objectMode ? 1 : chunk.length;

                        doWrite(stream, state, false, len, chunk, encoding, cb);
                        entry = entry.next;
                        // if we didn't call the onwrite immediately, then
                        // it means that we need to wait until it does.
                        // also, that means that the chunk and cb are currently
                        // being processed, so move the buffer counter past them.
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
                cb(new Error('_write() is not implemented'));
            };

            Writable.prototype._writev = null;

            Writable.prototype.end = function(chunk, encoding, cb) {
                var state = this._writableState;

                if (typeof chunk === 'function') {
                    cb = chunk;
                    chunk = null;
                    encoding = null;
                } else if (typeof encoding === 'function') {
                    cb = encoding;
                    encoding = null;
                }

                if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

                // .end() fully uncorks
                if (state.corked) {
                    state.corked = 1;
                    this.uncork();
                }

                // ignore unnecessary end() calls.
                if (!state.ending && !state.finished) endWritable(this, state, cb);
            };

            function needFinish(state) {
                return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
            }

            function callFinal(stream, state) {
                stream._final(function(err) {
                    state.pendingcb--;
                    if (err) {
                        stream.emit('error', err);
                    }
                    state.prefinished = true;
                    stream.emit('prefinish');
                    finishMaybe(stream, state);
                });
            }

            function prefinish(stream, state) {
                if (!state.prefinished && !state.finalCalled) {
                    if (typeof stream._final === 'function') {
                        state.pendingcb++;
                        state.finalCalled = true;
                        processNextTick(callFinal, stream, state);
                    } else {
                        state.prefinished = true;
                        stream.emit('prefinish');
                    }
                }
            }

            function finishMaybe(stream, state) {
                var need = needFinish(state);
                if (need) {
                    prefinish(stream, state);
                    if (state.pendingcb === 0) {
                        state.finished = true;
                        stream.emit('finish');
                    }
                }
                return need;
            }

            function endWritable(stream, state, cb) {
                state.ending = true;
                finishMaybe(stream, state);
                if (cb) {
                    if (state.finished) processNextTick(cb);
                    else stream.once('finish', cb);
                }
                state.ended = true;
                stream.writable = false;
            }

            function onCorkedFinish(corkReq, state, err) {
                var entry = corkReq.entry;
                corkReq.entry = null;
                while (entry) {
                    var cb = entry.callback;
                    state.pendingcb--;
                    cb(err);
                    entry = entry.next;
                }
                if (state.corkedRequestsFree) {
                    state.corkedRequestsFree.next = corkReq;
                } else {
                    state.corkedRequestsFree = corkReq;
                }
            }

            Object.defineProperty(Writable.prototype, 'destroyed', {
                get: function() {
                    if (this._writableState === undefined) {
                        return false;
                    }
                    return this._writableState.destroyed;
                },
                set: function(value) {
                    // we ignore the value if the stream
                    // has not been initialized yet
                    if (!this._writableState) {
                        return;
                    }

                    // backward compatibility, the user is explicitly
                    // managing destroyed
                    this._writableState.destroyed = value;
                }
            });

            Writable.prototype.destroy = destroyImpl.destroy;
            Writable.prototype._undestroy = destroyImpl.undestroy;
            Writable.prototype._destroy = function(err, cb) {
                this.end();
                cb(err);
            };
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/lib/_stream_writable.js", "/../../node_modules/readable-stream/lib")
    }, {
        "./_stream_duplex": 15,
        "./internal/streams/destroy": 21,
        "./internal/streams/stream": 22,
        "buffer": 3,
        "core-util-is": 4,
        "inherits": 10,
        "process-nextick-args": 12,
        "rH1JPG": 13,
        "safe-buffer": 25,
        "util-deprecate": 28
    }],
    20: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            'use strict';

            /*<replacement>*/

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var Buffer = require('safe-buffer').Buffer;
            /*</replacement>*/

            function copyBuffer(src, target, offset) {
                src.copy(target, offset);
            }

            module.exports = function() {
                function BufferList() {
                    _classCallCheck(this, BufferList);

                    this.head = null;
                    this.tail = null;
                    this.length = 0;
                }

                BufferList.prototype.push = function push(v) {
                    var entry = {
                        data: v,
                        next: null
                    };
                    if (this.length > 0) this.tail.next = entry;
                    else this.head = entry;
                    this.tail = entry;
                    ++this.length;
                };

                BufferList.prototype.unshift = function unshift(v) {
                    var entry = {
                        data: v,
                        next: this.head
                    };
                    if (this.length === 0) this.tail = entry;
                    this.head = entry;
                    ++this.length;
                };

                BufferList.prototype.shift = function shift() {
                    if (this.length === 0) return;
                    var ret = this.head.data;
                    if (this.length === 1) this.head = this.tail = null;
                    else this.head = this.head.next;
                    --this.length;
                    return ret;
                };

                BufferList.prototype.clear = function clear() {
                    this.head = this.tail = null;
                    this.length = 0;
                };

                BufferList.prototype.join = function join(s) {
                    if (this.length === 0) return '';
                    var p = this.head;
                    var ret = '' + p.data;
                    while (p = p.next) {
                        ret += s + p.data;
                    }
                    return ret;
                };

                BufferList.prototype.concat = function concat(n) {
                    if (this.length === 0) return Buffer.alloc(0);
                    if (this.length === 1) return this.head.data;
                    var ret = Buffer.allocUnsafe(n >>> 0);
                    var p = this.head;
                    var i = 0;
                    while (p) {
                        copyBuffer(p.data, ret, i);
                        i += p.data.length;
                        p = p.next;
                    }
                    return ret;
                };

                return BufferList;
            }();
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/lib/internal/streams/BufferList.js", "/../../node_modules/readable-stream/lib/internal/streams")
    }, {
        "buffer": 3,
        "rH1JPG": 13,
        "safe-buffer": 25
    }],
    21: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            'use strict';

            /*<replacement>*/

            var processNextTick = require('process-nextick-args');
            /*</replacement>*/

            // undocumented cb() API, needed for core, not for public API
            function destroy(err, cb) {
                var _this = this;

                var readableDestroyed = this._readableState && this._readableState.destroyed;
                var writableDestroyed = this._writableState && this._writableState.destroyed;

                if (readableDestroyed || writableDestroyed) {
                    if (cb) {
                        cb(err);
                    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
                        processNextTick(emitErrorNT, this, err);
                    }
                    return;
                }

                // we set destroyed to true before firing error callbacks in order
                // to make it re-entrance safe in case destroy() is called within callbacks

                if (this._readableState) {
                    this._readableState.destroyed = true;
                }

                // if this is a duplex stream mark the writable part as destroyed as well
                if (this._writableState) {
                    this._writableState.destroyed = true;
                }

                this._destroy(err || null, function(err) {
                    if (!cb && err) {
                        processNextTick(emitErrorNT, _this, err);
                        if (_this._writableState) {
                            _this._writableState.errorEmitted = true;
                        }
                    } else if (cb) {
                        cb(err);
                    }
                });
            }

            function undestroy() {
                if (this._readableState) {
                    this._readableState.destroyed = false;
                    this._readableState.reading = false;
                    this._readableState.ended = false;
                    this._readableState.endEmitted = false;
                }

                if (this._writableState) {
                    this._writableState.destroyed = false;
                    this._writableState.ended = false;
                    this._writableState.ending = false;
                    this._writableState.finished = false;
                    this._writableState.errorEmitted = false;
                }
            }

            function emitErrorNT(self, err) {
                self.emit('error', err);
            }

            module.exports = {
                destroy: destroy,
                undestroy: undestroy
            };
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/lib/internal/streams/destroy.js", "/../../node_modules/readable-stream/lib/internal/streams")
    }, {
        "buffer": 3,
        "process-nextick-args": 12,
        "rH1JPG": 13
    }],
    22: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            module.exports = require('events').EventEmitter;

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/lib/internal/streams/stream-browser.js", "/../../node_modules/readable-stream/lib/internal/streams")
    }, {
        "buffer": 3,
        "events": 7,
        "rH1JPG": 13
    }],
    23: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            var toString = {}.toString;

            module.exports = Array.isArray || function(arr) {
                return toString.call(arr) == '[object Array]';
            };

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/node_modules/isarray/index.js", "/../../node_modules/readable-stream/node_modules/isarray")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    24: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            exports = module.exports = require('./lib/_stream_readable.js');
            exports.Stream = exports;
            exports.Readable = exports;
            exports.Writable = require('./lib/_stream_writable.js');
            exports.Duplex = require('./lib/_stream_duplex.js');
            exports.Transform = require('./lib/_stream_transform.js');
            exports.PassThrough = require('./lib/_stream_passthrough.js');

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/readable-stream/readable-browser.js", "/../../node_modules/readable-stream")
    }, {
        "./lib/_stream_duplex.js": 15,
        "./lib/_stream_passthrough.js": 16,
        "./lib/_stream_readable.js": 17,
        "./lib/_stream_transform.js": 18,
        "./lib/_stream_writable.js": 19,
        "buffer": 3,
        "rH1JPG": 13
    }],
    25: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            /* eslint-disable node/no-deprecated-api */
            var buffer = require('buffer')
            var Buffer = buffer.Buffer

            // alternative to using Object.keys for old browsers
            function copyProps(src, dst) {
                for (var key in src) {
                    dst[key] = src[key]
                }
            }
            if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
                module.exports = buffer
            } else {
                // Copy properties from require('buffer')
                copyProps(buffer, exports)
                exports.Buffer = SafeBuffer
            }

            function SafeBuffer(arg, encodingOrOffset, length) {
                return Buffer(arg, encodingOrOffset, length)
            }

            // Copy static methods from Buffer
            copyProps(Buffer, SafeBuffer)

            SafeBuffer.from = function(arg, encodingOrOffset, length) {
                if (typeof arg === 'number') {
                    throw new TypeError('Argument must not be a number')
                }
                return Buffer(arg, encodingOrOffset, length)
            }

            SafeBuffer.alloc = function(size, fill, encoding) {
                if (typeof size !== 'number') {
                    throw new TypeError('Argument must be a number')
                }
                var buf = Buffer(size)
                if (fill !== undefined) {
                    if (typeof encoding === 'string') {
                        buf.fill(fill, encoding)
                    } else {
                        buf.fill(fill)
                    }
                } else {
                    buf.fill(0)
                }
                return buf
            }

            SafeBuffer.allocUnsafe = function(size) {
                if (typeof size !== 'number') {
                    throw new TypeError('Argument must be a number')
                }
                return Buffer(size)
            }

            SafeBuffer.allocUnsafeSlow = function(size) {
                if (typeof size !== 'number') {
                    throw new TypeError('Argument must be a number')
                }
                return buffer.SlowBuffer(size)
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/safe-buffer/index.js", "/../../node_modules/safe-buffer")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    26: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            module.exports = Peer

            var debug = require('debug')('simple-peer')
            var getBrowserRTC = require('get-browser-rtc')
            var inherits = require('inherits')
            var randombytes = require('randombytes')
            var stream = require('readable-stream')

            var MAX_BUFFERED_AMOUNT = 64 * 1024

            inherits(Peer, stream.Duplex)

            /**
             * WebRTC peer connection. Same API as node core `net.Socket`, plus a few extra methods.
             * Duplex stream.
             * @param {Object} opts
             */
            function Peer(opts) {
                var self = this
                if (!(self instanceof Peer)) return new Peer(opts)

                self._id = randombytes(4).toString('hex').slice(0, 7)
                self._debug('new peer %o', opts)

                opts = Object.assign({
                    allowHalfOpen: false
                }, opts)

                stream.Duplex.call(self, opts)

                self.channelName = opts.initiator ?
                    opts.channelName || randombytes(20).toString('hex') :
                    null

                // Needed by _transformConstraints, so set this early
                self._isChromium = typeof window !== 'undefined' && !!window.webkitRTCPeerConnection

                self.initiator = opts.initiator || false
                self.channelConfig = opts.channelConfig || Peer.channelConfig
                self.config = opts.config || Peer.config
                self.constraints = self._transformConstraints(opts.constraints || Peer.constraints)
                self.offerConstraints = self._transformConstraints(opts.offerConstraints || {})
                self.answerConstraints = self._transformConstraints(opts.answerConstraints || {})
                self.reconnectTimer = opts.reconnectTimer || false
                self.sdpTransform = opts.sdpTransform || function(sdp) {
                    return sdp
                }
                self.stream = opts.stream || false
                self.trickle = opts.trickle !== undefined ? opts.trickle : true
                self._earlyMessage = null

                self.destroyed = false
                self.connected = false

                self.remoteAddress = undefined
                self.remoteFamily = undefined
                self.remotePort = undefined
                self.localAddress = undefined
                self.localPort = undefined

                self._wrtc = (opts.wrtc && typeof opts.wrtc === 'object') ?
                    opts.wrtc :
                    getBrowserRTC()

                if (!self._wrtc) {
                    if (typeof window === 'undefined') {
                        throw new Error('No WebRTC support: Specify `opts.wrtc` option in this environment')
                    } else {
                        throw new Error('No WebRTC support: Not a supported browser')
                    }
                }

                self._pcReady = false
                self._channelReady = false
                self._iceComplete = false // ice candidate trickle done (got null candidate)
                self._channel = null
                self._pendingCandidates = []
                self._previousStreams = []

                self._chunk = null
                self._cb = null
                self._interval = null
                self._reconnectTimeout = null

                self._pc = new(self._wrtc.RTCPeerConnection)(self.config, self.constraints)

                // We prefer feature detection whenever possible, but sometimes that's not
                // possible for certain implementations.
                self._isWrtc = Array.isArray(self._pc.RTCIceConnectionStates)
                self._isReactNativeWebrtc = typeof self._pc._peerConnectionId === 'number'

                self._pc.oniceconnectionstatechange = function() {
                    self._onIceStateChange()
                }
                self._pc.onicegatheringstatechange = function() {
                    self._onIceStateChange()
                }
                self._pc.onsignalingstatechange = function() {
                    self._onSignalingStateChange()
                }
                self._pc.onicecandidate = function(event) {
                    self._onIceCandidate(event)
                }

                // Other spec events, unused by this implementation:
                // - onconnectionstatechange
                // - onicecandidateerror
                // - onfingerprintfailure

                if (self.initiator) {
                    var createdOffer = false
                    self._pc.onnegotiationneeded = function() {
                        if (!createdOffer) self._createOffer()
                        createdOffer = true
                    }

                    self._setupData({
                        channel: self._pc.createDataChannel(self.channelName, self.channelConfig)
                    })
                } else {
                    self._pc.ondatachannel = function(event) {
                        self._setupData(event)
                    }
                }

                if ('addTrack' in self._pc) {
                    // WebRTC Spec, Firefox
                    if (self.stream) {
                        self.stream.getTracks().forEach(function(track) {
                            self._pc.addTrack(track, self.stream)
                        })
                    }
                    self._pc.ontrack = function(event) {
                        self._onTrack(event)
                    }
                } else {
                    // Chrome, etc. This can be removed once all browsers support `ontrack`
                    if (self.stream) self._pc.addStream(self.stream)
                    self._pc.onaddstream = function(event) {
                        self._onAddStream(event)
                    }
                }

                // HACK: wrtc doesn't fire the 'negotionneeded' event
                if (self.initiator && self._isWrtc) {
                    self._pc.onnegotiationneeded()
                }

                self._onFinishBound = function() {
                    self._onFinish()
                }
                self.once('finish', self._onFinishBound)
            }

            Peer.WEBRTC_SUPPORT = !!getBrowserRTC()

            /**
             * Expose config, constraints, and data channel config for overriding all Peer
             * instances. Otherwise, just set opts.config, opts.constraints, or opts.channelConfig
             * when constructing a Peer.
             */
            Peer.config = {
                iceServers: [{
                        urls: 'stun:stun.l.google.com:19302'
                    },
                    {
                        urls: 'stun:global.stun.twilio.com:3478?transport=udp'
                    }
                ]
            }
            Peer.constraints = {}
            Peer.channelConfig = {}

            Object.defineProperty(Peer.prototype, 'bufferSize', {
                get: function() {
                    var self = this
                    return (self._channel && self._channel.bufferedAmount) || 0
                }
            })

            Peer.prototype.address = function() {
                var self = this
                return {
                    port: self.localPort,
                    family: 'IPv4',
                    address: self.localAddress
                }
            }

            Peer.prototype.signal = function(data) {
                var self = this
                if (self.destroyed) throw new Error('cannot signal after peer is destroyed')
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data)
                    } catch (err) {
                        data = {}
                    }
                }
                self._debug('signal()')

                if (data.candidate) {
                    if (self._pc.remoteDescription) self._addIceCandidate(data.candidate)
                    else self._pendingCandidates.push(data.candidate)
                }
                if (data.sdp) {
                    self._pc.setRemoteDescription(new(self._wrtc.RTCSessionDescription)(data), function() {
                        if (self.destroyed) return

                        self._pendingCandidates.forEach(function(candidate) {
                            self._addIceCandidate(candidate)
                        })
                        self._pendingCandidates = []

                        if (self._pc.remoteDescription.type === 'offer') self._createAnswer()
                    }, function(err) {
                        self._destroy(err)
                    })
                }
                if (!data.sdp && !data.candidate) {
                    self._destroy(new Error('signal() called with invalid signal data'))
                }
            }

            Peer.prototype._addIceCandidate = function(candidate) {
                var self = this
                try {
                    self._pc.addIceCandidate(
                        new self._wrtc.RTCIceCandidate(candidate),
                        noop,
                        function(err) {
                            self._destroy(err)
                        }
                    )
                } catch (err) {
                    self._destroy(new Error('error adding candidate: ' + err.message))
                }
            }

            /**
             * Send text/binary data to the remote peer.
             * @param {TypedArrayView|ArrayBuffer|Buffer|string|Blob|Object} chunk
             */
            Peer.prototype.send = function(chunk) {
                var self = this

                // HACK: `wrtc` module crashes on Node.js Buffer, so convert to Uint8Array
                // See: https://github.com/feross/simple-peer/issues/60
                if (self._isWrtc && Buffer.isBuffer(chunk)) {
                    chunk = new Uint8Array(chunk)
                }

                self._channel.send(chunk)
            }

            Peer.prototype.destroy = function(onclose) {
                var self = this
                self._destroy(null, onclose)
            }

            Peer.prototype._destroy = function(err, onclose) {
                var self = this
                if (self.destroyed) return
                if (onclose) self.once('close', onclose)

                self._debug('destroy (error: %s)', err && (err.message || err))

                self.readable = self.writable = false

                if (!self._readableState.ended) self.push(null)
                if (!self._writableState.finished) self.end()

                self.destroyed = true
                self.connected = false
                self._pcReady = false
                self._channelReady = false
                self._previousStreams = null
                self._earlyMessage = null

                clearInterval(self._interval)
                clearTimeout(self._reconnectTimeout)
                self._interval = null
                self._reconnectTimeout = null
                self._chunk = null
                self._cb = null

                if (self._onFinishBound) self.removeListener('finish', self._onFinishBound)
                self._onFinishBound = null

                if (self._pc) {
                    try {
                        self._pc.close()
                    } catch (err) {}

                    self._pc.oniceconnectionstatechange = null
                    self._pc.onicegatheringstatechange = null
                    self._pc.onsignalingstatechange = null
                    self._pc.onicecandidate = null
                    if ('addTrack' in self._pc) {
                        self._pc.ontrack = null
                    } else {
                        self._pc.onaddstream = null
                    }
                    self._pc.onnegotiationneeded = null
                    self._pc.ondatachannel = null
                }

                if (self._channel) {
                    try {
                        self._channel.close()
                    } catch (err) {}

                    self._channel.onmessage = null
                    self._channel.onopen = null
                    self._channel.onclose = null
                    self._channel.onerror = null
                }
                self._pc = null
                self._channel = null

                if (err) self.emit('error', err)
                self.emit('close')
            }

            Peer.prototype._setupData = function(event) {
                var self = this
                if (!event.channel) {
                    // In some situations `pc.createDataChannel()` returns `undefined` (in wrtc),
                    // which is invalid behavior. Handle it gracefully.
                    // See: https://github.com/feross/simple-peer/issues/163
                    return self._destroy(new Error('Data channel event is missing `channel` property'))
                }

                self._channel = event.channel
                self._channel.binaryType = 'arraybuffer'

                if (typeof self._channel.bufferedAmountLowThreshold === 'number') {
                    self._channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT
                }

                self.channelName = self._channel.label

                self._channel.onmessage = function(event) {
                    if (!self._channelReady) { // HACK: Workaround for Chrome not firing "open" between tabs
                        self._earlyMessage = event
                        self._onChannelOpen()
                    } else {
                        self._onChannelMessage(event)
                    }
                }
                self._channel.onbufferedamountlow = function() {
                    self._onChannelBufferedAmountLow()
                }
                self._channel.onopen = function() {
                    if (!self._channelReady) self._onChannelOpen()
                }
                self._channel.onclose = function() {
                    self._onChannelClose()
                }
                self._channel.onerror = function(err) {
                    self._destroy(err)
                }
            }

            Peer.prototype._read = function() {}

            Peer.prototype._write = function(chunk, encoding, cb) {
                var self = this
                if (self.destroyed) return cb(new Error('cannot write after peer is destroyed'))

                if (self.connected) {
                    try {
                        self.send(chunk)
                    } catch (err) {
                        return self._destroy(err)
                    }
                    if (self._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
                        self._debug('start backpressure: bufferedAmount %d', self._channel.bufferedAmount)
                        self._cb = cb
                    } else {
                        cb(null)
                    }
                } else {
                    self._debug('write before connect')
                    self._chunk = chunk
                    self._cb = cb
                }
            }

            // When stream finishes writing, close socket. Half open connections are not
            // supported.
            Peer.prototype._onFinish = function() {
                var self = this
                if (self.destroyed) return

                if (self.connected) {
                    destroySoon()
                } else {
                    self.once('connect', destroySoon)
                }

                // Wait a bit before destroying so the socket flushes.
                // TODO: is there a more reliable way to accomplish this?
                function destroySoon() {
                    setTimeout(function() {
                        self._destroy()
                    }, 1000)
                }
            }

            Peer.prototype._createOffer = function() {
                var self = this
                if (self.destroyed) return

                self._pc.createOffer(function(offer) {
                    if (self.destroyed) return
                    offer.sdp = self.sdpTransform(offer.sdp)
                    self._pc.setLocalDescription(offer, onSuccess, onError)

                    function onSuccess() {
                        if (self.destroyed) return
                        if (self.trickle || self._iceComplete) sendOffer()
                        else self.once('_iceComplete', sendOffer) // wait for candidates
                    }

                    function onError(err) {
                        self._destroy(err)
                    }

                    function sendOffer() {
                        var signal = self._pc.localDescription || offer
                        self._debug('signal')
                        self.emit('signal', {
                            type: signal.type,
                            sdp: signal.sdp
                        })
                    }
                }, function(err) {
                    self._destroy(err)
                }, self.offerConstraints)
            }

            Peer.prototype._createAnswer = function() {
                var self = this
                if (self.destroyed) return

                self._pc.createAnswer(function(answer) {
                    if (self.destroyed) return
                    answer.sdp = self.sdpTransform(answer.sdp)
                    self._pc.setLocalDescription(answer, onSuccess, onError)

                    function onSuccess() {
                        if (self.destroyed) return
                        if (self.trickle || self._iceComplete) sendAnswer()
                        else self.once('_iceComplete', sendAnswer)
                    }

                    function onError(err) {
                        self._destroy(err)
                    }

                    function sendAnswer() {
                        var signal = self._pc.localDescription || answer
                        self._debug('signal')
                        self.emit('signal', {
                            type: signal.type,
                            sdp: signal.sdp
                        })
                    }
                }, function(err) {
                    self._destroy(err)
                }, self.answerConstraints)
            }

            Peer.prototype._onIceStateChange = function() {
                var self = this
                if (self.destroyed) return
                var iceConnectionState = self._pc.iceConnectionState
                var iceGatheringState = self._pc.iceGatheringState

                self._debug(
                    'iceStateChange (connection: %s) (gathering: %s)',
                    iceConnectionState,
                    iceGatheringState
                )
                self.emit('iceStateChange', iceConnectionState, iceGatheringState)

                if (iceConnectionState === 'connected' || iceConnectionState === 'completed') {
                    clearTimeout(self._reconnectTimeout)
                    self._pcReady = true
                    self._maybeReady()
                }
                if (iceConnectionState === 'disconnected') {
                    if (self.reconnectTimer) {
                        // If user has set `opt.reconnectTimer`, allow time for ICE to attempt a reconnect
                        clearTimeout(self._reconnectTimeout)
                        self._reconnectTimeout = setTimeout(function() {
                            self._destroy()
                        }, self.reconnectTimer)
                    } else {
                        self._destroy()
                    }
                }
                if (iceConnectionState === 'failed') {
                    self._destroy(new Error('Ice connection failed.'))
                }
                if (iceConnectionState === 'closed') {
                    self._destroy()
                }
            }

            Peer.prototype.getStats = function(cb) {
                var self = this

                // Promise-based getStats() (standard)
                if (self._pc.getStats.length === 0) {
                    self._pc.getStats().then(function(res) {
                        var reports = []
                        res.forEach(function(report) {
                            reports.push(report)
                        })
                        cb(null, reports)
                    }, function(err) {
                        cb(err)
                    })

                    // Two-parameter callback-based getStats() (deprecated, former standard)
                } else if (self._isReactNativeWebrtc) {
                    self._pc.getStats(null, function(res) {
                        var reports = []
                        res.forEach(function(report) {
                            reports.push(report)
                        })
                        cb(null, reports)
                    }, function(err) {
                        cb(err)
                    })

                    // Single-parameter callback-based getStats() (non-standard)
                } else if (self._pc.getStats.length > 0) {
                    self._pc.getStats(function(res) {
                        // If we destroy connection in `connect` callback this code might happen to run when actual connection is already closed
                        if (self.destroyed) return

                        var reports = []
                        res.result().forEach(function(result) {
                            var report = {}
                            result.names().forEach(function(name) {
                                report[name] = result.stat(name)
                            })
                            report.id = result.id
                            report.type = result.type
                            report.timestamp = result.timestamp
                            reports.push(report)
                        })
                        cb(null, reports)
                    }, function(err) {
                        cb(err)
                    })

                    // Unknown browser, skip getStats() since it's anyone's guess which style of
                    // getStats() they implement.
                } else {
                    cb(null, [])
                }
            }

            Peer.prototype._maybeReady = function() {
                var self = this
                self._debug('maybeReady pc %s channel %s', self._pcReady, self._channelReady)
                if (self.connected || self._connecting || !self._pcReady || !self._channelReady) return

                self._connecting = true

                // HACK: We can't rely on order here, for details see https://github.com/js-platform/node-webrtc/issues/339
                function findCandidatePair() {
                    if (self.destroyed) return

                    self.getStats(function(err, items) {
                        if (self.destroyed) return

                        // Treat getStats error as non-fatal. It's not essential.
                        if (err) items = []

                        var remoteCandidates = {}
                        var localCandidates = {}
                        var candidatePairs = {}
                        var foundSelectedCandidatePair = false

                        items.forEach(function(item) {
                            // TODO: Once all browsers support the hyphenated stats report types, remove
                            // the non-hypenated ones
                            if (item.type === 'remotecandidate' || item.type === 'remote-candidate') {
                                remoteCandidates[item.id] = item
                            }
                            if (item.type === 'localcandidate' || item.type === 'local-candidate') {
                                localCandidates[item.id] = item
                            }
                            if (item.type === 'candidatepair' || item.type === 'candidate-pair') {
                                candidatePairs[item.id] = item
                            }
                        })

                        items.forEach(function(item) {
                            // Spec-compliant
                            if (item.type === 'transport') {
                                setSelectedCandidatePair(candidatePairs[item.selectedCandidatePairId])
                            }

                            // Old implementations
                            if (
                                (item.type === 'googCandidatePair' && item.googActiveConnection === 'true') ||
                                ((item.type === 'candidatepair' || item.type === 'candidate-pair') && item.selected)
                            ) {
                                setSelectedCandidatePair(item)
                            }
                        })

                        function setSelectedCandidatePair(selectedCandidatePair) {
                            foundSelectedCandidatePair = true

                            var local = localCandidates[selectedCandidatePair.localCandidateId]

                            if (local && local.ip) {
                                // Spec
                                self.localAddress = local.ip
                                self.localPort = Number(local.port)
                            } else if (local && local.ipAddress) {
                                // Firefox
                                self.localAddress = local.ipAddress
                                self.localPort = Number(local.portNumber)
                            } else if (typeof selectedCandidatePair.googLocalAddress === 'string') {
                                // TODO: remove this once Chrome 58 is released
                                local = selectedCandidatePair.googLocalAddress.split(':')
                                self.localAddress = local[0]
                                self.localPort = Number(local[1])
                            }

                            var remote = remoteCandidates[selectedCandidatePair.remoteCandidateId]

                            if (remote && remote.ip) {
                                // Spec
                                self.remoteAddress = remote.ip
                                self.remotePort = Number(remote.port)
                            } else if (remote && remote.ipAddress) {
                                // Firefox
                                self.remoteAddress = remote.ipAddress
                                self.remotePort = Number(remote.portNumber)
                            } else if (typeof selectedCandidatePair.googRemoteAddress === 'string') {
                                // TODO: remove this once Chrome 58 is released
                                remote = selectedCandidatePair.googRemoteAddress.split(':')
                                self.remoteAddress = remote[0]
                                self.remotePort = Number(remote[1])
                            }
                            self.remoteFamily = 'IPv4'

                            self._debug(
                                'connect local: %s:%s remote: %s:%s',
                                self.localAddress, self.localPort, self.remoteAddress, self.remotePort
                            )
                        }

                        if (!foundSelectedCandidatePair && items.length) {
                            setTimeout(findCandidatePair, 100)
                            return
                        } else {
                            self._connecting = false
                            self.connected = true
                        }

                        if (self._chunk) {
                            try {
                                self.send(self._chunk)
                            } catch (err) {
                                return self._destroy(err)
                            }
                            self._chunk = null
                            self._debug('sent chunk from "write before connect"')

                            var cb = self._cb
                            self._cb = null
                            cb(null)
                        }

                        // If `bufferedAmountLowThreshold` and 'onbufferedamountlow' are unsupported,
                        // fallback to using setInterval to implement backpressure.
                        if (typeof self._channel.bufferedAmountLowThreshold !== 'number') {
                            self._interval = setInterval(function() {
                                self._onInterval()
                            }, 150)
                            if (self._interval.unref) self._interval.unref()
                        }

                        self._debug('connect')
                        self.emit('connect')
                        if (self._earlyMessage) { // HACK: Workaround for Chrome not firing "open" between tabs
                            self._onChannelMessage(self._earlyMessage)
                            self._earlyMessage = null
                        }
                    })
                }
                findCandidatePair()
            }

            Peer.prototype._onInterval = function() {
                if (!this._cb || !this._channel || this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
                    return
                }
                this._onChannelBufferedAmountLow()
            }

            Peer.prototype._onSignalingStateChange = function() {
                var self = this
                if (self.destroyed) return
                self._debug('signalingStateChange %s', self._pc.signalingState)
                self.emit('signalingStateChange', self._pc.signalingState)
            }

            Peer.prototype._onIceCandidate = function(event) {
                var self = this
                if (self.destroyed) return
                if (event.candidate && self.trickle) {
                    self.emit('signal', {
                        candidate: {
                            candidate: event.candidate.candidate,
                            sdpMLineIndex: event.candidate.sdpMLineIndex,
                            sdpMid: event.candidate.sdpMid
                        }
                    })
                } else if (!event.candidate) {
                    self._iceComplete = true
                    self.emit('_iceComplete')
                }
            }

            Peer.prototype._onChannelMessage = function(event) {
                var self = this
                if (self.destroyed) return
                var data = event.data
                if (data instanceof ArrayBuffer) data = Buffer.from(data)
                self.push(data)
            }

            Peer.prototype._onChannelBufferedAmountLow = function() {
                var self = this
                if (self.destroyed || !self._cb) return
                self._debug('ending backpressure: bufferedAmount %d', self._channel.bufferedAmount)
                var cb = self._cb
                self._cb = null
                cb(null)
            }

            Peer.prototype._onChannelOpen = function() {
                var self = this
                if (self.connected || self.destroyed) return
                self._debug('on channel open')
                self._channelReady = true
                self._maybeReady()
            }

            Peer.prototype._onChannelClose = function() {
                var self = this
                if (self.destroyed) return
                self._debug('on channel close')
                self._destroy()
            }

            Peer.prototype._onAddStream = function(event) {
                var self = this
                if (self.destroyed) return
                self._debug('on add stream')
                self.emit('stream', event.stream)
            }

            Peer.prototype._onTrack = function(event) {
                var self = this
                if (self.destroyed) return
                self._debug('on track')
                var id = event.streams[0].id
                if (self._previousStreams.indexOf(id) !== -1) return // Only fire one 'stream' event, even though there may be multiple tracks per stream
                self._previousStreams.push(id)
                self.emit('stream', event.streams[0])
            }

            Peer.prototype._debug = function() {
                var self = this
                var args = [].slice.call(arguments)
                args[0] = '[' + self._id + '] ' + args[0]
                debug.apply(null, args)
            }

            // Transform constraints objects into the new format (unless Chromium)
            // TODO: This can be removed when Chromium supports the new format
            Peer.prototype._transformConstraints = function(constraints) {
                var self = this

                if (Object.keys(constraints).length === 0) {
                    return constraints
                }

                if ((constraints.mandatory || constraints.optional) && !self._isChromium) {
                    // convert to new format

                    // Merge mandatory and optional objects, prioritizing mandatory
                    var newConstraints = Object.assign({}, constraints.optional, constraints.mandatory)

                    // fix casing
                    if (newConstraints.OfferToReceiveVideo !== undefined) {
                        newConstraints.offerToReceiveVideo = newConstraints.OfferToReceiveVideo
                        delete newConstraints['OfferToReceiveVideo']
                    }

                    if (newConstraints.OfferToReceiveAudio !== undefined) {
                        newConstraints.offerToReceiveAudio = newConstraints.OfferToReceiveAudio
                        delete newConstraints['OfferToReceiveAudio']
                    }

                    return newConstraints
                } else if (!constraints.mandatory && !constraints.optional && self._isChromium) {
                    // convert to old format

                    // fix casing
                    if (constraints.offerToReceiveVideo !== undefined) {
                        constraints.OfferToReceiveVideo = constraints.offerToReceiveVideo
                        delete constraints['offerToReceiveVideo']
                    }

                    if (constraints.offerToReceiveAudio !== undefined) {
                        constraints.OfferToReceiveAudio = constraints.offerToReceiveAudio
                        delete constraints['offerToReceiveAudio']
                    }

                    return {
                        mandatory: constraints // NOTE: All constraints are upgraded to mandatory
                    }
                }

                return constraints
            }

            function noop() {}

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/simple-peer/index.js", "/../../node_modules/simple-peer")
    }, {
        "buffer": 3,
        "debug": 5,
        "get-browser-rtc": 8,
        "inherits": 10,
        "rH1JPG": 13,
        "randombytes": 14,
        "readable-stream": 24
    }],
    27: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            'use strict';

            var Buffer = require('safe-buffer').Buffer;

            var isEncoding = Buffer.isEncoding || function(encoding) {
                encoding = '' + encoding;
                switch (encoding && encoding.toLowerCase()) {
                    case 'hex':
                    case 'utf8':
                    case 'utf-8':
                    case 'ascii':
                    case 'binary':
                    case 'base64':
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                    case 'raw':
                        return true;
                    default:
                        return false;
                }
            };

            function _normalizeEncoding(enc) {
                if (!enc) return 'utf8';
                var retried;
                while (true) {
                    switch (enc) {
                        case 'utf8':
                        case 'utf-8':
                            return 'utf8';
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return 'utf16le';
                        case 'latin1':
                        case 'binary':
                            return 'latin1';
                        case 'base64':
                        case 'ascii':
                        case 'hex':
                            return enc;
                        default:
                            if (retried) return; // undefined
                            enc = ('' + enc).toLowerCase();
                            retried = true;
                    }
                }
            };

            // Do not cache `Buffer.isEncoding` when checking encoding names as some
            // modules monkey-patch it to support additional encodings
            function normalizeEncoding(enc) {
                var nenc = _normalizeEncoding(enc);
                if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
                return nenc || enc;
            }

            // StringDecoder provides an interface for efficiently splitting a series of
            // buffers into a series of JS strings without breaking apart multi-byte
            // characters.
            exports.StringDecoder = StringDecoder;

            function StringDecoder(encoding) {
                this.encoding = normalizeEncoding(encoding);
                var nb;
                switch (this.encoding) {
                    case 'utf16le':
                        this.text = utf16Text;
                        this.end = utf16End;
                        nb = 4;
                        break;
                    case 'utf8':
                        this.fillLast = utf8FillLast;
                        nb = 4;
                        break;
                    case 'base64':
                        this.text = base64Text;
                        this.end = base64End;
                        nb = 3;
                        break;
                    default:
                        this.write = simpleWrite;
                        this.end = simpleEnd;
                        return;
                }
                this.lastNeed = 0;
                this.lastTotal = 0;
                this.lastChar = Buffer.allocUnsafe(nb);
            }

            StringDecoder.prototype.write = function(buf) {
                if (buf.length === 0) return '';
                var r;
                var i;
                if (this.lastNeed) {
                    r = this.fillLast(buf);
                    if (r === undefined) return '';
                    i = this.lastNeed;
                    this.lastNeed = 0;
                } else {
                    i = 0;
                }
                if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
                return r || '';
            };

            StringDecoder.prototype.end = utf8End;

            // Returns only complete characters in a Buffer
            StringDecoder.prototype.text = utf8Text;

            // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
            StringDecoder.prototype.fillLast = function(buf) {
                if (this.lastNeed <= buf.length) {
                    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
                    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
                }
                buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
                this.lastNeed -= buf.length;
            };

            // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
            // continuation byte.
            function utf8CheckByte(byte) {
                if (byte <= 0x7F) return 0;
                else if (byte >> 5 === 0x06) return 2;
                else if (byte >> 4 === 0x0E) return 3;
                else if (byte >> 3 === 0x1E) return 4;
                return -1;
            }

            // Checks at most 3 bytes at the end of a Buffer in order to detect an
            // incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
            // needed to complete the UTF-8 character (if applicable) are returned.
            function utf8CheckIncomplete(self, buf, i) {
                var j = buf.length - 1;
                if (j < i) return 0;
                var nb = utf8CheckByte(buf[j]);
                if (nb >= 0) {
                    if (nb > 0) self.lastNeed = nb - 1;
                    return nb;
                }
                if (--j < i) return 0;
                nb = utf8CheckByte(buf[j]);
                if (nb >= 0) {
                    if (nb > 0) self.lastNeed = nb - 2;
                    return nb;
                }
                if (--j < i) return 0;
                nb = utf8CheckByte(buf[j]);
                if (nb >= 0) {
                    if (nb > 0) {
                        if (nb === 2) nb = 0;
                        else self.lastNeed = nb - 3;
                    }
                    return nb;
                }
                return 0;
            }

            // Validates as many continuation bytes for a multi-byte UTF-8 character as
            // needed or are available. If we see a non-continuation byte where we expect
            // one, we "replace" the validated continuation bytes we've seen so far with
            // UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
            // behavior. The continuation byte check is included three times in the case
            // where all of the continuation bytes for a character exist in the same buffer.
            // It is also done this way as a slight performance increase instead of using a
            // loop.
            function utf8CheckExtraBytes(self, buf, p) {
                if ((buf[0] & 0xC0) !== 0x80) {
                    self.lastNeed = 0;
                    return '\ufffd'.repeat(p);
                }
                if (self.lastNeed > 1 && buf.length > 1) {
                    if ((buf[1] & 0xC0) !== 0x80) {
                        self.lastNeed = 1;
                        return '\ufffd'.repeat(p + 1);
                    }
                    if (self.lastNeed > 2 && buf.length > 2) {
                        if ((buf[2] & 0xC0) !== 0x80) {
                            self.lastNeed = 2;
                            return '\ufffd'.repeat(p + 2);
                        }
                    }
                }
            }

            // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
            function utf8FillLast(buf) {
                var p = this.lastTotal - this.lastNeed;
                var r = utf8CheckExtraBytes(this, buf, p);
                if (r !== undefined) return r;
                if (this.lastNeed <= buf.length) {
                    buf.copy(this.lastChar, p, 0, this.lastNeed);
                    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
                }
                buf.copy(this.lastChar, p, 0, buf.length);
                this.lastNeed -= buf.length;
            }

            // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
            // partial character, the character's bytes are buffered until the required
            // number of bytes are available.
            function utf8Text(buf, i) {
                var total = utf8CheckIncomplete(this, buf, i);
                if (!this.lastNeed) return buf.toString('utf8', i);
                this.lastTotal = total;
                var end = buf.length - (total - this.lastNeed);
                buf.copy(this.lastChar, 0, end);
                return buf.toString('utf8', i, end);
            }

            // For UTF-8, a replacement character for each buffered byte of a (partial)
            // character needs to be added to the output.
            function utf8End(buf) {
                var r = buf && buf.length ? this.write(buf) : '';
                if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
                return r;
            }

            // UTF-16LE typically needs two bytes per character, but even if we have an even
            // number of bytes available, we need to check if we end on a leading/high
            // surrogate. In that case, we need to wait for the next two bytes in order to
            // decode the last character properly.
            function utf16Text(buf, i) {
                if ((buf.length - i) % 2 === 0) {
                    var r = buf.toString('utf16le', i);
                    if (r) {
                        var c = r.charCodeAt(r.length - 1);
                        if (c >= 0xD800 && c <= 0xDBFF) {
                            this.lastNeed = 2;
                            this.lastTotal = 4;
                            this.lastChar[0] = buf[buf.length - 2];
                            this.lastChar[1] = buf[buf.length - 1];
                            return r.slice(0, -1);
                        }
                    }
                    return r;
                }
                this.lastNeed = 1;
                this.lastTotal = 2;
                this.lastChar[0] = buf[buf.length - 1];
                return buf.toString('utf16le', i, buf.length - 1);
            }

            // For UTF-16LE we do not explicitly append special replacement characters if we
            // end on a partial character, we simply let v8 handle that.
            function utf16End(buf) {
                var r = buf && buf.length ? this.write(buf) : '';
                if (this.lastNeed) {
                    var end = this.lastTotal - this.lastNeed;
                    return r + this.lastChar.toString('utf16le', 0, end);
                }
                return r;
            }

            function base64Text(buf, i) {
                var n = (buf.length - i) % 3;
                if (n === 0) return buf.toString('base64', i);
                this.lastNeed = 3 - n;
                this.lastTotal = 3;
                if (n === 1) {
                    this.lastChar[0] = buf[buf.length - 1];
                } else {
                    this.lastChar[0] = buf[buf.length - 2];
                    this.lastChar[1] = buf[buf.length - 1];
                }
                return buf.toString('base64', i, buf.length - n);
            }

            function base64End(buf) {
                var r = buf && buf.length ? this.write(buf) : '';
                if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
                return r;
            }

            // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
            function simpleWrite(buf) {
                return buf.toString(this.encoding);
            }

            function simpleEnd(buf) {
                return buf && buf.length ? this.write(buf) : '';
            }
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/string_decoder/lib/string_decoder.js", "/../../node_modules/string_decoder/lib")
    }, {
        "buffer": 3,
        "rH1JPG": 13,
        "safe-buffer": 25
    }],
    28: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {

            /**
             * Module exports.
             */

            module.exports = deprecate;

            /**
             * Mark that a method should not be used.
             * Returns a modified function which warns once by default.
             *
             * If `localStorage.noDeprecation = true` is set, then it is a no-op.
             *
             * If `localStorage.throwDeprecation = true` is set, then deprecated functions
             * will throw an Error when invoked.
             *
             * If `localStorage.traceDeprecation = true` is set, then deprecated functions
             * will invoke `console.trace()` instead of `console.error()`.
             *
             * @param {Function} fn - the function to deprecate
             * @param {String} msg - the string to print to the console when `fn` is invoked
             * @returns {Function} a new "deprecated" version of `fn`
             * @api public
             */

            function deprecate(fn, msg) {
                if (config('noDeprecation')) {
                    return fn;
                }

                var warned = false;

                function deprecated() {
                    if (!warned) {
                        if (config('throwDeprecation')) {
                            throw new Error(msg);
                        } else if (config('traceDeprecation')) {
                            console.trace(msg);
                        } else {
                            console.warn(msg);
                        }
                        warned = true;
                    }
                    return fn.apply(this, arguments);
                }

                return deprecated;
            }

            /**
             * Checks `localStorage` for boolean values for the given `name`.
             *
             * @param {String} name
             * @returns {Boolean}
             * @api private
             */

            function config(name) {
                // accessing global.localStorage can trigger a DOMException in sandboxed iframes
                try {
                    if (!global.localStorage) return false;
                } catch (_) {
                    return false;
                }
                var val = global.localStorage[name];
                if (null == val) return false;
                return String(val).toLowerCase() === 'true';
            }

        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/util-deprecate/browser.js", "/../../node_modules/util-deprecate")
    }, {
        "buffer": 3,
        "rH1JPG": 13
    }],
    29: [function(require, module, exports) {
        (function(process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            var Peer = require('simple-peer')

            var socket = io.connect();
            var initiator = false;
            var roomCode; // The current room of the client.
            var connected;
            var fullscreen = false;
            var muteChat = false;

            window.addEventListener('unload', function(event) {
                socket.emit('exit', roomCode);
            });

            $(() => {
                $('.create-room').click(() => {
                    $('.create-room').prop('disabled', true);
                    initiator = false;
                    socket.emit('createRoom', getUsername());
                    start();

                    $('.home-div').fadeOut(300, () => {
                        $('.chat-div').fadeIn(300);
                    });
                });

                $('.join-room').click(() => {
                    $('.buttons').fadeOut(300, () => {
                        $('.room-code').fadeIn(300);
                    });
                });

                $('#room-code-form').submit((e) => {
                    e.preventDefault();
                    let room = $('#room').val();
                    if (room === '') {
                        Materialize.toast(`Nhập mã phòng`, 3000, 'red lighten-1');
                        return;
                    }
                    if (room.length !== 5) {
                        Materialize.toast(`Phòng không tồn tại!!`, 3000, 'red lighten-1');
                        return;
                    }
                    $.post('check', {
                        room: room,
                        username: getUsername()
                    }).done((data) => {
                        if (data.vacancy) {
                            socket.emit('joinRoom', room);
                            updateRoom(room);
                            initiator = true;
                            $('.waiting-div').hide();
                            $('.connecting-div').show();
                            $('.home-div').fadeOut(300, () => {
                                $('.chat-div').fadeIn(300);
                            });
                            start();
                        } else {
                            Materialize.toast(data.msg, 3000, 'red lighten-1');
                        }
                    })
                });

                $('#full-screen-btn').click(() => {
                    toggleFullscreen();
                });

                $('#disconnect-btn').click(() => {
                    location.reload();
                });

                $('#receive-message').prop('volume', .5);

                $("#mute-chat").click(() => {

                    muteChat = !muteChat;
                    if (muteChat) {
                        $('#mute-chat').html('<i class="fa fa-bell-slash" aria-hidden="true"></i>');
                        $('#mute-chat').removeClass('grey');
                    } else {
                        $('#mute-chat').html('<i class="fa fa-bell" aria-hidden="true"></i>');
                        $('#mute-chat').addClass('grey');
                    }

                });

            });

            socket.on('room', (data) => {
                updateRoom(data);
            })


            function start() {
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                navigator.getUserMedia({
                    video: {
                        optional: [{
                                minWidth: 320
                            },
                            {
                                minWidth: 640
                            },
                            {
                                minWidth: 1024
                            },
                            {
                                minWidth: 1280
                            },
                            {
                                minWidth: 1920
                            },
                            {
                                minWidth: 2560
                            },
                        ]
                    },
                    audio: true
                }, gotMedia, function() {});
            }

            function gotMedia(stream) {
                var video = document.querySelector('video#myVideo');
                video.src = window.URL.createObjectURL(stream);
                video.play();


                var p = new Peer({
                    initiator: initiator,
                    trickle: false,
                    stream: stream
                })

                p.on('error', function(err) {
                    console.log('error', err);
                    Materialize.toast(`Something went wrong. Please try again. Disconnecting...`, 4000, 'red lighten-1');
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                })

                p.on('signal', function(data) {
                    socket.emit('handshake', data, roomCode);
                });

                socket.on('handshake', (data) => {
                    p.signal(data);
                });

                $("#chat-message").keypress(function(e) {
                    if (e.which === 13 && !e.shiftKey) {
                        $(this).closest("form").submit();
                        e.preventDefault();
                        return false;
                    }
                });

                $('#chat-form').submit((e) => {
                    e.preventDefault();
                    if ($('#chat-message').val() === '') {
                        return;
                    }
                    $('.chat-box').append('<p class="my-message">' + $('#chat-message').val() + '</p>');
                    $(".chat-box").animate({
                        scrollTop: $('.chat-box').prop("scrollHeight")
                    }, 300);
                    if (connected) {
                        p.send($('#chat-message').val());
                    }
                    $("#chat-message").val('');
                })

                p.on('connect', function() {
                    connected = true;
                    $('.waiting-div').fadeOut(300);
                    $('.connecting-div').fadeOut(300);
                    $('#chat-message').prop('disabled', false);
                    $('.fa-circle').css('color', '#4caf50');
                    $('.send-message').prop('disabled', false);
                    $('.attach-file').removeAttr('disabled');
                })

                p.on('data', function(data) {
                    if ($('.text-div').css('display') === 'none') {
                        Materialize.toast(`Your friend sent you a message, but chat facility is not available on mobile devices.`, 4000, 'indigo');
                    } else {
                        $('.chat-box').append('<p class="remote-message">' + data + '</p>');
                        $(".chat-box").animate({
                            scrollTop: $('.chat-box').prop("scrollHeight")
                        }, 300);
                        if (!muteChat) {
                            $('#receive-message')[0].currentTime = 0;
                            $('#receive-message').trigger("play");
                        }
                        if (fullscreen) {
                            Materialize.toast(`New Message Received`, 2000, 'indigo');
                        }
                    }
                })

                p.on('stream', function(stream) {
                    // got remote video stream, now let's show it in a video tag
                    var video = document.querySelector('video#remoteVideo');
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                })

                socket.on('exit', () => {
                    $('.disconnected-div').fadeIn(300);
                    $('#chat-message').prop('disabled', true);
                    $('.fa-circle').css('color', '#f44336');
                    $('.send-message').prop('disabled', true);
                    $('.attach-file').removeAttr('disabled');
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                });

                // Audio Video Controls

                $('#mute-btn').click(() => {
                    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
                    if (stream.getAudioTracks()[0].enabled) {
                        $('#mute-btn').html('<i class="fa fa-microphone" aria-hidden="true"></i>');
                        $('#mute-btn').addClass('grey');
                    } else {
                        $('#mute-btn').html('<i class="fa fa-microphone-slash" aria-hidden="true"></i>');
                        $('#mute-btn').removeClass('grey');
                    }
                });

                $('#hide-video').click(() => {
                    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
                    if (stream.getVideoTracks()[0].enabled) {
                        $('#hide-video').html('<i class="fa fa-eye" aria-hidden="true"></i>');
                        $('#hide-video').addClass('grey');
                    } else {
                        $('#hide-video').html('<i class="fa fa-eye-slash" aria-hidden="true"></i>');
                        $('#hide-video').removeClass('grey');
                    }
                });
            }


            function updateRoom(room) {
                roomCode = room;
                $('.chat-room').html('<p><i class="fa fa-circle" aria-hidden="true"></i> Room - ' + roomCode + '</p>');
            }

            function toggleFullscreen() {
                $('#full-screen-btn').toggleClass('grey');
                if (fullscreen) {
                    $('.video-grid').css({
                        'width': '70%',
                        'z-index': 'auto'
                    });
                    $('.text-div').css('opacity', '1');
                    $('#myVideo').css('width', '200px');
                    fullscreen = false;
                } else {
                    $('.video-grid').css({
                        'width': '100%',
                        'z-index': '50'
                    });

                    $('.text-div').css('opacity', '0');
                    $('#myVideo').css('width', '250px');
                    fullscreen = true;
                }
            }
        }).call(this, require("rH1JPG"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_269f2b41.js", "/")
    }, {
        "buffer": 3,
        "rH1JPG": 13,
        "simple-peer": 26
    }]
}, {}, [29])


function onSubmitForm(event) {
  event.preventDefault();

  $.ajax({
    url: '/users',
    method: 'POST',
    data: {
      username: $('#username').val()
    },
    dataType: 'json',
    success: function(data, textStatus, jqXHR) {
      if (data.message === 'success') {
        window.location.replace('/chat');
      } else {
        Materialize.toast(`Tài khoản đã tồn tại!`, 3000, 'red lighten-1');
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        Materialize.toast('Lỗi đăng nhập'+'<br>Message: ' + textStatus +
        '<br>Status: ' + jqXHR.status, 3000, 'red lighten-1');
    }
  });
}

function getUsername() {
  let allCookies = document.cookie;
  let requiredCookie = allCookies.split('; ').find(function(cookie) {
    return (cookie.split('=')[0] === 'username');
  });

  let username = requiredCookie.split('=')[1];
  return username;
}

$('#login-form').on('submit', function(event) {
    onSubmitForm(event);
});

var socket = io();
socket.on('rooms',function(rooms){
    var list = Object.keys(rooms);

    var li = '';
    
    if(list.length) {
        li = '<p>List room online: </p>';
    }

    list.forEach(function(r){
        li += '<li>'+r+' - <strong>'+rooms[r].own+'</strong></li>';
    });

    $('.list-room').html(li);

});

$('.logout').click(LogOut);

function LogOut(event) {
  $.ajax({
    url: '/users/' + getUsername(),
    method: 'delete',
    dataType: 'json',
    success: function(data, textStatus, jqXHR) {
      if (data.message === 'success') {
        window.location.replace('/');
      } else {
        Materialize.toast(`Không thể đăng xuất!`, 3000, 'red lighten-1');
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      Materialize.toast('Không thể đăng xuất! '+'<br>Message: ' + textStatus +
        '<br>Status: ' + jqXHR.status, 3000, 'red lighten-1');
    }
  });
}