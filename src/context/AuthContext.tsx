import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "customer" | "sales" | "tech" | "consultant" | "admin";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teamMemberId?: string; // Links to WorkspaceContext TeamMember for internal roles
  customerId?: string;   // Links to WorkspaceContext Customer for customer role
}

interface AuthContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Map login emails to user profiles
const userProfiles: Record<string, Omit<CurrentUser, "role">> = {
  // Customers
  "emily.watson@biotech.com": {
    id: "user-1",
    name: "Dr. Emily Watson",
    email: "emily.watson@biotech.com",
    customerId: "cust-1",
  },
  "sarah.chen@pharma.com": {
    id: "user-2",
    name: "Dr. Sarah Chen",
    email: "sarah.chen@pharma.com",
    customerId: "cust-2",
  },
  "robert.taylor@medicare.com": {
    id: "user-3",
    name: "Dr. Robert Taylor",
    email: "robert.taylor@medicare.com",
    customerId: "cust-3",
  },
  // Sales
  "michael.roberts@spacexlab.com": {
    id: "user-4",
    name: "Michael Roberts",
    email: "michael.roberts@spacexlab.com",
    teamMemberId: "tm-1",
  },
  "sarah.johnson@spacexlab.com": {
    id: "user-5",
    name: "Sarah Johnson",
    email: "sarah.johnson@spacexlab.com",
    teamMemberId: "tm-2",
  },
  // Consultants
  "david.chen@spacexlab.com": {
    id: "user-6",
    name: "David Chen",
    email: "david.chen@spacexlab.com",
    teamMemberId: "tm-3",
  },
  "sarah.mitchell@spacexlab.com": {
    id: "user-7",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@spacexlab.com",
    teamMemberId: "tm-4",
  },
  // Tech Team
  "james.chen@spacexlab.com": {
    id: "user-8",
    name: "James Chen",
    email: "james.chen@spacexlab.com",
    teamMemberId: "tm-5",
  },
  "emma.brown@spacexlab.com": {
    id: "user-9",
    name: "Emma Brown",
    email: "emma.brown@spacexlab.com",
    teamMemberId: "tm-6",
  },
  // Platform Admin
  "admin@spacexlab.com": {
    id: "user-admin",
    name: "Platform Admin",
    email: "admin@spacexlab.com",
  },
};

// Default users for demo login by role
const defaultUsersByRole: Record<UserRole, string> = {
  customer: "emily.watson@biotech.com",
  sales: "michael.roberts@spacexlab.com",
  consultant: "sarah.mitchell@spacexlab.com",
  tech: "james.chen@spacexlab.com",
  admin: "admin@spacexlab.com",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const login = (email: string, role: UserRole) => {
    // Find user by email or use default for role
    const userEmail = userProfiles[email] ? email : defaultUsersByRole[role];
    const profile = userProfiles[userEmail];
    
    if (profile) {
      setCurrentUser({
        ...profile,
        role,
      });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
