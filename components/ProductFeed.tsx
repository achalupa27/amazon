import Product from './Product';

const ProductFeed = ({ products }: any) => {
    console.log('product:', products);
    return (
        <div className='mx-auto grid grid-flow-row-dense md:-mt-52 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.slice(0, 4).map((product: Product) => (
                <Product key={product.id} product={product} />
            ))}

            <img className='md:col-span-full' src='https://images-eu.ssl-images-amazon.com/images/G/02/SBP/2018/gateway/1110572_smb_gw_desktop_1500x300_lavolio_1x_uk._CB484123630_.jpg' alt='' />

            <div className='md:col-span-2'>
                {products.slice(4, 5).map((product: Product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            {products.slice(5, products.length).map((product: Product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductFeed;
