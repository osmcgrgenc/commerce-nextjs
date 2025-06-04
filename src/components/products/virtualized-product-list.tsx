'use client';

import { memo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { ProductCard } from './product-card';
import { Product as APIProduct } from '@/lib/api';

interface VirtualizedProductListProps {
  products: APIProduct[];
  width: number;
  height: number;
  columnCount?: number;
  rowCount?: number;
  columnWidth?: number;
  rowHeight?: number;
}

const VirtualizedProductList = memo(function VirtualizedProductList({
  products,
  width,
  height,
  columnCount = 4,
  rowCount = Math.ceil(products.length / columnCount),
  columnWidth = 300,
  rowHeight = 400,
}: VirtualizedProductListProps) {
  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    const index = rowIndex * columnCount + columnIndex;
    const product = products[index];

    if (!product) return null;

    return (
      <div style={style}>
        <ProductCard
          name={product.name}
          price={product.price}
          image={product.image}
          href={product.href}
          category={product.category}
          arrivalDate={product.arrivalDate || ''}
          isNew={product.isNew}
          stock={product.stock}
          variants={product.variants}
        />
      </div>
    );
  };

  return (
    <Grid
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={height}
      rowCount={rowCount}
      rowHeight={rowHeight}
      width={width}
    >
      {Cell}
    </Grid>
  );
});

export { VirtualizedProductList };
