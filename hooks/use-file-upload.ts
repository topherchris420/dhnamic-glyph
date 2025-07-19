"use client"

import { useState, useCallback } from "react"
import { fileService } from "@/services/file-service"
import { logger } from "@/lib/logger"

interface FileData {
  content: string
  metadata: {
    filename: string
    size: number
    type: string
    uploadedAt: string
  }
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = useCallback(async (file: File): Promise<FileData> => {
    setIsUploading(true)

    try {
      logger.info("Starting file upload", {
        filename: file.name,
        size: file.size,
        type: file.type,
      })

      const result = await fileService.processFile(file)

      logger.info("File upload completed", {
        filename: file.name,
        processedSize: result.content.length,
      })

      return result
    } catch (err) {
      logger.error("File upload failed", {
        filename: file.name,
        error: err,
      })
      throw err
    } finally {
      setIsUploading(false)
    }
  }, [])

  return {
    uploadFile,
    isUploading,
  }
}
