"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Key, Shield, CheckCircle, AlertTriangle, Trash2 } from "lucide-react"

export function ApiKeyManager() {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Load saved API key on component mount
    const savedKey = localStorage.getItem("groq_api_key")
    if (savedKey) {
      setApiKey(savedKey)
      setIsValid(validateApiKey(savedKey))
      setIsSaved(true)
    }
  }, [])

  const validateApiKey = (key: string): boolean => {
    // Groq API keys typically start with 'gsk_' and are 56 characters long
    return key.startsWith("gsk_") && key.length >= 50
  }

  const handleApiKeyChange = (value: string) => {
    setApiKey(value)
    setError("")
    setIsValid(validateApiKey(value))
  }

  const saveApiKey = () => {
    if (!isValid) {
      setError("Please enter a valid Groq API key (starts with 'gsk_')")
      return
    }

    try {
      localStorage.setItem("groq_api_key", apiKey)
      setIsSaved(true)
      setError("")
    } catch (err) {
      setError("Failed to save API key. Please try again.")
    }
  }

  const removeApiKey = () => {
    localStorage.removeItem("groq_api_key")
    setApiKey("")
    setIsSaved(false)
    setIsValid(false)
    setError("")
  }

  const maskApiKey = (key: string): string => {
    if (key.length < 12) return key
    return `${key.slice(0, 8)}${"•".repeat(key.length - 12)}${key.slice(-4)}`
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Key className="w-5 h-5" />
            Groq API Key Configuration
          </CardTitle>
          <CardDescription className="text-slate-300">
            Your API key is stored locally and never transmitted to our servers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-white">
              API Key
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="gsk_..."
                className="bg-slate-800 border-slate-600 text-white pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {isValid && <CheckCircle className="w-4 h-4 text-green-500" />}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowKey(!showKey)}
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <Alert className="bg-red-900/20 border-red-500/30">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button onClick={saveApiKey} disabled={!apiKey || !isValid} className="bg-purple-600 hover:bg-purple-700">
              {isSaved ? "Update Key" : "Save Key"}
            </Button>
            {isSaved && (
              <Button
                onClick={removeApiKey}
                variant="outline"
                className="border-red-500/30 text-red-300 hover:bg-red-900/20 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          {isSaved && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-500/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Secured
                </Badge>
                <span className="text-sm text-slate-400">Key: {maskApiKey(apiKey)}</span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Alert className="bg-blue-900/20 border-blue-500/30">
        <Shield className="w-4 h-4" />
        <AlertDescription className="text-blue-300">
          <strong>Security Note:</strong> Your API key is stored locally in your browser and is only sent directly to
          Groq's servers for analysis. We never see or store your API key on our servers.
        </AlertDescription>
      </Alert>

      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white text-sm">How to get your Groq API Key</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-300">
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Visit{" "}
              <a
                href="https://console.groq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                console.groq.com
              </a>
            </li>
            <li>Sign up or log in to your account</li>
            <li>Navigate to the API Keys section</li>
            <li>Create a new API key</li>
            <li>Copy and paste it here</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
