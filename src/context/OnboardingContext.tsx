import { createContext, useContext, useState, ReactNode } from "react";

export interface OrganizationInfo {
  organizationName: string;
  industry: string;
  location: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
}

export interface ProjectSetup {
  projectName: string;
  labType: string;
  buildType: "new" | "renovation" | "";
  labLocation: string;
}

export interface FunctionalRequirements {
  labUsageType: string;
  numberOfUsers: string;
  equipmentList: string;
  workflowPreferences: string;
}

export interface SafetyCompliance {
  biosafetyLevel: string;
  regulatoryStandards: string[];
  safetyConstraints: string;
}

export interface CommercialInputs {
  budgetRange: string;
  costSensitivity: "fixed" | "flexible" | "";
  priority: "cost" | "speed" | "quality" | "";
  timelineConstraints: string;
  customizationPreference: string;
}

export interface OnboardingData {
  organization: OrganizationInfo;
  project: ProjectSetup;
  requirements: FunctionalRequirements;
  safety: SafetyCompliance;
  commercial: CommercialInputs;
}

export interface CustomerOnboarding {
  customerId: string;
  customerName: string;
  customerEmail: string;
  currentPhase: number;
  completedPhases: number[];
  isComplete: boolean;
  data: OnboardingData;
  createdBy: "customer" | "sales";
  createdAt: string;
  lastUpdated: string;
}

interface OnboardingContextType {
  currentOnboarding: CustomerOnboarding | null;
  allOnboardings: CustomerOnboarding[];
  setCurrentPhase: (phase: number) => void;
  completePhase: (phase: number) => void;
  updateOnboardingData: (phase: keyof OnboardingData, data: Partial<OnboardingData[keyof OnboardingData]>) => void;
  startOnboarding: (customerId: string, customerName: string, customerEmail: string, createdBy: "customer" | "sales") => void;
  completeOnboarding: () => void;
  getOnboardingByCustomerId: (customerId: string) => CustomerOnboarding | undefined;
  isOnboardingComplete: (customerId: string) => boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const emptyOnboardingData: OnboardingData = {
  organization: {
    organizationName: "",
    industry: "",
    location: "",
    primaryContactName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
  },
  project: {
    projectName: "",
    labType: "",
    buildType: "",
    labLocation: "",
  },
  requirements: {
    labUsageType: "",
    numberOfUsers: "",
    equipmentList: "",
    workflowPreferences: "",
  },
  safety: {
    biosafetyLevel: "",
    regulatoryStandards: [],
    safetyConstraints: "",
  },
  commercial: {
    budgetRange: "",
    costSensitivity: "",
    priority: "",
    timelineConstraints: "",
    customizationPreference: "",
  },
};

// Mock completed onboarding for Dr. Emily Watson (existing customer)
const mockOnboardings: CustomerOnboarding[] = [
  {
    customerId: "customer-1",
    customerName: "Dr. Emily Watson",
    customerEmail: "emily.watson@biotech.com",
    currentPhase: 5,
    completedPhases: [1, 2, 3, 4, 5],
    isComplete: true,
    data: {
      organization: {
        organizationName: "BioTech Research Labs",
        industry: "Biotechnology",
        location: "Boston, MA",
        primaryContactName: "Dr. Emily Watson",
        primaryContactEmail: "emily.watson@biotech.com",
        primaryContactPhone: "+1 (555) 123-4567",
      },
      project: {
        projectName: "Molecular Research Lab",
        labType: "Research Laboratory",
        buildType: "new",
        labLocation: "Building A, Floor 3",
      },
      requirements: {
        labUsageType: "Molecular Biology Research",
        numberOfUsers: "15-20",
        equipmentList: "PCR machines, centrifuges, biosafety cabinets, freezers",
        workflowPreferences: "Open floor plan with dedicated clean room",
      },
      safety: {
        biosafetyLevel: "BSL-2",
        regulatoryStandards: ["ISO 17025", "GLP"],
        safetyConstraints: "Chemical fume hoods required, emergency shower stations",
      },
      commercial: {
        budgetRange: "$500,000 - $750,000",
        costSensitivity: "flexible",
        priority: "quality",
        timelineConstraints: "6 months",
        customizationPreference: "high",
      },
    },
    createdBy: "customer",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
  },
  {
    customerId: "customer-2",
    customerName: "Dr. Sarah Chen",
    customerEmail: "sarah.chen@pharma.com",
    currentPhase: 3,
    completedPhases: [1, 2],
    isComplete: false,
    data: {
      organization: {
        organizationName: "PharmaCorp Industries",
        industry: "Pharmaceutical",
        location: "San Diego, CA",
        primaryContactName: "Dr. Sarah Chen",
        primaryContactEmail: "sarah.chen@pharma.com",
        primaryContactPhone: "+1 (555) 987-6543",
      },
      project: {
        projectName: "Quality Control Laboratory",
        labType: "QC Laboratory",
        buildType: "renovation",
        labLocation: "Main Campus, Building C",
      },
      requirements: {
        labUsageType: "",
        numberOfUsers: "",
        equipmentList: "",
        workflowPreferences: "",
      },
      safety: {
        biosafetyLevel: "",
        regulatoryStandards: [],
        safetyConstraints: "",
      },
      commercial: {
        budgetRange: "",
        costSensitivity: "",
        priority: "",
        timelineConstraints: "",
        customizationPreference: "",
      },
    },
    createdBy: "sales",
    createdAt: "2024-02-01",
    lastUpdated: "2024-02-05",
  },
];

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [allOnboardings, setAllOnboardings] = useState<CustomerOnboarding[]>(mockOnboardings);
  const [currentOnboarding, setCurrentOnboarding] = useState<CustomerOnboarding | null>(null);

