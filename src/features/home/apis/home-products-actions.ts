export const getBestSellingProducts = async (
    page: number,
    limit: number,
    minRating: number,
) => {
    const response = await fetch(
        `${process.env.NEXT_API_URL}/products?page=${page}&limit=${limit}&minRating=${minRating}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    // console.log(data, 'data');
    return data.payload.data;
};