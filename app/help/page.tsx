"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  Code, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText,
  Video,
  Download,
  ExternalLink
} from "lucide-react"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Handle contact support
  const handleContactSupport = (method: string) => {
    switch (method) {
      case 'email':
        alert('Opening email client... This would typically open your default email client.')
        break
      case 'phone':
        alert('Opening phone dialer... This would typically open your phone app.')
        break
      case 'chat':
        alert('Opening live chat... This would typically open a chat widget.')
        break
      default:
        alert(`Contacting support via ${method}...`)
    }
  }

  // Handle download
  const handleDownload = (item: string) => {
    alert(`Downloading ${item}... This would typically download a PDF or documentation file.`)
  }

  // Handle external links
  const handleExternalLink = (url: string) => {
    alert(`Opening ${url}... This would typically open in a new tab.`)
  }

  const faqItems = [
    {
      question: "How do I send my first fax?",
      answer: "To send your first fax, navigate to the 'Send Fax' page, upload your document, enter the recipient's fax number, and click 'Send'. You can also add a cover page and schedule the fax for later delivery."
    },
    {
      question: "What file formats are supported?",
      answer: "We support PDF, DOC, DOCX, TXT, RTF, and image formats (JPG, PNG, TIFF). For best results, we recommend using PDF format as it maintains the highest quality during transmission."
    },
    {
      question: "How do I schedule a fax for later?",
      answer: "When composing a fax, you can use the calendar feature to select a future date and time for delivery. Scheduled faxes will be automatically sent at the specified time."
    },
    {
      question: "Can I send faxes internationally?",
      answer: "Yes, you can send faxes to international numbers. Make sure to include the country code (e.g., +1 for US, +44 for UK). International rates may apply."
    },
    {
      question: "How do I set up eSignatures?",
      answer: "Go to the 'eSignatures' page and either upload a signature image or use the drawing tool to create a digital signature. You can then attach signatures to your faxes."
    }
  ]

  const tutorials = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of sending and receiving faxes",
      icon: BookOpen,
      duration: "5 min read",
      category: "Beginner"
    },
    {
      title: "Advanced Features",
      description: "Explore scheduling, bulk sending, and integrations",
      icon: FileText,
      duration: "10 min read",
      category: "Advanced"
    },
    {
      title: "API Integration",
      description: "Connect your applications with our REST API",
      icon: Code,
      duration: "15 min read",
      category: "Developer"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      duration: "Various",
      category: "All Levels"
    }
  ]

  const supportOptions = [
    {
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "24/7",
      responseTime: "< 2 minutes"
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support representative",
      icon: Phone,
      availability: "Mon-Fri 9AM-6PM EST",
      responseTime: "Immediate"
    },
    {
      title: "Email Support",
      description: "Send us your questions and we'll respond quickly",
      icon: Mail,
      availability: "24/7",
      responseTime: "< 4 hours"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="flex items-center gap-2 min-w-0">
        <Input placeholder="Search help articles, tutorials, and FAQs..." className="flex-1 w-full min-w-0" />
        <Button variant="outline" className="shrink-0">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Find answers to the most common questions about using our fax service.
            </p>
            <Button 
              variant="outline" 
              className="w-full min-w-0"
              onClick={() => handleExternalLink('FAQ')}
            >
              <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Browse FAQ</span>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Tutorials & Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Step-by-step guides to help you master all features of our platform.
            </p>
            <Button 
              variant="outline" 
              className="w-full min-w-0"
              onClick={() => handleExternalLink('Tutorials')}
            >
              <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">View Tutorials</span>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-purple-600" />
              API Documentation
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Complete API reference for developers and integration partners.
            </p>
            <Button 
              variant="outline" 
              className="w-full min-w-0"
              onClick={() => handleExternalLink('API Documentation')}
            >
              <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">API Docs</span>
            </Button>
            </CardContent>
          </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Tutorials Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutorials.map((tutorial, index) => {
              const IconComponent = tutorial.icon
              return (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <IconComponent className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {tutorial.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{tutorial.duration}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Support Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Contact Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <IconComponent className="h-5 w-5 text-green-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{option.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Available:</span>
                          <span>{option.availability}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Response:</span>
                          <span>{option.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleContactSupport(option.title.toLowerCase())}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">User Manual (PDF)</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDownload('User Manual')}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API SDK</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDownload('API SDK')}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mobile App</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleExternalLink('Mobile App Store')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Get App
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Fax Service</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Service</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <Badge className="bg-green-100 text-green-800">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Updated</span>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
