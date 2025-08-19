import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Plus, Search, CheckSquare, Clock, CheckCircle, AlertTriangle, Edit, Trash2, Eye } from 'lucide-react'

interface InstallationTask {
  id: string
  title: string
  client: string
  billboard: string
  team: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  progress: number
  assignedDate?: string
  completedDate?: string
  notes?: string
}

export const InstallationTasksPage: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")

  // Mock data for installation tasks matching the original code
  const [tasks] = useState<InstallationTask[]>([
    {
      id: "TASK-001",
      title: "تركيب لوحة شارع الجمهورية",
      client: "شركة النور للإعلان",
      billboard: "لوحة رقم 45 - شارع الجمهورية",
      team: "فريق التركيب الأول",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-01-15",
      progress: 65,
      assignedDate: "2024-01-10",
      notes: "تم البدء في أعمال التركيب، في انتظار وصول المواد"
    },
    {
      id: "TASK-002",
      title: "صيانة لوحة طريق المطار",
      client: "مؤسسة الأضواء",
      billboard: "لوحة رقم 23 - طريق المطار",
      team: "فريق الصيانة",
      status: "pending",
      priority: "medium",
      dueDate: "2024-01-18",
      progress: 0,
      assignedDate: "2024-01-12",
      notes: "في انتظار الحصول على التصاريح اللازمة"
    },
    {
      id: "TASK-003",
      title: "تركيب لوحة ميدان الشهداء",
      client: "شركة الإبداع التجاري",
      billboard: "لوحة رقم 67 - ميدان الشهداء",
      team: "فريق التركيب الثاني",
      status: "completed",
      priority: "high",
      dueDate: "2024-01-10",
      progress: 100,
      assignedDate: "2024-01-05",
      completedDate: "2024-01-09",
      notes: "تم الانتهاء من التركيب بنجاح"
    },
    {
      id: "TASK-004",
      title: "استبدال لوحة شارع عمر المختار",
      client: "شركة الرؤية الحديثة",
      billboard: "لوحة رقم 12 - شارع عمر المختار",
      team: "فريق التركيب الأول",
      status: "overdue",
      priority: "high",
      dueDate: "2024-01-08",
      progress: 30,
      assignedDate: "2024-01-03",
      notes: "تأخير بسبب سوء الأحوال الجوية"
    },
    {
      id: "TASK-005",
      title: "تركيب لوحة طريق الشط",
      client: "مجموعة الأفق التجارية",
      billboard: "لوحة رقم 89 - طريق الشط",
      team: "فريق التركيب الثاني",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-01-20",
      progress: 45,
      assignedDate: "2024-01-14",
      notes: "جاري العمل على التركيب"
    },
    {
      id: "TASK-006",
      title: "صيانة دورية لوحة الكورنيش",
      client: "شركة البحر الأزرق",
      billboard: "لوحة رقم 34 - الكورنيش",
      team: "فريق الصيانة",
      status: "completed",
      priority: "low",
      dueDate: "2024-01-12",
      progress: 100,
      assignedDate: "2024-01-08",
      completedDate: "2024-01-11",
      notes: "تمت الصيانة الدورية بنجاح"
    },
    {
      id: "TASK-007",
      title: "تركيب لوحة جديدة - طريق السبعة",
      client: "شركة النجمة الذهبية",
      billboard: "لوحة رقم 156 - طريق السبعة",
      team: "فريق التركيب الثالث",
      status: "pending",
      priority: "medium",
      dueDate: "2024-01-25",
      progress: 0,
      assignedDate: "2024-01-15",
      notes: "في انتظار وصول اللوحة من المطبعة"
    },
    {
      id: "TASK-008",
      title: "إزالة لوحة قديمة - شارع الفتح",
      client: "شركة التطوير العقاري",
      billboard: "لوحة رقم 78 - شارع الفتح",
      team: "فريق التركيب الأول",
      status: "in-progress",
      priority: "low",
      dueDate: "2024-01-22",
      progress: 20,
      assignedDate: "2024-01-16",
      notes: "بدء أعمال الإزالة"
    }
  ])

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
      searchFilter === "" ||
      task.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      task.client.toLowerCase().includes(searchFilter.toLowerCase()) ||
      task.billboard.toLowerCase().includes(searchFilter.toLowerCase()) ||
      task.team.toLowerCase().includes(searchFilter.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesTeam = teamFilter === "all" || task.team === teamFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesTeam
  })

  const getStatusBadge = (status: InstallationTask['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      overdue: 'bg-red-100 text-red-800 border-red-200'
    }

    const labels = {
      pending: 'في الانتظار',
      'in-progress': 'قيد التنفيذ',
      completed: 'مكتملة',
      overdue: 'متأخرة'
    }

    return (
      <Badge className={`${colors[status]} font-medium`}>
        {labels[status]}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: InstallationTask['priority']) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800 border-gray-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-red-100 text-red-800 border-red-200'
    }

    const labels = {
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية'
    }

    return (
      <Badge className={`${colors[priority]} font-medium`}>
        {labels[priority]}
      </Badge>
    )
  }

  const getStatusIcon = (status: InstallationTask['status']) => {
    const icons = {
      pending: Clock,
      'in-progress': CheckSquare,
      completed: CheckCircle,
      overdue: AlertTriangle
    }
    
    const colors = {
      pending: 'text-yellow-600',
      'in-progress': 'text-blue-600',
      completed: 'text-green-600',
      overdue: 'text-red-600'
    }

    const Icon = icons[status]
    return <Icon className={`h-8 w-8 ${colors[status]}`} />
  }

  const handleEdit = (task: InstallationTask) => {
    console.log('Edit task:', task)
  }

  const handleDelete = (taskId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه المهمة؟")) {
      console.log('Delete task:', taskId)
    }
  }

  const handleView = (task: InstallationTask) => {
    console.log('View task:', task)
  }

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.status === 'overdue').length
  }

  const teams = [...new Set(tasks.map(t => t.team))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            مهام التركيب
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">إدارة ومتابعة مهام تركيب اللوحات الإعلانية</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="w-4 h-4 ml-2" />
            مهمة جديدة
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">إجمالي المهام</p>
                <p className="text-2xl font-bold text-orange-800 dark:text-orange-300">{stats.total}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">قيد التنفيذ</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{stats.inProgress}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">مكتملة</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-300">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">متأخرة</p>
                <p className="text-2xl font-bold text-red-800 dark:text-red-300">{stats.overdue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredTasks.slice(0, 6).map((task) => (
          <Card key={task.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {task.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                  </div>
                </div>
                {getStatusIcon(task.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">العميل:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{task.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">الفريق:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{task.team}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الاستحقاق:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{task.dueDate}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">التقدم:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'overdue' ? 'bg-red-500' :
                      task.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {task.billboard}
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(task)}
                    className="hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(task)}
                    className="hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                    className="hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Table */}
      <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-gray-200">
            جميع المهام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-600" />
              <Input
                placeholder="البحث في المهام..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-10 border-orange-500/30 focus:border-orange-500 focus:ring-orange-500/20"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] border-orange-500/30 focus:border-orange-500">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
                <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                <SelectItem value="completed">مكتملة</SelectItem>
                <SelectItem value="overdue">متأخرة</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px] border-orange-500/30 focus:border-orange-500">
                <SelectValue placeholder="الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأولويات</SelectItem>
                <SelectItem value="low">منخفضة</SelectItem>
                <SelectItem value="medium">متوسطة</SelectItem>
                <SelectItem value="high">عالية</SelectItem>
              </SelectContent>
            </Select>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-[200px] border-orange-500/30 focus:border-orange-500">
                <SelectValue placeholder="الفريق" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفرق</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-2xl border border-orange-500/20 overflow-hidden shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-b border-orange-500/20">
                  <TableHead className="font-bold text-gray-900 dark:text-white">المهمة</TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-white">العميل</TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-white">الفريق</TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-white">الحالة</TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-white">الأولوية</TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-white">التقدم</TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-white">تاريخ الاستحقاق</TableHead>
                  <TableHead className="font-bold text-gray-900 dark:text-white">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task, index) => (
                  <TableRow 
                    key={task.id}
                    className={`hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-700/50'
                    }`}
                  >
                    <TableCell>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{task.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                          {task.billboard}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{task.client}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{task.team}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              task.status === 'completed' ? 'bg-green-500' :
                              task.status === 'overdue' ? 'bg-red-500' :
                              task.status === 'in-progress' ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{task.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(task)}
                          className="hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(task)}
                          className="hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(task.id)}
                          className="hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}