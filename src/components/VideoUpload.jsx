import { forwardRef, useImperativeHandle, useRef } from "react";
import '../styles/VideoUpload.css'

export const VideoUpload = forwardRef(({ src, onClick }, ref) => {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const isCountingDown = useRef(false)

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
                isCountingDown.current = false 
                videoRef.current.play()
            } else {
                drawNumber(count);
            }
        }, 1000);
    }

    useImperativeHandle(ref, () => ({
        play: () => videoRef.current.play(),
        startCountdown: () => startCountdown()
    }))

    return (
        <div className="video-container">
            <button className="close-button" onClick={onClick}>X</button>
            <video ref={videoRef} src={src} width={640} height={480} />
            <canvas ref={canvasRef} width={640} height={480}
                style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
    )
});