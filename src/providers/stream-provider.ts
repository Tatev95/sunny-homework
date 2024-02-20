import { dbProvider } from "./db-provider";

class StreamProvider {
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;

  private async initializeMediaStream(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    } catch (error) {
      console.error("Error initializing media stream:", error);
    }
  }

  async startRecording(): Promise<void> {
    if (this.mediaStream) {
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
      const chunks: Blob[] = [];

      this.mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          await dbProvider.addItem(event.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        console.log("Recording stopped");

        const recordings = await dbProvider.getItems();
        console.log("Recordings:", recordings);

        chunks.length = 0;
      };

      this.mediaRecorder.start();
    } else {
      console.error("error");
    }
  }

  async stopRecording(): Promise<void> {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop();
    }
  }

  getMediaStream(): MediaStream | null {
    return this.mediaStream;
  }
}

export const streamProvider = new StreamProvider();
