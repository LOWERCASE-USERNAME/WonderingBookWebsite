import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { getUserIdFromToken, getUserInfo } from '../services/authService';
import { User } from '../types/user';

export const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = Cookies.get('userInfo');

      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
        setLoading(false);
      } else {
        try {
          const userId = getUserIdFromToken();
          console.log(userId);
          if (userId) {
            const response = await getUserInfo(userId);
            console.log(response);
            setUserInfo(response);
            Cookies.set('userInfo', JSON.stringify(response), { expires: 1 }); // 1-day expiry
          } else {
            setError("User ID not found");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, setUserInfo, loading, error };
};
