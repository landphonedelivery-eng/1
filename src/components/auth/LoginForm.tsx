"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { useAuth } from '../../hooks/useAuth'

export const LoginForm: React.FC = () => {
  const { loginForm, loginError, setLoginForm, login } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(loginForm.username, loginForm.password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl border-yellow-500/20 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 bg-clip-text text-transparent">
            تسجيل الدخول
          </CardTitle>
          <CardDescription className="text-gray-600">
            نظام إدارة اللوحات الإعلانية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="أدخل اسم المستخدم"
                className="border-yellow-500/30 focus:border-yellow-500 focus:ring-yellow-500/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="أدخل كلمة المرور"
                className="border-yellow-500/30 focus:border-yellow-500 focus:ring-yellow-500/20"
                required
              />
            </div>
            {loginError && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                {loginError}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              تسجيل الدخول
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}