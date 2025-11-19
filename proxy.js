const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const FormData = require('form-data');

const app = express();
const PORT = process.argv.length > 2 ? parseInt(process.argv[2]) : 3000;

// Middleware to enable CORS for all origins
app.use(cors());

// Basic request logging with morgan
app.use(morgan('dev'));

// Middleware to parse JSON body
app.use(express.json());

// Middleware to parse URL-encoded body
app.use(express.urlencoded({ extended: true }));

// Custom axios instance with interceptors for logging
const api = axios.create();

// Request interceptor
api.interceptors.request.use(request => {
  console.log(`REQUEST >> ${request.method.toUpperCase()} ${request.url}`);
  return request;
});

// Response interceptor
api.interceptors.response.use(
  response => {
    console.log(`RESPONSE << ${response.status} ${response.statusText}`);
    return response;
  },
  error => {
    if (error.response) {
      console.log('\n----- ERROR RESPONSE -----');
      console.log(`Status: ${error.response.status} ${error.response.statusText}`);
      console.log('Headers:', JSON.stringify(error.response.headers, null, 2));
      console.log('Body:', JSON.stringify(error.response.data, null, 2));
      console.log('--------------------------\n');
    } else {
      console.log('\n----- REQUEST ERROR -----');
      console.log(error.message);
      console.log('-------------------------\n');
    }
    return Promise.reject(error);
  }
);


// Proxy route
app.post('/proxy', async (req, res) => {
    const { request: { url, method = 'GET', json_body = {}, headers = {}, query_params = {}, xml_body = "" }, testCaseId, run_type, idempotent_key } = req.body;
    
    if (!url) {
        return res.status(400).send({ error: 'url is required' });
    }

    try {
        // Determine the request data format based on content type
        let requestData = json_body;
        const contentType = headers['content-type'] || headers['Content-Type'];

        // Check if XML body should be used
        const hasXmlContentType = contentType && (
            contentType.toLowerCase().includes('application/xml') ||
            contentType.toLowerCase().includes('text/xml')
        );

        if (hasXmlContentType && xml_body && xml_body.trim() !== '') {
            // Use XML body when XML content type is present and xml_body exists
            requestData = xml_body;
        } else if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
            // If json_body is already a string (e.g. "a=1&b=2"), use it directly
            if (typeof json_body === 'string') {
                requestData = json_body;
            } else {
                // Convert json_body object to URL-encoded string
                const formData = new URLSearchParams();
                Object.keys(json_body).forEach(key => {
                    // Handle arrays/objects if needed
                    const value = json_body[key];
                    if (typeof value === 'object') {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, value);
                    }
                });
                requestData = formData.toString();
            }
        } else if (contentType && contentType.includes('multipart/form-data')) {
            // Handle multipart/form-data
            const formData = new FormData();

            // Handle JSON fields
            if (typeof json_body === "object" && Object.entries(json_body).length > 0) {
                for (const key in json_body) {
                    const value = json_body[key];
                    // If value is object/array, stringify it
                    if (typeof value === "object") {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, value);
                    }
                }
            }

            // Handle XML body as a file part
            if (typeof xml_body === "string" && xml_body.trim().length > 0) {
                // Append as a "file" part with content-type application/xml
                formData.append("file", Buffer.from(xml_body), {
                    filename: "data.xml",
                    contentType: "application/xml"
                });
            }

            requestData = formData;

            // Update headers with FormData headers (includes boundary)
            Object.assign(headers, formData.getHeaders());
        }

        // Forward the request using axios
        const response = await api({
            url: url,
            method,
            data: requestData,
            headers,
            params: query_params,
        });

        // Respond with the target server's response
        res.status(200).send({
          response: response?.data,
          headers: response?.headers,
          statusCode: response?.status,
          error: response?.error,
          elapsedTime: response?.elapsedTime,
          responseSize: response?.responseSize,
          testCaseId: testCaseId,
          idempotent_key: idempotent_key,
          run_type: run_type,
          request: req.body.request,
        });
    } catch (error) {
        // Respond with the target server's response
        const response = error.response;
        res.status(200).send({
          response: response?.data,
          headers: response?.headers,
          statusCode: response?.status,
          error: response?.error,
          elapsedTime: response?.elapsedTime,
          responseSize: response?.responseSize,
          testCaseId: testCaseId,
          idempotent_key: idempotent_key,
          run_type: run_type,
          request: req.body.request,
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server listening at http://localhost:${PORT}\n\n`);
});
