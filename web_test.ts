import { assertEquals } from "jsr:@std/assert@1.0.8";

import { getHost, p3 } from "./web.ts";

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

Deno.test("test p3()", () => {
  const rv = p3("/bin/8");
  assertEquals(rv, "8");
});
