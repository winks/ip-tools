import { getHost } from "./web.ts";

export function fullInfo(clientIp: string, request: Request, url: URL) {
  const body = [];
  const left = 21;
  const headers = [
    "user-agent",
    "accept",
    "accept-language",
    "accept-encoding",
    "connection",
  ];

  body.push("remote-addr".padEnd(left) + `: ${clientIp}`);
  headers.forEach((el) => {
    body.push(el.padEnd(left) + `: ${request.headers.get(el)}`);
  });
  body.push("request-method".padEnd(left) + `: ${request.method}`);
  body.push("http-host".padEnd(left) + `: ${getHost(url.host)}`);
  body.push("script-name".padEnd(left) + `: ${url.pathname}`);
  body.push("request-uri".padEnd(left) + `: ${url.pathname}${url.search}`);
  body.push("ssl".padEnd(left) + `: ${url.protocol == "https:"}`);

  return body.join("\n");
}

export function showAscii() {
  return `
  Char  Dec  Oct  Hex | Char  Dec  Oct  Hex | Char  Dec  Oct  Hex | Char Dec  Oct   Hex
  -------------------------------------------------------------------------------------
  (nul)   0 0000 0x00 | (sp)   32 0040 0x20 | @      64 0100 0x40 | \`      96 0140 0x60
  (soh)   1 0001 0x01 | !      33 0041 0x21 | A      65 0101 0x41 | a      97 0141 0x61
  (stx)   2 0002 0x02 | "      34 0042 0x22 | B      66 0102 0x42 | b      98 0142 0x62
  (etx)   3 0003 0x03 | #      35 0043 0x23 | C      67 0103 0x43 | c      99 0143 0x63
  (eot)   4 0004 0x04 | $      36 0044 0x24 | D      68 0104 0x44 | d     100 0144 0x64
  (enq)   5 0005 0x05 | %      37 0045 0x25 | E      69 0105 0x45 | e     101 0145 0x65
  (ack)   6 0006 0x06 | &      38 0046 0x26 | F      70 0106 0x46 | f     102 0146 0x66
  (bel)   7 0007 0x07 | '      39 0047 0x27 | G      71 0107 0x47 | g     103 0147 0x67
  (bs)    8 0010 0x08 | (      40 0050 0x28 | H      72 0110 0x48 | h     104 0150 0x68
  (ht)    9 0011 0x09 | )      41 0051 0x29 | I      73 0111 0x49 | i     105 0151 0x69
  (nl)   10 0012 0x0a | *      42 0052 0x2a | J      74 0112 0x4a | j     106 0152 0x6a
  (vt)   11 0013 0x0b | +      43 0053 0x2b | K      75 0113 0x4b | k     107 0153 0x6b
  (np)   12 0014 0x0c | ,      44 0054 0x2c | L      76 0114 0x4c | l     108 0154 0x6c
  (cr)   13 0015 0x0d | -      45 0055 0x2d | M      77 0115 0x4d | m     109 0155 0x6d
  (so)   14 0016 0x0e | .      46 0056 0x2e | N      78 0116 0x4e | n     110 0156 0x6e
  (si)   15 0017 0x0f | /      47 0057 0x2f | O      79 0117 0x4f | o     111 0157 0x6f
  (dle)  16 0020 0x10 | 0      48 0060 0x30 | P      80 0120 0x50 | p     112 0160 0x70
  (dc1)  17 0021 0x11 | 1      49 0061 0x31 | Q      81 0121 0x51 | q     113 0161 0x71
  (dc2)  18 0022 0x12 | 2      50 0062 0x32 | R      82 0122 0x52 | r     114 0162 0x72
  (dc3)  19 0023 0x13 | 3      51 0063 0x33 | S      83 0123 0x53 | s     115 0163 0x73
  (dc4)  20 0024 0x14 | 4      52 0064 0x34 | T      84 0124 0x54 | t     116 0164 0x74
  (nak)  21 0025 0x15 | 5      53 0065 0x35 | U      85 0125 0x55 | u     117 0165 0x75
  (syn)  22 0026 0x16 | 6      54 0066 0x36 | V      86 0126 0x56 | v     118 0166 0x76
  (etb)  23 0027 0x17 | 7      55 0067 0x37 | W      87 0127 0x57 | w     119 0167 0x77
  (can)  24 0030 0x18 | 8      56 0070 0x38 | X      88 0130 0x58 | x     120 0170 0x78
  (em)   25 0031 0x19 | 9      57 0071 0x39 | Y      89 0131 0x59 | y     121 0171 0x79
  (sub)  26 0032 0x1a | :      58 0072 0x3a | Z      90 0132 0x5a | z     122 0172 0x7a
  (esc)  27 0033 0x1b | ;      59 0073 0x3b | [      91 0133 0x5b | {     123 0173 0x7b
  (fs)   28 0034 0x1c | <      60 0074 0x3c | \\      92 0134 0x5c | |     124 0174 0x7c
  (gs)   29 0035 0x1d | =      61 0075 0x3d | ]      93 0135 0x5d | }     125 0175 0x7d
  (rs)   30 0036 0x1e | >      62 0076 0x3e | ^      94 0136 0x5e | ~     126 0176 0x7e
  (us)   31 0037 0x1f | ?      63 0077 0x3f | _      95 0137 0x5f | (del) 127 0177 0x7f`;
}

