
# Environment setup src_node (nodejs)
* install nodejs
* npm install
* configure .env file: api url, mode  and certificates path (if they apply)

# To run a regression, this are the commands
* npm test (test from console, mode should be test or debug to have all request and response bodies in console)
* npm run regression (run tests with metadata for reports, mode should be regression)
* npm run report (should run only after npm run regression)

  