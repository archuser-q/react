import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api, setOnUnauthorized, setToken, type User } from '../api';

const TOKEN_KEY = 'thonhanh_token';

type AuthValue = {
  user: User | null;
  booting: boolean; // đang đọc token đã lưu lúc mở app
  login: (phone: string, password: string) => Promise<void>;
  register: (data: { full_name: string; phone: string; password: string; email?: string | null }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: User) => void;
};

const AuthContext = createContext<AuthValue | null>(null);

async function saveToken(t: string | null) {
  setToken(t);
  try {
    if (t) await SecureStore.setItemAsync(TOKEN_KEY, t);
    else await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch {
    // SecureStore không có trên web -> chỉ giữ token trong bộ nhớ
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [booting, setBooting] = useState(true);

  const logout = useCallback(async () => {
    await saveToken(null);
    setUserState(null);
  }, []);

  // Mở app: đọc token cũ, gọi /auth/me để kiểm tra còn hạn
  useEffect(() => {
    setOnUnauthorized(() => {
      void logout();
    });
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(TOKEN_KEY).catch(() => null);
        if (saved) {
          setToken(saved);
          const me = await api.me();
          if (me.role === 'customer') setUserState(me);
          else await saveToken(null);
        }
      } catch {
        await saveToken(null);
      } finally {
        setBooting(false);
      }
    })();
    return () => setOnUnauthorized(null);
  }, [logout]);

  const login = useCallback(async (phone: string, password: string) => {
    const res = await api.login(phone, password);
    if (res.user.role !== 'customer') {
      throw new Error('Tài khoản này không phải tài khoản khách hàng');
    }
    await saveToken(res.access_token);
    setUserState(res.user);
  }, []);

  const register = useCallback(
    async (data: { full_name: string; phone: string; password: string; email?: string | null }) => {
      await api.register(data);
      await login(data.phone, data.password);
    },
    [login],
  );

  const value = useMemo(
    () => ({ user, booting, login, register, logout, setUser: setUserState }),
    [user, booting, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
  return ctx;
}
