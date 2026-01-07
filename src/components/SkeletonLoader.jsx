import React from "react";

// Base Skeleton Primitive
export const Skeleton = ({ className }) => {
    return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

// Skeleton for a Product Card (Home/Shop Grid)
export const SkeletonProductCard = () => {
    return (
        <div className="bg-white rounded-b-2xl shadow-sm border border-transparent">
            {/* Image Placeholder */}
            <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg">
                <Skeleton className="w-full h-full" />
            </div>

            {/* Content Placeholder */}
            <div className="p-5 space-y-3">
                {/* Category */}
                <Skeleton className="h-3 w-1/3" />

                {/* Title */}
                <Skeleton className="h-6 w-3/4" />

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/3" />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-50 pt-2 space-y-3">
                    {/* Price */}
                    <Skeleton className="h-8 w-1/2" />

                    {/* Button */}
                    <Skeleton className="h-10 w-full rounded-full" />
                </div>
            </div>
        </div>
    );
};

// Skeleton for Product Details Page
export const SkeletonProductDetails = () => {
    return (
        <div className="bg-white min-h-screen pt-16 font-sans">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Skeleton className="h-4 w-64" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT: Gallery Skeleton */}
                    <div className="lg:col-span-7">
                        <div className="flex flex-col-reverse md:flex-row gap-4">
                            {/* Thumbnails */}
                            <div className="flex md:flex-col gap-4 w-full md:w-24 shrink-0">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="w-20 h-20 rounded-2xl" />
                                ))}
                            </div>
                            {/* Main Image */}
                            <div className="relative flex-1 aspect-4/3 bg-gray-100 rounded-2xl overflow-hidden">
                                <Skeleton className="w-full h-full" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Info Panel Skeleton */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Header */}
                        <div>
                            <Skeleton className="h-10 w-3/4 mb-4" />
                            <div className="flex gap-4 mb-4">
                                <Skeleton className="h-6 w-20 rounded-2xl" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                            <Skeleton className="h-12 w-1/3 mb-6" />

                            <div className="border-t border-gray-100 pt-8 space-y-2">
                                <Skeleton className="h-5 w-1/3 mb-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>

                        {/* Selectors */}
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-1/4" />
                            <div className="flex gap-3">
                                {[1, 2, 3].map(i => <Skeleton key={i} className="w-8 h-8 rounded-full" />)}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-1/4" />
                            <div className="flex gap-3">
                                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-12 h-10 rounded-xl" />)}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 flex gap-4">
                            <Skeleton className="h-14 w-32 rounded-2xl" />
                            <Skeleton className="h-14 flex-1 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
