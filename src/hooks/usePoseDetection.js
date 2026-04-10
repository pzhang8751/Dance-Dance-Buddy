import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import { useState, useEffect, useRef } from 'react'

export const usePoseDetection = (videoRef, setKeypoints) => {
    const [isReady, setIsReady] = useState(false)
    const detectorRef = useRef(null)

    useEffect(() => {
        async function loadModel() {
            await tf.ready()
            const detector = await poseDetection.createDetector(
                poseDetection.SupportedModels.MoveNet,
                { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
            )
            detectorRef.current = detector
            setIsReady(true)
        }

        loadModel()
    }, [])


    useEffect(() => {
        if (!isReady) return

        let animId

        async function detect() {
            if (videoRef.current?.readyState === 4) {
                const poses = await detectorRef.current.estimatePoses(videoRef.current)
                
                setKeypoints(poses[0]?.keypoints ?? [])

                setKeypoints(poses[0]?.keypoints ?? [])
            }

            animId = requestAnimationFrame(detect)
        }

        animId = requestAnimationFrame(detect)
        return () => cancelAnimationFrame(animId)
    }, [isReady])


}
