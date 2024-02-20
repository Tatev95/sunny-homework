import React, { FC, useEffect, useRef, useState } from "react";
import { deviceProvider } from "../../providers/device-provider";
import { dbProvider } from "../../providers/db-provider";

export const StreamComponent: FC = () => {
  const [devices, setDevices] = useState(deviceProvider.devices);
  const [stop, setStop] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

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

  const startRecording = async () => {
    if (deviceProvider.mediaStream) {
      await dbProvider.openDB();

      mediaRecorderRef.current = new MediaRecorder(deviceProvider.mediaStream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = async (event) => {
        recordedChunksRef.current.push(event.data);

        await dbProvider.addItem(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        console.log("Recording stopped");
        const recordings = recordedChunksRef.current;
        recordedChunksRef.current = [];

        const blob = new Blob(recordings, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      };

      mediaRecorderRef.current.start();
    }

    setStop(true);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
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

  const downloadVideo = async () => {
    if (videoUrl) {
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = "recorded-video.webm";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
            style={{
              cursor: "pointer",
              padding: "5px",
              backgroundColor:
                deviceId === device.deviceId ? "lightblue" : "inherit",
            }}
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
        style={{
          cursor: "pointer",
          padding: "10px",
          backgroundColor: "lightgrey",
          border: "none",
          borderRadius: "10px",
        }}
      >
        {stop ? "Stop" : "Start Recording"}
      </button>
      {!stop && (
        <>
          <h4>Video URL: {videoUrl}</h4>
          <button
            onClick={downloadVideo}
            style={{
              cursor: "pointer",
              padding: "10px",
              backgroundColor: "lightgreen",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Download Recorded Video
          </button>
        </>
      )}
    </div>
  );
};
