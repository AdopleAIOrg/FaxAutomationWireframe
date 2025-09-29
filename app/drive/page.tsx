"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { FileText, Folder, Download, Trash2, Edit, Upload, Cloud, Grid3X3, List } from "lucide-react"
import Link from "next/link"

export default function DrivePage() {
  const [files, setFiles] = useState([
    {
      id: "F-001",
      name: "Invoice_2024_001.pdf",
      type: "PDF",
      size: "2.3 MB",
      uploadedBy: "John Smith",
      uploadedDate: "2024-01-15 14:30",
      lastModified: "2024-01-15 14:30",
      folder: "Invoices",
      status: "Ready",
      tags: ["billing", "urgent"]
    },
    {
      id: "F-002",
      name: "Contract_Agreement_v2.docx",
      type: "Word",
      size: "1.8 MB",
      uploadedBy: "Sarah Johnson",
      uploadedDate: "2024-01-15 11:45",
      lastModified: "2024-01-15 11:45",
      folder: "Legal",
      status: "Ready",
      tags: ["legal", "contract"]
    },
    {
      id: "F-003",
      name: "Q4_Report_2023.pdf",
      type: "PDF",
      size: "4.2 MB",
      uploadedBy: "Mike Wilson",
      uploadedDate: "2024-01-15 09:20",
      lastModified: "2024-01-15 09:20",
      folder: "Reports",
      status: "Processing",
      tags: ["report", "quarterly"]
    },
    {
      id: "F-004",
      name: "Patient_Records_Confidential.pdf",
      type: "PDF",
      size: "3.1 MB",
      uploadedBy: "Lisa Brown",
      uploadedDate: "2024-01-14 16:15",
      lastModified: "2024-01-14 16:15",
      folder: "Medical",
      status: "Ready",
      tags: ["medical", "confidential"]
    },
    {
      id: "F-005",
      name: "Legal_Brief_Final.docx",
      type: "Word",
      size: "2.7 MB",
      uploadedBy: "David Lee",
      uploadedDate: "2024-01-14 13:30",
      lastModified: "2024-01-14 13:30",
      folder: "Legal",
      status: "Ready",
      tags: ["legal", "brief"]
    },
    {
      id: "F-006",
      name: "Claim_Form_Insurance.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadedBy: "Emily Davis",
      uploadedDate: "2024-01-14 10:45",
      lastModified: "2024-01-14 10:45",
      folder: "Insurance",
      status: "Ready",
      tags: ["insurance", "claim"]
    },
    {
      id: "F-007",
      name: "Safety_Report_Manufacturing.pdf",
      type: "PDF",
      size: "5.8 MB",
      uploadedBy: "Robert Taylor",
      uploadedDate: "2024-01-13 15:20",
      lastModified: "2024-01-13 15:20",
      folder: "Safety",
      status: "Ready",
      tags: ["safety", "compliance"]
    },
    {
      id: "F-008",
      name: "Inventory_Report_Jan.xlsx",
      type: "Excel",
      size: "1.5 MB",
      uploadedBy: "Jennifer White",
      uploadedDate: "2024-01-13 12:10",
      lastModified: "2024-01-13 12:10",
      folder: "Inventory",
      status: "Ready",
      tags: ["inventory", "monthly"]
    }
  ])

  const [folders, setFolders] = useState([
    { name: "Invoices", fileCount: 12, size: "15.2 MB" },
    { name: "Legal", fileCount: 8, size: "22.1 MB" },
    { name: "Reports", fileCount: 15, size: "45.8 MB" },
    { name: "Medical", fileCount: 6, size: "18.3 MB" },
    { name: "Insurance", fileCount: 4, size: "7.2 MB" },
    { name: "Safety", fileCount: 9, size: "32.1 MB" }
  ])

  const [editingFile, setEditingFile] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [currentFolderFiles, setCurrentFolderFiles] = useState<any[]>([])

  // Handle folder opening
  const handleOpenFolder = (folderName: string) => {
    setCurrentFolder(folderName)
    // Sample files for each folder
    const folderFiles: { [key: string]: any[] } = {
      "Invoices": [
        { id: "INV-001", name: "Invoice_2024_001.pdf", type: "PDF", size: "2.3 MB", uploadedBy: "John Smith", uploadedDate: "2024-01-15 14:30", lastModified: "2024-01-15 14:30", status: "Ready", tags: ["billing", "urgent"] },
        { id: "INV-002", name: "Invoice_2024_002.pdf", type: "PDF", size: "1.8 MB", uploadedBy: "Sarah Johnson", uploadedDate: "2024-01-16 09:15", lastModified: "2024-01-16 09:15", status: "Ready", tags: ["billing"] },
        { id: "INV-003", name: "Invoice_2024_003.pdf", type: "PDF", size: "3.1 MB", uploadedBy: "Mike Wilson", uploadedDate: "2024-01-17 11:45", lastModified: "2024-01-17 11:45", status: "Ready", tags: ["billing", "payment"] },
        { id: "INV-004", name: "Invoice_2024_004.pdf", type: "PDF", size: "2.7 MB", uploadedBy: "John Smith", uploadedDate: "2024-01-18 16:20", lastModified: "2024-01-18 16:20", status: "Ready", tags: ["billing"] },
        { id: "INV-005", name: "Invoice_2024_005.pdf", type: "PDF", size: "1.9 MB", uploadedBy: "Sarah Johnson", uploadedDate: "2024-01-19 08:30", lastModified: "2024-01-19 08:30", status: "Ready", tags: ["billing", "urgent"] },
        { id: "INV-006", name: "Invoice_2024_006.pdf", type: "PDF", size: "2.4 MB", uploadedBy: "Mike Wilson", uploadedDate: "2024-01-20 13:15", lastModified: "2024-01-20 13:15", status: "Ready", tags: ["billing"] },
        { id: "INV-007", name: "Invoice_2024_007.pdf", type: "PDF", size: "3.2 MB", uploadedBy: "John Smith", uploadedDate: "2024-01-21 10:45", lastModified: "2024-01-21 10:45", status: "Ready", tags: ["billing", "payment"] },
        { id: "INV-008", name: "Invoice_2024_008.pdf", type: "PDF", size: "2.1 MB", uploadedBy: "Sarah Johnson", uploadedDate: "2024-01-22 15:30", lastModified: "2024-01-22 15:30", status: "Ready", tags: ["billing"] },
        { id: "INV-009", name: "Invoice_2024_009.pdf", type: "PDF", size: "2.8 MB", uploadedBy: "Mike Wilson", uploadedDate: "2024-01-23 12:00", lastModified: "2024-01-23 12:00", status: "Ready", tags: ["billing", "urgent"] },
        { id: "INV-010", name: "Invoice_2024_010.pdf", type: "PDF", size: "1.7 MB", uploadedBy: "John Smith", uploadedDate: "2024-01-24 09:45", lastModified: "2024-01-24 09:45", status: "Ready", tags: ["billing"] },
        { id: "INV-011", name: "Invoice_2024_011.pdf", type: "PDF", size: "2.9 MB", uploadedBy: "Sarah Johnson", uploadedDate: "2024-01-25 14:20", lastModified: "2024-01-25 14:20", status: "Ready", tags: ["billing", "payment"] },
        { id: "INV-012", name: "Invoice_2024_012.pdf", type: "PDF", size: "2.2 MB", uploadedBy: "Mike Wilson", uploadedDate: "2024-01-26 11:10", lastModified: "2024-01-26 11:10", status: "Ready", tags: ["billing"] }
      ],
      "Legal": [
        { id: "LEG-001", name: "Service_Agreement_2024.pdf", type: "PDF", size: "4.2 MB", uploadedBy: "John Smith", uploadedDate: "2024-01-10 10:30", lastModified: "2024-01-10 10:30", status: "Ready", tags: ["legal", "contract"] },
        { id: "LEG-002", name: "Employment_Contract_John.pdf", type: "PDF", size: "3.1 MB", uploadedBy: "HR Department", uploadedDate: "2024-01-11 14:15", lastModified: "2024-01-11 14:15", status: "Ready", tags: ["legal", "hr"] },
        { id: "LEG-003", name: "NDA_Agreement.pdf", type: "PDF", size: "2.8 MB", uploadedBy: "Legal Team", uploadedDate: "2024-01-12 09:45", lastModified: "2024-01-12 09:45", status: "Ready", tags: ["legal", "confidential"] },
        { id: "LEG-004", name: "Vendor_Contract_ABC.pdf", type: "PDF", size: "3.5 MB", uploadedBy: "Procurement", uploadedDate: "2024-01-13 16:20", lastModified: "2024-01-13 16:20", status: "Ready", tags: ["legal", "vendor"] },
        { id: "LEG-005", name: "Lease_Agreement_Office.pdf", type: "PDF", size: "2.9 MB", uploadedBy: "Facilities", uploadedDate: "2024-01-14 11:30", lastModified: "2024-01-14 11:30", status: "Ready", tags: ["legal", "facility"] },
        { id: "LEG-006", name: "Software_License_Agreement.pdf", type: "PDF", size: "3.2 MB", uploadedBy: "IT Department", uploadedDate: "2024-01-15 13:45", lastModified: "2024-01-15 13:45", status: "Ready", tags: ["legal", "software"] },
        { id: "LEG-007", name: "Insurance_Policy_2024.pdf", type: "PDF", size: "2.7 MB", uploadedBy: "Insurance Team", uploadedDate: "2024-01-16 08:15", lastModified: "2024-01-16 08:15", status: "Ready", tags: ["legal", "insurance"] },
        { id: "LEG-008", name: "Partnership_Agreement.pdf", type: "PDF", size: "3.5 MB", uploadedBy: "Business Development", uploadedDate: "2024-01-17 15:00", lastModified: "2024-01-17 15:00", status: "Ready", tags: ["legal", "partnership"] }
      ],
      "Reports": [
        { id: "RPT-001", name: "Monthly_Sales_Report_Jan.pdf", type: "PDF", size: "4.5 MB", uploadedBy: "Sales Team", uploadedDate: "2024-01-31 17:00", lastModified: "2024-01-31 17:00", status: "Ready", tags: ["sales", "monthly"] },
        { id: "RPT-002", name: "Financial_Report_Q1.pdf", type: "PDF", size: "5.2 MB", uploadedBy: "Finance Team", uploadedDate: "2024-01-30 16:30", lastModified: "2024-01-30 16:30", status: "Ready", tags: ["finance", "quarterly"] },
        { id: "RPT-003", name: "Marketing_Analysis_2024.pdf", type: "PDF", size: "3.8 MB", uploadedBy: "Marketing Team", uploadedDate: "2024-01-29 14:20", lastModified: "2024-01-29 14:20", status: "Ready", tags: ["marketing", "analysis"] },
        { id: "RPT-004", name: "HR_Report_January.pdf", type: "PDF", size: "2.9 MB", uploadedBy: "HR Department", uploadedDate: "2024-01-28 12:15", lastModified: "2024-01-28 12:15", status: "Ready", tags: ["hr", "monthly"] },
        { id: "RPT-005", name: "IT_Security_Audit.pdf", type: "PDF", size: "4.1 MB", uploadedBy: "IT Security", uploadedDate: "2024-01-27 10:45", lastModified: "2024-01-27 10:45", status: "Ready", tags: ["security", "audit"] },
        { id: "RPT-006", name: "Operations_Report_Jan.pdf", type: "PDF", size: "3.7 MB", uploadedBy: "Operations", uploadedDate: "2024-01-26 15:30", lastModified: "2024-01-26 15:30", status: "Ready", tags: ["operations", "monthly"] },
        { id: "RPT-007", name: "Customer_Satisfaction_Survey.pdf", type: "PDF", size: "2.6 MB", uploadedBy: "Customer Service", uploadedDate: "2024-01-25 11:20", lastModified: "2024-01-25 11:20", status: "Ready", tags: ["customer", "survey"] },
        { id: "RPT-008", name: "Quality_Assurance_Report.pdf", type: "PDF", size: "3.4 MB", uploadedBy: "QA Team", uploadedDate: "2024-01-24 13:45", lastModified: "2024-01-24 13:45", status: "Ready", tags: ["quality", "assurance"] },
        { id: "RPT-009", name: "Budget_Report_2024.pdf", type: "PDF", size: "4.8 MB", uploadedBy: "Finance Team", uploadedDate: "2024-01-23 09:30", lastModified: "2024-01-23 09:30", status: "Ready", tags: ["finance", "budget"] },
        { id: "RPT-010", name: "Project_Status_Report.pdf", type: "PDF", size: "3.2 MB", uploadedBy: "Project Manager", uploadedDate: "2024-01-22 16:00", lastModified: "2024-01-22 16:00", status: "Ready", tags: ["project", "status"] },
        { id: "RPT-011", name: "Compliance_Report_Jan.pdf", type: "PDF", size: "2.8 MB", uploadedBy: "Compliance Team", uploadedDate: "2024-01-21 14:15", lastModified: "2024-01-21 14:15", status: "Ready", tags: ["compliance", "monthly"] },
        { id: "RPT-012", name: "Training_Report_2024.pdf", type: "PDF", size: "3.1 MB", uploadedBy: "Training Department", uploadedDate: "2024-01-20 12:30", lastModified: "2024-01-20 12:30", status: "Ready", tags: ["training", "development"] },
        { id: "RPT-013", name: "Inventory_Report_Jan.pdf", type: "PDF", size: "2.7 MB", uploadedBy: "Inventory Team", uploadedDate: "2024-01-19 10:45", lastModified: "2024-01-19 10:45", status: "Ready", tags: ["inventory", "monthly"] },
        { id: "RPT-014", name: "Performance_Report_Q1.pdf", type: "PDF", size: "4.3 MB", uploadedBy: "Management", uploadedDate: "2024-01-18 15:20", lastModified: "2024-01-18 15:20", status: "Ready", tags: ["performance", "quarterly"] },
        { id: "RPT-015", name: "Risk_Assessment_Report.pdf", type: "PDF", size: "3.6 MB", uploadedBy: "Risk Management", uploadedDate: "2024-01-17 11:10", lastModified: "2024-01-17 11:10", status: "Ready", tags: ["risk", "assessment"] }
      ],
      "Medical": [
        { id: "MED-001", name: "Health_Insurance_Claim.pdf", type: "PDF", size: "3.2 MB", uploadedBy: "HR Department", uploadedDate: "2024-01-15 14:30", lastModified: "2024-01-15 14:30", status: "Ready", tags: ["medical", "insurance"] },
        { id: "MED-002", name: "Employee_Health_Records.pdf", type: "PDF", size: "2.8 MB", uploadedBy: "Medical Team", uploadedDate: "2024-01-16 10:15", lastModified: "2024-01-16 10:15", status: "Ready", tags: ["medical", "records"] },
        { id: "MED-003", name: "Vaccination_Records.pdf", type: "PDF", size: "2.1 MB", uploadedBy: "Medical Team", uploadedDate: "2024-01-17 09:45", lastModified: "2024-01-17 09:45", status: "Ready", tags: ["medical", "vaccination"] },
        { id: "MED-004", name: "Emergency_Contact_Info.pdf", type: "PDF", size: "1.9 MB", uploadedBy: "HR Department", uploadedDate: "2024-01-18 11:30", lastModified: "2024-01-18 11:30", status: "Ready", tags: ["medical", "emergency"] },
        { id: "MED-005", name: "Medical_Certificate_Template.pdf", type: "PDF", size: "3.4 MB", uploadedBy: "Medical Team", uploadedDate: "2024-01-19 13:20", lastModified: "2024-01-19 13:20", status: "Ready", tags: ["medical", "certificate"] },
        { id: "MED-006", name: "Health_Safety_Guidelines.pdf", type: "PDF", size: "4.9 MB", uploadedBy: "Safety Team", uploadedDate: "2024-01-20 15:00", lastModified: "2024-01-20 15:00", status: "Ready", tags: ["medical", "safety"] }
      ],
      "Insurance": [
        { id: "INS-001", name: "General_Liability_Policy.pdf", type: "PDF", size: "2.1 MB", uploadedBy: "Insurance Team", uploadedDate: "2024-01-10 16:30", lastModified: "2024-01-10 16:30", status: "Ready", tags: ["insurance", "liability"] },
        { id: "INS-002", name: "Property_Insurance_Policy.pdf", type: "PDF", size: "1.8 MB", uploadedBy: "Insurance Team", uploadedDate: "2024-01-11 14:15", lastModified: "2024-01-11 14:15", status: "Ready", tags: ["insurance", "property"] },
        { id: "INS-003", name: "Workers_Compensation_Policy.pdf", type: "PDF", size: "1.9 MB", uploadedBy: "Insurance Team", uploadedDate: "2024-01-12 10:45", lastModified: "2024-01-12 10:45", status: "Ready", tags: ["insurance", "workers-comp"] },
        { id: "INS-004", name: "Cyber_Liability_Policy.pdf", type: "PDF", size: "1.4 MB", uploadedBy: "Insurance Team", uploadedDate: "2024-01-13 12:20", lastModified: "2024-01-13 12:20", status: "Ready", tags: ["insurance", "cyber"] }
      ],
      "Safety": [
        { id: "SAF-001", name: "Safety_Manual_2024.pdf", type: "PDF", size: "4.2 MB", uploadedBy: "Safety Team", uploadedDate: "2024-01-05 09:30", lastModified: "2024-01-05 09:30", status: "Ready", tags: ["safety", "manual"] },
        { id: "SAF-002", name: "Emergency_Procedures.pdf", type: "PDF", size: "3.8 MB", uploadedBy: "Safety Team", uploadedDate: "2024-01-06 11:15", lastModified: "2024-01-06 11:15", status: "Ready", tags: ["safety", "emergency"] },
        { id: "SAF-003", name: "Fire_Safety_Protocol.pdf", type: "PDF", size: "2.9 MB", uploadedBy: "Safety Team", uploadedDate: "2024-01-07 14:45", lastModified: "2024-01-07 14:45", status: "Ready", tags: ["safety", "fire"] },
        { id: "SAF-004", name: "First_Aid_Guide.pdf", type: "PDF", size: "3.1 MB", uploadedBy: "Medical Team", uploadedDate: "2024-01-08 16:20", lastModified: "2024-01-08 16:20", status: "Ready", tags: ["safety", "first-aid"] },
        { id: "SAF-005", name: "Equipment_Safety_Checklist.pdf", type: "PDF", size: "2.4 MB", uploadedBy: "Safety Team", uploadedDate: "2024-01-09 10:30", lastModified: "2024-01-09 10:30", status: "Ready", tags: ["safety", "equipment"] },
        { id: "SAF-006", name: "Hazard_Assessment_Report.pdf", type: "PDF", size: "3.5 MB", uploadedBy: "Safety Team", uploadedDate: "2024-01-10 13:00", lastModified: "2024-01-10 13:00", status: "Ready", tags: ["safety", "hazard"] },
        { id: "SAF-007", name: "Training_Materials_Safety.pdf", type: "PDF", size: "4.1 MB", uploadedBy: "Training Department", uploadedDate: "2024-01-11 15:30", lastModified: "2024-01-11 15:30", status: "Ready", tags: ["safety", "training"] },
        { id: "SAF-008", name: "Incident_Report_Template.pdf", type: "PDF", size: "2.7 MB", uploadedBy: "Safety Team", uploadedDate: "2024-01-12 12:45", lastModified: "2024-01-12 12:45", status: "Ready", tags: ["safety", "incident"] },
        { id: "SAF-009", name: "Compliance_Safety_Standards.pdf", type: "PDF", size: "5.5 MB", uploadedBy: "Compliance Team", uploadedDate: "2024-01-13 11:20", lastModified: "2024-01-13 11:20", status: "Ready", tags: ["safety", "compliance"] }
      ]
    }
    setCurrentFolderFiles(folderFiles[folderName] || [])
  }

  // Handle back to folders
  const handleBackToFolders = () => {
    setCurrentFolder(null)
    setCurrentFolderFiles([])
  }

  // Handle download
  const handleDownload = (file: any) => {
    const content = `File Details:
ID: ${file.id}
Name: ${file.name}
Type: ${file.type}
Size: ${file.size}
Uploaded By: ${file.uploadedBy}
Uploaded Date: ${file.uploadedDate}
Last Modified: ${file.lastModified}
Folder: ${file.folder}
Status: ${file.status}
Tags: ${file.tags.join(', ')}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `file-${file.id}-${file.name.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle delete
  const handleDelete = (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(prev => prev.filter(file => file.id !== fileId))
    }
  }

  // Handle edit
  const handleEdit = (file: any) => {
    setEditingFile(file)
    setShowEditDialog(true)
  }

  // Handle upload
  const handleUpload = () => {
    alert('Upload functionality would be implemented here. This would typically open a file picker dialog.')
  }

  // Handle save edit
  const handleSaveEdit = (updatedFile: any) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === updatedFile.id 
          ? { ...updatedFile, lastModified: new Date().toISOString().split('T')[0] + ' 12:00' }
          : file
      )
    )
    setShowEditDialog(false)
    setEditingFile(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-green-100 text-green-800"
      case "Processing": return "bg-yellow-100 text-yellow-800"
      case "Error": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF": return "bg-red-100 text-red-800"
      case "Word": return "bg-blue-100 text-blue-800"
      case "Excel": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 min-w-0">
        <Input placeholder="Search files..." className="flex-1 w-full min-w-0" />
        <div className="flex flex-wrap gap-2 shrink-0">
          <Button
            variant="outline"
            onClick={handleUpload}
            className="max-w-full whitespace-normal break-words text-center bg-transparent"
          >
            Upload Files
          </Button>
          <Button
            variant="outline"
            asChild
            className="max-w-full whitespace-normal break-words text-center bg-transparent"
          >
            <Link href="/integrations">Connect Integration</Link>
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
            <p className="text-xs text-muted-foreground">documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142.8 MB</div>
            <p className="text-xs text-muted-foreground">of 5 GB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Folders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{folders.length}</div>
            <p className="text-xs text-muted-foreground">organized</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Folders or Folder Contents */}
      {!currentFolder ? (
        <Card>
          <CardHeader>
            <CardTitle>Folders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {folders.map((folder, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleOpenFolder(folder.name)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      📁 {folder.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {folder.fileCount} files • {folder.size}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToFolders}
                  className="flex items-center gap-2"
                >
                  ← Back to Folders
                </Button>
                <CardTitle>📁 {currentFolder}</CardTitle>
              </div>
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
          <CardContent>
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFolderFiles.map((file) => (
                  <Card key={file.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium line-clamp-2">{file.name}</CardTitle>
                        <Badge className={getTypeColor(file.type)}>
                          {file.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* File Preview */}
                      <div className="h-24 rounded-md bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-blue-200 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-blue-400" />
                      </div>
                      
                      {/* Basic Info */}
                      <div className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Size:</span>
                            <span className="font-medium">{file.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Uploaded:</span>
                            <span>{file.uploadedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">By:</span>
                            <span>{file.uploadedBy}</span>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {file.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 min-w-0 text-xs"
                            onClick={() => handleDownload(file)}
                          >
                            <Download className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">Download</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 min-w-0 text-xs"
                            onClick={() => handleEdit(file)}
                          >
                            <Edit className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 min-w-0 text-xs"
                            onClick={() => handleDelete(file.id)}
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentFolderFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {file.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(file.type)}>
                          {file.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{file.size}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(file.status)}>
                          {file.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{file.uploadedBy}</TableCell>
                      <TableCell>{file.uploadedDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(file)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(file)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}


      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit File - {editingFile?.name}</DialogTitle>
          </DialogHeader>
          {editingFile && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">File Name</label>
                  <Input 
                    value={editingFile.name} 
                    onChange={(e) => setEditingFile({...editingFile, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Folder</label>
                  <Input 
                    value={editingFile.folder} 
                    onChange={(e) => setEditingFile({...editingFile, folder: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tags (comma separated)</label>
                  <Input 
                    value={editingFile.tags.join(', ')} 
                    onChange={(e) => setEditingFile({...editingFile, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Input 
                    value={editingFile.status} 
                    onChange={(e) => setEditingFile({...editingFile, status: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveEdit(editingFile)}>
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
