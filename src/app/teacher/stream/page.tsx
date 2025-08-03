
"use client";
import { useState, useEffect } from "react";
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
  data: StreamData[];
}

const TeacherStream = () => {
  const [activeStreams, setActiveStreams] = useState<StreamData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [obsConfig, setObsConfig] = useState<{
    rtmpUrl: string;
    hlsUrl: string;
    streamKey: string;
  } | null>(null);

  // Fetch active streams on component mount
  useEffect(() => {
    fetchActiveStreams();
  }, []);

  const getObsConfiguration = async (streamId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = getCookie("accessToken") as string;
      
      if (!accessToken) {
        setError("Authentication required");
        return;
      }

      // Get stream URLs for OBS configuration
      const res = await fetch(`https://api-lms-university.tenzorsoft.uz/api/live-streams/${streamId}/urls`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }

      const response = await res.json();
      
      if (response.success && response.data) {
        const streamData = response.data;
        setObsConfig({
          rtmpUrl: streamData.rtmpPushUrl,
          hlsUrl: streamData.hlsUrl,
          streamKey: streamData.streamId // Using streamId as stream key
        });
        setStatus(`OBS configuration loaded for stream ${streamId}`);
      } else {
        setError(response.message || 'Failed to get OBS configuration');
      }
    } catch (err) {
      console.error('Error getting OBS configuration:', err);
      setError(err instanceof Error ? err.message : 'Failed to get OBS configuration');
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveStreams = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = getCookie("accessToken") as string;
      
      if (!accessToken) {
        setError("Authentication required");
        return;
      }

      const res = await fetch("https://api-lms-university.tenzorsoft.uz/api/live-streams/teacher/active", {
        method: "GET",
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
      
      if (response.success) {
        setActiveStreams(response.data);
        setStatus(`Found ${response.data.length} active stream(s)`);
      } else {
        setError(response.message || 'Failed to fetch streams');
      }
    } catch (err) {
      console.error('Error fetching active streams:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch active streams');
    } finally {
      setLoading(false);
    }
  };

  const createStream = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = getCookie("accessToken") as string;
      
      if (!accessToken) {
        setError("Authentication required");
        return;
      }

      const res = await fetch("https://api-lms-university.tenzorsoft.uz/api/live-streams/create", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: 9007199254740991, // API documentation dagi to'g'ri lessonId
          title: "Live Lesson",
          description: "Online lesson stream",
          type: "VIDEO"
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }

      const data = await res.json();
      console.log('Stream created:', data);
      setStatus("Stream created successfully");
      // Refresh active streams after creating
      await fetchActiveStreams();
    } catch (err) {
      console.error('Error creating stream:', err);
      setError(err instanceof Error ? err.message : 'Failed to create stream');
    } finally {
      setLoading(false);
    }
  };

  const startStream = async (streamId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = getCookie("accessToken") as string;
      
      const res = await fetch(`https://api-lms-university.tenzorsoft.uz/api/live-streams/${streamId}/start`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }

      const data = await res.json();
      console.log('Stream started:', data);
      setStatus("Stream started successfully");
      // Refresh active streams after starting
      await fetchActiveStreams();
    } catch (err) {
      console.error('Error starting stream:', err);
      setError(err instanceof Error ? err.message : 'Failed to start stream');
    } finally {
      setLoading(false);
    }
  };

  const stopStream = async (streamId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = getCookie("accessToken") as string;
      
      const res = await fetch(`https://api-lms-university.tenzorsoft.uz/api/live-streams/${streamId}/stop`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }

      const data = await res.json();
      console.log('Stream stopped:', data);
      setStatus("Stream stopped successfully");
      // Refresh active streams after stopping
      await fetchActiveStreams();
    } catch (err) {
      console.error('Error stopping stream:', err);
      setError(err instanceof Error ? err.message : 'Failed to stop stream');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">🎥 Teacher Livestream Panel</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}
      
      {/* Stream Management Buttons */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium">Stream Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button 
            onClick={createStream} 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded transition-colors"
          >
            {loading ? 'Creating...' : 'Create Stream'}
          </button>
          
          <button 
            onClick={fetchActiveStreams} 
            disabled={loading}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-4 py-2 rounded transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh Streams'}
          </button>
          
          <button 
            onClick={() => startStream("2")} 
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded transition-colors"
          >
            {loading ? 'Starting...' : 'Start Stream (ID: 2)'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button 
            onClick={() => stopStream("2")} 
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded transition-colors"
          >
            {loading ? 'Stopping...' : 'Stop Stream (ID: 2)'}
          </button>
          
          <button 
            onClick={() => {
              setStatus("Manual stream control - Check console for details");
              console.log("Manual stream control activated");
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
          >
            Manual Control
          </button>
        </div>
      </div>

      {/* OBS Configuration Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">🎥 OBS Studio Configuration</h3>
          <button 
            onClick={() => getObsConfiguration("2")}
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            {loading ? 'Loading...' : 'Load OBS Config'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* OBS Settings */}
          <div className="space-y-3">
            <h4 className="font-medium text-blue-600">OBS Settings</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Service:</span>
                <p className="text-gray-600">Custom</p>
              </div>
              <div>
                <span className="font-medium">Server:</span>
                <p className="text-gray-600 break-all">
                  {obsConfig?.rtmpUrl || 'rtmp://your-server-url/live'}
                </p>
              </div>
              <div>
                <span className="font-medium">Stream Key:</span>
                <p className="text-gray-600 break-all">
                  {obsConfig?.streamKey || 'stream-key-from-api'}
                </p>
              </div>
            </div>
          </div>

          {/* Stream URLs */}
          <div className="space-y-3">
            <h4 className="font-medium text-green-600">Stream URLs</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">RTMP Push URL:</span>
                <p className="text-gray-600 break-all">
                  {obsConfig?.rtmpUrl || 'rtmp://api-lms-university.tenzorsoft.uz/live/stream'}
                </p>
              </div>
              <div>
                <span className="font-medium">HLS URL:</span>
                <p className="text-gray-600 break-all">
                  {obsConfig?.hlsUrl || 'https://api-lms-university.tenzorsoft.uz/hls/stream.m3u8'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OBS Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">📋 OBS Setup Instructions:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
            <li>OBS Studio ni o'rnating</li>
            <li>Settings → Stream bo'limiga o'ting</li>
            <li>Service: Custom tanlang</li>
            <li>Server: RTMP URL ni kiriting</li>
            <li>Stream Key: API dan olingan key ni kiriting</li>
            <li>Apply va OK bosing</li>
            <li>Start Streaming tugmasini bosing</li>
          </ol>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <button 
            onClick={() => {
              if (obsConfig?.rtmpUrl) {
                navigator.clipboard.writeText(obsConfig.rtmpUrl);
                setStatus("RTMP URL copied to clipboard!");
              } else {
                setError("Please load OBS configuration first");
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Copy RTMP URL
          </button>
          
          <button 
            onClick={() => {
              if (obsConfig?.hlsUrl) {
                navigator.clipboard.writeText(obsConfig.hlsUrl);
                setStatus("HLS URL copied to clipboard!");
              } else {
                setError("Please load OBS configuration first");
              }
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Copy HLS URL
          </button>
          
          <button 
            onClick={() => {
              if (obsConfig?.streamKey) {
                navigator.clipboard.writeText(obsConfig.streamKey);
                setStatus("Stream Key copied to clipboard!");
              } else {
                setError("Please load OBS configuration first");
              }
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Copy Stream Key
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="font-medium">Status: {status || 'No streams found'}</p>
      </div>

      {/* Active Streams Display */}
      {activeStreams.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Active Streams</h3>
          {activeStreams.map((stream) => (
            <div key={stream.streamId} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-lg">{stream.lessonTitle}</h4>
                  <p className="text-sm text-gray-600">Lesson ID: {stream.lessonId}</p>
                  <p className="text-sm text-gray-600">Stream ID: {stream.streamId}</p>
                  <p className="text-sm text-gray-600">Status: <span className={`font-medium ${stream.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'}`}>{stream.status}</span></p>
                </div>
                <div className="space-x-2">
                  {stream.status !== 'ACTIVE' && (
                    <button 
                      onClick={() => startStream(stream.streamId)}
                      disabled={loading}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Start
                    </button>
                  )}
                  {stream.status === 'ACTIVE' && (
                    <button 
                      onClick={() => stopStream(stream.streamId)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Stop
                    </button>
                  )}
                </div>
              </div>
              
              {/* Stream URLs for Teacher */}
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">WebRTC URL:</span>
                  <p className="text-gray-600 break-all">{stream.webrtcUrl}</p>
                </div>
                <div className="text-sm">
                  <span className="font-medium">HLS URL:</span>
                  <p className="text-gray-600 break-all">{stream.hlsUrl}</p>
                </div>
                <div className="text-sm">
                  <span className="font-medium">RTMP Push URL:</span>
                  <p className="text-gray-600 break-all">{stream.rtmpPushUrl}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeStreams.length === 0 && !loading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700">No active streams found. Create a new stream to get started.</p>
        </div>
      )}
    </div>
  );
};

export default TeacherStream;
