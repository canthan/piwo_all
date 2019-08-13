import auth0, { Auth0DecodedHash, Auth0Error, Auth0UserProfile, Auth0Callback } from 'auth0-js';
import * as H from 'history';

// TO DOOOOO

export default class Auth {
  private history: H.History;
  private auth0: auth0.WebAuth;
  private userProfile: Auth0UserProfile | null = null;

  constructor(history: H.History) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN ? process.env.REACT_APP_AUTH0_DOMAIN : '',
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID ? process.env.REACT_APP_AUTH0_CLIENT_ID : '',
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: 'token id_token',
      scope: 'openId profile email'
    })
  }

  login = () => {
    this.auth0.authorize();
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;

    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000",
    })
  }

  handleAuthentication = () => {
    this.auth0.parseHash((error, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/storage");

      } else if (error) {
        this.history.push("/");
        alert(`Error: ${error.error}`)
      }
    })
  }

  setSession = (authResult: Auth0DecodedHash) => {
    const expiresAt = JSON.stringify(authResult.expiresIn && authResult.expiresIn * 1000 + new Date().getTime());

    console.log(authResult);
    localStorage.setItem('access_token', authResult.accessToken ? authResult.accessToken : '');
    localStorage.setItem('id_token', authResult.idToken ? authResult.idToken : '');
    localStorage.setItem('expires_at', expiresAt);
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(`${localStorage.getItem('expires_at')}`);
    return new Date().getTime() < expiresAt;
  }

  static getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error('No access token found.');
    }
    console.log(accessToken);
    return accessToken;
  }

  getProfile = (callback: Auth0Callback<Auth0Error | null, Auth0UserProfile>) => {
    console.log(this.userProfile);
    if (this.userProfile) {
      return callback(this.userProfile, null);
    }
    this.auth0.client.getUserCountry((error, country) => {
      if (country) {
        console.log(country);
      } else {
        console.log(error);
      }
    })
    this.auth0.client.userInfo(Auth.getAccessToken(), (error: Auth0Error | null, profile: Auth0UserProfile) => {
      console.log(profile);
      if (profile) {
        this.userProfile = profile;
        console.log(profile);
        console.log(this.userProfile);
      }
      console.log(error);
      callback(profile, error);
    })
  }
}