export function showHelp() {
  return `
  Display the ip address you're connecting from, and other things:

  ?help                  - show this help
  ?ascii                 - show ascii table

  ?ts=1234               - show ISO 8601 date for unix timestamp 1234
  ?d=2006-05-04T11:12:13 - show unix timestamp for ISO 8601 date, assumes UTC
  ?hex=1234              - show hexadecimal value for 1234
  ?dec=abcd              - show decimal value for abcd
  ?bin=1234              - show binary value for 1234

  ?auto=                 - try to guess the task:

  1234 in hex
  abcd in decimal
  23 in binary
  100km in miles
  10ft in cm
  946684801 as date
  2000-01-01T00:00:01 as timestamp`;
}

export function hex(v: string | null): string {
  const rv = parseInt(`${v}`);
  return rv.toString(16);
}

export function dec(v: string | null): string {
  const rv = parseInt(`${v}`, 16);
  return `${rv}`;
}

export function bin(v: string | null): string {
  const rv = parseInt(`${v}`);
  return rv.toString(2);
}

export function ts(v: string | null): string {
  if (v == null || v == "") {
    return "Error";
  }
  if (v == "now") {
    return new Date().toISOString();
  }
  const rv = parseInt(`${v}`);
  if (isNaN(rv)) {
    return "NaN";
  }
  return new Date(rv * 1000).toISOString();
}

export function dt(v: string | null): string {
  const rv = `${v}`;
  if (v == null || v == "") {
    return "Error";
  }
  if (v == "now") {
    return `${Math.floor(Date.now() / 1000)}`;
  }
  return `${Math.floor(new Date(rv).getTime() / 1000)}`;
}

export function imperialInputToIn(v: string | null): number {
  let xv = `${v}`;
  const rx1 = /([0-9]+)[\']([0-9]+)[\"]/;
  let r1 = xv.match(rx1);
  if (r1) {
    return parseFloat(r1[1]) * 12 + parseFloat(r1[2]);
  }
  const rx2 = /([0-9]+)ft([0-9]+)(in)?/;
  let r2 = xv.match(rx2);
  if (r2) {
    return parseFloat(r2[1]) * 12 + parseFloat(r2[2]);
  }
  if (xv.endsWith("in") || xv.endsWith('"')) {
    xv = xv.replace("in", "").replace('"', "");
    return parseFloat(xv);
  }
  if (xv.endsWith("ft") || xv.endsWith("'")) {
    xv = xv.replace("ft", "").replace("'", "");
    return parseFloat(xv) * 12;
  }
  if (xv.endsWith("mi")) {
    xv = xv.replace("mi", "");
    return parseFloat(xv) * 63360;
  }
  return 0;
}

export function metricInputToMm(v: string | null): number {
  let xv = `${v}`;
  if (xv.endsWith("mm")) {
    xv = xv.replace("mm", "");
    return parseFloat(xv);
  } else if (xv.endsWith("cm")) {
    xv = xv.replace("cm", "");
    return parseFloat(xv) * 10;
  } else if (xv.endsWith("km")) {
    xv = xv.replace("km", "");
    return parseFloat(xv) * 10 * 100 * 1000;
  } else if (xv.endsWith("m")) {
    xv = xv.replace("m", "");
    return parseFloat(xv) * 10 * 100;
  } else {
    return 0;
  }
}

export function metricToMile(v: string | null): string {
  return `${metricInputToMm(v) / (10 * 100 * 1000 * 1.60934)} mi`;
}

export function metricToFoot(v: string | null): string {
  return `${(metricInputToMm(v) / (10 * 30.48)).toFixed(3)} ft`;
}

export function metricToInch(v: string | null): string {
  return `${(metricInputToMm(v) / (10 * 2.54)).toFixed(3)} in`;
}

export function imperialToKm(v: string | null): string {
  return `${(imperialInputToIn(v) / (10 * 2.54)).toFixed(3)} km`;
}

export function imperialToM(v: string | null): string {
  return `${(imperialInputToIn(v) * 0.0254).toFixed(3)} m`;
}

export function imperialToCm(v: string | null): string {
  return `${(imperialInputToIn(v) * 2.54).toFixed(3)} cm`;
}

export function imperialToMm(v: string | null): string {
  return `${(imperialInputToIn(v) * 25.4).toFixed(3)} mm`;
}

export function id(v: string) {
  return v;
}

export function deduce(v: string | null): string {
  if (v == null || v.trim() == "") {
    return "Error";
  }

  type weirdMap = { [key: string]: (a: string | null) => string };

  const mst: weirdMap = {
    'date for '     : dt,
    'timestamp for' : ts,
  };

  for (const k of Object.keys(mst)) {
    if (v.startsWith(k)) {
      return mst[k](v.replace(k, ""));
    }
  }

  const mend: weirdMap = {
    ' in hex'     : hex,
    ' as hex'     : hex,
    ' in binary'  : bin,
    ' as binary'  : bin,
    ' in decimal' : dec,
    ' as decimal' : dec,

    ' in miles'   : metricToMile,
    ' in mi'      : metricToMile,
    ' in feet'    : metricToFoot,
    ' in ft'      : metricToFoot,
    ' in inch'    : metricToInch,
    ' in in'      : metricToInch,

    ' in km'      : imperialToKm,
    ' in cm'      : imperialToCm,
    ' in mm'      : imperialToMm,
    ' in m'       : imperialToM,

    ' as date'     : ts,
    ' as timestamp': dt,
  };

  for (const k of Object.keys(mend)) {
    if (v.endsWith(k)) {
      return mend[k](v.replace(k, ""));
    }
  }
  return "Error";
}
