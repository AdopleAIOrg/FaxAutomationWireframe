"use client"

import { useState, useEffect } from "react"

export default function AccountPage() {
  const [userProfile] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    position: "IT Manager",
    memberSince: "2022-03-15",
    plan: "Pro Plan",
    status: "Active"
  })

  const [billingInfo] = useState({
    plan: "Pro Plan",
    nextBilling: "2024-02-15",
    amount: "$29.99",
    features: ["Unlimited Faxes", "Advanced Analytics", "API Access", "Priority Support"]
  })

  const [faxNumbers, setFaxNumbers] = useState([
    {
      id: "FAX-001",
      number: "+1 (555) 123-4567",
      type: "Provider",
      provider: "Twilio",
      status: "Active",
      isDefault: true,
      addedDate: "2024-01-15"
    },
    {
      id: "FAX-002", 
      number: "+1 (555) 987-6543",
      type: "Custom",
      provider: "Custom",
      status: "Active",
      isDefault: false,
      addedDate: "2024-01-20"
    }
  ])

  const [activityLog] = useState([
    { action: "Profile updated", time: "2 hours ago", type: "profile" },
    { action: "Password changed", time: "1 day ago", type: "security" },
    { action: "Two-factor authentication enabled", time: "3 days ago", type: "security" },
    { action: "New fax number added", time: "1 week ago", type: "fax" },
    { action: "Billing information updated", time: "2 weeks ago", type: "billing" }
  ])

  const [showAddFaxDialog, setShowAddFaxDialog] = useState(false)
  const [newFaxNumber, setNewFaxNumber] = useState("")
  const [newFaxType, setNewFaxType] = useState("Custom")
  const [showProviderOptions, setShowProviderOptions] = useState(false)

  // Load fax numbers from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNumbers = localStorage.getItem('user-fax-numbers')
      if (savedNumbers) {
        setFaxNumbers(JSON.parse(savedNumbers))
      }
    }
  }, [])

  const providerNumbers = [
    { number: "+1 (555) 100-0001", location: "New York, NY", price: "FREE" },
    { number: "+1 (555) 100-0002", location: "Los Angeles, CA", price: "FREE" },
    { number: "+1 (555) 100-0003", location: "Chicago, IL", price: "FREE" },
    { number: "+1 (555) 100-0004", location: "Houston, TX", price: "FREE" },
    { number: "+1 (555) 100-0005", location: "Phoenix, AZ", price: "FREE" },
    { number: "+1 (555) 100-0006", location: "Philadelphia, PA", price: "FREE" },
    { number: "+1 (555) 100-0007", location: "San Antonio, TX", price: "FREE" },
    { number: "+1 (555) 100-0008", location: "San Diego, CA", price: "FREE" }
  ]

  const handleAddFaxNumber = () => {
    if (newFaxNumber.trim()) {
      const newFax = {
        id: `FAX-${Date.now()}`,
        number: newFaxNumber.trim(),
        type: newFaxType,
        provider: newFaxType === "Provider" ? "Twilio" : "Custom",
        status: "Active",
        isDefault: faxNumbers.length === 0,
        addedDate: new Date().toISOString().split('T')[0]
      }
      setFaxNumbers([...faxNumbers, newFax])
      setNewFaxNumber("")
      setNewFaxType("Custom")
      setShowAddFaxDialog(false)
      setShowProviderOptions(false)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user-fax-numbers', JSON.stringify([...faxNumbers, newFax]))
      }
    }
  }

  const handleSelectProviderNumber = (providerNumber: any) => {
    const newFax = {
      id: `FAX-${Date.now()}`,
      number: providerNumber.number,
      type: "Provider",
      provider: "Twilio",
      status: "Active",
      isDefault: faxNumbers.length === 0,
      addedDate: new Date().toISOString().split('T')[0]
    }
    setFaxNumbers([...faxNumbers, newFax])
    setShowAddFaxDialog(false)
    setShowProviderOptions(false)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-fax-numbers', JSON.stringify([...faxNumbers, newFax]))
    }
  }

  // Handle setting default fax number
  const handleSetDefault = (faxId: string) => {
    const updatedNumbers = faxNumbers.map(fax => ({
      ...fax,
      isDefault: fax.id === faxId
    }))
    setFaxNumbers(updatedNumbers)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-fax-numbers', JSON.stringify(updatedNumbers))
    }
  }

  // Handle deleting fax number
  const handleDeleteFax = (faxId: string) => {
    const updatedNumbers = faxNumbers.filter(fax => fax.id !== faxId)
    setFaxNumbers(updatedNumbers)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-fax-numbers', JSON.stringify(updatedNumbers))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Account Settings</h1>
      
      {/* Profile Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">👤</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Profile</p>
              <p className="font-semibold">Complete</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold">🏢</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Company</p>
              <p className="font-semibold">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-semibold">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-semibold">Mar 2022</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-semibold">🔒</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Security</p>
              <p className="font-semibold">2FA Enabled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>👤</span>
          Profile Information
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-600">JS</span>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            📷 Change Photo
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              value={userProfile.firstName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              value={userProfile.lastName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={userProfile.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              value={userProfile.phone}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input 
              type="text" 
              value={userProfile.company}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input 
              type="text" 
              value={userProfile.position}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          ✅ Update Profile
        </button>
      </div>

      {/* Billing Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>💳</span>
          Billing Information
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Current Plan</p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Pro Plan
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Next billing</p>
              <p className="font-semibold">Feb 15, 2024</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Payment Method</span>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                💳 Update
              </button>
            </div>
            <p className="text-sm text-gray-600">•••• •••• •••• 4242</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Plan Features</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Unlimited Faxes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Advanced Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">API Access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Priority Support</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              ⚙️ Manage Billing
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              📥 Download Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🔒</span>
          Security Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Enabled
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Login Notifications</p>
              <p className="text-sm text-gray-600">Get notified of new logins</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Enabled
            </span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              🔒 Security Settings
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              ⚙️ Privacy Settings
            </button>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>📅</span>
          Recent Activity
        </h2>
        <div className="space-y-3">
          {activityLog.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`h-2 w-2 rounded-full ${
                activity.type === 'profile' ? 'bg-green-500' :
                activity.type === 'security' ? 'bg-blue-500' :
                activity.type === 'fax' ? 'bg-purple-500' :
                'bg-orange-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fax Numbers Management */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span>📠</span>
            Fax Numbers Management
          </h2>
          <button 
            onClick={() => setShowAddFaxDialog(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ➕ Add Fax Number
          </button>
        </div>
        <div className="space-y-4">
          {faxNumbers.map((fax) => (
            <div key={fax.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-blue-600 text-xl">📠</span>
                <div>
                  <p className="font-medium">{fax.number}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      ✅ {fax.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      fax.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
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
              <div className="flex items-center gap-2">
                {!fax.isDefault && (
                  <button 
                    onClick={() => handleSetDefault(fax.id)}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                  >
                    Set as Default
                  </button>
                )}
                <button 
                  onClick={() => navigator.clipboard.writeText(fax.number)}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  📋
                </button>
                <button 
                  onClick={() => handleDeleteFax(fax.id)}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Fax Number Dialog */}
      {showAddFaxDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add New Fax Number</h3>
              <button 
                onClick={() => {
                  setShowAddFaxDialog(false)
                  setShowProviderOptions(false)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {!showProviderOptions ? (
              <div className="space-y-6">
                <p className="text-gray-600">Choose how you want to add your fax number:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Add Your Own Number */}
                  <div 
                    onClick={() => setShowProviderOptions(false)}
                    className="p-6 border-2 border-blue-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">📝</div>
                      <h4 className="text-lg font-semibold mb-2">Add Your Own Number</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Use your existing fax number or port your current number
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Continue
                      </button>
                    </div>
                  </div>

                  {/* Choose from Provider */}
                  <div 
                    onClick={() => setShowProviderOptions(true)}
                    className="p-6 border-2 border-green-200 rounded-lg cursor-pointer hover:border-green-300 hover:bg-green-50"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">🏢</div>
                      <h4 className="text-lg font-semibold mb-2">Choose from Provider</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Select from our FREE available fax numbers in different locations
                      </p>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Browse Numbers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <button 
                    onClick={() => setShowProviderOptions(false)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ← Back
                  </button>
                  <h4 className="text-lg font-semibold">Choose from FREE Available Numbers</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {providerNumbers.map((providerNumber, index) => (
                    <div 
                      key={index}
                      onClick={() => handleSelectProviderNumber(providerNumber)}
                      className="p-4 border rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{providerNumber.number}</p>
                          <p className="text-sm text-gray-600">{providerNumber.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600 font-bold">{providerNumber.price}</p>
                          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Number Form */}
            {!showProviderOptions && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-lg font-semibold mb-4">Add Your Own Fax Number</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fax Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={newFaxNumber}
                      onChange={(e) => setNewFaxNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={newFaxType}
                      onChange={(e) => setNewFaxType(e.target.value)}
                    >
                      <option value="Custom">Custom Number</option>
                      <option value="Provider">Provider Number</option>
                    </select>
                  </div>
                  {newFaxType === "Provider" && (
                    <div className="p-3 bg-blue-50 rounded-md">
                      <div className="flex items-center gap-2 text-blue-800">
                        <span>⚠️</span>
                        <span className="text-sm font-medium">Provider Number</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">
                        This number will be provided by our fax service provider.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => {
                      setShowAddFaxDialog(false)
                      setShowProviderOptions(false)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddFaxNumber}
                    disabled={!newFaxNumber.trim()}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Add Fax Number
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
      )}
    </div>
  )
}