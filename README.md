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
   source ~/.bashrc  # or ~/.bash_profile in some terminals
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

1. Go to Settings from the top-right menu
![Go to Settings](https://ibb.co/G3P8V1H3)

2. Enable proxy usage. This will route API calls made from KushoAI via proxy instead of Chrome Extension
![Enable proxy](https://ibb.co/1JRJhtBc)

3. [Optional] Change the proxy URL if you're using a different port/hostname 
![Change the URL, if applicable](https://ibb.co/prK9StRM)

## Coming Soon

- **Dockerized version**: Deploy the dockerized proxy on your infrastructure and route all requests via this deployed proxy if you don't want every person in the team to setup a separate proxy.

## Support

If you encounter any issues or have questions, please reach out to us at support@kusho.ai
