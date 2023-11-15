export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const fileUpload = formData.get('fileUpload');
        console.log(fileUpload)

        return {
            success: true
        }
    }
}
