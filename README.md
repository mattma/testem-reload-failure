Testem Reload Issue
===================

This repo is meant to be a testing ground for live-reloading tests with [Testem](https://github.com/airportyh/testem).

### Problem

It appears that the current version of Testem does not trigger a restart of the test suite upon file-changes. ( v0.6.24 )

### Reproduction

1. Clone this repo.
2. Run `npm install`.
3. Run `npm test` (which just starts testem).
   [should open by default] Open browser to http://localhost:7357/
5. Change `tests/tests.js`, uncomment line 98 for the failing test, or change the passing tests
6. Save change.
7. Tests are not re-run.

Note: test will be rerun if I refresh the browser or hit `enter` in the command line
Note: i am using the Global `testem`, not the local node_modules
