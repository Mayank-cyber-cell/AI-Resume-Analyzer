import { createContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [islogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (session?.user) {
        setLogin(true);
        setUserInfo({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email,
          photoUrl: session.user.user_metadata?.photoUrl || null,
        });
      }
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          setLogin(true);
          setUserInfo({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email,
            photoUrl: session.user.user_metadata?.photoUrl || null,
          });
        } else {
          setLogin(false);
          setUserInfo(null);
        }
        setLoading(false);
      })();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ islogin, setLogin, userInfo, setUserInfo, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
