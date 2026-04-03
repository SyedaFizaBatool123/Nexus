import { useState } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, X } from 'lucide-react';

const VideoCall = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);


  // Milestone 3: Start Call
  const startCall = () => setIsInCall(true);
  
  // Milestone 3: End Call
  const endCall = () => {
    setIsInCall(false);
    setIsScreenSharing(false);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl text-white">
      {!isInCall ? (
        <div className="py-10 text-center">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="text-blue-500" />
          </div>
          <h3 className="text-lg font-bold">Ready to join?</h3>
          <button 
            onClick={startCall}
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-10 py-2 rounded-full font-bold transition"
          >
            Join Meeting
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Video Mock Area */}
          <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
            {isVideoOn ? (
              <div className="text-blue-400 animate-pulse text-sm font-mono">
                {isScreenSharing ? "PRESENTING SCREEN..." : "LIVE VIDEO FEED"}
              </div>
            ) : (
              <VideoOff size={48} className="text-slate-600" />
            )}
            
            {/* Small Self-View Overlay */}
            <div className="absolute bottom-20 right-4 w-32 aspect-video bg-slate-700 rounded border border-slate-600 hidden md:flex items-center justify-center">
              <span className="text-[10px] text-slate-400">You</span>
            </div>
          </div>

          {/* Milestone 3: Control Bar (Toggles & End Button) */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-full ${isMicOn ? 'bg-slate-700' : 'bg-red-600'}`}
              title={isMicOn ? "Mute" : "Unmute"}
            >
              {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full ${isVideoOn ? 'bg-slate-700' : 'bg-red-600'}`}
              title={isVideoOn ? "Stop Video" : "Start Video"}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            {/* Optional: Screen Share */}
            <button 
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-3 rounded-full ${isScreenSharing ? 'bg-green-600' : 'bg-slate-700'}`}
              title="Share Screen"
            >
              <MonitorUp size={20} />
            </button>

            <button 
              onClick={endCall}
              className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition"
              title="End Call"
            >
              <PhoneOff size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;