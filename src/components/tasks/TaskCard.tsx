import { useState } from 'react';
import { Task } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { updateTask, deleteTask } from '@/store/slices/taskSlice';
import { Input } from '@/components/ui/input';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(task.descricao);

  const handleToggleComplete = async () => {
    await dispatch(updateTask({
      id: task.id,
      payload: {
        descricao: task.descricao,
        concluida: !task.concluida,
      },
    }));
  };

  const handleSaveEdit = async () => {
    if (editDescription.trim()) {
      await dispatch(updateTask({
        id: task.id,
        payload: {
          descricao: editDescription,
          concluida: task.concluida,
        },
      }));
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditDescription(task.descricao);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      await dispatch(deleteTask(task.id));
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Checkbox
              checked={task.concluida}
              onCheckedChange={handleToggleComplete}
              className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
            <div className="flex-1">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <Input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                    className="flex-1"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleSaveEdit} variant="outline">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleCancelEdit} variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm ${
                      task.concluida
                        ? 'line-through text-gray-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {task.descricao}
                  </span>
                  <Badge
                    variant={task.concluida ? 'default' : 'secondary'}
                    className={task.concluida ? 'bg-green-100 text-green-800' : ''}
                  >
                    {task.concluida ? 'Concluída' : 'Pendente'}
                  </Badge>
                </div>
              )}
            </div>
          </div>
          {!isEditing && (
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}