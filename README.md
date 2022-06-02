# ip-tools

Example output:

```
# curl /
127.0.0.1

# curl /i
REMOTE_ADDR          : 127.0.0.1
user-agent           : Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0
accept               : text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
accept-language      : en-US,en;q=0.5
accept-encoding      : gzip, deflate, br
connection           : null
REQUEST_METHOD       : GET
HTTP_HOST            : localhost
SCRIPT_NAME          : /i
REQUEST_URI          : /i
```

## Development

~/.deno/bin/deno run --allow-net=:8000 --watch index.ts
