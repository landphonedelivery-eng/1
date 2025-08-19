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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>نظام إدارة اللوحات الإعلانية</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>
            {loginError && (
              <div className="text-red-500 text-sm text-center">{loginError}</div>
            )}
            <Button type="submit" className="w-full">
              تسجيل الدخول
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}