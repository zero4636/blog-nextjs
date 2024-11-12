import CateLayout from "./cateLayout";
import CateList from "./cateList";
import { getCate } from "@/services/admin";

async function getData(params, searchParams) {
    try {
        const data = await getCate(params, searchParams) || [];

        if (data.status === 200) {
            return data.data;
        } else {
            return { pagination: {}, categories: [] };
        }
    } catch (error) {
        console.error('Error fetching categories data:', error);
        return null;
    }
}

export default async function Page({ params, searchParams }) {
    const { pagination, categories } = await getData(params, searchParams);
    return (
        <CateLayout pagination={pagination}>
            <CateList categories={categories} />
        </CateLayout>
    );
}
export const dynamic = 'force-dynamic';