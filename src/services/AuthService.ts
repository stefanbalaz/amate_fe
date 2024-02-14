import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: '/sign-in',
        method: 'post',
        data,
    })
}

/* export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        // url: '/sign-up',
        url: 'https://amate.onrender.com/sign-up',
        method: 'post',
        data,
    })
} */

export async function apiSignUp(data: SignUpCredential) {
    try {
        const response = await ApiService.fetchData<SignUpResponse>({
            url: 'https://amate.onrender.com/partner/register',
            method: 'post',
            data,
        })

        return response
    } catch (error) {
        console.error('Error in apiSignUp:', error)
        throw error
    }
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
