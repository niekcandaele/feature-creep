export function getDevJwt() {
    return {
        sub: '01c78d7a-5926-41b2-90de-02b8937a82b1',
        event_id: '116e3be6-4917-44c5-841c-93e3df35d7da',
        token_use: 'access',
        scope: 'aws.cognito.signin.user.admin phone openid profile email',
        auth_time: 1619794928,
        iss: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_4MH59fRxt',
        exp: Date.now() + 1000 * 60 * 60 * 24,
        iat: 1619794929,
        version: 2,
        jti: '409d28aa-98fc-4a12-9de8-29d82f2efe8b',
        client_id: '5mdqrbv4hchnh0v7dhh7isf2lb',
        username: '01c78d7a-5926-41b2-90de-02b8937a82b1'
    };
}
