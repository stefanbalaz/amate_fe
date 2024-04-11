import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikHelpers } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import PartnerInformationFields from './PartnerInformationFields'
import ProductInformationFields from './ProductInformationFields'
import PackagingInformationFields from './PackagingInformationFields'
import DeliveryInformationFields from './DeliveryInformationFields'
import BillingInformationFields from './BillingInformationFields'
import AdditionalInformationFields from './AdditionalInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { useAppSelector } from '@/store'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikHelpers<any>

type InitialData = {
    // deliveryDate?: Date
    orderCreationDate?: Date
    orderStatus?: string
    /*  orderNumber?: string
    orderPartner?: string
    orderProductClassic?: number
    orderProductMelon?: number
    orderProductMint?: number
    orderProductHemp?: number
    orderProductGinger?: number
    productVolume?: number
    transportMedium?: string
    containerMedium?: string
    unitsPerTransportMedium?: number
    transportMediumIssuanceAmount?: number
    containerMediumReceiptAmount?: number
    palletIssuanceAmount?: number
    transportMediumReceiptAmount?: number
    palletReceiptAmount?: number
    deliveryMethod?: string
    deliveryMethodDetail?: string
    deliveryRegion?: string */
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductFormProps = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    /*   orderCreationDate: Yup.date().required('Order Creation Date Required'),
    name: Yup.string().required('Product Name Required'),
    price: Yup.number().required('Price Required'),
    stock: Yup.number().required('SKU Required'),
    category: Yup.string().required('Category Required'), */
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this product? All record
                    related to this product will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef<FormikRef, ProductFormProps>((props, ref) => {
    const {
        type,
        initialData = {
            //  orderNumber: '',
            orderCreationDate: new Date(),
            orderStatus: 'preliminary_order',
            //   orderPartner: '',
            /*    orderProductClassic: 0,
            orderProductMelon: 0,
            orderProductMint: 0,
            orderProductHemp: 0,
            orderProductGinger: 0,
            productVolume: 0, */
            //  transportMedium: '',
            //  containerMedium: '',
            /*      unitsPerTransportMedium: 0,
            transportMediumIssuanceAmount: 0,
            containerMediumReceiptAmount: 0,
            palletIssuanceAmount: 0,
            transportMediumReceiptAmount: 0,
            palletReceiptAmount: 0, */
            //  deliveryMethod: '',
            //  deliveryMethodDetail: '',
            // deliveryDate: new Date(),
            //  deliveryRegion: '',
        },
        //  onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    // const initialValues = { ...initialData }

    // Define state to hold form data
    const [formData, setFormData] = useState<FormModel>({
        ...initialData,
    })

    console.log('initialData', initialData)

    // Function to update form data
    const handleFieldChange = (fieldName: string, value: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }))
    }

    console.log('FORM DATA', formData)

    const newId = useUniqueId('product-')

    const productAmounts = useAppSelector((state) => state.product)
    console.log('productAmounts', productAmounts)

    const handleSubmit = async (
        // values: FormModel,

        { setSubmitting }: FormikRef
    ) => {
        console.log('Form submitted with values:', formData)
        try {
            // Call the endpoint to submit the form data
            const response = await fetch('http://localhost:8000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                const body = await response.json()
                console.log('Response body:', body)
                // Handle success (if needed)
            } else {
                // Handle error response
                console.error('Error submitting form:', response.statusText)
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            // Handle other errors (e.g., network issues)
        } finally {
            // Set submitting to false
            setSubmitting(false)
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        onFieldChange={handleFieldChange}
                                    />
                                    <PartnerInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        onFieldChange={handleFieldChange}
                                    />
                                    <ProductInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        onFieldChange={handleFieldChange}
                                    />
                                    <PackagingInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        onFieldChange={handleFieldChange}
                                    />
                                    <DeliveryInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        onFieldChange={handleFieldChange}
                                    />
                                    <BillingInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        onFieldChange={handleFieldChange}
                                    />
                                    <AdditionalInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        onFieldChange={handleFieldChange}
                                    />
                                </div>
                                {/*                 <div className="lg:col-span-1">
                                    <ProductImages values={values} />
                                </div> */}
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 custom-group-button flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.displayName = 'ProductForm'

export default ProductForm
