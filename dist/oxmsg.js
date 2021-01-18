import require$$0$1 from 'fs';
import buffer from 'buffer';
import { TextEncoder } from 'util';
import crypto from 'crypto';
import require$$1$1 from 'string_decoder';
import require$$3$1 from 'stream';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

function commonjsRequire (target) {
	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
}

/* cfb.js (C) 2013-present SheetJS -- http://sheetjs.com */

var cfb = createCommonjsModule(function (module) {
/* vim: set ts=2: */

/*jshint eqnull:true */

/*exported CFB */

/*global module, require:false, process:false, Buffer:false, Uint8Array:false, Uint16Array:false */
var Base64 = function make_b64() {
  var map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return {
    encode: function (input) {
      var o = "";
      var c1 = 0,
          c2 = 0,
          c3 = 0,
          e1 = 0,
          e2 = 0,
          e3 = 0,
          e4 = 0;

      for (var i = 0; i < input.length;) {
        c1 = input.charCodeAt(i++);
        e1 = c1 >> 2;
        c2 = input.charCodeAt(i++);
        e2 = (c1 & 3) << 4 | c2 >> 4;
        c3 = input.charCodeAt(i++);
        e3 = (c2 & 15) << 2 | c3 >> 6;
        e4 = c3 & 63;

        if (isNaN(c2)) {
          e3 = e4 = 64;
        } else if (isNaN(c3)) {
          e4 = 64;
        }

        o += map.charAt(e1) + map.charAt(e2) + map.charAt(e3) + map.charAt(e4);
      }

      return o;
    },
    decode: function b64_decode(input) {
      var o = "";
      var c1 = 0,
          c2 = 0,
          c3 = 0,
          e1 = 0,
          e2 = 0,
          e3 = 0,
          e4 = 0;
      input = input.replace(/[^\w\+\/\=]/g, "");

      for (var i = 0; i < input.length;) {
        e1 = map.indexOf(input.charAt(i++));
        e2 = map.indexOf(input.charAt(i++));
        c1 = e1 << 2 | e2 >> 4;
        o += String.fromCharCode(c1);
        e3 = map.indexOf(input.charAt(i++));
        c2 = (e2 & 15) << 4 | e3 >> 2;

        if (e3 !== 64) {
          o += String.fromCharCode(c2);
        }

        e4 = map.indexOf(input.charAt(i++));
        c3 = (e3 & 3) << 6 | e4;

        if (e4 !== 64) {
          o += String.fromCharCode(c3);
        }
      }

      return o;
    }
  };
}();

var has_buf = typeof Buffer !== 'undefined' && typeof process !== 'undefined' && typeof process.versions !== 'undefined' && process.versions.node;

var Buffer_from = function () {};

if (typeof Buffer !== 'undefined') {
  var nbfs = !Buffer.from;
  if (!nbfs) try {
    Buffer.from("foo", "utf8");
  } catch (e) {
    nbfs = true;
  }
  Buffer_from = nbfs ? function (buf, enc) {
    return enc ? new Buffer(buf, enc) : new Buffer(buf);
  } : Buffer.from.bind(Buffer); // $FlowIgnore

  if (!Buffer.alloc) Buffer.alloc = function (n) {
    return new Buffer(n);
  }; // $FlowIgnore

  if (!Buffer.allocUnsafe) Buffer.allocUnsafe = function (n) {
    return new Buffer(n);
  };
}

function new_raw_buf(len) {
  /* jshint -W056 */
  return has_buf ? Buffer.alloc(len) : new Array(len);
  /* jshint +W056 */
}

function new_unsafe_buf(len) {
  /* jshint -W056 */
  return has_buf ? Buffer.allocUnsafe(len) : new Array(len);
  /* jshint +W056 */
}

var s2a = function s2a(s) {
  if (has_buf) return Buffer_from(s, "binary");
  return s.split("").map(function (x) {
    return x.charCodeAt(0) & 0xff;
  });
};

var chr0 = /\u0000/g,
    chr1 = /[\u0001-\u0006]/g;

var __toBuffer = function (bufs) {
  var x = [];

  for (var i = 0; i < bufs[0].length; ++i) {
    x.push.apply(x, bufs[0][i]);
  }

  return x;
};

var ___toBuffer = __toBuffer;

var __utf16le = function (b, s, e) {
  var ss = [];

  for (var i = s; i < e; i += 2) ss.push(String.fromCharCode(__readUInt16LE(b, i)));

  return ss.join("").replace(chr0, '');
};

var ___utf16le = __utf16le;

var __hexlify = function (b, s, l) {
  var ss = [];

  for (var i = s; i < s + l; ++i) ss.push(("0" + b[i].toString(16)).slice(-2));

  return ss.join("");
};

var ___hexlify = __hexlify;

var __bconcat = function (bufs) {
  if (Array.isArray(bufs[0])) return [].concat.apply([], bufs);
  var maxlen = 0,
      i = 0;

  for (i = 0; i < bufs.length; ++i) maxlen += bufs[i].length;

  var o = new Uint8Array(maxlen);

  for (i = 0, maxlen = 0; i < bufs.length; maxlen += bufs[i].length, ++i) o.set(bufs[i], maxlen);

  return o;
};

var bconcat = __bconcat;

if (has_buf) {
  __utf16le = function (b, s, e) {
    if (!Buffer.isBuffer(b)) return ___utf16le(b, s, e);
    return b.toString('utf16le', s, e).replace(chr0, '')
    /*.replace(chr1,'!')*/
    ;
  };

  __hexlify = function (b, s, l) {
    return Buffer.isBuffer(b) ? b.toString('hex', s, s + l) : ___hexlify(b, s, l);
  };

  __toBuffer = function (bufs) {
    return bufs[0].length > 0 && Buffer.isBuffer(bufs[0][0]) ? Buffer.concat(bufs[0]) : ___toBuffer(bufs);
  };

  s2a = function (s) {
    return Buffer_from(s, "binary");
  };

  bconcat = function (bufs) {
    return Buffer.isBuffer(bufs[0]) ? Buffer.concat(bufs) : __bconcat(bufs);
  };
}

var __readUInt8 = function (b, idx) {
  return b[idx];
};

var __readUInt16LE = function (b, idx) {
  return b[idx + 1] * (1 << 8) + b[idx];
};

var __readInt16LE = function (b, idx) {
  var u = b[idx + 1] * (1 << 8) + b[idx];
  return u < 0x8000 ? u : (0xffff - u + 1) * -1;
};

var __readUInt32LE = function (b, idx) {
  return b[idx + 3] * (1 << 24) + (b[idx + 2] << 16) + (b[idx + 1] << 8) + b[idx];
};

var __readInt32LE = function (b, idx) {
  return (b[idx + 3] << 24) + (b[idx + 2] << 16) + (b[idx + 1] << 8) + b[idx];
};

function ReadShift(size, t) {
  var oI,
      oS,
      type = 0;

  switch (size) {
    case 1:
      oI = __readUInt8(this, this.l);
      break;

    case 2:
      oI = (t !== 'i' ? __readUInt16LE : __readInt16LE)(this, this.l);
      break;

    case 4:
      oI = __readInt32LE(this, this.l);
      break;

    case 16:
      type = 2;
      oS = __hexlify(this, this.l, size);
  }

  this.l += size;
  if (type === 0) return oI;
  return oS;
}

var __writeUInt32LE = function (b, val, idx) {
  b[idx] = val & 0xFF;
  b[idx + 1] = val >>> 8 & 0xFF;
  b[idx + 2] = val >>> 16 & 0xFF;
  b[idx + 3] = val >>> 24 & 0xFF;
};

var __writeInt32LE = function (b, val, idx) {
  b[idx] = val & 0xFF;
  b[idx + 1] = val >> 8 & 0xFF;
  b[idx + 2] = val >> 16 & 0xFF;
  b[idx + 3] = val >> 24 & 0xFF;
};

function WriteShift(t, val, f) {
  var size = 0,
      i = 0;

  switch (f) {
    case "hex":
      for (; i < t; ++i) {
        this[this.l++] = parseInt(val.slice(2 * i, 2 * i + 2), 16) || 0;
      }

      return this;

    case "utf16le":
      var end = this.l + t;

      for (i = 0; i < Math.min(val.length, t); ++i) {
        var cc = val.charCodeAt(i);
        this[this.l++] = cc & 0xff;
        this[this.l++] = cc >> 8;
      }

      while (this.l < end) this[this.l++] = 0;

      return this;
  }

  switch (t) {
    case 1:
      size = 1;
      this[this.l] = val & 0xFF;
      break;

    case 2:
      size = 2;
      this[this.l] = val & 0xFF;
      val >>>= 8;
      this[this.l + 1] = val & 0xFF;
      break;

    case 4:
      size = 4;

      __writeUInt32LE(this, val, this.l);

      break;

    case -4:
      size = 4;

      __writeInt32LE(this, val, this.l);

      break;
  }

  this.l += size;
  return this;
}

function CheckField(hexstr, fld) {
  var m = __hexlify(this, this.l, hexstr.length >> 1);

  if (m !== hexstr) throw new Error(fld + 'Expected ' + hexstr + ' saw ' + m);
  this.l += hexstr.length >> 1;
}

function prep_blob(blob, pos) {
  blob.l = pos;
  blob.read_shift = ReadShift;
  blob.chk = CheckField;
  blob.write_shift = WriteShift;
}

function new_buf(sz) {
  var o = new_raw_buf(sz);
  prep_blob(o, 0);
  return o;
}
/* crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */

/* vim: set ts=2: */

/*exported CRC32 */


var CRC32;

(function (factory) {
  /*jshint ignore:start */

  /*eslint-disable */
  factory(CRC32 = {});
  /*eslint-enable */

  /*jshint ignore:end */
})(function (CRC32) {
  CRC32.version = '1.2.0';
  /* see perf/crc32table.js */

  /*global Int32Array */

  function signed_crc_table() {
    var c = 0,
        table = new Array(256);

    for (var n = 0; n != 256; ++n) {
      c = n;
      c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
      c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
      c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
      c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
      c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
      c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
      c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
      c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
      table[n] = c;
    }

    return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
  }

  var T = signed_crc_table();

  function crc32_bstr(bstr, seed) {
    var C = seed ^ -1,
        L = bstr.length - 1;

    for (var i = 0; i < L;) {
      C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i++)) & 0xFF];
      C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i++)) & 0xFF];
    }

    if (i === L) C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i)) & 0xFF];
    return C ^ -1;
  }

  function crc32_buf(buf, seed) {
    if (buf.length > 10000) return crc32_buf_8(buf, seed);
    var C = seed ^ -1,
        L = buf.length - 3;

    for (var i = 0; i < L;) {
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
    }

    while (i < L + 3) C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];

    return C ^ -1;
  }

  function crc32_buf_8(buf, seed) {
    var C = seed ^ -1,
        L = buf.length - 7;

    for (var i = 0; i < L;) {
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
      C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];
    }

    while (i < L + 7) C = C >>> 8 ^ T[(C ^ buf[i++]) & 0xFF];

    return C ^ -1;
  }

  function crc32_str(str, seed) {
    var C = seed ^ -1;

    for (var i = 0, L = str.length, c, d; i < L;) {
      c = str.charCodeAt(i++);

      if (c < 0x80) {
        C = C >>> 8 ^ T[(C ^ c) & 0xFF];
      } else if (c < 0x800) {
        C = C >>> 8 ^ T[(C ^ (192 | c >> 6 & 31)) & 0xFF];
        C = C >>> 8 ^ T[(C ^ (128 | c & 63)) & 0xFF];
      } else if (c >= 0xD800 && c < 0xE000) {
        c = (c & 1023) + 64;
        d = str.charCodeAt(i++) & 1023;
        C = C >>> 8 ^ T[(C ^ (240 | c >> 8 & 7)) & 0xFF];
        C = C >>> 8 ^ T[(C ^ (128 | c >> 2 & 63)) & 0xFF];
        C = C >>> 8 ^ T[(C ^ (128 | d >> 6 & 15 | (c & 3) << 4)) & 0xFF];
        C = C >>> 8 ^ T[(C ^ (128 | d & 63)) & 0xFF];
      } else {
        C = C >>> 8 ^ T[(C ^ (224 | c >> 12 & 15)) & 0xFF];
        C = C >>> 8 ^ T[(C ^ (128 | c >> 6 & 63)) & 0xFF];
        C = C >>> 8 ^ T[(C ^ (128 | c & 63)) & 0xFF];
      }
    }

    return C ^ -1;
  }

  CRC32.table = T;
  CRC32.bstr = crc32_bstr;
  CRC32.buf = crc32_buf;
  CRC32.str = crc32_str;
});
/* [MS-CFB] v20171201 */


var CFB = function _CFB() {
  var exports = {};
  exports.version = '1.2.0';
  /* [MS-CFB] 2.6.4 */

  function namecmp(l, r) {
    var L = l.split("/"),
        R = r.split("/");

    for (var i = 0, c = 0, Z = Math.min(L.length, R.length); i < Z; ++i) {
      if (c = L[i].length - R[i].length) return c;
      if (L[i] != R[i]) return L[i] < R[i] ? -1 : 1;
    }

    return L.length - R.length;
  }

  function dirname(p) {
    if (p.charAt(p.length - 1) == "/") return p.slice(0, -1).indexOf("/") === -1 ? p : dirname(p.slice(0, -1));
    var c = p.lastIndexOf("/");
    return c === -1 ? p : p.slice(0, c + 1);
  }

  function filename(p) {
    if (p.charAt(p.length - 1) == "/") return filename(p.slice(0, -1));
    var c = p.lastIndexOf("/");
    return c === -1 ? p : p.slice(c + 1);
  }
  /* -------------------------------------------------------------------------- */

  /* DOS Date format:
     high|YYYYYYYm.mmmddddd.HHHHHMMM.MMMSSSSS|low
     add 1980 to stored year
     stored second should be doubled
  */

  /* write JS date to buf as a DOS date */


  function write_dos_date(buf, date) {
    if (typeof date === "string") date = new Date(date);
    var hms = date.getHours();
    hms = hms << 6 | date.getMinutes();
    hms = hms << 5 | date.getSeconds() >>> 1;
    buf.write_shift(2, hms);
    var ymd = date.getFullYear() - 1980;
    ymd = ymd << 4 | date.getMonth() + 1;
    ymd = ymd << 5 | date.getDate();
    buf.write_shift(2, ymd);
  }
  /* read four bytes from buf and interpret as a DOS date */


  function parse_dos_date(buf) {
    var hms = buf.read_shift(2) & 0xFFFF;
    var ymd = buf.read_shift(2) & 0xFFFF;
    var val = new Date();
    var d = ymd & 0x1F;
    ymd >>>= 5;
    var m = ymd & 0x0F;
    ymd >>>= 4;
    val.setMilliseconds(0);
    val.setFullYear(ymd + 1980);
    val.setMonth(m - 1);
    val.setDate(d);
    var S = hms & 0x1F;
    hms >>>= 5;
    var M = hms & 0x3F;
    hms >>>= 6;
    val.setHours(hms);
    val.setMinutes(M);
    val.setSeconds(S << 1);
    return val;
  }

  function parse_extra_field(blob) {
    prep_blob(blob, 0);
    var o = {};
    var flags = 0;

    while (blob.l <= blob.length - 4) {
      var type = blob.read_shift(2);
      var sz = blob.read_shift(2),
          tgt = blob.l + sz;
      var p = {};

      switch (type) {
        /* UNIX-style Timestamps */
        case 0x5455:
          {
            flags = blob.read_shift(1);
            if (flags & 1) p.mtime = blob.read_shift(4);
            /* for some reason, CD flag corresponds to LFH */

            if (sz > 5) {
              if (flags & 2) p.atime = blob.read_shift(4);
              if (flags & 4) p.ctime = blob.read_shift(4);
            }

            if (p.mtime) p.mt = new Date(p.mtime * 1000);
          }
          break;
      }

      blob.l = tgt;
      o[type] = p;
    }

    return o;
  }

  var fs;

  function get_fs() {
    return fs || (fs = require$$0$1);
  }

  function parse(file, options) {
    if (file[0] == 0x50 && file[1] == 0x4b) return parse_zip(file, options);
    if ((file[0] | 0x20) == 0x6d && (file[1] | 0x20) == 0x69) return parse_mad(file, options);
    if (file.length < 512) throw new Error("CFB file size " + file.length + " < 512");
    var mver = 3;
    var ssz = 512;
    var nmfs = 0; // number of mini FAT sectors

    var difat_sec_cnt = 0;
    var dir_start = 0;
    var minifat_start = 0;
    var difat_start = 0;
    var fat_addrs = []; // locations of FAT sectors

    /* [MS-CFB] 2.2 Compound File Header */

    var blob = file.slice(0, 512);
    prep_blob(blob, 0);
    /* major version */

    var mv = check_get_mver(blob);
    mver = mv[0];

    switch (mver) {
      case 3:
        ssz = 512;
        break;

      case 4:
        ssz = 4096;
        break;

      case 0:
        if (mv[1] == 0) return parse_zip(file, options);

      /* falls through */

      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + mver);
    }
    /* reprocess header */


    if (ssz !== 512) {
      blob = file.slice(0, ssz);
      prep_blob(blob, 28
      /* blob.l */
      );
    }
    /* Save header for final object */


    var header = file.slice(0, ssz);
    check_shifts(blob, mver); // Number of Directory Sectors

    var dir_cnt = blob.read_shift(4, 'i');
    if (mver === 3 && dir_cnt !== 0) throw new Error('# Directory Sectors: Expected 0 saw ' + dir_cnt); // Number of FAT Sectors

    blob.l += 4; // First Directory Sector Location

    dir_start = blob.read_shift(4, 'i'); // Transaction Signature

    blob.l += 4; // Mini Stream Cutoff Size

    blob.chk('00100000', 'Mini Stream Cutoff Size: '); // First Mini FAT Sector Location

    minifat_start = blob.read_shift(4, 'i'); // Number of Mini FAT Sectors

    nmfs = blob.read_shift(4, 'i'); // First DIFAT sector location

    difat_start = blob.read_shift(4, 'i'); // Number of DIFAT Sectors

    difat_sec_cnt = blob.read_shift(4, 'i'); // Grab FAT Sector Locations

    for (var q = -1, j = 0; j < 109; ++j) {
      /* 109 = (512 - blob.l)>>>2; */
      q = blob.read_shift(4, 'i');
      if (q < 0) break;
      fat_addrs[j] = q;
    }
    /** Break the file up into sectors */


    var sectors = sectorify(file, ssz);
    sleuth_fat(difat_start, difat_sec_cnt, sectors, ssz, fat_addrs);
    /** Chains */

    var sector_list = make_sector_list(sectors, dir_start, fat_addrs, ssz);
    sector_list[dir_start].name = "!Directory";
    if (nmfs > 0 && minifat_start !== ENDOFCHAIN) sector_list[minifat_start].name = "!MiniFAT";
    sector_list[fat_addrs[0]].name = "!FAT";
    sector_list.fat_addrs = fat_addrs;
    sector_list.ssz = ssz;
    /* [MS-CFB] 2.6.1 Compound File Directory Entry */

    var files = {},
        Paths = [],
        FileIndex = [],
        FullPaths = [];
    read_directory(dir_start, sector_list, sectors, Paths, nmfs, files, FileIndex, minifat_start);
    build_full_paths(FileIndex, FullPaths, Paths);
    Paths.shift();
    var o = {
      FileIndex: FileIndex,
      FullPaths: FullPaths
    }; // $FlowIgnore

    if (options && options.raw) o.raw = {
      header: header,
      sectors: sectors
    };
    return o;
  } // parse

  /* [MS-CFB] 2.2 Compound File Header -- read up to major version */


  function check_get_mver(blob) {
    if (blob[blob.l] == 0x50 && blob[blob.l + 1] == 0x4b) return [0, 0]; // header signature 8

    blob.chk(HEADER_SIGNATURE, 'Header Signature: '); // clsid 16
    //blob.chk(HEADER_CLSID, 'CLSID: ');

    blob.l += 16; // minor version 2

    var mver = blob.read_shift(2, 'u');
    return [blob.read_shift(2, 'u'), mver];
  }

  function check_shifts(blob, mver) {
    var shift = 0x09; // Byte Order
    //blob.chk('feff', 'Byte Order: '); // note: some writers put 0xffff

    blob.l += 2; // Sector Shift

    switch (shift = blob.read_shift(2)) {
      case 0x09:
        if (mver != 3) throw new Error('Sector Shift: Expected 9 saw ' + shift);
        break;

      case 0x0c:
        if (mver != 4) throw new Error('Sector Shift: Expected 12 saw ' + shift);
        break;

      default:
        throw new Error('Sector Shift: Expected 9 or 12 saw ' + shift);
    } // Mini Sector Shift


    blob.chk('0600', 'Mini Sector Shift: '); // Reserved

    blob.chk('000000000000', 'Reserved: ');
  }
  /** Break the file up into sectors */


  function sectorify(file, ssz) {
    var nsectors = Math.ceil(file.length / ssz) - 1;
    var sectors = [];

    for (var i = 1; i < nsectors; ++i) sectors[i - 1] = file.slice(i * ssz, (i + 1) * ssz);

    sectors[nsectors - 1] = file.slice(nsectors * ssz);
    return sectors;
  }
  /* [MS-CFB] 2.6.4 Red-Black Tree */


  function build_full_paths(FI, FP, Paths) {
    var i = 0,
        L = 0,
        R = 0,
        C = 0,
        j = 0,
        pl = Paths.length;
    var dad = [],
        q = [];

    for (; i < pl; ++i) {
      dad[i] = q[i] = i;
      FP[i] = Paths[i];
    }

    for (; j < q.length; ++j) {
      i = q[j];
      L = FI[i].L;
      R = FI[i].R;
      C = FI[i].C;

      if (dad[i] === i) {
        if (L !== -1
        /*NOSTREAM*/
        && dad[L] !== L) dad[i] = dad[L];
        if (R !== -1 && dad[R] !== R) dad[i] = dad[R];
      }

      if (C !== -1
      /*NOSTREAM*/
      ) dad[C] = i;

      if (L !== -1 && i != dad[i]) {
        dad[L] = dad[i];
        if (q.lastIndexOf(L) < j) q.push(L);
      }

      if (R !== -1 && i != dad[i]) {
        dad[R] = dad[i];
        if (q.lastIndexOf(R) < j) q.push(R);
      }
    }

    for (i = 1; i < pl; ++i) if (dad[i] === i) {
      if (R !== -1
      /*NOSTREAM*/
      && dad[R] !== R) dad[i] = dad[R];else if (L !== -1 && dad[L] !== L) dad[i] = dad[L];
    }

    for (i = 1; i < pl; ++i) {
      if (FI[i].type === 0
      /* unknown */
      ) continue;
      j = i;
      if (j != dad[j]) do {
        j = dad[j];
        FP[i] = FP[j] + "/" + FP[i];
      } while (j !== 0 && -1 !== dad[j] && j != dad[j]);
      dad[i] = -1;
    }

    FP[0] += "/";

    for (i = 1; i < pl; ++i) {
      if (FI[i].type !== 2
      /* stream */
      ) FP[i] += "/";
    }
  }

  function get_mfat_entry(entry, payload, mini) {
    var start = entry.start,
        size = entry.size; //return (payload.slice(start*MSSZ, start*MSSZ + size));

    var o = [];
    var idx = start;

    while (mini && size > 0 && idx >= 0) {
      o.push(payload.slice(idx * MSSZ, idx * MSSZ + MSSZ));
      size -= MSSZ;
      idx = __readInt32LE(mini, idx * 4);
    }

    if (o.length === 0) return new_buf(0);
    return bconcat(o).slice(0, entry.size);
  }
  /** Chase down the rest of the DIFAT chain to build a comprehensive list
      DIFAT chains by storing the next sector number as the last 32 bits */


  function sleuth_fat(idx, cnt, sectors, ssz, fat_addrs) {
    var q = ENDOFCHAIN;

    if (idx === ENDOFCHAIN) {
      if (cnt !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (idx !== -1
    /*FREESECT*/
    ) {
        var sector = sectors[idx],
            m = (ssz >>> 2) - 1;
        if (!sector) return;

        for (var i = 0; i < m; ++i) {
          if ((q = __readInt32LE(sector, i * 4)) === ENDOFCHAIN) break;
          fat_addrs.push(q);
        }

        sleuth_fat(__readInt32LE(sector, ssz - 4), cnt - 1, sectors, ssz, fat_addrs);
      }
  }
  /** Follow the linked list of sectors for a given starting point */


  function get_sector_list(sectors, start, fat_addrs, ssz, chkd) {
    var buf = [],
        buf_chain = [];
    if (!chkd) chkd = [];
    var modulus = ssz - 1,
        j = 0,
        jj = 0;

    for (j = start; j >= 0;) {
      chkd[j] = true;
      buf[buf.length] = j;
      buf_chain.push(sectors[j]);
      var addr = fat_addrs[Math.floor(j * 4 / ssz)];
      jj = j * 4 & modulus;
      if (ssz < 4 + jj) throw new Error("FAT boundary crossed: " + j + " 4 " + ssz);
      if (!sectors[addr]) break;
      j = __readInt32LE(sectors[addr], jj);
    }

    return {
      nodes: buf,
      data: __toBuffer([buf_chain])
    };
  }
  /** Chase down the sector linked lists */


  function make_sector_list(sectors, dir_start, fat_addrs, ssz) {
    var sl = sectors.length,
        sector_list = [];
    var chkd = [],
        buf = [],
        buf_chain = [];
    var modulus = ssz - 1,
        i = 0,
        j = 0,
        k = 0,
        jj = 0;

    for (i = 0; i < sl; ++i) {
      buf = [];
      k = i + dir_start;
      if (k >= sl) k -= sl;
      if (chkd[k]) continue;
      buf_chain = [];
      var seen = [];

      for (j = k; j >= 0;) {
        seen[j] = true;
        chkd[j] = true;
        buf[buf.length] = j;
        buf_chain.push(sectors[j]);
        var addr = fat_addrs[Math.floor(j * 4 / ssz)];
        jj = j * 4 & modulus;
        if (ssz < 4 + jj) throw new Error("FAT boundary crossed: " + j + " 4 " + ssz);
        if (!sectors[addr]) break;
        j = __readInt32LE(sectors[addr], jj);
        if (seen[j]) break;
      }

      sector_list[k] = {
        nodes: buf,
        data: __toBuffer([buf_chain])
      };
    }

    return sector_list;
  }
  /* [MS-CFB] 2.6.1 Compound File Directory Entry */


  function read_directory(dir_start, sector_list, sectors, Paths, nmfs, files, FileIndex, mini) {
    var minifat_store = 0,
        pl = Paths.length ? 2 : 0;
    var sector = sector_list[dir_start].data;
    var i = 0,
        namelen = 0,
        name;

    for (; i < sector.length; i += 128) {
      var blob = sector.slice(i, i + 128);
      prep_blob(blob, 64);
      namelen = blob.read_shift(2);
      name = __utf16le(blob, 0, namelen - pl);
      Paths.push(name);
      var o = {
        name: name,
        type: blob.read_shift(1),
        color: blob.read_shift(1),
        L: blob.read_shift(4, 'i'),
        R: blob.read_shift(4, 'i'),
        C: blob.read_shift(4, 'i'),
        clsid: blob.read_shift(16),
        state: blob.read_shift(4, 'i'),
        start: 0,
        size: 0
      };
      var ctime = blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2);
      if (ctime !== 0) o.ct = read_date(blob, blob.l - 8);
      var mtime = blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2);
      if (mtime !== 0) o.mt = read_date(blob, blob.l - 8);
      o.start = blob.read_shift(4, 'i');
      o.size = blob.read_shift(4, 'i');

      if (o.size < 0 && o.start < 0) {
        o.size = o.type = 0;
        o.start = ENDOFCHAIN;
        o.name = "";
      }

      if (o.type === 5) {
        /* root */
        minifat_store = o.start;
        if (nmfs > 0 && minifat_store !== ENDOFCHAIN) sector_list[minifat_store].name = "!StreamData";
        /*minifat_size = o.size;*/
      } else if (o.size >= 4096
      /* MSCSZ */
      ) {
          o.storage = 'fat';
          if (sector_list[o.start] === undefined) sector_list[o.start] = get_sector_list(sectors, o.start, sector_list.fat_addrs, sector_list.ssz);
          sector_list[o.start].name = o.name;
          o.content = sector_list[o.start].data.slice(0, o.size);
        } else {
        o.storage = 'minifat';
        if (o.size < 0) o.size = 0;else if (minifat_store !== ENDOFCHAIN && o.start !== ENDOFCHAIN && sector_list[minifat_store]) {
          o.content = get_mfat_entry(o, sector_list[minifat_store].data, (sector_list[mini] || {}).data);
        }
      }

      if (o.content) prep_blob(o.content, 0);
      files[name] = o;
      FileIndex.push(o);
    }
  }

  function read_date(blob, offset) {
    return new Date((__readUInt32LE(blob, offset + 4) / 1e7 * Math.pow(2, 32) + __readUInt32LE(blob, offset) / 1e7 - 11644473600) * 1000);
  }

  function read_file(filename, options) {
    get_fs();
    return parse(fs.readFileSync(filename), options);
  }

  function read(blob, options) {
    switch (options && options.type || "base64") {
      case "file":
        return read_file(blob, options);

      case "base64":
        return parse(s2a(Base64.decode(blob)), options);

      case "binary":
        return parse(s2a(blob), options);
    }

    return parse(blob, options);
  }

  function init_cfb(cfb, opts) {
    var o = opts || {},
        root = o.root || "Root Entry";
    if (!cfb.FullPaths) cfb.FullPaths = [];
    if (!cfb.FileIndex) cfb.FileIndex = [];
    if (cfb.FullPaths.length !== cfb.FileIndex.length) throw new Error("inconsistent CFB structure");

    if (cfb.FullPaths.length === 0) {
      cfb.FullPaths[0] = root + "/";
      cfb.FileIndex[0] = {
        name: root,
        type: 5
      };
    }

    if (o.CLSID) cfb.FileIndex[0].clsid = o.CLSID;
    seed_cfb(cfb);
  }

  function seed_cfb(cfb) {
    var nm = "\u0001Sh33tJ5";
    if (CFB.find(cfb, "/" + nm)) return;
    var p = new_buf(4);
    p[0] = 55;
    p[1] = p[3] = 50;
    p[2] = 54;
    cfb.FileIndex.push({
      name: nm,
      type: 2,
      content: p,
      size: 4,
      L: 69,
      R: 69,
      C: 69
    });
    cfb.FullPaths.push(cfb.FullPaths[0] + nm);
    rebuild_cfb(cfb);
  }

  function rebuild_cfb(cfb, f) {
    init_cfb(cfb);
    var gc = false,
        s = false;

    for (var i = cfb.FullPaths.length - 1; i >= 0; --i) {
      var _file = cfb.FileIndex[i];

      switch (_file.type) {
        case 0:
          if (s) gc = true;else {
            cfb.FileIndex.pop();
            cfb.FullPaths.pop();
          }
          break;

        case 1:
        case 2:
        case 5:
          s = true;
          if (isNaN(_file.R * _file.L * _file.C)) gc = true;
          if (_file.R > -1 && _file.L > -1 && _file.R == _file.L) gc = true;
          break;

        default:
          gc = true;
          break;
      }
    }

    if (!gc && !f) return;
    var now = new Date(1987, 1, 19),
        j = 0;
    var data = [];

    for (i = 0; i < cfb.FullPaths.length; ++i) {
      if (cfb.FileIndex[i].type === 0) continue;
      data.push([cfb.FullPaths[i], cfb.FileIndex[i]]);
    }

    for (i = 0; i < data.length; ++i) {
      var dad = dirname(data[i][0]);
      s = false;

      for (j = 0; j < data.length; ++j) if (data[j][0] === dad) s = true;

      if (!s) data.push([dad, {
        name: filename(dad).replace("/", ""),
        type: 1,
        clsid: HEADER_CLSID,
        ct: now,
        mt: now,
        content: null
      }]);
    }

    data.sort(function (x, y) {
      return namecmp(x[0], y[0]);
    });
    cfb.FullPaths = [];
    cfb.FileIndex = [];

    for (i = 0; i < data.length; ++i) {
      cfb.FullPaths[i] = data[i][0];
      cfb.FileIndex[i] = data[i][1];
    }

    for (i = 0; i < data.length; ++i) {
      var elt = cfb.FileIndex[i];
      var nm = cfb.FullPaths[i];
      elt.name = filename(nm).replace("/", "");
      elt.L = elt.R = elt.C = -(elt.color = 1);
      elt.size = elt.content ? elt.content.length : 0;
      elt.start = 0;
      elt.clsid = elt.clsid || HEADER_CLSID;

      if (i === 0) {
        elt.C = data.length > 1 ? 1 : -1;
        elt.size = 0;
        elt.type = 5;
      } else if (nm.slice(-1) == "/") {
        for (j = i + 1; j < data.length; ++j) if (dirname(cfb.FullPaths[j]) == nm) break;

        elt.C = j >= data.length ? -1 : j;

        for (j = i + 1; j < data.length; ++j) if (dirname(cfb.FullPaths[j]) == dirname(nm)) break;

        elt.R = j >= data.length ? -1 : j;
        elt.type = 1;
      } else {
        if (dirname(cfb.FullPaths[i + 1] || "") == dirname(nm)) elt.R = i + 1;
        elt.type = 2;
      }
    }
  }

  function _write(cfb, options) {
    var _opts = options || {};
    /* MAD is order-sensitive, skip rebuild and sort */


    if (_opts.fileType == 'mad') return write_mad(cfb, _opts);
    rebuild_cfb(cfb);

    switch (_opts.fileType) {
      case 'zip':
        return write_zip(cfb, _opts);
      //case 'mad': return write_mad(cfb, _opts);
    }

    var L = function (cfb) {
      var mini_size = 0,
          fat_size = 0;

      for (var i = 0; i < cfb.FileIndex.length; ++i) {
        var file = cfb.FileIndex[i];
        if (!file.content) continue;
        var flen = file.content.length;

        if (flen > 0) {
          if (flen < 0x1000) mini_size += flen + 0x3F >> 6;else fat_size += flen + 0x01FF >> 9;
        }
      }

      var dir_cnt = cfb.FullPaths.length + 3 >> 2;
      var mini_cnt = mini_size + 7 >> 3;
      var mfat_cnt = mini_size + 0x7F >> 7;
      var fat_base = mini_cnt + fat_size + dir_cnt + mfat_cnt;
      var fat_cnt = fat_base + 0x7F >> 7;
      var difat_cnt = fat_cnt <= 109 ? 0 : Math.ceil((fat_cnt - 109) / 0x7F);

      while (fat_base + fat_cnt + difat_cnt + 0x7F >> 7 > fat_cnt) difat_cnt = ++fat_cnt <= 109 ? 0 : Math.ceil((fat_cnt - 109) / 0x7F);

      var L = [1, difat_cnt, fat_cnt, mfat_cnt, dir_cnt, fat_size, mini_size, 0];
      cfb.FileIndex[0].size = mini_size << 6;
      L[7] = (cfb.FileIndex[0].start = L[0] + L[1] + L[2] + L[3] + L[4] + L[5]) + (L[6] + 7 >> 3);
      return L;
    }(cfb);

    var o = new_buf(L[7] << 9);
    var i = 0,
        T = 0;
    {
      for (i = 0; i < 8; ++i) o.write_shift(1, HEADER_SIG[i]);

      for (i = 0; i < 8; ++i) o.write_shift(2, 0);

      o.write_shift(2, 0x003E);
      o.write_shift(2, 0x0003);
      o.write_shift(2, 0xFFFE);
      o.write_shift(2, 0x0009);
      o.write_shift(2, 0x0006);

      for (i = 0; i < 3; ++i) o.write_shift(2, 0);

      o.write_shift(4, 0);
      o.write_shift(4, L[2]);
      o.write_shift(4, L[0] + L[1] + L[2] + L[3] - 1);
      o.write_shift(4, 0);
      o.write_shift(4, 1 << 12);
      o.write_shift(4, L[3] ? L[0] + L[1] + L[2] - 1 : ENDOFCHAIN);
      o.write_shift(4, L[3]);
      o.write_shift(-4, L[1] ? L[0] - 1 : ENDOFCHAIN);
      o.write_shift(4, L[1]);

      for (i = 0; i < 109; ++i) o.write_shift(-4, i < L[2] ? L[1] + i : -1);
    }

    if (L[1]) {
      for (T = 0; T < L[1]; ++T) {
        for (; i < 236 + T * 127; ++i) o.write_shift(-4, i < L[2] ? L[1] + i : -1);

        o.write_shift(-4, T === L[1] - 1 ? ENDOFCHAIN : T + 1);
      }
    }

    var chainit = function (w) {
      for (T += w; i < T - 1; ++i) o.write_shift(-4, i + 1);

      if (w) {
        ++i;
        o.write_shift(-4, ENDOFCHAIN);
      }
    };

    T = i = 0;

    for (T += L[1]; i < T; ++i) o.write_shift(-4, consts.DIFSECT);

    for (T += L[2]; i < T; ++i) o.write_shift(-4, consts.FATSECT);

    chainit(L[3]);
    chainit(L[4]);
    var j = 0,
        flen = 0;
    var file = cfb.FileIndex[0];

    for (; j < cfb.FileIndex.length; ++j) {
      file = cfb.FileIndex[j];
      if (!file.content) continue;
      flen = file.content.length;
      if (flen < 0x1000) continue;
      file.start = T;
      chainit(flen + 0x01FF >> 9);
    }

    chainit(L[6] + 7 >> 3);

    while (o.l & 0x1FF) o.write_shift(-4, consts.ENDOFCHAIN);

    T = i = 0;

    for (j = 0; j < cfb.FileIndex.length; ++j) {
      file = cfb.FileIndex[j];
      if (!file.content) continue;
      flen = file.content.length;
      if (!flen || flen >= 0x1000) continue;
      file.start = T;
      chainit(flen + 0x3F >> 6);
    }

    while (o.l & 0x1FF) o.write_shift(-4, consts.ENDOFCHAIN);

    for (i = 0; i < L[4] << 2; ++i) {
      var nm = cfb.FullPaths[i];

      if (!nm || nm.length === 0) {
        for (j = 0; j < 17; ++j) o.write_shift(4, 0);

        for (j = 0; j < 3; ++j) o.write_shift(4, -1);

        for (j = 0; j < 12; ++j) o.write_shift(4, 0);

        continue;
      }

      file = cfb.FileIndex[i];
      if (i === 0) file.start = file.size ? file.start - 1 : ENDOFCHAIN;

      var _nm = i === 0 && _opts.root || file.name;

      flen = 2 * (_nm.length + 1);
      o.write_shift(64, _nm, "utf16le");
      o.write_shift(2, flen);
      o.write_shift(1, file.type);
      o.write_shift(1, file.color);
      o.write_shift(-4, file.L);
      o.write_shift(-4, file.R);
      o.write_shift(-4, file.C);
      if (!file.clsid) for (j = 0; j < 4; ++j) o.write_shift(4, 0);else o.write_shift(16, file.clsid, "hex");
      o.write_shift(4, file.state || 0);
      o.write_shift(4, 0);
      o.write_shift(4, 0);
      o.write_shift(4, 0);
      o.write_shift(4, 0);
      o.write_shift(4, file.start);
      o.write_shift(4, file.size);
      o.write_shift(4, 0);
    }

    for (i = 1; i < cfb.FileIndex.length; ++i) {
      file = cfb.FileIndex[i];

      if (file.size >= 0x1000) {
        o.l = file.start + 1 << 9;

        for (j = 0; j < file.size; ++j) o.write_shift(1, file.content[j]);

        for (; j & 0x1FF; ++j) o.write_shift(1, 0);
      }
    }

    for (i = 1; i < cfb.FileIndex.length; ++i) {
      file = cfb.FileIndex[i];

      if (file.size > 0 && file.size < 0x1000) {
        for (j = 0; j < file.size; ++j) o.write_shift(1, file.content[j]);

        for (; j & 0x3F; ++j) o.write_shift(1, 0);
      }
    }

    while (o.l < o.length) o.write_shift(1, 0);

    return o;
  }
  /* [MS-CFB] 2.6.4 (Unicode 3.0.1 case conversion) */


  function find(cfb, path) {
    var UCFullPaths = cfb.FullPaths.map(function (x) {
      return x.toUpperCase();
    });
    var UCPaths = UCFullPaths.map(function (x) {
      var y = x.split("/");
      return y[y.length - (x.slice(-1) == "/" ? 2 : 1)];
    });
    var k = false;

    if (path.charCodeAt(0) === 47
    /* "/" */
    ) {
        k = true;
        path = UCFullPaths[0].slice(0, -1) + path;
      } else k = path.indexOf("/") !== -1;

    var UCPath = path.toUpperCase();
    var w = k === true ? UCFullPaths.indexOf(UCPath) : UCPaths.indexOf(UCPath);
    if (w !== -1) return cfb.FileIndex[w];
    var m = !UCPath.match(chr1);
    UCPath = UCPath.replace(chr0, '');
    if (m) UCPath = UCPath.replace(chr1, '!');

    for (w = 0; w < UCFullPaths.length; ++w) {
      if ((m ? UCFullPaths[w].replace(chr1, '!') : UCFullPaths[w]).replace(chr0, '') == UCPath) return cfb.FileIndex[w];
      if ((m ? UCPaths[w].replace(chr1, '!') : UCPaths[w]).replace(chr0, '') == UCPath) return cfb.FileIndex[w];
    }

    return null;
  }
  /** CFB Constants */


  var MSSZ = 64;
  /* Mini Sector Size = 1<<6 */
  //var MSCSZ = 4096; /* Mini Stream Cutoff Size */

  /* 2.1 Compound File Sector Numbers and Types */

  var ENDOFCHAIN = -2;
  /* 2.2 Compound File Header */

  var HEADER_SIGNATURE = 'd0cf11e0a1b11ae1';
  var HEADER_SIG = [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1];
  var HEADER_CLSID = '00000000000000000000000000000000';
  var consts = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: ENDOFCHAIN,
    FREESECT: -1,

    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: HEADER_SIGNATURE,
    HEADER_MINOR_VERSION: '3e00',
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: HEADER_CLSID,

    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ['unknown', 'storage', 'stream', 'lockbytes', 'property', 'root']
  };

  function write_file(cfb, filename, options) {
    get_fs();

    var o = _write(cfb, options);

    fs.writeFileSync(filename, o);
  }

  function a2s(o) {
    var out = new Array(o.length);

    for (var i = 0; i < o.length; ++i) out[i] = String.fromCharCode(o[i]);

    return out.join("");
  }

  function write(cfb, options) {
    var o = _write(cfb, options);

    switch (options && options.type || "buffer") {
      case "file":
        get_fs();
        fs.writeFileSync(options.filename, o);
        return o;

      case "binary":
        return typeof o == "string" ? o : a2s(o);

      case "base64":
        return Base64.encode(typeof o == "string" ? o : a2s(o));

      case "buffer":
        if (has_buf) return Buffer.isBuffer(o) ? o : Buffer_from(o);

      /* falls through */

      case "array":
        return typeof o == "string" ? s2a(o) : o;
    }

    return o;
  }
  /* node < 8.1 zlib does not expose bytesRead, so default to pure JS */


  var _zlib;

  function use_zlib(zlib) {
    try {
      var InflateRaw = zlib.InflateRaw;
      var InflRaw = new InflateRaw();

      InflRaw._processChunk(new Uint8Array([3, 0]), InflRaw._finishFlushFlag);

      if (InflRaw.bytesRead) _zlib = zlib;else throw new Error("zlib does not expose bytesRead");
    } catch (e) {
      console.error("cannot use native zlib: " + (e.message || e));
    }
  }

  function _inflateRawSync(payload, usz) {
    if (!_zlib) return _inflate(payload, usz);
    var InflateRaw = _zlib.InflateRaw;
    var InflRaw = new InflateRaw();

    var out = InflRaw._processChunk(payload.slice(payload.l), InflRaw._finishFlushFlag);

    payload.l += InflRaw.bytesRead;
    return out;
  }

  function _deflateRawSync(payload) {
    return _zlib ? _zlib.deflateRawSync(payload) : _deflate(payload);
  }

  var CLEN_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  /*  LEN_ID = [ 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285 ]; */

  var LEN_LN = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
  /*  DST_ID = [  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13,  14,  15,  16,  17,  18,  19,   20,   21,   22,   23,   24,   25,   26,    27,    28,    29 ]; */

  var DST_LN = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];

  function bit_swap_8(n) {
    var t = (n << 1 | n << 11) & 0x22110 | (n << 5 | n << 15) & 0x88440;
    return (t >> 16 | t >> 8 | t) & 0xFF;
  }

  var use_typed_arrays = typeof Uint8Array !== 'undefined';
  var bitswap8 = use_typed_arrays ? new Uint8Array(1 << 8) : [];

  for (var q = 0; q < 1 << 8; ++q) bitswap8[q] = bit_swap_8(q);

  function bit_swap_n(n, b) {
    var rev = bitswap8[n & 0xFF];
    if (b <= 8) return rev >>> 8 - b;
    rev = rev << 8 | bitswap8[n >> 8 & 0xFF];
    if (b <= 16) return rev >>> 16 - b;
    rev = rev << 8 | bitswap8[n >> 16 & 0xFF];
    return rev >>> 24 - b;
  }
  /* helpers for unaligned bit reads */


  function read_bits_2(buf, bl) {
    var w = bl & 7,
        h = bl >>> 3;
    return (buf[h] | (w <= 6 ? 0 : buf[h + 1] << 8)) >>> w & 0x03;
  }

  function read_bits_3(buf, bl) {
    var w = bl & 7,
        h = bl >>> 3;
    return (buf[h] | (w <= 5 ? 0 : buf[h + 1] << 8)) >>> w & 0x07;
  }

  function read_bits_4(buf, bl) {
    var w = bl & 7,
        h = bl >>> 3;
    return (buf[h] | (w <= 4 ? 0 : buf[h + 1] << 8)) >>> w & 0x0F;
  }

  function read_bits_5(buf, bl) {
    var w = bl & 7,
        h = bl >>> 3;
    return (buf[h] | (w <= 3 ? 0 : buf[h + 1] << 8)) >>> w & 0x1F;
  }

  function read_bits_7(buf, bl) {
    var w = bl & 7,
        h = bl >>> 3;
    return (buf[h] | (w <= 1 ? 0 : buf[h + 1] << 8)) >>> w & 0x7F;
  }
  /* works up to n = 3 * 8 + 1 = 25 */


  function read_bits_n(buf, bl, n) {
    var w = bl & 7,
        h = bl >>> 3,
        f = (1 << n) - 1;
    var v = buf[h] >>> w;
    if (n < 8 - w) return v & f;
    v |= buf[h + 1] << 8 - w;
    if (n < 16 - w) return v & f;
    v |= buf[h + 2] << 16 - w;
    if (n < 24 - w) return v & f;
    v |= buf[h + 3] << 24 - w;
    return v & f;
  }
  /* until ArrayBuffer#realloc is a thing, fake a realloc */


  function realloc(b, sz) {
    var L = b.length,
        M = 2 * L > sz ? 2 * L : sz + 5,
        i = 0;
    if (L >= sz) return b;

    if (has_buf) {
      var o = new_unsafe_buf(M); // $FlowIgnore

      if (b.copy) b.copy(o);else for (; i < b.length; ++i) o[i] = b[i];
      return o;
    } else if (use_typed_arrays) {
      var a = new Uint8Array(M);
      if (a.set) a.set(b);else for (; i < b.length; ++i) a[i] = b[i];
      return a;
    }

    b.length = M;
    return b;
  }
  /* zero-filled arrays for older browsers */


  function zero_fill_array(n) {
    var o = new Array(n);

    for (var i = 0; i < n; ++i) o[i] = 0;

    return o;
  }

  var _deflate = function () {
    var _deflateRaw = function () {
      return function deflateRaw(data, out) {
        var boff = 0;

        while (boff < data.length) {
          var L = Math.min(0xFFFF, data.length - boff);
          var h = boff + L == data.length;
          /* TODO: this is only type 0 stored */

          out.write_shift(1, +h);
          out.write_shift(2, L);
          out.write_shift(2, ~L & 0xFFFF);

          while (L-- > 0) out[out.l++] = data[boff++];
        }

        return out.l;
      };
    }();

    return function (data) {
      var buf = new_buf(50 + Math.floor(data.length * 1.1));

      var off = _deflateRaw(data, buf);

      return buf.slice(0, off);
    };
  }();
  /* modified inflate function also moves original read head */

  /* build tree (used for literals and lengths) */


  function build_tree(clens, cmap, MAX) {
    var maxlen = 1,
        w = 0,
        i = 0,
        j = 0,
        ccode = 0,
        L = clens.length;
    var bl_count = use_typed_arrays ? new Uint16Array(32) : zero_fill_array(32);

    for (i = 0; i < 32; ++i) bl_count[i] = 0;

    for (i = L; i < MAX; ++i) clens[i] = 0;

    L = clens.length;
    var ctree = use_typed_arrays ? new Uint16Array(L) : zero_fill_array(L); // []

    /* build code tree */

    for (i = 0; i < L; ++i) {
      bl_count[w = clens[i]]++;
      if (maxlen < w) maxlen = w;
      ctree[i] = 0;
    }

    bl_count[0] = 0;

    for (i = 1; i <= maxlen; ++i) bl_count[i + 16] = ccode = ccode + bl_count[i - 1] << 1;

    for (i = 0; i < L; ++i) {
      ccode = clens[i];
      if (ccode != 0) ctree[i] = bl_count[ccode + 16]++;
    }
    /* cmap[maxlen + 4 bits] = (off&15) + (lit<<4) reverse mapping */


    var cleni = 0;

    for (i = 0; i < L; ++i) {
      cleni = clens[i];

      if (cleni != 0) {
        ccode = bit_swap_n(ctree[i], maxlen) >> maxlen - cleni;

        for (j = (1 << maxlen + 4 - cleni) - 1; j >= 0; --j) cmap[ccode | j << cleni] = cleni & 15 | i << 4;
      }
    }

    return maxlen;
  }

  var fix_lmap = use_typed_arrays ? new Uint16Array(512) : zero_fill_array(512);
  var fix_dmap = use_typed_arrays ? new Uint16Array(32) : zero_fill_array(32);

  if (!use_typed_arrays) {
    for (var i = 0; i < 512; ++i) fix_lmap[i] = 0;

    for (i = 0; i < 32; ++i) fix_dmap[i] = 0;
  }

  (function () {
    var dlens = [];
    var i = 0;

    for (; i < 32; i++) dlens.push(5);

    build_tree(dlens, fix_dmap, 32);
    var clens = [];
    i = 0;

    for (; i <= 143; i++) clens.push(8);

    for (; i <= 255; i++) clens.push(9);

    for (; i <= 279; i++) clens.push(7);

    for (; i <= 287; i++) clens.push(8);

    build_tree(clens, fix_lmap, 288);
  })();

  var dyn_lmap = use_typed_arrays ? new Uint16Array(32768) : zero_fill_array(32768);
  var dyn_dmap = use_typed_arrays ? new Uint16Array(32768) : zero_fill_array(32768);
  var dyn_cmap = use_typed_arrays ? new Uint16Array(128) : zero_fill_array(128);
  var dyn_len_1 = 1,
      dyn_len_2 = 1;
  /* 5.5.3 Expanding Huffman Codes */

  function dyn(data, boff) {
    /* nomenclature from RFC1951 refers to bit values; these are offset by the implicit constant */
    var _HLIT = read_bits_5(data, boff) + 257;

    boff += 5;

    var _HDIST = read_bits_5(data, boff) + 1;

    boff += 5;

    var _HCLEN = read_bits_4(data, boff) + 4;

    boff += 4;
    var w = 0;
    /* grab and store code lengths */

    var clens = use_typed_arrays ? new Uint8Array(19) : zero_fill_array(19);
    var ctree = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var maxlen = 1;
    var bl_count = use_typed_arrays ? new Uint8Array(8) : zero_fill_array(8);
    var next_code = use_typed_arrays ? new Uint8Array(8) : zero_fill_array(8);
    var L = clens.length;
    /* 19 */

    for (var i = 0; i < _HCLEN; ++i) {
      clens[CLEN_ORDER[i]] = w = read_bits_3(data, boff);
      if (maxlen < w) maxlen = w;
      bl_count[w]++;
      boff += 3;
    }
    /* build code tree */


    var ccode = 0;
    bl_count[0] = 0;

    for (i = 1; i <= maxlen; ++i) next_code[i] = ccode = ccode + bl_count[i - 1] << 1;

    for (i = 0; i < L; ++i) if ((ccode = clens[i]) != 0) ctree[i] = next_code[ccode]++;
    /* cmap[7 bits from stream] = (off&7) + (lit<<3) */


    var cleni = 0;

    for (i = 0; i < L; ++i) {
      cleni = clens[i];

      if (cleni != 0) {
        ccode = bitswap8[ctree[i]] >> 8 - cleni;

        for (var j = (1 << 7 - cleni) - 1; j >= 0; --j) dyn_cmap[ccode | j << cleni] = cleni & 7 | i << 3;
      }
    }
    /* read literal and dist codes at once */


    var hcodes = [];
    maxlen = 1;

    for (; hcodes.length < _HLIT + _HDIST;) {
      ccode = dyn_cmap[read_bits_7(data, boff)];
      boff += ccode & 7;

      switch (ccode >>>= 3) {
        case 16:
          w = 3 + read_bits_2(data, boff);
          boff += 2;
          ccode = hcodes[hcodes.length - 1];

          while (w-- > 0) hcodes.push(ccode);

          break;

        case 17:
          w = 3 + read_bits_3(data, boff);
          boff += 3;

          while (w-- > 0) hcodes.push(0);

          break;

        case 18:
          w = 11 + read_bits_7(data, boff);
          boff += 7;

          while (w-- > 0) hcodes.push(0);

          break;

        default:
          hcodes.push(ccode);
          if (maxlen < ccode) maxlen = ccode;
          break;
      }
    }
    /* build literal / length trees */


    var h1 = hcodes.slice(0, _HLIT),
        h2 = hcodes.slice(_HLIT);

    for (i = _HLIT; i < 286; ++i) h1[i] = 0;

    for (i = _HDIST; i < 30; ++i) h2[i] = 0;

    dyn_len_1 = build_tree(h1, dyn_lmap, 286);
    dyn_len_2 = build_tree(h2, dyn_dmap, 30);
    return boff;
  }
  /* return [ data, bytesRead ] */


  function inflate(data, usz) {
    /* shortcircuit for empty buffer [0x03, 0x00] */
    if (data[0] == 3 && !(data[1] & 0x3)) {
      return [new_raw_buf(usz), 2];
    }
    /* bit offset */


    var boff = 0;
    /* header includes final bit and type bits */

    var header = 0;
    var outbuf = new_unsafe_buf(usz ? usz : 1 << 18);
    var woff = 0;
    var OL = outbuf.length >>> 0;
    var max_len_1 = 0,
        max_len_2 = 0;

    while ((header & 1) == 0) {
      header = read_bits_3(data, boff);
      boff += 3;

      if (header >>> 1 == 0) {
        /* Stored block */
        if (boff & 7) boff += 8 - (boff & 7);
        /* 2 bytes sz, 2 bytes bit inverse */

        var sz = data[boff >>> 3] | data[(boff >>> 3) + 1] << 8;
        boff += 32;
        /* push sz bytes */

        if (!usz && OL < woff + sz) {
          outbuf = realloc(outbuf, woff + sz);
          OL = outbuf.length;
        }

        if (typeof data.copy === 'function') {
          // $FlowIgnore
          data.copy(outbuf, woff, boff >>> 3, (boff >>> 3) + sz);
          woff += sz;
          boff += 8 * sz;
        } else while (sz-- > 0) {
          outbuf[woff++] = data[boff >>> 3];
          boff += 8;
        }

        continue;
      } else if (header >>> 1 == 1) {
        /* Fixed Huffman */
        max_len_1 = 9;
        max_len_2 = 5;
      } else {
        /* Dynamic Huffman */
        boff = dyn(data, boff);
        max_len_1 = dyn_len_1;
        max_len_2 = dyn_len_2;
      }

      if (!usz && OL < woff + 32767) {
        outbuf = realloc(outbuf, woff + 32767);
        OL = outbuf.length;
      }

      for (;;) {
        // while(true) is apparently out of vogue in modern JS circles

        /* ingest code and move read head */
        var bits = read_bits_n(data, boff, max_len_1);
        var code = header >>> 1 == 1 ? fix_lmap[bits] : dyn_lmap[bits];
        boff += code & 15;
        code >>>= 4;
        /* 0-255 are literals, 256 is end of block token, 257+ are copy tokens */

        if ((code >>> 8 & 0xFF) === 0) outbuf[woff++] = code;else if (code == 256) break;else {
          code -= 257;
          var len_eb = code < 8 ? 0 : code - 4 >> 2;
          if (len_eb > 5) len_eb = 0;
          var tgt = woff + LEN_LN[code];
          /* length extra bits */

          if (len_eb > 0) {
            tgt += read_bits_n(data, boff, len_eb);
            boff += len_eb;
          }
          /* dist code */


          bits = read_bits_n(data, boff, max_len_2);
          code = header >>> 1 == 1 ? fix_dmap[bits] : dyn_dmap[bits];
          boff += code & 15;
          code >>>= 4;
          var dst_eb = code < 4 ? 0 : code - 2 >> 1;
          var dst = DST_LN[code];
          /* dist extra bits */

          if (dst_eb > 0) {
            dst += read_bits_n(data, boff, dst_eb);
            boff += dst_eb;
          }
          /* in the common case, manual byte copy is faster than TA set / Buffer copy */


          if (!usz && OL < tgt) {
            outbuf = realloc(outbuf, tgt);
            OL = outbuf.length;
          }

          while (woff < tgt) {
            outbuf[woff] = outbuf[woff - dst];
            ++woff;
          }
        }
      }
    }

    return [usz ? outbuf : outbuf.slice(0, woff), boff + 7 >>> 3];
  }

  function _inflate(payload, usz) {
    var data = payload.slice(payload.l || 0);
    var out = inflate(data, usz);
    payload.l += out[1];
    return out[0];
  }

  function warn_or_throw(wrn, msg) {
    if (wrn) {
      if (typeof console !== 'undefined') console.error(msg);
    } else throw new Error(msg);
  }

  function parse_zip(file, options) {
    var blob = file;
    prep_blob(blob, 0);
    var FileIndex = [],
        FullPaths = [];
    var o = {
      FileIndex: FileIndex,
      FullPaths: FullPaths
    };
    init_cfb(o, {
      root: options.root
    });
    /* find end of central directory, start just after signature */

    var i = blob.length - 4;

    while ((blob[i] != 0x50 || blob[i + 1] != 0x4b || blob[i + 2] != 0x05 || blob[i + 3] != 0x06) && i >= 0) --i;

    blob.l = i + 4;
    /* parse end of central directory */

    blob.l += 4;
    var fcnt = blob.read_shift(2);
    blob.l += 6;
    var start_cd = blob.read_shift(4);
    /* parse central directory */

    blob.l = start_cd;

    for (i = 0; i < fcnt; ++i) {
      /* trust local file header instead of CD entry */
      blob.l += 20;
      var csz = blob.read_shift(4);
      var usz = blob.read_shift(4);
      var namelen = blob.read_shift(2);
      var efsz = blob.read_shift(2);
      var fcsz = blob.read_shift(2);
      blob.l += 8;
      var offset = blob.read_shift(4);
      var EF = parse_extra_field(blob.slice(blob.l + namelen, blob.l + namelen + efsz));
      blob.l += namelen + efsz + fcsz;
      var L = blob.l;
      blob.l = offset + 4;
      parse_local_file(blob, csz, usz, o, EF);
      blob.l = L;
    }

    return o;
  }
  /* head starts just after local file header signature */


  function parse_local_file(blob, csz, usz, o, EF) {
    /* [local file header] */
    blob.l += 2;
    var flags = blob.read_shift(2);
    var meth = blob.read_shift(2);
    var date = parse_dos_date(blob);
    if (flags & 0x2041) throw new Error("Unsupported ZIP encryption");
    var crc32 = blob.read_shift(4);

    var _csz = blob.read_shift(4);

    var _usz = blob.read_shift(4);

    var namelen = blob.read_shift(2);
    var efsz = blob.read_shift(2); // TODO: flags & (1<<11) // UTF8

    var name = "";

    for (var i = 0; i < namelen; ++i) name += String.fromCharCode(blob[blob.l++]);

    if (efsz) {
      var ef = parse_extra_field(blob.slice(blob.l, blob.l + efsz));
      if ((ef[0x5455] || {}).mt) date = ef[0x5455].mt;
      if (((EF || {})[0x5455] || {}).mt) date = EF[0x5455].mt;
    }

    blob.l += efsz;
    /* [encryption header] */

    /* [file data] */

    var data = blob.slice(blob.l, blob.l + _csz);

    switch (meth) {
      case 8:
        data = _inflateRawSync(blob, _usz);
        break;

      case 0:
        break;

      default:
        throw new Error("Unsupported ZIP Compression method " + meth);
    }
    /* [data descriptor] */


    var wrn = false;

    if (flags & 8) {
      crc32 = blob.read_shift(4);

      if (crc32 == 0x08074b50) {
        crc32 = blob.read_shift(4);
        wrn = true;
      }

      _csz = blob.read_shift(4);
      _usz = blob.read_shift(4);
    }

    if (_csz != csz) warn_or_throw(wrn, "Bad compressed size: " + csz + " != " + _csz);
    if (_usz != usz) warn_or_throw(wrn, "Bad uncompressed size: " + usz + " != " + _usz);

    var _crc32 = CRC32.buf(data, 0);

    if (crc32 >> 0 != _crc32 >> 0) warn_or_throw(wrn, "Bad CRC32 checksum: " + crc32 + " != " + _crc32);
    cfb_add(o, name, data, {
      unsafe: true,
      mt: date
    });
  }

  function write_zip(cfb, options) {
    var _opts = options || {};

    var out = [],
        cdirs = [];
    var o = new_buf(1);
    var method = _opts.compression ? 8 : 0,
        flags = 0;
    var i = 0,
        j = 0;
    var start_cd = 0,
        fcnt = 0;
    var root = cfb.FullPaths[0],
        fp = root,
        fi = cfb.FileIndex[0];
    var crcs = [];
    var sz_cd = 0;

    for (i = 1; i < cfb.FullPaths.length; ++i) {
      fp = cfb.FullPaths[i].slice(root.length);
      fi = cfb.FileIndex[i];
      if (!fi.size || !fi.content || fp == "\u0001Sh33tJ5") continue;
      var start = start_cd;
      /* TODO: CP437 filename */

      var namebuf = new_buf(fp.length);

      for (j = 0; j < fp.length; ++j) namebuf.write_shift(1, fp.charCodeAt(j) & 0x7F);

      namebuf = namebuf.slice(0, namebuf.l);
      crcs[fcnt] = CRC32.buf(fi.content, 0);
      var outbuf = fi.content;
      if (method == 8) outbuf = _deflateRawSync(outbuf);
      /* local file header */

      o = new_buf(30);
      o.write_shift(4, 0x04034b50);
      o.write_shift(2, 20);
      o.write_shift(2, flags);
      o.write_shift(2, method);
      /* TODO: last mod file time/date */

      if (fi.mt) write_dos_date(o, fi.mt);else o.write_shift(4, 0);
      o.write_shift(-4,  crcs[fcnt]);
      o.write_shift(4,  outbuf.length);
      o.write_shift(4,  fi.content.length);
      o.write_shift(2, namebuf.length);
      o.write_shift(2, 0);
      start_cd += o.length;
      out.push(o);
      start_cd += namebuf.length;
      out.push(namebuf);
      /* TODO: encryption header ? */

      start_cd += outbuf.length;
      out.push(outbuf);
      /* central directory */


      o = new_buf(46);
      o.write_shift(4, 0x02014b50);
      o.write_shift(2, 0);
      o.write_shift(2, 20);
      o.write_shift(2, flags);
      o.write_shift(2, method);
      o.write_shift(4, 0);
      /* TODO: last mod file time/date */

      o.write_shift(-4, crcs[fcnt]);
      o.write_shift(4, outbuf.length);
      o.write_shift(4, fi.content.length);
      o.write_shift(2, namebuf.length);
      o.write_shift(2, 0);
      o.write_shift(2, 0);
      o.write_shift(2, 0);
      o.write_shift(2, 0);
      o.write_shift(4, 0);
      o.write_shift(4, start);
      sz_cd += o.l;
      cdirs.push(o);
      sz_cd += namebuf.length;
      cdirs.push(namebuf);
      ++fcnt;
    }
    /* end of central directory */


    o = new_buf(22);
    o.write_shift(4, 0x06054b50);
    o.write_shift(2, 0);
    o.write_shift(2, 0);
    o.write_shift(2, fcnt);
    o.write_shift(2, fcnt);
    o.write_shift(4, sz_cd);
    o.write_shift(4, start_cd);
    o.write_shift(2, 0);
    return bconcat([bconcat(out), bconcat(cdirs), o]);
  }

  var ContentTypeMap = {
    "htm": "text/html",
    "xml": "text/xml",
    "gif": "image/gif",
    "jpg": "image/jpeg",
    "png": "image/png",
    "mso": "application/x-mso",
    "thmx": "application/vnd.ms-officetheme",
    "sh33tj5": "application/octet-stream"
  };

  function get_content_type(fi, fp) {
    if (fi.ctype) return fi.ctype;
    var ext = fi.name || "",
        m = ext.match(/\.([^\.]+)$/);
    if (m && ContentTypeMap[m[1]]) return ContentTypeMap[m[1]];

    if (fp) {
      m = (ext = fp).match(/[\.\\]([^\.\\])+$/);
      if (m && ContentTypeMap[m[1]]) return ContentTypeMap[m[1]];
    }

    return "application/octet-stream";
  }
  /* 76 character chunks TODO: intertwine encoding */


  function write_base64_76(bstr) {
    var data = Base64.encode(bstr);
    var o = [];

    for (var i = 0; i < data.length; i += 76) o.push(data.slice(i, i + 76));

    return o.join("\r\n") + "\r\n";
  }
  /*
  Rules for QP:
  	- escape =## applies for all non-display characters and literal "="
  	- space or tab at end of line must be encoded
  	- \r\n newlines can be preserved, but bare \r and \n must be escaped
  	- lines must not exceed 76 characters, use soft breaks =\r\n
  
  TODO: Some files from word appear to write line extensions with bare equals:
  
  ```
  <table class=3DMsoTableGrid border=3D1 cellspacing=3D0 cellpadding=3D0 width=
  ="70%"
  ```
  */


  function write_quoted_printable(text) {
    var encoded = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function (c) {
      var w = c.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (w.length == 1 ? "0" + w : w);
    });
    encoded = encoded.replace(/ $/mg, "=20").replace(/\t$/mg, "=09");
    if (encoded.charAt(0) == "\n") encoded = "=0D" + encoded.slice(1);
    encoded = encoded.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, "\n=0A").replace(/([^\r\n])\n/mg, "$1=0A");
    var o = [],
        split = encoded.split("\r\n");

    for (var si = 0; si < split.length; ++si) {
      var str = split[si];

      if (str.length == 0) {
        o.push("");
        continue;
      }

      for (var i = 0; i < str.length;) {
        var end = 76;
        var tmp = str.slice(i, i + end);
        if (tmp.charAt(end - 1) == "=") end--;else if (tmp.charAt(end - 2) == "=") end -= 2;else if (tmp.charAt(end - 3) == "=") end -= 3;
        tmp = str.slice(i, i + end);
        i += end;
        if (i < str.length) tmp += "=";
        o.push(tmp);
      }
    }

    return o.join("\r\n");
  }

  function parse_quoted_printable(data) {
    var o = [];
    /* unify long lines */

    for (var di = 0; di < data.length; ++di) {
      var line = data[di];

      while (di <= data.length && line.charAt(line.length - 1) == "=") line = line.slice(0, line.length - 1) + data[++di];

      o.push(line);
    }
    /* decode */


    for (var oi = 0; oi < o.length; ++oi) o[oi] = o[oi].replace(/=[0-9A-Fa-f]{2}/g, function ($$) {
      return String.fromCharCode(parseInt($$.slice(1), 16));
    });

    return s2a(o.join("\r\n"));
  }

  function parse_mime(cfb, data, root) {
    var fname = "",
        cte = "",
        ctype = "",
        fdata;
    var di = 0;

    for (; di < 10; ++di) {
      var line = data[di];
      if (!line || line.match(/^\s*$/)) break;
      var m = line.match(/^(.*?):\s*([^\s].*)$/);
      if (m) switch (m[1].toLowerCase()) {
        case "content-location":
          fname = m[2].trim();
          break;

        case "content-type":
          ctype = m[2].trim();
          break;

        case "content-transfer-encoding":
          cte = m[2].trim();
          break;
      }
    }

    ++di;

    switch (cte.toLowerCase()) {
      case 'base64':
        fdata = s2a(Base64.decode(data.slice(di).join("")));
        break;

      case 'quoted-printable':
        fdata = parse_quoted_printable(data.slice(di));
        break;

      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + cte);
    }

    var file = cfb_add(cfb, fname.slice(root.length), fdata, {
      unsafe: true
    });
    if (ctype) file.ctype = ctype;
  }

  function parse_mad(file, options) {
    if (a2s(file.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var root = options && options.root || ""; // $FlowIgnore

    var data = (has_buf && Buffer.isBuffer(file) ? file.toString("binary") : a2s(file)).split("\r\n");
    var di = 0,
        row = "";
    /* if root is not specified, scan for the common prefix */

    for (di = 0; di < data.length; ++di) {
      row = data[di];
      if (!/^Content-Location:/i.test(row)) continue;
      row = row.slice(row.indexOf("file"));
      if (!root) root = row.slice(0, row.lastIndexOf("/") + 1);
      if (row.slice(0, root.length) == root) continue;

      while (root.length > 0) {
        root = root.slice(0, root.length - 1);
        root = root.slice(0, root.lastIndexOf("/") + 1);
        if (row.slice(0, root.length) == root) break;
      }
    }

    var mboundary = (data[1] || "").match(/boundary="(.*?)"/);
    if (!mboundary) throw new Error("MAD cannot find boundary");
    var boundary = "--" + (mboundary[1] || "");
    var FileIndex = [],
        FullPaths = [];
    var o = {
      FileIndex: FileIndex,
      FullPaths: FullPaths
    };
    init_cfb(o);
    var start_di,
        fcnt = 0;

    for (di = 0; di < data.length; ++di) {
      var line = data[di];
      if (line !== boundary && line !== boundary + "--") continue;
      if (fcnt++) parse_mime(o, data.slice(start_di, di), root);
      start_di = di;
    }

    return o;
  }

  function write_mad(cfb, options) {
    var opts = options || {};
    var boundary = opts.boundary || "SheetJS";
    boundary = '------=' + boundary;
    var out = ['MIME-Version: 1.0', 'Content-Type: multipart/related; boundary="' + boundary.slice(2) + '"', '', '', ''];
    var root = cfb.FullPaths[0],
        fp = root,
        fi = cfb.FileIndex[0];

    for (var i = 1; i < cfb.FullPaths.length; ++i) {
      fp = cfb.FullPaths[i].slice(root.length);
      fi = cfb.FileIndex[i];
      if (!fi.size || !fi.content || fp == "\u0001Sh33tJ5") continue;
      /* Normalize filename */

      fp = fp.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function (c) {
        return "_x" + c.charCodeAt(0).toString(16) + "_";
      }).replace(/[\u0080-\uFFFF]/g, function (u) {
        return "_u" + u.charCodeAt(0).toString(16) + "_";
      });
      /* Extract content as binary string */

      var ca = fi.content; // $FlowIgnore

      var cstr = has_buf && Buffer.isBuffer(ca) ? ca.toString("binary") : a2s(ca);
      /* 4/5 of first 1024 chars ascii -> quoted printable, else base64 */

      var dispcnt = 0,
          L = Math.min(1024, cstr.length),
          cc = 0;

      for (var csl = 0; csl <= L; ++csl) if ((cc = cstr.charCodeAt(csl)) >= 0x20 && cc < 0x80) ++dispcnt;

      var qp = dispcnt >= L * 4 / 5;
      out.push(boundary);
      out.push('Content-Location: ' + (opts.root || 'file:///C:/SheetJS/') + fp);
      out.push('Content-Transfer-Encoding: ' + (qp ? 'quoted-printable' : 'base64'));
      out.push('Content-Type: ' + get_content_type(fi, fp));
      out.push('');
      out.push(qp ? write_quoted_printable(cstr) : write_base64_76(cstr));
    }

    out.push(boundary + '--\r\n');
    return out.join("\r\n");
  }

  function cfb_new(opts) {
    var o = {};
    init_cfb(o, opts);
    return o;
  }

  function cfb_add(cfb, name, content, opts) {
    var unsafe = opts && opts.unsafe;
    if (!unsafe) init_cfb(cfb);
    var file = !unsafe && CFB.find(cfb, name);

    if (!file) {
      var fpath = cfb.FullPaths[0];
      if (name.slice(0, fpath.length) == fpath) fpath = name;else {
        if (fpath.slice(-1) != "/") fpath += "/";
        fpath = (fpath + name).replace("//", "/");
      }
      file = {
        name: filename(name),
        type: 2
      };
      cfb.FileIndex.push(file);
      cfb.FullPaths.push(fpath);
      if (!unsafe) CFB.utils.cfb_gc(cfb);
    }

    file.content = content;
    file.size = content ? content.length : 0;

    if (opts) {
      if (opts.CLSID) file.clsid = opts.CLSID;
      if (opts.mt) file.mt = opts.mt;
      if (opts.ct) file.ct = opts.ct;
    }

    return file;
  }

  function cfb_del(cfb, name) {
    init_cfb(cfb);
    var file = CFB.find(cfb, name);
    if (file) for (var j = 0; j < cfb.FileIndex.length; ++j) if (cfb.FileIndex[j] == file) {
      cfb.FileIndex.splice(j, 1);
      cfb.FullPaths.splice(j, 1);
      return true;
    }
    return false;
  }

  function cfb_mov(cfb, old_name, new_name) {
    init_cfb(cfb);
    var file = CFB.find(cfb, old_name);
    if (file) for (var j = 0; j < cfb.FileIndex.length; ++j) if (cfb.FileIndex[j] == file) {
      cfb.FileIndex[j].name = filename(new_name);
      cfb.FullPaths[j] = new_name;
      return true;
    }
    return false;
  }

  function cfb_gc(cfb) {
    rebuild_cfb(cfb, true);
  }

  exports.find = find;
  exports.read = read;
  exports.parse = parse;
  exports.write = write;
  exports.writeFile = write_file;
  exports.utils = {
    cfb_new: cfb_new,
    cfb_add: cfb_add,
    cfb_del: cfb_del,
    cfb_mov: cfb_mov,
    cfb_gc: cfb_gc,
    ReadShift: ReadShift,
    CheckField: CheckField,
    prep_blob: prep_blob,
    bconcat: bconcat,
    use_zlib: use_zlib,
    _deflateRaw: _deflate,
    _inflateRaw: _inflate,
    consts: consts
  };
  return exports;
}();

if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined' && typeof DO_NOT_EXPORT_CFB === 'undefined') {
  module.exports = CFB;
}
});

var cfb$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), cfb, {
  'default': cfb
}));

/**
 * wrapper around SheetJS CFB to produce FAT-like compound file
 * terminology:
 * 'storage': directory in the cfb
 * 'stream' : file in the cfb
 * */
class CFBStorage {
  /** underlying cfb container */

  /** the current path all new storages and streams will be added to*/
  constructor(cfb$1) {
    _defineProperty(this, "_cfb", void 0);

    _defineProperty(this, "_path", void 0);

    this._cfb = cfb$1 || cfb.utils.cfb_new();
    this._path = '';
  }
  /**
   * add substorage to this (doesn't modify the underlying CFBContainer)
   * @param name {string} name of the subdir
   * @returns {CFBStorage} a storage that will add storage and streams to the subdir
   * */


  addStorage(name) {
    const child = new CFBStorage(this._cfb);
    child._path = this._path + '/' + name;
    return child;
  }
  /**
   *
   */


  getStorage(name) {
    return this.addStorage(name);
  }
  /**
   * add a stream (file) to the cfb at the current _path. creates all parent dirs if they don't exist yet
   * should the stream already exist, this will replace the contents.
   * @param name {string} the name of the new stream
   * @param content {Uint8Array} the contents of the stream
   * @return {void}
   * */


  addStream(name, content) {
    const entryIndex = this._getEntryIndex(name);

    if (entryIndex < 0) {
      cfb.utils.cfb_add(this._cfb, this._path + '/' + name, content);
    } else {
      this._cfb.FileIndex[entryIndex].content = content;
    }
  }
  /**
   * get the contents of a stream or an empty array
   * @param name {string} the name of the stream
   * @return {Uint8Array} the contents of the named stream, empty if it wasn't found
   * TODO: should this be absolute?
   */


  getStream(name) {
    const entryIndex = this._getEntryIndex(name);

    return entryIndex < 0 ? Uint8Array.of() : Uint8Array.from(this._cfb.FileIndex[entryIndex].content);
  }
  /** write the contents of the cfb container to a byte array */


  toBytes() {
    // TODO: CFB.write may return a string if the correct option is given
    return Uint8Array.from(cfb.write(this._cfb));
  }

  _getEntryIndex(name) {
    return this._cfb.FullPaths.findIndex(p => p === this._path + "/" + name);
  }

}

const MessageImportance = Object.freeze({
  IMPORTANCE_LOW: 0,
  IMPORTANCE_NORMAL: 1,
  IMPORTANCE_HIGH: 2
});
const MessageIconIndex = Object.freeze({
  NewMail: 0x00000000,
  Post: 0x00000001,
  Other: 0x00000003,
  ReadMail: 0x00000100,
  UnreadMail: 0x00000101,
  SubmittedMail: 0x00000102,
  UnsentMail: 0x00000103,
  ReceiptMail: 0x00000104,
  RepliedMail: 0x00000105,
  ForwardedMail: 0x00000106,
  RemoteMail: 0x00000107,
  DeliveryReceipt: 0x00000108,
  ReadReceipt: 0x00000109,
  NondeliveryReport: 0x0000010A,
  NonReadReceipt: 0x0000010B,
  RecallSMail: 0x0000010C,
  RecallFMail: 0x0000010D,
  TrackingMail: 0x0000010E,
  OutOfOfficeMail: 0x0000011B,
  RecallMail: 0x0000011C,
  TrackedMail: 0x00000130,
  Contact: 0x00000200,
  DistributionList: 0x00000202,
  StickyNoteBlue: 0x00000300,
  StickyNoteGreen: 0x00000301,
  StickyNotePink: 0x00000302,
  StickyNoteYellow: 0x00000303,
  StickyNoteWhite: 0x00000304,
  SingleInstanceAppointment: 0x00000400,
  RecurringAppointment: 0x00000401,
  SingleInstanceMeeting: 0x00000402,
  RecurringMeeting: 0x00000403,
  MeetingRequest: 0x00000404,
  Accept: 0x00000405,
  Decline: 0x00000406,
  Tentatively: 0x00000407,
  Cancellation: 0x00000408,
  InformationalUpdate: 0x00000409,
  TaskTask: 0x00000500,
  UnassignedRecurringTask: 0x00000501,
  AssigneesTask: 0x00000502,
  AssignersTask: 0x00000503,
  TaskRequest: 0x00000504,
  TaskAcceptance: 0x00000505,
  TaskRejection: 0x00000506,
  JournalConversation: 0x00000601,
  JournalEmailMessage: 0x00000602,
  JournalMeetingRequest: 0x00000603,
  JournalMeetingResponse: 0x00000604,
  JournalTaskRequest: 0x00000606,
  JournalTaskResponse: 0x00000607,
  JournalNote: 0x00000608,
  JournalFax: 0x00000609,
  JournalPhoneCall: 0x0000060A,
  JournalLetter: 0x0000060C,
  JournalMicrosoftOfficeWord: 0x0000060D,
  JournalMicrosoftOfficeExcel: 0x0000060E,
  JournalMicrosoftOfficePowerPoint: 0x0000060F,
  JournalMicrosoftOfficeAccess: 0x00000610,
  JournalDocument: 0x00000612,
  JournalMeeting: 0x00000613,
  JournalMeetingCancellation: 0x00000614,
  JournalRemoteSession: 0x00000615
});
const MapiObjectType = Object.freeze({
  // Address book container object
  MAPI_ABCONT: 4,
  // Address book object
  MAPI_ADDRBOOK: 2,
  // Message attachment object
  MAPI_ATTACH: 7,
  // Distribution list object
  MAPI_DISTLIST: 8,
  // Folder object
  MAPI_FOLDER: 3,
  // Form object
  MAPI_FORMINFO: 12,
  // Messaging user object
  MAPI_MAILUSER: 6,
  // Message object
  MAPI_MESSAGE: 5,
  // Profile section object
  MAPI_PROFSECT: 9,
  // Session object
  MAPI_SESSION: 11,
  // Status object
  MAPI_STATUS: 10,
  // Message store object
  MAPI_STORE: 1
});
const RecipientRowDisplayType = Object.freeze({
  // A messaging user
  MessagingUser: 0x00,
  // A distribution list
  DistributionList: 0x01,
  // A forum, such as a bulletin board service or a public or shared folder
  Forum: 0x02,
  // An automated agent
  AutomatedAgent: 0x03,
  // An Address Book object defined for a large group, such as helpdesk, accounting, coordinator, or
  // department
  AddressBook: 0x04,
  // A private, personally administered distribution list
  PrivateDistributionList: 0x05,
  // An Address Book object known to be from a foreign or remote messaging system
  RemoteAddressBook: 0x06
});
const RecipientType = Object.freeze({
  // The recipient is the message originator
  Originator: 0x0000,
  // The recipient is a primary (To) recipient. Clients are required to handle primary recipients. All other types are optional.
  To: 0x0001,
  // The recipient is a carbon copy (CC) recipient, a recipient that receives a message in addition to the primary recipients.
  Cc: 0x0002,
  // The recipient is a blind carbon copy (BCC) recipient. Primary and carbon copy recipients are unaware of the existence of BCC recipients.
  Bcc: 0x0003,
  // The recipient is a resource (e.g. a room)
  Resource: 0x0004,
  // The recipient is a room (uses PR_RECIPIENT_TYPE_EXE) needs Exchange 2007 or higher
  Room: 0x0007
});
// The type of a property in the properties stream
/// </summary>
const PropertyType = Object.freeze({
  // Any: this property type value matches any type; a server MUST return the actual type in its response. Servers
  // MUST NOT return this type in response to a client request other than NspiGetIDsFromNames or the
  // RopGetPropertyIdsFromNamesROP request ([MS-OXCROPS] section 2.2.8.1). (PT_UNSPECIFIED)
  PT_UNSPECIFIED: 0x0000,
  // None: This property is a placeholder. (PT_NULL)
  PT_NULL: 0x0001,
  // 2 bytes; a 16-bit integer (PT_I2, i2, ui2)
  PT_SHORT: 0x0002,
  // 4 bytes; a 32-bit integer (PT_LONG, PT_I4, int, ui4)
  PT_LONG: 0x0003,
  // 4 bytes; a 32-bit floating point number (PT_FLOAT, PT_R4, float, r4)
  PT_FLOAT: 0x0004,
  // 8 bytes; a 64-bit floating point number (PT_DOUBLE, PT_R8, r8)
  PT_DOUBLE: 0x0005,
  // 8 bytes; a 64-bit floating point number in which the whole number part represents the number of days since
  // December 30, 1899, and the fractional part represents the fraction of a day since midnight (PT_APPTIME)
  PT_APPTIME: 0x0007,
  // 4 bytes; a 32-bit integer encoding error information as specified in section 2.4.1. (PT_ERROR)
  PT_ERROR: 0x000A,
  // 1 byte; restricted to 1 or 0 (PT_BOOLEAN. bool)
  PT_BOOLEAN: 0x000B,
  // The property value is a Component Object Model (COM) object, as specified in section 2.11.1.5. (PT_OBJECT)
  PT_OBJECT: 0x000D,
  // 8 bytes; a 64-bit integer (PT_LONGLONG, PT_I8, i8, ui8)
  PT_I8: 0x0014,
  // 8 bytes; a 64-bit integer (PT_LONGLONG, PT_I8, i8, ui8)
  PT_LONGLONG: 0x0014,
  // Variable size; a string of Unicode characters in UTF-16LE format encoding with terminating null character
  // (0x0000). (PT_UNICODE, string)
  PT_UNICODE: 0x001F,
  // Variable size; a string of multibyte characters in externally specified encoding with terminating null
  // character (single 0 byte). (PT_STRING8) ... ANSI format
  PT_STRING8: 0x001E,
  // 8 bytes; a 64-bit integer representing the number of 100-nanosecond intervals since January 1, 1601
  // (PT_SYSTIME, time, datetime, datetime.tz, datetime.rfc1123, Date, time, time.tz)
  PT_SYSTIME: 0x0040,
  // 16 bytes; a GUID with Data1, Data2, and Data3 fields in little-endian format (PT_CLSID, UUID)
  PT_CLSID: 0x0048,
  // Variable size; a 16-bit COUNT field followed by a structure as specified in section 2.11.1.4. (PT_SVREID)
  PT_SVREID: 0x00FB,
  // Variable size; a byte array representing one or more Restriction structures as specified in section 2.12.
  // (PT_SRESTRICT)
  PT_SRESTRICT: 0x00FD,
  // Variable size; a 16-bit COUNT field followed by that many rule (4) action (3) structures, as specified in
  // [MS-OXORULE] section 2.2.5. (PT_ACTIONS)
  PT_ACTIONS: 0x00FE,
  // Variable size; a COUNT field followed by that many bytes. (PT_BINARY)
  PT_BINARY: 0x0102,
  // Variable size; a COUNT field followed by that many PT_MV_SHORT values. (PT_MV_SHORT, PT_MV_I2, mv.i2)
  PT_MV_SHORT: 0x1002,
  // Variable size; a COUNT field followed by that many PT_MV_LONG values. (PT_MV_LONG, PT_MV_I4, mv.i4)
  PT_MV_LONG: 0x1003,
  // Variable size; a COUNT field followed by that many PT_MV_FLOAT values. (PT_MV_FLOAT, PT_MV_R4, mv.float)
  PT_MV_FLOAT: 0x1004,
  // Variable size; a COUNT field followed by that many PT_MV_DOUBLE values. (PT_MV_DOUBLE, PT_MV_R8)
  PT_MV_DOUBLE: 0x1005,
  // Variable size; a COUNT field followed by that many PT_MV_CURRENCY values. (PT_MV_CURRENCY, mv.fixed.14.4)
  PT_MV_CURRENCY: 0x1006,
  // Variable size; a COUNT field followed by that many PT_MV_APPTIME values. (PT_MV_APPTIME)
  PT_MV_APPTIME: 0x1007,
  // Variable size; a COUNT field followed by that many PT_MV_LONGLONGvalues. (PT_MV_I8, PT_MV_I8)
  PT_MV_LONGLONG: 0x1014,
  // Variable size; a COUNT field followed by that many PT_MV_UNICODE values. (PT_MV_UNICODE)
  PT_MV_TSTRING: 0x101F,
  // Variable size; a COUNT field followed by that many PT_MV_UNICODE values. (PT_MV_UNICODE)
  PT_MV_UNICODE: 0x101F,
  // Variable size; a COUNT field followed by that many PT_MV_STRING8 values. (PT_MV_STRING8, mv.string)
  PT_MV_STRING8: 0x101E,
  // Variable size; a COUNT field followed by that many PT_MV_SYSTIME values. (PT_MV_SYSTIME)
  PT_MV_SYSTIME: 0x1040,
  // Variable size; a COUNT field followed by that many PT_MV_CLSID values. (PT_MV_CLSID, mv.uuid)
  PT_MV_CLSID: 0x1048,
  // Variable size; a COUNT field followed by that many PT_MV_BINARY values. (PT_MV_BINARY, mv.bin.hex)
  PT_MV_BINARY: 0x1102
});
// Flags used to set on a <see cref="Structures.Property" />
// See https://msdn.microsoft.com/en-us/library/ee158556(v=exchg.80).aspx
const PropertyFlag = Object.freeze({
  // If this flag is set for a property, that property MUST NOT be deleted from the .msg file
  // (irrespective of which storage it is contained in) and implementations MUST return an error
  // if any attempt is made to do so. This flag is set in circumstances where the implementation
  // depends on that property always being present in the .msg file once it is written there.
  PROPATTR_MANDATORY: 0x00000001,
  // If this flag is not set on a property, that property MUST NOT be read from the .msg file
  // and implementations MUST return an error if any attempt is made to read it. This flag is
  // set on all properties unless there is an implementation-specific reason to prevent a property
  // from being read from the .msg file.
  PROPATTR_READABLE: 0x00000002,
  // If this flag is not set on a property, that property MUST NOT be modified or deleted and
  // implementations MUST return an error if any attempt is made to do so. This flag is set in
  // circumstances where the implementation depends on the properties being writable.
  PROPATTR_WRITABLE: 0x00000004
}); // this doesn't include combination of the flags due to flow limitations.
// don't use.

const MessageClass = Object.freeze({
  Unknown: null,
  IPM_Note: "IPM.Note",
  IPM_Note_SMIME: "IPM.Note.SMIME",
  IPM_Note_SMIME_MultipartSigned: "IPM.Note.SMIME.MultipartSigned",
  IPM_Note_Receipt_SMIME: "IPM.Note.Receipt.SMIME",
  IPM_Post: "IPM.Post",
  IPM_Octel_Voice: "IPM.Octel.Voice",
  IPM_Voicenotes: "IPM.Voicenotes",
  IPM_Sharing: "IPM.Sharing",
  REPORT_IPM_NOTE_NDR: "REPORT.IPM.NOTE.NDR",
  REPORT_IPM_NOTE_DR: "REPORT.IPM.NOTE.DR",
  REPORT_IPM_NOTE_DELAYED: "REPORT.IPM.NOTE.DELAYED",
  REPORT_IPM_NOTE_IPNRN: "*REPORT.IPM.NOTE.IPNRN",
  REPORT_IPM_NOTE_IPNNRN: "*REPORT.IPM.NOTE.IPNNRN",
  REPORT_IPM_SCHEDULE_MEETING_REQUEST_NDR: "REPORT.IPM.SCHEDULE. MEETING.REQUEST.NDR",
  REPORT_IPM_SCHEDULE_MEETING_RESP_POS_NDR: "REPORT.IPM.SCHEDULE.MEETING.RESP.POS.NDR",
  REPORT_IPM_SCHEDULE_MEETING_RESP_TENT_NDR: "REPORT.IPM.SCHEDULE.MEETING.RESP.TENT.NDR",
  REPORT_IPM_SCHEDULE_MEETING_CANCELED_NDR: "REPORT.IPM.SCHEDULE.MEETING.CANCELED.NDR",
  REPORT_IPM_NOTE_SMIME_NDR: "REPORT.IPM.NOTE.SMIME.NDR",
  REPORT_IPM_NOTE_SMIME_DR: "*REPORT.IPM.NOTE.SMIME.DR",
  REPORT_IPM_NOTE_SMIME_MULTIPARTSIGNED_NDR: "*REPORT.IPM.NOTE.SMIME.MULTIPARTSIGNED.NDR",
  REPORT_IPM_NOTE_SMIME_MULTIPARTSIGNED_DR: "*REPORT.IPM.NOTE.SMIME.MULTIPARTSIGNED.DR",
  IPM_Appointment: "IPM.Appointment",
  IPM_Task: "IPM.Task"
});
const MessageEditorFormat = Object.freeze({
  // The format for the editor to use is unknown.
  EDITOR_FORMAT_DONTKNOW: 0x00000000,
  // The editor should display the message in plain text format.
  EDITOR_FORMAT_PLAINTEXT: 0x00000001,
  // The editor should display the message in HTML format.
  EDITOR_FORMAT_HTML: 0x00000002,
  // The editor should display the message in Rich Text Format.
  EDITOR_FORMAT_RTF: 0x00000003
});
const MessageFormat = Object.freeze({
  TextOnly: 0,
  HtmlOnly: 1,
  TextAndHtml: 2
});
const MessagFlags = Object.freeze({
  // The message is marked as having been read. This can occur as the result of a call at any time to
  // IMessage::SetReadFlag or IMAPIFolder::SetReadFlags. Clients can also set this flag by calling a message's
  // IMAPIProp::SetProps method before the message has been saved for the first time. This flag is ignored if the
  // ASSOCIATED flag is set.
  MSGFLAG_READ: 0x0001,
  // The outgoing message has not been modified since the first time that it was saved; the incoming message has not
  // been modified since it was delivered.
  MSGFLAG_UNMODIFIED: 0x0002,
  // The message is marked for sending as a result of a call to IMessage::SubmitMessage. Message store providers set
  // this flag; the client has read-only access.
  MSGFLAG_SUBMIT: 0x0004,
  // The message is still being composed. It is saved, but has not been sent. The client or provider has read/write
  // access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter. If a client doesn't set
  // this flag by the time the message is sent, the message store provider sets it when IMessage::SubmitMessage is
  // called. Typically, this flag is cleared after the message is sent.
  MSGFLAG_UNSENT: 0x0008,
  // The message has at least one attachment. This flag corresponds to the message's PR_HASATTACH (PidTagHasAttachments)
  // property. The client has read-only access to this flag.
  MSGFLAG_HASATTACH: 0x0010,
  // The messaging user sending was the messaging user receiving the message. The client or provider has read/write
  // access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter. This flag is meant to be
  // set by the transport provider.
  MSGFLAG_FROMME: 0x0020,
  // The message is an associated message of a folder. The client or provider has read-only access to this flag. The
  // READ flag is ignored for associated messages, which do not retain a read/unread state.
  MSGFLAG_ASSOCIATED: 0x040,
  // The message includes a request for a resend operation with a nondelivery report. The client or provider has
  // read/write access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter.
  MSGFLAG_RESEND: 0x0080,
  // A read report needs to be sent for the message. The client or provider has read-only access to this flag.
  MSGFLAG_NOTIFYREAD: 0x100,
  // A nonread report needs to be sent for the message. The client or provider has read-only access to this flag.
  MSGFLAG_NOTIFYUNREAD: 0x0200,
  // The message has been read at least once. This flag is set or cleared by the server whenever the MSGFLAG_READ flag
  // is set or cleared.
  MSGFLAG_EVERREAD: 0x0400,
  // The incoming message arrived over an X.400 link. It originated either outside the organization or from a source the
  // gateway cannot consider trusted. The client should display an appropriate message to the user. Transport providers
  // set this flag; the client has read-only access.
  MSGFLAG_ORIGIN_X400: 0x1000,
  // The incoming message arrived over the Internet. It originated either outside the organization or from a source the
  // gateway cannot consider trusted. The client should display an appropriate message to the user. Transport providers
  // set this flag; the client has read-only access.
  MSGFLAG_ORIGIN_INTERNET: 0x2000,
  // The incoming message arrived over an external link other than X.400 or the Internet. It originated either outside
  // the organization or from a source the gateway cannot consider trusted. The client should display an appropriate
  // message to the user. Transport providers set this flag; the client has read-only access.
  MSGFLAG_ORIGIN_MISC_EXT: 0x8000
});
const MessagePriority = Object.freeze({
  PRIO_NONURGENT: 0,
  PRIO_NORMAL: 1,
  PRIO_URGENT: 2
});
const AttachmentType = Object.freeze({
  // There is no attachment
  NO_ATTACHMENT: 0x00000000,
  // The  PropertyTags.PR_ATTACH_DATA_BIN property contains the attachment data
  ATTACH_BY_VALUE: 0x00000001,
  // The "PropertyTags.PR_ATTACH_PATHNAME_W" or "PropertyTags.PR_ATTACH_LONG_PATHNAME_W"
  // property contains a fully qualified path identifying the attachment to recipients with access to a common file server
  ATTACH_BY_REFERENCE: 0x0002,
  // The "PropertyTags.PR_ATTACH_PATHNAME_W" or "PropertyTags.PR_ATTACH_LONG_PATHNAME_W"
  // property contains a fully qualified path identifying the attachment
  ATTACH_BY_REF_RESOLVE: 0x0003,
  // The "PropertyTags.PR_ATTACH_PATHNAME_W" or "PropertyTags.PR_ATTACH_LONG_PATHNAME_W"
  // property contains a fully qualified path identifying the attachment
  ATTACH_BY_REF_ONLY: 0x0004,
  // The "PropertyTags.PR_ATTACH_DATA_OBJ" (PidTagAttachDataObject) property contains an embedded object
  // that supports the IMessage interface
  ATTACH_EMBEDDED_MSG: 0x0005,
  // The attachment is an embedded OLE object
  ATTACH_OLE: 0x0006
});
const AttachmentFlags = Object.freeze({
  // Indicates that this attachment is not available to HTML rendering applications and should be ignored in
  // Multipurpose Internet Mail Extensions (MIME) processing.
  ATT_INVISIBLE_IN_HTML: 0x00000001,
  // Indicates that this attachment is not available to applications rendering in Rich Text Format (RTF) and should be
  // ignored by MAPI.
  ATT_INVISIBLE_IN_RTF: 0x00000002,
  // The Attachment object is referenced and rendered within the HTML body of the associated Message object.
  ATT_MHTML_REF: 0x00000004
});
const StoreSupportMask = Object.freeze({
  // The message store supports properties containing ANSI (8-bit) characters.
  STORE_ANSI_OK: 0x00020000,
  // The message store supports attachments (OLE or non-OLE) to messages.
  STORE_ATTACH_OK: 0x00000020,
  // The message store supports categorized views of tables.
  STORE_CATEGORIZE_OK: 0x00000400,
  // The message store supports creation of new messages.
  STORE_CREATE_OK: 0x00000010,
  // Entry identifiers for the objects in the message store are unique, that is, never reused during the life of the
  // store.
  STORE_ENTRYID_UNIQUE: 0x00000001,
  // The message store supports HTML messages, stored in the <see cref="PropertyTags.PR_HTML" /> (PidTagBodyHtml)
  // property. Note that STORE_HTML_OK is not defined in versions of MAPIDEFS.H that are included with Microsoft Exchange
  // 2000 Server and earlier. If your development environment uses a MAPIDEFS.H file that does not include STORE_HTML_OK,
  // use the value 0x00010000 instead.
  STORE_HTML_OK: 0x00010000,
  // In a wrapped PST store, indicates that when a new message arrives at the store, the store does rules and spam
  // filter processing on the message separately. The store calls IMAPISupport::Notify, setting fnevNewMail in the
  // NOTIFICATION structure that is passed as a parameter, and then passes the details of the new message to the
  // listening client. Subsequently, when the listening client receives the notification, it does not process rules on
  // the message.
  STORE_ITEMPROC: 0x00200000,
  // This flag is reserved and should not be used.
  STORE_LOCALSTORE: 0x00080000,
  // The message store supports modification of its existing messages.
  STORE_MODIFY_OK: 0x00000008,
  // The message store supports multivalued properties, guarantees the stability of value order in a multivalued
  // property throughout a save operation, and supports instantiation of multivalued properties in tables.
  STORE_MV_PROPS_OK: 0x00000200,
  // The message store supports notifications.
  STORE_NOTIFY_OK: 0x00000100,
  // The message store supports OLE attachments. The OLE data is accessible through an IStorage interface, such as that
  // available through the PR_ATTACH_DATA_OBJ (PidTagAttachDataObject) property
  STORE_OLE_OK: 0x00000040,
  // The folders in this store are public (multi-user), not private (possibly multi-instance but not multi-user).
  STORE_PUBLIC_FOLDERS: 0x00004000,
  // The MAPI Protocol Handler will not crawl the store, and the store is responsible to push any changes through
  // notifications to the indexer to have messages indexed.
  STORE_PUSHER_OK: 0x00800000,
  // All interfaces for the message store have a read-only access level.
  STORE_READONLY: 0x00000002,
  // The message store supports restrictions.
  STORE_RESTRICTION_OK: 0x00001000,
  // The message store supports Rich Text Format (RTF) messages, usually compressed, and the store itself keeps
  // <see cref="PropertyTags.PR_BODY_W" /> and <see cref="PropertyTags.PR_RTF_COMPRESSED" /> synchronized.
  STORE_RTF_OK: 0x00000800,
  // The message store supports search-results folders.
  STORE_SEARCH_OK: 0x00000004,
  // The message store supports sorting views of tables.
  STORE_SORT_OK: 0x00002000,
  // The message store supports marking a message for submission.
  STORE_SUBMIT_OK: 0x00000080,
  // The message store supports storage of RTF messages in uncompressed form. An uncompressed RTF stream is identified
  // by the value dwMagicUncompressedRTF in the stream header. The dwMagicUncompressedRTF value is defined in the
  // RTFLIB.H file
  STORE_UNCOMPRESSED_RTF: 0x00008000,
  // The message store supports properties containing Unicode characters.
  STORE_UNICODE_OK: 0x00040000
});
const StoreSupportMaskConst = StoreSupportMask.STORE_ATTACH_OK // | StoreSupportMask.STORE_CATEGORIZE_OK
| StoreSupportMask.STORE_CREATE_OK //StoreSupportMask.STORE_ENTRYID_UNIQUE
| StoreSupportMask.STORE_MODIFY_OK // | StoreSupportMask.STORE_MV_PROPS_OK
// | StoreSupportMask.STORE_OLE_OK
// | StoreSupportMask.STORE_RTF_OK
| StoreSupportMask.STORE_HTML_OK | StoreSupportMask.STORE_UNICODE_OK; // system.net.mail.MailPriority

const MailPriority = Object.freeze({
  High: 2,
  Low: 1,
  Normal: 0
});
const ContentTransferEncoding = Object.freeze({
  SevenBit: "7bit",
  EightBit: "8bit",
  QuotedPrintable: "quoted-printable",
  Base64: "base64",
  Binary: "binary"
});

/**
 *      Contains a bitmask of flags that indicate the origin and current state of a message.
 *
 *      See https://msdn.microsoft.com/en-us/library/cc839733(v=office.15).aspx
 *      This property is a nontransmittable message property exposed at both the sending and receiving ends of a
 *      transmission, with different values depending upon the client application or store provider involved. This property
 *      is initialized by the client or message store provider when a message is created and saved for the first time and
 *      then updated periodically by the message store provider, a transport provider, and the MAPI spooler as the message
 *      is processed and its state changes.
 *      This property exists on a message both before and after submission, and on all copies of the received
 *      message. Although it is not a recipient property, it is exposed differently to each recipient according to whether
 *      it has been read or modified by that recipient.
 */
const MessageFlags = Object.freeze({
  // The message is marked as having been read. This can occur as the result of a call at any time to
  // IMessage::SetReadFlag or IMAPIFolder::SetReadFlags. Clients can also set this flag by calling a message's
  // IMAPIProp::SetProps method before the message has been saved for the first time. This flag is ignored if the
  // ASSOCIATED flag is set.
  MSGFLAG_READ: 0x0001,
  // The outgoing message has not been modified since the first time that it was saved; the incoming message has not
  // been modified since it was delivered.
  MSGFLAG_UNMODIFIED: 0x0002,
  // The message is marked for sending as a result of a call to IMessage::SubmitMessage. Message store providers set
  // this flag; the client has read-only access.
  MSGFLAG_SUBMIT: 0x0004,
  // The message is still being composed. It is saved, but has not been sent. The client or provider has read/write
  // access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter. If a client doesn't set
  // this flag by the time the message is sent, the message store provider sets it when IMessage::SubmitMessage is
  // called. Typically, this flag is cleared after the message is sent.
  MSGFLAG_UNSENT: 0x0008,
  // The message has at least one attachment. This flag corresponds to the message's PR_HASATTACH (PidTagHasAttachments)
  // property. The client has read-only access to this flag.
  MSGFLAG_HASATTACH: 0x0010,
  // The messaging user sending was the messaging user receiving the message. The client or provider has read/write
  // access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter. This flag is meant to be
  // set by the transport provider.
  MSGFLAG_FROMME: 0x0020,
  // The message is an associated message of a folder. The client or provider has read-only access to this flag. The
  // READ flag is ignored for associated messages, which do not retain a read/unread state.
  MSGFLAG_ASSOCIATED: 0x040,
  // The message includes a request for a resend operation with a nondelivery report. The client or provider has
  // read/write access to this flag until the first IMAPIProp::SaveChanges call and read-only thereafter.
  MSGFLAG_RESEND: 0x0080,
  // A read report needs to be sent for the message. The client or provider has read-only access to this flag.
  MSGFLAG_NOTIFYREAD: 0x100,
  // A nonread report needs to be sent for the message. The client or provider has read-only access to this flag.
  MSGFLAG_NOTIFYUNREAD: 0x0200,
  // The message has been read at least once. This flag is set or cleared by the server whenever the MSGFLAG_READ flag
  // is set or cleared.
  MSGFLAG_EVERREAD: 0x0400,
  // The incoming message arrived over an X.400 link. It originated either outside the organization or from a source the
  // gateway cannot consider trusted. The client should display an appropriate message to the user. Transport providers
  // set this flag; the client has read-only access.
  MSGFLAG_ORIGIN_X400: 0x1000,
  // The incoming message arrived over the Internet. It originated either outside the organization or from a source the
  // gateway cannot consider trusted. The client should display an appropriate message to the user. Transport providers
  // set this flag; the client has read-only access.
  MSGFLAG_ORIGIN_INTERNET: 0x2000,
  // The incoming message arrived over an external link other than X.400 or the Internet. It originated either outside
  // the organization or from a source the gateway cannot consider trusted. The client should display an appropriate
  // message to the user. Transport providers set this flag; the client has read-only access.
  MSGFLAG_ORIGIN_MISC_EXT: 0x8000
});
/**
 * Contains a bitmask of flags indicating the operations that are available to the client for the object.
 * See https://msdn.microsoft.com/en-us/library/office/cc979218.aspx
 * This property is read-only for the client. It must be a bitwise OR of zero or more values from the following table.
 */

const MapiAccess = Object.freeze({
  // write
  MAPI_ACCESS_MODIFY: 0x00000001,
  // read
  MAPI_ACCESS_READ: 0x00000002,
  // delete
  MAPI_ACCESS_DELETE: 0x00000004,
  // Create subfolders in the folder hierarchy
  MAPI_ACCESS_CREATE_HIERARCHY: 0x00000008,
  // Create content messages
  MAPI_ACCESS_CREATE_CONTENTS: 0x00000010,
  // Create associated content messages
  MAPI_ACCESS_CREATE_ASSOCIATED: 0x00000020
});
/**
 * Kind (1 byte): The possible values for the Kind field are in the following table.
 */

const PropertyKind = Object.freeze({
  // The property is identified by the LID field (numerical named property)
  Lid: 0x00,
  // The property is identified by the Name field (string named property)
  Name: 0x01,
  // The property does not have an associated PropertyName field.
  NotAssociated: 0xFF
});

const PropertyTagLiterals = Object.freeze({
  // The prefix for a Recipient {OpenMcdf.CFStorage
  RecipientStoragePrefix: "__recip_version1.0_#",
  // The prefix for an Attachment OpenMcdf.CFStorage
  AttachmentStoragePrefix: "__attach_version1.0_#",
  // The prefix for a PropertyTag OpenMcdf.CFStream
  SubStorageStreamPrefix: "__substg1.0_",
  // The name for the properties stream
  PropertiesStreamName: "__properties_version1.0",
  // The name id storage (named property mapping storage)
  NameIdStorage: "__nameid_version1.0",
  // The EntryStream stream
  EntryStream: "__substg1.0_00030102",
  // The GuidStream stream
  GuidStream: "__substg1.0_00020102",
  // The Streams.StringStream stream
  StringStream: "__substg1.0_00040102"
});
const PropertyTags = Object.freeze({
  //property tag literals were here
  // Contains the identifier of the mode for message acknowledgment.
  PR_ACKNOWLEDGEMENT_MODE: {
    id: 0x0001,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if the sender permits auto forwarding of this message.
  PR_ALTERNATE_RECIPIENT_ALLOWED: {
    id: 0x0002,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a list of entry identifiers for users who have authorized the sending of a message.
  PR_AUTHORIZING_USERS: {
    id: 0x0003,
    type: PropertyType.PT_BINARY
  },
  // Contains a unicode comment added by the auto-forwarding agent.
  PR_AUTO_FORWARD_COMMENT_W: {
    id: 0x0004,
    type: PropertyType.PT_UNICODE
  },
  // Contains a comment added by the auto-forwarding agent.
  PR_AUTO_FORWARD_COMMENT_A: {
    id: 0x0004,
    type: PropertyType.PT_STRING8
  },
  // Contains TRUE if the client requests an X-MS-Exchange-Organization-AutoForwarded header field.
  PR_AUTO_FORWARDED: {
    id: 0x0005,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains an identifier for the algorithm used to confirm message content confidentiality.
  PR_CONTENT_CONFIDENTIALITY_ALGORITHM_ID: {
    id: 0x0006,
    type: PropertyType.PT_BINARY
  },
  // Contains a value the message sender can use to match a report with the original message.
  PR_CONTENT_CORRELATOR: {
    id: 0x0007,
    type: PropertyType.PT_BINARY
  },
  // Contains a unicode key value that enables the message recipient to identify its content.
  PR_CONTENT_IDENTIFIER_W: {
    id: 0x0008,
    type: PropertyType.PT_UNICODE
  },
  // Contains a ANSI key value that enables the message recipient to identify its content.
  PR_CONTENT_IDENTIFIER_A: {
    id: 0x0008,
    type: PropertyType.PT_STRING8
  },
  // Contains a message length, in bytes, passed to a client application or service provider to determine if a message
  // of that length can be delivered.
  PR_CONTENT_LENGTH: {
    id: 0x0009,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if a message should be returned with a nondelivery report.
  PR_CONTENT_RETURN_REQUESTED: {
    id: 0x000A,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the conversation key used in Microsoft Outlook only when locating IPM.MessageManager messages, such as the
  // message that contains download history for a Post Office Protocol (POP3) account. This property has been deprecated
  // in Exchange Server.
  PR_CONVERSATION_KEY: {
    id: 0x000B,
    type: PropertyType.PT_BINARY
  },
  // Contains the encoded information types (EITs) that are applied to a message in transit to describe conversions.
  PR_CONVERSION_EITS: {
    id: 0x000C,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if a message transfer agent (MTA) is prohibited from making message text conversions that lose
  // information.
  PR_CONVERSION_WITH_LOSS_PROHIBITED: {
    id: 0x000D,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains an identifier for the types of text in a message after conversion.
  PR_CONVERTED_EITS: {
    id: 0x000E,
    type: PropertyType.PT_BINARY
  },
  // 	Contains the date and time when a message sender wants a message delivered.
  PR_DEFERRED_DELIVERY_TIME: {
    id: 0x000F,
    type: PropertyType.PT_SYSTIME
  },
  // Contains the date and time when the original message was delivered.
  PR_DELIVER_TIME: {
    id: 0x0010,
    type: PropertyType.PT_SYSTIME
  },
  // Contains a reason why a message transfer agent (MTA) has discarded a message.
  PR_DISCARD_REASON: {
    id: 0x0011,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if disclosure of recipients is allowed.
  PR_DISCLOSURE_OF_RECIPIENTS: {
    id: 0x0012,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a history showing how a distribution list has been expanded during message transmiss
  PR_DL_EXPANSION_HISTORY: {
    id: 0x0013,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if a message transfer agent (MTA) is prohibited from expanding distribution lists.
  PR_DL_EXPANSION_PROHIBITED: {
    id: 0x0014,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the date and time when the messaging system can invalidate the content of a message.
  PR_EXPIRY_TIME: {
    id: 0x0015,
    type: PropertyType.PT_SYSTIME
  },
  // Contains the date and time when the messaging system can invalidate the content of a message.
  PR_IMPLICIT_CONVERSION_PROHIBITED: {
    id: 0x0016,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a value that indicates the message sender's opinion of the importance of a message.
  PR_IMPORTANCE: {
    id: 0x0017,
    type: PropertyType.PT_LONG
  },
  // The IpmId field represents a PR_IPM_ID MAPI property.
  PR_IPM_ID: {
    id: 0x0018,
    type: PropertyType.PT_BINARY
  },
  // Contains the latest date and time when a message transfer agent (MTA) should deliver a message.
  PR_LATEST_DELIVERY_TIME: {
    id: 0x0019,
    type: PropertyType.PT_SYSTIME
  },
  // Contains a text string that identifies the sender-defined message class, such as IPM.Note.
  PR_MESSAGE_CLASS_W: {
    id: 0x001A,
    type: PropertyType.PT_UNICODE
  },
  // Contains a text string that identifies the sender-defined message class, such as IPM.Note.
  PR_MESSAGE_CLASS_A: {
    id: 0x001A,
    type: PropertyType.PT_STRING8
  },
  // Contains a message transfer system (MTS) identifier for a message delivered to a client application.
  PR_MESSAGE_DELIVERY_ID: {
    id: 0x001B,
    type: PropertyType.PT_BINARY
  },
  // Contains a security label for a message.
  PR_MESSAGE_SECURITY_LABEL: {
    id: 0x001E,
    type: PropertyType.PT_BINARY
  },
  // Contains the identifiers of messages that this message supersedes.
  PR_OBSOLETED_IPMS: {
    id: 0x001F,
    type: PropertyType.PT_BINARY
  },
  // Contains the encoded name of the originally intended recipient of an autoforwarded message.
  PR_ORIGINALLY_INTENDED_RECIPIENT_NAME: {
    id: 0x0020,
    type: PropertyType.PT_BINARY
  },
  // Contains a copy of the original encoded information types (EITs) for message text.
  PR_ORIGINAL_EITS: {
    id: 0x0021,
    type: PropertyType.PT_BINARY
  },
  // Contains an ASN.1 certificate for the message originator.
  PR_ORIGINATOR_CERTIFICATE: {
    id: 0x0022,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if a message sender requests a delivery report for a particular recipient from the messaging system
  // before the message is placed in the message store.
  PR_ORIGINATOR_DELIVERY_REPORT_REQUESTED: {
    id: 0x0023,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the binary-encoded return address of the message originator.
  PR_ORIGINATOR_RETURN_ADDRESS: {
    id: 0x0024,
    type: PropertyType.PT_BINARY
  },
  // Was originally meant to contain a value used in correlating conversation threads. No longer supported.
  PR_PARENT_KEY: {
    id: 0x0025,
    type: PropertyType.PT_BINARY
  },
  // Contains the relative priority of a message.
  PR_PRIORITY: {
    id: 0x0026,
    type: PropertyType.PT_LONG
  },
  // Contains a binary verification value enabling a delivery report recipient to verify the origin of the original
  // message.
  PR_ORIGIN_CHECK: {
    id: 0x0027,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if a message sender requests proof that the message transfer system has submitted a message for
  // delivery to the originally intended recipient.
  PR_PROOF_OF_SUBMISSION_REQUESTED: {
    id: 0x0028,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains TRUE if a message sender wants the messaging system to generate a read report when the recipient has read
  // a message.
  PR_READ_RECEIPT_REQUESTED: {
    id: 0x0029,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the date and time a delivery report is generated.
  PR_RECEIPT_TIME: {
    id: 0x002A,
    type: PropertyType.PT_SYSTIME
  },
  // Contains TRUE if recipient reassignment is prohibited.
  PR_RECIPIENT_REASSIGNMENT_PROHIBITED: {
    id: 0x002B,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains information about the route covered by a delivered message.
  PR_REDIRECTION_HISTORY: {
    id: 0x002C,
    type: PropertyType.PT_BINARY
  },
  // Contains a list of identifiers for messages to which a message is related.
  PR_RELATED_IPMS: {
    id: 0x002D,
    type: PropertyType.PT_BINARY
  },
  // Contains the sensitivity value assigned by the sender of the first version of a message — that is, the message
  // before being forwarded or replied to.
  PR_ORIGINAL_SENSITIVITY: {
    id: 0x002E,
    type: PropertyType.PT_LONG
  },
  // Contains an ASCII list of the languages incorporated in a message. UNICODE compilation.
  PR_LANGUAGES_W: {
    id: 0x002F,
    type: PropertyType.PT_UNICODE
  },
  // Contains an ASCII list of the languages incorporated in a message. Non-UNICODE compilation.
  PR_LANGUAGES_A: {
    id: 0x002F,
    type: PropertyType.PT_STRING8
  },
  // Contains the date and time by which a reply is expected for a message.
  PR_REPLY_TIME: {
    id: 0x0030,
    type: PropertyType.PT_SYSTIME
  },
  // Contains a binary tag value that the messaging system should copy to any report generated for the message.
  PR_REPORT_TAG: {
    id: 0x0031,
    type: PropertyType.PT_BINARY
  },
  // Contains the date and time when the messaging system generated a report.
  PR_REPORT_TIME: {
    id: 0x0032,
    type: PropertyType.PT_SYSTIME
  },
  // Contains TRUE if the original message is being returned with a nonread report.
  PR_RETURNED_IPM: {
    id: 0x0033,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a flag that indicates the security level of a message.
  PR_SECURITY: {
    id: 0x0034,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if this message is an incomplete copy of another message.
  PR_INCOMPLETE_COPY: {
    id: 0x0035,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a value indicating the message sender's opinion of the sensitivity of a message.
  PR_SENSITIVITY: {
    id: 0x0036,
    type: PropertyType.PT_LONG
  },
  // Contains the full subject, encoded in Unicode standard, of a message.
  PR_SUBJECT_W: {
    id: 0x0037,
    type: PropertyType.PT_UNICODE
  },
  // Contains the full subject, encoded in ANSI standard, of a message.
  PR_SUBJECT_A: {
    id: 0x0037,
    type: PropertyType.PT_STRING8
  },
  // Contains a binary value that is copied from the message for which a report is being generated.
  PR_SUBJECT_IPM: {
    id: 0x0038,
    type: PropertyType.PT_BINARY
  },
  // Contains the date and time the message sender submitted a message.
  PR_CLIENT_SUBMIT_TIME: {
    id: 0x0039,
    type: PropertyType.PT_SYSTIME
  },
  // Contains the unicode display name for the recipient that should get reports for this message.
  PR_REPORT_NAME_W: {
    id: 0x003A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the ANSI display name for the recipient that should get reports for this message.
  PR_REPORT_NAME_A: {
    id: 0x003A,
    type: PropertyType.PT_STRING8
  },
  // Contains the search key for the messaging user represented by the sender.
  PR_SENT_REPRESENTING_SEARCH_KEY: {
    id: 0x003B,
    type: PropertyType.PT_BINARY
  },
  // This property contains the content type for a submitted message.
  PR_X400_CONTENT_TYPE: {
    id: 0x003C,
    type: PropertyType.PT_BINARY
  },
  // Contains a unicode subject prefix that typically indicates some action on a messagE, such as "FW: " for forwarding.
  PR_SUBJECT_PREFIX_W: {
    id: 0x003D,
    type: PropertyType.PT_UNICODE
  },
  // Contains a ANSI subject prefix that typically indicates some action on a messagE, such as "FW: " for forwarding.
  PR_SUBJECT_PREFIX_A: {
    id: 0x003D,
    type: PropertyType.PT_STRING8
  },
  // Contains reasons why a message was not received that forms part of a non-delivery report.
  PR_NON_RECEIPT_REASON: {
    id: 0x003E,
    type: PropertyType.PT_LONG
  },
  // Contains the entry identifier of the messaging user that actually receives the message.
  PR_RECEIVED_BY_ENTRYID: {
    id: 0x003F,
    type: PropertyType.PT_BINARY
  },
  // Contains the display name of the messaging user that actually receives the message. UNICODE compilation.
  PR_RECEIVED_BY_NAME_W: {
    id: 0x0040,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name of the messaging user that actually receives the message. Non-UNICODE compilation.
  PR_RECEIVED_BY_NAME_A: {
    id: 0x0040,
    type: PropertyType.PT_STRING8
  },
  // Contains the entry identifier for the messaging user represented by the sender.
  PR_SENT_REPRESENTING_ENTRYID: {
    id: 0x0041,
    type: PropertyType.PT_BINARY
  },
  // Contains the display name for the messaging user represented by the sender. UNICODE compilation.
  PR_SENT_REPRESENTING_NAME_W: {
    id: 0x0042,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name for the messaging user represented by the sender. Non-UNICODE compilation.
  PR_SENT_REPRESENTING_NAME_A: {
    id: 0x0042,
    type: PropertyType.PT_STRING8
  },
  // Contains the display name for the messaging user represented by the receiving user. UNICODE compilation.
  PR_RCVD_REPRESENTING_NAME_W: {
    id: 0x0044,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name for the messaging user represented by the receiving user. Non-UNICODE compilation.
  PR_RCVD_REPRESENTING_NAME_A: {
    id: 0x0044,
    type: PropertyType.PT_STRING8
  },
  // Contains the entry identifier for the recipient that should get reports for this message.
  PR_REPORT_ENTRYID: {
    id: 0x0045,
    type: PropertyType.PT_BINARY
  },
  // Contains an entry identifier for the messaging user to which the messaging system should direct a read report for
  // this message.
  PR_READ_RECEIPT_ENTRYID: {
    id: 0x0046,
    type: PropertyType.PT_BINARY
  },
  // Contains a message transfer system (MTS) identifier for the message transfer agent (MTA).
  PR_MESSAGE_SUBMISSION_ID: {
    id: 0x0047,
    type: PropertyType.PT_BINARY
  },
  // Contains the date and time a transport provider passed a message to its underlying messaging system.
  PR_PROVIDER_SUBMIT_TIME: {
    id: 0x0048,
    type: PropertyType.PT_SYSTIME
  },
  // Contains the subject of an original message for use in a report about the message. UNICODE compilation.
  PR_ORIGINAL_SUBJECT_W: {
    id: 0x0049,
    type: PropertyType.PT_UNICODE
  },
  // Contains the subject of an original message for use in a report about the message. Non-UNICODE compilation.
  PR_ORIGINAL_SUBJECT_A: {
    id: 0x0049,
    type: PropertyType.PT_STRING8
  },
  // The obsolete precursor of the PR_DISCRETE_VALUES property. No longer supported.
  PR_DISC_VAL: {
    id: 0x004A,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the class of the original message for use in a report. UNICODE compilation.
  PR_ORIG_MESSAGE_CLASS_W: {
    id: 0x004B,
    type: PropertyType.PT_UNICODE
  },
  // Contains the class of the original message for use in a report. Non-UNICODE compilation.
  PR_ORIG_MESSAGE_CLASS_A: {
    id: 0x004B,
    type: PropertyType.PT_STRING8
  },
  // Contains the entry identifier of the author of the first version of a messagE, that is, the message before being
  // forwarded or replied to.
  PR_ORIGINAL_AUTHOR_ENTRYID: {
    id: 0x004C,
    type: PropertyType.PT_BINARY
  },
  // Contains the display name of the author of the first version of a messagE, that is, the message before being
  // forwarded or replied to. UNICODE compilation.
  PR_ORIGINAL_AUTHOR_NAME_W: {
    id: 0x004D,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name of the author of the first version of a messagE, that is, the message before being
  // forwarded or replied to. Non-UNICODE compilation.
  PR_ORIGINAL_AUTHOR_NAME_A: {
    id: 0x004D,
    type: PropertyType.PT_STRING8
  },
  // Contains the original submission date and time of the message in the report.
  PR_ORIGINAL_SUBMIT_TIME: {
    id: 0x004E,
    type: PropertyType.PT_SYSTIME
  },
  // Contains a sized array of entry identifiers for recipients that are to get a reply.
  PR_REPLY_RECIPIENT_ENTRIES: {
    id: 0x004F,
    type: PropertyType.PT_BINARY
  },
  // Contains a list of display names for recipients that are to get a reply. UNICODE compilation.
  PR_REPLY_RECIPIENT_NAMES_W: {
    id: 0x0050,
    type: PropertyType.PT_UNICODE
  },
  // Contains a list of display names for recipients that are to get a reply. Non-UNICODE compilation.
  PR_REPLY_RECIPIENT_NAMES_A: {
    id: 0x0050,
    type: PropertyType.PT_STRING8
  },
  // Contains the search key of the messaging user that actually receives the message.
  PR_RECEIVED_BY_SEARCH_KEY: {
    id: 0x0051,
    type: PropertyType.PT_BINARY
  },
  // Contains the search key for the messaging user represented by the receiving user.
  PR_RCVD_REPRESENTING_SEARCH_KEY: {
    id: 0x0052,
    type: PropertyType.PT_BINARY
  },
  // Contains a search key for the messaging user to which the messaging system should direct a read report for a
  // message.
  PR_READ_RECEIPT_SEARCH_KEY: {
    id: 0x0053,
    type: PropertyType.PT_BINARY
  },
  // Contains the search key for the recipient that should get reports for this message.
  PR_REPORT_SEARCH_KEY: {
    id: 0x0054,
    type: PropertyType.PT_BINARY
  },
  // Contains a copy of the original message's delivery date and time in a thread.
  PR_ORIGINAL_DELIVERY_TIME: {
    id: 0x0055,
    type: PropertyType.PT_SYSTIME
  },
  // Contains the search key of the author of the first version of a messagE, that is, the message before being
  // forwarded or replied to.
  PR_ORIGINAL_AUTHOR_SEARCH_KEY: {
    id: 0x0056,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if this messaging user is specifically named as a primary (To) recipient of this message and is not
  // part of a distribution list.
  PR_MESSAGE_TO_ME: {
    id: 0x0057,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains TRUE if this messaging user is specifically named as a carbon copy (CC) recipient of this message and is
  // not part of a distribution list.
  PR_MESSAGE_CC_ME: {
    id: 0x0058,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains TRUE if this messaging user is specifically named as a primary (To), carbon copy (CC), or blind carbon
  // copy (BCC) recipient of this message and is not part of a distribution list.
  PR_MESSAGE_RECIP_ME: {
    id: 0x0059,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the display name of the sender of the first version of a messagE, that is, the message before being
  // forwarded or replied to. UNICODE compilation.
  PR_ORIGINAL_SENDER_NAME_W: {
    id: 0x005A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name of the sender of the first version of a messagE, that is, the message before being
  // forwarded or replied to. Non-UNICODE compilation.
  PR_ORIGINAL_SENDER_NAME_A: {
    id: 0x005A,
    type: PropertyType.PT_STRING8
  },
  // Contains the entry identifier of the sender of the first version of a messagE, that is, the message before being
  // forwarded or replied to.
  PR_ORIGINAL_SENDER_ENTRYID: {
    id: 0x005B,
    type: PropertyType.PT_BINARY
  },
  // Contains the search key for the sender of the first version of a messagE, that is, the message before being
  // forwarded or replied to.
  PR_ORIGINAL_SENDER_SEARCH_KEY: {
    id: 0x005C,
    type: PropertyType.PT_BINARY
  },
  // Contains the display name of the messaging user on whose behalf the original message was sent. UNICODE compilation.
  PR_ORIGINAL_SENT_REPRESENTING_NAME_W: {
    id: 0x005D,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name of the messaging user on whose behalf the original message was sent. Non-UNICODE
  // compilation.
  PR_ORIGINAL_SENT_REPRESENTING_NAME_A: {
    id: 0x005D,
    type: PropertyType.PT_STRING8
  },
  // Contains the entry identifier of the messaging user on whose behalf the original message was sent.
  PR_ORIGINAL_SENT_REPRESENTING_ENTRYID: {
    id: 0x005E,
    type: PropertyType.PT_BINARY
  },
  // Contains the search key of the messaging user on whose behalf the original message was sent.
  PR_ORIGINAL_SENT_REPRESENTING_SEARCH_KEY: {
    id: 0x005F,
    type: PropertyType.PT_BINARY
  },
  // Contains the starting date and time of an appointment as managed by a scheduling application.
  PR_START_DATE: {
    id: 0x0060,
    type: PropertyType.PT_SYSTIME
  },
  // Contains the ending date and time of an appointment as managed by a scheduling application.
  PR_END_DATE: {
    id: 0x0061,
    type: PropertyType.PT_SYSTIME
  },
  // Contains an identifier for an appointment in the owner's schedule.
  PR_OWNER_APPT_ID: {
    id: 0x0062,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if the message sender wants a response to a meeting request.
  PR_RESPONSE_REQUESTED: {
    id: 0x0063,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the address type for the messaging user represented by the sender. UNICODE compilation.
  PR_SENT_REPRESENTING_ADDRTYPE_W: {
    id: 0x0064,
    type: PropertyType.PT_UNICODE
  },
  // Contains the address type for the messaging user represented by the sender. Non-UNICODE compilation.
  PR_SENT_REPRESENTING_ADDRTYPE_A: {
    id: 0x0064,
    type: PropertyType.PT_STRING8
  },
  // Contains the e-mail address for the messaging user represented by the sender. UNICODE compilation.
  PR_SENT_REPRESENTING_EMAIL_ADDRESS_W: {
    id: 0x0065,
    type: PropertyType.PT_UNICODE
  },
  // Contains the e-mail address for the messaging user represented by the sender. Non-UNICODE compilation.
  PR_SENT_REPRESENTING_EMAIL_ADDRESS_A: {
    id: 0x0065,
    type: PropertyType.PT_STRING8
  },
  // Contains the address type of the sender of the first version of a messagE, that is, the message before being
  // forwarded or replied to. UNICODE compilation.
  PR_ORIGINAL_SENDER_ADDRTYPE_W: {
    id: 0x0066,
    type: PropertyType.PT_UNICODE
  },
  // Contains the address type of the sender of the first version of a messagE, that is, the message before being
  // forwarded or replied to. Non-UNICODE compilation.
  PR_ORIGINAL_SENDER_ADDRTYPE_A: {
    id: 0x0066,
    type: PropertyType.PT_STRING8
  },
  // Contains the e-mail address of the sender of the first version of a message, that is, the message before being
  // forwarded or replied to. UNICODE compilation.
  PR_ORIGINAL_SENDER_EMAIL_ADDRESS_W: {
    id: 0x0067,
    type: PropertyType.PT_UNICODE
  },
  // Contains the e-mail address of the sender of the first version of a message, that is, the message before being
  // forwarded or replied to. Non-UNICODE compilation.
  PR_ORIGINAL_SENDER_EMAIL_ADDRESS_A: {
    id: 0x0067,
    type: PropertyType.PT_STRING8
  },
  // Contains the address type of the messaging user on whose behalf the original message was sent. UNICODE compilation.
  PR_ORIGINAL_SENT_REPRESENTING_ADDRTYPE_W: {
    id: 0x0068,
    type: PropertyType.PT_UNICODE
  },
  // Contains the address type of the messaging user on whose behalf the original message was sent. Non-UNICODE
  // compilation.
  PR_ORIGINAL_SENT_REPRESENTING_ADDRTYPE_A: {
    id: 0x0068,
    type: PropertyType.PT_STRING8
  },
  // Contains the e-mail address of the messaging user on whose behalf the original message was sent. UNICODE
  // compilation.
  PR_ORIGINAL_SENT_REPRESENTING_EMAIL_ADDRESS_W: {
    id: 0x0069,
    type: PropertyType.PT_UNICODE
  },
  // Contains the e-mail address of the messaging user on whose behalf the original message was sent. Non-UNICODE
  // compilation.
  PR_ORIGINAL_SENT_REPRESENTING_EMAIL_ADDRESS_A: {
    id: 0x0069,
    type: PropertyType.PT_STRING8
  },
  // Contains the topic of the first message in a conversation thread. UNICODE compilation.
  PR_CONVERSATION_TOPIC_W: {
    id: 0x0070,
    type: PropertyType.PT_UNICODE
  },
  // Contains the topic of the first message in a conversation thread. Non-UNICODE compilation.
  PR_CONVERSATION_TOPIC_A: {
    id: 0x0070,
    type: PropertyType.PT_STRING8
  },
  // Contains a binary value that indicates the relative position of this message within a conversation thread.
  // See https://msdn.microsoft.com/en-us/library/office/cc842470.aspx
  PR_CONVERSATION_INDEX: {
    id: 0x0071,
    type: PropertyType.PT_BINARY
  },
  // Contains a binary value that indicates the relative position of this message within a conversation thread.
  PR_ORIGINAL_DISPLAY_BCC_W: {
    id: 0x0072,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display names of any blind carbon copy (BCC) recipients of the original message. Non-UNICODE
  // compilation.
  PR_ORIGINAL_DISPLAY_BCC_A: {
    id: 0x0072,
    type: PropertyType.PT_STRING8
  },
  // Contains the display names of any carbon copy (CC) recipients of the original message. UNICODE compilation.
  PR_ORIGINAL_DISPLAY_CC_W: {
    id: 0x0073,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display names of any carbon copy (CC) recipients of the original message. Non-UNICODE compilation.
  PR_ORIGINAL_DISPLAY_CC_A: {
    id: 0x0073,
    type: PropertyType.PT_STRING8
  },
  // Contains the display names of the primary (To) recipients of the original message. UNICODE compilation.
  PR_ORIGINAL_DISPLAY_TO_W: {
    id: 0x0074,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display names of the primary (To) recipients of the original message. Non-UNICODE compilation.
  PR_ORIGINAL_DISPLAY_TO_A: {
    id: 0x0074,
    type: PropertyType.PT_STRING8
  },
  // Contains the e-mail address typE, such as SMTP, for the messaging user that actually receives the message. UNICODE
  // compilation.
  PR_RECEIVED_BY_ADDRTYPE_W: {
    id: 0x0075,
    type: PropertyType.PT_UNICODE
  },
  // Contains the e-mail address typE, such as SMTP, for the messaging user that actually receives the message.
  // Non-UNICODE compilation.
  PR_RECEIVED_BY_ADDRTYPE_A: {
    id: 0x0075,
    type: PropertyType.PT_STRING8
  },
  // Contains the e-mail address for the messaging user that actually receives the message. UNICODE compilation.
  PR_RECEIVED_BY_EMAIL_ADDRESS_W: {
    id: 0x0076,
    type: PropertyType.PT_UNICODE
  },
  // Contains the e-mail address for the messaging user that actually receives the message. Non-UNICODE compilation.
  PR_RECEIVED_BY_EMAIL_ADDRESS_A: {
    id: 0x0076,
    type: PropertyType.PT_STRING8
  },
  // Contains the address type for the messaging user represented by the user actually receiving the message. UNICODE
  // compilation.
  PR_RCVD_REPRESENTING_ADDRTYPE_W: {
    id: 0x0077,
    type: PropertyType.PT_UNICODE
  },
  // Contains the address type for the messaging user represented by the user actually receiving the message.
  // Non-UNICODE compilation.
  PR_RCVD_REPRESENTING_ADDRTYPE_A: {
    id: 0x0077,
    type: PropertyType.PT_STRING8
  },
  // Contains the e-mail address for the messaging user represented by the receiving user. UNICODE compilation.
  PR_RCVD_REPRESENTING_EMAIL_ADDRESS_W: {
    id: 0x0078,
    type: PropertyType.PT_UNICODE
  },
  // Contains the e-mail address for the messaging user represented by the receiving user. Non-UNICODE compilation.
  PR_RCVD_REPRESENTING_EMAIL_ADDRESS_A: {
    id: 0x0078,
    type: PropertyType.PT_STRING8
  },
  // Contains the address type of the author of the first version of a message. That is — the message before being
  // forwarded or replied to. UNICODE compilation.
  PR_ORIGINAL_AUTHOR_ADDRTYPE_W: {
    id: 0x0079,
    type: PropertyType.PT_UNICODE
  },
  // Contains the address type of the author of the first version of a message. That is — the message before being
  // forwarded or replied to. Non-UNICODE compilation.
  PR_ORIGINAL_AUTHOR_ADDRTYPE_A: {
    id: 0x0079,
    type: PropertyType.PT_STRING8
  },
  // Contains the e-mail address of the author of the first version of a message. That is — the message before being
  // forwarded or replied to. UNICODE compilation.
  PR_ORIGINAL_AUTHOR_EMAIL_ADDRESS_W: {
    id: 0x007A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the e-mail address of the author of the first version of a message. That is — the message before being
  // forwarded or replied to. Non-UNICODE compilation.
  PR_ORIGINAL_AUTHOR_EMAIL_ADDRESS_A: {
    id: 0x007A,
    type: PropertyType.PT_STRING8
  },
  // Contains the address type of the originally intended recipient of an autoforwarded message. UNICODE compilation.
  PR_ORIGINALLY_INTENDED_RECIP_ADDRTYPE_W: {
    id: 0x007B,
    type: PropertyType.PT_UNICODE
  },
  // Contains the address type of the originally intended recipient of an autoforwarded message. Non-UNICODE
  // compilation.
  PR_ORIGINALLY_INTENDED_RECIP_ADDRTYPE_A: {
    id: 0x007B,
    type: PropertyType.PT_STRING8
  },
  // Contains the e-mail address of the originally intended recipient of an autoforwarded message. UNICODE compilation.
  PR_ORIGINALLY_INTENDED_RECIP_EMAIL_ADDRESS_W: {
    id: 0x007C,
    type: PropertyType.PT_UNICODE
  },
  // Contains the e-mail address of the originally intended recipient of an autoforwarded message. Non-UNICODE
  // compilation.
  PR_ORIGINALLY_INTENDED_RECIP_EMAIL_ADDRESS_A: {
    id: 0x007C,
    type: PropertyType.PT_STRING8
  },
  // Contains transport-specific message envelope information. Non-UNICODE compilation.
  PR_TRANSPORT_MESSAGE_HEADERS_A: {
    id: 0x007D,
    type: PropertyType.PT_STRING8
  },
  // Contains transport-specific message envelope information. UNICODE compilation.
  PR_TRANSPORT_MESSAGE_HEADERS_W: {
    id: 0x007D,
    type: PropertyType.PT_UNICODE
  },
  // Contains the converted value of the attDelegate workgroup property.
  PR_DELEGATION: {
    id: 0x007E,
    type: PropertyType.PT_BINARY
  },
  // Contains a value used to correlate a Transport Neutral Encapsulation Format (TNEF) attachment with a message
  PR_TNEF_CORRELATION_KEY: {
    id: 0x007F,
    type: PropertyType.PT_BINARY
  },
  // Contains the message text. UNICODE compilation.
  // These properties are typically used only in an interpersonal message (IPM).
  // Message stores that support Rich Text Format (RTF) ignore any changes to white space in the message text. When
  // PR_BODY is stored for the first timE, the message store also generates and stores the PR_RTF_COMPRESSED
  // (PidTagRtfCompressed) property, the RTF version of the message text. If the IMAPIProp::SaveChanges method is
  // subsequently called and PR_BODY has been modifieD, the message store calls the RTFSync function to ensure
  // synchronization with the RTF version. If only white space has been changeD, the properties are left unchanged. This
  // preserves any nontrivial RTF formatting when the message travels through non-RTF-aware clients and messaging
  // systems.
  // The value for this property must be expressed in the code page of the operating system that MAPI is running on.
  PR_BODY_W: {
    id: 0x1000,
    type: PropertyType.PT_UNICODE
  },
  // Contains the message text. Non-UNICODE compilation.
  // These properties are typically used only in an interpersonal message (IPM).
  // Message stores that support Rich Text Format (RTF) ignore any changes to white space in the message text. When
  // PR_BODY is stored for the first timE, the message store also generates and stores the PR_RTF_COMPRESSED
  // (PidTagRtfCompressed) property, the RTF version of the message text. If the IMAPIProp::SaveChanges method is
  // subsequently called and PR_BODY has been modifieD, the message store calls the RTFSync function to ensure
  // synchronization with the RTF version. If only white space has been changeD, the properties are left unchanged. This
  // preserves any nontrivial RTF formatting when the message travels through non-RTF-aware clients and messaging
  // systems.
  // The value for this property must be expressed in the code page of the operating system that MAPI is running on.
  PR_BODY_A: {
    id: 0x1000,
    type: PropertyType.PT_STRING8
  },
  // Contains optional text for a report generated by the messaging system. UNICODE compilation.
  PR_REPORT_TEXT_W: {
    id: 0x1001,
    type: PropertyType.PT_UNICODE
  },
  // Contains optional text for a report generated by the messaging system. NON-UNICODE compilation.
  PR_REPORT_TEXT_A: {
    id: 0x1001,
    type: PropertyType.PT_STRING8
  },
  // Contains information about a message originator and a distribution list expansion history.
  PR_ORIGINATOR_AND_DL_EXPANSION_HISTORY: {
    id: 0x1002,
    type: PropertyType.PT_BINARY
  },
  // Contains the display name of a distribution list where the messaging system delivers a report.
  PR_REPORTING_DL_NAME: {
    id: 0x1003,
    type: PropertyType.PT_BINARY
  },
  // Contains an identifier for the message transfer agent that generated a report.
  PR_REPORTING_MTA_CERTIFICATE: {
    id: 0x1004,
    type: PropertyType.PT_BINARY
  },
  // Contains the cyclical redundancy check (CRC) computed for the message text.
  PR_RTF_SYNC_BODY_CRC: {
    id: 0x1006,
    type: PropertyType.PT_LONG
  },
  // Contains a count of the significant characters of the message text.
  PR_RTF_SYNC_BODY_COUNT: {
    id: 0x1007,
    type: PropertyType.PT_LONG
  },
  // Contains significant characters that appear at the beginning of the message text. UNICODE compilation.
  PR_RTF_SYNC_BODY_TAG_W: {
    id: 0x1008,
    type: PropertyType.PT_UNICODE
  },
  // Contains significant characters that appear at the beginning of the message text. Non-UNICODE compilation.
  PR_RTF_SYNC_BODY_TAG_A: {
    id: 0x1008,
    type: PropertyType.PT_STRING8
  },
  // Contains the Rich Text Format (RTF) version of the message text, usually in compressed form.
  PR_RTF_COMPRESSED: {
    id: 0x1009,
    type: PropertyType.PT_BINARY
  },
  // Contains a count of the ignorable characters that appear before the significant characters of the message.
  PR_RTF_SYNC_PREFIX_COUNT: {
    id: 0x1010,
    type: PropertyType.PT_LONG
  },
  // Contains a count of the ignorable characters that appear after the significant characters of the message.
  PR_RTF_SYNC_TRAILING_COUNT: {
    id: 0x1011,
    type: PropertyType.PT_LONG
  },
  // Contains the entry identifier of the originally intended recipient of an auto-forwarded message.
  PR_ORIGINALLY_INTENDED_RECIP_ENTRYID: {
    id: 0x1012,
    type: PropertyType.PT_BINARY
  },
  // Contains the Hypertext Markup Language (HTML) version of the message text.
  // These properties contain the same message text as the <see cref="PR_BODY_CONTENT_LOCATION_W" />
  // (PidTagBodyContentLocation), but in HTML. A message store that supports HTML indicates this by setting the
  // <see cref="StoreSupportMask.STORE_HTML_OK" /> flag in its <see cref="PR_STORE_SUPPORT_MASK" />
  // (PidTagStoreSupportMask). Note <see cref="StoreSupportMask.STORE_HTML_OK" /> is not defined in versions of
  // Mapidefs.h included with Microsoft® Exchange 2000 Server and earlier. If <see cref="StoreSupportMask.STORE_HTML_OK" />
  // is undefined, use the value 0x00010000 instead.
  PR_BODY_HTML_A: {
    id: 0x1013,
    type: PropertyType.PT_STRING8
  },
  // Contains the message body text in HTML format.
  PR_HTML: {
    id: 0x1013,
    type: PropertyType.PT_BINARY
  },
  // Contains the value of a MIME Content-Location header field.
  // To set the value of these properties, MIME clients should write the desired value to a Content-Location header
  // field on a MIME entity that maps to a message body. MIME readers should copy the value of a Content-Location
  // header field on such a MIME entity to the value of these properties
  PR_BODY_CONTENT_LOCATION_A: {
    id: 0x1014,
    type: PropertyType.PT_STRING8
  },
  // Contains the value of a MIME Content-Location header field. UNICODE compilation.
  // To set the value of these properties, MIME clients should write the desired value to a Content-Location header
  // field on a MIME entity that maps to a message body. MIME readers should copy the value of a Content-Location
  // header field on such a MIME entity to the value of these properties
  PR_BODY_CONTENT_LOCATION_W: {
    id: 0x1014,
    type: PropertyType.PT_UNICODE
  },
  // Corresponds to the message ID field as specified in [RFC2822].
  // These properties should be present on all e-mail messages.
  PR_INTERNET_MESSAGE_ID_A: {
    id: 0x1035,
    type: PropertyType.PT_STRING8
  },
  // Corresponds to the message ID field as specified in [RFC2822]. UNICODE compilation.
  // These properties should be present on all e-mail messages.
  PR_INTERNET_MESSAGE_ID_W: {
    id: 0x1035,
    type: PropertyType.PT_UNICODE
  },
  // Contains the original message's PR_INTERNET_MESSAGE_ID (PidTagInternetMessageId) property value.
  // These properties must be set on all message replies.
  PR_IN_REPLY_TO_ID_A: {
    id: 0x1042,
    type: PropertyType.PT_STRING8
  },
  // Contains the original message's PR_INTERNET_MESSAGE_ID (PidTagInternetMessageId) property value. UNICODE compilation.
  // These properties should be present on all e-mail messages.
  PR_IN_REPLY_TO_ID_W: {
    id: 0x1042,
    type: PropertyType.PT_UNICODE
  },
  // Contains the value of a Multipurpose Internet Mail Extensions (MIME) message's References header field.
  // To generate a References header field, clients must set these properties to the desired value. MIME writers must copy
  // the value of these properties to the References header field. To set the value of these properties, MIME clients must
  // write the desired value to a References header field. MIME readers must copy the value of the References header field
  // to these properties. MIME readers may truncate the value of these properties if it exceeds 64KB in length.
  PR_INTERNET_REFERENCES_A: {
    id: 0x1039,
    type: PropertyType.PT_STRING8
  },
  // Contains the value of a Multipurpose Internet Mail Extensions (MIME) message's References header field. UNICODE compilation.
  // To generate a References header field, clients must set these properties to the desired value. MIME writers must copy
  // the value of these properties to the References header field. To set the value of these properties, MIME clients must
  // write the desired value to a References header field. MIME readers must copy the value of the References header field
  // to these properties. MIME readers may truncate the value of these properties if it exceeds 64KB in length.
  PR_INTERNET_REFERENCES_W: {
    id: 0x1039,
    type: PropertyType.PT_UNICODE
  },
  // Contains an ASN.1 content integrity check value that allows a message sender to protect message content from
  // disclosure to unauthorized recipients.
  PR_CONTENT_INTEGRITY_CHECK: {
    id: 0x0C00,
    type: PropertyType.PT_BINARY
  },
  // Indicates that a message sender has requested a message content conversion for a particular recipient.
  PR_EXPLICIT_CONVERSION: {
    id: 0x0C01,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if this message should be returned with a report.
  PR_IPM_RETURN_REQUESTED: {
    id: 0x0C02,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains an ASN.1 security token for a message.
  PR_MESSAGE_TOKEN: {
    id: 0x0C03,
    type: PropertyType.PT_BINARY
  },
  // Contains a diagnostic code that forms part of a nondelivery report.
  PR_NDR_REASON_CODE: {
    id: 0x0C04,
    type: PropertyType.PT_LONG
  },
  // Contains a diagnostic code that forms part of a nondelivery report.
  PR_NDR_DIAG_CODE: {
    id: 0x0C05,
    type: PropertyType.PT_LONG
  },
  PR_NON_RECEIPT_NOTIFICATION_REQUESTED: {
    id: 0x0C06,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains TRUE if a message sender wants notification of non-receipt for a specified recipient.
  PR_ORIGINATOR_NON_DELIVERY_REPORT_REQUESTED: {
    id: 0x0C08,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains an entry identifier for an alternate recipient designated by the sender.
  PR_ORIGINATOR_REQUESTED_ALTERNATE_RECIPIENT: {
    id: 0x0C09,
    type: PropertyType.PT_BINARY
  },
  PR_PHYSICAL_DELIVERY_BUREAU_FAX_DELIVERY: {
    id: 0x0C0A,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains TRUE if the messaging system should use a fax bureau for physical delivery of this message.
  PR_PHYSICAL_DELIVERY_MODE: {
    id: 0x0C0B,
    type: PropertyType.PT_LONG
  },
  // Contains the mode of a report to be delivered to a particular message recipient upon completion of physical message
  // delivery or delivery by the message handling system.
  PR_PHYSICAL_DELIVERY_REPORT_REQUEST: {
    id: 0x0C0C,
    type: PropertyType.PT_LONG
  },
  PR_PHYSICAL_FORWARDING_ADDRESS: {
    id: 0x0C0D,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if a message sender requests the message transfer agent to attach a physical forwarding address for a
  // message recipient.
  PR_PHYSICAL_FORWARDING_ADDRESS_REQUESTED: {
    id: 0x0C0E,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains TRUE if a message sender prohibits physical message forwarding for a specific recipient.
  PR_PHYSICAL_FORWARDING_PROHIBITED: {
    id: 0x0C0F,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains an ASN.1 object identifier that is used for rendering message attachments.
  PR_PHYSICAL_RENDITION_ATTRIBUTES: {
    id: 0x0C10,
    type: PropertyType.PT_BINARY
  },
  // This property contains an ASN.1 proof of delivery value.
  PR_PROOF_OF_DELIVERY: {
    id: 0x0C11,
    type: PropertyType.PT_BINARY
  },
  // This property contains TRUE if a message sender requests proof of delivery for a particular recipient.
  PR_PROOF_OF_DELIVERY_REQUESTED: {
    id: 0x0C12,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a message recipient's ASN.1 certificate for use in a report.
  PR_RECIPIENT_CERTIFICATE: {
    id: 0x0C13,
    type: PropertyType.PT_BINARY
  },
  // This property contains a message recipient's telephone number to call to advise of the physical delivery of a
  // message. UNICODE compilation.
  PR_RECIPIENT_NUMBER_FOR_ADVICE_W: {
    id: 0x0C14,
    type: PropertyType.PT_UNICODE
  },
  // This property contains a message recipient's telephone number to call to advise of the physical delivery of a
  // message. Non-UNICODE compilation.
  PR_RECIPIENT_NUMBER_FOR_ADVICE_A: {
    id: 0x0C14,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient type for a message recipient.
  PR_RECIPIENT_TYPE: {
    id: 0x0C15,
    type: PropertyType.PT_LONG
  },
  // This property contains the type of registration used for physical delivery of a message.
  PR_REGISTERED_MAIL_TYPE: {
    id: 0x0C16,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if a message sender requests a reply from a recipient.
  PR_REPLY_REQUESTED: {
    id: 0x0C17,
    type: PropertyType.PT_BOOLEAN
  },
  // This property contains a binary array of delivery methods (service providers), in the order of a message sender's
  // preference.
  PR_REQUESTED_DELIVERY_METHOD: {
    id: 0x0C18,
    type: PropertyType.PT_LONG
  },
  // Contains the message sender's entry identifier.
  PR_SENDER_ENTRYID: {
    id: 0x0C19,
    type: PropertyType.PT_BINARY
  },
  // Contains the message sender's display name. UNICODE compilation.
  PR_SENDER_NAME_W: {
    id: 0x0C1A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the message sender's display name. Non-UNICODE compilation.
  PR_SENDER_NAME_A: {
    id: 0x0C1A,
    type: PropertyType.PT_STRING8
  },
  // Contains additional information for use in a report. UNICODE compilation.
  PR_SUPPLEMENTARY_INFO_W: {
    id: 0x0C1B,
    type: PropertyType.PT_UNICODE
  },
  // Contains additional information for use in a report. Non-UNICODE compilation.
  PR_SUPPLEMENTARY_INFO_A: {
    id: 0x0C1B,
    type: PropertyType.PT_STRING8
  },
  // This property contains the type of a message recipient for use in a report.
  PR_TYPE_OF_MTS_USER: {
    id: 0x0C1C,
    type: PropertyType.PT_LONG
  },
  // Contains the message sender's search key.
  PR_SENDER_SEARCH_KEY: {
    id: 0x0C1D,
    type: PropertyType.PT_BINARY
  },
  // Contains the message sender's e-mail address type. UNICODE compilation.
  PR_SENDER_ADDRTYPE_W: {
    id: 0x0C1E,
    type: PropertyType.PT_UNICODE
  },
  // Contains the message sender's e-mail address type. Non-UNICODE compilation.
  PR_SENDER_ADDRTYPE_A: {
    id: 0x0C1E,
    type: PropertyType.PT_STRING8
  },
  // Contains the message sender's e-mail address, encoded in Unicode standard.
  PR_SENDER_EMAIL_ADDRESS_W: {
    id: 0x0C1F,
    type: PropertyType.PT_UNICODE
  },
  // Contains the message sender's e-mail address, encoded in Non-Unicode standard.
  PR_SENDER_EMAIL_ADDRESS_A: {
    id: 0x0C1F,
    type: PropertyType.PT_STRING8
  },
  // Was originally meant to contain the current version of a message store. No longer supported.
  PR_CURRENT_VERSION: {
    id: 0x0E00,
    type: PropertyType.PT_I8
  },
  // Contains TRUE if a client application wants MAPI to delete the associated message after submission.
  PR_DELETE_AFTER_SUBMIT: {
    id: 0x0E01,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains an ASCII list of the display names of any blind carbon copy (BCC) message recipients, separated by
  // semicolons (;). UNICODE compilation.
  PR_DISPLAY_BCC_W: {
    id: 0x0E02,
    type: PropertyType.PT_UNICODE
  },
  // Contains an ASCII list of the display names of any blind carbon copy (BCC) message recipients, separated by
  // semicolons (;). Non-UNICODE compilation.
  PR_DISPLAY_BCC_A: {
    id: 0x0E02,
    type: PropertyType.PT_STRING8
  },
  // Contains an ASCII list of the display names of any carbon copy (CC) message recipients, separated by semicolons
  // (;). UNICODE compilation.
  PR_DISPLAY_CC_W: {
    id: 0x0E03,
    type: PropertyType.PT_UNICODE
  },
  // Contains an ASCII list of the display names of any carbon copy (CC) message recipients, separated by semicolons
  // (;). Non-UNICODE compilation.
  PR_DISPLAY_CC_A: {
    id: 0x0E03,
    type: PropertyType.PT_STRING8
  },
  // Contains a list of the display names of the primary (To) message recipients, separated by semicolons (;). UNICODE
  // compilation.
  PR_DISPLAY_TO_W: {
    id: 0x0E04,
    type: PropertyType.PT_UNICODE
  },
  // Contains a list of the display names of the primary (To) message recipients, separated by semicolons (;).
  // Non-UNICODE compilation.
  PR_DISPLAY_TO_A: {
    id: 0x0E04,
    type: PropertyType.PT_STRING8
  },
  // Contains the display name of the folder in which a message was found during a search. UNICODE compilation.
  PR_PARENT_DISPLAY_W: {
    id: 0x0E05,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name of the folder in which a message was found during a search. Non-UNICODE compilation.
  PR_PARENT_DISPLAY_A: {
    id: 0x0E05,
    type: PropertyType.PT_STRING8
  },
  // Contains the date and time a message was delivered.
  PR_MESSAGE_DELIVERY_TIME: {
    id: 0x0E06,
    type: PropertyType.PT_SYSTIME
  },
  // Contains a bitmask of flags indicating the origin and current state of a message.
  PR_MESSAGE_FLAGS: {
    id: 0x0E07,
    type: PropertyType.PT_LONG
  },
  // Contains the sum, in bytes, of the sizes of all properties on a message object.
  PR_MESSAGE_SIZE: {
    id: 0x0E08,
    type: PropertyType.PT_LONG
  },
  // Contains the entry identifier of the folder containing a folder or message.
  PR_PARENT_ENTRYID: {
    id: 0x0E09,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of the folder where the message should be moved after submission.
  PR_SENTMAIL_ENTRYID: {
    id: 0x0E0A,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if the sender of a message requests the correlation feature of the messaging system.
  PR_CORRELATE: {
    id: 0x0E0C,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the message transfer system (MTS) identifier used in correlating reports with sent messages.
  PR_CORRELATE_MTSID: {
    id: 0x0E0D,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if a nondelivery report applies only to discrete members of a distribution list rather than the
  // entire list.
  PR_DISCRETE_VALUES: {
    id: 0x0E0E,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains TRUE if some transport provider has already accepted responsibility for delivering the message to this
  // recipient, and FALSE if the MAPI spooler considers that this transport provider should accept responsibility.
  PR_RESPONSIBILITY: {
    id: 0x0E0F,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the status of the message based on information available to the MAPI spooler.
  PR_SPOOLER_STATUS: {
    id: 0x0E10,
    type: PropertyType.PT_LONG
  },
  // Obsolete MAPI spooler property. No longer supported.
  PR_TRANSPORT_STATUS: {
    id: 0x0E11,
    type: PropertyType.PT_LONG
  },
  // Contains a table of restrictions that can be applied to a contents table to find all messages that contain
  // recipient subobjects meeting the restrictions.
  PR_MESSAGE_RECIPIENTS: {
    id: 0x0E12,
    type: PropertyType.PT_OBJECT
  },
  // Contains a table of restrictions that can be applied to a contents table to find all messages that contain
  // attachment subobjects meeting the restrictions.
  PR_MESSAGE_ATTACHMENTS: {
    id: 0x0E13,
    type: PropertyType.PT_OBJECT
  },
  // Contains a bitmask of flags indicating details about a message submission.
  PR_SUBMIT_FLAGS: {
    id: 0x0E14,
    type: PropertyType.PT_LONG
  },
  // Contains a value used by the MAPI spooler in assigning delivery responsibility among transport providers.
  PR_RECIPIENT_STATUS: {
    id: 0x0E15,
    type: PropertyType.PT_LONG
  },
  // Contains a value used by the MAPI spooler to track the progress of an outbound message through the outgoing
  // transport providers.
  PR_TRANSPORT_KEY: {
    id: 0x0E16,
    type: PropertyType.PT_LONG
  },
  PR_MSG_STATUS: {
    id: 0x0E17,
    type: PropertyType.PT_LONG
  },
  // Contains a bitmask of property tags that define the status of a message.
  PR_MESSAGE_DOWNLOAD_TIME: {
    id: 0x0E18,
    type: PropertyType.PT_LONG
  },
  // Was originally meant to contain the message store version current at the time a message was created. No longer
  // supported.
  PR_CREATION_VERSION: {
    id: 0x0E19,
    type: PropertyType.PT_I8
  },
  // Was originally meant to contain the message store version current at the time the message was last modified. No
  // longer supported.
  PR_MODIFY_VERSION: {
    id: 0x0E1A,
    type: PropertyType.PT_I8
  },
  // When true then the message contains at least one attachment.
  PR_HASATTACH: {
    id: 0x0E1B,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a circular redundancy check (CRC) value on the message text.
  PR_BODY_CRC: {
    id: 0x0E1C,
    type: PropertyType.PT_LONG
  },
  // Contains the message subject with any prefix removed. UNICODE compilation.
  // See https://msdn.microsoft.com/en-us/library/office/cc815282.aspx
  PR_NORMALIZED_SUBJECT_W: {
    id: 0x0E1D,
    type: PropertyType.PT_UNICODE
  },
  // Contains the message subject with any prefix removed. Non-UNICODE compilation.
  PR_NORMALIZED_SUBJECT_A: {
    id: 0x0E1D,
    type: PropertyType.PT_STRING8
  },
  // Contains TRUE if PR_RTF_COMPRESSED has the same text content as PR_BODY for this message.
  PR_RTF_IN_SYNC: {
    id: 0x0E1F,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the sum, in bytes, of the sizes of all properties on an attachment.
  PR_ATTACH_SIZE: {
    id: 0x0E20,
    type: PropertyType.PT_LONG
  },
  // Contains a number that uniquely identifies the attachment within its parent message.
  PR_ATTACH_NUM: {
    id: 0x0E21,
    type: PropertyType.PT_LONG
  },
  // Contains a bitmask of flags for an attachment.
  // If the PR_ATTACH_FLAGS property is zero or absent, the attachment is to be processed by all applications.
  PR_ATTACH_FLAGS: {
    id: 0x3714,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if the message requires preprocessing.
  PR_PREPROCESS: {
    id: 0x0E22,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains an identifier for the message transfer agent (MTA) that originated the message.
  PR_ORIGINATING_MTA_CERTIFICATE: {
    id: 0x0E25,
    type: PropertyType.PT_BINARY
  },
  // Contains an ASN.1 proof of submission value.
  PR_PROOF_OF_SUBMISSION: {
    id: 0x0E26,
    type: PropertyType.PT_BINARY
  },
  // The PR_ENTRYID property contains a MAPI entry identifier used to open and edit properties of a particular MAPI
  // object.
  PR_ENTRYID: {
    id: 0x0FFF,
    type: PropertyType.PT_BINARY
  },
  // Contains the type of an object
  PR_OBJECT_TYPE: {
    id: 0x0FFE,
    type: PropertyType.PT_LONG
  },
  // Contains a bitmap of a full size icon for a form.
  PR_ICON: {
    id: 0x0FFD,
    type: PropertyType.PT_BINARY
  },
  // Contains a bitmap of a half-size icon for a form.
  PR_MINI_ICON: {
    id: 0x0FFC,
    type: PropertyType.PT_BINARY
  },
  // Specifies the hexadecimal string representation of the value of the PR_STORE_ENTRYID (PidTagStoreEntryId) property
  // on the shared folder. This is a property of a sharing message.
  PR_STORE_ENTRYID: {
    id: 0x0FFB,
    type: PropertyType.PT_BINARY
  },
  // Contains the unique binary-comparable identifier (record key) of the message store in which an object resides.
  PR_STORE_RECORD_KEY: {
    id: 0x0FFA,
    type: PropertyType.PT_BINARY
  },
  // Contains a unique binary-comparable identifier for a specific object.
  PR_RECORD_KEY: {
    id: 0x0FF9,
    type: PropertyType.PT_BINARY
  },
  // Contains the mapping signature for named properties of a particular MAPI object.
  PR_MAPPING_SIGNATURE: {
    id: 0x0FF8,
    type: PropertyType.PT_BINARY
  },
  // Indicates the client's access level to the object.
  PR_ACCESS_LEVEL: {
    id: 0x0FF7,
    type: PropertyType.PT_LONG
  },
  // Contains a value that uniquely identifies a row in a table.
  PR_INSTANCE_KEY: {
    id: 0x0FF6,
    type: PropertyType.PT_BINARY
  },
  // Contains a value that indicates the type of a row in a table.
  PR_ROW_TYPE: {
    id: 0x0FF5,
    type: PropertyType.PT_LONG
  },
  // Contains a bitmask of flags indicating the operations that are available to the client for the object.
  PR_ACCESS: {
    id: 0x0FF4,
    type: PropertyType.PT_LONG
  },
  // Contains a number that indicates which icon to use when you display a group of e-mail objects.
  // This property, if it exists, is a hint to the client. The client may ignore the value of this property.
  PR_ICON_INDEX: {
    id: 0x1080,
    type: PropertyType.PT_LONG
  },
  // Specifies the last verb executed for the message item to which it is related.
  PR_LAST_VERB_EXECUTED: {
    id: 0x1081,
    type: PropertyType.PT_LONG
  },
  // Contains the time when the last verb was executed.
  PR_LAST_VERB_EXECUTION_TIME: {
    id: 0x1082,
    type: PropertyType.PT_SYSTIME
  },
  // Contains a unique identifier for a recipient in a recipient table or status table.
  PR_ROWID: {
    id: 0x3000,
    type: PropertyType.PT_LONG
  },
  // Contains the display name for a given MAPI object. UNICODE compilation.
  PR_DISPLAY_NAME_W: {
    id: 0x3001,
    type: PropertyType.PT_UNICODE
  },
  // Contains the value of the PR_DISPLAY_NAME_W (PidTagDisplayName) property. Non-UNICODE compilation.
  PR_RECIPIENT_DISPLAY_NAME_A: {
    id: 0x5FF6,
    type: PropertyType.PT_STRING8
  },
  // Contains the value of the PR_DISPLAY_NAME_W (PidTagDisplayName) property. UNICODE compilation.
  PR_RECIPIENT_DISPLAY_NAME_W: {
    id: 0x5FF6,
    type: PropertyType.PT_UNICODE
  },
  // Specifies a bit field that describes the recipient status.
  // This property is not required. The following are the individual flags that can be set.
  PR_RECIPIENT_FLAGS: {
    id: 0x5FFD,
    type: PropertyType.PT_LONG
  },
  // Contains the display name for a given MAPI object. Non-UNICODE compilation.
  PR_DISPLAY_NAME_A: {
    id: 0x3001,
    type: PropertyType.PT_STRING8
  },
  // Contains the messaging user's e-mail address type, such as SMTP. UNICODE compilation.
  // These properties are examples of the base address properties common to all messaging users.
  // It specifies which messaging system MAPI uses to handle a given message.
  // This property also determines the format of the address string in the PR_EMAIL_ADRESS(PidTagEmailAddress).
  // The string it provides can contain only the uppercase alphabetic characters from A through Z and the numbers
  // from 0 through 9.
  PR_ADDRTYPE_W: {
    id: 0x3002,
    type: PropertyType.PT_UNICODE
  },
  // Contains the messaging user's e-mail address type such as SMTP. Non-UNICODE compilation.
  PR_ADDRTYPE_A: {
    id: 0x3002,
    type: PropertyType.PT_STRING8
  },
  // Contains the messaging user's e-mail address. UNICODE compilation.
  PR_EMAIL_ADDRESS_W: {
    id: 0x3003,
    type: PropertyType.PT_UNICODE
  },
  // Contains the messaging user's SMTP e-mail address. Non-UNICODE compilation.
  PR_SMTP_ADDRESS_A: {
    id: 0x39FE,
    type: PropertyType.PT_STRING8
  },
  // Contains the messaging user's SMTP e-mail address. UNICODE compilation.
  PR_SMTP_ADDRESS_W: {
    id: 0x39FE,
    type: PropertyType.PT_UNICODE
  },
  // Contains the messaging user's 7bit e-mail address. Non-UNICODE compilation.
  PR_7BIT_DISPLAY_NAME_A: {
    id: 0x39FF,
    type: PropertyType.PT_STRING8
  },
  // Contains the messaging user's SMTP e-mail address. UNICODE compilation.
  PR_7BIT_DISPLAY_NAME_W: {
    id: 0x39FF,
    type: PropertyType.PT_UNICODE
  },
  // Contains the messaging user's e-mail address. Non-UNICODE compilation.
  PR_EMAIL_ADDRESS_A: {
    id: 0x3003,
    type: PropertyType.PT_STRING8
  },
  // Contains a comment about the purpose or content of an object. UNICODE compilation.
  PR_COMMENT_W: {
    id: 0x3004,
    type: PropertyType.PT_UNICODE
  },
  // Contains a comment about the purpose or content of an object. Non-UNICODE compilation.
  PR_COMMENT_A: {
    id: 0x3004,
    type: PropertyType.PT_STRING8
  },
  // Contains an integer that represents the relative level of indentation, or depth, of an object in a hierarchy table.
  PR_DEPTH: {
    id: 0x3005,
    type: PropertyType.PT_LONG
  },
  // Contains the vendor-defined display name for a service provider. UNICODE compilation.
  PR_PROVIDER_DISPLAY_W: {
    id: 0x3006,
    type: PropertyType.PT_UNICODE
  },
  // Contains the vendor-defined display name for a service provider. Non-UNICODE compilation.
  PR_PROVIDER_DISPLAY_A: {
    id: 0x3006,
    type: PropertyType.PT_STRING8
  },
  // Contains the creation date and time of a message.
  PR_CREATION_TIME: {
    id: 0x3007,
    type: PropertyType.PT_SYSTIME
  },
  // Contains the date and time when the object or subobject was last modified.
  PR_LAST_MODIFICATION_TIME: {
    id: 0x3008,
    type: PropertyType.PT_SYSTIME
  },
  // Contains a bitmask of flags for message services and providers.
  PR_RESOURCE_FLAGS: {
    id: 0x3009,
    type: PropertyType.PT_LONG
  },
  // Contains the base file name of the MAPI service provider dynamic-link library (DLL). UNICODE compilation.
  PR_PROVIDER_DLL_NAME_W: {
    id: 0x300A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the base file name of the MAPI service provider dynamic-link library (DLL). Non-UNICODE compilation.
  PR_PROVIDER_DLL_NAME_A: {
    id: 0x300A,
    type: PropertyType.PT_STRING8
  },
  // Contains a binary-comparable key that identifies correlated objects for a search.
  PR_SEARCH_KEY: {
    id: 0x300B,
    type: PropertyType.PT_BINARY
  },
  // Contains a MAPIUID structure of the service provider that is handling a message.
  PR_PROVIDER_UID: {
    id: 0x300C,
    type: PropertyType.PT_BINARY
  },
  // Contains the zero-based index of a service provider's position in the provider table.
  PR_PROVIDER_ORDINAL: {
    id: 0x300D,
    type: PropertyType.PT_LONG
  },
  // Contains the version of a form. UNICODE compilation.
  PR_FORM_VERSION_W: {
    id: 0x3301,
    type: PropertyType.PT_UNICODE
  },
  // Contains the version of a form. Non-UNICODE compilation.
  PR_FORM_VERSION_A: {
    id: 0x3301,
    type: PropertyType.PT_STRING8
  },
  //    //// Contains the 128-bit Object Linking and Embedding (OLE) globally unique identifier (GUID) of a form.
  //    //PR_FORM_CLSID
  //{
  //    get { return new PropertyTag(0x3302, type: PropertyType.PT_CLSID); }
  //}
  // Contains the name of a contact for information about a form. UNICODE compilation.
  PR_FORM_CONTACT_NAME_W: {
    id: 0x3303,
    type: PropertyType.PT_UNICODE
  },
  // Contains the name of a contact for information about a form. Non-UNICODE compilation.
  PR_FORM_CONTACT_NAME_A: {
    id: 0x3303,
    type: PropertyType.PT_STRING8
  },
  // Contains the category of a form. UNICODE compilation.
  PR_FORM_CATEGORY_W: {
    id: 0x3304,
    type: PropertyType.PT_UNICODE
  },
  // Contains the category of a form. Non-UNICODE compilation.
  PR_FORM_CATEGORY_A: {
    id: 0x3304,
    type: PropertyType.PT_STRING8
  },
  // Contains the subcategory of a form, as defined by a client application. UNICODE compilation.
  PR_FORM_CATEGORY_SUB_W: {
    id: 0x3305,
    type: PropertyType.PT_UNICODE
  },
  // Contains the subcategory of a form, as defined by a client application. Non-UNICODE compilation.
  PR_FORM_CATEGORY_SUB_A: {
    id: 0x3305,
    type: PropertyType.PT_STRING8
  },
  // Contains a host map of available forms.
  PR_FORM_HOST_MAP: {
    id: 0x3306,
    type: PropertyType.PT_MV_LONG
  },
  // Contains TRUE if a form is to be suppressed from display by compose menus and dialog boxes.
  PR_FORM_HIDDEN: {
    id: 0x3307,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the display name for the object that is used to design the form. UNICODE compilation.
  PR_FORM_DESIGNER_NAME_W: {
    id: 0x3308,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name for the object that is used to design the form. Non-UNICODE compilation.
  PR_FORM_DESIGNER_NAME_A: {
    id: 0x3308,
    type: PropertyType.PT_STRING8
  },
  //    //// Contains the unique identifier for the object that is used to design a form.
  //    //PR_FORM_DESIGNER_GUID
  //{
  //    get { return new PropertyTag(0x3309, type: PropertyType.PT_CLSID); }
  //}
  // Contains TRUE if a message should be composed in the current folder.
  PR_FORM_MESSAGE_BEHAVIOR: {
    id: 0x330A,
    type: PropertyType.PT_LONG
  },
  // Contains TRUE if a message store is the default message store in the message store table.
  PR_DEFAULT_STORE: {
    id: 0x3400,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a bitmask of flags that client applications query to determine the characteristics of a message store.
  PR_STORE_SUPPORT_MASK: {
    id: 0x340D,
    type: PropertyType.PT_LONG
  },
  // Contains a flag that describes the state of the message store.
  PR_STORE_STATE: {
    id: 0x340E,
    type: PropertyType.PT_LONG
  },
  // Contains a bitmask of flags that client applications should query to determine the characteristics of a message store.
  PR_STORE_UNICODE_MASK: {
    id: 0x340F,
    type: PropertyType.PT_LONG
  },
  // Was originally meant to contain the search key of the interpersonal message (IPM) root folder. No longer supported
  PR_IPM_SUBTREE_SEARCH_KEY: {
    id: 0x3410,
    type: PropertyType.PT_BINARY
  },
  // Was originally meant to contain the search key of the standard Outbox folder. No longer supported.
  PR_IPM_OUTBOX_SEARCH_KEY: {
    id: 0x3411,
    type: PropertyType.PT_BINARY
  },
  // Was originally meant to contain the search key of the standard Deleted Items folder. No longer supported.
  PR_IPM_WASTEBASKET_SEARCH_KEY: {
    id: 0x3412,
    type: PropertyType.PT_BINARY
  },
  // Was originally meant to contain the search key of the standard Sent Items folder. No longer supported.
  PR_IPM_SENTMAIL_SEARCH_KEY: {
    id: 0x3413,
    type: PropertyType.PT_BINARY
  },
  // Contains a provider-defined MAPIUID structure that indicates the type of the message store.
  PR_MDB_PROVIDER: {
    id: 0x3414,
    type: PropertyType.PT_BINARY
  },
  // Contains a table of a message store's receive folder settings.
  PR_RECEIVE_FOLDER_SETTINGS: {
    id: 0x3415,
    type: PropertyType.PT_OBJECT
  },
  // Contains a bitmask of flags that indicate the validity of the entry identifiers of the folders in a message store.
  PR_VALID_FOLDER_MASK: {
    id: 0x35DF,
    type: PropertyType.PT_LONG
  },
  // Contains the entry identifier of the root of the IPM folder subtree in the message store's folder tree.
  PR_IPM_SUBTREE_ENTRYID: {
    id: 0x35E0,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of the standard interpersonal message (IPM) Outbox folder.
  PR_IPM_OUTBOX_ENTRYID: {
    id: 0x35E2,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of the standard IPM Deleted Items folder.
  PR_IPM_WASTEBASKET_ENTRYID: {
    id: 0x35E3,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of the standard IPM Sent Items folder.
  PR_IPM_SENTMAIL_ENTRYID: {
    id: 0x35E4,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of the user-defined Views folder.
  PR_VIEWS_ENTRYID: {
    id: 0x35E5,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of the predefined common view folder.
  PR_COMMON_VIEWS_ENTRYID: {
    id: 0x35E6,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier for the folder in which search results are typically created.
  PR_FINDER_ENTRYID: {
    id: 0x35E7,
    type: PropertyType.PT_BINARY
  },
  // When TRUE, forces the serialization of SMTP and POP3 authentication requests such that the POP3 account is
  // authenticated before the SMTP account.
  PR_CE_RECEIVE_BEFORE_SEND: {
    id: 0x812D,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a bitmask of flags describing capabilities of an address book container.
  PR_CONTAINER_FLAGS: {
    id: 0x3600,
    type: PropertyType.PT_LONG
  },
  // Contains a constant that indicates the folder type.
  PR_FOLDER_TYPE: {
    id: 0x3601,
    type: PropertyType.PT_LONG
  },
  // Contains the number of messages in a folder, as computed by the message store.
  PR_CONTENT_COUNT: {
    id: 0x3602,
    type: PropertyType.PT_LONG
  },
  // Contains the number of unread messages in a folder, as computed by the message store.
  PR_CONTENT_UNREAD: {
    id: 0x3603,
    type: PropertyType.PT_LONG
  },
  // Contains an embedded table object that contains dialog box template entry identifiers.
  PR_CREATE_TEMPLATES: {
    id: 0x3604,
    type: PropertyType.PT_OBJECT
  },
  // Contains an embedded display table object.
  PR_DETAILS_TABLE: {
    id: 0x3605,
    type: PropertyType.PT_OBJECT
  },
  // Contains a container object that is used for advanced searches.
  PR_SEARCH: {
    id: 0x3607,
    type: PropertyType.PT_OBJECT
  },
  // Contains TRUE if the entry in the one-off table can be selected.
  PR_SELECTABLE: {
    id: 0x3609,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains TRUE if a folder contains subfolders.
  PR_SUBFOLDERS: {
    id: 0x360A,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a 32-bit bitmask of flags that define folder status.
  PR_STATUS: {
    id: 0x360B,
    type: PropertyType.PT_LONG
  },
  // Contains a string value for use in a property restriction on an address book container contents table. UNICODE
  // compilation
  PR_ANR_W: {
    id: 0x360C,
    type: PropertyType.PT_UNICODE
  },
  // Contains a string value for use in a property restriction on an address book container contents table. Non-UNICODE
  // compilation
  PR_ANR_A: {
    id: 0x360C,
    type: PropertyType.PT_STRING8
  },
  // No longer supported
  PR_CONTENTS_SORT_ORDER: {
    id: 0x360D,
    type: PropertyType.PT_MV_LONG
  },
  // Contains an embedded hierarchy table object that provides information about the child containers.
  PR_CONTAINER_HIERARCHY: {
    id: 0x360E,
    type: PropertyType.PT_OBJECT
  },
  // Contains an embedded contents table object that provides information about a container.
  PR_CONTAINER_CONTENTS: {
    id: 0x360F,
    type: PropertyType.PT_OBJECT
  },
  // Contains an embedded contents table object that provides information about a container.
  PR_FOLDER_ASSOCIATED_CONTENTS: {
    id: 0x3610,
    type: PropertyType.PT_OBJECT
  },
  // Contains the template entry identifier for a default distribution list.
  PR_DEF_CREATE_DL: {
    id: 0x3611,
    type: PropertyType.PT_BINARY
  },
  // Contains the template entry identifier for a default messaging user object.
  PR_DEF_CREATE_MAILUSER: {
    id: 0x3612,
    type: PropertyType.PT_BINARY
  },
  // Contains a text string describing the type of a folder. Although this property is generally ignored, versions of
  // Microsoft® Exchange Server prior to Exchange Server 2003 Mailbox Manager expect this property to be present.
  // UNICODE compilation.
  PR_CONTAINER_CLASS_W: {
    id: 0x3613,
    type: PropertyType.PT_UNICODE
  },
  // Contains a text string describing the type of a folder. Although this property is generally ignored, versions of
  // Microsoft® Exchange Server prior to Exchange Server 2003 Mailbox Manager expect this property to be present.
  // Non-UNICODE compilation.
  PR_CONTAINER_CLASS_A: {
    id: 0x3613,
    type: PropertyType.PT_STRING8
  },
  // Unknown
  PR_CONTAINER_MODIFY_VERSION: {
    id: 0x3614,
    type: PropertyType.PT_I8
  },
  // Contains an address book provider's MAPIUID structure.
  PR_AB_PROVIDER_ID: {
    id: 0x3615,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of a folder's default view.
  PR_DEFAULT_VIEW_ENTRYID: {
    id: 0x3616,
    type: PropertyType.PT_BINARY
  },
  // Contains the count of items in the associated contents table of the folder.
  PR_ASSOC_CONTENT_COUNT: {
    id: 0x3617,
    type: PropertyType.PT_LONG
  },
  // was originally meant to contain an ASN.1 object identifier specifying how the attachment should be handled during
  // transmission. No longer supported.
  PR_ATTACHMENT_X400_PARAMETERS: {
    id: 0x3700,
    type: PropertyType.PT_BINARY
  },
  // Contains the content identification header of a MIME message attachment. This property is used for MHTML support.
  // It represents the content identification header for the appropriate MIME body part. UNICODE compilation.
  PR_ATTACH_CONTENT_ID_W: {
    id: 0x3712,
    type: PropertyType.PT_UNICODE
  },
  // Contains the content identification header of a MIME message attachment. This property is used for MHTML support.
  // It represents the content identification header for the appropriate MIME body part. Non-UNICODE compilation.
  PR_ATTACH_CONTENT_ID_A: {
    id: 0x3712,
    type: PropertyType.PT_STRING8
  },
  // Contains the content location header of a MIME message attachment. This property is used for MHTML support. It
  // represents the content location header for the appropriate MIME body part. UNICODE compilation.
  PR_ATTACH_CONTENT_LOCATION_W: {
    id: 0x3713,
    type: PropertyType.PT_UNICODE
  },
  // Contains the content location header of a MIME message attachment. This property is used for MHTML support. It
  // represents the content location header for the appropriate MIME body part. UNICODE compilation.
  PR_ATTACH_CONTENT_LOCATION_A: {
    id: 0x3713,
    type: PropertyType.PT_STRING8
  },
  // Contains an attachment object typically accessed through the OLE IStorage:IUnknown interface.
  PR_ATTACH_DATA_OBJ: {
    id: 0x3701,
    type: PropertyType.PT_OBJECT
  },
  // Contains binary attachment data typically accessed through the COM IStream:IUnknown interface.
  PR_ATTACH_DATA_BIN: {
    id: 0x3701,
    type: PropertyType.PT_BINARY
  },
  // Contains an ASN.1 object identifier specifying the encoding for an attachment.
  PR_ATTACH_ENCODING: {
    id: 0x3702,
    type: PropertyType.PT_BINARY
  },
  // Contains a filename extension that indicates the document type of an attachment. UNICODE compilation.
  PR_ATTACH_EXTENSION_W: {
    id: 0x3703,
    type: PropertyType.PT_UNICODE
  },
  // Contains a filename extension that indicates the document type of an attachment. Non-UNICODE compilation.
  PR_ATTACH_EXTENSION_A: {
    id: 0x3703,
    type: PropertyType.PT_STRING8
  },
  // Contains an attachment's base filename and extension, excluding path. UNICODE compilation.
  PR_ATTACH_FILENAME_W: {
    id: 0x3704,
    type: PropertyType.PT_UNICODE
  },
  // Contains an attachment's base filename and extension, excluding path. Non-UNICODE compilation.
  PR_ATTACH_FILENAME_A: {
    id: 0x3704,
    type: PropertyType.PT_STRING8
  },
  // Contains a MAPI-defined constant representing the way the contents of an attachment can be accessed.
  PR_ATTACH_METHOD: {
    id: 0x3705,
    type: PropertyType.PT_LONG
  },
  // Contains an attachment's long filename and extension, excluding path. UNICODE compilation.
  PR_ATTACH_LONG_FILENAME_W: {
    id: 0x3707,
    type: PropertyType.PT_UNICODE
  },
  // Contains an attachment's long filename and extension, excluding path. Non-UNICODE compilation.
  PR_ATTACH_LONG_FILENAME_A: {
    id: 0x3707,
    type: PropertyType.PT_STRING8
  },
  // Contains an attachment's fully qualified path and filename. UNICODE compilation.
  PR_ATTACH_PATHNAME_W: {
    id: 0x3708,
    type: PropertyType.PT_UNICODE
  },
  // Contains an attachment's fully qualified path and filename. Non-UNICODE compilation.
  PR_ATTACH_PATHNAME_A: {
    id: 0x3708,
    type: PropertyType.PT_STRING8
  },
  // Contains a Microsoft Windows metafile with rendering information for an attachment.
  PR_ATTACH_RENDERING: {
    id: 0x3709,
    type: PropertyType.PT_BINARY
  },
  // Contains an ASN.1 object identifier specifying the application that supplied an attachment.
  PR_ATTACH_TAG: {
    id: 0x370A,
    type: PropertyType.PT_BINARY
  },
  // Contains an offset, in characters, to use in rendering an attachment within the main message text.
  PR_RENDERING_POSITION: {
    id: 0x370B,
    type: PropertyType.PT_LONG
  },
  // Contains the name of an attachment file modified so that it can be correlated with TNEF messages. UNICODE
  // compilation.
  PR_ATTACH_TRANSPORT_NAME_W: {
    id: 0x370C,
    type: PropertyType.PT_UNICODE
  },
  // Contains the name of an attachment file modified so that it can be correlated with TNEF messages. Non-UNICODE
  // compilation.
  PR_ATTACH_TRANSPORT_NAME_A: {
    id: 0x370C,
    type: PropertyType.PT_STRING8
  },
  // Contains an attachment's fully qualified long path and filename. UNICODE compilation.
  PR_ATTACH_LONG_PATHNAME_W: {
    id: 0x370D,
    type: PropertyType.PT_UNICODE
  },
  // Contains an attachment's fully qualified long path and filename. Non-UNICODE compilation.
  PR_ATTACH_LONG_PATHNAME_A: {
    id: 0x370D,
    type: PropertyType.PT_STRING8
  },
  // Contains formatting information about a Multipurpose Internet Mail Extensions (MIME) attachment. UNICODE
  // compilation.
  PR_ATTACH_MIME_TAG_W: {
    id: 0x370E,
    type: PropertyType.PT_UNICODE
  },
  // Contains formatting information about a Multipurpose Internet Mail Extensions (MIME) attachment. Non-UNICODE
  // compilation.
  PR_ATTACH_MIME_TAG_A: {
    id: 0x370E,
    type: PropertyType.PT_STRING8
  },
  // Provides file type information for a non-Windows attachment.
  PR_ATTACH_ADDITIONAL_INFO: {
    id: 0x370F,
    type: PropertyType.PT_BINARY
  },
  // Contains a value used to associate an icon with a particular row of a table.
  PR_DISPLAY_TYPE: {
    id: 0x3900,
    type: PropertyType.PT_LONG
  },
  // Contains the PR_ENTRYID (PidTagEntryId), expressed as a permanent entry ID format.
  PR_TEMPLATEID: {
    id: 0x3902,
    type: PropertyType.PT_BINARY
  },
  // These properties appear on address book objects. Obsolete.
  PR_PRIMARY_CAPABILITY: {
    id: 0x3904,
    type: PropertyType.PT_BINARY
  },
  // Contains the type of an entry, with respect to how the entry should be displayed in a row in a table for the Global
  // Address List.
  PR_DISPLAY_TYPE_EX: {
    id: 0x3905,
    type: PropertyType.PT_LONG
  },
  // Contains the recipient's account name. UNICODE compilation.
  PR_ACCOUNT_W: {
    id: 0x3A00,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's account name. Non-UNICODE compilation.
  PR_ACCOUNT_A: {
    id: 0x3A00,
    type: PropertyType.PT_STRING8
  },
  // Contains a list of entry identifiers for alternate recipients designated by the original recipient.
  PR_ALTERNATE_RECIPIENT: {
    id: 0x3A01,
    type: PropertyType.PT_BINARY
  },
  // Contains a telephone number that the message recipient can use to reach the sender. UNICODE compilation.
  PR_CALLBACK_TELEPHONE_NUMBER_W: {
    id: 0x3A02,
    type: PropertyType.PT_UNICODE
  },
  // Contains a telephone number that the message recipient can use to reach the sender. Non-UNICODE compilation.
  PR_CALLBACK_TELEPHONE_NUMBER_A: {
    id: 0x3A02,
    type: PropertyType.PT_STRING8
  },
  // Contains TRUE if message conversions are prohibited by default for the associated messaging user.
  PR_CONVERSION_PROHIBITED: {
    id: 0x3A03,
    type: PropertyType.PT_BOOLEAN
  },
  // The DiscloseRecipients field represents a PR_DISCLOSE_RECIPIENTS MAPI property.
  PR_DISCLOSE_RECIPIENTS: {
    id: 0x3A04,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a generational abbreviation that follows the full name of the recipient. UNICODE compilation.
  PR_GENERATION_W: {
    id: 0x3A05,
    type: PropertyType.PT_UNICODE
  },
  // Contains a generational abbreviation that follows the full name of the recipient. Non-UNICODE compilation.
  PR_GENERATION_A: {
    id: 0x3A05,
    type: PropertyType.PT_STRING8
  },
  // Contains the first or given name of the recipient. UNICODE compilation.
  PR_GIVEN_NAME_W: {
    id: 0x3A06,
    type: PropertyType.PT_UNICODE
  },
  // Contains the first or given name of the recipient. Non-UNICODE compilation.
  PR_GIVEN_NAME_A: {
    id: 0x3A06,
    type: PropertyType.PT_STRING8
  },
  // Contains a government identifier for the recipient. UNICODE compilation.
  PR_GOVERNMENT_ID_NUMBER_W: {
    id: 0x3A07,
    type: PropertyType.PT_UNICODE
  },
  // Contains a government identifier for the recipient. Non-UNICODE compilation.
  PR_GOVERNMENT_ID_NUMBER_A: {
    id: 0x3A07,
    type: PropertyType.PT_STRING8
  },
  // Contains the primary telephone number of the recipient's place of business. UNICODE compilation.
  PR_BUSINESS_TELEPHONE_NUMBER_W: {
    id: 0x3A08,
    type: PropertyType.PT_UNICODE
  },
  // Contains the primary telephone number of the recipient's place of business. Non-UNICODE compilation.
  PR_BUSINESS_TELEPHONE_NUMBER_A: {
    id: 0x3A08,
    type: PropertyType.PT_STRING8
  },
  // Contains the primary telephone number of the recipient's home. UNICODE compilation.
  PR_HOME_TELEPHONE_NUMBER_W: {
    id: 0x3A09,
    type: PropertyType.PT_UNICODE
  },
  // Contains the primary telephone number of the recipient's home. Non-UNICODE compilation.
  PR_HOME_TELEPHONE_NUMBER_A: {
    id: 0x3A09,
    type: PropertyType.PT_STRING8
  },
  // Contains the initials for parts of the full name of the recipient. UNICODE compilation.
  PR_INITIALS_W: {
    id: 0x3A0A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the initials for parts of the full name of the recipient. Non-UNICODE compilation.
  PR_INITIALS_A: {
    id: 0x3A0A,
    type: PropertyType.PT_STRING8
  },
  // Contains a keyword that identifies the recipient to the recipient's system administrator. UNICODE compilation.
  PR_KEYWORD_W: {
    id: 0x3A0B,
    type: PropertyType.PT_UNICODE
  },
  // Contains a keyword that identifies the recipient to the recipient's system administrator. Non-UNICODE compilation.
  PR_KEYWORD_A: {
    id: 0x3A0B,
    type: PropertyType.PT_STRING8
  },
  // Contains a value that indicates the language in which the messaging user is writing messages. UNICODE compilation.
  PR_LANGUAGE_W: {
    id: 0x3A0C,
    type: PropertyType.PT_UNICODE
  },
  // Contains a value that indicates the language in which the messaging user is writing messages. Non-UNICODE
  // compilation.
  PR_LANGUAGE_A: {
    id: 0x3A0C,
    type: PropertyType.PT_STRING8
  },
  // Contains the location of the recipient in a format that is useful to the recipient's organization. UNICODE
  // compilation.
  PR_LOCATION_W: {
    id: 0x3A0D,
    type: PropertyType.PT_UNICODE
  },
  // Contains the location of the recipient in a format that is useful to the recipient's organization. Non-UNICODE
  // compilation.
  PR_LOCATION_A: {
    id: 0x3A0D,
    type: PropertyType.PT_STRING8
  },
  // Contains TRUE if the messaging user is allowed to send and receive messages.
  PR_MAIL_PERMISSION: {
    id: 0x3A0E,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains the common name of the message handling system. UNICODE compilation.
  PR_MHS_COMMON_NAME_W: {
    id: 0x3A0F,
    type: PropertyType.PT_UNICODE
  },
  // Contains the common name of the message handling system. Non-UNICODE compilation.
  PR_MHS_COMMON_NAME_A: {
    id: 0x3A0F,
    type: PropertyType.PT_STRING8
  },
  // Contains an organizational ID number for the contact, such as an employee ID number. UNICODE compilation.
  PR_ORGANIZATIONAL_ID_NUMBER_W: {
    id: 0x3A10,
    type: PropertyType.PT_UNICODE
  },
  // Contains an organizational ID number for the contact, such as an employee ID number. Non-UNICODE compilation.
  PR_ORGANIZATIONAL_ID_NUMBER_A: {
    id: 0x3A10,
    type: PropertyType.PT_STRING8
  },
  // Contains the last or surname of the recipient. UNICODE compilation.
  PR_SURNAME_W: {
    id: 0x3A11,
    type: PropertyType.PT_UNICODE
  },
  // Contains the last or surname of the recipient. Non-UNICODE compilation.
  PR_SURNAME_A: {
    id: 0x3A11,
    type: PropertyType.PT_STRING8
  },
  // Contains the original entry identifier for an entry copied from an address book to a personal address book or other
  // writeable address book.
  PR_ORIGINAL_ENTRYID: {
    id: 0x3A12,
    type: PropertyType.PT_BINARY
  },
  // Contains the original display name for an entry copied from an address book to a personal address book or other
  // writable address book. UNICODE compilation.
  PR_ORIGINAL_DISPLAY_NAME_W: {
    id: 0x3A13,
    type: PropertyType.PT_UNICODE
  },
  // Contains the original display name for an entry copied from an address book to a personal address book or other
  // writable address book. Non-UNICODE compilation.
  PR_ORIGINAL_DISPLAY_NAME_A: {
    id: 0x3A13,
    type: PropertyType.PT_STRING8
  },
  // Contains the original search key for an entry copied from an address book to a personal address book or other
  // writeable address book.
  PR_ORIGINAL_SEARCH_KEY: {
    id: 0x3A14,
    type: PropertyType.PT_BINARY
  },
  // Contains the recipient's postal address. UNICODE compilation.
  PR_POSTAL_ADDRESS_W: {
    id: 0x3A15,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's postal address. Non-UNICODE compilation.
  PR_POSTAL_ADDRESS_A: {
    id: 0x3A15,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's company name. UNICODE compilation.
  PR_COMPANY_NAME_W: {
    id: 0x3A16,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's company name. Non-UNICODE compilation.
  PR_COMPANY_NAME_A: {
    id: 0x3A16,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's job title. UNICODE compilation.
  PR_TITLE_W: {
    id: 0x3A17,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's job title. Non-UNICODE compilation.
  PR_TITLE_A: {
    id: 0x3A17,
    type: PropertyType.PT_STRING8
  },
  // Contains a name for the department in which the recipient works. UNICODE compilation.
  PR_DEPARTMENT_NAME_W: {
    id: 0x3A18,
    type: PropertyType.PT_UNICODE
  },
  // Contains a name for the department in which the recipient works. Non-UNICODE compilation.
  PR_DEPARTMENT_NAME_A: {
    id: 0x3A18,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's office location. UNICODE compilation.
  PR_OFFICE_LOCATION_W: {
    id: 0x3A19,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's office location. Non-UNICODE compilation.
  PR_OFFICE_LOCATION_A: {
    id: 0x3A19,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's primary telephone number. UNICODE compilation.
  PR_PRIMARY_TELEPHONE_NUMBER_W: {
    id: 0x3A1A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's primary telephone number. Non-UNICODE compilation.
  PR_PRIMARY_TELEPHONE_NUMBER_A: {
    id: 0x3A1A,
    type: PropertyType.PT_STRING8
  },
  // Contains a secondary telephone number at the recipient's place of business. UNICODE compilation.
  PR_BUSINESS2_TELEPHONE_NUMBER_W: {
    id: 0x3A1B,
    type: PropertyType.PT_UNICODE
  },
  // Contains a secondary telephone number at the recipient's place of business. Non-UNICODE compilation.
  PR_BUSINESS2_TELEPHONE_NUMBER_A: {
    id: 0x3A1B,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's cellular telephone number. UNICODE compilation.
  PR_MOBILE_TELEPHONE_NUMBER_W: {
    id: 0x3A1C,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's cellular telephone number. Non-UNICODE compilation.
  PR_MOBILE_TELEPHONE_NUMBER_A: {
    id: 0x3A1C,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's radio telephone number. UNICODE compilation.
  PR_RADIO_TELEPHONE_NUMBER_W: {
    id: 0x3A1D,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's radio telephone number. Non-UNICODE compilation.
  PR_RADIO_TELEPHONE_NUMBER_A: {
    id: 0x3A1D,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's car telephone number. UNICODE compilation.
  PR_CAR_TELEPHONE_NUMBER_W: {
    id: 0x3A1E,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's car telephone number. Non-UNICODE compilation.
  PR_CAR_TELEPHONE_NUMBER_A: {
    id: 0x3A1E,
    type: PropertyType.PT_STRING8
  },
  // Contains an alternate telephone number for the recipient. UNICODE compilation.
  PR_OTHER_TELEPHONE_NUMBER_W: {
    id: 0x3A1F,
    type: PropertyType.PT_UNICODE
  },
  // Contains an alternate telephone number for the recipient. Non-UNICODE compilation.
  PR_OTHER_TELEPHONE_NUMBER_A: {
    id: 0x3A1F,
    type: PropertyType.PT_STRING8
  },
  // Contains a recipient's display name in a secure form that cannot be changed. UNICODE compilation.
  PR_TRANSMITABLE_DISPLAY_NAME_W: {
    id: 0x3A20,
    type: PropertyType.PT_UNICODE
  },
  // Contains a recipient's display name in a secure form that cannot be changed. Non-UNICODE compilation.
  PR_TRANSMITABLE_DISPLAY_NAME_A: {
    id: 0x3A20,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's pager telephone number. UNICODE compilation.
  PR_PAGER_TELEPHONE_NUMBER_W: {
    id: 0x3A21,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's pager telephone number. Non-UNICODE compilation.
  PR_PAGER_TELEPHONE_NUMBER_A: {
    id: 0x3A21,
    type: PropertyType.PT_STRING8
  },
  // Contains an ASN.1 authentication certificate for a messaging user.
  PR_USER_CERTIFICATE: {
    id: 0x3A22,
    type: PropertyType.PT_BINARY
  },
  // Contains the telephone number of the recipient's primary fax machine. UNICODE compilation.
  PR_PRIMARY_FAX_NUMBER_W: {
    id: 0x3A23,
    type: PropertyType.PT_UNICODE
  },
  // Contains the telephone number of the recipient's primary fax machine. Non-UNICODE compilation.
  PR_PRIMARY_FAX_NUMBER_A: {
    id: 0x3A23,
    type: PropertyType.PT_STRING8
  },
  // Contains the telephone number of the recipient's business fax machine. UNICODE compilation.
  PR_BUSINESS_FAX_NUMBER_W: {
    id: 0x3A24,
    type: PropertyType.PT_UNICODE
  },
  // Contains the telephone number of the recipient's business fax machine. Non-UNICODE compilation.
  PR_BUSINESS_FAX_NUMBER_A: {
    id: 0x3A24,
    type: PropertyType.PT_STRING8
  },
  // Contains the telephone number of the recipient's home fax machine. UNICODE compilation.
  PR_HOME_FAX_NUMBER_W: {
    id: 0x3A25,
    type: PropertyType.PT_UNICODE
  },
  // Contains the telephone number of the recipient's home fax machine. Non-UNICODE compilation.
  PR_HOME_FAX_NUMBER_A: {
    id: 0x3A25,
    type: PropertyType.PT_STRING8
  },
  // Contains the name of the recipient's country/region. UNICODE compilation.
  PR_COUNTRY_W: {
    id: 0x3A26,
    type: PropertyType.PT_UNICODE
  },
  // Contains the name of the recipient's country/region. Non-UNICODE compilation.
  PR_COUNTRY_A: {
    id: 0x3A26,
    type: PropertyType.PT_STRING8
  },
  // Contains the name of the recipient's locality, such as the town or city. UNICODE compilation.
  PR_LOCALITY_W: {
    id: 0x3A27,
    type: PropertyType.PT_UNICODE
  },
  // Contains the name of the recipient's locality, such as the town or city. Non-UNICODE compilation.
  PR_LOCALITY_A: {
    id: 0x3A27,
    type: PropertyType.PT_STRING8
  },
  // Contains the name of the recipient's state or province. UNICODE compilation.
  PR_STATE_OR_PROVINCE_W: {
    id: 0x3A28,
    type: PropertyType.PT_UNICODE
  },
  // Contains the name of the recipient's state or province. Non-UNICODE compilation.
  PR_STATE_OR_PROVINCE_A: {
    id: 0x3A28,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's street address. UNICODE compilation.
  PR_STREET_ADDRESS_W: {
    id: 0x3A29,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's street address. Non-UNICODE compilation.
  PR_STREET_ADDRESS_A: {
    id: 0x3A29,
    type: PropertyType.PT_STRING8
  },
  // Contains the postal code for the recipient's postal address. UNICODE compilation.
  PR_POSTAL_CODE_W: {
    id: 0x3A2A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the postal code for the recipient's postal address. Non-UNICODE compilation.
  PR_POSTAL_CODE_A: {
    id: 0x3A2A,
    type: PropertyType.PT_STRING8
  },
  // Contains the number or identifier of the recipient's post office box. UNICODE compilation.
  PR_POST_OFFICE_BOX_W: {
    id: 0x3A2B,
    type: PropertyType.PT_UNICODE
  },
  // Contains the number or identifier of the recipient's post office box. Non-UNICODE compilation.
  PR_POST_OFFICE_BOX_A: {
    id: 0x3A2B,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's telex number. UNICODE compilation.
  PR_TELEX_NUMBER_W: {
    id: 0x3A2C,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's telex number. Non-UNICODE compilation.
  PR_TELEX_NUMBER_A: {
    id: 0x3A2C,
    type: PropertyType.PT_STRING8
  },
  // Contains the recipient's ISDN-capable telephone number. UNICODE compilation.
  PR_ISDN_NUMBER_W: {
    id: 0x3A2D,
    type: PropertyType.PT_UNICODE
  },
  // Contains the recipient's ISDN-capable telephone number. Non-UNICODE compilation.
  PR_ISDN_NUMBER_A: {
    id: 0x3A2D,
    type: PropertyType.PT_STRING8
  },
  // Contains the telephone number of the recipient's administrative assistant. UNICODE compilation.
  PR_ASSISTANT_TELEPHONE_NUMBER_W: {
    id: 0x3A2E,
    type: PropertyType.PT_UNICODE
  },
  // Contains the telephone number of the recipient's administrative assistant. Non-UNICODE compilation.
  PR_ASSISTANT_TELEPHONE_NUMBER_A: {
    id: 0x3A2E,
    type: PropertyType.PT_STRING8
  },
  // Contains a secondary telephone number at the recipient's home. UNICODE compilation.
  PR_HOME2_TELEPHONE_NUMBER_W: {
    id: 0x3A2F,
    type: PropertyType.PT_UNICODE
  },
  // Contains a secondary telephone number at the recipient's home. Non-UNICODE compilation.
  PR_HOME2_TELEPHONE_NUMBER_A: {
    id: 0x3A2F,
    type: PropertyType.PT_STRING8
  },
  // Contains the name of the recipient's administrative assistant. UNICODE compilation.
  PR_ASSISTANT_W: {
    id: 0x3A30,
    type: PropertyType.PT_UNICODE
  },
  // Contains the name of the recipient's administrative assistant. Non-UNICODE compilation.
  PR_ASSISTANT_A: {
    id: 0x3A30,
    type: PropertyType.PT_STRING8
  },
  // Contains TRUE if the recipient can receive all message content, including Rich Text Format (RTF) and Object Linking
  // and Embedding (OLE) objects.
  PR_SEND_RICH_INFO: {
    id: 0x3A40,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a list of identifiers of message store providers in the current profile.
  PR_STORE_PROVIDERS: {
    id: 0x3D00,
    type: PropertyType.PT_BINARY
  },
  // Contains a list of identifiers for address book providers in the current profile.
  PR_AB_PROVIDERS: {
    id: 0x3D01,
    type: PropertyType.PT_BINARY
  },
  // Contains a list of identifiers of transport providers in the current profile.
  PR_TRANSPORT_PROVIDERS: {
    id: 0x3D02,
    type: PropertyType.PT_BINARY
  },
  // Contains TRUE if a messaging user profile is the MAPI default profile.
  PR_DEFAULT_PROFILE: {
    id: 0x3D04,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a list of entry identifiers for address book containers that are to be searched to resolve names.
  PR_AB_SEARCH_PATH: {
    id: 0x3D05,
    type: PropertyType.PT_MV_BINARY
  },
  // Contains the entry identifier of the address book container to display first.
  PR_AB_DEFAULT_DIR: {
    id: 0x3D06,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of the address book container to use as the personal address book (PAB).
  PR_AB_DEFAULT_PAB: {
    id: 0x3D07,
    type: PropertyType.PT_BINARY
  },
  // The MAPI property PR_FILTERING_HOOKS.
  PR_FILTERING_HOOKS: {
    id: 0x3D08,
    type: PropertyType.PT_BINARY
  },
  // Contains the unicode name of a message service as set by the user in the MapiSvc.inf file.
  PR_SERVICE_NAME_W: {
    id: 0x3D09,
    type: PropertyType.PT_UNICODE
  },
  // Contains the ANSI name of a message service as set by the user in the MapiSvc.inf file.
  PR_SERVICE_NAME_A: {
    id: 0x3D09,
    type: PropertyType.PT_STRING8
  },
  // Contains the unicode filename of the DLL containing the message service provider entry point function to call for
  // configuration.
  PR_SERVICE_DLL_NAME_W: {
    id: 0x3D0A,
    type: PropertyType.PT_UNICODE
  },
  // Contains the ANSI filename of the DLL containing the message service provider entry point function to call for
  // configuration.
  PR_SERVICE_DLL_NAME_A: {
    id: 0x3D0A,
    type: PropertyType.PT_STRING8
  },
  // Contains the MAPIUID structure for a message service.
  PR_SERVICE_UID: {
    id: 0x3D0C,
    type: PropertyType.PT_BINARY
  },
  // Contains a list of MAPIUID structures that identify additional profile sections for the message service.
  PR_SERVICE_EXTRA_UIDS: {
    id: 0x3D0D,
    type: PropertyType.PT_BINARY
  },
  // Contains a list of identifiers of message services in the current profile.
  PR_SERVICES: {
    id: 0x3D0E,
    type: PropertyType.PT_BINARY
  },
  // Contains a ANSI list of the files that belong to the message service.
  PR_SERVICE_SUPPORT_FILES_W: {
    id: 0x3D0F,
    type: PropertyType.PT_MV_UNICODE
  },
  // Contains a ANSI list of the files that belong to the message service.
  PR_SERVICE_SUPPORT_FILES_A: {
    id: 0x3D0F,
    type: PropertyType.PT_MV_STRING8
  },
  // Contains a list of unicode filenames that are to be deleted when the message service is uninstalled.
  PR_SERVICE_DELETE_FILES_W: {
    id: 0x3D10,
    type: PropertyType.PT_MV_UNICODE
  },
  // Contains a list of filenames that are to be deleted when the message service is uninstalled.
  PR_SERVICE_DELETE_FILES_A: {
    id: 0x3D10,
    type: PropertyType.PT_MV_STRING8
  },
  // Contains a list of entry identifiers for address book containers explicitly configured by the user.
  PR_AB_SEARCH_PATH_UPDATE: {
    id: 0x3D11,
    type: PropertyType.PT_BINARY
  },
  // Contains the ANSI name of the profile.
  PR_PROFILE_NAME_A: {
    id: 0x3D12,
    type: PropertyType.PT_STRING8
  },
  // Contains the unicode name of the profile.
  PR_PROFILE_NAME_W: {
    id: 0x3D12,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name for a service provider's identity as defined within a messaging system. UNICODE
  // compilation.
  PR_IDENTITY_DISPLAY_W: {
    id: 0x3E00,
    type: PropertyType.PT_UNICODE
  },
  // Contains the display name for a service provider's identity as defined within a messaging system. Non-UNICODE
  // compilation.
  PR_IDENTITY_DISPLAY_A: {
    id: 0x3E00,
    type: PropertyType.PT_STRING8
  },
  // Contains the entry identifier for a service provider's identity as defined within a messaging system.
  PR_IDENTITY_ENTRYID: {
    id: 0x3E01,
    type: PropertyType.PT_BINARY
  },
  // Contains a bitmask of flags indicating the methods in the IMAPIStatus interface that are supported by the status
  // object.
  PR_RESOURCE_METHODS: {
    id: 0x3E02,
    type: PropertyType.PT_LONG
  },
  // Contains a value indicating the service provider type.
  PR_RESOURCE_TYPE: {
    id: 0x3E03,
    type: PropertyType.PT_LONG
  },
  // Contains a bitmask of flags indicating the current status of a session resource. All service providers set status
  // codes as does MAPI to report on the status of the subsystem, the MAPI spooler, and the integrated address book.
  PR_STATUS_CODE: {
    id: 0x3E04,
    type: PropertyType.PT_LONG
  },
  // Contains the search key for a service provider's identity as defined within a messaging system.
  PR_IDENTITY_SEARCH_KEY: {
    id: 0x3E05,
    type: PropertyType.PT_BINARY
  },
  // Contains the entry identifier of a transport's tightly coupled message store.
  PR_OWN_STORE_ENTRYID: {
    id: 0x3E06,
    type: PropertyType.PT_BINARY
  },
  // Contains a path to the service provider's server. UNICODE compilation.
  PR_RESOURCE_PATH_W: {
    id: 0x3E07,
    type: PropertyType.PT_UNICODE
  },
  // Contains a path to the service provider's server. Non-UNICODE compilation.
  PR_RESOURCE_PATH_A: {
    id: 0x3E07,
    type: PropertyType.PT_STRING8
  },
  // Contains an ASCII message indicating the current status of a session resource. UNICODE compilation.
  PR_STATUS_STRING_W: {
    id: 0x3E08,
    type: PropertyType.PT_UNICODE
  },
  // Contains an ASCII message indicating the current status of a session resource. Non-UNICODE compilation.
  PR_STATUS_STRING_A: {
    id: 0x3E08,
    type: PropertyType.PT_STRING8
  },
  // Was originally meant to contain TRUE if the message transfer system (MTS) allows X.400 deferred delivery
  // cancellation. No longer supported.
  PR_X400_DEFERRED_DELIVERY_CANCEL: {
    id: 0x3E09,
    type: PropertyType.PT_BOOLEAN
  },
  // Was originally meant to contain the entry identifier that a remote transport provider furnishes for its header
  // folder. No longer supported.
  PR_HEADER_FOLDER_ENTRYID: {
    id: 0x3E0A,
    type: PropertyType.PT_BINARY
  },
  // Contains a number indicating the status of a remote transfer.
  PR_REMOTE_PROGRESS: {
    id: 0x3E0B,
    type: PropertyType.PT_LONG
  },
  // Contains an ASCII string indicating the status of a remote transfer. UNICODE compilation.
  PR_REMOTE_PROGRESS_TEXT_W: {
    id: 0x3E0C,
    type: PropertyType.PT_UNICODE
  },
  // Contains an ASCII string indicating the status of a remote transfer. Non-UNICODE compilation.
  PR_REMOTE_PROGRESS_TEXT_A: {
    id: 0x3E0C,
    type: PropertyType.PT_STRING8
  },
  // Contains TRUE if the remote viewer is allowed to call the IMAPIStatus::ValidateState method.
  PR_REMOTE_VALIDATE_OK: {
    id: 0x3E0D,
    type: PropertyType.PT_BOOLEAN
  },
  // Contains a bitmask of flags governing the behavior of a control used in a dialog box built from a display table.
  PR_CONTROL_FLAGS: {
    id: 0x3F00,
    type: PropertyType.PT_LONG
  },
  // Contains a pointer to a structure for a control used in a dialog box.
  PR_CONTROL_STRUCTURE: {
    id: 0x3F01,
    type: PropertyType.PT_BINARY
  },
  // Contains a value indicating a control type for a control used in a dialog box.
  PR_CONTROL_TYPE: {
    id: 0x3F02,
    type: PropertyType.PT_LONG
  },
  // Contains the width of a dialog box control in standard Windows dialog units.
  PR_DELTAX: {
    id: 0x3F03,
    type: PropertyType.PT_LONG
  },
  // Contains the height of a dialog box control in standard Windows dialog units.
  PR_DELTAY: {
    id: 0x3F04,
    type: PropertyType.PT_LONG
  },
  // Contains the x coordinate of the starting position (the upper-left corner) of a dialog box control, in standard
  // Windows dialog units.
  PR_XPOS: {
    id: 0x3F05,
    type: PropertyType.PT_LONG
  },
  // Contains the y coordinate of the starting position (the upper-left corner) of a dialog box control, in standard
  // Windows dialog units.
  PR_YPOS: {
    id: 0x3F06,
    type: PropertyType.PT_LONG
  },
  // Contains a unique identifier for a control used in a dialog box.
  PR_CONTROL_ID: {
    id: 0x3F07,
    type: PropertyType.PT_BINARY
  },
  // Indicates the page of a display template to display first.
  PR_INITIAL_DETAILS_PANE: {
    id: 0x3F08,
    type: PropertyType.PT_LONG
  },
  // Contains the Windows LCID of the end user who created this message.
  PR_MESSAGE_LOCALE_ID: {
    id: 0x3F08,
    type: PropertyType.PT_LONG
  },
  // Indicates the code page used for <see cref="PropertyTags.PR_BODY_W" /> (PidTagBody) or
  // <see cref="PropertyTags.PR_HTML" /> (PidTagBodyHtml) properties.
  PR_INTERNET_CPID: {
    id: 0x3FDE,
    type: PropertyType.PT_LONG
  },
  // The creators address type
  PR_CreatorAddrType_W: {
    id: 0x4022,
    type: PropertyType.PT_UNICODE
  },
  // The creators e-mail address
  PR_CreatorEmailAddr_W: {
    id: 0x4023,
    type: PropertyType.PT_UNICODE
  },
  // The creators display name
  PR_CreatorSimpleDispName_W: {
    id: 0x4038,
    type: PropertyType.PT_UNICODE
  },
  // The senders display name
  PR_SenderSimpleDispName_W: {
    id: 0x4030,
    type: PropertyType.PT_UNICODE
  },
  // Indicates the type of Message object to which this attachment is linked.
  // Must be 0, unless overridden by other protocols that extend the
  // Message and Attachment Object Protocol as noted in [MS-OXCMSG].
  PR_ATTACHMENT_LINKID: {
    id: 0x7FFA,
    type: PropertyType.PT_LONG
  },
  // Indicates special handling for this Attachment object.
  // Must be 0x00000000, unless overridden by other protocols that extend the Message
  // and Attachment Object Protocol as noted in [MS-OXCMSG]
  PR_ATTACHMENT_FLAGS: {
    id: 0x7FFD,
    type: PropertyType.PT_LONG
  },
  // Indicates whether an attachment is hidden from the end user.
  PR_ATTACHMENT_HIDDEN: {
    id: 0x7FFE,
    type: PropertyType.PT_BOOLEAN
  },
  // Specifies the format for an editor to use to display a message.
  // By default, mail messages (with the message class IPM.Note or with a custom message
  // class derived from IPM.Note) sent from a POP3/SMTP mail account are sent in the Transport
  // Neutral Encapsulation Format (TNEF). The PR_MSG_EDITOR_FORMAT property can be used to enforce
  // only plain text, and not TNEF, when sending a message. If PR_MSG_EDITOR_FORMAT is set to
  // EDITOR_FORMAT_PLAINTEXT, the message is sent as plain text without TNEF. If PR_MSG_EDITOR_FORMAT
  // is set to EDITOR_FORMAT_RTF, TNEF encoding is implicitly enabled, and the message is sent by using
  // the default Internet format that is specified in the Outlook client.
  PR_MSG_EDITOR_FORMAT: {
    id: 0x5909,
    type: PropertyType.PT_LONG
  }
});

/** https://stackoverflow.com/a/15550284
 * Convert a Microsoft OADate to ECMAScript Date
 * Treat all values as local.
 * OADate = number of days since 30 dec 1899 as a double value
 * @param {string|number} oaDate - OADate value
 * @returns {Date}
 */
function oADateToDate(oaDate) {
  // Treat integer part as whole days
  const days = parseInt(oaDate); // Treat decimal part as part of 24hr day, always +ve

  const ms = Math.abs((oaDate - days) * 8.64e7); // Add days and add ms

  return new Date(1899, 11, 30 + days, 0, 0, 0, ms);
}
// FileTime: unsigned 64 Bit, 100ns units since 1. January 1601 (UTC)
// ms between 01.01.1970 and 01.01.1601: 11644473600

function fileTimeToDate(fileTimeLower, fileTimeUpper) {
  // TODO this was using BigInts in the past
  // but flow didn't like it, not sure what the cause for that is
  const lower = fileTimeLower / 1e4;
  const upper = fileTimeUpper * Math.pow(2, 32) / 1e4;
  return new Date(Number(upper + lower - 11644473600));
}
function dateToFileTime(date) {
  // TODO this was also using bigints
  const ns = (date.getTime() + 11644473600) * 1e4;
  const fileTimeLower = Number(ns & Number.MAX_SAFE_INTEGER);
  const fileTimeUpper = Number(ns / Math.pow(2, 32));
  return {
    fileTimeLower,
    fileTimeUpper
  };
}

/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Copyright 2009 The Closure Library Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var long = createCommonjsModule(function (module) {
/**
 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/long.js for details
 */
(function (global, factory) {
  /* AMD */
  if (typeof commonjsRequire === 'function' && 'object' === "object" && module && module["exports"]) module["exports"] = factory();
    /* Global */
    else (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();
})(commonjsGlobal, function () {
  /**
   * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
   *  See the from* functions below for more convenient ways of constructing Longs.
   * @exports Long
   * @class A Long class for representing a 64 bit two's-complement integer value.
   * @param {number} low The low (signed) 32 bits of the long
   * @param {number} high The high (signed) 32 bits of the long
   * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
   * @constructor
   */

  function Long(low, high, unsigned) {
    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;
    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */

    this.high = high | 0;
    /**
     * Whether unsigned or not.
     * @type {boolean}
     */

    this.unsigned = !!unsigned;
  } // The internal representation of a long is the two given signed, 32-bit values.
  // We use 32-bit pieces because these are the size of integers on which
  // Javascript performs bit-operations.  For operations like addition and
  // multiplication, we split each number into 16 bit pieces, which can easily be
  // multiplied within Javascript's floating-point representation without overflow
  // or change in sign.
  //
  // In the algorithms below, we frequently reduce the negative case to the
  // positive case by negating the input(s) and then post-processing the result.
  // Note that we must ALWAYS check specially whether those values are MIN_VALUE
  // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
  // a positive number, it overflows back into a negative).  Not handling this
  // case would often result in infinite recursion.
  //
  // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
  // methods on which they depend.

  /**
   * An indicator used to reliably determine if an object is a Long or not.
   * @type {boolean}
   * @const
   * @private
   */


  Long.prototype.__isLong__;
  Object.defineProperty(Long.prototype, "__isLong__", {
    value: true,
    enumerable: false,
    configurable: false
  });
  /**
   * @function
   * @param {*} obj Object
   * @returns {boolean}
   * @inner
   */

  function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
  }
  /**
   * Tests if the specified object is a Long.
   * @function
   * @param {*} obj Object
   * @returns {boolean}
   */


  Long.isLong = isLong;
  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @inner
   */

  var INT_CACHE = {};
  /**
   * A cache of the Long representations of small unsigned integer values.
   * @type {!Object}
   * @inner
   */

  var UINT_CACHE = {};
  /**
   * @param {number} value
   * @param {boolean=} unsigned
   * @returns {!Long}
   * @inner
   */

  function fromInt(value, unsigned) {
    var obj, cachedObj, cache;

    if (unsigned) {
      value >>>= 0;

      if (cache = 0 <= value && value < 256) {
        cachedObj = UINT_CACHE[value];
        if (cachedObj) return cachedObj;
      }

      obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
      if (cache) UINT_CACHE[value] = obj;
      return obj;
    } else {
      value |= 0;

      if (cache = -128 <= value && value < 128) {
        cachedObj = INT_CACHE[value];
        if (cachedObj) return cachedObj;
      }

      obj = fromBits(value, value < 0 ? -1 : 0, false);
      if (cache) INT_CACHE[value] = obj;
      return obj;
    }
  }
  /**
   * Returns a Long representing the given 32 bit integer value.
   * @function
   * @param {number} value The 32 bit integer in question
   * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
   * @returns {!Long} The corresponding Long value
   */


  Long.fromInt = fromInt;
  /**
   * @param {number} value
   * @param {boolean=} unsigned
   * @returns {!Long}
   * @inner
   */

  function fromNumber(value, unsigned) {
    if (isNaN(value) || !isFinite(value)) return unsigned ? UZERO : ZERO;

    if (unsigned) {
      if (value < 0) return UZERO;
      if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
    } else {
      if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
      if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
    }

    if (value < 0) return fromNumber(-value, unsigned).neg();
    return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
  }
  /**
   * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
   * @function
   * @param {number} value The number in question
   * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
   * @returns {!Long} The corresponding Long value
   */


  Long.fromNumber = fromNumber;
  /**
   * @param {number} lowBits
   * @param {number} highBits
   * @param {boolean=} unsigned
   * @returns {!Long}
   * @inner
   */

  function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
  }
  /**
   * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
   *  assumed to use 32 bits.
   * @function
   * @param {number} lowBits The low 32 bits
   * @param {number} highBits The high 32 bits
   * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
   * @returns {!Long} The corresponding Long value
   */


  Long.fromBits = fromBits;
  /**
   * @function
   * @param {number} base
   * @param {number} exponent
   * @returns {number}
   * @inner
   */

  var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

  /**
   * @param {string} str
   * @param {(boolean|number)=} unsigned
   * @param {number=} radix
   * @returns {!Long}
   * @inner
   */

  function fromString(str, unsigned, radix) {
    if (str.length === 0) throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") return ZERO;

    if (typeof unsigned === 'number') {
      // For goog.math.long compatibility
      radix = unsigned, unsigned = false;
    } else {
      unsigned = !!unsigned;
    }

    radix = radix || 10;
    if (radix < 2 || 36 < radix) throw RangeError('radix');
    var p;
    if ((p = str.indexOf('-')) > 0) throw Error('interior hyphen');else if (p === 0) {
      return fromString(str.substring(1), unsigned, radix).neg();
    } // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.

    var radixToPower = fromNumber(pow_dbl(radix, 8));
    var result = ZERO;

    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i),
          value = parseInt(str.substring(i, i + size), radix);

      if (size < 8) {
        var power = fromNumber(pow_dbl(radix, size));
        result = result.mul(power).add(fromNumber(value));
      } else {
        result = result.mul(radixToPower);
        result = result.add(fromNumber(value));
      }
    }

    result.unsigned = unsigned;
    return result;
  }
  /**
   * Returns a Long representation of the given string, written using the specified radix.
   * @function
   * @param {string} str The textual representation of the Long
   * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
   * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
   * @returns {!Long} The corresponding Long value
   */


  Long.fromString = fromString;
  /**
   * @function
   * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
   * @returns {!Long}
   * @inner
   */

  function fromValue(val) {
    if (val
    /* is compatible */
    instanceof Long) return val;
    if (typeof val === 'number') return fromNumber(val);
    if (typeof val === 'string') return fromString(val); // Throws for non-objects, converts non-instanceof Long:

    return fromBits(val.low, val.high, val.unsigned);
  }
  /**
   * Converts the specified value to a Long.
   * @function
   * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
   * @returns {!Long}
   */


  Long.fromValue = fromValue; // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
  // no runtime penalty for these.

  /**
   * @type {number}
   * @const
   * @inner
   */

  var TWO_PWR_16_DBL = 1 << 16;
  /**
   * @type {number}
   * @const
   * @inner
   */

  var TWO_PWR_24_DBL = 1 << 24;
  /**
   * @type {number}
   * @const
   * @inner
   */

  var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
  /**
   * @type {number}
   * @const
   * @inner
   */

  var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
  /**
   * @type {number}
   * @const
   * @inner
   */

  var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
  /**
   * @type {!Long}
   * @const
   * @inner
   */

  var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
  /**
   * @type {!Long}
   * @inner
   */

  var ZERO = fromInt(0);
  /**
   * Signed zero.
   * @type {!Long}
   */

  Long.ZERO = ZERO;
  /**
   * @type {!Long}
   * @inner
   */

  var UZERO = fromInt(0, true);
  /**
   * Unsigned zero.
   * @type {!Long}
   */

  Long.UZERO = UZERO;
  /**
   * @type {!Long}
   * @inner
   */

  var ONE = fromInt(1);
  /**
   * Signed one.
   * @type {!Long}
   */

  Long.ONE = ONE;
  /**
   * @type {!Long}
   * @inner
   */

  var UONE = fromInt(1, true);
  /**
   * Unsigned one.
   * @type {!Long}
   */

  Long.UONE = UONE;
  /**
   * @type {!Long}
   * @inner
   */

  var NEG_ONE = fromInt(-1);
  /**
   * Signed negative one.
   * @type {!Long}
   */

  Long.NEG_ONE = NEG_ONE;
  /**
   * @type {!Long}
   * @inner
   */

  var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
  /**
   * Maximum signed value.
   * @type {!Long}
   */

  Long.MAX_VALUE = MAX_VALUE;
  /**
   * @type {!Long}
   * @inner
   */

  var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
  /**
   * Maximum unsigned value.
   * @type {!Long}
   */

  Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
  /**
   * @type {!Long}
   * @inner
   */

  var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);
  /**
   * Minimum signed value.
   * @type {!Long}
   */

  Long.MIN_VALUE = MIN_VALUE;
  /**
   * @alias Long.prototype
   * @inner
   */

  var LongPrototype = Long.prototype;
  /**
   * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
   * @returns {number}
   */

  LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
  };
  /**
   * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
   * @returns {number}
   */


  LongPrototype.toNumber = function toNumber() {
    if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
  };
  /**
   * Converts the Long to a string written in the specified radix.
   * @param {number=} radix Radix (2-36), defaults to 10
   * @returns {string}
   * @override
   * @throws {RangeError} If `radix` is out of range
   */


  LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix) throw RangeError('radix');
    if (this.isZero()) return '0';

    if (this.isNegative()) {
      // Unsigned Longs are never negative
      if (this.eq(MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = fromNumber(radix),
            div = this.div(radixLong),
            rem1 = div.mul(radixLong).sub(this);
        return div.toString(radix) + rem1.toInt().toString(radix);
      } else return '-' + this.neg().toString(radix);
    } // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.


    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';

    while (true) {
      var remDiv = rem.div(radixToPower),
          intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
          digits = intval.toString(radix);
      rem = remDiv;
      if (rem.isZero()) return digits + result;else {
        while (digits.length < 6) digits = '0' + digits;

        result = '' + digits + result;
      }
    }
  };
  /**
   * Gets the high 32 bits as a signed integer.
   * @returns {number} Signed high bits
   */


  LongPrototype.getHighBits = function getHighBits() {
    return this.high;
  };
  /**
   * Gets the high 32 bits as an unsigned integer.
   * @returns {number} Unsigned high bits
   */


  LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
  };
  /**
   * Gets the low 32 bits as a signed integer.
   * @returns {number} Signed low bits
   */


  LongPrototype.getLowBits = function getLowBits() {
    return this.low;
  };
  /**
   * Gets the low 32 bits as an unsigned integer.
   * @returns {number} Unsigned low bits
   */


  LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
  };
  /**
   * Gets the number of bits needed to represent the absolute value of this Long.
   * @returns {number}
   */


  LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
      return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;

    for (var bit = 31; bit > 0; bit--) if ((val & 1 << bit) != 0) break;

    return this.high != 0 ? bit + 33 : bit + 1;
  };
  /**
   * Tests if this Long's value equals zero.
   * @returns {boolean}
   */


  LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
  };
  /**
   * Tests if this Long's value is negative.
   * @returns {boolean}
   */


  LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
  };
  /**
   * Tests if this Long's value is positive.
   * @returns {boolean}
   */


  LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
  };
  /**
   * Tests if this Long's value is odd.
   * @returns {boolean}
   */


  LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
  };
  /**
   * Tests if this Long's value is even.
   * @returns {boolean}
   */


  LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
  };
  /**
   * Tests if this Long's value equals the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */


  LongPrototype.equals = function equals(other) {
    if (!isLong(other)) other = fromValue(other);
    if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
    return this.high === other.high && this.low === other.low;
  };
  /**
   * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */


  LongPrototype.eq = LongPrototype.equals;
  /**
   * Tests if this Long's value differs from the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */

  LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(
    /* validates */
    other);
  };
  /**
   * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */


  LongPrototype.neq = LongPrototype.notEquals;
  /**
   * Tests if this Long's value is less than the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */

  LongPrototype.lessThan = function lessThan(other) {
    return this.comp(
    /* validates */
    other) < 0;
  };
  /**
   * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */


  LongPrototype.lt = LongPrototype.lessThan;
  /**
   * Tests if this Long's value is less than or equal the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */

  LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(
    /* validates */
    other) <= 0;
  };
  /**
   * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */


  LongPrototype.lte = LongPrototype.lessThanOrEqual;
  /**
   * Tests if this Long's value is greater than the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */

  LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(
    /* validates */
    other) > 0;
  };
  /**
   * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */


  LongPrototype.gt = LongPrototype.greaterThan;
  /**
   * Tests if this Long's value is greater than or equal the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */

  LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(
    /* validates */
    other) >= 0;
  };
  /**
   * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {boolean}
   */


  LongPrototype.gte = LongPrototype.greaterThanOrEqual;
  /**
   * Compares this Long's value with the specified's.
   * @param {!Long|number|string} other Other value
   * @returns {number} 0 if they are the same, 1 if the this is greater and -1
   *  if the given one is greater
   */

  LongPrototype.compare = function compare(other) {
    if (!isLong(other)) other = fromValue(other);
    if (this.eq(other)) return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) return -1;
    if (!thisNeg && otherNeg) return 1; // At this point the sign bits are the same

    if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1; // Both are positive if at least one is unsigned

    return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
  };
  /**
   * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
   * @function
   * @param {!Long|number|string} other Other value
   * @returns {number} 0 if they are the same, 1 if the this is greater and -1
   *  if the given one is greater
   */


  LongPrototype.comp = LongPrototype.compare;
  /**
   * Negates this Long's value.
   * @returns {!Long} Negated Long
   */

  LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
    return this.not().add(ONE);
  };
  /**
   * Negates this Long's value. This is an alias of {@link Long#negate}.
   * @function
   * @returns {!Long} Negated Long
   */


  LongPrototype.neg = LongPrototype.negate;
  /**
   * Returns the sum of this and the specified Long.
   * @param {!Long|number|string} addend Addend
   * @returns {!Long} Sum
   */

  LongPrototype.add = function add(addend) {
    if (!isLong(addend)) addend = fromValue(addend); // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;
    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;
    var c48 = 0,
        c32 = 0,
        c16 = 0,
        c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
  };
  /**
   * Returns the difference of this and the specified Long.
   * @param {!Long|number|string} subtrahend Subtrahend
   * @returns {!Long} Difference
   */


  LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
  };
  /**
   * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
   * @function
   * @param {!Long|number|string} subtrahend Subtrahend
   * @returns {!Long} Difference
   */


  LongPrototype.sub = LongPrototype.subtract;
  /**
   * Returns the product of this and the specified Long.
   * @param {!Long|number|string} multiplier Multiplier
   * @returns {!Long} Product
   */

  LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero()) return ZERO;
    if (!isLong(multiplier)) multiplier = fromValue(multiplier);
    if (multiplier.isZero()) return ZERO;
    if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
      if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());else return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg(); // If both longs are small, use float multiplication


    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned); // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;
    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;
    var c48 = 0,
        c32 = 0,
        c16 = 0,
        c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
  };
  /**
   * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
   * @function
   * @param {!Long|number|string} multiplier Multiplier
   * @returns {!Long} Product
   */


  LongPrototype.mul = LongPrototype.multiply;
  /**
   * Returns this Long divided by the specified. The result is signed if this Long is signed or
   *  unsigned if this Long is unsigned.
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Quotient
   */

  LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor)) divisor = fromValue(divisor);
    if (divisor.isZero()) throw Error('division by zero');
    if (this.isZero()) return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;

    if (!this.unsigned) {
      // This section is only relevant for signed longs and is derived from the
      // closure library as a whole.
      if (this.eq(MIN_VALUE)) {
        if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
        else if (divisor.eq(MIN_VALUE)) return ONE;else {
            // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);

            if (approx.eq(ZERO)) {
              return divisor.isNegative() ? ONE : NEG_ONE;
            } else {
              rem = this.sub(divisor.mul(approx));
              res = approx.add(rem.div(divisor));
              return res;
            }
          }
      } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;

      if (this.isNegative()) {
        if (divisor.isNegative()) return this.neg().div(divisor.neg());
        return this.neg().div(divisor).neg();
      } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();

      res = ZERO;
    } else {
      // The algorithm below has not been made for unsigned longs. It's therefore
      // required to take special care of the MSB prior to running it.
      if (!divisor.unsigned) divisor = divisor.toUnsigned();
      if (divisor.gt(this)) return UZERO;
      if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
        return UONE;
      res = UZERO;
    } // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.


    rem = this;

    while (rem.gte(divisor)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber())); // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.

      var log2 = Math.ceil(Math.log(approx) / Math.LN2),
          delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48),
          // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      approxRes = fromNumber(approx),
          approxRem = approxRes.mul(divisor);

      while (approxRem.isNegative() || approxRem.gt(rem)) {
        approx -= delta;
        approxRes = fromNumber(approx, this.unsigned);
        approxRem = approxRes.mul(divisor);
      } // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.


      if (approxRes.isZero()) approxRes = ONE;
      res = res.add(approxRes);
      rem = rem.sub(approxRem);
    }

    return res;
  };
  /**
   * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
   * @function
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Quotient
   */


  LongPrototype.div = LongPrototype.divide;
  /**
   * Returns this Long modulo the specified.
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Remainder
   */

  LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor)) divisor = fromValue(divisor);
    return this.sub(this.div(divisor).mul(divisor));
  };
  /**
   * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
   * @function
   * @param {!Long|number|string} divisor Divisor
   * @returns {!Long} Remainder
   */


  LongPrototype.mod = LongPrototype.modulo;
  /**
   * Returns the bitwise NOT of this Long.
   * @returns {!Long}
   */

  LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
  };
  /**
   * Returns the bitwise AND of this Long and the specified.
   * @param {!Long|number|string} other Other Long
   * @returns {!Long}
   */


  LongPrototype.and = function and(other) {
    if (!isLong(other)) other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
  };
  /**
   * Returns the bitwise OR of this Long and the specified.
   * @param {!Long|number|string} other Other Long
   * @returns {!Long}
   */


  LongPrototype.or = function or(other) {
    if (!isLong(other)) other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
  };
  /**
   * Returns the bitwise XOR of this Long and the given one.
   * @param {!Long|number|string} other Other Long
   * @returns {!Long}
   */


  LongPrototype.xor = function xor(other) {
    if (!isLong(other)) other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
  };
  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */


  LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits)) numBits = numBits.toInt();
    if ((numBits &= 63) === 0) return this;else if (numBits < 32) return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);else return fromBits(0, this.low << numBits - 32, this.unsigned);
  };
  /**
   * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
   * @function
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */


  LongPrototype.shl = LongPrototype.shiftLeft;
  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */

  LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits)) numBits = numBits.toInt();
    if ((numBits &= 63) === 0) return this;else if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);else return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
  };
  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
   * @function
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */


  LongPrototype.shr = LongPrototype.shiftRight;
  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */

  LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits)) numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0) return this;else {
      var high = this.high;

      if (numBits < 32) {
        var low = this.low;
        return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
      } else if (numBits === 32) return fromBits(high, 0, this.unsigned);else return fromBits(high >>> numBits - 32, 0, this.unsigned);
    }
  };
  /**
   * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
   * @function
   * @param {number|!Long} numBits Number of bits
   * @returns {!Long} Shifted Long
   */


  LongPrototype.shru = LongPrototype.shiftRightUnsigned;
  /**
   * Converts this Long to signed.
   * @returns {!Long} Signed long
   */

  LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned) return this;
    return fromBits(this.low, this.high, false);
  };
  /**
   * Converts this Long to unsigned.
   * @returns {!Long} Unsigned long
   */


  LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned) return this;
    return fromBits(this.low, this.high, true);
  };
  /**
   * Converts this Long to its byte representation.
   * @param {boolean=} le Whether little or big endian, defaults to big endian
   * @returns {!Array.<number>} Byte representation
   */


  LongPrototype.toBytes = function (le) {
    return le ? this.toBytesLE() : this.toBytesBE();
  };
  /**
   * Converts this Long to its little endian byte representation.
   * @returns {!Array.<number>} Little endian byte representation
   */


  LongPrototype.toBytesLE = function () {
    var hi = this.high,
        lo = this.low;
    return [lo & 0xff, lo >>> 8 & 0xff, lo >>> 16 & 0xff, lo >>> 24 & 0xff, hi & 0xff, hi >>> 8 & 0xff, hi >>> 16 & 0xff, hi >>> 24 & 0xff];
  };
  /**
   * Converts this Long to its big endian byte representation.
   * @returns {!Array.<number>} Big endian byte representation
   */


  LongPrototype.toBytesBE = function () {
    var hi = this.high,
        lo = this.low;
    return [hi >>> 24 & 0xff, hi >>> 16 & 0xff, hi >>> 8 & 0xff, hi & 0xff, lo >>> 24 & 0xff, lo >>> 16 & 0xff, lo >>> 8 & 0xff, lo & 0xff];
  };

  return Long;
});
});

/*
 Copyright 2013-2014 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license bytebuffer.js (c) 2015 Daniel Wirtz <dcode@dcode.io>
 * Backing buffer / Accessor: node Buffer
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/bytebuffer.js for details
 */
var bytebufferNode = function () {

  var buffer$1 = buffer,
      Buffer = buffer$1["Buffer"],
      Long = long,
      memcpy = null;

  try {
    memcpy = require("memcpy");
  } catch (e) {}
  /**
   * Constructs a new ByteBuffer.
   * @class The swiss army knife for binary data in JavaScript.
   * @exports ByteBuffer
   * @constructor
   * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
   * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
   *  {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
   *  {@link ByteBuffer.DEFAULT_NOASSERT}.
   * @expose
   */


  var ByteBuffer = function (capacity, littleEndian, noAssert) {
    if (typeof capacity === 'undefined') capacity = ByteBuffer.DEFAULT_CAPACITY;
    if (typeof littleEndian === 'undefined') littleEndian = ByteBuffer.DEFAULT_ENDIAN;
    if (typeof noAssert === 'undefined') noAssert = ByteBuffer.DEFAULT_NOASSERT;

    if (!noAssert) {
      capacity = capacity | 0;
      if (capacity < 0) throw RangeError("Illegal capacity");
      littleEndian = !!littleEndian;
      noAssert = !!noAssert;
    }
    /**
     * Backing node Buffer.
     * @type {!Buffer}
     * @expose
     */


    this.buffer = capacity === 0 ? EMPTY_BUFFER : new Buffer(capacity);
    /**
     * Absolute read/write offset.
     * @type {number}
     * @expose
     * @see ByteBuffer#flip
     * @see ByteBuffer#clear
     */

    this.offset = 0;
    /**
     * Marked offset.
     * @type {number}
     * @expose
     * @see ByteBuffer#mark
     * @see ByteBuffer#reset
     */

    this.markedOffset = -1;
    /**
     * Absolute limit of the contained data. Set to the backing buffer's capacity upon allocation.
     * @type {number}
     * @expose
     * @see ByteBuffer#flip
     * @see ByteBuffer#clear
     */

    this.limit = capacity;
    /**
     * Whether to use little endian byte order, defaults to `false` for big endian.
     * @type {boolean}
     * @expose
     */

    this.littleEndian = littleEndian;
    /**
     * Whether to skip assertions of offsets and values, defaults to `false`.
     * @type {boolean}
     * @expose
     */

    this.noAssert = noAssert;
  };
  /**
   * ByteBuffer version.
   * @type {string}
   * @const
   * @expose
   */


  ByteBuffer.VERSION = "5.0.1";
  /**
   * Little endian constant that can be used instead of its boolean value. Evaluates to `true`.
   * @type {boolean}
   * @const
   * @expose
   */

  ByteBuffer.LITTLE_ENDIAN = true;
  /**
   * Big endian constant that can be used instead of its boolean value. Evaluates to `false`.
   * @type {boolean}
   * @const
   * @expose
   */

  ByteBuffer.BIG_ENDIAN = false;
  /**
   * Default initial capacity of `16`.
   * @type {number}
   * @expose
   */

  ByteBuffer.DEFAULT_CAPACITY = 16;
  /**
   * Default endianess of `false` for big endian.
   * @type {boolean}
   * @expose
   */

  ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;
  /**
   * Default no assertions flag of `false`.
   * @type {boolean}
   * @expose
   */

  ByteBuffer.DEFAULT_NOASSERT = false;
  /**
   * A `Long` class for representing a 64-bit two's-complement integer value.
   * @type {!Long}
   * @const
   * @see https://npmjs.org/package/long
   * @expose
   */

  ByteBuffer.Long = Long;
  /**
   * @alias ByteBuffer.prototype
   * @inner
   */

  var ByteBufferPrototype = ByteBuffer.prototype;
  /**
   * An indicator used to reliably determine if an object is a ByteBuffer or not.
   * @type {boolean}
   * @const
   * @expose
   * @private
   */

  ByteBufferPrototype.__isByteBuffer__;
  Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
    value: true,
    enumerable: false,
    configurable: false
  }); // helpers

  /**
   * @type {!Buffer}
   * @inner
   */

  var EMPTY_BUFFER = new Buffer(0);
  /**
   * String.fromCharCode reference for compile-time renaming.
   * @type {function(...number):string}
   * @inner
   */

  var stringFromCharCode = String.fromCharCode;
  /**
   * Creates a source function for a string.
   * @param {string} s String to read from
   * @returns {function():number|null} Source function returning the next char code respectively `null` if there are
   *  no more characters left.
   * @throws {TypeError} If the argument is invalid
   * @inner
   */

  function stringSource(s) {
    var i = 0;
    return function () {
      return i < s.length ? s.charCodeAt(i++) : null;
    };
  }
  /**
   * Creates a destination function for a string.
   * @returns {function(number=):undefined|string} Destination function successively called with the next char code.
   *  Returns the final string when called without arguments.
   * @inner
   */


  function stringDestination() {
    var cs = [],
        ps = [];
    return function () {
      if (arguments.length === 0) return ps.join('') + stringFromCharCode.apply(String, cs);
      if (cs.length + arguments.length > 1024) ps.push(stringFromCharCode.apply(String, cs)), cs.length = 0;
      Array.prototype.push.apply(cs, arguments);
    };
  }
  /**
   * Gets the accessor type.
   * @returns {Function} `Buffer` under node.js, `Uint8Array` respectively `DataView` in the browser (classes)
   * @expose
   */


  ByteBuffer.accessor = function () {
    return Buffer;
  };
  /**
   * Allocates a new ByteBuffer backed by a buffer of the specified capacity.
   * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
   * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
   *  {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
   *  {@link ByteBuffer.DEFAULT_NOASSERT}.
   * @returns {!ByteBuffer}
   * @expose
   */


  ByteBuffer.allocate = function (capacity, littleEndian, noAssert) {
    return new ByteBuffer(capacity, littleEndian, noAssert);
  };
  /**
   * Concatenates multiple ByteBuffers into one.
   * @param {!Array.<!ByteBuffer|!Buffer|!ArrayBuffer|!Uint8Array|string>} buffers Buffers to concatenate
   * @param {(string|boolean)=} encoding String encoding if `buffers` contains a string ("base64", "hex", "binary",
   *  defaults to "utf8")
   * @param {boolean=} littleEndian Whether to use little or big endian byte order for the resulting ByteBuffer. Defaults
   *  to {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @param {boolean=} noAssert Whether to skip assertions of offsets and values for the resulting ByteBuffer. Defaults to
   *  {@link ByteBuffer.DEFAULT_NOASSERT}.
   * @returns {!ByteBuffer} Concatenated ByteBuffer
   * @expose
   */


  ByteBuffer.concat = function (buffers, encoding, littleEndian, noAssert) {
    if (typeof encoding === 'boolean' || typeof encoding !== 'string') {
      noAssert = littleEndian;
      littleEndian = encoding;
      encoding = undefined;
    }

    var capacity = 0;

    for (var i = 0, k = buffers.length, length; i < k; ++i) {
      if (!ByteBuffer.isByteBuffer(buffers[i])) buffers[i] = ByteBuffer.wrap(buffers[i], encoding);
      length = buffers[i].limit - buffers[i].offset;
      if (length > 0) capacity += length;
    }

    if (capacity === 0) return new ByteBuffer(0, littleEndian, noAssert);
    var bb = new ByteBuffer(capacity, littleEndian, noAssert),
        bi;
    i = 0;

    while (i < k) {
      bi = buffers[i++];
      length = bi.limit - bi.offset;
      if (length <= 0) continue;
      bi.buffer.copy(bb.buffer, bb.offset, bi.offset, bi.limit);
      bb.offset += length;
    }

    bb.limit = bb.offset;
    bb.offset = 0;
    return bb;
  };
  /**
   * Tests if the specified type is a ByteBuffer.
   * @param {*} bb ByteBuffer to test
   * @returns {boolean} `true` if it is a ByteBuffer, otherwise `false`
   * @expose
   */


  ByteBuffer.isByteBuffer = function (bb) {
    return (bb && bb["__isByteBuffer__"]) === true;
  };
  /**
   * Gets the backing buffer type.
   * @returns {Function} `Buffer` under node.js, `ArrayBuffer` in the browser (classes)
   * @expose
   */


  ByteBuffer.type = function () {
    return Buffer;
  };
  /**
   * Wraps a buffer or a string. Sets the allocated ByteBuffer's {@link ByteBuffer#offset} to `0` and its
   *  {@link ByteBuffer#limit} to the length of the wrapped data.
   * @param {!ByteBuffer|!Buffer|!ArrayBuffer|!Uint8Array|string|!Array.<number>} buffer Anything that can be wrapped
   * @param {(string|boolean)=} encoding String encoding if `buffer` is a string ("base64", "hex", "binary", defaults to
   *  "utf8")
   * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
   *  {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
   *  {@link ByteBuffer.DEFAULT_NOASSERT}.
   * @returns {!ByteBuffer} A ByteBuffer wrapping `buffer`
   * @expose
   */


  ByteBuffer.wrap = function (buffer, encoding, littleEndian, noAssert) {
    if (typeof encoding !== 'string') {
      noAssert = littleEndian;
      littleEndian = encoding;
      encoding = undefined;
    }

    if (typeof buffer === 'string') {
      if (typeof encoding === 'undefined') encoding = "utf8";

      switch (encoding) {
        case "base64":
          return ByteBuffer.fromBase64(buffer, littleEndian);

        case "hex":
          return ByteBuffer.fromHex(buffer, littleEndian);

        case "binary":
          return ByteBuffer.fromBinary(buffer, littleEndian);

        case "utf8":
          return ByteBuffer.fromUTF8(buffer, littleEndian);

        case "debug":
          return ByteBuffer.fromDebug(buffer, littleEndian);

        default:
          throw Error("Unsupported encoding: " + encoding);
      }
    }

    if (buffer === null || typeof buffer !== 'object') throw TypeError("Illegal buffer");
    var bb;

    if (ByteBuffer.isByteBuffer(buffer)) {
      bb = ByteBufferPrototype.clone.call(buffer);
      bb.markedOffset = -1;
      return bb;
    }

    var i = 0,
        k = 0,
        b;

    if (buffer instanceof Uint8Array) {
      // Extract bytes from Uint8Array
      b = new Buffer(buffer.length);

      if (memcpy) {
        // Fast
        memcpy(b, 0, buffer.buffer, buffer.byteOffset, buffer.byteOffset + buffer.length);
      } else {
        // Slow
        for (i = 0, k = buffer.length; i < k; ++i) b[i] = buffer[i];
      }

      buffer = b;
    } else if (buffer instanceof ArrayBuffer) {
      // Convert ArrayBuffer to Buffer
      b = new Buffer(buffer.byteLength);

      if (memcpy) {
        // Fast
        memcpy(b, 0, buffer, 0, buffer.byteLength);
      } else {
        // Slow
        buffer = new Uint8Array(buffer);

        for (i = 0, k = buffer.length; i < k; ++i) {
          b[i] = buffer[i];
        }
      }

      buffer = b;
    } else if (!(buffer instanceof Buffer)) {
      // Create from octets if it is an error, otherwise fail
      if (Object.prototype.toString.call(buffer) !== "[object Array]") throw TypeError("Illegal buffer");
      buffer = new Buffer(buffer);
    }

    bb = new ByteBuffer(0, littleEndian, noAssert);

    if (buffer.length > 0) {
      // Avoid references to more than one EMPTY_BUFFER
      bb.buffer = buffer;
      bb.limit = buffer.length;
    }

    return bb;
  };
  /**
   * Writes the array as a bitset.
   * @param {Array<boolean>} value Array of booleans to write
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
   * @returns {!ByteBuffer}
   * @expose
   */


  ByteBufferPrototype.writeBitSet = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (!(value instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    var start = offset,
        bits = value.length,
        bytes = bits >> 3,
        bit = 0,
        k;
    offset += this.writeVarint32(bits, offset);

    while (bytes--) {
      k = !!value[bit++] & 1 | (!!value[bit++] & 1) << 1 | (!!value[bit++] & 1) << 2 | (!!value[bit++] & 1) << 3 | (!!value[bit++] & 1) << 4 | (!!value[bit++] & 1) << 5 | (!!value[bit++] & 1) << 6 | (!!value[bit++] & 1) << 7;
      this.writeByte(k, offset++);
    }

    if (bit < bits) {
      var m = 0;
      k = 0;

      while (bit < bits) k = k | (!!value[bit++] & 1) << m++;

      this.writeByte(k, offset++);
    }

    if (relative) {
      this.offset = offset;
      return this;
    }

    return offset - start;
  };
  /**
   * Reads a BitSet as an array of booleans.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
   * @returns {Array<boolean>
   * @expose
   */


  ByteBufferPrototype.readBitSet = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;
    var ret = this.readVarint32(offset),
        bits = ret.value,
        bytes = bits >> 3,
        bit = 0,
        value = [],
        k;
    offset += ret.length;

    while (bytes--) {
      k = this.readByte(offset++);
      value[bit++] = !!(k & 0x01);
      value[bit++] = !!(k & 0x02);
      value[bit++] = !!(k & 0x04);
      value[bit++] = !!(k & 0x08);
      value[bit++] = !!(k & 0x10);
      value[bit++] = !!(k & 0x20);
      value[bit++] = !!(k & 0x40);
      value[bit++] = !!(k & 0x80);
    }

    if (bit < bits) {
      var m = 0;
      k = this.readByte(offset++);

      while (bit < bits) value[bit++] = !!(k >> m++ & 1);
    }

    if (relative) {
      this.offset = offset;
    }

    return value;
  };
  /**
   * Reads the specified number of bytes.
   * @param {number} length Number of bytes to read
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
   * @returns {!ByteBuffer}
   * @expose
   */


  ByteBufferPrototype.readBytes = function (length, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + length > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.length);
    }

    var slice = this.slice(offset, offset + length);
    if (relative) this.offset += length;
    return slice;
  };
  /**
   * Writes a payload of bytes. This is an alias of {@link ByteBuffer#append}.
   * @function
   * @param {!ByteBuffer|!Buffer|!ArrayBuffer|!Uint8Array|string} source Data to write. If `source` is a ByteBuffer, its
   * offsets will be modified according to the performed read operation.
   * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.writeBytes = ByteBufferPrototype.append; // types/ints/int8

  /**
   * Writes an 8bit signed integer.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */

  ByteBufferPrototype.writeInt8 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number' || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
      value |= 0;
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    offset += 1;
    var capacity0 = this.buffer.length;
    if (offset > capacity0) this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
    offset -= 1;
    this.buffer[offset] = value;
    if (relative) this.offset += 1;
    return this;
  };
  /**
   * Writes an 8bit signed integer. This is an alias of {@link ByteBuffer#writeInt8}.
   * @function
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;
  /**
   * Reads an 8bit signed integer.
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
   * @returns {number} Value read
   * @expose
   */

  ByteBufferPrototype.readInt8 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 1 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 1 + ") <= " + this.buffer.length);
    }

    var value = this.buffer[offset];
    if ((value & 0x80) === 0x80) value = -(0xFF - value + 1); // Cast to signed

    if (relative) this.offset += 1;
    return value;
  };
  /**
   * Reads an 8bit signed integer. This is an alias of {@link ByteBuffer#readInt8}.
   * @function
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
   * @returns {number} Value read
   * @expose
   */


  ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;
  /**
   * Writes an 8bit unsigned integer.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */

  ByteBufferPrototype.writeUint8 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number' || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
      value >>>= 0;
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    offset += 1;
    var capacity1 = this.buffer.length;
    if (offset > capacity1) this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
    offset -= 1;
    this.buffer[offset] = value;
    if (relative) this.offset += 1;
    return this;
  };
  /**
   * Writes an 8bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint8}.
   * @function
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8;
  /**
   * Reads an 8bit unsigned integer.
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
   * @returns {number} Value read
   * @expose
   */

  ByteBufferPrototype.readUint8 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 1 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 1 + ") <= " + this.buffer.length);
    }

    var value = this.buffer[offset];
    if (relative) this.offset += 1;
    return value;
  };
  /**
   * Reads an 8bit unsigned integer. This is an alias of {@link ByteBuffer#readUint8}.
   * @function
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
   * @returns {number} Value read
   * @expose
   */


  ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8; // types/ints/int16

  /**
   * Writes a 16bit signed integer.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
   * @throws {TypeError} If `offset` or `value` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @expose
   */

  ByteBufferPrototype.writeInt16 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number' || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
      value |= 0;
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    offset += 2;
    var capacity2 = this.buffer.length;
    if (offset > capacity2) this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
    offset -= 2;

    if (this.littleEndian) {
      this.buffer[offset + 1] = (value & 0xFF00) >>> 8;
      this.buffer[offset] = value & 0x00FF;
    } else {
      this.buffer[offset] = (value & 0xFF00) >>> 8;
      this.buffer[offset + 1] = value & 0x00FF;
    }

    if (relative) this.offset += 2;
    return this;
  };
  /**
   * Writes a 16bit signed integer. This is an alias of {@link ByteBuffer#writeInt16}.
   * @function
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
   * @throws {TypeError} If `offset` or `value` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @expose
   */


  ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;
  /**
   * Reads a 16bit signed integer.
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
   * @returns {number} Value read
   * @throws {TypeError} If `offset` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @expose
   */

  ByteBufferPrototype.readInt16 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 2 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 2 + ") <= " + this.buffer.length);
    }

    var value = 0;

    if (this.littleEndian) {
      value = this.buffer[offset];
      value |= this.buffer[offset + 1] << 8;
    } else {
      value = this.buffer[offset] << 8;
      value |= this.buffer[offset + 1];
    }

    if ((value & 0x8000) === 0x8000) value = -(0xFFFF - value + 1); // Cast to signed

    if (relative) this.offset += 2;
    return value;
  };
  /**
   * Reads a 16bit signed integer. This is an alias of {@link ByteBuffer#readInt16}.
   * @function
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
   * @returns {number} Value read
   * @throws {TypeError} If `offset` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @expose
   */


  ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;
  /**
   * Writes a 16bit unsigned integer.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
   * @throws {TypeError} If `offset` or `value` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @expose
   */

  ByteBufferPrototype.writeUint16 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number' || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
      value >>>= 0;
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    offset += 2;
    var capacity3 = this.buffer.length;
    if (offset > capacity3) this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
    offset -= 2;

    if (this.littleEndian) {
      this.buffer[offset + 1] = (value & 0xFF00) >>> 8;
      this.buffer[offset] = value & 0x00FF;
    } else {
      this.buffer[offset] = (value & 0xFF00) >>> 8;
      this.buffer[offset + 1] = value & 0x00FF;
    }

    if (relative) this.offset += 2;
    return this;
  };
  /**
   * Writes a 16bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint16}.
   * @function
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
   * @throws {TypeError} If `offset` or `value` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @expose
   */


  ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16;
  /**
   * Reads a 16bit unsigned integer.
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
   * @returns {number} Value read
   * @throws {TypeError} If `offset` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @expose
   */

  ByteBufferPrototype.readUint16 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 2 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 2 + ") <= " + this.buffer.length);
    }

    var value = 0;

    if (this.littleEndian) {
      value = this.buffer[offset];
      value |= this.buffer[offset + 1] << 8;
    } else {
      value = this.buffer[offset] << 8;
      value |= this.buffer[offset + 1];
    }

    if (relative) this.offset += 2;
    return value;
  };
  /**
   * Reads a 16bit unsigned integer. This is an alias of {@link ByteBuffer#readUint16}.
   * @function
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
   * @returns {number} Value read
   * @throws {TypeError} If `offset` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @expose
   */


  ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16; // types/ints/int32

  /**
   * Writes a 32bit signed integer.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @expose
   */

  ByteBufferPrototype.writeInt32 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number' || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
      value |= 0;
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    offset += 4;
    var capacity4 = this.buffer.length;
    if (offset > capacity4) this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
    offset -= 4;

    if (this.littleEndian) {
      this.buffer[offset + 3] = value >>> 24 & 0xFF;
      this.buffer[offset + 2] = value >>> 16 & 0xFF;
      this.buffer[offset + 1] = value >>> 8 & 0xFF;
      this.buffer[offset] = value & 0xFF;
    } else {
      this.buffer[offset] = value >>> 24 & 0xFF;
      this.buffer[offset + 1] = value >>> 16 & 0xFF;
      this.buffer[offset + 2] = value >>> 8 & 0xFF;
      this.buffer[offset + 3] = value & 0xFF;
    }

    if (relative) this.offset += 4;
    return this;
  };
  /**
   * Writes a 32bit signed integer. This is an alias of {@link ByteBuffer#writeInt32}.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @expose
   */


  ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;
  /**
   * Reads a 32bit signed integer.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @returns {number} Value read
   * @expose
   */

  ByteBufferPrototype.readInt32 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 4 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 4 + ") <= " + this.buffer.length);
    }

    var value = 0;

    if (this.littleEndian) {
      value = this.buffer[offset + 2] << 16;
      value |= this.buffer[offset + 1] << 8;
      value |= this.buffer[offset];
      value += this.buffer[offset + 3] << 24 >>> 0;
    } else {
      value = this.buffer[offset + 1] << 16;
      value |= this.buffer[offset + 2] << 8;
      value |= this.buffer[offset + 3];
      value += this.buffer[offset] << 24 >>> 0;
    }

    value |= 0; // Cast to signed

    if (relative) this.offset += 4;
    return value;
  };
  /**
   * Reads a 32bit signed integer. This is an alias of {@link ByteBuffer#readInt32}.
   * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `4` if omitted.
   * @returns {number} Value read
   * @expose
   */


  ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;
  /**
   * Writes a 32bit unsigned integer.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @expose
   */

  ByteBufferPrototype.writeUint32 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number' || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
      value >>>= 0;
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    offset += 4;
    var capacity5 = this.buffer.length;
    if (offset > capacity5) this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
    offset -= 4;

    if (this.littleEndian) {
      this.buffer[offset + 3] = value >>> 24 & 0xFF;
      this.buffer[offset + 2] = value >>> 16 & 0xFF;
      this.buffer[offset + 1] = value >>> 8 & 0xFF;
      this.buffer[offset] = value & 0xFF;
    } else {
      this.buffer[offset] = value >>> 24 & 0xFF;
      this.buffer[offset + 1] = value >>> 16 & 0xFF;
      this.buffer[offset + 2] = value >>> 8 & 0xFF;
      this.buffer[offset + 3] = value & 0xFF;
    }

    if (relative) this.offset += 4;
    return this;
  };
  /**
   * Writes a 32bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint32}.
   * @function
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @expose
   */


  ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32;
  /**
   * Reads a 32bit unsigned integer.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @returns {number} Value read
   * @expose
   */

  ByteBufferPrototype.readUint32 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 4 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 4 + ") <= " + this.buffer.length);
    }

    var value = 0;

    if (this.littleEndian) {
      value = this.buffer[offset + 2] << 16;
      value |= this.buffer[offset + 1] << 8;
      value |= this.buffer[offset];
      value += this.buffer[offset + 3] << 24 >>> 0;
    } else {
      value = this.buffer[offset + 1] << 16;
      value |= this.buffer[offset + 2] << 8;
      value |= this.buffer[offset + 3];
      value += this.buffer[offset] << 24 >>> 0;
    }

    if (relative) this.offset += 4;
    return value;
  };
  /**
   * Reads a 32bit unsigned integer. This is an alias of {@link ByteBuffer#readUint32}.
   * @function
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @returns {number} Value read
   * @expose
   */


  ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32; // types/ints/int64

  if (Long) {
    /**
     * Writes a 64bit signed integer.
     * @param {number|!Long} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */
    ByteBufferPrototype.writeInt64 = function (value, offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;

      if (!this.noAssert) {
        if (typeof value === 'number') value = Long.fromNumber(value);else if (typeof value === 'string') value = Long.fromString(value);else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
        if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
      }

      if (typeof value === 'number') value = Long.fromNumber(value);else if (typeof value === 'string') value = Long.fromString(value);
      offset += 8;
      var capacity6 = this.buffer.length;
      if (offset > capacity6) this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
      offset -= 8;
      var lo = value.low,
          hi = value.high;

      if (this.littleEndian) {
        this.buffer[offset + 3] = lo >>> 24 & 0xFF;
        this.buffer[offset + 2] = lo >>> 16 & 0xFF;
        this.buffer[offset + 1] = lo >>> 8 & 0xFF;
        this.buffer[offset] = lo & 0xFF;
        offset += 4;
        this.buffer[offset + 3] = hi >>> 24 & 0xFF;
        this.buffer[offset + 2] = hi >>> 16 & 0xFF;
        this.buffer[offset + 1] = hi >>> 8 & 0xFF;
        this.buffer[offset] = hi & 0xFF;
      } else {
        this.buffer[offset] = hi >>> 24 & 0xFF;
        this.buffer[offset + 1] = hi >>> 16 & 0xFF;
        this.buffer[offset + 2] = hi >>> 8 & 0xFF;
        this.buffer[offset + 3] = hi & 0xFF;
        offset += 4;
        this.buffer[offset] = lo >>> 24 & 0xFF;
        this.buffer[offset + 1] = lo >>> 16 & 0xFF;
        this.buffer[offset + 2] = lo >>> 8 & 0xFF;
        this.buffer[offset + 3] = lo & 0xFF;
      }

      if (relative) this.offset += 8;
      return this;
    };
    /**
     * Writes a 64bit signed integer. This is an alias of {@link ByteBuffer#writeInt64}.
     * @param {number|!Long} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */


    ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;
    /**
     * Reads a 64bit signed integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!Long}
     * @expose
     */

    ByteBufferPrototype.readInt64 = function (offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;

      if (!this.noAssert) {
        if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 8 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 8 + ") <= " + this.buffer.length);
      }

      var lo = 0,
          hi = 0;

      if (this.littleEndian) {
        lo = this.buffer[offset + 2] << 16;
        lo |= this.buffer[offset + 1] << 8;
        lo |= this.buffer[offset];
        lo += this.buffer[offset + 3] << 24 >>> 0;
        offset += 4;
        hi = this.buffer[offset + 2] << 16;
        hi |= this.buffer[offset + 1] << 8;
        hi |= this.buffer[offset];
        hi += this.buffer[offset + 3] << 24 >>> 0;
      } else {
        hi = this.buffer[offset + 1] << 16;
        hi |= this.buffer[offset + 2] << 8;
        hi |= this.buffer[offset + 3];
        hi += this.buffer[offset] << 24 >>> 0;
        offset += 4;
        lo = this.buffer[offset + 1] << 16;
        lo |= this.buffer[offset + 2] << 8;
        lo |= this.buffer[offset + 3];
        lo += this.buffer[offset] << 24 >>> 0;
      }

      var value = new Long(lo, hi, false);
      if (relative) this.offset += 8;
      return value;
    };
    /**
     * Reads a 64bit signed integer. This is an alias of {@link ByteBuffer#readInt64}.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!Long}
     * @expose
     */


    ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;
    /**
     * Writes a 64bit unsigned integer.
     * @param {number|!Long} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */

    ByteBufferPrototype.writeUint64 = function (value, offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;

      if (!this.noAssert) {
        if (typeof value === 'number') value = Long.fromNumber(value);else if (typeof value === 'string') value = Long.fromString(value);else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
        if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
      }

      if (typeof value === 'number') value = Long.fromNumber(value);else if (typeof value === 'string') value = Long.fromString(value);
      offset += 8;
      var capacity7 = this.buffer.length;
      if (offset > capacity7) this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
      offset -= 8;
      var lo = value.low,
          hi = value.high;

      if (this.littleEndian) {
        this.buffer[offset + 3] = lo >>> 24 & 0xFF;
        this.buffer[offset + 2] = lo >>> 16 & 0xFF;
        this.buffer[offset + 1] = lo >>> 8 & 0xFF;
        this.buffer[offset] = lo & 0xFF;
        offset += 4;
        this.buffer[offset + 3] = hi >>> 24 & 0xFF;
        this.buffer[offset + 2] = hi >>> 16 & 0xFF;
        this.buffer[offset + 1] = hi >>> 8 & 0xFF;
        this.buffer[offset] = hi & 0xFF;
      } else {
        this.buffer[offset] = hi >>> 24 & 0xFF;
        this.buffer[offset + 1] = hi >>> 16 & 0xFF;
        this.buffer[offset + 2] = hi >>> 8 & 0xFF;
        this.buffer[offset + 3] = hi & 0xFF;
        offset += 4;
        this.buffer[offset] = lo >>> 24 & 0xFF;
        this.buffer[offset + 1] = lo >>> 16 & 0xFF;
        this.buffer[offset + 2] = lo >>> 8 & 0xFF;
        this.buffer[offset + 3] = lo & 0xFF;
      }

      if (relative) this.offset += 8;
      return this;
    };
    /**
     * Writes a 64bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint64}.
     * @function
     * @param {number|!Long} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!ByteBuffer} this
     * @expose
     */


    ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64;
    /**
     * Reads a 64bit unsigned integer.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!Long}
     * @expose
     */

    ByteBufferPrototype.readUint64 = function (offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;

      if (!this.noAssert) {
        if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 8 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 8 + ") <= " + this.buffer.length);
      }

      var lo = 0,
          hi = 0;

      if (this.littleEndian) {
        lo = this.buffer[offset + 2] << 16;
        lo |= this.buffer[offset + 1] << 8;
        lo |= this.buffer[offset];
        lo += this.buffer[offset + 3] << 24 >>> 0;
        offset += 4;
        hi = this.buffer[offset + 2] << 16;
        hi |= this.buffer[offset + 1] << 8;
        hi |= this.buffer[offset];
        hi += this.buffer[offset + 3] << 24 >>> 0;
      } else {
        hi = this.buffer[offset + 1] << 16;
        hi |= this.buffer[offset + 2] << 8;
        hi |= this.buffer[offset + 3];
        hi += this.buffer[offset] << 24 >>> 0;
        offset += 4;
        lo = this.buffer[offset + 1] << 16;
        lo |= this.buffer[offset + 2] << 8;
        lo |= this.buffer[offset + 3];
        lo += this.buffer[offset] << 24 >>> 0;
      }

      var value = new Long(lo, hi, true);
      if (relative) this.offset += 8;
      return value;
    };
    /**
     * Reads a 64bit unsigned integer. This is an alias of {@link ByteBuffer#readUint64}.
     * @function
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
     * @returns {!Long}
     * @expose
     */


    ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64;
  } // Long
  // types/floats/float32

  /**
   * Writes a 32bit float.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.writeFloat32 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number') throw TypeError("Illegal value: " + value + " (not a number)");
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    offset += 4;
    var capacity8 = this.buffer.length;
    if (offset > capacity8) this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
    offset -= 4;
    this.littleEndian ? this.buffer.writeFloatLE(value, offset, true) : this.buffer.writeFloatBE(value, offset, true);
    if (relative) this.offset += 4;
    return this;
  };
  /**
   * Writes a 32bit float. This is an alias of {@link ByteBuffer#writeFloat32}.
   * @function
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;
  /**
   * Reads a 32bit float.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @returns {number}
   * @expose
   */

  ByteBufferPrototype.readFloat32 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 4 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 4 + ") <= " + this.buffer.length);
    }

    var value = this.littleEndian ? this.buffer.readFloatLE(offset, true) : this.buffer.readFloatBE(offset, true);
    if (relative) this.offset += 4;
    return value;
  };
  /**
   * Reads a 32bit float. This is an alias of {@link ByteBuffer#readFloat32}.
   * @function
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
   * @returns {number}
   * @expose
   */


  ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32; // types/floats/float64

  /**
   * Writes a 64bit float.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */

  ByteBufferPrototype.writeFloat64 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number') throw TypeError("Illegal value: " + value + " (not a number)");
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    offset += 8;
    var capacity9 = this.buffer.length;
    if (offset > capacity9) this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
    offset -= 8;
    this.littleEndian ? this.buffer.writeDoubleLE(value, offset, true) : this.buffer.writeDoubleBE(value, offset, true);
    if (relative) this.offset += 8;
    return this;
  };
  /**
   * Writes a 64bit float. This is an alias of {@link ByteBuffer#writeFloat64}.
   * @function
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;
  /**
   * Reads a 64bit float.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
   * @returns {number}
   * @expose
   */

  ByteBufferPrototype.readFloat64 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 8 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 8 + ") <= " + this.buffer.length);
    }

    var value = this.littleEndian ? this.buffer.readDoubleLE(offset, true) : this.buffer.readDoubleBE(offset, true);
    if (relative) this.offset += 8;
    return value;
  };
  /**
   * Reads a 64bit float. This is an alias of {@link ByteBuffer#readFloat64}.
   * @function
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
   * @returns {number}
   * @expose
   */


  ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64; // types/varints/varint32

  /**
   * Maximum number of bytes required to store a 32bit base 128 variable-length integer.
   * @type {number}
   * @const
   * @expose
   */

  ByteBuffer.MAX_VARINT32_BYTES = 5;
  /**
   * Calculates the actual number of bytes required to store a 32bit base 128 variable-length integer.
   * @param {number} value Value to encode
   * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT32_BYTES}
   * @expose
   */

  ByteBuffer.calculateVarint32 = function (value) {
    // ref: src/google/protobuf/io/coded_stream.cc
    value = value >>> 0;
    if (value < 1 << 7) return 1;else if (value < 1 << 14) return 2;else if (value < 1 << 21) return 3;else if (value < 1 << 28) return 4;else return 5;
  };
  /**
   * Zigzag encodes a signed 32bit integer so that it can be effectively used with varint encoding.
   * @param {number} n Signed 32bit integer
   * @returns {number} Unsigned zigzag encoded 32bit integer
   * @expose
   */


  ByteBuffer.zigZagEncode32 = function (n) {
    return ((n |= 0) << 1 ^ n >> 31) >>> 0; // ref: src/google/protobuf/wire_format_lite.h
  };
  /**
   * Decodes a zigzag encoded signed 32bit integer.
   * @param {number} n Unsigned zigzag encoded 32bit integer
   * @returns {number} Signed 32bit integer
   * @expose
   */


  ByteBuffer.zigZagDecode32 = function (n) {
    return n >>> 1 ^ -(n & 1) | 0; // // ref: src/google/protobuf/wire_format_lite.h
  };
  /**
   * Writes a 32bit base 128 variable-length integer.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted.
   * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
   * @expose
   */


  ByteBufferPrototype.writeVarint32 = function (value, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof value !== 'number' || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
      value |= 0;
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    var size = ByteBuffer.calculateVarint32(value),
        b;
    offset += size;
    var capacity10 = this.buffer.length;
    if (offset > capacity10) this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
    offset -= size;
    value >>>= 0;

    while (value >= 0x80) {
      b = value & 0x7f | 0x80;
      this.buffer[offset++] = b;
      value >>>= 7;
    }

    this.buffer[offset++] = value;

    if (relative) {
      this.offset = offset;
      return this;
    }

    return size;
  };
  /**
   * Writes a zig-zag encoded (signed) 32bit base 128 variable-length integer.
   * @param {number} value Value to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted.
   * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
   * @expose
   */


  ByteBufferPrototype.writeVarint32ZigZag = function (value, offset) {
    return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
  };
  /**
   * Reads a 32bit base 128 variable-length integer.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted.
   * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
   *  and the actual number of bytes read.
   * @throws {Error} If it's not a valid varint. Has a property `truncated = true` if there is not enough data available
   *  to fully decode the varint.
   * @expose
   */


  ByteBufferPrototype.readVarint32 = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 1 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 1 + ") <= " + this.buffer.length);
    }

    var c = 0,
        value = 0 >>> 0,
        b;

    do {
      if (!this.noAssert && offset > this.limit) {
        var err = Error("Truncated");
        err['truncated'] = true;
        throw err;
      }

      b = this.buffer[offset++];
      if (c < 5) value |= (b & 0x7f) << 7 * c;
      ++c;
    } while ((b & 0x80) !== 0);

    value |= 0;

    if (relative) {
      this.offset = offset;
      return value;
    }

    return {
      "value": value,
      "length": c
    };
  };
  /**
   * Reads a zig-zag encoded (signed) 32bit base 128 variable-length integer.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted.
   * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
   *  and the actual number of bytes read.
   * @throws {Error} If it's not a valid varint
   * @expose
   */


  ByteBufferPrototype.readVarint32ZigZag = function (offset) {
    var val = this.readVarint32(offset);
    if (typeof val === 'object') val["value"] = ByteBuffer.zigZagDecode32(val["value"]);else val = ByteBuffer.zigZagDecode32(val);
    return val;
  }; // types/varints/varint64


  if (Long) {
    /**
     * Maximum number of bytes required to store a 64bit base 128 variable-length integer.
     * @type {number}
     * @const
     * @expose
     */
    ByteBuffer.MAX_VARINT64_BYTES = 10;
    /**
     * Calculates the actual number of bytes required to store a 64bit base 128 variable-length integer.
     * @param {number|!Long} value Value to encode
     * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT64_BYTES}
     * @expose
     */

    ByteBuffer.calculateVarint64 = function (value) {
      if (typeof value === 'number') value = Long.fromNumber(value);else if (typeof value === 'string') value = Long.fromString(value); // ref: src/google/protobuf/io/coded_stream.cc

      var part0 = value.toInt() >>> 0,
          part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
          part2 = value.shiftRightUnsigned(56).toInt() >>> 0;

      if (part2 == 0) {
        if (part1 == 0) {
          if (part0 < 1 << 14) return part0 < 1 << 7 ? 1 : 2;else return part0 < 1 << 21 ? 3 : 4;
        } else {
          if (part1 < 1 << 14) return part1 < 1 << 7 ? 5 : 6;else return part1 < 1 << 21 ? 7 : 8;
        }
      } else return part2 < 1 << 7 ? 9 : 10;
    };
    /**
     * Zigzag encodes a signed 64bit integer so that it can be effectively used with varint encoding.
     * @param {number|!Long} value Signed long
     * @returns {!Long} Unsigned zigzag encoded long
     * @expose
     */


    ByteBuffer.zigZagEncode64 = function (value) {
      if (typeof value === 'number') value = Long.fromNumber(value, false);else if (typeof value === 'string') value = Long.fromString(value, false);else if (value.unsigned !== false) value = value.toSigned(); // ref: src/google/protobuf/wire_format_lite.h

      return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
    };
    /**
     * Decodes a zigzag encoded signed 64bit integer.
     * @param {!Long|number} value Unsigned zigzag encoded long or JavaScript number
     * @returns {!Long} Signed long
     * @expose
     */


    ByteBuffer.zigZagDecode64 = function (value) {
      if (typeof value === 'number') value = Long.fromNumber(value, false);else if (typeof value === 'string') value = Long.fromString(value, false);else if (value.unsigned !== false) value = value.toSigned(); // ref: src/google/protobuf/wire_format_lite.h

      return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
    };
    /**
     * Writes a 64bit base 128 variable-length integer.
     * @param {number|Long} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
     * @expose
     */


    ByteBufferPrototype.writeVarint64 = function (value, offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;

      if (!this.noAssert) {
        if (typeof value === 'number') value = Long.fromNumber(value);else if (typeof value === 'string') value = Long.fromString(value);else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
        if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
      }

      if (typeof value === 'number') value = Long.fromNumber(value, false);else if (typeof value === 'string') value = Long.fromString(value, false);else if (value.unsigned !== false) value = value.toSigned();
      var size = ByteBuffer.calculateVarint64(value),
          part0 = value.toInt() >>> 0,
          part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
          part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
      offset += size;
      var capacity11 = this.buffer.length;
      if (offset > capacity11) this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
      offset -= size;

      switch (size) {
        case 10:
          this.buffer[offset + 9] = part2 >>> 7 & 0x01;

        case 9:
          this.buffer[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;

        case 8:
          this.buffer[offset + 7] = size !== 8 ? part1 >>> 21 | 0x80 : part1 >>> 21 & 0x7F;

        case 7:
          this.buffer[offset + 6] = size !== 7 ? part1 >>> 14 | 0x80 : part1 >>> 14 & 0x7F;

        case 6:
          this.buffer[offset + 5] = size !== 6 ? part1 >>> 7 | 0x80 : part1 >>> 7 & 0x7F;

        case 5:
          this.buffer[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;

        case 4:
          this.buffer[offset + 3] = size !== 4 ? part0 >>> 21 | 0x80 : part0 >>> 21 & 0x7F;

        case 3:
          this.buffer[offset + 2] = size !== 3 ? part0 >>> 14 | 0x80 : part0 >>> 14 & 0x7F;

        case 2:
          this.buffer[offset + 1] = size !== 2 ? part0 >>> 7 | 0x80 : part0 >>> 7 & 0x7F;

        case 1:
          this.buffer[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
      }

      if (relative) {
        this.offset += size;
        return this;
      } else {
        return size;
      }
    };
    /**
     * Writes a zig-zag encoded 64bit base 128 variable-length integer.
     * @param {number|Long} value Value to write
     * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  written if omitted.
     * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
     * @expose
     */


    ByteBufferPrototype.writeVarint64ZigZag = function (value, offset) {
      return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
    };
    /**
     * Reads a 64bit base 128 variable-length integer. Requires Long.js.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
     *  the actual number of bytes read.
     * @throws {Error} If it's not a valid varint
     * @expose
     */


    ByteBufferPrototype.readVarint64 = function (offset) {
      var relative = typeof offset === 'undefined';
      if (relative) offset = this.offset;

      if (!this.noAssert) {
        if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + 1 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 1 + ") <= " + this.buffer.length);
      } // ref: src/google/protobuf/io/coded_stream.cc


      var start = offset,
          part0 = 0,
          part1 = 0,
          part2 = 0,
          b = 0;
      b = this.buffer[offset++];
      part0 = b & 0x7F;

      if (b & 0x80) {
        b = this.buffer[offset++];
        part0 |= (b & 0x7F) << 7;

        if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
          b = this.buffer[offset++];
          part0 |= (b & 0x7F) << 14;

          if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
            b = this.buffer[offset++];
            part0 |= (b & 0x7F) << 21;

            if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
              b = this.buffer[offset++];
              part1 = b & 0x7F;

              if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
                b = this.buffer[offset++];
                part1 |= (b & 0x7F) << 7;

                if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
                  b = this.buffer[offset++];
                  part1 |= (b & 0x7F) << 14;

                  if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
                    b = this.buffer[offset++];
                    part1 |= (b & 0x7F) << 21;

                    if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
                      b = this.buffer[offset++];
                      part2 = b & 0x7F;

                      if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
                        b = this.buffer[offset++];
                        part2 |= (b & 0x7F) << 7;

                        if (b & 0x80 || this.noAssert && typeof b === 'undefined') {
                          throw Error("Buffer overrun");
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      var value = Long.fromBits(part0 | part1 << 28, part1 >>> 4 | part2 << 24, false);

      if (relative) {
        this.offset = offset;
        return value;
      } else {
        return {
          'value': value,
          'length': offset - start
        };
      }
    };
    /**
     * Reads a zig-zag encoded 64bit base 128 variable-length integer. Requires Long.js.
     * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
     *  read if omitted.
     * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
     *  the actual number of bytes read.
     * @throws {Error} If it's not a valid varint
     * @expose
     */


    ByteBufferPrototype.readVarint64ZigZag = function (offset) {
      var val = this.readVarint64(offset);
      if (val && val['value'] instanceof Long) val["value"] = ByteBuffer.zigZagDecode64(val["value"]);else val = ByteBuffer.zigZagDecode64(val);
      return val;
    };
  } // Long
  // types/strings/cstring

  /**
   * Writes a NULL-terminated UTF8 encoded string. For this to work the specified string must not contain any NULL
   *  characters itself.
   * @param {string} str String to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  contained in `str` + 1 if omitted.
   * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written
   * @expose
   */


  ByteBufferPrototype.writeCString = function (str, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;
    var i,
        k = str.length;

    if (!this.noAssert) {
      if (typeof str !== 'string') throw TypeError("Illegal str: Not a string");

      for (i = 0; i < k; ++i) {
        if (str.charCodeAt(i) === 0) throw RangeError("Illegal str: Contains NULL-characters");
      }

      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    } // UTF8 strings do not contain zero bytes in between except for the zero character, so:


    k = Buffer.byteLength(str, "utf8");
    offset += k + 1;
    var capacity12 = this.buffer.length;
    if (offset > capacity12) this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
    offset -= k + 1;
    offset += this.buffer.write(str, offset, k, "utf8");
    this.buffer[offset++] = 0;

    if (relative) {
      this.offset = offset;
      return this;
    }

    return k;
  };
  /**
   * Reads a NULL-terminated UTF8 encoded string. For this to work the string read must not contain any NULL characters
   *  itself.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  read if omitted.
   * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
   *  read and the actual number of bytes read.
   * @expose
   */


  ByteBufferPrototype.readCString = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 1 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 1 + ") <= " + this.buffer.length);
    }

    var start = offset,
        temp; // UTF8 strings do not contain zero bytes in between except for the zero character itself, so:

    do {
      if (offset >= this.buffer.length) throw RangeError("Index out of range: " + offset + " <= " + this.buffer.length);
      temp = this.buffer[offset++];
    } while (temp !== 0);

    var str = this.buffer.toString("utf8", start, offset - 1);

    if (relative) {
      this.offset = offset;
      return str;
    } else {
      return {
        "string": str,
        "length": offset - start
      };
    }
  }; // types/strings/istring

  /**
   * Writes a length as uint32 prefixed UTF8 encoded string.
   * @param {string} str String to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted.
   * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
   * @expose
   * @see ByteBuffer#writeVarint32
   */


  ByteBufferPrototype.writeIString = function (str, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof str !== 'string') throw TypeError("Illegal str: Not a string");
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    var start = offset,
        k;
    k = Buffer.byteLength(str, "utf8");
    offset += 4 + k;
    var capacity13 = this.buffer.length;
    if (offset > capacity13) this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
    offset -= 4 + k;

    if (this.littleEndian) {
      this.buffer[offset + 3] = k >>> 24 & 0xFF;
      this.buffer[offset + 2] = k >>> 16 & 0xFF;
      this.buffer[offset + 1] = k >>> 8 & 0xFF;
      this.buffer[offset] = k & 0xFF;
    } else {
      this.buffer[offset] = k >>> 24 & 0xFF;
      this.buffer[offset + 1] = k >>> 16 & 0xFF;
      this.buffer[offset + 2] = k >>> 8 & 0xFF;
      this.buffer[offset + 3] = k & 0xFF;
    }

    offset += 4;
    offset += this.buffer.write(str, offset, k, "utf8");

    if (relative) {
      this.offset = offset;
      return this;
    }

    return offset - start;
  };
  /**
   * Reads a length as uint32 prefixed UTF8 encoded string.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  read if omitted.
   * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
   *  read and the actual number of bytes read.
   * @expose
   * @see ByteBuffer#readVarint32
   */


  ByteBufferPrototype.readIString = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 4 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 4 + ") <= " + this.buffer.length);
    }

    var start = offset;
    var len = this.readUint32(offset);
    var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
    offset += str['length'];

    if (relative) {
      this.offset = offset;
      return str['string'];
    } else {
      return {
        'string': str['string'],
        'length': offset - start
      };
    }
  }; // types/strings/utf8string

  /**
   * Metrics representing number of UTF8 characters. Evaluates to `c`.
   * @type {string}
   * @const
   * @expose
   */


  ByteBuffer.METRICS_CHARS = 'c';
  /**
   * Metrics representing number of bytes. Evaluates to `b`.
   * @type {string}
   * @const
   * @expose
   */

  ByteBuffer.METRICS_BYTES = 'b';
  /**
   * Writes an UTF8 encoded string.
   * @param {string} str String to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
   * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
   * @expose
   */

  ByteBufferPrototype.writeUTF8String = function (str, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    var k;
    k = Buffer.byteLength(str, "utf8");
    offset += k;
    var capacity14 = this.buffer.length;
    if (offset > capacity14) this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
    offset -= k;
    offset += this.buffer.write(str, offset, k, "utf8");

    if (relative) {
      this.offset = offset;
      return this;
    }

    return k;
  };
  /**
   * Writes an UTF8 encoded string. This is an alias of {@link ByteBuffer#writeUTF8String}.
   * @function
   * @param {string} str String to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
   * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
   * @expose
   */


  ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;
  /**
   * Calculates the number of UTF8 characters of a string. JavaScript itself uses UTF-16, so that a string's
   *  `length` property does not reflect its actual UTF8 size if it contains code points larger than 0xFFFF.
   * @param {string} str String to calculate
   * @returns {number} Number of UTF8 characters
   * @expose
   */

  ByteBuffer.calculateUTF8Chars = function (str) {
    return utfx.calculateUTF16asUTF8(stringSource(str))[0];
  };
  /**
   * Calculates the number of UTF8 bytes of a string.
   * @param {string} str String to calculate
   * @returns {number} Number of UTF8 bytes
   * @expose
   */


  ByteBuffer.calculateUTF8Bytes = function (str) {
    if (typeof str !== 'string') throw TypeError("Illegal argument: " + typeof str);
    return Buffer.byteLength(str, "utf8");
  };
  /**
   * Calculates the number of UTF8 bytes of a string. This is an alias of {@link ByteBuffer.calculateUTF8Bytes}.
   * @function
   * @param {string} str String to calculate
   * @returns {number} Number of UTF8 bytes
   * @expose
   */


  ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes;
  /**
   * Reads an UTF8 encoded string.
   * @param {number} length Number of characters or bytes to read.
   * @param {string=} metrics Metrics specifying what `length` is meant to count. Defaults to
   *  {@link ByteBuffer.METRICS_CHARS}.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  read if omitted.
   * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
   *  read and the actual number of bytes read.
   * @expose
   */

  ByteBufferPrototype.readUTF8String = function (length, metrics, offset) {
    if (typeof metrics === 'number') {
      offset = metrics;
      metrics = undefined;
    }

    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;
    if (typeof metrics === 'undefined') metrics = ByteBuffer.METRICS_CHARS;

    if (!this.noAssert) {
      if (typeof length !== 'number' || length % 1 !== 0) throw TypeError("Illegal length: " + length + " (not an integer)");
      length |= 0;
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    var i = 0,
        start = offset,
        temp,
        sd;

    if (metrics === ByteBuffer.METRICS_CHARS) {
      // The same for node and the browser
      sd = stringDestination();
      utfx.decodeUTF8(function () {
        return i < length && offset < this.limit ? this.buffer[offset++] : null;
      }.bind(this), function (cp) {
        ++i;
        utfx.UTF8toUTF16(cp, sd);
      });
      if (i !== length) throw RangeError("Illegal range: Truncated data, " + i + " == " + length);

      if (relative) {
        this.offset = offset;
        return sd();
      } else {
        return {
          "string": sd(),
          "length": offset - start
        };
      }
    } else if (metrics === ByteBuffer.METRICS_BYTES) {
      if (!this.noAssert) {
        if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
        offset >>>= 0;
        if (offset < 0 || offset + length > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.length);
      }

      temp = this.buffer.toString("utf8", offset, offset + length);

      if (relative) {
        this.offset += length;
        return temp;
      } else {
        return {
          'string': temp,
          'length': length
        };
      }
    } else throw TypeError("Unsupported metrics: " + metrics);
  };
  /**
   * Reads an UTF8 encoded string. This is an alias of {@link ByteBuffer#readUTF8String}.
   * @function
   * @param {number} length Number of characters or bytes to read
   * @param {number=} metrics Metrics specifying what `n` is meant to count. Defaults to
   *  {@link ByteBuffer.METRICS_CHARS}.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  read if omitted.
   * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
   *  read and the actual number of bytes read.
   * @expose
   */


  ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String; // types/strings/vstring

  /**
   * Writes a length as varint32 prefixed UTF8 encoded string.
   * @param {string} str String to write
   * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted.
   * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
   * @expose
   * @see ByteBuffer#writeVarint32
   */

  ByteBufferPrototype.writeVString = function (str, offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof str !== 'string') throw TypeError("Illegal str: Not a string");
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    var start = offset,
        k,
        l;
    k = Buffer.byteLength(str, "utf8");
    l = ByteBuffer.calculateVarint32(k);
    offset += l + k;
    var capacity15 = this.buffer.length;
    if (offset > capacity15) this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
    offset -= l + k;
    offset += this.writeVarint32(k, offset);
    offset += this.buffer.write(str, offset, k, "utf8");

    if (relative) {
      this.offset = offset;
      return this;
    }

    return offset - start;
  };
  /**
   * Reads a length as varint32 prefixed UTF8 encoded string.
   * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  read if omitted.
   * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
   *  read and the actual number of bytes read.
   * @expose
   * @see ByteBuffer#readVarint32
   */


  ByteBufferPrototype.readVString = function (offset) {
    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 1 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 1 + ") <= " + this.buffer.length);
    }

    var start = offset;
    var len = this.readVarint32(offset);
    var str = this.readUTF8String(len['value'], ByteBuffer.METRICS_BYTES, offset += len['length']);
    offset += str['length'];

    if (relative) {
      this.offset = offset;
      return str['string'];
    } else {
      return {
        'string': str['string'],
        'length': offset - start
      };
    }
  };
  /**
   * Appends some data to this ByteBuffer. This will overwrite any contents behind the specified offset up to the appended
   *  data's length.
   * @param {!ByteBuffer|!Buffer|!ArrayBuffer|!Uint8Array|string} source Data to append. If `source` is a ByteBuffer, its
   * offsets will be modified according to the performed read operation.
   * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
   * @param {number=} offset Offset to append at. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   * @example A relative `<01 02>03.append(<04 05>)` will result in `<01 02 04 05>, 04 05|`
   * @example An absolute `<01 02>03.append(04 05>, 1)` will result in `<01 04>05, 04 05|`
   */


  ByteBufferPrototype.append = function (source, encoding, offset) {
    if (typeof encoding === 'number' || typeof encoding !== 'string') {
      offset = encoding;
      encoding = undefined;
    }

    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    if (!(source instanceof ByteBuffer)) source = ByteBuffer.wrap(source, encoding);
    var length = source.limit - source.offset;
    if (length <= 0) return this; // Nothing to append

    offset += length;
    var capacity16 = this.buffer.length;
    if (offset > capacity16) this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
    offset -= length;
    source.buffer.copy(this.buffer, offset, source.offset, source.limit);
    source.offset += length;
    if (relative) this.offset += length;
    return this;
  };
  /**
   * Appends this ByteBuffer's contents to another ByteBuffer. This will overwrite any contents at and after the
      specified offset up to the length of this ByteBuffer's data.
   * @param {!ByteBuffer} target Target ByteBuffer
   * @param {number=} offset Offset to append to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  read if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   * @see ByteBuffer#append
   */


  ByteBufferPrototype.appendTo = function (target, offset) {
    target.append(this, offset);
    return this;
  };
  /**
   * Enables or disables assertions of argument types and offsets. Assertions are enabled by default but you can opt to
   *  disable them if your code already makes sure that everything is valid.
   * @param {boolean} assert `true` to enable assertions, otherwise `false`
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.assert = function (assert) {
    this.noAssert = !assert;
    return this;
  };
  /**
   * Gets the capacity of this ByteBuffer's backing buffer.
   * @returns {number} Capacity of the backing buffer
   * @expose
   */


  ByteBufferPrototype.capacity = function () {
    return this.buffer.length;
  };
  /**
   * Clears this ByteBuffer's offsets by setting {@link ByteBuffer#offset} to `0` and {@link ByteBuffer#limit} to the
   *  backing buffer's capacity. Discards {@link ByteBuffer#markedOffset}.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.clear = function () {
    this.offset = 0;
    this.limit = this.buffer.length;
    this.markedOffset = -1;
    return this;
  };
  /**
   * Creates a cloned instance of this ByteBuffer, preset with this ByteBuffer's values for {@link ByteBuffer#offset},
   *  {@link ByteBuffer#markedOffset} and {@link ByteBuffer#limit}.
   * @param {boolean=} copy Whether to copy the backing buffer or to return another view on the same, defaults to `false`
   * @returns {!ByteBuffer} Cloned instance
   * @expose
   */


  ByteBufferPrototype.clone = function (copy) {
    var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);

    if (copy) {
      var buffer = new Buffer(this.buffer.length);
      this.buffer.copy(buffer);
      bb.buffer = buffer;
    } else {
      bb.buffer = this.buffer;
    }

    bb.offset = this.offset;
    bb.markedOffset = this.markedOffset;
    bb.limit = this.limit;
    return bb;
  };
  /**
   * Compacts this ByteBuffer to be backed by a {@link ByteBuffer#buffer} of its contents' length. Contents are the bytes
   *  between {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will set `offset = 0` and `limit = capacity` and
   *  adapt {@link ByteBuffer#markedOffset} to the same relative position if set.
   * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
   * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.compact = function (begin, end) {
    if (typeof begin === 'undefined') begin = this.offset;
    if (typeof end === 'undefined') end = this.limit;

    if (!this.noAssert) {
      if (typeof begin !== 'number' || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
      begin >>>= 0;
      if (typeof end !== 'number' || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
      end >>>= 0;
      if (begin < 0 || begin > end || end > this.buffer.length) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.length);
    }

    if (begin === 0 && end === this.buffer.length) return this; // Already compacted

    var len = end - begin;

    if (len === 0) {
      this.buffer = EMPTY_BUFFER;
      if (this.markedOffset >= 0) this.markedOffset -= begin;
      this.offset = 0;
      this.limit = 0;
      return this;
    }

    var buffer = new Buffer(len);
    this.buffer.copy(buffer, 0, begin, end);
    this.buffer = buffer;
    if (this.markedOffset >= 0) this.markedOffset -= begin;
    this.offset = 0;
    this.limit = len;
    return this;
  };
  /**
   * Creates a copy of this ByteBuffer's contents. Contents are the bytes between {@link ByteBuffer#offset} and
   *  {@link ByteBuffer#limit}.
   * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
   * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
   * @returns {!ByteBuffer} Copy
   * @expose
   */


  ByteBufferPrototype.copy = function (begin, end) {
    if (typeof begin === 'undefined') begin = this.offset;
    if (typeof end === 'undefined') end = this.limit;

    if (!this.noAssert) {
      if (typeof begin !== 'number' || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
      begin >>>= 0;
      if (typeof end !== 'number' || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
      end >>>= 0;
      if (begin < 0 || begin > end || end > this.buffer.length) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.length);
    }

    if (begin === end) return new ByteBuffer(0, this.littleEndian, this.noAssert);
    var capacity = end - begin,
        bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
    bb.offset = 0;
    bb.limit = capacity;
    if (bb.markedOffset >= 0) bb.markedOffset -= begin;
    this.copyTo(bb, 0, begin, end);
    return bb;
  };
  /**
   * Copies this ByteBuffer's contents to another ByteBuffer. Contents are the bytes between {@link ByteBuffer#offset} and
   *  {@link ByteBuffer#limit}.
   * @param {!ByteBuffer} target Target ByteBuffer
   * @param {number=} targetOffset Offset to copy to. Will use and increase the target's {@link ByteBuffer#offset}
   *  by the number of bytes copied if omitted.
   * @param {number=} sourceOffset Offset to start copying from. Will use and increase {@link ByteBuffer#offset} by the
   *  number of bytes copied if omitted.
   * @param {number=} sourceLimit Offset to end copying from, defaults to {@link ByteBuffer#limit}
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.copyTo = function (target, targetOffset, sourceOffset, sourceLimit) {
    var relative, targetRelative;

    if (!this.noAssert) {
      if (!ByteBuffer.isByteBuffer(target)) throw TypeError("Illegal target: Not a ByteBuffer");
    }

    targetOffset = (targetRelative = typeof targetOffset === 'undefined') ? target.offset : targetOffset | 0;
    sourceOffset = (relative = typeof sourceOffset === 'undefined') ? this.offset : sourceOffset | 0;
    sourceLimit = typeof sourceLimit === 'undefined' ? this.limit : sourceLimit | 0;
    if (targetOffset < 0 || targetOffset > target.buffer.length) throw RangeError("Illegal target range: 0 <= " + targetOffset + " <= " + target.buffer.length);
    if (sourceOffset < 0 || sourceLimit > this.buffer.length) throw RangeError("Illegal source range: 0 <= " + sourceOffset + " <= " + this.buffer.length);
    var len = sourceLimit - sourceOffset;
    if (len === 0) return target; // Nothing to copy

    target.ensureCapacity(targetOffset + len);
    this.buffer.copy(target.buffer, targetOffset, sourceOffset, sourceLimit);
    if (relative) this.offset += len;
    if (targetRelative) target.offset += len;
    return this;
  };
  /**
   * Makes sure that this ByteBuffer is backed by a {@link ByteBuffer#buffer} of at least the specified capacity. If the
   *  current capacity is exceeded, it will be doubled. If double the current capacity is less than the required capacity,
   *  the required capacity will be used instead.
   * @param {number} capacity Required capacity
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.ensureCapacity = function (capacity) {
    var current = this.buffer.length;
    if (current < capacity) return this.resize((current *= 2) > capacity ? current : capacity);
    return this;
  };
  /**
   * Overwrites this ByteBuffer's contents with the specified value. Contents are the bytes between
   *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
   * @param {number|string} value Byte value to fill with. If given as a string, the first character is used.
   * @param {number=} begin Begin offset. Will use and increase {@link ByteBuffer#offset} by the number of bytes
   *  written if omitted. defaults to {@link ByteBuffer#offset}.
   * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
   * @returns {!ByteBuffer} this
   * @expose
   * @example `someByteBuffer.clear().fill(0)` fills the entire backing buffer with zeroes
   */


  ByteBufferPrototype.fill = function (value, begin, end) {
    var relative = typeof begin === 'undefined';
    if (relative) begin = this.offset;
    if (typeof value === 'string' && value.length > 0) value = value.charCodeAt(0);
    if (typeof begin === 'undefined') begin = this.offset;
    if (typeof end === 'undefined') end = this.limit;

    if (!this.noAssert) {
      if (typeof value !== 'number' || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
      value |= 0;
      if (typeof begin !== 'number' || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
      begin >>>= 0;
      if (typeof end !== 'number' || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
      end >>>= 0;
      if (begin < 0 || begin > end || end > this.buffer.length) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.length);
    }

    if (begin >= end) return this; // Nothing to fill

    this.buffer.fill(value, begin, end);
    begin = end;
    if (relative) this.offset = begin;
    return this;
  };
  /**
   * Makes this ByteBuffer ready for a new sequence of write or relative read operations. Sets `limit = offset` and
   *  `offset = 0`. Make sure always to flip a ByteBuffer when all relative read or write operations are complete.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.flip = function () {
    this.limit = this.offset;
    this.offset = 0;
    return this;
  };
  /**
   * Marks an offset on this ByteBuffer to be used later.
   * @param {number=} offset Offset to mark. Defaults to {@link ByteBuffer#offset}.
   * @returns {!ByteBuffer} this
   * @throws {TypeError} If `offset` is not a valid number
   * @throws {RangeError} If `offset` is out of bounds
   * @see ByteBuffer#reset
   * @expose
   */


  ByteBufferPrototype.mark = function (offset) {
    offset = typeof offset === 'undefined' ? this.offset : offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    this.markedOffset = offset;
    return this;
  };
  /**
   * Sets the byte order.
   * @param {boolean} littleEndian `true` for little endian byte order, `false` for big endian
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.order = function (littleEndian) {
    if (!this.noAssert) {
      if (typeof littleEndian !== 'boolean') throw TypeError("Illegal littleEndian: Not a boolean");
    }

    this.littleEndian = !!littleEndian;
    return this;
  };
  /**
   * Switches (to) little endian byte order.
   * @param {boolean=} littleEndian Defaults to `true`, otherwise uses big endian
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.LE = function (littleEndian) {
    this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : true;
    return this;
  };
  /**
   * Switches (to) big endian byte order.
   * @param {boolean=} bigEndian Defaults to `true`, otherwise uses little endian
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.BE = function (bigEndian) {
    this.littleEndian = typeof bigEndian !== 'undefined' ? !bigEndian : false;
    return this;
  };
  /**
   * Prepends some data to this ByteBuffer. This will overwrite any contents before the specified offset up to the
   *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
   *  will be resized and its contents moved accordingly.
   * @param {!ByteBuffer|string||!Buffer} source Data to prepend. If `source` is a ByteBuffer, its offset will be modified
   *  according to the performed read operation.
   * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
   * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
   *  prepended if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   * @example A relative `00<01 02 03>.prepend(<04 05>)` results in `<04 05 01 02 03>, 04 05|`
   * @example An absolute `00<01 02 03>.prepend(<04 05>, 2)` results in `04<05 02 03>, 04 05|`
   */


  ByteBufferPrototype.prepend = function (source, encoding, offset) {
    if (typeof encoding === 'number' || typeof encoding !== 'string') {
      offset = encoding;
      encoding = undefined;
    }

    var relative = typeof offset === 'undefined';
    if (relative) offset = this.offset;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      offset >>>= 0;
      if (offset < 0 || offset + 0 > this.buffer.length) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + 0 + ") <= " + this.buffer.length);
    }

    if (!(source instanceof ByteBuffer)) source = ByteBuffer.wrap(source, encoding);
    var len = source.limit - source.offset;
    if (len <= 0) return this; // Nothing to prepend

    var diff = len - offset;

    if (diff > 0) {
      // Not enough space before offset, so resize + move
      var buffer = new Buffer(this.buffer.length + diff);
      this.buffer.copy(buffer, len, offset, this.buffer.length);
      this.buffer = buffer;
      this.offset += diff;
      if (this.markedOffset >= 0) this.markedOffset += diff;
      this.limit += diff;
      offset += diff;
    }

    source.buffer.copy(this.buffer, offset - len, source.offset, source.limit);
    source.offset = source.limit;
    if (relative) this.offset -= len;
    return this;
  };
  /**
   * Prepends this ByteBuffer to another ByteBuffer. This will overwrite any contents before the specified offset up to the
   *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
   *  will be resized and its contents moved accordingly.
   * @param {!ByteBuffer} target Target ByteBuffer
   * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
   *  prepended if omitted.
   * @returns {!ByteBuffer} this
   * @expose
   * @see ByteBuffer#prepend
   */


  ByteBufferPrototype.prependTo = function (target, offset) {
    target.prepend(this, offset);
    return this;
  };
  /**
   * Prints debug information about this ByteBuffer's contents.
   * @param {function(string)=} out Output function to call, defaults to console.log
   * @expose
   */


  ByteBufferPrototype.printDebug = function (out) {
    if (typeof out !== 'function') out = console.log.bind(console);
    out(this.toString() + "\n" + "-------------------------------------------------------------------\n" + this.toDebug(
    /* columns */
    true));
  };
  /**
   * Gets the number of remaining readable bytes. Contents are the bytes between {@link ByteBuffer#offset} and
   *  {@link ByteBuffer#limit}, so this returns `limit - offset`.
   * @returns {number} Remaining readable bytes. May be negative if `offset > limit`.
   * @expose
   */


  ByteBufferPrototype.remaining = function () {
    return this.limit - this.offset;
  };
  /**
   * Resets this ByteBuffer's {@link ByteBuffer#offset}. If an offset has been marked through {@link ByteBuffer#mark}
   *  before, `offset` will be set to {@link ByteBuffer#markedOffset}, which will then be discarded. If no offset has been
   *  marked, sets `offset = 0`.
   * @returns {!ByteBuffer} this
   * @see ByteBuffer#mark
   * @expose
   */


  ByteBufferPrototype.reset = function () {
    if (this.markedOffset >= 0) {
      this.offset = this.markedOffset;
      this.markedOffset = -1;
    } else {
      this.offset = 0;
    }

    return this;
  };
  /**
   * Resizes this ByteBuffer to be backed by a buffer of at least the given capacity. Will do nothing if already that
   *  large or larger.
   * @param {number} capacity Capacity required
   * @returns {!ByteBuffer} this
   * @throws {TypeError} If `capacity` is not a number
   * @throws {RangeError} If `capacity < 0`
   * @expose
   */


  ByteBufferPrototype.resize = function (capacity) {
    if (!this.noAssert) {
      if (typeof capacity !== 'number' || capacity % 1 !== 0) throw TypeError("Illegal capacity: " + capacity + " (not an integer)");
      capacity |= 0;
      if (capacity < 0) throw RangeError("Illegal capacity: 0 <= " + capacity);
    }

    if (this.buffer.length < capacity) {
      var buffer = new Buffer(capacity);
      this.buffer.copy(buffer);
      this.buffer = buffer;
    }

    return this;
  };
  /**
   * Reverses this ByteBuffer's contents.
   * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
   * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.reverse = function (begin, end) {
    if (typeof begin === 'undefined') begin = this.offset;
    if (typeof end === 'undefined') end = this.limit;

    if (!this.noAssert) {
      if (typeof begin !== 'number' || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
      begin >>>= 0;
      if (typeof end !== 'number' || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
      end >>>= 0;
      if (begin < 0 || begin > end || end > this.buffer.length) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.length);
    }

    if (begin === end) return this; // Nothing to reverse

    Array.prototype.reverse.call(this.buffer.slice(begin, end));
    return this;
  };
  /**
   * Skips the next `length` bytes. This will just advance
   * @param {number} length Number of bytes to skip. May also be negative to move the offset back.
   * @returns {!ByteBuffer} this
   * @expose
   */


  ByteBufferPrototype.skip = function (length) {
    if (!this.noAssert) {
      if (typeof length !== 'number' || length % 1 !== 0) throw TypeError("Illegal length: " + length + " (not an integer)");
      length |= 0;
    }

    var offset = this.offset + length;

    if (!this.noAssert) {
      if (offset < 0 || offset > this.buffer.length) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + length + " <= " + this.buffer.length);
    }

    this.offset = offset;
    return this;
  };
  /**
   * Slices this ByteBuffer by creating a cloned instance with `offset = begin` and `limit = end`.
   * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
   * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
   * @returns {!ByteBuffer} Clone of this ByteBuffer with slicing applied, backed by the same {@link ByteBuffer#buffer}
   * @expose
   */


  ByteBufferPrototype.slice = function (begin, end) {
    if (typeof begin === 'undefined') begin = this.offset;
    if (typeof end === 'undefined') end = this.limit;

    if (!this.noAssert) {
      if (typeof begin !== 'number' || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
      begin >>>= 0;
      if (typeof end !== 'number' || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
      end >>>= 0;
      if (begin < 0 || begin > end || end > this.buffer.length) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.length);
    }

    var bb = this.clone();
    bb.offset = begin;
    bb.limit = end;
    return bb;
  };
  /**
   * Returns a copy of the backing buffer that contains this ByteBuffer's contents. Contents are the bytes between
   *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
   * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory if
   *  possible. Defaults to `false`
   * @returns {!Buffer} Contents as a Buffer
   * @expose
   */


  ByteBufferPrototype.toBuffer = function (forceCopy) {
    var offset = this.offset,
        limit = this.limit;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: Not an integer");
      offset >>>= 0;
      if (typeof limit !== 'number' || limit % 1 !== 0) throw TypeError("Illegal limit: Not an integer");
      limit >>>= 0;
      if (offset < 0 || offset > limit || limit > this.buffer.length) throw RangeError("Illegal range: 0 <= " + offset + " <= " + limit + " <= " + this.buffer.length);
    }

    if (forceCopy) {
      var buffer = new Buffer(limit - offset);
      this.buffer.copy(buffer, 0, offset, limit);
      return buffer;
    } else {
      if (offset === 0 && limit === this.buffer.length) return this.buffer;else return this.buffer.slice(offset, limit);
    }
  };
  /**
   * Returns a copy of the backing buffer compacted to contain this ByteBuffer's contents. Contents are the bytes between
   *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
   * @returns {!ArrayBuffer} Contents as an ArrayBuffer
   */


  ByteBufferPrototype.toArrayBuffer = function () {
    var offset = this.offset,
        limit = this.limit;

    if (!this.noAssert) {
      if (typeof offset !== 'number' || offset % 1 !== 0) throw TypeError("Illegal offset: Not an integer");
      offset >>>= 0;
      if (typeof limit !== 'number' || limit % 1 !== 0) throw TypeError("Illegal limit: Not an integer");
      limit >>>= 0;
      if (offset < 0 || offset > limit || limit > this.buffer.length) throw RangeError("Illegal range: 0 <= " + offset + " <= " + limit + " <= " + this.buffer.length);
    }

    var ab = new ArrayBuffer(limit - offset);

    if (memcpy) {
      // Fast
      memcpy(ab, 0, this.buffer, offset, limit);
    } else {
      // Slow
      var dst = new Uint8Array(ab);

      for (var i = offset; i < limit; ++i) dst[i - offset] = this.buffer[i];
    }

    return ab;
  };
  /**
   * Converts the ByteBuffer's contents to a string.
   * @param {string=} encoding Output encoding. Returns an informative string representation if omitted but also allows
   *  direct conversion to "utf8", "hex", "base64" and "binary" encoding. "debug" returns a hex representation with
   *  highlighted offsets.
   * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}
   * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
   * @returns {string} String representation
   * @throws {Error} If `encoding` is invalid
   * @expose
   */


  ByteBufferPrototype.toString = function (encoding, begin, end) {
    if (typeof encoding === 'undefined') return "ByteBufferNB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
    if (typeof encoding === 'number') encoding = "utf8", begin = encoding, end = begin;

    switch (encoding) {
      case "utf8":
        return this.toUTF8(begin, end);

      case "base64":
        return this.toBase64(begin, end);

      case "hex":
        return this.toHex(begin, end);

      case "binary":
        return this.toBinary(begin, end);

      case "debug":
        return this.toDebug();

      case "columns":
        return this.toColumns();

      default:
        throw Error("Unsupported encoding: " + encoding);
    }
  }; // encodings/base64

  /**
   * Encodes this ByteBuffer's contents to a base64 encoded string.
   * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}.
   * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}.
   * @returns {string} Base64 encoded string
   * @throws {RangeError} If `begin` or `end` is out of bounds
   * @expose
   */


  ByteBufferPrototype.toBase64 = function (begin, end) {
    if (typeof begin === 'undefined') begin = this.offset;
    if (typeof end === 'undefined') end = this.limit;
    begin = begin | 0;
    end = end | 0;
    if (begin < 0 || end > this.capacity || begin > end) throw RangeError("begin, end");
    return this.buffer.toString("base64", begin, end);
  };
  /**
   * Decodes a base64 encoded string to a ByteBuffer.
   * @param {string} str String to decode
   * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
   *  {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @returns {!ByteBuffer} ByteBuffer
   * @expose
   */


  ByteBuffer.fromBase64 = function (str, littleEndian) {
    return ByteBuffer.wrap(new Buffer(str, "base64"), littleEndian);
  };
  /**
   * Encodes a binary string to base64 like `window.btoa` does.
   * @param {string} str Binary string
   * @returns {string} Base64 encoded string
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
   * @expose
   */


  ByteBuffer.btoa = function (str) {
    return ByteBuffer.fromBinary(str).toBase64();
  };
  /**
   * Decodes a base64 encoded string to binary like `window.atob` does.
   * @param {string} b64 Base64 encoded string
   * @returns {string} Binary string
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
   * @expose
   */


  ByteBuffer.atob = function (b64) {
    return ByteBuffer.fromBase64(b64).toBinary();
  }; // encodings/binary

  /**
   * Encodes this ByteBuffer to a binary encoded string, that is using only characters 0x00-0xFF as bytes.
   * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
   * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
   * @returns {string} Binary encoded string
   * @throws {RangeError} If `offset > limit`
   * @expose
   */


  ByteBufferPrototype.toBinary = function (begin, end) {
    if (typeof begin === 'undefined') begin = this.offset;
    if (typeof end === 'undefined') end = this.limit;
    begin |= 0;
    end |= 0;
    if (begin < 0 || end > this.capacity() || begin > end) throw RangeError("begin, end");
    return this.buffer.toString("binary", begin, end);
  };
  /**
   * Decodes a binary encoded string, that is using only characters 0x00-0xFF as bytes, to a ByteBuffer.
   * @param {string} str String to decode
   * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
   *  {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @returns {!ByteBuffer} ByteBuffer
   * @expose
   */


  ByteBuffer.fromBinary = function (str, littleEndian) {
    return ByteBuffer.wrap(new Buffer(str, "binary"), littleEndian);
  }; // encodings/debug

  /**
   * Encodes this ByteBuffer to a hex encoded string with marked offsets. Offset symbols are:
   * * `<` : offset,
   * * `'` : markedOffset,
   * * `>` : limit,
   * * `|` : offset and limit,
   * * `[` : offset and markedOffset,
   * * `]` : markedOffset and limit,
   * * `!` : offset, markedOffset and limit
   * @param {boolean=} columns If `true` returns two columns hex + ascii, defaults to `false`
   * @returns {string|!Array.<string>} Debug string or array of lines if `asArray = true`
   * @expose
   * @example `>00'01 02<03` contains four bytes with `limit=0, markedOffset=1, offset=3`
   * @example `00[01 02 03>` contains four bytes with `offset=markedOffset=1, limit=4`
   * @example `00|01 02 03` contains four bytes with `offset=limit=1, markedOffset=-1`
   * @example `|` contains zero bytes with `offset=limit=0, markedOffset=-1`
   */


  ByteBufferPrototype.toDebug = function (columns) {
    var i = -1,
        k = this.buffer.length,
        b,
        hex = "",
        asc = "",
        out = "";

    while (i < k) {
      if (i !== -1) {
        b = this.buffer[i];
        if (b < 0x10) hex += "0" + b.toString(16).toUpperCase();else hex += b.toString(16).toUpperCase();
        if (columns) asc += b > 32 && b < 127 ? String.fromCharCode(b) : '.';
      }

      ++i;

      if (columns) {
        if (i > 0 && i % 16 === 0 && i !== k) {
          while (hex.length < 3 * 16 + 3) hex += " ";

          out += hex + asc + "\n";
          hex = asc = "";
        }
      }

      if (i === this.offset && i === this.limit) hex += i === this.markedOffset ? "!" : "|";else if (i === this.offset) hex += i === this.markedOffset ? "[" : "<";else if (i === this.limit) hex += i === this.markedOffset ? "]" : ">";else hex += i === this.markedOffset ? "'" : columns || i !== 0 && i !== k ? " " : "";
    }

    if (columns && hex !== " ") {
      while (hex.length < 3 * 16 + 3) hex += " ";

      out += hex + asc + "\n";
    }

    return columns ? out : hex;
  };
  /**
   * Decodes a hex encoded string with marked offsets to a ByteBuffer.
   * @param {string} str Debug string to decode (not be generated with `columns = true`)
   * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
   *  {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
   *  {@link ByteBuffer.DEFAULT_NOASSERT}.
   * @returns {!ByteBuffer} ByteBuffer
   * @expose
   * @see ByteBuffer#toDebug
   */


  ByteBuffer.fromDebug = function (str, littleEndian, noAssert) {
    var k = str.length,
        bb = new ByteBuffer((k + 1) / 3 | 0, littleEndian, noAssert);
    var i = 0,
        j = 0,
        ch,
        b,
        rs = false,
        // Require symbol next
    ho = false,
        hm = false,
        hl = false,
        // Already has offset (ho), markedOffset (hm), limit (hl)?
    fail = false;

    while (i < k) {
      switch (ch = str.charAt(i++)) {
        case '!':
          if (!noAssert) {
            if (ho || hm || hl) {
              fail = true;
              break;
            }

            ho = hm = hl = true;
          }

          bb.offset = bb.markedOffset = bb.limit = j;
          rs = false;
          break;

        case '|':
          if (!noAssert) {
            if (ho || hl) {
              fail = true;
              break;
            }

            ho = hl = true;
          }

          bb.offset = bb.limit = j;
          rs = false;
          break;

        case '[':
          if (!noAssert) {
            if (ho || hm) {
              fail = true;
              break;
            }

            ho = hm = true;
          }

          bb.offset = bb.markedOffset = j;
          rs = false;
          break;

        case '<':
          if (!noAssert) {
            if (ho) {
              fail = true;
              break;
            }

            ho = true;
          }

          bb.offset = j;
          rs = false;
          break;

        case ']':
          if (!noAssert) {
            if (hl || hm) {
              fail = true;
              break;
            }

            hl = hm = true;
          }

          bb.limit = bb.markedOffset = j;
          rs = false;
          break;

        case '>':
          if (!noAssert) {
            if (hl) {
              fail = true;
              break;
            }

            hl = true;
          }

          bb.limit = j;
          rs = false;
          break;

        case "'":
          if (!noAssert) {
            if (hm) {
              fail = true;
              break;
            }

            hm = true;
          }

          bb.markedOffset = j;
          rs = false;
          break;

        case ' ':
          rs = false;
          break;

        default:
          if (!noAssert) {
            if (rs) {
              fail = true;
              break;
            }
          }

          b = parseInt(ch + str.charAt(i++), 16);

          if (!noAssert) {
            if (isNaN(b) || b < 0 || b > 255) throw TypeError("Illegal str: Not a debug encoded string");
          }

          bb.buffer[j++] = b;
          rs = true;
      }

      if (fail) throw TypeError("Illegal str: Invalid symbol at " + i);
    }

    if (!noAssert) {
      if (!ho || !hl) throw TypeError("Illegal str: Missing offset or limit");
      if (j < bb.buffer.length) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + j + " < " + k);
    }

    return bb;
  }; // encodings/hex

  /**
   * Encodes this ByteBuffer's contents to a hex encoded string.
   * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
   * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
   * @returns {string} Hex encoded string
   * @expose
   */


  ByteBufferPrototype.toHex = function (begin, end) {
    begin = typeof begin === 'undefined' ? this.offset : begin;
    end = typeof end === 'undefined' ? this.limit : end;

    if (!this.noAssert) {
      if (typeof begin !== 'number' || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
      begin >>>= 0;
      if (typeof end !== 'number' || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
      end >>>= 0;
      if (begin < 0 || begin > end || end > this.buffer.length) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.length);
    }

    return this.buffer.toString("hex", begin, end);
  };
  /**
   * Decodes a hex encoded string to a ByteBuffer.
   * @param {string} str String to decode
   * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
   *  {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
   *  {@link ByteBuffer.DEFAULT_NOASSERT}.
   * @returns {!ByteBuffer} ByteBuffer
   * @expose
   */


  ByteBuffer.fromHex = function (str, littleEndian, noAssert) {
    if (!noAssert) {
      if (typeof str !== 'string') throw TypeError("Illegal str: Not a string");
      if (str.length % 2 !== 0) throw TypeError("Illegal str: Length not a multiple of 2");
    }

    var bb = new ByteBuffer(0, littleEndian, true);
    bb.buffer = new Buffer(str, "hex");
    bb.limit = bb.buffer.length;
    return bb;
  }; // utfx-embeddable

  /**
   * utfx-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/utfx for details
   */


  var utfx = function () {
    /**
     * utfx namespace.
     * @inner
     * @type {!Object.<string,*>}
     */

    var utfx = {};
    /**
     * Maximum valid code point.
     * @type {number}
     * @const
     */

    utfx.MAX_CODEPOINT = 0x10FFFF;
    /**
     * Encodes UTF8 code points to UTF8 bytes.
     * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
     *  respectively `null` if there are no more code points left or a single numeric code point.
     * @param {!function(number)} dst Bytes destination as a function successively called with the next byte
     */

    utfx.encodeUTF8 = function (src, dst) {
      var cp = null;
      if (typeof src === 'number') cp = src, src = function () {
        return null;
      };

      while (cp !== null || (cp = src()) !== null) {
        if (cp < 0x80) dst(cp & 0x7F);else if (cp < 0x800) dst(cp >> 6 & 0x1F | 0xC0), dst(cp & 0x3F | 0x80);else if (cp < 0x10000) dst(cp >> 12 & 0x0F | 0xE0), dst(cp >> 6 & 0x3F | 0x80), dst(cp & 0x3F | 0x80);else dst(cp >> 18 & 0x07 | 0xF0), dst(cp >> 12 & 0x3F | 0x80), dst(cp >> 6 & 0x3F | 0x80), dst(cp & 0x3F | 0x80);
        cp = null;
      }
    };
    /**
     * Decodes UTF8 bytes to UTF8 code points.
     * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
     *  are no more bytes left.
     * @param {!function(number)} dst Code points destination as a function successively called with each decoded code point.
     * @throws {RangeError} If a starting byte is invalid in UTF8
     * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the
     *  remaining bytes.
     */


    utfx.decodeUTF8 = function (src, dst) {
      var a,
          b,
          c,
          d,
          fail = function (b) {
        b = b.slice(0, b.indexOf(null));
        var err = Error(b.toString());
        err.name = "TruncatedError";
        err['bytes'] = b;
        throw err;
      };

      while ((a = src()) !== null) {
        if ((a & 0x80) === 0) dst(a);else if ((a & 0xE0) === 0xC0) (b = src()) === null && fail([a, b]), dst((a & 0x1F) << 6 | b & 0x3F);else if ((a & 0xF0) === 0xE0) ((b = src()) === null || (c = src()) === null) && fail([a, b, c]), dst((a & 0x0F) << 12 | (b & 0x3F) << 6 | c & 0x3F);else if ((a & 0xF8) === 0xF0) ((b = src()) === null || (c = src()) === null || (d = src()) === null) && fail([a, b, c, d]), dst((a & 0x07) << 18 | (b & 0x3F) << 12 | (c & 0x3F) << 6 | d & 0x3F);else throw RangeError("Illegal starting byte: " + a);
      }
    };
    /**
     * Converts UTF16 characters to UTF8 code points.
     * @param {!function():number|null} src Characters source as a function returning the next char code respectively
     *  `null` if there are no more characters left.
     * @param {!function(number)} dst Code points destination as a function successively called with each converted code
     *  point.
     */


    utfx.UTF16toUTF8 = function (src, dst) {
      var c1,
          c2 = null;

      while (true) {
        if ((c1 = c2 !== null ? c2 : src()) === null) break;

        if (c1 >= 0xD800 && c1 <= 0xDFFF) {
          if ((c2 = src()) !== null) {
            if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
              dst((c1 - 0xD800) * 0x400 + c2 - 0xDC00 + 0x10000);
              c2 = null;
              continue;
            }
          }
        }

        dst(c1);
      }

      if (c2 !== null) dst(c2);
    };
    /**
     * Converts UTF8 code points to UTF16 characters.
     * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
     *  respectively `null` if there are no more code points left or a single numeric code point.
     * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
     * @throws {RangeError} If a code point is out of range
     */


    utfx.UTF8toUTF16 = function (src, dst) {
      var cp = null;
      if (typeof src === 'number') cp = src, src = function () {
        return null;
      };

      while (cp !== null || (cp = src()) !== null) {
        if (cp <= 0xFFFF) dst(cp);else cp -= 0x10000, dst((cp >> 10) + 0xD800), dst(cp % 0x400 + 0xDC00);
        cp = null;
      }
    };
    /**
     * Converts and encodes UTF16 characters to UTF8 bytes.
     * @param {!function():number|null} src Characters source as a function returning the next char code respectively `null`
     *  if there are no more characters left.
     * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
     */


    utfx.encodeUTF16toUTF8 = function (src, dst) {
      utfx.UTF16toUTF8(src, function (cp) {
        utfx.encodeUTF8(cp, dst);
      });
    };
    /**
     * Decodes and converts UTF8 bytes to UTF16 characters.
     * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
     *  are no more bytes left.
     * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
     * @throws {RangeError} If a starting byte is invalid in UTF8
     * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the remaining bytes.
     */


    utfx.decodeUTF8toUTF16 = function (src, dst) {
      utfx.decodeUTF8(src, function (cp) {
        utfx.UTF8toUTF16(cp, dst);
      });
    };
    /**
     * Calculates the byte length of an UTF8 code point.
     * @param {number} cp UTF8 code point
     * @returns {number} Byte length
     */


    utfx.calculateCodePoint = function (cp) {
      return cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;
    };
    /**
     * Calculates the number of UTF8 bytes required to store UTF8 code points.
     * @param {(!function():number|null)} src Code points source as a function returning the next code point respectively
     *  `null` if there are no more code points left.
     * @returns {number} The number of UTF8 bytes required
     */


    utfx.calculateUTF8 = function (src) {
      var cp,
          l = 0;

      while ((cp = src()) !== null) l += cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;

      return l;
    };
    /**
     * Calculates the number of UTF8 code points respectively UTF8 bytes required to store UTF16 char codes.
     * @param {(!function():number|null)} src Characters source as a function returning the next char code respectively
     *  `null` if there are no more characters left.
     * @returns {!Array.<number>} The number of UTF8 code points at index 0 and the number of UTF8 bytes required at index 1.
     */


    utfx.calculateUTF16asUTF8 = function (src) {
      var n = 0,
          l = 0;
      utfx.UTF16toUTF8(src, function (cp) {
        ++n;
        l += cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;
      });
      return [n, l];
    };

    return utfx;
  }(); // encodings/utf8

  /**
   * Encodes this ByteBuffer's contents between {@link ByteBuffer#offset} and {@link ByteBuffer#limit} to an UTF8 encoded
   *  string.
   * @returns {string} Hex encoded string
   * @throws {RangeError} If `offset > limit`
   * @expose
   */


  ByteBufferPrototype.toUTF8 = function (begin, end) {
    if (typeof begin === 'undefined') begin = this.offset;
    if (typeof end === 'undefined') end = this.limit;

    if (!this.noAssert) {
      if (typeof begin !== 'number' || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
      begin >>>= 0;
      if (typeof end !== 'number' || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
      end >>>= 0;
      if (begin < 0 || begin > end || end > this.buffer.length) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.length);
    }

    return this.buffer.toString("utf8", begin, end);
  };
  /**
   * Decodes an UTF8 encoded string to a ByteBuffer.
   * @param {string} str String to decode
   * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
   *  {@link ByteBuffer.DEFAULT_ENDIAN}.
   * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
   *  {@link ByteBuffer.DEFAULT_NOASSERT}.
   * @returns {!ByteBuffer} ByteBuffer
   * @expose
   */


  ByteBuffer.fromUTF8 = function (str, littleEndian, noAssert) {
    if (!noAssert) if (typeof str !== 'string') throw TypeError("Illegal str: Not a string");
    var bb = new ByteBuffer(0, littleEndian, noAssert);
    bb.buffer = new Buffer(str, "utf8");
    bb.limit = bb.buffer.length;
    return bb;
  };
  /**
   * node-memcpy. This is an optional binding dependency and may not be present.
   * @function
   * @param {!(Buffer|ArrayBuffer|Uint8Array)} target Destination
   * @param {number|!(Buffer|ArrayBuffer)} targetStart Destination start, defaults to 0.
   * @param {(!(Buffer|ArrayBuffer|Uint8Array)|number)=} source Source
   * @param {number=} sourceStart Source start, defaults to 0.
   * @param {number=} sourceEnd Source end, defaults to capacity.
   * @returns {number} Number of bytes copied
   * @throws {Error} If any index is out of bounds
   * @expose
   */


  ByteBuffer.memcpy = memcpy;
  return ByteBuffer;
}();

function to(locale) {
  const lcid = localeToLcid[locale];
  if (lcid) return lcid;else throw new Error(`unkown locale ${locale}`);
}
const lcidToLocale = {
  '4': 'zh_CHS',
  '1025': 'ar_SA',
  '1026': 'bg_BG',
  '1027': 'ca_ES',
  '1028': 'zh_TW',
  '1029': 'cs_CZ',
  '1030': 'da_DK',
  '1031': 'de_DE',
  '1032': 'el_GR',
  '1033': 'en_US',
  '1034': 'es_ES',
  '1035': 'fi_FI',
  '1036': 'fr_FR',
  '1037': 'he_IL',
  '1038': 'hu_HU',
  '1039': 'is_IS',
  '1040': 'it_IT',
  '1041': 'ja_JP',
  '1042': 'ko_KR',
  '1043': 'nl_NL',
  '1044': 'nb_NO',
  '1045': 'pl_PL',
  '1046': 'pt_BR',
  '1047': 'rm_CH',
  '1048': 'ro_RO',
  '1049': 'ru_RU',
  '1050': 'hr_HR',
  '1051': 'sk_SK',
  '1052': 'sq_AL',
  '1053': 'sv_SE',
  '1054': 'th_TH',
  '1055': 'tr_TR',
  '1056': 'ur_PK',
  '1057': 'id_ID',
  '1058': 'uk_UA',
  '1059': 'be_BY',
  '1060': 'sl_SI',
  '1061': 'et_EE',
  '1062': 'lv_LV',
  '1063': 'lt_LT',
  '1064': 'tg_TJ',
  '1065': 'fa_IR',
  '1066': 'vi_VN',
  '1067': 'hy_AM',
  '1069': 'eu_ES',
  '1070': 'wen_DE',
  '1071': 'mk_MK',
  '1074': 'tn_ZA',
  '1076': 'xh_ZA',
  '1077': 'zu_ZA',
  '1078': 'af_ZA',
  '1079': 'ka_GE',
  '1080': 'fo_FO',
  '1081': 'hi_IN',
  '1082': 'mt_MT',
  '1083': 'se_NO',
  '1086': 'ms_MY',
  '1087': 'kk_KZ',
  '1088': 'ky_KG',
  '1089': 'sw_KE',
  '1090': 'tk_TM',
  '1092': 'tt_RU',
  '1093': 'bn_IN',
  '1094': 'pa_IN',
  '1095': 'gu_IN',
  '1096': 'or_IN',
  '1097': 'ta_IN',
  '1098': 'te_IN',
  '1099': 'kn_IN',
  '1100': 'ml_IN',
  '1101': 'as_IN',
  '1102': 'mr_IN',
  '1103': 'sa_IN',
  '1104': 'mn_MN',
  '1105': 'bo_CN',
  '1106': 'cy_GB',
  '1107': 'kh_KH',
  '1108': 'lo_LA',
  '1109': 'my_MM',
  '1110': 'gl_ES',
  '1111': 'kok_IN',
  '1114': 'syr_SY',
  '1115': 'si_LK',
  '1118': 'am_ET',
  '1121': 'ne_NP',
  '1122': 'fy_NL',
  '1123': 'ps_AF',
  '1124': 'fil_PH',
  '1125': 'div_MV',
  '1128': 'ha_NG',
  '1130': 'yo_NG',
  '1131': 'quz_BO',
  '1132': 'ns_ZA',
  '1133': 'ba_RU',
  '1134': 'lb_LU',
  '1135': 'kl_GL',
  '1144': 'ii_CN',
  '1146': 'arn_CL',
  '1148': 'moh_CA',
  '1150': 'br_FR',
  '1152': 'ug_CN',
  '1153': 'mi_NZ',
  '1154': 'oc_FR',
  '1155': 'co_FR',
  '1156': 'gsw_FR',
  '1157': 'sah_RU',
  '1158': 'qut_GT',
  '1159': 'rw_RW',
  '1160': 'wo_SN',
  '1164': 'gbz_AF',
  '2049': 'ar_IQ',
  '2052': 'zh_CN',
  '2055': 'de_CH',
  '2057': 'en_GB',
  '2058': 'es_MX',
  '2060': 'fr_BE',
  '2064': 'it_CH',
  '2067': 'nl_BE',
  '2068': 'nn_NO',
  '2070': 'pt_PT',
  '2077': 'sv_FI',
  '2080': 'ur_IN',
  '2092': 'az_AZ',
  '2094': 'dsb_DE',
  '2107': 'se_SE',
  '2108': 'ga_IE',
  '2110': 'ms_BN',
  '2115': 'uz_UZ',
  '2128': 'mn_CN',
  '2129': 'bo_BT',
  '2141': 'iu_CA',
  '2143': 'tmz_DZ',
  '2155': 'quz_EC',
  '3073': 'ar_EG',
  '3076': 'zh_HK',
  '3079': 'de_AT',
  '3081': 'en_AU',
  '3082': 'es_ES',
  '3084': 'fr_CA',
  '3098': 'sr_SP',
  '3131': 'se_FI',
  '3179': 'quz_PE',
  '4097': 'ar_LY',
  '4100': 'zh_SG',
  '4103': 'de_LU',
  '4105': 'en_CA',
  '4106': 'es_GT',
  '4108': 'fr_CH',
  '4122': 'hr_BA',
  '4155': 'smj_NO',
  '5121': 'ar_DZ',
  '5124': 'zh_MO',
  '5127': 'de_LI',
  '5129': 'en_NZ',
  '5130': 'es_CR',
  '5132': 'fr_LU',
  '5179': 'smj_SE',
  '6145': 'ar_MA',
  '6153': 'en_IE',
  '6154': 'es_PA',
  '6156': 'fr_MC',
  '6203': 'sma_NO',
  '7169': 'ar_TN',
  '7177': 'en_ZA',
  '7178': 'es_DO',
  '7194': 'sr_BA',
  '7227': 'sma_SE',
  '8193': 'ar_OM',
  '8201': 'en_JA',
  '8202': 'es_VE',
  '8218': 'bs_BA',
  '8251': 'sms_FI',
  '9217': 'ar_YE',
  '9225': 'en_CB',
  '9226': 'es_CO',
  '9275': 'smn_FI',
  '10241': 'ar_SY',
  '10249': 'en_BZ',
  '10250': 'es_PE',
  '11265': 'ar_JO',
  '11273': 'en_TT',
  '11274': 'es_AR',
  '12289': 'ar_LB',
  '12297': 'en_ZW',
  '12298': 'es_EC',
  '13313': 'ar_KW',
  '13321': 'en_PH',
  '13322': 'es_CL',
  '14337': 'ar_AE',
  '14346': 'es_UR',
  '15361': 'ar_BH',
  '15370': 'es_PY',
  '16385': 'ar_QA',
  '16394': 'es_BO',
  '17417': 'en_MY',
  '17418': 'es_SV',
  '18441': 'en_IN',
  '18442': 'es_HN',
  '19466': 'es_NI',
  '20490': 'es_PR',
  '21514': 'es_US',
  '31748': 'zh_CHT'
};
const localeToLcid = Object.entries(lcidToLocale).reduce((acc, [k, v]) => Object.assign(acc, {
  [v]: k
}), {});

function Xp(n, p) {
  return n.toString(16).padStart(p, '0').toUpperCase();
}

function xp(n, p) {
  return n.toString(16).padStart(p, '0');
}

function x2(n) {
  return xp(n, 2);
}
/**
 * get an uppercase hex string of a number zero-padded to 4 digits
 * @param n {number} the number
 * @returns {string} 4-digit uppercase hex representation of the number
 */

function X4(n) {
  return Xp(n, 4);
}
/**
 * get an uppercase hex string of a number zero-padded to 8 digits
 * @param n {number} the number
 * @returns {string}
 */

function X8(n) {
  return Xp(n, 8);
}
function name(tag) {
  return PropertyTagLiterals.SubStorageStreamPrefix + X4(tag.id) + X4(tag.type);
}
/**
 * convert UTF-8 Uint8Array to string
 * @param array {Uint8Array}
 * @returns {string}
 */

function utf8ArrayToString(array) {
  return new TextDecoder().decode(array);
}
/**
 * convert string to UTF-8 Uint8Array
 * @param str {string}
 * @returns {Uint8Array}
 */

function stringToUtf8Array(str) {
  return new TextEncoder().encode(str);
}
/**
 * convert string to UTF-16LE Uint8Array
 * @param str {string}
 * @returns {Uint8Array|Uint8Array}
 */

function stringToUtf16LeArray(str) {
  const u16 = Uint16Array.from(str.split('').map(c => c.charCodeAt(0)));
  return new Uint8Array(u16.buffer, u16.byteOffset, u16.byteLength);
}
/**
 * convert a string to a Uint8Array with terminating 0 byte
 * @throws if the string contains characters not in the ANSI range (0-255)
 * @param str
 */

function stringToAnsiArray(str) {
  const codes = str.split('').map(c => c.charCodeAt(0));
  if (codes.findIndex(c => c > 255) > -1) throw new Error("can't encode ansi string with char codes > 255!");
  codes.push(0);
  return Uint8Array.from(codes);
}
/**
 * convert a file name to its DOS 8.3 version.
 * @param fileName {string} a file name (not a path!)
 */

function fileNameToDosFileName(fileName) {
  const parts = fileName.split(".");
  let name, extension;

  if (parts.length < 2) {
    name = parts[0];
    extension = null;
  } else {
    name = parts.slice(0, -1).join('');
    extension = parts[parts.length - 1];
  }

  if (name !== "") {
    name = (name.length > 8 ? name.substring(0, 6) + "~1" : name).toUpperCase();
  }

  if (extension != null) {
    name += "." + (extension.length > 3 ? extension.substring(0, 3) : extension).toUpperCase();
  }

  return name;
}
/**
 * turn a ByteBuffer into a Uint8Array, using the current offset as a limit.
 * buf.limit will change to buf.offset, and its buf.offset will be reset to 0.
 * @param buf {ByteBuffer} the buffer to convert
 * @returns {Uint8Array} a new Uint8Array containing the
 */

function byteBufferAsUint8Array(buf) {
  buf.limit = buf.offset;
  buf.offset = 0;
  return new Uint8Array(buf.toBuffer(true));
}
/**
 * make an new byte buffer with the correct settings
 * @param otherBuffer {ByteBuffer | ArrayBuffer | Uint8Array} other buffer to wrap into a ByteBuffer
 * @param initCap {number?} initial capacity. ignored if otherBuffer is given.
 */

function makeByteBuffer(initCap, otherBuffer) {
  if (initCap != null && initCap < 0) throw new Error("initCap must be non-negative!");
  return otherBuffer == null ? new bytebufferNode(initCap || 1, bytebufferNode.LITTLE_ENDIAN) : bytebufferNode.wrap(otherBuffer, null, bytebufferNode.LITTLE_ENDIAN);
}
function getPathExtension(p) {
  if (!p.includes(".")) return "";
  const parts = p.split(".");
  return "." + parts[parts.length - 1];
}
function isNullOrEmpty(str) {
  return !str || str === "";
}
function isNullOrWhiteSpace(str) {
  return str == null || str.trim() === "";
}
function localeId() {
  return to(getLang());
}

function getLang() {
  if (typeof navigator != 'undefined') {
    if (navigator.language != null) return navigator.language;else return (navigator.languages || ["en_US"])[0];
  } else return "en_US";
}

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

/**
 * A property inside the MSG file
 */

class Property {
  constructor(obj) {
    _defineProperty(this, "id", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "_flags", void 0);

    _defineProperty(this, "_multiValue", void 0);

    _defineProperty(this, "_data", void 0);

    this.id = obj.id;
    this.type = obj.type;
    this._data = obj.data;
    this._multiValue = obj.multiValue == null ? false : obj.multiValue;
    this._flags = obj.flags == null ? 0 : obj.flags;
  }

  name() {
    return name(this);
  }

  shortName() {
    return X4(this.id);
  }

  flagsCollection() {
    const result = [];
    if ((this._flags & PropertyFlag.PROPATTR_MANDATORY) !== 0) result.push(PropertyFlag.PROPATTR_MANDATORY);
    if ((this._flags & PropertyFlag.PROPATTR_READABLE) !== 0) result.push(PropertyFlag.PROPATTR_READABLE);
    if ((this._flags & PropertyFlag.PROPATTR_WRITABLE) !== 0) result.push(PropertyFlag.PROPATTR_WRITABLE);
    return result;
  }

  asInt() {
    const view = new DataView(this._data.buffer, 0);

    switch (this.type) {
      case PropertyType.PT_SHORT:
        return view.getInt16(0, false);

      case PropertyType.PT_LONG:
        return view.getInt32(0, false);

      default:
        throw new Error("type is not PT_SHORT or PT_LONG");
    }
  }

  asSingle() {
    const view = new DataView(this._data.buffer, 0);

    switch (this.type) {
      case PropertyType.PT_FLOAT:
        return view.getFloat32(0, false);

      default:
        throw new Error("type is not PT_FLOAT");
    }
  }

  asDouble() {
    const view = new DataView(this._data.buffer, 0);

    switch (this.type) {
      case PropertyType.PT_FLOAT:
        return view.getFloat64(0, false);

      default:
        throw new Error("type is not PT_DOUBLE");
    }
  }

  asDecimal() {
    const view = new DataView(this._data.buffer, 0);

    switch (this.type) {
      case PropertyType.PT_FLOAT:
        // TODO: is there a .Net decimal equivalent for js?
        return view.getFloat32(0, false);

      default:
        throw new Error("type is not PT_FLOAT");
    }
  }

  asDateTime() {
    const view = new DataView(this._data.buffer, 0);

    switch (this.type) {
      case PropertyType.PT_APPTIME:
        // msg stores .Net DateTime as OADate, number of days since 30 dec 1899 as a double value
        const oaDate = view.getFloat64(0, false);
        return oADateToDate(oaDate);

      case PropertyType.PT_SYSTIME:
        // https://docs.microsoft.com/de-de/office/client-developer/outlook/mapi/filetime
        const fileTimeLower = view.getUint32(0, false);
        const fileTimeUpper = view.getUint32(4, false);
        return fileTimeToDate(fileTimeLower, fileTimeUpper);

      default:
        throw new Error("type is not PT_APPTIME or PT_SYSTIME");
    }
  }

  asBool() {
    const view = new DataView(this._data.buffer, 0);

    switch (this.type) {
      case PropertyType.PT_BOOLEAN:
        return Boolean(this._data[0]);

      default:
        throw new Error("type is not PT_BOOLEAN");
    }
  } // TODO: this will fail for very large numbers


  asLong() {
    const view = new DataView(this._data.buffer, 0);

    switch (this.type) {
      case PropertyType.PT_LONG:
      case PropertyType.PT_LONGLONG:
        const val = view.getFloat64(0, false);
        if (val > Number.MAX_SAFE_INTEGER) throw new Error("implementation can't handle big longs yet");
        return parseInt(val);

      default:
        throw new Error("type is not PT_LONG");
    }
  }

  asString() {
    switch (this.type) {
      case PropertyType.PT_UNICODE:
        return utf8ArrayToString(this._data);

      case PropertyType.PT_STRING8:
        return String.fromCharCode(...this._data);

      default:
        throw new Error("Type is not PT_UNICODE or PT_STRING8");
    }
  }

  asGuid() {
    switch (this.type) {
      case PropertyType.PT_CLSID:
        return v4({
          random: this._data.slice(0, 16)
        });

      default:
        throw new Error("Type is not PT_CLSID");
    }
  }

  asBinary() {
    switch (this.type) {
      case PropertyType.PT_BINARY:
        return this._data.slice();

      default:
        throw new Error("Type is not PT_BINARY");
    }
  }

}

class Properties extends Array {
  /**
   * add a prop it it doesn't exist, otherwise replace it
   */
  addOrReplaceProperty(tag, obj, flags = PropertyFlag.PROPATTR_READABLE | PropertyFlag.PROPATTR_WRITABLE) {
    const index = this.findIndex(p => p.id === tag.id);
    if (index >= 0) this.splice(index, 1);
    this.addProperty(tag, obj, flags);
  }

  addProperty(tag, value, flags = PropertyFlag.PROPATTR_READABLE | PropertyFlag.PROPATTR_WRITABLE) {
    if (value == null) return;
    let data = new Uint8Array(0);
    let view;

    switch (tag.type) {
      case PropertyType.PT_APPTIME:
        data = new Uint8Array(8);
        view = new DataView(data.buffer);
        view.setFloat64(0, value, true);
        break;

      case PropertyType.PT_SYSTIME:
        data = new Uint8Array(8);
        view = new DataView(data.buffer);
        view.setInt32(0, value.fileTimeLower, true);
        view.setInt32(4, value.fileTimeUpper, true);
        break;

      case PropertyType.PT_SHORT:
        data = new Uint8Array(2);
        view = new DataView(data.buffer);
        view.setInt16(0, value, true);
        break;

      case PropertyType.PT_ERROR:
      case PropertyType.PT_LONG:
        data = new Uint8Array(4);
        view = new DataView(data.buffer);
        view.setInt32(0, value, true);
        break;

      case PropertyType.PT_FLOAT:
        data = new Uint8Array(4);
        view = new DataView(data.buffer);
        view.setFloat32(0, value, true);
        break;

      case PropertyType.PT_DOUBLE:
        data = new Uint8Array(8);
        view = new DataView(data.buffer);
        view.setFloat64(0, value, true);
        break;
      //case PropertyType.PT_CURRENCY:
      //    data = (byte[]) obj
      //    break

      case PropertyType.PT_BOOLEAN:
        data = Uint8Array.from([value ? 1 : 0]);
        break;

      case PropertyType.PT_I8:
        // TODO:
        throw new Error("PT_I8 property type is not supported (64 bit ints)!");
      // data = BitConverter.GetBytes((long)obj)

      case PropertyType.PT_UNICODE:
        data = stringToUtf16LeArray(value);
        break;

      case PropertyType.PT_STRING8:
        data = stringToAnsiArray(value);
        break;

      case PropertyType.PT_CLSID:
        // GUIDs should be Uint8Arrays already
        data = value;
        break;

      case PropertyType.PT_BINARY:
        // TODO: make user convert object to Uint8Array and just assign.
        if (value instanceof Uint8Array) {
          data = value;
          break;
        }

        const objType = typeof value;

        switch (objType) {
          case "boolean":
            data = Uint8Array.from(value);
            break;

          case "TypeCode.SByte":
            //data = BitConverter.GetBytes((sbyte)obj)
            break;

          case "TypeCode.Byte":
            //data = BitConverter.GetBytes((byte)obj)
            break;

          case "TypeCode.Int16":
            //data = BitConverter.GetBytes((short)obj)
            break;

          case "TypeCode.UInt16":
            // data = BitConverter.GetBytes((uint)obj)
            break;

          case "TypeCode.Int32":
            //data = BitConverter.GetBytes((int)obj)
            break;

          case "TypeCode.UInt32":
            // data = BitConverter.GetBytes((uint)obj)
            break;

          case "TypeCode.Int64":
            // data = BitConverter.GetBytes((long)obj)
            break;

          case "TypeCode.UInt64":
            // data = BitConverter.GetBytes((ulong)obj)
            break;

          case "TypeCode.Single":
            // data = BitConverter.GetBytes((float)obj)
            break;

          case "TypeCode.Double":
            // data = BitConverter.GetBytes((double)obj)
            break;

          case "TypeCode.DateTime":
            // DateTime.Ticks is a long.
            //  time elapsed time since 12:00:00 midnight, January 1, 0001 in 100-ns-intervals
            // data = BitConverter.GetBytes(((DateTime)obj).Ticks)
            break;

          case "string":
            data = stringToUtf8Array(value);
            break;

          default:
            throw new Error("PT_BINARY property type value out of range!");
        }

        break;

      case PropertyType.PT_NULL:
        break;

      case PropertyType.PT_ACTIONS:
        throw new Error("PT_ACTIONS property type is not supported");

      case PropertyType.PT_UNSPECIFIED:
        throw new Error("PT_UNSPECIFIED property type is not supported");

      case PropertyType.PT_OBJECT:
        // TODO: Add support for MSG
        break;

      case PropertyType.PT_SVREID:
        throw new Error("PT_SVREID property type is not supported");

      case PropertyType.PT_SRESTRICT:
        throw new Error("PT_SRESTRICT property type is not supported");

      default:
        throw new Error("type is out of range!");
    }

    this.push(new Property({
      id: tag.id,
      type: tag.type,
      flags,
      data
    }));
  }
  /**
   * writes the properties structure to a cfb stream in storage
   * @param storage
   * @param messageSize
   * @param prefix a function that will be called with the buffer before the properties get written to it.
   * @returns {number}
   */


  writeProperties(storage, prefix, messageSize) {
    const buf = makeByteBuffer();
    prefix(buf);
    let size = 0; // The data inside the property stream (1) MUST be an array of 16-byte entries. The number of properties,
    // each represented by one entry, can be determined by first measuring the size of the property stream (1),
    // then subtracting the size of the header from it, and then dividing the result by the size of one entry.
    // The structure of each entry, representing one property, depends on whether the property is a fixed length
    // property or not.

    this.forEach(property => {
      // property tag: A 32-bit value that contains a property type and a property ID. The low-order 16 bits
      // represent the property type. The high-order 16 bits represent the property ID.
      buf.writeUint16(property.type); // 2 bytes

      buf.writeUint16(property.id); // 2 bytes

      buf.writeUint32(property._flags); // 4 bytes

      switch (property.type) {
        //case PropertyType.PT_ACTIONS:
        //    break
        case PropertyType.PT_I8:
        case PropertyType.PT_APPTIME:
        case PropertyType.PT_SYSTIME:
        case PropertyType.PT_DOUBLE:
          buf.append(property._data);
          break;

        case PropertyType.PT_ERROR:
        case PropertyType.PT_LONG:
        case PropertyType.PT_FLOAT:
          buf.append(property._data);
          buf.writeUint32(0);
          break;

        case PropertyType.PT_SHORT:
          buf.append(property._data);
          buf.writeUint32(0);
          buf.writeUint16(0);
          break;

        case PropertyType.PT_BOOLEAN:
          buf.append(property._data);
          buf.append(new Uint8Array(7));
          break;
        //case PropertyType.PT_CURRENCY:
        //    binaryWriter.Write(property.Data)
        //    break

        case PropertyType.PT_UNICODE:
          // Write the length of the property to the propertiesstream
          buf.writeInt32(property._data.length + 2);
          buf.writeUint32(0);
          storage.addStream(property.name(), property._data);
          size += property._data.length;
          break;

        case PropertyType.PT_STRING8:
          // Write the length of the property to the propertiesstream
          buf.writeInt32(property._data.length + 1);
          buf.writeUint32(0);
          storage.addStream(property.name(), property._data);
          size += property._data.length;
          break;

        case PropertyType.PT_CLSID:
          buf.append(property._data);
          break;
        //case PropertyType.PT_SVREID:
        //    break
        //case PropertyType.PT_SRESTRICT:
        //    storage.AddStream(property.Name).SetData(property.Data)
        //    break

        case PropertyType.PT_BINARY:
          // Write the length of the property to the propertiesstream
          buf.writeInt32(property._data.length);
          buf.writeUint32(0);
          storage.addStream(property.name(), property._data);
          size += property._data.length;
          break;

        case PropertyType.PT_MV_SHORT:
          break;

        case PropertyType.PT_MV_LONG:
          break;

        case PropertyType.PT_MV_FLOAT:
          break;

        case PropertyType.PT_MV_DOUBLE:
          break;

        case PropertyType.PT_MV_CURRENCY:
          break;

        case PropertyType.PT_MV_APPTIME:
          break;

        case PropertyType.PT_MV_LONGLONG:
          break;

        case PropertyType.PT_MV_UNICODE:
          // PropertyType.PT_MV_TSTRING
          break;

        case PropertyType.PT_MV_STRING8:
          break;

        case PropertyType.PT_MV_SYSTIME:
          break;
        //case PropertyType.PT_MV_CLSID:
        //    break

        case PropertyType.PT_MV_BINARY:
          break;

        case PropertyType.PT_UNSPECIFIED:
          break;

        case PropertyType.PT_NULL:
          break;

        case PropertyType.PT_OBJECT:
          // TODO: Adding new MSG file
          break;
      }
    });

    if (messageSize != null) {
      buf.writeUint16(PropertyTags.PR_MESSAGE_SIZE.type); // 2 bytes

      buf.writeUint16(PropertyTags.PR_MESSAGE_SIZE.id); // 2 bytes

      buf.writeUint32(PropertyFlag.PROPATTR_READABLE | PropertyFlag.PROPATTR_WRITABLE); // 4 bytes

      buf.writeUint64(messageSize + size + 8);
      buf.writeUint32(0);
    } // Make the properties stream


    size += buf.offset;
    storage.addStream(PropertyTagLiterals.PropertiesStreamName, byteBufferAsUint8Array(buf)); // if(!storage.TryGetStream(PropertyTags.PropertiesStreamName, out var propertiesStream))
    // propertiesStream = storage.AddStream(PropertyTags.PropertiesStreamName);
    // TODO: is this the written length?

    return size;
  }

}

/**
 * The properties stream contained inside the top level of the .msg file, which represents the Message object itself.
 */
class TopLevelProperties extends Properties {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "nextRecipientId", void 0);

    _defineProperty(this, "nextAttachmentId", void 0);

    _defineProperty(this, "recipientCount", void 0);

    _defineProperty(this, "attachmentCount", void 0);
  }

  // TODO: add constructor to read in existing CFB stream

  /**
   *
   * @param storage
   * @param prefix
   * @param messageSize
   */
  writeProperties(storage, prefix, messageSize) {
    // prefix required by the standard: 32 bytes
    const topLevelPropPrefix = buf => {
      prefix(buf); // Reserved(8 bytes): This field MUST be set to zero when writing a .msg file and MUST be ignored
      // when reading a.msg file.

      buf.writeUint64(0); // Next Recipient ID(4 bytes): The ID to use for naming the next Recipient object storage if one is
      // created inside the .msg file. The naming convention to be used is specified in section 2.2.1.If
      // no Recipient object storages are contained in the.msg file, this field MUST be set to 0.

      buf.writeUint32(this.nextRecipientId); // Next Attachment ID (4 bytes): The ID to use for naming the next Attachment object storage if one
      // is created inside the .msg file. The naming convention to be used is specified in section 2.2.2.
      // If no Attachment object storages are contained in the.msg file, this field MUST be set to 0.

      buf.writeUint32(this.nextAttachmentId); // Recipient Count(4 bytes): The number of Recipient objects.

      buf.writeUint32(this.recipientCount); // Attachment Count (4 bytes): The number of Attachment objects.

      buf.writeUint32(this.attachmentCount); // Reserved(8 bytes): This field MUST be set to 0 when writing a msg file and MUST be ignored when
      // reading a msg file.

      buf.writeUint64(0);
    };

    return super.writeProperties(storage, topLevelPropPrefix, messageSize);
  }

}

/**
 * The entry stream MUST be named "__substg1.0_00030102" and consist of 8-byte entries, one for each
 * named property being stored. The properties are assigned unique numeric IDs (distinct from any property
 * ID assignment) starting from a base of 0x8000. The IDs MUST be numbered consecutively, like an array.
 * In this stream, there MUST be exactly one entry for each named property of the Message object or any of
 * its subobjects. The index of the entry for a particular ID is calculated by subtracting 0x8000 from it.
 * For example, if the ID is 0x8005, the index for the corresponding 8-byte entry would be 0x8005 – 0x8000 = 5.
 * The index can then be multiplied by 8 to get the actual byte offset into the stream from where to start
 * reading the corresponding entry.
 *
 * see: https://msdn.microsoft.com/en-us/library/ee159689(v=exchg.80).aspx
 */
class EntryStream extends Array {
  /**
   * creates this object and reads all the EntryStreamItems from
   * the given storage
   * @param storage {any}
   */
  constructor(storage) {
    super();
    if (storage == null) return;
    const stream = storage.getStream(PropertyTagLiterals.EntryStream);

    if (stream.byteLength <= 0) {
      storage.addStream(PropertyTagLiterals.EntryStream, Uint8Array.of());
    }

    const buf = makeByteBuffer(null, stream);

    while (buf.offset < buf.limit) {
      const entryStreamItem = EntryStreamItem.fromBuffer(buf);
      this.push(entryStreamItem);
    }
  }
  /**
   * writes all the EntryStreamItems as a stream to the storage
   * @param storage {any}
   * @param streamName {string?}
   */


  write(storage, streamName = PropertyTagLiterals.EntryStream) {
    const buf = makeByteBuffer();
    this.forEach(entry => entry.write(buf));
    storage.addStream(streamName, byteBufferAsUint8Array(buf));
  }

}
/**
 * Represents one item in the EntryStream
 */

class EntryStreamItem {
  /**
   * the Property Kind subfield of the Index and Kind Information field), this value is the LID part of the
   * PropertyName structure, as specified in [MS-OXCDATA] section 2.6.1. If this property is a string named
   * property, this value is the offset in bytes into the strings stream where the value of the Name field of
   * the PropertyName structure is located.
   * was ushort
   * */

  /**
   * The following structure specifies the stream indexes and whether the property is a numerical
   * named property or a string named property
   * @type {IndexAndKindInformation}
   */

  /**
   * creates this objcet and reads all the properties from the given buffer
   * @param buf {ByteBuffer}
   */
  static fromBuffer(buf) {
    const nameIdentifierOrStringOffset = buf.readUint16();
    const indexAndKindInformation = IndexAndKindInformation.fromBuffer(buf);
    return new EntryStreamItem(nameIdentifierOrStringOffset, indexAndKindInformation);
  }
  /**
   * creates this object from the properties
   * @param nameIdentifierOrStringOffset {number}
   * @param indexAndKindInformation {IndexAndKindInformation}
   */


  constructor(nameIdentifierOrStringOffset, indexAndKindInformation) {
    _defineProperty(this, "nameIdentifierOrStringOffset", void 0);

    _defineProperty(this, "nameIdentifierOrStringOffsetHex", void 0);

    _defineProperty(this, "indexAndKindInformation", void 0);

    this.nameIdentifierOrStringOffset = nameIdentifierOrStringOffset;
    this.nameIdentifierOrStringOffsetHex = nameIdentifierOrStringOffset.toString(16).toUpperCase().padStart(4, '0');
    this.indexAndKindInformation = indexAndKindInformation;
  }
  /**
   * write all the internal properties to the given buffer
   * @param buf {ByteBuffer}
   */


  write(buf) {
    buf.writeUint32(this.nameIdentifierOrStringOffset);
    const packed = this.indexAndKindInformation.guidIndex << 1 | this.indexAndKindInformation.propertyKind;
    buf.writeUint16(packed);
    buf.writeUint16(this.indexAndKindInformation.propertyIndex); //Doesn't seem to be the case in the spec.
    // Fortunately section 3.2 clears this up.
  }

}
class IndexAndKindInformation {
  // System.Uint16
  // 1 byte
  static fromBuffer(buf) {
    const propertyIndex = buf.readUint16();
    const packedValue = buf.readUint16();
    const guidIndex = packedValue >>> 1 & 0xFFFF;
    const propertyKind = packedValue & 0x07;
    if (![0xFF, 0x01, 0x00].includes(propertyKind)) throw new Error("invalid propertyKind:" + propertyKind);
    return new IndexAndKindInformation(propertyIndex, guidIndex, propertyKind);
  }

  constructor(propertyIndex, guidIndex, propertyKind) {
    _defineProperty(this, "propertyIndex", void 0);

    _defineProperty(this, "guidIndex", void 0);

    _defineProperty(this, "propertyKind", void 0);

    this.guidIndex = guidIndex;
    this.propertyIndex = propertyIndex;
    this.propertyKind = propertyKind;
  }

  write(buf) {
    buf.writeUint16(this.propertyIndex);
    buf.writeUint32(this.guidIndex + this.propertyKind);
  }

}

/**
 * The GUID stream MUST be named "__substg1.0_00020102". It MUST store the property set GUID
 * part of the property name of all named properties in the Message object or any of its subobjects,
 * except for those named properties that have PS_MAPI or PS_PUBLIC_STRINGS, as described in [MSOXPROPS]
 * section 1.3.2, as their property set GUID.
 * The GUIDs are stored in the stream consecutively like an array. If there are multiple named properties
 * that have the same property set GUID, then the GUID is stored only once and all the named
 * properties will refer to it by its index
 */

class GuidStream extends Array {
  /**
   * create this object
   * @param storage the storage that contains the PropertyTags.GuidStream
   */
  constructor(storage) {
    super();
    if (storage == null) return;
    const stream = storage.getStream(PropertyTagLiterals.GuidStream);
    const buf = makeByteBuffer(null, stream);

    while (buf.offset < buf.limit) {
      const guid = buf.slice(buf.offset, buf.offset + 16).toArrayBuffer(true);
      this.push(new Uint8Array(guid));
    }
  }
  /**
   * writes all the guids as a stream to the storage
   * @param storage
   */


  write(storage) {
    const buf = makeByteBuffer();
    this.forEach(g => {
      buf.append(g);
      storage.addStream(PropertyTagLiterals.GuidStream, buf);
    });
  }

}

/**
 * The string stream MUST be named "__substg1.0_00040102". It MUST consist of one entry for each
 * string named property, and all entries MUST be arranged consecutively, like in an array.
 * As specified in section 2.2.3.1.2, the offset, in bytes, to use for a particular property is stored in the
 * corresponding entry in the entry stream.That is a byte offset into the string stream from where the
 * entry for the property can be read.The strings MUST NOT be null-terminated. Implementers can add a
 * terminating null character to the string
 * See https://msdn.microsoft.com/en-us/library/ee124409(v=exchg.80).aspx
 */
class StringStream extends Array {
  /**
   * create StringStream and read all the StringStreamItems from the given storage, if any.
   */
  constructor(storage) {
    super();
    if (storage == null) return;
    const stream = storage.getStream(PropertyTagLiterals.StringStream);
    const buf = makeByteBuffer(null, stream);

    while (buf.offset < buf.limit) {
      this.push(StringStreamItem.fromBuffer(buf));
    }
  }
  /**
   * write all the StringStreamItems as a stream to the storage
   * @param storage
   */


  write(storage) {
    const buf = makeByteBuffer();
    this.forEach(s => s.write(buf));
    storage.addStream(PropertyTagLiterals.StringStream, buf);
  }

}
/**
 * Represents one Item in the StringStream
 */

class StringStreamItem {
  /**
   * the length of the following name field in bytes
   * was uint
   * @type number
   */

  /**
   * A Unicode string that is the name of the property. A new entry MUST always start
   * on a 4 byte boundary; therefore, if the size of the Name field is not an exact multiple of 4, and
   * another Name field entry occurs after it, null characters MUST be appended to the stream after it
   * until the 4-byte boundary is reached.The Name Length field for the next entry will then start at
   * the beginning of the next 4-byte boundary
   * @type {string}
   */

  /**
   * create a StringStreamItem from a byte buffer
   * @param buf {ByteBuffer}
   */
  static fromBuffer(buf) {
    const length = buf.readUint32(); // Encoding.Unicode.GetString(binaryReader.ReadBytes((int) Length)).Trim('\0');

    const name = buf.readUTF8String(length);
    const boundary = StringStreamItem.get4BytesBoundary(length);
    buf.offset = buf.offset + boundary;
    return new StringStreamItem(name);
  }

  constructor(name) {
    _defineProperty(this, "length", void 0);

    _defineProperty(this, "name", void 0);

    this.length = name.length;
    this.name = name;
  }
  /**
   * write this item to the ByteBuffer
   * @param buf {ByteBuffer}
   */


  write(buf) {
    buf.writeUint32(this.length);
    buf.writeUTF8String(this.name);
    const boundary = StringStreamItem.get4BytesBoundary(this.length);

    for (let i = 0; i < boundary; i++) {
      buf.writeUint8(0);
    }
  }
  /**
   * Extract 4 from the given <paramref name="length"/> until the result is smaller
   * than 4 and then returns this result
   * @param length {number} was uint
   */


  static get4BytesBoundary(length) {
    if (length === 0) return 4;

    while (length >= 4) length -= 4;

    return length;
  }

}

class NamedProperties extends Array {
  // The offset index for a named property
  constructor(topLevelProperties) {
    super();

    _defineProperty(this, "_topLevelProperties", void 0);

    _defineProperty(this, "_namedPropertyIndex", void 0);

    this._topLevelProperties = topLevelProperties;
  }
  /**
   * adds a NamedPropertyTag. Only support for properties by ID for now.
   * @param mapiTag {NamedProperty}
   * @param obj {any}
   */


  addProperty(mapiTag, obj) {
    // Named property field 0000. 0x8000 + property offset
    this._topLevelProperties.addProperty({
      id: 0x8000 + this._namedPropertyIndex,
      type: obj
    });

    this._namedPropertyIndex += 1;
    this.push({
      nameIdentifier: mapiTag.id,
      guid: mapiTag.guid,
      kind: PropertyKind.Lid,
      nameSize: 0,
      name: ""
    });
  }
  /**
   * Writes the properties to the storage. Unfortunately this is going to have to be used after we already written the top level properties.
   * @param storage {any}
   * @param messageSize {number}
   */


  writeProperties(storage, messageSize = 0) {
    // Grab the nameIdStorage, 3.1 on the SPEC
    storage = storage.getStorage(PropertyTagLiterals.NameIdStorage);
    const entryStream = new EntryStream(storage);
    const stringStream = new StringStream(storage);
    const guidStream = new GuidStream(storage);
    const entryStream2 = new EntryStream(storage); // TODO:

    const guids = this.map(np => np.guid).filter(
    /* TODO: unique*/
    () => {
      throw new Error();
    });
    guids.forEach(g => guidStream.push(g));
    this.forEach((np, propertyIndex) => {
      // (ushort) (guids.IndexOf(namedProperty.Guid) + 3);
      const guidIndex = guids.indexOf(np.guid) + 3; // Depending on the property type. This is doing name.

      entryStream.push(new EntryStreamItem(np.nameIdentifier, new IndexAndKindInformation(propertyIndex, guidIndex, PropertyKind.Lid))); //+3 as per spec.

      entryStream2.push(new EntryStreamItem(np.nameIdentifier, new IndexAndKindInformation(propertyIndex, guidIndex, PropertyKind.Lid))); //3.2.2 of the SPEC [MS-OXMSG]

      entryStream2.write(storage, NamedProperties._generateStreamString(np.nameIdentifier, guidIndex, np.kind)); // 3.2.2 of the SPEC Needs to be written, because the stream changes as per named object.

      entryStream2.splice(0, entryStream2.length);
    });
    guidStream.write(storage);
    entryStream.write(storage);
    stringStream.write(storage);
  }
  /**
   * generates the stream strings
   * @param nameIdentifier {number} was uint
   * @param guidTarget {number} was uint
   * @param propertyKind {PropertyKindEnum} 1 byte
   */


  static _generateStreamString(nameIdentifier, guidTarget, propertyKind) {
    switch (propertyKind) {
      case PropertyKind.Lid:
        const number = 4096 + (nameIdentifier ^ guidTarget << 1) % 0x1F << 16 | 0x00000102;
        return "__substg1.0_" + number.toString(16).toUpperCase().padStart(8, '0');

      default:
        throw new Error("not implemented!");
    }
  }

}

/**
 * base class for all MSG files
 */

class Message {
  constructor() {
    _defineProperty(this, "_saved", false);

    _defineProperty(this, "iconIndex", void 0);

    _defineProperty(this, "_topLevelProperties", void 0);

    _defineProperty(this, "_namedProperties", void 0);

    _defineProperty(this, "_storage", void 0);

    _defineProperty(this, "_messageClass", MessageClass.Unknown);

    _defineProperty(this, "_messageSize", void 0);

    this._storage = new CFBStorage(); // In the preceding figure, the "__nameid_version1.0" named property mapping storage contains the
    // three streams  used to provide a mapping from property ID to property name
    // ("__substg1.0_00020102", "__substg1.0_00030102", and "__substg1.0_00040102") and various other
    // streams that provide a mapping from property names to property IDs.
    // if (!CompoundFile.RootStorage.TryGetStorage(PropertyTags.NameIdStorage, out var nameIdStorage))
    // nameIdStorage = CompoundFile.RootStorage.AddStorage(PropertyTags.NameIdStorage);

    const nameIdStorage = this._storage.addStorage(PropertyTagLiterals.NameIdStorage);

    nameIdStorage.addStream(PropertyTagLiterals.EntryStream, Uint8Array.of());
    nameIdStorage.addStream(PropertyTagLiterals.StringStream, Uint8Array.of());
    nameIdStorage.addStream(PropertyTagLiterals.GuidStream, Uint8Array.of());
    this._topLevelProperties = new TopLevelProperties();
    this._namedProperties = new NamedProperties(this._topLevelProperties);
  }

  _save() {
    this._topLevelProperties.addProperty(PropertyTags.PR_MESSAGE_CLASS_W, this._messageClass);

    this._topLevelProperties.writeProperties(this._storage, () => {}, this._messageSize);

    this._namedProperties.writeProperties(this._storage, 0);

    this._saved = true;
    this._messageSize = 0;
  }
  /**
   * writes the Message to an underlying CFB
   * structure and returns a serialized
   * representation
   *
   */


  saveToBuffer() {
    this._save();

    return this._storage.toBytes();
  }

  addProperty(propertyTag, value, flags = PropertyFlag.PROPATTR_WRITABLE) {
    if (this._saved) throw new Error("Message is already saved!");

    this._topLevelProperties.addOrReplaceProperty(propertyTag, value, flags);
  }

}

class Address {
  constructor(email, displayName, addressType = 'SMTP') {
    _defineProperty(this, "addressType", void 0);

    _defineProperty(this, "email", void 0);

    _defineProperty(this, "displayName", void 0);

    this.email = email;
    this.displayName = isNullOrWhiteSpace(this.displayName) ? email : displayName;
    this.addressType = addressType;
  }

}

function makeUUIDBuffer() {
  return v4({}, new Uint8Array(16), 0);
}

let instanceKey = null; // A search key is used to compare the data in two objects. An object's search key is stored in its
// <see cref="PropertyTags.PR_SEARCH_KEY" /> (PidTagSearchKey) property. Because a search key
// represents an object's data and not the object itself, two different objects with the same data can have the same
// search key. When an object is copied, for example, both the original object and its copy have the same data and the
// same search key. Messages and messaging users have search keys. The search key of a message is a unique identifier
// of  the message's data. Message store providers furnish a message's <see cref="PropertyTags.PR_SEARCH_KEY" />
// property at message creation time.The search key of an address book entry is computed from its address type(
// <see cref="PropertyTags.PR_ADDRTYPE_W" /> (PidTagAddressType)) and address
// (<see cref="PropertyTags.PR_EMAIL_ADDRESS_W" /> (PidTagEmailAddress)). If the address book entry is writable,
// its search key might not be available until the address type and address have been set by using the
// IMAPIProp::SetProps method and the entry has been saved by using the IMAPIProp::SaveChanges method.When these
// address properties change, it is possible for the corresponding search key not to be synchronized with the new
// values until the changes have been committed with a SaveChanges call. The value of an object's record key can be
// the same as or different than the value of its search key, depending on the service provider. Some service providers
// use the same value for an object's search key, record key, and entry identifier.Other service providers assign unique
// values for each of its objects identifiers.

function generateSearchKey(addressType, emailAddress) {
  return stringToUtf16LeArray(addressType + emailAddress);
} // A record key is used to compare two objects. Message store and address book objects must have record keys, which
// are stored in their <see cref="PropertyTags.PR_RECORD_KEY" /> (PidTagRecordKey) property. Because a record key
// identifies an object and not its data, every instance of an object has a unique record key. The scope of a record
// key for folders and messages is the message store. The scope for address book containers, messaging users, and
// distribution lists is the set of top-level containers provided by MAPI for use in the integrated address book.
// Record keys can be duplicated in another resource. For example, different messages in two different message stores
// can have the same record key. This is different from long-term entry identifiers; because long-term entry
// identifiers contain a reference to the service provider, they have a wider scope.A message store's record key is
// similar in scope to a long-term entry identifier; it should be unique across all message store providers. To ensure
// this uniqueness, message store providers typically set their record key to a value that is the combination of their
// <see cref="PropertyTags.PR_MDB_PROVIDER" /> (PidTagStoreProvider) property and an identifier that is unique to the
// message store.

function generateRecordKey() {
  return makeUUIDBuffer();
} // This property is a binary value that uniquely identifies a row in a table view. It is a required column in most
// tables. If a row is included in two views, there are two different instance keys. The instance key of a row may
// differ each time the table is opened, but remains constant while the table is open. Rows added while a table is in
// use do not reuse an instance key that was previously used.
// message store.

function generateInstanceKey() {
  if (instanceKey == null) {
    instanceKey = makeUUIDBuffer().slice(0, 4);
  }

  return instanceKey;
} // The PR_ENTRYID property contains a MAPI entry identifier used to open and edit properties of a particular MAPI
// object.
// The PR_ENTRYID property identifies an object for OpenEntry to instantiate and provides access to all of its
// properties through the appropriate derived interface of IMAPIProp. PR_ENTRYID is one of the base address properties
// for all messaging users. The PR_ENTRYID for CEMAPI always contains long-term identifiers.
// - Required on folder objects
// - Required on message store objects
// - Required on status objects
// - Changed in a copy operation
// - Unique within entire world

function generateEntryId() {
  // Encoding.Unicode.GetBytes(Guid.NewGuid().ToString());
  const val = v4(); // v4 without args gives a string

  return new stringToUtf16LeArray(val);
}

/**
 * The properties stream contained inside an Recipient storage object.
 */
class RecipientProperties extends Properties {
  writeProperties(storage, prefix, messageSize) {
    const recipPropPrefix = buf => {
      prefix(buf); // Reserved(8 bytes): This field MUST be set to zero when writing a .msg file and MUST be ignored
      // when reading a.msg file.

      buf.writeUint64(0);
    };

    return super.writeProperties(storage, recipPropPrefix, messageSize);
  }

}

/**
 * Wrapper around a list of recipients
 */
class Recipients extends Array {
  /**
   * add a new To-Recipient to the list
   * @param email email address of the recipient
   * @param displayName display name of the recipient (optional)
   * @param addressType address type of the recipient (default SMTP)
   * @param objectType mapiObjectType of the recipient (default MAPI_MAILUSER)
   * @param displayType recipientRowDisplayType of the recipient (default MessagingUser)
   */
  addTo(email, displayName = "", addressType = 'SMTP', objectType = MapiObjectType.MAPI_MAILUSER, displayType = RecipientRowDisplayType.MessagingUser) {
    this.push(new Recipient(this.length, email, displayName, addressType, RecipientType.To, objectType, displayType));
  }
  /**
   * add a new Cc-Recipient to the list
   * @param email email address of the recipient
   * @param displayName display name of the recipient (optional)
   * @param addressType address type of the recipient (default SMTP)
   * @param objectType mapiObjectType of the recipient (default MAPI_MAILUSER)
   * @param displayType recipientRowDisplayType of the recipient (default MessagingUser)
   */


  addCc(email, displayName = "", addressType = 'SMTP', objectType = MapiObjectType.MAPI_MAILUSER, displayType = RecipientRowDisplayType.MessagingUser) {
    this.push(new Recipient(this.length, email, displayName, addressType, RecipientType.Cc, objectType, displayType));
  }

  addBcc(email, displayName = "", addressType = 'SMTP', objectType = MapiObjectType.MAPI_MAILUSER, displayType = RecipientRowDisplayType.MessagingUser) {
    this.push(new Recipient(this.length, email, displayName, addressType, RecipientType.Bcc, objectType, displayType));
  }

  writeToStorage(rootStorage) {
    let size = 0;

    for (let i = 0; i < this.length; i++) {
      const recipient = this[i];
      const storage = rootStorage.addStorage(PropertyTagLiterals.RecipientStoragePrefix + X8(i));
      size += recipient.writeProperties(storage);
    }

    return size;
  }

}
class Recipient extends Address {
  constructor(rowId, email, displayName, addressType, recipientType, objectType, displayType) {
    super(email, displayName, addressType);

    _defineProperty(this, "_rowId", void 0);

    _defineProperty(this, "recipientType", void 0);

    _defineProperty(this, "_displayType", void 0);

    _defineProperty(this, "_objectType", void 0);

    this._rowId = rowId;
    this.recipientType = recipientType;
    this._displayType = displayType;
    this._objectType = objectType;
  }

  writeProperties(storage) {
    const propertiesStream = new RecipientProperties();
    propertiesStream.addProperty(PropertyTags.PR_ROWID, this._rowId);
    propertiesStream.addProperty(PropertyTags.PR_ENTRYID, generateEntryId());
    propertiesStream.addProperty(PropertyTags.PR_INSTANCE_KEY, generateInstanceKey());
    propertiesStream.addProperty(PropertyTags.PR_RECIPIENT_TYPE, this.recipientType);
    propertiesStream.addProperty(PropertyTags.PR_ADDRTYPE_W, this.addressType);
    propertiesStream.addProperty(PropertyTags.PR_EMAIL_ADDRESS_W, this.email);
    propertiesStream.addProperty(PropertyTags.PR_OBJECT_TYPE, this._objectType);
    propertiesStream.addProperty(PropertyTags.PR_DISPLAY_TYPE, this._displayType);
    propertiesStream.addProperty(PropertyTags.PR_DISPLAY_NAME_W, this.displayName);
    propertiesStream.addProperty(PropertyTags.PR_SEARCH_KEY, generateSearchKey(this.addressType, this.email));
    return propertiesStream.writeProperties(storage, () => {});
  }

}

var emailAddresses = createCommonjsModule(function (module) {
// email-addresses.js - RFC 5322 email address parser
// v 3.1.0
//
// http://tools.ietf.org/html/rfc5322
//
// This library does not validate email addresses.
// emailAddresses attempts to parse addresses using the (fairly liberal)
// grammar specified in RFC 5322.
//
// email-addresses returns {
//     ast: <an abstract syntax tree based on rfc5322>,
//     addresses: [{
//            node: <node in ast for this address>,
//            name: <display-name>,
//            address: <addr-spec>,
//            local: <local-part>,
//            domain: <domain>
//         }, ...]
// }
//
// emailAddresses.parseOneAddress and emailAddresses.parseAddressList
// work as you might expect. Try it out.
//
// Many thanks to Dominic Sayers and his documentation on the is_email function,
// http://code.google.com/p/isemail/ , which helped greatly in writing this parser.
(function (global) {

  function parse5322(opts) {
    // tokenizing functions
    function inStr() {
      return pos < len;
    }

    function curTok() {
      return parseString[pos];
    }

    function getPos() {
      return pos;
    }

    function setPos(i) {
      pos = i;
    }

    function nextTok() {
      pos += 1;
    }

    function initialize() {
      pos = 0;
      len = parseString.length;
    } // parser helper functions


    function o(name, value) {
      return {
        name: name,
        tokens: value || "",
        semantic: value || "",
        children: []
      };
    }

    function wrap(name, ast) {
      var n;

      if (ast === null) {
        return null;
      }

      n = o(name);
      n.tokens = ast.tokens;
      n.semantic = ast.semantic;
      n.children.push(ast);
      return n;
    }

    function add(parent, child) {
      if (child !== null) {
        parent.tokens += child.tokens;
        parent.semantic += child.semantic;
      }

      parent.children.push(child);
      return parent;
    }

    function compareToken(fxnCompare) {
      var tok;

      if (!inStr()) {
        return null;
      }

      tok = curTok();

      if (fxnCompare(tok)) {
        nextTok();
        return o('token', tok);
      }

      return null;
    }

    function literal(lit) {
      return function literalFunc() {
        return wrap('literal', compareToken(function (tok) {
          return tok === lit;
        }));
      };
    }

    function and() {
      var args = arguments;
      return function andFunc() {
        var i, s, result, start;
        start = getPos();
        s = o('and');

        for (i = 0; i < args.length; i += 1) {
          result = args[i]();

          if (result === null) {
            setPos(start);
            return null;
          }

          add(s, result);
        }

        return s;
      };
    }

    function or() {
      var args = arguments;
      return function orFunc() {
        var i, result, start;
        start = getPos();

        for (i = 0; i < args.length; i += 1) {
          result = args[i]();

          if (result !== null) {
            return result;
          }

          setPos(start);
        }

        return null;
      };
    }

    function opt(prod) {
      return function optFunc() {
        var result, start;
        start = getPos();
        result = prod();

        if (result !== null) {
          return result;
        } else {
          setPos(start);
          return o('opt');
        }
      };
    }

    function invis(prod) {
      return function invisFunc() {
        var result = prod();

        if (result !== null) {
          result.semantic = "";
        }

        return result;
      };
    }

    function colwsp(prod) {
      return function collapseSemanticWhitespace() {
        var result = prod();

        if (result !== null && result.semantic.length > 0) {
          result.semantic = " ";
        }

        return result;
      };
    }

    function star(prod, minimum) {
      return function starFunc() {
        var s, result, count, start, min;
        start = getPos();
        s = o('star');
        count = 0;
        min = minimum === undefined ? 0 : minimum;

        while ((result = prod()) !== null) {
          count = count + 1;
          add(s, result);
        }

        if (count >= min) {
          return s;
        } else {
          setPos(start);
          return null;
        }
      };
    } // One expects names to get normalized like this:
    // "  First  Last " -> "First Last"
    // "First Last" -> "First Last"
    // "First   Last" -> "First Last"


    function collapseWhitespace(s) {
      return s.replace(/([ \t]|\r\n)+/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '');
    } // UTF-8 pseudo-production (RFC 6532)
    // RFC 6532 extends RFC 5322 productions to include UTF-8
    // using the following productions:
    // UTF8-non-ascii  =   UTF8-2 / UTF8-3 / UTF8-4
    // UTF8-2          =   <Defined in Section 4 of RFC3629>
    // UTF8-3          =   <Defined in Section 4 of RFC3629>
    // UTF8-4          =   <Defined in Section 4 of RFC3629>
    //
    // For reference, the extended RFC 5322 productions are:
    // VCHAR   =/  UTF8-non-ascii
    // ctext   =/  UTF8-non-ascii
    // atext   =/  UTF8-non-ascii
    // qtext   =/  UTF8-non-ascii
    // dtext   =/  UTF8-non-ascii


    function isUTF8NonAscii(tok) {
      // In JavaScript, we just deal directly with Unicode code points,
      // so we aren't checking individual bytes for UTF-8 encoding.
      // Just check that the character is non-ascii.
      return tok.charCodeAt(0) >= 128;
    } // common productions (RFC 5234)
    // http://tools.ietf.org/html/rfc5234
    // B.1. Core Rules
    // CR             =  %x0D
    //                         ; carriage return


    function cr() {
      return wrap('cr', literal('\r')());
    } // CRLF           =  CR LF
    //                         ; Internet standard newline


    function crlf() {
      return wrap('crlf', and(cr, lf)());
    } // DQUOTE         =  %x22
    //                         ; " (Double Quote)


    function dquote() {
      return wrap('dquote', literal('"')());
    } // HTAB           =  %x09
    //                         ; horizontal tab


    function htab() {
      return wrap('htab', literal('\t')());
    } // LF             =  %x0A
    //                         ; linefeed


    function lf() {
      return wrap('lf', literal('\n')());
    } // SP             =  %x20


    function sp() {
      return wrap('sp', literal(' ')());
    } // VCHAR          =  %x21-7E
    //                         ; visible (printing) characters


    function vchar() {
      return wrap('vchar', compareToken(function vcharFunc(tok) {
        var code = tok.charCodeAt(0);
        var accept = 0x21 <= code && code <= 0x7E;

        if (opts.rfc6532) {
          accept = accept || isUTF8NonAscii(tok);
        }

        return accept;
      }));
    } // WSP            =  SP / HTAB
    //                         ; white space


    function wsp() {
      return wrap('wsp', or(sp, htab)());
    } // email productions (RFC 5322)
    // http://tools.ietf.org/html/rfc5322
    // 3.2.1. Quoted characters
    // quoted-pair     =   ("\" (VCHAR / WSP)) / obs-qp


    function quotedPair() {
      var qp = wrap('quoted-pair', or(and(literal('\\'), or(vchar, wsp)), obsQP)());

      if (qp === null) {
        return null;
      } // a quoted pair will be two characters, and the "\" character
      // should be semantically "invisible" (RFC 5322 3.2.1)


      qp.semantic = qp.semantic[1];
      return qp;
    } // 3.2.2. Folding White Space and Comments
    // FWS             =   ([*WSP CRLF] 1*WSP) /  obs-FWS


    function fws() {
      return wrap('fws', or(obsFws, and(opt(and(star(wsp), invis(crlf))), star(wsp, 1)))());
    } // ctext           =   %d33-39 /          ; Printable US-ASCII
    //                     %d42-91 /          ;  characters not including
    //                     %d93-126 /         ;  "(", ")", or "\"
    //                     obs-ctext


    function ctext() {
      return wrap('ctext', or(function ctextFunc1() {
        return compareToken(function ctextFunc2(tok) {
          var code = tok.charCodeAt(0);
          var accept = 33 <= code && code <= 39 || 42 <= code && code <= 91 || 93 <= code && code <= 126;

          if (opts.rfc6532) {
            accept = accept || isUTF8NonAscii(tok);
          }

          return accept;
        });
      }, obsCtext)());
    } // ccontent        =   ctext / quoted-pair / comment


    function ccontent() {
      return wrap('ccontent', or(ctext, quotedPair, comment)());
    } // comment         =   "(" *([FWS] ccontent) [FWS] ")"


    function comment() {
      return wrap('comment', and(literal('('), star(and(opt(fws), ccontent)), opt(fws), literal(')'))());
    } // CFWS            =   (1*([FWS] comment) [FWS]) / FWS


    function cfws() {
      return wrap('cfws', or(and(star(and(opt(fws), comment), 1), opt(fws)), fws)());
    } // 3.2.3. Atom
    //atext           =   ALPHA / DIGIT /    ; Printable US-ASCII
    //                       "!" / "#" /        ;  characters not including
    //                       "$" / "%" /        ;  specials.  Used for atoms.
    //                       "&" / "'" /
    //                       "*" / "+" /
    //                       "-" / "/" /
    //                       "=" / "?" /
    //                       "^" / "_" /
    //                       "`" / "{" /
    //                       "|" / "}" /
    //                       "~"


    function atext() {
      return wrap('atext', compareToken(function atextFunc(tok) {
        var accept = 'a' <= tok && tok <= 'z' || 'A' <= tok && tok <= 'Z' || '0' <= tok && tok <= '9' || ['!', '#', '$', '%', '&', '\'', '*', '+', '-', '/', '=', '?', '^', '_', '`', '{', '|', '}', '~'].indexOf(tok) >= 0;

        if (opts.rfc6532) {
          accept = accept || isUTF8NonAscii(tok);
        }

        return accept;
      }));
    } // atom            =   [CFWS] 1*atext [CFWS]


    function atom() {
      return wrap('atom', and(colwsp(opt(cfws)), star(atext, 1), colwsp(opt(cfws)))());
    } // dot-atom-text   =   1*atext *("." 1*atext)


    function dotAtomText() {
      var s, maybeText;
      s = wrap('dot-atom-text', star(atext, 1)());

      if (s === null) {
        return s;
      }

      maybeText = star(and(literal('.'), star(atext, 1)))();

      if (maybeText !== null) {
        add(s, maybeText);
      }

      return s;
    } // dot-atom        =   [CFWS] dot-atom-text [CFWS]


    function dotAtom() {
      return wrap('dot-atom', and(invis(opt(cfws)), dotAtomText, invis(opt(cfws)))());
    } // 3.2.4. Quoted Strings
    //  qtext           =   %d33 /             ; Printable US-ASCII
    //                      %d35-91 /          ;  characters not including
    //                      %d93-126 /         ;  "\" or the quote character
    //                      obs-qtext


    function qtext() {
      return wrap('qtext', or(function qtextFunc1() {
        return compareToken(function qtextFunc2(tok) {
          var code = tok.charCodeAt(0);
          var accept = 33 === code || 35 <= code && code <= 91 || 93 <= code && code <= 126;

          if (opts.rfc6532) {
            accept = accept || isUTF8NonAscii(tok);
          }

          return accept;
        });
      }, obsQtext)());
    } // qcontent        =   qtext / quoted-pair


    function qcontent() {
      return wrap('qcontent', or(qtext, quotedPair)());
    } //  quoted-string   =   [CFWS]
    //                      DQUOTE *([FWS] qcontent) [FWS] DQUOTE
    //                      [CFWS]


    function quotedString() {
      return wrap('quoted-string', and(invis(opt(cfws)), invis(dquote), star(and(opt(colwsp(fws)), qcontent)), opt(invis(fws)), invis(dquote), invis(opt(cfws)))());
    } // 3.2.5 Miscellaneous Tokens
    // word            =   atom / quoted-string


    function word() {
      return wrap('word', or(atom, quotedString)());
    } // phrase          =   1*word / obs-phrase


    function phrase() {
      return wrap('phrase', or(obsPhrase, star(word, 1))());
    } // 3.4. Address Specification
    //   address         =   mailbox / group


    function address() {
      return wrap('address', or(mailbox, group)());
    } //   mailbox         =   name-addr / addr-spec


    function mailbox() {
      return wrap('mailbox', or(nameAddr, addrSpec)());
    } //   name-addr       =   [display-name] angle-addr


    function nameAddr() {
      return wrap('name-addr', and(opt(displayName), angleAddr)());
    } //   angle-addr      =   [CFWS] "<" addr-spec ">" [CFWS] /
    //                       obs-angle-addr


    function angleAddr() {
      return wrap('angle-addr', or(and(invis(opt(cfws)), literal('<'), addrSpec, literal('>'), invis(opt(cfws))), obsAngleAddr)());
    } //   group           =   display-name ":" [group-list] ";" [CFWS]


    function group() {
      return wrap('group', and(displayName, literal(':'), opt(groupList), literal(';'), invis(opt(cfws)))());
    } //   display-name    =   phrase


    function displayName() {
      return wrap('display-name', function phraseFixedSemantic() {
        var result = phrase();

        if (result !== null) {
          result.semantic = collapseWhitespace(result.semantic);
        }

        return result;
      }());
    } //   mailbox-list    =   (mailbox *("," mailbox)) / obs-mbox-list


    function mailboxList() {
      return wrap('mailbox-list', or(and(mailbox, star(and(literal(','), mailbox))), obsMboxList)());
    } //   address-list    =   (address *("," address)) / obs-addr-list


    function addressList() {
      return wrap('address-list', or(and(address, star(and(literal(','), address))), obsAddrList)());
    } //   group-list      =   mailbox-list / CFWS / obs-group-list


    function groupList() {
      return wrap('group-list', or(mailboxList, invis(cfws), obsGroupList)());
    } // 3.4.1 Addr-Spec Specification
    // local-part      =   dot-atom / quoted-string / obs-local-part


    function localPart() {
      // note: quoted-string, dotAtom are proper subsets of obs-local-part
      // so we really just have to look for obsLocalPart, if we don't care about the exact parse tree
      return wrap('local-part', or(obsLocalPart, dotAtom, quotedString)());
    } //  dtext           =   %d33-90 /          ; Printable US-ASCII
    //                      %d94-126 /         ;  characters not including
    //                      obs-dtext          ;  "[", "]", or "\"


    function dtext() {
      return wrap('dtext', or(function dtextFunc1() {
        return compareToken(function dtextFunc2(tok) {
          var code = tok.charCodeAt(0);
          var accept = 33 <= code && code <= 90 || 94 <= code && code <= 126;

          if (opts.rfc6532) {
            accept = accept || isUTF8NonAscii(tok);
          }

          return accept;
        });
      }, obsDtext)());
    } // domain-literal  =   [CFWS] "[" *([FWS] dtext) [FWS] "]" [CFWS]


    function domainLiteral() {
      return wrap('domain-literal', and(invis(opt(cfws)), literal('['), star(and(opt(fws), dtext)), opt(fws), literal(']'), invis(opt(cfws)))());
    } // domain          =   dot-atom / domain-literal / obs-domain


    function domain() {
      return wrap('domain', function domainCheckTLD() {
        var result = or(obsDomain, dotAtom, domainLiteral)();

        if (opts.rejectTLD) {
          if (result && result.semantic && result.semantic.indexOf('.') < 0) {
            return null;
          }
        } // strip all whitespace from domains


        if (result) {
          result.semantic = result.semantic.replace(/\s+/g, '');
        }

        return result;
      }());
    } // addr-spec       =   local-part "@" domain


    function addrSpec() {
      return wrap('addr-spec', and(localPart, literal('@'), domain)());
    } // 3.6.2 Originator Fields
    // Below we only parse the field body, not the name of the field
    // like "From:", "Sender:", or "Reply-To:". Other libraries that
    // parse email headers can parse those and defer to these productions
    // for the "RFC 5322" part.
    // RFC 6854 2.1. Replacement of RFC 5322, Section 3.6.2. Originator Fields
    // from = "From:" (mailbox-list / address-list) CRLF


    function fromSpec() {
      return wrap('from', or(mailboxList, addressList)());
    } // RFC 6854 2.1. Replacement of RFC 5322, Section 3.6.2. Originator Fields
    // sender = "Sender:" (mailbox / address) CRLF


    function senderSpec() {
      return wrap('sender', or(mailbox, address)());
    } // RFC 6854 2.1. Replacement of RFC 5322, Section 3.6.2. Originator Fields
    // reply-to = "Reply-To:" address-list CRLF


    function replyToSpec() {
      return wrap('reply-to', addressList());
    } // 4.1. Miscellaneous Obsolete Tokens
    //  obs-NO-WS-CTL   =   %d1-8 /            ; US-ASCII control
    //                      %d11 /             ;  characters that do not
    //                      %d12 /             ;  include the carriage
    //                      %d14-31 /          ;  return, line feed, and
    //                      %d127              ;  white space characters


    function obsNoWsCtl() {
      return opts.strict ? null : wrap('obs-NO-WS-CTL', compareToken(function (tok) {
        var code = tok.charCodeAt(0);
        return 1 <= code && code <= 8 || 11 === code || 12 === code || 14 <= code && code <= 31 || 127 === code;
      }));
    } // obs-ctext       =   obs-NO-WS-CTL


    function obsCtext() {
      return opts.strict ? null : wrap('obs-ctext', obsNoWsCtl());
    } // obs-qtext       =   obs-NO-WS-CTL


    function obsQtext() {
      return opts.strict ? null : wrap('obs-qtext', obsNoWsCtl());
    } // obs-qp          =   "\" (%d0 / obs-NO-WS-CTL / LF / CR)


    function obsQP() {
      return opts.strict ? null : wrap('obs-qp', and(literal('\\'), or(literal('\0'), obsNoWsCtl, lf, cr))());
    } // obs-phrase      =   word *(word / "." / CFWS)


    function obsPhrase() {
      if (opts.strict) return null;
      return opts.atInDisplayName ? wrap('obs-phrase', and(word, star(or(word, literal('.'), literal('@'), colwsp(cfws))))()) : wrap('obs-phrase', and(word, star(or(word, literal('.'), colwsp(cfws))))());
    } // 4.2. Obsolete Folding White Space
    // NOTE: read the errata http://www.rfc-editor.org/errata_search.php?rfc=5322&eid=1908
    // obs-FWS         =   1*([CRLF] WSP)


    function obsFws() {
      return opts.strict ? null : wrap('obs-FWS', star(and(invis(opt(crlf)), wsp), 1)());
    } // 4.4. Obsolete Addressing
    // obs-angle-addr  =   [CFWS] "<" obs-route addr-spec ">" [CFWS]


    function obsAngleAddr() {
      return opts.strict ? null : wrap('obs-angle-addr', and(invis(opt(cfws)), literal('<'), obsRoute, addrSpec, literal('>'), invis(opt(cfws)))());
    } // obs-route       =   obs-domain-list ":"


    function obsRoute() {
      return opts.strict ? null : wrap('obs-route', and(obsDomainList, literal(':'))());
    } //   obs-domain-list =   *(CFWS / ",") "@" domain
    //                       *("," [CFWS] ["@" domain])


    function obsDomainList() {
      return opts.strict ? null : wrap('obs-domain-list', and(star(or(invis(cfws), literal(','))), literal('@'), domain, star(and(literal(','), invis(opt(cfws)), opt(and(literal('@'), domain)))))());
    } // obs-mbox-list   =   *([CFWS] ",") mailbox *("," [mailbox / CFWS])


    function obsMboxList() {
      return opts.strict ? null : wrap('obs-mbox-list', and(star(and(invis(opt(cfws)), literal(','))), mailbox, star(and(literal(','), opt(and(mailbox, invis(cfws))))))());
    } // obs-addr-list   =   *([CFWS] ",") address *("," [address / CFWS])


    function obsAddrList() {
      return opts.strict ? null : wrap('obs-addr-list', and(star(and(invis(opt(cfws)), literal(','))), address, star(and(literal(','), opt(and(address, invis(cfws))))))());
    } // obs-group-list  =   1*([CFWS] ",") [CFWS]


    function obsGroupList() {
      return opts.strict ? null : wrap('obs-group-list', and(star(and(invis(opt(cfws)), literal(',')), 1), invis(opt(cfws)))());
    } // obs-local-part = word *("." word)


    function obsLocalPart() {
      return opts.strict ? null : wrap('obs-local-part', and(word, star(and(literal('.'), word)))());
    } // obs-domain       = atom *("." atom)


    function obsDomain() {
      return opts.strict ? null : wrap('obs-domain', and(atom, star(and(literal('.'), atom)))());
    } // obs-dtext       =   obs-NO-WS-CTL / quoted-pair


    function obsDtext() {
      return opts.strict ? null : wrap('obs-dtext', or(obsNoWsCtl, quotedPair)());
    } /////////////////////////////////////////////////////
    // ast analysis


    function findNode(name, root) {
      var i, stack, node;

      if (root === null || root === undefined) {
        return null;
      }

      stack = [root];

      while (stack.length > 0) {
        node = stack.pop();

        if (node.name === name) {
          return node;
        }

        for (i = node.children.length - 1; i >= 0; i -= 1) {
          stack.push(node.children[i]);
        }
      }

      return null;
    }

    function findAllNodes(name, root) {
      var i, stack, node, result;

      if (root === null || root === undefined) {
        return null;
      }

      stack = [root];
      result = [];

      while (stack.length > 0) {
        node = stack.pop();

        if (node.name === name) {
          result.push(node);
        }

        for (i = node.children.length - 1; i >= 0; i -= 1) {
          stack.push(node.children[i]);
        }
      }

      return result;
    }

    function findAllNodesNoChildren(names, root) {
      var i, stack, node, result, namesLookup;

      if (root === null || root === undefined) {
        return null;
      }

      stack = [root];
      result = [];
      namesLookup = {};

      for (i = 0; i < names.length; i += 1) {
        namesLookup[names[i]] = true;
      }

      while (stack.length > 0) {
        node = stack.pop();

        if (node.name in namesLookup) {
          result.push(node); // don't look at children (hence findAllNodesNoChildren)
        } else {
          for (i = node.children.length - 1; i >= 0; i -= 1) {
            stack.push(node.children[i]);
          }
        }
      }

      return result;
    }

    function giveResult(ast) {
      var addresses, groupsAndMailboxes, i, groupOrMailbox, result;

      if (ast === null) {
        return null;
      }

      addresses = []; // An address is a 'group' (i.e. a list of mailboxes) or a 'mailbox'.

      groupsAndMailboxes = findAllNodesNoChildren(['group', 'mailbox'], ast);

      for (i = 0; i < groupsAndMailboxes.length; i += 1) {
        groupOrMailbox = groupsAndMailboxes[i];

        if (groupOrMailbox.name === 'group') {
          addresses.push(giveResultGroup(groupOrMailbox));
        } else if (groupOrMailbox.name === 'mailbox') {
          addresses.push(giveResultMailbox(groupOrMailbox));
        }
      }

      result = {
        ast: ast,
        addresses: addresses
      };

      if (opts.simple) {
        result = simplifyResult(result);
      }

      if (opts.oneResult) {
        return oneResult(result);
      }

      if (opts.simple) {
        return result && result.addresses;
      } else {
        return result;
      }
    }

    function giveResultGroup(group) {
      var i;
      var groupName = findNode('display-name', group);
      var groupResultMailboxes = [];
      var mailboxes = findAllNodesNoChildren(['mailbox'], group);

      for (i = 0; i < mailboxes.length; i += 1) {
        groupResultMailboxes.push(giveResultMailbox(mailboxes[i]));
      }

      return {
        node: group,
        parts: {
          name: groupName
        },
        type: group.name,
        // 'group'
        name: grabSemantic(groupName),
        addresses: groupResultMailboxes
      };
    }

    function giveResultMailbox(mailbox) {
      var name = findNode('display-name', mailbox);
      var aspec = findNode('addr-spec', mailbox);
      var cfws = findAllNodes('cfws', mailbox);
      var comments = findAllNodesNoChildren(['comment'], mailbox);
      var local = findNode('local-part', aspec);
      var domain = findNode('domain', aspec);
      return {
        node: mailbox,
        parts: {
          name: name,
          address: aspec,
          local: local,
          domain: domain,
          comments: cfws
        },
        type: mailbox.name,
        // 'mailbox'
        name: grabSemantic(name),
        address: grabSemantic(aspec),
        local: grabSemantic(local),
        domain: grabSemantic(domain),
        comments: concatComments(comments),
        groupName: grabSemantic(mailbox.groupName)
      };
    }

    function grabSemantic(n) {
      return n !== null && n !== undefined ? n.semantic : null;
    }

    function simplifyResult(result) {
      var i;

      if (result && result.addresses) {
        for (i = 0; i < result.addresses.length; i += 1) {
          delete result.addresses[i].node;
        }
      }

      return result;
    }

    function concatComments(comments) {
      var result = '';

      if (comments) {
        for (var i = 0; i < comments.length; i += 1) {
          result += grabSemantic(comments[i]);
        }
      }

      return result;
    }

    function oneResult(result) {
      if (!result) {
        return null;
      }

      if (!opts.partial && result.addresses.length > 1) {
        return null;
      }

      return result.addresses && result.addresses[0];
    } /////////////////////////////////////////////////////


    var parseString, pos, len, parsed, startProduction;
    opts = handleOpts(opts, {});

    if (opts === null) {
      return null;
    }

    parseString = opts.input;
    startProduction = {
      'address': address,
      'address-list': addressList,
      'angle-addr': angleAddr,
      'from': fromSpec,
      'group': group,
      'mailbox': mailbox,
      'mailbox-list': mailboxList,
      'reply-to': replyToSpec,
      'sender': senderSpec
    }[opts.startAt] || addressList;

    if (!opts.strict) {
      initialize();
      opts.strict = true;
      parsed = startProduction(parseString);

      if (opts.partial || !inStr()) {
        return giveResult(parsed);
      }

      opts.strict = false;
    }

    initialize();
    parsed = startProduction(parseString);

    if (!opts.partial && inStr()) {
      return null;
    }

    return giveResult(parsed);
  }

  function parseOneAddressSimple(opts) {
    return parse5322(handleOpts(opts, {
      oneResult: true,
      rfc6532: true,
      simple: true,
      startAt: 'address-list'
    }));
  }

  function parseAddressListSimple(opts) {
    return parse5322(handleOpts(opts, {
      rfc6532: true,
      simple: true,
      startAt: 'address-list'
    }));
  }

  function parseFromSimple(opts) {
    return parse5322(handleOpts(opts, {
      rfc6532: true,
      simple: true,
      startAt: 'from'
    }));
  }

  function parseSenderSimple(opts) {
    return parse5322(handleOpts(opts, {
      oneResult: true,
      rfc6532: true,
      simple: true,
      startAt: 'sender'
    }));
  }

  function parseReplyToSimple(opts) {
    return parse5322(handleOpts(opts, {
      rfc6532: true,
      simple: true,
      startAt: 'reply-to'
    }));
  }

  function handleOpts(opts, defs) {
    function isString(str) {
      return Object.prototype.toString.call(str) === '[object String]';
    }

    function isObject(o) {
      return o === Object(o);
    }

    function isNullUndef(o) {
      return o === null || o === undefined;
    }

    var defaults, o;

    if (isString(opts)) {
      opts = {
        input: opts
      };
    } else if (!isObject(opts)) {
      return null;
    }

    if (!isString(opts.input)) {
      return null;
    }

    if (!defs) {
      return null;
    }

    defaults = {
      oneResult: false,
      partial: false,
      rejectTLD: false,
      rfc6532: false,
      simple: false,
      startAt: 'address-list',
      strict: false,
      atInDisplayName: false
    };

    for (o in defaults) {
      if (isNullUndef(opts[o])) {
        opts[o] = !isNullUndef(defs[o]) ? defs[o] : defaults[o];
      }
    }

    return opts;
  }

  parse5322.parseOneAddress = parseOneAddressSimple;
  parse5322.parseAddressList = parseAddressListSimple;
  parse5322.parseFrom = parseFromSimple;
  parse5322.parseSender = parseSenderSimple;
  parse5322.parseReplyTo = parseReplyToSimple;

  {
    module.exports = parse5322;
  }
})();
});

var addressRfc2822 = createCommonjsModule(function (module, exports) {



exports.parse = function parse(line, startAt) {
  if (!line) throw new Error('Nothing to parse');
  line = line.trim();
  const addr = emailAddresses({
    input: line,
    rfc6532: true,
    // unicode
    partial: false,
    // return failed parses
    simple: false,
    // simple AST
    strict: false,
    // turn off obs- features in the rfc
    rejectTLD: false,
    // domains require a "."
    startAt: startAt || null,
    atInDisplayName: true // allow at in display name

  });
  if (!addr) throw new Error('No results'); // console.log("Parsed to: ", require('util').inspect(addr, {depth: 10, colors: true}));

  return addr.addresses.map(map_addresses);
};

function map_addresses(adr) {
  if (adr.type === 'group') {
    return new Group(adr.name, adr.addresses.map(map_addresses));
  }

  let comments;

  if (adr.parts.comments) {
    comments = adr.parts.comments.map(function (c) {
      return c.tokens.trim();
    }).join(' ').trim(); // if (comments.length) {
    //     comments = '(' + comments + ')';
    // }
  }

  let l = adr.local;
  if (!adr.name && /:/.test(l)) l = `"${l}"`;
  return new Address(adr.name, `${l}@${adr.domain}`, comments);
}

exports.parseFrom = function (line) {
  return exports.parse(line, 'from');
};

exports.parseSender = function (line) {
  return exports.parse(line, 'sender');
};

exports.parseReplyTo = function (line) {
  return exports.parse(line, 'reply-to');
};

class Group {
  constructor(display_name, addresses) {
    this.phrase = display_name;
    this.addresses = addresses;
  }

  format() {
    return `${this.phrase}:${this.addresses.map(function (a) {
      return a.format();
    }).join(',')}`;
  }

  name() {
    let phrase = this.phrase;
    if (!(phrase && phrase.length)) phrase = this.comment;

    const name = _extract_name(phrase);

    return name;
  }

}

class Address {
  constructor(phrase, address, comment) {
    this.phrase = phrase || '';
    this.address = address || '';
    this.comment = comment || '';
  }

  host() {
    const match = /.*@(.*)$/.exec(this.address);
    if (!match) return null;
    return match[1];
  }

  user() {
    const match = /^(.*)@/.exec(this.address);
    if (!match) return null;
    return match[1];
  }

  format() {
    const phrase = this.phrase;
    const email = this.address;
    let comment = this.comment;
    const addr = [];
    const atext = new RegExp('^[\\-\\w !#$%&\'*+/=?^`{|}~]+$');

    if (phrase && phrase.length) {
      addr.push(atext.test(phrase.trim()) ? phrase : _quote_no_esc(phrase) ? phrase : `"${phrase}"`);

      if (email && email.length) {
        addr.push(`<${email}>`);
      }
    } else if (email && email.length) {
      addr.push(email);
    }

    if (comment && /\S/.test(comment)) {
      comment = comment.replace(/^\s*\(?/, '(').replace(/\)?\s*$/, ')');
    }

    if (comment && comment.length) {
      addr.push(comment);
    }

    return addr.join(' ');
  }

  name() {
    let phrase = this.phrase;
    const addr = this.address;

    if (!(phrase && phrase.length)) {
      phrase = this.comment;
    }

    let name = _extract_name(phrase); // first.last@domain address


    if (name === '') {
      const match = /([^%.@_]+([._][^%.@_]+)+)[@%]/.exec(addr);

      if (match) {
        name = match[1].replace(/[._]+/g, ' ');
        name = _extract_name(name);
      }
    }

    if (name === '' && /\/g=/i.test(addr)) {
      // X400 style address
      let match = /\/g=([^/]*)/i.exec(addr);
      const f = match[1];
      match = /\/s=([^/]*)/i.exec(addr);
      const l = match[1];
      name = _extract_name(`${f} ${l}`);
    }

    return name;
  }

}

exports.Address = Address; // This is because JS regexps have no equivalent of
// zero-width negative look-behind assertion for: /(?<!\\)"/

function _quote_no_esc(str) {
  if (/^"/.test(str)) return true;
  let match;

  while (match = /^[\s\S]*?([\s\S])"/.exec(str)) {
    if (match[1] !== '\\') return true;
    str = str.substr(match[0].length);
  }

  return false;
}

exports.isAllLower = function (string) {
  return string === string.toLowerCase();
};

exports.isAllUpper = function (string) {
  return string === string.toUpperCase();
};

exports.nameCase = function (string) {
  return string.toLowerCase().replace(/\b(\w+)/g, function (_, d1) {
    // Set the case of the name to first char upper rest lower
    return d1.charAt(0).toUpperCase() + d1.slice(1);
  }).replace(/\bMc(\w)/gi, function (_, d1) {
    // Scottish names such as 'McLeod'
    return `Mc${d1.toUpperCase()}`;
  }).replace(/\bo'(\w)/gi, function (_, d1) {
    // Irish names such as 'O'Malley, O'Reilly'
    return `O'${d1.toUpperCase()}`;
  }).replace(/\b(x*(ix)?v*(iv)?i*)\b/ig, function (_, d1) {
    // Roman numerals, eg 'Level III Support'
    return d1.toUpperCase();
  });
}; // given a comment, attempt to extract a person's name


function _extract_name(name) {
  // Using encodings, too hard. See Mail::Message::Field::Full.
  if (/=?.*?\?=/.test(name)) return ''; // trim whitespace

  name = name.trim();
  name = name.replace(/\s+/, ' '); // Disregard numeric names (e.g. 123456.1234@compuserve.com)

  if (/^[\d ]+$/.test(name)) return '';
  name = name.replace(/^\((.*)\)$/, '$1') // remove outermost parenthesis
  .replace(/^"(.*)"$/, '$1') // remove outer quotation marks
  .replace(/\(.*?\)/g, '') // remove minimal embedded comments
  .replace(/\\/g, '') // remove all escapes
  .replace(/^"(.*)"$/, '$1') // remove internal quotation marks
  .replace(/^([^\s]+) ?, ?(.*)$/, '$2 $1') // reverse "Last, First M." if applicable
  .replace(/,.*/, ''); // Change casing only when the name contains only upper or only
  // lower cased characters.

  if (exports.isAllUpper(name) || exports.isAllLower(name)) {
    // console.log("Changing case of: " + name);
    name = exports.nameCase(name); // console.log("Now: " + name);
  } // some cleanup


  name = name.replace(/\[[^\]]*\]/g, '').replace(/(^[\s'"]+|[\s'"]+$)/g, '').replace(/\s{2,}/g, ' ');
  return name;
}
});

/* eslint-disable node/no-deprecated-api */



var Buffer$1 = buffer.Buffer;
var safer = {};
var key;

for (key in buffer) {
  if (!buffer.hasOwnProperty(key)) continue;
  if (key === 'SlowBuffer' || key === 'Buffer') continue;
  safer[key] = buffer[key];
}

var Safer = safer.Buffer = {};

for (key in Buffer$1) {
  if (!Buffer$1.hasOwnProperty(key)) continue;
  if (key === 'allocUnsafe' || key === 'allocUnsafeSlow') continue;
  Safer[key] = Buffer$1[key];
}

safer.Buffer.prototype = Buffer$1.prototype;

if (!Safer.from || Safer.from === Uint8Array.from) {
  Safer.from = function (value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value);
    }

    if (value && typeof value.length === 'undefined') {
      throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value);
    }

    return Buffer$1(value, encodingOrOffset, length);
  };
}

if (!Safer.alloc) {
  Safer.alloc = function (size, fill, encoding) {
    if (typeof size !== 'number') {
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size);
    }

    if (size < 0 || size >= 2 * (1 << 30)) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }

    var buf = Buffer$1(size);

    if (!fill || fill.length === 0) {
      buf.fill(0);
    } else if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }

    return buf;
  };
}

if (!safer.kStringMaxLength) {
  try {
    safer.kStringMaxLength = process.binding('buffer').kStringMaxLength;
  } catch (e) {// we can't determine kStringMaxLength in environments where process.binding
    // is unsupported, so let's not set it
  }
}

if (!safer.constants) {
  safer.constants = {
    MAX_LENGTH: safer.kMaxLength
  };

  if (safer.kStringMaxLength) {
    safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength;
  }
}

var safer_1 = safer;

var BOMChar = '\uFEFF';
var PrependBOM = PrependBOMWrapper;

function PrependBOMWrapper(encoder, options) {
  this.encoder = encoder;
  this.addBOM = true;
}

PrependBOMWrapper.prototype.write = function (str) {
  if (this.addBOM) {
    str = BOMChar + str;
    this.addBOM = false;
  }

  return this.encoder.write(str);
};

PrependBOMWrapper.prototype.end = function () {
  return this.encoder.end();
}; //------------------------------------------------------------------------------


var StripBOM = StripBOMWrapper;

function StripBOMWrapper(decoder, options) {
  this.decoder = decoder;
  this.pass = false;
  this.options = options || {};
}

StripBOMWrapper.prototype.write = function (buf) {
  var res = this.decoder.write(buf);
  if (this.pass || !res) return res;

  if (res[0] === BOMChar) {
    res = res.slice(1);
    if (typeof this.options.stripBOM === 'function') this.options.stripBOM();
  }

  this.pass = true;
  return res;
};

StripBOMWrapper.prototype.end = function () {
  return this.decoder.end();
};

var bomHandling = {
	PrependBOM: PrependBOM,
	StripBOM: StripBOM
};

var Buffer$2 = safer_1.Buffer; // Export Node.js internal encodings.


var internal = {
  // Encodings
  utf8: {
    type: "_internal",
    bomAware: true
  },
  cesu8: {
    type: "_internal",
    bomAware: true
  },
  unicode11utf8: "utf8",
  ucs2: {
    type: "_internal",
    bomAware: true
  },
  utf16le: "ucs2",
  binary: {
    type: "_internal"
  },
  base64: {
    type: "_internal"
  },
  hex: {
    type: "_internal"
  },
  // Codec.
  _internal: InternalCodec
}; //------------------------------------------------------------------------------

function InternalCodec(codecOptions, iconv) {
  this.enc = codecOptions.encodingName;
  this.bomAware = codecOptions.bomAware;
  if (this.enc === "base64") this.encoder = InternalEncoderBase64;else if (this.enc === "cesu8") {
    this.enc = "utf8"; // Use utf8 for decoding.

    this.encoder = InternalEncoderCesu8; // Add decoder for versions of Node not supporting CESU-8

    if (Buffer$2.from('eda0bdedb2a9', 'hex').toString() !== '💩') {
      this.decoder = InternalDecoderCesu8;
      this.defaultCharUnicode = iconv.defaultCharUnicode;
    }
  }
}

InternalCodec.prototype.encoder = InternalEncoder;
InternalCodec.prototype.decoder = InternalDecoder; //------------------------------------------------------------------------------
// We use node.js internal decoder. Its signature is the same as ours.

var StringDecoder = require$$1$1.StringDecoder;

if (!StringDecoder.prototype.end) // Node v0.8 doesn't have this method.
  StringDecoder.prototype.end = function () {};

function InternalDecoder(options, codec) {
  this.decoder = new StringDecoder(codec.enc);
}

InternalDecoder.prototype.write = function (buf) {
  if (!Buffer$2.isBuffer(buf)) {
    buf = Buffer$2.from(buf);
  }

  return this.decoder.write(buf);
};

InternalDecoder.prototype.end = function () {
  return this.decoder.end();
}; //------------------------------------------------------------------------------
// Encoder is mostly trivial


function InternalEncoder(options, codec) {
  this.enc = codec.enc;
}

InternalEncoder.prototype.write = function (str) {
  return Buffer$2.from(str, this.enc);
};

InternalEncoder.prototype.end = function () {}; //------------------------------------------------------------------------------
// Except base64 encoder, which must keep its state.


function InternalEncoderBase64(options, codec) {
  this.prevStr = '';
}

InternalEncoderBase64.prototype.write = function (str) {
  str = this.prevStr + str;
  var completeQuads = str.length - str.length % 4;
  this.prevStr = str.slice(completeQuads);
  str = str.slice(0, completeQuads);
  return Buffer$2.from(str, "base64");
};

InternalEncoderBase64.prototype.end = function () {
  return Buffer$2.from(this.prevStr, "base64");
}; //------------------------------------------------------------------------------
// CESU-8 encoder is also special.


function InternalEncoderCesu8(options, codec) {}

InternalEncoderCesu8.prototype.write = function (str) {
  var buf = Buffer$2.alloc(str.length * 3),
      bufIdx = 0;

  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i); // Naive implementation, but it works because CESU-8 is especially easy
    // to convert from UTF-16 (which all JS strings are encoded in).

    if (charCode < 0x80) buf[bufIdx++] = charCode;else if (charCode < 0x800) {
      buf[bufIdx++] = 0xC0 + (charCode >>> 6);
      buf[bufIdx++] = 0x80 + (charCode & 0x3f);
    } else {
      // charCode will always be < 0x10000 in javascript.
      buf[bufIdx++] = 0xE0 + (charCode >>> 12);
      buf[bufIdx++] = 0x80 + (charCode >>> 6 & 0x3f);
      buf[bufIdx++] = 0x80 + (charCode & 0x3f);
    }
  }

  return buf.slice(0, bufIdx);
};

InternalEncoderCesu8.prototype.end = function () {}; //------------------------------------------------------------------------------
// CESU-8 decoder is not implemented in Node v4.0+


function InternalDecoderCesu8(options, codec) {
  this.acc = 0;
  this.contBytes = 0;
  this.accBytes = 0;
  this.defaultCharUnicode = codec.defaultCharUnicode;
}

InternalDecoderCesu8.prototype.write = function (buf) {
  var acc = this.acc,
      contBytes = this.contBytes,
      accBytes = this.accBytes,
      res = '';

  for (var i = 0; i < buf.length; i++) {
    var curByte = buf[i];

    if ((curByte & 0xC0) !== 0x80) {
      // Leading byte
      if (contBytes > 0) {
        // Previous code is invalid
        res += this.defaultCharUnicode;
        contBytes = 0;
      }

      if (curByte < 0x80) {
        // Single-byte code
        res += String.fromCharCode(curByte);
      } else if (curByte < 0xE0) {
        // Two-byte code
        acc = curByte & 0x1F;
        contBytes = 1;
        accBytes = 1;
      } else if (curByte < 0xF0) {
        // Three-byte code
        acc = curByte & 0x0F;
        contBytes = 2;
        accBytes = 1;
      } else {
        // Four or more are not supported for CESU-8.
        res += this.defaultCharUnicode;
      }
    } else {
      // Continuation byte
      if (contBytes > 0) {
        // We're waiting for it.
        acc = acc << 6 | curByte & 0x3f;
        contBytes--;
        accBytes++;

        if (contBytes === 0) {
          // Check for overlong encoding, but support Modified UTF-8 (encoding NULL as C0 80)
          if (accBytes === 2 && acc < 0x80 && acc > 0) res += this.defaultCharUnicode;else if (accBytes === 3 && acc < 0x800) res += this.defaultCharUnicode;else // Actually add character.
            res += String.fromCharCode(acc);
        }
      } else {
        // Unexpected continuation byte
        res += this.defaultCharUnicode;
      }
    }
  }

  this.acc = acc;
  this.contBytes = contBytes;
  this.accBytes = accBytes;
  return res;
};

InternalDecoderCesu8.prototype.end = function () {
  var res = 0;
  if (this.contBytes > 0) res += this.defaultCharUnicode;
  return res;
};

var Buffer$3 = safer_1.Buffer; // == UTF32-LE/BE codec. ==========================================================


var _utf32 = Utf32Codec;

function Utf32Codec(codecOptions, iconv) {
  this.iconv = iconv;
  this.bomAware = true;
  this.isLE = codecOptions.isLE;
}

var utf32le = {
  type: '_utf32',
  isLE: true
};
var utf32be = {
  type: '_utf32',
  isLE: false
}; // Aliases

var ucs4le = 'utf32le';
var ucs4be = 'utf32be';
Utf32Codec.prototype.encoder = Utf32Encoder;
Utf32Codec.prototype.decoder = Utf32Decoder; // -- Encoding

function Utf32Encoder(options, codec) {
  this.isLE = codec.isLE;
  this.highSurrogate = 0;
}

Utf32Encoder.prototype.write = function (str) {
  var src = Buffer$3.from(str, 'ucs2');
  var dst = Buffer$3.alloc(src.length * 2);
  var write32 = this.isLE ? dst.writeUInt32LE : dst.writeUInt32BE;
  var offset = 0;

  for (var i = 0; i < src.length; i += 2) {
    var code = src.readUInt16LE(i);
    var isHighSurrogate = 0xD800 <= code && code < 0xDC00;
    var isLowSurrogate = 0xDC00 <= code && code < 0xE000;

    if (this.highSurrogate) {
      if (isHighSurrogate || !isLowSurrogate) {
        // There shouldn't be two high surrogates in a row, nor a high surrogate which isn't followed by a low
        // surrogate. If this happens, keep the pending high surrogate as a stand-alone semi-invalid character
        // (technically wrong, but expected by some applications, like Windows file names).
        write32.call(dst, this.highSurrogate, offset);
        offset += 4;
      } else {
        // Create 32-bit value from high and low surrogates;
        var codepoint = (this.highSurrogate - 0xD800 << 10 | code - 0xDC00) + 0x10000;
        write32.call(dst, codepoint, offset);
        offset += 4;
        this.highSurrogate = 0;
        continue;
      }
    }

    if (isHighSurrogate) this.highSurrogate = code;else {
      // Even if the current character is a low surrogate, with no previous high surrogate, we'll
      // encode it as a semi-invalid stand-alone character for the same reasons expressed above for
      // unpaired high surrogates.
      write32.call(dst, code, offset);
      offset += 4;
      this.highSurrogate = 0;
    }
  }

  if (offset < dst.length) dst = dst.slice(0, offset);
  return dst;
};

Utf32Encoder.prototype.end = function () {
  // Treat any leftover high surrogate as a semi-valid independent character.
  if (!this.highSurrogate) return;
  var buf = Buffer$3.alloc(4);
  if (this.isLE) buf.writeUInt32LE(this.highSurrogate, 0);else buf.writeUInt32BE(this.highSurrogate, 0);
  this.highSurrogate = 0;
  return buf;
}; // -- Decoding


function Utf32Decoder(options, codec) {
  this.isLE = codec.isLE;
  this.badChar = codec.iconv.defaultCharUnicode.charCodeAt(0);
  this.overflow = [];
}

Utf32Decoder.prototype.write = function (src) {
  if (src.length === 0) return '';
  var i = 0;
  var codepoint = 0;
  var dst = Buffer$3.alloc(src.length + 4);
  var offset = 0;
  var isLE = this.isLE;
  var overflow = this.overflow;
  var badChar = this.badChar;

  if (overflow.length > 0) {
    for (; i < src.length && overflow.length < 4; i++) overflow.push(src[i]);

    if (overflow.length === 4) {
      // NOTE: codepoint is a signed int32 and can be negative.
      // NOTE: We copied this block from below to help V8 optimize it (it works with array, not buffer).
      if (isLE) {
        codepoint = overflow[i] | overflow[i + 1] << 8 | overflow[i + 2] << 16 | overflow[i + 3] << 24;
      } else {
        codepoint = overflow[i + 3] | overflow[i + 2] << 8 | overflow[i + 1] << 16 | overflow[i] << 24;
      }

      overflow.length = 0;
      offset = _writeCodepoint(dst, offset, codepoint, badChar);
    }
  } // Main loop. Should be as optimized as possible.


  for (; i < src.length - 3; i += 4) {
    // NOTE: codepoint is a signed int32 and can be negative.
    if (isLE) {
      codepoint = src[i] | src[i + 1] << 8 | src[i + 2] << 16 | src[i + 3] << 24;
    } else {
      codepoint = src[i + 3] | src[i + 2] << 8 | src[i + 1] << 16 | src[i] << 24;
    }

    offset = _writeCodepoint(dst, offset, codepoint, badChar);
  } // Keep overflowing bytes.


  for (; i < src.length; i++) {
    overflow.push(src[i]);
  }

  return dst.slice(0, offset).toString('ucs2');
};

function _writeCodepoint(dst, offset, codepoint, badChar) {
  // NOTE: codepoint is signed int32 and can be negative. We keep it that way to help V8 with optimizations.
  if (codepoint < 0 || codepoint > 0x10FFFF) {
    // Not a valid Unicode codepoint
    codepoint = badChar;
  } // Ephemeral Planes: Write high surrogate.


  if (codepoint >= 0x10000) {
    codepoint -= 0x10000;
    var high = 0xD800 | codepoint >> 10;
    dst[offset++] = high & 0xff;
    dst[offset++] = high >> 8; // Low surrogate is written below.

    var codepoint = 0xDC00 | codepoint & 0x3FF;
  } // Write BMP char or low surrogate.


  dst[offset++] = codepoint & 0xff;
  dst[offset++] = codepoint >> 8;
  return offset;
}

Utf32Decoder.prototype.end = function () {
  this.overflow.length = 0;
}; // == UTF-32 Auto codec =============================================================
// Decoder chooses automatically from UTF-32LE and UTF-32BE using BOM and space-based heuristic.
// Defaults to UTF-32LE. http://en.wikipedia.org/wiki/UTF-32
// Encoder/decoder default can be changed: iconv.decode(buf, 'utf32', {defaultEncoding: 'utf-32be'});
// Encoder prepends BOM (which can be overridden with (addBOM: false}).


var utf32_1 = Utf32AutoCodec;
var ucs4 = 'utf32';

function Utf32AutoCodec(options, iconv) {
  this.iconv = iconv;
}

Utf32AutoCodec.prototype.encoder = Utf32AutoEncoder;
Utf32AutoCodec.prototype.decoder = Utf32AutoDecoder; // -- Encoding

function Utf32AutoEncoder(options, codec) {
  options = options || {};
  if (options.addBOM === undefined) options.addBOM = true;
  this.encoder = codec.iconv.getEncoder(options.defaultEncoding || 'utf-32le', options);
}

Utf32AutoEncoder.prototype.write = function (str) {
  return this.encoder.write(str);
};

Utf32AutoEncoder.prototype.end = function () {
  return this.encoder.end();
}; // -- Decoding


function Utf32AutoDecoder(options, codec) {
  this.decoder = null;
  this.initialBufs = [];
  this.initialBufsLen = 0;
  this.options = options || {};
  this.iconv = codec.iconv;
}

Utf32AutoDecoder.prototype.write = function (buf) {
  if (!this.decoder) {
    // Codec is not chosen yet. Accumulate initial bytes.
    this.initialBufs.push(buf);
    this.initialBufsLen += buf.length;
    if (this.initialBufsLen < 32) // We need more bytes to use space heuristic (see below)
      return ''; // We have enough bytes -> detect endianness.

    var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
    this.decoder = this.iconv.getDecoder(encoding, this.options);
    var resStr = '';

    for (var i = 0; i < this.initialBufs.length; i++) resStr += this.decoder.write(this.initialBufs[i]);

    this.initialBufs.length = this.initialBufsLen = 0;
    return resStr;
  }

  return this.decoder.write(buf);
};

Utf32AutoDecoder.prototype.end = function () {
  if (!this.decoder) {
    var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
    this.decoder = this.iconv.getDecoder(encoding, this.options);
    var resStr = '';

    for (var i = 0; i < this.initialBufs.length; i++) resStr += this.decoder.write(this.initialBufs[i]);

    var trail = this.decoder.end();
    if (trail) resStr += trail;
    this.initialBufs.length = this.initialBufsLen = 0;
    return resStr;
  }

  return this.decoder.end();
};

function detectEncoding(bufs, defaultEncoding) {
  var b = [];
  var charsProcessed = 0;
  var invalidLE = 0,
      invalidBE = 0; // Number of invalid chars when decoded as LE or BE.

  var bmpCharsLE = 0,
      bmpCharsBE = 0; // Number of BMP chars when decoded as LE or BE.

  outer_loop: for (var i = 0; i < bufs.length; i++) {
    var buf = bufs[i];

    for (var j = 0; j < buf.length; j++) {
      b.push(buf[j]);

      if (b.length === 4) {
        if (charsProcessed === 0) {
          // Check BOM first.
          if (b[0] === 0xFF && b[1] === 0xFE && b[2] === 0 && b[3] === 0) {
            return 'utf-32le';
          }

          if (b[0] === 0 && b[1] === 0 && b[2] === 0xFE && b[3] === 0xFF) {
            return 'utf-32be';
          }
        }

        if (b[0] !== 0 || b[1] > 0x10) invalidBE++;
        if (b[3] !== 0 || b[2] > 0x10) invalidLE++;
        if (b[0] === 0 && b[1] === 0 && (b[2] !== 0 || b[3] !== 0)) bmpCharsBE++;
        if ((b[0] !== 0 || b[1] !== 0) && b[2] === 0 && b[3] === 0) bmpCharsLE++;
        b.length = 0;
        charsProcessed++;

        if (charsProcessed >= 100) {
          break outer_loop;
        }
      }
    }
  } // Make decisions.


  if (bmpCharsBE - invalidBE > bmpCharsLE - invalidLE) return 'utf-32be';
  if (bmpCharsBE - invalidBE < bmpCharsLE - invalidLE) return 'utf-32le'; // Couldn't decide (likely all zeros or not enough data).

  return defaultEncoding || 'utf-32le';
}

var utf32 = {
	_utf32: _utf32,
	utf32le: utf32le,
	utf32be: utf32be,
	ucs4le: ucs4le,
	ucs4be: ucs4be,
	utf32: utf32_1,
	ucs4: ucs4
};

var Buffer$4 = safer_1.Buffer; // Note: UTF16-LE (or UCS2) codec is Node.js native. See encodings/internal.js
// == UTF16-BE codec. ==========================================================


var utf16be = Utf16BECodec;

function Utf16BECodec() {}

Utf16BECodec.prototype.encoder = Utf16BEEncoder;
Utf16BECodec.prototype.decoder = Utf16BEDecoder;
Utf16BECodec.prototype.bomAware = true; // -- Encoding

function Utf16BEEncoder() {}

Utf16BEEncoder.prototype.write = function (str) {
  var buf = Buffer$4.from(str, 'ucs2');

  for (var i = 0; i < buf.length; i += 2) {
    var tmp = buf[i];
    buf[i] = buf[i + 1];
    buf[i + 1] = tmp;
  }

  return buf;
};

Utf16BEEncoder.prototype.end = function () {}; // -- Decoding


function Utf16BEDecoder() {
  this.overflowByte = -1;
}

Utf16BEDecoder.prototype.write = function (buf) {
  if (buf.length == 0) return '';
  var buf2 = Buffer$4.alloc(buf.length + 1),
      i = 0,
      j = 0;

  if (this.overflowByte !== -1) {
    buf2[0] = buf[0];
    buf2[1] = this.overflowByte;
    i = 1;
    j = 2;
  }

  for (; i < buf.length - 1; i += 2, j += 2) {
    buf2[j] = buf[i + 1];
    buf2[j + 1] = buf[i];
  }

  this.overflowByte = i == buf.length - 1 ? buf[buf.length - 1] : -1;
  return buf2.slice(0, j).toString('ucs2');
};

Utf16BEDecoder.prototype.end = function () {
  this.overflowByte = -1;
}; // == UTF-16 codec =============================================================
// Decoder chooses automatically from UTF-16LE and UTF-16BE using BOM and space-based heuristic.
// Defaults to UTF-16LE, as it's prevalent and default in Node.
// http://en.wikipedia.org/wiki/UTF-16 and http://encoding.spec.whatwg.org/#utf-16le
// Decoder default can be changed: iconv.decode(buf, 'utf16', {defaultEncoding: 'utf-16be'});
// Encoder uses UTF-16LE and prepends BOM (which can be overridden with addBOM: false).


var utf16_1 = Utf16Codec;

function Utf16Codec(codecOptions, iconv) {
  this.iconv = iconv;
}

Utf16Codec.prototype.encoder = Utf16Encoder;
Utf16Codec.prototype.decoder = Utf16Decoder; // -- Encoding (pass-through)

function Utf16Encoder(options, codec) {
  options = options || {};
  if (options.addBOM === undefined) options.addBOM = true;
  this.encoder = codec.iconv.getEncoder('utf-16le', options);
}

Utf16Encoder.prototype.write = function (str) {
  return this.encoder.write(str);
};

Utf16Encoder.prototype.end = function () {
  return this.encoder.end();
}; // -- Decoding


function Utf16Decoder(options, codec) {
  this.decoder = null;
  this.initialBufs = [];
  this.initialBufsLen = 0;
  this.options = options || {};
  this.iconv = codec.iconv;
}

Utf16Decoder.prototype.write = function (buf) {
  if (!this.decoder) {
    // Codec is not chosen yet. Accumulate initial bytes.
    this.initialBufs.push(buf);
    this.initialBufsLen += buf.length;
    if (this.initialBufsLen < 16) // We need more bytes to use space heuristic (see below)
      return ''; // We have enough bytes -> detect endianness.

    var encoding = detectEncoding$1(this.initialBufs, this.options.defaultEncoding);
    this.decoder = this.iconv.getDecoder(encoding, this.options);
    var resStr = '';

    for (var i = 0; i < this.initialBufs.length; i++) resStr += this.decoder.write(this.initialBufs[i]);

    this.initialBufs.length = this.initialBufsLen = 0;
    return resStr;
  }

  return this.decoder.write(buf);
};

Utf16Decoder.prototype.end = function () {
  if (!this.decoder) {
    var encoding = detectEncoding$1(this.initialBufs, this.options.defaultEncoding);
    this.decoder = this.iconv.getDecoder(encoding, this.options);
    var resStr = '';

    for (var i = 0; i < this.initialBufs.length; i++) resStr += this.decoder.write(this.initialBufs[i]);

    var trail = this.decoder.end();
    if (trail) resStr += trail;
    this.initialBufs.length = this.initialBufsLen = 0;
    return resStr;
  }

  return this.decoder.end();
};

function detectEncoding$1(bufs, defaultEncoding) {
  var b = [];
  var charsProcessed = 0;
  var asciiCharsLE = 0,
      asciiCharsBE = 0; // Number of ASCII chars when decoded as LE or BE.

  outer_loop: for (var i = 0; i < bufs.length; i++) {
    var buf = bufs[i];

    for (var j = 0; j < buf.length; j++) {
      b.push(buf[j]);

      if (b.length === 2) {
        if (charsProcessed === 0) {
          // Check BOM first.
          if (b[0] === 0xFF && b[1] === 0xFE) return 'utf-16le';
          if (b[0] === 0xFE && b[1] === 0xFF) return 'utf-16be';
        }

        if (b[0] === 0 && b[1] !== 0) asciiCharsBE++;
        if (b[0] !== 0 && b[1] === 0) asciiCharsLE++;
        b.length = 0;
        charsProcessed++;

        if (charsProcessed >= 100) {
          break outer_loop;
        }
      }
    }
  } // Make decisions.
  // Most of the time, the content has ASCII chars (U+00**), but the opposite (U+**00) is uncommon.
  // So, we count ASCII as if it was LE or BE, and decide from that.


  if (asciiCharsBE > asciiCharsLE) return 'utf-16be';
  if (asciiCharsBE < asciiCharsLE) return 'utf-16le'; // Couldn't decide (likely all zeros or not enough data).

  return defaultEncoding || 'utf-16le';
}

var utf16 = {
	utf16be: utf16be,
	utf16: utf16_1
};

var Buffer$5 = safer_1.Buffer; // UTF-7 codec, according to https://tools.ietf.org/html/rfc2152
// See also below a UTF-7-IMAP codec, according to http://tools.ietf.org/html/rfc3501#section-5.1.3


var utf7_1 = Utf7Codec;
var unicode11utf7 = 'utf7'; // Alias UNICODE-1-1-UTF-7

function Utf7Codec(codecOptions, iconv) {
  this.iconv = iconv;
}
Utf7Codec.prototype.encoder = Utf7Encoder;
Utf7Codec.prototype.decoder = Utf7Decoder;
Utf7Codec.prototype.bomAware = true; // -- Encoding

var nonDirectChars = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;

function Utf7Encoder(options, codec) {
  this.iconv = codec.iconv;
}

Utf7Encoder.prototype.write = function (str) {
  // Naive implementation.
  // Non-direct chars are encoded as "+<base64>-"; single "+" char is encoded as "+-".
  return Buffer$5.from(str.replace(nonDirectChars, function (chunk) {
    return "+" + (chunk === '+' ? '' : this.iconv.encode(chunk, 'utf16-be').toString('base64').replace(/=+$/, '')) + "-";
  }.bind(this)));
};

Utf7Encoder.prototype.end = function () {}; // -- Decoding


function Utf7Decoder(options, codec) {
  this.iconv = codec.iconv;
  this.inBase64 = false;
  this.base64Accum = '';
}

var base64Regex = /[A-Za-z0-9\/+]/;
var base64Chars = [];

for (var i = 0; i < 256; i++) base64Chars[i] = base64Regex.test(String.fromCharCode(i));

var plusChar = '+'.charCodeAt(0),
    minusChar = '-'.charCodeAt(0),
    andChar = '&'.charCodeAt(0);

Utf7Decoder.prototype.write = function (buf) {
  var res = "",
      lastI = 0,
      inBase64 = this.inBase64,
      base64Accum = this.base64Accum; // The decoder is more involved as we must handle chunks in stream.

  for (var i = 0; i < buf.length; i++) {
    if (!inBase64) {
      // We're in direct mode.
      // Write direct chars until '+'
      if (buf[i] == plusChar) {
        res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.

        lastI = i + 1;
        inBase64 = true;
      }
    } else {
      // We decode base64.
      if (!base64Chars[buf[i]]) {
        // Base64 ended.
        if (i == lastI && buf[i] == minusChar) {
          // "+-" -> "+"
          res += "+";
        } else {
          var b64str = base64Accum + this.iconv.decode(buf.slice(lastI, i), "ascii");
          res += this.iconv.decode(Buffer$5.from(b64str, 'base64'), "utf16-be");
        }

        if (buf[i] != minusChar) // Minus is absorbed after base64.
          i--;
        lastI = i + 1;
        inBase64 = false;
        base64Accum = '';
      }
    }
  }

  if (!inBase64) {
    res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
  } else {
    var b64str = base64Accum + this.iconv.decode(buf.slice(lastI), "ascii");
    var canBeDecoded = b64str.length - b64str.length % 8; // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.

    base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.

    b64str = b64str.slice(0, canBeDecoded);
    res += this.iconv.decode(Buffer$5.from(b64str, 'base64'), "utf16-be");
  }

  this.inBase64 = inBase64;
  this.base64Accum = base64Accum;
  return res;
};

Utf7Decoder.prototype.end = function () {
  var res = "";
  if (this.inBase64 && this.base64Accum.length > 0) res = this.iconv.decode(Buffer$5.from(this.base64Accum, 'base64'), "utf16-be");
  this.inBase64 = false;
  this.base64Accum = '';
  return res;
}; // UTF-7-IMAP codec.
// RFC3501 Sec. 5.1.3 Modified UTF-7 (http://tools.ietf.org/html/rfc3501#section-5.1.3)
// Differences:
//  * Base64 part is started by "&" instead of "+"
//  * Direct characters are 0x20-0x7E, except "&" (0x26)
//  * In Base64, "," is used instead of "/"
//  * Base64 must not be used to represent direct characters.
//  * No implicit shift back from Base64 (should always end with '-')
//  * String must end in non-shifted position.
//  * "-&" while in base64 is not allowed.


var utf7imap = Utf7IMAPCodec;

function Utf7IMAPCodec(codecOptions, iconv) {
  this.iconv = iconv;
}
Utf7IMAPCodec.prototype.encoder = Utf7IMAPEncoder;
Utf7IMAPCodec.prototype.decoder = Utf7IMAPDecoder;
Utf7IMAPCodec.prototype.bomAware = true; // -- Encoding

function Utf7IMAPEncoder(options, codec) {
  this.iconv = codec.iconv;
  this.inBase64 = false;
  this.base64Accum = Buffer$5.alloc(6);
  this.base64AccumIdx = 0;
}

Utf7IMAPEncoder.prototype.write = function (str) {
  var inBase64 = this.inBase64,
      base64Accum = this.base64Accum,
      base64AccumIdx = this.base64AccumIdx,
      buf = Buffer$5.alloc(str.length * 5 + 10),
      bufIdx = 0;

  for (var i = 0; i < str.length; i++) {
    var uChar = str.charCodeAt(i);

    if (0x20 <= uChar && uChar <= 0x7E) {
      // Direct character or '&'.
      if (inBase64) {
        if (base64AccumIdx > 0) {
          bufIdx += buf.write(base64Accum.slice(0, base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
          base64AccumIdx = 0;
        }

        buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.

        inBase64 = false;
      }

      if (!inBase64) {
        buf[bufIdx++] = uChar; // Write direct character

        if (uChar === andChar) // Ampersand -> '&-'
          buf[bufIdx++] = minusChar;
      }
    } else {
      // Non-direct character
      if (!inBase64) {
        buf[bufIdx++] = andChar; // Write '&', then go to base64 mode.

        inBase64 = true;
      }

      if (inBase64) {
        base64Accum[base64AccumIdx++] = uChar >> 8;
        base64Accum[base64AccumIdx++] = uChar & 0xFF;

        if (base64AccumIdx == base64Accum.length) {
          bufIdx += buf.write(base64Accum.toString('base64').replace(/\//g, ','), bufIdx);
          base64AccumIdx = 0;
        }
      }
    }
  }

  this.inBase64 = inBase64;
  this.base64AccumIdx = base64AccumIdx;
  return buf.slice(0, bufIdx);
};

Utf7IMAPEncoder.prototype.end = function () {
  var buf = Buffer$5.alloc(10),
      bufIdx = 0;

  if (this.inBase64) {
    if (this.base64AccumIdx > 0) {
      bufIdx += buf.write(this.base64Accum.slice(0, this.base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
      this.base64AccumIdx = 0;
    }

    buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.

    this.inBase64 = false;
  }

  return buf.slice(0, bufIdx);
}; // -- Decoding


function Utf7IMAPDecoder(options, codec) {
  this.iconv = codec.iconv;
  this.inBase64 = false;
  this.base64Accum = '';
}

var base64IMAPChars = base64Chars.slice();
base64IMAPChars[','.charCodeAt(0)] = true;

Utf7IMAPDecoder.prototype.write = function (buf) {
  var res = "",
      lastI = 0,
      inBase64 = this.inBase64,
      base64Accum = this.base64Accum; // The decoder is more involved as we must handle chunks in stream.
  // It is forgiving, closer to standard UTF-7 (for example, '-' is optional at the end).

  for (var i = 0; i < buf.length; i++) {
    if (!inBase64) {
      // We're in direct mode.
      // Write direct chars until '&'
      if (buf[i] == andChar) {
        res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.

        lastI = i + 1;
        inBase64 = true;
      }
    } else {
      // We decode base64.
      if (!base64IMAPChars[buf[i]]) {
        // Base64 ended.
        if (i == lastI && buf[i] == minusChar) {
          // "&-" -> "&"
          res += "&";
        } else {
          var b64str = base64Accum + this.iconv.decode(buf.slice(lastI, i), "ascii").replace(/,/g, '/');
          res += this.iconv.decode(Buffer$5.from(b64str, 'base64'), "utf16-be");
        }

        if (buf[i] != minusChar) // Minus may be absorbed after base64.
          i--;
        lastI = i + 1;
        inBase64 = false;
        base64Accum = '';
      }
    }
  }

  if (!inBase64) {
    res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
  } else {
    var b64str = base64Accum + this.iconv.decode(buf.slice(lastI), "ascii").replace(/,/g, '/');
    var canBeDecoded = b64str.length - b64str.length % 8; // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.

    base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.

    b64str = b64str.slice(0, canBeDecoded);
    res += this.iconv.decode(Buffer$5.from(b64str, 'base64'), "utf16-be");
  }

  this.inBase64 = inBase64;
  this.base64Accum = base64Accum;
  return res;
};

Utf7IMAPDecoder.prototype.end = function () {
  var res = "";
  if (this.inBase64 && this.base64Accum.length > 0) res = this.iconv.decode(Buffer$5.from(this.base64Accum, 'base64'), "utf16-be");
  this.inBase64 = false;
  this.base64Accum = '';
  return res;
};

var utf7 = {
	utf7: utf7_1,
	unicode11utf7: unicode11utf7,
	utf7imap: utf7imap
};

var Buffer$6 = safer_1.Buffer; // Single-byte codec. Needs a 'chars' string parameter that contains 256 or 128 chars that
// correspond to encoded bytes (if 128 - then lower half is ASCII). 


var _sbcs = SBCSCodec;

function SBCSCodec(codecOptions, iconv) {
  if (!codecOptions) throw new Error("SBCS codec is called without the data."); // Prepare char buffer for decoding.

  if (!codecOptions.chars || codecOptions.chars.length !== 128 && codecOptions.chars.length !== 256) throw new Error("Encoding '" + codecOptions.type + "' has incorrect 'chars' (must be of len 128 or 256)");

  if (codecOptions.chars.length === 128) {
    var asciiString = "";

    for (var i = 0; i < 128; i++) asciiString += String.fromCharCode(i);

    codecOptions.chars = asciiString + codecOptions.chars;
  }

  this.decodeBuf = Buffer$6.from(codecOptions.chars, 'ucs2'); // Encoding buffer.

  var encodeBuf = Buffer$6.alloc(65536, iconv.defaultCharSingleByte.charCodeAt(0));

  for (var i = 0; i < codecOptions.chars.length; i++) encodeBuf[codecOptions.chars.charCodeAt(i)] = i;

  this.encodeBuf = encodeBuf;
}

SBCSCodec.prototype.encoder = SBCSEncoder;
SBCSCodec.prototype.decoder = SBCSDecoder;

function SBCSEncoder(options, codec) {
  this.encodeBuf = codec.encodeBuf;
}

SBCSEncoder.prototype.write = function (str) {
  var buf = Buffer$6.alloc(str.length);

  for (var i = 0; i < str.length; i++) buf[i] = this.encodeBuf[str.charCodeAt(i)];

  return buf;
};

SBCSEncoder.prototype.end = function () {};

function SBCSDecoder(options, codec) {
  this.decodeBuf = codec.decodeBuf;
}

SBCSDecoder.prototype.write = function (buf) {
  // Strings are immutable in JS -> we use ucs2 buffer to speed up computations.
  var decodeBuf = this.decodeBuf;
  var newBuf = Buffer$6.alloc(buf.length * 2);
  var idx1 = 0,
      idx2 = 0;

  for (var i = 0; i < buf.length; i++) {
    idx1 = buf[i] * 2;
    idx2 = i * 2;
    newBuf[idx2] = decodeBuf[idx1];
    newBuf[idx2 + 1] = decodeBuf[idx1 + 1];
  }

  return newBuf.toString('ucs2');
};

SBCSDecoder.prototype.end = function () {};

var sbcsCodec = {
	_sbcs: _sbcs
};

var sbcsData = {
  // Not supported by iconv, not sure why.
  "10029": "maccenteuro",
  "maccenteuro": {
    "type": "_sbcs",
    "chars": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
  },
  "808": "cp808",
  "ibm808": "cp808",
  "cp808": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
  },
  "mik": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "cp720": {
    "type": "_sbcs",
    "chars": "\x80\x81éâ\x84à\x86çêëèïî\x8d\x8e\x8f\x90\u0651\u0652ô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡\u064b\u064c\u064d\u064e\u064f\u0650≈°∙·√ⁿ²■\u00a0"
  },
  // Aliases of generated encodings.
  "ascii8bit": "ascii",
  "usascii": "ascii",
  "ansix34": "ascii",
  "ansix341968": "ascii",
  "ansix341986": "ascii",
  "csascii": "ascii",
  "cp367": "ascii",
  "ibm367": "ascii",
  "isoir6": "ascii",
  "iso646us": "ascii",
  "iso646irv": "ascii",
  "us": "ascii",
  "latin1": "iso88591",
  "latin2": "iso88592",
  "latin3": "iso88593",
  "latin4": "iso88594",
  "latin5": "iso88599",
  "latin6": "iso885910",
  "latin7": "iso885913",
  "latin8": "iso885914",
  "latin9": "iso885915",
  "latin10": "iso885916",
  "csisolatin1": "iso88591",
  "csisolatin2": "iso88592",
  "csisolatin3": "iso88593",
  "csisolatin4": "iso88594",
  "csisolatincyrillic": "iso88595",
  "csisolatinarabic": "iso88596",
  "csisolatingreek": "iso88597",
  "csisolatinhebrew": "iso88598",
  "csisolatin5": "iso88599",
  "csisolatin6": "iso885910",
  "l1": "iso88591",
  "l2": "iso88592",
  "l3": "iso88593",
  "l4": "iso88594",
  "l5": "iso88599",
  "l6": "iso885910",
  "l7": "iso885913",
  "l8": "iso885914",
  "l9": "iso885915",
  "l10": "iso885916",
  "isoir14": "iso646jp",
  "isoir57": "iso646cn",
  "isoir100": "iso88591",
  "isoir101": "iso88592",
  "isoir109": "iso88593",
  "isoir110": "iso88594",
  "isoir144": "iso88595",
  "isoir127": "iso88596",
  "isoir126": "iso88597",
  "isoir138": "iso88598",
  "isoir148": "iso88599",
  "isoir157": "iso885910",
  "isoir166": "tis620",
  "isoir179": "iso885913",
  "isoir199": "iso885914",
  "isoir203": "iso885915",
  "isoir226": "iso885916",
  "cp819": "iso88591",
  "ibm819": "iso88591",
  "cyrillic": "iso88595",
  "arabic": "iso88596",
  "arabic8": "iso88596",
  "ecma114": "iso88596",
  "asmo708": "iso88596",
  "greek": "iso88597",
  "greek8": "iso88597",
  "ecma118": "iso88597",
  "elot928": "iso88597",
  "hebrew": "iso88598",
  "hebrew8": "iso88598",
  "turkish": "iso88599",
  "turkish8": "iso88599",
  "thai": "iso885911",
  "thai8": "iso885911",
  "celtic": "iso885914",
  "celtic8": "iso885914",
  "isoceltic": "iso885914",
  "tis6200": "tis620",
  "tis62025291": "tis620",
  "tis62025330": "tis620",
  "10000": "macroman",
  "10006": "macgreek",
  "10007": "maccyrillic",
  "10079": "maciceland",
  "10081": "macturkish",
  "cspc8codepage437": "cp437",
  "cspc775baltic": "cp775",
  "cspc850multilingual": "cp850",
  "cspcp852": "cp852",
  "cspc862latinhebrew": "cp862",
  "cpgr": "cp869",
  "msee": "cp1250",
  "mscyrl": "cp1251",
  "msansi": "cp1252",
  "msgreek": "cp1253",
  "msturk": "cp1254",
  "mshebr": "cp1255",
  "msarab": "cp1256",
  "winbaltrim": "cp1257",
  "cp20866": "koi8r",
  "20866": "koi8r",
  "ibm878": "koi8r",
  "cskoi8r": "koi8r",
  "cp21866": "koi8u",
  "21866": "koi8u",
  "ibm1168": "koi8u",
  "strk10482002": "rk1048",
  "tcvn5712": "tcvn",
  "tcvn57121": "tcvn",
  "gb198880": "iso646cn",
  "cn": "iso646cn",
  "csiso14jisc6220ro": "iso646jp",
  "jisc62201969ro": "iso646jp",
  "jp": "iso646jp",
  "cshproman8": "hproman8",
  "r8": "hproman8",
  "roman8": "hproman8",
  "xroman8": "hproman8",
  "ibm1051": "hproman8",
  "mac": "macintosh",
  "csmacintosh": "macintosh"
};

var sbcsDataGenerated = {
  "437": "cp437",
  "737": "cp737",
  "775": "cp775",
  "850": "cp850",
  "852": "cp852",
  "855": "cp855",
  "856": "cp856",
  "857": "cp857",
  "858": "cp858",
  "860": "cp860",
  "861": "cp861",
  "862": "cp862",
  "863": "cp863",
  "864": "cp864",
  "865": "cp865",
  "866": "cp866",
  "869": "cp869",
  "874": "windows874",
  "922": "cp922",
  "1046": "cp1046",
  "1124": "cp1124",
  "1125": "cp1125",
  "1129": "cp1129",
  "1133": "cp1133",
  "1161": "cp1161",
  "1162": "cp1162",
  "1163": "cp1163",
  "1250": "windows1250",
  "1251": "windows1251",
  "1252": "windows1252",
  "1253": "windows1253",
  "1254": "windows1254",
  "1255": "windows1255",
  "1256": "windows1256",
  "1257": "windows1257",
  "1258": "windows1258",
  "28591": "iso88591",
  "28592": "iso88592",
  "28593": "iso88593",
  "28594": "iso88594",
  "28595": "iso88595",
  "28596": "iso88596",
  "28597": "iso88597",
  "28598": "iso88598",
  "28599": "iso88599",
  "28600": "iso885910",
  "28601": "iso885911",
  "28603": "iso885913",
  "28604": "iso885914",
  "28605": "iso885915",
  "28606": "iso885916",
  "windows874": {
    "type": "_sbcs",
    "chars": "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "win874": "windows874",
  "cp874": "windows874",
  "windows1250": {
    "type": "_sbcs",
    "chars": "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
  },
  "win1250": "windows1250",
  "cp1250": "windows1250",
  "windows1251": {
    "type": "_sbcs",
    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "win1251": "windows1251",
  "cp1251": "windows1251",
  "windows1252": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "win1252": "windows1252",
  "cp1252": "windows1252",
  "windows1253": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
  },
  "win1253": "windows1253",
  "cp1253": "windows1253",
  "windows1254": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
  },
  "win1254": "windows1254",
  "cp1254": "windows1254",
  "windows1255": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
  },
  "win1255": "windows1255",
  "cp1255": "windows1255",
  "windows1256": {
    "type": "_sbcs",
    "chars": "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
  },
  "win1256": "windows1256",
  "cp1256": "windows1256",
  "windows1257": {
    "type": "_sbcs",
    "chars": "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
  },
  "win1257": "windows1257",
  "cp1257": "windows1257",
  "windows1258": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "win1258": "windows1258",
  "cp1258": "windows1258",
  "iso88591": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "cp28591": "iso88591",
  "iso88592": {
    "type": "_sbcs",
    "chars": " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
  },
  "cp28592": "iso88592",
  "iso88593": {
    "type": "_sbcs",
    "chars": " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
  },
  "cp28593": "iso88593",
  "iso88594": {
    "type": "_sbcs",
    "chars": " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
  },
  "cp28594": "iso88594",
  "iso88595": {
    "type": "_sbcs",
    "chars": " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
  },
  "cp28595": "iso88595",
  "iso88596": {
    "type": "_sbcs",
    "chars": " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
  },
  "cp28596": "iso88596",
  "iso88597": {
    "type": "_sbcs",
    "chars": " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
  },
  "cp28597": "iso88597",
  "iso88598": {
    "type": "_sbcs",
    "chars": " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
  },
  "cp28598": "iso88598",
  "iso88599": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
  },
  "cp28599": "iso88599",
  "iso885910": {
    "type": "_sbcs",
    "chars": " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
  },
  "cp28600": "iso885910",
  "iso885911": {
    "type": "_sbcs",
    "chars": " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "cp28601": "iso885911",
  "iso885913": {
    "type": "_sbcs",
    "chars": " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
  },
  "cp28603": "iso885913",
  "iso885914": {
    "type": "_sbcs",
    "chars": " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
  },
  "cp28604": "iso885914",
  "iso885915": {
    "type": "_sbcs",
    "chars": " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "cp28605": "iso885915",
  "iso885916": {
    "type": "_sbcs",
    "chars": " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
  },
  "cp28606": "iso885916",
  "cp437": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm437": "cp437",
  "csibm437": "cp437",
  "cp737": {
    "type": "_sbcs",
    "chars": "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
  },
  "ibm737": "cp737",
  "csibm737": "cp737",
  "cp775": {
    "type": "_sbcs",
    "chars": "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
  },
  "ibm775": "cp775",
  "csibm775": "cp775",
  "cp850": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm850": "cp850",
  "csibm850": "cp850",
  "cp852": {
    "type": "_sbcs",
    "chars": "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
  },
  "ibm852": "cp852",
  "csibm852": "cp852",
  "cp855": {
    "type": "_sbcs",
    "chars": "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
  },
  "ibm855": "cp855",
  "csibm855": "cp855",
  "cp856": {
    "type": "_sbcs",
    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm856": "cp856",
  "csibm856": "cp856",
  "cp857": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
  },
  "ibm857": "cp857",
  "csibm857": "cp857",
  "cp858": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm858": "cp858",
  "csibm858": "cp858",
  "cp860": {
    "type": "_sbcs",
    "chars": "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm860": "cp860",
  "csibm860": "cp860",
  "cp861": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm861": "cp861",
  "csibm861": "cp861",
  "cp862": {
    "type": "_sbcs",
    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm862": "cp862",
  "csibm862": "cp862",
  "cp863": {
    "type": "_sbcs",
    "chars": "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm863": "cp863",
  "csibm863": "cp863",
  "cp864": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�"
  },
  "ibm864": "cp864",
  "csibm864": "cp864",
  "cp865": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm865": "cp865",
  "csibm865": "cp865",
  "cp866": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
  },
  "ibm866": "cp866",
  "csibm866": "cp866",
  "cp869": {
    "type": "_sbcs",
    "chars": "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
  },
  "ibm869": "cp869",
  "csibm869": "cp869",
  "cp922": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
  },
  "ibm922": "cp922",
  "csibm922": "cp922",
  "cp1046": {
    "type": "_sbcs",
    "chars": "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
  },
  "ibm1046": "cp1046",
  "csibm1046": "cp1046",
  "cp1124": {
    "type": "_sbcs",
    "chars": " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
  },
  "ibm1124": "cp1124",
  "csibm1124": "cp1124",
  "cp1125": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
  },
  "ibm1125": "cp1125",
  "csibm1125": "cp1125",
  "cp1129": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "ibm1129": "cp1129",
  "csibm1129": "cp1129",
  "cp1133": {
    "type": "_sbcs",
    "chars": " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
  },
  "ibm1133": "cp1133",
  "csibm1133": "cp1133",
  "cp1161": {
    "type": "_sbcs",
    "chars": "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
  },
  "ibm1161": "cp1161",
  "csibm1161": "cp1161",
  "cp1162": {
    "type": "_sbcs",
    "chars": "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "ibm1162": "cp1162",
  "csibm1162": "cp1162",
  "cp1163": {
    "type": "_sbcs",
    "chars": " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "ibm1163": "cp1163",
  "csibm1163": "cp1163",
  "maccroatian": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
  },
  "maccyrillic": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
  },
  "macgreek": {
    "type": "_sbcs",
    "chars": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
  },
  "maciceland": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macroman": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macromania": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macthai": {
    "type": "_sbcs",
    "chars": "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู﻿​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
  },
  "macturkish": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macukraine": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
  },
  "koi8r": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8u": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8ru": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8t": {
    "type": "_sbcs",
    "chars": "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "armscii8": {
    "type": "_sbcs",
    "chars": " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
  },
  "rk1048": {
    "type": "_sbcs",
    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "tcvn": {
    "type": "_sbcs",
    "chars": "\u0000ÚỤ\u0003ỪỬỮ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010ỨỰỲỶỸÝỴ\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ"
  },
  "georgianacademy": {
    "type": "_sbcs",
    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "georgianps": {
    "type": "_sbcs",
    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "pt154": {
    "type": "_sbcs",
    "chars": "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "viscii": {
    "type": "_sbcs",
    "chars": "\u0000\u0001Ẳ\u0003\u0004ẴẪ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013Ỷ\u0015\u0016\u0017\u0018Ỹ\u001a\u001b\u001c\u001dỴ\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ"
  },
  "iso646cn": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
  },
  "iso646jp": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
  },
  "hproman8": {
    "type": "_sbcs",
    "chars": " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
  },
  "macintosh": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "ascii": {
    "type": "_sbcs",
    "chars": "��������������������������������������������������������������������������������������������������������������������������������"
  },
  "tis620": {
    "type": "_sbcs",
    "chars": "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  }
};

var Buffer$7 = safer_1.Buffer; // Multibyte codec. In this scheme, a character is represented by 1 or more bytes.
// Our codec supports UTF-16 surrogates, extensions for GB18030 and unicode sequences.
// To save memory and loading time, we read table files only when requested.


var _dbcs = DBCSCodec;
var UNASSIGNED = -1,
    GB18030_CODE = -2,
    SEQ_START = -10,
    NODE_START = -1000,
    UNASSIGNED_NODE = new Array(0x100),
    DEF_CHAR = -1;

for (var i$1 = 0; i$1 < 0x100; i$1++) UNASSIGNED_NODE[i$1] = UNASSIGNED; // Class DBCSCodec reads and initializes mapping tables.


function DBCSCodec(codecOptions, iconv) {
  this.encodingName = codecOptions.encodingName;
  if (!codecOptions) throw new Error("DBCS codec is called without the data.");
  if (!codecOptions.table) throw new Error("Encoding '" + this.encodingName + "' has no data."); // Load tables.

  var mappingTable = codecOptions.table(); // Decode tables: MBCS -> Unicode.
  // decodeTables is a trie, encoded as an array of arrays of integers. Internal arrays are trie nodes and all have len = 256.
  // Trie root is decodeTables[0].
  // Values: >=  0 -> unicode character code. can be > 0xFFFF
  //         == UNASSIGNED -> unknown/unassigned sequence.
  //         == GB18030_CODE -> this is the end of a GB18030 4-byte sequence.
  //         <= NODE_START -> index of the next node in our trie to process next byte.
  //         <= SEQ_START  -> index of the start of a character code sequence, in decodeTableSeq.

  this.decodeTables = [];
  this.decodeTables[0] = UNASSIGNED_NODE.slice(0); // Create root node.
  // Sometimes a MBCS char corresponds to a sequence of unicode chars. We store them as arrays of integers here. 

  this.decodeTableSeq = []; // Actual mapping tables consist of chunks. Use them to fill up decode tables.

  for (var i = 0; i < mappingTable.length; i++) this._addDecodeChunk(mappingTable[i]); // Load & create GB18030 tables when needed.


  if (typeof codecOptions.gb18030 === 'function') {
    this.gb18030 = codecOptions.gb18030(); // Load GB18030 ranges.
    // Add GB18030 common decode nodes.

    var commonThirdByteNodeIdx = this.decodeTables.length;
    this.decodeTables.push(UNASSIGNED_NODE.slice(0));
    var commonFourthByteNodeIdx = this.decodeTables.length;
    this.decodeTables.push(UNASSIGNED_NODE.slice(0)); // Fill out the tree

    var firstByteNode = this.decodeTables[0];

    for (var i = 0x81; i <= 0xFE; i++) {
      var secondByteNode = this.decodeTables[NODE_START - firstByteNode[i]];

      for (var j = 0x30; j <= 0x39; j++) {
        if (secondByteNode[j] === UNASSIGNED) {
          secondByteNode[j] = NODE_START - commonThirdByteNodeIdx;
        } else if (secondByteNode[j] > NODE_START) {
          throw new Error("gb18030 decode tables conflict at byte 2");
        }

        var thirdByteNode = this.decodeTables[NODE_START - secondByteNode[j]];

        for (var k = 0x81; k <= 0xFE; k++) {
          if (thirdByteNode[k] === UNASSIGNED) {
            thirdByteNode[k] = NODE_START - commonFourthByteNodeIdx;
          } else if (thirdByteNode[k] === NODE_START - commonFourthByteNodeIdx) {
            continue;
          } else if (thirdByteNode[k] > NODE_START) {
            throw new Error("gb18030 decode tables conflict at byte 3");
          }

          var fourthByteNode = this.decodeTables[NODE_START - thirdByteNode[k]];

          for (var l = 0x30; l <= 0x39; l++) {
            if (fourthByteNode[l] === UNASSIGNED) fourthByteNode[l] = GB18030_CODE;
          }
        }
      }
    }
  }

  this.defaultCharUnicode = iconv.defaultCharUnicode; // Encode tables: Unicode -> DBCS.
  // `encodeTable` is array mapping from unicode char to encoded char. All its values are integers for performance.
  // Because it can be sparse, it is represented as array of buckets by 256 chars each. Bucket can be null.
  // Values: >=  0 -> it is a normal char. Write the value (if <=256 then 1 byte, if <=65536 then 2 bytes, etc.).
  //         == UNASSIGNED -> no conversion found. Output a default char.
  //         <= SEQ_START  -> it's an index in encodeTableSeq, see below. The character starts a sequence.

  this.encodeTable = []; // `encodeTableSeq` is used when a sequence of unicode characters is encoded as a single code. We use a tree of
  // objects where keys correspond to characters in sequence and leafs are the encoded dbcs values. A special DEF_CHAR key
  // means end of sequence (needed when one sequence is a strict subsequence of another).
  // Objects are kept separately from encodeTable to increase performance.

  this.encodeTableSeq = []; // Some chars can be decoded, but need not be encoded.

  var skipEncodeChars = {};
  if (codecOptions.encodeSkipVals) for (var i = 0; i < codecOptions.encodeSkipVals.length; i++) {
    var val = codecOptions.encodeSkipVals[i];
    if (typeof val === 'number') skipEncodeChars[val] = true;else for (var j = val.from; j <= val.to; j++) skipEncodeChars[j] = true;
  } // Use decode trie to recursively fill out encode tables.

  this._fillEncodeTable(0, 0, skipEncodeChars); // Add more encoding pairs when needed.


  if (codecOptions.encodeAdd) {
    for (var uChar in codecOptions.encodeAdd) if (Object.prototype.hasOwnProperty.call(codecOptions.encodeAdd, uChar)) this._setEncodeChar(uChar.charCodeAt(0), codecOptions.encodeAdd[uChar]);
  }

  this.defCharSB = this.encodeTable[0][iconv.defaultCharSingleByte.charCodeAt(0)];
  if (this.defCharSB === UNASSIGNED) this.defCharSB = this.encodeTable[0]['?'];
  if (this.defCharSB === UNASSIGNED) this.defCharSB = "?".charCodeAt(0);
}

DBCSCodec.prototype.encoder = DBCSEncoder;
DBCSCodec.prototype.decoder = DBCSDecoder; // Decoder helpers

DBCSCodec.prototype._getDecodeTrieNode = function (addr) {
  var bytes = [];

  for (; addr > 0; addr >>>= 8) bytes.push(addr & 0xFF);

  if (bytes.length == 0) bytes.push(0);
  var node = this.decodeTables[0];

  for (var i = bytes.length - 1; i > 0; i--) {
    // Traverse nodes deeper into the trie.
    var val = node[bytes[i]];

    if (val == UNASSIGNED) {
      // Create new node.
      node[bytes[i]] = NODE_START - this.decodeTables.length;
      this.decodeTables.push(node = UNASSIGNED_NODE.slice(0));
    } else if (val <= NODE_START) {
      // Existing node.
      node = this.decodeTables[NODE_START - val];
    } else throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + addr.toString(16));
  }

  return node;
};

DBCSCodec.prototype._addDecodeChunk = function (chunk) {
  // First element of chunk is the hex mbcs code where we start.
  var curAddr = parseInt(chunk[0], 16); // Choose the decoding node where we'll write our chars.

  var writeTable = this._getDecodeTrieNode(curAddr);

  curAddr = curAddr & 0xFF; // Write all other elements of the chunk to the table.

  for (var k = 1; k < chunk.length; k++) {
    var part = chunk[k];

    if (typeof part === "string") {
      // String, write as-is.
      for (var l = 0; l < part.length;) {
        var code = part.charCodeAt(l++);

        if (0xD800 <= code && code < 0xDC00) {
          // Decode surrogate
          var codeTrail = part.charCodeAt(l++);
          if (0xDC00 <= codeTrail && codeTrail < 0xE000) writeTable[curAddr++] = 0x10000 + (code - 0xD800) * 0x400 + (codeTrail - 0xDC00);else throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + chunk[0]);
        } else if (0x0FF0 < code && code <= 0x0FFF) {
          // Character sequence (our own encoding used)
          var len = 0xFFF - code + 2;
          var seq = [];

          for (var m = 0; m < len; m++) seq.push(part.charCodeAt(l++)); // Simple variation: don't support surrogates or subsequences in seq.


          writeTable[curAddr++] = SEQ_START - this.decodeTableSeq.length;
          this.decodeTableSeq.push(seq);
        } else writeTable[curAddr++] = code; // Basic char

      }
    } else if (typeof part === "number") {
      // Integer, meaning increasing sequence starting with prev character.
      var charCode = writeTable[curAddr - 1] + 1;

      for (var l = 0; l < part; l++) writeTable[curAddr++] = charCode++;
    } else throw new Error("Incorrect type '" + typeof part + "' given in " + this.encodingName + " at chunk " + chunk[0]);
  }

  if (curAddr > 0xFF) throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + chunk[0] + ": too long" + curAddr);
}; // Encoder helpers


DBCSCodec.prototype._getEncodeBucket = function (uCode) {
  var high = uCode >> 8; // This could be > 0xFF because of astral characters.

  if (this.encodeTable[high] === undefined) this.encodeTable[high] = UNASSIGNED_NODE.slice(0); // Create bucket on demand.

  return this.encodeTable[high];
};

DBCSCodec.prototype._setEncodeChar = function (uCode, dbcsCode) {
  var bucket = this._getEncodeBucket(uCode);

  var low = uCode & 0xFF;
  if (bucket[low] <= SEQ_START) this.encodeTableSeq[SEQ_START - bucket[low]][DEF_CHAR] = dbcsCode; // There's already a sequence, set a single-char subsequence of it.
  else if (bucket[low] == UNASSIGNED) bucket[low] = dbcsCode;
};

DBCSCodec.prototype._setEncodeSequence = function (seq, dbcsCode) {
  // Get the root of character tree according to first character of the sequence.
  var uCode = seq[0];

  var bucket = this._getEncodeBucket(uCode);

  var low = uCode & 0xFF;
  var node;

  if (bucket[low] <= SEQ_START) {
    // There's already a sequence with  - use it.
    node = this.encodeTableSeq[SEQ_START - bucket[low]];
  } else {
    // There was no sequence object - allocate a new one.
    node = {};
    if (bucket[low] !== UNASSIGNED) node[DEF_CHAR] = bucket[low]; // If a char was set before - make it a single-char subsequence.

    bucket[low] = SEQ_START - this.encodeTableSeq.length;
    this.encodeTableSeq.push(node);
  } // Traverse the character tree, allocating new nodes as needed.


  for (var j = 1; j < seq.length - 1; j++) {
    var oldVal = node[uCode];
    if (typeof oldVal === 'object') node = oldVal;else {
      node = node[uCode] = {};
      if (oldVal !== undefined) node[DEF_CHAR] = oldVal;
    }
  } // Set the leaf to given dbcsCode.


  uCode = seq[seq.length - 1];
  node[uCode] = dbcsCode;
};

DBCSCodec.prototype._fillEncodeTable = function (nodeIdx, prefix, skipEncodeChars) {
  var node = this.decodeTables[nodeIdx];
  var hasValues = false;
  var subNodeEmpty = {};

  for (var i = 0; i < 0x100; i++) {
    var uCode = node[i];
    var mbCode = prefix + i;
    if (skipEncodeChars[mbCode]) continue;

    if (uCode >= 0) {
      this._setEncodeChar(uCode, mbCode);

      hasValues = true;
    } else if (uCode <= NODE_START) {
      var subNodeIdx = NODE_START - uCode;

      if (!subNodeEmpty[subNodeIdx]) {
        // Skip empty subtrees (they are too large in gb18030).
        var newPrefix = mbCode << 8 >>> 0; // NOTE: '>>> 0' keeps 32-bit num positive.

        if (this._fillEncodeTable(subNodeIdx, newPrefix, skipEncodeChars)) hasValues = true;else subNodeEmpty[subNodeIdx] = true;
      }
    } else if (uCode <= SEQ_START) {
      this._setEncodeSequence(this.decodeTableSeq[SEQ_START - uCode], mbCode);

      hasValues = true;
    }
  }

  return hasValues;
}; // == Encoder ==================================================================


function DBCSEncoder(options, codec) {
  // Encoder state
  this.leadSurrogate = -1;
  this.seqObj = undefined; // Static data

  this.encodeTable = codec.encodeTable;
  this.encodeTableSeq = codec.encodeTableSeq;
  this.defaultCharSingleByte = codec.defCharSB;
  this.gb18030 = codec.gb18030;
}

DBCSEncoder.prototype.write = function (str) {
  var newBuf = Buffer$7.alloc(str.length * (this.gb18030 ? 4 : 3)),
      leadSurrogate = this.leadSurrogate,
      seqObj = this.seqObj,
      nextChar = -1,
      i = 0,
      j = 0;

  while (true) {
    // 0. Get next character.
    if (nextChar === -1) {
      if (i == str.length) break;
      var uCode = str.charCodeAt(i++);
    } else {
      var uCode = nextChar;
      nextChar = -1;
    } // 1. Handle surrogates.


    if (0xD800 <= uCode && uCode < 0xE000) {
      // Char is one of surrogates.
      if (uCode < 0xDC00) {
        // We've got lead surrogate.
        if (leadSurrogate === -1) {
          leadSurrogate = uCode;
          continue;
        } else {
          leadSurrogate = uCode; // Double lead surrogate found.

          uCode = UNASSIGNED;
        }
      } else {
        // We've got trail surrogate.
        if (leadSurrogate !== -1) {
          uCode = 0x10000 + (leadSurrogate - 0xD800) * 0x400 + (uCode - 0xDC00);
          leadSurrogate = -1;
        } else {
          // Incomplete surrogate pair - only trail surrogate found.
          uCode = UNASSIGNED;
        }
      }
    } else if (leadSurrogate !== -1) {
      // Incomplete surrogate pair - only lead surrogate found.
      nextChar = uCode;
      uCode = UNASSIGNED; // Write an error, then current char.

      leadSurrogate = -1;
    } // 2. Convert uCode character.


    var dbcsCode = UNASSIGNED;

    if (seqObj !== undefined && uCode != UNASSIGNED) {
      // We are in the middle of the sequence
      var resCode = seqObj[uCode];

      if (typeof resCode === 'object') {
        // Sequence continues.
        seqObj = resCode;
        continue;
      } else if (typeof resCode == 'number') {
        // Sequence finished. Write it.
        dbcsCode = resCode;
      } else if (resCode == undefined) {
        // Current character is not part of the sequence.
        // Try default character for this sequence
        resCode = seqObj[DEF_CHAR];

        if (resCode !== undefined) {
          dbcsCode = resCode; // Found. Write it.

          nextChar = uCode; // Current character will be written too in the next iteration.
        }
      }

      seqObj = undefined;
    } else if (uCode >= 0) {
      // Regular character
      var subtable = this.encodeTable[uCode >> 8];
      if (subtable !== undefined) dbcsCode = subtable[uCode & 0xFF];

      if (dbcsCode <= SEQ_START) {
        // Sequence start
        seqObj = this.encodeTableSeq[SEQ_START - dbcsCode];
        continue;
      }

      if (dbcsCode == UNASSIGNED && this.gb18030) {
        // Use GB18030 algorithm to find character(s) to write.
        var idx = findIdx(this.gb18030.uChars, uCode);

        if (idx != -1) {
          var dbcsCode = this.gb18030.gbChars[idx] + (uCode - this.gb18030.uChars[idx]);
          newBuf[j++] = 0x81 + Math.floor(dbcsCode / 12600);
          dbcsCode = dbcsCode % 12600;
          newBuf[j++] = 0x30 + Math.floor(dbcsCode / 1260);
          dbcsCode = dbcsCode % 1260;
          newBuf[j++] = 0x81 + Math.floor(dbcsCode / 10);
          dbcsCode = dbcsCode % 10;
          newBuf[j++] = 0x30 + dbcsCode;
          continue;
        }
      }
    } // 3. Write dbcsCode character.


    if (dbcsCode === UNASSIGNED) dbcsCode = this.defaultCharSingleByte;

    if (dbcsCode < 0x100) {
      newBuf[j++] = dbcsCode;
    } else if (dbcsCode < 0x10000) {
      newBuf[j++] = dbcsCode >> 8; // high byte

      newBuf[j++] = dbcsCode & 0xFF; // low byte
    } else if (dbcsCode < 0x1000000) {
      newBuf[j++] = dbcsCode >> 16;
      newBuf[j++] = dbcsCode >> 8 & 0xFF;
      newBuf[j++] = dbcsCode & 0xFF;
    } else {
      newBuf[j++] = dbcsCode >>> 24;
      newBuf[j++] = dbcsCode >>> 16 & 0xFF;
      newBuf[j++] = dbcsCode >>> 8 & 0xFF;
      newBuf[j++] = dbcsCode & 0xFF;
    }
  }

  this.seqObj = seqObj;
  this.leadSurrogate = leadSurrogate;
  return newBuf.slice(0, j);
};

DBCSEncoder.prototype.end = function () {
  if (this.leadSurrogate === -1 && this.seqObj === undefined) return; // All clean. Most often case.

  var newBuf = Buffer$7.alloc(10),
      j = 0;

  if (this.seqObj) {
    // We're in the sequence.
    var dbcsCode = this.seqObj[DEF_CHAR];

    if (dbcsCode !== undefined) {
      // Write beginning of the sequence.
      if (dbcsCode < 0x100) {
        newBuf[j++] = dbcsCode;
      } else {
        newBuf[j++] = dbcsCode >> 8; // high byte

        newBuf[j++] = dbcsCode & 0xFF; // low byte
      }
    }

    this.seqObj = undefined;
  }

  if (this.leadSurrogate !== -1) {
    // Incomplete surrogate pair - only lead surrogate found.
    newBuf[j++] = this.defaultCharSingleByte;
    this.leadSurrogate = -1;
  }

  return newBuf.slice(0, j);
}; // Export for testing


DBCSEncoder.prototype.findIdx = findIdx; // == Decoder ==================================================================

function DBCSDecoder(options, codec) {
  // Decoder state
  this.nodeIdx = 0;
  this.prevBytes = []; // Static data

  this.decodeTables = codec.decodeTables;
  this.decodeTableSeq = codec.decodeTableSeq;
  this.defaultCharUnicode = codec.defaultCharUnicode;
  this.gb18030 = codec.gb18030;
}

DBCSDecoder.prototype.write = function (buf) {
  var newBuf = Buffer$7.alloc(buf.length * 2),
      nodeIdx = this.nodeIdx,
      prevBytes = this.prevBytes,
      prevOffset = this.prevBytes.length,
      seqStart = -this.prevBytes.length,
      // idx of the start of current parsed sequence.
  uCode;

  for (var i = 0, j = 0; i < buf.length; i++) {
    var curByte = i >= 0 ? buf[i] : prevBytes[i + prevOffset]; // Lookup in current trie node.

    var uCode = this.decodeTables[nodeIdx][curByte];

    if (uCode >= 0) ; else if (uCode === UNASSIGNED) {
      // Unknown char.
      // TODO: Callback with seq.
      uCode = this.defaultCharUnicode.charCodeAt(0);
      i = seqStart; // Skip one byte ('i' will be incremented by the for loop) and try to parse again.
    } else if (uCode === GB18030_CODE) {
      if (i >= 3) {
        var ptr = (buf[i - 3] - 0x81) * 12600 + (buf[i - 2] - 0x30) * 1260 + (buf[i - 1] - 0x81) * 10 + (curByte - 0x30);
      } else {
        var ptr = (prevBytes[i - 3 + prevOffset] - 0x81) * 12600 + ((i - 2 >= 0 ? buf[i - 2] : prevBytes[i - 2 + prevOffset]) - 0x30) * 1260 + ((i - 1 >= 0 ? buf[i - 1] : prevBytes[i - 1 + prevOffset]) - 0x81) * 10 + (curByte - 0x30);
      }

      var idx = findIdx(this.gb18030.gbChars, ptr);
      uCode = this.gb18030.uChars[idx] + ptr - this.gb18030.gbChars[idx];
    } else if (uCode <= NODE_START) {
      // Go to next trie node.
      nodeIdx = NODE_START - uCode;
      continue;
    } else if (uCode <= SEQ_START) {
      // Output a sequence of chars.
      var seq = this.decodeTableSeq[SEQ_START - uCode];

      for (var k = 0; k < seq.length - 1; k++) {
        uCode = seq[k];
        newBuf[j++] = uCode & 0xFF;
        newBuf[j++] = uCode >> 8;
      }

      uCode = seq[seq.length - 1];
    } else throw new Error("iconv-lite internal error: invalid decoding table value " + uCode + " at " + nodeIdx + "/" + curByte); // Write the character to buffer, handling higher planes using surrogate pair.


    if (uCode >= 0x10000) {
      uCode -= 0x10000;
      var uCodeLead = 0xD800 | uCode >> 10;
      newBuf[j++] = uCodeLead & 0xFF;
      newBuf[j++] = uCodeLead >> 8;
      uCode = 0xDC00 | uCode & 0x3FF;
    }

    newBuf[j++] = uCode & 0xFF;
    newBuf[j++] = uCode >> 8; // Reset trie node.

    nodeIdx = 0;
    seqStart = i + 1;
  }

  this.nodeIdx = nodeIdx;
  this.prevBytes = seqStart >= 0 ? Array.prototype.slice.call(buf, seqStart) : prevBytes.slice(seqStart + prevOffset).concat(Array.prototype.slice.call(buf));
  return newBuf.slice(0, j).toString('ucs2');
};

DBCSDecoder.prototype.end = function () {
  var ret = ''; // Try to parse all remaining chars.

  while (this.prevBytes.length > 0) {
    // Skip 1 character in the buffer.
    ret += this.defaultCharUnicode;
    var bytesArr = this.prevBytes.slice(1); // Parse remaining as usual.

    this.prevBytes = [];
    this.nodeIdx = 0;
    if (bytesArr.length > 0) ret += this.write(bytesArr);
  }

  this.prevBytes = [];
  this.nodeIdx = 0;
  return ret;
}; // Binary search for GB18030. Returns largest i such that table[i] <= val.


function findIdx(table, val) {
  if (table[0] > val) return -1;
  var l = 0,
      r = table.length;

  while (l < r - 1) {
    // always table[l] <= val < table[r]
    var mid = l + (r - l + 1 >> 1);
    if (table[mid] <= val) l = mid;else r = mid;
  }

  return l;
}

var dbcsCodec = {
	_dbcs: _dbcs
};

var require$$0 = [
	[
		"0",
		"\u0000",
		128
	],
	[
		"a1",
		"｡",
		62
	],
	[
		"8140",
		"　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
		9,
		"＋－±×"
	],
	[
		"8180",
		"÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
	],
	[
		"81b8",
		"∈∋⊆⊇⊂⊃∪∩"
	],
	[
		"81c8",
		"∧∨￢⇒⇔∀∃"
	],
	[
		"81da",
		"∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
	],
	[
		"81f0",
		"Å‰♯♭♪†‡¶"
	],
	[
		"81fc",
		"◯"
	],
	[
		"824f",
		"０",
		9
	],
	[
		"8260",
		"Ａ",
		25
	],
	[
		"8281",
		"ａ",
		25
	],
	[
		"829f",
		"ぁ",
		82
	],
	[
		"8340",
		"ァ",
		62
	],
	[
		"8380",
		"ム",
		22
	],
	[
		"839f",
		"Α",
		16,
		"Σ",
		6
	],
	[
		"83bf",
		"α",
		16,
		"σ",
		6
	],
	[
		"8440",
		"А",
		5,
		"ЁЖ",
		25
	],
	[
		"8470",
		"а",
		5,
		"ёж",
		7
	],
	[
		"8480",
		"о",
		17
	],
	[
		"849f",
		"─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
	],
	[
		"8740",
		"①",
		19,
		"Ⅰ",
		9
	],
	[
		"875f",
		"㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
	],
	[
		"877e",
		"㍻"
	],
	[
		"8780",
		"〝〟№㏍℡㊤",
		4,
		"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
	],
	[
		"889f",
		"亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
	],
	[
		"8940",
		"院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
	],
	[
		"8980",
		"園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
	],
	[
		"8a40",
		"魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
	],
	[
		"8a80",
		"橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
	],
	[
		"8b40",
		"機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
	],
	[
		"8b80",
		"朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
	],
	[
		"8c40",
		"掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
	],
	[
		"8c80",
		"劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
	],
	[
		"8d40",
		"后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
	],
	[
		"8d80",
		"項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
	],
	[
		"8e40",
		"察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
	],
	[
		"8e80",
		"死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
	],
	[
		"8f40",
		"宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
	],
	[
		"8f80",
		"準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
	],
	[
		"9040",
		"拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
	],
	[
		"9080",
		"逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
	],
	[
		"9140",
		"繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
	],
	[
		"9180",
		"操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
	],
	[
		"9240",
		"叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
	],
	[
		"9280",
		"逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
	],
	[
		"9340",
		"邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
	],
	[
		"9380",
		"凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
	],
	[
		"9440",
		"如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
	],
	[
		"9480",
		"楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
	],
	[
		"9540",
		"鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
	],
	[
		"9580",
		"斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
	],
	[
		"9640",
		"法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
	],
	[
		"9680",
		"摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
	],
	[
		"9740",
		"諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
	],
	[
		"9780",
		"沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
	],
	[
		"9840",
		"蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
	],
	[
		"989f",
		"弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
	],
	[
		"9940",
		"僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
	],
	[
		"9980",
		"凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
	],
	[
		"9a40",
		"咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
	],
	[
		"9a80",
		"噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
	],
	[
		"9b40",
		"奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
	],
	[
		"9b80",
		"它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
	],
	[
		"9c40",
		"廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
	],
	[
		"9c80",
		"怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
	],
	[
		"9d40",
		"戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
	],
	[
		"9d80",
		"捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
	],
	[
		"9e40",
		"曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
	],
	[
		"9e80",
		"梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
	],
	[
		"9f40",
		"檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
	],
	[
		"9f80",
		"麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
	],
	[
		"e040",
		"漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
	],
	[
		"e080",
		"烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
	],
	[
		"e140",
		"瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
	],
	[
		"e180",
		"痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
	],
	[
		"e240",
		"磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
	],
	[
		"e280",
		"窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
	],
	[
		"e340",
		"紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
	],
	[
		"e380",
		"縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
	],
	[
		"e440",
		"隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
	],
	[
		"e480",
		"艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
	],
	[
		"e540",
		"蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
	],
	[
		"e580",
		"蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
	],
	[
		"e640",
		"襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
	],
	[
		"e680",
		"諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
	],
	[
		"e740",
		"蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
	],
	[
		"e780",
		"轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
	],
	[
		"e840",
		"錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
	],
	[
		"e880",
		"閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
	],
	[
		"e940",
		"顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
	],
	[
		"e980",
		"騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
	],
	[
		"ea40",
		"鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
	],
	[
		"ea80",
		"黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
	],
	[
		"ed40",
		"纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
	],
	[
		"ed80",
		"塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
	],
	[
		"ee40",
		"犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
	],
	[
		"ee80",
		"蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
	],
	[
		"eeef",
		"ⅰ",
		9,
		"￢￤＇＂"
	],
	[
		"f040",
		"",
		62
	],
	[
		"f080",
		"",
		124
	],
	[
		"f140",
		"",
		62
	],
	[
		"f180",
		"",
		124
	],
	[
		"f240",
		"",
		62
	],
	[
		"f280",
		"",
		124
	],
	[
		"f340",
		"",
		62
	],
	[
		"f380",
		"",
		124
	],
	[
		"f440",
		"",
		62
	],
	[
		"f480",
		"",
		124
	],
	[
		"f540",
		"",
		62
	],
	[
		"f580",
		"",
		124
	],
	[
		"f640",
		"",
		62
	],
	[
		"f680",
		"",
		124
	],
	[
		"f740",
		"",
		62
	],
	[
		"f780",
		"",
		124
	],
	[
		"f840",
		"",
		62
	],
	[
		"f880",
		"",
		124
	],
	[
		"f940",
		""
	],
	[
		"fa40",
		"ⅰ",
		9,
		"Ⅰ",
		9,
		"￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
	],
	[
		"fa80",
		"兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
	],
	[
		"fb40",
		"涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
	],
	[
		"fb80",
		"祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
	],
	[
		"fc40",
		"髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
	]
];

var require$$1 = [
	[
		"0",
		"\u0000",
		127
	],
	[
		"8ea1",
		"｡",
		62
	],
	[
		"a1a1",
		"　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
		9,
		"＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
	],
	[
		"a2a1",
		"◆□■△▲▽▼※〒→←↑↓〓"
	],
	[
		"a2ba",
		"∈∋⊆⊇⊂⊃∪∩"
	],
	[
		"a2ca",
		"∧∨￢⇒⇔∀∃"
	],
	[
		"a2dc",
		"∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
	],
	[
		"a2f2",
		"Å‰♯♭♪†‡¶"
	],
	[
		"a2fe",
		"◯"
	],
	[
		"a3b0",
		"０",
		9
	],
	[
		"a3c1",
		"Ａ",
		25
	],
	[
		"a3e1",
		"ａ",
		25
	],
	[
		"a4a1",
		"ぁ",
		82
	],
	[
		"a5a1",
		"ァ",
		85
	],
	[
		"a6a1",
		"Α",
		16,
		"Σ",
		6
	],
	[
		"a6c1",
		"α",
		16,
		"σ",
		6
	],
	[
		"a7a1",
		"А",
		5,
		"ЁЖ",
		25
	],
	[
		"a7d1",
		"а",
		5,
		"ёж",
		25
	],
	[
		"a8a1",
		"─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
	],
	[
		"ada1",
		"①",
		19,
		"Ⅰ",
		9
	],
	[
		"adc0",
		"㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
	],
	[
		"addf",
		"㍻〝〟№㏍℡㊤",
		4,
		"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
	],
	[
		"b0a1",
		"亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
	],
	[
		"b1a1",
		"院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
	],
	[
		"b2a1",
		"押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
	],
	[
		"b3a1",
		"魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
	],
	[
		"b4a1",
		"粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
	],
	[
		"b5a1",
		"機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
	],
	[
		"b6a1",
		"供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
	],
	[
		"b7a1",
		"掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
	],
	[
		"b8a1",
		"検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
	],
	[
		"b9a1",
		"后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
	],
	[
		"baa1",
		"此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
	],
	[
		"bba1",
		"察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
	],
	[
		"bca1",
		"次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
	],
	[
		"bda1",
		"宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
	],
	[
		"bea1",
		"勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
	],
	[
		"bfa1",
		"拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
	],
	[
		"c0a1",
		"澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
	],
	[
		"c1a1",
		"繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
	],
	[
		"c2a1",
		"臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
	],
	[
		"c3a1",
		"叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
	],
	[
		"c4a1",
		"帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
	],
	[
		"c5a1",
		"邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
	],
	[
		"c6a1",
		"董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
	],
	[
		"c7a1",
		"如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
	],
	[
		"c8a1",
		"函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
	],
	[
		"c9a1",
		"鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
	],
	[
		"caa1",
		"福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
	],
	[
		"cba1",
		"法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
	],
	[
		"cca1",
		"漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
	],
	[
		"cda1",
		"諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
	],
	[
		"cea1",
		"痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
	],
	[
		"cfa1",
		"蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
	],
	[
		"d0a1",
		"弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
	],
	[
		"d1a1",
		"僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
	],
	[
		"d2a1",
		"辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
	],
	[
		"d3a1",
		"咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
	],
	[
		"d4a1",
		"圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
	],
	[
		"d5a1",
		"奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
	],
	[
		"d6a1",
		"屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
	],
	[
		"d7a1",
		"廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
	],
	[
		"d8a1",
		"悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
	],
	[
		"d9a1",
		"戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
	],
	[
		"daa1",
		"據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
	],
	[
		"dba1",
		"曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
	],
	[
		"dca1",
		"棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
	],
	[
		"dda1",
		"檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
	],
	[
		"dea1",
		"沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
	],
	[
		"dfa1",
		"漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
	],
	[
		"e0a1",
		"燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
	],
	[
		"e1a1",
		"瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
	],
	[
		"e2a1",
		"癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
	],
	[
		"e3a1",
		"磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
	],
	[
		"e4a1",
		"筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
	],
	[
		"e5a1",
		"紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
	],
	[
		"e6a1",
		"罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
	],
	[
		"e7a1",
		"隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
	],
	[
		"e8a1",
		"茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
	],
	[
		"e9a1",
		"蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
	],
	[
		"eaa1",
		"蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
	],
	[
		"eba1",
		"襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
	],
	[
		"eca1",
		"譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
	],
	[
		"eda1",
		"蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
	],
	[
		"eea1",
		"遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
	],
	[
		"efa1",
		"錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
	],
	[
		"f0a1",
		"陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
	],
	[
		"f1a1",
		"顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
	],
	[
		"f2a1",
		"髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
	],
	[
		"f3a1",
		"鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
	],
	[
		"f4a1",
		"堯槇遙瑤凜熙"
	],
	[
		"f9a1",
		"纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
	],
	[
		"faa1",
		"忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
	],
	[
		"fba1",
		"犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
	],
	[
		"fca1",
		"釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
	],
	[
		"fcf1",
		"ⅰ",
		9,
		"￢￤＇＂"
	],
	[
		"8fa2af",
		"˘ˇ¸˙˝¯˛˚～΄΅"
	],
	[
		"8fa2c2",
		"¡¦¿"
	],
	[
		"8fa2eb",
		"ºª©®™¤№"
	],
	[
		"8fa6e1",
		"ΆΈΉΊΪ"
	],
	[
		"8fa6e7",
		"Ό"
	],
	[
		"8fa6e9",
		"ΎΫ"
	],
	[
		"8fa6ec",
		"Ώ"
	],
	[
		"8fa6f1",
		"άέήίϊΐόςύϋΰώ"
	],
	[
		"8fa7c2",
		"Ђ",
		10,
		"ЎЏ"
	],
	[
		"8fa7f2",
		"ђ",
		10,
		"ўџ"
	],
	[
		"8fa9a1",
		"ÆĐ"
	],
	[
		"8fa9a4",
		"Ħ"
	],
	[
		"8fa9a6",
		"Ĳ"
	],
	[
		"8fa9a8",
		"ŁĿ"
	],
	[
		"8fa9ab",
		"ŊØŒ"
	],
	[
		"8fa9af",
		"ŦÞ"
	],
	[
		"8fa9c1",
		"æđðħıĳĸłŀŉŋøœßŧþ"
	],
	[
		"8faaa1",
		"ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
	],
	[
		"8faaba",
		"ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
	],
	[
		"8faba1",
		"áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
	],
	[
		"8fabbd",
		"ġĥíìïîǐ"
	],
	[
		"8fabc5",
		"īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
	],
	[
		"8fb0a1",
		"丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
	],
	[
		"8fb1a1",
		"侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
	],
	[
		"8fb2a1",
		"傒傓傔傖傛傜傞",
		4,
		"傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
	],
	[
		"8fb3a1",
		"凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
	],
	[
		"8fb4a1",
		"匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
	],
	[
		"8fb5a1",
		"咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
	],
	[
		"8fb6a1",
		"嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
		5,
		"嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
		4,
		"囱囫园"
	],
	[
		"8fb7a1",
		"囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
		4,
		"坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
	],
	[
		"8fb8a1",
		"堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
	],
	[
		"8fb9a1",
		"奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
	],
	[
		"8fbaa1",
		"嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
		4,
		"寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
	],
	[
		"8fbba1",
		"屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
	],
	[
		"8fbca1",
		"巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
		4,
		"幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
	],
	[
		"8fbda1",
		"彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
		4,
		"忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
	],
	[
		"8fbea1",
		"悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
		4,
		"愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
	],
	[
		"8fbfa1",
		"懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
	],
	[
		"8fc0a1",
		"捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
	],
	[
		"8fc1a1",
		"擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
	],
	[
		"8fc2a1",
		"昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
	],
	[
		"8fc3a1",
		"杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
		4,
		"桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
	],
	[
		"8fc4a1",
		"棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
	],
	[
		"8fc5a1",
		"樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
	],
	[
		"8fc6a1",
		"歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
	],
	[
		"8fc7a1",
		"泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
	],
	[
		"8fc8a1",
		"湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
	],
	[
		"8fc9a1",
		"濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
		4,
		"炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
		4,
		"焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
	],
	[
		"8fcaa1",
		"煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
	],
	[
		"8fcba1",
		"狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
	],
	[
		"8fcca1",
		"珿琀琁琄琇琊琑琚琛琤琦琨",
		9,
		"琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
	],
	[
		"8fcda1",
		"甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
		5,
		"疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
	],
	[
		"8fcea1",
		"瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
		6,
		"皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
	],
	[
		"8fcfa1",
		"睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
	],
	[
		"8fd0a1",
		"碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
	],
	[
		"8fd1a1",
		"秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
	],
	[
		"8fd2a1",
		"笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
		5
	],
	[
		"8fd3a1",
		"籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
	],
	[
		"8fd4a1",
		"綞綦綧綪綳綶綷綹緂",
		4,
		"緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
	],
	[
		"8fd5a1",
		"罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
	],
	[
		"8fd6a1",
		"胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
	],
	[
		"8fd7a1",
		"艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
	],
	[
		"8fd8a1",
		"荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
	],
	[
		"8fd9a1",
		"蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
		4,
		"蕖蕙蕜",
		6,
		"蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
	],
	[
		"8fdaa1",
		"藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
		4,
		"虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
	],
	[
		"8fdba1",
		"蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
		6,
		"螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
	],
	[
		"8fdca1",
		"蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
		4,
		"裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
	],
	[
		"8fdda1",
		"襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
		4,
		"觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
	],
	[
		"8fdea1",
		"誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
		4,
		"譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
	],
	[
		"8fdfa1",
		"貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
	],
	[
		"8fe0a1",
		"踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
	],
	[
		"8fe1a1",
		"轃轇轏轑",
		4,
		"轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
	],
	[
		"8fe2a1",
		"郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
	],
	[
		"8fe3a1",
		"釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
		5,
		"釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
		4,
		"鉻鉼鉽鉿銈銉銊銍銎銒銗"
	],
	[
		"8fe4a1",
		"銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
		4,
		"鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
	],
	[
		"8fe5a1",
		"鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
		4,
		"鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
	],
	[
		"8fe6a1",
		"镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
	],
	[
		"8fe7a1",
		"霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
	],
	[
		"8fe8a1",
		"頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
		4,
		"餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
	],
	[
		"8fe9a1",
		"馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
		4
	],
	[
		"8feaa1",
		"鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
		4,
		"魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
	],
	[
		"8feba1",
		"鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
		4,
		"鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
	],
	[
		"8feca1",
		"鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
	],
	[
		"8feda1",
		"黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
		4,
		"齓齕齖齗齘齚齝齞齨齩齭",
		4,
		"齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
	]
];

var require$$2 = [
	[
		"0",
		"\u0000",
		127,
		"€"
	],
	[
		"8140",
		"丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
		5,
		"乲乴",
		9,
		"乿",
		6,
		"亇亊"
	],
	[
		"8180",
		"亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
		6,
		"伋伌伒",
		4,
		"伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
		4,
		"佄佅佇",
		5,
		"佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
	],
	[
		"8240",
		"侤侫侭侰",
		4,
		"侶",
		8,
		"俀俁係俆俇俈俉俋俌俍俒",
		4,
		"俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
		11
	],
	[
		"8280",
		"個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
		10,
		"倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
		4,
		"偖偗偘偙偛偝",
		7,
		"偦",
		5,
		"偭",
		8,
		"偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
		20,
		"傤傦傪傫傭",
		4,
		"傳",
		6,
		"傼"
	],
	[
		"8340",
		"傽",
		17,
		"僐",
		5,
		"僗僘僙僛",
		10,
		"僨僩僪僫僯僰僱僲僴僶",
		4,
		"僼",
		9,
		"儈"
	],
	[
		"8380",
		"儉儊儌",
		5,
		"儓",
		13,
		"儢",
		28,
		"兂兇兊兌兎兏児兒兓兗兘兙兛兝",
		4,
		"兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
		4,
		"冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
		5
	],
	[
		"8440",
		"凘凙凚凜凞凟凢凣凥",
		5,
		"凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
		5,
		"剋剎剏剒剓剕剗剘"
	],
	[
		"8480",
		"剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
		9,
		"剾劀劃",
		4,
		"劉",
		6,
		"劑劒劔",
		6,
		"劜劤劥劦劧劮劯劰労",
		9,
		"勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
		5,
		"勠勡勢勣勥",
		10,
		"勱",
		7,
		"勻勼勽匁匂匃匄匇匉匊匋匌匎"
	],
	[
		"8540",
		"匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
		9,
		"匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
	],
	[
		"8580",
		"厐",
		4,
		"厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
		6,
		"厷厸厹厺厼厽厾叀參",
		4,
		"収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
		4,
		"呣呥呧呩",
		7,
		"呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
	],
	[
		"8640",
		"咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
		4,
		"哫哬哯哰哱哴",
		5,
		"哻哾唀唂唃唄唅唈唊",
		4,
		"唒唓唕",
		5,
		"唜唝唞唟唡唥唦"
	],
	[
		"8680",
		"唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
		4,
		"啑啒啓啔啗",
		4,
		"啝啞啟啠啢啣啨啩啫啯",
		5,
		"啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
		6,
		"喨",
		8,
		"喲喴営喸喺喼喿",
		4,
		"嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
		4,
		"嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
		4,
		"嗿嘂嘃嘄嘅"
	],
	[
		"8740",
		"嘆嘇嘊嘋嘍嘐",
		7,
		"嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
		11,
		"噏",
		4,
		"噕噖噚噛噝",
		4
	],
	[
		"8780",
		"噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
		7,
		"嚇",
		6,
		"嚐嚑嚒嚔",
		14,
		"嚤",
		10,
		"嚰",
		6,
		"嚸嚹嚺嚻嚽",
		12,
		"囋",
		8,
		"囕囖囘囙囜団囥",
		5,
		"囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
		6
	],
	[
		"8840",
		"園",
		9,
		"圝圞圠圡圢圤圥圦圧圫圱圲圴",
		4,
		"圼圽圿坁坃坄坅坆坈坉坋坒",
		4,
		"坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
	],
	[
		"8880",
		"垁垇垈垉垊垍",
		4,
		"垔",
		6,
		"垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
		8,
		"埄",
		6,
		"埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
		7,
		"埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
		4,
		"堫",
		4,
		"報堲堳場堶",
		7
	],
	[
		"8940",
		"堾",
		5,
		"塅",
		6,
		"塎塏塐塒塓塕塖塗塙",
		4,
		"塟",
		5,
		"塦",
		4,
		"塭",
		16,
		"塿墂墄墆墇墈墊墋墌"
	],
	[
		"8980",
		"墍",
		4,
		"墔",
		4,
		"墛墜墝墠",
		7,
		"墪",
		17,
		"墽墾墿壀壂壃壄壆",
		10,
		"壒壓壔壖",
		13,
		"壥",
		5,
		"壭壯壱売壴壵壷壸壺",
		7,
		"夃夅夆夈",
		4,
		"夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
	],
	[
		"8a40",
		"夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
		4,
		"奡奣奤奦",
		12,
		"奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
	],
	[
		"8a80",
		"妧妬妭妰妱妳",
		5,
		"妺妼妽妿",
		6,
		"姇姈姉姌姍姎姏姕姖姙姛姞",
		4,
		"姤姦姧姩姪姫姭",
		11,
		"姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
		6,
		"娳娵娷",
		4,
		"娽娾娿婁",
		4,
		"婇婈婋",
		9,
		"婖婗婘婙婛",
		5
	],
	[
		"8b40",
		"婡婣婤婥婦婨婩婫",
		8,
		"婸婹婻婼婽婾媀",
		17,
		"媓",
		6,
		"媜",
		13,
		"媫媬"
	],
	[
		"8b80",
		"媭",
		4,
		"媴媶媷媹",
		4,
		"媿嫀嫃",
		5,
		"嫊嫋嫍",
		4,
		"嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
		4,
		"嫲",
		22,
		"嬊",
		11,
		"嬘",
		25,
		"嬳嬵嬶嬸",
		7,
		"孁",
		6
	],
	[
		"8c40",
		"孈",
		7,
		"孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
	],
	[
		"8c80",
		"寑寔",
		8,
		"寠寢寣實寧審",
		4,
		"寯寱",
		6,
		"寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
		6,
		"屰屲",
		6,
		"屻屼屽屾岀岃",
		4,
		"岉岊岋岎岏岒岓岕岝",
		4,
		"岤",
		4
	],
	[
		"8d40",
		"岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
		5,
		"峌",
		5,
		"峓",
		5,
		"峚",
		6,
		"峢峣峧峩峫峬峮峯峱",
		9,
		"峼",
		4
	],
	[
		"8d80",
		"崁崄崅崈",
		5,
		"崏",
		4,
		"崕崗崘崙崚崜崝崟",
		4,
		"崥崨崪崫崬崯",
		4,
		"崵",
		7,
		"崿",
		7,
		"嵈嵉嵍",
		10,
		"嵙嵚嵜嵞",
		10,
		"嵪嵭嵮嵰嵱嵲嵳嵵",
		12,
		"嶃",
		21,
		"嶚嶛嶜嶞嶟嶠"
	],
	[
		"8e40",
		"嶡",
		21,
		"嶸",
		12,
		"巆",
		6,
		"巎",
		12,
		"巜巟巠巣巤巪巬巭"
	],
	[
		"8e80",
		"巰巵巶巸",
		4,
		"巿帀帄帇帉帊帋帍帎帒帓帗帞",
		7,
		"帨",
		4,
		"帯帰帲",
		4,
		"帹帺帾帿幀幁幃幆",
		5,
		"幍",
		6,
		"幖",
		4,
		"幜幝幟幠幣",
		14,
		"幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
		4,
		"庮",
		4,
		"庴庺庻庼庽庿",
		6
	],
	[
		"8f40",
		"廆廇廈廋",
		5,
		"廔廕廗廘廙廚廜",
		11,
		"廩廫",
		8,
		"廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
	],
	[
		"8f80",
		"弨弫弬弮弰弲",
		6,
		"弻弽弾弿彁",
		14,
		"彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
		5,
		"復徫徬徯",
		5,
		"徶徸徹徺徻徾",
		4,
		"忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
	],
	[
		"9040",
		"怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
		4,
		"怶",
		4,
		"怽怾恀恄",
		6,
		"恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
	],
	[
		"9080",
		"悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
		7,
		"惇惈惉惌",
		4,
		"惒惓惔惖惗惙惛惞惡",
		4,
		"惪惱惲惵惷惸惻",
		4,
		"愂愃愄愅愇愊愋愌愐",
		4,
		"愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
		18,
		"慀",
		6
	],
	[
		"9140",
		"慇慉態慍慏慐慒慓慔慖",
		6,
		"慞慟慠慡慣慤慥慦慩",
		6,
		"慱慲慳慴慶慸",
		18,
		"憌憍憏",
		4,
		"憕"
	],
	[
		"9180",
		"憖",
		6,
		"憞",
		8,
		"憪憫憭",
		9,
		"憸",
		5,
		"憿懀懁懃",
		4,
		"應懌",
		4,
		"懓懕",
		16,
		"懧",
		13,
		"懶",
		8,
		"戀",
		5,
		"戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
		4,
		"扂扄扅扆扊"
	],
	[
		"9240",
		"扏扐払扖扗扙扚扜",
		6,
		"扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
		5,
		"抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
	],
	[
		"9280",
		"拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
		5,
		"挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
		7,
		"捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
		6,
		"採掤掦掫掯掱掲掵掶掹掻掽掿揀"
	],
	[
		"9340",
		"揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
		6,
		"揟揢揤",
		4,
		"揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
		4,
		"損搎搑搒搕",
		5,
		"搝搟搢搣搤"
	],
	[
		"9380",
		"搥搧搨搩搫搮",
		5,
		"搵",
		4,
		"搻搼搾摀摂摃摉摋",
		6,
		"摓摕摖摗摙",
		4,
		"摟",
		7,
		"摨摪摫摬摮",
		9,
		"摻",
		6,
		"撃撆撈",
		8,
		"撓撔撗撘撚撛撜撝撟",
		4,
		"撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
		6,
		"擏擑擓擔擕擖擙據"
	],
	[
		"9440",
		"擛擜擝擟擠擡擣擥擧",
		24,
		"攁",
		7,
		"攊",
		7,
		"攓",
		4,
		"攙",
		8
	],
	[
		"9480",
		"攢攣攤攦",
		4,
		"攬攭攰攱攲攳攷攺攼攽敀",
		4,
		"敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
		14,
		"斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
		7,
		"斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
		7,
		"旡旣旤旪旫"
	],
	[
		"9540",
		"旲旳旴旵旸旹旻",
		4,
		"昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
		4,
		"昽昿晀時晄",
		6,
		"晍晎晐晑晘"
	],
	[
		"9580",
		"晙晛晜晝晞晠晢晣晥晧晩",
		4,
		"晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
		4,
		"暞",
		8,
		"暩",
		4,
		"暯",
		4,
		"暵暶暷暸暺暻暼暽暿",
		25,
		"曚曞",
		7,
		"曧曨曪",
		5,
		"曱曵曶書曺曻曽朁朂會"
	],
	[
		"9640",
		"朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
		5,
		"朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
		4,
		"杝杢杣杤杦杧杫杬杮東杴杶"
	],
	[
		"9680",
		"杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
		7,
		"柂柅",
		9,
		"柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
		7,
		"柾栁栂栃栄栆栍栐栒栔栕栘",
		4,
		"栞栟栠栢",
		6,
		"栫",
		6,
		"栴栵栶栺栻栿桇桋桍桏桒桖",
		5
	],
	[
		"9740",
		"桜桝桞桟桪桬",
		7,
		"桵桸",
		8,
		"梂梄梇",
		7,
		"梐梑梒梔梕梖梘",
		9,
		"梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
	],
	[
		"9780",
		"梹",
		6,
		"棁棃",
		5,
		"棊棌棎棏棐棑棓棔棖棗棙棛",
		4,
		"棡棢棤",
		9,
		"棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
		4,
		"椌椏椑椓",
		11,
		"椡椢椣椥",
		7,
		"椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
		16,
		"楕楖楘楙楛楜楟"
	],
	[
		"9840",
		"楡楢楤楥楧楨楩楪楬業楯楰楲",
		4,
		"楺楻楽楾楿榁榃榅榊榋榌榎",
		5,
		"榖榗榙榚榝",
		9,
		"榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
	],
	[
		"9880",
		"榾榿槀槂",
		7,
		"構槍槏槑槒槓槕",
		5,
		"槜槝槞槡",
		11,
		"槮槯槰槱槳",
		9,
		"槾樀",
		9,
		"樋",
		11,
		"標",
		5,
		"樠樢",
		5,
		"権樫樬樭樮樰樲樳樴樶",
		6,
		"樿",
		4,
		"橅橆橈",
		7,
		"橑",
		6,
		"橚"
	],
	[
		"9940",
		"橜",
		4,
		"橢橣橤橦",
		10,
		"橲",
		6,
		"橺橻橽橾橿檁檂檃檅",
		8,
		"檏檒",
		4,
		"檘",
		7,
		"檡",
		5
	],
	[
		"9980",
		"檧檨檪檭",
		114,
		"欥欦欨",
		6
	],
	[
		"9a40",
		"欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
		11,
		"歚",
		7,
		"歨歩歫",
		13,
		"歺歽歾歿殀殅殈"
	],
	[
		"9a80",
		"殌殎殏殐殑殔殕殗殘殙殜",
		4,
		"殢",
		7,
		"殫",
		7,
		"殶殸",
		6,
		"毀毃毄毆",
		4,
		"毌毎毐毑毘毚毜",
		4,
		"毢",
		7,
		"毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
		6,
		"氈",
		4,
		"氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
		4,
		"汑汒汓汖汘"
	],
	[
		"9b40",
		"汙汚汢汣汥汦汧汫",
		4,
		"汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
	],
	[
		"9b80",
		"泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
		5,
		"洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
		4,
		"涃涄涆涇涊涋涍涏涐涒涖",
		4,
		"涜涢涥涬涭涰涱涳涴涶涷涹",
		5,
		"淁淂淃淈淉淊"
	],
	[
		"9c40",
		"淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
		7,
		"渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
	],
	[
		"9c80",
		"渶渷渹渻",
		7,
		"湅",
		7,
		"湏湐湑湒湕湗湙湚湜湝湞湠",
		10,
		"湬湭湯",
		14,
		"満溁溂溄溇溈溊",
		4,
		"溑",
		6,
		"溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
		5
	],
	[
		"9d40",
		"滰滱滲滳滵滶滷滸滺",
		7,
		"漃漄漅漇漈漊",
		4,
		"漐漑漒漖",
		9,
		"漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
		6,
		"漿潀潁潂"
	],
	[
		"9d80",
		"潃潄潅潈潉潊潌潎",
		9,
		"潙潚潛潝潟潠潡潣潤潥潧",
		5,
		"潯潰潱潳潵潶潷潹潻潽",
		6,
		"澅澆澇澊澋澏",
		12,
		"澝澞澟澠澢",
		4,
		"澨",
		10,
		"澴澵澷澸澺",
		5,
		"濁濃",
		5,
		"濊",
		6,
		"濓",
		10,
		"濟濢濣濤濥"
	],
	[
		"9e40",
		"濦",
		7,
		"濰",
		32,
		"瀒",
		7,
		"瀜",
		6,
		"瀤",
		6
	],
	[
		"9e80",
		"瀫",
		9,
		"瀶瀷瀸瀺",
		17,
		"灍灎灐",
		13,
		"灟",
		11,
		"灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
		12,
		"炰炲炴炵炶為炾炿烄烅烆烇烉烋",
		12,
		"烚"
	],
	[
		"9f40",
		"烜烝烞烠烡烢烣烥烪烮烰",
		6,
		"烸烺烻烼烾",
		10,
		"焋",
		4,
		"焑焒焔焗焛",
		10,
		"焧",
		7,
		"焲焳焴"
	],
	[
		"9f80",
		"焵焷",
		13,
		"煆煇煈煉煋煍煏",
		12,
		"煝煟",
		4,
		"煥煩",
		4,
		"煯煰煱煴煵煶煷煹煻煼煾",
		5,
		"熅",
		4,
		"熋熌熍熎熐熑熒熓熕熖熗熚",
		4,
		"熡",
		6,
		"熩熪熫熭",
		5,
		"熴熶熷熸熺",
		8,
		"燄",
		9,
		"燏",
		4
	],
	[
		"a040",
		"燖",
		9,
		"燡燢燣燤燦燨",
		5,
		"燯",
		9,
		"燺",
		11,
		"爇",
		19
	],
	[
		"a080",
		"爛爜爞",
		9,
		"爩爫爭爮爯爲爳爴爺爼爾牀",
		6,
		"牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
		4,
		"犌犎犐犑犓",
		11,
		"犠",
		11,
		"犮犱犲犳犵犺",
		6,
		"狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
	],
	[
		"a1a1",
		"　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
		7,
		"〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
	],
	[
		"a2a1",
		"ⅰ",
		9
	],
	[
		"a2b1",
		"⒈",
		19,
		"⑴",
		19,
		"①",
		9
	],
	[
		"a2e5",
		"㈠",
		9
	],
	[
		"a2f1",
		"Ⅰ",
		11
	],
	[
		"a3a1",
		"！＂＃￥％",
		88,
		"￣"
	],
	[
		"a4a1",
		"ぁ",
		82
	],
	[
		"a5a1",
		"ァ",
		85
	],
	[
		"a6a1",
		"Α",
		16,
		"Σ",
		6
	],
	[
		"a6c1",
		"α",
		16,
		"σ",
		6
	],
	[
		"a6e0",
		"︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
	],
	[
		"a6ee",
		"︻︼︷︸︱"
	],
	[
		"a6f4",
		"︳︴"
	],
	[
		"a7a1",
		"А",
		5,
		"ЁЖ",
		25
	],
	[
		"a7d1",
		"а",
		5,
		"ёж",
		25
	],
	[
		"a840",
		"ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
		35,
		"▁",
		6
	],
	[
		"a880",
		"█",
		7,
		"▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
	],
	[
		"a8a1",
		"āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
	],
	[
		"a8bd",
		"ńň"
	],
	[
		"a8c0",
		"ɡ"
	],
	[
		"a8c5",
		"ㄅ",
		36
	],
	[
		"a940",
		"〡",
		8,
		"㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
	],
	[
		"a959",
		"℡㈱"
	],
	[
		"a95c",
		"‐"
	],
	[
		"a960",
		"ー゛゜ヽヾ〆ゝゞ﹉",
		9,
		"﹔﹕﹖﹗﹙",
		8
	],
	[
		"a980",
		"﹢",
		4,
		"﹨﹩﹪﹫"
	],
	[
		"a996",
		"〇"
	],
	[
		"a9a4",
		"─",
		75
	],
	[
		"aa40",
		"狜狝狟狢",
		5,
		"狪狫狵狶狹狽狾狿猀猂猄",
		5,
		"猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
		8
	],
	[
		"aa80",
		"獉獊獋獌獎獏獑獓獔獕獖獘",
		7,
		"獡",
		10,
		"獮獰獱"
	],
	[
		"ab40",
		"獲",
		11,
		"獿",
		4,
		"玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
		5,
		"玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
		4
	],
	[
		"ab80",
		"珋珌珎珒",
		6,
		"珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
		4
	],
	[
		"ac40",
		"珸",
		10,
		"琄琇琈琋琌琍琎琑",
		8,
		"琜",
		5,
		"琣琤琧琩琫琭琯琱琲琷",
		4,
		"琽琾琿瑀瑂",
		11
	],
	[
		"ac80",
		"瑎",
		6,
		"瑖瑘瑝瑠",
		12,
		"瑮瑯瑱",
		4,
		"瑸瑹瑺"
	],
	[
		"ad40",
		"瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
		10,
		"璝璟",
		7,
		"璪",
		15,
		"璻",
		12
	],
	[
		"ad80",
		"瓈",
		9,
		"瓓",
		8,
		"瓝瓟瓡瓥瓧",
		6,
		"瓰瓱瓲"
	],
	[
		"ae40",
		"瓳瓵瓸",
		6,
		"甀甁甂甃甅",
		7,
		"甎甐甒甔甕甖甗甛甝甞甠",
		4,
		"甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
	],
	[
		"ae80",
		"畝",
		7,
		"畧畨畩畫",
		6,
		"畳畵當畷畺",
		4,
		"疀疁疂疄疅疇"
	],
	[
		"af40",
		"疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
		4,
		"疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
	],
	[
		"af80",
		"瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
	],
	[
		"b040",
		"癅",
		6,
		"癎",
		5,
		"癕癗",
		4,
		"癝癟癠癡癢癤",
		6,
		"癬癭癮癰",
		7,
		"癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
	],
	[
		"b080",
		"皜",
		7,
		"皥",
		8,
		"皯皰皳皵",
		9,
		"盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
	],
	[
		"b140",
		"盄盇盉盋盌盓盕盙盚盜盝盞盠",
		4,
		"盦",
		7,
		"盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
		10,
		"眛眜眝眞眡眣眤眥眧眪眫"
	],
	[
		"b180",
		"眬眮眰",
		4,
		"眹眻眽眾眿睂睄睅睆睈",
		7,
		"睒",
		7,
		"睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
	],
	[
		"b240",
		"睝睞睟睠睤睧睩睪睭",
		11,
		"睺睻睼瞁瞂瞃瞆",
		5,
		"瞏瞐瞓",
		11,
		"瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
		4
	],
	[
		"b280",
		"瞼瞾矀",
		12,
		"矎",
		8,
		"矘矙矚矝",
		4,
		"矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
	],
	[
		"b340",
		"矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
		5,
		"砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
	],
	[
		"b380",
		"硛硜硞",
		11,
		"硯",
		7,
		"硸硹硺硻硽",
		6,
		"场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
	],
	[
		"b440",
		"碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
		7,
		"碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
		9
	],
	[
		"b480",
		"磤磥磦磧磩磪磫磭",
		4,
		"磳磵磶磸磹磻",
		5,
		"礂礃礄礆",
		6,
		"础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
	],
	[
		"b540",
		"礍",
		5,
		"礔",
		9,
		"礟",
		4,
		"礥",
		14,
		"礵",
		4,
		"礽礿祂祃祄祅祇祊",
		8,
		"祔祕祘祙祡祣"
	],
	[
		"b580",
		"祤祦祩祪祫祬祮祰",
		6,
		"祹祻",
		4,
		"禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
	],
	[
		"b640",
		"禓",
		6,
		"禛",
		11,
		"禨",
		10,
		"禴",
		4,
		"禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
		5,
		"秠秡秢秥秨秪"
	],
	[
		"b680",
		"秬秮秱",
		6,
		"秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
		4,
		"稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
	],
	[
		"b740",
		"稝稟稡稢稤",
		14,
		"稴稵稶稸稺稾穀",
		5,
		"穇",
		9,
		"穒",
		4,
		"穘",
		16
	],
	[
		"b780",
		"穩",
		6,
		"穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
	],
	[
		"b840",
		"窣窤窧窩窪窫窮",
		4,
		"窴",
		10,
		"竀",
		10,
		"竌",
		9,
		"竗竘竚竛竜竝竡竢竤竧",
		5,
		"竮竰竱竲竳"
	],
	[
		"b880",
		"竴",
		4,
		"竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
	],
	[
		"b940",
		"笯笰笲笴笵笶笷笹笻笽笿",
		5,
		"筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
		10,
		"筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
		6,
		"箎箏"
	],
	[
		"b980",
		"箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
		7,
		"篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
	],
	[
		"ba40",
		"篅篈築篊篋篍篎篏篐篒篔",
		4,
		"篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
		4,
		"篸篹篺篻篽篿",
		7,
		"簈簉簊簍簎簐",
		5,
		"簗簘簙"
	],
	[
		"ba80",
		"簚",
		4,
		"簠",
		5,
		"簨簩簫",
		12,
		"簹",
		5,
		"籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
	],
	[
		"bb40",
		"籃",
		9,
		"籎",
		36,
		"籵",
		5,
		"籾",
		9
	],
	[
		"bb80",
		"粈粊",
		6,
		"粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
		4,
		"粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
	],
	[
		"bc40",
		"粿糀糂糃糄糆糉糋糎",
		6,
		"糘糚糛糝糞糡",
		6,
		"糩",
		5,
		"糰",
		7,
		"糹糺糼",
		13,
		"紋",
		5
	],
	[
		"bc80",
		"紑",
		14,
		"紡紣紤紥紦紨紩紪紬紭紮細",
		6,
		"肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
	],
	[
		"bd40",
		"紷",
		54,
		"絯",
		7
	],
	[
		"bd80",
		"絸",
		32,
		"健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
	],
	[
		"be40",
		"継",
		12,
		"綧",
		6,
		"綯",
		42
	],
	[
		"be80",
		"線",
		32,
		"尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
	],
	[
		"bf40",
		"緻",
		62
	],
	[
		"bf80",
		"縺縼",
		4,
		"繂",
		4,
		"繈",
		21,
		"俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
	],
	[
		"c040",
		"繞",
		35,
		"纃",
		23,
		"纜纝纞"
	],
	[
		"c080",
		"纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
		6,
		"罃罆",
		9,
		"罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
	],
	[
		"c140",
		"罖罙罛罜罝罞罠罣",
		4,
		"罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
		7,
		"羋羍羏",
		4,
		"羕",
		4,
		"羛羜羠羢羣羥羦羨",
		6,
		"羱"
	],
	[
		"c180",
		"羳",
		4,
		"羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
		4,
		"翖翗翙",
		5,
		"翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
	],
	[
		"c240",
		"翤翧翨翪翫翬翭翯翲翴",
		6,
		"翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
		5,
		"耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
	],
	[
		"c280",
		"聙聛",
		13,
		"聫",
		5,
		"聲",
		11,
		"隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
	],
	[
		"c340",
		"聾肁肂肅肈肊肍",
		5,
		"肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
		4,
		"胏",
		6,
		"胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
	],
	[
		"c380",
		"脌脕脗脙脛脜脝脟",
		12,
		"脭脮脰脳脴脵脷脹",
		4,
		"脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
	],
	[
		"c440",
		"腀",
		5,
		"腇腉腍腎腏腒腖腗腘腛",
		4,
		"腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
		4,
		"膉膋膌膍膎膐膒",
		5,
		"膙膚膞",
		4,
		"膤膥"
	],
	[
		"c480",
		"膧膩膫",
		7,
		"膴",
		5,
		"膼膽膾膿臄臅臇臈臉臋臍",
		6,
		"摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
	],
	[
		"c540",
		"臔",
		14,
		"臤臥臦臨臩臫臮",
		4,
		"臵",
		5,
		"臽臿舃與",
		4,
		"舎舏舑舓舕",
		5,
		"舝舠舤舥舦舧舩舮舲舺舼舽舿"
	],
	[
		"c580",
		"艀艁艂艃艅艆艈艊艌艍艎艐",
		7,
		"艙艛艜艝艞艠",
		7,
		"艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
	],
	[
		"c640",
		"艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
	],
	[
		"c680",
		"苺苼",
		4,
		"茊茋茍茐茒茓茖茘茙茝",
		9,
		"茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
	],
	[
		"c740",
		"茾茿荁荂荄荅荈荊",
		4,
		"荓荕",
		4,
		"荝荢荰",
		6,
		"荹荺荾",
		6,
		"莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
		6,
		"莬莭莮"
	],
	[
		"c780",
		"莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
	],
	[
		"c840",
		"菮華菳",
		4,
		"菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
		5,
		"萙萚萛萞",
		5,
		"萩",
		7,
		"萲",
		5,
		"萹萺萻萾",
		7,
		"葇葈葉"
	],
	[
		"c880",
		"葊",
		6,
		"葒",
		4,
		"葘葝葞葟葠葢葤",
		4,
		"葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
	],
	[
		"c940",
		"葽",
		4,
		"蒃蒄蒅蒆蒊蒍蒏",
		7,
		"蒘蒚蒛蒝蒞蒟蒠蒢",
		12,
		"蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
	],
	[
		"c980",
		"蓘",
		4,
		"蓞蓡蓢蓤蓧",
		4,
		"蓭蓮蓯蓱",
		10,
		"蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
	],
	[
		"ca40",
		"蔃",
		8,
		"蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
		8,
		"蔭",
		9,
		"蔾",
		4,
		"蕄蕅蕆蕇蕋",
		10
	],
	[
		"ca80",
		"蕗蕘蕚蕛蕜蕝蕟",
		4,
		"蕥蕦蕧蕩",
		8,
		"蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
	],
	[
		"cb40",
		"薂薃薆薈",
		6,
		"薐",
		10,
		"薝",
		6,
		"薥薦薧薩薫薬薭薱",
		5,
		"薸薺",
		6,
		"藂",
		6,
		"藊",
		4,
		"藑藒"
	],
	[
		"cb80",
		"藔藖",
		5,
		"藝",
		6,
		"藥藦藧藨藪",
		14,
		"恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
	],
	[
		"cc40",
		"藹藺藼藽藾蘀",
		4,
		"蘆",
		10,
		"蘒蘓蘔蘕蘗",
		15,
		"蘨蘪",
		13,
		"蘹蘺蘻蘽蘾蘿虀"
	],
	[
		"cc80",
		"虁",
		11,
		"虒虓處",
		4,
		"虛虜虝號虠虡虣",
		7,
		"獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
	],
	[
		"cd40",
		"虭虯虰虲",
		6,
		"蚃",
		6,
		"蚎",
		4,
		"蚔蚖",
		5,
		"蚞",
		4,
		"蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
		4,
		"蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
	],
	[
		"cd80",
		"蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
	],
	[
		"ce40",
		"蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
		6,
		"蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
		5,
		"蝡蝢蝦",
		7,
		"蝯蝱蝲蝳蝵"
	],
	[
		"ce80",
		"蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
		4,
		"螔螕螖螘",
		6,
		"螠",
		4,
		"巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
	],
	[
		"cf40",
		"螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
		4,
		"蟇蟈蟉蟌",
		4,
		"蟔",
		6,
		"蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
		9
	],
	[
		"cf80",
		"蟺蟻蟼蟽蟿蠀蠁蠂蠄",
		5,
		"蠋",
		7,
		"蠔蠗蠘蠙蠚蠜",
		4,
		"蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
	],
	[
		"d040",
		"蠤",
		13,
		"蠳",
		5,
		"蠺蠻蠽蠾蠿衁衂衃衆",
		5,
		"衎",
		5,
		"衕衖衘衚",
		6,
		"衦衧衪衭衯衱衳衴衵衶衸衹衺"
	],
	[
		"d080",
		"衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
		4,
		"袝",
		4,
		"袣袥",
		5,
		"小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
	],
	[
		"d140",
		"袬袮袯袰袲",
		4,
		"袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
		4,
		"裠裡裦裧裩",
		6,
		"裲裵裶裷裺裻製裿褀褁褃",
		5
	],
	[
		"d180",
		"褉褋",
		4,
		"褑褔",
		4,
		"褜",
		4,
		"褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
	],
	[
		"d240",
		"褸",
		8,
		"襂襃襅",
		24,
		"襠",
		5,
		"襧",
		19,
		"襼"
	],
	[
		"d280",
		"襽襾覀覂覄覅覇",
		26,
		"摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
	],
	[
		"d340",
		"覢",
		30,
		"觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
		6
	],
	[
		"d380",
		"觻",
		4,
		"訁",
		5,
		"計",
		21,
		"印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
	],
	[
		"d440",
		"訞",
		31,
		"訿",
		8,
		"詉",
		21
	],
	[
		"d480",
		"詟",
		25,
		"詺",
		6,
		"浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
	],
	[
		"d540",
		"誁",
		7,
		"誋",
		7,
		"誔",
		46
	],
	[
		"d580",
		"諃",
		32,
		"铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
	],
	[
		"d640",
		"諤",
		34,
		"謈",
		27
	],
	[
		"d680",
		"謤謥謧",
		30,
		"帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
	],
	[
		"d740",
		"譆",
		31,
		"譧",
		4,
		"譭",
		25
	],
	[
		"d780",
		"讇",
		24,
		"讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
	],
	[
		"d840",
		"谸",
		8,
		"豂豃豄豅豈豊豋豍",
		7,
		"豖豗豘豙豛",
		5,
		"豣",
		6,
		"豬",
		6,
		"豴豵豶豷豻",
		6,
		"貃貄貆貇"
	],
	[
		"d880",
		"貈貋貍",
		6,
		"貕貖貗貙",
		20,
		"亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
	],
	[
		"d940",
		"貮",
		62
	],
	[
		"d980",
		"賭",
		32,
		"佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
	],
	[
		"da40",
		"贎",
		14,
		"贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
		8,
		"趂趃趆趇趈趉趌",
		4,
		"趒趓趕",
		9,
		"趠趡"
	],
	[
		"da80",
		"趢趤",
		12,
		"趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
	],
	[
		"db40",
		"跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
		6,
		"踆踇踈踋踍踎踐踑踒踓踕",
		7,
		"踠踡踤",
		4,
		"踫踭踰踲踳踴踶踷踸踻踼踾"
	],
	[
		"db80",
		"踿蹃蹅蹆蹌",
		4,
		"蹓",
		5,
		"蹚",
		11,
		"蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
	],
	[
		"dc40",
		"蹳蹵蹷",
		4,
		"蹽蹾躀躂躃躄躆躈",
		6,
		"躑躒躓躕",
		6,
		"躝躟",
		11,
		"躭躮躰躱躳",
		6,
		"躻",
		7
	],
	[
		"dc80",
		"軃",
		10,
		"軏",
		21,
		"堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
	],
	[
		"dd40",
		"軥",
		62
	],
	[
		"dd80",
		"輤",
		32,
		"荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
	],
	[
		"de40",
		"轅",
		32,
		"轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
	],
	[
		"de80",
		"迉",
		4,
		"迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
	],
	[
		"df40",
		"這逜連逤逥逧",
		5,
		"逰",
		4,
		"逷逹逺逽逿遀遃遅遆遈",
		4,
		"過達違遖遙遚遜",
		5,
		"遤遦遧適遪遫遬遯",
		4,
		"遶",
		6,
		"遾邁"
	],
	[
		"df80",
		"還邅邆邇邉邊邌",
		4,
		"邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
	],
	[
		"e040",
		"郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
		19,
		"鄚鄛鄜"
	],
	[
		"e080",
		"鄝鄟鄠鄡鄤",
		10,
		"鄰鄲",
		6,
		"鄺",
		8,
		"酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
	],
	[
		"e140",
		"酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
		4,
		"醆醈醊醎醏醓",
		6,
		"醜",
		5,
		"醤",
		5,
		"醫醬醰醱醲醳醶醷醸醹醻"
	],
	[
		"e180",
		"醼",
		10,
		"釈釋釐釒",
		9,
		"針",
		8,
		"帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
	],
	[
		"e240",
		"釦",
		62
	],
	[
		"e280",
		"鈥",
		32,
		"狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
		5,
		"饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
	],
	[
		"e340",
		"鉆",
		45,
		"鉵",
		16
	],
	[
		"e380",
		"銆",
		7,
		"銏",
		24,
		"恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
	],
	[
		"e440",
		"銨",
		5,
		"銯",
		24,
		"鋉",
		31
	],
	[
		"e480",
		"鋩",
		32,
		"洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
	],
	[
		"e540",
		"錊",
		51,
		"錿",
		10
	],
	[
		"e580",
		"鍊",
		31,
		"鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
	],
	[
		"e640",
		"鍬",
		34,
		"鎐",
		27
	],
	[
		"e680",
		"鎬",
		29,
		"鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
	],
	[
		"e740",
		"鏎",
		7,
		"鏗",
		54
	],
	[
		"e780",
		"鐎",
		32,
		"纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
		6,
		"缪缫缬缭缯",
		4,
		"缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
	],
	[
		"e840",
		"鐯",
		14,
		"鐿",
		43,
		"鑬鑭鑮鑯"
	],
	[
		"e880",
		"鑰",
		20,
		"钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
	],
	[
		"e940",
		"锧锳锽镃镈镋镕镚镠镮镴镵長",
		7,
		"門",
		42
	],
	[
		"e980",
		"閫",
		32,
		"椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
	],
	[
		"ea40",
		"闌",
		27,
		"闬闿阇阓阘阛阞阠阣",
		6,
		"阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
	],
	[
		"ea80",
		"陘陙陚陜陝陞陠陣陥陦陫陭",
		4,
		"陳陸",
		12,
		"隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
	],
	[
		"eb40",
		"隌階隑隒隓隕隖隚際隝",
		9,
		"隨",
		7,
		"隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
		9,
		"雡",
		6,
		"雫"
	],
	[
		"eb80",
		"雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
		4,
		"霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
	],
	[
		"ec40",
		"霡",
		8,
		"霫霬霮霯霱霳",
		4,
		"霺霻霼霽霿",
		18,
		"靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
		7
	],
	[
		"ec80",
		"靲靵靷",
		4,
		"靽",
		7,
		"鞆",
		4,
		"鞌鞎鞏鞐鞓鞕鞖鞗鞙",
		4,
		"臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
	],
	[
		"ed40",
		"鞞鞟鞡鞢鞤",
		6,
		"鞬鞮鞰鞱鞳鞵",
		46
	],
	[
		"ed80",
		"韤韥韨韮",
		4,
		"韴韷",
		23,
		"怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
	],
	[
		"ee40",
		"頏",
		62
	],
	[
		"ee80",
		"顎",
		32,
		"睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
		4,
		"钼钽钿铄铈",
		6,
		"铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
	],
	[
		"ef40",
		"顯",
		5,
		"颋颎颒颕颙颣風",
		37,
		"飏飐飔飖飗飛飜飝飠",
		4
	],
	[
		"ef80",
		"飥飦飩",
		30,
		"铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
		4,
		"锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
		8,
		"镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
	],
	[
		"f040",
		"餈",
		4,
		"餎餏餑",
		28,
		"餯",
		26
	],
	[
		"f080",
		"饊",
		9,
		"饖",
		12,
		"饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
		4,
		"鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
		6,
		"鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
	],
	[
		"f140",
		"馌馎馚",
		10,
		"馦馧馩",
		47
	],
	[
		"f180",
		"駙",
		32,
		"瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
	],
	[
		"f240",
		"駺",
		62
	],
	[
		"f280",
		"騹",
		32,
		"颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
	],
	[
		"f340",
		"驚",
		17,
		"驲骃骉骍骎骔骕骙骦骩",
		6,
		"骲骳骴骵骹骻骽骾骿髃髄髆",
		4,
		"髍髎髏髐髒體髕髖髗髙髚髛髜"
	],
	[
		"f380",
		"髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
		8,
		"髺髼",
		6,
		"鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
	],
	[
		"f440",
		"鬇鬉",
		5,
		"鬐鬑鬒鬔",
		10,
		"鬠鬡鬢鬤",
		10,
		"鬰鬱鬳",
		7,
		"鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
		5
	],
	[
		"f480",
		"魛",
		32,
		"簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
	],
	[
		"f540",
		"魼",
		62
	],
	[
		"f580",
		"鮻",
		32,
		"酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
	],
	[
		"f640",
		"鯜",
		62
	],
	[
		"f680",
		"鰛",
		32,
		"觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
		5,
		"龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
		5,
		"鲥",
		4,
		"鲫鲭鲮鲰",
		7,
		"鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
	],
	[
		"f740",
		"鰼",
		62
	],
	[
		"f780",
		"鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
		4,
		"鳈鳉鳑鳒鳚鳛鳠鳡鳌",
		4,
		"鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
	],
	[
		"f840",
		"鳣",
		62
	],
	[
		"f880",
		"鴢",
		32
	],
	[
		"f940",
		"鵃",
		62
	],
	[
		"f980",
		"鶂",
		32
	],
	[
		"fa40",
		"鶣",
		62
	],
	[
		"fa80",
		"鷢",
		32
	],
	[
		"fb40",
		"鸃",
		27,
		"鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
		9,
		"麀"
	],
	[
		"fb80",
		"麁麃麄麅麆麉麊麌",
		5,
		"麔",
		8,
		"麞麠",
		5,
		"麧麨麩麪"
	],
	[
		"fc40",
		"麫",
		8,
		"麵麶麷麹麺麼麿",
		4,
		"黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
		8,
		"黺黽黿",
		6
	],
	[
		"fc80",
		"鼆",
		4,
		"鼌鼏鼑鼒鼔鼕鼖鼘鼚",
		5,
		"鼡鼣",
		8,
		"鼭鼮鼰鼱"
	],
	[
		"fd40",
		"鼲",
		4,
		"鼸鼺鼼鼿",
		4,
		"齅",
		10,
		"齒",
		38
	],
	[
		"fd80",
		"齹",
		5,
		"龁龂龍",
		11,
		"龜龝龞龡",
		4,
		"郎凉秊裏隣"
	],
	[
		"fe40",
		"兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
	]
];

var require$$3 = [
	[
		"a140",
		"",
		62
	],
	[
		"a180",
		"",
		32
	],
	[
		"a240",
		"",
		62
	],
	[
		"a280",
		"",
		32
	],
	[
		"a2ab",
		"",
		5
	],
	[
		"a2e3",
		"€"
	],
	[
		"a2ef",
		""
	],
	[
		"a2fd",
		""
	],
	[
		"a340",
		"",
		62
	],
	[
		"a380",
		"",
		31,
		"　"
	],
	[
		"a440",
		"",
		62
	],
	[
		"a480",
		"",
		32
	],
	[
		"a4f4",
		"",
		10
	],
	[
		"a540",
		"",
		62
	],
	[
		"a580",
		"",
		32
	],
	[
		"a5f7",
		"",
		7
	],
	[
		"a640",
		"",
		62
	],
	[
		"a680",
		"",
		32
	],
	[
		"a6b9",
		"",
		7
	],
	[
		"a6d9",
		"",
		6
	],
	[
		"a6ec",
		""
	],
	[
		"a6f3",
		""
	],
	[
		"a6f6",
		"",
		8
	],
	[
		"a740",
		"",
		62
	],
	[
		"a780",
		"",
		32
	],
	[
		"a7c2",
		"",
		14
	],
	[
		"a7f2",
		"",
		12
	],
	[
		"a896",
		"",
		10
	],
	[
		"a8bc",
		"ḿ"
	],
	[
		"a8bf",
		"ǹ"
	],
	[
		"a8c1",
		""
	],
	[
		"a8ea",
		"",
		20
	],
	[
		"a958",
		""
	],
	[
		"a95b",
		""
	],
	[
		"a95d",
		""
	],
	[
		"a989",
		"〾⿰",
		11
	],
	[
		"a997",
		"",
		12
	],
	[
		"a9f0",
		"",
		14
	],
	[
		"aaa1",
		"",
		93
	],
	[
		"aba1",
		"",
		93
	],
	[
		"aca1",
		"",
		93
	],
	[
		"ada1",
		"",
		93
	],
	[
		"aea1",
		"",
		93
	],
	[
		"afa1",
		"",
		93
	],
	[
		"d7fa",
		"",
		4
	],
	[
		"f8a1",
		"",
		93
	],
	[
		"f9a1",
		"",
		93
	],
	[
		"faa1",
		"",
		93
	],
	[
		"fba1",
		"",
		93
	],
	[
		"fca1",
		"",
		93
	],
	[
		"fda1",
		"",
		93
	],
	[
		"fe50",
		"⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
	],
	[
		"fe80",
		"䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
		6,
		"䶮",
		93
	],
	[
		"8135f437",
		""
	]
];

var uChars = [
	128,
	165,
	169,
	178,
	184,
	216,
	226,
	235,
	238,
	244,
	248,
	251,
	253,
	258,
	276,
	284,
	300,
	325,
	329,
	334,
	364,
	463,
	465,
	467,
	469,
	471,
	473,
	475,
	477,
	506,
	594,
	610,
	712,
	716,
	730,
	930,
	938,
	962,
	970,
	1026,
	1104,
	1106,
	8209,
	8215,
	8218,
	8222,
	8231,
	8241,
	8244,
	8246,
	8252,
	8365,
	8452,
	8454,
	8458,
	8471,
	8482,
	8556,
	8570,
	8596,
	8602,
	8713,
	8720,
	8722,
	8726,
	8731,
	8737,
	8740,
	8742,
	8748,
	8751,
	8760,
	8766,
	8777,
	8781,
	8787,
	8802,
	8808,
	8816,
	8854,
	8858,
	8870,
	8896,
	8979,
	9322,
	9372,
	9548,
	9588,
	9616,
	9622,
	9634,
	9652,
	9662,
	9672,
	9676,
	9680,
	9702,
	9735,
	9738,
	9793,
	9795,
	11906,
	11909,
	11913,
	11917,
	11928,
	11944,
	11947,
	11951,
	11956,
	11960,
	11964,
	11979,
	12284,
	12292,
	12312,
	12319,
	12330,
	12351,
	12436,
	12447,
	12535,
	12543,
	12586,
	12842,
	12850,
	12964,
	13200,
	13215,
	13218,
	13253,
	13263,
	13267,
	13270,
	13384,
	13428,
	13727,
	13839,
	13851,
	14617,
	14703,
	14801,
	14816,
	14964,
	15183,
	15471,
	15585,
	16471,
	16736,
	17208,
	17325,
	17330,
	17374,
	17623,
	17997,
	18018,
	18212,
	18218,
	18301,
	18318,
	18760,
	18811,
	18814,
	18820,
	18823,
	18844,
	18848,
	18872,
	19576,
	19620,
	19738,
	19887,
	40870,
	59244,
	59336,
	59367,
	59413,
	59417,
	59423,
	59431,
	59437,
	59443,
	59452,
	59460,
	59478,
	59493,
	63789,
	63866,
	63894,
	63976,
	63986,
	64016,
	64018,
	64021,
	64025,
	64034,
	64037,
	64042,
	65074,
	65093,
	65107,
	65112,
	65127,
	65132,
	65375,
	65510,
	65536
];
var gbChars = [
	0,
	36,
	38,
	45,
	50,
	81,
	89,
	95,
	96,
	100,
	103,
	104,
	105,
	109,
	126,
	133,
	148,
	172,
	175,
	179,
	208,
	306,
	307,
	308,
	309,
	310,
	311,
	312,
	313,
	341,
	428,
	443,
	544,
	545,
	558,
	741,
	742,
	749,
	750,
	805,
	819,
	820,
	7922,
	7924,
	7925,
	7927,
	7934,
	7943,
	7944,
	7945,
	7950,
	8062,
	8148,
	8149,
	8152,
	8164,
	8174,
	8236,
	8240,
	8262,
	8264,
	8374,
	8380,
	8381,
	8384,
	8388,
	8390,
	8392,
	8393,
	8394,
	8396,
	8401,
	8406,
	8416,
	8419,
	8424,
	8437,
	8439,
	8445,
	8482,
	8485,
	8496,
	8521,
	8603,
	8936,
	8946,
	9046,
	9050,
	9063,
	9066,
	9076,
	9092,
	9100,
	9108,
	9111,
	9113,
	9131,
	9162,
	9164,
	9218,
	9219,
	11329,
	11331,
	11334,
	11336,
	11346,
	11361,
	11363,
	11366,
	11370,
	11372,
	11375,
	11389,
	11682,
	11686,
	11687,
	11692,
	11694,
	11714,
	11716,
	11723,
	11725,
	11730,
	11736,
	11982,
	11989,
	12102,
	12336,
	12348,
	12350,
	12384,
	12393,
	12395,
	12397,
	12510,
	12553,
	12851,
	12962,
	12973,
	13738,
	13823,
	13919,
	13933,
	14080,
	14298,
	14585,
	14698,
	15583,
	15847,
	16318,
	16434,
	16438,
	16481,
	16729,
	17102,
	17122,
	17315,
	17320,
	17402,
	17418,
	17859,
	17909,
	17911,
	17915,
	17916,
	17936,
	17939,
	17961,
	18664,
	18703,
	18814,
	18962,
	19043,
	33469,
	33470,
	33471,
	33484,
	33485,
	33490,
	33497,
	33501,
	33505,
	33513,
	33520,
	33536,
	33550,
	37845,
	37921,
	37948,
	38029,
	38038,
	38064,
	38065,
	38066,
	38069,
	38075,
	38076,
	38078,
	39108,
	39109,
	39113,
	39114,
	39115,
	39116,
	39265,
	39394,
	189000
];
var require$$4 = {
	uChars: uChars,
	gbChars: gbChars
};

var require$$5 = [
	[
		"0",
		"\u0000",
		127
	],
	[
		"8141",
		"갂갃갅갆갋",
		4,
		"갘갞갟갡갢갣갥",
		6,
		"갮갲갳갴"
	],
	[
		"8161",
		"갵갶갷갺갻갽갾갿걁",
		9,
		"걌걎",
		5,
		"걕"
	],
	[
		"8181",
		"걖걗걙걚걛걝",
		18,
		"걲걳걵걶걹걻",
		4,
		"겂겇겈겍겎겏겑겒겓겕",
		6,
		"겞겢",
		5,
		"겫겭겮겱",
		6,
		"겺겾겿곀곂곃곅곆곇곉곊곋곍",
		7,
		"곖곘",
		7,
		"곢곣곥곦곩곫곭곮곲곴곷",
		4,
		"곾곿괁괂괃괅괇",
		4,
		"괎괐괒괓"
	],
	[
		"8241",
		"괔괕괖괗괙괚괛괝괞괟괡",
		7,
		"괪괫괮",
		5
	],
	[
		"8261",
		"괶괷괹괺괻괽",
		6,
		"굆굈굊",
		5,
		"굑굒굓굕굖굗"
	],
	[
		"8281",
		"굙",
		7,
		"굢굤",
		7,
		"굮굯굱굲굷굸굹굺굾궀궃",
		4,
		"궊궋궍궎궏궑",
		10,
		"궞",
		5,
		"궥",
		17,
		"궸",
		7,
		"귂귃귅귆귇귉",
		6,
		"귒귔",
		7,
		"귝귞귟귡귢귣귥",
		18
	],
	[
		"8341",
		"귺귻귽귾긂",
		5,
		"긊긌긎",
		5,
		"긕",
		7
	],
	[
		"8361",
		"긝",
		18,
		"긲긳긵긶긹긻긼"
	],
	[
		"8381",
		"긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
		4,
		"깞깢깣깤깦깧깪깫깭깮깯깱",
		6,
		"깺깾",
		5,
		"꺆",
		5,
		"꺍",
		46,
		"꺿껁껂껃껅",
		6,
		"껎껒",
		5,
		"껚껛껝",
		8
	],
	[
		"8441",
		"껦껧껩껪껬껮",
		5,
		"껵껶껷껹껺껻껽",
		8
	],
	[
		"8461",
		"꼆꼉꼊꼋꼌꼎꼏꼑",
		18
	],
	[
		"8481",
		"꼤",
		7,
		"꼮꼯꼱꼳꼵",
		6,
		"꼾꽀꽄꽅꽆꽇꽊",
		5,
		"꽑",
		10,
		"꽞",
		5,
		"꽦",
		18,
		"꽺",
		5,
		"꾁꾂꾃꾅꾆꾇꾉",
		6,
		"꾒꾓꾔꾖",
		5,
		"꾝",
		26,
		"꾺꾻꾽꾾"
	],
	[
		"8541",
		"꾿꿁",
		5,
		"꿊꿌꿏",
		4,
		"꿕",
		6,
		"꿝",
		4
	],
	[
		"8561",
		"꿢",
		5,
		"꿪",
		5,
		"꿲꿳꿵꿶꿷꿹",
		6,
		"뀂뀃"
	],
	[
		"8581",
		"뀅",
		6,
		"뀍뀎뀏뀑뀒뀓뀕",
		6,
		"뀞",
		9,
		"뀩",
		26,
		"끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
		29,
		"끾끿낁낂낃낅",
		6,
		"낎낐낒",
		5,
		"낛낝낞낣낤"
	],
	[
		"8641",
		"낥낦낧낪낰낲낶낷낹낺낻낽",
		6,
		"냆냊",
		5,
		"냒"
	],
	[
		"8661",
		"냓냕냖냗냙",
		6,
		"냡냢냣냤냦",
		10
	],
	[
		"8681",
		"냱",
		22,
		"넊넍넎넏넑넔넕넖넗넚넞",
		4,
		"넦넧넩넪넫넭",
		6,
		"넶넺",
		5,
		"녂녃녅녆녇녉",
		6,
		"녒녓녖녗녙녚녛녝녞녟녡",
		22,
		"녺녻녽녾녿놁놃",
		4,
		"놊놌놎놏놐놑놕놖놗놙놚놛놝"
	],
	[
		"8741",
		"놞",
		9,
		"놩",
		15
	],
	[
		"8761",
		"놹",
		18,
		"뇍뇎뇏뇑뇒뇓뇕"
	],
	[
		"8781",
		"뇖",
		5,
		"뇞뇠",
		7,
		"뇪뇫뇭뇮뇯뇱",
		7,
		"뇺뇼뇾",
		5,
		"눆눇눉눊눍",
		6,
		"눖눘눚",
		5,
		"눡",
		18,
		"눵",
		6,
		"눽",
		26,
		"뉙뉚뉛뉝뉞뉟뉡",
		6,
		"뉪",
		4
	],
	[
		"8841",
		"뉯",
		4,
		"뉶",
		5,
		"뉽",
		6,
		"늆늇늈늊",
		4
	],
	[
		"8861",
		"늏늒늓늕늖늗늛",
		4,
		"늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
	],
	[
		"8881",
		"늸",
		15,
		"닊닋닍닎닏닑닓",
		4,
		"닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
		6,
		"댒댖",
		5,
		"댝",
		54,
		"덗덙덚덝덠덡덢덣"
	],
	[
		"8941",
		"덦덨덪덬덭덯덲덳덵덶덷덹",
		6,
		"뎂뎆",
		5,
		"뎍"
	],
	[
		"8961",
		"뎎뎏뎑뎒뎓뎕",
		10,
		"뎢",
		5,
		"뎩뎪뎫뎭"
	],
	[
		"8981",
		"뎮",
		21,
		"돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
		18,
		"돽",
		18,
		"됑",
		6,
		"됙됚됛됝됞됟됡",
		6,
		"됪됬",
		7,
		"됵",
		15
	],
	[
		"8a41",
		"둅",
		10,
		"둒둓둕둖둗둙",
		6,
		"둢둤둦"
	],
	[
		"8a61",
		"둧",
		4,
		"둭",
		18,
		"뒁뒂"
	],
	[
		"8a81",
		"뒃",
		4,
		"뒉",
		19,
		"뒞",
		5,
		"뒥뒦뒧뒩뒪뒫뒭",
		7,
		"뒶뒸뒺",
		5,
		"듁듂듃듅듆듇듉",
		6,
		"듑듒듓듔듖",
		5,
		"듞듟듡듢듥듧",
		4,
		"듮듰듲",
		5,
		"듹",
		26,
		"딖딗딙딚딝"
	],
	[
		"8b41",
		"딞",
		5,
		"딦딫",
		4,
		"딲딳딵딶딷딹",
		6,
		"땂땆"
	],
	[
		"8b61",
		"땇땈땉땊땎땏땑땒땓땕",
		6,
		"땞땢",
		8
	],
	[
		"8b81",
		"땫",
		52,
		"떢떣떥떦떧떩떬떭떮떯떲떶",
		4,
		"떾떿뗁뗂뗃뗅",
		6,
		"뗎뗒",
		5,
		"뗙",
		18,
		"뗭",
		18
	],
	[
		"8c41",
		"똀",
		15,
		"똒똓똕똖똗똙",
		4
	],
	[
		"8c61",
		"똞",
		6,
		"똦",
		5,
		"똭",
		6,
		"똵",
		5
	],
	[
		"8c81",
		"똻",
		12,
		"뙉",
		26,
		"뙥뙦뙧뙩",
		50,
		"뚞뚟뚡뚢뚣뚥",
		5,
		"뚭뚮뚯뚰뚲",
		16
	],
	[
		"8d41",
		"뛃",
		16,
		"뛕",
		8
	],
	[
		"8d61",
		"뛞",
		17,
		"뛱뛲뛳뛵뛶뛷뛹뛺"
	],
	[
		"8d81",
		"뛻",
		4,
		"뜂뜃뜄뜆",
		33,
		"뜪뜫뜭뜮뜱",
		6,
		"뜺뜼",
		7,
		"띅띆띇띉띊띋띍",
		6,
		"띖",
		9,
		"띡띢띣띥띦띧띩",
		6,
		"띲띴띶",
		5,
		"띾띿랁랂랃랅",
		6,
		"랎랓랔랕랚랛랝랞"
	],
	[
		"8e41",
		"랟랡",
		6,
		"랪랮",
		5,
		"랶랷랹",
		8
	],
	[
		"8e61",
		"럂",
		4,
		"럈럊",
		19
	],
	[
		"8e81",
		"럞",
		13,
		"럮럯럱럲럳럵",
		6,
		"럾렂",
		4,
		"렊렋렍렎렏렑",
		6,
		"렚렜렞",
		5,
		"렦렧렩렪렫렭",
		6,
		"렶렺",
		5,
		"롁롂롃롅",
		11,
		"롒롔",
		7,
		"롞롟롡롢롣롥",
		6,
		"롮롰롲",
		5,
		"롹롺롻롽",
		7
	],
	[
		"8f41",
		"뢅",
		7,
		"뢎",
		17
	],
	[
		"8f61",
		"뢠",
		7,
		"뢩",
		6,
		"뢱뢲뢳뢵뢶뢷뢹",
		4
	],
	[
		"8f81",
		"뢾뢿룂룄룆",
		5,
		"룍룎룏룑룒룓룕",
		7,
		"룞룠룢",
		5,
		"룪룫룭룮룯룱",
		6,
		"룺룼룾",
		5,
		"뤅",
		18,
		"뤙",
		6,
		"뤡",
		26,
		"뤾뤿륁륂륃륅",
		6,
		"륍륎륐륒",
		5
	],
	[
		"9041",
		"륚륛륝륞륟륡",
		6,
		"륪륬륮",
		5,
		"륶륷륹륺륻륽"
	],
	[
		"9061",
		"륾",
		5,
		"릆릈릋릌릏",
		15
	],
	[
		"9081",
		"릟",
		12,
		"릮릯릱릲릳릵",
		6,
		"릾맀맂",
		5,
		"맊맋맍맓",
		4,
		"맚맜맟맠맢맦맧맩맪맫맭",
		6,
		"맶맻",
		4,
		"먂",
		5,
		"먉",
		11,
		"먖",
		33,
		"먺먻먽먾먿멁멃멄멅멆"
	],
	[
		"9141",
		"멇멊멌멏멐멑멒멖멗멙멚멛멝",
		6,
		"멦멪",
		5
	],
	[
		"9161",
		"멲멳멵멶멷멹",
		9,
		"몆몈몉몊몋몍",
		5
	],
	[
		"9181",
		"몓",
		20,
		"몪몭몮몯몱몳",
		4,
		"몺몼몾",
		5,
		"뫅뫆뫇뫉",
		14,
		"뫚",
		33,
		"뫽뫾뫿묁묂묃묅",
		7,
		"묎묐묒",
		5,
		"묙묚묛묝묞묟묡",
		6
	],
	[
		"9241",
		"묨묪묬",
		7,
		"묷묹묺묿",
		4,
		"뭆뭈뭊뭋뭌뭎뭑뭒"
	],
	[
		"9261",
		"뭓뭕뭖뭗뭙",
		7,
		"뭢뭤",
		7,
		"뭭",
		4
	],
	[
		"9281",
		"뭲",
		21,
		"뮉뮊뮋뮍뮎뮏뮑",
		18,
		"뮥뮦뮧뮩뮪뮫뮭",
		6,
		"뮵뮶뮸",
		7,
		"믁믂믃믅믆믇믉",
		6,
		"믑믒믔",
		35,
		"믺믻믽믾밁"
	],
	[
		"9341",
		"밃",
		4,
		"밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
	],
	[
		"9361",
		"밶밷밹",
		6,
		"뱂뱆뱇뱈뱊뱋뱎뱏뱑",
		8
	],
	[
		"9381",
		"뱚뱛뱜뱞",
		37,
		"벆벇벉벊벍벏",
		4,
		"벖벘벛",
		4,
		"벢벣벥벦벩",
		6,
		"벲벶",
		5,
		"벾벿볁볂볃볅",
		7,
		"볎볒볓볔볖볗볙볚볛볝",
		22,
		"볷볹볺볻볽"
	],
	[
		"9441",
		"볾",
		5,
		"봆봈봊",
		5,
		"봑봒봓봕",
		8
	],
	[
		"9461",
		"봞",
		5,
		"봥",
		6,
		"봭",
		12
	],
	[
		"9481",
		"봺",
		5,
		"뵁",
		6,
		"뵊뵋뵍뵎뵏뵑",
		6,
		"뵚",
		9,
		"뵥뵦뵧뵩",
		22,
		"붂붃붅붆붋",
		4,
		"붒붔붖붗붘붛붝",
		6,
		"붥",
		10,
		"붱",
		6,
		"붹",
		24
	],
	[
		"9541",
		"뷒뷓뷖뷗뷙뷚뷛뷝",
		11,
		"뷪",
		5,
		"뷱"
	],
	[
		"9561",
		"뷲뷳뷵뷶뷷뷹",
		6,
		"븁븂븄븆",
		5,
		"븎븏븑븒븓"
	],
	[
		"9581",
		"븕",
		6,
		"븞븠",
		35,
		"빆빇빉빊빋빍빏",
		4,
		"빖빘빜빝빞빟빢빣빥빦빧빩빫",
		4,
		"빲빶",
		4,
		"빾빿뺁뺂뺃뺅",
		6,
		"뺎뺒",
		5,
		"뺚",
		13,
		"뺩",
		14
	],
	[
		"9641",
		"뺸",
		23,
		"뻒뻓"
	],
	[
		"9661",
		"뻕뻖뻙",
		6,
		"뻡뻢뻦",
		5,
		"뻭",
		8
	],
	[
		"9681",
		"뻶",
		10,
		"뼂",
		5,
		"뼊",
		13,
		"뼚뼞",
		33,
		"뽂뽃뽅뽆뽇뽉",
		6,
		"뽒뽓뽔뽖",
		44
	],
	[
		"9741",
		"뾃",
		16,
		"뾕",
		8
	],
	[
		"9761",
		"뾞",
		17,
		"뾱",
		7
	],
	[
		"9781",
		"뾹",
		11,
		"뿆",
		5,
		"뿎뿏뿑뿒뿓뿕",
		6,
		"뿝뿞뿠뿢",
		89,
		"쀽쀾쀿"
	],
	[
		"9841",
		"쁀",
		16,
		"쁒",
		5,
		"쁙쁚쁛"
	],
	[
		"9861",
		"쁝쁞쁟쁡",
		6,
		"쁪",
		15
	],
	[
		"9881",
		"쁺",
		21,
		"삒삓삕삖삗삙",
		6,
		"삢삤삦",
		5,
		"삮삱삲삷",
		4,
		"삾샂샃샄샆샇샊샋샍샎샏샑",
		6,
		"샚샞",
		5,
		"샦샧샩샪샫샭",
		6,
		"샶샸샺",
		5,
		"섁섂섃섅섆섇섉",
		6,
		"섑섒섓섔섖",
		5,
		"섡섢섥섨섩섪섫섮"
	],
	[
		"9941",
		"섲섳섴섵섷섺섻섽섾섿셁",
		6,
		"셊셎",
		5,
		"셖셗"
	],
	[
		"9961",
		"셙셚셛셝",
		6,
		"셦셪",
		5,
		"셱셲셳셵셶셷셹셺셻"
	],
	[
		"9981",
		"셼",
		8,
		"솆",
		5,
		"솏솑솒솓솕솗",
		4,
		"솞솠솢솣솤솦솧솪솫솭솮솯솱",
		11,
		"솾",
		5,
		"쇅쇆쇇쇉쇊쇋쇍",
		6,
		"쇕쇖쇙",
		6,
		"쇡쇢쇣쇥쇦쇧쇩",
		6,
		"쇲쇴",
		7,
		"쇾쇿숁숂숃숅",
		6,
		"숎숐숒",
		5,
		"숚숛숝숞숡숢숣"
	],
	[
		"9a41",
		"숤숥숦숧숪숬숮숰숳숵",
		16
	],
	[
		"9a61",
		"쉆쉇쉉",
		6,
		"쉒쉓쉕쉖쉗쉙",
		6,
		"쉡쉢쉣쉤쉦"
	],
	[
		"9a81",
		"쉧",
		4,
		"쉮쉯쉱쉲쉳쉵",
		6,
		"쉾슀슂",
		5,
		"슊",
		5,
		"슑",
		6,
		"슙슚슜슞",
		5,
		"슦슧슩슪슫슮",
		5,
		"슶슸슺",
		33,
		"싞싟싡싢싥",
		5,
		"싮싰싲싳싴싵싷싺싽싾싿쌁",
		6,
		"쌊쌋쌎쌏"
	],
	[
		"9b41",
		"쌐쌑쌒쌖쌗쌙쌚쌛쌝",
		6,
		"쌦쌧쌪",
		8
	],
	[
		"9b61",
		"쌳",
		17,
		"썆",
		7
	],
	[
		"9b81",
		"썎",
		25,
		"썪썫썭썮썯썱썳",
		4,
		"썺썻썾",
		5,
		"쎅쎆쎇쎉쎊쎋쎍",
		50,
		"쏁",
		22,
		"쏚"
	],
	[
		"9c41",
		"쏛쏝쏞쏡쏣",
		4,
		"쏪쏫쏬쏮",
		5,
		"쏶쏷쏹",
		5
	],
	[
		"9c61",
		"쏿",
		8,
		"쐉",
		6,
		"쐑",
		9
	],
	[
		"9c81",
		"쐛",
		8,
		"쐥",
		6,
		"쐭쐮쐯쐱쐲쐳쐵",
		6,
		"쐾",
		9,
		"쑉",
		26,
		"쑦쑧쑩쑪쑫쑭",
		6,
		"쑶쑷쑸쑺",
		5,
		"쒁",
		18,
		"쒕",
		6,
		"쒝",
		12
	],
	[
		"9d41",
		"쒪",
		13,
		"쒹쒺쒻쒽",
		8
	],
	[
		"9d61",
		"쓆",
		25
	],
	[
		"9d81",
		"쓠",
		8,
		"쓪",
		5,
		"쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
		9,
		"씍씎씏씑씒씓씕",
		6,
		"씝",
		10,
		"씪씫씭씮씯씱",
		6,
		"씺씼씾",
		5,
		"앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
		6,
		"앲앶",
		5,
		"앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
	],
	[
		"9e41",
		"얖얙얚얛얝얞얟얡",
		7,
		"얪",
		9,
		"얶"
	],
	[
		"9e61",
		"얷얺얿",
		4,
		"엋엍엏엒엓엕엖엗엙",
		6,
		"엢엤엦엧"
	],
	[
		"9e81",
		"엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
		6,
		"옚옝",
		6,
		"옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
		6,
		"왒왖",
		5,
		"왞왟왡",
		10,
		"왭왮왰왲",
		5,
		"왺왻왽왾왿욁",
		6,
		"욊욌욎",
		5,
		"욖욗욙욚욛욝",
		6,
		"욦"
	],
	[
		"9f41",
		"욨욪",
		5,
		"욲욳욵욶욷욻",
		4,
		"웂웄웆",
		5,
		"웎"
	],
	[
		"9f61",
		"웏웑웒웓웕",
		6,
		"웞웟웢",
		5,
		"웪웫웭웮웯웱웲"
	],
	[
		"9f81",
		"웳",
		4,
		"웺웻웼웾",
		5,
		"윆윇윉윊윋윍",
		6,
		"윖윘윚",
		5,
		"윢윣윥윦윧윩",
		6,
		"윲윴윶윸윹윺윻윾윿읁읂읃읅",
		4,
		"읋읎읐읙읚읛읝읞읟읡",
		6,
		"읩읪읬",
		7,
		"읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
		4,
		"잢잧",
		4,
		"잮잯잱잲잳잵잶잷"
	],
	[
		"a041",
		"잸잹잺잻잾쟂",
		5,
		"쟊쟋쟍쟏쟑",
		6,
		"쟙쟚쟛쟜"
	],
	[
		"a061",
		"쟞",
		5,
		"쟥쟦쟧쟩쟪쟫쟭",
		13
	],
	[
		"a081",
		"쟻",
		4,
		"젂젃젅젆젇젉젋",
		4,
		"젒젔젗",
		4,
		"젞젟젡젢젣젥",
		6,
		"젮젰젲",
		5,
		"젹젺젻젽젾젿졁",
		6,
		"졊졋졎",
		5,
		"졕",
		26,
		"졲졳졵졶졷졹졻",
		4,
		"좂좄좈좉좊좎",
		5,
		"좕",
		7,
		"좞좠좢좣좤"
	],
	[
		"a141",
		"좥좦좧좩",
		18,
		"좾좿죀죁"
	],
	[
		"a161",
		"죂죃죅죆죇죉죊죋죍",
		6,
		"죖죘죚",
		5,
		"죢죣죥"
	],
	[
		"a181",
		"죦",
		14,
		"죶",
		5,
		"죾죿줁줂줃줇",
		4,
		"줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
		9,
		"±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
	],
	[
		"a241",
		"줐줒",
		5,
		"줙",
		18
	],
	[
		"a261",
		"줭",
		6,
		"줵",
		18
	],
	[
		"a281",
		"쥈",
		7,
		"쥒쥓쥕쥖쥗쥙",
		6,
		"쥢쥤",
		7,
		"쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
	],
	[
		"a341",
		"쥱쥲쥳쥵",
		6,
		"쥽",
		10,
		"즊즋즍즎즏"
	],
	[
		"a361",
		"즑",
		6,
		"즚즜즞",
		16
	],
	[
		"a381",
		"즯",
		16,
		"짂짃짅짆짉짋",
		4,
		"짒짔짗짘짛！",
		58,
		"￦］",
		32,
		"￣"
	],
	[
		"a441",
		"짞짟짡짣짥짦짨짩짪짫짮짲",
		5,
		"짺짻짽짾짿쨁쨂쨃쨄"
	],
	[
		"a461",
		"쨅쨆쨇쨊쨎",
		5,
		"쨕쨖쨗쨙",
		12
	],
	[
		"a481",
		"쨦쨧쨨쨪",
		28,
		"ㄱ",
		93
	],
	[
		"a541",
		"쩇",
		4,
		"쩎쩏쩑쩒쩓쩕",
		6,
		"쩞쩢",
		5,
		"쩩쩪"
	],
	[
		"a561",
		"쩫",
		17,
		"쩾",
		5,
		"쪅쪆"
	],
	[
		"a581",
		"쪇",
		16,
		"쪙",
		14,
		"ⅰ",
		9
	],
	[
		"a5b0",
		"Ⅰ",
		9
	],
	[
		"a5c1",
		"Α",
		16,
		"Σ",
		6
	],
	[
		"a5e1",
		"α",
		16,
		"σ",
		6
	],
	[
		"a641",
		"쪨",
		19,
		"쪾쪿쫁쫂쫃쫅"
	],
	[
		"a661",
		"쫆",
		5,
		"쫎쫐쫒쫔쫕쫖쫗쫚",
		5,
		"쫡",
		6
	],
	[
		"a681",
		"쫨쫩쫪쫫쫭",
		6,
		"쫵",
		18,
		"쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
		7
	],
	[
		"a741",
		"쬋",
		4,
		"쬑쬒쬓쬕쬖쬗쬙",
		6,
		"쬢",
		7
	],
	[
		"a761",
		"쬪",
		22,
		"쭂쭃쭄"
	],
	[
		"a781",
		"쭅쭆쭇쭊쭋쭍쭎쭏쭑",
		6,
		"쭚쭛쭜쭞",
		5,
		"쭥",
		7,
		"㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
		9,
		"㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
		9,
		"㎀",
		4,
		"㎺",
		5,
		"㎐",
		4,
		"Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
	],
	[
		"a841",
		"쭭",
		10,
		"쭺",
		14
	],
	[
		"a861",
		"쮉",
		18,
		"쮝",
		6
	],
	[
		"a881",
		"쮤",
		19,
		"쮹",
		11,
		"ÆÐªĦ"
	],
	[
		"a8a6",
		"Ĳ"
	],
	[
		"a8a8",
		"ĿŁØŒºÞŦŊ"
	],
	[
		"a8b1",
		"㉠",
		27,
		"ⓐ",
		25,
		"①",
		14,
		"½⅓⅔¼¾⅛⅜⅝⅞"
	],
	[
		"a941",
		"쯅",
		14,
		"쯕",
		10
	],
	[
		"a961",
		"쯠쯡쯢쯣쯥쯦쯨쯪",
		18
	],
	[
		"a981",
		"쯽",
		14,
		"찎찏찑찒찓찕",
		6,
		"찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
		27,
		"⒜",
		25,
		"⑴",
		14,
		"¹²³⁴ⁿ₁₂₃₄"
	],
	[
		"aa41",
		"찥찦찪찫찭찯찱",
		6,
		"찺찿",
		4,
		"챆챇챉챊챋챍챎"
	],
	[
		"aa61",
		"챏",
		4,
		"챖챚",
		5,
		"챡챢챣챥챧챩",
		6,
		"챱챲"
	],
	[
		"aa81",
		"챳챴챶",
		29,
		"ぁ",
		82
	],
	[
		"ab41",
		"첔첕첖첗첚첛첝첞첟첡",
		6,
		"첪첮",
		5,
		"첶첷첹"
	],
	[
		"ab61",
		"첺첻첽",
		6,
		"쳆쳈쳊",
		5,
		"쳑쳒쳓쳕",
		5
	],
	[
		"ab81",
		"쳛",
		8,
		"쳥",
		6,
		"쳭쳮쳯쳱",
		12,
		"ァ",
		85
	],
	[
		"ac41",
		"쳾쳿촀촂",
		5,
		"촊촋촍촎촏촑",
		6,
		"촚촜촞촟촠"
	],
	[
		"ac61",
		"촡촢촣촥촦촧촩촪촫촭",
		11,
		"촺",
		4
	],
	[
		"ac81",
		"촿",
		28,
		"쵝쵞쵟А",
		5,
		"ЁЖ",
		25
	],
	[
		"acd1",
		"а",
		5,
		"ёж",
		25
	],
	[
		"ad41",
		"쵡쵢쵣쵥",
		6,
		"쵮쵰쵲",
		5,
		"쵹",
		7
	],
	[
		"ad61",
		"춁",
		6,
		"춉",
		10,
		"춖춗춙춚춛춝춞춟"
	],
	[
		"ad81",
		"춠춡춢춣춦춨춪",
		5,
		"춱",
		18,
		"췅"
	],
	[
		"ae41",
		"췆",
		5,
		"췍췎췏췑",
		16
	],
	[
		"ae61",
		"췢",
		5,
		"췩췪췫췭췮췯췱",
		6,
		"췺췼췾",
		4
	],
	[
		"ae81",
		"츃츅츆츇츉츊츋츍",
		6,
		"츕츖츗츘츚",
		5,
		"츢츣츥츦츧츩츪츫"
	],
	[
		"af41",
		"츬츭츮츯츲츴츶",
		19
	],
	[
		"af61",
		"칊",
		13,
		"칚칛칝칞칢",
		5,
		"칪칬"
	],
	[
		"af81",
		"칮",
		5,
		"칶칷칹칺칻칽",
		6,
		"캆캈캊",
		5,
		"캒캓캕캖캗캙"
	],
	[
		"b041",
		"캚",
		5,
		"캢캦",
		5,
		"캮",
		12
	],
	[
		"b061",
		"캻",
		5,
		"컂",
		19
	],
	[
		"b081",
		"컖",
		13,
		"컦컧컩컪컭",
		6,
		"컶컺",
		5,
		"가각간갇갈갉갊감",
		7,
		"같",
		4,
		"갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
	],
	[
		"b141",
		"켂켃켅켆켇켉",
		6,
		"켒켔켖",
		5,
		"켝켞켟켡켢켣"
	],
	[
		"b161",
		"켥",
		6,
		"켮켲",
		5,
		"켹",
		11
	],
	[
		"b181",
		"콅",
		14,
		"콖콗콙콚콛콝",
		6,
		"콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
	],
	[
		"b241",
		"콭콮콯콲콳콵콶콷콹",
		6,
		"쾁쾂쾃쾄쾆",
		5,
		"쾍"
	],
	[
		"b261",
		"쾎",
		18,
		"쾢",
		5,
		"쾩"
	],
	[
		"b281",
		"쾪",
		5,
		"쾱",
		18,
		"쿅",
		6,
		"깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
	],
	[
		"b341",
		"쿌",
		19,
		"쿢쿣쿥쿦쿧쿩"
	],
	[
		"b361",
		"쿪",
		5,
		"쿲쿴쿶",
		5,
		"쿽쿾쿿퀁퀂퀃퀅",
		5
	],
	[
		"b381",
		"퀋",
		5,
		"퀒",
		5,
		"퀙",
		19,
		"끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
		4,
		"낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
	],
	[
		"b441",
		"퀮",
		5,
		"퀶퀷퀹퀺퀻퀽",
		6,
		"큆큈큊",
		5
	],
	[
		"b461",
		"큑큒큓큕큖큗큙",
		6,
		"큡",
		10,
		"큮큯"
	],
	[
		"b481",
		"큱큲큳큵",
		6,
		"큾큿킀킂",
		18,
		"뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
		4,
		"닳담답닷",
		4,
		"닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
	],
	[
		"b541",
		"킕",
		14,
		"킦킧킩킪킫킭",
		5
	],
	[
		"b561",
		"킳킶킸킺",
		5,
		"탂탃탅탆탇탊",
		5,
		"탒탖",
		4
	],
	[
		"b581",
		"탛탞탟탡탢탣탥",
		6,
		"탮탲",
		5,
		"탹",
		11,
		"덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
	],
	[
		"b641",
		"턅",
		7,
		"턎",
		17
	],
	[
		"b661",
		"턠",
		15,
		"턲턳턵턶턷턹턻턼턽턾"
	],
	[
		"b681",
		"턿텂텆",
		5,
		"텎텏텑텒텓텕",
		6,
		"텞텠텢",
		5,
		"텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
	],
	[
		"b741",
		"텮",
		13,
		"텽",
		6,
		"톅톆톇톉톊"
	],
	[
		"b761",
		"톋",
		20,
		"톢톣톥톦톧"
	],
	[
		"b781",
		"톩",
		6,
		"톲톴톶톷톸톹톻톽톾톿퇁",
		14,
		"래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
	],
	[
		"b841",
		"퇐",
		7,
		"퇙",
		17
	],
	[
		"b861",
		"퇫",
		8,
		"퇵퇶퇷퇹",
		13
	],
	[
		"b881",
		"툈툊",
		5,
		"툑",
		24,
		"륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
		4,
		"맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
	],
	[
		"b941",
		"툪툫툮툯툱툲툳툵",
		6,
		"툾퉀퉂",
		5,
		"퉉퉊퉋퉌"
	],
	[
		"b961",
		"퉍",
		14,
		"퉝",
		6,
		"퉥퉦퉧퉨"
	],
	[
		"b981",
		"퉩",
		22,
		"튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
		4,
		"받",
		4,
		"밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
	],
	[
		"ba41",
		"튍튎튏튒튓튔튖",
		5,
		"튝튞튟튡튢튣튥",
		6,
		"튭"
	],
	[
		"ba61",
		"튮튯튰튲",
		5,
		"튺튻튽튾틁틃",
		4,
		"틊틌",
		5
	],
	[
		"ba81",
		"틒틓틕틖틗틙틚틛틝",
		6,
		"틦",
		9,
		"틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
	],
	[
		"bb41",
		"틻",
		4,
		"팂팄팆",
		5,
		"팏팑팒팓팕팗",
		4,
		"팞팢팣"
	],
	[
		"bb61",
		"팤팦팧팪팫팭팮팯팱",
		6,
		"팺팾",
		5,
		"퍆퍇퍈퍉"
	],
	[
		"bb81",
		"퍊",
		31,
		"빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
	],
	[
		"bc41",
		"퍪",
		17,
		"퍾퍿펁펂펃펅펆펇"
	],
	[
		"bc61",
		"펈펉펊펋펎펒",
		5,
		"펚펛펝펞펟펡",
		6,
		"펪펬펮"
	],
	[
		"bc81",
		"펯",
		4,
		"펵펶펷펹펺펻펽",
		6,
		"폆폇폊",
		5,
		"폑",
		5,
		"샥샨샬샴샵샷샹섀섄섈섐섕서",
		4,
		"섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
	],
	[
		"bd41",
		"폗폙",
		7,
		"폢폤",
		7,
		"폮폯폱폲폳폵폶폷"
	],
	[
		"bd61",
		"폸폹폺폻폾퐀퐂",
		5,
		"퐉",
		13
	],
	[
		"bd81",
		"퐗",
		5,
		"퐞",
		25,
		"숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
	],
	[
		"be41",
		"퐸",
		7,
		"푁푂푃푅",
		14
	],
	[
		"be61",
		"푔",
		7,
		"푝푞푟푡푢푣푥",
		7,
		"푮푰푱푲"
	],
	[
		"be81",
		"푳",
		4,
		"푺푻푽푾풁풃",
		4,
		"풊풌풎",
		5,
		"풕",
		8,
		"쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
		6,
		"엌엎"
	],
	[
		"bf41",
		"풞",
		10,
		"풪",
		14
	],
	[
		"bf61",
		"풹",
		18,
		"퓍퓎퓏퓑퓒퓓퓕"
	],
	[
		"bf81",
		"퓖",
		5,
		"퓝퓞퓠",
		7,
		"퓩퓪퓫퓭퓮퓯퓱",
		6,
		"퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
		5,
		"옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
	],
	[
		"c041",
		"퓾",
		5,
		"픅픆픇픉픊픋픍",
		6,
		"픖픘",
		5
	],
	[
		"c061",
		"픞",
		25
	],
	[
		"c081",
		"픸픹픺픻픾픿핁핂핃핅",
		6,
		"핎핐핒",
		5,
		"핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
		7,
		"읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
	],
	[
		"c141",
		"핤핦핧핪핬핮",
		5,
		"핶핷핹핺핻핽",
		6,
		"햆햊햋"
	],
	[
		"c161",
		"햌햍햎햏햑",
		19,
		"햦햧"
	],
	[
		"c181",
		"햨",
		31,
		"점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
	],
	[
		"c241",
		"헊헋헍헎헏헑헓",
		4,
		"헚헜헞",
		5,
		"헦헧헩헪헫헭헮"
	],
	[
		"c261",
		"헯",
		4,
		"헶헸헺",
		5,
		"혂혃혅혆혇혉",
		6,
		"혒"
	],
	[
		"c281",
		"혖",
		5,
		"혝혞혟혡혢혣혥",
		7,
		"혮",
		9,
		"혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
	],
	[
		"c341",
		"혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
		4
	],
	[
		"c361",
		"홢",
		4,
		"홨홪",
		5,
		"홲홳홵",
		11
	],
	[
		"c381",
		"횁횂횄횆",
		5,
		"횎횏횑횒횓횕",
		7,
		"횞횠횢",
		5,
		"횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
	],
	[
		"c441",
		"횫횭횮횯횱",
		7,
		"횺횼",
		7,
		"훆훇훉훊훋"
	],
	[
		"c461",
		"훍훎훏훐훒훓훕훖훘훚",
		5,
		"훡훢훣훥훦훧훩",
		4
	],
	[
		"c481",
		"훮훯훱훲훳훴훶",
		5,
		"훾훿휁휂휃휅",
		11,
		"휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
	],
	[
		"c541",
		"휕휖휗휚휛휝휞휟휡",
		6,
		"휪휬휮",
		5,
		"휶휷휹"
	],
	[
		"c561",
		"휺휻휽",
		6,
		"흅흆흈흊",
		5,
		"흒흓흕흚",
		4
	],
	[
		"c581",
		"흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
		6,
		"흾흿힀힂",
		5,
		"힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
	],
	[
		"c641",
		"힍힎힏힑",
		6,
		"힚힜힞",
		5
	],
	[
		"c6a1",
		"퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
	],
	[
		"c7a1",
		"퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
	],
	[
		"c8a1",
		"혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
	],
	[
		"caa1",
		"伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
	],
	[
		"cba1",
		"匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
	],
	[
		"cca1",
		"瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
	],
	[
		"cda1",
		"棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
	],
	[
		"cea1",
		"科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
	],
	[
		"cfa1",
		"區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
	],
	[
		"d0a1",
		"鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
	],
	[
		"d1a1",
		"朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
		5,
		"那樂",
		4,
		"諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
	],
	[
		"d2a1",
		"納臘蠟衲囊娘廊",
		4,
		"乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
		5,
		"駑魯",
		10,
		"濃籠聾膿農惱牢磊腦賂雷尿壘",
		7,
		"嫩訥杻紐勒",
		5,
		"能菱陵尼泥匿溺多茶"
	],
	[
		"d3a1",
		"丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
	],
	[
		"d4a1",
		"棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
	],
	[
		"d5a1",
		"蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
	],
	[
		"d6a1",
		"煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
	],
	[
		"d7a1",
		"遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
	],
	[
		"d8a1",
		"立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
	],
	[
		"d9a1",
		"蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
	],
	[
		"daa1",
		"汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
	],
	[
		"dba1",
		"發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
	],
	[
		"dca1",
		"碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
	],
	[
		"dda1",
		"孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
	],
	[
		"dea1",
		"脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
	],
	[
		"dfa1",
		"傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
	],
	[
		"e0a1",
		"胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
	],
	[
		"e1a1",
		"聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
	],
	[
		"e2a1",
		"戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
	],
	[
		"e3a1",
		"嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
	],
	[
		"e4a1",
		"沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
	],
	[
		"e5a1",
		"櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
	],
	[
		"e6a1",
		"旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
	],
	[
		"e7a1",
		"簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
	],
	[
		"e8a1",
		"烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
	],
	[
		"e9a1",
		"窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
	],
	[
		"eaa1",
		"運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
	],
	[
		"eba1",
		"濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
	],
	[
		"eca1",
		"議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
	],
	[
		"eda1",
		"立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
	],
	[
		"eea1",
		"障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
	],
	[
		"efa1",
		"煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
	],
	[
		"f0a1",
		"靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
	],
	[
		"f1a1",
		"踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
	],
	[
		"f2a1",
		"咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
	],
	[
		"f3a1",
		"鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
	],
	[
		"f4a1",
		"責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
	],
	[
		"f5a1",
		"椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
	],
	[
		"f6a1",
		"贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
	],
	[
		"f7a1",
		"鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
	],
	[
		"f8a1",
		"阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
	],
	[
		"f9a1",
		"品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
	],
	[
		"faa1",
		"行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
	],
	[
		"fba1",
		"形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
	],
	[
		"fca1",
		"禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
	],
	[
		"fda1",
		"爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
	]
];

var require$$6 = [
	[
		"0",
		"\u0000",
		127
	],
	[
		"a140",
		"　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
	],
	[
		"a1a1",
		"﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
		4,
		"～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
	],
	[
		"a240",
		"＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
		7,
		"▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
	],
	[
		"a2a1",
		"╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
		9,
		"Ⅰ",
		9,
		"〡",
		8,
		"十卄卅Ａ",
		25,
		"ａ",
		21
	],
	[
		"a340",
		"ｗｘｙｚΑ",
		16,
		"Σ",
		6,
		"α",
		16,
		"σ",
		6,
		"ㄅ",
		10
	],
	[
		"a3a1",
		"ㄐ",
		25,
		"˙ˉˊˇˋ"
	],
	[
		"a3e1",
		"€"
	],
	[
		"a440",
		"一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
	],
	[
		"a4a1",
		"丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
	],
	[
		"a540",
		"世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
	],
	[
		"a5a1",
		"央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
	],
	[
		"a640",
		"共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
	],
	[
		"a6a1",
		"式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
	],
	[
		"a740",
		"作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
	],
	[
		"a7a1",
		"均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
	],
	[
		"a840",
		"杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
	],
	[
		"a8a1",
		"芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
	],
	[
		"a940",
		"咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
	],
	[
		"a9a1",
		"屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
	],
	[
		"aa40",
		"昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
	],
	[
		"aaa1",
		"炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
	],
	[
		"ab40",
		"陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
	],
	[
		"aba1",
		"哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
	],
	[
		"ac40",
		"拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
	],
	[
		"aca1",
		"活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
	],
	[
		"ad40",
		"耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
	],
	[
		"ada1",
		"迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
	],
	[
		"ae40",
		"哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
	],
	[
		"aea1",
		"恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
	],
	[
		"af40",
		"浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
	],
	[
		"afa1",
		"砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
	],
	[
		"b040",
		"虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
	],
	[
		"b0a1",
		"陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
	],
	[
		"b140",
		"娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
	],
	[
		"b1a1",
		"情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
	],
	[
		"b240",
		"毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
	],
	[
		"b2a1",
		"瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
	],
	[
		"b340",
		"莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
	],
	[
		"b3a1",
		"部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
	],
	[
		"b440",
		"婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
	],
	[
		"b4a1",
		"插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
	],
	[
		"b540",
		"溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
	],
	[
		"b5a1",
		"窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
	],
	[
		"b640",
		"詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
	],
	[
		"b6a1",
		"間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
	],
	[
		"b740",
		"媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
	],
	[
		"b7a1",
		"楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
	],
	[
		"b840",
		"睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
	],
	[
		"b8a1",
		"腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
	],
	[
		"b940",
		"辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
	],
	[
		"b9a1",
		"飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
	],
	[
		"ba40",
		"愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
	],
	[
		"baa1",
		"滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
	],
	[
		"bb40",
		"罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
	],
	[
		"bba1",
		"說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
	],
	[
		"bc40",
		"劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
	],
	[
		"bca1",
		"慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
	],
	[
		"bd40",
		"瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
	],
	[
		"bda1",
		"翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
	],
	[
		"be40",
		"輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
	],
	[
		"bea1",
		"鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
	],
	[
		"bf40",
		"濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
	],
	[
		"bfa1",
		"縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
	],
	[
		"c040",
		"錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
	],
	[
		"c0a1",
		"嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
	],
	[
		"c140",
		"瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
	],
	[
		"c1a1",
		"薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
	],
	[
		"c240",
		"駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
	],
	[
		"c2a1",
		"癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
	],
	[
		"c340",
		"鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
	],
	[
		"c3a1",
		"獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
	],
	[
		"c440",
		"願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
	],
	[
		"c4a1",
		"纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
	],
	[
		"c540",
		"護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
	],
	[
		"c5a1",
		"禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
	],
	[
		"c640",
		"讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
	],
	[
		"c940",
		"乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
	],
	[
		"c9a1",
		"氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
	],
	[
		"ca40",
		"汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
	],
	[
		"caa1",
		"吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
	],
	[
		"cb40",
		"杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
	],
	[
		"cba1",
		"芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
	],
	[
		"cc40",
		"坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
	],
	[
		"cca1",
		"怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
	],
	[
		"cd40",
		"泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
	],
	[
		"cda1",
		"矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
	],
	[
		"ce40",
		"哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
	],
	[
		"cea1",
		"峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
	],
	[
		"cf40",
		"柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
	],
	[
		"cfa1",
		"洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
	],
	[
		"d040",
		"穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
	],
	[
		"d0a1",
		"苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
	],
	[
		"d140",
		"唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
	],
	[
		"d1a1",
		"恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
	],
	[
		"d240",
		"毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
	],
	[
		"d2a1",
		"牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
	],
	[
		"d340",
		"笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
	],
	[
		"d3a1",
		"荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
	],
	[
		"d440",
		"酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
	],
	[
		"d4a1",
		"唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
	],
	[
		"d540",
		"崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
	],
	[
		"d5a1",
		"捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
	],
	[
		"d640",
		"淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
	],
	[
		"d6a1",
		"痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
	],
	[
		"d740",
		"耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
	],
	[
		"d7a1",
		"蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
	],
	[
		"d840",
		"釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
	],
	[
		"d8a1",
		"堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
	],
	[
		"d940",
		"惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
	],
	[
		"d9a1",
		"晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
	],
	[
		"da40",
		"湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
	],
	[
		"daa1",
		"琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
	],
	[
		"db40",
		"罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
	],
	[
		"dba1",
		"菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
	],
	[
		"dc40",
		"軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
	],
	[
		"dca1",
		"隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
	],
	[
		"dd40",
		"媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
	],
	[
		"dda1",
		"搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
	],
	[
		"de40",
		"毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
	],
	[
		"dea1",
		"煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
	],
	[
		"df40",
		"稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
	],
	[
		"dfa1",
		"腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
	],
	[
		"e040",
		"觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
	],
	[
		"e0a1",
		"遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
	],
	[
		"e140",
		"凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
	],
	[
		"e1a1",
		"寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
	],
	[
		"e240",
		"榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
	],
	[
		"e2a1",
		"漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
	],
	[
		"e340",
		"禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
	],
	[
		"e3a1",
		"耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
	],
	[
		"e440",
		"裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
	],
	[
		"e4a1",
		"銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
	],
	[
		"e540",
		"噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
	],
	[
		"e5a1",
		"憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
	],
	[
		"e640",
		"澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
	],
	[
		"e6a1",
		"獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
	],
	[
		"e740",
		"膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
	],
	[
		"e7a1",
		"蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
	],
	[
		"e840",
		"踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
	],
	[
		"e8a1",
		"銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
	],
	[
		"e940",
		"噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
	],
	[
		"e9a1",
		"憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
	],
	[
		"ea40",
		"澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
	],
	[
		"eaa1",
		"瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
	],
	[
		"eb40",
		"蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
	],
	[
		"eba1",
		"諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
	],
	[
		"ec40",
		"錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
	],
	[
		"eca1",
		"魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
	],
	[
		"ed40",
		"檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
	],
	[
		"eda1",
		"瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
	],
	[
		"ee40",
		"蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
	],
	[
		"eea1",
		"謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
	],
	[
		"ef40",
		"鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
	],
	[
		"efa1",
		"鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
	],
	[
		"f040",
		"璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
	],
	[
		"f0a1",
		"臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
	],
	[
		"f140",
		"蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
	],
	[
		"f1a1",
		"鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
	],
	[
		"f240",
		"徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
	],
	[
		"f2a1",
		"礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
	],
	[
		"f340",
		"譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
	],
	[
		"f3a1",
		"鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
	],
	[
		"f440",
		"嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
	],
	[
		"f4a1",
		"禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
	],
	[
		"f540",
		"鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
	],
	[
		"f5a1",
		"鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
	],
	[
		"f640",
		"蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
	],
	[
		"f6a1",
		"騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
	],
	[
		"f740",
		"糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
	],
	[
		"f7a1",
		"驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
	],
	[
		"f840",
		"讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
	],
	[
		"f8a1",
		"齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
	],
	[
		"f940",
		"纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
	],
	[
		"f9a1",
		"龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
	]
];

var require$$7 = [
	[
		"8740",
		"䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
	],
	[
		"8767",
		"綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
	],
	[
		"87a1",
		"𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
	],
	[
		"8840",
		"㇀",
		4,
		"𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
	],
	[
		"88a1",
		"ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
	],
	[
		"8940",
		"𪎩𡅅"
	],
	[
		"8943",
		"攊"
	],
	[
		"8946",
		"丽滝鵎釟"
	],
	[
		"894c",
		"𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
	],
	[
		"89a1",
		"琑糼緍楆竉刧"
	],
	[
		"89ab",
		"醌碸酞肼"
	],
	[
		"89b0",
		"贋胶𠧧"
	],
	[
		"89b5",
		"肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
	],
	[
		"89c1",
		"溚舾甙"
	],
	[
		"89c5",
		"䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
	],
	[
		"8a40",
		"𧶄唥"
	],
	[
		"8a43",
		"𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
	],
	[
		"8a64",
		"𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
	],
	[
		"8a76",
		"䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
	],
	[
		"8aa1",
		"𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
	],
	[
		"8aac",
		"䠋𠆩㿺塳𢶍"
	],
	[
		"8ab2",
		"𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
	],
	[
		"8abb",
		"䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
	],
	[
		"8ac9",
		"𪘁𠸉𢫏𢳉"
	],
	[
		"8ace",
		"𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
	],
	[
		"8adf",
		"𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
	],
	[
		"8af6",
		"𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
	],
	[
		"8b40",
		"𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
	],
	[
		"8b55",
		"𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
	],
	[
		"8ba1",
		"𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
	],
	[
		"8bde",
		"𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
	],
	[
		"8c40",
		"倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
	],
	[
		"8ca1",
		"𣏹椙橃𣱣泿"
	],
	[
		"8ca7",
		"爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
	],
	[
		"8cc9",
		"顨杫䉶圽"
	],
	[
		"8cce",
		"藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
	],
	[
		"8ce6",
		"峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
	],
	[
		"8d40",
		"𠮟"
	],
	[
		"8d42",
		"𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
	],
	[
		"8da1",
		"㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
	],
	[
		"8e40",
		"𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
	],
	[
		"8ea1",
		"繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
	],
	[
		"8f40",
		"蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
	],
	[
		"8fa1",
		"𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
	],
	[
		"9040",
		"趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
	],
	[
		"90a1",
		"𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
	],
	[
		"9140",
		"𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
	],
	[
		"91a1",
		"鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
	],
	[
		"9240",
		"𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
	],
	[
		"92a1",
		"働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
	],
	[
		"9340",
		"媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
	],
	[
		"93a1",
		"摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
	],
	[
		"9440",
		"銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
	],
	[
		"94a1",
		"㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
	],
	[
		"9540",
		"𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
	],
	[
		"95a1",
		"衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
	],
	[
		"9640",
		"桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
	],
	[
		"96a1",
		"𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
	],
	[
		"9740",
		"愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
	],
	[
		"97a1",
		"𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
	],
	[
		"9840",
		"𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
	],
	[
		"98a1",
		"咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
	],
	[
		"9940",
		"䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
	],
	[
		"99a1",
		"䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
	],
	[
		"9a40",
		"鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
	],
	[
		"9aa1",
		"黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
	],
	[
		"9b40",
		"𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
	],
	[
		"9b62",
		"𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
	],
	[
		"9ba1",
		"椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
	],
	[
		"9c40",
		"嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
	],
	[
		"9ca1",
		"㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
	],
	[
		"9d40",
		"𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
	],
	[
		"9da1",
		"辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
	],
	[
		"9e40",
		"𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
	],
	[
		"9ea1",
		"鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
	],
	[
		"9ead",
		"𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
	],
	[
		"9ec5",
		"㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
	],
	[
		"9ef5",
		"噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
	],
	[
		"9f40",
		"籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
	],
	[
		"9f4f",
		"凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
	],
	[
		"9fa1",
		"椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
	],
	[
		"9fae",
		"酙隁酜"
	],
	[
		"9fb2",
		"酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
	],
	[
		"9fc1",
		"𤤙盖鮝个𠳔莾衂"
	],
	[
		"9fc9",
		"届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
	],
	[
		"9fdb",
		"歒酼龥鮗頮颴骺麨麄煺笔"
	],
	[
		"9fe7",
		"毺蠘罸"
	],
	[
		"9feb",
		"嘠𪙊蹷齓"
	],
	[
		"9ff0",
		"跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
	],
	[
		"a040",
		"𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
	],
	[
		"a055",
		"𡠻𦸅"
	],
	[
		"a058",
		"詾𢔛"
	],
	[
		"a05b",
		"惽癧髗鵄鍮鮏蟵"
	],
	[
		"a063",
		"蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
	],
	[
		"a073",
		"坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
	],
	[
		"a0a1",
		"嵗𨯂迚𨸹"
	],
	[
		"a0a6",
		"僙𡵆礆匲阸𠼻䁥"
	],
	[
		"a0ae",
		"矾"
	],
	[
		"a0b0",
		"糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
	],
	[
		"a0d4",
		"覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
	],
	[
		"a0e2",
		"罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
	],
	[
		"a3c0",
		"␀",
		31,
		"␡"
	],
	[
		"c6a1",
		"①",
		9,
		"⑴",
		9,
		"ⅰ",
		9,
		"丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
		23
	],
	[
		"c740",
		"す",
		58,
		"ァアィイ"
	],
	[
		"c7a1",
		"ゥ",
		81,
		"А",
		5,
		"ЁЖ",
		4
	],
	[
		"c840",
		"Л",
		26,
		"ёж",
		25,
		"⇧↸↹㇏𠃌乚𠂊刂䒑"
	],
	[
		"c8a1",
		"龰冈龱𧘇"
	],
	[
		"c8cd",
		"￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
	],
	[
		"c8f5",
		"ʃɐɛɔɵœøŋʊɪ"
	],
	[
		"f9fe",
		"￭"
	],
	[
		"fa40",
		"𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
	],
	[
		"faa1",
		"鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
	],
	[
		"fb40",
		"𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
	],
	[
		"fba1",
		"𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
	],
	[
		"fc40",
		"廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
	],
	[
		"fca1",
		"𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
	],
	[
		"fd40",
		"𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
	],
	[
		"fda1",
		"𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
	],
	[
		"fe40",
		"鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
	],
	[
		"fea1",
		"𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
	]
];

// Tables are not require()-d until they are needed to speed up library load.
// require()-s are direct to support Browserify.

var dbcsData = {
  // == Japanese/ShiftJIS ====================================================
  // All japanese encodings are based on JIS X set of standards:
  // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
  // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
  //              Has several variations in 1978, 1983, 1990 and 1997.
  // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
  // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
  //              2 planes, first is superset of 0208, second - revised 0212.
  //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)
  // Byte encodings are:
  //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
  //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
  //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
  //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
  //               0x00-0x7F       - lower part of 0201
  //               0x8E, 0xA1-0xDF - upper part of 0201
  //               (0xA1-0xFE)x2   - 0208 plane (94x94).
  //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
  //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
  //               Used as-is in ISO2022 family.
  //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
  //                0201-1976 Roman, 0208-1978, 0208-1983.
  //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
  //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
  //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
  //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
  //
  // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
  //
  // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html
  'shiftjis': {
    type: '_dbcs',
    table: function () {
      return require$$0;
    },
    encodeAdd: {
      '\u00a5': 0x5C,
      '\u203E': 0x7E
    },
    encodeSkipVals: [{
      from: 0xED40,
      to: 0xF940
    }]
  },
  'csshiftjis': 'shiftjis',
  'mskanji': 'shiftjis',
  'sjis': 'shiftjis',
  'windows31j': 'shiftjis',
  'ms31j': 'shiftjis',
  'xsjis': 'shiftjis',
  'windows932': 'shiftjis',
  'ms932': 'shiftjis',
  '932': 'shiftjis',
  'cp932': 'shiftjis',
  'eucjp': {
    type: '_dbcs',
    table: function () {
      return require$$1;
    },
    encodeAdd: {
      '\u00a5': 0x5C,
      '\u203E': 0x7E
    }
  },
  // TODO: KDDI extension to Shift_JIS
  // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
  // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.
  // == Chinese/GBK ==========================================================
  // http://en.wikipedia.org/wiki/GBK
  // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder
  // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
  'gb2312': 'cp936',
  'gb231280': 'cp936',
  'gb23121980': 'cp936',
  'csgb2312': 'cp936',
  'csiso58gb231280': 'cp936',
  'euccn': 'cp936',
  // Microsoft's CP936 is a subset and approximation of GBK.
  'windows936': 'cp936',
  'ms936': 'cp936',
  '936': 'cp936',
  'cp936': {
    type: '_dbcs',
    table: function () {
      return require$$2;
    }
  },
  // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
  'gbk': {
    type: '_dbcs',
    table: function () {
      return require$$2.concat(require$$3);
    }
  },
  'xgbk': 'gbk',
  'isoir58': 'gbk',
  // GB18030 is an algorithmic extension of GBK.
  // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
  // http://icu-project.org/docs/papers/gb18030.html
  // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
  // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
  'gb18030': {
    type: '_dbcs',
    table: function () {
      return require$$2.concat(require$$3);
    },
    gb18030: function () {
      return require$$4;
    },
    encodeSkipVals: [0x80],
    encodeAdd: {
      '€': 0xA2E3
    }
  },
  'chinese': 'gb18030',
  // == Korean ===============================================================
  // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
  'windows949': 'cp949',
  'ms949': 'cp949',
  '949': 'cp949',
  'cp949': {
    type: '_dbcs',
    table: function () {
      return require$$5;
    }
  },
  'cseuckr': 'cp949',
  'csksc56011987': 'cp949',
  'euckr': 'cp949',
  'isoir149': 'cp949',
  'korean': 'cp949',
  'ksc56011987': 'cp949',
  'ksc56011989': 'cp949',
  'ksc5601': 'cp949',
  // == Big5/Taiwan/Hong Kong ================================================
  // There are lots of tables for Big5 and cp950. Please see the following links for history:
  // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
  // Variations, in roughly number of defined chars:
  //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
  //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
  //  * Big5-2003 (Taiwan standard) almost superset of cp950.
  //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
  //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
  //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
  //    Plus, it has 4 combining sequences.
  //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
  //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
  //    Implementations are not consistent within browsers; sometimes labeled as just big5.
  //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
  //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
  //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
  //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
  //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
  // 
  // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
  // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.
  'windows950': 'cp950',
  'ms950': 'cp950',
  '950': 'cp950',
  'cp950': {
    type: '_dbcs',
    table: function () {
      return require$$6;
    }
  },
  // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
  'big5': 'big5hkscs',
  'big5hkscs': {
    type: '_dbcs',
    table: function () {
      return require$$6.concat(require$$7);
    },
    encodeSkipVals: [0xa2cc]
  },
  'cnbig5': 'big5hkscs',
  'csbig5': 'big5hkscs',
  'xxbig5': 'big5hkscs'
};

var encodings = createCommonjsModule(function (module, exports) {
// We support Browserify by skipping automatic module discovery and requiring modules directly.

var modules = [internal, utf32, utf16, utf7, sbcsCodec, sbcsData, sbcsDataGenerated, dbcsCodec, dbcsData]; // Put all encoding/alias/codec definitions to single object and export it.

for (var i = 0; i < modules.length; i++) {
  var module = modules[i];

  for (var enc in module) if (Object.prototype.hasOwnProperty.call(module, enc)) exports[enc] = module[enc];
}
});

var Buffer$8 = safer_1.Buffer; // NOTE: Due to 'stream' module being pretty large (~100Kb, significant in browser environments), 
// we opt to dependency-inject it instead of creating a hard dependency.


var streams = function (stream_module) {
  var Transform = stream_module.Transform; // == Encoder stream =======================================================

  function IconvLiteEncoderStream(conv, options) {
    this.conv = conv;
    options = options || {};
    options.decodeStrings = false; // We accept only strings, so we don't need to decode them.

    Transform.call(this, options);
  }

  IconvLiteEncoderStream.prototype = Object.create(Transform.prototype, {
    constructor: {
      value: IconvLiteEncoderStream
    }
  });

  IconvLiteEncoderStream.prototype._transform = function (chunk, encoding, done) {
    if (typeof chunk != 'string') return done(new Error("Iconv encoding stream needs strings as its input."));

    try {
      var res = this.conv.write(chunk);
      if (res && res.length) this.push(res);
      done();
    } catch (e) {
      done(e);
    }
  };

  IconvLiteEncoderStream.prototype._flush = function (done) {
    try {
      var res = this.conv.end();
      if (res && res.length) this.push(res);
      done();
    } catch (e) {
      done(e);
    }
  };

  IconvLiteEncoderStream.prototype.collect = function (cb) {
    var chunks = [];
    this.on('error', cb);
    this.on('data', function (chunk) {
      chunks.push(chunk);
    });
    this.on('end', function () {
      cb(null, Buffer$8.concat(chunks));
    });
    return this;
  }; // == Decoder stream =======================================================


  function IconvLiteDecoderStream(conv, options) {
    this.conv = conv;
    options = options || {};
    options.encoding = this.encoding = 'utf8'; // We output strings.

    Transform.call(this, options);
  }

  IconvLiteDecoderStream.prototype = Object.create(Transform.prototype, {
    constructor: {
      value: IconvLiteDecoderStream
    }
  });

  IconvLiteDecoderStream.prototype._transform = function (chunk, encoding, done) {
    if (!Buffer$8.isBuffer(chunk) && !(chunk instanceof Uint8Array)) return done(new Error("Iconv decoding stream needs buffers as its input."));

    try {
      var res = this.conv.write(chunk);
      if (res && res.length) this.push(res, this.encoding);
      done();
    } catch (e) {
      done(e);
    }
  };

  IconvLiteDecoderStream.prototype._flush = function (done) {
    try {
      var res = this.conv.end();
      if (res && res.length) this.push(res, this.encoding);
      done();
    } catch (e) {
      done(e);
    }
  };

  IconvLiteDecoderStream.prototype.collect = function (cb) {
    var res = '';
    this.on('error', cb);
    this.on('data', function (chunk) {
      res += chunk;
    });
    this.on('end', function () {
      cb(null, res);
    });
    return this;
  };

  return {
    IconvLiteEncoderStream: IconvLiteEncoderStream,
    IconvLiteDecoderStream: IconvLiteDecoderStream
  };
};

var lib = createCommonjsModule(function (module) {

var Buffer = safer_1.Buffer;

var iconv = module.exports; // All codecs and aliases are kept here, keyed by encoding name/alias.
// They are lazy loaded in `iconv.getCodec` from `encodings/index.js`.


iconv.encodings = null; // Characters emitted in case of error.

iconv.defaultCharUnicode = '�';
iconv.defaultCharSingleByte = '?'; // Public API.

iconv.encode = function encode(str, encoding, options) {
  str = "" + (str || ""); // Ensure string.

  var encoder = iconv.getEncoder(encoding, options);
  var res = encoder.write(str);
  var trail = encoder.end();
  return trail && trail.length > 0 ? Buffer.concat([res, trail]) : res;
};

iconv.decode = function decode(buf, encoding, options) {
  if (typeof buf === 'string') {
    if (!iconv.skipDecodeWarning) {
      console.error('Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding');
      iconv.skipDecodeWarning = true;
    }

    buf = Buffer.from("" + (buf || ""), "binary"); // Ensure buffer.
  }

  var decoder = iconv.getDecoder(encoding, options);
  var res = decoder.write(buf);
  var trail = decoder.end();
  return trail ? res + trail : res;
};

iconv.encodingExists = function encodingExists(enc) {
  try {
    iconv.getCodec(enc);
    return true;
  } catch (e) {
    return false;
  }
}; // Legacy aliases to convert functions


iconv.toEncoding = iconv.encode;
iconv.fromEncoding = iconv.decode; // Search for a codec in iconv.encodings. Cache codec data in iconv._codecDataCache.

iconv._codecDataCache = {};

iconv.getCodec = function getCodec(encoding) {
  if (!iconv.encodings) iconv.encodings = encodings; // Lazy load all encoding definitions.
  // Canonicalize encoding name: strip all non-alphanumeric chars and appended year.

  var enc = iconv._canonicalizeEncoding(encoding); // Traverse iconv.encodings to find actual codec.


  var codecOptions = {};

  while (true) {
    var codec = iconv._codecDataCache[enc];
    if (codec) return codec;
    var codecDef = iconv.encodings[enc];

    switch (typeof codecDef) {
      case "string":
        // Direct alias to other encoding.
        enc = codecDef;
        break;

      case "object":
        // Alias with options. Can be layered.
        for (var key in codecDef) codecOptions[key] = codecDef[key];

        if (!codecOptions.encodingName) codecOptions.encodingName = enc;
        enc = codecDef.type;
        break;

      case "function":
        // Codec itself.
        if (!codecOptions.encodingName) codecOptions.encodingName = enc; // The codec function must load all tables and return object with .encoder and .decoder methods.
        // It'll be called only once (for each different options object).

        codec = new codecDef(codecOptions, iconv);
        iconv._codecDataCache[codecOptions.encodingName] = codec; // Save it to be reused later.

        return codec;

      default:
        throw new Error("Encoding not recognized: '" + encoding + "' (searched as: '" + enc + "')");
    }
  }
};

iconv._canonicalizeEncoding = function (encoding) {
  // Canonicalize encoding name: strip all non-alphanumeric chars and appended year.
  return ('' + encoding).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
};

iconv.getEncoder = function getEncoder(encoding, options) {
  var codec = iconv.getCodec(encoding),
      encoder = new codec.encoder(options, codec);
  if (codec.bomAware && options && options.addBOM) encoder = new bomHandling.PrependBOM(encoder, options);
  return encoder;
};

iconv.getDecoder = function getDecoder(encoding, options) {
  var codec = iconv.getCodec(encoding),
      decoder = new codec.decoder(options, codec);
  if (codec.bomAware && !(options && options.stripBOM === false)) decoder = new bomHandling.StripBOM(decoder, options);
  return decoder;
}; // Streaming API
// NOTE: Streaming API naturally depends on 'stream' module from Node.js. Unfortunately in browser environments this module can add
// up to 100Kb to the output bundle. To avoid unnecessary code bloat, we don't enable Streaming API in browser by default.
// If you would like to enable it explicitly, please add the following code to your app:
// > iconv.enableStreamingAPI(require('stream'));


iconv.enableStreamingAPI = function enableStreamingAPI(stream_module) {
  if (iconv.supportsStreams) return; // Dependency-inject stream module to create IconvLite stream classes.

  var streams$1 = streams(stream_module); // Not public API yet, but expose the stream classes.


  iconv.IconvLiteEncoderStream = streams$1.IconvLiteEncoderStream;
  iconv.IconvLiteDecoderStream = streams$1.IconvLiteDecoderStream; // Streaming API.

  iconv.encodeStream = function encodeStream(encoding, options) {
    return new iconv.IconvLiteEncoderStream(iconv.getEncoder(encoding, options), options);
  };

  iconv.decodeStream = function decodeStream(encoding, options) {
    return new iconv.IconvLiteDecoderStream(iconv.getDecoder(encoding, options), options);
  };

  iconv.supportsStreams = true;
}; // Enable Streaming API automatically if 'stream' module is available and non-empty (the majority of environments).


var stream_module;

try {
  stream_module = require$$3$1;
} catch (e) {}

if (stream_module && stream_module.Transform) {
  iconv.enableStreamingAPI(stream_module);
} else {
  // In rare cases where 'stream' module is not available by default, throw a helpful exception.
  iconv.encodeStream = iconv.decodeStream = function () {
    throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.");
  };
}
});

// converted to ES6 from https://www.npmjs.com/package/rfc2047

const qpTokenByOctet = new Array(256);

for (let i = 0; i < 256; i += 1) {
  qpTokenByOctet[i] = `=${i < 16 ? '0' : ''}${i.toString(16).toUpperCase()}`;
}

"!#$%&'*+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\\^`abcdefghijklmnopqrstuvwxyz{|}~".split(/(?:)/).forEach(safeAsciiChar => qpTokenByOctet[safeAsciiChar.charCodeAt(0)] = safeAsciiChar);
qpTokenByOctet[32] = '_'; // Build a regexp for determining whether (part of) a token has to be encoded:

const headerSafeAsciiChars = ' !"#$%&\'()*+-,-./0123456789:;<=>@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
let headerUnsafeAsciiChars = '';

for (let i = 0; i < 128; i += 1) {
  const ch = String.fromCharCode(i);

  if (headerSafeAsciiChars.indexOf(ch) === -1) {
    // O(n^2) but only happens at startup
    headerUnsafeAsciiChars += ch;
  }
}
const unsafeTokenRegExp = new RegExp(`[\u0080-\uffff${quoteCharacterClass(headerUnsafeAsciiChars)}]`); // Very conservative limit to prevent creating an encoded word of more than 72 ascii chars

const replacementCharacterBuffer = Buffer.from('�');

function quoteCharacterClass(chars) {
  return chars.replace(/[\\|^*+?[\]().-]/g, '\\$&');
}

class OneOffEntryId extends Address {
  constructor(email, displayName, addressType = "SMTP", messageFormat = MessageFormat.TextAndHtml, canLookupEmailAddress = false) {
    super(email, displayName, addressType);

    _defineProperty(this, "_messageFormat", void 0);

    _defineProperty(this, "_canLookupEmailAddress", void 0);

    this._messageFormat = messageFormat;
    this._canLookupEmailAddress = canLookupEmailAddress;
  }

  toByteArray() {
    const buf = makeByteBuffer(); // Flags (4 bytes): This value is set to 0x00000000. Bits in this field indicate under what circumstances
    // a short-term EntryID is valid. However, in any EntryID stored in a property value, these 4 bytes are
    // zero, indicating a long-term EntryID.

    buf.writeUint32(0); // ProviderUID (16 bytes): The identifier of the provider that created the EntryID. This value is used to
    // route EntryIDs to the correct provider and MUST be set to %x81.2B.1F.A4.BE.A3.10.19.9D.6E.00.DD.01.0F.54.02.

    buf.append(Uint8Array.from([0x81, 0x2B, 0x1F, 0xA4, 0xBE, 0xA3, 0x10, 0x19, 0x9D, 0x6E, 0x00, 0xDD, 0x01, 0x0F, 0x54, 0x02])); // Version (2 bytes): This value is set to 0x0000.

    buf.writeUint16(0);
    let bits = 0x0000; // Pad(1 bit): (mask 0x8000) Reserved.This value is set to '0'.
    // bits |= 0x00 << 0
    // MAE (2 bits): (mask 0x0C00) The encoding used for Macintosh-specific data attachments, as specified in
    // [MS-OXCMAIL] section 2.1.3.4.3. The values for this field are specified in the following table.
    // Name        | Word value | Field value | Description
    // BinHex        0x0000       b'00'         BinHex encoded.
    // UUENCODE      0x0020       b'01'         UUENCODED.Not valid if the message is in Multipurpose Internet Mail
    //                                          Extensions(MIME) format, in which case the flag will be ignored and
    //                                          BinHex used instead.
    // AppleSingle   0x0040      b'10'          Apple Single encoded.Allowed only when the message format is MIME.
    // AppleDouble   0x0060      b'11'          Apple Double encoded.Allowed only when the message format is MIME.
    // bits |= 0x00 << 1
    // bits |= 0x00 << 2
    // Format (4 bits): (enumeration, mask 0x1E00) The message format desired for this recipient (1), as specified
    // in the following table.
    // Name        | Word value | Field value | Description
    // TextOnly      0x0006       b'0011'       Send a plain text message body.
    // HtmlOnly      0x000E       b'0111'       Send an HTML message body.
    // TextAndHtml   0x0016       b'1011'       Send a multipart / alternative body with both plain text and HTML.

    switch (this._messageFormat) {
      case MessageFormat.TextOnly:
        //bits |= 0x00 << 3
        //bits |= 0x00 << 4
        bits |= 0x01 << 5;
        bits |= 0x01 << 6;
        break;

      case MessageFormat.HtmlOnly:
        //bits |= 0x00 << 3
        bits |= 0x01 << 4;
        bits |= 0x01 << 5;
        bits |= 0x01 << 6;
        break;

      case MessageFormat.TextAndHtml:
        bits |= 0x01 << 3; //bits |= 0x00 << 4

        bits |= 0x01 << 5;
        bits |= 0x01 << 6;
        break;
    } // M (1 bit): (mask 0x0100) A flag that indicates how messages are to be sent. If b'0', indicates messages are
    // to be sent to the recipient (1) in Transport Neutral Encapsulation Format (TNEF) format; if b'1', messages
    // are sent to the recipient (1) in pure MIME format.


    bits |= 0x01 << 7; // U (1 bit): (mask 0x0080) A flag that indicates the format of the string fields that follow. If b'1', the
    // string fields following are in Unicode (UTF-16 form) with 2-byte terminating null characters; if b'0', the
    // string fields following are multibyte character set (MBCS) characters terminated by a single 0 byte.

    bits |= 0x01 << 8; // R (2 bits): (mask 0x0060) Reserved. This value is set to b'00'.
    //bits |= 0x00 << 9
    //bits |= 0x00 << 10
    // L (1 bit): (mask 0x0010) A flag that indicates whether the server can look up an address in the address
    // book. If b'1', server cannot look up this user's email address in the address book. If b'0', server can
    // look up this user's email address in the address book.

    if (this._canLookupEmailAddress) {
      bits |= 0x01 << 11;
    } // Pad (4 bits): (mask 0x000F) Reserved. This value is set to b'0000'.
    // bits |= 0x01 << 12
    // bits |= 0x01 << 13
    // bits |= 0x01 << 14
    // bits |= 0x01 << 15
    // if (BitConverter.IsLittleEndian) {
    //     bits = bits.Reverse().ToArray();
    //     binaryWriter.Write(bits);
    // } else {
    //     binaryWriter.Write(bits);
    // }


    buf.writeUint8(bits >>> 8 & 0xFF);
    buf.writeUint8(bits & 0xFF); //Strings.WriteNullTerminatedUnicodeString(binaryWriter, DisplayName);

    buf.append(stringToUtf16LeArray(this.displayName));
    buf.writeUint16(0);
    buf.append(stringToUtf16LeArray(this.addressType));
    buf.writeUint16(0);
    buf.append(stringToUtf16LeArray(this.email));
    buf.writeUint16(0);
    return byteBufferAsUint8Array(buf);
  }

}

class Sender extends Address {
  constructor(email, displayName, addressType = "SMTP", messageFormat = MessageFormat.TextAndHtml, canLookupEmailAddress = false, senderIsCreator = true) {
    super(email, displayName, addressType);

    _defineProperty(this, "_messageFormat", void 0);

    _defineProperty(this, "_canLookupEmailAddress", void 0);

    _defineProperty(this, "_senderIsCreator", void 0);

    this._messageFormat = messageFormat;
    this._canLookupEmailAddress = canLookupEmailAddress;
    this._senderIsCreator = senderIsCreator;
  }

  writeProperties(stream) {
    if (this._senderIsCreator) {
      stream.addProperty(PropertyTags.PR_CreatorEmailAddr_W, this.email);
      stream.addProperty(PropertyTags.PR_CreatorSimpleDispName_W, this.displayName);
      stream.addProperty(PropertyTags.PR_CreatorAddrType_W, this.addressType);
    }

    const senderEntryId = new OneOffEntryId(this.email, this.displayName, this.addressType, this._messageFormat, this._canLookupEmailAddress);
    stream.addProperty(PropertyTags.PR_SENDER_ENTRYID, senderEntryId.toByteArray());
    stream.addProperty(PropertyTags.PR_SENDER_EMAIL_ADDRESS_W, this.email);
    stream.addProperty(PropertyTags.PR_SENDER_NAME_W, this.displayName);
    stream.addProperty(PropertyTags.PR_SENDER_ADDRTYPE_W, this.addressType);
  }

}

class AttachmentProperties extends Properties {
  /**
   * Writes all properties either as a CFStream or as a collection in
   * a PropertyTags.PropertiesStreamName stream to the given storage, this depends
   * on the PropertyType
   * See theProperties class it's Properties.WriteProperties method for the logic
   * that is used to determine this
   * @param storage cfb storage to write into
   * @param prefix
   * @param messageSize
   * @returns {number} total size of written Properties
   */
  writeProperties(storage, prefix, messageSize) {
    const attachmentPropertyPrefix = buf => {
      prefix(buf); // Reserved (8 bytes): This field MUST be set to
      // zero when writing a .msg file and MUST be ignored when reading a .msg file.

      buf.writeUint64(0);
    };

    return super.writeProperties(storage, attachmentPropertyPrefix, messageSize);
  }

}

const MimeTypes = Object.freeze({
  "323": "text/h323",
  "3dmf": "x-world/x-3dmf",
  "3dm": "x-world/x-3dmf",
  "3g2": "video/3gpp2",
  "3gp": "video/3gpp",
  "7z": "application/x-7z-compressed",
  "aab": "application/x-authorware-bin",
  "aac": "audio/aac",
  "aam": "application/x-authorware-map",
  "aas": "application/x-authorware-seg",
  "abc": "text/vnd.abc",
  "acgi": "text/html",
  "acx": "application/internet-property-stream",
  "afl": "video/animaflex",
  "ai": "application/postscript",
  "aif": "audio/aiff",
  "aifc": "audio/aiff",
  "aiff": "audio/aiff",
  "aim": "application/x-aim",
  "aip": "text/x-audiosoft-intra",
  "ani": "application/x-navi-animation",
  "aos": "application/x-nokia-9000-communicator-add-on-software",
  "appcache": "text/cache-manifest",
  "application": "application/x-ms-application",
  "aps": "application/mime",
  "art": "image/x-jg",
  "asf": "video/x-ms-asf",
  "asm": "text/x-asm",
  "asp": "text/asp",
  "asr": "video/x-ms-asf",
  "asx": "application/x-mplayer2",
  "atom": "application/atom+xml",
  "au": "audio/x-au",
  "avi": "video/avi",
  "avs": "video/avs-video",
  "axs": "application/olescript",
  "bas": "text/plain",
  "bcpio": "application/x-bcpio",
  "bin": "application/octet-stream",
  "bm": "image/bmp",
  "bmp": "image/bmp",
  "boo": "application/book",
  "book": "application/book",
  "boz": "application/x-bzip2",
  "bsh": "application/x-bsh",
  "bz2": "application/x-bzip2",
  "bz": "application/x-bzip",
  "cat": "application/vnd.ms-pki.seccat",
  "ccad": "application/clariscad",
  "cco": "application/x-cocoa",
  "cc": "text/plain",
  "cdf": "application/cdf",
  "cer": "application/pkix-cert",
  "cha": "application/x-chat",
  "chat": "application/x-chat",
  "class": "application/x-java-applet",
  "clp": "application/x-msclip",
  "cmx": "image/x-cmx",
  "cod": "image/cis-cod",
  "coffee": "text/x-coffeescript",
  "conf": "text/plain",
  "cpio": "application/x-cpio",
  "cpp": "text/plain",
  "cpt": "application/x-cpt",
  "crd": "application/x-mscardfile",
  "crl": "application/pkix-crl",
  "crt": "application/pkix-cert",
  "csh": "application/x-csh",
  "css": "text/css",
  "c": "text/plain",
  "c++": "text/plain",
  "cxx": "text/plain",
  "dart": "application/dart",
  "dcr": "application/x-director",
  "deb": "application/x-deb",
  "deepv": "application/x-deepv",
  "def": "text/plain",
  "deploy": "application/octet-stream",
  "der": "application/x-x509-ca-cert",
  "dib": "image/bmp",
  "dif": "video/x-dv",
  "dir": "application/x-director",
  "disco": "text/xml",
  "dll": "application/x-msdownload",
  "dl": "video/dl",
  "doc": "application/msword",
  "docm": "application/vnd.ms-word.document.macroEnabled.12",
  "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "dot": "application/msword",
  "dotm": "application/vnd.ms-word.template.macroEnabled.12",
  "dotx": "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  "dp": "application/commonground",
  "drw": "application/drafting",
  "dtd": "application/xml-dtd",
  "dvi": "application/x-dvi",
  "dv": "video/x-dv",
  "dwf": "drawing/x-dwf (old)",
  "dwg": "application/acad",
  "dxf": "application/dxf",
  "dxr": "application/x-director",
  "elc": "application/x-elc",
  "el": "text/x-script.elisp",
  "eml": "message/rfc822",
  "eot": "application/vnd.bw-fontobject",
  "eps": "application/postscript",
  "es": "application/x-esrehber",
  "etx": "text/x-setext",
  "evy": "application/envoy",
  "exe": "application/octet-stream",
  "f77": "text/plain",
  "f90": "text/plain",
  "fdf": "application/vnd.fdf",
  "fif": "image/fif",
  "flac": "audio/x-flac",
  "fli": "video/fli",
  "flo": "image/florian",
  "flr": "x-world/x-vrml",
  "flx": "text/vnd.fmi.flexstor",
  "fmf": "video/x-atomic3d-feature",
  "for": "text/plain",
  "fpx": "image/vnd.fpx",
  "frl": "application/freeloader",
  "f": "text/plain",
  "funk": "audio/make",
  "g3": "image/g3fax",
  "gif": "image/gif",
  "gl": "video/gl",
  "gsd": "audio/x-gsm",
  "gsm": "audio/x-gsm",
  "gsp": "application/x-gsp",
  "gss": "application/x-gss",
  "gtar": "application/x-gtar",
  "g": "text/plain",
  "gz": "application/x-gzip",
  "gzip": "application/x-gzip",
  "hdf": "application/x-hdf",
  "help": "application/x-helpfile",
  "hgl": "application/vnd.hp-HPGL",
  "hh": "text/plain",
  "hlb": "text/x-script",
  "hlp": "application/x-helpfile",
  "hpg": "application/vnd.hp-HPGL",
  "hpgl": "application/vnd.hp-HPGL",
  "hqx": "application/binhex",
  "hta": "application/hta",
  "htc": "text/x-component",
  "h": "text/plain",
  "htmls": "text/html",
  "html": "text/html",
  "htm": "text/html",
  "htt": "text/webviewhtml",
  "htx": "text/html",
  "ice": "x-conference/x-cooltalk",
  "ico": "image/x-icon",
  "ics": "text/calendar",
  "idc": "text/plain",
  "ief": "image/ief",
  "iefs": "image/ief",
  "iges": "application/iges",
  "igs": "application/iges",
  "iii": "application/x-iphone",
  "ima": "application/x-ima",
  "imap": "application/x-httpd-imap",
  "inf": "application/inf",
  "ins": "application/x-internett-signup",
  "ip": "application/x-ip2",
  "isp": "application/x-internet-signup",
  "isu": "video/x-isvideo",
  "it": "audio/it",
  "iv": "application/x-inventor",
  "ivf": "video/x-ivf",
  "ivr": "i-world/i-vrml",
  "ivy": "application/x-livescreen",
  "jam": "audio/x-jam",
  "jar": "application/java-archive",
  "java": "text/plain",
  "jav": "text/plain",
  "jcm": "application/x-java-commerce",
  "jfif": "image/jpeg",
  "jfif-tbnl": "image/jpeg",
  "jpeg": "image/jpeg",
  "jpe": "image/jpeg",
  "jpg": "image/jpeg",
  "jps": "image/x-jps",
  "js": "application/javascript",
  "json": "application/json",
  "jut": "image/jutvision",
  "kar": "audio/midi",
  "ksh": "text/x-script.ksh",
  "la": "audio/nspaudio",
  "lam": "audio/x-liveaudio",
  "latex": "application/x-latex",
  "list": "text/plain",
  "lma": "audio/nspaudio",
  "log": "text/plain",
  "lsp": "application/x-lisp",
  "lst": "text/plain",
  "lsx": "text/x-la-asf",
  "ltx": "application/x-latex",
  "m13": "application/x-msmediaview",
  "m14": "application/x-msmediaview",
  "m1v": "video/mpeg",
  "m2a": "audio/mpeg",
  "m2v": "video/mpeg",
  "m3u": "audio/x-mpequrl",
  "m4a": "audio/mp4",
  "m4v": "video/mp4",
  "man": "application/x-troff-man",
  "manifest": "application/x-ms-manifest",
  "map": "application/x-navimap",
  "mar": "text/plain",
  "mbd": "application/mbedlet",
  "mc$": "application/x-magic-cap-package-1.0",
  "mcd": "application/mcad",
  "mcf": "image/vasa",
  "mcp": "application/netmc",
  "mdb": "application/x-msaccess",
  "mesh": "model/mesh",
  "me": "application/x-troff-me",
  "mid": "audio/midi",
  "midi": "audio/midi",
  "mif": "application/x-mif",
  "mjf": "audio/x-vnd.AudioExplosion.MjuiceMediaFile",
  "mjpg": "video/x-motion-jpeg",
  "mm": "application/base64",
  "mme": "application/base64",
  "mny": "application/x-msmoney",
  "mod": "audio/mod",
  "mov": "video/quicktime",
  "movie": "video/x-sgi-movie",
  "mp2": "video/mpeg",
  "mp3": "audio/mpeg",
  "mp4": "video/mp4",
  "mp4a": "audio/mp4",
  "mp4v": "video/mp4",
  "mpa": "audio/mpeg",
  "mpc": "application/x-project",
  "mpeg": "video/mpeg",
  "mpe": "video/mpeg",
  "mpga": "audio/mpeg",
  "mpg": "video/mpeg",
  "mpp": "application/vnd.ms-project",
  "mpt": "application/x-project",
  "mpv2": "video/mpeg",
  "mpv": "application/x-project",
  "mpx": "application/x-project",
  "mrc": "application/marc",
  "ms": "application/x-troff-ms",
  "msh": "model/mesh",
  "m": "text/plain",
  "mvb": "application/x-msmediaview",
  "mv": "video/x-sgi-movie",
  "my": "audio/make",
  "mzz": "application/x-vnd.AudioExplosion.mzz",
  "nap": "image/naplps",
  "naplps": "image/naplps",
  "nc": "application/x-netcdf",
  "ncm": "application/vnd.nokia.configuration-message",
  "niff": "image/x-niff",
  "nif": "image/x-niff",
  "nix": "application/x-mix-transfer",
  "nsc": "application/x-conference",
  "nvd": "application/x-navidoc",
  "nws": "message/rfc822",
  "oda": "application/oda",
  "ods": "application/oleobject",
  "oga": "audio/ogg",
  "ogg": "audio/ogg",
  "ogv": "video/ogg",
  "ogx": "application/ogg",
  "omc": "application/x-omc",
  "omcd": "application/x-omcdatamaker",
  "omcr": "application/x-omcregerator",
  "opus": "audio/ogg",
  "oxps": "application/oxps",
  "p10": "application/pkcs10",
  "p12": "application/pkcs-12",
  "p7a": "application/x-pkcs7-signature",
  "p7b": "application/x-pkcs7-certificates",
  "p7c": "application/pkcs7-mime",
  "p7m": "application/pkcs7-mime",
  "p7r": "application/x-pkcs7-certreqresp",
  "p7s": "application/pkcs7-signature",
  "part": "application/pro_eng",
  "pas": "text/pascal",
  "pbm": "image/x-portable-bitmap",
  "pcl": "application/x-pcl",
  "pct": "image/x-pict",
  "pcx": "image/x-pcx",
  "pdb": "chemical/x-pdb",
  "pdf": "application/pdf",
  "pfunk": "audio/make",
  "pfx": "application/x-pkcs12",
  "pgm": "image/x-portable-graymap",
  "pic": "image/pict",
  "pict": "image/pict",
  "pkg": "application/x-newton-compatible-pkg",
  "pko": "application/vnd.ms-pki.pko",
  "pl": "text/plain",
  "plx": "application/x-PiXCLscript",
  "pm4": "application/x-pagemaker",
  "pm5": "application/x-pagemaker",
  "pma": "application/x-perfmon",
  "pmc": "application/x-perfmon",
  "pm": "image/x-xpixmap",
  "pml": "application/x-perfmon",
  "pmr": "application/x-perfmon",
  "pmw": "application/x-perfmon",
  "png": "image/png",
  "pnm": "application/x-portable-anymap",
  "pot": "application/vnd.ms-powerpoint",
  "potm": "application/vnd.ms-powerpoint.template.macroEnabled.12",
  "potx": "application/vnd.openxmlformats-officedocument.presentationml.template",
  "pov": "model/x-pov",
  "ppa": "application/vnd.ms-powerpoint",
  "ppam": "application/vnd.ms-powerpoint.addin.macroEnabled.12",
  "ppm": "image/x-portable-pixmap",
  "pps": "application/vnd.ms-powerpoint",
  "ppsm": "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
  "ppsx": "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  "ppt": "application/vnd.ms-powerpoint",
  "pptm": "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
  "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "ppz": "application/mspowerpoint",
  "pre": "application/x-freelance",
  "prf": "application/pics-rules",
  "prt": "application/pro_eng",
  "ps": "application/postscript",
  "p": "text/x-pascal",
  "pub": "application/x-mspublisher",
  "pvu": "paleovu/x-pv",
  "pwz": "application/vnd.ms-powerpoint",
  "pyc": "applicaiton/x-bytecode.python",
  "py": "text/x-script.phyton",
  "qcp": "audio/vnd.qcelp",
  "qd3d": "x-world/x-3dmf",
  "qd3": "x-world/x-3dmf",
  "qif": "image/x-quicktime",
  "qtc": "video/x-qtc",
  "qtif": "image/x-quicktime",
  "qti": "image/x-quicktime",
  "qt": "video/quicktime",
  "ra": "audio/x-pn-realaudio",
  "ram": "audio/x-pn-realaudio",
  "ras": "application/x-cmu-raster",
  "rast": "image/cmu-raster",
  "rexx": "text/x-script.rexx",
  "rf": "image/vnd.rn-realflash",
  "rgb": "image/x-rgb",
  "rm": "application/vnd.rn-realmedia",
  "rmi": "audio/mid",
  "rmm": "audio/x-pn-realaudio",
  "rmp": "audio/x-pn-realaudio",
  "rng": "application/ringing-tones",
  "rnx": "application/vnd.rn-realplayer",
  "roff": "application/x-troff",
  "rp": "image/vnd.rn-realpix",
  "rpm": "audio/x-pn-realaudio-plugin",
  "rss": "application/rss+xml",
  "rtf": "text/richtext",
  "rt": "text/richtext",
  "rtx": "text/richtext",
  "rv": "video/vnd.rn-realvideo",
  "s3m": "audio/s3m",
  "sbk": "application/x-tbook",
  "scd": "application/x-msschedule",
  "scm": "application/x-lotusscreencam",
  "sct": "text/scriptlet",
  "sdml": "text/plain",
  "sdp": "application/sdp",
  "sdr": "application/sounder",
  "sea": "application/sea",
  "set": "application/set",
  "setpay": "application/set-payment-initiation",
  "setreg": "application/set-registration-initiation",
  "sgml": "text/sgml",
  "sgm": "text/sgml",
  "shar": "application/x-bsh",
  "sh": "text/x-script.sh",
  "shtml": "text/html",
  "sid": "audio/x-psid",
  "silo": "model/mesh",
  "sit": "application/x-sit",
  "skd": "application/x-koan",
  "skm": "application/x-koan",
  "skp": "application/x-koan",
  "skt": "application/x-koan",
  "sl": "application/x-seelogo",
  "smi": "application/smil",
  "smil": "application/smil",
  "snd": "audio/basic",
  "sol": "application/solids",
  "spc": "application/x-pkcs7-certificates",
  "spl": "application/futuresplash",
  "spr": "application/x-sprite",
  "sprite": "application/x-sprite",
  "spx": "audio/ogg",
  "src": "application/x-wais-source",
  "ssi": "text/x-server-parsed-html",
  "ssm": "application/streamingmedia",
  "sst": "application/vnd.ms-pki.certstore",
  "step": "application/step",
  "s": "text/x-asm",
  "stl": "application/sla",
  "stm": "text/html",
  "stp": "application/step",
  "sv4cpio": "application/x-sv4cpio",
  "sv4crc": "application/x-sv4crc",
  "svf": "image/x-dwg",
  "svg": "image/svg+xml",
  "svr": "application/x-world",
  "swf": "application/x-shockwave-flash",
  "talk": "text/x-speech",
  "t": "application/x-troff",
  "tar": "application/x-tar",
  "tbk": "application/toolbook",
  "tcl": "text/x-script.tcl",
  "tcsh": "text/x-script.tcsh",
  "tex": "application/x-tex",
  "texi": "application/x-texinfo",
  "texinfo": "application/x-texinfo",
  "text": "text/plain",
  "tgz": "application/x-compressed",
  "tiff": "image/tiff",
  "tif": "image/tiff",
  "tr": "application/x-troff",
  "trm": "application/x-msterminal",
  "ts": "text/x-typescript",
  "tsi": "audio/tsp-audio",
  "tsp": "audio/tsplayer",
  "tsv": "text/tab-separated-values",
  "ttf": "application/x-font-ttf",
  "turbot": "image/florian",
  "txt": "text/plain",
  "uil": "text/x-uil",
  "uls": "text/iuls",
  "unis": "text/uri-list",
  "uni": "text/uri-list",
  "unv": "application/i-deas",
  "uris": "text/uri-list",
  "uri": "text/uri-list",
  "ustar": "multipart/x-ustar",
  "uue": "text/x-uuencode",
  "uu": "text/x-uuencode",
  "vcd": "application/x-cdlink",
  "vcf": "text/vcard",
  "vcard": "text/vcard",
  "vcs": "text/x-vCalendar",
  "vda": "application/vda",
  "vdo": "video/vdo",
  "vew": "application/groupwise",
  "vivo": "video/vivo",
  "viv": "video/vivo",
  "vmd": "application/vocaltec-media-desc",
  "vmf": "application/vocaltec-media-file",
  "voc": "audio/voc",
  "vos": "video/vosaic",
  "vox": "audio/voxware",
  "vqe": "audio/x-twinvq-plugin",
  "vqf": "audio/x-twinvq",
  "vql": "audio/x-twinvq-plugin",
  "vrml": "application/x-vrml",
  "vrt": "x-world/x-vrt",
  "vsd": "application/x-visio",
  "vst": "application/x-visio",
  "vsw": "application/x-visio",
  "w60": "application/wordperfect6.0",
  "w61": "application/wordperfect6.1",
  "w6w": "application/msword",
  "wav": "audio/wav",
  "wb1": "application/x-qpro",
  "wbmp": "image/vnd.wap.wbmp",
  "wcm": "application/vnd.ms-works",
  "wdb": "application/vnd.ms-works",
  "web": "application/vnd.xara",
  "webm": "video/webm",
  "wiz": "application/msword",
  "wk1": "application/x-123",
  "wks": "application/vnd.ms-works",
  "wmf": "windows/metafile",
  "wmlc": "application/vnd.wap.wmlc",
  "wmlsc": "application/vnd.wap.wmlscriptc",
  "wmls": "text/vnd.wap.wmlscript",
  "wml": "text/vnd.wap.wml",
  "wmp": "video/x-ms-wmp",
  "wmv": "video/x-ms-wmv",
  "wmx": "video/x-ms-wmx",
  "woff": "application/x-woff",
  "word": "application/msword",
  "wp5": "application/wordperfect",
  "wp6": "application/wordperfect",
  "wp": "application/wordperfect",
  "wpd": "application/wordperfect",
  "wps": "application/vnd.ms-works",
  "wq1": "application/x-lotus",
  "wri": "application/mswrite",
  "wrl": "application/x-world",
  "wrz": "model/vrml",
  "wsc": "text/scriplet",
  "wsdl": "text/xml",
  "wsrc": "application/x-wais-source",
  "wtk": "application/x-wintalk",
  "wvx": "video/x-ms-wvx",
  "x3d": "model/x3d+xml",
  "x3db": "model/x3d+fastinfoset",
  "x3dv": "model/x3d-vrml",
  "xaf": "x-world/x-vrml",
  "xaml": "application/xaml+xml",
  "xap": "application/x-silverlight-app",
  "xbap": "application/x-ms-xbap",
  "xbm": "image/x-xbitmap",
  "xdr": "video/x-amt-demorun",
  "xgz": "xgl/drawing",
  "xht": "application/xhtml+xml",
  "xhtml": "application/xhtml+xml",
  "xif": "image/vnd.xiff",
  "xla": "application/vnd.ms-excel",
  "xlam": "application/vnd.ms-excel.addin.macroEnabled.12",
  "xl": "application/excel",
  "xlb": "application/excel",
  "xlc": "application/excel",
  "xld": "application/excel",
  "xlk": "application/excel",
  "xll": "application/excel",
  "xlm": "application/excel",
  "xls": "application/vnd.ms-excel",
  "xlsb": "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  "xlsm": "application/vnd.ms-excel.sheet.macroEnabled.12",
  "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "xlt": "application/vnd.ms-excel",
  "xltm": "application/vnd.ms-excel.template.macroEnabled.12",
  "xltx": "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  "xlv": "application/excel",
  "xlw": "application/excel",
  "xm": "audio/xm",
  "xml": "text/xml",
  "xmz": "xgl/movie",
  "xof": "x-world/x-vrml",
  "xpi": "application/x-xpinstall",
  "xpix": "application/x-vnd.ls-xpix",
  "xpm": "image/xpm",
  "xps": "application/vnd.ms-xpsdocument",
  "x-png": "image/png",
  "xsd": "text/xml",
  "xsl": "text/xml",
  "xslt": "text/xml",
  "xsr": "video/x-amt-showrun",
  "xwd": "image/x-xwd",
  "xyz": "chemical/x-pdb",
  "z": "application/x-compressed",
  "zip": "application/zip",
  "zsh": "text/x-script.zsh"
});
function getMimeType(fileName) {
  if (fileName == null) throw new Error("fileName is null!");
  const aos = MimeTypes["exe"];
  const dot = fileName.lastIndexOf(".");

  if (dot !== -1 && fileName.length > dot + 1) {
    const ext = fileName.substring(dot + 1);
    return MimeTypes[ext] || aos;
  }

  return aos;
}

class Attachment {
  // was: DateTime
  // TODO
  constructor(data, // was: Stream
  fileName, creationTime, lastModificationTime, type = AttachmentType.ATTACH_BY_VALUE, renderingPosition = -1, contentId = "", isContactPhoto = false) {
    _defineProperty(this, "_file", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "fileName", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "renderingPosition", void 0);

    _defineProperty(this, "isInline", void 0);

    _defineProperty(this, "contentId", void 0);

    _defineProperty(this, "isContactPhoto", void 0);

    _defineProperty(this, "creationTime", void 0);

    _defineProperty(this, "lastModificationTime", void 0);

    this.data = data;
    this.fileName = fileName;
    this.creationTime = creationTime;
    this.lastModificationTime = lastModificationTime;
    this.type = type;
    this.renderingPosition = renderingPosition;
    this.contentId = contentId;
    this.isContactPhoto = isContactPhoto;
  }

  writeProperties(storage, index) {
    const attachmentProperties = new AttachmentProperties();
    attachmentProperties.addProperty(PropertyTags.PR_ATTACH_NUM, index, PropertyFlag.PROPATTR_READABLE);
    attachmentProperties.addProperty(PropertyTags.PR_INSTANCE_KEY, generateInstanceKey(), PropertyFlag.PROPATTR_READABLE);
    attachmentProperties.addProperty(PropertyTags.PR_RECORD_KEY, generateRecordKey(), PropertyFlag.PROPATTR_READABLE);
    attachmentProperties.addProperty(PropertyTags.PR_RENDERING_POSITION, this.renderingPosition, PropertyFlag.PROPATTR_READABLE);
    attachmentProperties.addProperty(PropertyTags.PR_OBJECT_TYPE, MapiObjectType.MAPI_ATTACH);

    if (!isNullOrEmpty(this.fileName)) {
      attachmentProperties.addProperty(PropertyTags.PR_DISPLAY_NAME_W, this.fileName);
      attachmentProperties.addProperty(PropertyTags.PR_ATTACH_FILENAME_W, fileNameToDosFileName(this.fileName));
      attachmentProperties.addProperty(PropertyTags.PR_ATTACH_LONG_FILENAME_W, this.fileName);
      attachmentProperties.addProperty(PropertyTags.PR_ATTACH_EXTENSION_W, getPathExtension(this.fileName));

      if (!isNullOrEmpty(this.contentId)) {
        attachmentProperties.addProperty(PropertyTags.PR_ATTACH_CONTENT_ID_W, this.contentId);
      } // TODO: get mimetype from user.


      attachmentProperties.addProperty(PropertyTags.PR_ATTACH_MIME_TAG_W, getMimeType(this.fileName));
    }

    attachmentProperties.addProperty(PropertyTags.PR_ATTACH_METHOD, this.type);

    switch (this.type) {
      case AttachmentType.ATTACH_BY_VALUE:
      case AttachmentType.ATTACH_EMBEDDED_MSG:
        attachmentProperties.addProperty(PropertyTags.PR_ATTACH_DATA_BIN, this.data);
        attachmentProperties.addProperty(PropertyTags.PR_ATTACH_SIZE, this.data.length);
        break;

      case AttachmentType.ATTACH_BY_REF_ONLY:
        // TODO:
        throw new Error("attach_by_ref_only not implemented!"); // $FlowFixMe[unreachable-code]
      //case AttachmentType.ATTACH_EMBEDDED_MSG:
      //    var msgStorage = storage.AddStorage(PropertyTags.PR_ATTACH_DATA_BIN.Name)
      //    var cf = new CompoundFile(Stream)
      //    Storage.Copy(cf.RootStorage, msgStorage)
      //    propertiesStream.AddProperty(PropertyTags.PR_ATTACH_SIZE, Stream.Length)
      //    propertiesStream.AddProperty(PropertyTags.PR_ATTACH_ENCODING, 0)
      //    break

      case AttachmentType.ATTACH_BY_REFERENCE:
      case AttachmentType.ATTACH_BY_REF_RESOLVE:
      case AttachmentType.NO_ATTACHMENT:
      case AttachmentType.ATTACH_OLE:
        throw new Error("AttachByReference, AttachByRefResolve, NoAttachment and AttachOle are not supported");
    }

    if (this.contentId) {
      attachmentProperties.addProperty(PropertyTags.PR_ATTACHMENT_HIDDEN, true);
      attachmentProperties.addProperty(PropertyTags.PR_ATTACH_FLAGS, AttachmentFlags.ATT_MHTML_REF);
    } // TODO: DateTime


    const now = Date.now();
    attachmentProperties.addProperty(PropertyTags.PR_CREATION_TIME, now);
    attachmentProperties.addProperty(PropertyTags.PR_LAST_MODIFICATION_TIME, now);
    attachmentProperties.addProperty(PropertyTags.PR_STORE_SUPPORT_MASK, StoreSupportMaskConst, PropertyFlag.PROPATTR_READABLE);
    return attachmentProperties.writeProperties(storage, () => {});
  }

}

class Attachments extends Array {
  /**
   * checks if fileName already exists in this object
   * @param fileName {string} the name to check.
   * @param contentId {string} the contentId of the file
   * @private
   */
  _checkAttachmentFileName(fileName, contentId) {
    //const file = Path.GetFileName(fileName).toLowerCase()
    const cid = contentId.toLowerCase();

    if (this.some(attachment => attachment.fileName.toLowerCase() === fileName && attachment.contentId.toLowerCase() === cid)) {
      throw new Error("The attachment with the name '" + fileName + "' already exists");
    }
  }
  /**
   * Writes the Attachment objects to the given storage and sets all the needed properties
   * @param rootStorage
   * @returns {number} the total size of the written attachment objects and their properties
   */


  writeToStorage(rootStorage) {
    let size = 0;

    for (let i = 0; i < this.length; i++) {
      const attachment = this[i];
      const storage = rootStorage.addStorage(PropertyTagLiterals.AttachmentStoragePrefix + X8(i));
      size += attachment.writeProperties(storage, i);
    }

    return size;
  }
  /**
   * adds an Attachment by AttachmentType.ATTACH_BY_VALUE (default)
   * @param data {Uint8Array} data to add as attachment
   * @param fileName {string} file to add with full path
   * @param creationTime {number} file creation time
   * @param lastModificationTime {number} file modification time
   * @param type {AttachmentTypeEnum} how to attach the attachment
   * @param renderingPosition {number} how to display in a rich text message
   * @param isInline {boolean} set to true to add the attachment inline
   * @param contentId {string} the id for the inline attachment if isInline is true
   * @param isContactPhoto {boolean} if the attachment is a contact photo
   */


  add(data, fileName, creationTime, lastModificationTime, contentId = "", type = AttachmentType.ATTACH_BY_VALUE, renderingPosition = -1, isInline = false, isContactPhoto = false) {
    if (this.length >= 2048) throw new Error("length > 2048 => too many attachments!");

    this._checkAttachmentFileName(fileName, contentId);

    const a = new Attachment(...arguments);
    this.push(a);
  }

}

class Strings {
  /**
   * returns the str as an escaped RTF string
   * @param str {string} string to escape
   */
  static escapeRtf(str) {
    const rtfEscaped = [];
    const escapedChars = ['{', '}', '\\'];

    for (const glyph of str) {
      const charCode = glyph.charCodeAt(0);
      if (charCode <= 31) continue; // non-printables

      if (charCode <= 127) {
        // 7-bit ascii
        if (escapedChars.includes(glyph)) rtfEscaped.push('\\');
        rtfEscaped.push(glyph);
      } else if (charCode <= 255) {
        // 8-bit ascii
        rtfEscaped.push("\\'" + x2(charCode));
      } else {
        // unicode. may consist of multiple code points
        for (const codepoint of glyph.split('')) {
          // TODO:
          // RTF control words generally accept signed 16-bit numbers as arguments.
          // For this reason, Unicode values greater than 32767 must be expressed as negative numbers.
          rtfEscaped.push("\\u");
          rtfEscaped.push(codepoint.charCodeAt(0));
          rtfEscaped.push('?');
        }
      }
    }

    return "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 " + rtfEscaped.join("") + " }}";
  }

}

/**
 * The PidTagReportTag property ([MS-OXPROPS] section 2.917) contains the data that is used to correlate the report
 * and the original message. The property can be absent if the sender does not request a reply or response to the
 * original e-mail message. If the original E-mail object has either the PidTagResponseRequested property (section
 * 2.2.1.46) set to 0x01 or the PidTagReplyRequested property (section 2.2.1.45) set to 0x01, then the property is set
 * on the original E-mail object by using the following format.
 * See https://msdn.microsoft.com/en-us/library/ee160822(v=exchg.80).aspx
 */

class ReportTag {
  // (9 bytes): A null-terminated string of nine characters used for validation; set to "PCDFEB09".
  // (4 bytes): This field specifies the version. If the SearchFolderEntryId field is present, this field MUST be set to
  // 0x00020001; otherwise, this field MUST be set to 0x00010001.
  // (4 bytes): Size of the StoreEntryId field.
  // (Variable length of bytes): This field specifies the entry ID of the mailbox that contains the original message. If
  // the value of the
  // StoreEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, this field is filled with
  // the number of bytes specified by the StoreEntryIdSize field.
  // (4 bytes): Size of the FolderEntryId field.
  // (Variable): This field specifies the entry ID of the folder that contains the original message. If the value of the
  // FolderEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, the field is filled with
  // the number of bytes specified by the FolderEntryIdSize field.
  // (4 bytes): Size of the MessageEntryId field.
  // (Variable): This field specifies the entry ID of the original message. If the value of the MessageEntryIdSize field
  // is 0x00000000, this field is omitted. If the value is not zero, the field is filled with the number of bytes
  // specified by the MessageEntryIdSize field.
  // (4 bytes): Size of the SearchFolderEntryId field.
  // (Variable): This field specifies the entry ID of an alternate folder that contains the original message. If the
  // value of the SearchFolderEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, the
  // field is filled with the number of bytes specified by the SearchFolderEntryIdSize field.
  // (4 bytes): Size of the MessageSearchKey field.
  // (variable): This field specifies the search key of the original message. If the value of the MessageSearchKeySize
  // field is 0x00000000, this field is omitted. If the value is not zero, the MessageSearchKey field is filled with the
  // number of bytes specified by the MessageSearchKeySize field.
  // (Variable): The subject of the original message. If the value of the ANSITextSize field is 0x00000000, this field
  // is omitted. If the value is not zero, the field is filled with the number of bytes specified by the ANSITextSize
  // field.
  constructor(ansiText) {
    _defineProperty(this, "cookie", "PCDFEB09\0");

    _defineProperty(this, "version", 0x00010001);

    _defineProperty(this, "storeEntryIdSize", 0x00000000);

    _defineProperty(this, "storeEntryId", void 0);

    _defineProperty(this, "folderEntryIdSize", 0x00000000);

    _defineProperty(this, "folderEntryId", 0);

    _defineProperty(this, "messageEntryIdSize", 0x00000000);

    _defineProperty(this, "messageEntryId", 0);

    _defineProperty(this, "searchFolderEntryIdSize", 0x00000000);

    _defineProperty(this, "searchFolderEntryId", void 0);

    _defineProperty(this, "messageSearchKeySize", 0x00000000);

    _defineProperty(this, "messageSearchKey", void 0);

    _defineProperty(this, "ansiText", void 0);

    this.ansiText = ansiText;
  }
  /**
   * Returns this object as a byte array
   */


  toByteArray() {
    const buf = makeByteBuffer(); // Cookie (9 bytes): A null-terminated string of nine characters used for validation; set to "PCDFEB09".
    // TODO:

    buf.writeUTF8String(this.cookie); // Version (4 bytes): This field specifies the version. If the SearchFolderEntryId field is present,
    // this field MUST be set to 0x00020001; otherwise, this field MUST be set to 0x00010001.

    buf.writeUint32(this.version); // (4 bytes): Size of the StoreEntryId field.

    buf.writeUint32(this.storeEntryIdSize); // (Variable length of bytes): This field specifies the entry ID of the mailbox that contains the original message. If
    // the value of the StoreEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, this field
    // is filled with the number of bytes specified by the StoreEntryIdSize field.
    //buf.append(this.storeEntryId);
    // (4 bytes): Size of the FolderEntryId field.

    buf.writeUint32(this.folderEntryIdSize); // (Variable): This field specifies the entry ID of the folder that contains the original message. If the value of the
    // FolderEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, the field is filled with
    // the number of bytes specified by the FolderEntryIdSize field.
    //buf.append(this.folderEntryId)
    // (4 bytes): Size of the MessageEntryId field.

    buf.writeUint32(this.messageEntryIdSize); // (Variable): This field specifies the entry ID of the original message. If the value of the MessageEntryIdSize field
    // is 0x00000000, this field is omitted. If the value is not zero, the field is filled with the number of bytes
    // specified by the MessageEntryIdSize field.
    //buf.append(this.messageEntryId)
    // (4 bytes): Size of the SearchFolderEntryId field.

    buf.writeUint32(this.searchFolderEntryIdSize); // (Variable): This field specifies the entry ID of an alternate folder that contains the original message. If the
    // value of the SearchFolderEntryIdSize field is 0x00000000, this field is omitted. If the value is not zero, the
    // field is filled with the number of bytes specified by the SearchFolderEntryIdSize field.
    //buf.append(this.searchFolderEntryId)
    // (4 bytes): Size of the MessageSearchKey field.

    buf.writeUint32(this.messageSearchKeySize); // (variable): This field specifies the search key of the original message. If the value of the MessageSearchKeySize
    // field is 0x00000000, this field is omitted. If the value is not zero, the MessageSearchKey field is filled with the
    // number of bytes specified by the MessageSearchKeySize field.
    //buf.append(this.messageSearchKey)
    // (4 bytes): Number of characters in the ANSI Text field.

    buf.writeUint32(this.ansiText.length); // (Variable): The subject of the original message. If the value of the ANSITextSize field is 0x00000000, this field
    // is omitted. If the value is not zero, the field is filled with the number of bytes specified by the ANSITextSize
    // field.

    buf.writeUTF8String(this.ansiText);
    return byteBufferAsUint8Array(buf);
  }

}

const CRC32_TABLE = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
class Crc32 {
  /**
   * calculates a checksum of a ByteBuffers contents
   * @param buffer {ByteBuffer}
   * @returns {number} the crc32 of this buffer's contents between offset and limit
   */
  static calculate(buffer) {
    if (buffer.offset >= buffer.limit) return 0;
    const origOffset = buffer.offset;
    let result = 0;

    while (buffer.offset < buffer.limit) {
      const cur = buffer.readUint8();
      result = CRC32_TABLE[(result ^ cur) & 0xFF] ^ result >>> 8;
    }

    buffer.offset = origOffset; // unsigned representation. (-1 >>> 0) === 4294967295

    return result >>> 0;
  }

}

const INIT_DICT_SIZE = 207;
const MAX_DICT_SIZE = 4096;
const COMP_TYPE = "LZFu";
const HEADER_SIZE = 16;

function getInitialDict() {
  const builder = [];
  builder.push('{\\rtf1\\ansi\\mac\\deff0\\deftab720{\\fonttbl;}');
  builder.push('{\\f0\\fnil \\froman \\fswiss \\fmodern \\fscript ');
  builder.push('\\fdecor MS Sans SerifSymbolArialTimes New RomanCourier{\\colortbl\\red0\\green0\\blue0');
  builder.push('\r\n');
  builder.push('\\par \\pard\\plain\\f0\\fs20\\b\\i\\u\\tab\\tx');
  const res = builder.join('');
  let initialDictionary = makeByteBuffer(null, stringToUtf8Array(res));
  initialDictionary.ensureCapacity(MAX_DICT_SIZE);
  initialDictionary.limit = MAX_DICT_SIZE;
  initialDictionary.offset = INIT_DICT_SIZE;
  return initialDictionary;
}
/**
 * find the longest match of the start of the current input in the dictionary.
 * finds the length of the longest match of the start of the current input in the dictionary and
 * the position of it in the dictionary.
 * @param dictionary {ByteBuffer} part of the MS-OXRTFCP spec.
 * @param inputBuffer {ByteBuffer} pointing at the input data
 * @returns {MatchInfo} object containing dictionaryOffset, length
 */


function findLongestMatch(dictionary, inputBuffer) {
  const positionData = {
    length: 0,
    dictionaryOffset: 0
  };
  if (inputBuffer.offset >= inputBuffer.limit) return positionData;
  inputBuffer.mark();
  dictionary.mark(); // previousWriteOffset

  let matchLength = 0;
  let dictionaryIndex = 0;

  while (true) {
    const inputCharacter = inputBuffer.readUint8();
    const dictCharacter = dictionary.readUint8(dictionaryIndex % MAX_DICT_SIZE);

    if (dictCharacter === inputCharacter) {
      matchLength += 1;

      if (matchLength <= 17 && matchLength > positionData.length) {
        positionData.dictionaryOffset = dictionaryIndex - matchLength + 1;
        dictionary.writeUint8(inputCharacter);
        dictionary.offset = dictionary.offset % MAX_DICT_SIZE;
        positionData.length = matchLength;
      }

      if (inputBuffer.offset >= inputBuffer.limit) break;
    } else {
      inputBuffer.reset();
      inputBuffer.mark();
      matchLength = 0;
      if (inputBuffer.offset >= inputBuffer.limit) break;
    }

    dictionaryIndex += 1;
    if (dictionaryIndex >= dictionary.markedOffset + positionData.length) break;
  }

  inputBuffer.reset();
  return positionData;
}
/**
 * Takes in input, compresses it using LZFu by Microsoft. Can be viewed in the [MS-OXRTFCP].pdf document.
 * https://msdn.microsoft.com/en-us/library/cc463890(v=exchg.80).aspx. Returns the input as a byte array.
 * @param input {Uint8Array} the input to compress
 * @returns {Uint8Array} compressed input
 */


function compress(input) {
  let matchData = {
    length: 0,
    dictionaryOffset: 0
  };
  const inputBuffer = makeByteBuffer(null, input);
  const dictionary = getInitialDict();
  const tokenBuffer = makeByteBuffer(16);
  const resultBuffer = makeByteBuffer(17); // The writer MUST set the input cursor to the first byte in the input buffer.
  // The writer MUST set the output cursor to the 17th byte (to make space for the compressed header).

  resultBuffer.offset = HEADER_SIZE; // (1) The writer MUST (re)initialize the run by setting its
  // Control Byte to 0 (zero), its control bit to 0x01, and its token offset to 0 (zero).

  let controlByte = 0;
  let controlBit = 0x01;

  while (true) {
    // (3) Locate the longest match in the dictionary for the current input cursor,
    // as specified in section 3.3.4.2.1. Note that the dictionary is updated during this procedure.
    matchData = findLongestMatch(dictionary, inputBuffer);

    if (inputBuffer.offset >= inputBuffer.limit) {
      // (2) If there is no more input, the writer MUST exit the compression loop (by advancing to step 8).
      // (8) A dictionary reference (see section 2.2.1.5) MUST be created from an offset equal
      // to the current write offset of the dictionary and a length of 0 (zero), and inserted
      // in the token buffer as a big-endian word at the current token offset. The writer MUST
      // then advance the token offset by 2. The control bit MUST be ORed into the Control Byte,
      // thus setting the bit that corresponds to the current token to 1.
      let dictReference = (dictionary.offset & 0xFFF) << 4;
      tokenBuffer.writeUint8(dictReference >>> 8 & 0xFF);
      tokenBuffer.writeUint8(dictReference >>> 0 & 0xFF);
      controlByte |= controlBit; // (9) The writer MUST write the current run to the output by writing the BYTE Control Byte,
      // and then copying token offset number of BYTEs from the token buffer to the output.
      // The output cursor is advanced by token offset + 1 BYTE.

      resultBuffer.writeUint8(controlByte);
      tokenBuffer.limit = tokenBuffer.offset;
      tokenBuffer.offset = 0;
      resultBuffer.append(tokenBuffer);
      break;
    }

    if (matchData.length <= 1) {
      // (4) If the match is 0 (zero) or 1 byte in length, the writer
      // MUST copy the literal at the input cursor to the Run's token
      // buffer at token offset. The writer MUST increment the token offset and the input cursor.
      const inputCharacter = inputBuffer.readUint8();

      if (matchData.length === 0) {
        dictionary.writeUint8(inputCharacter);
        dictionary.offset = dictionary.offset % dictionary.limit;
      }

      tokenBuffer.writeUint8(inputCharacter);
    } else {
      // (5) If the match is 2 bytes or longer, the writer MUST create a dictionary
      // reference (see section 2.2.1.5) from the offset of the match and the length.
      // (Note: The value stored in the Length field in REFERENCE is length minus 2.)
      // The writer MUST insert this dictionary reference in the token buffer as a
      // big-endian word at the current token offset. The control bit MUST be bitwise
      // ORed into the Control Byte, thus setting the bit that corresponds to the
      // current token to 1. The writer MUST advance the token offset by 2 and
      // MUST advance the input cursor by the length of the match.
      let dictReference = (matchData.dictionaryOffset & 0xFFF) << 4 | matchData.length - 2 & 0xF;
      controlByte |= controlBit;
      tokenBuffer.writeUint8(dictReference >>> 8 & 0xFF);
      tokenBuffer.writeUint8(dictReference >>> 0 & 0xFF);
      inputBuffer.offset = inputBuffer.offset + matchData.length;
    }

    matchData.length = 0;

    if (controlBit === 0x80) {
      // (7) If the control bit is equal to 0x80, the writer MUST write the run
      // to the output by writing the BYTE Control Byte, and then copying the
      // token offset number of BYTEs from the token buffer to the output. The
      // writer MUST advance the output cursor by token offset + 1 BYTEs.
      // Continue with compression by returning to step (1).
      resultBuffer.writeUint8(controlByte);
      tokenBuffer.limit = tokenBuffer.offset;
      tokenBuffer.offset = 0;
      resultBuffer.append(tokenBuffer);
      controlByte = 0;
      controlBit = 0x01;
      tokenBuffer.clear();
      continue;
    } // (6) If the control bit is not 0x80, the control bit MUST be left-shifted by one bit and compression MUST
    // continue building the run by returning to step (2).


    controlBit <<= 1;
  } // After the output has been completed by execution of step (9), the writer
  // MUST complete the output by filling the header, as specified in section 3.3.4.2.2.
  // The writer MUST fill in the header by using the following process:
  // 1.Set the COMPSIZE (see section 2.2.1.1) field of the header to the number of CONTENTS bytes in the output buffer plus 12.


  resultBuffer.limit = resultBuffer.offset;
  resultBuffer.writeUint32(resultBuffer.limit - HEADER_SIZE + 12, 0); // 2.Set the RAWSIZE (see section 2.2.1.1) field of the header to the number of bytes read from the input.

  resultBuffer.writeUint32(input.length, 4); // 3.Set the COMPTYPE (see section 2.2.1.1) field of the header to COMPRESSED.

  resultBuffer.writeUTF8String(COMP_TYPE, 8); // 4.Set the CRC (see section 3.1.3.2) field of the header to the CRC (see section 3.1.1.1.2) generated from the CONTENTS bytes.

  resultBuffer.offset = HEADER_SIZE;
  resultBuffer.writeUint32(Crc32.calculate(resultBuffer), 12);
  resultBuffer.offset = resultBuffer.limit;
  return byteBufferAsUint8Array(resultBuffer);
}

const subjectPrefixRegex = /^(\D{1,3}:\s)(.*)$/;
class Email extends Message {
  // was: DateTime
  // Corresponds to the message ID field as specified in [RFC2822].
  // If set then this value will be used, when not set the value will be read from the
  // TransportMessageHeaders when this property is set
  constructor(draft = false, readReceipt = false) {
    super();

    _defineProperty(this, "recipients", void 0);

    _defineProperty(this, "replyToRecipients", void 0);

    _defineProperty(this, "attachments", void 0);

    _defineProperty(this, "_subject", "");

    _defineProperty(this, "_sender", void 0);

    _defineProperty(this, "_representing", void 0);

    _defineProperty(this, "_receiving", void 0);

    _defineProperty(this, "_receivingRepresenting", void 0);

    _defineProperty(this, "subjectPrefix", void 0);

    _defineProperty(this, "_subjectNormalized", void 0);

    _defineProperty(this, "priority", void 0);

    _defineProperty(this, "importance", void 0);

    _defineProperty(this, "_bodyText", void 0);

    _defineProperty(this, "_bodyHtml", void 0);

    _defineProperty(this, "_bodyRtf", void 0);

    _defineProperty(this, "bodyRtfCompressed", void 0);

    _defineProperty(this, "_sentOn", void 0);

    _defineProperty(this, "_receivedOn", void 0);

    _defineProperty(this, "internetMessageId", void 0);

    _defineProperty(this, "internetReferences", void 0);

    _defineProperty(this, "inReplyToId", void 0);

    _defineProperty(this, "transportMessageHeadersText", void 0);

    _defineProperty(this, "transportMessageHeaders", void 0);

    _defineProperty(this, "draft", void 0);

    _defineProperty(this, "readReceipt", void 0);

    _defineProperty(this, "messageEditorFormat", void 0);

    this.recipients = new Recipients();
    this.replyToRecipients = new Recipients();
    this.attachments = new Attachments();
    this.priority = MessagePriority.PRIO_NONURGENT;
    this.importance = MessageImportance.IMPORTANCE_NORMAL;
    this.iconIndex = MessageIconIndex.NewMail;
    this.draft = draft;
    this.readReceipt = readReceipt;
    this._bodyHtml = "";
    this._bodyText = "";
    this._sentOn = null;
    this._receivedOn = null;
  }

  sender(address, displayName) {
    this._sender = new Sender(address, displayName || "");
    return this;
  }

  bodyHtml(html) {
    this._bodyHtml = html;
    return this;
  }

  bodyText(txt) {
    this._bodyText = txt;
    return this;
  }

  bodyFormat(fmt) {
    this.messageEditorFormat = fmt;
    return this;
  }

  subject(subject) {
    this._subject = subject;

    this._setSubject();

    return this;
  }

  to(address, displayName) {
    this.recipients.addTo(address, displayName);
    return this;
  }

  cc(address, displayName) {
    this.recipients.addCc(address, displayName);
    return this;
  }

  bcc(address, displayName) {
    this.recipients.addBcc(address, displayName);
    return this;
  }

  replyTo(address, displayName) {
    this.replyToRecipients.addTo(address, displayName);
    return this;
  }

  tos(recipients) {
    recipients.forEach(r => this.to(r.address, r.name));
    return this;
  }

  ccs(recipients) {
    recipients.forEach(r => this.cc(r.address, r.name));
    return this;
  }

  bccs(recipients) {
    recipients.forEach(r => this.bcc(r.address, r.name));
    return this;
  }

  replyTos(recipients) {
    recipients.forEach(r => this.replyTo(r.address, r.name));
    return this;
  }

  sentOn(when) {
    this._sentOn = when;
    return this;
  }

  receivedOn(when) {
    this._receivedOn = when;
    return this;
  }

  attach(data, fileName, contentId = "", type = AttachmentType.ATTACH_BY_VALUE, creationTime = Date.now(), lastModificationTime = Date.now(), renderingPosition = -1, isContactPhoto = false) {
    this.attachments.add(...arguments);
    return this;
  }
  /**
   * the raw transport headers
   * @param headers
   */


  headers(headers) {
    this.transportMessageHeadersText = headers; // TODO... or not?
    // this.transportMessageHeaders = new MessageHeader(parseMessageHeaders(headers))

    return this;
  }

  msg() {
    this._writeToStorage();

    return super.saveToBuffer();
  }

  _setSubject() {
    if (!isNullOrEmpty(this.subjectPrefix)) {
      if (this._subject.startsWith(this.subjectPrefix)) {
        this._subjectNormalized = this._subject.slice(this.subjectPrefix.length);
      } else {
        const match = this._subject.match(subjectPrefixRegex);

        if (match != null) {
          this.subjectPrefix = match[1];
          this._subjectNormalized = match[2];
        }
      }
    } else if (!isNullOrEmpty(this._subject)) {
      this._subjectNormalized = this._subject;

      const match = this._subject.match(subjectPrefixRegex);

      if (match != null) {
        this.subjectPrefix = match[1];
        this._subjectNormalized = match[2];
      }
    } else {
      this._subjectNormalized = this._subject;
    }

    if (!this.subjectPrefix) this.subjectPrefix = "";
  }
  /**
   * write to the cfb of the underlying message
   */


  _writeToStorage() {
    const rootStorage = this._storage;
    if (this._messageClass === MessageClass.Unknown) this._messageClass = MessageClass.IPM_Note;
    this._messageSize += this.recipients.writeToStorage(rootStorage);
    this._messageSize += this.attachments.writeToStorage(rootStorage);
    const recipientCount = this.recipients.length;
    const attachmentCount = this.attachments.length;
    this._topLevelProperties.recipientCount = recipientCount;
    this._topLevelProperties.attachmentCount = attachmentCount;
    this._topLevelProperties.nextRecipientId = recipientCount;
    this._topLevelProperties.nextAttachmentId = attachmentCount;

    this._topLevelProperties.addProperty(PropertyTags.PR_ENTRYID, generateEntryId());

    this._topLevelProperties.addProperty(PropertyTags.PR_INSTANCE_KEY, generateInstanceKey());

    this._topLevelProperties.addProperty(PropertyTags.PR_STORE_SUPPORT_MASK, StoreSupportMaskConst, PropertyFlag.PROPATTR_READABLE);

    this._topLevelProperties.addProperty(PropertyTags.PR_STORE_UNICODE_MASK, StoreSupportMaskConst, PropertyFlag.PROPATTR_READABLE);

    this._topLevelProperties.addProperty(PropertyTags.PR_ALTERNATE_RECIPIENT_ALLOWED, true, PropertyFlag.PROPATTR_READABLE);

    this._topLevelProperties.addProperty(PropertyTags.PR_HASATTACH, attachmentCount > 0);

    if (this.transportMessageHeadersText) {
      this._topLevelProperties.addProperty(PropertyTags.PR_TRANSPORT_MESSAGE_HEADERS_W, this.transportMessageHeadersText);
    }

    const transportHeaders = this.transportMessageHeaders;

    if (transportHeaders) {
      if (!isNullOrWhiteSpace(transportHeaders.messageId)) {
        this._topLevelProperties.addProperty(PropertyTags.PR_INTERNET_MESSAGE_ID_W, transportHeaders.messageId);
      }

      const refCount = transportHeaders.references.length;

      if (refCount > 0) {
        this._topLevelProperties.addProperty(PropertyTags.PR_INTERNET_REFERENCES_W, transportHeaders.references[refCount - 1]);
      }

      const replCount = transportHeaders.inReplyTo.length;

      if (replCount > 0) {
        this._topLevelProperties.addProperty(PropertyTags.PR_IN_REPLY_TO_ID_W, transportHeaders.inReplyTo[replCount - 1]);
      }
    }

    if (!isNullOrWhiteSpace(this.internetMessageId)) {
      this._topLevelProperties.addOrReplaceProperty(PropertyTags.PR_INTERNET_MESSAGE_ID_W, this.internetMessageId);
    }

    if (!isNullOrWhiteSpace(this.internetReferences)) {
      this._topLevelProperties.addOrReplaceProperty(PropertyTags.PR_INTERNET_REFERENCES_W, this.internetReferences);
    }

    if (!isNullOrWhiteSpace(this.inReplyToId)) {
      this._topLevelProperties.addOrReplaceProperty(PropertyTags.PR_IN_REPLY_TO_ID_W, this.inReplyToId);
    }

    let messageFlags = MessageFlags.MSGFLAG_UNMODIFIED;
    if (attachmentCount > 0) messageFlags |= MessageFlags.MSGFLAG_HASATTACH; // int Encoding.UTF8.CodePage == 65001

    this._topLevelProperties.addProperty(PropertyTags.PR_INTERNET_CPID, 65001);

    this._topLevelProperties.addProperty(PropertyTags.PR_BODY_W, this._bodyText);

    if (!isNullOrEmpty(this._bodyHtml) && !this.draft) {
      this._topLevelProperties.addProperty(PropertyTags.PR_HTML, this._bodyHtml);

      this._topLevelProperties.addProperty(PropertyTags.PR_RTF_IN_SYNC, false);
    } else if (isNullOrWhiteSpace(this._bodyRtf) && !isNullOrWhiteSpace(this._bodyHtml)) {
      this._bodyRtf = Strings.escapeRtf(this._bodyHtml);
      this.bodyRtfCompressed = true;
    }

    if (!isNullOrWhiteSpace(this._bodyRtf)) {
      this._topLevelProperties.addProperty(PropertyTags.PR_RTF_COMPRESSED, compress(stringToUtf8Array(this._bodyRtf)));

      this._topLevelProperties.addProperty(PropertyTags.PR_RTF_IN_SYNC, this.bodyRtfCompressed);
    }

    if (this.messageEditorFormat !== MessageEditorFormat.EDITOR_FORMAT_DONTKNOW) {
      this._topLevelProperties.addProperty(PropertyTags.PR_MSG_EDITOR_FORMAT, this.messageEditorFormat);
    } // TODO: SentOn.HasValue


    if (this._sentOn == null) this._sentOn = new Date(); // TODO: _receivedOn.HasValue?

    if (this._receivedOn != null) {
      this._topLevelProperties.addProperty(PropertyTags.PR_MESSAGE_DELIVERY_TIME, dateToFileTime(this._receivedOn));
    } // was SentOn.Value.ToUniversalTime()


    this._topLevelProperties.addProperty(PropertyTags.PR_CLIENT_SUBMIT_TIME, dateToFileTime(this._sentOn));

    this._topLevelProperties.addProperty(PropertyTags.PR_ACCESS, MapiAccess.MAPI_ACCESS_DELETE | MapiAccess.MAPI_ACCESS_MODIFY | MapiAccess.MAPI_ACCESS_READ);

    this._topLevelProperties.addProperty(PropertyTags.PR_ACCESS_LEVEL, MapiAccess.MAPI_ACCESS_MODIFY);

    this._topLevelProperties.addProperty(PropertyTags.PR_OBJECT_TYPE, MapiObjectType.MAPI_MESSAGE);

    this._setSubject();

    this._topLevelProperties.addProperty(PropertyTags.PR_SUBJECT_W, this._subject);

    this._topLevelProperties.addProperty(PropertyTags.PR_NORMALIZED_SUBJECT_W, this._subjectNormalized);

    this._topLevelProperties.addProperty(PropertyTags.PR_SUBJECT_PREFIX_W, this.subjectPrefix);

    this._topLevelProperties.addProperty(PropertyTags.PR_CONVERSATION_TOPIC_W, this._subjectNormalized); // http://www.meridiandiscovery.com/how-to/e-mail-conversation-index-metadata-computer-forensics/
    // http://stackoverflow.com/questions/11860540/does-outlook-embed-a-messageid-or-equivalent-in-its-email-elements
    // propertiesStream.AddProperty(PropertyTags.PR_CONVERSATION_INDEX, Subject)
    // TODO: Change modification time when this message is opened and only modified


    const utcNow = Date.now();

    this._topLevelProperties.addProperty(PropertyTags.PR_CREATION_TIME, utcNow);

    this._topLevelProperties.addProperty(PropertyTags.PR_LAST_MODIFICATION_TIME, utcNow);

    this._topLevelProperties.addProperty(PropertyTags.PR_PRIORITY, this.priority);

    this._topLevelProperties.addProperty(PropertyTags.PR_IMPORTANCE, this.importance); // was CultureInfo.CurrentCulture.LCID


    this._topLevelProperties.addProperty(PropertyTags.PR_MESSAGE_LOCALE_ID, localeId());

    if (this.draft) {
      messageFlags |= MessageFlags.MSGFLAG_UNSENT;
      this.iconIndex = MessageIconIndex.UnsentMail;
    }

    if (this.readReceipt) {
      this._topLevelProperties.addProperty(PropertyTags.PR_READ_RECEIPT_REQUESTED, true);

      const reportTag = new ReportTag(this._subject);

      this._topLevelProperties.addProperty(PropertyTags.PR_REPORT_TAG, reportTag.toByteArray());
    }

    this._topLevelProperties.addProperty(PropertyTags.PR_MESSAGE_FLAGS, messageFlags);

    this._topLevelProperties.addProperty(PropertyTags.PR_ICON_INDEX, this.iconIndex);

    if (!!this._sender) this._sender.writeProperties(this._topLevelProperties);
    if (!!this._receiving) this._receiving.writeProperties(this._topLevelProperties);
    if (!!this._receivingRepresenting) this._receivingRepresenting.writeProperties(this._topLevelProperties);
    if (!!this._representing) this._representing.writeProperties(this._topLevelProperties);

    if (recipientCount > 0) {
      const displayTo = [];
      const displayCc = [];
      const displayBcc = [];

      for (const recipient of this.recipients) {
        switch (recipient.recipientType) {
          case RecipientType.To:
            if (!isNullOrWhiteSpace(recipient.displayName)) {
              displayTo.push(recipient.displayName);
            } else if (!isNullOrWhiteSpace(recipient.email)) {
              displayTo.push(recipient.email);
            }

            break;

          case RecipientType.Cc:
            if (!isNullOrWhiteSpace(recipient.displayName)) {
              displayCc.push(recipient.displayName);
            } else if (!isNullOrWhiteSpace(recipient.email)) {
              displayCc.push(recipient.email);
            }

            break;

          case RecipientType.Bcc:
            if (!isNullOrWhiteSpace(recipient.displayName)) {
              displayBcc.push(recipient.displayName);
            } else if (!isNullOrWhiteSpace(recipient.email)) {
              displayBcc.push(recipient.email);
            }

            break;

          default:
            throw new Error('RecipientType out of Range: ' + recipient.recipientType);
        }
      }

      const replyToRecipients = [];

      for (const recipient of this.replyToRecipients) {
        replyToRecipients.push(recipient.email);
      }

      this._topLevelProperties.addProperty(PropertyTags.PR_DISPLAY_TO_W, displayTo.join(';'), PropertyFlag.PROPATTR_READABLE);

      this._topLevelProperties.addProperty(PropertyTags.PR_DISPLAY_CC_W, displayCc.join(';'), PropertyFlag.PROPATTR_READABLE);

      this._topLevelProperties.addProperty(PropertyTags.PR_DISPLAY_BCC_W, displayBcc.join(';'), PropertyFlag.PROPATTR_READABLE);

      this._topLevelProperties.addProperty(PropertyTags.PR_REPLY_RECIPIENT_NAMES_W, replyToRecipients.join(';'), PropertyFlag.PROPATTR_READABLE);
    }
  }

}

export { cfb$1 as CFB, Email };
//# sourceMappingURL=oxmsg.js.map
