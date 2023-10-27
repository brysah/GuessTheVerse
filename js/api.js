export default function Api() {
    const clientId = 'a805786e12bc4445bf91f3b71f6012d6';
    const clientSecret = 'cca4e0976449496ea2e3bd97af1701db';
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    };

    async function getToken() {
        let response = await fetch( tokenUrl, authOptions);
        let data = await response.json(); 
        return data.access_token;
    }


    return {
        getToken
    }
}