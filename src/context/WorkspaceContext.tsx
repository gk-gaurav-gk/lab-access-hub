import { createContext, useContext, useState, ReactNode } from "react";

// Types for the unified workspace system
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "sales" | "consultant" | "tech";
  specialty?: string; // For tech team: HVAC, Electrical, etc.
}

export interface WorkspaceAssignment {
  sales: TeamMember | null;
  consultant: TeamMember | null;
  techTeam: TeamMember[];
}

export interface Workspace {
  id: string;
  projectId: string;
  projectName: string;
  customerId: string;
  customerName: string;
  customerOrganization: string;
  customerIndustry: string;
  status: "draft" | "active" | "completed" | "archived";
  assignment: WorkspaceAssignment;
  createdAt: string;
  createdBy: string;
  lastUpdated: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  organization: string;
  industry: string;
  onboardingStatus: "not_started" | "in_progress" | "completed";
  onboardedBy: string | null;
  onboardedByRole: "sales" | "customer" | null;
  activeProjectsCount: number;
  createdAt: string;
}

export interface RolePermission {
  role: string;
  canView: string[];
  canEdit: string[];
  canApprove: string[];
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  customers: Customer[];
  teamMembers: TeamMember[];
  rolePermissions: RolePermission[];
  
  // Workspace operations
  createWorkspace: (workspace: Omit<Workspace, "id" | "createdAt" | "lastUpdated">) => void;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
  assignToWorkspace: (workspaceId: string, assignment: Partial<WorkspaceAssignment>) => void;
  getWorkspaceByProject: (projectId: string) => Workspace | undefined;
  getWorkspacesByCustomer: (customerId: string) => Workspace[];
  getWorkspacesByTeamMember: (memberId: string) => Workspace[];
  
  // Customer operations
  addCustomer: (customer: Omit<Customer, "id" | "createdAt">) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

// Mock team members
const initialTeamMembers: TeamMember[] = [
  { id: "tm-1", name: "Michael Roberts", email: "michael.roberts@spacexlab.com", role: "sales" },
  { id: "tm-2", name: "Sarah Johnson", email: "sarah.johnson@spacexlab.com", role: "sales" },
  { id: "tm-3", name: "David Chen", email: "david.chen@spacexlab.com", role: "consultant" },
  { id: "tm-4", name: "Lisa Park", email: "lisa.park@spacexlab.com", role: "consultant" },
  { id: "tm-5", name: "James Wilson", email: "james.wilson@spacexlab.com", role: "tech", specialty: "HVAC" },
  { id: "tm-6", name: "Emma Brown", email: "emma.brown@spacexlab.com", role: "tech", specialty: "Electrical" },
  { id: "tm-7", name: "Alex Martinez", email: "alex.martinez@spacexlab.com", role: "tech", specialty: "Safety" },
  { id: "tm-8", name: "Rachel Kim", email: "rachel.kim@spacexlab.com", role: "tech", specialty: "Compliance" },
];

// Mock customers
const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Dr. Emily Watson",
    email: "emily.watson@biotech.com",
    organization: "BioTech Research Labs",
    industry: "Biotechnology",
    onboardingStatus: "completed",
    onboardedBy: "Michael Roberts",
    onboardedByRole: "customer",
    activeProjectsCount: 1,
    createdAt: "2024-01-15",
  },
  {
    id: "cust-2",
    name: "Dr. Sarah Chen",
    email: "sarah.chen@pharma.com",
    organization: "PharmaCorp Industries",
    industry: "Pharmaceutical",
    onboardingStatus: "in_progress",
    onboardedBy: "Michael Roberts",
    onboardedByRole: "sales",
    activeProjectsCount: 1,
    createdAt: "2024-02-01",
  },
  {
    id: "cust-3",
    name: "Dr. Robert Taylor",
    email: "robert.taylor@medicare.com",
    organization: "MediCare Labs",
    industry: "Healthcare",
    onboardingStatus: "completed",
    onboardedBy: "Sarah Johnson",
    onboardedByRole: "sales",
    activeProjectsCount: 1,
    createdAt: "2024-01-20",
  },
  {
    id: "cust-4",
    name: "Prof. John Miller",
    email: "john.miller@ecotest.com",
    organization: "EcoTest Inc",
    industry: "Environmental",
    onboardingStatus: "completed",
    onboardedBy: null,
    onboardedByRole: "customer",
    activeProjectsCount: 1,
    createdAt: "2024-02-10",
  },
];

