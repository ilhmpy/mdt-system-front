import { Injectable } from "@angular/core";

const src = "/assets/audio";

@Injectable({
    providedIn: "root"
})
export class AudioService {
    private audio: HTMLAudioElement  = new Audio;

    playPanicAudio(volume: number) {
        this.audio.src = `${src}/panic-button.mp3`;
        this.audio.load();
        this.audio.volume = volume;
        this.audio.play();
    }

    async stopAudio() {
        if (this.audio) {
            await this.audio.pause();
            this.audio.currentTime = 0;
        }
    }
}