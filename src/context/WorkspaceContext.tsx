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
  assignedSalesId: string | null;
  assignedConsultantId: string | null;
  status: "onboarding" | "active" | "closed";
  activeProjectsCount: number;
  createdAt: string;
}

export interface RolePermission {
  role: string;
  canView: string[];
  canEdit: string[];
  canApprove: string[];
}

// Module-level role capability matrix
export interface RoleCapability {
  module: string;
  customer: "view" | "approve" | "submit" | "—";
  sales: "view" | "create/edit" | "track_status" | "—";
  consultant: "view" | "validate" | "approve_internal" | "—";
  tech: "create/edit" | "input_only" | "view" | "—";
}

// Module access permissions per role
export interface ModuleAccess {
  role: string;
  modules: Array<{
    name: string;
    access: "view" | "create/edit" | "full_control" | "none";
  }>;
}

// Knowledge Management Entry (Completed Projects Library)
export interface KnowledgeEntry {
  id: string;
  workspaceId: string;
  projectName: string;
  customerIndustry: string;
  labType: string;
  completionDate: string;
  finalScopeSummary: string;
  keyDesignVersions: Array<{
    id: string;
    title: string;
    version: string;
    previewUrl?: string;
  }>;
  challengesFaced: string[];
  whatWorkedWell: string[];
  keyLearnings: string[];
  reusableComponents: Array<{
    name: string;
    category: string;
    isMarkedReusable: boolean;
  }>;
  // Consultant-specific insights
  feedbackSummary: string;
  approvalPatterns: string;
  communicationLessons: string;
  // Tech-specific insights
  technicalConstraints: string[];
  feasibilityNotes: string;
  designEvolution: string;
  engineeringTradeoffs: string[];
  createdAt: string;
  lastModifiedBy: string;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  customers: Customer[];
  teamMembers: TeamMember[];
  rolePermissions: RolePermission[];
  roleCapabilities: RoleCapability[];
  moduleAccess: ModuleAccess[];
  knowledgeEntries: KnowledgeEntry[];
  
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
  assignCustomerSales: (customerId: string, salesId: string) => void;
  assignCustomerConsultant: (customerId: string, consultantId: string) => void;
  
