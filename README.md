
# MERN application using Twitch API

## Get Twitch API

Go to (Twitch developer console](https://dev.twitch.tv/console/apps), under "Applications" click "Register Your application" which creates client ID and client secret keys.

Generate [bearer access token for API calls][bearer_token_docs],

```
$ curl --location --request POST "https://id.twitch.tv/oauth2/token?client_id=$client_id&client_secret=$client_secret&grant_type=client_credentials" 
{"access_token":"<access-token>","expires_in":5353689,"token_type":"bearer"}
```

Validate access token
```
$ curl -H "Authorization: OAuth <access-token>" https://id.twitch.tv/oauth2/validate
{"client_id":"<client-id>","scopes":[],"expires_in":5353182}
```

[bearer_token_docs]: https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-client-credentials-flow
