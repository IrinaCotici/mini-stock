'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

interface BarcodeScannerProps {
  onScanSuccess: (barcode: string) => void
  onScanError?: (error: string) => void
  fps?: number
  qrbox?: { width: number; height: number }
  aspectRatio?: number
}

export default function BarcodeScanner({
  onScanSuccess,
  onScanError,
  fps = 10,
  qrbox = { width: 250, height: 250 },
  aspectRatio = 1.0,
}: BarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [supportedFormats, setSupportedFormats] = useState<string[]>([])

  useEffect(() => {
    // Check if browser supports camera access
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera access is not supported in this browser')
      return
    }

    return () => {
      stopScanning()
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      
      const scannerId = 'barcode-scanner'
      const scanner = new Html5Qrcode(scannerId)
      scannerRef.current = scanner

      // Supported barcode formats
      const formats = [
        'EAN_13',
        'EAN_8',
        'UPC_A',
        'UPC_E',
        'CODE_128',
        'CODE_39',
        'CODE_93',
        'ITF',
        'CODABAR',
      ]
      setSupportedFormats(formats)

      await scanner.start(
        { facingMode: 'environment' }, // Use back camera on mobile
        {
          fps,
          qrbox,
          aspectRatio,
          formatsToSupport: formats,
        },
        (decodedText) => {
          // Success callback
          onScanSuccess(decodedText)
        },
        (errorMessage) => {
          // Error callback (ignored - we'll handle it silently)
          // Only show actual errors, not "no QR code found" messages
          if (errorMessage.includes('NotFoundException') === false) {
            if (onScanError) {
              onScanError(errorMessage)
            }
          }
        }
      )

      setIsScanning(true)
    } catch (err: any) {
      let errorMessage = 'Failed to start camera'
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Camera permission denied. Please allow camera access.'
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device'
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use by another application'
      }
      setError(errorMessage)
      setIsScanning(false)
      console.error('Scanner error:', err)
    }
  }

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop()
        await scannerRef.current.clear()
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
      scannerRef.current = null
      setIsScanning(false)
    }
  }

  const toggleScanning = () => {
    if (isScanning) {
      stopScanning()
    } else {
      startScanning()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative bg-black rounded-lg overflow-hidden">
        <div id="barcode-scanner" className="w-full" style={{ minHeight: '300px' }}></div>
        {!isScanning && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <button
              onClick={startScanning}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Start Camera
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      {isScanning && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={toggleScanning}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Stop Scanning
          </button>
        </div>
      )}

      {supportedFormats.length > 0 && (
        <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 text-center">
          <p>Supported formats: {supportedFormats.join(', ')}</p>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-blue-800 dark:text-blue-200 text-xs">
          💡 Position the barcode within the frame. The scanner works best in good lighting conditions.
        </p>
      </div>
    </div>
  )
}

