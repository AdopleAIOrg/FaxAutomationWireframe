"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { PenTool, Upload, Download, Trash2, Edit, MoreVertical, Grid3X3, List } from "lucide-react"

export default function ESignaturesPage() {
  const [eSignatures, setESignatures] = useState([
    {
      id: "ESIG-001",
      name: "John Smith - Official",
      type: "Digital",
      createdDate: "2024-01-15",
      lastUsed: "2024-01-20",
      usageCount: 12,
      status: "Active",
      description: "Official signature for legal documents and contracts"
    },
    {
      id: "ESIG-002",
      name: "Sarah Johnson - Initials",
      type: "Handwritten",
      createdDate: "2024-01-10",
      lastUsed: "2024-01-18",
      usageCount: 8,
      status: "Active",
      description: "Initials for quick approvals and internal documents"
    },
    {
      id: "ESIG-003",
      name: "Mike Wilson - Executive",
      type: "Digital",
      createdDate: "2024-01-08",
      lastUsed: "2024-01-19",
      usageCount: 15,
      status: "Active",
      description: "Executive signature for high-level approvals"
    },
    {
      id: "ESIG-004",
      name: "Lisa Chen - Department",
      type: "Handwritten",
      createdDate: "2024-01-05",
      lastUsed: "2024-01-17",
      usageCount: 6,
      status: "Active",
      description: "Department head signature for departmental documents"
    },
    {
      id: "ESIG-005",
      name: "David Brown - Legal",
      type: "Digital",
      createdDate: "2024-01-03",
      lastUsed: "2024-01-16",
      usageCount: 22,
      status: "Active",
      description: "Legal team signature for contracts and agreements"
    },
    {
      id: "ESIG-006",
      name: "Emma Davis - Finance",
      type: "Handwritten",
      createdDate: "2024-01-01",
      lastUsed: "2024-01-15",
      usageCount: 9,
      status: "Active",
      description: "Finance department signature for financial documents"
    }
  ])

  const [editingSignature, setEditingSignature] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPropertiesDialog, setShowPropertiesDialog] = useState(false)
  const [selectedSignature, setSelectedSignature] = useState<any>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showDrawDialog, setShowDrawDialog] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [drawnSignature, setDrawnSignature] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')

  // Save eSignatures to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('esignatures', JSON.stringify(eSignatures))
    }
  }, [eSignatures])

  // Handle properties
  const handleProperties = (signature: any) => {
    setSelectedSignature(signature)
    setShowPropertiesDialog(true)
  }

  // Handle upload
  const handleUpload = () => {
    setShowUploadDialog(true)
  }

  // Handle draw
  const handleDraw = () => {
    setShowDrawDialog(true)
    // Setup canvas when dialog opens
    setTimeout(() => {
      const canvas = document.getElementById('signatureCanvas') as HTMLCanvasElement
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.strokeStyle = '#000000'
          ctx.lineWidth = 2
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
        }
      }
    }, 100)
  }

  // Handle upload file
  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setUploadedImage(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle save uploaded signature
  const handleSaveUploadedSignature = () => {
    if (uploadedImage) {
      const newSignature = {
        id: `ESIG-${Date.now()}`,
        name: `Uploaded Signature ${Date.now()}`,
        type: "Digital",
        createdDate: new Date().toISOString().split('T')[0],
        lastUsed: "Never",
        usageCount: 0,
        status: "Active",
        description: "Uploaded signature image",
        imageData: uploadedImage
      }
      setESignatures(prev => [...prev, newSignature])
      setShowUploadDialog(false)
      setUploadedImage(null)
      alert(`"${newSignature.name}" has been uploaded successfully.`)
    }
  }

  // Handle draw signature
  const handleDrawSignature = () => {
    if (drawnSignature) {
      const newSignature = {
        id: `ESIG-${Date.now()}`,
        name: `Hand-drawn Signature ${Date.now()}`,
        type: "Handwritten",
        createdDate: new Date().toISOString().split('T')[0],
        lastUsed: "Never",
        usageCount: 0,
        status: "Active",
        description: "Hand-drawn signature created using the draw tool",
        imageData: drawnSignature
      }
      setESignatures(prev => [...prev, newSignature])
      setShowDrawDialog(false)
      setDrawnSignature(null)
      alert(`"${newSignature.name}" has been created successfully.`)
    }
  }

  // Handle drawing on canvas
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = e.currentTarget
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = e.currentTarget
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      ctx.stroke()
    }
  }

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(false)
    const canvas = e.currentTarget
    const imageData = canvas.toDataURL()
    setDrawnSignature(imageData)
  }

  const clearCanvas = () => {
    const canvas = document.getElementById('signatureCanvas') as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setDrawnSignature(null)
      }
    }
  }

  // Handle edit
  const handleEdit = (signature: any) => {
    setEditingSignature(signature)
    setShowEditDialog(true)
  }

  // Handle download
  const handleDownload = (signature: any) => {
    const content = `eSignature Details:
ID: ${signature.id}
Name: ${signature.name}
Type: ${signature.type}
Created: ${signature.createdDate}
Usage: ${signature.usage} times
Status: ${signature.status}
Description: ${signature.description || 'No description'}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `esignature-${signature.id}-${signature.name.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle attach to fax
  const handleAttachToFax = (signature: any) => {
    // Store signature data for send-fax page
    if (typeof window !== 'undefined') {
      const signatureData = {
        id: signature.id,
        name: signature.name,
        type: signature.type
      }
      localStorage.setItem('selected-esignature', JSON.stringify(signatureData))
      
      // Save all eSignatures to localStorage for the Send Fax page
      localStorage.setItem('esignatures', JSON.stringify(eSignatures))
      
      // Navigate to Send Fax page
      window.location.href = '/send-fax'
    }
  }

  // Handle delete
  const handleDelete = (signatureId: string) => {
    if (confirm('Are you sure you want to delete this eSignature?')) {
      setESignatures(prev => prev.filter(signature => signature.id !== signatureId))
    }
  }

  // Handle save edit
  const handleSaveEdit = (updatedSignature: any) => {
    setESignatures(prev => 
      prev.map(signature => 
        signature.id === updatedSignature.id 
          ? { ...updatedSignature, createdDate: new Date().toISOString().split('T')[0] }
          : signature
      )
    )
    setShowEditDialog(false)
    setEditingSignature(null)
  }

  const getTypeColor = (type: string) => {
    return type === "Digital" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">Total Signatures</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">72</div>
                <div className="text-sm text-muted-foreground">Total Usage</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Digital</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Handwritten</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">eSignatures</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline" onClick={handleDraw}>
            <PenTool className="h-4 w-4 mr-2" />
            Draw
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>eSignatures</CardTitle>
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
      </Card>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {eSignatures.map((signature) => (
          <Card key={signature.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">{signature.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getTypeColor(signature.type)}`}>
                    {signature.type}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => handleProperties(signature)}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Signature Preview */}
              <div className="h-20 rounded-md bg-white border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  {signature.imageData ? (
                    <img 
                      src={signature.imageData} 
                      alt="Signature" 
                      className="max-h-16 max-w-full object-contain"
                    />
                  ) : signature.type === "Digital" ? (
                    <div className="text-lg font-bold text-blue-600" style={{ fontFamily: 'cursive' }}>
                      {signature.name.split(' ')[0]} {signature.name.split(' ')[1]?.charAt(0)}.
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-green-600" style={{ fontFamily: 'cursive' }}>
                      {signature.name.split(' ')[0]} {signature.name.split(' ')[1]?.charAt(0)}.
                    </div>
                  )}
                </div>
              </div>
              

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 min-w-0 text-xs"
                  onClick={() => handleEdit(signature)}
                >
                  <Edit className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">Edit</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 min-w-0 text-xs"
                  onClick={() => handleDownload(signature)}
                >
                  <Download className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">Download</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 min-w-0 text-xs"
                  onClick={() => handleAttachToFax(signature)}
                >
                  <PenTool className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">Attach to Fax</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-shrink-0 text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(signature.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
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
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Created</th>
                    <th className="p-4 font-medium">Last Used</th>
                    <th className="p-4 font-medium">Usage</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eSignatures.map((signature) => (
                    <tr key={signature.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium text-sm">{signature.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {signature.description || 'No description'}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={getTypeColor(signature.type)}>
                          {signature.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(signature.status)}>
                          {signature.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{signature.createdDate}</td>
                      <td className="p-4 text-sm">{signature.lastUsed}</td>
                      <td className="p-4 text-sm">{signature.usageCount}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProperties(signature)}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAttachToFax(signature)}
                          >
                            <PenTool className="h-4 w-4 mr-1" />
                            Attach
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(signature)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(signature.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

      {/* Properties Dialog */}
      <Dialog open={showPropertiesDialog} onOpenChange={setShowPropertiesDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Properties - {selectedSignature?.name}</DialogTitle>
          </DialogHeader>
          {selectedSignature && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Created:</label>
                  <div className="text-sm text-muted-foreground">{selectedSignature.createdDate}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Used:</label>
                  <div className="text-sm text-muted-foreground">{selectedSignature.lastUsed}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Usage Count:</label>
                  <div className="text-sm text-muted-foreground">{selectedSignature.usageCount}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Status:</label>
                  <div className="text-sm text-muted-foreground">{selectedSignature.status}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description:</label>
                <div className="text-sm text-muted-foreground mt-1">{selectedSignature.description}</div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setShowPropertiesDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload eSignature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select File</label>
              <Input 
                type="file" 
                accept=".png,.jpg,.jpeg,.svg"
                onChange={handleUploadFile}
                className="mt-1"
              />
            </div>
            {uploadedImage && (
              <div>
                <label className="text-sm font-medium">Preview:</label>
                <div className="mt-2 h-32 border border-gray-200 rounded-md flex items-center justify-center bg-gray-50">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded signature" 
                    className="max-h-28 max-w-full object-contain"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setShowUploadDialog(false)
                setUploadedImage(null)
              }}>
                Cancel
              </Button>
              <Button onClick={handleSaveUploadedSignature} disabled={!uploadedImage}>
                Save Signature
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Draw Dialog */}
      <Dialog open={showDrawDialog} onOpenChange={setShowDrawDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Draw eSignature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-64 border-2 border-gray-300 rounded-lg bg-white relative">
              <canvas
                id="signatureCanvas"
                width={600}
                height={240}
                className="w-full h-full cursor-crosshair"
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={() => setIsDrawing(false)}
                style={{ 
                  border: 'none',
                  borderRadius: '6px'
                }}
              />
              {!drawnSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <PenTool className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Draw your signature here</div>
                    <div className="text-xs text-gray-400 mt-1">Click and drag to draw</div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={clearCanvas}>
                Clear
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  setShowDrawDialog(false)
                  setDrawnSignature(null)
                }}>
                  Cancel
                </Button>
                <Button onClick={handleDrawSignature} disabled={!drawnSignature}>
                  Save Signature
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit eSignature - {editingSignature?.name}</DialogTitle>
          </DialogHeader>
          {editingSignature && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Signature Name</label>
                  <Input 
                    value={editingSignature.name} 
                    onChange={(e) => setEditingSignature({...editingSignature, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Input 
                    value={editingSignature.type} 
                    onChange={(e) => setEditingSignature({...editingSignature, type: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  value={editingSignature.description || ''} 
                  onChange={(e) => setEditingSignature({...editingSignature, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveEdit(editingSignature)}>
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
