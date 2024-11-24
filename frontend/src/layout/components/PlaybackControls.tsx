import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};
const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayerStore();
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  return (
    <footer className="h-20 px-4 border-t sm:h-24 bg-zinc-900 border-zinc-800">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Currently Playing Song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="object-cover rounded-md size-14"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate cursor-pointer hover:underline">
                  {currentSong.title}
                </div>
                <div className="text-sm truncate cursor-pointer text-zinc-400 hover:underline">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>
        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="size-4" />
            </Button>
            <Button
              size="icon"
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="size-4" />
            </Button>
            <Button
              size="icon"
              onClick={togglePlay}
              className="text-black bg-white rounded-full hover:bg-white/80 size-8"
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5" />
              )}
            </Button>
            <Button
              size="icon"
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="size-4" />
            </Button>
            <Button
              size="icon"
              variant={"ghost"}
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Repeat className="size-4" />
            </Button>
          </div>
          <div className="items-center hidden w-full gap-2 sm:flex">
            <div className="text-xs text-zinc-400">
              {formatTime(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
            />
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>
        {/* Volume Controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Mic2 className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <ListMusic className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Laptop2 className="size-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
            >
              <Volume2 className="size-4" />
            </Button>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:curosr-grabbing"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;