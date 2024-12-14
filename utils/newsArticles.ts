



export async function fetchNews(): Promise<any[]> {
  try {
    const response = await fetch("http://localhost:3000/api/news");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("MY NEWS ------------------------ " , data.data[0])
   
    return data.data; // Assuming `data` is an array of news items

  } catch (error) {
    console.error("Failed to fetch news:", error);
    return []; // Return an empty array on error
  }
}



