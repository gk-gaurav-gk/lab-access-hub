import { createContext, useContext, useState, ReactNode } from "react";

export type EstimationStatus = 
  | "draft" 
  | "tech_review" 
  | "consultant_review" 
  | "approved_for_discussion" 
  | "locked";

export interface TechEffortInput {
  id: string;
  category: string;
  description: string;
  effortHours: number;
  complexityLevel: "low" | "medium" | "high";
  riskFlag?: string;
  constraints?: string;
  submittedBy: string;
  submittedAt: string;
}

export interface InternalEstimation {
  id: string;
  projectId: string;
  projectName: string;
  designVersion: string;
  designVersionId: string;
  
  // Customer budget expectation (read-only reference)
  customerBudgetRange: string;
  customerCostSensitivity: "fixed" | "flexible";
  customerPriority: "cost" | "speed" | "quality";
  
  // Tech inputs
  techEffortInputs: TechEffortInput[];
  techFeasibilityApproved: boolean;
  techFeasibilityBy?: string;
  techFeasibilityAt?: string;
  
  // Internal estimation (NOT visible to customer)
  internalEstimateMin: number;
  internalEstimateMax: number;
  marginPercentage: number; // Only visible to Consultant
  benchmarkAdjustment: number;
  riskBuffer: number;
  
  // Status and workflow
  status: EstimationStatus;
  initiatedBy: string;
  initiatedAt: string;
  
  // Consultant approval
  consultantApproved: boolean;
  consultantApprovedBy?: string;
  consultantApprovedAt?: string;
  consultantNotes?: string;
  
  // Version tracking
  previousVersionId?: string;
  changeReason?: string;
  changeImpact?: {
    costDelta: string;
    timelineDelta: string;
    reason: string;
  };
  
  // Lock status
  isLocked: boolean;
  lockedAt?: string;
  lockedBy?: string;
}

interface EstimationContextType {
  estimations: InternalEstimation[];
  
  // Sales actions
  initiateEstimation: (projectId: string, projectName: string, designVersion: string, designVersionId: string, customerBudget: { range: string; sensitivity: "fixed" | "flexible"; priority: "cost" | "speed" | "quality" }) => void;
  
  // Tech actions
  submitTechEffort: (estimationId: string, effort: Omit<TechEffortInput, "id" | "submittedAt">) => void;
  approveFeasibility: (estimationId: string, techName: string) => void;
  
  // Consultant actions (owner)
  updateInternalEstimate: (estimationId: string, data: Partial<Pick<InternalEstimation, "internalEstimateMin" | "internalEstimateMax" | "marginPercentage" | "benchmarkAdjustment" | "riskBuffer" | "consultantNotes">>) => void;
  approveForDiscussion: (estimationId: string, consultantName: string) => void;
  lockEstimation: (estimationId: string, lockedBy: string) => void;
  
  // Queries
  getEstimationByProject: (projectId: string) => InternalEstimation | undefined;
  getEstimationsByDesignVersion: (designVersionId: string) => InternalEstimation[];
  canSalesViewEstimate: (estimationId: string) => boolean;
  canTechViewMargins: () => boolean; // Always false
}

const EstimationContext = createContext<EstimationContextType | undefined>(undefined);

