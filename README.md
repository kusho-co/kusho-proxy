# kusho-proxy

Local proxy server for routing API calls made during test execution on KushoAI webapp. This is an alternative to KushoAI Chrome extension for proxying API calls in case the extension is blocked by your infrastructure or you're using a non-chromium browser.

## Prerequisites

This is a Node.js application that requires Node.js 20 or above.

## Installation

### Install Node.js using NVM (Recommended)

1. **Install NVM (Node Version Manager)**
   
   For macOS/Linux:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```
   
   For Windows, use [nvm-windows](https://github.com/coreybutler/nvm-windows):
   - Download and install the latest release from the GitHub repository

2. **Restart your terminal or run:**
   ```bash
   source ~/.bashrc
   ```

3. **Install Node.js 20:**
   ```bash
   nvm install 20
   nvm use 20
   ```

4. **Verify installation:**
   ```bash
   node --version
   npm --version
   ```

### Setup the Proxy Server

1. **Clone this repository:**
   ```bash
   git clone https://github.com/kusho-co/kusho-proxy.git
   cd kusho-proxy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the proxy server:**
   ```bash
   node proxy.js
   ```

The proxy server will start running and be ready to handle API calls from the KushoAI webapp.

## Usage

Once the proxy server is running, configure your KushoAI webapp to route API calls through this local proxy instead of using the Chrome extension.

## Coming Soon

- **Dockerized version**: Deploy the dockerized proxy on your infrastructure and route all requests via this deployed proxy if you don't want every person in the team to setup a separate proxy.
- **E2E test support**: Currently, this proxy works only with individual test suite level API calls. We'll soon port this to E2E tests as well.

## Support

If you encounter any issues or have questions, please refer to the KushoAI documentation or contact support.
