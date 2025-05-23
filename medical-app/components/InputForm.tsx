"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for common symptoms
const commonSymptoms = [
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "headache", label: "Headache" },
  { id: "sore-throat", label: "Sore Throat" },
  { id: "fatigue", label: "Fatigue" },
  { id: "body-ache", label: "Body Ache" },
  { id: "runny-nose", label: "Runny Nose" },
  { id: "congestion", label: "Congestion" },
  { id: "shortness-of-breath", label: "Shortness of Breath" },
  { id: "nausea", label: "Nausea" },
  { id: "diarrhea", label: "Diarrhea" },
  { id: "vomiting", label: "Vomiting" },
]

export function InputForm() {
  const router = useRouter()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const filteredSymptoms = commonSymptoms.filter((symptom) =>
    symptom.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSymptomToggle = (id: string) => {
    setSelectedSymptoms((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would send this data to an API
    // For now, we'll just navigate to the results page
    router.push("/results")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="symptom-search">Search Symptoms</Label>
              <Input
                id="symptom-search"
                placeholder="Type to search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Common Symptoms</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom.id}
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={() => handleSymptomToggle(symptom.id)}
                    />
                    <Label htmlFor={symptom.id} className="cursor-pointer">
                      {symptom.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-info">Additional Information</Label>
              <Textarea
                id="additional-info"
                placeholder="Describe any other symptoms or relevant information..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={selectedSymptoms.length === 0}>
              Get Predictions
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
