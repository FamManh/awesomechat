import React, { useRef, useState, useEffect } from "react";
import MediaHandler from "./MediaHandler";
import Peer from 'simple-peer'

function CallPage() {
    let myVideo = useRef();
    let userVideo = useRef();

    const [hasMedia, setHasMedia] = useState(false);
    const [otherUserId, setOtherUserId] = useState(null);

    const mediaHandler = new MediaHandler();

    useEffect(()=>{
        console.log(window.location);
        const p = new Peer({
            initiator: window.location.hash === "#1",
            trickle: false
        });
        p.on("signal", token => console.log(token));
    }, [])

    useEffect(() => {
        mediaHandler.getPermissions().then(stream => {
            setHasMedia(true);
            try {
                myVideo.current.srcObject = stream;
            } catch (error) {
                console.log(error);
                myVideo.current.src = URL.createObjectURL(stream);
            }
        });
    });

    return (
        <div>
            This is my call page
            <div className="video-container">
                <video className="my-video" ref={myVideo} autoPlay={true}></video>
                <video
                    className="user-video"
                    ref={ref => {
                        userVideo = ref;
                    }}
                ></video>
            </div>
        </div>
    );
}

export default CallPage;
