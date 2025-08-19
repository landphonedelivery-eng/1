"use client"

import React, { useRef, useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink } from "lucide-react"

interface Billboard {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  nearestPoint: string
  municipality: string
  city: string
  size: string
  price?: string
  status: "available" | "occupied"
  image: string
  customerName?: string
  adType?: string
  contractNumber: string
  gpsLink: string
  views?: string
  bookings?: number
}

interface BillboardMapProps {
  billboards: Billboard[]
}

const BillboardMap = React.memo(function BillboardMap({ billboards }: BillboardMapProps) {
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(null)
  const [tooltip, setTooltip] = useState<{ billboard: Billboard; x: number; y: number } | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Libya bounds for coordinate mapping
  const LIBYA_BOUNDS = {
    north: 33.2,
    south: 19.5,
    east: 25.2,
    west: 9.3,
  }

  const coordsToPixels = useCallback((lat: number, lng: number, mapWidth: number, mapHeight: number) => {
    const x = ((lng - LIBYA_BOUNDS.west) / (LIBYA_BOUNDS.east - LIBYA_BOUNDS.west)) * mapWidth
    const y = ((LIBYA_BOUNDS.north - lat) / (LIBYA_BOUNDS.north - LIBYA_BOUNDS.south)) * mapHeight
    return { x: Math.max(0, Math.min(mapWidth, x)), y: Math.max(0, Math.min(mapHeight, y)) }
  }, [])

  const markerPositions = useMemo(() => {
    const mapWidth = 800 // Default width
    const mapHeight = 600 // Default height

    return billboards.map((billboard) => ({
      billboard,
      position: coordsToPixels(billboard.coordinates.lat, billboard.coordinates.lng, mapWidth, mapHeight),
    }))
  }, [billboards, coordsToPixels])

  const handleMarkerClick = useCallback((billboard: Billboard) => {
    setSelectedBillboard(billboard)
    setTooltip(null)
  }, [])

  const handleMarkerHover = useCallback((billboard: Billboard, event: React.MouseEvent) => {
    const rect = mapRef.current?.getBoundingClientRect()
    if (rect) {
      setTooltip({
        billboard,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
  }, [])

  const handleMarkerLeave = useCallback(() => {
    setTooltip(null)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedBillboard(null)
  }, [])

  const handleOpenGPS = useCallback((gpsLink: string) => {
    window.open(gpsLink, "_blank")
  }, [])

  const statistics = useMemo(
    () => ({
      available: billboards.filter((b) => b.status === "available").length,
      occupied: billboards.filter((b) => b.status === "occupied").length,
    }),
    [billboards],
  )

  return (
    <div className="relative w-full h-full">
      {/* Custom Map Container */}
      <div
        ref={mapRef}
        className="custom-map w-full h-full relative rounded-lg"
        style={{
          backgroundImage: `linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)`,
          backgroundSize: "cover",
        }}
      >
        {/* Libya outline overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            className="absolute inset-0"
            style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))" }}
          >
            {/* Simplified Libya outline */}
            <path
              d="M100 200 L700 200 L700 500 L100 500 Z"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
            />
            {/* Major cities indicators */}
            <circle cx="200" cy="300" r="3" fill="rgba(0,0,0,0.3)" />
            <text x="210" y="305" fontSize="12" fill="rgba(0,0,0,0.5)" fontWeight="bold">
              طرابلس
            </text>
            <circle cx="600" cy="280" r="3" fill="rgba(0,0,0,0.3)" />
            <text x="610" y="285" fontSize="12" fill="rgba(0,0,0,0.5)" fontWeight="bold">
              بنغازي
            </text>
            <circle cx="400" cy="450" r="3" fill="rgba(0,0,0,0.3)" />
            <text x="410" y="455" fontSize="12" fill="rgba(0,0,0,0.5)" fontWeight="bold">
              سبها
            </text>
          </svg>
        </div>

        {/* Billboard Markers */}
        {markerPositions.map(({ billboard, position }) => (
          <div
            key={billboard.id}
            className={`map-marker ${selectedBillboard?.id === billboard.id ? "selected" : ""}`}
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              zIndex: selectedBillboard?.id === billboard.id ? 20 : 10,
            }}
            onClick={() => handleMarkerClick(billboard)}
            onMouseEnter={(e) => handleMarkerHover(billboard, e)}
            onMouseLeave={handleMarkerLeave}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs transition-transform hover:scale-110 ${
                billboard.status === "available" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              ف
            </div>
          </div>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute bg-black/90 text-white p-2 rounded-lg shadow-lg pointer-events-none z-30 text-xs"
            style={{
              left: `${tooltip.x + 10}px`,
              top: `${tooltip.y - 10}px`,
              transform: "translateY(-100%)",
            }}
          >
            <div className="font-bold text-sm">{tooltip.billboard.name}</div>
            <div className="text-xs">{tooltip.billboard.nearestPoint}</div>
            <div className="text-xs">{tooltip.billboard.city}</div>
            <div className="text-xs">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-1 ${
                  tooltip.billboard.status === "available" ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              {tooltip.billboard.status === "available" ? "متاح" : "مؤجر"}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-800/95 p-3 rounded-lg shadow-lg border border-border">
        <h4 className="font-bold text-sm mb-2 text-foreground">دليل الألوان</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-xs text-foreground font-medium">متاح للحجز</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-xs text-foreground font-medium">مؤجر</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-800/95 p-3 rounded-lg shadow-lg border border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{statistics.available}</div>
            <div className="text-xs text-foreground font-medium">متاح</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">{statistics.occupied}</div>
            <div className="text-xs text-foreground font-medium">مؤجر</div>
          </div>
        </div>
      </div>

      {/* Selected Billboard Details */}
      {selectedBillboard && (
        <div className="absolute top-4 left-4 w-80">
          <Card className="shadow-xl border-0 bg-white/95 dark:bg-slate-800/95">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-foreground">{selectedBillboard.name}</h3>
                <Button variant="ghost" size="sm" onClick={handleCloseDetails} className="h-6 w-6 p-0 text-foreground">
                  ✕
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-foreground font-medium">{selectedBillboard.nearestPoint}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-foreground font-medium">البلدية: {selectedBillboard.municipality}</span>
                  <span className="text-foreground font-medium">المدينة: {selectedBillboard.city}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-foreground font-medium">المقاس: {selectedBillboard.size}</span>
                  <Badge
                    className={
                      selectedBillboard.status === "available"
                        ? "bg-green-500 text-white font-semibold"
                        : "bg-red-500 text-white font-semibold"
                    }
                  >
                    {selectedBillboard.status === "available" ? "متاح" : "مؤجر"}
                  </Badge>
                </div>

                {selectedBillboard.customerName && (
                  <div className="text-foreground font-medium">
                    <strong>العميل:</strong> {selectedBillboard.customerName}
                  </div>
                )}

                {selectedBillboard.adType && (
                  <div className="text-foreground font-medium">
                    <strong>نوع الإعلان:</strong> {selectedBillboard.adType}
                  </div>
                )}

                {selectedBillboard.price && (
                  <div className="bg-[#D4AF37]/10 p-2 rounded">
                    <span className="text-[#D4AF37] font-bold">💰 {selectedBillboard.price} د.ل/شهر</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleOpenGPS(selectedBillboard.gpsLink)}
                  className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  عرض في خرائط جوجل
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
})

export default BillboardMap
