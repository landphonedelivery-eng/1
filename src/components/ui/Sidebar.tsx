import React from 'react'
import { Button } from './button'
import { LucideIcon } from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  activeTab: string
  onTabChange: (tab: string) => void
  menuItems: Array<{
    id: string
    label: string
    icon: LucideIcon
  }>
  user?: {
    fullName: string
    role: string
  }
  onLogout: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  activeTab,
  onTabChange,
  menuItems,
  user,
  onLogout
}) => {
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold">نظام اللوحات الإعلانية</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
          >
            ☰
          </Button>
        </div>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span className="mr-2">{item.label}</span>}
              </Button>
            )
          })}
        </div>
      </nav>

      {user && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`flex items-center gap-2 p-2 bg-gray-50 rounded-lg ${collapsed ? 'justify-center' : ''}`}>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">{user.fullName}</p>
                <p className="text-xs text-gray-500">{user.role === 'admin' ? 'مدير' : 'مستخدم'}</p>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={onLogout}>
              🚪
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}