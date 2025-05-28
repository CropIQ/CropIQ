'use client';

import { useRouter } from 'next/navigation';
import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode,
  useCallback
} from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  success: string | null;
  setSuccess: (success: string | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getToken = useCallback(() => {
    return localStorage.getItem('accessToken');
  }, []);

  const handleApiError = useCallback((error: any) => {
    console.debug('API Error:', error);
    setError(error instanceof Error ? error.message : 'An unknown error occurred');
    removeTokens();
  }, []);

  const updateUserData = useCallback(async () => {
    console.debug('Updating user data...');
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      if (!token) {
        removeTokens();
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      setUser(() => JSON.parse(atob(token.split('.')[1])));
      setIsAuthenticated(true);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [getToken, handleApiError]);
  
  const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
  }

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
      throw new Error('Email or password is incorrect');
      }

      const data = await response.json();
      
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      } else {
        throw new Error('No access token received');
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        throw new Error('No refresh token received');
      }

      setSuccess('Login successful! Redirecting...');
      await updateUserData();
      setTimeout(() => {
        router.push('/');
        setSuccess(null);
      }, 1000);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role: "worker" }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      } else {
        throw new Error('No access token received');
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        throw new Error('No refresh token received');
      }

      setSuccess('Registration successful! Redirecting...');
      await updateUserData();
      setTimeout(() => {
        router.push('/');
        setSuccess(null);
      }, 1000);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    setLoading(true);
    setError(null);
    removeTokens();
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    router.push('/login');
  };

  useEffect(() => {
    updateUserData();
  }, [updateUserData]);

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    setError,
    success,
    setSuccess,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function WrappedComponent(props: P) {
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        window.location.href = '/login';
      }
    }, [loading, isAuthenticated]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}