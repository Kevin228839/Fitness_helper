const getGoogleOAuthURL = () => {
  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

  const params = {
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_id: process.env.REACT_APP_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  };

  const searchParams = new URLSearchParams(params);
  return `${rootURL}?${searchParams.toString()}`;
};

export {
  getGoogleOAuthURL
};
