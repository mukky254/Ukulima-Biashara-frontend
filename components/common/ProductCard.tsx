import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <Link href={`/products/${product._id}`}>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          {product.images.length > 0 ? (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-green-600">
              KSh {product.price}
            </span>
            <span className="text-sm text-gray-500">
              per {product.unit}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{product.farmer.name}</span>
            <span>{product.location.county}</span>
          </div>
          
          {product.isOrganic && (
            <div className="mt-2">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Organic
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
