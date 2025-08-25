import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend
}) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-yellow-500/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</CardTitle>
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
          <Icon className="h-5 w-5 text-black" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
          {value}
        </div>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
        )}
        {trend && (
          <div className={`text-sm font-medium flex items-center gap-1 ${
            trend.isPositive 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            <span className={`inline-block w-2 h-2 rounded-full ${
              trend.isPositive ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            {trend.isPositive ? '+' : ''}{trend.value}% من الشهر الماضي
          </div>
        )}
      </CardContent>
    </Card>
  )
}