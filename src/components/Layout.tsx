import { NavLink } from "./NavLink";
import { LayoutDashboard, Users, DollarSign } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">CRM Pro</h1>
              <div className="flex space-x-1">
                <NavLink
                  to="/"
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  activeClassName="bg-muted text-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  to="/contacts"
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  activeClassName="bg-muted text-foreground"
                >
                  <Users className="h-4 w-4" />
                  <span>Contacts</span>
                </NavLink>
                <NavLink
                  to="/deals"
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  activeClassName="bg-muted text-foreground"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Deals</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
