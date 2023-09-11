export const getGoogleOAuthURL = () => {
  const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';

  const params = {
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_id: process.env.REACT_APP_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ')
  };
  const searchParams = new URLSearchParams(params);
  return `${rootURL}?${searchParams.toString()}`;
};

export const cookieObject = () => {
  const cookies = document.cookie;
  let arr = cookies.split('; ');
  arr = arr.map((element) => {
    return element.split('=');
  });
  const obj = {};
  arr.forEach((element) => {
    const key = element[0];
    const value = element[1];
    obj[key] = value;
  });

  return obj;
};
