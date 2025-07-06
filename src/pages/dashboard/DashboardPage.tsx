import { Header } from '@/components/layout/Header';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';

export function DashboardPage() {
  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-12 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Afazeres</h1>
          <p className="text-gray-600">Gerencie suas tarefas diárias de forma eficiente</p>
        </div>
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}