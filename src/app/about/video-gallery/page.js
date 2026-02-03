"use client";

import { useRef, useState } from "react";

export default function About() {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (t = 0) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  const handleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleFullscreen = () => {
    if (videoRef.current) videoRef.current.requestFullscreen();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* ===== HEADER ===== */}
      <header className="pt-12 pb-8 border-b border-gray-800 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-[3px]">
          S K Dwivedi <span className="text-gray-400">&</span> Associates
        </h1>
        <p className="mt-4 text-gray-500 text-xs tracking-[6px] uppercase">
          Advocates & Legal Consultants
        </p>
      </header>

      {/* ===== VIDEO SECTION ===== */}
      <main className="flex-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto mt-16 mb-20">

          {/* Blue Glow Border */}
          <div className="rounded-2xl p-[2px] bg-gradient-to-r from-blue-500/60 via-blue-400/40 to-blue-500/60 shadow-[0_0_80px_rgba(59,130,246,0.45)]">

            {/* Video Container */}
            <div className="bg-black rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/skdvideo.mp4"
                muted
                loop
                autoPlay
                onLoadedMetadata={() => {
                  const dur = videoRef.current.duration;
                  if (dur > 0) setDuration(dur);
                  setPlaying(true);
                }}
                onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
                className="w-full h-[520px] object-contain bg-black mx-auto"
              />
            </div>

          </div>

          {/* ===== CONTROLS ===== */}
          <div className="mt-6 space-y-4">

            {/* Timeline Slider */}
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={(e) => {
                const time = Number(e.target.value);
                if (videoRef.current) videoRef.current.currentTime = time;
                setCurrentTime(time);
              }}
              className="w-full accent-blue-500 cursor-pointer"
            />

            {/* Buttons + Time */}
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <div className="flex items-center gap-6 text-xl">
                {/* Play / Pause */}
                <button
                  onClick={handlePlayPause}
                  className="hover:text-blue-400 transition"
                >
                  <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`} />
                </button>

                {/* Mute / Unmute */}
                <button
                  onClick={handleMute}
                  className="hover:text-blue-400 transition"
                >
                  <i className={`bi ${muted ? "bi-volume-mute-fill" : "bi-volume-up-fill"}`} />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="hover:text-blue-400 transition"
                >
                  <i className="bi bi-fullscreen" />
                </button>
              </div>

              {/* Time Display */}
              <div className="font-mono text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} S K Dwivedi & Associates  
        <br />
        <span className="text-gray-400">
          Powered by <span className="text-white font-medium">WiaGa</span>
        </span>
      </footer>
    </div>
  );
}
