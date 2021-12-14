// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseurl = process.env.REACT_APP_BASE_API_URL;
// const baseurl = 'https://localhost:44376/api';
// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({
        baseUrl: baseurl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken

            // console.log('token',token);
            const jwt = localStorage.getItem('jwt');
            //console.log('jwt',jwt);
            // If we have a token set in state, let's assume that we should be passing it.
            if (jwt) {
                // console.log('setting token to baseapi');
                headers.set('authorization', `Bearer ${jwt}`);
            }

            return headers
        },
    }),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        // The `getApplications` endpoint is a "query" operation that returns data
        getApplications: builder.query({
            // The URL for the request is '/fakeApi/posts'
            query: () => '/application'
        }),
        getSetupStatus: builder.query({
            // The URL for the request is '/fakeApi/posts'
            query: () => '/application/setupstatus'
        }),
        getToken: builder.mutation({
            query(body) {
                return {
                    url: `/account/token`,
                    method: 'POST',
                    body,
                }
            },
        }),
        createApplication: builder.mutation({
            query(body) {
                return {
                    url: `/application`,
                    method: 'POST',
                    body,
                }
            },
        }),
        createUser: builder.mutation({
            query(body) {
                return {
                    url: `/account/createuser`,
                    method: 'POST',
                    body,
                }
            },
        }),
        addRestaurant: builder.mutation({
            query(body) {
                return {
                    url: `/restaurants`,
                    method: 'POST',
                    body,
                }
            },
        }),
        removeRestaurant: builder.mutation({
            query(id) {
                return {
                    url: `/restaurants/${id}`,
                    method: 'DELETE'
                }
            },
        }),
        getRestaurant: builder.query({
            query: (id) => `/restaurants/${id}`
        }),
        getRestaurants: builder.query({
            query: (param) => {
                let url = `/restaurants?page=${param.page}`;
                if (param.name) url = url + `&name=${param.name}`;
                if (param.priceLevels && param.priceLevels.length > 0) {
                    param.priceLevels.map(x => url = url + `&priceLevel=${x}`);
                }
                if (param.ratings && param.ratings.length > 0) {
                    param.ratings.map(x => url = url + `&ratings=${x}`);
                }
                if (param.timings && param.timings.length > 0) {
                    param.timings.map(x => url = url + `&timings=${x}`);
                }
                return url;
            }
        }),
    })
})

// Export the auto-generated hook for the `getPost` query endpoint
export const {
    useGetTokenMutation,
    useGetApplicationsQuery,
    useGetSetupStatusQuery,
    useCreateApplicationMutation,
    useCreateUserMutation,
    useAddRestaurantMutation,
    useRemoveRestaurantMutation,
    useGetRestaurantsQuery,
    useGetRestaurantQuery,
    useGetFilteredRestaurantsQuery,
}
    = apiSlice