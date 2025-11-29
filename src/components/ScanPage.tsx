import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Camera, 
  Video,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';

declare global {
  interface Window {
    tmImage: {
      load: (modelUrl: string, metadataUrl: string) => Promise<any>;
    };
  }
}

interface TeachableMachineModel {
  predict(input: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement): Promise<Prediction[]>;
  dispose(): void;
}

interface Prediction {
  className: string;
  probability: number;
}

interface ScanPageProps {
  onNavigateBack: () => void;
}

interface ScanResult {
  grade: 'High Grade' | 'Low Grade';
  confidence: number;
  recommendation: 'Supermarket' | 'Juice';
  timestamp: Date;
}

const MODEL_URL = '/my_model/model.json';
const METADATA_URL = '/my_model/metadata.json';

export function ScanPage({ onNavigateBack }: ScanPageProps) {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [model, setModel] = useState<TeachableMachineModel | null>(null);

  const startWebcam = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsWebcamActive(true);
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setError('Failed to access webcam. Please check browser permissions.');
      setIsWebcamActive(false);
    }
  };

  const handleScan = async () => {
    if (!model || !videoRef.current) return;

    setIsScanning(true);
    setError(null);

    try {
      // Teachable Machine: model.predict can take an HTMLVideoElement
      const prediction: Prediction[] = await model.predict(videoRef.current);
      if (!prediction || !prediction.length) {
        throw new Error('No prediction returned from model');
      }

      // Get highest probability
      const best = prediction.reduce(
        (a, b) => (a.probability > b.probability ? a : b)
      );

      // Class names from TM, e.g. "High_Grade" / "Low_Grade"
      const rawName: string = best.className;
      const normalizedName = rawName.replace(/_/g, ' ').toLowerCase();

      const grade: ScanResult['grade'] =
        normalizedName.includes('high') ? 'High Grade' : 'Low Grade';

      const confidence = Math.round(best.probability * 100);
      const recommendation: ScanResult['recommendation'] =
        grade === 'High Grade' ? 'Supermarket' : 'Juice';

      const result: ScanResult = {
        grade,
        confidence,
        recommendation,
        timestamp: new Date()
      };

      setCurrentResult(result);
      setScanHistory(prev => [result, ...prev].slice(0, 4));
    } catch (err) {
      console.error(err);
      setError('Failed to run prediction. Check the model files and try again.');
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        setIsModelLoading(true);
        setError(null);

        // Check if Teachable Machine library is loaded
        if (!window.tmImage) {
          throw new Error('Teachable Machine library (tmImage) is not loaded. Check CDN script in index.html');
        }

        // Load Teachable Machine model
        const loadedModel = await window.tmImage.load(MODEL_URL, METADATA_URL);
        if (!mounted) return;
        setModel(loadedModel);

        // Start webcam after model is ready
        await startWebcam();
      } catch (err) {
        console.error('Error initializing model/webcam:', err);
        if (mounted) {
          setError('Failed to initialize model or webcam.');
        }
      } finally {
        if (mounted) setIsModelLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
      // Cleanup webcam when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onNavigateBack}
              className="flex items-center gap-2 text-gray-600 hover:text-[#FF8A00] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.9"/>
                  <circle cx="12" cy="12" r="5" fill="white" opacity="0.3"/>
                </svg>
              </div>
              <span className="text-lg text-gray-900">D&apos;Jeruk</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Side - Webcam */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl text-gray-900 mb-3">Live Orange Scan</h1>
              <p className="text-gray-600">
                Allow access to your webcam and hold an orange in front of the camera.
              </p>
              {isModelLoading && (
                <p className="text-sm text-gray-500 mt-2">
                  Loading AI model...
                </p>
              )}
              {error && (
                <p className="text-sm text-red-500 mt-2">
                  {error}
                </p>
              )}
            </motion.div>

            {/* Webcam Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-6"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative">
                {!isWebcamActive ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Video className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-gray-400">
                      {isModelLoading ? 'Loading model & webcam...' : 'Initializing webcam...'}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Real Webcam Feed */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />

                    {/* Scanning Overlay */}
                    <AnimatePresence>
                      {isScanning && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center"
                        >
                          <div className="text-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-16 h-16 border-4 border-[#FF8A00] border-t-transparent rounded-full mx-auto mb-4"
                            />
                            <p className="text-white text-lg">Analyzing orange...</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Detection Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 border-2 border-[#38B87C] m-20 rounded-2xl"
                      />
                      <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-[#38B87C]" />
                      <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-[#38B87C]" />
                      <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-[#38B87C]" />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-[#38B87C]" />
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleScan}
                disabled={isScanning || !isWebcamActive || !model || isModelLoading}
                className="bg-[#FF8A00] hover:bg-[#e67d00] text-white px-8 py-3.5 rounded-xl transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                {isScanning ? 'Scanning...' : 'Check'}
              </button>
              
              <button className="text-sm text-gray-600 hover:text-[#FF8A00] transition-colors flex items-center justify-center gap-2">
                <Info className="w-4 h-4" />
                Having trouble? See tips for better images
              </button>
            </div>
          </div>

          {/* Right Side - Results */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <h2 className="text-2xl text-gray-900">Detection Result</h2>
            </motion.div>

            {/* Result Card */}
            <AnimatePresence mode="wait">
              {currentResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        currentResult.grade === 'High Grade' 
                          ? 'bg-gradient-to-br from-[#38B87C] to-[#5FD4A0]' 
                          : 'bg-gradient-to-br from-[#FFB84D] to-[#FFA366]'
                      }`}>
                        {currentResult.grade === 'High Grade' ? (
                          <CheckCircle className="w-8 h-8 text-white" />
                        ) : (
                          <AlertCircle className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className={`text-2xl mb-1 ${
                          currentResult.grade === 'High Grade' 
                            ? 'text-[#38B87C]' 
                            : 'text-[#FF8A00]'
                        }`}>
                          {currentResult.grade}
                        </h3>
                        <p className="text-gray-600">Classification complete</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl text-gray-900 mb-1">{currentResult.confidence}%</div>
                      <p className="text-sm text-gray-500">Confidence</p>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mb-6">
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${currentResult.confidence}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${
                          currentResult.grade === 'High Grade'
                            ? 'bg-gradient-to-r from-[#38B87C] to-[#5FD4A0]'
                            : 'bg-gradient-to-r from-[#FFB84D] to-[#FFA366]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Recommendation Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#FFF4E6] px-6 py-3 rounded-full">
                    <Sparkles className="w-5 h-5 text-[#FF8A00]" />
                    <span className="text-gray-900">
                      Recommended: <strong>{currentResult.recommendation}</strong>
                    </span>
                  </div>

                  {/* Orange Illustration */}
                  <div className="mt-8 flex justify-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-32 h-32 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] rounded-full relative shadow-lg"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle className="w-16 h-16 text-white opacity-50" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md p-12 mb-8 border-2 border-dashed border-gray-200 text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] rounded-full flex items-center justify-center opacity-20">
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">No scan yet</h3>
                  <p className="text-gray-500">Click "Check" to start scanning</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scan History */}
            <div>
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Scans
              </h3>
              
              <div className="space-y-2.5">
                {scanHistory.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-sm text-gray-500">No scan history yet</p>
                  </div>
                ) : (
                  scanHistory.map((scan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        scan.grade === 'High Grade'
                          ? 'bg-gradient-to-br from-[#38B87C] to-[#5FD4A0]'
                          : 'bg-gradient-to-br from-[#FFB84D] to-[#FFA366]'
                      }`}>
                        <div className="w-6 h-6 bg-white rounded-full opacity-30" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-gray-900 truncate">{scan.grade}</h4>
                        <p className="text-xs text-gray-500">
                          {scan.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2.5 py-1 rounded-full text-xs ${
                          scan.grade === 'High Grade'
                            ? 'bg-[#E8F5EE] text-[#38B87C]'
                            : 'bg-[#FFF4E6] text-[#FF8A00]'
                        }`}>
                          {scan.recommendation}
                        </span>
                        <span className="text-sm text-gray-600">{scan.confidence}%</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
