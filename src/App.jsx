import { useState, useEffect, useRef } from "react"
import { useCamera } from "./hooks/useCamera"
import { CONNECTIONS } from "./utils/poseUtils"
import { usePoseDetection } from "./hooks/usePoseDetection"

export default function App() {

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [keypoints, setKeypoints] = useState([])

  useCamera(videoRef)
  usePoseDetection(videoRef, setKeypoints)

useEffect(() => {
  if (!canvasRef.current || keypoints.length === 0) return

  const ctx = canvasRef.current.getContext('2d')
  ctx.clearRect(0, 0, 640, 480)

  const kpMap = Object.fromEntries(keypoints.map(kp => [kp.name, kp]))

  CONNECTIONS.forEach(([a, b]) => {
    const kpA = kpMap[a], kpB = kpMap[b]
    if (!kpA || !kpB) return  // add this too
    if (kpA.score < 0.35 || kpB.score < 0.35) return

    ctx.beginPath()
    ctx.moveTo(kpA.x, kpA.y)
    ctx.lineTo(kpB.x, kpB.y)
    ctx.strokeStyle = 'lime'
    ctx.lineWidth = 2
    ctx.stroke()
  })
}, [keypoints])

  return (
    <div className="app-container">
      {/* 2 sections one side that is your camera the other uploads your video */}

      <div style={{ position: 'relative', width: 640, height: 480 }}>
        <video ref={videoRef} width={640} height={480} />
        <canvas ref={canvasRef} width={640} height={480}
          style={{ position: 'absolute', top: 0, left: 0 }} />
      </div>
    </div>
  )
}