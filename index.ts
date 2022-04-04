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
  const {hostname, port} = getRemoteAddress(connInfo);
  const message = `${hostname}\n`;
  return new Response(message, {
    headers: { "content-type": "text/plain" },
  });
};

const init: ServeInit = {port: 8000};

serve(handler, init);
console.log(`Listening on :${init.port}`);
