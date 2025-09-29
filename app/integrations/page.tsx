"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { 
  Zap, 
  MessageSquare, 
  Users, 
  HardDrive, 
  Cloud, 
  Database, 
  Settings, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react"

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    {
      id: "ZAP-001",
      name: "Zapier",
      description: "Automate workflows between 5000+ apps",
      icon: Zap,
      status: "Connected",
      lastSync: "2024-01-20 14:30",
      usage: "15 workflows active",
      category: "Automation",
      color: "text-orange-600"
    },
    {
      id: "SLK-001",
      name: "Slack",
      description: "Send fax notifications to Slack channels",
      icon: MessageSquare,
      status: "Connected",
      lastSync: "2024-01-20 14:25",
      usage: "3 channels configured",
      category: "Communication",
      color: "text-purple-600"
    },
    {
      id: "TMS-001",
      name: "Microsoft Teams",
      description: "Integrate with Teams for notifications",
      icon: Users,
      status: "Connected",
      lastSync: "2024-01-20 14:20",
      usage: "2 teams connected",
      category: "Communication",
      color: "text-blue-600"
    },
    {
      id: "GDR-001",
      name: "Google Drive",
      description: "Store and sync fax documents",
      icon: HardDrive,
      status: "Connected",
      lastSync: "2024-01-20 14:15",
      usage: "2.1 GB stored",
      category: "Storage",
      color: "text-green-600"
    },
    {
      id: "DBX-001",
      name: "Dropbox",
      description: "Backup fax documents to Dropbox",
      icon: Cloud,
      status: "Disconnected",
      lastSync: "2024-01-18 09:45",
      usage: "Not configured",
      category: "Storage",
      color: "text-blue-500"
    },
    {
      id: "ODR-001",
      name: "OneDrive",
      description: "Microsoft cloud storage integration",
      icon: Database,
      status: "Pending",
      lastSync: "Never",
      usage: "Setup required",
      category: "Storage",
      color: "text-blue-700"
    },
    {
      id: "EHR-001",
      name: "EHR API",
      description: "Healthcare system integration",
      icon: Database,
      status: "Connected",
      lastSync: "2024-01-20 14:10",
      usage: "API calls: 1,247",
      category: "Healthcare",
      color: "text-red-600"
    }
  ])

  const [apiKeys, setApiKeys] = useState<{[key: string]: string}>({})

  // Handle connect
  const handleConnect = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId)
    if (integration) {
      alert(`Connecting to ${integration.name}... This would typically open an OAuth flow or API key setup.`)
    }
  }

  // Handle update API key
  const handleUpdateApiKey = (integrationId: string, apiKey: string) => {
    setApiKeys(prev => ({...prev, [integrationId]: apiKey}))
    alert(`API key updated for ${integrations.find(i => i.id === integrationId)?.name}`)
  }

  // Handle configure
  const handleConfigure = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId)
    if (integration) {
      alert(`Opening configuration for ${integration.name}...`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected": return "bg-green-100 text-green-800"
      case "Disconnected": return "bg-red-100 text-red-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Disconnected": return <AlertCircle className="h-4 w-4 text-red-600" />
      case "Pending": return <Clock className="h-4 w-4 text-yellow-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm text-muted-foreground">Total Integrations</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-muted-foreground">Connected</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Disconnected</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => {
          const IconComponent = integration.icon
          return (
            <Card key={integration.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-6 w-6 ${integration.color}`} />
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    <Badge className={`text-xs ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Integration Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{integration.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sync:</span>
                    <span className="font-medium">{integration.lastSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="font-medium">{integration.usage}</span>
                  </div>
                </div>

                {/* Connection Settings */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${integration.id}-enabled`}>Enable Integration</Label>
                    <Switch 
                      id={`${integration.id}-enabled`} 
                      defaultChecked={integration.status === "Connected"}
                    />
                  </div>
                  
                  {integration.status === "Connected" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input 
                        placeholder="API Key" 
                        type="password" 
                        value={apiKeys[integration.id] || ''}
                        onChange={(e) => setApiKeys(prev => ({...prev, [integration.id]: e.target.value}))}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateApiKey(integration.id, apiKeys[integration.id] || '')}
                      >
                        Update
                      </Button>
                    </div>
                  )}
                  
                  {integration.status === "Disconnected" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input 
                        placeholder="API Key" 
                        value={apiKeys[integration.id] || ''}
                        onChange={(e) => setApiKeys(prev => ({...prev, [integration.id]: e.target.value}))}
                      />
                      <Button 
                        size="sm"
                        onClick={() => handleConnect(integration.id)}
                      >
                        Connect
                      </Button>
                    </div>
                  )}
                  
                  {integration.status === "Pending" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input 
                        placeholder="API Key" 
                        value={apiKeys[integration.id] || ''}
                        onChange={(e) => setApiKeys(prev => ({...prev, [integration.id]: e.target.value}))}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleConfigure(integration.id)}
                      >
                        Setup
                      </Button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="link" 
                    className="px-0 text-xs min-w-0"
                    onClick={() => alert(`Opening documentation for ${integration.name}...`)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">View Documentation</span>
                  </Button>
                  {integration.status === "Connected" && (
                    <Button 
                      variant="link" 
                      className="px-0 text-xs min-w-0"
                      onClick={() => handleConfigure(integration.id)}
                    >
                      <Settings className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Configure</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