// Mock data
const initialEstimations: InternalEstimation[] = [
  {
    id: "est-001",
    projectId: "proj-001",
    projectName: "Biotech Research Lab",
    designVersion: "v3.2",
    designVersionId: "des-001",
    customerBudgetRange: "$400,000 - $450,000",
    customerCostSensitivity: "flexible",
    customerPriority: "quality",
    techEffortInputs: [
      {
        id: "tef-001",
        category: "HVAC Systems",
        description: "Cleanroom HVAC with HEPA filtration",
        effortHours: 120,
        complexityLevel: "high",
        riskFlag: "Requires specialized contractors",
        submittedBy: "James Chen",
        submittedAt: "2024-02-10"
      },
      {
        id: "tef-002",
        category: "Electrical",
        description: "High-capacity power distribution",
        effortHours: 80,
        complexityLevel: "medium",
        submittedBy: "Maria Garcia",
        submittedAt: "2024-02-11"
      }
    ],
    techFeasibilityApproved: true,
    techFeasibilityBy: "James Chen",
    techFeasibilityAt: "2024-02-12",
    internalEstimateMin: 385000,
    internalEstimateMax: 440000,
    marginPercentage: 18,
    benchmarkAdjustment: 5000,
    riskBuffer: 15000,
    status: "approved_for_discussion",
    initiatedBy: "Michael Roberts",
    initiatedAt: "2024-02-08",
    consultantApproved: true,
    consultantApprovedBy: "Sarah Mitchell",
    consultantApprovedAt: "2024-02-14",
    consultantNotes: "Aligned with industry benchmarks. Risk buffer accounts for specialized HVAC requirements.",
    isLocked: false
  },
  {
    id: "est-002",
    projectId: "proj-002",
    projectName: "Pharmaceutical Testing Facility",
    designVersion: "v4.0",
    designVersionId: "des-004",
    customerBudgetRange: "$300,000 - $350,000",
    customerCostSensitivity: "fixed",
    customerPriority: "speed",
    techEffortInputs: [
      {
        id: "tef-003",
        category: "Clean Room",
        description: "Class 1000 clean room construction",
        effortHours: 200,
        complexityLevel: "high",
        riskFlag: "Tight timeline",
        submittedBy: "James Chen",
        submittedAt: "2024-01-20"
      }
    ],
    techFeasibilityApproved: true,
    techFeasibilityBy: "James Chen",
    techFeasibilityAt: "2024-01-22",
    internalEstimateMin: 290000,
    internalEstimateMax: 330000,
    marginPercentage: 15,
    benchmarkAdjustment: 0,
    riskBuffer: 10000,
    status: "locked",
    initiatedBy: "Michael Roberts",
    initiatedAt: "2024-01-18",
    consultantApproved: true,
    consultantApprovedBy: "Sarah Mitchell",
    consultantApprovedAt: "2024-01-25",
    consultantNotes: "Fast-track approved. Client prefers speed over cost optimization.",
    isLocked: true,
    lockedAt: "2024-01-28",
    lockedBy: "Sarah Mitchell"
  },
  {
    id: "est-003",
    projectId: "proj-003",
    projectName: "Environmental Analysis Center",
    designVersion: "v1.0",
    designVersionId: "des-005",
    customerBudgetRange: "$150,000 - $200,000",
    customerCostSensitivity: "flexible",
    customerPriority: "cost",
    techEffortInputs: [],
    techFeasibilityApproved: false,
    internalEstimateMin: 0,
    internalEstimateMax: 0,
    marginPercentage: 0,
    benchmarkAdjustment: 0,
    riskBuffer: 0,
    status: "draft",
    initiatedBy: "Michael Roberts",
    initiatedAt: "2024-02-15",
    consultantApproved: false,
    isLocked: false
  }
];

