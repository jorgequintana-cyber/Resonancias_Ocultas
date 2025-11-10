// Helper function to convert shareable Google Drive links to direct download links
const convertToDirectLink = (url: string): string => {
  try {
    const urlObject = new URL(url);
    if (urlObject.hostname === 'drive.google.com') {
      const pathParts = urlObject.pathname.split('/');
      // Find the file ID part of the URL, which is usually after '/d/'
      const fileIdIndex = pathParts.indexOf('d');
      if (fileIdIndex > -1 && pathParts.length > fileIdIndex + 1) {
        const fileId = pathParts[fileIdIndex + 1];
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    }
  } catch (e) {
    // If URL is invalid or not a Google Drive link, return it as is.
    console.warn("Could not parse URL or it's not a GDrive link:", url);
    return url;
  }
  return url;
};


class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentElementSource: MediaElementAudioSourceNode | null = null;

  private initialize() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
      } catch (e) {
        console.error("Web Audio API is not supported in this browser");
      }
    }
  }

  private getContext(): AudioContext | null {
    if (!this.audioContext) {
      this.initialize();
    }
    return this.audioContext;
  }
  
  public stopAllSounds() {
      if(this.masterGain && this.audioContext) {
          this.masterGain.gain.cancelScheduledValues(this.audioContext.currentTime);
          this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioContext.currentTime);
          this.masterGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);
          setTimeout(() => {
             if (this.masterGain && this.audioContext) {
                this.masterGain.gain.setValueAtTime(1, this.audioContext.currentTime);
             }
          }, 150);
      }

      if (this.currentAudioElement) {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      }
      if (this.currentElementSource) {
          this.currentElementSource.disconnect();
          this.currentElementSource = null;
      }
      this.currentAudioElement = null;

      this.isPlaying = false;
  }

  public async playScale(frequencies: number[]): Promise<void> {
    const context = this.getContext();
    if (!context || !this.masterGain || this.isPlaying) return;

    this.isPlaying = true;
    const noteDuration = 0.3;
    const gapDuration = 0.05;
    let startTime = context.currentTime;

    for (const freq of frequencies) {
      const osc = context.createOscillator();
      const gainNode = context.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, startTime + noteDuration);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + noteDuration);

      startTime += noteDuration + gapDuration;
    }
    
    setTimeout(() => { this.isPlaying = false; }, (noteDuration + gapDuration) * frequencies.length * 1000);
  }

  public async playChord(frequencies: number[]): Promise<void> {
    const context = this.getContext();
    if (!context || !this.masterGain || this.isPlaying) return;
    
    this.isPlaying = true;
    const duration = 1.5;
    const startTime = context.currentTime;

    frequencies.forEach(freq => {
      const osc = context.createOscillator();
      const gainNode = context.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
    
    setTimeout(() => { this.isPlaying = false; }, duration * 1000);
  }
  
  public async playPiece(baseFrequency: number, ratios: number[], sequence: { note: number, duration: number }[]): Promise<void> {
    const context = this.getContext();
    if (!context || !this.masterGain || this.isPlaying) return;

    this.isPlaying = true;
    let startTime = context.currentTime;

    for (const item of sequence) {
      const freq = baseFrequency * ratios[item.note];
      const duration = item.duration * 0.8;
      const gap = item.duration * 0.2;

      const osc = context.createOscillator();
      const gainNode = context.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);
      
      osc.start(startTime);
      osc.stop(startTime + duration);

      startTime += duration + gap;
    }

    setTimeout(() => { this.isPlaying = false; }, (startTime - context.currentTime) * 1000);
  }

  public async playAudioFromUrl(url: string): Promise<void> {
    const context = this.getContext();
    if (!context || !this.masterGain || this.isPlaying) return;

    this.isPlaying = true;

    const directUrl = convertToDirectLink(url);
    
    try {
        const audio = new Audio(directUrl);
        audio.crossOrigin = "anonymous";
        this.currentAudioElement = audio;
        
        const source = context.createMediaElementSource(audio);
        this.currentElementSource = source;
        source.connect(this.masterGain);
        
        const onEnd = () => {
            if (this.currentAudioElement === audio) {
                this.isPlaying = false;
                this.currentAudioElement = null;
                this.currentElementSource?.disconnect();
                this.currentElementSource = null;
            }
        };

        audio.addEventListener('ended', onEnd, { once: true });
        audio.addEventListener('error', (e) => {
            console.error("Audio playback error event:", e);
            window.alert('No se pudo cargar el audio. Por favor, verifica que la URL sea un enlace de descarga directa y que el archivo sea accesible públicamente.');
            onEnd();
        }, { once: true });

        audio.play().catch(err => {
            console.error("Audio play() promise rejected:", err);
             window.alert('Error al reproducir el audio. Es posible que el navegador haya bloqueado la reproducción automática.');
             onEnd();
        });

    } catch (error) {
        console.error("Error setting up audio from URL:", error);
        window.alert('Ocurrió un error inesperado al intentar configurar el audio.');
        this.isPlaying = false;
    }
  }
}

export const audioService = new AudioService();