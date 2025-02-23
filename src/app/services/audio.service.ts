import { Injectable } from "@angular/core";

const src = "/assets/audio";

@Injectable({
    providedIn: "root"
})
export class AudioService {
    private audio = new Audio();

    playPanicAudio(volume: number) {
        this.audio.src = `${src}/panic-button.mp3`;
        this.audio.load();
        this.audio.volume = volume;
        this.audio.play();
    }

    stopAudio() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}