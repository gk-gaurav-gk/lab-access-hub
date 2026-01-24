import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface DesignVersion {
  id: string;
  title: string;
  version: string;
  status: 'draft' | 'pending_review' | 'in_review' | 'approved' | 'rejected';
  uploadedBy: string;
  uploadedAt: string;
  changes: string[];
  impacts: {
    space: string;
    safety: string;
    cost: string;
  };
  customerComments?: string[];
  approvedAt?: string;
  approvedBy?: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  clientContact: string;
  industry: string;
  status: 'onboarding' | 'active' | 'review' | 'delivery' | 'completed';
  progress: number;
  dueDate: string;
  assignedConsultant: string;
  assignedTech: string[];
  assignedSales: string;
  budget: {
    approved: string;
    current: string;
    changeImpact?: string;
  };
  timeline: {
    start: string;
    expectedEnd: string;
    milestones: { name: string; date: string; status: 'completed' | 'current' | 'upcoming' }[];
  };
  designs: DesignVersion[];
  pendingActions: PendingAction[];
}

export interface PendingAction {
  id: string;
  type: 'review' | 'approval' | 'feedback';
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: 'customer' | 'tech' | 'sales' | 'consultant';
  relatedDesignId?: string;
  status: 'pending' | 'completed';
}

export interface CustomerAction {
  id: string;
  type: 'approval' | 'comment' | 'feedback' | 'rejection';
  projectId: string;
  projectName: string;
  designId?: string;
  designTitle?: string;
  content: string;
  timestamp: string;
  customerName: string;
}

export interface Feedback {
  id: string;
  projectId: string;
  projectName: string;
  customerName: string;
  ratings: {
    designQuality: number;
    communication: number;
    timelines: number;
    overall: number;
  };
  comments: string;
  submittedAt: string;
}

interface ProjectContextType {
  projects: Project[];
  customerActions: CustomerAction[];
  feedback: Feedback[];
  approveDesign: (projectId: string, designId: string, notes: string) => void;
  addComment: (projectId: string, designId: string, comment: string) => void;
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'submittedAt'>) => void;
  uploadDesign: (projectId: string, design: Omit<DesignVersion, 'id' | 'status' | 'uploadedAt'>) => void;
  updateDesignStatus: (projectId: string, designId: string, status: DesignVersion['status']) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Mock data representing the shared workspace
const initialProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Biotech Research Lab',
    client: 'Genomix Corp',
    clientContact: 'Dr. Emily Watson',
    industry: 'Biotech',
    status: 'active',
    progress: 65,
    dueDate: 'March 15, 2024',
    assignedConsultant: 'Sarah Mitchell',
    assignedTech: ['James Chen', 'Maria Garcia'],
    assignedSales: 'Michael Roberts',
    budget: {
      approved: '$400,000 - $450,000',
      current: '$425,000',
      changeImpact: '+$15,000 (HVAC upgrade)'
    },
    timeline: {
      start: 'Jan 10, 2024',
      expectedEnd: 'March 15, 2024',
      milestones: [
        { name: 'Requirements Complete', date: 'Jan 20, 2024', status: 'completed' },
        { name: 'Initial Design', date: 'Feb 1, 2024', status: 'completed' },
        { name: 'Design Approval', date: 'Feb 15, 2024', status: 'current' },
        { name: 'Delivery Kickoff', date: 'Feb 25, 2024', status: 'upcoming' },
        { name: 'Final Delivery', date: 'March 15, 2024', status: 'upcoming' }
      ]
    },
    designs: [
      {
        id: 'des-001',
        title: 'Lab Layout',
        version: 'v3.2',
        status: 'pending_review',
        uploadedBy: 'James Chen',
        uploadedAt: 'Feb 12, 2024',
        changes: ['Expanded fume hood placement', 'Added emergency shower station', 'Revised electrical outlets'],
        impacts: {
          space: '+12 sq ft for safety equipment',
          safety: 'Enhanced with dual emergency stations',
          cost: '+$8,000 for additional equipment'
        }
      },
      {
        id: 'des-002',
        title: 'Equipment Placement',
        version: 'v2.1',
        status: 'approved',
        uploadedBy: 'James Chen',
        uploadedAt: 'Feb 8, 2024',
        changes: ['Optimized workstation layout', 'Added storage units'],
        impacts: {
          space: 'No change',
          safety: 'Improved workflow safety',
          cost: '+$3,000'
        },
        approvedAt: 'Feb 10, 2024',
        approvedBy: 'Dr. Emily Watson',
        customerComments: ['Great improvement on the workflow', 'Please ensure storage is lockable']
      },
      {
        id: 'des-003',
        title: 'Safety Systems Design',
        version: 'v1.0',
        status: 'in_review',
        uploadedBy: 'Maria Garcia',
        uploadedAt: 'Feb 5, 2024',
        changes: ['Initial safety system layout', 'Fire suppression integration'],
        impacts: {
          space: 'Dedicated safety corridor',
          safety: 'Full compliance with ISO standards',
          cost: 'Included in base estimate'
        }
      }
    ],
    pendingActions: [
      {
        id: 'act-001',
        type: 'review',
        title: 'Review Lab Layout v3.2',
        description: 'New layout with expanded safety features',
        dueDate: '2 days',
        priority: 'high',
        assignedTo: 'customer',
        relatedDesignId: 'des-001',
        status: 'pending'
      },
      {
        id: 'act-002',
        type: 'approval',
        title: 'Approve Safety Systems Design',
        description: 'Final safety compliance review',
        dueDate: '5 days',
        priority: 'medium',
        assignedTo: 'customer',
        relatedDesignId: 'des-003',
        status: 'pending'
      }
    ]
  },
  {
    id: 'proj-002',
    name: 'Pharmaceutical Testing Facility',
    client: 'MediCare Labs',
    clientContact: 'Dr. Robert Singh',
    industry: 'Pharmaceutical',
    status: 'review',
    progress: 90,
    dueDate: 'March 1, 2024',
    assignedConsultant: 'Sarah Mitchell',
    assignedTech: ['James Chen'],
    assignedSales: 'Michael Roberts',
    budget: {
      approved: '$300,000 - $350,000',
      current: '$320,000'
    },
    timeline: {
      start: 'Dec 1, 2023',
      expectedEnd: 'March 1, 2024',
      milestones: [
        { name: 'Requirements Complete', date: 'Dec 15, 2023', status: 'completed' },
        { name: 'Design Approval', date: 'Jan 30, 2024', status: 'completed' },
        { name: 'Final Review', date: 'Feb 20, 2024', status: 'current' },
        { name: 'Delivery', date: 'March 1, 2024', status: 'upcoming' }
      ]
    },
    designs: [
      {
        id: 'des-004',
        title: 'Clean Room Layout',
        version: 'v4.0',
        status: 'approved',
        uploadedBy: 'James Chen',
        uploadedAt: 'Jan 28, 2024',
        changes: ['Final clean room specifications', 'Air handling optimization'],
        impacts: {
          space: 'Optimized for efficiency',
          safety: 'Class 1000 compliance',
          cost: 'Within budget'
        },
        approvedAt: 'Jan 30, 2024',
        approvedBy: 'Dr. Robert Singh'
      }
    ],
    pendingActions: []
  },
  {
    id: 'proj-003',
    name: 'Environmental Analysis Center',
    client: 'EcoTest Inc',
    clientContact: 'Jennifer Moore',
    industry: 'Environmental',
    status: 'onboarding',
    progress: 25,
    dueDate: 'April 20, 2024',
    assignedConsultant: 'Sarah Mitchell',
    assignedTech: ['Maria Garcia'],
    assignedSales: 'Michael Roberts',
    budget: {
      approved: '$150,000 - $200,000',
      current: '$180,000'
    },
    timeline: {
      start: 'Feb 1, 2024',
      expectedEnd: 'April 20, 2024',
      milestones: [
        { name: 'Requirements Gathering', date: 'Feb 15, 2024', status: 'current' },
        { name: 'Initial Design', date: 'March 1, 2024', status: 'upcoming' },
        { name: 'Design Approval', date: 'March 20, 2024', status: 'upcoming' },
        { name: 'Delivery', date: 'April 20, 2024', status: 'upcoming' }
      ]
    },
    designs: [],
    pendingActions: [
      {
        id: 'act-003',
        type: 'feedback',
        title: 'Complete Requirements Form',
        description: 'Submit detailed lab requirements',
        dueDate: '7 days',
        priority: 'high',
        assignedTo: 'customer',
        status: 'pending'
      }
    ]
  }
];

