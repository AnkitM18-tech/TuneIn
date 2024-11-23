import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const previousSongRef = useRef<string | null>(null);

  /* pause and play */
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  /* handle song ends */
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  /* handle song change */
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    // check if the song has changed
    const isSongChanged = previousSongRef.current !== currentSong?.audioUrl;
    if (isSongChanged) {
      audio.src = currentSong?.audioUrl;
      //   reset playback position
      audio.currentTime = 0;
      //   storing current song to previous
      previousSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
