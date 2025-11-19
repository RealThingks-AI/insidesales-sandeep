import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Deals = () => {
  const deals = [
    {
      id: 1,
      title: "Enterprise Software License",
      company: "Tech Corp",
      value: "$50,000",
      stage: "Negotiation",
      probability: 75,
      closeDate: "2024-02-15",
    },
    {
      id: 2,
      title: "Cloud Migration Project",
      company: "Startup Inc",
      value: "$25,000",
      stage: "Proposal",
      probability: 60,
      closeDate: "2024-02-28",
    },
    {
      id: 3,
      title: "Annual Support Contract",
      company: "Enterprise Solutions",
      value: "$100,000",
      stage: "Prospecting",
      probability: 30,
      closeDate: "2024-03-15",
    },
    {
      id: 4,
      title: "Consulting Services",
      company: "Business Partners",
      value: "$15,000",
      stage: "Qualification",
      probability: 45,
      closeDate: "2024-02-20",
    },
  ];

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      Prospecting: "bg-blue-500",
      Qualification: "bg-yellow-500",
      Proposal: "bg-orange-500",
      Negotiation: "bg-green-500",
    };
    return colors[stage] || "bg-gray-500";
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Deals</h2>
            <p className="text-muted-foreground">Track your sales pipeline</p>
          </div>
          <Button className="space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Deal</span>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {deals.map((deal) => (
            <Card key={deal.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{deal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{deal.company}</p>
                  </div>
                  <Badge className={`${getStageColor(deal.stage)} text-white`}>
                    {deal.stage}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">{deal.value}</span>
                    <span className="text-sm text-muted-foreground">
                      Close: {new Date(deal.closeDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="font-medium text-foreground">{deal.probability}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Deals;
