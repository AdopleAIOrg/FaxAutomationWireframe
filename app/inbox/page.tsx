"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { Download, Eye, Trash2, FileText, User, Calendar, Clock, Mail, Grid3X3, List } from "lucide-react"

export default function InboxPage() {
  const [inboxFaxes, setInboxFaxes] = useState([
    {
      id: "IN-001",
      sender: "+1 (555) 123-4567",
      senderName: "Acme Corporation",
      subject: "Invoice #INV-2024-001",
      receivedDate: "2024-01-20 10:30",
      status: "New",
      pages: 3,
      priority: "Normal",
      department: "Finance",
      tags: ["Invoice", "Payment"],
      content: "Please find attached invoice for services rendered in January 2024. Payment is due within 30 days.",
      attachment: "invoice_2024_001.pdf",
      fromNumber: "+1 (555) 123-4567",
      toNumber: "+1 (555) 999-0000"
    },
    {
      id: "IN-002", 
      sender: "+1 (555) 234-5678",
      senderName: "Tech Solutions Inc",
      subject: "Contract Renewal Proposal",
      receivedDate: "2024-01-19 14:15",
      status: "Read",
      pages: 8,
      priority: "High",
      department: "Legal",
      tags: ["Contract", "Renewal"],
      content: "We would like to discuss renewing our service contract for another year. Please review the attached terms and conditions.",
      attachment: "contract_renewal_2024.pdf",
      fromNumber: "+1 (555) 234-5678",
      toNumber: "+1 (555) 999-0000"
    },
    {
      id: "IN-003",
      sender: "+1 (555) 345-6789", 
      senderName: "Medical Center",
      subject: "Patient Records Request",
      receivedDate: "2024-01-18 09:45",
      status: "New",
      pages: 5,
      priority: "High",
      department: "Medical",
      tags: ["Medical", "Records"],
      content: "Requesting patient medical records for insurance claim processing. Please expedite this request.",
      attachment: "patient_records_request.pdf",
      fromNumber: "+1 (555) 345-6789",
      toNumber: "+1 (555) 999-0000"
    },
    {
      id: "IN-004",
      sender: "+1 (555) 456-7890",
      senderName: "Law Firm Associates",
      subject: "Legal Notice - Litigation",
      receivedDate: "2024-01-17 16:20",
      status: "Read",
      pages: 2,
      priority: "Normal",
      department: "Legal",
      tags: ["Legal", "Notice"],
      content: "Official legal notice regarding pending litigation. Please acknowledge receipt of this document.",
      attachment: "legal_notice_2024.pdf",
      fromNumber: "+1 (555) 456-7890",
      toNumber: "+1 (555) 999-0000"
    },
    {
      id: "IN-005",
      sender: "+1 (555) 567-8901",
      senderName: "Insurance Company",
      subject: "Claim Documentation Required",
      receivedDate: "2024-01-16 11:10",
      status: "Processed",
      pages: 4,
      priority: "Normal",
      department: "Insurance",
      tags: ["Claim", "Documentation"],
      content: "Additional documentation required for claim processing. Please provide within 5 business days.",
      attachment: "claim_docs_required.pdf",
      fromNumber: "+1 (555) 567-8901",
      toNumber: "+1 (555) 999-0000"
    },
    {
      id: "IN-006",
      sender: "+1 (555) 678-9012",
      senderName: "Manufacturing Corp",
      subject: "Safety Compliance Report",
      receivedDate: "2024-01-15 13:30",
      status: "Read",
      pages: 6,
      priority: "Normal",
      department: "Safety",
      tags: ["Safety", "Report"],
      content: "Monthly safety compliance report for December 2023. All metrics within acceptable limits.",
      attachment: "safety_report_dec_2023.pdf",
      fromNumber: "+1 (555) 678-9012",
      toNumber: "+1 (555) 999-0000"
    },
    {
      id: "IN-007",
      sender: "+1 (555) 789-0123",
      senderName: "Retail Chain",
      subject: "Weekly Inventory Report",
      receivedDate: "2024-01-14 08:45",
      status: "New",
      pages: 3,
      priority: "Low",
      department: "Inventory",
      tags: ["Inventory", "Report"],
      content: "Weekly inventory status update. Stock levels are optimal across all locations.",
      attachment: "inventory_report_week2.pdf",
      fromNumber: "+1 (555) 789-0123",
      toNumber: "+1 (555) 999-0000"
    },
    {
      id: "IN-008",
      sender: "+1 (555) 890-1234",
      senderName: "Government Office",
      subject: "Annual Compliance Notice",
      receivedDate: "2024-01-13 15:00",
      status: "Read",
      pages: 1,
      priority: "High",
      department: "Compliance",
      tags: ["Compliance", "Government"],
      content: "Annual compliance notice. Please review and respond by the specified deadline.",
      attachment: "compliance_notice_2024.pdf",
      fromNumber: "+1 (555) 890-1234",
      toNumber: "+1 (555) 999-0000"
    }
  ])

  const [selectedFax, setSelectedFax] = useState<any>(null)
  const [showFaxDialog, setShowFaxDialog] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Filter faxes based on search and filters
  const filteredFaxes = inboxFaxes.filter(fax => {
    const matchesSearch = fax.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fax.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fax.sender.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || fax.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || fax.priority.toLowerCase() === priorityFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewFax = (fax: any) => {
    setSelectedFax(fax)
    setShowFaxDialog(true)
  }

  const handleDownloadFax = (fax: any) => {
    const content = `Inbox Fax Details:
ID: ${fax.id}
Sender: ${fax.senderName} (${fax.sender})
Subject: ${fax.subject}
Received: ${fax.receivedDate}
Status: ${fax.status}
Priority: ${fax.priority}
Pages: ${fax.pages}
Department: ${fax.department}
Tags: ${fax.tags.join(', ')}
Content: ${fax.content}
Attachment: ${fax.attachment}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inbox-fax-${fax.id}-${fax.subject.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDeleteFax = (faxId: string) => {
    if (confirm('Are you sure you want to delete this fax from inbox?')) {
      setInboxFaxes(prev => prev.filter(fax => fax.id !== faxId))
    }
  }

  const handleMarkAsRead = (faxId: string) => {
    setInboxFaxes(prev => 
      prev.map(fax => 
        fax.id === faxId 
          ? { ...fax, status: "Read" }
          : fax
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800"
      case "Read": return "bg-green-100 text-green-800"
      case "Processed": return "bg-gray-100 text-gray-800"
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

  const getStatusCounts = () => {
    return {
      total: inboxFaxes.length,
      new: inboxFaxes.filter(fax => fax.status === "New").length,
      read: inboxFaxes.filter(fax => fax.status === "Read").length,
      processed: inboxFaxes.filter(fax => fax.status === "Processed").length
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{statusCounts.total}</div>
                <div className="text-sm text-muted-foreground">Total Received</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{statusCounts.new}</div>
                <div className="text-sm text-muted-foreground">New</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{statusCounts.read}</div>
                <div className="text-sm text-muted-foreground">Read</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{statusCounts.processed}</div>
                <div className="text-sm text-muted-foreground">Processed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by sender, subject, or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="processed">Processed</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFaxes.map((fax) => (
            <Card key={fax.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium line-clamp-2">{fax.subject}</CardTitle>
                  <Badge className={getStatusColor(fax.status)}>
                    {fax.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Document Preview */}
                <div className="h-24 rounded-md bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-dashed border-green-200 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-green-400" />
                </div>
                
                {/* Basic Info */}
                <div className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">From:</span>
                      <span className="font-medium">{fax.senderName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Received:</span>
                      <span>{fax.receivedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Priority:</span>
                      <Badge className={getPriorityColor(fax.priority)}>
                        {fax.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pages:</span>
                      <span>{fax.pages}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {fax.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {fax.content}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 min-w-0 text-xs"
                      onClick={() => handleViewFax(fax)}
                    >
                      <Eye className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">View</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 min-w-0 text-xs"
                      onClick={() => handleDownloadFax(fax)}
                    >
                      <Download className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Download</span>
                    </Button>
                    {fax.status === "New" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 min-w-0 text-xs"
                        onClick={() => handleMarkAsRead(fax.id)}
                      >
                        <span className="truncate">Mark Read</span>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 min-w-0 text-xs"
                      onClick={() => handleDeleteFax(fax.id)}
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
          <CardHeader>
            <CardTitle>Inbox ({filteredFaxes.length} of {inboxFaxes.length} total)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaxes.map((fax) => (
                  <TableRow key={fax.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{fax.senderName}</div>
                        <div className="text-sm text-muted-foreground">{fax.sender}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{fax.subject}</div>
                      <div className="text-sm text-muted-foreground">{fax.department}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{fax.receivedDate}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(fax.status)}>
                        {fax.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(fax.priority)}>
                        {fax.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{fax.pages}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewFax(fax)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadFax(fax)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        {fax.status === "New" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsRead(fax.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteFax(fax.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Fax Details Dialog */}
      <Dialog open={showFaxDialog} onOpenChange={setShowFaxDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Fax Details - {selectedFax?.subject}</DialogTitle>
          </DialogHeader>
          {selectedFax && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">From:</label>
                  <div className="text-sm text-muted-foreground">{selectedFax.senderName} ({selectedFax.sender})</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Received:</label>
                  <div className="text-sm text-muted-foreground">{selectedFax.receivedDate}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Status:</label>
                  <div className="text-sm text-muted-foreground">{selectedFax.status}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority:</label>
                  <div className="text-sm text-muted-foreground">{selectedFax.priority}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Pages:</label>
                  <div className="text-sm text-muted-foreground">{selectedFax.pages}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Department:</label>
                  <div className="text-sm text-muted-foreground">{selectedFax.department}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">From Number:</label>
                  <div className="text-sm text-muted-foreground">{selectedFax.fromNumber}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">To Number:</label>
                  <div className="text-sm text-muted-foreground">{selectedFax.toNumber}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Tags:</label>
                <div className="flex gap-2 mt-1">
                  {selectedFax.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Content:</label>
                <div className="text-sm text-muted-foreground mt-1 p-3 bg-gray-50 rounded-md">
                  {selectedFax.content}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Attachment:</label>
                <div className="text-sm text-muted-foreground">{selectedFax.attachment}</div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowFaxDialog(false)}>
                  Close
                </Button>
                <Button onClick={() => handleDownloadFax(selectedFax)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
