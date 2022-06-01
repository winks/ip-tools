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

function getRemoteAddress (connInfo: ConnInfo): Deno.NetAddr {
  assertIsNetAddr(connInfo.remoteAddr);
  return connInfo.remoteAddr;
}

function getHost (host: String) {
  var p = host.split(':')
  if (p.length < 3) {
    return p[0];
  } else {
    return host;
  }
}

function fullInfo (clientIp: String, request: any, url: URL) {
  var body = [];

  const left = 21;
  const headers = ['user-agent', 'accept', 'accept-language', 'accept-encoding', 'connection'];

  body.push("REMOTE_ADDR".padEnd(left) + `: ${clientIp}`);
  headers.forEach(el => {
    body.push(el.padEnd(left) + `: ${request.headers.get(el)}`);
  });
  body.push("REQUEST_METHOD".padEnd(left) + `: ${request.method}`);
  body.push("HTTP_HOST".padEnd(left)      + `: ${getHost(url.host)}`);
  body.push("SCRIPT_NAME".padEnd(left)    + `: ${url.pathname}`);
  body.push("REQUEST_URI".padEnd(left)    + `: ${url.pathname}${url.search}`);

  return body.join('\n');
}

const handler: Handler = (request, connInfo) => {
  const url = new URL(request.url);
  if (url.pathname == '/favicon.ico') {
    return new Response('');
  }
  const serverHost = getHost(url.host);
  const subdomain = serverHost.split('.')[0];

  const {hostname, port} = getRemoteAddress(connInfo);
  const clientIp = hostname;

  var body = '';

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
