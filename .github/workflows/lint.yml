name: Lint
on:
  pull_request:
  push:
    branches:
      - main

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Prettify code
        uses: creyD/prettier_action@v4.2
        with:
          prettier_options: --check src
