"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { FileText, Calendar, User, Download, RotateCcw, Trash2, AlertTriangle, MoreVertical, Eye, Edit, Send, Grid3X3, List } from "lucide-react"

export default function OutboxPage() {
  const [outboxFaxes, setOutboxFaxes] = useState([
    {
      id: "OUT-001",
      title: "Monthly Invoice - January 2024",
      recipient: "Acme Corporation",
      recipientNumber: "+1 (555) 123-4567",
      sentDate: "2024-01-20 10:30",
      status: "Delivered",
      pages: 3,
      size: "1.2 MB",
      type: "Invoice",
      priority: "Normal",
      department: "Finance",
      tags: ["Invoice", "Payment", "Monthly"],
      description: "Monthly invoice for services rendered in January 2024",
      fromNumber: "+1 (555) 999-0000",
      deliveryTime: "2024-01-20 10:32",
      retryCount: 0
    },
    {
      id: "OUT-002", 
      title: "Contract Renewal Proposal",
      recipient: "Tech Solutions Inc",
      recipientNumber: "+1 (555) 234-5678",
      sentDate: "2024-01-19 14:15",
      status: "Delivered",
      pages: 8,
      size: "2.1 MB",
      type: "Proposal",
      priority: "High",
      department: "Legal",
      tags: ["Contract", "Renewal", "Proposal"],
      description: "Proposal for contract renewal with updated terms and conditions",
      fromNumber: "+1 (555) 999-0000",
      deliveryTime: "2024-01-19 14:17",
      retryCount: 0
    },
    {
      id: "OUT-003",
      title: "Patient Records Response",
      recipient: "Medical Center",
      recipientNumber: "+1 (555) 345-6789",
      sentDate: "2024-01-18 09:45",
      status: "Delivered",
      pages: 5,
      size: "1.8 MB",
      type: "Response",
      priority: "High",
      department: "Medical",
      tags: ["Medical", "Records", "Response"],
      description: "Response to patient records request with required documentation",
      fromNumber: "+1 (555) 999-0000",
      deliveryTime: "2024-01-18 09:47",
      retryCount: 0
    },
    {
      id: "OUT-004",
      title: "Legal Notice Acknowledgment",
      recipient: "Law Firm Associates",
      recipientNumber: "+1 (555) 456-7890",
      sentDate: "2024-01-17 16:20",
      status: "Delivered",
      pages: 2,
      size: "0.8 MB",
      type: "Acknowledgment",
      priority: "Normal",
      department: "Legal",
      tags: ["Legal", "Acknowledgment", "Notice"],
      description: "Acknowledgment of receipt of legal notice regarding litigation",
      fromNumber: "+1 (555) 999-0000",
      deliveryTime: "2024-01-17 16:22",
      retryCount: 0
    },
    {
      id: "OUT-005",
      title: "Insurance Claim Documentation",
      recipient: "Insurance Company",
      recipientNumber: "+1 (555) 567-8901",
      sentDate: "2024-01-16 11:10",
      status: "Delivered",
      pages: 4,
      size: "1.5 MB",
      type: "Documentation",
      priority: "Normal",
      department: "Insurance",
      tags: ["Insurance", "Claim", "Documentation"],
      description: "Response to claim documentation request with required forms",
      fromNumber: "+1 (555) 999-0000",
      deliveryTime: "2024-01-16 11:12",
      retryCount: 0
    },
    {
      id: "OUT-006",
      title: "Safety Compliance Report",
      recipient: "Manufacturing Corp",
      recipientNumber: "+1 (555) 678-9012",
      sentDate: "2024-01-15 13:30",
      status: "Delivered",
      pages: 6,
      size: "2.3 MB",
      type: "Report",
      priority: "Normal",
      department: "Safety",
      tags: ["Safety", "Compliance", "Report"],
      description: "Monthly safety compliance report with follow-up actions",
      fromNumber: "+1 (555) 999-0000",
      deliveryTime: "2024-01-15 13:32",
      retryCount: 0
    },
    {
      id: "OUT-007",
      title: "Inventory Status Update",
      recipient: "Retail Chain",
      recipientNumber: "+1 (555) 789-0123",
      sentDate: "2024-01-14 08:45",
      status: "Failed",
      pages: 3,
      size: "1.1 MB",
      type: "Update",
      priority: "Low",
      department: "Inventory",
      tags: ["Inventory", "Update", "Status"],
      description: "Weekly inventory status update for retail locations",
      fromNumber: "+1 (555) 999-0000",
      deliveryTime: null,
      retryCount: 2,
      errorMessage: "Recipient line busy"
    },
    {
      id: "OUT-008",
      title: "Compliance Response",
      recipient: "Government Office",
      recipientNumber: "+1 (555) 890-1234",
      sentDate: "2024-01-13 15:00",
      status: "Pending",
      pages: 1,
      size: "0.5 MB",
      type: "Response",
      priority: "High",
      department: "Compliance",
      tags: ["Compliance", "Government", "Response"],
      description: "Response to annual compliance notice with required documentation",
      fromNumber: "+1 (555) 999-0000",
      deliveryTime: null,
      retryCount: 0
    }
  ])

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedFax, setSelectedFax] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedFax, setEditedFax] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')

  // Handle item selection
  const handleItemSelect = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId])
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId))
    }
  }

  // Handle show details
  const handleShowDetails = (fax: any) => {
    setSelectedFax(fax)
    setEditedFax({ ...fax })
    setIsEditing(false)
    setShowDetailsDialog(true)
  }

  // Handle edit
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Handle save edit
  const handleSaveEdit = () => {
    if (editedFax) {
      setOutboxFaxes(prev => 
        prev.map(fax => 
          fax.id === editedFax.id ? editedFax : fax
        )
      )
      setSelectedFax(editedFax)
      setIsEditing(false)
    }
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditedFax(selectedFax ? { ...selectedFax } : null)
    setIsEditing(false)
  }

  // Handle field change
  const handleFieldChange = (field: string, value: any) => {
    if (editedFax) {
      setEditedFax((prev: any) => ({ ...prev, [field]: value }))
    }
  }

  // Handle send again
  const handleSendAgain = (fax: any) => {
    // Store the fax data for the send-fax page
    if (typeof window !== 'undefined') {
      const sendAgainData = {
        recipient: fax.recipient,
        recipientNumber: fax.recipientNumber,
        subject: fax.title,
        notes: fax.description,
        // Add any other relevant data that should be pre-filled
        originalFaxId: fax.id
      }
      localStorage.setItem('send-again-data', JSON.stringify(sendAgainData))
      
      // Navigate to send-fax page
      window.location.href = '/send-fax'
    }
  }

  // Handle download
  const handleDownload = (fax: any) => {
    const content = `Sent Fax Details:
ID: ${fax.id}
Title: ${fax.title}
Type: ${fax.type}
Recipient: ${fax.recipient}
Recipient Number: ${fax.recipientNumber}
Sent Date: ${fax.sentDate}
Status: ${fax.status}
Pages: ${fax.pages}
Size: ${fax.size}
Priority: ${fax.priority}
Department: ${fax.department}
Tags: ${fax.tags.join(', ')}
Description: ${fax.description}
From Number: ${fax.fromNumber}
Delivery Time: ${fax.deliveryTime || 'Not delivered'}
Retry Count: ${fax.retryCount}
${fax.errorMessage ? `Error: ${fax.errorMessage}` : ''}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sent-${fax.id}-${fax.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle restore
  const handleRestore = (fax: any) => {
    // Remove from outbox list
    setOutboxFaxes(prev => prev.filter(item => item.id !== fax.id))
    alert(`"${fax.title}" has been restored from outbox.`)
  }

  // Handle delete
  const handleDelete = (faxId: string) => {
    setItemToDelete(faxId)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setOutboxFaxes(prev => prev.filter(item => item.id !== itemToDelete))
      setItemToDelete(null)
      setShowDeleteDialog(false)
    }
  }

  // Handle bulk operations
  const handleBulkDownload = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to download.')
      return
    }
    
    const selectedFaxes = outboxFaxes.filter(fax => selectedItems.includes(fax.id))
    const content = selectedFaxes.map(fax => 
      `ID: ${fax.id} | Title: ${fax.title} | Type: ${fax.type} | Recipient: ${fax.recipient} | Sent: ${fax.sentDate} | Status: ${fax.status}`
    ).join('\n')
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bulk-sent-faxes-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleBulkRestore = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to restore.')
      return
    }
    
    setOutboxFaxes(prev => prev.filter(item => !selectedItems.includes(item.id)))
    setSelectedItems([])
    alert(`${selectedItems.length} items have been restored from outbox.`)
  }

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to delete.')
      return
    }
    
    if (confirm(`Are you sure you want to permanently delete ${selectedItems.length} items?`)) {
      setOutboxFaxes(prev => prev.filter(item => !selectedItems.includes(item.id)))
      setSelectedItems([])
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Invoice": return "bg-green-100 text-green-800"
      case "Proposal": return "bg-blue-100 text-blue-800"
      case "Response": return "bg-purple-100 text-purple-800"
      case "Acknowledgment": return "bg-orange-100 text-orange-800"
      case "Documentation": return "bg-pink-100 text-pink-800"
      case "Report": return "bg-red-100 text-red-800"
      case "Update": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800"
      case "Failed": return "bg-red-100 text-red-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Normal": return "bg-blue-100 text-blue-800"
      case "Low": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Total Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">10.3 MB</div>
                <div className="text-sm text-muted-foreground">Total Size</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Recipients</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm text-muted-foreground">Total Pages</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Search / Filter</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder="Keyword" />
          <Input placeholder="Tags" />
          <Input placeholder="Sender/Recipient" />
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBulkDownload}>
              Export Selected
            </Button>
            <Button variant="outline" onClick={handleBulkDelete} className="text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outboxFaxes.map((fax) => (
            <Card key={fax.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium line-clamp-2">{fax.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleShowDetails(fax)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedFax(fax)
                        setEditedFax({ ...fax })
                        setIsEditing(true)
                        setShowDetailsDialog(true)
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendAgain(fax)}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Again
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(fax.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Document Preview */}
                <div className="h-24 rounded-md bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-blue-200 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
                
                {/* Basic Info Only */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{fax.title}</span>
                    <Badge className={getStatusColor(fax.status)}>
                      {fax.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recipient:</span>
                      <span className="font-medium">{fax.recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sent:</span>
                      <span>{fax.sentDate}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {fax.description}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 min-w-0 text-xs"
                      onClick={() => handleSendAgain(fax)}
                    >
                      <Send className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Resend</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 min-w-0 text-xs"
                      onClick={() => handleDelete(fax.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium">Recipient</th>
                    <th className="p-4 font-medium">Sent Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Pages</th>
                    <th className="p-4 font-medium">Size</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {outboxFaxes.map((fax) => (
                    <tr key={fax.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium text-sm">{fax.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {fax.description}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{fax.recipient}</div>
                        <div className="text-xs text-muted-foreground">{fax.recipientNumber}</div>
                      </td>
                      <td className="p-4 text-sm">{fax.sentDate}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(fax.status)}>
                          {fax.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getTypeColor(fax.type)}>
                          {fax.type}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{fax.pages}</td>
                      <td className="p-4 text-sm">{fax.size}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem onClick={() => handleShowDetails(fax)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedFax(fax)
                                setEditedFax({ ...fax })
                                setIsEditing(true)
                                setShowDetailsDialog(true)
                              }}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendAgain(fax)}>
                                <Send className="h-4 w-4 mr-2" />
                                Send Again
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(fax.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to permanently delete this sent fax?</p>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. The sent fax will be permanently removed from the outbox.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete Permanently
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fax Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Fax Details - {selectedFax?.title}</span>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedFax && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">From:</label>
                  {isEditing ? (
                    <Input
                      value={editedFax?.fromNumber || ''}
                      onChange={(e) => handleFieldChange('fromNumber', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">Your Company ({selectedFax.fromNumber})</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">To:</label>
                  {isEditing ? (
                    <Input
                      value={editedFax?.recipient || ''}
                      onChange={(e) => handleFieldChange('recipient', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.recipient} ({selectedFax.recipientNumber})</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Pages:</label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedFax?.pages || ''}
                      onChange={(e) => handleFieldChange('pages', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.pages}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Size:</label>
                  {isEditing ? (
                    <Input
                      value={editedFax?.size || ''}
                      onChange={(e) => handleFieldChange('size', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.size}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Type:</label>
                  {isEditing ? (
                    <Select value={editedFax?.type || ''} onValueChange={(value) => handleFieldChange('type', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Invoice">Invoice</SelectItem>
                        <SelectItem value="Proposal">Proposal</SelectItem>
                        <SelectItem value="Response">Response</SelectItem>
                        <SelectItem value="Acknowledgment">Acknowledgment</SelectItem>
                        <SelectItem value="Documentation">Documentation</SelectItem>
                        <SelectItem value="Report">Report</SelectItem>
                        <SelectItem value="Update">Update</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <Badge className={getTypeColor(selectedFax.type)}>
                        {selectedFax.type}
                      </Badge>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Priority:</label>
                  {isEditing ? (
                    <Select value={editedFax?.priority || ''} onValueChange={(value) => handleFieldChange('priority', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <Badge className={getPriorityColor(selectedFax.priority)}>
                        {selectedFax.priority}
                      </Badge>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Recipient Number:</label>
                  {isEditing ? (
                    <Input
                      value={editedFax?.recipientNumber || ''}
                      onChange={(e) => handleFieldChange('recipientNumber', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.recipientNumber}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Sent Date:</label>
                  {isEditing ? (
                    <Input
                      value={editedFax?.sentDate || ''}
                      onChange={(e) => handleFieldChange('sentDate', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.sentDate}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Status:</label>
                  {isEditing ? (
                    <Select value={editedFax?.status || ''} onValueChange={(value) => handleFieldChange('status', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <Badge className={getStatusColor(selectedFax.status)}>
                        {selectedFax.status}
                      </Badge>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Priority:</label>
                  {isEditing ? (
                    <Select value={editedFax?.priority || ''} onValueChange={(value) => handleFieldChange('priority', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <Badge className={getPriorityColor(selectedFax.priority)}>
                        {selectedFax.priority}
                      </Badge>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Type:</label>
                  {isEditing ? (
                    <Select value={editedFax?.type || ''} onValueChange={(value) => handleFieldChange('type', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Invoice">Invoice</SelectItem>
                        <SelectItem value="Proposal">Proposal</SelectItem>
                        <SelectItem value="Response">Response</SelectItem>
                        <SelectItem value="Acknowledgment">Acknowledgment</SelectItem>
                        <SelectItem value="Documentation">Documentation</SelectItem>
                        <SelectItem value="Report">Report</SelectItem>
                        <SelectItem value="Update">Update</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <Badge className={getTypeColor(selectedFax.type)}>
                        {selectedFax.type}
                      </Badge>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Pages:</label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedFax?.pages || ''}
                      onChange={(e) => handleFieldChange('pages', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.pages}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Size:</label>
                  {isEditing ? (
                    <Input
                      value={editedFax?.size || ''}
                      onChange={(e) => handleFieldChange('size', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.size}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Department:</label>
                  {isEditing ? (
                    <Input
                      value={editedFax?.department || ''}
                      onChange={(e) => handleFieldChange('department', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.department}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Delivery Time:</label>
                  {isEditing ? (
                    <Input
                      value={editedFax?.deliveryTime || ''}
                      onChange={(e) => handleFieldChange('deliveryTime', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.deliveryTime || 'Not delivered'}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Retry Count:</label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedFax?.retryCount || ''}
                      onChange={(e) => handleFieldChange('retryCount', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">{selectedFax.retryCount}</div>
                  )}
                </div>
                {selectedFax.errorMessage && (
                  <div>
                    <label className="text-sm font-medium">Error:</label>
                    {isEditing ? (
                      <Input
                        value={editedFax?.errorMessage || ''}
                        onChange={(e) => handleFieldChange('errorMessage', e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="text-sm text-red-600">{selectedFax.errorMessage}</div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Tags:</label>
                {isEditing ? (
                  <Input
                    value={editedFax?.tags?.join(', ') || ''}
                    onChange={(e) => handleFieldChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
                    placeholder="Enter tags separated by commas"
                    className="mt-1"
                  />
                ) : (
                  <div className="flex gap-2 mt-1">
                    {selectedFax.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Description:</label>
                {isEditing ? (
                  <Textarea
                    value={editedFax?.description || ''}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <div className="text-sm text-muted-foreground mt-1 p-3 bg-gray-50 rounded-md">
                    {selectedFax.description}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                      Close
                    </Button>
                    <Button onClick={() => handleDownload(selectedFax)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
