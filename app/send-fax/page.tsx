"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X, FileText, User, Clock, ExternalLink } from "lucide-react"

export default function SendFaxPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [files, setFiles] = useState<File[]>([])
  const [isClient, setIsClient] = useState(false)
  
  // State for selected items
  const [selectedContacts, setSelectedContacts] = useState<Array<{id: string, number: string, name: string}>>([])
  const [selectedTemplate, setSelectedTemplate] = useState<{id: string, name: string, description: string} | null>(null)
  const [selectedESignatures, setSelectedESignatures] = useState<Array<{id: string, name: string}>>([])
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [showESignatureDialog, setShowESignatureDialog] = useState(false)
  const [attachESignatures, setAttachESignatures] = useState(false)
  
  // State for message and notes
  const [subject, setSubject] = useState("")
  const [notes, setNotes] = useState("")
  const [manualFaxNumber, setManualFaxNumber] = useState("")
  
  // State for sender fax number
  const [userFaxNumbers, setUserFaxNumbers] = useState<any[]>([])
  const [selectedSenderFax, setSelectedSenderFax] = useState<any>(null)
  const [showSenderDialog, setShowSenderDialog] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Load saved data from localStorage only on client
    if (typeof window !== 'undefined') {
      // Load user fax numbers
      const savedNumbers = localStorage.getItem('user-fax-numbers')
      if (savedNumbers) {
        try {
          const numbers = JSON.parse(savedNumbers)
          setUserFaxNumbers(numbers)
          // Set default sender fax number - prioritize default, then first available
          const defaultFax = numbers.find((fax: any) => fax.isDefault === true) || numbers[0]
          if (defaultFax) {
            setSelectedSenderFax(defaultFax)
          }
        } catch (error) {
          console.error('Error parsing user fax numbers:', error)
        }
      }
      // Check for send-again data first
      const sendAgainData = localStorage.getItem('send-again-data')
      if (sendAgainData) {
        try {
          const data = JSON.parse(sendAgainData)
          setManualFaxNumber(data.recipientNumber || "")
          setSubject(data.subject || "")
          setNotes(data.notes || "")
          localStorage.removeItem('send-again-data')
        } catch (error) {
          console.error('Error loading send-again data:', error)
        }
      } else {
        // Check for resend data
        const resendData = localStorage.getItem('resend-fax-data')
        if (resendData) {
          try {
            const data = JSON.parse(resendData)
            setManualFaxNumber(data.recipient || "")
            setSubject(data.subject || "")
            setNotes(data.notes || "")
            if (data.tags && data.tags.length > 0) {
              // Add tags as notes if they exist
              setNotes(prev => prev + (prev ? "\n\nTags: " : "Tags: ") + data.tags.join(", "))
            }
            // Clear resend data after using it
            localStorage.removeItem('resend-fax-data')
          } catch (error) {
            console.error('Error loading resend fax data:', error)
          }
        } else {
          // Load regular saved data if no resend data
          const savedData = localStorage.getItem('fax-draft')
          if (savedData) {
            try {
              const data = JSON.parse(savedData)
              setSelectedContacts(data.selectedContacts || [])
              setSelectedTemplate(data.selectedTemplate || null)
              setSelectedESignatures(data.selectedESignatures || [])
              setAttachESignatures(data.attachESignatures || false)
              setSubject(data.subject || "")
              setNotes(data.notes || "")
              setManualFaxNumber(data.manualFaxNumber || "")
              if (data.date) {
                setDate(new Date(data.date))
              }
            } catch (error) {
              console.error('Error loading saved fax data:', error)
            }
          }
        }
      }

      // Check for selected eSignature from eSignatures page
      const selectedESignature = localStorage.getItem('selected-esignature')
      if (selectedESignature) {
        try {
          const signature = JSON.parse(selectedESignature)
          if (!selectedESignatures.find(es => es.id === signature.id)) {
            setSelectedESignatures([...selectedESignatures, signature])
            setAttachESignatures(true)
          }
          localStorage.removeItem('selected-esignature') // Clear after use
        } catch (error) {
          console.error('Error loading selected eSignature:', error)
        }
      }

      // Load eSignatures from localStorage
      const storedESignatures = localStorage.getItem('esignatures')
      if (storedESignatures) {
        try {
          const signatures = JSON.parse(storedESignatures)
          setAvailableESignatures(signatures)
        } catch (error) {
          console.error('Error loading eSignatures:', error)
        }
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      const faxData = {
        selectedContacts,
        selectedTemplate,
        selectedESignatures,
        attachESignatures,
        subject,
        notes,
        manualFaxNumber,
        date: date?.toISOString()
      }
      localStorage.setItem('fax-draft', JSON.stringify(faxData))
    }
  }, [isClient, selectedContacts, selectedTemplate, selectedESignatures, attachESignatures, subject, notes, manualFaxNumber, date])

  // Sample data for contacts, templates, and eSignatures
  const availableContacts = [
    { id: "PN-001", number: "+1 (555) 123-4567", name: "John Smith", department: "Sales" },
    { id: "PN-002", number: "+1 (555) 234-5678", name: "Sarah Johnson", department: "Support" },
    { id: "PN-003", number: "+1 (555) 345-6789", name: "Mike Wilson", department: "Marketing" },
    { id: "PN-004", number: "+1 (555) 456-7890", name: "Lisa Brown", department: "HR" },
    { id: "PN-005", number: "+1 (555) 567-8901", name: "David Lee", department: "Legal" },
    { id: "PN-006", number: "+1 (555) 678-9012", name: "Emily Davis", department: "Finance" }
  ]

  const availableTemplates = [
    { id: "CP-001", name: "Corporate Standard", description: "Professional corporate cover page" },
    { id: "CP-002", name: "Medical Confidential", description: "HIPAA compliant cover page" },
    { id: "CP-003", name: "Legal Document", description: "Formal legal cover page" },
    { id: "CP-004", name: "Invoice Cover", description: "Simple cover page for billing" },
    { id: "CP-005", name: "Urgent Notice", description: "High priority cover page" },
    { id: "CP-006", name: "Personal Letter", description: "Casual personal correspondence" }
  ]

  // Load eSignatures from localStorage or use default
  const [availableESignatures, setAvailableESignatures] = useState([
    { id: "ES-001", name: "John Smith Signature", type: "Personal" },
    { id: "ES-002", name: "Company Official Seal", type: "Official" },
    { id: "ES-003", name: "Legal Authorization", type: "Legal" },
    { id: "ES-004", name: "Medical Authorization", type: "Medical" },
    { id: "ES-005", name: "Financial Approval", type: "Financial" }
  ])

  const handleContactSelect = (contact: typeof availableContacts[0]) => {
    if (!selectedContacts.find(c => c.id === contact.id)) {
      setSelectedContacts([...selectedContacts, contact])
    }
    setShowContactDialog(false)
  }

  const handleTemplateSelect = (template: typeof availableTemplates[0]) => {
    setSelectedTemplate(template)
    setShowTemplateDialog(false)
  }

  const handleESignatureSelect = (eSignature: typeof availableESignatures[0]) => {
    if (!selectedESignatures.find(es => es.id === eSignature.id)) {
      setSelectedESignatures([...selectedESignatures, eSignature])
    }
    setShowESignatureDialog(false)
  }

  const removeContact = (contactId: string) => {
    setSelectedContacts(selectedContacts.filter(c => c.id !== contactId))
  }

  const removeESignature = (eSignatureId: string) => {
    setSelectedESignatures(selectedESignatures.filter(es => es.id !== eSignatureId))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* SENDER CARD */}
      <div className="lg:col-span-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Sender
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSenderFax ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">📠</span>
                  </div>
                  <div>
                    <p className="font-medium">{selectedSenderFax.number}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        ✅ {selectedSenderFax.status}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {selectedSenderFax.type}
                      </span>
                      {selectedSenderFax.isDefault && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSenderDialog(true)}
                >
                  Change Number
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">No fax numbers available</p>
                <Link href="/account">
                  <Button>Add Fax Number</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CENTER: Document, Uploaded Pages, Message/Notes */}
      <main className="space-y-6 lg:col-span-8">
      <Card>
          <CardHeader>
            <CardTitle>Recipients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected Contacts */}
            {selectedContacts.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Contacts</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedContacts.map((contact) => (
                    <Badge key={contact.id} variant="secondary" className="flex items-center gap-1">
                      {contact.name} ({contact.number})
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeContact(contact.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fax">Manual Fax Number Entry</Label>
              <Input 
                id="fax" 
                placeholder="+1 (555) 000-0000" 
                value={manualFaxNumber}
                onChange={(e) => setManualFaxNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="csv">Upload CSV for Bulk Recipients</Label>
              <Input id="csv" type="file" accept=".csv" />
            </div>

            <div className="grid">
              <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full max-w-full whitespace-normal break-words text-center">
                    Select from Contacts
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Select Contacts</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {availableContacts.map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.number} • {contact.department}</div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleContactSelect(contact)}
                          disabled={selectedContacts.find(c => c.id === contact.id) !== undefined}
                        >
                          {selectedContacts.find(c => c.id === contact.id) ? "Selected" : "Select"}
              </Button>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-dashed rounded-md p-6 text-center bg-secondary">
              <div className="text-sm font-medium">Drag and Drop Upload</div>
              <div className="text-xs text-muted-foreground mb-4">Supported Formats: PDF, DOC, DOCX, JPG, PNG</div>
              <Input
                type="file"
                multiple
                className="w-full"
                onChange={(e) => {
                  const incoming = Array.from(e.target.files || [])
                  if (incoming.length) {
                    // [v0] track uploaded files in state (no persistence yet)
                    setFiles((prev) => [...prev, ...incoming])
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploaded Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {files.length === 0 ? (
              <div className="text-sm text-muted-foreground">No files uploaded yet.</div>
            ) : (
              <ul className="space-y-2">
                {files.map((f, idx) => (
                  <li key={`${f.name}-${idx}`} className="flex items-center justify-between rounded-md border p-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="max-w-full whitespace-normal break-words text-center bg-transparent"
                        onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="outline"
                        className="max-w-full whitespace-normal break-words text-center bg-transparent"
                        disabled
                        title="Edit flow not wired yet"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="max-w-full whitespace-normal break-words text-center bg-transparent"
                      >
                        <Link href="/templates">Create Template</Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message and Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input 
              placeholder="Subject line" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Textarea 
              placeholder="Optional notes..." 
              rows={5} 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Fax Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Fax Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isClient ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <div className="text-sm">Loading preview...</div>
              </div>
            ) : (
              <>
                {/* Recipients */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Recipients
              </div>
              <div className="pl-6 space-y-1">
                {selectedContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedContacts.map((contact) => (
                      <Badge key={contact.id} variant="outline" className="text-xs">
                        {contact.name} ({contact.number})
                      </Badge>
                    ))}
                  </div>
                )}
                {manualFaxNumber && (
                  <Badge variant="outline" className="text-xs">
                    Manual: {manualFaxNumber}
                  </Badge>
                )}
                {selectedContacts.length === 0 && !manualFaxNumber && (
                  <span className="text-sm text-muted-foreground">No recipients selected</span>
                )}
              </div>
            </div>

            {/* Subject and Notes */}
            {(subject || notes) && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  Message
                </div>
                <div className="pl-6 space-y-2">
                  {subject && (
                    <div>
                      <div className="text-xs text-muted-foreground">Subject:</div>
                      <div className="text-sm">{subject}</div>
                    </div>
                  )}
                  {notes && (
                    <div>
                      <div className="text-xs text-muted-foreground">Notes:</div>
                      <div className="text-sm whitespace-pre-wrap">{notes}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cover Page Template */}
            {selectedTemplate && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  Cover Page
                </div>
                <div className="pl-6">
                  <Badge variant="secondary" className="text-xs">
                    {selectedTemplate.name}
                  </Badge>
                </div>
              </div>
            )}

            {/* eSignatures */}
            {attachESignatures && selectedESignatures.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  eSignatures
                </div>
                <div className="pl-6">
                  <div className="flex flex-wrap gap-1">
                    {selectedESignatures.map((eSignature) => (
                      <Badge key={eSignature.id} variant="outline" className="text-xs">
                        {eSignature.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule */}
            {date && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </div>
                <div className="pl-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3" />
                    <span>{date.toLocaleDateString()} at {date.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  Documents ({files.length})
                </div>
                <div className="pl-6">
                  <div className="space-y-1">
                    {files.map((file, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        • {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Empty state */}
            {selectedContacts.length === 0 && !manualFaxNumber && !subject && !notes && !selectedTemplate && !attachESignatures && files.length === 0 && (
              <div className="text-center py-8 text-muted-foreground relative z-10">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <div className="text-sm">No fax content yet</div>
                <div className="text-xs">Start adding recipients, documents, and messages above</div>
              </div>
            )}
              </>
            )}
          </CardContent>
        </Card>
      </main>

      {/* RIGHT: Cover Page and Advanced Options */}
      <section className="space-y-6 lg:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Cover Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Selected Template */}
            {selectedTemplate && (
              <div className="space-y-2">
                <Label>Selected Template</Label>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{selectedTemplate.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedTemplate.description}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTemplate(null)}
                    className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  {selectedTemplate ? "Change Template" : "Select Template"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Select Cover Page Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {availableTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.description}</div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleTemplateSelect(template)}
                      >
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Schedule */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Schedule Send Date/Time</Label>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 bg-background relative z-20 overflow-hidden">
                <div className="flex justify-center">
                  {isClient ? (
                    <div className="w-fit max-w-[280px]">
                      <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={setDate} 
                        className="w-auto"
                        classNames={{
                          months: "flex flex-col space-y-4",
                          month: "space-y-4",
                          caption: "flex justify-center pt-1 relative items-center",
                          caption_label: "text-sm font-medium",
                          nav: "space-x-1 flex items-center",
                          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-auto border-collapse space-y-1",
                          head_row: "flex justify-center",
                          head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] flex items-center justify-center",
                          row: "flex w-auto mt-2 justify-center",
                          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center",
                          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                          day_today: "bg-accent text-accent-foreground",
                          day_outside: "text-muted-foreground opacity-50",
                          day_disabled: "text-muted-foreground opacity-50",
                          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                          day_hidden: "invisible",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-[280px] flex items-center justify-center text-muted-foreground">
                      Loading calendar...
                    </div>
                  )}
                </div>
              </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="send-time" className="text-sm">Time:</Label>
                  <Input 
                    id="send-time"
                    type="time" 
                    className="flex-1 max-w-[120px]"
                    aria-label="Send time" 
                  />
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between">
              <Label htmlFor="bulk">Bulk/Broadcast Send</Label>
              {isClient ? (
              <Switch id="bulk" defaultChecked />
              ) : (
                <div className="h-6 w-11 bg-secondary rounded-full" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="idp">IDP Auto-Fill</Label>
              {isClient ? (
              <Switch id="idp" />
              ) : (
                <div className="h-6 w-11 bg-secondary rounded-full" />
              )}
            </div>

            {/* Compression */}
            <div className="space-y-2">
              <Label>Compression & Quality</Label>
              {isClient ? (
              <Slider defaultValue={[60]} />
              ) : (
                <div className="h-6 bg-secondary rounded-full" />
              )}
            </div>

            {/* eSignatures */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                {isClient ? (
                  <Checkbox 
                    id="esign" 
                    checked={attachESignatures}
                    onCheckedChange={(checked) => setAttachESignatures(checked === true)}
                  />
                ) : (
                  <div className="h-4 w-4 bg-secondary rounded" />
                )}
              <Label htmlFor="esign">Attach eSignatures</Label>
              </div>

              {attachESignatures && (
                <div className="space-y-2">
                  {/* Selected eSignatures */}
                  {selectedESignatures.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected eSignatures</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedESignatures.map((eSignature) => (
                          <Badge key={eSignature.id} variant="secondary" className="flex items-center gap-1">
                            {eSignature.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => removeESignature(eSignature.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Dialog open={showESignatureDialog} onOpenChange={setShowESignatureDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Select eSignatures
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Select eSignatures</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div>
                            <div className="font-medium text-blue-900">Manage eSignatures</div>
                            <div className="text-sm text-blue-700">Create, upload, or draw new signatures</div>
                          </div>
                          <Link href="/esignatures">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Go to eSignatures
                            </Button>
                          </Link>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {availableESignatures.map((eSignature) => (
                            <div key={eSignature.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <div className="font-medium">{eSignature.name}</div>
                                <div className="text-sm text-muted-foreground">Type: {eSignature.type}</div>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => handleESignatureSelect(eSignature)}
                                disabled={selectedESignatures.find(es => es.id === eSignature.id) !== undefined}
                              >
                                {selectedESignatures.find(es => es.id === eSignature.id) ? "Selected" : "Select"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <Button
                variant="outline"
                className="max-w-full whitespace-normal break-words text-center bg-transparent"
                onClick={() => {
                  // Save current form as draft
                  const draftData = {
                    selectedContacts,
                    selectedTemplate,
                    selectedESignatures,
                    subject,
                    notes,
                    manualFaxNumber,
                    attachESignatures,
                    date: date?.toISOString()
                  }
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('fax-draft', JSON.stringify(draftData))
                  }
                  alert('Draft saved successfully! You can continue editing later.')
                }}
              >
                Create Draft
              </Button>
              <Button
                variant="outline"
                className="max-w-full whitespace-normal break-words text-center bg-transparent"
                onClick={() => {
                  // Show preview of current fax
                  const previewData = {
                    recipients: selectedContacts.length > 0 ? selectedContacts.map(c => c.name).join(', ') : manualFaxNumber || 'No recipients',
                    subject: subject || 'No subject',
                    notes: notes || 'No notes',
                    template: selectedTemplate?.name || 'No template',
                    eSignatures: selectedESignatures.length > 0 ? selectedESignatures.map(s => s.name).join(', ') : 'None',
                    scheduled: date ? date.toLocaleString() : 'Send immediately'
                  }
                  alert(`Fax Preview:\n\nRecipients: ${previewData.recipients}\nSubject: ${previewData.subject}\nNotes: ${previewData.notes}\nTemplate: ${previewData.template}\neSignatures: ${previewData.eSignatures}\nScheduled: ${previewData.scheduled}`)
                }}
              >
                Preview Fax
              </Button>
              <Button 
                className="max-w-full whitespace-normal break-words text-center"
                onClick={() => {
                  // Validate and send fax
                  if (!selectedContacts.length && !manualFaxNumber) {
                    alert('Please add at least one recipient.')
                    return
                  }
                  if (!subject) {
                    alert('Please enter a subject.')
                    return
                  }
                  
                  // Simulate sending
                  const recipients = selectedContacts.length > 0 ? selectedContacts.map(c => c.name).join(', ') : manualFaxNumber
                  alert(`Fax sent successfully to: ${recipients}\nSubject: ${subject}\nScheduled: ${date ? date.toLocaleString() : 'Immediately'}`)
                  
                  // Clear form after sending
                  setSelectedContacts([])
                  setSelectedTemplate(null)
                  setSelectedESignatures([])
                  setSubject('')
                  setNotes('')
                  setManualFaxNumber('')
                  setAttachESignatures(false)
                  setDate(undefined)
                  
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('fax-draft')
                  }
                }}
              >
                Send Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Sender Fax Number Selection Dialog */}
      <Dialog open={showSenderDialog} onOpenChange={setShowSenderDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Sender Fax Number</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {userFaxNumbers.length > 0 ? (
              <div className="space-y-3">
                {userFaxNumbers.map((fax) => (
                  <div 
                    key={fax.id}
                    onClick={() => {
                      setSelectedSenderFax(fax)
                      setShowSenderDialog(false)
                    }}
                    className={`p-4 border rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 ${
                      selectedSenderFax?.id === fax.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">📠</span>
                        </div>
                        <div>
                          <p className="font-medium">{fax.number}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              ✅ {fax.status}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {fax.type}
                            </span>
                            {fax.isDefault && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {selectedSenderFax?.id === fax.id && (
                        <span className="text-blue-600 font-medium">✓ Selected</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No fax numbers available</p>
                <Link href="/account">
                  <Button>Add Fax Number</Button>
                </Link>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
