"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeText, setTimeText] = useState("0:00 / 0:00");
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
      setShowControls(true);
      scheduleHide();
    } else {
      v.pause();
      setIsPlaying(false);
      setShowControls(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    }
  }, [scheduleHide]);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
    setTimeText(`${fmt(v.currentTime)} / ${fmt(v.duration)}`);
  }, []);

  const onEnded = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setShowControls(false);
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const fullscreen = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  }, []);

  const onMouseMove = useCallback(() => {
    if (isPlaying) {
      setShowControls(true);
      scheduleHide();
    }
  }, [isPlaying, scheduleHide]);

  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  return (
    <div
      className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black group"
      onMouseMove={onMouseMove}
      onMouseLeave={() => { if (isPlaying) scheduleHide(); }}
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brandBlue/20 via-blue-400/10 to-brandBlue/20 rounded-2xl blur-xl opacity-60 -z-10"></div>

      {/* Video — rotated to fix portrait orientation */}
      <div className="w-full aspect-video overflow-hidden bg-black relative">
        <video
          ref={videoRef}
          className="w-[178%] h-[178%] object-contain absolute top-1/2 left-1/2"
          style={{ transform: "translate(-50%, -50%) rotate(-90deg)" }}
          preload="metadata"
          playsInline
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          onClick={toggle}
        >
          <source src="/videos/arun-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Play overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={toggle}
        >
          <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
            <i className="ph-fill ph-play text-brandBlue text-3xl ml-1"></i>
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-4 flex items-center gap-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <button onClick={toggle} className="text-white hover:text-brandBlue transition-colors">
          <i className={`ph-fill ${isPlaying ? "ph-pause" : "ph-play"} text-xl`}></i>
        </button>
        <div
          className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
          onClick={seek}
        >
          <div
            className="h-full bg-brandBlue rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-white text-[11px] font-mono min-w-[80px] text-right">{timeText}</span>
        <button onClick={toggleMute} className="text-white hover:text-brandBlue transition-colors">
          <i className={`ph-fill ${muted ? "ph-speaker-x" : "ph-speaker-high"} text-xl`}></i>
        </button>
        <button onClick={fullscreen} className="text-white hover:text-brandBlue transition-colors">
          <i className="ph ph-corners-out text-xl"></i>
        </button>
      </div>
    </div>
  );
}
