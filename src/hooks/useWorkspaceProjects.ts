import { useMemo } from "react";
import { useProjects } from "@/context/ProjectContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useAuth } from "@/context/AuthContext";

/**
 * Custom hook that bridges ProjectContext with WorkspaceContext
 * to provide workspace-aware project filtering based on the current user's role and assignments.
 */
export function useWorkspaceProjects() {
  const { currentUser } = useAuth();
  const { projects, customerActions, feedback, ...projectActions } = useProjects();
  const { workspaces, getWorkspacesByTeamMember, getWorkspacesByCustomer, customers, teamMembers } = useWorkspace();

  // Get relevant workspaces for the current user
  const myWorkspaces = useMemo(() => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case "customer":
        return currentUser.customerId 
          ? getWorkspacesByCustomer(currentUser.customerId)
          : [];
      case "sales":
      case "tech":
      case "consultant":
        return currentUser.teamMemberId
          ? getWorkspacesByTeamMember(currentUser.teamMemberId)
          : [];
      case "admin":
        return workspaces; // Admin sees all
      default:
        return [];
    }
  }, [currentUser, workspaces, getWorkspacesByTeamMember, getWorkspacesByCustomer]);

  // Get workspace project IDs for filtering
  const myWorkspaceProjectIds = useMemo(() => {
    return new Set(myWorkspaces.map(ws => ws.projectId));
  }, [myWorkspaces]);

  // Filter projects based on workspace assignments
  const myProjects = useMemo(() => {
    if (!currentUser) return [];

    // For demo compatibility, also filter by legacy fields
    return projects.filter(project => {
      // First check workspace assignment
      const matchedWorkspace = myWorkspaces.find(ws => 
        ws.projectName === project.name || 
        ws.customerName === project.clientContact
      );
      
      if (matchedWorkspace) return true;

      // Fallback to legacy field matching for backward compatibility
      switch (currentUser.role) {
        case "customer":
          return project.clientContact === currentUser.name;
        case "sales":
          return project.assignedSales === currentUser.name;
        case "tech":
          return project.assignedTech.includes(currentUser.name);
        case "consultant":
          return project.assignedConsultant === currentUser.name || true; // Consultants see all
        case "admin":
          return true;
        default:
          return false;
      }
    });
  }, [currentUser, projects, myWorkspaces]);

  // Filter customer actions based on accessible projects
  const myCustomerActions = useMemo(() => {
    const projectIds = new Set(myProjects.map(p => p.id));
    return customerActions.filter(action => projectIds.has(action.projectId));
  }, [customerActions, myProjects]);

  // Filter feedback based on accessible projects
  const myFeedback = useMemo(() => {
    const projectIds = new Set(myProjects.map(p => p.id));
    return feedback.filter(fb => projectIds.has(fb.projectId));
  }, [feedback, myProjects]);

  // Get workspace details for a project
  const getWorkspaceForProject = (projectName: string) => {
    return workspaces.find(ws => ws.projectName === projectName);
  };

  // Get team assignment for a project from workspace
  const getTeamForProject = (projectName: string) => {
    const workspace = getWorkspaceForProject(projectName);
    if (!workspace) return null;
    
    return {
      sales: workspace.assignment.sales,
      consultant: workspace.assignment.consultant,
      techTeam: workspace.assignment.techTeam,
    };
  };

  // Get customer details from workspace
  const getCustomerForProject = (projectName: string) => {
    const workspace = getWorkspaceForProject(projectName);
    if (!workspace) return null;
    
    return customers.find(c => c.id === workspace.customerId);
  };

  return {
    // User context
    currentUser,
    
    // Workspace-filtered data
    myProjects,
    myWorkspaces,
    myCustomerActions,
    myFeedback,
    
    // All data (for admin/consultant roles that need it)
    allProjects: projects,
    allCustomerActions: customerActions,
    allFeedback: feedback,
    allWorkspaces: workspaces,
    allCustomers: customers,
    allTeamMembers: teamMembers,
    
    // Helper functions
    getWorkspaceForProject,
    getTeamForProject,
    getCustomerForProject,
    
    // Pass through project actions
    ...projectActions,
  };
}
