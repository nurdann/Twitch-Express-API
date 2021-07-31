
# MERN application using Twitch API

## Get Twitch API

Go to (Twitch developer console](https://dev.twitch.tv/console/apps), under "Applications" click "Register Your application" which creates client ID and client secret keys. No scopes are needed for app access tokens [as described in docs][auth-docs].

Generate [bearer access token for API calls][bearer-token-docs],

```
$ curl --location --request POST "https://id.twitch.tv/oauth2/token?client_id=$client_id&client_secret=$client_secret&grant_type=client_credentials" 
{"access_token":"<access-token>","expires_in":5353689,"token_type":"bearer"}
```

Since expiry is given in seconds, the access token is valid for `61` days,

```
$ echo '5353689/60/60/24' | bc
61
```


Validate access token
```
$ curl -H "Authorization: OAuth <access-token>" https://id.twitch.tv/oauth2/validate
{"client_id":"<client-id>","scopes":[],"expires_in":5353182}
```

Response codes
- `401` - expired or incorrect credentials


## Sample request

Let's make a sample request for a `boxbox` channel. We get a list of matches under `data` key.
```
curl --location --request GET 'https://api.twitch.tv/helix/search/channels?query=boxbox' \
--header 'client-id: <client-id>' \
--header 'Authorization: Bearer <access-token>' | python3 -m json.tool

{
    "data": [
        {
            "broadcaster_language": "en",
            "broadcaster_login": "boxbox",
            "display_name": "boxbox",
            "game_id": "513143",
            "game_name": "Teamfight Tactics",
            "id": "38881685",
            "is_live": true,
            "tag_ids": [
                "6ea6bca4-4712-4ab9-a906-e3336a9d8039"
            ],
            "thumbnail_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/96b30bc4546e2f71-profile_image-300x300.jpeg",
            "title": "head empty",
            "started_at": "2021-07-30T00:57:26Z"
        },
		...
    ],
    "pagination": {
        "cursor": "MjA="
    }
}
```

Get channel information where `game_id` indicates current played game

```
$ curl --location --request GET 'https://api.twitch.tv/helix/channels?broadcaster_id=38881685' \
--header "client-id: <client-id>" \
--header "Authorization: Bearer <access-token>"

{
    "data": [
        {
            "broadcaster_id": "38881685",
            "broadcaster_login": "boxbox",
            "broadcaster_name": "boxbox",
            "broadcaster_language": "en",
            "game_id": "513143",
            "game_name": "Teamfight Tactics",
            "title": "Pog this streamer is so FLEXIBLE Pog",
            "delay": 0
        }
    ]
}
```

source: https://dev.twitch.tv/docs/api/reference#search-channels
[auth-docs]: https://dev.twitch.tv/docs/authentication/
[bearer-token-docs]: https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-client-credentials-flow

