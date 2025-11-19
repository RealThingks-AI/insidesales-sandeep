import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Phone, Building } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Contacts = () => {
  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Corp",
      status: "Active",
      value: "$50,000",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@startup.io",
      phone: "+1 (555) 234-5678",
      company: "Startup Inc",
      status: "Prospect",
      value: "$25,000",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@enterprise.com",
      phone: "+1 (555) 345-6789",
      company: "Enterprise Solutions",
      status: "Active",
      value: "$100,000",
    },
    {
      id: 4,
      name: "David Kim",
      email: "d.kim@business.net",
      phone: "+1 (555) 456-7890",
      company: "Business Partners",
      status: "Inactive",
      value: "$15,000",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Contacts</h2>
            <p className="text-muted-foreground">Manage your customer relationships</p>
          </div>
          <Button className="space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Contact</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-foreground">{contact.name}</p>
                        <Badge
                          variant={contact.status === "Active" ? "default" : "secondary"}
                          className={
                            contact.status === "Active"
                              ? "bg-success text-success-foreground"
                              : ""
                          }
                        >
                          {contact.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{contact.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{contact.phone}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Building className="h-3 w-3" />
                          <span>{contact.company}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{contact.value}</p>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contacts;
