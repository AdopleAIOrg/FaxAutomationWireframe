"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Phone, Shield, AlertTriangle, Plus, Trash2, Edit } from "lucide-react"

export default function BlockedNumbersPage() {
  const [blockedNumbers, setBlockedNumbers] = useState([
    {
      id: "BLK-001",
      number: "+1 (555) 123-4567",
      name: "Spam Caller",
      reason: "Spam/Scam",
      blockedDate: "2024-01-15",
      blockedBy: "System",
      status: "Active",
      attempts: 3,
      lastAttempt: "2024-01-14"
    },
    {
      id: "BLK-002",
      number: "+1 (555) 987-6543",
      name: "Unknown Caller",
      reason: "Suspicious Activity",
      blockedDate: "2024-01-12",
      blockedBy: "Admin",
      status: "Active",
      attempts: 1,
      lastAttempt: "2024-01-12"
    },
    {
      id: "BLK-003",
      number: "+1 (555) 456-7890",
      name: "Marketing Company",
      reason: "Unwanted Marketing",
      blockedDate: "2024-01-10",
      blockedBy: "User",
      status: "Active",
      attempts: 5,
      lastAttempt: "2024-01-09"
    },
    {
      id: "BLK-004",
      number: "+1 (555) 321-0987",
      name: "Robocaller",
      reason: "Automated Calls",
      blockedDate: "2024-01-08",
      blockedBy: "System",
      status: "Active",
      attempts: 8,
      lastAttempt: "2024-01-07"
    },
    {
      id: "BLK-005",
      number: "+1 (555) 654-3210",
      name: "Telemarketer",
      reason: "Sales Calls",
      blockedDate: "2024-01-05",
      blockedBy: "User",
      status: "Active",
      attempts: 2,
      lastAttempt: "2024-01-04"
    },
    {
      id: "BLK-006",
      number: "+1 (555) 789-0123",
      name: "Unknown",
      reason: "Harassment",
      blockedDate: "2024-01-03",
      blockedBy: "Admin",
      status: "Active",
      attempts: 4,
      lastAttempt: "2024-01-02"
    }
  ])

  const [editingNumber, setEditingNumber] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newNumber, setNewNumber] = useState("")
  const [newName, setNewName] = useState("")
  const [newReason, setNewReason] = useState("")

  // Handle edit
  const handleEdit = (number: any) => {
    setEditingNumber(number)
    setShowEditDialog(true)
  }

  // Handle remove
  const handleRemove = (numberId: string) => {
    if (confirm('Are you sure you want to unblock this number?')) {
      setBlockedNumbers(prev => prev.filter(number => number.id !== numberId))
    }
  }

  // Handle add new blocked number
  const handleAddNumber = () => {
    if (!newNumber.trim()) {
      alert('Please enter a phone number.')
      return
    }
    
    const newBlockedNumber = {
      id: `BLK-${Date.now()}`,
      number: newNumber,
      name: newName || "Unknown",
      reason: newReason || "Manual Block",
      blockedDate: new Date().toISOString().split('T')[0],
      blockedBy: "User",
      status: "Active",
      attempts: 0,
      lastAttempt: "Never"
    }
    
    setBlockedNumbers(prev => [...prev, newBlockedNumber])
    setNewNumber("")
    setNewName("")
    setNewReason("")
    alert(`"${newNumber}" has been added to the blocked list.`)
  }

  // Handle save edit
  const handleSaveEdit = (updatedNumber: any) => {
    setBlockedNumbers(prev => 
      prev.map(number => 
        number.id === updatedNumber.id 
          ? { ...updatedNumber, blockedDate: new Date().toISOString().split('T')[0] }
          : number
      )
    )
    setShowEditDialog(false)
    setEditingNumber(null)
  }

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case "Spam/Scam": return "bg-red-100 text-red-800"
      case "Suspicious Activity": return "bg-orange-100 text-orange-800"
      case "Unwanted Marketing": return "bg-yellow-100 text-yellow-800"
      case "Automated Calls": return "bg-purple-100 text-purple-800"
      case "Sales Calls": return "bg-blue-100 text-blue-800"
      case "Harassment": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blocked Numbers</h1>
        <p className="text-muted-foreground">
          Manage your blocked phone numbers and call restrictions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">Total Blocked</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Total Attempts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Block Success</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Blocked Number */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Blocked Number
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input 
              placeholder="Phone Number" 
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
            <Input 
              placeholder="Name (Optional)" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Select value={newReason} onValueChange={setNewReason}>
              <SelectTrigger>
                <SelectValue placeholder="Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spam/Scam">Spam/Scam</SelectItem>
                <SelectItem value="Suspicious Activity">Suspicious Activity</SelectItem>
                <SelectItem value="Unwanted Marketing">Unwanted Marketing</SelectItem>
                <SelectItem value="Automated Calls">Automated Calls</SelectItem>
                <SelectItem value="Manual Block">Manual Block</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddNumber}>Add to Block List</Button>
          </div>
        </CardContent>
      </Card>

      {/* Blocked Numbers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blocked Numbers List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Blocked Date</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedNumbers.map((number) => (
                <TableRow key={number.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {number.number}
                    </div>
                  </TableCell>
                  <TableCell>{number.name}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getReasonColor(number.reason)}`}>
                      {number.reason}
                    </Badge>
                  </TableCell>
                  <TableCell>{number.blockedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{number.attempts}</span>
                      <span className="text-xs text-muted-foreground">
                        (last: {number.lastAttempt})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(number.status)}`}>
                      {number.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => handleEdit(number)}
                      >
                        <Edit className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">Edit</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs text-red-600 hover:text-red-700"
                        onClick={() => handleRemove(number.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">Remove</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Blocked Number - {editingNumber?.number}</DialogTitle>
          </DialogHeader>
          {editingNumber && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input 
                    value={editingNumber.number} 
                    onChange={(e) => setEditingNumber({...editingNumber, number: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    value={editingNumber.name} 
                    onChange={(e) => setEditingNumber({...editingNumber, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Reason</label>
                  <Select 
                    value={editingNumber.reason} 
                    onValueChange={(value) => setEditingNumber({...editingNumber, reason: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spam/Scam">Spam/Scam</SelectItem>
                      <SelectItem value="Suspicious Activity">Suspicious Activity</SelectItem>
                      <SelectItem value="Unwanted Marketing">Unwanted Marketing</SelectItem>
                      <SelectItem value="Automated Calls">Automated Calls</SelectItem>
                      <SelectItem value="Manual Block">Manual Block</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={editingNumber.status} 
                    onValueChange={(value) => setEditingNumber({...editingNumber, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveEdit(editingNumber)}>
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

