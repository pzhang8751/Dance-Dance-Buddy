import { useEffect, useRef } from "react";

export function useCamera(videoRef) {
    const streamRef = useRef(null)

    useEffect(() => {
        async function startCamera() {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 },
                audio: false
            })

            if (!videoRef.current) return  // add this guard

            videoRef.current.srcObject = stream
            await videoRef.current.play()
            streamRef.current = stream
        }

        startCamera()

        return () => {
            streamRef.current?.getTracks().forEach(track => track.stop())
        }
    }, [])



}