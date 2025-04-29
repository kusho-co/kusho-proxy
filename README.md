# kusho-ai-proxy
Local proxy server for routing API calls made during test execution on KuahoAI webapp. This is an alternative to KushoAI Chrome extension for proxying API calls in case the extension is blocked by your infra or you're using a non-chromium browser. 

This is a node application, so you need to have node 18 or above installed.

// TODO: Instructions about installing node using nvm

// TODO: How to run the proxy server

Dockerized version of this proxy is coming soon. You can deploy the dockerized proxy on your infra and route all request via this deployed proxy if you don't want every person in the team to setup a separate proxy.

NOTE: This proxy works only with individual test suite level API calls. We'll soon port this to E2E tests as well. 
