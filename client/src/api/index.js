import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const campgroundsApi = createApi({
  reducerPath: "campgroundsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Campgrounds"],
  endpoints: (builder) => ({
    getCampgrounds: builder.query({
      query: () => `/campgrounds`,
      providesTags: ["Campgrounds"],
    }),
    getCampgroundById: builder.query({
      query: (id) => `/campgrounds/${id}`,
      providesTags: ["Campgrounds"],
    }),
    makeCampground: builder.mutation({
      query: (body) => ({
        url: `/campgrounds`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Campgrounds"],
    }),
    editCampground: builder.mutation({
      query: ({ id, body }) => ({
        url: `/campgrounds/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Campgrounds"],
    }),
    deleteCampground: builder.mutation({
      query: (id) => ({
        url: `/campgrounds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Campgrounds"],
    }),
  }),
});

export const {
  useGetCampgroundsQuery,
  useGetCampgroundByIdQuery,
  useMakeCampgroundMutation,
  useEditCampgroundMutation,
  useDeleteCampgroundMutation,
} = campgroundsApi;
