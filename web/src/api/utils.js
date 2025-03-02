export const GET = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Check if response status code is not in the 200-299 range
      const errorData = await response.json().catch(() => {
        // Catch JSON parsing errors
        throw new Error(
          `HTTP error! status: ${response.status},  ${response.statusText}`,
        );
      });
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error; // Re-throw for caller to handle
  }
};

export const POST = async (url, body) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error(
          `HTTP error! status: ${response.status},  ${response.statusText}`,
        );
      });
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const DELETE = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error(
          `HTTP error! status: ${response.status},  ${response.statusText}`,
        );
      });
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in DELETE request:", error);
    throw error;
  }
};

export const PUT = async (url, body) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify(body),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {
        throw new Error(
          `HTTP error! status: ${response.status},  ${response.statusText}`,
        );
      });
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in PUT request:", error);
    throw error;
  }
};
