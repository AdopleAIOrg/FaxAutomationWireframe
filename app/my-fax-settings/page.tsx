"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { 
  Settings, 
  Bell, 
  Shield, 
  Clock, 
  FileText, 
  Mail, 
  Phone, 
  Globe,
  Save,
  RotateCcw
} from "lucide-react"

export default function MyFaxSettingsPage() {
  const [settings, setSettings] = useState({
    defaultCoverPage: "Corporate Standard",
    timeZone: "America/New_York",
    faxQuality: 85,
    emailNotifications: true,
    highQualityDefault: true,
    autoSaveDrafts: true,
    emailAlerts: true,
    smsAlerts: false,
    notificationEmail: "john.smith@company.com",
    smsPhone: "+1 (555) 123-4567",
    twoFactorAuth: true,
    sessionTimeout: true,
    auditLogging: true,
    sessionTimeoutDuration: "30",
    userPermissions: true,
    schedulingEnabled: true,
    bulkFaxing: true,
    internationalFaxing: false,
    maxRecipients: "100",
    retryAttempts: "3"
  })

  // Handle save settings
  const handleSaveSettings = () => {
    alert('Settings saved successfully!')
  }

  // Handle reset to defaults
  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      setSettings({
        defaultCoverPage: "Corporate Standard",
        timeZone: "America/New_York",
        faxQuality: 85,
        emailNotifications: true,
        highQualityDefault: true,
        autoSaveDrafts: true,
        emailAlerts: true,
        smsAlerts: false,
        notificationEmail: "john.smith@company.com",
        smsPhone: "+1 (555) 123-4567",
        twoFactorAuth: true,
        sessionTimeout: true,
        auditLogging: true,
        sessionTimeoutDuration: "30",
        userPermissions: true,
        schedulingEnabled: true,
        bulkFaxing: true,
        internationalFaxing: false,
        maxRecipients: "100",
        retryAttempts: "3"
      })
      alert('Settings reset to defaults!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Settings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Active Settings</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Notifications</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">High</div>
                <div className="text-sm text-muted-foreground">Security Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">EST</div>
                <div className="text-sm text-muted-foreground">Time Zone</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Personal Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Default Cover Page Template</Label>
              <Select defaultValue="corporate">
                <SelectTrigger>
                  <SelectValue placeholder="Choose template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="simple">Simple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Default Fax Quality</Label>
              <div className="space-y-2">
                <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Default Time Zone</Label>
              <Select defaultValue="est">
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Time (EST)</SelectItem>
                  <SelectItem value="cst">Central Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notif">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive email alerts for fax status</p>
                </div>
                <Switch id="notif" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="quality">High Quality Default</Label>
                  <p className="text-xs text-muted-foreground">Use high quality for all faxes</p>
                </div>
                <Switch id="quality" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-save">Auto-save Drafts</Label>
                  <p className="text-xs text-muted-foreground">Automatically save fax drafts</p>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-success">Fax Success Notifications</Label>
                  <p className="text-xs text-muted-foreground">Email when fax is sent successfully</p>
                </div>
                <Switch id="email-success" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-failed">Fax Failure Notifications</Label>
                  <p className="text-xs text-muted-foreground">Email when fax fails to send</p>
                </div>
                <Switch id="email-failed" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-received">Fax Received Notifications</Label>
                  <p className="text-xs text-muted-foreground">Email when new fax is received</p>
                </div>
                <Switch id="email-received" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-alerts">SMS Alerts</Label>
                  <p className="text-xs text-muted-foreground">Send SMS for urgent notifications</p>
                </div>
                <Switch id="sms-alerts" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notification Email</Label>
              <Input type="email" defaultValue="john.smith@company.com" />
            </div>

            <div className="space-y-2">
              <Label>SMS Phone Number</Label>
              <Input type="tel" placeholder="+1 (555) 123-4567" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">Require 2FA for account access</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Switch id="session-timeout" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="audit-log">Audit Logging</Label>
                  <p className="text-xs text-muted-foreground">Log all fax activities</p>
                </div>
                <Switch id="audit-log" defaultChecked />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Password Requirements</Label>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Minimum 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Include numbers and symbols</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">✓</Badge>
                  <span>Mixed case letters</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fax Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Fax Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="permissions">User Permissions</Label>
                  <p className="text-xs text-muted-foreground">Allow users to send faxes</p>
                </div>
                <Switch id="permissions" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sched">Allow Scheduling</Label>
                  <p className="text-xs text-muted-foreground">Enable scheduled fax sending</p>
                </div>
                <Switch id="sched" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="bulk">Bulk Faxing</Label>
                  <p className="text-xs text-muted-foreground">Allow sending to multiple recipients</p>
                </div>
                <Switch id="bulk" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="international">International Faxing</Label>
                  <p className="text-xs text-muted-foreground">Allow international fax numbers</p>
                </div>
                <Switch id="international" defaultChecked />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Maximum Recipients per Fax</Label>
              <Select defaultValue="50">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 recipients</SelectItem>
                  <SelectItem value="25">25 recipients</SelectItem>
                  <SelectItem value="50">50 recipients</SelectItem>
                  <SelectItem value="100">100 recipients</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Default Retry Attempts</Label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 attempt</SelectItem>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          className="min-w-0"
          onClick={handleResetDefaults}
        >
          <RotateCcw className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Reset to Defaults</span>
        </Button>
        <Button 
          className="min-w-0"
          onClick={handleSaveSettings}
        >
          <Save className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Save Settings</span>
        </Button>
      </div>
    </div>
  )
}
