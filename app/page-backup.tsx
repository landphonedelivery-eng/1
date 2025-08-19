"use client"

import { App } from '../src/App'

export default function Page() {
  return <App />
}
  email: string
  fullName: string
  role: "admin" | "user"
  createdAt: string
  lastLogin?: string
  phone?: string
  department?: string
}

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  company?: string
  address?: string
  totalBookings: number
  totalSpent: number
  lastBooking: string
  notes?: string
  category: "marketer" | "company" | "individual"
  createdAt: string
  status: "active" | "inactive" | "vip"
}

interface PricingRule {
  id: string
  size: string
  basePrice: number
  city: string
  multiplier: number
}

interface PriceLevel {
  id: string
  name: string
  level: "A" | "B"
  sizes: {
    [key: string]: {
      marketers: number
      companies: number
      individuals: number
    }
  }
  cities: {
    [key: string]: {
      multiplier: number
    }
  }
}

interface CustomerCategory {
  id: string
  name: string
  type: "marketer" | "company" | "individual"
  discountPercentage: number
}

interface SelectedBillboard {
  id: string
  name: string
  size: string
  city: string
  price: number
  duration: number
  totalPrice: number
}

interface Booking {
  id: string
  contractNumber: string
  billboards: SelectedBillboard[]
  customerName: string
  customerPhone: string
  customerEmail: string
  customerCompany?: string
  startDate: string
  endDate: string
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  notes?: string
  duration: number
}

interface Invoice {
  id: string
  invoiceNumber: string
  bookingId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  customerCompany?: string
  billboards: SelectedBillboard[]
  subtotal: number
  tax: number
  discount: number
  total: number
  issueDate: string
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue"
  notes?: string
}

interface Contract {
  id: string
  contractNumber: string
  bookingId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  customerCompany?: string
  billboards: SelectedBillboard[]
  startDate: string
  endDate: string
  totalPrice: number
  status: "active" | "expired" | "cancelled"
  createdAt: string
  signedDate?: string
  notes?: string
  terms?: string
}

interface BillboardData {
  id: string
  name: string
  gps: string
  coordinates: { lat: number; lng: number }
  nearestPoint: string
  municipality: string
  city: string
  size: string
  contractNumber: string
  image: string
  gpsLink: string
  customerName?: string
  adType?: string
  price?: string
  status: "available" | "occupied"
  views?: string
  bookings?: number
}

interface Installation {
  id: string
  billboardId: string
  billboardName: string
  contractNumber: string
  customerName: string
  installationDate: string
  installationTeam: string
  status: "scheduled" | "in-progress" | "completed"
  notes?: string
  images: string[]
  cost: number
}

interface PrintingOrder {
  id: string
  contractNumber: string
  billboardId: string
  customerName: string
  adType: string
  size: string
  printingDate: string
  deliveryDate: string
  status: "pending-approval" | "in-production" | "delivered"
  printingCost: number
  designApproved: boolean
  notes?: string
  files: string[]
}

interface MaintenanceRecord {
  id: string
  billboardId: string
  billboardName: string
  maintenanceDate: string
  maintenanceType: string
  technician: string
  status: "scheduled" | "in-progress" | "completed"
  cost: number
  notes?: string
  nextMaintenanceDate?: string
}

const DEFAULT_IMAGE_URL = "https://drive.google.com/uc?export=view&id=13yTnaEWp2tFSxCmg8AuXH1e9QvPNMYWq"

// Generate contract number
const generateContractNumber = () => {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, "0")
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")
  return `C-${year}${month}-${random}`
}

