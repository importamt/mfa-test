import { React, useState } from '@mfa/framework'

export default function Player(): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180) // 3분
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-tving-gray-700 text-white px-5 py-4 flex items-center gap-5 shadow-[0_-2px_10px_rgba(0,0,0,0.3)] z-[9999]">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-blue-500 border-none text-white flex items-center justify-center cursor-pointer text-lg hover:bg-blue-600 transition-colors"
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      
      {/* Track Info */}
      <div className="flex-[0_0_200px]">
        <div className="font-bold mb-1">
          Sample Track
        </div>
        <div className="text-xs opacity-70">
          Artist Name
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="flex-1 flex items-center gap-3">
        <span className="text-xs">{formatTime(currentTime)}</span>
        <div className="flex-1 h-1 bg-tving-gray-600 rounded-sm relative cursor-pointer group">
          <div 
            className="absolute left-0 top-0 h-full bg-blue-500 rounded-sm transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div 
            className="absolute w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1"
            style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translateX(-50%) translateY(-25%)' }}
          />
        </div>
        <span className="text-xs">{formatTime(duration)}</span>
      </div>
      
      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <span className="text-sm">🔊</span>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 h-1 bg-tving-gray-600 rounded-sm appearance-none cursor-pointer slider"
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #3b82f6;
              cursor: pointer;
            }
            .slider::-moz-range-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: #3b82f6;
              cursor: pointer;
              border: none;
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}