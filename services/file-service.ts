import { logger } from "@/lib/logger"

interface FileProcessingResult {
  content: string
  metadata: {
    filename: string
    size: number
    type: string
    uploadedAt: string
  }
}

class FileService {
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  private readonly ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "text/plain",
    "application/pdf",
  ]

  async processFile(file: File): Promise<FileProcessingResult> {
    // Validate file
    this.validateFile(file)

    try {
      let content: string

      if (file.type.startsWith("image/")) {
        content = await this.processImage(file)
      } else if (file.type === "text/plain") {
        content = await this.processText(file)
      } else if (file.type === "application/pdf") {
        content = await this.processPDF(file)
      } else {
        throw new Error(`Unsupported file type: ${file.type}`)
      }

      return {
        content,
        metadata: {
          filename: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        },
      }
    } catch (error) {
      logger.error("File processing failed", {
        filename: file.name,
        error,
      })
      throw error
    }
  }

  private validateFile(file: File): void {
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(`File size exceeds limit of ${this.MAX_FILE_SIZE / 1024 / 1024}MB`)
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`File type ${file.type} is not supported`)
    }
  }

  private async processImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const base64 = reader.result as string
        resolve(`Image uploaded: ${file.name} (${file.type}) - Base64 data available for analysis`)
      }

      reader.onerror = () => reject(new Error("Failed to read image file"))
      reader.readAsDataURL(file)
    })
  }

  private async processText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve(reader.result as string)
      }

      reader.onerror = () => reject(new Error("Failed to read text file"))
      reader.readAsText(file)
    })
  }

  private async processPDF(file: File): Promise<string> {
    // For now, return metadata - in production, use PDF.js or similar
    return `PDF document: ${file.name} (${file.size} bytes) - Content extraction would be implemented with PDF.js`
  }
}

export const fileService = new FileService()