  const startOnboarding = (
    customerId: string,
    customerName: string,
    customerEmail: string,
    createdBy: "customer" | "sales"
  ) => {
    const existing = allOnboardings.find((o) => o.customerId === customerId);
    if (existing) {
      setCurrentOnboarding(existing);
      return;
    }

    const newOnboarding: CustomerOnboarding = {
      customerId,
      customerName,
      customerEmail,
      currentPhase: 1,
      completedPhases: [],
      isComplete: false,
      data: { ...emptyOnboardingData },
      createdBy,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setAllOnboardings((prev) => [...prev, newOnboarding]);
    setCurrentOnboarding(newOnboarding);
  };

  const setCurrentPhase = (phase: number) => {
    if (!currentOnboarding) return;

    const updated = {
      ...currentOnboarding,
      currentPhase: phase,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setCurrentOnboarding(updated);
    setAllOnboardings((prev) =>
      prev.map((o) => (o.customerId === updated.customerId ? updated : o))
    );
  };

  const completePhase = (phase: number) => {
    if (!currentOnboarding) return;

    const completedPhases = currentOnboarding.completedPhases.includes(phase)
      ? currentOnboarding.completedPhases
      : [...currentOnboarding.completedPhases, phase];

    const updated = {
      ...currentOnboarding,
      completedPhases,
      currentPhase: phase < 5 ? phase + 1 : phase,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setCurrentOnboarding(updated);
    setAllOnboardings((prev) =>
      prev.map((o) => (o.customerId === updated.customerId ? updated : o))
    );
  };

  const updateOnboardingData = (
    phase: keyof OnboardingData,
    data: Partial<OnboardingData[keyof OnboardingData]>
  ) => {
    if (!currentOnboarding) return;

    const updated = {
      ...currentOnboarding,
      data: {
        ...currentOnboarding.data,
        [phase]: {
          ...currentOnboarding.data[phase],
          ...data,
        },
      },
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setCurrentOnboarding(updated);
    setAllOnboardings((prev) =>
      prev.map((o) => (o.customerId === updated.customerId ? updated : o))
    );
  };

  const completeOnboarding = () => {
    if (!currentOnboarding) return;

    const updated = {
      ...currentOnboarding,
      isComplete: true,
      completedPhases: [1, 2, 3, 4, 5],
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setCurrentOnboarding(updated);
    setAllOnboardings((prev) =>
      prev.map((o) => (o.customerId === updated.customerId ? updated : o))
    );
  };

  const getOnboardingByCustomerId = (customerId: string) => {
    return allOnboardings.find((o) => o.customerId === customerId);
  };

  const isOnboardingComplete = (customerId: string) => {
    const onboarding = allOnboardings.find((o) => o.customerId === customerId);
    return onboarding?.isComplete ?? false;
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentOnboarding,
        allOnboardings,
        setCurrentPhase,
        completePhase,
        updateOnboardingData,
        startOnboarding,
        completeOnboarding,
        getOnboardingByCustomerId,
        isOnboardingComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
