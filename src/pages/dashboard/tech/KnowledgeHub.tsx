import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from "@/components/dashboard/EmptyState";
import { useWorkspace } from "@/context/WorkspaceContext";
import { 
  LayoutDashboard, 
  FileCode, 
  ClipboardList, 
  CheckSquare, 
  Settings,
  BookOpen,
  Search,
  Calendar,
  Building2,
  FlaskConical,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Wrench,
  Layers,
  Eye,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  FileText,
  Cpu
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard/tech", icon: LayoutDashboard },
  { label: "Design Versions", href: "/dashboard/tech/designs", icon: FileCode },
  { label: "Technical Docs", href: "/dashboard/tech/docs", icon: ClipboardList },
  { label: "My Tasks", href: "/dashboard/tech/tasks", icon: CheckSquare },
  { label: "Feasibility", href: "/dashboard/tech/feasibility", icon: Settings },
  { label: "Knowledge Hub", href: "/dashboard/tech/knowledge", icon: BookOpen },
];

const KnowledgeHub = () => {
  const { knowledgeEntries, markComponentReusable } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [labTypeFilter, setLabTypeFilter] = useState<string | null>(null);

  // Get unique industries and lab types for filters
  const industries = [...new Set(knowledgeEntries.map(e => e.customerIndustry))];
  const labTypes = [...new Set(knowledgeEntries.map(e => e.labType))];

  // Filter entries
  const filteredEntries = knowledgeEntries.filter(entry => {
    const matchesSearch = searchQuery === "" || 
      entry.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.reusableComponents.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesIndustry = !industryFilter || entry.customerIndustry === industryFilter;
    const matchesLabType = !labTypeFilter || entry.labType === labTypeFilter;
    return matchesSearch && matchesIndustry && matchesLabType;
  });

  // Count reusable components
  const totalReusableComponents = knowledgeEntries.reduce(
    (acc, e) => acc + e.reusableComponents.filter(c => c.isMarkedReusable).length, 
    0
  );

  const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'biotechnology':
        return <FlaskConical className="w-4 h-4" />;
      case 'pharmaceutical':
        return <Building2 className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const handleToggleReusable = (entryId: string, componentName: string, currentState: boolean) => {
    markComponentReusable(entryId, componentName, !currentState);
  };

  return (
    <DashboardLayout role="tech" userName="James Chen" navItems={navItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Knowledge Hub</h1>
            <p className="text-muted-foreground">Completed Projects Library – Technical execution learnings</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={industryFilter === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setIndustryFilter(null)}
            >
              All Industries
            </Button>
            {industries.map(industry => (
              <Button
                key={industry}
                variant={industryFilter === industry ? "default" : "outline"}
                size="sm"
                onClick={() => setIndustryFilter(industryFilter === industry ? null : industry)}
              >
                {getIndustryIcon(industry)}
                <span className="ml-1">{industry}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Lab Type Filters */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground mr-2">Lab Type:</span>
          <Button 
            variant={labTypeFilter === null ? "secondary" : "ghost"} 
            size="sm"
            onClick={() => setLabTypeFilter(null)}
          >
            All
          </Button>
          {labTypes.map(labType => (
            <Button
              key={labType}
              variant={labTypeFilter === labType ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setLabTypeFilter(labTypeFilter === labType ? null : labType)}
            >
              {labType}
            </Button>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">{knowledgeEntries.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Completed Projects</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-foreground">
                {knowledgeEntries.reduce((acc, e) => acc + e.keyDesignVersions.length, 0)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Final Designs</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-1">
              <BookmarkCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-2xl font-bold text-foreground">{totalReusableComponents}</span>
            </div>
            <p className="text-sm text-muted-foreground">Reusable Components</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="w-5 h-5 text-amber-500" />
              <span className="text-2xl font-bold text-foreground">
                {knowledgeEntries.reduce((acc, e) => acc + e.technicalConstraints.length, 0)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Constraints Documented</p>
          </div>
        </div>

        {/* Knowledge Entries */}
        {filteredEntries.length > 0 ? (
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                {/* Entry Header */}
                <div className="p-5 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{entry.projectName}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {getIndustryIcon(entry.customerIndustry)}
                          {entry.customerIndustry}
                        </span>
                        <span className="flex items-center gap-1">
                          <FlaskConical className="w-4 h-4" />
                          {entry.labType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Completed {entry.completionDate}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                </div>

                {/* Entry Content - Tech Team Focus */}
                <Tabs defaultValue="designs" className="p-5">
                  <TabsList className="mb-4">
                    <TabsTrigger value="designs">Final Designs</TabsTrigger>
                    <TabsTrigger value="technical">Technical Details</TabsTrigger>
                    <TabsTrigger value="components">Reusable Components</TabsTrigger>
                    <TabsTrigger value="evolution">Design Evolution</TabsTrigger>
                  </TabsList>

                  <TabsContent value="designs" className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Final approved design versions for reference
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {entry.keyDesignVersions.map((design) => (
                        <div key={design.id} className="border border-border rounded-lg p-4 bg-secondary/30">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-foreground">{design.title}</span>
                            <Badge variant="secondary">{design.version}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="technical" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Technical Constraints
                        </h4>
                        <ul className="space-y-2">
                          {entry.technicalConstraints.map((constraint, idx) => (
                            <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              {constraint}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Feasibility Notes
                        </h4>
                        <p className="text-sm text-blue-700">{entry.feasibilityNotes}</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        Engineering Trade-offs
                      </h4>
                      <ul className="space-y-2">
                        {entry.engineeringTradeoffs.map((tradeoff, idx) => (
                          <li key={idx} className="text-sm text-purple-700 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {tradeoff}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="components" className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Mark components as reusable for future projects
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {entry.reusableComponents.map((component, idx) => (
                        <div 
                          key={idx} 
                          className={`border rounded-lg p-4 ${
                            component.isMarkedReusable 
                              ? 'border-emerald-300 bg-emerald-50' 
                              : 'border-border bg-secondary/30'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className="font-medium text-foreground">{component.name}</span>
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {component.category}
                              </Badge>
                            </div>
                          </div>
                          <Button 
                            variant={component.isMarkedReusable ? "default" : "outline"} 
                            size="sm" 
                            className="w-full mt-2"
                            onClick={() => handleToggleReusable(entry.id, component.name, component.isMarkedReusable)}
                          >
                            {component.isMarkedReusable ? (
                              <>
                                <BookmarkCheck className="w-4 h-4 mr-2" />
                                Marked Reusable
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-4 h-4 mr-2" />
                                Mark as Reusable
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="evolution" className="space-y-4">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Design Evolution Summary
                      </h4>
                      <p className="text-sm text-muted-foreground">{entry.designEvolution}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          What Worked Well
                        </h4>
                        <ul className="space-y-2">
                          {entry.whatWorkedWell.map((item, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-emerald-500 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          Challenges Faced
                        </h4>
                        <ul className="space-y-2">
                          {entry.challengesFaced.map((item, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={BookOpen}
            title="No completed projects yet"
            description="Knowledge entries are automatically created when workspaces are marked as completed."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeHub;