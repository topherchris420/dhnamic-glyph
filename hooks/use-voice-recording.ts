"use client"

import { useState, useRef, useCallback } from "react"
import { logger } from "@/lib/logger"

interface AudioData {
  blob: Blob
  duration: number
  url: string
}

export function useVoiceRecording() {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const startTimeRef = useRef<number>(0)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []
      startTimeRef.current = Date.now()

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)

      logger.info("Voice recording started")
    } catch (err) {
      logger.error("Failed to start recording", { error: err })
      throw new Error("Failed to access microphone")
    }
  }, [])

  const stopRecording = useCallback((): Promise<AudioData | null> => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current
      if (!mediaRecorder || mediaRecorder.state === "inactive") {
        resolve(null)
        return
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const duration = Date.now() - startTimeRef.current
        const url = URL.createObjectURL(blob)

        const audioData: AudioData = { blob, duration, url }

        logger.info("Voice recording completed", {
          duration,
          size: blob.size,
        })

        resolve(audioData)
      }

      mediaRecorder.stop()
      mediaRecorder.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
    })
  }, [])

  return {
    isRecording,
    startRecording,
    stopRecording,
  }
}
