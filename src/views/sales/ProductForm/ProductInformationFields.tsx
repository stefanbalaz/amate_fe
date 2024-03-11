import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import DatePicker from '@/components/ui/DatePicker'
import { useEffect, useState } from 'react'
import { HiOutlineCalendar } from 'react-icons/hi'
import React from 'react'
import Select from '@/components/ui/Select'
import {
    orderStatusMap,
    paymentStatusMap,
} from '@/configs/order.overview/orderStringMapper'
import AsyncSelect from 'react-select/async'
import InputGroup from '@/components/ui/InputGroup'
import Button from '@/components/ui/Button'
import { setProductAmount } from '@/store/productSlice'
import { useAppDispatch } from '@/store'
import { useAppSelector } from '@/store'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    orderProductClassic: Number
    orderNumber: string
    orderPartner: string
    orderStatus: string
    orderCreationDate: Date
    name: string
    productCode: string
    description: string
}

type ProductInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        orderProductClassic: Number
        orderPartner: string
        tags: Options
        [key: string]: unknown
    }
}

const ProductInformationFields = (props: ProductInformationFields) => {
    const { touched, errors } = props
    const dispatch = useAppDispatch()

    const [orderProductClassic, setOrderProductClassic] = useState<number>(0)
    const [orderProductMelon, setOrderProductMelon] = useState<number>(0)
    const [orderProductMint, setOrderProductMint] = useState<number>(0)
    const [orderProductHemp, setOrderProductHemp] = useState<number>(0)
    const [orderProductGinger, setOrderProductGinger] = useState<number>(0)
    const productAmounts = useAppSelector((state) => state.product)

    /*     const onClickHandler = (
        setOrderProduct: React.Dispatch<React.SetStateAction<number>>,
        amount: number,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()
        setOrderProduct((prevValue) => Math.max(prevValue + amount, 0))
    } */

    const onClickHandler = (
        setOrderProduct: React.Dispatch<React.SetStateAction<number>>,
        amount: number,
        productType: string,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e?.preventDefault()
        setOrderProduct((prevValue) => {
            const newValue = Math.max(prevValue + amount, 0)

            // Dispatch the action to update the product amount in the Redux store
            dispatch(setProductAmount({ productType, amount: newValue }))
            //  dispatch(setProductAmount({ productType, amount }))

            return newValue
        })
    }

    console.log('orderProductClassic', orderProductClassic)
    console.log('orderProductMelon', orderProductMelon)
    console.log('orderProductMint', orderProductMint)
    console.log('orderProductHemp', orderProductHemp)
    console.log('orderProductGinger', orderProductGinger)

    return (
        <AdaptableCard divider className="mb-5">
            <h5 className="mb-4">Product</h5>
            <div className="grid grid-cols-1 md:grid-cols-1 2xl:grid-cols-2 gap-x-4 gap-y-0">
                {/* <div className="col-span-1"> */}
                {/* CLASSIC */}

                <FormItem
                    label="Classic"
                    invalid={
                        (errors.orderProductClassic &&
                            touched.orderProductClassic) as boolean
                    }
                    errorMessage={errors.orderProductClassic}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*   color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductClassic,
                                    -20,
                                    'classic',
                                    e
                                )
                            }
                        >
                            - 20
                        </Button>

                        <Button
                            className="custom-group-button"
                            /*      variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductClassic,
                                    -1,
                                    'classic',
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>
                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input "
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={orderProductClassic}
                            onChange={(e) =>
                                setOrderProductClassic(Number(e.target.value))
                            }
                        />

                        <Button
                            className="custom-group-button"
                            /*         variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductClassic,
                                    1,
                                    'classic',
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*    color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductClassic,
                                    20,
                                    'classic',
                                    e
                                )
                            }
                        >
                            + 20
                        </Button>
                    </InputGroup>
                </FormItem>

                {/* MELON */}

                <FormItem
                    label="Melon"
                    invalid={
                        (errors.orderProductMelon &&
                            touched.orderProductMelon) as boolean
                    }
                    errorMessage={errors.orderProductMelon}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*    color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductMelon,
                                    -20,
                                    'melon',
                                    e
                                )
                            }
                        >
                            - 20
                        </Button>

                        <Button
                            className="custom-group-button"
                            /*       variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductMelon,
                                    -1,
                                    'melon',
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>

                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input "
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={orderProductMelon}
                            onChange={(e) =>
                                setOrderProductMelon(Number(e.target.value))
                            }
                        />

                        <Button
                            className="custom-group-button"
                            /*        variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductMelon,
                                    1,
                                    'melon',
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*        color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductMelon,
                                    20,
                                    'melon',
                                    e
                                )
                            }
                        >
                            + 20
                        </Button>
                    </InputGroup>
                </FormItem>

                {/* MINT */}

                <FormItem
                    label="Mint"
                    invalid={
                        (errors.orderProductMint &&
                            touched.orderProductMint) as boolean
                    }
                    errorMessage={errors.orderProductMint}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*      color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductMint,
                                    -20,
                                    'mint',
                                    e
                                )
                            }
                        >
                            - 20
                        </Button>

                        <Button
                            className="custom-group-button"
                            /*     variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductMint,
                                    -1,
                                    'mint',
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>

                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input "
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={orderProductMint}
                            onChange={(e) =>
                                setOrderProductMint(Number(e.target.value))
                            }
                        />

                        <Button
                            className="custom-group-button"
                            /*       variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductMint,
                                    1,
                                    'mint',
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*      color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductMint,
                                    20,
                                    'mint',
                                    e
                                )
                            }
                        >
                            + 20
                        </Button>
                    </InputGroup>
                </FormItem>

                {/* HEMP */}

                <FormItem
                    label="Hemp"
                    invalid={
                        (errors.orderProductHemp &&
                            touched.orderProductHemp) as boolean
                    }
                    errorMessage={errors.orderProductHemp}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*          color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductHemp,
                                    -20,
                                    'hemp',
                                    e
                                )
                            }
                        >
                            - 20
                        </Button>

                        <Button
                            className="custom-group-button"
                            /*         variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductHemp,
                                    -1,
                                    'hemp',
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>

                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input "
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={orderProductHemp}
                            onChange={(e) =>
                                setOrderProductHemp(Number(e.target.value))
                            }
                        />

                        <Button
                            className="custom-group-button"
                            /*            variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductHemp,
                                    1,
                                    'hemp',
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*        color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductHemp,
                                    20,
                                    'hemp',
                                    e
                                )
                            }
                        >
                            + 20
                        </Button>
                    </InputGroup>
                </FormItem>

                {/* GINGER */}

                <FormItem
                    label="Ginger"
                    invalid={
                        (errors.orderProductGinger &&
                            touched.orderProductGinger) as boolean
                    }
                    errorMessage={errors.orderProductGinger}
                >
                    <InputGroup className="col-span-1">
                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*           color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductGinger,
                                    -20,
                                    'ginger',
                                    e
                                )
                            }
                        >
                            - 20
                        </Button>

                        <Button
                            className="custom-group-button"
                            /*          variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductGinger,
                                    -1,
                                    'ginger',
                                    e
                                )
                            }
                        >
                            - 1
                        </Button>

                        <Input
                            prefix={'Pcs'}
                            className="custom-group-input "
                            style={{ textAlign: 'center' }}
                            placeholder="0"
                            value={orderProductGinger}
                            onChange={(e) =>
                                setOrderProductGinger(Number(e.target.value))
                            }
                        />

                        <Button
                            className="custom-group-button"
                            /*         variant="twoTone"
                            color="blue-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductGinger,
                                    1,
                                    'ginger',
                                    e
                                )
                            }
                        >
                            + 1
                        </Button>

                        <Button
                            className="custom-group-button"
                            variant="twoTone"
                            /*         color="sky-800" */
                            onClick={(e) =>
                                onClickHandler(
                                    setOrderProductGinger,
                                    20,
                                    'ginger',
                                    e
                                )
                            }
                        >
                            + 20
                        </Button>
                    </InputGroup>
                </FormItem>
                {/*    </div>
                <div className="col-span-1">
                  
                </div> */}
            </div>
            Total: Pcs{' '}
            {orderProductClassic +
                orderProductMelon +
                orderProductMint +
                orderProductHemp +
                orderProductGinger}
        </AdaptableCard>
    )
}

export default ProductInformationFields
