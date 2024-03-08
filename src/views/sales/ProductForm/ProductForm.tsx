import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import ProductInformationFields from './ProductInformationFields'
import PackagingInformationFields from './PackagingInformationFields'
import TransportInformationFields from './DeliveryInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { useAppSelector } from '@/store'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: string
    name?: string
    orderNumber?: string
    orderPartner?: string
    orderStatus?: string
    orderCreationDate?: Date
    orderProductClassic?: Number
    orderProductMelon?: Number
    orderProductMint?: Number
    orderProductHemp?: Number
    orderProductGinger?: Number
    productVolume?: Number
    transportMedium?: string
    containerMedium?: string
    unitsPerTransportMedium?: Number
    transportMediumIssuanceAmount?: Number
    containerMediumReceiptAmount?: Number
    palletIssuanceAmount?: Number
    transportMediumReceiptAmount?: Number
    palletReceiptAmount?: Number
    deliveryMethod?: string
    deliveryMethodDetail?: string
    deliveryDate?: Date
    deliveryRegion?: string
    productCode?: string
    img?: string
    imgList?: {
        id: string
        name: string
        img: string
    }[]
    category?: string
    price?: number
    stock?: number
    status?: number
    costPerItem?: number
    bulkDiscountPrice?: number
    taxRate?: number
    tags?: string[]
    brand?: string
    vendor?: string
    description?: string
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    //   orderNumber: Yup.string().required('Order Number Required'),
    orderPartner: Yup.string().required('Order Partner Required'),
    //   orderStatus: Yup.string().required('Order Status Required'),
    orderCreationDate: Yup.string().required('Order Creation Date Required'),
    name: Yup.string().required('Product Name Required'),
    price: Yup.number().required('Price Required'),
    stock: Yup.number().required('SKU Required'),
    category: Yup.string().required('Category Required'),
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

const ProductForm = forwardRef<FormikRef, ProductForm>((props, ref) => {
    const {
        type,
        initialData = {
            id: '',
            orderNumber: '',
            orderPartner: '',
            orderStatus: '',
            orderCreationDate: new Date(),
            orderProductClassic: 0,
            orderProductMelon: 0,
            orderProductMint: 0,
            orderProductHemp: 0,
            orderProductGinger: 0,
            productVolume: 0.33,
            transportMedium: 'Crate',
            containerMedium: 'Glass',
            unitsPerTransportMedium: 20,
            transportMediumIssuanceAmount: 0,
            containerMediumReceiptAmount: 0,
            palletIssuanceAmount: 0,
            transportMediumReceiptAmount: 0,
            palletReceiptAmount: 0,
            deliveryMethod: '',
            deliveryMethodDetail: '',
            deliveryDate: '',
            deliveryRegion: '',
            name: '',
            productCode: '',
            img: '',
            imgList: [],
            category: '',
            price: 0,
            stock: 0,
            status: 0,
            costPerItem: 0,
            bulkDiscountPrice: 0,
            taxRate: 6,
            tags: [],
            brand: '',
            vendor: '',
            description: '',
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const newId = useUniqueId('product-')

    const productAmounts = useAppSelector((state) => state.product)
    console.log('productAmounts', productAmounts)

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                              label: value,
                              value,
                          }))
                        : [],
                }}
                validationSchema={validationSchema}
                /*          initialTouched={{
                    // Set only specific fields as touched initially
                    orderNumber: true,
                    orderStatus: true,
                }} */
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.tags = formData.tags.map((tag) => {
                        if (typeof tag !== 'string') {
                            return tag.value
                        }
                        return tag
                    })
                    if (type === 'new') {
                        formData.id = newId
                        if (formData.imgList && formData.imgList.length > 0) {
                            formData.img = formData.imgList[0].img
                        }
                    }
                    onFormSubmit?.(formData, setSubmitting)
                }}
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
                                    />
                                    <ProductInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <PackagingInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <TransportInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
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
