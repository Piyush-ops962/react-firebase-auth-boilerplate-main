
// src/VideoCall.js
import React, { useState, useRef } from 'react';
import { IAgoraRTC, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-sdk-ng';

const VideoCall = () => {
  const [client] = useState(createClient({ mode: 'rtc', codec: 'vp8' }));
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const localVideoRef = useRef(null);

  const appId = 'e7f6e9aeecf14b2ba10e3f40be9f56e7';
  const token = 'null';
  const channel = 'test';

  const startCall = async () => {
    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === 'video') {
        const remoteVideoTrack = user.videoTrack;
        const remotePlayerContainer = document.createElement('div');
        remotePlayerContainer.id = user.uid;
        document.body.append(remotePlayerContainer);
        remoteVideoTrack.play(remotePlayerContainer);
      }

      if (mediaType === 'audio') {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
    });

    client.on('user-unpublished', user => {
      const remotePlayerContainer = document.getElementById(user.uid);
      remotePlayerContainer.remove();
    });

    await client.join(appId, channel, token, null);

    const [microphoneTrack, cameraTrack] = await createMicrophoneAndCameraTracks();
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);

    localVideoRef.current && cameraTrack.play(localVideoRef.current);
    await client.publish([microphoneTrack, cameraTrack]);
  };

  const toggleMute = async () => {
    if (localAudioTrack) {
      if (isMuted) {
        await localAudioTrack.setEnabled(true);
      } else {
        await localAudioTrack.setEnabled(false);
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = async () => {
    if (localVideoTrack) {
      if (isCameraOff) {
        await localVideoTrack.setEnabled(true);
      } else {
        await localVideoTrack.setEnabled(false);
      }
      setIsCameraOff(!isCameraOff);
    }
  };

  return (
    <div>
      <button onClick={startCall}>Start Video Call</button>
      <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
      <button onClick={toggleCamera}>{isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}</button>
      <div ref={localVideoRef} style={{ width: '640px', height: '480px' }}></div>
    </div>
  );
};

export default VideoCall;
