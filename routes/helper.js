const assert = require('assert');
const fetch = require('node-fetch');
require('dotenv').config();

async function getTwitchAPI(query) {
    const client_id = process.env['CLIENT_ID'];
    const token = process.env['TOKEN_ACCESS'];
    assert(client_id && token);
    const response = await fetch(query, {
        headers: {
            'Client-ID': client_id,
            'Authorization': `Bearer ${token}`
        }
    });

    if(response?.status === 200) {
        return response.json();
    } else {
        return null;
    }
}

module.exports = getTwitchAPI;