import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import { useEffect, useState } from 'react'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

type SignInFormSchema = {
    userName: string
    password: string
    rememberMe: boolean
}

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your user name'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props: SignInFormProps) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props

    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuth()

    const [showFetchingInfo, setShowFetchingInfo] = useState(false)

    /*    const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { userName, password } = values
        setSubmitting(true)
        let fetchingInfoTimeout = setTimeout(
            () => setShowFetchingInfo(true),
            1500
        )

        const result = await signIn({ userName, password })

        if (result?.status === 'failed') {
            setMessage(result.message)
            clearTimeout(fetchingInfoTimeout)
            setShowFetchingInfo(false)
        }

        setSubmitting(false)
        setShowFetchingInfo(false)
    }
 */

    /*     const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { userName, password } = values
        setSubmitting(true)

        // Counter for retry attempts
        let retryCount = 0

        // Function to handle the sign-in logic
        const signInLogic = async () => {
            // Set timeout for fetching info
            let fetchingInfoTimeout = setTimeout(() => {
                setShowFetchingInfo(true)
            }, 1500)

            try {
                // Attempt to sign in
                const result = await signIn({ userName, password })

                if (result?.status === 'failed') {
                    setMessage(result.message)
                    console.log('Login failed')
                }

                if (result?.status === 'success') {
                    // Assuming 'success' is the status for a successful sign-in
                    console.log(
                        `Login request attempt ${
                            retryCount + 1
                        } was successful.`
                    ) // Log successful attempt
                } else if (result?.status === 'failed') {
                    setMessage(result.message)
                }

                // Clear the fetching info timeout
                clearTimeout(fetchingInfoTimeout)
                setShowFetchingInfo(false)
            } catch (error) {
                // Handle timeout error
                if (error.message && error.message.includes('exceeded')) {
                    // Retry logic
                    if (retryCount < 2) {
                        retryCount++
                        console.log(`Retry attempt ${retryCount}`)
                        await signInLogic() // Retry the sign-in logic
                    } else {
                        console.error('Maximum retry attempts reached.')
                        setMessage('Sign-in failed. Please try again later.')
                        setShowFetchingInfo(false)
                    }
                } else {
                    // Handle other types of errors
                    console.log('Error during sign-in:', error.message)
                    console.error('Error during sign-in:', error.message)
                    setMessage('Sign-in failed. Please try again later.')
                    setShowFetchingInfo(false)
                }
            }
        }

        // Call the sign-in logic
        await signInLogic()

        // Complete the submission
        setSubmitting(false)
    } */

    const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { userName, password } = values
        setSubmitting(true)

        // Counter for retry attempts
        let retryCount = 0

        // Function to handle the sign-in logic
        const signInLogic = async () => {
            // Set timeout for fetching info
            let fetchingInfoTimeout = setTimeout(() => {
                console.log('Fetching info timeout reached.')
                setShowFetchingInfo(true)
            }, 1500)

            try {
                console.log('Attempting to sign in...')
                // Attempt to sign in
                const result = await signIn({ userName, password })

                if (result?.status === 'failed') {
                    setMessage(result.message)
                    console.log('Login failed:', result.message)
                }

                if (result?.status === 'success') {
                    // Assuming 'success' is the status for a successful sign-in
                    console.log(
                        `Login request attempt ${
                            retryCount + 1
                        } was successful.`
                    ) // Log successful attempt
                } else if (result?.status === 'failed') {
                    setMessage(result.message)
                }

                // Clear the fetching info timeout
                clearTimeout(fetchingInfoTimeout)
                setShowFetchingInfo(false)
            } catch (error) {
                // Handle timeout error
                if (error.message && error.message.includes('exceeded')) {
                    // Retry logic
                    if (retryCount < 2) {
                        retryCount++
                        console.log(`Retry attempt ${retryCount}`)
                        await signInLogic() // Retry the sign-in logic
                    } else {
                        console.error('Maximum retry attempts reached.')
                        setMessage('Sign-in failed. Please try again later.')
                        setShowFetchingInfo(false)
                    }
                } else {
                    // Handle other types of errors
                    console.log('Error during sign-in:', error.message)
                    console.error('Error during sign-in:', error.message)
                    setMessage('Sign-in failed. Please try again later.')
                    setShowFetchingInfo(false)
                }
            }
        }

        // Call the sign-in logic
        console.log('Initiating sign-in logic...')
        await signInLogic()

        // Complete the submission
        console.log('Sign-in logic completed.')
        setSubmitting(false)
    }

    return (
        <div className={className}>
            <div>
                {' '}
                {message && (
                    <Alert showIcon className="mb-4" type="danger">
                        <>{message}</>
                    </Alert>
                )}
            </div>
            <div>
                {' '}
                {showFetchingInfo && (
                    <Alert showIcon className="mb-4" type="info">
                        <>
                            Please wait briefly (ca. 20 seconds) for backend
                            activation.
                        </>
                    </Alert>
                )}
            </div>

            <Formik
                initialValues={{
                    userName: '',
                    password: '',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="User Name"
                                invalid={
                                    (errors.userName &&
                                        touched.userName) as boolean
                                }
                                errorMessage={errors.userName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="userName"
                                    placeholder="User Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={
                                    (errors.password &&
                                        touched.password) as boolean
                                }
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                >
                                    Remember Me
                                </Field>
                                <ActionLink to={forgotPasswordUrl}>
                                    Forgot Password?
                                </ActionLink>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>{`Don't have an account yet?`} </span>
                                <ActionLink to={signUpUrl}>Sign up</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignInForm
