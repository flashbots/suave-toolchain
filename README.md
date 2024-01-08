## `Suave-toolchain` Github action

This Github action installs `suave-geth`.

### Example workflow

```yaml
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: Suapp
    steps:
      - name: Install suave-geth
        uses: flashbots/suave-toolchain@v0.1

      - name: Which suave-geth
        run: suave-geth version
```

### Inputs

| **Name**  | **Required** | **Default** | **Description**                                | **Type** |
| --------- | ------------ | ----------- | ---------------------------------------------- | -------- |
| `version` | No           | `latest`    | Version to install, e.g. `latest` or `v0.1.0`. | string   |
