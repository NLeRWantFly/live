import AgoraRTC from 'agora-rtc-sdk-ng'
let rtc = {
    localAudioTrack: null,
    client: null
};


function createRTC() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    rtc.client.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");

        // If the remote user publishes an audio track.
        if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            // Play the remote audio track.
            remoteAudioTrack.play();
        }

        // Listen for the "user-unpublished" event
        rtc.client.on("user-unpublished", async (user) => {
            // Unsubscribe from the tracks of the remote user.
            await rtc.client.unsubscribe(user);
        });

    });

    
    return rtc
}

export default createRTC