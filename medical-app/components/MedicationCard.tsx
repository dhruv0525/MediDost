import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Medication {
  id: number
  name: string
  description: string
  dosage: string
  sideEffects: string[]
  otcAvailable: boolean
}

interface MedicationCardProps {
  medication: Medication
}

export function MedicationCard({ medication }: MedicationCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{medication.name}</CardTitle>
            <CardDescription>{medication.description}</CardDescription>
          </div>
          {medication.otcAvailable && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              Over-the-counter
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Typical Dosage</h4>
            <p className="text-sm text-muted-foreground">{medication.dosage}</p>
          </div>

          <div>
            <h4 className="font-medium mb-1">Possible Side Effects</h4>
            <div className="flex flex-wrap gap-2">
              {medication.sideEffects.map((effect, index) => (
                <div key={index} className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs">
                  {effect}
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground pt-2">
            <p>Note: Always consult with a healthcare professional before taking any medication.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