export function EstimationProvider({ children }: { children: ReactNode }) {
  const [estimations, setEstimations] = useState<InternalEstimation[]>(initialEstimations);

  const initiateEstimation = (
    projectId: string,
    projectName: string,
    designVersion: string,
    designVersionId: string,
    customerBudget: { range: string; sensitivity: "fixed" | "flexible"; priority: "cost" | "speed" | "quality" }
  ) => {
    const newEstimation: InternalEstimation = {
      id: `est-${Date.now()}`,
      projectId,
      projectName,
      designVersion,
      designVersionId,
      customerBudgetRange: customerBudget.range,
      customerCostSensitivity: customerBudget.sensitivity,
      customerPriority: customerBudget.priority,
      techEffortInputs: [],
      techFeasibilityApproved: false,
      internalEstimateMin: 0,
      internalEstimateMax: 0,
      marginPercentage: 0,
      benchmarkAdjustment: 0,
      riskBuffer: 0,
      status: "draft",
      initiatedBy: "Current User", // Would come from AuthContext
      initiatedAt: new Date().toISOString().split("T")[0],
      consultantApproved: false,
      isLocked: false
    };

    setEstimations(prev => [...prev, newEstimation]);
  };

  const submitTechEffort = (estimationId: string, effort: Omit<TechEffortInput, "id" | "submittedAt">) => {
    setEstimations(prev => prev.map(est => {
      if (est.id === estimationId && !est.isLocked) {
        const newEffort: TechEffortInput = {
          ...effort,
          id: `tef-${Date.now()}`,
          submittedAt: new Date().toISOString().split("T")[0]
        };
        return {
          ...est,
          techEffortInputs: [...est.techEffortInputs, newEffort],
          status: est.status === "draft" ? "tech_review" : est.status
        };
      }
      return est;
    }));
  };

  const approveFeasibility = (estimationId: string, techName: string) => {
    setEstimations(prev => prev.map(est => {
      if (est.id === estimationId && !est.isLocked) {
        return {
          ...est,
          techFeasibilityApproved: true,
          techFeasibilityBy: techName,
          techFeasibilityAt: new Date().toISOString().split("T")[0],
          status: "consultant_review"
        };
      }
      return est;
    }));
  };

  const updateInternalEstimate = (
    estimationId: string,
    data: Partial<Pick<InternalEstimation, "internalEstimateMin" | "internalEstimateMax" | "marginPercentage" | "benchmarkAdjustment" | "riskBuffer" | "consultantNotes">>
  ) => {
    setEstimations(prev => prev.map(est => {
      if (est.id === estimationId && !est.isLocked) {
        return { ...est, ...data };
      }
      return est;
    }));
  };

  const approveForDiscussion = (estimationId: string, consultantName: string) => {
    setEstimations(prev => prev.map(est => {
      if (est.id === estimationId && est.techFeasibilityApproved && !est.isLocked) {
        return {
          ...est,
          consultantApproved: true,
          consultantApprovedBy: consultantName,
          consultantApprovedAt: new Date().toISOString().split("T")[0],
          status: "approved_for_discussion"
        };
      }
      return est;
    }));
  };

  const lockEstimation = (estimationId: string, lockedBy: string) => {
    setEstimations(prev => prev.map(est => {
      if (est.id === estimationId && est.consultantApproved) {
        return {
          ...est,
          isLocked: true,
          lockedAt: new Date().toISOString().split("T")[0],
          lockedBy,
          status: "locked"
        };
      }
      return est;
    }));
  };

  const getEstimationByProject = (projectId: string) => {
    return estimations.find(est => est.projectId === projectId);
  };

  const getEstimationsByDesignVersion = (designVersionId: string) => {
    return estimations.filter(est => est.designVersionId === designVersionId);
  };

  const canSalesViewEstimate = (estimationId: string) => {
    const est = estimations.find(e => e.id === estimationId);
    // Sales can only view status, not detailed numbers
    return est?.status === "approved_for_discussion" || est?.status === "locked";
  };

  const canTechViewMargins = () => {
    // Tech never sees margins
    return false;
  };

  return (
    <EstimationContext.Provider
      value={{
        estimations,
        initiateEstimation,
        submitTechEffort,
        approveFeasibility,
        updateInternalEstimate,
        approveForDiscussion,
        lockEstimation,
        getEstimationByProject,
        getEstimationsByDesignVersion,
        canSalesViewEstimate,
        canTechViewMargins
      }}
    >
      {children}
    </EstimationContext.Provider>
  );
}

export function useEstimations() {
  const context = useContext(EstimationContext);
  if (!context) {
    throw new Error("useEstimations must be used within an EstimationProvider");
  }
  return context;
}