const handlePrintContract = (booking: Booking) => {
  const contractContent = `
    عقد حجز اللوحات الإعلانية
    رقم العقد: ${booking.contractNumber}
    
    بيانات العميل:
    الاسم: ${booking.customerName}
    الهاتف: ${booking.customerPhone}
    البريد الإلكتروني: ${booking.customerEmail}
    ${booking.customerCompany ? `الشركة: ${booking.customerCompany}` : ""}
    
    تفاصيل الحجز:
    تاريخ البداية: ${booking.startDate}
    تاريخ النهاية: ${booking.endDate}
    المدة: ${booking.duration} يوم
    
    اللوحات المحجوزة:
    ${booking.billboards
      .map(
        (billboard) =>
          `- ${billboard.name} (${billboard.size}) - ${billboard.city} - ${billboard.totalPrice.toLocaleString()} د.ل`,
      )
      .join("\n    ")}
    
    المبلغ الإجمالي: ${booking.totalPrice.toLocaleString()} د.ل
    
    ${booking.notes ? `ملاحظات: ${booking.notes}` : ""}
    
    تاريخ إنشاء العقد: ${booking.createdAt}
  `

  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>عقد حجز - ${booking.contractNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; direction: rtl; padding: 20px; }
            h1 { color: #2563eb; text-align: center; }
            .contract-content { white-space: pre-line; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>عقد حجز اللوحات الإعلانية</h1>
          <div class="contract-content">${contractContent}</div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Billboard data for map
  const [billboardData, setBillboardData] = useState<BillboardData[]>([])
  const [isLoadingBillboards, setIsLoadingBillboards] = useState(true)

  // Advanced booking states
  const [selectedBillboards, setSelectedBillboards] = useState<SelectedBillboard[]>([])
  const [billboardSearch, setBillboardSearch] = useState("")
  const [customerSearch, setCustomerSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showCustomerResults, setShowCustomerResults] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerCompany: "",
    startDate: "",
    endDate: "",
    notes: "",
  })
  const [isCreatingBooking, setIsCreatingBooking] = useState(false)

  const [cityFilter, setCityFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [bulkSelectMode, setBulkSelectMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(24)

  const [searchBookings, setSearchBookings] = useState("")
  const [filterBookingStatus, setFilterBookingStatus] = useState("all")

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "mlk",
      email: "admin@billboard.com",
      fullName: "مدير النظام",
      role: "admin",
      createdAt: "2024-01-01",
      lastLogin: "2024-01-15",
      phone: "966501234567",
      department: "الإدارة",
    },
    {
      id: "2",
      username: "user1",
      email: "user1@billboard.com",
      fullName: "محمد أحمد",
      role: "user",
      createdAt: "2024-01-10",
      lastLogin: "2024-01-14",
      phone: "966507654321",
      department: "المبيعات",
    },
  ])
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    phone: "",
    department: "",
    role: "user" as "admin" | "user",
  })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [changePasswordForm, setChangePasswordForm] = useState({ userId: "", newPassword: "", confirmPassword: "" })

  // Customers
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "محمد علي الحولة",
      phone: "+218 91-1234567",
      email: "mohamed.alhawla@example.com",
      company: "شركة جوتن للطلاء",
      address: "شارع الجمهورية، طرابلس",
      totalBookings: 15,
      totalSpent: 125000,
      lastBooking: "2025-01-15",
      notes: "عميل مميز، متعاقد على عدة لوحات",
      category: "company",
      createdAt: "2023-05-15",
      status: "vip",
    },
    {
      id: "2",
      name: "علي عمار",
      phone: "+218 92-7654321",
      email: "ali.ammar@example.com",
      company: "شركة بيلا",
      address: "شارع عمر المختار، بنغازي",
      totalBookings: 12,
      totalSpent: 98000,
      lastBooking: "2025-01-20",
      notes: "عقود طويلة المدى",
      category: "company",
      createdAt: "2023-08-22",
      status: "active",
    },
    {
      id: "3",
      name: "محمد البحباح",
      phone: "+218 94-5555555",
      email: "mohamed.albahbah@example.com",
      company: "شركة هاير للكهرومنزلية",
      address: "شارع طرابلس، مصراته",
      totalBookings: 18,
      totalSpent: 156000,
      lastBooking: "2025-01-05",
      notes: "عميل دائم منذ 2020",
      category: "company",
      createdAt: "2020-03-10",
      status: "vip",
    },
    {
      id: "4",
      name: "أحمد المصباحي",
      phone: "+218 93-9876543",
      email: "ahmed.almesbahi@example.com",
      company: "شركة دتش كولر",
      address: "شارع بنغازي، زليتن",
      totalBookings: 8,
      totalSpent: 67000,
      lastBooking: "2025-01-10",
      notes: "عقود قصيرة المدى",
      category: "company",
      createdAt: "2024-01-18",
      status: "active",
    },
    {
      id: "5",
      name: "إيهاب الحامدي",
      phone: "+218 95-1111111",
      email: "ehab.alhamdi@example.com",
      company: "شركة مشروب الطاقة",
      address: "الطريق الساحلي، الخمس",
      totalBookings: 25,
      totalSpent: 89000,
      lastBooking: "2024-12-28",
      notes: "حملات إعلانية موسمية",
      category: "marketer",
      createdAt: "2022-11-05",
      status: "active",
    },
    {
      id: "6",
      name: "عامر محمد سويد",
      phone: "+218 96-2222222",
      email: "amer.suwaid@example.com",
      company: "شركة لارا سامسنج",
      address: "وسط المدينة، زليتن",
      totalBookings: 6,
      totalSpent: 45000,
      lastBooking: "2024-12-15",
      category: "company",
      createdAt: "2024-06-12",
      status: "active",
    },
    {
      id: "7",
      name: "محمد عبد الله ناصر",
      phone: "+218 97-3333333",
      email: "mohamed.nasser@example.com",
      company: "طلاء المدينة مصراتة",
      address: "شارع الهلال، مصراته",
      totalBookings: 22,
      totalSpent: 178000,
      lastBooking: "2025-01-12",
      notes: "أكبر عملائنا، عقود سنوية",
      category: "company",
      createdAt: "2021-09-30",
      status: "vip",
    },
    {
      id: "8",
      name: "عصام صالح",
      phone: "+218 98-4444444",
      email: "essam.saleh@example.com",
      company: "شركة هومر",
      address: "الطريق الساحلي، الخمس",
      totalBookings: 4,
      totalSpent: 28000,
      lastBooking: "2024-11-20",
      category: "individual",
      createdAt: "2024-10-08",
      status: "active",
    },
  ])

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    address: "",
    notes: "",
    category: "company" as "marketer" | "company" | "individual",
  })
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [customerSearchFilter, setCustomerSearchFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert("يرجى إدخال الاسم ورقم الهاتف على الأقل")
      return
    }

    const customer: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      company: newCustomer.company,
      address: newCustomer.address,
      totalBookings: 0,
      totalSpent: 0,
      lastBooking: "",
      notes: newCustomer.notes,
      category: newCustomer.category,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    }

    setCustomers([...customers, customer])
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      company: "",
      address: "",
      notes: "",
      category: "company",
    })
    setShowAddCustomer(false)
  }

  const handleUpdateCustomer = () => {
    if (!editingCustomer) return

    setCustomers(customers.map((c) => (c.id === editingCustomer.id ? editingCustomer : c)))
    setEditingCustomer(null)
  }

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      setCustomers(customers.filter((c) => c.id !== customerId))
    }
  }

  const getFilteredCustomers = () => {
    return customers.filter((customer) => {
      const matchesSearch =
        customerSearchFilter === "" ||
        customer.name.toLowerCase().includes(customerSearchFilter.toLowerCase()) ||
        customer.phone.includes(customerSearchFilter) ||
        customer.email.toLowerCase().includes(customerSearchFilter.toLowerCase()) ||
        (customer.company && customer.company.toLowerCase().includes(customerSearchFilter.toLowerCase()))

      const matchesCategory = categoryFilter === "all" || customer.category === categoryFilter
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }

  // Pricing rules
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([
    { id: "1", size: "13×5", basePrice: 3000, city: "طرابلس", multiplier: 1.2 },
    { id: "2", size: "12×4", basePrice: 2500, city: "طرابلس", multiplier: 1.0 },
    { id: "3", size: "10×4", basePrice: 2000, city: "طرابلس", multiplier: 0.9 },
    { id: "4", size: "8×3", basePrice: 1500, city: "طرابلس", multiplier: 0.8 },
    { id: "5", size: "13×5", basePrice: 2500, city: "بنغازي", multiplier: 1.0 },
    { id: "6", size: "12×4", basePrice: 2000, city: "بنغازي", multiplier: 0.9 },
    { id: "7", size: "13×5", basePrice: 1800, city: "مصراته", multiplier: 0.8 },
    { id: "8", size: "12×4", basePrice: 1500, city: "مصراته", multiplier: 0.7 },
  ])

  const [priceLevels, setPriceLevels] = useState<PriceLevel[]>([
    {
      id: "level-a",
      name: "المستوى أ - مواقع مميزة",
      level: "A",
      sizes: {
        "13×5": { marketers: 4500, companies: 4000, individuals: 3500 },
        "12×4": { marketers: 3800, companies: 3300, individuals: 2800 },
        "10×4": { marketers: 3200, companies: 2700, individuals: 2200 },
        "8×3": { marketers: 2500, companies: 2000, individuals: 1500 },
        "6×3": { marketers: 2000, companies: 1500, individuals: 1000 },
        "4×3": { marketers: 1500, companies: 1000, individuals: 800 },
      },
      cities: {
        طرابلس: { multiplier: 1.2 },
        بنغازي: { multiplier: 1.0 },
        مصراته: { multiplier: 0.9 },
        زليتن: { multiplier: 0.8 },
        الخمس: { multiplier: 0.7 },
        الزاوية: { multiplier: 0.8 },
        صبراته: { multiplier: 0.7 },
      },
    },
    {
      id: "level-b",
      name: "المستوى ب - مواقع عادية",
      level: "B",
      sizes: {
        "13×5": { marketers: 3500, companies: 3000, individuals: 2500 },
        "12×4": { marketers: 2800, companies: 2300, individuals: 1800 },
        "10×4": { marketers: 2200, companies: 1700, individuals: 1200 },
        "8×3": { marketers: 1800, companies: 1300, individuals: 1000 },
        "6×3": { marketers: 1500, companies: 1000, individuals: 700 },
        "4×3": { marketers: 1200, companies: 800, individuals: 500 },
      },
      cities: {
        طرابلس: { multiplier: 1.2 },
        بنغازي: { multiplier: 1.0 },
        مصراته: { multiplier: 0.9 },
        زليتن: { multiplier: 0.8 },
        الخمس: { multiplier: 0.7 },
        الزاوية: { multiplier: 0.8 },
        صبراته: { multiplier: 0.7 },
      },
    },
  ])

  const [customerCategories, setCustomerCategories] = useState<CustomerCategory[]>([
    { id: "1", name: "مسوقين", type: "marketer", discountPercentage: 15 },
    { id: "2", name: "شركات", type: "company", discountPercentage: 10 },
    { id: "3", name: "أفراد", type: "individual", discountPercentage: 0 },
  ])

  const [editingPrice, setEditingPrice] = useState<{
    levelId: string
    size: string
    category: string
    value: number
  } | null>(null)

  const [editingMultiplier, setEditingMultiplier] = useState<{
    levelId: string
    city: string
    value: number
  } | null>(null)

  const getPrice = (
    size: string,
    city: string,
    customerType: "marketer" | "company" | "individual",
    level: "A" | "B" = "A",
  ) => {
    const priceLevel = priceLevels.find((p) => p.level === level)
    if (!priceLevel) return 2000

    const sizePrice = priceLevel.sizes[size]?.[customerType] || 2000
    const cityMultiplier = priceLevel.cities[city]?.multiplier || 1.0

    return Math.round(sizePrice * cityMultiplier)
  }

  const updatePrice = (levelId: string, size: string, category: string, newPrice: number) => {
    setPriceLevels((prev) =>
      prev.map((level) => {
        if (level.id === levelId) {
          return {
            ...level,
            sizes: {
              ...level.sizes,
              [size]: {
                ...level.sizes[size],
                [category]: newPrice,
              },
            },
          }
        }
        return level
      }),
    )
  }

  const updateCityMultiplier = (levelId: string, city: string, newMultiplier: number) => {
    setPriceLevels((prev) =>
      prev.map((level) => {
        if (level.id === levelId) {
          return {
            ...level,
            cities: {
              ...level.cities,
              [city]: { multiplier: newMultiplier },
            },
          }
        }
        return level
      }),
    )
  }

  // Bookings
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      contractNumber: "C-202501-0001",
      billboards: [
        {
          id: "TR-TC0017",
          name: "وسط جسر القبة الفلكية",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
        {
          id: "TR-TC0019",
          name: "مقابل ميناء الشعاب",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
      ],
      customerName: "محمد علي الحولة",
      customerPhone: "+218 91-1234567",
      customerEmail: "mohamed.alhawla@example.com",
      customerCompany: "شركة جوتن للطلاء",
      startDate: "2025-01-01",
      endDate: "2025-12-27",
      totalPrice: 86400,
      status: "confirmed",
      createdAt: "2024-12-15",
      notes: "عقد سنوي للحملة الإعلانية الرئيسية",
      duration: 360,
    },
    {
      id: "2",
      contractNumber: "C-202501-0002",
      billboards: [
        {
          id: "TR-BS0030",
          name: "جزيرة باب العزيزية امام المسجد الجديد",
          size: "13×5",
          city: "طرابلس",
          price: 3800,
          duration: 360,
          totalPrice: 45600,
        },
        {
          id: "TR-BS0032",
          name: "طريق مسجد القدس مدخل 77",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
        {
          id: "TR-HA0075",
          name: "الطريق السريع جزيرة غوط الشعال",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
      ],
      customerName: "علي عمار",
      customerPhone: "+218 92-7654321",
      customerEmail: "ali.ammar@example.com",
      customerCompany: "شركة بيلا",
      startDate: "2025-05-24",
      endDate: "2026-05-19",
      totalPrice: 132000,
      status: "confirmed",
      createdAt: "2025-01-10",
      notes: "حملة إعلانية كبيرة لمنتجات بيلا",
      duration: 360,
    },
    {
      id: "3",
      contractNumber: "C-202501-0003",
      billboards: [
        {
          id: "TR-HA0071",
          name: "غوط الشعال بجوار جسر محطة العمال",
          size: "13×5",
          city: "طرابلس",
          price: 3500,
          duration: 360,
          totalPrice: 42000,
        },
        {
          id: "TR-HA0066",
          name: "بجوار جسر مشاة مخبز النعمة",
          size: "12×4",
          city: "طرابلس",
          price: 2800,
          duration: 360,
          totalPrice: 33600,
        },
      ],
      customerName: "محمد البحباح",
      customerPhone: "+218 94-5555555",
      customerEmail: "mohamed.albahbah@example.com",
      customerCompany: "شركة هاير للكهرومنزلية",
      startDate: "2025-02-01",
      endDate: "2026-01-27",
      totalPrice: 75600,
      status: "confirmed",
      createdAt: "2025-01-15",
      notes: "حملة هاير للأجهزة المنزلية",
      duration: 360,
    },
    {
      id: "4",
      contractNumber: "C-202501-0004",
      billboards: [
        {
          id: "TR-SJ0006",
          name: "بجوار كوبري عرادة",
          size: "12×4",
          city: "طرابلس",
          price: 2900,
          duration: 180,
          totalPrice: 26100,
        },
        {
          id: "TR-SJ0013",
          name: "الإشارة الضوئية الترسانة مقابل النادي البحري",
          size: "10×4",
          city: "طرابلس",
          price: 2400,
          duration: 180,
          totalPrice: 21600,
        },
      ],
      customerName: "أحمد المصباحي",
      customerPhone: "+218 93-9876543",
      customerEmail: "ahmed.almesbahi@example.com",
      customerCompany: "شركة دتش كولر",
      startDate: "2025-07-19",
      endDate: "2026-01-15",
      totalPrice: 47700,
      status: "pending",
      createdAt: "2025-01-18",
      notes: "في انتظار تأكيد الدفع",
      duration: 180,
    },
    {
      id: "5",
      contractNumber: "C-202501-0005",
      billboards: [
        {
          id: "ZL-ZL0139",
          name: "وسط كوبري المدينة جهة الشمال",
          size: "13×5",
          city: "زليتن",
          price: 3200,
          duration: 360,
          totalPrice: 38400,
        },
        {
          id: "ZL-ZL0445",
          name: "امام الحامية مقابل محلات قطع غيار السيارات",
          size: "8×3",
          city: "زليتن",
          price: 1800,
          duration: 360,
          totalPrice: 21600,
        },
      ],
      customerName: "إيهاب الحامدي",
      customerPhone: "+218 95-1111111",
      customerEmail: "ehab.alhamdi@example.com",
      customerCompany: "شركة مشروب الطاقة",
      startDate: "2024-10-15",
      endDate: "2025-10-10",
      totalPrice: 60000,
      status: "confirmed",
      createdAt: "2024-09-20",
      notes: "حملة مشروب الطاقة في زليتن",
      duration: 360,
    },
    {
      id: "6",
      contractNumber: "C-202501-0006",
      billboards: [
        {
          id: "TR-SJ0160",
          name: "بجوار سياج مطار معيثيقة امام صالة الطائرات",
          size: "8×3",
          city: "طرابلس",
          price: 2200,
          duration: 360,
          totalPrice: 26400,
        },
        {
          id: "TR-SJ0162",
          name: "بجوار جزيرة معيتيقة جهة الأبراج",
          size: "8×3",
          city: "طرابلس",
          price: 2200,
          duration: 360,
          totalPrice: 26400,
        },
      ],
      customerName: "عامر محمد سويد",
      customerPhone: "+218 96-2222222",
      customerEmail: "amer.suwaid@example.com",
      customerCompany: "شركة لارا سامسنج",
      startDate: "2025-08-05",
      endDate: "2026-07-31",
      totalPrice: 52800,
      status: "confirmed",
      createdAt: "2025-01-20",
      notes: "حملة السهل للاتصالات",
      duration: 360,
    },
  ])

  // Invoices
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-2025-001",
      bookingId: "1",
      customerName: "محمد علي الحولة",
      customerPhone: "+218 91-1234567",
      customerEmail: "mohamed.alhawla@example.com",
      customerCompany: "شركة جوتن للطلاء",
      billboards: [
        {
          id: "TR-TC0017",
          name: "وسط جسر القبة الفلكية",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
        {
          id: "TR-TC0019",
          name: "مقابل ميناء الشعاب",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
      ],
      subtotal: 86400,
      tax: 11232,
      discount: 4320,
      total: 93312,
      issueDate: "2025-01-01",
      dueDate: "2025-01-31",
      status: "paid",
      notes: "تم الدفع بالكامل - الدفعة الأولى من العقد السنوي",
    },
    {
      id: "2",
      invoiceNumber: "INV-2025-002",
      bookingId: "2",
      customerName: "علي عمار",
      customerPhone: "+218 92-7654321",
      customerEmail: "ali.ammar@example.com",
      customerCompany: "شركة بيلا",
      billboards: [
        {
          id: "TR-BS0030",
          name: "جزيرة باب العزيزية امام المسجد الجديد",
          size: "13×5",
          city: "طرابلس",
          price: 3800,
          duration: 90,
          totalPrice: 11400,
        },
        {
          id: "TR-BS0032",
          name: "طريق مسجد القدس مدخل 77",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 90,
          totalPrice: 10800,
        },
      ],
      subtotal: 22200,
      tax: 2886,
      discount: 0,
      total: 25086,
      issueDate: "2025-01-15",
      dueDate: "2025-02-15",
      status: "sent",
      notes: "الدفعة الأولى - ربع سنوية",
    },
    {
      id: "3",
      invoiceNumber: "INV-2025-003",
      bookingId: "3",
      customerName: "محمد البحباح",
      customerPhone: "+218 94-5555555",
      customerEmail: "mohamed.albahbah@example.com",
      customerCompany: "شركة هاير للكهرومنزلية",
      billboards: [
        {
          id: "TR-HA0071",
          name: "غوط الشعال بجوار جسر محطة العمال",
          size: "13×5",
          city: "طرابلس",
          price: 3500,
          duration: 30,
          totalPrice: 3500,
        },
      ],
      subtotal: 3500,
      tax: 455,
      discount: 175,
      total: 3780,
      issueDate: "2025-02-01",
      dueDate: "2025-03-01",
      status: "paid",
      notes: "دفعة شهرية - فبراير 2025",
    },
    {
      id: "4",
      invoiceNumber: "INV-2025-004",
      bookingId: "4",
      customerName: "أحمد المصباحي",
      customerPhone: "+218 93-9876543",
      customerEmail: "ahmed.almesbahi@example.com",
      customerCompany: "شركة دتش كولر",
      billboards: [
        {
          id: "TR-SJ0006",
          name: "بجوار كوبري عرادة",
          size: "12×4",
          city: "طرابلس",
          price: 2900,
          duration: 180,
          totalPrice: 26100,
        },
      ],
      subtotal: 26100,
      tax: 3393,
      discount: 0,
      total: 29493,
      issueDate: "2025-01-20",
      dueDate: "2025-02-20",
      status: "overdue",
      notes: "متأخر في السداد - يرجى المتابعة",
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-089",
      bookingId: "5",
      customerName: "إيهاب الحامدي",
      customerPhone: "+218 95-1111111",
      customerEmail: "ehab.alhamdi@example.com",
      customerCompany: "شركة مشروب الطاقة",
      billboards: [
        {
          id: "ZL-ZL0139",
          name: "وسط كوبري المدينة جهة الشمال",
          size: "13×5",
          city: "زليتن",
          price: 3200,
          duration: 360,
          totalPrice: 38400,
        },
      ],
      subtotal: 38400,
      tax: 4992,
      discount: 1920,
      total: 41472,
      issueDate: "2024-10-15",
      dueDate: "2024-11-15",
      status: "paid",
      notes: "تم السداد بالكامل - عقد مشروب الطاقة",
    },
  ])

  // Contracts
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      contractNumber: "C-202501-0001",
      bookingId: "1",
      customerName: "محمد علي الحولة",
      customerPhone: "+218 91-1234567",
      customerEmail: "mohamed.alhawla@example.com",
      customerCompany: "شركة جوتن للطلاء",
      billboards: [
        {
          id: "TR-TC0017",
          name: "وسط جسر القبة الفلكية",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
        {
          id: "TR-TC0019",
          name: "مقابل ميناء الشعاب",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
      ],
      startDate: "2025-01-01",
      endDate: "2025-12-27",
      totalPrice: 86400,
      status: "active",
      createdAt: "2024-12-15",
      signedDate: "2024-12-20",
      notes: "عقد سنوي للحملة الإعلانية الرئيسية لجوتن",
      terms:
        "يلتزم العميل بدفع المبلغ المتفق عليه على دفعات شهرية. لا يحق للعميل إلغاء العقد قبل انتهاء المدة المحددة إلا بموافقة خطية من الشركة وبدفع غرامة 25% من قيمة العقد المتبقية.",
    },
    {
      id: "2",
      contractNumber: "C-202501-0002",
      bookingId: "2",
      customerName: "علي عمار",
      customerPhone: "+218 92-7654321",
      customerEmail: "ali.ammar@example.com",
      customerCompany: "شركة بيلا",
      billboards: [
        {
          id: "TR-BS0030",
          name: "جزيرة باب العزيزية امام المسجد الجديد",
          size: "13×5",
          city: "طرابلس",
          price: 3800,
          duration: 360,
          totalPrice: 45600,
        },
        {
          id: "TR-BS0032",
          name: "طريق مسجد القدس مدخل 77",
          size: "13×5",
          city: "طرابلس",
          price: 3600,
          duration: 360,
          totalPrice: 43200,
        },
      ],
      startDate: "2025-05-24",
      endDate: "2026-05-19",
      totalPrice: 88800,
      status: "active",
      createdAt: "2025-01-10",
      signedDate: "2025-01-15",
      notes: "حملة إعلانية كبيرة لمنتجات بيلا",
      terms: "يلتزم العميل بدفع المبلغ المتفق عليه على دفعات ربع سنوية. يحق للشركة زيادة الأسعار بنسبة 5% سنوياً.",
    },
    {
      id: "3",
      contractNumber: "C-202501-0003",
      bookingId: "3",
      customerName: "محمد البحباح",
      customerPhone: "+218 94-5555555",
      customerEmail: "mohamed.albahbah@example.com",
      customerCompany: "شركة هاير للكهرومنزلية",
      billboards: [
        {
          id: "TR-HA0071",
          name: "غوط الشعال بجوار جسر محطة العمال",
          size: "13×5",
          city: "طرابلس",
          price: 3500,
          duration: 360,
          totalPrice: 42000,
        },
      ],
      startDate: "2025-02-01",
      endDate: "2026-01-27",
      totalPrice: 42000,
      status: "active",
      createdAt: "2025-01-15",
      signedDate: "2025-01-20",
      notes: "حملة هاير للأجهزة المنزلية",
      terms: "دفع مقدم 50% والباقي على أقساط شهرية. يتحمل العميل تكاليف الصيانة والتنظيف.",
    },
    {
      id: "4",
      contractNumber: "C-202412-0015",
      bookingId: "4",
      customerName: "أحمد المصباحي",
      customerPhone: "+218 93-9876543",
      customerEmail: "ahmed.almesbahi@example.com",
      customerCompany: "شركة دتش كولر",
      billboards: [
        {
          id: "TR-SJ0006",
          name: "بجوار كوبري عرادة",
          size: "12×4",
          city: "طرابلس",
          price: 2900,
          duration: 180,
          totalPrice: 26100,
        },
      ],
      startDate: "2024-12-19",
      endDate: "2025-06-17",
      totalPrice: 26100,
      status: "expired",
      createdAt: "2024-12-01",
      signedDate: "2024-12-05",
      notes: "عقد منتهي، تم التجديد لفترة أخرى",
      terms: "عقد قصير المدى، دفع مقدم كامل. يحق للعميل التجديد بنفس الشروط.",
    },
    {
      id: "5",
      contractNumber: "C-202501-0007",
      bookingId: "5",
      customerName: "محمد عبد الله ناصر",
      customerPhone: "+218 97-3333333",
      customerEmail: "mohamed.nasser@example.com",
      customerCompany: "طلاء المدينة مصراتة",
      billboards: [
        {
          id: "TR-SJ0009",
          name: "بجوار سياج مطار معيثيقة جهة صالة الطائرات",
          size: "10×4",
          city: "طرابلس",
          price: 2800,
          duration: 360,
          totalPrice: 33600,
        },
        {
          id: "TR-TC0027",
          name: "امام المنتزه العائلي",
          size: "10×4",
          city: "طرابلس",
          price: 2800,
          duration: 360,
          totalPrice: 33600,
        },
        {
          id: "TR-TG0127",
          name: "بعد بوابة غوط الرمان ب200 م باتجاه الغرب",
          size: "12×4",
          city: "طرابلس",
          price: 3200,
          duration: 360,
          totalPrice: 38400,
        },
      ],
      startDate: "2025-07-20",
      endDate: "2026-07-15",
      totalPrice: 105600,
      status: "active",
      createdAt: "2025-01-12",
      signedDate: "2025-01-18",
      notes: "أكبر حملة إعلانية لطلاء المدينة",
      terms: "عقد حصري لمدة سنة كاملة. يشمل الصيانة والتنظيف الشهري. دفع على أربع دفعات ربع سنوية.",
    },
  ])

  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [showContractPreview, setShowContractPreview] = useState(false)

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showInvoicePreview, setShowInvoicePreview] = useState(false)

  // Check login status
  const [installations, setInstallations] = useState([
    {
      id: "1",
      billboardId: "TR-TC0017",
      billboardName: "وسط جسر القبة الفلكية",
      contractNumber: "C-202501-0001",
      customerName: "محمد علي الحولة",
      installationDate: "2024-12-25",
      installationTeam: "فريق التركيب الأول",
      status: "completed",
      notes: "تم التركيب بنجاح، جودة عالية",
      images: ["installation1.jpg", "installation2.jpg"],
      cost: 1200,
    },
    {
      id: "2",
      billboardId: "TR-BS0030",
      billboardName: "جزيرة باب العزيزية امام المسجد الجديد",
      contractNumber: "C-202501-0002",
      customerName: "علي عمار",
      installationDate: "2025-05-20",
      installationTeam: "فريق التركيب الثاني",
      status: "scheduled",
      notes: "مجدول للتركيب الأسبوع القادم",
      images: [],
      cost: 1500,
    },
    {
      id: "3",
      billboardId: "TR-HA0071",
      billboardName: "غوط الشعال بجوار جسر محطة العمال",
      contractNumber: "C-202501-0003",
      customerName: "محمد البحباح",
      installationDate: "2025-01-28",
      installationTeam: "فريق التركيب الأول",
      status: "in-progress",
      notes: "جاري التركيب، متوقع الانتهاء غداً",
      images: ["progress1.jpg"],
      cost: 1300,
    },
  ])

  // Printing/production tracking
  const [printingOrders, setPrintingOrders] = useState([
    {
      id: "1",
      contractNumber: "C-202501-0001",
      billboardId: "TR-TC0017",
      customerName: "محمد علي الحولة",
      adType: "جوتن للطلاء",
      size: "13×5",
      printingDate: "2024-12-20",
      deliveryDate: "2024-12-23",
      status: "delivered",
      printingCost: 2800,
      designApproved: true,
      notes: "تصميم معتمد، طباعة عالية الجودة",
      files: ["design_final.pdf", "print_proof.jpg"],
    },
    {
      id: "2",
      contractNumber: "C-202501-0002",
      billboardId: "TR-BS0030",
      customerName: "علي عمار",
      adType: "بيلا",
      size: "13×5",
      printingDate: "2025-05-15",
      deliveryDate: "2025-05-18",
      status: "in-production",
      printingCost: 3200,
      designApproved: true,
      notes: "جاري الطباعة، متوقع التسليم خلال 3 أيام",
      files: ["design_approved.pdf"],
    },
    {
      id: "3",
      contractNumber: "C-202501-0003",
      billboardId: "TR-HA0071",
      customerName: "محمد البحباح",
      adType: "هاير",
      size: "13×5",
      printingDate: "2025-01-25",
      deliveryDate: "2025-01-28",
      status: "pending-approval",
      printingCost: 2900,
      designApproved: false,
      notes: "في انتظار موافقة العميل على التصميم النهائي",
      files: ["design_draft_v2.pdf"],
    },
  ])

  // Maintenance and inspection records
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: "1",
      billboardId: "TR-TC0017",
      billboardName: "وسط جسر القبة الفلكية",
      maintenanceDate: "2025-01-10",
      maintenanceType: "تنظيف دوري",
      technician: "أحمد محمد",
      status: "completed",
      cost: 150,
      notes: "تنظيف شامل، حالة ممتازة",
      nextMaintenanceDate: "2025-02-10",
    },
    {
      id: "2",
      billboardId: "TR-BS0030",
      billboardName: "جزيرة باب العزيزية امام المسجد الجديد",
      maintenanceDate: "2025-01-15",
      maintenanceType: "إصلاح إضاءة",
      technician: "سالم علي",
      status: "completed",
      cost: 300,
      notes: "تم إصلاح الإضاءة الليلية",
      nextMaintenanceDate: "2025-04-15",
    },
    {
      id: "3",
      billboardId: "TR-HA0071",
      billboardName: "غوط الشعال بجوار جسر محطة العمال",
      maintenanceDate: "2025-01-20",
      maintenanceType: "فحص دوري",
      technician: "محمد سالم",
      status: "scheduled",
      cost: 100,
      notes: "فحص دوري مجدول",
      nextMaintenanceDate: "2025-04-20",
    },
  ])

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    const sessionExpiry = localStorage.getItem("adminExpiry")
    const currentUserData = localStorage.getItem("currentUser")

    if (adminSession === "active" && sessionExpiry && currentUserData) {
      const expiryTime = Number.parseInt(sessionExpiry)
      const currentTime = Date.now()

      if (currentTime < expiryTime) {
        setIsLoggedIn(true)
        setCurrentUser(JSON.parse(currentUserData))
      } else {
        localStorage.removeItem("adminSession")
        localStorage.removeItem("adminExpiry")
        localStorage.removeItem("currentUser")
      }
    }
  }, [])

  // Load billboard data
  useEffect(() => {
    if (isLoggedIn) {
      const loadBillboardData = async () => {
        try {
          setIsLoadingBillboards(true)
          const response = await fetch("/billboards.xlsx")

          if (!response.ok) {
            throw new Error("Excel file not found")
          }

          const arrayBuffer = await response.arrayBuffer()
          const data = new Uint8Array(arrayBuffer)
          const workbook = XLSX.read(data, { type: "array" })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

          const processedData: BillboardData[] = []

          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[]
            if (!row || row.length === 0) continue

            const contractNumber = row[15]
            let imageUrl = ""

            if (row[25] && typeof row[25] === "string" && row[25].trim() !== "" && row[25] !== "#N/A") {
              imageUrl = row[25].toString().trim()
            }

            const gpsCoordinates = row[2] || ""
            const isAvailable =
              !contractNumber ||
              contractNumber === "" ||
              contractNumber === "#N/A" ||
              contractNumber === "########" ||
              contractNumber === null ||
              contractNumber === undefined ||
              String(contractNumber).trim() === ""

            let gpsLat = 32.901753
            let gpsLng = 13.217222

            if (gpsCoordinates && typeof gpsCoordinates === "string") {
              const coords = gpsCoordinates.split(",")
              if (coords.length === 2) {
                gpsLat = Number.parseFloat(coords[0].trim()) || 32.901753
                gpsLng = Number.parseFloat(coords[1].trim()) || 13.217222
              }
            }

            let finalImageUrl = ""
            if (imageUrl && imageUrl.startsWith("http")) {
              finalImageUrl = imageUrl
            }
            if (!finalImageUrl) {
              finalImageUrl = DEFAULT_IMAGE_URL
            }

            const customerName = row[17] || ""
            const adType = row[16] || ""
            const price = row[19] || ""

            const billboard: BillboardData = {
              id: row[0] || `billboard-${i}`,
              name: row[1] || `لوحة-${i}`,
              gps: `${gpsLat},${gpsLng}`,
              coordinates: { lat: gpsLat, lng: gpsLng },
              nearestPoint: row[3] || "موقع غير محدد",
              municipality: row[5] || row[4] || "غير محدد",
              city: row[6] || "غير محدد",
              size: row[11] || row[12] || row[13] || "13×5",
              contractNumber: contractNumber || "",
              image: finalImageUrl,
              gpsLink: `https://www.google.com/maps?q=${gpsLat},${gpsLng}`,
              customerName: customerName,
              adType: adType,
              price: price,
              status: isAvailable ? "available" : "occupied",
              views: `${Math.floor(Math.random() * 5000) + 1000}`,
              bookings: Math.floor(Math.random() * 20) + 1,
            }
            processedData.push(billboard)
          }

          setBillboardData(processedData)
        } catch (error) {
          console.log("تعذر تحميل ملف Excel، سيتم استخدام البيانات التجريبية:", error)

          const fallbackData: BillboardData[] = [
            {
              id: "TR-TC0001",
              name: "لوحة شارع الجمهورية الرئيسي",
              gps: "32.8872,13.1913",
              coordinates: { lat: 32.8872, lng: 13.1913 },
              nearestPoint: "تقاطع شارع الجمهورية مع شارع عمر المختار",
              municipality: "طرابلس المركز",
              city: "طرابلس",
              size: "13×5",
              contractNumber: "",
              image: DEFAULT_IMAGE_URL,
              gpsLink: "https://www.google.com/maps?q=32.8872,13.1913",
              customerName: "",
              adType: "",
              price: "2500",
              status: "available",
              views: "4200",
              bookings: 8,
            },
            {
              id: "TR-TC0002",
              name: "لوحة طريق المطار",
              gps: "32.6639,13.1581",
              coordinates: { lat: 32.6639, lng: 13.1581 },
              nearestPoint: "مدخل مطار طرابلس الدولي",
              municipality: "طرابلس",
              city: "طرابلس",
              size: "10×4",
              contractNumber: "C-2024-001",
              image: DEFAULT_IMAGE_URL,
              gpsLink: "https://www.google.com/maps?q=32.6639,13.1581",
              customerName: "شركة الاتصالات الليبية",
              adType: "إعلان تجاري",
              price: "3500",
              status: "occupied",
              views: "6800",
              bookings: 15,
            },
          ]
          setBillboardData(fallbackData)
        } finally {
          setIsLoadingBillboards(false)
        }
      }

      loadBillboardData()
    }
  }, [isLoggedIn])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const user = users.find((u) => u.username === loginForm.username)
    if (user && loginForm.password === "12345678") {
      setIsLoggedIn(true)
      setCurrentUser(user)
      setLoginError("")
      setLoginForm({ username: "", password: "" })

      const expiryTime = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem("adminSession", "active")
      localStorage.setItem("adminExpiry", expiryTime.toString())
      localStorage.setItem("currentUser", JSON.stringify(user))

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, lastLogin: new Date().toISOString().split("T")[0] } : u)),
      )
    } else {
      setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة")
      setLoginForm({ ...loginForm, password: "" })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    localStorage.removeItem("adminSession")
    localStorage.removeItem("adminExpiry")
    localStorage.removeItem("currentUser")
  }

  // Calculate stats
  const totalRevenue = bookings.filter((b) => b.status === "confirmed").reduce((sum, b) => sum + b.totalPrice, 0)
  const pendingBookings = bookings.filter((b) => b.status === "pending").length
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const availableBillboardsCount = billboardData.filter((b) => b.status === "available").length
  const occupiedBillboardsCount = billboardData.filter((b) => b.status === "occupied").length
  const activeContracts = contracts.filter((c) => c.status === "active").length
  const expiredContracts = contracts.filter((c) => c.status === "expired").length
  const paidInvoices = invoices.filter((i) => i.status === "paid").length
  const pendingInvoices = invoices.filter((i) => i.status === "sent").length

  const recentActivities = [
    {
      id: 1,
      type: "booking",
      message: "حجز جديد من شركة النور للإعلان - لوحة رقم B001",
      time: "منذ 5 دقائق",
      icon: Calendar,
      color: "text-yellow-600",
    },
    {
      id: 2,
      type: "payment",
      message: "تم دفع فاتورة INV-2024-002 بقيمة 2,500 د.ل",
      time: "منذ 15 دقيقة",
      icon: DollarSign,
      color: "text-yellow-500",
    },
    {
      id: 3,
      type: "contract",
      message: "عقد جديد C-202401-0003 مع شركة الأطلس التجارية",
      time: "منذ ساعة",
      icon: FileText,
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "customer",
      message: "عميل جديد: شركة المتوسط للتسويق",
      time: "منذ ساعتين",
      icon: Users,
      color: "text-yellow-500",
    },
    {
      id: 5,
      type: "installation",
      message: "تم تركيب لوحة B045 في طرابلس بنجاح",
      time: "منذ 3 ساعات",
      icon: Wrench,
      color: "text-yellow-600",
    },
    {
      id: 6,
      type: "maintenance",
      message: "صيانة دورية للوحة B023 في مصراتة",
      time: "منذ 4 ساعات",
      icon: Settings,
      color: "text-yellow-500",
    },
  ]

  const topCustomers = [
    {
      id: 1,
      name: "شركة النور للإعلان",
      company: "النور للإعلان والتسويق",
      bookings: 12,
      revenue: 45000,
      avatar: "ن",
      status: "VIP",
    },
    {
      id: 2,
      name: "أحمد محمد الزروق",
      company: "الأطلس التجارية",
      bookings: 8,
      revenue: 28500,
      avatar: "أ",
      status: "Premium",
    },
    {
      id: 3,
      name: "فاطمة سالم",
      company: "المتوسط للتسويق",
      bookings: 6,
      revenue: 22000,
      avatar: "ف",
      status: "Regular",
    },
    {
      id: 4,
      name: "محمد علي الشريف",
      company: "الشروق للدعاية",
      bookings: 5,
      revenue: 18500,
      avatar: "م",
      status: "Regular",
    },
    {
      id: 5,
      name: "سارة أحمد",
      company: "النجمة الذهبية",
      bookings: 4,
      revenue: 15000,
      avatar: "س",
      status: "New",
    },
  ]

  // Monthly revenue data (mock)
  const monthlyRevenue = [
    { month: "يناير", revenue: 15000, bookings: 8 },
    { month: "فبراير", revenue: 18000, bookings: 12 },
    { month: "مارس", revenue: 22000, bookings: 15 },
    { month: "أبريل", revenue: 19000, bookings: 11 },
    { month: "مايو", revenue: 25000, bookings: 18 },
    { month: "يونيو", revenue: 28000, bookings: 20 },
  ]

  const sidebarItems = [
    // Dashboard Section
    { id: "dashboard", label: "الرئيسية", icon: Home, section: "dashboard" },

    // Billboards Management Section
    { id: "billboards", label: "إدارة اللوحات", icon: Monitor, section: "billboards" },
    { id: "map", label: "الخريطة", icon: MapPin, section: "billboards" },

    // Clients Section
    { id: "customers", label: "العملاء", icon: Users, section: "clients" },
    { id: "client-accounts", label: "حسابات العملاء", icon: CreditCard, section: "clients" },

    // Prices Section
    { id: "pricing", label: "الأسعار", icon: BarChart3, section: "pricing" },

    // Contracts & Invoices Section
    { id: "contracts", label: "العقود", icon: FileText, section: "contracts" },
    { id: "invoices", label: "الفواتير", icon: DollarSign, section: "contracts" },

    // Installation & Printing Section
    { id: "installation-teams", label: "فرق التركيب", icon: Wrench, section: "installation" },
    { id: "printing-houses", label: "المطابع", icon: Printer, section: "installation" },

    // Tasks Section
    { id: "installation-tasks", label: "مهام التركيب", icon: CheckSquare, section: "tasks" },
    { id: "printing-tasks", label: "مهام الطباعة", icon: FileImage, section: "tasks" },

    // Bookings Section
    { id: "advanced-booking", label: "حجز جديد", icon: Plus, section: "bookings" },
    { id: "bookings", label: "الحجوزات", icon: Calendar, section: "bookings" },

    // Reports Section
    { id: "reports", label: "التقارير", icon: BarChart, section: "reports" },

    // Settings Section
    { id: "users", label: "المستخدمين", icon: Settings, section: "settings" },
  ]

  const sectionHeaders = {
    dashboard: "لوحة التحكم",
    billboards: "إدارة اللوحات",
    clients: "العملاء",
    pricing: "التسعير",
    contracts: "العقود والفواتير",
    installation: "التركيب والطباعة",
    tasks: "المهام",
    bookings: "الحجوزات",
    reports: "التقارير",
    settings: "الإعدادات",
  }

  const getUniqueCities = () => {
    const cities = billboardData.map((b) => b.city).filter(Boolean)
    return [...new Set(cities)].sort()
  }

  const getUniqueSizes = () => {
    const sizes = billboardData.map((b) => b.size).filter(Boolean)
    return [...new Set(sizes)].sort()
  }

  const getFilteredAndSortedBillboards = () => {
    const filtered = billboardData.filter((billboard) => {
      const matchesSearch =
        billboardSearch === "" ||
        billboard.name.toLowerCase().includes(billboardSearch.toLowerCase()) ||
        billboard.id.toLowerCase().includes(billboardSearch.toLowerCase()) ||
        billboard.city.toLowerCase().includes(billboardSearch.toLowerCase()) ||
        billboard.nearestPoint.toLowerCase().includes(billboardSearch.toLowerCase())

      const matchesCity = cityFilter === "all" || billboard.city === cityFilter
      const matchesSize = sizeFilter === "all" || billboard.size === sizeFilter
      const isAvailable = billboard.status === "available"

      return matchesSearch && matchesCity && matchesSize && isAvailable
    })

    // Sort billboards
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "city":
          return a.city.localeCompare(b.city)
        case "size":
          return a.size.localeCompare(b.size)
        case "price":
          const priceA = Number.parseInt(a.price || "0")
          const priceB = Number.parseInt(b.price || "0")
          return priceA - priceB
        default:
          return 0
      }
    })

    return filtered
  }

  const handleBulkSelect = (billboards: BillboardData[]) => {
    if (!bookingForm.startDate || !bookingForm.endDate) {
      alert("يرجى تحديد تاريخ البداية والنهاية أولاً")
      return
    }

    const startDate = new Date(bookingForm.startDate)
    const endDate = new Date(bookingForm.endDate)
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    if (duration <= 0) {
      alert("تاريخ النهاية يجب أن يكون بعد تاريخ البداية")
      return
    }

    const newSelections: SelectedBillboard[] = []

    for (const billboard of billboards) {
      if (selectedBillboards.length + newSelections.length >= 50) {
        alert("لا يمكن تحديد أكثر من 50 لوحة في الحجز الواحد")
        break
      }

      if (!selectedBillboards.find((b) => b.id === billboard.id)) {
        const rule = pricingRules.find((r) => r.size === billboard.size && r.city === billboard.city)
        const monthlyPrice = rule ? rule.basePrice * rule.multiplier : 2000
        const totalPrice = Math.round((monthlyPrice * duration) / 30)

        newSelections.push({
          id: billboard.id,
          name: billboard.name,
          size: billboard.size,
          city: billboard.city,
          price: Math.round(totalPrice / duration),
          duration: duration,
          totalPrice: totalPrice,
        })
      }
    }

    setSelectedBillboards([...selectedBillboards, ...newSelections])
  }

  const handleSingleSelect = (billboard: BillboardData) => {
    if (selectedBillboards.find((b) => b.id === billboard.id)) {
      return // Already selected
    }

    if (selectedBillboards.length >= 50) {
      alert("لا يمكن تحديد أكثر من 50 لوحة في الحجز الواحد")
      return
    }

    if (!bookingForm.startDate || !bookingForm.endDate) {
      alert("يرجى تحديد تاريخ البداية والنهاية أولاً")
      return
    }

    const startDate = new Date(bookingForm.startDate)
    const endDate = new Date(bookingForm.endDate)
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    if (duration <= 0) {
      alert("تاريخ النهاية يجب أن يكون بعد تاريخ البداية")
      return
    }

    const rule = pricingRules.find((r) => r.size === billboard.size && r.city === billboard.city)
    const monthlyPrice = rule ? rule.basePrice * rule.multiplier : 2000
    const totalPrice = Math.round((monthlyPrice * duration) / 30)

    const selectedBillboard: SelectedBillboard = {
      id: billboard.id,
      name: billboard.name,
      size: billboard.size,
      city: billboard.city,
      price: Math.round(totalPrice / duration),
      duration: duration,
      totalPrice: totalPrice,
    }

    setSelectedBillboards([...selectedBillboards, selectedBillboard])
  }

  const [activeSection, setActiveSection] = useState("dashboard")
  const [showAddUserForm, setShowAddUserForm] = useState(false)

  const handleApproveBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "confirmed" as const } : booking)),
    )
    alert("تم اعتماد الحجز بنجاح")
  }

  const handleSendWhatsApp = (booking: Booking) => {
    const message = `
مرحباً ${booking.customerName}،

تفاصيل حجزك:
رقم العقد: ${booking.contractNumber}
اللوحات: ${booking.billboards.length} لوحة
التاريخ: من ${booking.startDate} إلى ${booking.endDate}
المبلغ الإجمالي: ${booking.totalPrice.toLocaleString()} د.ل
الحالة: ${booking.status === "confirmed" ? "مؤكد" : booking.status === "pending" ? "في الانتظار" : "ملغي"}

شكراً لاختياركم خدماتنا.
    `.trim()

    const phoneNumber = booking.customerPhone.replace(/[^\d]/g, "")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div
      className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      dir="rtl"
    >
      {/* Sidebar */}
      <aside
        className={`bg-black backdrop-blur-sm w-64 flex-shrink-0 p-6 border-l border-yellow-500/20 ${sidebarCollapsed ? "hidden" : ""}`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="h-5 w-5 text-black" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              لوحة التحكم
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item, index) => {
            const isFirstInSection = index === 0 || sidebarItems[index - 1].section !== item.section

            return (
              <div key={item.id}>
                {isFirstInSection && (
                  <h3 className="text-xs font-semibold text-yellow-400/70 mb-3 mt-6 first:mt-0 uppercase tracking-wider border-b border-yellow-500/20 pb-2">
                    {sectionHeaders[item.section]}
                  </h3>
                )}
                <Button
                  variant="ghost"
                  className={`w-full justify-start h-11 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/30 font-semibold"
                      : "text-yellow-100 hover:bg-yellow-500/10 hover:text-yellow-300 border border-transparent hover:border-yellow-500/20"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-4 w-4 ml-3" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </div>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-yellow-500/20">
          <Button
            variant="outline"
            className="w-full bg-transparent border-yellow-500/30 text-yellow-400 hover:bg-red-500/10 hover:border-red-400 hover:text-red-400 transition-colors duration-200"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-yellow-500/20 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {sidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(false)}
                className="hover:bg-yellow-500/10 text-yellow-600 hover:text-yellow-700"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent">
                {sidebarItems.find((item) => item.id === activeTab)?.label || "الرئيسية"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">إدارة شاملة للوحات الإعلانية</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                مرحباً, {currentUser?.fullName || currentUser?.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.role}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-semibold shadow-lg">
              {currentUser?.fullName?.charAt(0) || currentUser?.username?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Revenue Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-l-4 border-l-yellow-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                        <DollarSign className="h-6 w-6 text-black" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 font-semibold"
                      >
                        +12.5%
                      </Badge>
                    </div>
                    <CardTitle className="text-yellow-800 dark:text-yellow-300 text-lg font-bold">
                      إجمالي الإيرادات
                    </CardTitle>
                    <CardDescription className="text-yellow-700/70 dark:text-yellow-400/70">
                      جميع الإيرادات المؤكدة هذا الشهر
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                      {totalRevenue.toLocaleString()} د.ل
                    </div>
                    <p className="text-sm text-yellow-600/70 dark:text-yellow-400/70 mt-1">
                      من {bookings.filter((b) => b.status === "confirmed").length} عقد مؤكد
                    </p>
                  </CardContent>
                </Card>

                {/* Pending Bookings Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-l-4 border-l-gray-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 font-semibold"
                      >
                        عاجل
                      </Badge>
                    </div>
                    <CardTitle className="text-gray-800 dark:text-gray-300 text-lg font-bold">
                      الحجوزات المعلقة
                    </CardTitle>
                    <CardDescription className="text-gray-700/70 dark:text-gray-400/70">
                      تحتاج إلى مراجعة وتأكيد
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-700 dark:text-gray-400">{pendingBookings}</div>
                    <p className="text-sm text-gray-600/70 dark:text-gray-400/70 mt-1">في انتظار الموافقة</p>
                  </CardContent>
                </Card>

                {/* Available Billboards Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-l-4 border-l-yellow-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                        <MapPin className="h-6 w-6 text-black" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 font-semibold"
                      >
                        متاح
                      </Badge>
                    </div>
                    <CardTitle className="text-yellow-800 dark:text-yellow-300 text-lg font-bold">
                      اللوحات المتاحة
                    </CardTitle>
                    <CardDescription className="text-yellow-700/70 dark:text-yellow-400/70">
                      جاهزة للحجز الفوري
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                      {availableBillboardsCount}
                    </div>
                    <p className="text-sm text-yellow-600/70 dark:text-yellow-400/70 mt-1">
                      من إجمالي {billboardData.length} لوحة
                    </p>
                  </CardContent>
                </Card>

                {/* Active Contracts Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-l-4 border-l-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 font-semibold"
                      >
                        نشط
                      </Badge>
                    </div>
                    <CardTitle className="text-gray-800 dark:text-gray-300 text-lg font-bold">العقود النشطة</CardTitle>
                    <CardDescription className="text-gray-700/70 dark:text-gray-400/70">
                      العقود الجارية حالياً
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-700 dark:text-gray-400">{activeContracts}</div>
                    <p className="text-sm text-gray-600/70 dark:text-gray-400/70 mt-1">عقد ساري المفعول</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities & Top Customers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10">
                  <CardHeader>
                    <CardTitle className="text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      النشاطات الأخيرة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
                        >
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center`}
                          >
                            <activity.icon className="h-5 w-5 text-black" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/10 dark:to-slate-900/10">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-300 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      أفضل العملاء
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black font-semibold">
                            {customer.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{customer.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{customer.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                              {customer.revenue.toLocaleString()} د.ل
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{customer.bookings} حجز</p>
                          </div>
                          <Badge
                            variant={customer.status === "VIP" ? "default" : "secondary"}
                            className={
                              customer.status === "VIP" ? "bg-yellow-500 text-black" : "bg-gray-100 text-gray-700"
                            }
                          >
                            {customer.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Revenue Chart */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle>الإيرادات الشهرية</CardTitle>
                      <CardDescription>نظرة عامة على الأداء المالي والحجوزات</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        سيتم إضافة الرسم البياني التفاعلي هنا
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">عرض تفصيلي للإيرادات والاتجاهات</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "advanced-booking" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
                    نظام الحجز المتقدم
                  </CardTitle>
                  <CardDescription>احجز حتى 50 لوحة إعلانية لعميل واحد بسهولة وسرعة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Selection */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground">معلومات العميل</h3>

                      {/* Customer Search */}
                      <div className="relative">
                        <Label className="text-foreground font-semibold">البحث عن عميل موجود</Label>
                        <Input
                          placeholder="ابحث بالاسم أو الهاتف..."
                          value={customerSearch}
                          onChange={(e) => {
                            setCustomerSearch(e.target.value)
                            setShowCustomerResults(e.target.value.length > 0)
                          }}
                          className="text-foreground bg-background border-border"
                        />

                        {/* Customer Search Results */}
                        {showCustomerResults && customers.length > 0 && (
                          <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                            {customers
                              .filter(
                                (customer) =>
                                  customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                                  customer.phone.includes(customerSearch),
                              )
                              .map((customer) => (
                                <div
                                  key={customer.id}
                                  className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border-b border-border last:border-b-0"
                                  onClick={() => {
                                    setSelectedCustomer(customer)
                                    setBookingForm({
                                      ...bookingForm,
                                      customerName: customer.name,
                                      customerPhone: customer.phone,
                                      customerCompany: customer.company || "",
                                    })
                                    setCustomerSearch(customer.name)
                                    setShowCustomerResults(false)
                                  }}
                                >
                                  <div className="font-semibold text-foreground">{customer.name}</div>
                                  <div className="text-sm text-muted-foreground">{customer.phone}</div>
                                  {customer.company && (
                                    <div className="text-sm text-[#D4AF37] font-medium">{customer.company}</div>
                                  )}
                                  {customer.address && <div className="text-sm text-gray-500">{customer.address}</div>}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      {/* Customer Form */}
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label className="text-foreground font-semibold">اسم العميل *</Label>
                          <Input
                            value={bookingForm.customerName}
                            onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                            className="text-foreground bg-background border-border"
                            placeholder="أدخل اسم العميل الكامل"
                          />
                        </div>
                        <div>
                          <Label className="text-foreground font-semibold">رقم الهاتف *</Label>
                          <Input
                            value={bookingForm.customerPhone}
                            onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                            className="text-foreground bg-background border-border"
                            placeholder="+218 91-1234567"
                          />
                        </div>
                        <div>
                          <Label className="text-foreground font-semibold">اسم الشركة</Label>
                          <Input
                            value={bookingForm.customerCompany}
                            onChange={(e) => setBookingForm({ ...bookingForm, customerCompany: e.target.value })}
                            className="text-foreground bg-background border-border"
                            placeholder="اسم الشركة (اختياري)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Booking Dates */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground">تفاصيل الحجز</h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-foreground font-semibold">تاريخ البداية *</Label>
                          <Input
                            type="date"
                            value={bookingForm.startDate}
                            onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                            className="text-foreground bg-background border-border"
                          />
                        </div>
                        <div>
                          <Label className="text-foreground font-semibold">تاريخ النهاية *</Label>
                          <Input
                            type="date"
                            value={bookingForm.endDate}
                            onChange={(e) => setBookingForm({ ...bookingForm, endDate: e.target.value })}
                            className="text-foreground bg-background border-border"
                          />
                        </div>
                      </div>

                      {bookingForm.startDate && bookingForm.endDate && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-sm font-semibold text-foreground">
                            <Clock className="w-4 h-4 inline ml-1" />
                            مدة الحجز:{" "}
                            {Math.ceil(
                              (new Date(bookingForm.endDate).getTime() - new Date(bookingForm.startDate).getTime()) /
                                (1000 * 60 * 60 * 24),
                            )}{" "}
                            يوم
                          </p>
                        </div>
                      )}

                      <div>
                        <Label className="text-foreground font-semibold">ملاحظات إضافية</Label>
                        <Textarea
                          value={bookingForm.notes}
                          onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                          className="text-foreground bg-background border-border"
                          placeholder="أي ملاحظات أو متطلبات خاصة..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selected Billboards */}
                  {selectedBillboards.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-foreground">
                          اللوحات المحددة ({selectedBillboards.length}/50)
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedBillboards([])}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 ml-1" />
                          إلغاء الكل
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                        {selectedBillboards.map((billboard) => (
                          <div
                            key={billboard.id}
                            className="p-3 rounded-lg border-2 border-[#D4AF37] bg-[#D4AF37]/10 flex justify-between items-center"
                          >
                            <div>
                              <p className="font-semibold text-foreground text-sm">{billboard.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {billboard.city} - {billboard.size}
                              </p>
                              <p className="text-xs font-bold text-[#D4AF37]">
                                {billboard.totalPrice.toLocaleString()} د.ل
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                              onClick={() =>
                                setSelectedBillboards(selectedBillboards.filter((b) => b.id !== billboard.id))
                              }
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="bg-[#D4AF37]/20 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-foreground flex items-center">
                            <Calculator className="w-4 h-4 ml-2 text-[#D4AF37]" />
                            الإجمالي
                          </h4>
                          <span className="font-bold text-[#D4AF37] text-xl">
                            {selectedBillboards
                              .reduce((total, billboard) => total + billboard.totalPrice, 0)
                              .toLocaleString()}{" "}
                            د.ل
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Create Booking Button */}
                  <div className="flex justify-center pt-6">
                    <Button
                      size="lg"
                      className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-bold px-8 py-3"
                      disabled={isCreatingBooking || selectedBillboards.length === 0}
                    >
                      {isCreatingBooking ? (
                        <>
                          <div className="spinner ml-2"></div>
                          جاري إنشاء الحجز...
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 ml-2" />
                          إنشاء الحجز ({selectedBillboards.length} لوحة)
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Billboard Selection */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>اللوحات الإعلانية المتاحة</CardTitle>
                      <CardDescription>اختر اللوحات الإعلانية التي تريد حجزها (حتى 50 لوحة)</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="text-[#D4AF37] border-[#D4AF37]"
                      >
                        <Settings className="w-4 h-4 ml-1" />
                        فلاتر
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBulkSelectMode(!bulkSelectMode)}
                        className={bulkSelectMode ? "bg-[#D4AF37] text-black" : "text-[#D4AF37] border-[#D4AF37]"}
                      >
                        <ShoppingCart className="w-4 h-4 ml-1" />
                        تحديد جماعي
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filters */}
                  <div className="space-y-4 mb-6">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="ابحث عن اللوحات بالاسم، الرقم، المدينة، أو الموقع..."
                        value={billboardSearch}
                        onChange={(e) => setBillboardSearch(e.target.value)}
                        className="pr-10 text-foreground bg-background border-border"
                      />
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <Label className="text-sm font-semibold">المدينة</Label>
                          <select
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                            className="w-full p-2 border border-border rounded-md text-foreground bg-background"
                          >
                            <option value="all">جميع المدن</option>
                            {getUniqueCities().map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">الحجم</Label>
                          <select
                            value={sizeFilter}
                            onChange={(e) => setSizeFilter(e.target.value)}
                            className="w-full p-2 border border-border rounded-md text-foreground bg-background"
                          >
                            <option value="all">جميع الأحجام</option>
                            {getUniqueSizes().map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">ترتيب حسب</Label>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full p-2 border border-border rounded-md text-foreground bg-background"
                          >
                            <option value="name">الاسم</option>
                            <option value="city">المدينة</option>
                            <option value="size">الحجم</option>
                            <option value="price">السعر</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">طريقة العرض</Label>
                          <div className="flex gap-2 mt-1">
                            <Button
                              size="sm"
                              variant={viewMode === "grid" ? "default" : "outline"}
                              onClick={() => setViewMode("grid")}
                              className="flex-1"
                            >
                              شبكة
                            </Button>
                            <Button
                              size="sm"
                              variant={viewMode === "list" ? "default" : "outline"}
                              onClick={() => setViewMode("list")}
                              className="flex-1"
                            >
                              قائمة
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bulk Selection Controls */}
                    {bulkSelectMode && (
                      <div className="flex gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Button
                          size="sm"
                          onClick={() => {
                            const filtered = getFilteredAndSortedBillboards()
                            const currentPageItems = filtered.slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage,
                            )
                            handleBulkSelect(currentPageItems)
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          تحديد الصفحة الحالية
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            const filtered = getFilteredAndSortedBillboards()
                            handleBulkSelect(filtered.slice(0, 50))
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          تحديد أول 50 لوحة
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            const filtered = getFilteredAndSortedBillboards()
                            const sameCity = filtered.filter((b) => b.city === cityFilter)
                            handleBulkSelect(sameCity.slice(0, 50))
                          }}
                          disabled={cityFilter === "all"}
                          className="bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          تحديد نفس المدينة
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Billboard Display */}
                  {(() => {
                    const filteredBillboards = getFilteredAndSortedBillboards()
                    const totalPages = Math.ceil(filteredBillboards.length / itemsPerPage)
                    const startIndex = (currentPage - 1) * itemsPerPage
                    const endIndex = startIndex + itemsPerPage
                    const currentBillboards = filteredBillboards.slice(startIndex, endIndex)

                    return (
                      <>
                        {/* Results Summary */}
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm text-muted-foreground">
                            عرض {startIndex + 1}-{Math.min(endIndex, filteredBillboards.length)} من أصل{" "}
                            {filteredBillboards.length} لوحة
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                            >
                              السابق
                            </Button>
                            <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded">
                              {currentPage} / {totalPages}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              disabled={currentPage === totalPages}
                            >
                              التالي
                            </Button>
                          </div>
                        </div>

                        {/* Billboard Grid/List */}
                        {viewMode === "grid" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {currentBillboards.map((billboard) => (
                              <div
                                key={billboard.id}
                                className={`relative p-4 border rounded-lg cursor-pointer transition-all hover:shadow-lg ${
                                  selectedBillboards.find((b) => b.id === billboard.id)
                                    ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-md"
                                    : "border-border hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
                                }`}
                                onClick={() => handleSingleSelect(billboard)}
                              >
                                {/* Billboard Image */}
                                <div className="relative mb-3">
                                  <img
                                    src={billboard.image || "/placeholder.svg"}
                                    alt={billboard.name}
                                    className="w-full h-32 object-cover rounded-md"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/roadside-billboard.png"
                                    }}
                                  />
                                  <div className="absolute top-2 right-2">
                                    <Badge className="bg-[#D4AF37]/90 text-black font-bold text-xs">
                                      {billboard.size}
                                    </Badge>
                                  </div>
                                  {selectedBillboards.find((b) => b.id === billboard.id) && (
                                    <div className="absolute top-2 left-2">
                                      <Badge className="bg-green-500 text-white">محدد</Badge>
                                    </div>
                                  )}
                                </div>

                                {/* Billboard Info */}
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-foreground text-sm line-clamp-2">
                                    {billboard.name}
                                  </h4>
                                  <div className="space-y-1 text-xs text-muted-foreground">
                                    <div className="flex items-center">
                                      <MapPin className="w-3 h-3 ml-1 text-[#D4AF37]" />
                                      <span className="font-medium truncate">{billboard.nearestPoint}</span>
                                    </div>
                                    <p className="font-medium">
                                      {billboard.municipality} - {billboard.city}
                                    </p>
                                    <p className="font-bold text-[#D4AF37]">#{billboard.id}</p>
                                    {billboard.price && (
                                      <p className="font-bold text-[#D4AF37]">{billboard.price} د.ل/شهر</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {currentBillboards.map((billboard) => (
                              <div
                                key={billboard.id}
                                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                  selectedBillboards.find((b) => b.id === billboard.id)
                                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                                    : "border-border hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
                                }`}
                                onClick={() => handleSingleSelect(billboard)}
                              >
                                <img
                                  src={billboard.image || "/placeholder.svg"}
                                  alt={billboard.name}
                                  className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "/roadside-billboard.png"
                                  }}
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-semibold text-foreground text-sm">{billboard.name}</h4>
                                      <p className="text-xs text-muted-foreground">{billboard.nearestPoint}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {billboard.municipality} - {billboard.city}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37] text-xs">
                                        {billboard.size}
                                      </Badge>
                                      {selectedBillboards.find((b) => b.id === billboard.id) && (
                                        <Badge className="bg-green-500 text-white text-xs">محدد</Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs font-bold text-[#D4AF37]">#{billboard.id}</p>
                                    {billboard.price && (
                                      <p className="text-xs font-bold text-[#D4AF37]">{billboard.price} د.ل/شهر</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* No Results */}
                        {filteredBillboards.length === 0 && (
                          <div className="text-center py-12">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد لوحات متاحة</h3>
                            <p className="text-muted-foreground">جرب تغيير معايير البحث أو الفلاتر</p>
                          </div>
                        )}
                      </>
                    )
                  })()}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                    إدارة الأسعار
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    إدارة أسعار اللوحات الإعلانية حسب المستوى وفئة العميل
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      // Export prices functionality
                      const dataStr = JSON.stringify(priceLevels, null, 2)
                      const dataBlob = new Blob([dataStr], { type: "application/json" })
                      const url = URL.createObjectURL(dataBlob)
                      const link = document.createElement("a")
                      link.href = url
                      link.download = "billboard-prices.json"
                      link.click()
                    }}
                    variant="outline"
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تصدير الأسعار
                  </Button>
                  <Button
                    onClick={() => {
                      // Reset to default prices
                      if (confirm("هل أنت متأكد من إعادة تعيين جميع الأسعار إلى القيم الافتراضية؟")) {
                        // Reset logic here
                      }
                    }}
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    <RotateCcw className="w-4 h-4 ml-2" />
                    إعادة تعيين
                  </Button>
                </div>
              </div>

              {/* Price Levels */}
              {priceLevels.map((level) => (
                <Card key={level.id} className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                            level.level === "A"
                              ? "bg-gradient-to-br from-yellow-500 to-amber-600"
                              : "bg-gradient-to-br from-yellow-400 to-yellow-500"
                          }`}
                        >
                          <BarChart3 className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <CardTitle className="text-yellow-800 dark:text-yellow-300 text-xl">{level.name}</CardTitle>
                          <CardDescription className="text-yellow-700/70 dark:text-yellow-400/70">
                            الأسعار الشهرية بالدينار الليبي
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        className={`text-lg px-4 py-2 ${
                          level.level === "A" ? "bg-yellow-500 text-black" : "bg-yellow-400 text-black"
                        }`}
                      >
                        مستوى {level.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Size-based Pricing Table */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                        <Calculator className="w-5 h-5 ml-2 text-yellow-600" />
                        أسعار الأحجام حسب فئة العميل
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <th className="border border-gray-200 dark:border-gray-700 p-3 text-right font-semibold">
                                الحجم
                              </th>
                              <th className="border border-gray-200 dark:border-gray-700 p-3 text-center font-semibold text-blue-600">
                                مسوقين
                              </th>
                              <th className="border border-gray-200 dark:border-gray-700 p-3 text-center font-semibold text-green-600">
                                شركات
                              </th>
                              <th className="border border-gray-200 dark:border-gray-700 p-3 text-center font-semibold text-purple-600">
                                أفراد
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(level.sizes).map(([size, prices]) => (
                              <tr key={size} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold bg-yellow-50 dark:bg-yellow-900/20">
                                  {size}
                                </td>
                                {Object.entries(prices).map(([category, price]) => (
                                  <td
                                    key={category}
                                    className="border border-gray-200 dark:border-gray-700 p-3 text-center"
                                  >
                                    {editingPrice?.levelId === level.id &&
                                    editingPrice?.size === size &&
                                    editingPrice?.category === category ? (
                                      <div className="flex items-center gap-2">
                                        <Input
                                          type="number"
                                          value={editingPrice.value}
                                          onChange={(e) =>
                                            setEditingPrice({
                                              ...editingPrice,
                                              value: Number(e.target.value),
                                            })
                                          }
                                          className="w-20 text-center"
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                              updatePrice(level.id, size, category, editingPrice.value)
                                              setEditingPrice(null)
                                            } else if (e.key === "Escape") {
                                              setEditingPrice(null)
                                            }
                                          }}
                                          autoFocus
                                        />
                                        <Button
                                          size="sm"
                                          onClick={() => {
                                            updatePrice(level.id, size, category, editingPrice.value)
                                            setEditingPrice(null)
                                          }}
                                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1"
                                        >
                                          <Save className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => setEditingPrice(null)}
                                          className="px-2 py-1"
                                        >
                                          <X className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <div
                                        className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1"
                                        onClick={() =>
                                          setEditingPrice({
                                            levelId: level.id,
                                            size,
                                            category,
                                            value: price,
                                          })
                                        }
                                      >
                                        <span className="font-bold text-gray-900 dark:text-gray-100">
                                          {price.toLocaleString()}
                                        </span>
                                        <span className="text-sm text-gray-500">د.ل</span>
                                        <Edit className="w-3 h-3 text-gray-400" />
                                      </div>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* City Multipliers */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                        <MapPin className="w-5 h-5 ml-2 text-yellow-600" />
                        معاملات المدن
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Object.entries(level.cities).map(([city, data]) => (
                          <div key={city} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{city}</h4>
                              <Badge
                                variant="secondary"
                                className={`${
                                  data.multiplier >= 1.0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {data.multiplier >= 1.0 ? "مميز" : "عادي"}
                              </Badge>
                            </div>
                            {editingMultiplier?.levelId === level.id && editingMultiplier?.city === city ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  step="0.1"
                                  min="0.1"
                                  max="2.0"
                                  value={editingMultiplier.value}
                                  onChange={(e) =>
                                    setEditingMultiplier({
                                      ...editingMultiplier,
                                      value: Number(e.target.value),
                                    })
                                  }
                                  className="text-center"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      updateCityMultiplier(level.id, city, editingMultiplier.value)
                                      setEditingMultiplier(null)
                                    } else if (e.key === "Escape") {
                                      setEditingMultiplier(null)
                                    }
                                  }}
                                  autoFocus
                                />
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    updateCityMultiplier(level.id, city, editingMultiplier.value)
                                    setEditingMultiplier(null)
                                  }}
                                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1"
                                >
                                  <Save className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <div
                                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2"
                                onClick={() =>
                                  setEditingMultiplier({
                                    levelId: level.id,
                                    city,
                                    value: data.multiplier,
                                  })
                                }
                              >
                                <span className="text-2xl font-bold text-yellow-600">×{data.multiplier}</span>
                                <Edit className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              مثال: {(3000 * data.multiplier).toLocaleString()} د.ل
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Customer Categories */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    فئات العملاء والخصومات
                  </CardTitle>
                  <CardDescription className="text-blue-700/70 dark:text-blue-400/70">
                    إدارة فئات العملاء ونسب الخصم المطبقة
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {customerCategories.map((category) => (
                      <div key={category.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{category.name}</h4>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                            {category.discountPercentage}% خصم
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          فئة{" "}
                          {category.type === "marketer"
                            ? "المسوقين"
                            : category.type === "company"
                              ? "الشركات"
                              : "الأفراد"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    إدارة الحجوزات
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">عرض وإدارة جميع حجوزات اللوحات الإعلانية</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setActiveTab("advanced-booking")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    حجز جديد
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">إجمالي الحجوزات</p>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{bookings.length}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 dark:text-green-400 text-sm font-medium">حجوزات مؤكدة</p>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-300">
                          {bookings.filter((b) => b.status === "confirmed").length}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">في الانتظار</p>
                        <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">
                          {bookings.filter((b) => b.status === "pending").length}
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">الإيرادات الشهرية</p>
                        <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                          {totalRevenue.toLocaleString()} د.ل
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bookings Table */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">قائمة الحجوزات</CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="البحث في الحجوزات..." className="w-64" />
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 ml-2" />
                        فلتر
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-300">رقم الحجز</th>
                          <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-300">العميل</th>
                          <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-300">اللوحات</th>
                          <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-300">التاريخ</th>
                          <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-300">المبلغ</th>
                          <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-300">الحالة</th>
                          <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-300">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr
                            key={booking.id}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <td className="p-3 font-mono text-sm text-blue-600 dark:text-blue-400">#{booking.id}</td>
                            <td className="p-3">
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">{booking.customerName}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{booking.customerPhone}</p>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-xs">
                                {booking.billboards?.length || 1} لوحة
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">
                                <p className="text-gray-900 dark:text-gray-100">{booking.startDate}</p>
                                <p className="text-gray-500 dark:text-gray-400">إلى {booking.endDate}</p>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="font-bold text-blue-600 dark:text-blue-400">
                                {booking.totalPrice?.toLocaleString() || "0"} د.ل
                              </span>
                            </td>
                            <td className="p-3">
                              <Badge
                                className={
                                  booking.status === "confirmed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                    : booking.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                                }
                              >
                                {booking.status === "confirmed"
                                  ? "مؤكد"
                                  : booking.status === "pending"
                                    ? "في الانتظار"
                                    : "ملغي"}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-1 flex-wrap">
                                <Button size="sm" variant="outline" title="عرض التفاصيل">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" title="تعديل">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePrintContract(booking)}
                                  className="text-blue-600 hover:text-blue-700"
                                  title="طباعة العقد"
                                >
                                  <Printer className="w-4 h-4" />
                                </Button>
                                {booking.status === "pending" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleApproveBooking(booking.id)}
                                    className="text-green-600 hover:text-green-700"
                                    title="اعتماد الحجز"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSendWhatsApp(booking)}
                                  className="text-green-600 hover:text-green-700"
                                  title="إرسال عبر الواتساب"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 bg-transparent"
                                  title="حذف"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "installation-tasks" && (
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">إجمالي المهام</p>
                        <p className="text-2xl font-bold text-orange-800 dark:text-orange-300">24</p>
                      </div>
                      <CheckSquare className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">قيد التنفيذ</p>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">8</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 dark:text-green-400 text-sm font-medium">مكتملة</p>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-300">12</p>
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
                        <p className="text-2xl font-bold text-red-800 dark:text-red-300">4</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tasks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
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
                  },
                  {
                    id: "TASK-004",
                    title: "استبدال إضاءة لوحة شارع عمر المختار",
                    client: "مكتب الرؤية الإعلانية",
                    billboard: "لوحة رقم 12 - شارع عمر المختار",
                    team: "فريق الكهرباء",
                    status: "overdue",
                    priority: "urgent",
                    dueDate: "2024-01-08",
                    progress: 30,
                  },
                ].map((task) => (
                  <Card key={task.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 line-clamp-2">
                            {task.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.client}</p>
                        </div>
                        <Badge
                          className={
                            task.priority === "urgent"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                              : task.priority === "high"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                          }
                        >
                          {task.priority === "urgent" ? "عاجل" : task.priority === "high" ? "مهم" : "عادي"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">{task.billboard}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">{task.team}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">موعد التسليم: {task.dueDate}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">التقدم</span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              task.status === "completed"
                                ? "bg-green-500"
                                : task.status === "overdue"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                            }`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <Badge
                          className={
                            task.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                              : task.status === "in-progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                : task.status === "overdue"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300"
                          }
                        >
                          {task.status === "completed"
                            ? "مكتملة"
                            : task.status === "in-progress"
                              ? "قيد التنفيذ"
                              : task.status === "overdue"
                                ? "متأخرة"
                                : "في الانتظار"}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )

  // Login form when not logged in
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4"
        dir="rtl"
      >
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BarChart3 className="h-8 w-8 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              لوحة التحكم الإدارية
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
              نظام إدارة اللوحات الإعلانية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    اسم المستخدم
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="mt-1"
                    placeholder="أدخل اسم المستخدم"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    كلمة المرور
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="mt-1"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">{loginError}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-2.5 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                تسجيل الدخول
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p className="mb-2">بيانات تجريبية للدخول:</p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs">
                  <p>
                    <strong>المستخدم:</strong> mlk
                  </p>
                  <p>
                    <strong>كلمة المرور:</strong> 12345678
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}
