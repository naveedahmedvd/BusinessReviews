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

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                console.log('setting token to baseapi');
                headers.set('authorization', `Bearer ${token}`);
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
    })
})

// Export the auto-generated hook for the `getPost` query endpoint
export const { useGetTokenMutation, useGetApplicationsQuery, useGetSetupStatusQuery, useCreateApplicationMutation, useCreateUserMutation } = apiSlice