// Mock workspaces - the central data structure
const initialWorkspaces: Workspace[] = [
  {
    id: "ws-1",
    projectId: "proj-1",
    projectName: "Molecular Research Lab",
    customerId: "cust-1",
    customerName: "Dr. Emily Watson",
    customerOrganization: "BioTech Research Labs",
    customerIndustry: "Biotechnology",
    status: "active",
    assignment: {
      sales: initialTeamMembers[0], // Michael Roberts
      consultant: initialTeamMembers[2], // David Chen
      techTeam: [initialTeamMembers[4], initialTeamMembers[5]], // HVAC + Electrical
    },
    createdAt: "2024-01-16",
    createdBy: "Platform Admin",
    lastUpdated: "2024-02-10",
  },
  {
    id: "ws-2",
    projectId: "proj-2",
    projectName: "Quality Control Laboratory",
    customerId: "cust-2",
    customerName: "Dr. Sarah Chen",
    customerOrganization: "PharmaCorp Industries",
    customerIndustry: "Pharmaceutical",
    status: "active",
    assignment: {
      sales: initialTeamMembers[0], // Michael Roberts
      consultant: initialTeamMembers[3], // Lisa Park
      techTeam: [initialTeamMembers[6], initialTeamMembers[7]], // Safety + Compliance
    },
    createdAt: "2024-02-02",
    createdBy: "Platform Admin",
    lastUpdated: "2024-02-08",
  },
  {
    id: "ws-3",
    projectId: "proj-3",
    projectName: "Pharmaceutical Testing Facility",
    customerId: "cust-3",
    customerName: "Dr. Robert Taylor",
    customerOrganization: "MediCare Labs",
    customerIndustry: "Healthcare",
    status: "active",
    assignment: {
      sales: initialTeamMembers[0], // Michael Roberts
      consultant: initialTeamMembers[2], // David Chen
      techTeam: [initialTeamMembers[4], initialTeamMembers[6]], // HVAC + Safety
    },
    createdAt: "2024-01-21",
    createdBy: "Platform Admin",
    lastUpdated: "2024-02-05",
  },
  {
    id: "ws-4",
    projectId: "proj-4",
    projectName: "Environmental Analysis Center",
    customerId: "cust-4",
    customerName: "Prof. John Miller",
    customerOrganization: "EcoTest Inc",
    customerIndustry: "Environmental",
    status: "draft",
    assignment: {
      sales: initialTeamMembers[1], // Sarah Johnson
      consultant: null,
      techTeam: [],
    },
    createdAt: "2024-02-11",
    createdBy: "Platform Admin",
    lastUpdated: "2024-02-11",
  },
];

// Role permissions (read-only reference)
const rolePermissions: RolePermission[] = [
  {
    role: "Customer",
    canView: ["My Projects", "Design Reviews", "Feedback", "Commercial Summary"],
    canEdit: ["Feedback", "Approval Decisions"],
    canApprove: ["Designs", "Estimates"],
  },
  {
    role: "Sales / Pre-Sales",
    canView: ["Clients", "Proposals", "Estimations", "Version History", "Onboarding"],
    canEdit: ["Proposals", "Estimations", "Customer Onboarding"],
    canApprove: [],
  },
  {
    role: "Tech Team",
    canView: ["Design Versions", "Technical Docs", "My Tasks", "Feasibility"],
    canEdit: ["Design Versions", "Technical Docs", "Feasibility Assessments"],
    canApprove: [],
  },
  {
    role: "Consultant",
    canView: ["All Projects", "Requirements", "Feedback", "Reports"],
    canEdit: ["Requirements", "Reports"],
    canApprove: [],
  },
  {
    role: "Platform Admin",
    canView: ["All Customers", "All Workspaces", "Role Matrix", "Permissions"],
    canEdit: ["Workspace Assignments", "Role Allocations"],
    canApprove: [],
  },
];

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);

  const createWorkspace = (workspace: Omit<Workspace, "id" | "createdAt" | "lastUpdated">) => {
    const newWorkspace: Workspace = {
      ...workspace,
      id: `ws-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setWorkspaces((prev) => [...prev, newWorkspace]);
  };

  const updateWorkspace = (id: string, updates: Partial<Workspace>) => {
    setWorkspaces((prev) =>
      prev.map((ws) =>
        ws.id === id
          ? { ...ws, ...updates, lastUpdated: new Date().toISOString().split("T")[0] }
          : ws
      )
    );
  };

  const assignToWorkspace = (workspaceId: string, assignment: Partial<WorkspaceAssignment>) => {
    setWorkspaces((prev) =>
      prev.map((ws) =>
        ws.id === workspaceId
          ? {
              ...ws,
              assignment: { ...ws.assignment, ...assignment },
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : ws
      )
    );
  };

  const getWorkspaceByProject = (projectId: string) => {
    return workspaces.find((ws) => ws.projectId === projectId);
  };

  const getWorkspacesByCustomer = (customerId: string) => {
    return workspaces.filter((ws) => ws.customerId === customerId);
  };

  const getWorkspacesByTeamMember = (memberId: string) => {
    return workspaces.filter(
      (ws) =>
        ws.assignment.sales?.id === memberId ||
        ws.assignment.consultant?.id === memberId ||
        ws.assignment.techTeam.some((tm) => tm.id === memberId)
    );
  };

  const addCustomer = (customer: Omit<Customer, "id" | "createdAt">) => {
    const newCustomer: Customer = {
      ...customer,
      id: `cust-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCustomers((prev) => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        customers,
        teamMembers,
        rolePermissions,
        createWorkspace,
        updateWorkspace,
        assignToWorkspace,
        getWorkspaceByProject,
        getWorkspacesByCustomer,
        getWorkspacesByTeamMember,
        addCustomer,
        updateCustomer,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
