import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

/* const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>
    ) {
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            console.log('ApiService - Request Parameters:', param)
            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    console.log('ApiService - Response:', response)

                    resolve(response)
                })
                .catch((errors: AxiosError) => {
                    console.error('ApiService - Error:', errors)
                    reject(errors)
                })
        })
    },
} */

const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>
    ) {
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            // Add console log to check the parameters being sent to BaseService
            // console.log('ApiService - Request Parameters:', param)

            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    // Add console log to check the response
                    // console.log('ApiService - Response:', response)

                    resolve(response)
                })
                .catch((errors: AxiosError) => {
                    // Add console log to check errors
                    // console.error('ApiService - Error:', errors)

                    reject(errors)
                })
        })
    },
}

export default ApiService
