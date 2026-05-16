const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/user`;

export async function GetInsights() {
  const response = await fetch(`${API_BASE_URL}/insights`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch insights");
  }

  return result;
}

export async function GetSummary(startDate?: string, endDate?: string) {
  let url = `${API_BASE_URL}/summary`;

  if (startDate || endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch summary");
  }

  return result;
}

export async function GetCategorySummary() {
    const response = await fetch(`${API_BASE_URL}/category-summary`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed");
  }

  return result;
}

export async function GetMonthlyTrends() {
  const response = await fetch(`${API_BASE_URL}/monthly-trends`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch trends");
  }

  return data;
}

export async function GetWeeklyComparison() {
  const response = await fetch(`${API_BASE_URL}/weekly-comparison`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch weekly comparison");
  }

  return data;
}