const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/user`;

type signupProp = {
    name: string;
    email: string;
    password: string;
}

type loginprop = {
    email: string;
    password: string;
    Date: DateConstructor;
}
    
export async function signup({ name, email, password }: signupProp) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    })
    const data = await response.json()as {
        message?: string;
        user?: any;
        token?: string;
        error?: string; 
    }
    if (!response.ok) {
    throw new Error(data.error || data.message || "Signup failed");
    }
    localStorage.setItem("token", data.token || "");
    localStorage.setItem("tokenExpiry",(Date.now() + 60 * 60 * 1000).toString());
    return data;
    
    
}

export async function login({email, password, Date}: loginprop) {
    
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json()as {
        token?: string;
        error?: string;
        message?: string;
    };

    if (!response.ok) {
        throw new Error(data.error || data.message || 'Login failed');
    }
    localStorage.setItem("token", data.token || "");
    localStorage.setItem("tokenExpiry",(Date.now() + 5 * 60 * 60 * 1000).toString());
    return data;

}


export async function GetProfile() {
    const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json();
     if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to fetch profile");
    }
    return data;
}

export async function UpdateProfile(data: any) {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

    const result = await response.json();
     if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to Update profile");
    }
    return data;
}

export async function DeleteProfile() {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await response.json();
   if (!response.ok) {
      throw new Error(result.error || result.message || "Failed to delete profile");
  }
  return result;
}

export async function Logout() {
    const response  = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || data.message || "Logout failed");
    }
    
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");

    return data;
}

export async function forgotPassword(email: string) {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to send reset password email");
    }
    return data;
}

export async function resetPassword(token: string, newPassword: string) {
    const response = await fetch(`${API_BASE_URL}/reset-password/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
    });
    const data = await response.json();     
    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to reset password");
    }
    return data;
}

export async function ChangePassword(data: any) {
  const response = await fetch(
    `${API_BASE_URL}/change-password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}