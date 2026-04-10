
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { useCamera } from "../hooks/useCamera"
import { CONNECTIONS } from "../utils/poseUtils"
import { usePoseDetection } from "../hooks/usePoseDetection"

export const Camera = forwardRef(({ }, ref) => {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [keypoints, setKeypoints] = useState([])

    useCamera(videoRef)
    usePoseDetection(videoRef, setKeypoints)

    const isCountingDown = useRef(false)

    // draws skeleton outline 
    useEffect(() => {
        if (!canvasRef.current || keypoints.length === 0) return
        if (isCountingDown.current) return 

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

    // draw 3 2 1 animation
    const startCountdown = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let count = 3
        isCountingDown.current = true

        const drawNumber = (num) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.font = 'bold 120px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(num, canvas.width / 2, canvas.height / 2)
        }

        drawNumber(count)

        const interval = setInterval(() => {
            count--;
            if (count === 0) {
                clearInterval(interval);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // start your video and session here

                isCountingDown.current = false
            } else {
                drawNumber(count);
            }
        }, 1000);
    }

    useImperativeHandle(ref, () => ({
        startCountdown: () => startCountdown()
    }))

    return (
        <div style={{ position: 'relative', width: 640, height: 480 }}>
            <video ref={videoRef} width={640} height={480} />
            <canvas ref={canvasRef} width={640} height={480}
                style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
    )
});