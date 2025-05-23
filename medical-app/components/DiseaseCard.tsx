import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Disease {
  id: number
  name: string
  probability: number
  description: string
  symptoms: string[]
}

interface DiseaseCardProps {
  disease: Disease
}

export function DiseaseCard({ disease }: DiseaseCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{disease.name}</CardTitle>
            <CardDescription>Match probability based on your symptoms</CardDescription>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">{disease.probability}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={disease.probability} className="h-2 mb-4" />

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Description</h4>
            <p className="text-sm text-muted-foreground">{disease.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-1">Common Symptoms</h4>
            <div className="flex flex-wrap gap-2">
              {disease.symptoms.map((symptom, index) => (
                <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                  {symptom}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
