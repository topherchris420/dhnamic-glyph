"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Upload, Type } from "lucide-react"
import { ProcessingIndicator } from "@/components/common/processing-indicator"
import { useVoiceRecording } from "@/hooks/use-voice-recording"
import { useFileUpload } from "@/hooks/use-file-upload"
import type { InputData } from "@/types/analysis"

interface InputPanelProps {
  onSubmit: (data: InputData) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function InputPanel({ onSubmit, isLoading, error }: InputPanelProps) {
  const [activeTab, setActiveTab] = useState("text")
  const [textInput, setTextInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { isRecording, startRecording, stopRecording } = useVoiceRecording()
  const { uploadFile, isUploading } = useFileUpload()

  const handleTextSubmit = useCallback(async () => {
    if (!textInput.trim()) return
    await onSubmit({
      content: textInput,
      type: "text",
      metadata: { length: textInput.length },
    })
  }, [textInput, onSubmit])

  const handleVoiceRecording = useCallback(async () => {
    if (isRecording) {
      const audioData = await stopRecording()
      if (audioData) {
        await onSubmit({
          content: audioData,
          type: "voice",
          metadata: { duration: audioData.duration },
        })
      }
    } else {
      startRecording()
    }
  }, [isRecording, startRecording, stopRecording, onSubmit])

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      try {
        const fileData = await uploadFile(file)
        await onSubmit({
          content: fileData.content,
          type: "symbol",
          metadata: {
            filename: file.name,
            size: file.size,
            type: file.type,
          },
        })
      } catch (err) {
        console.error("File upload failed:", err)
      }
    },
    [uploadFile, onSubmit],
  )

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-slate-700">
          <TabsTrigger value="text" className="data-[state=active]:bg-purple-600">
            <Type className="w-4 h-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="voice" className="data-[state=active]:bg-purple-600">
            <Mic className="w-4 h-4 mr-2" />
            Voice
          </TabsTrigger>
          <TabsTrigger value="symbol" className="data-[state=active]:bg-purple-600">
            <Upload className="w-4 h-4 mr-2" />
            Symbol
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Textarea
            placeholder="Enter your thoughts, dreams, or any text to decode..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="min-h-32 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleTextSubmit}
            disabled={!textInput.trim() || isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Decode Text Resonance
          </Button>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <div className="text-center space-y-4">
            <p className="text-slate-300">Capture voice patterns and emotional undertones</p>
            <Button
              onClick={handleVoiceRecording}
              disabled={isLoading}
              className={`w-full ${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
            >
              <Mic className="w-4 h-4 mr-2" />
              {isRecording ? "Stop Recording" : "Start Voice Analysis"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="symbol" className="space-y-4">
          <div className="text-center space-y-4">
            <p className="text-slate-300">Upload symbols, diagrams, or images for archetypal analysis</p>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,.txt,.pdf"
              className="hidden"
              disabled={isLoading || isUploading}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isUploading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Symbol/File"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {(isLoading || isUploading) && <ProcessingIndicator />}
      {error && (
        <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}
