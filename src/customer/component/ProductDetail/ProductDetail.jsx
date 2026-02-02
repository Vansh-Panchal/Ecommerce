import { StarIcon } from '@heroicons/react/20/solid'
import { Button, Grid, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
// import { api } from "../../config/apiConfig"
import LinearProgress from '@mui/material/LinearProgress';

import ProductReviewCard from './ProductReviewCard';
import { mens_kurta } from '../../../Data/Mens/mens_kurta';
import HomeSectionCard1 from '../HomeSectionCard/HomeSectionCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addItemToCart } from '../../../State/Cart/Action';
import { api } from '../../../config/apiConfig';

const reviews = { href: '#', average: 4, totalCount: 117 }

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

export default function ProductDetail({ productId }) {
    const [selectedSize, setSelectedSize] = useState("");
    const [product, setProduct] = useState();
    const navigate = useNavigate();
    const params = useParams();
    console.log("params in product detail", params);
    const dispatch = useDispatch();
    const handleAddtoCart = () => {
        const data = {
            productId: product.id,
            size: selectedSize,
            quantity: 1,
            price: product.discountedPrice
        }
        dispatch(addItemToCart(data))
        navigate("/cart");
    }

    const fetchProductsById = async (id) => {
        try {
            console.log("id", id);
            const { data } = await api.get(`/api/products/${id}`);
            console.log("data    ", data);
            setProduct(data);

        } catch (error) {

        }
    };

    useEffect(() => {
        if (params.productId) {
            fetchProductsById(params.productId)
        }
    }, [params])



    return (
        <div className="lg:px-20 bg-white">
            <div className="pt-6">
                {/* <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav> */}

                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 py-10'>
                    {/* Image gallery */}
                    <div className="flex flex-col items-center">
                        <div className='overflow-hidden rounded-lg max-w-[30rem]  max-h-[35rem]'>
                            <img
                                alt={product?.brand}
                                src={product?.imageUrl}
                                // className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
                                className='h-full w-full object-cover object-center'
                            />
                        </div>

                        {/* <div className='flex  flex-wrap space-x-5 justify-center'>
                            {product.images.map((item) => <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-h-[5rem] max-w-[5rem] mt-4'>

                                <img

                                    src={item.src}
                                    alt={item.alt}
                                    // className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
                                    className='h-full w-full object-cover object-center'
                                />
                            </div>)}

                        </div> */}
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8">

                        {/* Product Company Name and Product Name - Top Left (Adjusted for image layout) */}
                        <div className="lg:col-span-2 ">
                            <h1 className="text-lg lg:text-xl  text-gray-900 font-semibold">{product?.brand}</h1> {/* Company Name (Universaloutfit) */}
                            <h1 className="text-lg lg:text-xl font-bold text-gray-900 opacity-60 pt-1">{product?.title}</h1>
                        </div>

                        {/* Price, Discount, Reviews - Top Right (Adjusted for image layout) */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>

                            {/* Price and Discount */}
                            <div className="flex items-center space-x-5 text-lg lg:text-xl mt-6">
                                <p className="text-3xl font-semibold tracking-tight text-gray-900">Rs.{product?.discountedPrice}</p>
                                <p className="text-xl tracking-tight text-gray-400 line-through">Rs.{product?.price}</p>
                                <p className="text-xl tracking-tight text-green-600 font-medium">{product?.discountPercent}% off</p>
                            </div>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className='flex items-center space-x-3'>
                                    <Rating name="read-only" value={4} readOnly />
                                    <p className='opacity-50 text-sm'>56540 Rating</p>
                                    <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>3870 Reviews</p>
                                </div>
                            </div>

                            {/* Form for Options (Sizes) and Add to Bag Button */}
                            <form className="mt-6"> {/* Reduced margin-top for tighter spacing */}

                                {/* Sizes - Using the provided structure but aligning with image presentation */}
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sr-only"> {/* SR-ONLY: Size guide is not in the image */}
                                            Size guide
                                        </a>
                                    </div>

                                    <fieldset aria-label="Choose a size" className="mt-2"> {/* Reduced margin-top */}
                                        <div className="grid grid-cols-4 gap-3">
                                            {product?.sizes.map((size) => (
                                                <Button
                                                    key={size.name}
                                                    variant={selectedSize === size.name ? 'contained' : 'outlined'}
                                                    value={size.name}
                                                    onClick={() => setSelectedSize(size.name)}
                                                    className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                                                >
                                                    {size.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>

                                {/* Color selection removed because it's not visible in the image, but kept in the original code's structure for completeness, just commented out to match the image's layout. */}
                                {/* <div>
                        <h3 className="text-sm font-medium text-gray-900">Color</h3>
                        <fieldset aria-label="Choose a color" className="mt-4">
                            <div className="flex items-center gap-x-3">
                                {product.colors.map((color) => (
                                    <div key={color.id} className="flex rounded-full outline -outline-offset-1 outline-black/10">
                                        <input
                                            defaultValue={color.id}
                                            defaultChecked={color.selected}
                                            name="color"
                                            type="radio"
                                            aria-label={color.name}
                                            className={classNames(
                                                color.classes,
                                                'size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3',
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div> 
                    */}


                                {/* Add to bag button - Matching the image's appearance and position */}
                                <Button onClick={handleAddtoCart} disabled={!selectedSize} variant='contained' sx={{ mt: '2rem', px: '2rem', py: '1rem', bgcolor: '#9155fd' }}>
                                    Add to cart
                                </Button>
                            </form>
                        </div>

                        {/* Product Description and Highlights - Bottom Left */}
                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">

                            {/* Description */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product?.description}</p>
                                </div>
                            </div>

                            {/* Highlights (Using the data structure but mirroring the UI's display for this section) */}
                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                {/* The image doesn't show a list for highlights but a single bullet point directly below the "Highlights" header. */}
                                {/* <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-900 list-none ml-[-1rem]"> 
                                                <span className="text-gray-900"> • {highlight}</span> 
                                            </li>
                                        ))}
                                    </ul>
                                </div> */}
                            </div>

                            {/* Details (This section is not in the image but is retained from the original code) */}
                            {/* <div className="mt-10 sr-only"> 
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.details}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>

                <section>
                    <h1 className='font-semibold text-lg pb-4'>Recent Rating and Reviews</h1>
                    <div className=' p-6' >
                        <div className='space-y-5 p-10 flex flex-wrap gap-15 '>
                            {[1, 1, 1, 1, 1, 1,].map((item) => <ProductReviewCard />)}
                        </div>
                        {/* <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <div className='space-y-5'>
                                    {[1, 1, 1].map((item) => <ProductReviewCard />)}
                                </div>

                            </Grid> */}
                        {/* <Grid item xs={5} className='flex justify-end'>
                                <h1 className='text-xl font-semibold pb-1'>Product Rating</h1>
                                <div className='flex items-center space-x-3'>
                                    <Rating value={4.6} precision={0.5} readOnly />
                                    <p className='opacity-60'>5980 Ratings</p>
                                </div>
                                <Box >
                                    <Grid container  gap={2} >
                                        <Grid item xs={2}>
                                            <p>Excellent</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{bgcolor:'black'}} variant="determinate" value={10} />
                                            
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Grid> */}
                        {/* </Grid> */}
                    </div>
                </section>
                <section className='pt-10'>
                    <h1 className='py-5 text-xl font-bold'>Similiar Products</h1>
                    <div className='flex flex-wrap space-y-5'>
                        {mens_kurta.map((item) => <HomeSectionCard1 product={item} />)}
                    </div>
                </section>


            </div>
        </div>
        // <div>Product Detail Page</div>
    )
}