const initialCustomerActions: CustomerAction[] = [
  {
    id: 'ca-001',
    type: 'approval',
    projectId: 'proj-001',
    projectName: 'Biotech Research Lab',
    designId: 'des-002',
    designTitle: 'Equipment Placement v2.1',
    content: 'Approved with notes: Please ensure storage units are lockable.',
    timestamp: 'Feb 10, 2024 at 2:30 PM',
    customerName: 'Dr. Emily Watson'
  },
  {
    id: 'ca-002',
    type: 'comment',
    projectId: 'proj-001',
    projectName: 'Biotech Research Lab',
    designId: 'des-003',
    designTitle: 'Safety Systems Design v1.0',
    content: 'Please clarify the fire suppression system coverage area.',
    timestamp: 'Feb 6, 2024 at 10:15 AM',
    customerName: 'Dr. Emily Watson'
  },
  {
    id: 'ca-003',
    type: 'approval',
    projectId: 'proj-002',
    projectName: 'Pharmaceutical Testing Facility',
    designId: 'des-004',
    designTitle: 'Clean Room Layout v4.0',
    content: 'Final approval granted. Ready for delivery phase.',
    timestamp: 'Jan 30, 2024 at 4:00 PM',
    customerName: 'Dr. Robert Singh'
  }
];

const initialFeedback: Feedback[] = [
  {
    id: 'fb-001',
    projectId: 'proj-002',
    projectName: 'Pharmaceutical Testing Facility',
    customerName: 'Dr. Robert Singh',
    ratings: {
      designQuality: 5,
      communication: 4,
      timelines: 4,
      overall: 5
    },
    comments: 'Excellent work on the clean room design. Communication could be more frequent but overall very satisfied.',
    submittedAt: 'Feb 15, 2024'
  }
];

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [customerActions, setCustomerActions] = useState<CustomerAction[]>(initialCustomerActions);
  const [feedback, setFeedback] = useState<Feedback[]>(initialFeedback);

  const approveDesign = (projectId: string, designId: string, notes: string) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          designs: project.designs.map(design => {
            if (design.id === designId) {
              return {
                ...design,
                status: 'approved' as const,
                approvedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                approvedBy: project.clientContact
              };
            }
            return design;
          }),
          pendingActions: project.pendingActions.filter(action => action.relatedDesignId !== designId)
        };
      }
      return project;
    }));

    const project = projects.find(p => p.id === projectId);
    const design = project?.designs.find(d => d.id === designId);

    if (project && design) {
      setCustomerActions(prev => [{
        id: `ca-${Date.now()}`,
        type: 'approval',
        projectId,
        projectName: project.name,
        designId,
        designTitle: `${design.title} ${design.version}`,
        content: notes || 'Approved',
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
        customerName: project.clientContact
      }, ...prev]);
    }
  };

  const addComment = (projectId: string, designId: string, comment: string) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          designs: project.designs.map(design => {
            if (design.id === designId) {
              return {
                ...design,
                customerComments: [...(design.customerComments || []), comment]
              };
            }
            return design;
          })
        };
      }
      return project;
    }));

    const project = projects.find(p => p.id === projectId);
    const design = project?.designs.find(d => d.id === designId);

    if (project && design) {
      setCustomerActions(prev => [{
        id: `ca-${Date.now()}`,
        type: 'comment',
        projectId,
        projectName: project.name,
        designId,
        designTitle: `${design.title} ${design.version}`,
        content: comment,
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
        customerName: project.clientContact
      }, ...prev]);
    }
  };

  const submitFeedback = (newFeedback: Omit<Feedback, 'id' | 'submittedAt'>) => {
    setFeedback(prev => [{
      ...newFeedback,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }, ...prev]);
  };

  const uploadDesign = (projectId: string, design: Omit<DesignVersion, 'id' | 'status' | 'uploadedAt'>) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const newDesign: DesignVersion = {
          ...design,
          id: `des-${Date.now()}`,
          status: 'draft',
          uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        return {
          ...project,
          designs: [...project.designs, newDesign]
        };
      }
      return project;
    }));
  };

  const updateDesignStatus = (projectId: string, designId: string, status: DesignVersion['status']) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          designs: project.designs.map(design => {
            if (design.id === designId) {
              return { ...design, status };
            }
            return design;
          })
        };
      }
      return project;
    }));
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      customerActions,
      feedback,
      approveDesign,
      addComment,
      submitFeedback,
      uploadDesign,
      updateDesignStatus
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
