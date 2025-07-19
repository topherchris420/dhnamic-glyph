"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, EyeOff, Key, Settings, Shield, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ApiKeyManagerProps {
  onApiKeyChange?: (hasKey: boolean) => void
}

export function ApiKeyManager({ onApiKeyChange }: ApiKeyManagerProps) {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hasStoredKey, setHasStoredKey] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if API key exists in localStorage on component mount
    const storedKey = localStorage.getItem("groq_api_key")
    if (storedKey) {
      setHasStoredKey(true)
      setApiKey(storedKey)
      onApiKeyChange?.(true)
    }
  }, [onApiKeyChange])

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid Groq API key.",
        variant: "destructive",
      })
      return
    }

    if (!apiKey.startsWith("gsk_")) {
      toast({
        title: "Invalid Format",
        description: "Groq API keys should start with 'gsk_'.",
        variant: "destructive",
      })
      return
    }

    try {
      localStorage.setItem("groq_api_key", apiKey)
      setHasStoredKey(true)
      setIsOpen(false)
      onApiKeyChange?.(true)
      toast({
        title: "API Key Saved",
        description: "Your Groq API key has been securely stored locally.",
      })
    } catch (error) {
      toast({
        title: "Storage Error",
        description: "Failed to save API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveApiKey = () => {
    localStorage.removeItem("groq_api_key")
    setApiKey("")
    setHasStoredKey(false)
    setIsOpen(false)
    onApiKeyChange?.(false)
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed from local storage.",
    })
  }

  const maskedKey = apiKey
    ? `${apiKey.slice(0, 8)}${"*".repeat(Math.max(0, apiKey.length - 12))}${apiKey.slice(-4)}`
    : ""

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Key className="w-4 h-4" />
          {hasStoredKey ? (
            <>
              <Shield className="w-4 h-4 text-green-500" />
              API Key Set
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Set API Key
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Groq API Key Management
          </DialogTitle>
          <DialogDescription>
            Securely manage your Groq API key for LLaMA inference. Your key is stored locally and never transmitted to
            our servers.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">API Key Configuration</CardTitle>
            <CardDescription className="text-xs">
              Get your free API key from{" "}
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Groq Console
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Groq API Key</Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showKey ? "text" : "password"}
                  placeholder="gsk_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {hasStoredKey && (
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">Current API Key</span>
                </div>
                <code className="text-xs text-green-700 dark:text-green-300 font-mono">{maskedKey}</code>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleSaveApiKey} className="flex-1">
                {hasStoredKey ? "Update Key" : "Save Key"}
              </Button>
              {hasStoredKey && (
                <Button variant="destructive" onClick={handleRemoveApiKey}>
                  Remove
                </Button>
              )}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Stored locally in your browser</span>
              </div>
              <div className="flex items-center gap-1">
                <Key className="w-3 h-3" />
                <span>Never transmitted to our servers</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
