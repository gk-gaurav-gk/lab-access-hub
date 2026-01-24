import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";

export interface FeedbackDialogProps {
  trigger?: React.ReactNode;
  projectId?: string;
  projectName?: string;
  onSubmit?: (ratings: Record<string, number>, comments: Record<string, string>) => void;
}

interface FeedbackCategory {
  id: string;
  label: string;
  description: string;
}

const categories: FeedbackCategory[] = [
  { id: "designQuality", label: "Design Quality", description: "Accuracy, completeness, and attention to detail" },
  { id: "communication", label: "Communication Clarity", description: "How well updates and changes were explained" },
  { id: "timelines", label: "Timelines", description: "Adherence to promised schedules" },
  { id: "overall", label: "Overall Experience", description: "Your overall satisfaction with the process" },
];

const StarRating = ({ 
  value, 
  onChange 
}: { 
  value: number; 
  onChange: (rating: number) => void;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none transition-transform hover:scale-110"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            className={`w-6 h-6 ${
              star <= (hover || value)
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const FeedbackDialog = ({ trigger, projectId, projectName, onSubmit }: FeedbackDialogProps) => {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const allRated = categories.every((cat) => ratings[cat.id] > 0);
    if (!allRated) {
      toast.error("Please rate all categories");
      return;
    }
    
    onSubmit?.(ratings, comments);
    
    toast.success("Thank you for your feedback!", {
      description: projectName ? `Your feedback for ${projectName} has been submitted.` : "Your input helps us improve our service.",
    });
    setOpen(false);
    setRatings({});
    setComments({});
  };

  const averageRating = Object.values(ratings).length > 0
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1)
    : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="w-4 h-4 mr-2" />
            Submit Structured Feedback
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Project Feedback
            {projectName && <span className="text-muted-foreground font-normal">- {projectName}</span>}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <p className="text-sm text-muted-foreground">
            Your structured feedback helps us continuously improve. Please rate each category and add any specific comments.
          </p>

          {categories.map((category) => (
            <div key={category.id} className="space-y-3 pb-4 border-b border-border last:border-0">
              <div>
                <Label className="text-base font-medium">{category.label}</Label>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              
              <StarRating
                value={ratings[category.id] || 0}
                onChange={(rating) => setRatings((prev) => ({ ...prev, [category.id]: rating }))}
              />
              
              <Textarea
                placeholder={`Optional: Share specific feedback about ${category.label.toLowerCase()}...`}
                value={comments[category.id] || ""}
                onChange={(e) => setComments((prev) => ({ ...prev, [category.id]: e.target.value }))}
                rows={2}
                className="text-sm"
              />
            </div>
          ))}

          {averageRating && (
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Your Average Rating</p>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <span className="text-2xl font-bold text-foreground">{averageRating}</span>
                <span className="text-muted-foreground">/ 5</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;