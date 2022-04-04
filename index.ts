import {
  serve,
  type ConnInfo,
  type Handler,
  type ServeInit
} from "https://deno.land/std@0.125.0/http/server.ts";

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

const handler: Handler = (request, connInfo) => {
  const url = new URL(request.url);
  if (url.pathname == '/favicon.ico') {
    return new Response('');
  }
  const {hostname, port} = getRemoteAddress(connInfo);
  //console.log(request.headers);
  console.log(request);
  //console.log("Path:", url.pathname);
  //console.log("Query parameters:", url.searchParams);

  const hd = [ 'user-agent', 'accept', 'accept-language', 'accept-encoding', 'connection'];

  var body = '';
  const left = 21;

  if (url.pathname == '/i') {
    body += "REMOTE_ADDR".padEnd(left) + `: ${hostname}\n`;
    hd.forEach(el => {
      body += el.padEnd(left) + `: ${request.headers.get(el)}\n`;
    });
    body += "REQUEST_METHOD".padEnd(left) + `: ${request.method}\n`;
    body += "HTTP_HOST".padEnd(left) + `: ${url.host}\n`;
    body += "SCRIPT_NAME".padEnd(left) + `: ${url.pathname}\n`;
    body += "REQUEST_URI".padEnd(left) + `: ${url.pathname}${url.search}\n`;
  } else {
    body = `${hostname}\n`;
  }
  return new Response(body, {
    headers: { "content-type": "text/plain" },
  });
};

const init: ServeInit = {port: 8000};

serve(handler, init);
console.log(`Listening on :${init.port}`);
