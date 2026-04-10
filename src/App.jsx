import { useState, useEffect, useRef } from "react"
import { VideoUpload } from "./components/VideoUpload"
import VideoUploadPlaceholder from "./components/VideoUploadPlaceholder"
import './App.css'
import { Camera } from "./styles/Camera"

export default function App() {
  // logic for live camera
  const cameraRef = useRef(null)


  // logic for upload video
  const referenceVideoRef = useRef(null)
  const [refVideoPath, setRefVideoPath] = useState(null)

  const isOpeningDialog = useRef(false)

  const handleUpload = async () => {
    if (isOpeningDialog.current) return   // already open, do nothing

    isOpeningDialog.current = true
    const filePath = await window.electronAPI.openVideo()
    isOpeningDialog.current = false

    if (filePath) setRefVideoPath(filePath)
  }

  const handleClose = () => {
    setRefVideoPath(null)
  }


  // logic for starting application 
  const handleStart = () => {
    cameraRef.current.startCountdown()
    referenceVideoRef.current.startCountdown()

  }

  return (
    <div className="app-container">
      {/* 2 sections one side that is your camera the other uploads your video */}
      <div className="divider">
        <Camera ref={cameraRef}/>

        {refVideoPath
          ? <VideoUpload ref={referenceVideoRef } src={`file://${refVideoPath}`} onClick={() => handleClose()} />
          : <VideoUploadPlaceholder onUpload={() => handleUpload()} />
        }

      </div>

      {refVideoPath && <button className="start-button" onClick={handleStart}>Start</button>}
    </div>
  )
}