import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";

import { bin, dec, dt, getHost, hex, p3, ts } from "./lib.ts";

Deno.test("test hex()", () => {
  const rv = hex("123456");
  assertEquals(rv, "1e240");
});

Deno.test("test dec()", () => {
  const rv = dec("1e240");
  assertEquals(rv, "123456");
});

Deno.test("test bin()", () => {
  const rv = bin("8");
  assertEquals(rv, "1000");
});

Deno.test("test ts()", () => {
  const rv = ts("1005568496");
  assertEquals(rv, "2001-11-12T12:34:56.000Z");
});

Deno.test("test dt()", () => {
  const rv = dt("2001-11-12T12:34:56Z");
  assertEquals(rv, "1005568496");
});

Deno.test("test p3()", () => {
  const rv = p3("/bin/8");
  assertEquals(rv, "8");
});

Deno.test("test getHost()", () => {
  const rv1 = getHost("foo.example.org");
  assertEquals(rv1, "foo.example.org");

  const rv2 = getHost("foo.example.org:80");
  assertEquals(rv2, "foo.example.org");

  const rv3 = getHost("::1");
  assertEquals(rv3, "::1");

  const rv4 = getHost("2600:1901:0:6d85::");
  assertEquals(rv4, "2600:1901:0:6d85::");
});
