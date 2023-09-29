import React, { useState } from 'react';

function VideoAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  // Function to handle opening the alert and setting video source
  const openAlert = (videoSource) => {
    setVideoSrc(videoSource);
    setShowAlert(true);
  };

  // Function to close the alert
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <button onClick={() => openAlert('Image/alertvideo.mp4')}>Show Alert</button>

      {showAlert && (
        <div className="video-alert">
          <button onClick={closeAlert}>Close</button>
          <video controls width="400">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoAlert;
