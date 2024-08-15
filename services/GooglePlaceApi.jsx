export const GetPhotoRef = async (placeName) => {
    const resp = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json' +
        '?query=' + placeName +
        '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY);

    const result = await resp.json();

    if (result.status === 'OK' && result.results.length > 0) {
        const photoRef = result.results[0].photos ? result.results[0].photos[0].photo_reference : null;
        return photoRef;
    } else {
        console.error('No photo reference found for', placeName);
        return null;
    }
}
