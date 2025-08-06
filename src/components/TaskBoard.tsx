
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp } from 'lucide-react';
import TaskColumn, { Column } from './TaskColumn';
import { Task } from './TaskCard';
import AnalyticsOverview from './AnalyticsOverview';
import PerformanceMetrics from './PerformanceMetrics';

// Initial data for the task board
const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'muted',
    tasks: [
      {
        id: 't1',
        title: 'Set up pricing experiment framework',
        description: 'Design A/B logic for personalized in-game offers',
        tag: { color: 'purple', label: 'Product' },
        dueDate: 'Aug 10',
        assignees: 2,
        progress: { completed: 1, total: 5 }
      },
      {
        id: 't2',
        title: 'Define core segmentation logic',
        description: 'Draft logic for behavioral cohorts (whales, casuals)',
        tag: { color: 'accent', label: 'Data' },
        dueDate: 'Aug 11',
        assignees: 1,
        progress: { completed: 0, total: 3 }
      },
      {
        id: 't3',
        title: 'Integrate SDK into test game',
        description: 'Hook SDK into Unity demo for live pricing injection',
        tag: { color: 'blue', label: 'Engineering' },
        dueDate: 'Aug 12',
        assignees: 2,
        progress: { completed: 0, total: 6 }
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'blue',
    tasks: [
      {
        id: 't4',
        title: 'Price recommendation model (v1)',
        description: 'Train initial version on synthetic player data',
        tag: { color: 'accent', label: 'AI' },
        dueDate: 'Aug 8',
        assignees: 1,
        progress: { completed: 3, total: 5 }
      },
      {
        id: 't5',
        title: 'Setup analytics dashboard',
        description: 'Track offer views, purchases, and ARPU in real time',
        tag: { color: 'blue', label: 'Engineering' },
        dueDate: 'Aug 9',
        assignees: 1,
        progress: { completed: 2, total: 4 }
      },
      {
        id: 't6',
        title: 'Partnership outreach',
        description: 'Send pitch deck to 10 studios for pilot testing',
        tag: { color: 'accent', label: 'BD' },
        dueDate: 'Aug 10',
        assignees: 1,
        progress: { completed: 4, total: 10 }
      }
    ]
  },
  {
    id: 'in-review',
    title: 'In Review',
    color: 'amber',
    tasks: [
      {
        id: 't7',
        title: 'Landing page V2',
        description: 'Review new positioning and copy based on feedback',
        tag: { color: 'purple', label: 'Design' },
        dueDate: 'Aug 6',
        assignees: 2,
        progress: { completed: 2, total: 2 }
      },
      {
        id: 't8',
        title: 'Offer pacing logic',
        description: 'Check cooldown system to avoid pricing fatigue',
        tag: { color: 'blue', label: 'Engineering' },
        dueDate: 'Aug 6',
        assignees: 1,
        progress: { completed: 4, total: 5 }
      }
    ]
  },
  {
    id: 'completed',
    title: 'Completed',
    color: 'accent',
    tasks: [
      {
        id: 't9',
        title: 'Built internal test game (Kivo Play)',
        description: 'Prototype game used to test pricing algorithms',
        tag: { color: 'blue', label: 'Engineering' },
        dueDate: 'Aug 1',
        assignees: 1,
        progress: { completed: 8, total: 8 }
      },
      {
        id: 't10',
        title: 'Monetization audit',
        description: 'Mapped monetization flows in 5 competitor games',
        tag: { color: 'accent', label: 'Research' },
        dueDate: 'July 30',
        assignees: 2,
        progress: { completed: 5, total: 5 }
      },
      {
        id: 't11',
        title: 'Implemented base SDK wrapper',
        description: 'Abstracted offer logic and price injection hooks',
        tag: { color: 'blue', label: 'Engineering' },
        dueDate: 'Aug 2',
        assignees: 1,
        progress: { completed: 4, total: 4 }
      }
    ]
  }
];

interface TaskBoardProps {
  className?: string;
  showAnalytics?: boolean;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ className, showAnalytics = true }) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragSourceColumn, setDragSourceColumn] = useState<string | null>(null);
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState("overview");
  const { toast } = useToast();

  const handleTaskDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id);
    setDraggedTask(task);
    
    // Find source column
    const sourceColumn = columns.find(col => 
      col.tasks.some(t => t.id === task.id)
    );
    
    if (sourceColumn) {
      setDragSourceColumn(sourceColumn.id);
      e.dataTransfer.setData('sourceColumnId', sourceColumn.id);
    }
  };

  const handleTaskDragEnd = () => {
    setDraggedTask(null);
    setDragSourceColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Handle drag leave logic if needed
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    
    if (!taskId || !sourceColumnId || sourceColumnId === targetColumnId) {
      return;
    }
    
    // Update columns state
    const newColumns = columns.map(column => {
      // Remove task from source column
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      
      // Add task to target column
      if (column.id === targetColumnId) {
        const taskToMove = columns.find(col => col.id === sourceColumnId)?.tasks.find(task => task.id === taskId);
        if (taskToMove) {
          return {
            ...column,
            tasks: [...column.tasks, taskToMove]
          };
        }
      }
      
      return column;
    });
    
    setColumns(newColumns);
    
    // Show a toast notification
    const targetColumn = columns.find(col => col.id === targetColumnId);
    if (targetColumn && draggedTask) {
      toast({
        title: "Task moved",
        description: `${draggedTask.title} moved to ${targetColumn.title}`,
      });
    }
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    // This function can be used for programmatic status changes (not used in this implementation)
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Analytics Dashboards */}
      {showAnalytics && (
        <div className="w-full">
          <Tabs value={activeAnalyticsTab} onValueChange={setActiveAnalyticsTab} className="w-full">
            <div className="flex items-center justify-between mb-8">
              <TabsList className="grid w-auto grid-cols-2 bg-muted/50">
                <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <BarChart3 className="h-4 w-4" />
                  Analytics Overview
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center gap-2 data-[state=active]:bg-background">
                  <TrendingUp className="h-4 w-4" />
                  Performance Metrics
                </TabsTrigger>
              </TabsList>
              <Button 
                variant="outline" 
                size="sm"
                className="border-muted-foreground/20 text-muted-foreground hover:bg-muted/30"
                onClick={() => setActiveAnalyticsTab(activeAnalyticsTab === "overview" ? "performance" : "overview")}
              >
                Switch View
              </Button>
            </div>
            
            <TabsContent value="overview" className="mt-0">
              <AnalyticsOverview />
            </TabsContent>
            
            <TabsContent value="performance" className="mt-0">
              <PerformanceMetrics />
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {/* Task Board Columns */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map(column => (
          <TaskColumn
            key={column.id}
            column={column}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onTaskDragStart={handleTaskDragStart}
            onTaskDragEnd={handleTaskDragEnd}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
