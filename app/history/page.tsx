"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, RotateCcw, Download, FileText, User, Calendar, Clock, AlertCircle } from "lucide-react"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tagsFilter, setTagsFilter] = useState("")
  const [filteredHistory, setFilteredHistory] = useState([])
  const [selectedFax, setSelectedFax] = useState(null)
  const [isClient, setIsClient] = useState(false)

  const faxHistory = [
    {
      id: "FX-001",
      date: "2024-01-15 14:30",
      sender: "John Smith",
      recipient: "+1 (555) 123-4567",
      recipientName: "Acme Corp",
      status: "Delivered",
      document: "Invoice #INV-2024-001.pdf",
      pages: 3,
      tags: ["billing", "urgent"],
      duration: "2.3s"
    },
    {
      id: "FX-002", 
      date: "2024-01-15 11:45",
      sender: "Sarah Johnson",
      recipient: "+1 (555) 234-5678",
      recipientName: "Tech Solutions Inc",
      status: "Delivered",
      document: "Contract Agreement.pdf",
      pages: 12,
      tags: ["legal", "contract"],
      duration: "1.8s"
    },
    {
      id: "FX-003",
      date: "2024-01-15 09:20",
      sender: "Mike Wilson",
      recipient: "+1 (555) 345-6789",
      recipientName: "Global Industries",
      status: "Failed",
      document: "Report Q4 2023.pdf",
      pages: 8,
      tags: ["report", "quarterly"],
      duration: "0.0s",
      error: "Line busy"
    },
    {
      id: "FX-004",
      date: "2024-01-14 16:15",
      sender: "Lisa Brown",
      recipient: "+1 (555) 456-7890",
      recipientName: "Medical Center",
      status: "Delivered",
      document: "Patient Records.pdf",
      pages: 5,
      tags: ["medical", "confidential"],
      duration: "3.1s"
    },
    {
      id: "FX-005",
      date: "2024-01-14 13:30",
      sender: "David Lee",
      recipient: "+1 (555) 567-8901",
      recipientName: "Law Firm Associates",
      status: "Scheduled",
      document: "Legal Brief.pdf",
      pages: 15,
      tags: ["legal", "scheduled"],
      duration: "N/A",
      scheduledFor: "2024-01-16 10:00"
    },
    {
      id: "FX-006",
      date: "2024-01-14 10:45",
      sender: "Emily Davis",
      recipient: "+1 (555) 678-9012",
      recipientName: "Insurance Co",
      status: "Delivered",
      document: "Claim Form.pdf",
      pages: 2,
      tags: ["insurance", "claim"],
      duration: "1.9s"
    },
    {
      id: "FX-007",
      date: "2024-01-13 15:20",
      sender: "Robert Taylor",
      recipient: "+1 (555) 789-0123",
      recipientName: "Manufacturing Corp",
      status: "Failed",
      document: "Safety Report.pdf",
      pages: 6,
      tags: ["safety", "compliance"],
      duration: "0.0s",
      error: "Invalid number"
    },
    {
      id: "FX-008",
      date: "2024-01-13 12:10",
      sender: "Jennifer White",
      recipient: "+1 (555) 890-1234",
      recipientName: "Retail Chain",
      status: "Delivered",
      document: "Inventory Report.pdf",
      pages: 4,
      tags: ["inventory", "monthly"],
      duration: "2.7s"
    },
    {
      id: "FX-009",
      date: "2024-01-13 09:30",
      sender: "Michael Garcia",
      recipient: "+1 (555) 901-2345",
      recipientName: "Real Estate Agency",
      status: "Delivered",
      document: "Property Listing.pdf",
      pages: 7,
      tags: ["real-estate", "listing"],
      duration: "2.1s"
    },
    {
      id: "FX-010",
      date: "2024-01-12 17:45",
      sender: "Amanda Martinez",
      recipient: "+1 (555) 012-3456",
      recipientName: "Consulting Firm",
      status: "Delivered",
      document: "Proposal.pdf",
      pages: 9,
      tags: ["proposal", "business"],
      duration: "2.8s"
    }
  ]

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter logic
  useEffect(() => {
    let filtered = faxHistory

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(fax => 
        fax.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fax.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fax.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fax.sender.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(fax => 
        fax.status.toLowerCase() === statusFilter.toLowerCase()
      )
    }

    // Tags filter
    if (tagsFilter) {
      const tagList = tagsFilter.toLowerCase().split(',').map(tag => tag.trim())
      filtered = filtered.filter(fax => 
        tagList.some(tag => fax.tags.some(faxTag => faxTag.toLowerCase().includes(tag)))
      )
    }

    setFilteredHistory(filtered)
  }, [searchTerm, statusFilter, tagsFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800"
      case "Failed": return "bg-red-100 text-red-800"
      case "Scheduled": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  // View fax details
  const handleViewFax = (fax: any) => {
    setSelectedFax(fax)
  }

  // Resend fax - navigate to send-fax with pre-filled data
  const handleResendFax = (fax: any) => {
    // Store fax data in localStorage for send-fax page to use
    if (typeof window !== 'undefined') {
      const resendData = {
        recipient: fax.recipient,
        recipientName: fax.recipientName,
        document: fax.document,
        subject: `Resend: ${fax.document}`,
        notes: `Resending fax originally sent on ${fax.date}`,
        tags: fax.tags
      }
      localStorage.setItem('resend-fax-data', JSON.stringify(resendData))
    }
    window.location.href = '/send-fax'
  }

  // Download fax
  const handleDownloadFax = (fax: any) => {
    // Create a mock download
    const content = `Fax Details:
ID: ${fax.id}
Date: ${fax.date}
Sender: ${fax.sender}
Recipient: ${fax.recipient} (${fax.recipientName})
Document: ${fax.document}
Status: ${fax.status}
Pages: ${fax.pages}
Duration: ${fax.duration}
Tags: ${fax.tags.join(', ')}
${fax.error ? `Error: ${fax.error}` : ''}
${fax.scheduledFor ? `Scheduled for: ${fax.scheduledFor}` : ''}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fax-${fax.id}-${fax.document}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Export CSV
  const handleExportCSV = () => {
    if (!isClient) return

    try {
      const headers = ['ID', 'Date', 'Sender', 'Recipient', 'Recipient Name', 'Document', 'Status', 'Pages', 'Duration', 'Tags', 'Error', 'Scheduled For']
      const csvContent = [
        headers.join(','),
        ...filteredHistory.map(fax => [
          fax.id,
          `"${fax.date}"`,
          `"${fax.sender}"`,
          `"${fax.recipient}"`,
          `"${fax.recipientName}"`,
          `"${fax.document}"`,
          `"${fax.status}"`,
          fax.pages,
          `"${fax.duration}"`,
          `"${fax.tags.join('; ')}"`,
          `"${fax.error || ''}"`,
          `"${fax.scheduledFor || ''}"`
        ].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `fax-history-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting CSV:', error)
      alert('Error exporting CSV. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input 
            placeholder="Recipient or document" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            placeholder="Tags (comma separated)" 
            value={tagsFilter}
            onChange={(e) => setTagsFilter(e.target.value)}
          />
          {isClient ? (
            <Button variant="outline" onClick={handleExportCSV}>
              Export CSV
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Export CSV
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fax History ({filteredHistory.length} of {faxHistory.length} total)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((fax) => (
                <TableRow key={fax.id}>
                  <TableCell className="font-mono text-sm">
                    {fax.date}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{fax.sender}</div>
                    </div>
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
                    <Badge className={getStatusColor(fax.status)}>
                      {fax.status}
                    </Badge>
                    {fax.error && (
                      <div className="text-xs text-red-600 mt-1">{fax.error}</div>
                    )}
                    {fax.scheduledFor && (
                      <div className="text-xs text-yellow-600 mt-1">Scheduled: {fax.scheduledFor}</div>
                    )}
                  </TableCell>
                  <TableCell>{fax.pages}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {fax.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => handleViewFax(fax)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Fax Details - {fax.id}
                            </DialogTitle>
                          </DialogHeader>
                          {selectedFax && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Date & Time:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{selectedFax.date}</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Sender:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{selectedFax.sender}</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Recipient:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{selectedFax.recipient}</p>
                                  <p className="text-xs text-muted-foreground">{selectedFax.recipientName}</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Document:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{selectedFax.document}</p>
                                  <p className="text-xs text-muted-foreground">{selectedFax.pages} pages</p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Status:</span>
                                  </div>
                                  <Badge className={getStatusColor(selectedFax.status)}>
                                    {selectedFax.status}
                                  </Badge>
                                  {selectedFax.error && (
                                    <div className="flex items-center gap-1 text-red-600 text-xs">
                                      <AlertCircle className="h-3 w-3" />
                                      {selectedFax.error}
                                    </div>
                                  )}
                                  {selectedFax.scheduledFor && (
                                    <p className="text-xs text-yellow-600">Scheduled: {selectedFax.scheduledFor}</p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Duration:</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{selectedFax.duration}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <span className="font-medium">Tags:</span>
                                <div className="flex flex-wrap gap-1">
                                  {selectedFax.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline" onClick={() => handleResendFax(fax)}>
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Resend
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadFax(fax)}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
