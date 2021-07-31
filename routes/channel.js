const express = require('express');
const router = express.Router();
const getTwitchAPI = require('./helper');

router.get('/:id', async function(request, response) {
    const id = request.params.id;
    const channelInfo = await getTwitchAPI(`https://api.twitch.tv/helix/channels?broadcaster_id=${id}`);
    if(channelInfo) {
        response.status(200).json(channelInfo);
    } else {
        response.status(200).json({});
    }
});

module.exports = router;