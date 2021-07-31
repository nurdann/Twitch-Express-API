const express = require('express');
const router = express.Router();
const getTwitchAPI = require('./helper');

router.get('/:searchName/:pagination?', async function(request, response) {
    const name = request.params.searchName;
    const pagination = request.params.pagination;
    const channels = await getChannelsFromTwitch(name, pagination);
    if(channels) {
        response.status(200).json(channels);
    } else {
        response.status(400).json({});
    }
});

async function getChannelsFromTwitch(name, pagination) {
    const perPageCount = 5;
    pagination = typeof pagination === "string" ? pagination : '';
    const response = await getTwitchAPI(`https://api.twitch.tv/helix/search/channels?query=${name}&first=${perPageCount}&after=${pagination}`);

    if(response) {
        return response;
    }
}

module.exports = router;