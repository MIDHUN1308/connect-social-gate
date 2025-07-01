
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Circle, Calendar, MoreHorizontal } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  assignee?: string;
  category: string;
}

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
}

const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
      task.completed ? "opacity-75" : ""
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto"
            onClick={onToggle}
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <h3 className={`font-semibold text-gray-900 mb-2 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}>
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {task.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className={getPriorityColor(task.priority)} variant="secondary">
              {task.priority}
            </Badge>
            <Badge variant="outline">
              {task.category}
            </Badge>
          </div>

          {(task.dueDate || task.assignee) && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
              
              {task.assignee && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {task.assignee.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{task.assignee}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
