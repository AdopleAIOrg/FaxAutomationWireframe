import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function AnalyticsPage() {
  const monthlyData = [
    { month: "Jan", sent: 45, received: 32, failed: 2 },
    { month: "Feb", sent: 52, received: 38, failed: 1 },
    { month: "Mar", sent: 48, received: 41, failed: 3 },
    { month: "Apr", sent: 61, received: 35, failed: 2 },
    { month: "May", sent: 58, received: 42, failed: 1 },
    { month: "Jun", sent: 67, received: 39, failed: 4 },
    { month: "Jul", sent: 73, received: 45, failed: 2 },
    { month: "Aug", sent: 69, received: 38, failed: 3 },
    { month: "Sep", sent: 78, received: 44, failed: 1 },
    { month: "Oct", sent: 82, received: 47, failed: 2 },
    { month: "Nov", sent: 89, received: 51, failed: 3 },
    { month: "Dec", sent: 95, received: 48, failed: 2 },
  ]

  const topRecipients = [
    { recipient: "+1 (555) 123-4567", count: 24, success: 96 },
    { recipient: "+1 (555) 234-5678", count: 18, success: 94 },
    { recipient: "+1 (555) 345-6789", count: 15, success: 100 },
    { recipient: "+1 (555) 456-7890", count: 12, success: 92 },
    { recipient: "+1 (555) 567-8901", count: 9, success: 89 },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">512</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">-0.2s from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Trends Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Monthly Usage Trends</CardTitle>
            <Button size="sm" variant="outline" asChild>
              <Link href="/analytics">Export PDF</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80 space-y-4">
              {/* Simple bar chart representation */}
              <div className="space-y-2">
                {monthlyData.slice(-6).map((data, index) => (
                  <div key={data.month} className="flex items-center space-x-4">
                    <div className="w-8 text-sm font-medium">{data.month}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 text-xs text-muted-foreground">Sent</div>
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(data.sent / 100) * 100}%` }}
                          />
                        </div>
                        <div className="w-8 text-xs">{data.sent}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 text-xs text-muted-foreground">Received</div>
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(data.received / 60) * 100}%` }}
                          />
                        </div>
                        <div className="w-8 text-xs">{data.received}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Rate and Top Recipients */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Success Rate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall</span>
                  <span>96.2%</span>
                </div>
                <Progress value={96.2} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Last 30 days</span>
                  <span>97.1%</span>
                </div>
                <Progress value={97.1} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>This week</span>
                  <span>98.5%</span>
                </div>
                <Progress value={98.5} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Recipients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topRecipients.map((recipient, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{recipient.recipient}</div>
                      <div className="text-xs text-muted-foreground">{recipient.count} faxes</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{recipient.success}%</div>
                      <div className="text-xs text-muted-foreground">success</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Failed</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Avg Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.slice(-6).map((data, index) => (
                <TableRow key={data.month}>
                  <TableCell className="font-medium">{data.month}</TableCell>
                  <TableCell>{data.sent}</TableCell>
                  <TableCell>{data.received}</TableCell>
                  <TableCell className="text-red-500">{data.failed}</TableCell>
                  <TableCell>{((data.sent - data.failed) / data.sent * 100).toFixed(1)}%</TableCell>
                  <TableCell>{(Math.random() * 2 + 1.5).toFixed(1)}s</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