  // KM operations
  getKnowledgeEntries: () => KnowledgeEntry[];
  markComponentReusable: (entryId: string, componentName: string, isReusable: boolean) => void;
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
    assignedSalesId: "tm-1",
    assignedConsultantId: "tm-3",
    status: "active",
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
    assignedSalesId: "tm-1",
    assignedConsultantId: "tm-4",
    status: "onboarding",
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
    assignedSalesId: "tm-1",
    assignedConsultantId: "tm-3",
    status: "active",
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
    assignedSalesId: "tm-2",
    assignedConsultantId: null,
    status: "active",
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

// Role capability matrix - what each role can do per module
const roleCapabilities: RoleCapability[] = [
  { module: "Designs", customer: "view", sales: "view", consultant: "view", tech: "create/edit" },
  { module: "Approvals", customer: "approve", sales: "track_status", consultant: "validate", tech: "—" },
  { module: "Estimation", customer: "—", sales: "track_status", consultant: "approve_internal", tech: "input_only" },
  { module: "Requirements", customer: "submit", sales: "—", consultant: "view", tech: "view" },
];

// Module access per role
const moduleAccess: ModuleAccess[] = [
  {
    role: "Customer",
    modules: [
      { name: "My Projects", access: "view" },
      { name: "Design Reviews", access: "view" },
      { name: "Feedback", access: "create/edit" },
      { name: "Commercials", access: "none" },
    ],
  },
  {
    role: "Sales",
    modules: [
      { name: "Clients", access: "full_control" },
      { name: "Proposals", access: "create/edit" },
      { name: "Estimations", access: "view" },
      { name: "Version History", access: "view" },
    ],
  },
  {
    role: "Tech Team",
    modules: [
      { name: "Design Versions", access: "full_control" },
      { name: "Feasibility", access: "create/edit" },
      { name: "Technical Docs", access: "create/edit" },
      { name: "Commercials", access: "none" },
    ],
  },
  {
    role: "Consultant",
    modules: [
      { name: "All Projects", access: "view" },
      { name: "Requirements", access: "view" },
      { name: "Estimations", access: "full_control" },
      { name: "Reports", access: "create/edit" },
    ],
  },
];

// Mock Knowledge Entries (Completed Projects Library)
const initialKnowledgeEntries: KnowledgeEntry[] = [
  {
    id: "km-1",
    workspaceId: "ws-completed-1",
    projectName: "Advanced Genomics Research Center",
    customerIndustry: "Biotechnology",
    labType: "Clean Room",
    completionDate: "Dec 2023",
    finalScopeSummary: "State-of-the-art genomics facility with BSL-2 containment, automated sample processing, and integrated data management. The project included HVAC optimization for precise temperature control and advanced filtration systems.",
    keyDesignVersions: [
      { id: "dv-1", title: "Floor Plan Layout", version: "v3.2" },
      { id: "dv-2", title: "HVAC System Design", version: "v2.1" },
      { id: "dv-3", title: "Safety Systems", version: "v1.4" },
    ],
    challengesFaced: [
      "Initial HVAC design did not meet contamination control requirements",
      "Client requested scope expansion mid-project for additional storage",
      "Regulatory compliance review caused 2-week delay"
    ],
    whatWorkedWell: [
      "Early stakeholder alignment reduced design iterations by 40%",
      "Modular design approach allowed flexible scaling",
      "Weekly client check-ins maintained transparency"
    ],
    keyLearnings: [
      "Always validate HVAC specifications with compliance team before client presentation",
      "Include buffer capacity in initial estimates for scope creep",
      "Document all verbal approvals in writing within 24 hours"
    ],
    reusableComponents: [
      { name: "BSL-2 HVAC Layout", category: "HVAC", isMarkedReusable: true },
      { name: "Clean Room Airlock Design", category: "Safety", isMarkedReusable: true },
      { name: "Sample Processing Flow", category: "Layout", isMarkedReusable: false },
    ],
    feedbackSummary: "Client highly satisfied with final delivery. Praised team responsiveness and attention to compliance details. Minor concerns about timeline extension.",
    approvalPatterns: "Initial designs took 5 days average for approval. Final designs approved within 2 days after establishing clearer review criteria.",
    communicationLessons: "Client preferred detailed technical explanations over simplified summaries. Future biotech projects should include technical deep-dives in presentations.",
    technicalConstraints: [
      "Building infrastructure limited HVAC capacity to 85% of ideal",
      "Existing electrical panel required upgrade for equipment load",
      "Floor load capacity restricted heavy equipment placement"
    ],
    feasibilityNotes: "Feasibility assessment identified early that the existing building would need structural reinforcement. This was addressed in Phase 1 before lab equipment installation.",
    designEvolution: "Started with open floor plan concept, evolved to compartmentalized design after client input on workflow separation. Final design incorporated 3 distinct zones with controlled access.",
    engineeringTradeoffs: [
      "Chose higher-cost HEPA filtration for better long-term maintenance",
      "Sacrificed some storage space for improved airflow circulation",
      "Selected modular furniture over built-in for future flexibility"
    ],
    createdAt: "2023-12-15",
    lastModifiedBy: "Platform Admin"
  },
  {
    id: "km-2",
    workspaceId: "ws-completed-2",
    projectName: "Pharmaceutical Quality Control Lab",
    customerIndustry: "Pharmaceutical",
    labType: "Testing Facility",
    completionDate: "Nov 2023",
    finalScopeSummary: "Comprehensive QC laboratory designed for pharmaceutical testing with integrated chromatography suite, stability chambers, and microbiology testing areas. GMP-compliant design with full audit trail capabilities.",
    keyDesignVersions: [
      { id: "dv-4", title: "Lab Zoning Plan", version: "v2.5" },
      { id: "dv-5", title: "Equipment Layout", version: "v3.0" },
      { id: "dv-6", title: "Utilities Design", version: "v1.8" },
    ],
    challengesFaced: [
      "GMP compliance requirements more stringent than initially scoped",
      "Equipment vendor delays impacted installation timeline",
      "Integration of legacy systems required custom solutions"
    ],
    whatWorkedWell: [
      "Pre-qualification of GMP requirements saved revision cycles",
      "Parallel workstreams for documentation and design",
      "Strong vendor relationships expedited equipment delivery"
    ],
    keyLearnings: [
      "GMP projects require 25% additional timeline buffer",
      "Include vendor qualification in project kickoff phase",
      "Establish documentation standards before design work begins"
    ],
    reusableComponents: [
      { name: "GMP Documentation Template", category: "Compliance", isMarkedReusable: true },
      { name: "Stability Chamber Layout", category: "Equipment", isMarkedReusable: true },
      { name: "Chromatography Suite Design", category: "Layout", isMarkedReusable: false },
    ],
    feedbackSummary: "Excellent delivery on compliance requirements. Client appreciated proactive communication on timeline risks. Would recommend for future projects.",
    approvalPatterns: "Approval cycles were longer (7 days average) due to multiple stakeholder review. Implementing consolidated review meetings reduced to 4 days.",
    communicationLessons: "Pharmaceutical clients require formal documentation for all changes. Informal email approvals were insufficient for audit purposes.",
    technicalConstraints: [
      "Cleanroom classifications required specific material selections",
      "Vibration isolation needed for sensitive analytical equipment",
      "Backup power requirements exceeded standard capacity"
    ],
    feasibilityNotes: "Initial cost estimates were revised upward 15% after detailed GMP gap analysis. Client approved revised budget after clear documentation of regulatory requirements.",
    designEvolution: "Design progressed through 3 major iterations: initial concept, post-GMP review revision, and final optimization based on equipment specifications.",
    engineeringTradeoffs: [
      "Premium HVAC system for tighter environmental control",
      "Dedicated UPS for critical equipment over shared building system",
      "Stainless steel surfaces for easier validation vs. cost"
    ],
    createdAt: "2023-11-20",
    lastModifiedBy: "Platform Admin"
  }
];

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeEntry[]>(initialKnowledgeEntries);

