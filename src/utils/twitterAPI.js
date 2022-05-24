import { OAuth } from 'oauth';
import queryString from 'query-string';
import configs from '../../configs';

class Twitter {
    constructor() {
      try {
          this.consumerKey = configs.twitter.consumer_key;
          this.consumerSecret = configs.twitter.consumer_secret_key;
          this.accessToken = configs.twitter.access_token;
          this.accessTokenSecret = configs.twitter.access_token_secret;
          this.callBackUrl = configs.twitter.oauth_callback;
          this.baseUrl = 'https://api.twitter.com/1.1';

          this.oauth = new OAuth(
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            this.consumerKey,
            this.consumerSecret,
            '1.0',
            this.callBackUrl,
            'HMAC-SHA1'
          );
      } catch (err) {
          // eslint-disable-next-line no-console
          console.error("no 'data/twitter_config' file, continuing without...");
      }
    }

    getOAuthRequestToken = () => {
      return new Promise((resolve, reject) => {
          this.oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
              if (error) {
                reject(error);
              }
              else {
                const oauth = {};
                oauth.token = oauthToken;
                oauth.token_secret = oauthTokenSecret;
                resolve(oauth);
              }
          });
      });
    };
    
    getOAuthAccessToken = (requestToken, requestTokenSecret, oauthVerifier) => {
      return new Promise((resolve, reject) => {
          this.oauth.getOAuthAccessToken(requestToken, requestTokenSecret, oauthVerifier,
            (error, oauthAccessToken, oauthAccessTokenSecret) => {
                if (error) {
                  reject(error);
                } else {
                  resolve([oauthAccessToken, oauthAccessTokenSecret]);
                }
            }
          );
      });
    };

    getFollowersList = (params, accessToken, accessTokenSecret) => {
      return new Promise((resolve, reject) => {
          const url = `${this.baseUrl  }/followers/list.json?${queryString.stringify(params)}`;
          this.oauth.get(url, accessToken, accessTokenSecret, (err, body, response) => {
              if (!err && response.statusCode === 200) {
                  resolve(body);
              } else {
                  reject(err, response, body);
              }
          });
      });
    };
}

export default new Twitter();
