import axios from "axios";

export const compareFilesAPI = async (file1Content, file2Content) => {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title: "File Comparison",
      body: "Simulating file comparison",
    });


    if (response.status === 201) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: `API responded with status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Error in API call:", error);
    return {
      success: false,
      error: error.response
        ? `API Error: ${error.response.data}`
        : "Network or request error.",
    };
  }
};
