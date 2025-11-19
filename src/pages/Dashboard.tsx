import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import { Users, DollarSign, TrendingUp, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const recentActivities = [
    { id: 1, type: "contact", name: "Sarah Johnson", action: "added", time: "2 hours ago" },
    { id: 2, type: "deal", name: "$50,000 Enterprise Deal", action: "closed", time: "5 hours ago" },
    { id: 3, type: "contact", name: "Michael Chen", action: "updated", time: "1 day ago" },
    { id: 4, type: "deal", name: "$25,000 SMB Deal", action: "moved to negotiation", time: "1 day ago" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Contacts"
            value="1,284"
            change="+12% from last month"
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Active Deals"
            value="42"
            change="+8% from last month"
            icon={Target}
            trend="up"
          />
          <MetricCard
            title="Revenue"
            value="$284,500"
            change="+23% from last month"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Conversion Rate"
            value="24.5%"
            change="+4.2% from last month"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.type === "contact" ? "Contact" : "Deal"} {activity.action}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deal Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: "Prospecting", count: 12, value: "$145,000", color: "bg-blue-500" },
                  { stage: "Qualification", count: 8, value: "$98,000", color: "bg-yellow-500" },
                  { stage: "Proposal", count: 6, value: "$124,000", color: "bg-orange-500" },
                  { stage: "Negotiation", count: 4, value: "$86,000", color: "bg-green-500" },
                ].map((stage) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{stage.stage}</span>
                      <span className="text-muted-foreground">
                        {stage.count} deals • {stage.value}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${stage.color}`}
                        style={{ width: `${(stage.count / 12) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
