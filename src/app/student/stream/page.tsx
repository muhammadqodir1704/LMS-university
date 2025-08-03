
"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { getCookie } from "cookies-next";

interface StreamData {
  streamId: string;
  webrtcUrl: string;
  hlsUrl: string;
  rtmpPushUrl: string;
  status: string;
  lessonId: number;
  lessonTitle: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: StreamData | null;
}

const StudentWatch = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamData, setStreamData] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("2"); 

  const fetchStreamUrls = async (lessonId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = getCookie("accessToken") as string;
      
      if (!accessToken) {
        setError("Authentication required");
        return;
      }

      // Student uchun to'g'ri endpoint
      const res = await fetch(`https://api-lms-university.tenzorsoft.uz/api/live-streams/${lessonId}/urls`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }

      const response: ApiResponse = await res.json();
      console.log('Stream URLs response:', response);
      
      if (response.success && response.data) {
        setStreamData(response.data);
      } else {
        setError(response.message || 'No stream available for this lesson');
        setStreamData(null);
      }
    } catch (err) {
      console.error('Error fetching stream URLs:', err);
      setError(err instanceof Error ? err.message : 'Failed to load stream');
      setStreamData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreamUrls(selectedLessonId);
  }, [selectedLessonId]);

  useEffect(() => {
    if (streamData?.hlsUrl && videoRef.current) {
      try {
        const hls = new Hls();
        hls.loadSource(streamData.hlsUrl);
        hls.attachMedia(videoRef.current);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS manifest loaded');
        });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS error:', data);
          setError('Failed to load video stream');
        });
      } catch (err) {
        console.error('Error setting up HLS:', err);
        setError('Failed to load video stream');
      }
    }
  }, [streamData]);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📺 Watch Live Stream</h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading stream...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">📺 Watch Live Stream</h2>
      
      {/* Lesson ID Input */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-medium">Select Lesson</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            placeholder="Enter Lesson ID (e.g., 1, 2, 3...)"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={() => fetchStreamUrls(selectedLessonId)}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded transition-colors"
          >
            {loading ? 'Loading...' : 'Load Stream'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {error}</p>
          <p className="text-sm text-red-500 mt-2">Try a different lesson ID or check back later.</p>
        </div>
      )}

      {streamData && (
        <div className="space-y-4">
          {/* Stream Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-lg">{streamData.lessonTitle}</h4>
            <p className="text-sm text-gray-600">Lesson ID: {streamData.lessonId}</p>
            <p className="text-sm text-gray-600">Stream ID: {streamData.streamId}</p>
            <p className="text-sm text-gray-600">Status: <span className={`font-medium ${streamData.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'}`}>{streamData.status}</span></p>
          </div>

          {/* Video Player */}
          {streamData.hlsUrl ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3">Live Stream</h3>
              <video 
                ref={videoRef} 
                controls 
                autoPlay 
                className="w-full max-w-4xl rounded-lg shadow-lg" 
                poster="/assets/stream-placeholder.jpg"
              />
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-700">No video stream available for this lesson</p>
            </div>
          )}

          {/* Stream URLs Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
            <h3 className="text-lg font-medium">Stream URLs</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">WebRTC URL:</span>
                <p className="text-gray-600 break-all">{streamData.webrtcUrl}</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">HLS URL:</span>
                <p className="text-gray-600 break-all">{streamData.hlsUrl}</p>
              </div>
              <div className="text-sm">
                <span className="font-medium">RTMP Push URL:</span>
                <p className="text-gray-600 break-all">{streamData.rtmpPushUrl}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!streamData && !error && !loading && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No active stream available</p>
          <p className="text-sm text-gray-500 mt-2">Enter a lesson ID to load a stream</p>
        </div>
      )}
    </div>
  );
};

export default StudentWatch;
