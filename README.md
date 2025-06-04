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
![Go to Settings](https://private-user-images.githubusercontent.com/91093517/451340656-7f0a35b5-7549-4a3a-b38e-c05568bd0ca2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkwMzUwMDQsIm5iZiI6MTc0OTAzNDcwNCwicGF0aCI6Ii85MTA5MzUxNy80NTEzNDA2NTYtN2YwYTM1YjUtNzU0OS00YTNhLWIzOGUtYzA1NTY4YmQwY2EyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA0VDEwNTgyNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg3NDQ2NTBjYWI4OGFjYjJjYjhhYTY4ZTNmNzQwNmEwYjAzZjgzNDZkZThkNWFkN2Q2ODM5MzFmYTIyYWZmOWEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.5CgqJmdjabslPyGQ8QuI2vj6g64kBg1J46AcjJh-swI)

2. Enable proxy usage. This will route API calls made from KushoAI via proxy instead of Chrome Extension
![Enable proxy](https://private-user-images.githubusercontent.com/91093517/451340843-71146e61-f1f7-4c48-8992-72aa31c1166f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkwMzUwOTYsIm5iZiI6MTc0OTAzNDc5NiwicGF0aCI6Ii85MTA5MzUxNy80NTEzNDA4NDMtNzExNDZlNjEtZjFmNy00YzQ4LTg5OTItNzJhYTMxYzExNjZmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA0VDEwNTk1NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZmM2Y3MTdkYzczYzQyNGJhZWM4MGRmY2Y0ZWIyZTE4ZTg2YWIwNzZmNjVlYjkzZDNhYjgxM2JhMzJkNmI0YmEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.uesJUCIll0s990KrymTHtDb7C9cOTE84v44KYK7sJbw)

3. [Optional] Change the proxy URL if you're using a different port/hostname 
![Change the URL, if applicable](https://private-user-images.githubusercontent.com/91093517/451340925-cd86fd8c-c9f2-4a3b-9884-f7478a4db169.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkwMzUxMzAsIm5iZiI6MTc0OTAzNDgzMCwicGF0aCI6Ii85MTA5MzUxNy80NTEzNDA5MjUtY2Q4NmZkOGMtYzlmMi00YTNiLTk4ODQtZjc0NzhhNGRiMTY5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjA0VDExMDAzMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY5ZjMwOWZkZTAwNGQwYTg4N2QyNTQ5YmE4Yzc4ZDRhNzg5MmMxYzYwZjk5ZDRlMGNhMjcwNTA0NWE2NzExOTUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.aBJfzBaf76A_KHXN6jkyzS2SjS97M0U2R5lIvBO01eI)

## Coming Soon

- **Dockerized version**: Deploy the dockerized proxy on your infrastructure and route all requests via this deployed proxy if you don't want every person in the team to setup a separate proxy.

## Support

If you encounter any issues or have questions, please reach out to us at support@kusho.ai
