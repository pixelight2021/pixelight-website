export default async function () {
    try {
        const url = 'http://localhost/wordpress/wp-json/tag-groups/v1/terms?_fields=id,name,groups'
        const res = await useFetch(url)

        //requested media not found
        if (res.error.value) throw res.error.value

        return res.data.value
    } catch (err) {
        console.error(err)
    }
}