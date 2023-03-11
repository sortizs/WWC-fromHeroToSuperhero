export const fetchAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export async function fetchApi(url) {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        return error;
    }
}