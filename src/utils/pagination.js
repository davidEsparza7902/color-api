const generatePagination = (request, data, totalCount, limit) => {
    const page = parseInt(request.query.page) || 1;
    const totalPages = Math.ceil(totalCount / limit);
    const nextPage = page < totalPages ? `${getBaseUrl(request)}?page=${page + 1}&limit=${limit}` : null;
    const prevPage = page > 1 ? `${getBaseUrl(request)}?page=${page - 1}&limit=${limit}` : null;
    const responseData = {
        pagination : {
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalCount,
            nextPage: nextPage,
            prevPage: prevPage,
        },
        data: data
    };
    return responseData;
};

const getBaseUrl = (request) => {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.baseUrl}`;
    return baseUrl;
};
module.exports = { generatePagination };