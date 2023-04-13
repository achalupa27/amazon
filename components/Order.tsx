const Order = ({ order }: any) => {
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    return (
        <div className='relative rounded-md border '>
            <div className='flex items-center space-x-10 bg-gray-100 p-5 text-sm text-gray-600'>
                <div>
                    <p className='text-xs font-bold'>ORDER PLACED</p>
                    <p>{utc}</p>
                </div>
                <div>
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p>
                        ${order.amount} - Express Shipping ${order.amountShipping}
                    </p>
                </div>
                <p className='flex-1 self-end whitespace-nowrap text-right text-sm text-blue-500 sm:text-xl'>{order.items.length} items</p>
                <p className='absolute top-2 right-2 w-40 truncate whitespace-nowrap text-xs lg:w-72'>Order # {order.id}</p>
            </div>
            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {order.images.map((image: string) => (
                        <img src={image} alt='' className='h-20 object-contain sm:h-32' />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Order;
