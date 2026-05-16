const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/user`;

type expenseProp = {
    type: string;
    amount: number;
    category: string;
    description?: string;
    currency: string;
}

export async function CreateExpense({ type, amount, category, description, currency }: expenseProp) {
    const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            type,
            amount,
            category,
            description,
            currency
        })
    })
    const data = await response.json()as {
        message?: string;
        error?: string; 
        warning?: string;
    }
    if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to create expense");
    }
    return data;    
}

export async function GetExpenses() {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to fetch expenses");
    }
    return data;
}

export async function DeleteExpense(id: string){
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to delete expenses");
    }
    return data;
}


export async function UpdateExpense(id: string, updatedData: any) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedData),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to update expense");
  }

  return result;
}