  const createWorkspace = (workspace: Omit<Workspace, "id" | "createdAt" | "lastUpdated">) => {
    const newWorkspace: Workspace = {
      ...workspace,
      id: `ws-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setWorkspaces((prev) => [...prev, newWorkspace]);
  };

  // Helper function to create a Knowledge Entry from a completed workspace
  const createKnowledgeEntryFromWorkspace = (workspace: Workspace) => {
    const newEntry: KnowledgeEntry = {
      id: `km-${Date.now()}`,
      workspaceId: workspace.id,
      projectName: workspace.projectName,
      customerIndustry: workspace.customerIndustry,
      labType: inferLabType(workspace.customerIndustry),
      completionDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      finalScopeSummary: `Completed ${workspace.projectName} for ${workspace.customerOrganization}. This project included full design, technical documentation, and delivery phases.`,
      keyDesignVersions: [
        { id: `dv-${Date.now()}-1`, title: "Final Floor Plan", version: "v1.0" },
        { id: `dv-${Date.now()}-2`, title: "Technical Systems", version: "v1.0" },
      ],
      challengesFaced: [
        "Initial requirements gathering phase",
        "Design iteration cycles with client feedback",
      ],
      whatWorkedWell: [
        "Clear communication with client stakeholders",
        "Systematic design review process",
      ],
      keyLearnings: [
        "Document all decisions in real-time",
        "Maintain regular client check-ins",
      ],
      reusableComponents: workspace.assignment.techTeam.map((tech) => ({
        name: `${tech.specialty} Design Standards`,
        category: tech.specialty || "General",
        isMarkedReusable: false,
      })),
      feedbackSummary: "Pending client feedback summary collection.",
      approvalPatterns: "Standard approval workflow followed throughout the project.",
      communicationLessons: "Regular updates maintained transparency with all stakeholders.",
      technicalConstraints: [
        "Constraints documented during feasibility phase",
      ],
      feasibilityNotes: "Feasibility assessment completed during initial project phases.",
      designEvolution: "Design evolved through iterative client feedback and technical reviews.",
      engineeringTradeoffs: [
        "Trade-offs balanced between cost and quality requirements",
      ],
      createdAt: new Date().toISOString().split("T")[0],
      lastModifiedBy: "System (Auto-generated)",
    };
    
    setKnowledgeEntries((prev) => [...prev, newEntry]);
    return newEntry;
  };

  // Helper to infer lab type from industry
  const inferLabType = (industry: string): string => {
    const labTypeMap: Record<string, string> = {
      "Biotechnology": "Clean Room",
      "Pharmaceutical": "Testing Facility",
      "Healthcare": "Clinical Lab",
      "Environmental": "Analysis Center",
      "Research": "R&D Lab",
    };
    return labTypeMap[industry] || "General Laboratory";
  };

  const updateWorkspace = (id: string, updates: Partial<Workspace>) => {
    setWorkspaces((prev) => {
      const updatedWorkspaces = prev.map((ws) => {
        if (ws.id === id) {
          const updatedWs = { ...ws, ...updates, lastUpdated: new Date().toISOString().split("T")[0] };
          
          // Auto-create Knowledge Entry when status changes to 'completed'
          if (updates.status === "completed" && ws.status !== "completed") {
            // Create KM entry asynchronously (after state update)
            setTimeout(() => createKnowledgeEntryFromWorkspace(updatedWs), 0);
          }
          
          return updatedWs;
        }
        return ws;
      });
      return updatedWorkspaces;
    });
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

  const assignCustomerSales = (customerId: string, salesId: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, assignedSalesId: salesId } : c))
    );
  };

  const assignCustomerConsultant = (customerId: string, consultantId: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, assignedConsultantId: consultantId } : c))
    );
  };

  // Knowledge Management operations
  const getKnowledgeEntries = () => knowledgeEntries;

  const markComponentReusable = (entryId: string, componentName: string, isReusable: boolean) => {
    setKnowledgeEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              reusableComponents: entry.reusableComponents.map((comp) =>
                comp.name === componentName ? { ...comp, isMarkedReusable: isReusable } : comp
              ),
            }
          : entry
      )
    );
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        customers,
        teamMembers,
        rolePermissions,
        roleCapabilities,
        moduleAccess,
        knowledgeEntries,
        createWorkspace,
        updateWorkspace,
        assignToWorkspace,
        getWorkspaceByProject,
        getWorkspacesByCustomer,
        getWorkspacesByTeamMember,
        addCustomer,
        updateCustomer,
        assignCustomerSales,
        assignCustomerConsultant,
        getKnowledgeEntries,
        markComponentReusable,
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
