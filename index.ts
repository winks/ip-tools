import {
  serve,
  type ConnInfo,
  type Handler,
  type ServeInit
} from "https://deno.land/std@0.141.0/http/server.ts";

// https://stackoverflow.com/questions/71008150/get-remote-client-ip-address-in-deno
function assertIsNetAddr (addr: Deno.Addr): asserts addr is Deno.NetAddr {
  if (!['tcp', 'udp'].includes(addr.transport)) {
    throw new Error('Not a network address');
  }
}

function getRemoteAddress (connInfo: ConnInfo): string {
  assertIsNetAddr(connInfo.remoteAddr);
  return connInfo.remoteAddr.hostname;
}

function getHost (host: string) {
  const parts = host.split(':')
  if (parts.length < 3) {
    return parts[0];
  } else {
    return host;
  }
}

function fullInfo (clientIp: string, request: Request, url: URL) {
  const body = [];
  const left = 21;
  const headers = ['user-agent', 'accept', 'accept-language', 'accept-encoding', 'connection'];

  body.push("remote-addr".padEnd(left)    + `: ${clientIp}`);
    headers.forEach(el => {
    body.push(el.padEnd(left)             + `: ${request.headers.get(el)}`);
  });
  body.push("request-method".padEnd(left) + `: ${request.method}`);
  body.push("http-host".padEnd(left)      + `: ${getHost(url.host)}`);
  body.push("script-name".padEnd(left)    + `: ${url.pathname}`);
  body.push("request-uri".padEnd(left)    + `: ${url.pathname}${url.search}`);
  body.push("ssl".padEnd(left)            + `: ${url.protocol == 'https:'}`);

  return body.join('\n');
}

const handler: Handler = (request, connInfo) => {
  const url = new URL(request.url);
  const EMPTY_GIF = new Uint8Array([
    0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00,
    0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3b
  ]);
  if (url.pathname == '/favicon.ico') {
    return new Response(new Blob([EMPTY_GIF]), { headers: {'Content-Type': 'image/gif'}});
  }
  const serverHost = getHost(url.host);
  const subdomain = serverHost.split('.')[0];

  const clientIp = getRemoteAddress(connInfo);

  let body = '';

  if (url.pathname == '/i' || subdomain == 'i2' || subdomain == 'i') {
    body = fullInfo(clientIp, request, url);
  } else {
    body = `${clientIp}\n`;
  }
  return new Response(body, {
    headers: { "content-type": "text/plain" },
  });
};

const init: ServeInit = {port: 8000};

serve(handler, init);
console.log(`Listening on :${init.port}`);
