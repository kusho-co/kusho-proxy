const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.argv.length > 2 ? parseInt(process.argv[2]) : 3000;

// Middleware to enable CORS for all origins
app.use(cors());

// Basic request logging with morgan
app.use(morgan('dev'));

// Middleware to parse JSON body
app.use(express.json());

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
    const { request: { url, method = 'GET', json_body = {}, headers = {}, query_params = {} }, testCaseId, run_type, idempotent_key } = req.body;
    
    if (!url) {
        return res.status(400).send({ error: 'url is required' });
    }

    try {
        // Forward the request using axios
        const response = await api({
            url: url,
            method,
            data: json_body,
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
