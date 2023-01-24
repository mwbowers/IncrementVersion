![Test the action](https://github.com/mwbowers/increment-version/workflows/Test%20the%20action/badge.svg)

# Project Version
GitHub action to increment the Version provided

## Usage
Create new `.github/workflows/dostuff.yml` file:

```yml
name: Do stuff
on:
  push:
    branches:
      - master

jobs:
  DoStuff:
    name: Do Stuff
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Update Version
        id: update_version
        uses: mwbowers81/update-version
        with:
          VERSION: 1.2.3.4
          INCREMENT_POSITION: 3

      -name: Next Step
       run: echo "${{ steps.get_version.outputs.VERSION }}"
```

## Inputs

Input | Description
--- | ---
VERSION | Version number to increment
INCREMENT_POSITION | Position to increment. 1 = Major, 2 = Minor, 3 = Build (default), 4 = Revision

## Outputs

Output | Description
--- | ---
VERSION | Incremented Version
