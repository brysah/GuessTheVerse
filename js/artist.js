export default function Artist({
    token
}) {

    async function search(name) {
        let apiUrl = `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=5`;
        let response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let data = await response.json();
        let artistArray = [];
        data.artists.items.forEach(element => {
            if (element.popularity > 0) {
                artistArray.push(element);
            }
        });
        return artistArray;
    }

    return {
        search
    }
}