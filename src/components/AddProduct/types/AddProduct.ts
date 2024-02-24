import { ChangeEvent } from "react"

export type Props = {}

export type Product = {
    name: string,
    image: string,
    category: string,
    new_price: number,
    old_price: number,
    img_url: string,
    success: boolean
}

interface CustomEventTarget extends HTMLInputElement {
    value: string;
    name: string;
    product: Product;
}

export interface ExtendEvent extends ChangeEvent<HTMLInputElement> {
    target: CustomEventTarget;
}

