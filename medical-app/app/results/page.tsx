"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DiseaseCard } from "@/components/DiseaseCard"
import { RemedyCard } from "@/components/RemedyCard"
import { MedicationCard } from "@/components/MedicationCard"
import { HospitalCard } from "@/components/HospitalCard"
import { ModeToggle } from "@/components/mode-toggle"

// Mock data - would be replaced with actual API responses
const mockDiseases = [
  {
    id: 1,
    name: "Common Cold",
    probability: 85,
    description: "A viral infectious disease of the upper respiratory tract that primarily affects the nose.",
    symptoms: ["Runny nose", "Sore throat", "Cough", "Congestion", "Sneezing"],
  },
  {
    id: 2,
    name: "Seasonal Allergies",
    probability: 65,
    description: "An allergic reaction to pollen from trees, grasses, and weeds, as they are carried through the air.",
    symptoms: ["Sneezing", "Itchy eyes", "Runny nose", "Congestion", "Watery eyes"],
  },
  {
    id: 3,
    name: "Sinusitis",
    probability: 45,
    description: "Inflammation of the sinuses, typically caused by an infection.",
    symptoms: ["Facial pain", "Nasal congestion", "Headache", "Thick nasal discharge", "Reduced sense of smell"],
  },
]

const mockRemedies = [
  {
    id: 1,
    name: "Hydration",
    description: "Drink plenty of fluids, especially water, to help thin mucus and reduce congestion.",
    instructions: "Aim for 8-10 glasses of water daily. Warm liquids like tea with honey can be soothing.",
  },
  {
    id: 2,
    name: "Steam Inhalation",
    description: "Breathing in warm, moist air can help alleviate nasal congestion and sinus pressure.",
    instructions:
      "Boil water, pour into a bowl, place your face over the bowl with a towel over your head, and breathe deeply for 5-10 minutes.",
  },
  {
    id: 3,
    name: "Saline Nasal Rinse",
    description: "Rinsing your nasal passages with salt water can help clear mucus and allergens.",
    instructions: "Use a neti pot or nasal spray with a saline solution. Perform 1-3 times daily as needed.",
  },
]

const mockMedications = [
  {
    id: 1,
    name: "Antihistamines",
    description: "Help relieve allergy symptoms such as sneezing, itching, and runny nose.",
    dosage: "Follow package instructions. Typically one tablet daily.",
    sideEffects: ["Drowsiness", "Dry mouth", "Dizziness"],
    otcAvailable: true,
  },
  {
    id: 2,
    name: "Decongestants",
    description: "Reduce swelling in the nasal passages, making it easier to breathe.",
    dosage: "Follow package instructions. Typically every 4-6 hours as needed.",
    sideEffects: ["Increased blood pressure", "Insomnia", "Nervousness"],
    otcAvailable: true,
  },
  {
    id: 3,
    name: "Pain Relievers",
    description: "Help reduce pain, fever, and inflammation.",
    dosage: "Adults: 1-2 tablets every 4-6 hours as needed, not exceeding 6 tablets in 24 hours.",
    sideEffects: ["Stomach upset", "Heartburn"],
    otcAvailable: true,
  },
]

const mockHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    distance: 2.3,
    address: "123 Medical Center Blvd, Cityville",
    phone: "(555) 123-4567",
    availableSlots: 8,
    specialties: ["General Medicine", "ENT", "Allergy & Immunology"],
  },
  {
    id: 2,
    name: "Riverside Medical Center",
    distance: 3.7,
    address: "456 Riverside Drive, Cityville",
    phone: "(555) 987-6543",
    availableSlots: 5,
    specialties: ["Family Medicine", "Internal Medicine", "Pediatrics"],
  },
  {
    id: 3,
    name: "Wellness Community Clinic",
    distance: 1.5,
    address: "789 Health Way, Cityville",
    phone: "(555) 456-7890",
    availableSlots: 12,
    specialties: ["Primary Care", "Urgent Care", "Preventive Medicine"],
  },
]

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("diseases")

  // In a real app, we would get these from URL params or context
  const enteredSymptoms = ["Runny nose", "Sneezing", "Congestion", "Sore throat"]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <h1 className="text-xl font-bold">MediPredict</h1>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/home">
              <Button variant="ghost" className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to Symptoms
              </Button>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Prediction Results</h1>
            <div className="p-4 bg-muted rounded-lg mb-6">
              <h2 className="font-medium mb-2">Based on your symptoms:</h2>
              <div className="flex flex-wrap gap-2">
                {enteredSymptoms.map((symptom, index) => (
                  <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {symptom}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="diseases">Diseases</TabsTrigger>
              <TabsTrigger value="remedies">Home Remedies</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="hospitals">Nearby Hospitals</TabsTrigger>
            </TabsList>
            <TabsContent value="diseases" className="space-y-4">
              {mockDiseases.map((disease) => (
                <DiseaseCard key={disease.id} disease={disease} />
              ))}
            </TabsContent>
            <TabsContent value="remedies" className="space-y-4">
              {mockRemedies.map((remedy) => (
                <RemedyCard key={remedy.id} remedy={remedy} />
              ))}
            </TabsContent>
            <TabsContent value="medications" className="space-y-4">
              {mockMedications.map((medication) => (
                <MedicationCard key={medication.id} medication={medication} />
              ))}
            </TabsContent>
            <TabsContent value="hospitals" className="space-y-4">
              {mockHospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Disclaimer: This is a medical support interface only. Not intended for real-time diagnosis or personal data
            handling. Always consult with a healthcare professional.
          </p>
        </div>
      </footer>
    </div>
  )
}
