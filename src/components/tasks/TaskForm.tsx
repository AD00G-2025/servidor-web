import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch } from '@/store/hooks';
import { createTask } from '@/store/slices/taskSlice';
import { taskSchema, TaskFormData } from '@/lib/schemas';
import { Plus } from 'lucide-react';

export function TaskForm() {
  const dispatch = useAppDispatch();
  
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      descricao: '',
      concluida: false,
    },
  });

  const onSubmit = async (values: TaskFormData) => {
    try {
      await dispatch(createTask(values)).unwrap();
      form.reset();
    } catch (error) {
      // Error is handled by Redux
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Nova Tarefa</span>
        </CardTitle>
        <CardDescription>
          Adicione uma nova tarefa à sua lista de afazeres
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva sua tarefa..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="concluida"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Marcar como concluída</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Tarefa
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}