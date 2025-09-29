"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Link from "next/link"

export default function CoverPagesPage() {
  const [coverPageTemplates, setCoverPageTemplates] = useState([
    {
      id: "CP-001",
      name: "Corporate Standard",
      description: "Professional corporate cover page with company logo",
      category: "Business",
      isDefault: true,
      lastModified: "2024-01-10",
      usage: 45,
      preview: "Corporate header with logo, recipient info, and message area",
      content: {
        header: "ACME CORPORATION",
        logo: "🏢",
        recipient: "To: Client Name\nCompany: Client Company\nPhone: (555) 123-4567",
        message: "Please find attached the requested documents. If you have any questions, please contact us immediately.",
        footer: "ACME Corp | 123 Business St | City, State 12345 | (555) 987-6543"
      }
    },
    {
      id: "CP-002", 
      name: "Medical Confidential",
      description: "HIPAA compliant cover page for medical documents",
      category: "Medical",
      isDefault: false,
      lastModified: "2024-01-08",
      usage: 23,
      preview: "Medical header with confidentiality notice and patient info",
      content: {
        header: "MEDICAL CENTER",
        logo: "🏥",
        recipient: "To: Dr. Smith\nDepartment: Cardiology\nPhone: (555) 234-5678",
        message: "CONFIDENTIAL MEDICAL RECORDS\nPatient: John Doe\nDOB: 01/15/1980\nRecord ID: MED-2024-001",
        footer: "This document contains confidential patient information. Unauthorized disclosure is prohibited by HIPAA."
      }
    },
    {
      id: "CP-003",
      name: "Legal Document",
      description: "Formal legal cover page with attorney information",
      category: "Legal",
      isDefault: false,
      lastModified: "2024-01-05",
      usage: 18,
      preview: "Legal letterhead with case number and attorney details",
      content: {
        header: "LAW FIRM ASSOCIATES",
        logo: "⚖️",
        recipient: "To: Court Clerk\nCase: Smith vs. Jones\nCase No: CV-2024-001",
        message: "Please find enclosed legal documents for case CV-2024-001. These documents are being filed pursuant to the court's scheduling order.",
        footer: "Attorney: John Smith, Esq. | Bar No: 12345 | Phone: (555) 345-6789 | Email: jsmith@lawfirm.com"
      }
    },
    {
      id: "CP-004",
      name: "Invoice Cover",
      description: "Simple cover page for billing and invoices",
      category: "Billing",
      isDefault: false,
      lastModified: "2024-01-03",
      usage: 67,
      preview: "Clean layout with invoice number and payment terms",
      content: {
        header: "INVOICE TRANSMITTAL",
        logo: "💰",
        recipient: "To: Accounts Payable\nCompany: Client Corp\nAttention: Finance Manager",
        message: "Invoice #INV-2024-001\nAmount: $1,250.00\nDue Date: 30 days from receipt\nPayment Terms: Net 30",
        footer: "Questions? Call (555) 456-7890 | Email: billing@company.com"
      }
    },
    {
      id: "CP-005",
      name: "Urgent Notice",
      description: "High priority cover page with urgent indicators",
      category: "Urgent",
      isDefault: false,
      lastModified: "2024-01-01",
      usage: 12,
      preview: "Bold urgent header with priority indicators",
      content: {
        header: "🚨 URGENT NOTICE 🚨",
        logo: "⚠️",
        recipient: "To: Emergency Contact\nPriority: HIGH\nResponse Required: Within 2 hours",
        message: "URGENT: This document requires immediate attention. Please review and respond as soon as possible. Time-sensitive matter.",
        footer: "Emergency Contact: (555) 567-8901 | Available 24/7"
      }
    },
    {
      id: "CP-006",
      name: "Personal Letter",
      description: "Casual cover page for personal correspondence",
      category: "Personal",
      isDefault: false,
      lastModified: "2023-12-28",
      usage: 8,
      preview: "Simple personal letterhead with contact information",
      content: {
        header: "Personal Correspondence",
        logo: "📝",
        recipient: "To: Family Member\nAddress: 123 Home Street\nCity, State 12345",
        message: "Hope this letter finds you well. I'm sending you some important documents that I thought you might need. Please let me know when you receive them.",
        footer: "With love, John | Phone: (555) 678-9012 | Email: john@email.com"
      }
    }
  ])

  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)

  // Handle preview
  const handlePreview = (template: any) => {
    setPreviewTemplate(template)
    setShowPreviewDialog(true)
  }

  // Handle edit
  const handleEdit = (template: any) => {
    setEditingTemplate(template)
    setShowEditDialog(true)
  }

  // Handle copy
  const handleCopy = (template: any) => {
    const newTemplate = {
      ...template,
      id: `CP-${Date.now()}`,
      name: `${template.name} (Copy)`,
      lastModified: new Date().toISOString().split('T')[0],
      usage: 0
    }
    setCoverPageTemplates(prev => [...prev, newTemplate])
    alert(`"${template.name}" has been copied successfully.`)
  }

  // Handle delete
  const handleDelete = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setCoverPageTemplates(prev => prev.filter(template => template.id !== templateId))
    }
  }

  // Handle save edit
  const handleSaveEdit = (updatedTemplate: any) => {
    setCoverPageTemplates(prev => 
      prev.map(template => 
        template.id === updatedTemplate.id 
          ? { ...updatedTemplate, lastModified: new Date().toISOString().split('T')[0] }
          : template
      )
    )
    setShowEditDialog(false)
    setEditingTemplate(null)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Business": return "bg-blue-100 text-blue-800"
      case "Medical": return "bg-green-100 text-green-800"
      case "Legal": return "bg-purple-100 text-purple-800"
      case "Billing": return "bg-orange-100 text-orange-800"
      case "Urgent": return "bg-red-100 text-red-800"
      case "Personal": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Cover Page Templates</h1>
          <p className="text-muted-foreground">Manage your fax cover page templates</p>
        </div>
        <Button asChild>
          <Link href="/cover-pages">Create New Template</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coverPageTemplates.map((template) => (
          <Card key={template.id} className="relative">
            {template.isDefault && (
              <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                Default
              </Badge>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                </div>
                <Badge className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview Area */}
              <div className="h-48 rounded-md bg-white border-2 border-gray-200 p-3 text-xs overflow-hidden">
                <div className="space-y-2">
                  {/* Header */}
                  <div className="text-center border-b pb-2">
                    <div className="text-lg font-bold flex items-center justify-center gap-2">
                      <span>{template.content.logo}</span>
                      <span>{template.content.header}</span>
                    </div>
                  </div>
                  
                  {/* Recipient Info */}
                  <div className="text-xs">
                    <pre className="whitespace-pre-wrap font-mono">{template.content.recipient}</pre>
                  </div>
                  
                  {/* Message */}
                  <div className="text-xs border-t pt-2">
                    <pre className="whitespace-pre-wrap">{template.content.message}</pre>
                  </div>
                  
                  {/* Footer */}
                  <div className="text-xs border-t pt-2 text-center text-gray-600">
                    <pre className="whitespace-pre-wrap">{template.content.footer}</pre>
                  </div>
                </div>
              </div>

              {/* Template Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Usage</div>
                  <div className="font-medium">{template.usage} times</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Last Modified</div>
                  <div className="font-medium">{template.lastModified}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 min-w-0 text-xs"
                  onClick={() => handlePreview(template)}
                >
                  <span className="truncate">Preview</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 min-w-0 text-xs"
                  onClick={() => handleEdit(template)}
                >
                  <span className="truncate">Edit</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-shrink-0 text-xs"
                  onClick={() => handleCopy(template)}
                >
                  Copy
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-shrink-0 text-xs text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(template.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Template Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{coverPageTemplates.length}</div>
              <div className="text-sm text-muted-foreground">Total Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{coverPageTemplates.reduce((sum, t) => sum + t.usage, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Usage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{coverPageTemplates.filter(t => t.isDefault).length}</div>
              <div className="text-sm text-muted-foreground">Default Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(coverPageTemplates.reduce((sum, t) => sum + t.usage, 0) / coverPageTemplates.length)}</div>
              <div className="text-sm text-muted-foreground">Avg Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Template Preview - {previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="space-y-4">
              <div className="border rounded-lg p-6 bg-white">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {previewTemplate.content.header}
                  
                  {previewTemplate.content.logo}
                  
                  {previewTemplate.content.recipient}
                  
                  {previewTemplate.content.message}
                  
                  {previewTemplate.content.footer}
                </pre>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Template - {editingTemplate?.name}</DialogTitle>
          </DialogHeader>
          {editingTemplate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Template Name</label>
                  <Input 
                    value={editingTemplate.name} 
                    onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input 
                    value={editingTemplate.category} 
                    onChange={(e) => setEditingTemplate({...editingTemplate, category: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  value={editingTemplate.description} 
                  onChange={(e) => setEditingTemplate({...editingTemplate, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Header</label>
                <Textarea 
                  value={editingTemplate.content.header} 
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate, 
                    content: {...editingTemplate.content, header: e.target.value}
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  value={editingTemplate.content.message} 
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate, 
                    content: {...editingTemplate.content, message: e.target.value}
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Footer</label>
                <Textarea 
                  value={editingTemplate.content.footer} 
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate, 
                    content: {...editingTemplate.content, footer: e.target.value}
                  })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveEdit(editingTemplate)}>
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
