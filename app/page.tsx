"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const rows = Array.from({ length: 6 }).map((_, i) => ({
    date: "2025-09-01",
    status: i % 3 === 0 ? "Failed" : i % 2 === 0 ? "Scheduled" : "Delivered",
    recipient: `+1 (555) 010${i}`,
    tags: i % 2 === 0 ? "billing" : "hr",
  }))

  const exportToCSV = () => {
    if (!isClient) return
    
    try {
      // Create CSV content with proper escaping
      const headers = ["Date", "Status", "Recipient", "Tags"]
      const csvRows = rows.map(row => [
        `"${row.date}"`,
        `"${row.status}"`,
        `"${row.recipient}"`,
        `"${row.tags}"`
      ])
      
      const csvContent = [
        headers.join(","),
        ...csvRows.map(row => row.join(","))
      ].join("\n")

      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `fax-activity-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up the URL object
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting CSV:", error)
      alert("Error exporting CSV. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Sent (month)" value="128" />
        <SummaryCard title="Received (month)" value="93" />
        <SummaryCard title="Pending / Scheduled" value="12" />
        <SummaryCard title="Failed" value="3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <div className="flex gap-2">
              {isClient ? (
                <Button variant="outline" size="sm" onClick={exportToCSV}>
                  Export CSV
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Export CSV
                </Button>
              )}
              <Button size="sm" asChild>
                <Link href="/send-fax">Send Fax</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell>{r.recipient}</TableCell>
                    <TableCell>{r.tags}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-1 text-sm">Storage</div>
              <Progress value={62} />
              <div className="mt-1 text-xs text-muted-foreground">62% of 5 GB</div>
            </div>
            <div>
              <div className="mb-1 text-sm">Success Rate</div>
              <Progress value={96} className="bg-secondary" />
              <div className="mt-1 text-xs text-muted-foreground">96% last 30 days</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  )
}
