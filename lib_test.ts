import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";

import { bin, dec, deduce, dt, hex, ts } from "./lib.ts";

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

Deno.test("test deduce() mm 1", () => {
  const rv = deduce("254mm in inch");
  assertEquals(rv, "10.000 in");
});

Deno.test("test deduce() hex 1", () => {
  const rv = deduce("123456 in hex");
  assertEquals(rv, "1e240");
});

Deno.test("test deduce() hex 2", () => {
  const rv = deduce("1e240 in decimal");
  assertEquals(rv, "123456");
});

Deno.test("test deduce() bin 1", () => {
  const rv = deduce("9 in binary");
  assertEquals(rv, "1001");
});

Deno.test("test deduce() metric cm", () => {
  const rv = deduce("1in in cm");
  assertEquals(rv, "2.540 cm");
});

Deno.test("test deduce() metric 2", () => {
  const rv = deduce("1ft in cm");
  assertEquals(rv, "30.480 cm");
});

Deno.test("test deduce() metric 3.1", () => {
  const rv = deduce("2 ft in mm");
  assertEquals(rv, "609.600 mm");
});

Deno.test("test deduce() metric 3.2", () => {
  const rv = deduce("1 mi in m");
  assertEquals(rv, "1609.344 m");
});
