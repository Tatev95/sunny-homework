import EventEmitter from "../EventEmitter";
import { DEVICE_EVENTS } from "../constants/DeviceConstants";

class DeviceProvider {
  devices: MediaDeviceInfo[] = [];
  eventEmitter: EventEmitter = new EventEmitter();
  mediaStream: MediaStream | null = null;

  constructor() {
    this.initializeDevices();
  }

  async initializeDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("All Devices--", devices);

      this.devices = devices.filter(
        (device) => device.kind === "audioinput" || device.kind === "videoinput"
      );

      this.eventEmitter.emit(DEVICE_EVENTS.ON_UPDATE, this.devices);
    } catch (error) {
      console.error("Error", error);
    }
  }

  async startRecording(deviceId: string) {
    try {
      const selectedCamera = this.devices.find(
        (device) => device.deviceId === deviceId && device.kind === "videoinput"
      );

      const selectedMicrophone = this.devices.find(
        (device) => device.deviceId === deviceId && device.kind === "audioinput"
      );

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: selectedCamera ? { deviceId: selectedCamera.deviceId } : true,
        audio: selectedMicrophone ? { deviceId: selectedMicrophone.deviceId } : true,
      });

      return this.mediaStream;
    } catch (error) {
      console.error("Error", error);
    }
  }

  stopRecording() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
  }
}

export const deviceProvider: DeviceProvider = new DeviceProvider();
