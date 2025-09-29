"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Phone, Edit, Trash2, User } from "lucide-react"

export default function NumbersPage() {
  const [phoneNumbers, setPhoneNumbers] = useState([
    {
      id: "PN-001",
      number: "+1 (555) 123-4567",
      owner: "John Smith",
      department: "Sales",
      status: "Active",
      type: "Toll-Free",
      monthlyUsage: 156,
      lastUsed: "2024-01-15 14:30",
      cost: "$12.50",
      features: ["Fax", "Voice", "SMS"]
    },
    {
      id: "PN-002",
      number: "+1 (555) 234-5678",
      owner: "Sarah Johnson",
      department: "Support",
      status: "Active",
      type: "Local",
      monthlyUsage: 89,
      lastUsed: "2024-01-15 11:45",
      cost: "$8.25",
      features: ["Fax", "Voice"]
    },
    {
      id: "PN-003",
      number: "+1 (555) 345-6789",
      owner: "Mike Wilson",
      department: "Marketing",
      status: "Active",
      type: "Toll-Free",
      monthlyUsage: 234,
      lastUsed: "2024-01-15 09:20",
      cost: "$18.75",
      features: ["Fax", "Voice", "SMS", "Voicemail"]
    },
    {
      id: "PN-004",
      number: "+1 (555) 456-7890",
      owner: "Lisa Brown",
      department: "HR",
      status: "Inactive",
      type: "Local",
      monthlyUsage: 12,
      lastUsed: "2024-01-10 16:15",
      cost: "$3.50",
      features: ["Fax"]
    },
    {
      id: "PN-005",
      number: "+1 (555) 567-8901",
      owner: "David Lee",
      department: "Legal",
      status: "Active",
      type: "Toll-Free",
      monthlyUsage: 67,
      lastUsed: "2024-01-14 13:30",
      cost: "$9.80",
      features: ["Fax", "Voice", "Recording"]
    },
    {
      id: "PN-006",
      number: "+1 (555) 678-9012",
      owner: "Emily Davis",
      department: "Finance",
      status: "Active",
      type: "Local",
      monthlyUsage: 45,
      lastUsed: "2024-01-14 10:45",
      cost: "$6.25",
      features: ["Fax", "Voice"]
    },
    {
      id: "PN-007",
      number: "+1 (555) 789-0123",
      owner: "Robert Taylor",
      department: "Operations",
      status: "Pending",
      type: "Toll-Free",
      monthlyUsage: 0,
      lastUsed: "Never",
      cost: "$0.00",
      features: ["Fax", "Voice"]
    },
    {
      id: "PN-008",
      number: "+1 (555) 890-1234",
      owner: "Jennifer White",
      department: "Customer Service",
      status: "Active",
      type: "Local",
      monthlyUsage: 178,
      lastUsed: "2024-01-13 12:10",
      cost: "$15.60",
      features: ["Fax", "Voice", "SMS", "Voicemail"]
    }
  ])

  const [editingNumber, setEditingNumber] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)

  // Handle edit
  const handleEdit = (number: any) => {
    setEditingNumber(number)
    setShowEditDialog(true)
  }

  // Handle delete
  const handleDelete = (numberId: string) => {
    if (confirm('Are you sure you want to delete this phone number?')) {
      setPhoneNumbers(prev => prev.filter(number => number.id !== numberId))
    }
  }

  // Handle assign to send-fax
  const handleAssign = (number: any) => {
    // Store number data for send-fax page
    if (typeof window !== 'undefined') {
      const numberData = {
        id: number.id,
        number: number.number,
        owner: number.owner,
        department: number.department
      }
      localStorage.setItem('selected-fax-number', JSON.stringify(numberData))
    }
    alert(`"${number.number}" has been selected for fax sending. Navigate to Send Fax page to use it.`)
  }

  // Handle save edit
  const handleSaveEdit = (updatedNumber: any) => {
    setPhoneNumbers(prev => 
      prev.map(number => 
        number.id === updatedNumber.id 
          ? { ...updatedNumber, lastUsed: new Date().toISOString().split('T')[0] + ' 12:00' }
          : number
      )
    )
    setShowEditDialog(false)
    setEditingNumber(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800"
      case "Inactive": return "bg-gray-100 text-gray-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Toll-Free": return "bg-blue-100 text-blue-800"
      case "Local": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const totalNumbers = phoneNumbers.length
  const activeNumbers = phoneNumbers.filter(n => n.status === "Active").length
  const totalUsage = phoneNumbers.reduce((sum, n) => sum + n.monthlyUsage, 0)
  const totalCost = phoneNumbers.reduce((sum, n) => sum + parseFloat(n.cost.replace('$', '')), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Phone Numbers</h1>
          <p className="text-muted-foreground">Manage your fax phone numbers and assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Provision New</Button>
          <Button variant="outline">Port Number</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNumbers}</div>
            <p className="text-xs text-muted-foreground">{activeNumbers} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage}</div>
            <p className="text-xs text-muted-foreground">faxes sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((activeNumbers / totalNumbers) * 100)}%</div>
            <Progress value={(activeNumbers / totalNumbers) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Numbers ({totalNumbers} total)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Owner & Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {phoneNumbers.map((number) => (
                <TableRow key={number.id}>
                  <TableCell className="font-mono font-medium">
                    {number.number}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{number.owner}</div>
                      <div className="text-sm text-muted-foreground">{number.department}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(number.type)}>
                      {number.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(number.status)}>
                      {number.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{number.monthlyUsage}</div>
                      <div className="text-sm text-muted-foreground">Last: {number.lastUsed}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{number.cost}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {number.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAssign(number)}
                    >
                      Assign
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(number)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(number.id)}
                    >
                      Delete
                    </Button>
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
            <DialogTitle>Edit Phone Number - {editingNumber?.number}</DialogTitle>
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
                  <label className="text-sm font-medium">Owner</label>
                  <Input 
                    value={editingNumber.owner} 
                    onChange={(e) => setEditingNumber({...editingNumber, owner: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Input 
                    value={editingNumber.department} 
                    onChange={(e) => setEditingNumber({...editingNumber, department: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select 
                    value={editingNumber.type} 
                    onValueChange={(value) => setEditingNumber({...editingNumber, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toll-Free">Toll-Free</SelectItem>
                      <SelectItem value="Local">Local</SelectItem>
                      <SelectItem value="International">International</SelectItem>
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
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Monthly Cost</label>
                  <Input 
                    value={editingNumber.cost} 
                    onChange={(e) => setEditingNumber({...editingNumber, cost: e.target.value})}
                  />
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
