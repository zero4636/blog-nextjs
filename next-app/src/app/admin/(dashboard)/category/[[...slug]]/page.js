import CateLayout from "./cateLayout";
import CateList from "./cateList";
import { getCate } from "@/services/admin";

async function getData(params, searchParams) {
    try {
        const data = await getCate(params, searchParams) || [];

        if (data.status === 200) {
            return data.data; // Return the user data if the status is 200
        } else {
            return null; // Return null if the status is not 200 (error case)
        }
    } catch (error) {
        console.error('Error fetching categories data:', error);
        return null; // Return null in case of an error
    }
}

export default async function Page({ params, searchParams }) {
    const { pagination, categories } = await getData(params, searchParams);

    return (
        <CateLayout>
            <CateList categories={categories} />
        </CateLayout>
    );
}
export const dynamic = 'force-dynamic';