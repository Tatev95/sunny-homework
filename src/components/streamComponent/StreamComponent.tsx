import React, { FC, useEffect, useRef, useState } from "react";
import { deviceProvider } from "../../providers/device-provider";

export const StreamComponent: FC = () => {

  const [devices, setDevices] = useState(deviceProvider.devices);
  const [stop, setStop] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setDevices(deviceProvider.devices);

    const initMediaStream = async () => {
      try {
        await deviceProvider.startRecording(deviceId);

        if (videoRef.current && deviceProvider.mediaStream) {
          videoRef.current.srcObject = deviceProvider.mediaStream;
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    initMediaStream();

    return () => {
      deviceProvider.stopRecording();
    };
  }, [deviceId, deviceProvider]);

  const startRecording = () => {
    if (deviceProvider.mediaStream) {
      mediaRecorderRef.current = new MediaRecorder(deviceProvider.mediaStream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        console.log("Recorded video URL:", videoUrl);
        setVideoUrl(videoUrl)
      };

      mediaRecorderRef.current.start();
    }
    setStop(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setStop(false);
  };

  const handleChangeDevice = async (id: string) => {
    if (id !== deviceId) {
      setDeviceId(id);
      deviceProvider.stopRecording();
      await deviceProvider.startRecording(deviceId);

      if (stop) {
        startRecording();
      }
    }

  };

  return (
    <div>
      <p>Devices list</p>
      {devices ? (
        devices.map((device) => (
          <div
            key={device.deviceId}
            onClick={() => handleChangeDevice(device.deviceId)}
            style={{ cursor: "pointer", padding: "5px", backgroundColor: deviceId === device.deviceId ? "lightblue" : "inherit" }}
          >
            {device.label}
          </div>
        ))
      ) : (
        <p>Loading devices...</p>
      )}
      <video ref={videoRef} autoPlay playsInline />
      <button
        onClick={stop ? stopRecording : startRecording}
        style={{ cursor: "pointer", padding: "10px", backgroundColor: "lightgrey", border: "none", borderRadius: "10px" }}
      >
        {stop ? "Stop" : "Start Recording"}

      </button>
      {!stop && (
        <h4>Video URL:  {videoUrl}</h4>
      )}
    </div>
  );
};
