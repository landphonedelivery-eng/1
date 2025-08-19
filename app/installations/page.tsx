"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  WrenchIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PlusIcon,
} from "lucide-react"
import { format } from "date-fns"

interface InstallationTask {
  id: string
  billboardId: string
  billboardName: string
  location: string
  taskType: "installation" | "maintenance" | "removal"
  status: "scheduled" | "in-progress" | "completed" | "delayed"
  priority: "low" | "medium" | "high" | "urgent"
  assignedTeam: string
  scheduledDate: Date
  completedDate?: Date
  estimatedHours: number
  actualHours?: number
  notes: string
  customerName: string
  cost: number
}

export default function InstallationsPage() {
  const [tasks, setTasks] = useState<InstallationTask[]>([
    {
      id: "1",
      billboardId: "1",
      billboardName: "Downtown Prime",
      location: "Main Street & 5th Ave",
      taskType: "installation",
      status: "scheduled",
      priority: "high",
      assignedTeam: "Team Alpha",
      scheduledDate: new Date("2024-01-15"),
      estimatedHours: 8,
      notes: "New LED installation with smart controls",
      customerName: "ABC Marketing",
      cost: 2500,
    },
    {
      id: "2",
      billboardId: "2",
      billboardName: "Highway Express",
      location: "Highway 101 North",
      taskType: "maintenance",
      status: "in-progress",
      priority: "medium",
      assignedTeam: "Team Beta",
      scheduledDate: new Date("2024-01-12"),
      estimatedHours: 4,
      actualHours: 3,
      notes: "Routine maintenance and cleaning",
      customerName: "XYZ Corp",
      cost: 800,
    },
    {
      id: "3",
      billboardId: "3",
      billboardName: "Shopping Center",
      location: "Mall Plaza",
      taskType: "removal",
      status: "completed",
      priority: "low",
      assignedTeam: "Team Gamma",
      scheduledDate: new Date("2024-01-10"),
      completedDate: new Date("2024-01-10"),
      estimatedHours: 6,
      actualHours: 5,
      notes: "Campaign ended, billboard removed",
      customerName: "Local Business",
      cost: 1200,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    billboardName: "",
    location: "",
    taskType: "installation" as const,
    priority: "medium" as const,
    assignedTeam: "",
    scheduledDate: "",
    estimatedHours: 0,
    notes: "",
    customerName: "",
    cost: 0,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "installation":
        return <WrenchIcon className="h-4 w-4" />
      case "maintenance":
        return <AlertCircleIcon className="h-4 w-4" />
      case "removal":
        return <CheckCircleIcon className="h-4 w-4" />
      default:
        return <WrenchIcon className="h-4 w-4" />
    }
  }

  const handleCreateTask = () => {
    const task: InstallationTask = {
      id: Date.now().toString(),
      billboardId: Date.now().toString(),
      billboardName: newTask.billboardName,
      location: newTask.location,
      taskType: newTask.taskType,
      status: "scheduled",
      priority: newTask.priority,
      assignedTeam: newTask.assignedTeam,
      scheduledDate: new Date(newTask.scheduledDate),
      estimatedHours: newTask.estimatedHours,
      notes: newTask.notes,
      customerName: newTask.customerName,
      cost: newTask.cost,
    }

    setTasks([...tasks, task])
    setIsDialogOpen(false)
    setNewTask({
      billboardName: "",
      location: "",
      taskType: "installation",
      priority: "medium",
      assignedTeam: "",
      scheduledDate: "",
      estimatedHours: 0,
      notes: "",
      customerName: "",
      cost: 0,
    })
  }

  const updateTaskStatus = (taskId: string, newStatus: InstallationTask["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              completedDate: newStatus === "completed" ? new Date() : task.completedDate,
            }
          : task,
      ),
    )
  }

  const getTaskStats = () => {
    const scheduled = tasks.filter((t) => t.status === "scheduled").length
    const inProgress = tasks.filter((t) => t.status === "in-progress").length
    const completed = tasks.filter((t) => t.status === "completed").length
    const delayed = tasks.filter((t) => t.status === "delayed").length

    return { scheduled, inProgress, completed, delayed }
  }

  const stats = getTaskStats()

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Track Your Installations</h1>
              <p className="text-lg text-slate-600">Stay organized with real-time updates</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Installation Task</DialogTitle>
                  <DialogDescription>Add a new installation, maintenance, or removal task</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="billboard-name">Billboard Name</Label>
                    <Input
                      id="billboard-name"
                      value={newTask.billboardName}
                      onChange={(e) => setNewTask({ ...newTask, billboardName: e.target.value })}
                      placeholder="Enter billboard name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newTask.location}
                      onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Task Type</Label>
                      <Select
                        value={newTask.taskType}
                        onValueChange={(value: any) => setNewTask({ ...newTask, taskType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="installation">Installation</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="removal">Removal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="team">Assigned Team</Label>
                    <Input
                      id="team"
                      value={newTask.assignedTeam}
                      onChange={(e) => setNewTask({ ...newTask, assignedTeam: e.target.value })}
                      placeholder="Enter team name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Scheduled Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newTask.scheduledDate}
                        onChange={(e) => setNewTask({ ...newTask, scheduledDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours">Est. Hours</Label>
                      <Input
                        id="hours"
                        type="number"
                        value={newTask.estimatedHours}
                        onChange={(e) =>
                          setNewTask({ ...newTask, estimatedHours: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input
                      id="customer"
                      value={newTask.customerName}
                      onChange={(e) => setNewTask({ ...newTask, customerName: e.target.value })}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost">Cost ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      value={newTask.cost}
                      onChange={(e) => setNewTask({ ...newTask, cost: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newTask.notes}
                      onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                      placeholder="Additional notes..."
                    />
                  </div>
                  <Button onClick={handleCreateTask} className="w-full bg-blue-600 hover:bg-blue-700">
                    Create Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Scheduled</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.scheduled}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Delayed</p>
                  <p className="text-3xl font-bold text-red-600">{stats.delayed}</p>
                </div>
                <AlertCircleIcon className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="delayed">Delayed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        {getTaskTypeIcon(task.taskType)}
                        <div>
                          <h3 className="font-semibold text-slate-800">{task.billboardName}</h3>
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <MapPinIcon className="h-3 w-3" />
                            {task.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-slate-500">Customer:</span>
                        <p className="font-medium">{task.customerName}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Team:</span>
                        <p className="font-medium">{task.assignedTeam}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Scheduled:</span>
                        <p className="font-medium">{format(task.scheduledDate, "MMM dd, yyyy")}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Hours:</span>
                        <p className="font-medium">
                          {task.actualHours ? `${task.actualHours}/${task.estimatedHours}` : task.estimatedHours}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Cost:</span>
                        <p className="font-medium text-blue-600">${task.cost.toLocaleString()}</p>
                      </div>
                    </div>

                    {task.notes && (
                      <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-md">{task.notes}</p>
                    )}

                    <div className="flex gap-2">
                      {task.status === "scheduled" && (
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, "in-progress")}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          Start Task
                        </Button>
                      )}
                      {task.status === "in-progress" && (
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, "completed")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Complete
                        </Button>
                      )}
                      {task.status !== "completed" && (
                        <Button size="sm" variant="outline" onClick={() => updateTaskStatus(task.id, "delayed")}>
                          Mark Delayed
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["scheduled", "in-progress", "completed", "delayed"].map((status) => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            {getTaskTypeIcon(task.taskType)}
                            <div>
                              <h3 className="font-semibold text-slate-800">{task.billboardName}</h3>
                              <p className="text-sm text-slate-600 flex items-center gap-1">
                                <MapPinIcon className="h-3 w-3" />
                                {task.location}
                              </p>
                            </div>
                          </div>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-slate-500">Customer:</span>
                            <p className="font-medium">{task.customerName}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Team:</span>
                            <p className="font-medium">{task.assignedTeam}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Scheduled:</span>
                            <p className="font-medium">{format(task.scheduledDate, "MMM dd, yyyy")}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Hours:</span>
                            <p className="font-medium">
                              {task.actualHours ? `${task.actualHours}/${task.estimatedHours}` : task.estimatedHours}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-500">Cost:</span>
                            <p className="font-medium text-blue-600">${task.cost.toLocaleString()}</p>
                          </div>
                        </div>

                        {task.notes && (
                          <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-md">{task.notes}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
