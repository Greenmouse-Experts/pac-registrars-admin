export const getToken = () => {
    const token = localStorage.getItem("pac_token");
     return `Bearer ${token}`
   
  };
  