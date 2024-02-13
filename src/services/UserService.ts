/* // UserService.ts

import ApiService from './ApiService'

type UserApiResponse = {
    // Define your API response type
    // For example, if your API returns user data
    userId: string
    userName: string
    email: string
    // Add other fields as needed
}

type UserApiRequest = {
    // Define your API request type
    // For example, if your API requires user registration data
    userName: string
    email: string
    password: string
    // Add other fields as needed
}

export async function registerUser(data: UserApiRequest) {
    // Call ApiService.fetchData with the appropriate types
    console.log('API call', data)
    return ApiService.fetchData<UserApiResponse, UserApiRequest>({
        url: 'https://amate.onrender.com/sign-up', // Replace with your actual API endpoint
        method: 'post',
        data,
    })
}

// You can define more API functions as needed
 */
