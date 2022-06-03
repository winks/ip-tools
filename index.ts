import {
  type Handler,
  serve,
  type ServeInit,
} from "https://deno.land/std@0.142.0/http/server.ts";

import {
  bin,
  dec,
  dt,
  EMPTY_GIF,
  fullInfo,
  getHost,
  getRemoteAddress,
  hex,
  p3,
  showAscii,
  showHelp,
  ts,
} from "./lib.ts";

const handler: Handler = (request, connInfo) => {
  const url = new URL(request.url);

  if (url.pathname == "/favicon.ico") {
    return new Response(new Blob([EMPTY_GIF]), {
      headers: { "Content-Type": "image/gif" },
    });
  }
  const serverHost = getHost(url.host);
  const subdomain = serverHost.split(".")[0];
  const clientIp = getRemoteAddress(connInfo);

  let body = "";

  if (url.pathname == "/ip") {
    body = clientIp;
  } else if (url.pathname == "/i" || subdomain == "i") {
    body = fullInfo(clientIp, request, url);
  } else {
    if (url.pathname == "/ascii" || url.searchParams.get("ascii") !== null) {
      body = showAscii();
    } else if (
      url.pathname == "/help" || url.searchParams.get("help") !== null
    ) {
      body = showHelp();
    } else if (url.searchParams.get("hex") !== null) {
      body = hex(url.searchParams.get("hex"));
    } else if (url.pathname.startsWith("/hex/")) {
      const val = p3(url.pathname);
      body = (val.length > 0) ? hex(val) : "";
    } else if (url.searchParams.get("dec") !== null) {
      body = dec(url.searchParams.get("dec"));
    } else if (url.pathname.startsWith("/dec/")) {
      const val = p3(url.pathname);
      body = (val.length > 0) ? dec(val) : "";
    } else if (url.searchParams.get("bin") !== null) {
      body = bin(url.searchParams.get("bin"));
    } else if (url.pathname.startsWith("/bin/")) {
      const val = p3(url.pathname);
      body = (val.length > 0) ? bin(val) : "";
    } else if (url.searchParams.get("d") !== null) {
      body = dt(url.searchParams.get("d"));
    } else if (url.pathname.startsWith("/d/")) {
      const val = p3(url.pathname);
      body = (val.length > 0) ? dt(val) : "";
    } else if (url.searchParams.get("ts") !== null) {
      body = ts(url.searchParams.get("ts"));
    } else if (url.pathname.startsWith("/ts/")) {
      const val = p3(url.pathname);
      body = (val.length > 0) ? ts(val) : "";
    } else {
      body = clientIp;
    }
  }
  return new Response(`${body}\n`, {
    headers: { "content-type": "text/plain" },
  });
};

const init: ServeInit = { port: 8000 };

serve(handler, init);
