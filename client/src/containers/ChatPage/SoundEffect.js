import React, { useState } from 'react'
import Sound from "react-sound";

function SoundEffect({ type = "new-message" }) {
    return (
        <Sound playStatus={Sound.status.PLAYING} url="sound/new-message.mp3" />
    );
}

export default SoundEffect;
