import { type ConnInfo } from "https://deno.land/std@0.142.0/http/server.ts";

// https://stackoverflow.com/questions/71008150/get-remote-client-ip-address-in-deno
export function assertIsNetAddr(addr: Deno.Addr): asserts addr is Deno.NetAddr {
  if (!["tcp", "udp"].includes(addr.transport)) {
    throw new Error("Not a network address");
  }
}

export function getRemoteAddress(connInfo: ConnInfo): string {
  assertIsNetAddr(connInfo.remoteAddr);
  return connInfo.remoteAddr.hostname;
}

export function getHost(host: string) {
  const parts = host.split(":");
  if (parts.length < 3) {
    return parts[0];
  } else {
    return host;
  }
}

export function p3(v: string) {
  const parts = v.split("/");
  if (parts.length < 3) return "";
  return parts[2];
}
  
export const EMPTY_GIF = new Uint8Array([
  0x47,
  0x49,
  0x46,
  0x38,
  0x39,
  0x61,
  0x01,
  0x00,
  0x01,
  0x00,
  0x80,
  0x00,
  0x00,
  0xff,
  0xff,
  0xff,
  0x00,
  0x00,
  0x00,
  0x2c,
  0x00,
  0x00,
  0x00,
  0x00,
  0x01,
  0x00,
  0x01,
  0x00,
  0x00,
  0x02,
  0x02,
  0x44,
  0x01,
  0x00,
  0x3b,
]);
