"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useState, useEffect } from "react"
import { Calendar as CalendarIcon, Clock, Plus, Edit, Trash2 } from "lucide-react"

export default function SchedulingPage() {
  const [isClient, setIsClient] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Get current month data
  const getCurrentMonthData = (date: Date) => {
    const now = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    // Get first day of week (Sunday = 0)
    const firstDayOfWeek = firstDay.getDay()
    
    // Get last day of previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    
    const weeks = []
    let currentWeek = []
    
    // Add previous month's days to fill the first week
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      currentWeek.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false
      })
    }
    
    // Add current month's days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear()
      currentWeek.push({
        date: day,
        isCurrentMonth: true,
        isToday: isToday
      })
      
      // If we have 7 days, start a new week
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek])
        currentWeek = []
      }
    }
    
    // Add next month's days to fill the last week
    let nextMonthDay = 1
    while (currentWeek.length < 7 && currentWeek.length > 0) {
      currentWeek.push({
        date: nextMonthDay,
        isCurrentMonth: false,
        isToday: false
      })
      nextMonthDay++
    }
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }
    
    return weeks
  }
  
  const monthData = getCurrentMonthData(currentDate)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const currentMonthName = monthNames[currentDate.getMonth()]
  const currentYear = currentDate.getFullYear()
  const [scheduledFaxes, setScheduledFaxes] = useState([
    {
      id: "SF-001",
      recipient: "+1 (555) 123-4567",
      recipientName: "Acme Corp",
      document: "Invoice #INV-2024-001.pdf",
      scheduledDate: "2024-01-20 10:00",
      status: "Scheduled",
      priority: "Normal",
      pages: 3,
      notes: "Monthly invoice for January 2024"
    },
    {
      id: "SF-002",
      recipient: "+1 (555) 234-5678",
      recipientName: "Tech Solutions Inc",
      document: "Contract Agreement.pdf",
      scheduledDate: "2024-01-21 14:30",
      status: "Scheduled",
      priority: "High",
      pages: 12,
      notes: "Contract renewal documents"
    },
    {
      id: "SF-003",
      recipient: "+1 (555) 345-6789",
      recipientName: "Global Industries",
      document: "Report Q4 2023.pdf",
      scheduledDate: "2024-01-22 09:15",
      status: "Scheduled",
      priority: "Normal",
      pages: 8,
      notes: "Quarterly business report"
    },
    {
      id: "SF-004",
      recipient: "+1 (555) 456-7890",
      recipientName: "Medical Center",
      document: "Patient Records.pdf",
      scheduledDate: "2024-01-23 16:45",
      status: "Scheduled",
      priority: "High",
      pages: 5,
      notes: "Confidential patient information"
    },
    {
      id: "SF-005",
      recipient: "+1 (555) 567-8901",
      recipientName: "Law Firm Associates",
      document: "Legal Brief.pdf",
      scheduledDate: "2024-01-24 11:30",
      status: "Scheduled",
      priority: "Normal",
      pages: 15,
      notes: "Legal documentation for case"
    },
    {
      id: "SF-006",
      recipient: "+1 (555) 678-9012",
      recipientName: "Insurance Co",
      document: "Claim Form.pdf",
      scheduledDate: "2024-01-25 13:20",
      status: "Scheduled",
      priority: "Normal",
      pages: 2,
      notes: "Insurance claim documentation"
    },
    {
      id: "SF-007",
      recipient: "+1 (555) 789-0123",
      recipientName: "Manufacturing Corp",
      document: "Safety Report.pdf",
      scheduledDate: "2024-01-26 08:00",
      status: "Scheduled",
      priority: "High",
      pages: 6,
      notes: "Monthly safety compliance report"
    },
    {
      id: "SF-008",
      recipient: "+1 (555) 890-1234",
      recipientName: "Retail Chain",
      document: "Inventory Report.pdf",
      scheduledDate: "2024-01-27 15:10",
      status: "Scheduled",
      priority: "Normal",
      pages: 4,
      notes: "Weekly inventory status update"
    }
  ])

  const [editingFax, setEditingFax] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [newFax, setNewFax] = useState({
    recipient: "",
    recipientName: "",
    document: "",
    scheduledDate: "",
    priority: "Normal",
    pages: 1,
    notes: ""
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle edit
  const handleEdit = (fax: any) => {
    setEditingFax(fax)
    setShowEditDialog(true)
  }

  // Handle delete
  const handleDelete = (faxId: string) => {
    if (confirm('Are you sure you want to delete this scheduled fax?')) {
      setScheduledFaxes(prev => prev.filter(fax => fax.id !== faxId))
    }
  }

  // Handle new schedule
  const handleNewSchedule = () => {
    setNewFax({
      recipient: "",
      recipientName: "",
      document: "",
      scheduledDate: "",
      priority: "Normal",
      pages: 1,
      notes: ""
    })
    setShowNewDialog(true)
  }

  // Handle save new
  const handleSaveNew = () => {
    if (!newFax.recipient || !newFax.document || !newFax.scheduledDate) {
      alert('Please fill in all required fields.')
      return
    }
    
    const newScheduledFax = {
      id: `SF-${Date.now()}`,
      ...newFax,
      status: "Scheduled"
    }
    
    setScheduledFaxes(prev => [...prev, newScheduledFax])
    setShowNewDialog(false)
    alert('New fax scheduled successfully!')
  }

  // Handle save edit
  const handleSaveEdit = (updatedFax: any) => {
    setScheduledFaxes(prev => 
      prev.map(fax => 
        fax.id === updatedFax.id 
          ? { ...updatedFax }
          : fax
      )
    )
    setShowEditDialog(false)
    setEditingFax(null)
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
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent className="p-6 min-h-[500px]">
          {isClient ? (
            <div className="w-full">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{currentMonthName} {currentYear}</h3>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  >
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  >
                    Next
                    <CalendarIcon className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                {/* Day Headers */}
                <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-300">
                  <div className="p-3 text-center font-medium text-gray-700 border-r border-gray-300">SUN</div>
                  <div className="p-3 text-center font-medium text-gray-700 border-r border-gray-300">MON</div>
                  <div className="p-3 text-center font-medium text-gray-700 border-r border-gray-300">TUES</div>
                  <div className="p-3 text-center font-medium text-gray-700 border-r border-gray-300">WED</div>
                  <div className="p-3 text-center font-medium text-gray-700 border-r border-gray-300">THUR</div>
                  <div className="p-3 text-center font-medium text-gray-700 border-r border-gray-300">FRI</div>
                  <div className="p-3 text-center font-medium text-gray-700">SAT</div>
                </div>
                
                {/* Calendar Rows */}
                <div className="grid grid-cols-7">
                  {monthData.map((week, weekIndex) => (
                    <React.Fragment key={weekIndex}>
                      {week.map((day, dayIndex) => (
                        <div 
                          key={`${weekIndex}-${dayIndex}`}
                          className={`min-h-[80px] border-r border-b border-gray-300 p-2 ${
                            day.isCurrentMonth 
                              ? day.isToday 
                                ? 'bg-blue-50 border-blue-200' 
                                : 'bg-white' 
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className={`text-xs mb-1 ${
                            day.isCurrentMonth 
                              ? day.isToday 
                                ? 'text-blue-600 font-bold' 
                                : 'text-gray-700' 
                              : 'text-gray-400'
                          }`}>
                            {day.date}
                          </div>
                          {day.isCurrentMonth && day.isToday && (
                            <div className="text-xs text-blue-600 font-medium">Today</div>
                          )}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center text-muted-foreground">
              Loading calendar...
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Scheduled Faxes ({scheduledFaxes.length} total)</CardTitle>
          <Button size="sm" onClick={handleNewSchedule}>
            <Plus className="h-4 w-4 mr-2" />
            New Schedule
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledFaxes.map((fax) => (
                <TableRow key={fax.id}>
                  <TableCell className="font-mono text-sm">
                    {fax.scheduledDate}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{fax.recipient}</div>
                      <div className="text-sm text-muted-foreground">{fax.recipientName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{fax.document}</div>
                      <div className="text-sm text-muted-foreground">{fax.pages} pages</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {fax.status}
                      </Badge>
                      <Badge className={getPriorityColor(fax.priority)}>
                        {fax.priority}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(fax)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(fax.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Schedule Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Fax</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Recipient Phone Number</label>
                <Input 
                  value={newFax.recipient} 
                  onChange={(e) => setNewFax({...newFax, recipient: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Recipient Name</label>
                <Input 
                  value={newFax.recipientName} 
                  onChange={(e) => setNewFax({...newFax, recipientName: e.target.value})}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Document Name</label>
                <Input 
                  value={newFax.document} 
                  onChange={(e) => setNewFax({...newFax, document: e.target.value})}
                  placeholder="Document.pdf"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Scheduled Date & Time</label>
                <Input 
                  type="datetime-local"
                  value={newFax.scheduledDate} 
                  onChange={(e) => setNewFax({...newFax, scheduledDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select 
                  value={newFax.priority} 
                  onValueChange={(value) => setNewFax({...newFax, priority: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Pages</label>
                <Input 
                  type="number"
                  value={newFax.pages} 
                  onChange={(e) => setNewFax({...newFax, pages: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea 
                value={newFax.notes} 
                onChange={(e) => setNewFax({...newFax, notes: e.target.value})}
                placeholder="Additional notes..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveNew}>
                Schedule Fax
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Scheduled Fax</DialogTitle>
          </DialogHeader>
          {editingFax && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Recipient Phone Number</label>
                  <Input 
                    value={editingFax.recipient} 
                    onChange={(e) => setEditingFax({...editingFax, recipient: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Recipient Name</label>
                  <Input 
                    value={editingFax.recipientName} 
                    onChange={(e) => setEditingFax({...editingFax, recipientName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Document Name</label>
                  <Input 
                    value={editingFax.document} 
                    onChange={(e) => setEditingFax({...editingFax, document: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Scheduled Date & Time</label>
                  <Input 
                    type="datetime-local"
                    value={editingFax.scheduledDate} 
                    onChange={(e) => setEditingFax({...editingFax, scheduledDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select 
                    value={editingFax.priority} 
                    onValueChange={(value) => setEditingFax({...editingFax, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Pages</label>
                  <Input 
                    type="number"
                    value={editingFax.pages} 
                    onChange={(e) => setEditingFax({...editingFax, pages: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea 
                  value={editingFax.notes} 
                  onChange={(e) => setEditingFax({...editingFax, notes: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveEdit(editingFax)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
