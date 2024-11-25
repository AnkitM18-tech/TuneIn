import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  const { initializeSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          await checkAdminStatus();
          // socket initialization
          if (userId) initializeSocket(userId);
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in Auth Provider ", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    // cleanup function - disconnect socket
    return () => disconnectSocket();
  }, [getToken, userId, checkAdminStatus, initializeSocket, disconnectSocket]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  return <div>{children}</div>;
};

export default AuthProvider;
