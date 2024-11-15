import { useRouter } from 'next/router';

// Hook personalizado para obtener el pathname
const useCurrentPathname = () => {
  const router = useRouter();

  // Retorna el pathname directamente
  return router.pathname;
};

export default useCurrentPathname;
