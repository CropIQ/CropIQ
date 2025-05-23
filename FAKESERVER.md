# Fake server guide

## Setup
- install json-server `pnpm install -g json-server`.
- you can change `fake-server.json` file.
- run it with command: `json-server --watch fake-server.json --port 18080`
- [Check this out!!!](https://www.squash.io/how-to-use-json-server/)
- in file `.env.local` you need to set `NEXT_PUBLIC_API_HOST=http://localhost:18080`