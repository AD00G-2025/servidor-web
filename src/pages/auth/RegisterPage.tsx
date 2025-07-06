import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { CheckCircle2, Users, Shield, Zap } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Side - Branding and Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">TaskManager</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Organize seus afazeres diários de forma inteligente e eficiente. 
              Mantenha o foco no que realmente importa.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Gestão Simplificada</h3>
                <p className="text-blue-100">
                  Crie, edite e organize suas tarefas com uma interface intuitiva e moderna.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Controle Pessoal</h3>
                <p className="text-blue-100">
                  Suas tarefas são privadas e seguras, acessíveis apenas por você.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Produtividade</h3>
                <p className="text-blue-100">
                  Acompanhe seu progresso e mantenha-se motivado com estatísticas em tempo real.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-sm">
              "A organização é a chave para transformar sonhos em realidade."
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskManager</h1>
            <p className="text-gray-600">Organize seus afazeres diários</p>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Bem-vindo!
            </h2>
            <p className="text-gray-600 text-lg">
              Crie sua conta e comece a organizar suas tarefas hoje mesmo.
            </p>
          </div>

          <RegisterForm onSuccess={handleSuccess} />

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Ao criar uma conta, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}