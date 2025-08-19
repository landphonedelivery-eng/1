"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon } from "lucide-react"
import { format } from "date-fns"

interface Billboard {
  id: string
  name: string
  location: string
  size: string
  pricePerDay: number
  status: "available" | "booked" | "maintenance"
  image: string
}

interface Booking {
  id: string
  billboardId: string
  customerName: string
  customerEmail: string
  startDate: Date
  endDate: Date
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
}

export default function BookingsPage() {
  const [billboards] = useState<Billboard[]>([
    {
      id: "1",
      name: "Downtown Prime",
      location: "Main Street & 5th Ave",
      size: "14x48 ft",
      pricePerDay: 500,
      status: "available",
      image: "/downtown-billboard.png",
    },
    {
      id: "2",
      name: "Highway Express",
      location: "Highway 101 North",
      size: "12x24 ft",
      pricePerDay: 350,
      status: "available",
      image: "/highway-billboard.png",
    },
    {
      id: "3",
      name: "Shopping Center",
      location: "Mall Plaza",
      size: "10x20 ft",
      pricePerDay: 250,
      status: "booked",
      image: "/placeholder-donml.png",
    },
  ])

  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedBillboard, setSelectedBillboard] = useState<string>("")
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)

  const calculateTotalPrice = () => {
    if (!selectedBillboard || !startDate || !endDate) return 0
    const billboard = billboards.find((b) => b.id === selectedBillboard)
    if (!billboard) return 0
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    return billboard.pricePerDay * days
  }

  const handleBooking = async () => {
    if (!selectedBillboard || !customerName || !customerEmail || !startDate || !endDate) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newBooking: Booking = {
      id: Date.now().toString(),
      billboardId: selectedBillboard,
      customerName,
      customerEmail,
      startDate,
      endDate,
      totalPrice: calculateTotalPrice(),
      status: "pending",
      createdAt: new Date(),
    }

    setBookings([...bookings, newBooking])

    // Reset form
    setSelectedBillboard("")
    setCustomerName("")
    setCustomerEmail("")
    setStartDate(undefined)
    setEndDate(undefined)
    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "booked":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Secure Your Billboard Space</h1>
          <p className="text-lg text-slate-600">Effortlessly manage bookings and installations</p>
        </div>

        <Tabs defaultValue="book" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="book" className="font-semibold">
              Book Now
            </TabsTrigger>
            <TabsTrigger value="manage" className="font-semibold">
              Manage Bookings
            </TabsTrigger>
          </TabsList>

          {/* Booking Tab */}
          <TabsContent value="book" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Available Billboards */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <MapPinIcon className="h-5 w-5" />
                      Available Billboards
                    </CardTitle>
                    <CardDescription>Choose from our premium locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {billboards
                        .filter((b) => b.status === "available")
                        .map((billboard) => (
                          <div
                            key={billboard.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                              selectedBillboard === billboard.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                            }`}
                            onClick={() => setSelectedBillboard(billboard.id)}
                          >
                            <img
                              src={billboard.image || "/placeholder.svg"}
                              alt={billboard.name}
                              className="w-full h-32 object-cover rounded-md mb-3"
                            />
                            <h3 className="font-semibold text-slate-800">{billboard.name}</h3>
                            <p className="text-sm text-slate-600 mb-2">{billboard.location}</p>
                            <div className="flex justify-between items-center">
                              <Badge className={getStatusColor(billboard.status)}>{billboard.status}</Badge>
                              <span className="font-bold text-blue-600">${billboard.pricePerDay}/day</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{billboard.size}</p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <UserIcon className="h-5 w-5" />
                      Booking Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="customer-name">Customer Name</Label>
                      <Input
                        id="customer-name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customer-email">Email Address</Label>
                      <Input
                        id="customer-email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left bg-transparent">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left bg-transparent">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {calculateTotalPrice() > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-700">Total Price:</span>
                          <span className="text-2xl font-bold text-blue-600">
                            ${calculateTotalPrice().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleBooking}
                      disabled={
                        !selectedBillboard || !customerName || !customerEmail || !startDate || !endDate || isLoading
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      {isLoading ? "Processing..." : "Book Now"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Manage Bookings Tab */}
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <ClockIcon className="h-5 w-5" />
                  Recent Bookings
                </CardTitle>
                <CardDescription>Track and manage your billboard reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No bookings yet. Create your first booking!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => {
                      const billboard = billboards.find((b) => b.id === booking.billboardId)
                      return (
                        <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-800">{billboard?.name}</h3>
                              <p className="text-sm text-slate-600">{billboard?.location}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">Customer:</span>
                              <p className="font-medium">{booking.customerName}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Duration:</span>
                              <p className="font-medium">
                                {format(booking.startDate, "MMM dd")} - {format(booking.endDate, "MMM dd")}
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-500">Total:</span>
                              <p className="font-medium text-blue-600">${booking.totalPrice.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Booked:</span>
                              <p className="font-medium">{format(booking.createdAt, "MMM dd, yyyy")}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
